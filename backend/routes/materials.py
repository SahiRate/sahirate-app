from fastapi import APIRouter, Request, HTTPException

from seed_data import compute_material_stats


router = APIRouter(
    prefix="/materials",
    tags=["Materials"],
)


# ==========================================================
# LOCAL MATERIAL IMAGE MAPPING
# ==========================================================

LOCAL_MATERIAL_IMAGES = {
    "bricks": "redbricks.jpg",
    "stone-chips": "Stone_Chips.jpg",
    "aggregate": "aggregate.jpg",
    "cement": "cement.jpg",
    "tmt-steel": "tmt-steel.jpg",
    "sand": "river-sand.jpg",
    "ac-blocks": "AAC_Blocks.jpg",
    "binding-wire": "binding_wire.jpg",
    "nails": "nail.jpg",
    "nariyal-rassi": "narival_rassi.jpg",
}


# ==========================================================
# MATERIAL IMAGE MIGRATION
# ==========================================================

async def migrate_material_images(db):
    """
    Convert old external image URLs to the local
    SahiRate material image filenames.

    Missing images and old external URLs are replaced.
    Existing local images are preserved.
    """

    for slug, filename in LOCAL_MATERIAL_IMAGES.items():

        material = await db.materials.find_one(
            {"slug": slug},
            {"image": 1},
        )

        if not material:
            continue

        current_image = material.get("image")

        # Set local image when image is missing
        # or when an old external URL is stored.
        if (
            not current_image
            or (
                isinstance(current_image, str)
                and (
                    current_image.startswith("http://")
                    or current_image.startswith("https://")
                )
            )
        ):
            await db.materials.update_one(
                {"slug": slug},
                {
                    "$set": {
                        "image": filename
                    }
                },
            )
# ==========================================================
# LIST MATERIALS
# ==========================================================

@router.get("")
async def list_materials(request: Request):

    db = request.app.state.mongodb

    # Automatically migrate old external images once.
    await migrate_material_images(db)

    materials = await db.materials.find(
        {},
        {"_id": 0},
    ).to_list(100)

    return materials


# ==========================================================
# MATERIAL DETAIL
# ==========================================================

@router.get("/{slug}")
async def material_detail(
    slug: str,
    request: Request,
):

    db = request.app.state.mongodb

    # Migrate missing or old external image
    if slug in LOCAL_MATERIAL_IMAGES:

        material_check = await db.materials.find_one(
            {"slug": slug},
            {"image": 1},
        )

        if material_check:

            current_image = material_check.get("image")

            if (
                not current_image
                or (
                    isinstance(current_image, str)
                    and (
                        current_image.startswith("http://")
                        or current_image.startswith("https://")
                    )
                )
            ):
                await db.materials.update_one(
                    {"slug": slug},
                    {
                        "$set": {
                            "image": LOCAL_MATERIAL_IMAGES[slug]
                        }
                    },
                )

    material = await db.materials.find_one(
        {"slug": slug},
        {"_id": 0},
    )

    if not material:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    dealers = await db.dealers.find(
        {"prices.material_slug": slug},
        {"_id": 0},
    ).to_list(500)

    comparison = []

    for d in dealers:

        for p in d["prices"]:

            if p["material_slug"] == slug:

                comparison.append(
                    {
                        "dealer_code": d["dealer_code"],
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
                    }
                )

    comparison.sort(
        key=lambda x: x["price"]
    )

    stats = compute_material_stats(dealers)

    material["stats"] = stats.get(
        slug,
        {},
    )

    material["comparison"] = comparison

    return material