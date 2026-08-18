from ulid import ULID


def generate_uid() -> str:
    """
    Generates a globally unique ULID.
    """
    return str(ULID())
