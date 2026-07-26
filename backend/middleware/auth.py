from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

security = HTTPBearer(
    scheme_name="BearerAuth",
    description="JWT Bearer Token",
)

SECRET_KEY = None
ALGORITHM = "HS256"
db = None


def configure_auth(database, secret_key):
    global db, SECRET_KEY
    db = database
    SECRET_KEY = secret_key


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