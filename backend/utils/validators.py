import re


def validate_mobile_number(phone: str) -> bool:
    """
    Indian Mobile Number Validation
    """

    pattern = r"^[6-9]\d{9}$"

    phone = phone.replace("+91", "").replace(" ", "").strip()

    return bool(re.match(pattern, phone))
