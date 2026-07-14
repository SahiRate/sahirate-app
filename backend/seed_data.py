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
        "icon": "package",
        "avg_price": 420,
        "image": "https://images.unsplash.com/photo-1774946103680-3d34a461a581",
    },
    {
        "slug": "tmt-steel",
        "name": "TMT Steel",
        "unit": "per quintal (100kg)",
        "description": "Fe-500 & Fe-550 grade TMT bars — 8mm, 10mm, 12mm, 16mm, 20mm, 25mm.",
        "brands": ["Tata Tiscon", "SAIL", "JSW", "Kamdhenu", "Rathi", "Vizag"],
        "icon": "layers",
        "avg_price": 6850,
        "image": "https://images.unsplash.com/photo-1623428454598-1bfe414bac03",
    },
    {
        "slug": "bricks",
        "name": "Red Bricks",
        "unit": "per 1000 pieces",
        "description": "First-class red clay bricks fired to standard — ideal for load-bearing walls.",
        "brands": ["Local Kiln A", "Local Kiln B", "Machine Made"],
        "icon": "grid-3x3",
        "avg_price": 8500,
        "image": "https://images.unsplash.com/photo-1590725175785-de025df8f4b7?w=800",
    },
    {
        "slug": "sand",
        "name": "River Sand",
        "unit": "per CFT",
        "description": "Fine river sand for plastering & coarse sand for concrete mix.",
        "brands": ["Ajay River", "Mayurakshi", "Local Approved"],
        "icon": "waves",
        "avg_price": 52,
        "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    },
    {
        "slug": "stone-chips",
        "name": "Stone Chips",
        "unit": "per CFT",
        "description": "10mm & 20mm crushed stone aggregate for concrete and roadwork.",
        "brands": ["Local Quarry", "Pakur Black"],
        "icon": "mountain",
        "avg_price": 68,
        "image": "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800",
    },
    {
        "slug": "aggregate",
        "name": "Aggregate",
        "unit": "per CFT",
        "description": "40mm crushed aggregate for foundation, footing and heavy concrete work.",
        "brands": ["Local Quarry", "Approved Vendor"],
        "icon": "boxes",
        "avg_price": 62,
        "image": "https://images.unsplash.com/photo-1590055531615-f16d15a83c53?w=800",
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
        offered = random.sample([m["slug"] for m in MATERIALS], k=random.randint(4, 6))
        dealer_id = f"dealer_{i+1:02d}"
        prices = []
        for slug in offered:
            lo, hi = MATERIAL_PRICE_BANDS[slug]
            price = random.randint(lo, hi)
            prev = price + random.choice([-8, -4, -2, 0, 0, 2, 4, 6])
            trend = "down" if price < prev else ("up" if price > prev else "flat")
            prices.append({
                "material_slug": slug,
                "price": price,
                "previous_price": prev,
                "trend": trend,
                "updated_at": (datetime.now(timezone.utc) - timedelta(hours=random.randint(1, 20))).isoformat(),
                "in_stock": random.choice([True, True, True, False]),
            })
        dealers.append({
            "id": dealer_id,
            "name": name,
            "area": area,
            "city": "Deoghar",
            "state": "Jharkhand",
            "rating": rating,
            "reviews_count": random.randint(24, 180),
            "years_in_business": years,
            "phone": f"+91 9{random.randint(100000000, 999999999)}",
            "whatsapp": True,
            "verified": True if rating >= 4.5 else False,
            "delivery": random.choice([True, True, False]),
            "gst_registered": True,
            "prices": prices,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    return dealers


def compute_material_stats(dealers):
    """Aggregate min/max/avg per material across all dealers."""
    stats = {}
    for m in MATERIALS:
        slug = m["slug"]
        vals = [p["price"] for d in dealers for p in d["prices"] if p["material_slug"] == slug]
        if not vals:
            continue
        stats[slug] = {
            "min": min(vals),
            "max": max(vals),
            "avg": round(sum(vals) / len(vals), 2),
            "dealer_count": len(vals),
        }
    return stats
