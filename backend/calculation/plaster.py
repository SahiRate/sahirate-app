"""
SahiRate SmartBuild - Plaster Calculation Rule
"""

PLASTER_RULE = {
    "default_thickness_mm": 12,

    "mortar_ratios": {
        "1:4": {
            "cement": 1,
            "sand": 4,
        },
        "1:6": {
            "cement": 1,
            "sand": 6,
        },
    },

    "dry_volume_factor": 1.33,

    "cement_bag_volume_m3": 0.0347,

    "wastage": {
        "cement": 0.05,
        "sand": 0.05,
    },

    "applications": {
        "internal": {
            "name": "Internal Wall Plaster",
            "default_thickness_mm": 12,
            "default_ratio": "1:6",
        },
        "external": {
            "name": "External Wall Plaster",
            "default_thickness_mm": 15,
            "default_ratio": "1:4",
        },
        "ceiling": {
            "name": "Ceiling Plaster",
            "default_thickness_mm": 12,
            "default_ratio": "1:4",
        },
    },
}


def get_plaster_application(
    application: str,
) -> dict:

    try:
        return PLASTER_RULE[
            "applications"
        ][application]
    except KeyError:
        valid = ", ".join(
            PLASTER_RULE[
                "applications"
            ].keys()
        )

        raise ValueError(
            f"Unsupported plaster application: "
            f"{application}. Available: {valid}"
        )


def get_mortar_ratio(
    ratio: str,
) -> dict:

    try:
        return PLASTER_RULE[
            "mortar_ratios"
        ][ratio]
    except KeyError:
        valid = ", ".join(
            PLASTER_RULE[
                "mortar_ratios"
            ].keys()
        )

        raise ValueError(
            f"Unsupported mortar ratio: "
            f"{ratio}. Available: {valid}"
        )
