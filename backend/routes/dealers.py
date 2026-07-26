from typing import Optional

from fastapi import APIRouter, HTTPException, Request

from seed_data import MATERIALS

router = APIRouter(
    prefix="/dealers",
    tags=["Dealers"],
)


@router.get("")
async def list_dealers(
    request: Request,
    material: Optional[str] = None,
    area: Optional[str] = None,
):
    db = request.app.state.mongodb

    query = {}

    if material:
        query["prices.material_slug"] = material

    if area:
        query["area"] = area

    dealers = await db.dealers.find(
        query,
        {"_id": 0},
    ).to_list(500)

    material_map = {
        m["slug"]: m["name"]
        for m in MATERIALS
    }

    for dealer in dealers:
        dealer["materials_offered"] = [
            material_map.get(
                price["material_slug"],
                price["material_slug"],
            )
            for price in dealer["prices"]
        ]

    dealers.sort(
        key=lambda x: (
            -x["rating"],
            -x["reviews_count"],
        )
    )

    return dealers


@router.get("/{dealer_id}")
async def dealer_detail(
    dealer_id: str,
    request: Request,
):
    db = request.app.state.mongodb

    dealer = await db.dealers.find_one(
        {"id": dealer_id},
        {"_id": 0},
    )

    if not dealer:
        raise HTTPException(
            status_code=404,
            detail="Dealer not found",
        )

    material_map = {
        m["slug"]: m
        for m in MATERIALS
    }

    for price in dealer["prices"]:
        material = material_map.get(
            price["material_slug"],
            {},
        )

        price["material_name"] = material.get(
            "name",
            price["material_slug"],
        )

        price["unit"] = material.get(
            "unit",
            "",
        )

    return dealer