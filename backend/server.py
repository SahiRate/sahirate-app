"""SahiRate — AI-powered Building Material Price Intelligence backend."""

import logging
import os
import random
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional
from routes.admin import router as admin_router
from routes.dealers import router as dealers_router

from dotenv import load_dotenv
from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    HTTPException,
)
from jose import jwt

from middleware.auth import (
    configure_auth,
    get_current_admin,
)

from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from routes.materials import router as materials_router
from routes.admin import router as admin_router
from seed_data import (
    MATERIALS,
    build_dealers,
    compute_material_stats,
)

# ==========================================================
# ENVIRONMENT
# ==========================================================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ==========================================================
# LOGGING
# ==========================================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sahirate")

# ==========================================================
# DATABASE
# ==========================================================

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ==========================================================
# FASTAPI
# ==========================================================

app = FastAPI(title="SahiRate API")
api = APIRouter(prefix="/api")

# ==========================================================
# SECURITY
# ==========================================================

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)



# ==========================================================
# SCHEMAS
# ==========================================================

class AdminLogin(BaseModel):
    email: str
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

# ==========================================================

# ==========================================================
# DATABASE SEED
# ==========================================================

async def seed_if_empty():
    """Populate default collections only if empty."""

    if await db.materials.count_documents({}) == 0:
        logger.info("Seeding materials...")
        await db.materials.insert_many(MATERIALS)

    if await db.dealers.count_documents({}) == 0:
        logger.info("Seeding dealers...")
        random.seed(42)
        await db.dealers.insert_many(build_dealers())

    if not await db.admins.find_one({"email": "admin@sahirate.in"}):
        await db.admins.insert_one(
            {
                "email": "admin@sahirate.in",
                "password": pwd_context.hash("admin123"),
                "role": "admin",
            }
        )
        logger.info("Default admin created.")

# ==========================================================

# ==========================================================
# APP EVENTS
# ==========================================================

@app.on_event("startup")
async def on_startup():
    app.state.mongodb = db
    app.state.secret_key = SECRET_KEY

    configure_auth(
        database=db,
        secret_key=SECRET_KEY,
    )

    await seed_if_empty()


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
    # ==========================================================
# PUBLIC ROUTES
# ==========================================================

@api.get("/")
async def root():
    return {
        "service": "SahiRate",
        "status": "ok",
        "city": "Deoghar",
        "state": "Jharkhand",
    }


@api.get("/prices/daily")
async def daily_prices():

    dealers = await db.dealers.find(
        {},
        {"_id": 0},
    ).to_list(500)

    stats = compute_material_stats(dealers)

    material_map = {
        m["slug"]: m
        for m in MATERIALS
    }

    board = []

    for slug, stat in stats.items():

        material = material_map.get(slug)

        if not material:
            continue

        trends = [
            price["trend"]
            for dealer in dealers
            for price in dealer["prices"]
            if price["material_slug"] == slug
        ]

        up = trends.count("up")
        down = trends.count("down")

        if up > down:
            overall = "up"
        elif down > up:
            overall = "down"
        else:
            overall = "flat"

        board.append(
            {
                "slug": slug,
                "name": material["name"],
                "unit": material["unit"],
                "min": stat["min"],
                "max": stat["max"],
                "avg": stat["avg"],
                "trend": overall,
                "dealer_count": stat["dealer_count"],
            }
        )

    board.sort(key=lambda x: x["name"])

    return {
        "city": "Deoghar",
        "state": "Jharkhand",
        "updated_at": datetime.now(
            timezone.utc
        ).isoformat(),
        "board": board,
    }
    # ==========================================================
# ADMIN AUTH
# ==========================================================


# ==========================================================
# MIDDLEWARE
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sahirate.in",
        "https://www.sahirate.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# ROUTERS
# ==========================================================
api.include_router(admin_router)

api.include_router(materials_router)

api.include_router(dealers_router)

app.include_router(api)


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "SahiRate API",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }