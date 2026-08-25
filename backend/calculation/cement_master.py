"""
SahiRate SmartBuild - Cement Master

Cement identity is separated into:
1. Brand
2. Parent company/group
3. Product
4. Grade/type
5. Pack size
6. Application

Market rate remains a separate layer.
"""

CEMENT_BRANDS = {

    "acc": {
        "name": "ACC",
        "parent_group": "Adani Cement",
        "official_website": "https://www.acclimited.com/",
        "status": "MASTER_ENTRY",
    },

    "ambuja": {
        "name": "Ambuja",
        "parent_group": "Adani Cement",
        "official_website": "https://www.ambujacement.com/",
        "status": "MASTER_ENTRY",
    },

    "ultratech": {
        "name": "UltraTech",
        "parent_group": "UltraTech",
        "official_website": "https://www.ultratechcement.com/",
        "status": "MASTER_ENTRY",
    },

    "shree": {
        "name": "Shree Cement",
        "parent_group": "Shree Cement",
        "official_website": "https://www.shreecement.com/",
        "status": "MASTER_ENTRY",
    },

    "nuvoco": {
        "name": "Nuvoco Cement",
        "parent_group": "Nuvoco Vistas Corp",
        "official_website": "https://www.nuvoco.com/",
        "status": "MASTER_ENTRY",
    },

    "dalmia": {
        "name": "Dalmia",
        "parent_group": "Dalmia Bharat",
        "official_website": "https://www.dalmiacement.com/",
        "status": "MASTER_ENTRY",
    },

    "emami": {
        "name": "Emami",
        "parent_group": "Emami Group",
        "official_website": "https://www.emamigroup.com/",
        "status": "MASTER_ENTRY",
    },
}


CEMENT_TYPES = {

    "opc": {
        "name": "Ordinary Portland Cement",
        "code": "OPC",
    },

    "ppc": {
        "name": "Portland Pozzolana Cement",
        "code": "PPC",
    },

    "psc": {
        "name": "Portland Slag Cement",
        "code": "PSC",
    },
}


CEMENT_GRADES = {

    "33": {
        "name": "33 Grade",
        "code": "33",
    },

    "43": {
        "name": "43 Grade",
        "code": "43",
    },

    "53": {
        "name": "53 Grade",
        "code": "53",
    },

    "not_specified": {
        "name": "Grade Not Specified",
        "code": None,
    },
}


CEMENT_PACK_SIZES = {

    "50kg": {
        "name": "50 kg Bag",
        "kg": 50,
        "unit": "bag",
        "canonical": True,
    },

    "25kg": {
        "name": "25 kg Bag",
        "kg": 25,
        "unit": "bag",
        "canonical": False,
    },

    "other": {
        "name": "Other Pack Size",
        "kg": None,
        "unit": "pack",
        "canonical": False,
    },
}


CEMENT_APPLICATIONS = {

    "rcc": {
        "name": "RCC / Structural Concrete",
    },

    "pcc": {
        "name": "PCC",
    },

    "masonry": {
        "name": "Brick / Block Masonry",
    },

    "plaster": {
        "name": "Plastering",
    },

    "flooring": {
        "name": "Floor / Screed Work",
    },

    "general": {
        "name": "General Construction",
    },
}


def get_cement_brand(
    brand: str,
) -> dict:

    if brand not in CEMENT_BRANDS:
        raise ValueError(
            f"Unsupported cement brand: {brand}"
        )

    return CEMENT_BRANDS[brand]


def get_cement_type(
    cement_type: str,
) -> dict:

    if cement_type not in CEMENT_TYPES:
        raise ValueError(
            f"Unsupported cement type: "
            f"{cement_type}"
        )

    return CEMENT_TYPES[cement_type]


def get_cement_grade(
    grade: str,
) -> dict:

    if grade not in CEMENT_GRADES:
        raise ValueError(
            f"Unsupported cement grade: {grade}"
        )

    return CEMENT_GRADES[grade]


def get_cement_pack_size(
    pack_size: str = "50kg",
) -> dict:

    if pack_size not in CEMENT_PACK_SIZES:
        raise ValueError(
            f"Unsupported cement pack size: "
            f"{pack_size}"
        )

    return CEMENT_PACK_SIZES[
        pack_size
    ]


def build_cement_selection(
    brand: str = "ultratech",
    cement_type: str = "ppc",
    grade: str = "not_specified",
    pack_size: str = "50kg",
    application: str = "general",
) -> dict:

    if application not in CEMENT_APPLICATIONS:
        raise ValueError(
            f"Unsupported cement application: "
            f"{application}"
        )

    return {
        "material": "cement",

        "brand": {
            "slug": brand,
            **get_cement_brand(brand),
        },

        "type": {
            "slug": cement_type,
            **get_cement_type(cement_type),
        },

        "grade": {
            "slug": grade,
            **get_cement_grade(grade),
        },

        "pack_size": {
            "slug": pack_size,
            **get_cement_pack_size(pack_size),
        },

        "application": {
            "slug": application,
            **CEMENT_APPLICATIONS[
                application
            ],
        },

        "rate_status": "RATE_DATA_REQUIRED",
    }
