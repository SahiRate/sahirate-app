"""
SahiRate SmartBuild - Construction Calculation Rules

Rules are configurable estimation rules.
Engineering/reference values must be versioned and verified before
being presented as final structural design values.
"""

CALCULATION_RULES = {
    "brick_wall": {
        "name": "Brick Wall",
        "inputs": ["length", "height", "thickness"],
        "output_materials": ["bricks", "cement", "sand"],
        "status": "ESTIMATION_RULE",
    },

    "rcc_slab": {
        "name": "RCC Roof Slab",
        "inputs": ["length", "width", "thickness"],
        "output_materials": [
            "cement",
            "sand",
            "aggregate",
            "tmt-steel",
        ],
        "status": "ESTIMATION_RULE",
    },

    "pcc": {
        "name": "Plain Cement Concrete",
        "inputs": ["length", "width", "thickness"],
        "output_materials": [
            "cement",
            "sand",
            "aggregate",
        ],
        "status": "ESTIMATION_RULE",
    },

    "plaster": {
        "name": "Wall Plaster",
        "inputs": ["area", "thickness"],
        "output_materials": ["cement", "sand"],
        "status": "ESTIMATION_RULE",
    },
}


def get_rule(purpose: str) -> dict:
    try:
        return CALCULATION_RULES[purpose]
    except KeyError:
        raise ValueError(
            f"Unknown construction purpose: {purpose}"
        )


# ============================================================
# BRICK WALL
# ============================================================

BRICK_RULE = {
    "brick_size_mm": (190, 90, 90),
    "nominal_mortar_joint_mm": 10,
    "bricks_per_m3": 1000,
    "mortar_wet_to_dry_factor": 1.33,
    "mortar_fraction": 0.25,

    "wastage": {
        "bricks": 0.05,
        "cement": 0.05,
        "sand": 0.05,
    },

    "brick_grades": {
        "A": {
            "name": "1 Number",
            "class": "Superior",
        },
        "B": {
            "name": "2 Number",
            "class": "Standard",
        },
        "C": {
            "name": "3 Number",
            "class": "Economy",
        },
    },

    "trade_unit": {
        "name": "tractor",
        "typical_quantity": 1500,
        "quantity_unit": "piece",
    },
}


# ============================================================
# RCC / CONCRETE
# ============================================================

RCC_RULE = {
    # Preliminary estimation parameters.
    # These are NOT structural design specifications.
    "dry_volume_factor": 1.54,

    # Initial configurable nominal mix.
    # Final project-specific mix must follow approved design/specification.
    "nominal_mix": {
        "cement": 1,
        "sand": 2,
        "aggregate": 4,
    },

    "cement_bag_volume_m3": 0.0347,

    "wastage": {
        "cement": 0.03,
        "sand": 0.03,
        "aggregate": 0.03,
        "tmt-steel": 0.05,
    },

    # Preliminary reinforcement estimate.
    # Must be replaced by structural/BBS-derived quantity where available.
    "tmt_kg_per_m3": 90,

    "aggregate_specifications": {
        "10mm": {
            "name": "10 mm Aggregate",
            "application": [
                "RCC",
                "thin_sections",
                "congested_reinforcement",
            ],
        },
        "12.5mm": {
            "name": "12.5 mm Aggregate",
            "application": [
                "RCC",
                "general_concrete",
            ],
        },
        "20mm": {
            "name": "20 mm Aggregate",
            "application": [
                "RCC",
                "slab",
                "beam",
                "column",
                "foundation",
                "floor_concrete",
            ],
        },
        "25mm": {
            "name": "25 mm Aggregate",
            "application": [
                "heavy_concrete",
                "foundation",
            ],
        },
        "40mm": {
            "name": "40 mm Aggregate",
            "application": [
                "PCC",
                "mass_concrete",
                "large_sections",
            ],
        },
    },

    "default_aggregate": "20mm",
}


def get_aggregate_specification(size: str | None = None) -> dict:
    selected = size or RCC_RULE["default_aggregate"]

    try:
        return RCC_RULE["aggregate_specifications"][selected]
    except KeyError:
        valid = ", ".join(
            RCC_RULE["aggregate_specifications"].keys()
        )
        raise ValueError(
            f"Unsupported aggregate size: {selected}. "
            f"Available: {valid}"
        )
