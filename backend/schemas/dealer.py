from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class DealerCreate(BaseModel):
    # Auto Generated
    # Basic Information
    business_name: str = Field(..., min_length=3, max_length=150)
    owner_name: Optional[str] = None

    # Business
    business_categories: list[str] = Field(default_factory=list)
    gst_number: Optional[str] = None

    # Contact
    phone: str
    alternate_phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None

    # Address
    address: Optional[str] = None
    area: str
    city: str = "Deoghar"
    district: str = "Deoghar"
    state: str = "Jharkhand"
    pincode: Optional[str] = None

    # Business Details
    years_in_business: int = 0
    description: Optional[str] = None

    # Services
    delivery: bool = False
    whatsapp: bool = True

    # Status
    verified: bool = False
    status: str = "ACTIVE"

    # Rating
    rating: float = 0.0
    reviews_count: int = 0

    # Media
    logo: Optional[str] = None
    cover_image: Optional[str] = None
    gallery: list[str] = Field(default_factory=list)

    # Prices
    prices: list = Field(default_factory=list)


class DealerUpdate(BaseModel):
    business_name: str
    owner_name: Optional[str] = None

    business_categories: list[str] = Field(default_factory=list)

    gst_number: Optional[str] = None

    phone: str
    alternate_phone: Optional[str] = None

    email: Optional[EmailStr] = None

    website: Optional[str] = None

    address: Optional[str] = None
    area: str
    city: str
    district: str
    state: str
    pincode: Optional[str] = None

    years_in_business: int

    description: Optional[str] = None

    delivery: bool
    whatsapp: bool

    verified: bool
    status: str

    rating: float
    reviews_count: int

    logo: Optional[str] = None
    cover_image: Optional[str] = None
    gallery: list[str] = Field(default_factory=list)

    prices: list = Field(default_factory=list)
