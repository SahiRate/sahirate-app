# ============================================================
# SahiRate Material Master
# ============================================================
#
# Canonical, location-independent material master data.
# ============================================================
MATERIALS = [
    {
        "slug": "cement",
        "name": "Cement",
        "unit": "per bag (50kg)",
        "description": "OPC & PPC grade cement from leading brands for foundation, plaster and RCC work.",
        "brands": ["UltraTech", "ACC", "Ambuja", "Shree", "Ramco", "Dalmia"],
        "brand_catalog": [
    {
    "brand": "ACC",
    "parent_group": "Adani Cement",
    "official_website": "https://www.acclimited.com/",
    "market_status": "NOT_YET_VERIFIED",
    "products": [
        {
            "name": "HPC",
            "market_status": "NOT_YET_VERIFIED",
            "variants": [
                {
                    "grade": "",
                    "size": "50kg",
                    "market_status": "NOT_YET_VERIFIED"
                }
            ]
        }
    ],
    },

    {
    "brand": "Ambuja",
    "parent_group": "Adani Cement",
    "official_website": "https://www.ambujacement.com/",
    "market_status": "NOT_YET_VERIFIED",
    "products": [],
    },

    {
    "brand": "UltraTech",
    "parent_group": "UltraTech",
    "official_website": "https://www.ultratechcement.com/",
    "market_status": "NOT_YET_VERIFIED",
    "products": [
        {
            "name": "Weather Plus",
            "market_status": "NOT_YET_VERIFIED",
            "variants": []
        }
    ],
    },


    {
        "brand": "Shree Cement",
        "parent_group": "Shree Cement",
        "official_website": "https://www.shreecement.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },

    {
        "brand": "Nuvoco Cement",
        "parent_group": "Nuvoco Vistas Corp",
        "official_website": "https://www.nuvoco.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },

    {
        "brand": "Dalmia",
        "parent_group": "Dalmia Bharat",
        "official_website": "https://www.dalmiacement.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Emami",
        "parent_group": "Emami Group",
        "official_website": "https://www.emamigroup.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
],
        "icon": "package",
        "avg_price": 420,
        "image": "cement.jpg",
    },
    {
        "slug": "tmt-steel",
        "name": "TMT Steel",
        "unit": "per quintal (100kg)",
        "description": "Fe-500 & Fe-550 grade TMT bars — 8mm, 10mm, 12mm, 16mm, 20mm, 25mm.",
        "brands": ["Tata Tiscon", "SAIL", "JSW", "Kamdhenu", "Rathi", "Vizag"],
        "brand_catalog": [
    {
        "brand": "Tata Tiscon",
        "parent_group": "Tata Steel",
        "official_website": "https://www.tatasteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Jindal Panther",
        "parent_group": "Jindal Steel",
        "official_website": "https://www.jindalsteel.in/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Mongia Steel",
        "parent_group": "Mongia Steel",
        "official_website": "https://mongiasteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Saluja Gold",
        "parent_group": "Saluja",
        "official_website": "https://salujagold.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Kay2",
        "parent_group": "Kay2 Steel",
        "official_website": "https://www.kay2steel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Captain",
        "parent_group": "Captain Steel",
        "official_website": "https://www.captainsteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Kamdhenu Steel",
        "parent_group": "Kamdhenu",
        "official_website": "https://www.kamdhenulimited.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Kamdhenu Gold",
        "parent_group": "Kamdhenu",
        "official_website": "https://www.kamdhenulimited.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Shyam Steel",
        "parent_group": "Shyam Steel",
        "official_website": "https://shyamsteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "JSW Neosteel",
        "parent_group": "JSW",
        "official_website": "https://www.jswneosteel.in/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "SRMB TMT",
        "parent_group": "SRMB",
        "official_website": "https://www.srmbsteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Essar TMT",
        "parent_group": "Essar",
        "official_website": "https://stecol.co.in/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Rungta Steel",
        "parent_group": "Rungta Steel",
        "official_website": "https://www.rungtasteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "TUFCON",
        "parent_group": "TUFCON",
        "official_website": "https://tufcon.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
    {
        "brand": "Maithan Steel TMT",
        "parent_group": "Maithan Steel",
        "official_website": "https://www.maithansteel.com/",
        "market_status": "NOT_YET_VERIFIED",
        "products": [],
    },
],
        "icon": "layers",
        "avg_price": 6850,
        "image": "tmt-steel.jpg",
    },
    {
        "slug": "bricks",
        "name": "Red Bricks",
        "unit": "per 1000 pieces",
        "description": "First-class red clay bricks fired to standard — ideal for load-bearing walls.",
        "brands": ["Local Kiln A", "Local Kiln B", "Machine Made"],
        "icon": "grid-3x3",
        "avg_price": 8500,
        "image": "redbricks.jpg",
    },
    {
        "slug": "sand",
        "name": "River Sand",
        "unit": "per CFT",
        "description": "Fine river sand for plastering & coarse sand for concrete mix.",
        "brands": ["Ajay River", "Mayurakshi", "Local Approved"],
        "icon": "waves",
        "avg_price": 52,
        "image": "river-sand.jpg",
    },
    {
        "slug": "stone-chips",
        "name": "Stone Chips",
        "unit": "per CFT",
        "description": "10mm & 20mm crushed stone aggregate for concrete and roadwork.",
        "brands": ["Local Quarry", "Pakur Black"],
        "icon": "mountain",
        "avg_price": 68,
        "image": "Stone_Chips.jpg",
    },
    {
        "slug": "aggregate",
        "name": "Aggregate",
        "unit": "per CFT",
        "description": "40mm crushed aggregate for foundation, footing and heavy concrete work.",
        "brands": ["Local Quarry", "Approved Vendor"],
        "icon": "boxes",
        "avg_price": 62,
        "image": "aggregate.jpg",
    },
        {
        "slug": "ac-blocks",
        "name": "AAC Blocks",
        "unit": "Per piece",
        "description": "Lightweight AAC blocks used for wall construction, offering easy handling and good thermal insulation.",
        "brands": ["Magicrete", "Biltech", "Aerocon"],
        "icon": "blocks",
        "avg_price": 0,
        "image": "AAC_Blocks.jpg",
        "category": "Blocks & Bricks",
    },
]
