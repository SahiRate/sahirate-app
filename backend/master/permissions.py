"""
Role Permissions for SahiRate
"""

PERMISSIONS = {

    "Super Admin": [
        "*"
    ],

    "Admin": [
        "dashboard",
        "materials",
        "dealers",
        "prices",
        "images",
        "reports",
        "settings",
    ],

    "Manager": [
        "dashboard",
        "materials",
        "dealers",
        "prices",
        "reports",
    ],

    "Data Entry Operator": [
        "materials",
        "dealers",
        "prices",
    ],

    "Dealer": [
        "profile",
        "prices",
    ],

    "Customer": [
        "view",
    ],

}
