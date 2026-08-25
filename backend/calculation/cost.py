"""
SahiRate SmartBuild - Cost / Price Layer

The calculation engine should never hard-code market prices.
Rates are supplied by a provider so live/local price data can
be connected later without changing calculation formulas.
"""

from dataclasses import dataclass


@dataclass
class Price:
    value: float
    unit: str
    source: str = "SAHIRATE"
    status: str = "ESTIMATED"


class PriceProvider:
    """
    Base price provider.

    Later this can read from the SahiRate market-price database/API.
    """

    def get_price(self, material_slug: str) -> Price | None:
        return None

    def get_labour_rate(self, role: str) -> Price | None:
        return None


class StaticPriceProvider(PriceProvider):
    """
    Temporary development provider.

    These are NOT live market rates.
    Missing values intentionally return None.
    """

    def __init__(
        self,
        material_prices: dict | None = None,
        labour_rates: dict | None = None,
    ):
        self.material_prices = material_prices or {}
        self.labour_rates = labour_rates or {}

    def get_price(self, material_slug: str) -> Price | None:
        value = self.material_prices.get(material_slug)

        if value is None:
            return None

        return Price(
            value=float(value["value"]),
            unit=value["unit"],
            source=value.get("source", "SAHIRATE"),
            status=value.get("status", "ESTIMATED"),
        )

    def get_labour_rate(self, role: str) -> Price | None:
        value = self.labour_rates.get(role)

        if value is None:
            return None

        return Price(
            value=float(value["value"]),
            unit=value.get("unit", "person-day"),
            source=value.get("source", "SAHIRATE"),
            status=value.get("status", "ESTIMATED"),
        )


def calculate_material_cost(
    quantity: float,
    price: Price | None,
) -> dict:

    if price is None:
        return {
            "quantity": quantity,
            "rate": None,
            "rate_unit": None,
            "amount": None,
            "status": "RATE_UNAVAILABLE",
        }

    return {
        "quantity": quantity,
        "rate": price.value,
        "rate_unit": price.unit,
        "amount": round(
            quantity * price.value,
            2,
        ),
        "source": price.source,
        "status": price.status,
    }


def calculate_labour_cost(
    person_days: float,
    price: Price | None,
) -> dict:

    if price is None:
        return {
            "person_days": person_days,
            "rate": None,
            "amount": None,
            "status": "RATE_UNAVAILABLE",
        }

    return {
        "person_days": person_days,
        "rate": price.value,
        "rate_unit": price.unit,
        "amount": round(
            person_days * price.value,
            2,
        ),
        "source": price.source,
        "status": price.status,
    }
