"""
SahiRate SmartBuild - Foundation Calculation Rule
"""

FOUNDATION_RULE = {
    "types": {
        "footing": {
            "name": "RCC Footing",
            "requires_tmt": True,
        },
        "foundation_concrete": {
            "name": "Foundation Concrete",
            "requires_tmt": False,
        },
        "pcc_bed": {
            "name": "PCC Foundation Bed",
            "requires_tmt": False,
        },
    },

    # Preliminary estimation parameters.
    # Final structural quantities must follow approved design.
    "rcc": {
        "dry_volume_factor": 1.54,

        "nominal_mix": {
            "cement": 1,
            "sand": 2,
            "aggregate": 4,
        },

        "cement_bag_volume_m3": 0.0347,

        "tmt_kg_per_m3": 90,
    },

    "pcc": {
        "dry_volume_factor": 1.54,

        "nominal_mix": {
            "cement": 1,
            "sand": 4,
            "aggregate": 8,
        },

        "cement_bag_volume_m3": 0.0347,
    },

    "wastage": {
        "cement": 0.03,
        "sand": 0.03,
        "aggregate": 0.03,
        "tmt": 0.05,
    },

    "aggregate_specifications": {
        "20mm": {
            "name": "20 mm Aggregate",
            "application": [
                "RCC footing",
                "foundation concrete",
            ],
        },
        "40mm": {
            "name": "40 mm Aggregate",
            "application": [
                "PCC bed",
                "mass concrete",
                "large foundation sections",
            ],
        },
    },

    "default_rcc_aggregate": "20mm",
    "default_pcc_aggregate": "40mm",
}


def get_foundation_type(
    foundation_type: str,
) -> dict:

    try:
        return FOUNDATION_RULE[
            "types"
        ][foundation_type]
    except KeyError:
        valid = ", ".join(
            FOUNDATION_RULE[
                "types"
            ].keys()
        )

        raise ValueError(
            f"Unsupported foundation type: "
            f"{foundation_type}. Available: {valid}"
        )


def get_foundation_aggregate(
    foundation_type: str,
    requested_size: str | None = None,
) -> dict:

    if requested_size:
        size = requested_size
    elif foundation_type == "pcc_bed":
        size = FOUNDATION_RULE[
            "default_pcc_aggregate"
        ]
    else:
        size = FOUNDATION_RULE[
            "default_rcc_aggregate"
        ]

    try:
        return {
            "size": size,
            **FOUNDATION_RULE[
                "aggregate_specifications"
            ][size],
        }
    except KeyError:
        valid = ", ".join(
            FOUNDATION_RULE[
                "aggregate_specifications"
            ].keys()
        )

        raise ValueError(
            f"Unsupported foundation aggregate: "
            f"{size}. Available: {valid}"
        )
