"""
Common Exceptions
"""


class SahiRateException(Exception):

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class ValidationException(SahiRateException):
    pass


class DuplicateException(SahiRateException):
    pass


class NotFoundException(SahiRateException):
    pass
