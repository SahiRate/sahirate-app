"""
SahiRate SmartBuild - Construction Reference Registry

References are metadata only at this stage.
A calculation rule must NOT become VERIFIED merely because
a reference is listed here. Verification requires a rule-level
mapping and review.
"""

REFERENCE_REGISTRY = {

    "IS_383_2016": {
        "title": "Coarse and Fine Aggregate for Concrete",
        "authority": "BIS",
        "code": "IS 383:2016",
        "scope": [
            "coarse aggregate",
            "fine aggregate",
            "aggregate grading",
            "aggregate sizes",
        ],
        "regions": ["India", "Jharkhand", "Bihar"],
        "status": "REFERENCE_IDENTIFIED",
    },

    "IS_2250_1981": {
        "title": "Code of Practice for Preparation and Use of Masonry Mortars",
        "authority": "BIS",
        "code": "IS 2250:1981",
        "scope": [
            "masonry mortar",
            "mortar preparation",
            "mortar use",
        ],
        "regions": ["India", "Jharkhand", "Bihar"],
        "status": "REFERENCE_IDENTIFIED",
    },

    "CPWD_SPECIFICATIONS_2009": {
        "title": "CPWD Specifications 2009",
        "authority": "CPWD",
        "code": "CPWD Specifications 2009",
        "scope": [
            "civil works",
            "concrete",
            "masonry",
            "plaster",
            "materials",
        ],
        "regions": ["India", "Jharkhand", "Bihar"],
        "status": "REFERENCE_IDENTIFIED",
    },

    "CPWD_DSR_2023": {
        "title": "Delhi Schedule of Rates 2023",
        "authority": "CPWD",
        "code": "DSR 2023",
        "scope": [
            "construction items",
            "material basis",
            "labour basis",
            "rate analysis",
        ],
        "regions": ["India", "Jharkhand", "Bihar"],
        "status": "REFERENCE_IDENTIFIED",
    },

    "BIHAR_BCD_SOR_2022": {
        "title": "Bihar Building Construction Department Schedule of Rates",
        "authority": "Bihar BCD",
        "code": "BCD SOR 2022",
        "scope": [
            "Bihar construction rates",
            "materials",
            "labour",
            "civil works",
        ],
        "regions": ["Bihar"],
        "status": "REFERENCE_IDENTIFIED",
    },

    "JHARKHAND_WAMIS": {
        "title": "Jharkhand Works Account Management Information System",
        "authority": "Government of Jharkhand",
        "code": "WAMIS",
        "scope": [
            "works",
            "schedule/rate information",
            "government works data",
        ],
        "regions": ["Jharkhand"],
        "status": "REFERENCE_IDENTIFIED",
    },

    "JHARKHAND_JSBCL_RATES": {
        "title": "Jharkhand State Building Construction Corporation rate information",
        "authority": "Government of Jharkhand",
        "code": "JSBCL Rate List",
        "scope": [
            "construction material rates",
            "government construction",
        ],
        "regions": ["Jharkhand"],
        "status": "REFERENCE_IDENTIFIED",
    },
}


def get_reference(reference_id: str) -> dict:

    reference = REFERENCE_REGISTRY.get(
        reference_id
    )

    if reference is None:
        raise ValueError(
            f"Unknown construction reference: "
            f"{reference_id}"
        )

    return reference


def references_for_region(
    region: str,
) -> list:

    return [
        {
            "id": reference_id,
            **reference,
        }
        for reference_id, reference
        in REFERENCE_REGISTRY.items()
        if region in reference["regions"]
    ]
