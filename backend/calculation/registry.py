"""
SahiRate SmartBuild - Rule & Reference Registry

Every calculation rule must carry a version and reference status.
Values marked PRELIMINARY must not be presented as final engineering
or statutory values.

Reference fields remain empty until independently verified against
the applicable primary source.
"""

RULE_REGISTRY = {

    "brick_wall": {
        "version": "0.1.0",
        "status": "PRELIMINARY",
        "reference_status": "PENDING_VERIFICATION",
        "reference_codes": [],
        "reference": {
            "authority": None,
            "document": None,
            "edition": None,
            "item_code": None,
            "clause": None,
            "revision": None,
            "verified_on": None,
        },
        "basis": {
            "quantity_unit": None,
            "labour_basis": None,
            "scope": None,
        },
        "notes": (
            "Preliminary quantity-estimation rule. "
            "Verify applicable specifications before production use."
        ),
    },

    "rcc_slab": {
        "version": "0.1.0",
        "status": "PRELIMINARY",
        "reference_status": "PENDING_VERIFICATION",
        "reference_codes": [],
        "reference": {
            "authority": None,
            "document": None,
            "edition": None,
            "item_code": None,
            "clause": None,
            "revision": None,
            "verified_on": None,
        },
        "basis": {
            "quantity_unit": None,
            "labour_basis": None,
            "scope": None,
        },
        "notes": (
            "Preliminary RCC quantity estimation. "
            "Final structural quantities must follow approved design."
        ),
    },

    "pcc": {
        "version": "0.1.0",
        "status": "PRELIMINARY",
        "reference_status": "PENDING_VERIFICATION",
        "reference_codes": [],
        "reference": {
            "authority": None,
            "document": None,
            "edition": None,
            "item_code": None,
            "clause": None,
            "revision": None,
            "verified_on": None,
        },
        "basis": {
            "quantity_unit": None,
            "labour_basis": None,
            "scope": None,
        },
        "notes": (
            "Preliminary PCC quantity estimation."
        ),
    },

    "plaster": {
        "version": "0.1.0",
        "status": "PRELIMINARY",
        "reference_status": "PENDING_VERIFICATION",
        "reference_codes": [],
        "reference": {
            "authority": None,
            "document": None,
            "edition": None,
            "item_code": None,
            "clause": None,
            "revision": None,
            "verified_on": None,
        },
        "basis": {
            "quantity_unit": None,
            "labour_basis": None,
            "scope": None,
        },
        "notes": (
            "Preliminary plaster quantity estimation."
        ),
    },

    "foundation": {
        "version": "0.1.0",
        "status": "PRELIMINARY",
        "reference_status": "PENDING_VERIFICATION",
        "reference_codes": [],
        "reference": {
            "authority": None,
            "document": None,
            "edition": None,
            "item_code": None,
            "clause": None,
            "revision": None,
            "verified_on": None,
        },
        "basis": {
            "quantity_unit": None,
            "labour_basis": None,
            "scope": None,
        },
        "notes": (
            "Preliminary foundation estimation. "
            "Structural design remains authoritative."
        ),
    },
}


def get_rule_metadata(purpose: str) -> dict:
    metadata = RULE_REGISTRY.get(purpose)

    if metadata is None:
        raise ValueError(
            f"No rule metadata registered for: {purpose}"
        )

    return metadata
