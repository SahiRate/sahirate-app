"""
SahiRate SmartBuild - Plaster Calculation Engine
"""

from .plaster import (
    PLASTER_RULE,
    get_plaster_application,
    get_mortar_ratio,
)

from .labour import calculate_labour

from .cost import (
    calculate_material_cost,
    calculate_labour_cost,
)

from .registry import get_rule_metadata
from .schema import standardize_estimate


def calculate_plaster(
    inputs,
    price_provider,
):

    if "area" not in inputs:
        raise ValueError(
            "Missing plaster input: area"
        )

    area = float(inputs["area"])

    if area <= 0:
        raise ValueError(
            "Plaster area must be greater than zero."
        )

    application = inputs.get(
        "application",
        "internal",
    )

    application_rule = (
        get_plaster_application(
            application
        )
    )

    thickness_mm = float(
        inputs.get(
            "thickness_mm",
            application_rule[
                "default_thickness_mm"
            ],
        )
    )

    if thickness_mm <= 0:
        raise ValueError(
            "Plaster thickness must be greater than zero."
        )

    ratio = inputs.get(
        "mortar_ratio",
        application_rule[
            "default_ratio"
        ],
    )

    mix = get_mortar_ratio(ratio)

    thickness_m = (
        thickness_mm / 1000
    )

    wet_mortar_m3 = (
        area
        * 0.09290304
        * thickness_m
    )

    dry_mortar_m3 = (
        wet_mortar_m3
        * PLASTER_RULE[
            "dry_volume_factor"
        ]
    )

    mix_total = (
        mix["cement"]
        + mix["sand"]
    )

    cement_m3 = (
        dry_mortar_m3
        * mix["cement"]
        / mix_total
    )

    sand_m3 = (
        dry_mortar_m3
        * mix["sand"]
        / mix_total
    )

    cement_bags = (
        cement_m3
        / PLASTER_RULE[
            "cement_bag_volume_m3"
        ]
    )

    sand_cft = (
        sand_m3
        * 35.3146667215
    )

    cement_bags *= (
        1
        + PLASTER_RULE[
            "wastage"
        ]["cement"]
    )

    sand_cft *= (
        1
        + PLASTER_RULE[
            "wastage"
        ]["sand"]
    )

    labour = calculate_labour(
        purpose="plaster",
        quantity_m3=wet_mortar_m3,
        mason_count=inputs.get(
            "mason_count"
        ),
        helper_count=inputs.get(
            "helper_count"
        ),
    )

    material_items = [
        {
            "slug": "cement",
            "quantity": round(
                cement_bags,
                2,
            ),
            "unit": "bag",
        },
        {
            "slug": "sand",
            "quantity": round(
                sand_cft,
                2,
            ),
            "unit": "cft",
        },
    ]

    priced_materials = []

    for item in material_items:

        price = price_provider.get_price(
            item["slug"]
        )

        priced_materials.append(
            {
                **item,
                **calculate_material_cost(
                    item["quantity"],
                    price,
                ),
            }
        )

    labour_items = [
        {
            "role": "mason",
            "count": labour[
                "mason"
            ]["count"],
            "person_days": labour[
                "mason"
            ]["person_days"],
        },
        {
            "role": "helper",
            "count": labour[
                "helper"
            ]["count"],
            "person_days": labour[
                "helper"
            ]["person_days"],
        },
    ]

    priced_labour = []

    for item in labour_items:

        price = (
            price_provider
            .get_labour_rate(
                item["role"]
            )
        )

        priced_labour.append(
            {
                **item,
                **calculate_labour_cost(
                    item["person_days"],
                    price,
                ),
            }
        )

    material_total = sum(
        item["amount"]
        for item in priced_materials
        if item["amount"] is not None
    )

    labour_total = sum(
        item["amount"]
        for item in priced_labour
        if item["amount"] is not None
    )

    rates_missing = any(
        item["amount"] is None
        for item in (
            priced_materials
            + priced_labour
        )
    )

    grand_total = None

    if not rates_missing:
        grand_total = round(
            material_total
            + labour_total,
            2,
        )

    result = {
        "purpose": "plaster",

        "rule": (
            "Plaster Preliminary Estimation"
        ),

        "inputs": {
            "area_sqft": area,
            "application": application,
            "thickness_mm": thickness_mm,
            "mortar_ratio": ratio,
        },

        "quantities": {
            "area_sqft": round(
                area,
                2,
            ),
            "wet_mortar_m3": round(
                wet_mortar_m3,
                4,
            ),
            "dry_mortar_m3": round(
                dry_mortar_m3,
                4,
            ),
            "cement_bags": round(
                cement_bags,
                2,
            ),
            "sand_cft": round(
                sand_cft,
                2,
            ),
        },

        "application": (
            application_rule
        ),

        "materials": priced_materials,

        "labour": priced_labour,

        "duration": {
            "estimated_days": round(
                labour[
                    "estimated_duration_days"
                ],
                2,
            ),
        },

        "cost": {
            "material_total": round(
                material_total,
                2,
            ),
            "labour_total": round(
                labour_total,
                2,
            ),
            "grand_total": grand_total,
            "status": (
                "COMPLETE"
                if grand_total is not None
                else "RATE_DATA_REQUIRED"
            ),
        },

        "status": (
            "PRELIMINARY_ESTIMATE"
        ),
    }

    return standardize_estimate(
        result,
        get_rule_metadata("plaster"),
    )


