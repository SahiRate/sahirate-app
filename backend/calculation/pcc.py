"""
SahiRate SmartBuild - PCC Calculation Rule
"""

PCC_RULE = {
    "dry_volume_factor": 1.54,

    # Preliminary nominal mix: 1 : 4 : 8
    # Final project specification can override this.
    "nominal_mix": {
        "cement": 1,
        "sand": 4,
        "aggregate": 8,
    },

    "cement_bag_volume_m3": 0.0347,

    "wastage": {
        "cement": 0.03,
        "sand": 0.03,
        "aggregate": 0.03,
    },

    "aggregate_specifications": {
        "20mm": {
            "name": "20 mm Aggregate",
            "application": [
                "general PCC",
                "floor base",
                "foundation bed",
            ],
        },
        "40mm": {
            "name": "40 mm Aggregate",
            "application": [
                "mass concrete",
                "heavy PCC",
                "large sections",
            ],
        },
    },

    "default_aggregate": "40mm",
}


def get_pcc_aggregate_specification(size=None):
    selected = (
        size
        or PCC_RULE["default_aggregate"]
    )

    try:
        return PCC_RULE[
            "aggregate_specifications"
        ][selected]
    except KeyError:
        valid = ", ".join(
            PCC_RULE[
                "aggregate_specifications"
            ].keys()
        )

        raise ValueError(
            f"Unsupported PCC aggregate size: "
            f"{selected}. Available: {valid}"
        )
