from fastapi import APIRouter, HTTPException, Request
from jose import jwt
from passlib.context import CryptContext
from pydantic import BaseModel

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