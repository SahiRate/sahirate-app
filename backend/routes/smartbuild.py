from typing import Any

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from calculation.engine import CalculationEngine
from calculation.dealer_market_provider import (
    DealerMarketPriceProvider,
)


router = APIRouter(
    prefix="/smartbuild",
    tags=["SmartBuild"],
)

# Engine is created per request so it receives fresh dealer-market data.


class SmartBuildRequest(BaseModel):
    purpose: str = Field(..., min_length=1)
    inputs: dict[str, Any] = Field(default_factory=dict)


@router.post("/calculate")
async def calculate_smartbuild(
    request: SmartBuildRequest,
    http_request: Request,
):
    db = http_request.app.state.mongodb

    dealers = await db.dealers.find(
        {},
        {"_id": 0},
    ).to_list(500)

    price_provider = DealerMarketPriceProvider(
        dealers
    )

    engine = CalculationEngine(
        price_provider=price_provider
    )

    try:
        result = engine.calculate(
            request.purpose,
            request.inputs,
        )

        result["market_pricing"] = (
            price_provider.market_summary(
                [
                    item.get("slug")
                    for item in result.get(
                        "materials",
                        []
                    )
                ]
            )
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

