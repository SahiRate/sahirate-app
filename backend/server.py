"""SahiRate — AI-powered Building Material Price Intelligence backend."""
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import os
import logging
import random

from seed_data import MATERIALS, build_dealers, compute_material_stats

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# -------- Mongo --------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="SahiRate API")
api = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sahirate")

# ============ MODELS ============
class SearchQuery(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)


# ============ SEED ============
async def seed_if_empty():
    """Populate materials & dealers on first boot. Idempotent."""
    mats_count = await db.materials.count_documents({})
    if mats_count == 0:
        logger.info("Seeding materials...")
        await db.materials.insert_many([{**m} for m in MATERIALS])

    dealers_count = await db.dealers.count_documents({})
    if dealers_count == 0:
        logger.info("Seeding dealers...")
        random.seed(42)
        dealers = build_dealers()
        await db.dealers.insert_many([{**d} for d in dealers])


@app.on_event("startup")
async def on_startup():
    await seed_if_empty()


@app.on_event("shutdown")
async def on_shutdown():
    client.close()


# ============ ROUTES ============
@api.get("/")
async def root():
    return {"service": "SahiRate", "status": "ok", "city": "Deoghar, Jharkhand"}


@api.get("/materials")
async def list_materials():
    """List all material categories with aggregated stats."""
    materials = await db.materials.find({}, {"_id": 0}).to_list(100)
    dealers = await db.dealers.find({}, {"_id": 0}).to_list(500)
    stats = compute_material_stats(dealers)
    for m in materials:
        m["stats"] = stats.get(m["slug"], {"min": None, "max": None, "avg": None, "dealer_count": 0})
    return materials


@api.get("/materials/{slug}")
async def material_detail(slug: str):
    """Get one material + comparison prices across all dealers."""
    material = await db.materials.find_one({"slug": slug}, {"_id": 0})
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    dealers = await db.dealers.find({"prices.material_slug": slug}, {"_id": 0}).to_list(500)
    comparison = []
    for d in dealers:
        for p in d["prices"]:
            if p["material_slug"] == slug:
                comparison.append({
                    "dealer_id": d["id"],
                    "dealer_name": d["name"],
                    "area": d["area"],
                    "rating": d["rating"],
                    "verified": d["verified"],
                    "phone": d["phone"],
                    "delivery": d["delivery"],
                    "in_stock": p["in_stock"],
                    "price": p["price"],
                    "previous_price": p["previous_price"],
                    "trend": p["trend"],
                    "updated_at": p["updated_at"],
                })
    comparison.sort(key=lambda x: x["price"])
    stats = compute_material_stats(dealers)
    material["stats"] = stats.get(slug, {})
    material["comparison"] = comparison
    return material


@api.get("/dealers")
async def list_dealers(material: Optional[str] = None, area: Optional[str] = None):
    query = {}
    if material:
        query["prices.material_slug"] = material
    if area:
        query["area"] = area
    dealers = await db.dealers.find(query, {"_id": 0}).to_list(500)
    # attach material names
    material_map = {m["slug"]: m["name"] for m in MATERIALS}
    for d in dealers:
        d["materials_offered"] = [material_map.get(p["material_slug"], p["material_slug"]) for p in d["prices"]]
    dealers.sort(key=lambda x: (-x["rating"], -x["reviews_count"]))
    return dealers


@api.get("/dealers/{dealer_id}")
async def dealer_detail(dealer_id: str):
    dealer = await db.dealers.find_one({"id": dealer_id}, {"_id": 0})
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    material_map = {m["slug"]: m for m in MATERIALS}
    for p in dealer["prices"]:
        mat = material_map.get(p["material_slug"], {})
        p["material_name"] = mat.get("name", p["material_slug"])
        p["unit"] = mat.get("unit", "")
    return dealer


@api.get("/prices/daily")
async def daily_prices():
    """Compact snapshot for a ticker-style live board."""
    dealers = await db.dealers.find({}, {"_id": 0}).to_list(500)
    stats = compute_material_stats(dealers)
    material_map = {m["slug"]: m for m in MATERIALS}
    board = []
    for slug, s in stats.items():
        mat = material_map[slug]
        # trend of the day (majority)
        trends = [p["trend"] for d in dealers for p in d["prices"] if p["material_slug"] == slug]
        up = trends.count("up"); down = trends.count("down")
        overall = "up" if up > down else ("down" if down > up else "flat")
        board.append({
            "slug": slug,
            "name": mat["name"],
            "unit": mat["unit"],
            "min": s["min"],
            "max": s["max"],
            "avg": s["avg"],
            "trend": overall,
            "dealer_count": s["dealer_count"],
        })
    board.sort(key=lambda x: x["name"])
    return {
        "city": "Deoghar",
        "state": "Jharkhand",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "board": board,
    }


# ============ AI SEARCH ============
@api.post("/search")
async def ai_search(q: SearchQuery):
    """Natural language search over materials & dealers using GPT-5.2."""
    from emergentintegrations.llm.chat import LlmChat, UserMessage

    materials = await db.materials.find({}, {"_id": 0}).to_list(100)
    dealers = await db.dealers.find({}, {"_id": 0}).to_list(500)
    stats = compute_material_stats(dealers)

    # Compact context for the LLM (cheap + fast)
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
    ctx_dealers = [
        {
            "id": d["id"],
            "name": d["name"],
            "area": d["area"],
            "rating": d["rating"],
            "verified": d["verified"],
            "delivery": d["delivery"],
            "materials": [p["material_slug"] for p in d["prices"]],
            "cheapest_prices": {p["material_slug"]: p["price"] for p in d["prices"]},
        }
        for d in dealers
    ]

    system = (
        "You are SahiRate's AI concierge for building material prices in Deoghar, Jharkhand. "
        "Answer the user's construction/material question concisely using ONLY the provided data. "
        "When quoting a price, always include the unit and mention the cheapest dealer (name + area). "
        "If the user asks a general construction question that our data cannot answer directly, "
        "provide a short helpful reply and suggest which SahiRate section to explore. "
        "Keep answers under 120 words, use plain text, no markdown headers."
    )
    context = (
        f"CITY: Deoghar, Jharkhand\n"
        f"MATERIALS_STATS: {ctx_materials}\n\n"
        f"DEALERS: {ctx_dealers}\n"
    )
    prompt = f"{context}\n\nUser question: {q.query}"

    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    ai_used = True
    try:
        chat = LlmChat(
            api_key=api_key,
            session_id=f"search-{datetime.now(timezone.utc).timestamp()}",
            system_message=system,
        ).with_model("openai", "gpt-5.2")
        reply = await chat.send_message(UserMessage(text=prompt))
    except Exception as e:
        logger.warning(f"LLM search fallback (using rule-based): {e}")
        ai_used = False
        # Rule-based fallback so UX still works when LLM key has no budget
        ql = q.query.lower()
        matched_slug = None
        for m in materials:
            if m["slug"] in ql or m["name"].lower() in ql:
                matched_slug = m["slug"]; break
        if matched_slug:
            mat = next(m for m in materials if m["slug"] == matched_slug)
            s = stats.get(matched_slug, {})
            cheapest = None
            for d in dealers:
                for p in d["prices"]:
                    if p["material_slug"] == matched_slug:
                        if cheapest is None or p["price"] < cheapest[1]:
                            cheapest = (d, p["price"])
            if cheapest:
                d, price = cheapest
                reply = (
                    f"For {mat['name']} in Deoghar, current prices range from ₹{s.get('min')} to "
                    f"₹{s.get('max')} {mat['unit']} across {s.get('dealer_count')} dealers. "
                    f"The cheapest today is {d['name']} in {d['area']} at ₹{price}. "
                    f"Average price is ₹{s.get('avg')}."
                )
            else:
                reply = f"No dealer data found for {mat['name']}."
        else:
            reply = (
                "I can help you compare cement, TMT steel, bricks, sand, stone chips and aggregate prices "
                "across 15+ verified dealers in Deoghar. Try asking about a specific material — e.g. "
                "'cheapest TMT steel' or 'brick prices near Baidyanath Chowk'."
            )

    # Also compute simple keyword matches to return as structured hits
    ql = q.query.lower()
    material_hits = [m for m in materials if ql in m["name"].lower() or ql in m["slug"]]
    dealer_hits = [d for d in dealers if ql in d["name"].lower() or ql in d["area"].lower()][:6]

    # strip heavy fields from dealer_hits
    dealer_hits_lite = [
        {"id": d["id"], "name": d["name"], "area": d["area"], "rating": d["rating"], "verified": d["verified"]}
        for d in dealer_hits
    ]
    material_hits_lite = [
        {"slug": m["slug"], "name": m["name"], "unit": m["unit"]} for m in material_hits
    ]

    return {
        "query": q.query,
        "answer": reply,
        "ai_powered": ai_used,
        "materials": material_hits_lite,
        "dealers": dealer_hits_lite,
    }


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
