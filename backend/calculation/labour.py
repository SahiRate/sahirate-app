"""
SahiRate SmartBuild - Purpose-wise Labour Rules

IMPORTANT:
Current productivity values are preliminary planning assumptions.
They are NOT official CPWD/BIS values unless a reference is explicitly
verified and mapped in the future Labour Reference Registry.
"""

LABOUR_RULES = {
    "brick_wall": {
        "quantity_unit": "m3",
        "basis_type": "PRELIMINARY_PRODUCTIVITY",
        "productivity_m3_per_day": 1.00,
        "helper_ratio": 1.00,
        "reference_status": "PENDING_VERIFICATION",
    },

    "rcc_slab": {
        "quantity_unit": "m3",
        "basis_type": "PRELIMINARY_PRODUCTIVITY",
        "productivity_m3_per_day": 2.50,
        "helper_ratio": 2.00,
        "reference_status": "PENDING_VERIFICATION",
    },

    "pcc": {
        "quantity_unit": "m3",
        "basis_type": "PRELIMINARY_PRODUCTIVITY",
        "productivity_m3_per_day": 3.00,
        "helper_ratio": 1.50,
        "reference_status": "PENDING_VERIFICATION",
    },

    "plaster": {
        "quantity_unit": "m2",
        "basis_type": "PRELIMINARY_PRODUCTIVITY",
        "productivity_m3_per_day": 0.80,
        "helper_ratio": 1.00,
        "reference_status": "PENDING_VERIFICATION",
    },

    "foundation": {
        "quantity_unit": "m3",
        "basis_type": "PRELIMINARY_PRODUCTIVITY",
        "productivity_m3_per_day": 2.00,
        "helper_ratio": 2.00,
        "reference_status": "PENDING_VERIFICATION",
    },
}


def calculate_labour(
    purpose: str,
    quantity_m3: float,
    mason_count: int | None = None,
    helper_count: int | None = None,
) -> dict:

    if quantity_m3 <= 0:
        raise ValueError(
            "Work quantity must be greater than zero."
        )

    rule = LABOUR_RULES.get(purpose)

    if rule is None:
        raise ValueError(
            f"No labour rule available for: {purpose}"
        )

    productivity = rule["productivity_m3_per_day"]

    total_work_days = (
        quantity_m3 / productivity
    )

    if mason_count is None:
        mason_count = 1

    if helper_count is None:
        helper_count = max(
            1,
            round(
                mason_count
                * rule["helper_ratio"]
            ),
        )

    duration_days = (
        total_work_days / mason_count
    )

    return {
        "mason": {
            "count": mason_count,
            "person_days": round(
                total_work_days,
                2,
            ),
        },

        "helper": {
            "count": helper_count,
            "person_days": round(
                duration_days * helper_count,
                2,
            ),
        },

        "estimated_duration_days": round(
            duration_days,
            2,
        ),

        "rule_status": rule["basis_type"],
        "reference_status": rule["reference_status"],
        "quantity_unit": rule["quantity_unit"],
    }
