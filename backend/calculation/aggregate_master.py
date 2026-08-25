"""
SahiRate SmartBuild - Aggregate Master

Aggregate identity is separated from:
1. Size
2. Application
3. Source / Crusher
4. Trading unit
5. Rate

This prevents future scaling problems when local suppliers,
crusher sources or market rates change.
"""

AGGREGATE_SIZES = {
    "10mm": {
        "name": "10 mm Aggregate",
        "nominal_size_mm": 10,
        "type": "COARSE_AGGREGATE",
    },

    "12.5mm": {
        "name": "12.5 mm Aggregate",
        "nominal_size_mm": 12.5,
        "type": "COARSE_AGGREGATE",
    },

    "16mm": {
        "name": "16 mm Aggregate",
        "nominal_size_mm": 16,
        "type": "COARSE_AGGREGATE",
    },

    "20mm": {
        "name": "20 mm Aggregate",
        "nominal_size_mm": 20,
        "type": "COARSE_AGGREGATE",
    },

    "40mm": {
        "name": "40 mm Aggregate",
        "nominal_size_mm": 40,
        "type": "COARSE_AGGREGATE",
    },
}


AGGREGATE_APPLICATIONS = {

    "rcc_slab": {
        "name": "RCC Slab",
        "preferred_sizes": [
            "20mm",
        ],
    },

    "beam": {
        "name": "RCC Beam",
        "preferred_sizes": [
            "20mm",
        ],
    },

    "column": {
        "name": "RCC Column",
        "preferred_sizes": [
            "20mm",
        ],
    },

    "footing": {
        "name": "RCC Footing",
        "preferred_sizes": [
            "20mm",
        ],
    },

    "pcc": {
        "name": "PCC",
        "preferred_sizes": [
            "40mm",
            "20mm",
        ],
    },

    "floor_concrete": {
        "name": "Floor Concrete",
        "preferred_sizes": [
            "20mm",
        ],
    },

    "mass_concrete": {
        "name": "Mass Concrete",
        "preferred_sizes": [
            "40mm",
        ],
    },
}


AGGREGATE_SOURCES = {
    "saras_dangal": {
        "name": "Saras Dangal",
        "region": "Deoghar",
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },

    "mirjachauki": {
        "name": "Mirjachauki",
        "region": "Sahibganj",
        "state": "Jharkhand",
        "status": "LOCAL_SOURCE",
    },

    "pakur": {
        "name": "Pakur",
        "region": "Pakur",
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


AGGREGATE_UNITS = {
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


def get_aggregate_size(size: str) -> dict:

    if size not in AGGREGATE_SIZES:
        raise ValueError(
            f"Unsupported aggregate size: {size}"
        )

    return AGGREGATE_SIZES[size]


def get_aggregate_application(
    application: str,
) -> dict:

    if application not in AGGREGATE_APPLICATIONS:
        raise ValueError(
            f"Unsupported aggregate application: "
            f"{application}"
        )

    return AGGREGATE_APPLICATIONS[
        application
    ]


def get_aggregate_source(
    source: str,
) -> dict:

    if source not in AGGREGATE_SOURCES:
        raise ValueError(
            f"Unsupported aggregate source: "
            f"{source}"
        )

    return AGGREGATE_SOURCES[source]


def get_aggregate_unit(
    unit: str,
) -> dict:

    if unit not in AGGREGATE_UNITS:
        raise ValueError(
            f"Unsupported aggregate unit: {unit}"
        )

    return AGGREGATE_UNITS[unit]


def build_aggregate_selection(
    size: str,
    application: str,
    source: str = "other",
    unit: str = "cft",
) -> dict:

    size_data = get_aggregate_size(size)
    application_data = (
        get_aggregate_application(
            application
        )
    )
    source_data = get_aggregate_source(source)
    unit_data = get_aggregate_unit(unit)

    return {
        "material": "aggregate",

        "size": {
            "slug": size,
            **size_data,
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
