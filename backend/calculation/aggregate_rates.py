"""
SahiRate SmartBuild - Aggregate Rate Master

Rates are market observations, not engineering constants.

Each observation carries:
- aggregate size
- source / crusher
- unit
- location
- effective date
- verification status
- optional quotation/source reference

Historical records are retained so SahiRate can later calculate
price trends and source comparisons.
"""

from datetime import date


RATE_VERIFICATION_STATUSES = {
    "UNVERIFIED",
    "USER_SUBMITTED",
    "VENDOR_SUBMITTED",
    "VERIFIED",
    "EXPIRED",
}


def validate_rate_observation(
    observation: dict,
) -> dict:

    required = [
        "size",
        "source",
        "unit",
        "rate",
        "effective_date",
        "location",
    ]

    missing = [
        key
        for key in required
        if key not in observation
    ]

    if missing:
        raise ValueError(
            "Missing rate fields: "
            + ", ".join(missing)
        )

    if observation["rate"] < 0:
        raise ValueError(
            "Aggregate rate cannot be negative."
        )

    if observation["unit"] not in (
        "cft",
        "tonne",
    ):
        raise ValueError(
            "Aggregate rate unit must be cft or tonne."
        )

    status = observation.get(
        "verification_status",
        "UNVERIFIED",
    )

    if status not in RATE_VERIFICATION_STATUSES:
        raise ValueError(
            f"Invalid rate verification status: {status}"
        )

    return observation


def build_rate_observation(
    size: str,
    source: str,
    unit: str,
    rate: float,
    location: str,
    effective_date: str | None = None,
    verification_status: str = "UNVERIFIED",
    source_reference: str | None = None,
    notes: str | None = None,
) -> dict:

    if effective_date is None:
        effective_date = date.today().isoformat()

    observation = {
        "material": "aggregate",
        "size": size,
        "source": source,
        "unit": unit,
        "rate": float(rate),
        "location": location,
        "effective_date": effective_date,
        "verification_status": (
            verification_status
        ),
        "source_reference": (
            source_reference
        ),
        "notes": notes,
    }

    return validate_rate_observation(
        observation
    )


def build_rate_history(
    observations: list[dict],
) -> list[dict]:

    validated = [
        validate_rate_observation(
            item
        )
        for item in observations
    ]

    return sorted(
        validated,
        key=lambda item: (
            item["effective_date"],
            item["source"],
            item["size"],
        ),
        reverse=True,
    )


def latest_rate(
    observations: list[dict],
    size: str,
    source: str | None = None,
    unit: str = "cft",
) -> dict | None:

    matching = [
        item
        for item in observations
        if item["size"] == size
        and item["unit"] == unit
        and (
            source is None
            or item["source"] == source
        )
        and item[
            "verification_status"
        ] != "EXPIRED"
    ]

    if not matching:
        return None

    matching.sort(
        key=lambda item: item[
            "effective_date"
        ],
        reverse=True,
    )

    return matching[0]
