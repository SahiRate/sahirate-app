"""
SahiRate SmartBuild - Standard Estimate Schema
"""

ESTIMATE_SCHEMA_VERSION = "1.0"


def build_estimate_metadata(
    purpose: str,
    rule_metadata: dict,
) -> dict:

    return {
        "schema_version": ESTIMATE_SCHEMA_VERSION,
        "purpose": purpose,
        "rule_version": rule_metadata["version"],
        "rule_status": rule_metadata["status"],
        "reference_status": rule_metadata[
            "reference_status"
        ],
        "reference_codes": rule_metadata[
            "reference_codes"
        ],
    }


def validate_estimate(result: dict) -> dict:

    required = [
        "purpose",
        "rule",
        "inputs",
        "quantities",
        "materials",
        "labour",
        "duration",
        "cost",
        "status",
    ]

    missing = [
        key
        for key in required
        if key not in result
    ]

    if missing:
        raise ValueError(
            "Invalid estimate. Missing fields: "
            + ", ".join(missing)
        )

    return result


def standardize_estimate(
    result: dict,
    rule_metadata: dict,
) -> dict:

    metadata = build_estimate_metadata(
        result["purpose"],
        rule_metadata,
    )

    standardized = {
        **metadata,
        **result,
    }

    return validate_estimate(
        standardized
    )
