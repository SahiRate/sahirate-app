# SahiRate — PRD

## Original problem statement
Build a modern, premium web application called "SahiRate" — an AI-powered Building Material Price Intelligence Platform starting from Deoghar, Jharkhand, India. Bring transparency to building material prices by helping homeowners, contractors, builders and engineers compare prices from multiple local dealers before purchasing. Premium, clean, modern UI inspired by Stripe, Notion, Apple. White + deep navy + orange palette.

**Not a marketplace.** Focus on price intelligence, dealer discovery and data-driven decisions.

## User personas
- Homeowners (planning renovation / construction)
- Contractors & Builders
- Civil Engineers & Architects
- Building Material Dealers (future submission portal)

## Architecture
- **Frontend**: React 19 + React Router 7 + Tailwind + shadcn/ui + Framer Motion + Recharts
- **Backend**: FastAPI + Motor (async MongoDB) + Pydantic
- **DB**: MongoDB (`materials`, `dealers` collections)
- **AI**: OpenAI GPT-5.2 via `emergentintegrations` (Universal Emergent LLM Key)
- **Fonts**: Outfit (headings), Inter (body), JetBrains Mono (numeric data)

## Phase 1 — Shipped (2026-02)
1. Premium homepage (dark navy hero, live price ticker, value props, category grid, dealer CTA)
2. Materials list + Material detail page with dealer price comparison table (sort by price / rating), cheapest highlight, trend pills
3. Dealers directory + Dealer detail page (rating, verified badge, delivery, WhatsApp/Call, offered materials & prices)
4. AI-powered search dialog (GPT-5.2, rule-based fallback) — accessible from every page via "Ask AI" button
5. Live Prices board (daily market snapshot with min/max/avg + trend per material)
6. Backend seeded with 15 realistic Deoghar dealers × 6 material categories (cement, TMT steel, bricks, sand, stone chips, aggregate)

## Deferred / Phase 2 backlog (P0 → P2)
- P0: Dealer submission portal + admin panel for real dealer onboarding
- P0: Auth (JWT-based custom auth or Emergent Google Auth) for dealer accounts
- P1: Construction Cost Calculator (BOQ + material quantity → total cost)
- P1: 365-day Price History with Recharts line charts + CSV export
- P1: Manpower Directory (masons, plumbers, electricians with day rates)
- P2: Multi-city expansion (Ranchi, Dhanbad, Bokaro …)
- P2: Price alerts (email/WhatsApp when a material dips below threshold)
- P2: Dealer reviews & buyer photos
- P2: PWA install + offline mode for on-site use

## Data model (current)
- `materials`: slug, name, unit, description, brands[], image, avg_price, icon
- `dealers`: id, name, area, city, state, rating, reviews_count, years_in_business, phone, whatsapp, verified, delivery, gst_registered, prices[] (material_slug, price, previous_price, trend, updated_at, in_stock)
