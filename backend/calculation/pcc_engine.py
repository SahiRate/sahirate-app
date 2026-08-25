"""
SahiRate SmartBuild - PCC Calculation Engine
"""

from .pcc import (
    PCC_RULE,
    get_pcc_aggregate_specification,
)

from .labour import calculate_labour

from .cost import (
    calculate_material_cost,
    calculate_labour_cost,
)

from .registry import get_rule_metadata
from .aggregate_master import build_aggregate_selection
from .schema import standardize_estimate


def calculate_pcc(
    inputs,
    price_provider,
):
    required = [
        "length",
        "width",
        "thickness",
    ]

    missing = [
        field
        for field in required
        if field not in inputs
    ]

    if missing:
        raise ValueError(
            "Missing PCC inputs: "
            + ", ".join(missing)
        )

    length = float(inputs["length"])
    width = float(inputs["width"])
    thickness = float(inputs["thickness"])

    if length <= 0 or width <= 0 or thickness <= 0:
        raise ValueError(
            "Length, width and thickness "
            "must be greater than zero."
        )

    # Dimensions are expected in feet.
    wet_volume_cft = (
        length
        * width
        * thickness
    )

    wet_volume_m3 = (
        wet_volume_cft
        * 0.028316846592
    )

    dry_volume_m3 = (
        wet_volume_m3
        * PCC_RULE["dry_volume_factor"]
    )

    mix = PCC_RULE["nominal_mix"]

    mix_total = (
        mix["cement"]
        + mix["sand"]
        + mix["aggregate"]
    )

    cement_m3 = (
        dry_volume_m3
        * mix["cement"]
        / mix_total
    )

    sand_m3 = (
        dry_volume_m3
        * mix["sand"]
        / mix_total
    )

    aggregate_m3 = (
        dry_volume_m3
        * mix["aggregate"]
        / mix_total
    )

    cement_bags = (
        cement_m3
        / PCC_RULE["cement_bag_volume_m3"]
    )

    sand_cft = (
        sand_m3
        * 35.3146667215
    )

    aggregate_cft = (
        aggregate_m3
        * 35.3146667215
    )

    cement_bags *= (
        1 + PCC_RULE["wastage"]["cement"]
    )

    sand_cft *= (
        1 + PCC_RULE["wastage"]["sand"]
    )

    aggregate_cft *= (
        1 + PCC_RULE["wastage"]["aggregate"]
    )

    aggregate_size = inputs.get(
        "aggregate_size",
        PCC_RULE["default_aggregate"],
    )

    aggregate_spec = (
        get_pcc_aggregate_specification(
            aggregate_size
        )
    )

    aggregate_selection = (
        build_aggregate_selection(
            size=aggregate_size,
            application="pcc",
            source=inputs.get(
                "aggregate_source",
                "other",
            ),
            unit=inputs.get(
                "aggregate_unit",
                "cft",
            ),
        )
    )

    labour = calculate_labour(
        purpose="pcc",
        quantity_m3=wet_volume_m3,
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
        {
            "slug": "aggregate",
            "quantity": round(
                aggregate_cft,
                2,
            ),
            "unit": "cft",
            "specification": aggregate_size,
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
            "count": labour["mason"]["count"],
            "person_days": labour[
                "mason"
            ]["person_days"],
        },
        {
            "role": "helper",
            "count": labour["helper"]["count"],
            "person_days": labour[
                "helper"
            ]["person_days"],
        },
    ]

    priced_labour = []

    for item in labour_items:
        price = price_provider.get_labour_rate(
            item["role"]
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
        "purpose": "pcc",

        "rule": (
            "PCC Preliminary Estimation"
        ),

        "inputs": {
            "length_ft": length,
            "width_ft": width,
            "thickness_ft": thickness,
            "aggregate_size": aggregate_size,
        },

        "quantities": {
            "wet_volume_cft": round(
                wet_volume_cft,
                3,
            ),
            "wet_volume_m3": round(
                wet_volume_m3,
                3,
            ),
            "dry_volume_m3": round(
                dry_volume_m3,
                3,
            ),
            "cement_bags": round(
                cement_bags,
                2,
            ),
            "sand_cft": round(
                sand_cft,
                2,
            ),
            "aggregate_cft": round(
                aggregate_cft,
                2,
            ),
        },

        "aggregate_specification": (
            aggregate_spec
        ),

        "aggregate_selection": (
            aggregate_selection
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
        get_rule_metadata("pcc"),
    )



