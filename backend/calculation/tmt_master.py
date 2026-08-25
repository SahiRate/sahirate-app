"""
SahiRate SmartBuild - TMT Steel Master

TMT identity is separated into:
1. Brand
2. Grade
3. Diameter
4. Unit
5. Application

Rate remains a separate market-data layer.
"""

TMT_BRANDS = {

    "tata_tiscon": {
        "name": "Tata Tiscon",
        "parent_group": "Tata Steel",
        "official_website": "https://www.tatasteel.com/",
        "status": "MASTER_ENTRY",
    },

    "jindal_panther": {
        "name": "Jindal Panther",
        "parent_group": "Jindal Steel",
        "official_website": "https://www.jindalsteel.in/",
        "status": "MASTER_ENTRY",
    },

    "mongia_steel": {
        "name": "Mongia Steel",
        "parent_group": "Mongia Steel",
        "official_website": "https://mongiasteel.com/",
        "status": "MASTER_ENTRY",
    },

    "saluja_gold": {
        "name": "Saluja Gold",
        "parent_group": "Saluja",
        "official_website": "https://salujagold.com/",
        "status": "MASTER_ENTRY",
    },

    "kay2": {
        "name": "Kay2",
        "parent_group": "Kay2 Steel",
        "official_website": "https://www.kay2steel.com/",
        "status": "MASTER_ENTRY",
    },

    "captain": {
        "name": "Captain",
        "parent_group": "Captain Steel",
        "official_website": "https://www.captainsteel.com/",
        "status": "MASTER_ENTRY",
    },

    "kamdhenu": {
        "name": "Kamdhenu Steel",
        "parent_group": "Kamdhenu",
        "official_website": "https://www.kamdhenulimited.com/",
        "status": "MASTER_ENTRY",
    },

    "kamdhenu_gold": {
        "name": "Kamdhenu Gold",
        "parent_group": "Kamdhenu",
        "official_website": "https://www.kamdhenulimited.com/",
        "status": "MASTER_ENTRY",
    },

    "shyam_steel": {
        "name": "Shyam Steel",
        "parent_group": "Shyam Steel",
        "official_website": "https://shyamsteel.com/",
        "status": "MASTER_ENTRY",
    },

    "jsw_neosteel": {
        "name": "JSW Neosteel",
        "parent_group": "JSW",
        "official_website": "https://www.jswneosteel.in/",
        "status": "MASTER_ENTRY",
    },

    "srmb": {
        "name": "SRMB TMT",
        "parent_group": "SRMB",
        "official_website": "https://www.srmbsteel.com/",
        "status": "MASTER_ENTRY",
    },

    "essar": {
        "name": "Essar TMT",
        "parent_group": "Essar",
        "official_website": "https://stecol.co.in/",
        "status": "MASTER_ENTRY",
    },

    "rungta": {
        "name": "Rungta Steel",
        "parent_group": "Rungta Steel",
        "official_website": "https://www.rungtasteel.com/",
        "status": "MASTER_ENTRY",
    },

    "tufcon": {
        "name": "TUFCON",
        "parent_group": "TUFCON",
        "official_website": "https://tufcon.com/",
        "status": "MASTER_ENTRY",
    },

    "maithan": {
        "name": "Maithan Steel TMT",
        "parent_group": "Maithan Steel",
        "official_website": "https://www.maithansteel.com/",
        "status": "MASTER_ENTRY",
    },
}


TMT_GRADES = {

    "fe500": {
        "name": "Fe 500",
        "code": "Fe 500",
    },

    "fe500d": {
        "name": "Fe 500D",
        "code": "Fe 500D",
    },

    "fe550": {
        "name": "Fe 550",
        "code": "Fe 550",
    },

    "fe550d": {
        "name": "Fe 550D",
        "code": "Fe 550D",
    },

    "not_specified": {
        "name": "Grade Not Specified",
        "code": None,
    },
}


TMT_DIAMETERS = {

    "8mm": {
        "name": "8 mm",
        "diameter_mm": 8,
    },

    "10mm": {
        "name": "10 mm",
        "diameter_mm": 10,
    },

    "12mm": {
        "name": "12 mm",
        "diameter_mm": 12,
    },

    "16mm": {
        "name": "16 mm",
        "diameter_mm": 16,
    },

    "20mm": {
        "name": "20 mm",
        "diameter_mm": 20,
    },

    "25mm": {
        "name": "25 mm",
        "diameter_mm": 25,
    },

    "32mm": {
        "name": "32 mm",
        "diameter_mm": 32,
    },
}


TMT_UNITS = {

    "kg": {
        "name": "Kilogram",
        "symbol": "kg",
        "canonical": True,
    },

    "tonne": {
        "name": "Metric Tonne",
        "symbol": "T",
        "canonical": False,
    },
}


TMT_APPLICATIONS = {

    "rcc_slab": {
        "name": "RCC Slab",
    },

    "beam": {
        "name": "RCC Beam",
    },

    "column": {
        "name": "RCC Column",
    },

    "footing": {
        "name": "RCC Footing",
    },

    "foundation": {
        "name": "Foundation",
    },

    "other": {
        "name": "Other Reinforced Concrete Work",
    },
}


def get_tmt_brand(
    brand: str,
) -> dict:

    if brand not in TMT_BRANDS:
        raise ValueError(
            f"Unsupported TMT brand: {brand}"
        )

    return TMT_BRANDS[brand]


def get_tmt_grade(
    grade: str,
) -> dict:

    if grade not in TMT_GRADES:
        raise ValueError(
            f"Unsupported TMT grade: {grade}"
        )

    return TMT_GRADES[grade]


def get_tmt_diameter(
    diameter: str,
) -> dict:

    if diameter not in TMT_DIAMETERS:
        raise ValueError(
            f"Unsupported TMT diameter: {diameter}"
        )

    return TMT_DIAMETERS[diameter]


def get_tmt_unit(
    unit: str,
) -> dict:

    if unit not in TMT_UNITS:
        raise ValueError(
            f"Unsupported TMT unit: {unit}"
        )

    return TMT_UNITS[unit]


def build_tmt_selection(
    brand: str = "tata_tiscon",
    grade: str = "fe500d",
    diameter: str = "12mm",
    unit: str = "kg",
    application: str = "rcc_slab",
) -> dict:

    if application not in TMT_APPLICATIONS:
        raise ValueError(
            f"Unsupported TMT application: "
            f"{application}"
        )

    return {
        "material": "tmt_steel",

        "brand": {
            "slug": brand,
            **get_tmt_brand(brand),
        },

        "grade": {
            "slug": grade,
            **get_tmt_grade(grade),
        },

        "diameter": {
            "slug": diameter,
            **get_tmt_diameter(diameter),
        },

        "unit": {
            "slug": unit,
            **get_tmt_unit(unit),
        },

        "application": {
            "slug": application,
            **TMT_APPLICATIONS[
                application
            ],
        },

        "rate_status": "RATE_DATA_REQUIRED",
    }
