SahiRate Architecture Map

Document: ARCHITECTURE_MAP.md
Status: Architecture baseline — Phase 0
Purpose: Define the long-term project structure before modularization.
Scope: Deoghar-first, India-scale expansion.

1. Core Architecture Principle

Research discovers → Verification approves → Master Data defines → Database stores → Services calculate → API exposes → Frontend displays.

Deoghar is the first market, not the permanent architecture.

The codebase must therefore avoid hard-coding Deoghar into the core domain model. Location/market is a first-class concept.

2. Target High-Level Structure

sahirate-app/
│
├── ARCHITECTURE_MAP.md
├── PROJECT_STATE.md
├── memory/
│
├── research/
│   ├── markets/
│   ├── brands/
│   ├── dealers/
│   ├── projects/
│   └── manpower/
│
├── backend/
│   ├── data/
│   │   ├── locations/
│   │   ├── materials/
│   │   ├── brands/
│   │   ├── products/
│   │   ├── variants/
│   │   ├── dealers/
│   │   ├── prices/
│   │   ├── projects/
│   │   └── manpower/
│   │
│   ├── routes/
│   ├── services/
│   ├── schemas/
│   ├── utils/
│   └── seed_data.py
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── materials/
│       │   ├── dealers/
│       │   ├── projects/
│       │   └── manpower/
│       ├── pages/
│       ├── layouts/
│       ├── hooks/
│       ├── context/
│       ├── lib/
│       ├── constants/
│       └── assets/
│
├── public/
│   └── images/
│
└── tests/

Important: This is the target architecture. Existing files will be moved/split only after inventory and dependency checks. No blind mass-move.

3. Domain Model

Global / reusable entities

Location
Market
Material
Brand
Product
Variant

Market-specific entities

Dealer
Dealer ↔ Market
Price Observation
Availability
Market Status

Intelligence entities

Project
Project Evidence
Project Material Usage
Manpower Supplier
Manpower Team
Skill
Project History

A national brand must not be duplicated simply because it exists in multiple markets.

Example:

BRAND.ACC
   ├── MARKET.IN-JH-DGR
   ├── MARKET.IN-JH-RNC
   └── MARKET.IN-BR-PAT

4. Location / Market Rule

Never make a core file such as:

backend/data/brands/deoghar.py

the permanent source of truth for a brand.

Prefer:

brand = ACC
market = IN-JH-DGR
status = MARKET_ACTIVE

This permits later expansion to Ranchi, Patna, Kolkata and other markets without redesigning the architecture.

Suggested market identifier format:

IN-JH-DGR   # India / Jharkhand / Deoghar
IN-JH-RNC   # India / Jharkhand / Ranchi
IN-BR-PAT   # India / Bihar / Patna

The exact location-ID standard will be finalized during the inventory phase.

5. Entity / Section / Block Identification

Line numbers are not the primary reference because lines move when code changes.

Every important module will use:

FILE
SECTION ID
ENTITY / BLOCK ID

Example:

File:
backend/data/brands/tmt.py

Section:
SR-SECTION: TMT-BRANDS

Block:
SR-BLOCK: BRAND-TMT-JINDAL-PANTHER

Approximate line numbers may be included as a secondary navigation aid.

Standard section format

# ==========================================================
# SR-SECTION: TMT-BRANDS
# PURPOSE: TMT brand master data
# ==========================================================

Standard block format

# SR-BLOCK: BRAND-TMT-JINDAL-PANTHER

6. One Source of Truth

A single entity must have one canonical definition.

Do not duplicate:

ACC
Jindal Panther
UltraTech

across multiple unrelated files.

References/relationships should point to the canonical entity.

This prevents conflicting names, logos, products and market statuses.

7. Research Architecture

Research is evidence, not production master data.

Target:

research/
├── markets/
│   ├── IN-JH-DGR/
│   ├── IN-JH-RNC/
│   └── ...
│
├── brands/
├── dealers/
├── projects/
└── manpower/

Research records should eventually support:

source
source_url
research_date
market
entity
evidence
verification_status
confidence
last_verified

Recommended evidence states:

UNVERIFIED
VERIFIED
REJECTED
OUTDATED

No research claim should become production market intelligence merely because it was found online.

8. Backend Architecture

Current important area

backend/seed_data.py is currently a major mixed-data file and is the first major modularization candidate.

It must eventually be reduced to an orchestration/compatibility role.

Target data separation:

backend/data/
├── locations/
├── materials/
├── brands/
├── products/
├── variants/
├── dealers/
├── prices/
├── projects/
└── manpower/

Services

Business logic belongs in:

backend/services/
├── material_service.py
├── price_service.py
├── dealer_service.py
├── project_service.py
└── manpower_service.py

Routes

Routes should remain thin:

request
  ↓
route
  ↓
service
  ↓
database
  ↓
response

Do not place large business calculations inside route handlers unless there is a clear reason.

9. Frontend Architecture

The current frontend already contains useful separation:

src/
├── components/
│   ├── home/
│   └── ui/
├── pages/
├── lib/
├── hooks/
├── context/
├── constants/
└── assets/

This should be evolved rather than destroyed.

Target feature-oriented components

components/
├── common/
├── materials/
├── dealers/
├── projects/
└── manpower/

Existing home/ and generic ui/ areas can remain where they are useful.

Large pages such as MaterialDetail.jsx should eventually become page orchestration layers with feature components underneath.

10. Images / Asset Architecture

Images are part of the architecture, not miscellaneous files.

Current tree shows both:

public/images/
src/assets/

with duplicated/overlapping brand assets and material assets.

Do not move or delete these yet.

First create an asset inventory and identify import/public URL dependencies.

Target public image structure

public/
└── images/
    ├── brand/
    │   ├── cement/
    │   ├── tmt/
    │   ├── steel/
    │   └── ...
    │
    ├── material/
    │   ├── cement/
    │   ├── tmt/
    │   ├── bricks/
    │   ├── sand/
    │   ├── stone-chips/
    │   ├── aggregate/
    │   └── aac-blocks/
    │
    ├── projects/
    │   └── ...
    │
    ├── dealers/
    │   └── ...
    │
    ├── markets/
    │   └── ...
    │
    └── ui/
        ├── logo/
        ├── icons/
        └── backgrounds/

Asset rules

Use predictable lowercase/kebab-case names for new assets.

Do not use random filenames.

Do not store production material images as external Unsplash URLs.

Do not duplicate the same brand logo in multiple folders unless there is a deliberate variant requirement.

Brand assets and material photographs are different asset types.

Project evidence images must not be mixed with generic material images.

Market-specific imagery must not be confused with national brand assets.

Before moving an existing image, search all references/imports.

Delete duplicates only after reference verification.

11. Current Asset Findings

The supplied current tree shows:

public/images/brands/cement/
public/images/brands/tmt/
public/images/materials/

src/assets/brands/
src/assets/brands/tmt/
src/assets/

There are also multiple logo/image variants and duplicated brand assets.

Examples visible in the current tree include:

public/images/brands/cement/
public/images/brands/tmt/
src/assets/brands/
src/assets/brands/tmt/

This is a known modularization candidate, but not a permission to delete anything yet.

12. Frontend API Boundary

Current src/lib/api.js is the central API client.

It currently covers public and admin operations including:

materials
dealers
daily prices
AI search
admin login
admin materials
admin dealers

This file should remain the API boundary initially.

Later, if it becomes too large, it can be split by domain:

lib/api/
├── public.js
├── materials.js
├── dealers.js
├── prices.js
├── admin.js
└── index.js

Do not split it merely for appearance; split when domain growth justifies it.

13. What Must NOT Happen

Do not:

rewrite the entire project in one step

blindly move files

delete duplicate-looking assets before reference checks

make Deoghar a hard-coded architecture constraint

put research evidence directly into production code

use line numbers as the only code reference

create a separate file for every tiny object

create APIs before the underlying feature requires them

mix project evidence with material master data

mix manpower data with dealer data

14. Modularization Order

M0  Architecture inventory
    ↓
M1  Architecture documentation
    ↓
M2  Backend data modularization
    ↓
M3  Backend services / route cleanup
    ↓
M4  Asset/image modularization
    ↓
M5  Frontend feature modularization
    ↓
M6  Research / verification integration
    ↓
M7  Projects + manpower foundation
    ↓
M8  Final cleanup + regression testing

The actual order may be adjusted after dependency inspection.

15. Change Protocol

Every future code change should be communicated as:

FILE
SECTION
BLOCK
CHANGE
TEST

Example:

FILE:
backend/data/brands/tmt.py

SECTION:
SR-SECTION: TMT-BRANDS

BLOCK:
SR-BLOCK: BRAND-TMT-JINDAL-PANTHER

CHANGE:
Replace only the verified product list.

TEST:
py -m py_compile ...

16. Safety Protocol

Before each structural move:

inspect
→ identify dependencies
→ make one change
→ compile/build
→ inspect diff
→ test
→ commit

One module at a time.

No mass refactor without a rollback point.

17. Expansion Principle

SahiRate is:

Deoghar-first
India-scale

The architecture must support:

one market
→ multiple markets
→ multiple states
→ national coverage

without changing the fundamental domain model.

18. Current Status

Architecture design is approved conceptually.

No mass modularization has been performed yet.

The next technical step is the current-file inventory and dependency map, followed by a controlled migration plan.

