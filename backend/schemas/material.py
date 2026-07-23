from pydantic import BaseModel


class MaterialCreate(BaseModel):
    slug: str
    name: str
    unit: str
    category: str
    description: str


class MaterialUpdate(BaseModel):
    name: str
    unit: str
    category: str
    description: str