"""SahiRate — AI-powered Building Material Price Intelligence backend."""

import asyncio
import logging
import os
import random
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional
from routes.admin import router as admin_router
from routes.dealers import router as dealers_router
from routes.onboarding import router as onboarding_router

from dotenv import load_dotenv
from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    HTTPException,
)
from jose import jwt

from middleware.auth import (
    configure_auth,
    get_current_admin,
)

from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from routes.materials import router as materials_router
from seed_data import (
    MATERIALS,
    build_dealers,
    compute_material_stats,
)

# ==========================================================
# ENVIRONMENT
# ==========================================================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ==========================================================
# LOGGING
# ==========================================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sahirate")

# ==========================================================
# DATABASE
# ==========================================================

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ==========================================================
# FASTAPI
# ==========================================================

app = FastAPI(title="SahiRate API")
api = APIRouter(prefix="/api")

# ==========================================================
# SECURITY
# ==========================================================

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)



# ==========================================================
# SCHEMAS
# ==========================================================

class AdminLogin(BaseModel):
    email: str
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class SearchQuery(BaseModel):
    query: str

def sahiai_local_response(query: str):
    ql = query.lower().strip()

    # Greeting
    if (
        ql in ["hi", "hello", "hey"]
        or ql.startswith("hi ")
        or ql.startswith("hello ")
        or ql.startswith("hey ")
        or any(
            phrase in ql
            for phrase in [
                "how are you",
                "how r you",
                "good morning",
                "good afternoon",
                "good evening",
            ]
        )
    ):
        return (
            "Hi! 👋 I'm SahiAI, the intelligence assistant of SahiRate. "
            "I can help you check building material prices, compare dealers, "
            "find delivery options and understand the local construction "
            "market in Deoghar."
        )

    # About SahiAI
    if any(
        phrase in ql
        for phrase in [
            "what is sahiai",
            "what is sahi ai",
            "who is sahiai",
            "who are you",
            "what can you do",
            "what do you do",
        ]
    ):
        return (
            "SahiAI means Sahi + AI. It is the intelligence layer of "
            "SahiRate, designed to help users understand building-material "
            "prices, dealers and local market information. "
            "Where SahiRate has relevant data, SahiAI uses that information "
            "instead of guessing."
        )

    # About SahiRate
    if any(
        phrase in ql
        for phrase in [
            "what is sahirate",
            "what is sahi rate",
            "about sahirate",
            "why sahirate",
            "why use sahirate",
            "why should i use sahirate",
        ]
    ):
        return (
            "SahiRate is India's Building Material Intelligence Platform, "
            "starting from Deoghar. It brings building-material prices, "
            "dealer information, comparisons and market insights together "
            "so buyers can check the market before they buy. "
            "Har Material ka Sahi Rate. Sahi Jankari. Behtar Faisle."
        )

    # About Deoghar
    if any(
        phrase in ql
        for phrase in [
            "about deoghar",
            "tell me about deoghar",
            "deoghar ke bare",
            "deoghar ke baare",
            "deoghar business",
            "deoghar market",
            "baidyanath",
            "jyotirlinga",
            "baba dham",
        ]
    ):
        return (
            "Deoghar is best known for Baba Baidyanath Dham, one of "
            "India's twelve Jyotirlingas. Beyond its religious importance, "
            "Deoghar has a growing network of traders, dealers, contractors, "
            "builders and construction-related businesses. Its road, rail "
            "and air connectivity also connects it with the wider region. "
            "SahiRate starts from Deoghar to bring greater transparency "
            "to its local building-material market."
        )

# ==========================================================

# ==========================================================
# DATABASE SEED
# ==========================================================

async def seed_if_empty():
    """Populate default collections only if empty."""

    if await db.materials.count_documents({}) == 0:
        logger.info("Seeding materials...")
        await db.materials.insert_many(MATERIALS)

    if await db.dealers.count_documents({}) == 0:
        logger.info("Seeding dealers...")
        random.seed(42)
        await db.dealers.insert_many(build_dealers())

    if not await db.admins.find_one({"email": "admin@sahirate.in"}):
        await db.admins.insert_one(
            {
                "email": "admin@sahirate.in",
                "password": pwd_context.hash("admin123"),
                "role": "admin",
            }
        )
        logger.info("Default admin created.")


# ==========================================================
# APP EVENTS
# ==========================================================

@app.on_event("startup")
async def on_startup():
    app.state.mongodb = db
    app.state.secret_key = SECRET_KEY

    configure_auth(
        database=db,
        secret_key=SECRET_KEY,
    )

    await seed_if_empty()


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
    # ==========================================================
# PUBLIC ROUTES
# ==========================================================

@api.get("/")
async def root():
    return {
        "service": "SahiRate",
        "status": "ok",
        "city": "Deoghar",
        "state": "Jharkhand",
    }

# ==========================================================
# AI SEARCH
# ==========================================================

@api.post("/search")
async def ai_search(q: SearchQuery):
    """SahiAI natural-language search over materials and dealers."""

    materials_task = db.materials.find(
        {},
        {"_id": 0},
    ).to_list(100)

    dealers_task = db.dealers.find(
        {},
        {"_id": 0},
    ).to_list(500)

    materials, dealers = await asyncio.gather(
        materials_task,
        dealers_task,
    )

    stats = compute_material_stats(dealers)

    # ------------------------------------------------------
    # Compact material context
    # ------------------------------------------------------

    ctx_materials = [
        {
            "slug": m["slug"],
            "name": m["name"],
            "unit": m["unit"],
            "stats": stats.get(m["slug"], {}),
            "brands": m.get("brands", []),
        }
        for m in materials
    ]

    # ------------------------------------------------------
    # Compact dealer context
    # ------------------------------------------------------

    ctx_dealers = [
        {
            "id": d["id"],
            "name": d["name"],
            "area": d["area"],
            "rating": d["rating"],
            "verified": d["verified"],
            "delivery": d["delivery"],
            "materials": [
                p["material_slug"]
                for p in d.get("prices", [])
            ],
            "prices": {
                p["material_slug"]: p["price"]
                for p in d.get("prices", [])
            },
        }
        for d in dealers
    ]

    # ------------------------------------------------------
    # SahiAI response
    # ------------------------------------------------------

    ai_used = False
    ql = q.query.lower().strip()

    # ------------------------------------------------------
    # SahiAI conversational / local intelligence response
    # ------------------------------------------------------

    local_reply = sahiai_local_response(ql)

    if local_reply:
        return {
            "query": q.query,
            "answer": local_reply,
            "ai_powered": False,
            "materials": [],
            "dealers": [],
            "market": None,
        }

    matched_material = None

    # Common material keywords / synonyms
    material_aliases = {
        "cement": ["cement", "cemento"],
        "tmt": ["tmt", "steel", "sariya", "saria", "rebar"],
        "brick": ["brick", "bricks", "eent", " ईंट"],
        "sand": ["sand", "baloo", "balu"],
        "stone-chips": [
            "stone chips",
            "stone chip",
            "chips",
            "aggregate",
            "gitti",
            "gitti",
        ],
    }

    # First: match using material name / slug
    for material in materials:
        material_name = material.get("name", "").lower()
        material_slug = material.get("slug", "").lower()

        if material_name and material_name in ql:
            matched_material = material
            break

        if material_slug and material_slug in ql:
            matched_material = material
            break

    # Second: match common aliases
    if not matched_material:
        for material in materials:
            material_name = material.get("name", "").lower()
            material_slug = material.get("slug", "").lower()

            aliases = (
                material_aliases.get(material_slug, [])
                + material_aliases.get(material_name, [])
            )

            if any(alias in ql for alias in aliases):
                matched_material = material
                break

    if matched_material:
        slug = matched_material["slug"]

        stat = stats.get(slug, {})

        cheapest = None

        for dealer in dealers:
            for price in dealer.get("prices", []):

                if price.get("material_slug") != slug:
                    continue

                if (
                    cheapest is None
                    or price.get("price", float("inf"))
                    < cheapest["price"]
                ):
                    cheapest = {
                        "dealer": dealer,
                        "price": price.get("price"),
                    }

        if cheapest:
            dealer = cheapest["dealer"]

            verified_text = (
                "The dealer is verified."
                if dealer.get("verified")
                else "The dealer is not marked as verified."
            )

            delivery_text = (
                "Delivery is available."
                if dealer.get("delivery")
                else "Delivery availability is not listed."
            )

            reply = (
                f"For {matched_material['name']} in Deoghar, "
                f"the current listed price range is "
                f"₹{stat.get('min')} to ₹{stat.get('max')} "
                f"{matched_material.get('unit', '')}. "
                f"The lowest listed price is "
                f"₹{cheapest['price']} "
                f"at {dealer['name']}, {dealer['area']}. "
                f"{verified_text} {delivery_text}"
            )

        else:
            reply = (
                f"No current dealer price was found for "
                f"{matched_material['name']}."
            )

    else:
        reply = (
            "I can help you compare building material prices, "
            "verified dealers and delivery availability in Deoghar. "
            "Try asking about Cement, TMT Steel, Bricks, Sand, "
            "Stone Chips or Aggregate."
        )

    # ------------------------------------------------------
    # Structured SahiAI result
    # ------------------------------------------------------

    # Detect query intent
    wants_verified = any(
        word in ql
        for word in [
            "verified",
            "trusted",
            "trustworthy",
            "approved",
        ]
    )

    wants_delivery = any(
        word in ql
        for word in [
            "delivery",
            "home delivery",
            "deliver",
        ]
    )

    wants_cheapest = any(
        word in ql
        for word in [
            "cheapest",
            "lowest",
        ]
    )

    # Price limit detection
    import re

    price_limit = None

    price_limit_match = re.search(
        r"(?:under|below|less than|upto|up to|within)\s*(?:₹|rs\.?|inr|\?)?\s*([\d,]+)",
        ql,
    )

    if price_limit_match:
        price_limit = float(
            price_limit_match.group(1).replace(",", "")
        )
    # ------------------------------------------------------
    # Structured material match
    # ------------------------------------------------------

    material_hits_lite = []

    if matched_material:
        material_hits_lite = [
            {
                "slug": matched_material["slug"],
                "name": matched_material["name"],
                "unit": matched_material.get("unit", ""),
            }
        ]

    # ------------------------------------------------------
    # Relevant dealers for the detected material
    # ------------------------------------------------------

    relevant_dealers = []

    if matched_material:
        slug = matched_material["slug"]

        for dealer in dealers:
            matching_price = None

            for price in dealer.get("prices", []):
                if price.get("material_slug") == slug:
                    matching_price = price
                    break

            if matching_price is None:
                continue

            # Apply verified filter only when requested
            if wants_verified and not dealer.get("verified", False):
                continue

            # Apply delivery filter only when requested
            if wants_delivery and not dealer.get("delivery", False):
                continue

             # Apply price limit when requested
            if (
                price_limit is not None
                and matching_price.get("price", float("inf")) > price_limit
            ):
                continue

            relevant_dealers.append(
                {
                    "id": dealer["id"],
                    "name": dealer["name"],
                    "area": dealer["area"],
                    "rating": dealer["rating"],
                    "verified": dealer.get("verified", False),
                    "delivery": dealer.get("delivery", False),
                    "price": matching_price.get("price"),
                }
            )

    # Lowest price first
    relevant_dealers.sort(
        key=lambda d: (
            d["price"] is None,
            d["price"] if d["price"] is not None else float("inf"),
        )
    )

    # Keep response compact
    dealer_hits_lite = relevant_dealers[:6]

    # ------------------------------------------------------
    # Market summary
    # ------------------------------------------------------

    market = None

    if matched_material:
        filtered_prices = [
            d["price"]
            for d in relevant_dealers
            if d.get("price") is not None
        ]

        if filtered_prices:
            market = {
                "min": min(filtered_prices),
                "max": max(filtered_prices),
                "avg": round(
                    sum(filtered_prices) / len(filtered_prices), 2
                ),
                "unit": matched_material.get("unit", ""),
                "dealer_count": len(filtered_prices),
            }
        else:
            market = {
                "min": None,
                "max": None,
                "avg": None,
                "unit": matched_material.get("unit", ""),
                "dealer_count": 0,
            }

    # ------------------------------------------------------
    # Improve answer based on query intent
    # ------------------------------------------------------

    if matched_material and dealer_hits_lite:

        material_name = matched_material["name"]
        unit = matched_material.get("unit", "")

        # Cheapest / lowest-price query
        if wants_cheapest:
            best = dealer_hits_lite[0]

            verified_text = (
                "Verified dealer."
                if best["verified"]
                else "Dealer verification is not listed."
            )

            delivery_text = (
                "Home delivery is available."
                if best["delivery"]
                else "Home delivery availability is not listed."
            )

            reply = (
                f"The lowest listed price for {material_name} "
                f"in Deoghar is ₹{best['price']} {unit} "
                f"at {best['name']}, {best['area']}. "
                f"{verified_text} {delivery_text}"
            )

        # Verified + delivery query
        elif wants_verified and wants_delivery:
            reply = (
                f"I found {len(dealer_hits_lite)} verified dealer"
                f"{'s' if len(dealer_hits_lite) != 1 else ''} "
                f"offering home delivery for {material_name} in Deoghar."
            )

        # Verified dealers query
        elif wants_verified:
            reply = (
                f"I found {len(dealer_hits_lite)} verified dealer"
                f"{'s' if len(dealer_hits_lite) != 1 else ''} "
                f"for {material_name} in Deoghar."
            )

        # Delivery query
        elif wants_delivery:
            reply = (
                f"I found {len(dealer_hits_lite)} dealer"
                f"{'s' if len(dealer_hits_lite) != 1 else ''} "
                f"offering delivery for {material_name} in Deoghar."
            )

        # General material query
        else:
            best = dealer_hits_lite[0]

            reply = (
                f"{material_name} is currently listed from "
                f"₹{market['min']} to ₹{market['max']} {unit} "
                f"across {market['dealer_count']} dealers. "
                f"The lowest listed price is ₹{best['price']} "
                f"at {best['name']}, {best['area']}."
            )

    elif matched_material:
        reply = (
            f"No matching dealer price is currently available "
            f"for {matched_material['name']} in Deoghar."
        )

    else:
        reply = (
            "I can help you compare building material prices, "
            "verified dealers and delivery availability in Deoghar. "
            "Try asking about Cement, TMT Steel, Bricks, Sand, "
            "Stone Chips or Aggregate."
        )

    # ------------------------------------------------------
    # Final response
    # ------------------------------------------------------

    return {
        "query": q.query,
        "answer": reply,
        "ai_powered": ai_used,
        "materials": material_hits_lite,
        "dealers": dealer_hits_lite,
        "market": market,
    }

@api.get("/prices/daily")
async def daily_prices():

    dealers = await db.dealers.find(
        {},
        {"_id": 0},
    ).to_list(500)

    stats = compute_material_stats(dealers)

    material_map = {
        m["slug"]: m
        for m in MATERIALS
    }

    board = []

    for slug, stat in stats.items():

        material = material_map.get(slug)

        if not material:
            continue

        trends = [
            price["trend"]
            for dealer in dealers
            for price in dealer["prices"]
            if price["material_slug"] == slug
        ]

        up = trends.count("up")
        down = trends.count("down")

        if up > down:
            overall = "up"
        elif down > up:
            overall = "down"
        else:
            overall = "flat"

        board.append(
            {
                "slug": slug,
                "name": material["name"],
                "unit": material["unit"],
                "min": stat["min"],
                "max": stat["max"],
                "avg": stat["avg"],
                "trend": overall,
                "dealer_count": stat["dealer_count"],
            }
        )

    board.sort(key=lambda x: x["name"])

    return {
        "city": "Deoghar",
        "state": "Jharkhand",
        "updated_at": datetime.now(
            timezone.utc
        ).isoformat(),
        "board": board,
    }
# ==========================================================
# ADMIN AUTH
# ==========================================================


# ==========================================================
# MIDDLEWARE
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sahirate.in",
        "https://www.sahirate.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# ROUTERS
# ==========================================================
api.include_router(admin_router)

api.include_router(materials_router)

api.include_router(dealers_router)

api.include_router(onboarding_router)

app.include_router(api)


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "SahiRate API",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
