"""Realistic seed data for SahiRate — Deoghar, Jharkhand building materials."""
from datetime import datetime, timezone, timedelta
import random

# ---------- MATERIAL CATEGORIES ----------
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
            {"name": "HPC"},
            {"name": "F2R"},
            {"name": "Gold"},
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
            {"name": "Weather Plus"},
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

# ---------- DEALERS ----------
DEALER_NAMES = [
    ("Shree Balaji Building Materials", "Jasidih Road", 4.7, 8),
    ("Deoghar Cement Bhandar", "Castairs Town", 4.5, 12),
    ("Maa Tara Steel & Cement", "Baidyanath Chowk", 4.8, 15),
    ("Ganpati Construction Supplies", "Bompas Town", 4.4, 6),
    ("Jai Hind Traders", "Karnibad", 4.6, 10),
    ("Krishna Building House", "Rikhia Road", 4.3, 5),
    ("Trimurti Cement Agency", "Barmasia", 4.7, 11),
    ("Bharat Steel Corporation", "Tower Chowk", 4.9, 14),
    ("Shiv Shakti Enterprises", "Jasidih Station Road", 4.5, 9),
    ("New Deoghar Traders", "Court Road", 4.2, 7),
    ("Om Sai Building Materials", "Kunda", 4.6, 8),
    ("Radhe Radhe Steel", "Sarath Road", 4.5, 6),
    ("Vishwakarma Cement Store", "Chandan Nagar", 4.4, 5),
    ("Anand Construction Depot", "Deoghar Bypass", 4.8, 13),
    ("Ma Ganga Traders", "Bhagalpur Road", 4.6, 9),
]

MATERIAL_PRICE_BANDS = {
    "cement":       (395, 445),
    "tmt-steel":    (6650, 7100),
    "bricks":       (7800, 9200),
    "sand":         (46, 58),
    "stone-chips":  (62, 76),
    "aggregate":    (56, 68),
}

def build_dealers():
    dealers = []

    for i, (name, area, rating, years) in enumerate(DEALER_NAMES):

        # each dealer offers a random subset (at least 4 materials)
        offered = random.sample(
            [m["slug"] for m in MATERIALS],
            k=random.randint(4, 6),
        )

        dealer_code = f"SR-DLR-{i+1:08d}"

        prices = []

        for slug in offered:
            lo, hi = MATERIAL_PRICE_BANDS[slug]

            price = random.randint(lo, hi)

            prev = price + random.choice(
                [-8, -4, -2, 0, 0, 2, 4, 6]
            )

            trend = (
                "down"
                if price < prev
                else (
                    "up"
                    if price > prev
                    else "flat"
                )
            )

            prices.append(
                {
                    "material_slug": slug,
                    "price": price,
                    "previous_price": prev,
                    "trend": trend,
                    "updated_at": (
                        datetime.now(timezone.utc)
                        - timedelta(hours=random.randint(1, 20))
                    ).isoformat(),
                    "in_stock": random.choice(
                        [True, True, True, False]
                    ),
                }
            )

        dealers.append(
            {
                "dealer_code": dealer_code,

                # Basic Information
                "name": name,
                "owner_name": None,

                # Business
                "business_categories": [],
                "gst_number": None,

                # Contact
                "phone": f"+91 9{random.randint(100000000, 999999999)}",
                "alternate_phone": None,
                "email": None,
                "website": None,

                # Address
                "address": None,
                "area": area,
                "city": "Deoghar",
                "state": "Jharkhand",
                "pincode": None,

                # Business Details
                "years_in_business": years,
                "description": None,

                # Services
                "delivery": random.choice(
                    [True, True, False]
                ),
                "whatsapp": True,

                # Status
                "verified": rating >= 4.5,

                # Rating
                "rating": rating,
                "reviews_count": random.randint(24, 180),

                # Media
                "logo": None,
                "cover_image": None,
                "gallery": [],

                # Prices
                "prices": prices,

                # Audit
                "created_at": datetime.now(
                    timezone.utc
                ).isoformat(),
            }
        )

    return dealers


def compute_material_stats(dealers):
    """Aggregate min/max/avg per material across all dealers."""

    stats = {}

    for m in MATERIALS:
        slug = m["slug"]

        vals = [
            p["price"]
            for d in dealers
            for p in d["prices"]
            if p["material_slug"] == slug
        ]

        if not vals:
            continue

        stats[slug] = {
            "min": min(vals),
            "max": max(vals),
            "avg": round(sum(vals) / len(vals), 2),
            "dealer_count": len(vals),
        }

    return stats
