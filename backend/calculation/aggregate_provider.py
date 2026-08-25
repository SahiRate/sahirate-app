"""
SahiRate SmartBuild - Aggregate Rate Provider

Bridges Aggregate Master selections with market-rate observations.
Calculation engines can request a rate without knowing how the
rate is stored or verified.
"""

from .aggregate_rates import latest_rate


class AggregateRateProvider:

    def __init__(self, observations=None):
        self.observations = observations or []

    def add_observation(
        self,
        observation: dict,
    ) -> dict:

        self.observations.append(
            observation
        )

        return observation

    def get_rate(
        self,
        size: str,
        source: str | None = None,
        unit: str = "cft",
    ) -> dict:

        rate = latest_rate(
            self.observations,
            size=size,
            source=source,
            unit=unit,
        )

        if rate is None:
            return {
                "rate": None,
                "unit": unit,
                "size": size,
                "source": source,
                "status": "RATE_DATA_REQUIRED",
            }

        return {
            "rate": rate["rate"],
            "unit": rate["unit"],
            "size": rate["size"],
            "source": rate["source"],
            "effective_date": (
                rate["effective_date"]
            ),
            "verification_status": (
                rate["verification_status"]
            ),
            "source_reference": (
                rate["source_reference"]
            ),
            "status": "RATE_AVAILABLE",
        }
