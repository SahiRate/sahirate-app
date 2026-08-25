"""
SahiRate SmartBuild - Unit Conversion Layer
"""

UNIT_DIMENSIONS = {
    "piece": "count",
    "pcs": "count",

    "bag": "count",

    "kg": "mass",
    "tonne": "mass",

    "cft": "volume",
    "m3": "volume",

    "sqft": "area",
    "sqm": "area",

    "rft": "length",
    "ft": "length",
}

# Exact mathematical conversions only.
# Material-specific conversions such as aggregate CFT <-> tonne
# must NOT be hard-coded here.
CONVERSIONS = {
    ("kg", "tonne"): 0.001,
    ("tonne", "kg"): 1000.0,

    ("cft", "m3"): 0.028316846592,
    ("m3", "cft"): 35.3146667215,

    ("sqft", "sqm"): 0.09290304,
    ("sqm", "sqft"): 10.7639104167,

    ("rft", "ft"): 1.0,
    ("ft", "rft"): 1.0,
}


def convert(value: float, from_unit: str, to_unit: str) -> float:
    from_unit = from_unit.lower()
    to_unit = to_unit.lower()

    if from_unit == to_unit:
        return value

    if (from_unit, to_unit) not in CONVERSIONS:
        raise ValueError(
            f"No universal conversion available: "
            f"{from_unit} -> {to_unit}"
        )

    return value * CONVERSIONS[(from_unit, to_unit)]
