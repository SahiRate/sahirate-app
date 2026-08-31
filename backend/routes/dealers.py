from typing import Optional

from fastapi import APIRouter, HTTPException, Request

from seed_data import MATERIALS


router = APIRouter(
    prefix="/dealers",
    tags=["Dealers"],
)


# ==========================================================
# PUBLIC — DEALER LIST
# ==========================================================

@router.get("")
async def list_dealers(
    request: Request,
    material: Optional[str] = None,
    area: Optional[str] = None,
):
    db = request.app.state.mongodb

    # ------------------------------------------------------
    # Hide legacy/generated dealer records
    #
    # Legacy records use dealer_01 ... dealer_15.
    # Real/current records such as SR-DGR-* remain visible.
    # ------------------------------------------------------

    query = {
        "dealer_code": {
            "$not": {
                "$regex": "^dealer_"
            }
        }
    }

    # ------------------------------------------------------
    # Material filter
    # ------------------------------------------------------

    if material:
        query["prices.material_slug"] = material

    # ------------------------------------------------------
    # Area filter
    # ------------------------------------------------------

    if area:
        query["area"] = area

    # ------------------------------------------------------
    # Fetch dealers
    # ------------------------------------------------------

    dealers = await db.dealers.find(
        query,
        {
            "_id": 0,
        },
    ).to_list(500)

    # ------------------------------------------------------
    # Material lookup
    # ------------------------------------------------------

    material_map = {
        m["slug"]: m["name"]
        for m in MATERIALS
    }

    # ------------------------------------------------------
    # Add materials_offered
    # ------------------------------------------------------

    for dealer in dealers:

        prices = dealer.get(
            "prices",
            [],
        )

        dealer["materials_offered"] = sorted(
            list(
                {
                    material_map.get(
                        price.get("material_slug"),
                        price.get("material_slug"),
                    )
                    for price in prices
                    if price.get("material_slug")
                }
            )
        )

    # ------------------------------------------------------
    # Sort
    # ------------------------------------------------------

    dealers.sort(
        key=lambda x: (
            -(x.get("rating") or 0),
            -(x.get("reviews_count") or 0),
        )
    )

    return dealers


# ==========================================================
# PUBLIC — DEALER DETAIL
# ==========================================================

@router.get("/{dealer_id}")
async def dealer_detail(
    dealer_id: str,
    request: Request,
):
    db = request.app.state.mongodb

    # ------------------------------------------------------
    # Find dealer by dealer_code
    # ------------------------------------------------------

    dealer = await db.dealers.find_one(
        {
            "dealer_code": dealer_id,
        },
        {
            "_id": 0,
        },
    )

    if not dealer:
        raise HTTPException(
            status_code=404,
            detail="Dealer not found",
        )

    # ------------------------------------------------------
    # Material lookup
    # ------------------------------------------------------

    material_map = {
        m["slug"]: m
        for m in MATERIALS
    }

    # ------------------------------------------------------
    # Enrich dealer prices
    # ------------------------------------------------------

    prices = dealer.get(
        "prices",
        [],
    )

    for price in prices:

        material = material_map.get(
            price.get("material_slug"),
            {},
        )

        price["material_name"] = material.get(
            "name",
            price.get("material_slug"),
        )

        price["unit"] = material.get(
            "unit",
            "",
        )

    # ------------------------------------------------------
    # Return dealer
    # ------------------------------------------------------

    return dealer