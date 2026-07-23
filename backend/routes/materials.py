from fastapi import APIRouter, Request, HTTPException
from seed_data import compute_material_stats

router = APIRouter(
    prefix="/materials",
    tags=["Materials"],
)


@router.get("")
async def list_materials(request: Request):
    db = request.app.state.mongodb

    materials = await db.materials.find({}, {"_id": 0}).to_list(100)

    return materials


@router.get("/{slug}")
async def material_detail(slug: str, request: Request):
    db = request.app.state.mongodb

    material = await db.materials.find_one({"slug": slug}, {"_id": 0})

    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    dealers = await db.dealers.find(
        {"prices.material_slug": slug},
        {"_id": 0},
    ).to_list(500)

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