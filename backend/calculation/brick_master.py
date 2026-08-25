"""
SahiRate SmartBuild - Brick Master

Canonical quantity unit:
    piece

Local Deoghar trade/load unit:
    1500 pieces

The 1500-piece load is a trade/transport representation and
must never replace the canonical piece unit.

Brick class/number and quality grade remain separate dimensions.
"""

BRICK_NUMBERS = {

    "1_number": {
        "name": "1 Number Brick",
        "number": 1,
        "quality_class": "SUPERIOR",
        "status": "LOCAL_MARKET_CLASSIFICATION",
    },

    "2_number": {
        "name": "2 Number Brick",
        "number": 2,
        "quality_class": "STANDARD",
        "status": "LOCAL_MARKET_CLASSIFICATION",
    },

    "3_number": {
        "name": "3 Number Brick",
        "number": 3,
        "quality_class": "LOWER",
        "status": "LOCAL_MARKET_CLASSIFICATION",
    },
}


BRICK_QUALITY_GRADES = {

    "A": {
        "name": "A Grade",
        "class": "SUPERIOR",
        "status": "LOCAL_MARKET_CLASSIFICATION",
    },

    "B": {
        "name": "B Grade",
        "class": "STANDARD",
        "status": "LOCAL_MARKET_CLASSIFICATION",
    },

    "C": {
        "name": "C Grade",
        "class": "LOWER",
        "status": "LOCAL_MARKET_CLASSIFICATION",
    },
}


BRICK_UNITS = {

    "piece": {
        "name": "Piece",
        "symbol": "pc",
        "canonical": True,
    },

    "load_1500": {
        "name": "Deoghar Trade Load",
        "symbol": "1500 pc",
        "pieces": 1500,
        "canonical": False,
        "region": "Deoghar",
        "state": "Jharkhand",
        "status": "LOCAL_TRADE_UNIT",
    },
}


BRICK_APPLICATIONS = {

    "masonry": {
        "name": "Brick Masonry",
    },

    "partition": {
        "name": "Brick Partition",
    },

    "boundary_wall": {
        "name": "Boundary Wall",
    },

    "other": {
        "name": "Other Brick Work",
    },
}


def get_brick_number(
    brick_number: str,
) -> dict:

    if brick_number not in BRICK_NUMBERS:
        raise ValueError(
            f"Unsupported brick number: "
            f"{brick_number}"
        )

    return BRICK_NUMBERS[brick_number]


def get_brick_grade(
    grade: str,
) -> dict:

    grade = grade.upper()

    if grade not in BRICK_QUALITY_GRADES:
        raise ValueError(
            f"Unsupported brick grade: {grade}"
        )

    return BRICK_QUALITY_GRADES[grade]


def get_brick_unit(
    unit: str,
) -> dict:

    if unit not in BRICK_UNITS:
        raise ValueError(
            f"Unsupported brick unit: {unit}"
        )

    return BRICK_UNITS[unit]


def pieces_to_1500_loads(
    pieces: float,
) -> float:

    if pieces < 0:
        raise ValueError(
            "Brick quantity cannot be negative."
        )

    return pieces / 1500.0


def loads_to_pieces(
    loads: float,
) -> float:

    if loads < 0:
        raise ValueError(
            "Brick load quantity cannot be negative."
        )

    return loads * 1500.0


def build_brick_selection(
    brick_number: str = "1_number",
    grade: str = "A",
    application: str = "masonry",
    unit: str = "piece",
) -> dict:

    number_data = get_brick_number(
        brick_number
    )

    grade_data = get_brick_grade(
        grade
    )

    unit_data = get_brick_unit(
        unit
    )

    if application not in BRICK_APPLICATIONS:
        raise ValueError(
            f"Unsupported brick application: "
            f"{application}"
        )

    return {
        "material": "bricks",

        "brick_number": {
            "slug": brick_number,
            **number_data,
        },

        "quality_grade": {
            "slug": grade.upper(),
            **grade_data,
        },

        "application": {
            "slug": application,
            **BRICK_APPLICATIONS[
                application
            ],
        },

        "unit": {
            "slug": unit,
            **unit_data,
        },

        "canonical_unit": "piece",

        "trade_unit": {
            "slug": "load_1500",
            **BRICK_UNITS["load_1500"],
        },

        "rate_status": "RATE_DATA_REQUIRED",
    }
