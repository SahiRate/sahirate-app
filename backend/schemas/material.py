from pydantic import BaseModel


class MaterialCreate(BaseModel):
    slug: str
    name: str
    unit: str
    description: str
    image: str = ""


class MaterialUpdate(BaseModel):
    name: str
    unit: str
    description: str
    image: str = ""
