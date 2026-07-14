# SahiRate

AI-powered Building Material Price Intelligence Platform for Deoghar, Jharkhand (India). Compare live building material prices across verified local dealers, discover the best rates near you, and make data-driven construction decisions — powered by GPT-5.2.

> **Not a marketplace.** SahiRate focuses on price intelligence, dealer discovery, and transparency — no checkout, no cart.

---

## Tech Stack

- **Frontend**: React 19, React Router 7, Tailwind CSS, shadcn/ui, Framer Motion, Recharts
- **Backend**: FastAPI, Motor (async MongoDB), Pydantic v2
- **Database**: MongoDB
- **AI**: OpenAI GPT-5.2 via `emergentintegrations` (Emergent Universal LLM Key)
- **Fonts**: Outfit (headings), Inter (body), JetBrains Mono (numeric data)

## Project Structure

```
/app
├── backend/
│   ├── server.py           # FastAPI app + all /api routes
│   ├── seed_data.py        # Realistic Deoghar material & dealer seed data
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/          # Home, MaterialsList, MaterialDetail, DealersList, DealerDetail, LivePrices
│   │   ├── components/     # Navbar, Footer, AISearchDialog + shadcn/ui
│   │   ├── lib/api.js      # Axios client
│   │   └── App.js
│   ├── package.json
│   └── .env.example
├── memory/
│   ├── PRD.md
│   └── test_credentials.md
└── README.md
```

## Getting Started (local dev)

### 1. Backend
```bash
cd backend
cp .env.example .env               # fill MONGO_URL, DB_NAME, EMERGENT_LLM_KEY
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

On first boot the backend seeds MongoDB with 6 material categories and 15 realistic Deoghar dealers. Seeding is idempotent.

### 2. Frontend
```bash
cd frontend
cp .env.example .env               # set REACT_APP_BACKEND_URL
yarn install
yarn start
```

Open http://localhost:3000.

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Path                       | Purpose                                                  |
|--------|----------------------------|----------------------------------------------------------|
| GET    | `/api/`                    | Health check                                             |
| GET    | `/api/materials`           | List all materials with aggregated min/max/avg stats     |
| GET    | `/api/materials/{slug}`    | Material detail + dealer comparison sorted by price      |
| GET    | `/api/dealers`             | List dealers (filters: `material`, `area`)               |
| GET    | `/api/dealers/{id}`        | Dealer detail with enriched prices                       |
| GET    | `/api/prices/daily`        | Today's price board (min/max/avg/trend per material)     |
| POST   | `/api/search`              | AI natural-language search (GPT-5.2 + rule-based fallback) |

## Data Model

- **materials**: `slug`, `name`, `unit`, `description`, `brands[]`, `image`, `avg_price`
- **dealers**: `id`, `name`, `area`, `city`, `state`, `rating`, `reviews_count`, `years_in_business`, `phone`, `verified`, `delivery`, `gst_registered`, `prices[]`
  - each price → `material_slug`, `price`, `previous_price`, `trend`, `updated_at`, `in_stock`

## Phase 1 — Shipped

1. Premium homepage (dark-navy hero, live price ticker, category grid, dealer CTA)
2. Material Price Comparison table (sort by price/rating, cheapest highlight, trend pills)
3. Dealer Directory with search, verified/delivery filters, call & WhatsApp deep-links
4. AI-powered Search dialog (GPT-5.2, works even when LLM budget is 0 via rule-based fallback)
5. Live Prices board (daily market snapshot per material)

## Phase 2 — Roadmap

- Dealer submission portal + admin panel + Auth (JWT / Emergent Google Auth)
- Construction Cost Calculator
- 365-day Price History with Recharts
- Manpower Directory
- Multi-city expansion (Ranchi, Dhanbad, Bokaro, …)
- Price-drop alerts via email/WhatsApp
- PWA install for on-site use

## License

Proprietary — © SahiRate. All rights reserved.
