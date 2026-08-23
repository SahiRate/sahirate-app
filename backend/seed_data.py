"""Realistic seed data for SahiRate — Deoghar, Jharkhand building materials."""
from datetime import datetime, timezone, timedelta
import random

# ---------- MATERIAL CATEGORIES ----------
from master.materials import MATERIALS


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
            if slug not in MATERIAL_PRICE_BANDS:
                continue

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

