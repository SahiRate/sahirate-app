"""
SahiRate SmartBuild - Foundation Calculation Engine
"""

from .foundation import (
    FOUNDATION_RULE,
    get_foundation_type,
    get_foundation_aggregate,
)

from .labour import calculate_labour

from .cost import (
    calculate_material_cost,
    calculate_labour_cost,
)

from .registry import get_rule_metadata
from .aggregate_master import build_aggregate_selection
from .schema import standardize_estimate


def calculate_foundation(
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
            "Missing foundation inputs: "
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

    foundation_type = inputs.get(
        "foundation_type",
        "footing",
    )

    type_rule = get_foundation_type(
        foundation_type
    )

    wet_volume_cft = (
        length
        * width
        * thickness
    )

    wet_volume_m3 = (
        wet_volume_cft
        * 0.028316846592
    )

    material_items = []

    if foundation_type == "pcc_bed":

        mix = FOUNDATION_RULE[
            "pcc"
        ]["nominal_mix"]

        dry_factor = FOUNDATION_RULE[
            "pcc"
        ]["dry_volume_factor"]

        bag_volume = FOUNDATION_RULE[
            "pcc"
        ]["cement_bag_volume_m3"]

    else:

        mix = FOUNDATION_RULE[
            "rcc"
        ]["nominal_mix"]

        dry_factor = FOUNDATION_RULE[
            "rcc"
        ]["dry_volume_factor"]

        bag_volume = FOUNDATION_RULE[
            "rcc"
        ]["cement_bag_volume_m3"]

    dry_volume_m3 = (
        wet_volume_m3
        * dry_factor
    )

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
        / bag_volume
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
        1
        + FOUNDATION_RULE[
            "wastage"
        ]["cement"]
    )

    sand_cft *= (
        1
        + FOUNDATION_RULE[
            "wastage"
        ]["sand"]
    )

    aggregate_cft *= (
        1
        + FOUNDATION_RULE[
            "wastage"
        ]["aggregate"]
    )

    aggregate_spec = get_foundation_aggregate(
        foundation_type,
        inputs.get("aggregate_size"),
    )

    aggregate_selection = (
        build_aggregate_selection(
            size=aggregate_spec["size"],
            application=(
                "pcc"
                if foundation_type == "pcc_bed"
                else "footing"
            ),
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

    material_items.extend([
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
            "specification": aggregate_spec[
                "size"
            ],
        },
    ])

    # RCC footing reinforcement is intentionally optional.
    # If a structural/BBS-derived quantity is supplied,
    # the calculator can include it.
    tmt_kg = None

    if type_rule["requires_tmt"]:

        if "tmt_kg" in inputs:
            tmt_kg = float(
                inputs["tmt_kg"]
            )
        else:
            tmt_kg = (
                wet_volume_m3
                * FOUNDATION_RULE[
                    "rcc"
                ]["tmt_kg_per_m3"]
            )

            tmt_kg *= (
                1
                + FOUNDATION_RULE[
                    "wastage"
                ]["tmt"]
            )

        material_items.append({
            "slug": "tmt-steel",
            "quantity": round(
                tmt_kg,
                2,
            ),
            "unit": "kg",
            "specification": inputs.get(
                "tmt_grade",
                "Fe-500",
            ),
        })

    # Foundation labour is separate from brick/plaster labour.
    labour = calculate_labour(
        purpose="foundation",
        quantity_m3=wet_volume_m3,
        mason_count=inputs.get(
            "mason_count"
        ),
        helper_count=inputs.get(
            "helper_count"
        ),
    )

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
        "purpose": "foundation",

        "rule": (
            "Foundation Preliminary "
            "Estimation"
        ),

        "inputs": {
            "foundation_type": foundation_type,
            "length_ft": length,
            "width_ft": width,
            "thickness_ft": thickness,
            "aggregate_size": aggregate_spec[
                "size"
            ],
            "tmt_grade": inputs.get(
                "tmt_grade",
                "Fe-500",
            ),
        },

        "foundation_type": type_rule,

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
            "tmt_kg": (
                round(tmt_kg, 2)
                if tmt_kg is not None
                else None
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

        "engineering_note": (
            "Foundation dimensions, reinforcement "
            "and structural quantities must follow "
            "approved structural design."
        ),

        "status": (
            "PRELIMINARY_ESTIMATE"
        ),
    }

    return standardize_estimate(
        result,
        get_rule_metadata("foundation"),
    )



