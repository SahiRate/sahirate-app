from fastapi import APIRouter, HTTPException, Request, Depends
from jose import jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from middleware.auth import get_current_admin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


class AdminLogin(BaseModel):
    email: str
    password: str


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

    is_valid = pwd_context.verify(
        data.password,
        admin["password"],
    )

    if not is_valid:
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

    await db.materials.insert_one(material.model_dump())

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