"""
SahiRate SmartBuild - Region Aware Rule Metadata
"""

from .registry import RULE_REGISTRY


REGION_RULE_OVERRIDES = {

    "India": {
        "reference_ids": [
            "IS_383_2016",
            "IS_2250_1981",
            "CPWD_SPECIFICATIONS_2009",
            "CPWD_DSR_2023",
        ],
    },

    "Bihar": {
        "reference_ids": [
            "IS_383_2016",
            "IS_2250_1981",
            "CPWD_SPECIFICATIONS_2009",
            "CPWD_DSR_2023",
            "BIHAR_BCD_SOR_2022",
        ],
    },

    "Jharkhand": {
        "reference_ids": [
            "IS_383_2016",
            "IS_2250_1981",
            "CPWD_SPECIFICATIONS_2009",
            "CPWD_DSR_2023",
            "JHARKHAND_WAMIS",
            "JHARKHAND_JSBCL_RATES",
        ],
    },
}


def get_region_rule_metadata(
    purpose: str,
    region: str = "India",
) -> dict:

    if purpose not in RULE_REGISTRY:
        raise ValueError(
            f"Unknown calculation purpose: {purpose}"
        )

    if region not in REGION_RULE_OVERRIDES:
        raise ValueError(
            f"Unsupported region: {region}"
        )

    base = dict(
        RULE_REGISTRY[purpose]
    )

    base["region"] = region

    base["reference_ids"] = list(
        REGION_RULE_OVERRIDES[
            region
        ]["reference_ids"]
    )

    # Listing references does not mean the
    # calculation rule has been verified.
    base["verification_status"] = (
        "PENDING_RULE_LEVEL_REVIEW"
    )

    return base
