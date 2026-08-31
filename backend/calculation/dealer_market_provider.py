"""
SahiRate SmartBuild - Dealer Market Price Provider

Uses existing SahiRate dealer price observations.
No hard-coded market prices.
"""

from collections import defaultdict

from .cost import PriceProvider, Price


class DealerMarketPriceProvider(PriceProvider):
    """
    Converts current dealer price observations into
    SmartBuild-compatible benchmark rates.

    Market source:
        SahiRate dealer price records

    Important unit normalization:
        bricks     : per 1000 pieces -> per piece
        tmt-steel  : per quintal    -> per kg
        cement     : per bag        -> per bag
        sand       : per CFT        -> per CFT
        aggregate  : per CFT        -> per CFT
        stone-chips: per CFT        -> per CFT
    """

    NORMALIZATION = {
        "bricks": {
            "divisor": 1000.0,
            "unit": "piece",
            "market_unit": "per 1000 pieces",
        },
        "tmt-steel": {
            "divisor": 100.0,
            "unit": "kg",
            "market_unit": "per quintal (100kg)",
        },
        "cement": {
            "divisor": 1.0,
            "unit": "bag",
            "market_unit": "per bag (50kg)",
        },
        "sand": {
            "divisor": 1.0,
            "unit": "cft",
            "market_unit": "per CFT",
        },
        "aggregate": {
            "divisor": 1.0,
            "unit": "cft",
            "market_unit": "per CFT",
        },
        "stone-chips": {
            "divisor": 1.0,
            "unit": "cft",
            "market_unit": "per CFT",
        },
    }

    def __init__(self, dealers=None):
        self.dealers = dealers or []
        self.observations = self._collect_observations()

    def _collect_observations(self):
        observations = defaultdict(list)

        for dealer in self.dealers:
            for price in dealer.get("prices", []):
                slug = price.get("material_slug")
                value = price.get("price")

                if not slug or value is None:
                    continue

                try:
                    value = float(value)
                except (TypeError, ValueError):
                    continue

                observations[slug].append(
                    {
                        "price": value,
                        "dealer_id": dealer.get("id"),
                        "dealer_code": dealer.get("dealer_code"),
                        "dealer_name": dealer.get("name"),
                        "area": dealer.get("area"),
                        "verified": bool(
                            dealer.get("verified", False)
                        ),
                        "delivery": bool(
                            dealer.get("delivery", False)
                        ),
                        "in_stock": price.get(
                            "in_stock"
                        ),
                        "updated_at": price.get(
                            "updated_at"
                        ),
                    }
                )

        return observations

    def get_price(self, material_slug: str) -> Price | None:
        rows = self.observations.get(material_slug, [])

        if not rows:
            return None

        config = self.NORMALIZATION.get(material_slug)

        if not config:
            return None

        average_market_price = (
            sum(row["price"] for row in rows)
            / len(rows)
        )

        normalized_rate = (
            average_market_price
            / config["divisor"]
        )

        return Price(
            value=round(normalized_rate, 6),
            unit=config["unit"],
            source=(
                "SahiRate Deoghar dealer-market average "
                f"({len(rows)} listed observations)"
            ),
            status="MARKET_AVERAGE",
        )

    def get_labour_rate(self, role: str) -> Price | None:
        # Labour rates are intentionally not fabricated.
        # They will remain RATE_UNAVAILABLE until a
        # verified labour-rate source is connected.
        return None

    def market_summary(self, material_slugs=None):
        slugs = (
            material_slugs
            if material_slugs is not None
            else list(self.observations.keys())
        )

        summary = {}

        for slug in slugs:
            rows = self.observations.get(slug, [])

            if not rows:
                continue

            prices = [
                row["price"]
                for row in rows
            ]

            cheapest = min(
                rows,
                key=lambda row: row["price"],
            )

            config = self.NORMALIZATION.get(
                slug,
                {},
            )

            summary[slug] = {
                "market_min": min(prices),
                "market_max": max(prices),
                "market_avg": round(
                    sum(prices) / len(prices),
                    2,
                ),
                "market_unit": config.get(
                    "market_unit"
                ),
                "dealer_observations": len(rows),
                "verified_observations": sum(
                    1
                    for row in rows
                    if row["verified"]
                ),
                "lowest_listed_rate": cheapest[
                    "price"
                ],
                "lowest_listed_dealer": (
                    cheapest["dealer_name"]
                ),
                "lowest_listed_area": (
                    cheapest["area"]
                ),
                "lowest_listed_verified": (
                    cheapest["verified"]
                ),
                "lowest_listed_updated_at": (
                    cheapest["updated_at"]
                ),
            }

        return summary
