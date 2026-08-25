from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from calculation.engine import CalculationEngine


router = APIRouter(
    prefix="/smartbuild",
    tags=["SmartBuild"],
)

engine = CalculationEngine()


class SmartBuildRequest(BaseModel):
    purpose: str = Field(..., min_length=1)
    inputs: dict[str, Any] = Field(default_factory=dict)


@router.post("/calculate")
async def calculate_smartbuild(request: SmartBuildRequest):
    try:
        result = engine.calculate(
            request.purpose,
            request.inputs,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"SmartBuild calculation failed: {exc}",
        ) from exc

    if result is None:
        raise HTTPException(
            status_code=400,
            detail="SmartBuild calculator returned no result.",
        )

    return result
