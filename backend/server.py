"""SahiRate — AI-powered Building Material Price Intelligence backend."""
from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from jose import jwt, JWTError
from passlib.context import CryptContext
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import os
import logging
import random

from seed_data import MATERIALS, build_dealers, compute_material_stats

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# -------- Mongo --------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="SahiRate API")
api = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sahirate")
# ============ AUTH CONFIG ============

SECRET_KEY = os.getenv("SECRET_KEY", "change-this-in-production")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(
    scheme_name="BearerAuth",
    description="Enter JWT token returned by /api/admin/login",
)

class AdminLogin(BaseModel):
    email: str
    password: str

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str    

class MaterialCreate(BaseModel):
    slug: str
    name: str
    unit: str
    category: str
    description: str

class MaterialUpdate(BaseModel):
    name: str
    unit: str
    category: str
    description: str 

class DealerCreate(BaseModel):
    id: str
    name: str
    area: str
    phone: str
    rating: float
    verified: bool
    delivery: bool
    reviews_count: int
    prices: list       

async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        email = payload.get("email")

        if not email:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    admin = await db.admins.find_one(
    {"email": email},
    {"_id": 0},
)

    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Admin not found",
        )

    return admin

# ============ SEED ============
async def seed_if_empty():
    """Populate materials & dealers on first boot. Idempotent."""
    mats_count = await db.materials.count_documents({})
    if mats_count == 0:
        logger.info("Seeding materials...")
        await db.materials.insert_many([{**m} for m in MATERIALS])

    dealers_count = await db.dealers.count_documents({})
    if dealers_count == 0:
        logger.info("Seeding dealers...")
        random.seed(42)
        dealers = build_dealers()
        await db.dealers.insert_many([{**d} for d in dealers])

    admin_exists = await db.admins.find_one({"email": "admin@sahirate.in"})

    if not admin_exists:
        await db.admins.insert_one({
            "email": "admin@sahirate.in",
            "password": pwd_context.hash("admin123"),
            "role": "admin",
        })
        logger.info("Default admin created.")


@app.on_event("startup")
async def on_startup():
    await seed_if_empty()


@app.on_event("shutdown")
async def on_shutdown():
    client.close()


# ============ ROUTES ============
@api.get("/")
async def root():
    return {"service": "SahiRate", "status": "ok", "city": "Deoghar, Jharkhand"}


@api.get("/materials")
async def list_materials():
    """List all material categories with aggregated stats."""
    materials = await db.materials.find({}, {"_id": 0}).to_list(100)
    dealers = await db.dealers.find({}, {"_id": 0}).to_list(500)
    stats = compute_material_stats(dealers)
    for m in materials:
        m["stats"] = stats.get(m["slug"], {"min": None, "max": None, "avg": None, "dealer_count": 0})
    return materials


@api.get("/materials/{slug}")
async def material_detail(slug: str):
    """Get one material + comparison prices across all dealers."""
    material = await db.materials.find_one({"slug": slug}, {"_id": 0})
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    dealers = await db.dealers.find({"prices.material_slug": slug}, {"_id": 0}).to_list(500)
    comparison = []
    for d in dealers:
        for p in d["prices"]:
            if p["material_slug"] == slug:
                comparison.append({
                    "dealer_id": d["id"],
                    "dealer_name": d["name"],
                    "area": d["area"],
                    "rating": d["rating"],
                    "verified": d["verified"],
                    "phone": d["phone"],
                    "delivery": d["delivery"],
                    "in_stock": p["in_stock"],
                    "price": p["price"],
                    "previous_price": p["previous_price"],
                    "trend": p["trend"],
                    "updated_at": p["updated_at"],
                })
    comparison.sort(key=lambda x: x["price"])
    stats = compute_material_stats(dealers)
    material["stats"] = stats.get(slug, {})
    material["comparison"] = comparison
    return material


@api.get("/dealers")
async def list_dealers(material: Optional[str] = None, area: Optional[str] = None):
    query = {}
    if material:
        query["prices.material_slug"] = material
    if area:
        query["area"] = area
    dealers = await db.dealers.find(query, {"_id": 0}).to_list(500)
    # attach material names
    material_map = {m["slug"]: m["name"] for m in MATERIALS}
    for d in dealers:
        d["materials_offered"] = [material_map.get(p["material_slug"], p["material_slug"]) for p in d["prices"]]
    dealers.sort(key=lambda x: (-x["rating"], -x["reviews_count"]))
    return dealers


@api.get("/dealers/{dealer_id}")
async def dealer_detail(dealer_id: str):
    dealer = await db.dealers.find_one({"id": dealer_id}, {"_id": 0})
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    material_map = {m["slug"]: m for m in MATERIALS}
    for p in dealer["prices"]:
        mat = material_map.get(p["material_slug"], {})
        p["material_name"] = mat.get("name", p["material_slug"])
        p["unit"] = mat.get("unit", "")
    return dealer


@api.get("/prices/daily")
async def daily_prices():
    """Compact snapshot for a ticker-style live board."""
    dealers = await db.dealers.find({}, {"_id": 0}).to_list(500)
    stats = compute_material_stats(dealers)
    material_map = {m["slug"]: m for m in MATERIALS}
    board = []

    for slug, s in stats.items():
        mat = material_map[slug]

        trends = [
            p["trend"]
            for d in dealers
            for p in d["prices"]
            if p["material_slug"] == slug
        ]

        up = trends.count("up")
        down = trends.count("down")
        overall = "up" if up > down else ("down" if down > up else "flat")

        board.append({
            "slug": slug,
            "name": mat["name"],
            "unit": mat["unit"],
            "min": s["min"],
            "max": s["max"],
            "avg": s["avg"],
            "trend": overall,
            "dealer_count": s["dealer_count"],
        })

    board.sort(key=lambda x: x["name"])

    return {
        "city": "Deoghar",
        "state": "Jharkhand",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "board": board,
    }



@api.post("/admin/login")
async def admin_login(data: AdminLogin):
    admin = await db.admins.find_one({"email": data.email})

    if not admin:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not pwd_context.verify(data.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = jwt.encode(
        {
            "email": data.email,
            "role": "admin"
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return {
    "token": token,
    "admin": {
        "email": data.email,
        "role": "admin"
    }
}

@api.get("/admin/me")
async def admin_me(
    admin=Depends(get_current_admin),
):
    admin_data = admin.copy()
    admin_data.pop("password", None)

    return {
        "admin": admin_data
    }

@api.post("/admin/change-password")
async def change_password(
    data: ChangePasswordRequest,
    admin=Depends(get_current_admin),
):
    if not pwd_context.verify(
        data.current_password,
        admin["password"],
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    new_hash = pwd_context.hash(data.new_password)

    await db.admins.update_one(
        {"email": admin["email"]},
        {
            "$set": {
                "password": new_hash,
            }
        },
    )

    return {
        "message": "Password changed successfully"
    }

@api.post("/admin/materials")
async def create_material(
    material: MaterialCreate,
    admin=Depends(get_current_admin),
):
    existing = await db.materials.find_one({"slug": material.slug})

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Material slug already exists",
        )

    await db.materials.insert_one(material.model_dump())

    return {
        "message": "Material created successfully"
    }

@api.put("/admin/materials/{slug}")
async def update_material(
    slug: str,
    material: MaterialUpdate,
    admin=Depends(get_current_admin),
):
    result = await db.materials.update_one(
        {"slug": slug},
        {
            "$set": material.model_dump()
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return {
        "message": "Material updated successfully"
    }

@api.delete("/admin/materials/{slug}")
async def delete_material(
    slug: str,
    admin=Depends(get_current_admin),
):
    result = await db.materials.delete_one({"slug": slug})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return {
        "message": "Material deleted successfully"
    }    

@api.post("/admin/dealers")
async def create_dealer(
    dealer: DealerCreate,
    admin=Depends(get_current_admin),
):
    existing = await db.dealers.find_one({"id": dealer.id})

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Dealer ID already exists",
        )

    await db.dealers.insert_one(dealer.model_dump())

    return {
        "message": "Dealer created successfully"
    }

class DealerUpdate(BaseModel):
    name: str
    area: str
    phone: str
    rating: float
    verified: bool
    delivery: bool
    reviews_count: int
    prices: list



@api.put("/admin/dealers/{dealer_id}")
async def update_dealer(
    dealer_id: str,
    dealer: DealerUpdate,
    admin=Depends(get_current_admin),
):
    result = await db.dealers.update_one(
        {"id": dealer_id},
        {
            "$set": dealer.model_dump()
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Dealer not found",
        )

    return {
        "message": "Dealer updated successfully"
    }

@api.delete("/admin/dealers/{dealer_id}")
async def delete_dealer(
    dealer_id: str,
    admin=Depends(get_current_admin),
):
    result = await db.dealers.delete_one({"id": dealer_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Dealer not found",
        )

    return {
        "message": "Dealer deleted successfully"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api)