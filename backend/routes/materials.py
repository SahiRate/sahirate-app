from fastapi import APIRouter, Request

router = APIRouter(
    prefix="/materials",
    tags=["Materials"],
)

@router.get("")
async def list_materials(request: Request):
    db = request.app.mongodb

    materials = await db.materials.find({}, {"_id": 0}).to_list(100)

    return materials