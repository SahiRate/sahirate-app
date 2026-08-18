"""
SahiRate Dealer Onboarding

Business Flow:

Field Visit
    ↓
Dealer Listing Created
    ↓
Public Listing
    ↓
Dealer Claims Listing
    ↓
OTP Verification
    ↓
Field/Admin Verification
    ↓
Final Approval
    ↓
Automatic Dealer ID
    ↓
SahiRate Verified Dealer

Important:
- Dealer ID is NOT created during field submission.
- Rate and stock are optional.
- Listing can exist before dealer verification.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
import hashlib
import secrets

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request
from pymongo import ReturnDocument
from pydantic import BaseModel, Field

from middleware.auth import get_current_admin


router = APIRouter(
    prefix="/dealer-onboarding",
    tags=["Dealer Onboarding"],
)


# ==========================================================
# SCHEMAS
# ==========================================================

class DealerOnboardingCreate(BaseModel):
    # Dealer
    name: str = Field(min_length=2)
    dealer_type: str = ""

    owner_name: str = ""

    phone: str = ""
    whatsapp: str = ""
    alternate_phone: str = ""

    # Address
    area: str = ""
    full_address: str = ""
    city: str = "Deoghar"
    district: str = "Deoghar"
    state: str = "Jharkhand"
    pin: str = ""

    # Business
    gstin: str = ""
    years_in_business: Optional[int] = None

    # Location
    maps_link: str = ""
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    # Services
    delivery: bool = False
    delivery_area: str = ""

    payment_modes: list[str] = Field(
        default_factory=list
    )

    # Materials
    materials: list[str] = Field(
        default_factory=list
    )

    # Field employee
    employee_name: str = ""
    employee_id: str = ""
    employee_remarks: str = ""

    # Evidence
    shop_photo: str = ""
    dealer_board_photo: str = ""
    visiting_card_photo: str = ""


class DealerClaimRequest(BaseModel):
    application_id: str


class DealerOTPVerifyRequest(BaseModel):
    application_id: str
    otp: str


class DealerFinalApprovalRequest(BaseModel):
    remarks: str = ""


# ==========================================================
# NORMALIZATION
# ==========================================================

def normalize_phone(value: str) -> str:
    digits = "".join(
        char
        for char in (value or "")
        if char.isdigit()
    )

    if digits.startswith("91") and len(digits) == 12:
        digits = digits[2:]

    if len(digits) >= 10:
        return digits[-10:]

    return digits


def normalize_gstin(value: str) -> str:
    return "".join(
        (value or "").upper().split()
    )


# ==========================================================
# DUPLICATE CHECK
# ==========================================================

async def find_possible_duplicate(
    db,
    data: DealerOnboardingCreate,
):
    phone = normalize_phone(data.phone)
    gstin = normalize_gstin(data.gstin)

    # ------------------------------------------------------
    # Existing approved dealer — GSTIN
    # ------------------------------------------------------

    if gstin:
        dealer = await db.dealers.find_one(
            {"gstin": gstin},
            {"_id": 0},
        )

        if dealer:
            return {
                "match_type": "GSTIN",
                "record_type": "dealer",
                "record": dealer,
            }

    # ------------------------------------------------------
    # Existing approved dealer — mobile
    # ------------------------------------------------------

    if phone:
        dealer = await db.dealers.find_one(
            {"phone_normalized": phone},
            {"_id": 0},
        )

        if dealer:
            return {
                "match_type": "Mobile",
                "record_type": "dealer",
                "record": dealer,
            }

        # Compatibility with older records
        dealer = await db.dealers.find_one(
            {"phone": data.phone},
            {"_id": 0},
        )

        if dealer:
            return {
                "match_type": "Mobile",
                "record_type": "dealer",
                "record": dealer,
            }

    # ------------------------------------------------------
    # Existing onboarding application — GSTIN
    # ------------------------------------------------------

    if gstin:
        application = await db.dealer_onboarding.find_one(
            {
                "gstin": gstin,
                "status": {
                    "$in": [
                        "LISTED",
                        "CLAIMED",
                        "MOBILE_VERIFIED",
                        "FIELD_VERIFIED",
                        "UNDER_REVIEW",
                    ]
                },
            },
            {"_id": 0},
        )

        if application:
            return {
                "match_type": "GSTIN",
                "record_type": "onboarding",
                "record": application,
            }

    # ------------------------------------------------------
    # Existing onboarding application — Mobile
    # ------------------------------------------------------

    if phone:
        application = await db.dealer_onboarding.find_one(
            {
                "phone_normalized": phone,
                "status": {
                    "$in": [
                        "LISTED",
                        "CLAIMED",
                        "MOBILE_VERIFIED",
                        "FIELD_VERIFIED",
                        "UNDER_REVIEW",
                    ]
                },
            },
            {"_id": 0},
        )

        if application:
            return {
                "match_type": "Mobile",
                "record_type": "onboarding",
                "record": application,
            }

    return None


# ==========================================================
# DEALER ID
# ==========================================================

async def generate_dealer_id(db) -> str:
    """
    Dealer ID is generated ONLY after final approval.

    Example:
    SR-DLR-000001
    SR-DLR-000002
    """

    counter = await db.counters.find_one_and_update(
        {"_id": "dealer_id"},
        {
            "$inc": {
                "seq": 1
            }
        },
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )

    return f"SR-DLR-{counter['seq']:06d}"


# ==========================================================
# OTP HELPERS
# ==========================================================

def hash_otp(otp: str) -> str:
    return hashlib.sha256(
        otp.encode("utf-8")
    ).hexdigest()


def generate_otp() -> str:
    return f"{secrets.randbelow(1000000):06d}"


# ==========================================================
# FIELD OFFICER
# CREATE LISTING
# ==========================================================

@router.post("")
async def create_dealer_listing(
    data: DealerOnboardingCreate,
    request: Request,
):
    """
    Field employee creates a dealer listing.

    Dealer ID is NOT created here.

    Listing becomes visible as:
    'Listed on SahiRate'
    """

    db = request.app.state.mongodb

    duplicate = await find_possible_duplicate(
        db,
        data,
    )

    if duplicate:
        return {
            "status": "DUPLICATE_REVIEW",
            "message": (
                "Possible existing dealer found. "
                "Please review before creating another listing."
            ),
            "match_type": duplicate["match_type"],
            "record_type": duplicate["record_type"],
            "record": duplicate["record"],
        }

    now = datetime.now(timezone.utc)

    document = data.model_dump()

    document.update(
        {
            "phone_normalized": normalize_phone(
                data.phone
            ),

            "gstin": normalize_gstin(
                data.gstin
            ),

            # ------------------------------------------------
            # IMPORTANT STATUS
            # ------------------------------------------------

            "status": "LISTED",

            # Dealer ID does NOT exist yet
            "dealer_id": None,

            # Verification
            "mobile_verified": False,
            "field_verified": False,
            "admin_approved": False,

            # Public listing
            "public_listing": True,

            "created_at": now,
            "updated_at": now,
        }
    )

    result = await db.dealer_onboarding.insert_one(
        document
    )

    return {
        "status": "LISTED",
        "application_id": str(
            result.inserted_id
        ),
        "message": (
            "Dealer listing created successfully."
        ),
        "listing_visible": True,
        "dealer_id": None,
    }

# ==========================================================
# PUBLIC LISTING
# ==========================================================

@router.get("/public/{application_id}")
async def get_public_listing(
    application_id: str,
    request: Request,
):
    """
    Public dealer listing.

    Only explicitly approved public fields are returned.
    Private/internal onboarding data is never exposed.
    """

    db = request.app.state.mongodb

    try:
        oid = ObjectId(application_id)

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    # ------------------------------------------------------
    # Public listing uses an explicit allow-list.
    # Never expose the full onboarding document.
    # ------------------------------------------------------

    record = await db.dealer_onboarding.find_one(
        {
            "_id": oid,
            "public_listing": True,
        },
        {
            "_id": 0,
            "name": 1,
            "dealer_type": 1,
            "area": 1,
            "city": 1,
            "district": 1,
            "state": 1,
            "delivery": 1,
            "delivery_area": 1,
            "payment_modes": 1,
            "materials": 1,
            "maps_link": 1,
            "shop_photo": 1,
            "dealer_board_photo": 1,
            "visiting_card_photo": 1,
        },
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Dealer listing not found",
        )

    record["listing_status"] = "Listed on SahiRate"

    return record


# ==========================================================
# DEALER REQUESTS OTP / CLAIM
# ==========================================================

@router.post("/claim/request-otp")
async def request_dealer_claim_otp(
    data: DealerClaimRequest,
    request: Request,
):
    """
    Dealer claims the listing.

    Production SMS provider will be connected here.

    For now the endpoint creates a secure OTP record.
    It does NOT expose the OTP in the API response.
    """

    db = request.app.state.mongodb

    try:
        oid = ObjectId(
            data.application_id
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    application = await db.dealer_onboarding.find_one(
        {
            "_id": oid,
            "public_listing": True,
        }
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Dealer listing not found",
        )

    phone = application.get(
        "phone_normalized",
        "",
    )

    if not phone:
        raise HTTPException(
            status_code=400,
            detail=(
                "Dealer mobile number is required "
                "for verification."
            ),
        )

    otp = generate_otp()

    now = datetime.now(timezone.utc)

    await db.dealer_onboarding.update_one(
        {
            "_id": oid
        },
        {
            "$set": {
                "status": "CLAIMED",

                "otp_hash": hash_otp(otp),

                "otp_expires_at": (
                    now + timedelta(minutes=5)
                ),

                "otp_attempts": 0,

                "updated_at": now,
            }
        },
    )

    # ------------------------------------------------------
    # IMPORTANT
    # ------------------------------------------------------
    #
    # Real SMS/WhatsApp OTP provider will be connected here.
    #
    # DO NOT return the OTP to frontend in production.
    #
    # ------------------------------------------------------

    return {
        "status": "OTP_REQUESTED",
        "message": (
            "OTP request created for the "
            "registered dealer mobile number."
        ),
        "mobile_masked": (
            f"******{phone[-4:]}"
            if len(phone) >= 4
            else "******"
        ),
    }


# ==========================================================
# DEALER VERIFIES OTP
# ==========================================================

@router.post("/claim/verify-otp")
async def verify_dealer_otp(
    data: DealerOTPVerifyRequest,
    request: Request,
):
    db = request.app.state.mongodb

    try:
        oid = ObjectId(
            data.application_id
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    application = await db.dealer_onboarding.find_one(
        {
            "_id": oid
        }
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Dealer listing not found",
        )

    if application.get(
        "mobile_verified",
        False,
    ):
        return {
            "status": "MOBILE_VERIFIED",
            "message": (
                "Dealer mobile is already verified."
            ),
        }

    expires_at = application.get(
        "otp_expires_at"
    )

    if not expires_at:
        raise HTTPException(
            status_code=400,
            detail="OTP has not been requested.",
        )

    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(
            status_code=400,
            detail="OTP has expired.",
        )

    attempts = application.get(
        "otp_attempts",
        0,
    )

    if attempts >= 5:
        raise HTTPException(
            status_code=429,
            detail=(
                "Too many incorrect OTP attempts. "
                "Please request a new OTP."
            ),
        )

    if hash_otp(data.otp) != application.get(
        "otp_hash"
    ):
        await db.dealer_onboarding.update_one(
            {
                "_id": oid
            },
            {
                "$inc": {
                    "otp_attempts": 1
                }
            },
        )

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP.",
        )

    now = datetime.now(timezone.utc)

    await db.dealer_onboarding.update_one(
        {
            "_id": oid
        },
        {
            "$set": {
                "status": "MOBILE_VERIFIED",

                "mobile_verified": True,

                "mobile_verified_at": now,

                "updated_at": now,
            },

            "$unset": {
                "otp_hash": "",
                "otp_expires_at": "",
                "otp_attempts": "",
            },
        },
    )

    return {
        "status": "MOBILE_VERIFIED",
        "message": (
            "Dealer mobile verified successfully."
        ),
    }


# ==========================================================
# ADMIN — PENDING / REVIEW LIST
# ==========================================================

@router.get("/admin/pending")
async def list_pending_onboarding(
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    records = await db.dealer_onboarding.find(
        {
            "status": {
                "$in": [
                    "LISTED",
                    "CLAIMED",
                    "MOBILE_VERIFIED",
                    "FIELD_VERIFIED",
                    "UNDER_REVIEW",
                ]
            }
        },
        {
            "_id": 0
        },
    ).sort(
        "created_at",
        1,
    ).to_list(500)

    return records


# ==========================================================
# ADMIN — VIEW APPLICATION
# ==========================================================

@router.get("/admin/{application_id}")
async def get_onboarding_application(
    application_id: str,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    try:
        oid = ObjectId(
            application_id
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    record = await db.dealer_onboarding.find_one(
        {
            "_id": oid
        },
        {
            "_id": 0,
            "otp_hash": 0,
            "otp_expires_at": 0,
            "otp_attempts": 0,
        },
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail=(
                "Onboarding application not found."
            ),
        )

    return record


# ==========================================================
# ADMIN — FIELD VERIFICATION
# ==========================================================

@router.post(
    "/admin/{application_id}/field-verify"
)
async def field_verify_dealer(
    application_id: str,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    try:
        oid = ObjectId(
            application_id
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    application = await db.dealer_onboarding.find_one(
        {
            "_id": oid
        }
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Dealer listing not found.",
        )

    now = datetime.now(timezone.utc)

    await db.dealer_onboarding.update_one(
        {
            "_id": oid
        },
        {
            "$set": {
                "status": "FIELD_VERIFIED",
                "field_verified": True,
                "field_verified_at": now,
                "field_verified_by": admin.get(
                    "email"
                ),
                "updated_at": now,
            }
        },
    )

    return {
        "status": "FIELD_VERIFIED",
        "message": (
            "Dealer field verification completed."
        ),
    }


# ==========================================================
# ADMIN — FINAL APPROVAL
# ==========================================================

@router.post(
    "/admin/{application_id}/approve"
)
async def approve_dealer(
    application_id: str,
    data: DealerFinalApprovalRequest,
    request: Request,
    admin=Depends(get_current_admin),
):
    """
    Final approval.

    Dealer ID is generated ONLY here.
    """

    db = request.app.state.mongodb

    try:
        oid = ObjectId(
            application_id
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    application = await db.dealer_onboarding.find_one(
        {
            "_id": oid
        }
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Dealer listing not found.",
        )

    # ------------------------------------------------------
    # Already approved
    # ------------------------------------------------------

    if application.get(
        "admin_approved",
        False,
    ):
        return {
            "status": "APPROVED",
            "dealer_id": application.get(
                "dealer_id"
            ),
            "message": (
                "Dealer is already approved."
            ),
        }

    # ------------------------------------------------------
    # OTP verification required
    # ------------------------------------------------------

    if not application.get(
        "mobile_verified",
        False,
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                "Dealer mobile OTP verification "
                "is required before final approval."
            ),
        )

    # ------------------------------------------------------
    # Field verification required
    # ------------------------------------------------------

    if not application.get(
        "field_verified",
        False,
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                "Field verification is required "
                "before final approval."
            ),
        )

    # ------------------------------------------------------
    # FINAL DUPLICATE CHECK
    # ------------------------------------------------------

    phone = application.get(
        "phone_normalized",
        "",
    )

    gstin = application.get(
        "gstin",
        "",
    )

    if gstin:
        existing = await db.dealers.find_one(
            {
                "gstin": gstin
            },
            {
                "_id": 0
            },
        )

        if existing:
            raise HTTPException(
                status_code=409,
                detail={
                    "message": (
                        "A dealer with this GSTIN "
                        "already exists."
                    ),
                    "existing_dealer": existing,
                },
            )

    if phone:
        existing = await db.dealers.find_one(
            {
                "phone_normalized": phone
            },
            {
                "_id": 0
            },
        )

        if existing:
            raise HTTPException(
                status_code=409,
                detail={
                    "message": (
                        "A dealer with this mobile "
                        "number already exists."
                    ),
                    "existing_dealer": existing,
                },
            )

    # ------------------------------------------------------
    # GENERATE UNIQUE DEALER ID
    # ------------------------------------------------------

    dealer_id = await generate_dealer_id(
        db
    )

    # ------------------------------------------------------
    # CREATE FINAL DEALER RECORD
    # ------------------------------------------------------

    dealer_document = {
        "id": dealer_id,

        "name": application.get(
            "name",
            "",
        ),

        "area": application.get(
            "area",
            "",
        ),

        "phone": application.get(
            "phone",
            "",
        ),

        "phone_normalized": phone,

        "owner_name": application.get(
            "owner_name",
            "",
        ),

        "whatsapp": application.get(
            "whatsapp",
            "",
        ),

        "alternate_phone": application.get(
            "alternate_phone",
            "",
        ),

        "full_address": application.get(
            "full_address",
            "",
        ),

        "city": application.get(
            "city",
            "Deoghar",
        ),

        "district": application.get(
            "district",
            "Deoghar",
        ),

        "state": application.get(
            "state",
            "Jharkhand",
        ),

        "pin": application.get(
            "pin",
            "",
        ),

        "gstin": gstin,

        "dealer_type": application.get(
            "dealer_type",
            "",
        ),

        "delivery": application.get(
            "delivery",
            False,
        ),

        "delivery_area": application.get(
            "delivery_area",
            "",
        ),

        "payment_modes": application.get(
            "payment_modes",
            [],
        ),

        "maps_link": application.get(
            "maps_link",
            "",
        ),

        "latitude": application.get(
            "latitude"
        ),

        "longitude": application.get(
            "longitude"
        ),

        "materials": application.get(
            "materials",
            [],
        ),

        # Rate data is optional
        "prices": application.get(
            "prices",
            [],
        ),

        "rating": 0.0,

        "reviews_count": 0,

        "verified": True,

        "verification_status": (
            "SahiRate Verified Dealer"
        ),

        "onboarding_date": (
            datetime.now(timezone.utc)
        ),

        "onboarding_application_id": (
            application_id
        ),
    }

    # ------------------------------------------------------
    # INSERT DEALER
    # ------------------------------------------------------

    await db.dealers.insert_one(
        dealer_document
    )

    # ------------------------------------------------------
    # APPROVE APPLICATION
    # ------------------------------------------------------

    now = datetime.now(timezone.utc)

    await db.dealer_onboarding.update_one(
        {
            "_id": oid
        },
        {
            "$set": {
                "status": "APPROVED",

                "dealer_id": dealer_id,

                "admin_approved": True,

                "approved_at": now,

                "approved_by": admin.get(
                    "email"
                ),

                "admin_remarks": (
                    data.remarks
                ),

                "updated_at": now,
            }
        },
    )

    return {
        "status": "APPROVED",

        "dealer_id": dealer_id,

        "verification_status": (
            "SahiRate Verified Dealer"
        ),

        "message": (
            "Dealer approved successfully. "
            "Unique Dealer ID generated."
        ),
    }


# ==========================================================
# ADMIN — REJECT
# ==========================================================

@router.post(
    "/admin/{application_id}/reject"
)
async def reject_dealer(
    application_id: str,
    data: DealerFinalApprovalRequest,
    request: Request,
    admin=Depends(get_current_admin),
):
    db = request.app.state.mongodb

    try:
        oid = ObjectId(
            application_id
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid application ID",
        )

    result = await db.dealer_onboarding.update_one(
        {
            "_id": oid,

            "status": {
                "$nin": [
                    "APPROVED",
                    "REJECTED",
                ]
            },
        },
        {
            "$set": {
                "status": "REJECTED",

                "admin_remarks": (
                    data.remarks
                ),

                "rejected_at": (
                    datetime.now(timezone.utc)
                ),

                "rejected_by": admin.get(
                    "email"
                ),

                "updated_at": (
                    datetime.now(timezone.utc)
                ),
            }
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail=(
                "Active onboarding application "
                "not found."
            ),
        )

    return {
        "status": "REJECTED",
        "message": (
            "Dealer onboarding rejected."
        ),
    }
