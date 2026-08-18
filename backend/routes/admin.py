from fastapi import APIRouter, HTTPException, Request, Depends
from jose import jwt
from passlib.context import CryptContext

from middleware.auth import get_current_admin

from schemas import (
    MaterialCreate,
    MaterialUpdate,
    DealerCreate,
    DealerUpdate,
)
from schemas.admin import AdminLogin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


# ==========================================================
# ADMIN LOGIN
# ==========================================================

@router.post("/login")
async def admin_login(
    data: AdminLogin,
    request: Request,
):
    db = request.app.state.mongodb

    SECRET_KEY = request.app.state.secret_key
    ALGORITHM = "HS256"

    admin = await db.admins.find_one(
        {"email": data.email}
    )

    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not pwd_context.verify(
        data.password,
        admin["password"],
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    token = jwt.encode(
        {
            "email": admin["email"],
            "role": admin["role"],
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return {
        "token": token,
        "admin": {
            "email": admin["email"],
            "role": admin["role"],
        },
    }


# ==========================================================
# ADMIN MATERIALS
# ==========================================================

@router.post("/materials")
async def create_material(
    material: MaterialCreate,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    if await db.materials.find_one({"slug": material.slug}):
        raise HTTPException(
            status_code=400,
            detail="Material slug already exists",
        )

    await db.materials.insert_one(
        material.model_dump()
    )

    return {
        "message": "Material created successfully"
    }


@router.put("/materials/{slug}")
async def update_material(
    slug: str,
    material: MaterialUpdate,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

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


@router.delete("/materials/{slug}")
async def delete_material(
    slug: str,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    result = await db.materials.delete_one(
        {"slug": slug}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return {
        "message": "Material deleted successfully"
    }


# ==========================================================
# ADMIN DEALERS
# ==========================================================

@router.post("/dealers")
async def create_dealer(
    dealer: DealerCreate,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    existing = await db.dealers.find_one(
        {
            "$or": [
                {"phone": dealer.phone},
                {"name": dealer.business_name}
            ]
        }
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Dealer already exists",
        )

    last_dealer = await db.dealers.find_one(
        {
            "dealer_code": {
                "$regex": "^SR-DLR-"
            }
        },
        sort=[("dealer_code", -1)],
    )

    if last_dealer:
        last_number = int(
            last_dealer["dealer_code"].split("-")[-1]
        )
        dealer_code = (
            f"SR-DLR-{last_number + 1:08d}"
        )
    else:
        dealer_code = "SR-DLR-00000001"

    dealer_data = dealer.model_dump()

    dealer_data["dealer_code"] = dealer_code

    dealer_data["name"] = dealer_data.pop(
        "business_name"
    )

    await db.dealers.insert_one(
        dealer_data
    )

    return {
        "message": "Dealer created successfully",
        "dealer_code": dealer_code,
    }


@router.put("/dealers/{dealer_code}")
async def update_dealer(
    dealer_code: str,
    dealer: DealerUpdate,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    dealer_data = dealer.model_dump()

    dealer_data["name"] = dealer_data.pop(
        "business_name"
    )

    result = await db.dealers.update_one(
        {
            "dealer_code": dealer_code
        },
        {
            "$set": dealer_data
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


@router.delete("/dealers/{dealer_code}")
async def delete_dealer(
    dealer_code: str,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    result = await db.dealers.delete_one(
        {
            "dealer_code": dealer_code
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Dealer not found",
        )

    return {
        "message": "Dealer deleted successfully"
    }


@router.get("/dealers")
async def list_dealers(
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    dealers = await db.dealers.find(
        {},
        {"_id": 0},
    ).sort(
        "name",
        1,
    ).to_list(1000)

    return {
        "count": len(dealers),
        "dealers": dealers,
    }
