from pydantic import BaseModel


class DealerCreate(BaseModel):
    id: str
    name: str
    area: str
    phone: str
    rating: float
    verified: bool
    delivery: bool
    reviews_count: int
    prices: list


class DealerUpdate(BaseModel):
    name: str
    area: str
    phone: str
    rating: float
    verified: bool
    delivery: bool
    reviews_count: int
    prices: list