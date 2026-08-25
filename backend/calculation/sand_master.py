"""
SahiRate SmartBuild - Sand Master

Sand identity is separated from:
1. Sand type
2. Application
3. Source
4. Trading unit
5. Rate

This allows the calculator to recommend an appropriate sand type
based on the construction purpose without tying the material to
one local supplier.
"""

SAND_TYPES = {

    "river_sand": {
        "name": "River Sand",
        "category": "FINE_AGGREGATE",
        "description": (
            "Natural river sand used for concrete, masonry "
            "and other approved construction applications."
        ),
    },

    "coarse_sand": {
        "name": "Coarse Sand",
        "category": "FINE_AGGREGATE",
        "description": (
            "Coarser fine aggregate commonly used in concrete "
            "and masonry applications where specified."
        ),
    },

    "plaster_sand": {
        "name": "Plaster Sand",
        "category": "FINE_AGGREGATE",
        "description": (
            "Fine sand intended for plastering applications "
            "subject to applicable specification."
        ),
    },

    "masonry_sand": {
        "name": "Masonry Sand",
        "category": "FINE_AGGREGATE",
        "description": (
            "Sand used for masonry mortar where the applicable "
            "specification permits."
        ),
    },

    "manufactured_sand": {
        "name": "Manufactured Sand",
        "category": "FINE_AGGREGATE",
        "description": (
            "Processed crushed material used as fine aggregate "
            "where specification and grading requirements are met."
        ),
    },
}


SAND_APPLICATIONS = {

    "rcc": {
        "name": "RCC / Structural Concrete",
        "preferred_types": [
            "coarse_sand",
            "river_sand",
            "manufactured_sand",
        ],
    },

    "pcc": {
        "name": "PCC",
        "preferred_types": [
            "coarse_sand",
            "river_sand",
            "manufactured_sand",
        ],
    },

    "masonry": {
        "name": "Brick / Block Masonry",
        "preferred_types": [
            "masonry_sand",
            "river_sand",
            "coarse_sand",
        ],
    },

    "plaster": {
        "name": "Plastering",
        "preferred_types": [
            "plaster_sand",
            "river_sand",
        ],
    },

    "flooring": {
        "name": "Floor / Screed Work",
        "preferred_types": [
            "coarse_sand",
            "river_sand",
        ],
    },
}


SAND_SOURCES = {

    "local_river": {
        "name": "Local River Source",
        "region": "Deoghar",
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },

    "mayurakshi": {
        "name": "Mayurakshi",
        "region": "Deoghar",
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },

    "ajay": {
        "name": "Ajay",
        "region": "Deoghar",
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },

    "approved_local": {
        "name": "Approved Local Source",
        "region": "Deoghar",
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },

    "other": {
        "name": "Other / Local Source",
        "region": None,
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },
}


SAND_UNITS = {

    "cft": {
        "name": "Cubic Feet",
        "symbol": "CFT",
        "primary": True,
    },

    "tonne": {
        "name": "Metric Tonne",
        "symbol": "T",
        "primary": False,
    },
}


def get_sand_type(
    sand_type: str,
) -> dict:

    if sand_type not in SAND_TYPES:
        raise ValueError(
            f"Unsupported sand type: {sand_type}"
        )

    return SAND_TYPES[sand_type]


def get_sand_application(
    application: str,
) -> dict:

    if application not in SAND_APPLICATIONS:
        raise ValueError(
            f"Unsupported sand application: "
            f"{application}"
        )

    return SAND_APPLICATIONS[application]


def get_sand_source(
    source: str,
) -> dict:

    if source not in SAND_SOURCES:
        raise ValueError(
            f"Unsupported sand source: {source}"
        )

    return SAND_SOURCES[source]


def get_sand_unit(
    unit: str,
) -> dict:

    if unit not in SAND_UNITS:
        raise ValueError(
            f"Unsupported sand unit: {unit}"
        )

    return SAND_UNITS[unit]


def build_sand_selection(
    sand_type: str,
    application: str,
    source: str = "other",
    unit: str = "cft",
) -> dict:

    type_data = get_sand_type(
        sand_type
    )

    application_data = (
        get_sand_application(
            application
        )
    )

    source_data = get_sand_source(
        source
    )

    unit_data = get_sand_unit(
        unit
    )

    return {
        "material": "sand",

        "sand_type": {
            "slug": sand_type,
            **type_data,
        },

        "application": {
            "slug": application,
            **application_data,
        },

        "source": {
            "slug": source,
            **source_data,
        },

        "unit": {
            "slug": unit,
            **unit_data,
        },

        "rate_status": "RATE_DATA_REQUIRED",
    }


def recommended_sand_types(
    application: str,
) -> list:

    application_data = (
        get_sand_application(
            application
        )
    )

    return [
        {
            "slug": sand_type,
            **SAND_TYPES[sand_type],
        }
        for sand_type
        in application_data[
            "preferred_types"
        ]
    ]
