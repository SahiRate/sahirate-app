SahiRate — Project State

Single source of truth for project continuity.

Do not append duplicate full checkpoints. Update the relevant section when the project state changes.

1. Project

Website: https://www.sahirate.in

Repository: SahiRate/sahirate-app

Product: India's Building Material Intelligence Platform

Primary market: Deoghar, Jharkhand

Expansion principle: Deoghar-first, India-scale

Current phase: Phase 0 — Architecture Inventory & Controlled Modularization Planning

Core positioning

Tagline: Har Material ka SahiRate.

Supporting line: Sahi Jankari. Behtar Faisle.

Communicate transparency, trust, market intelligence and smarter construction decisions.

Do not prominently identify Sangam Infra Resources on public SahiRate pages.

Do not change the logo without explicit decision.

Keep the premium navy + orange visual language.

2. Git / Production

Working/live branch: checkpoint-2026-08-19

main: not overwritten

Frontend: Vercel

Backend: Render

Production site: https://www.sahirate.in

Production API: https://sahirate-api.onrender.com

Latest architecture commit

48d278f — docs: add SahiRate architecture map

ARCHITECTURE_MAP.md has been committed and pushed to:

checkpoint-2026-08-19

The push was verified:

9fd255d..48d278f
checkpoint-2026-08-19 -> checkpoint-2026-08-19

Important recent commits

496bcdb — Careers page
c8ab27c — Phase 2 materials data flow and homepage fixes
31fcbc7 — Fix material image paths
9fd255d — Update SahiRate material pricing and brand assets
d09246a — Add material market status and local images
48d278f — docs: add SahiRate architecture map

Production deployment history

Commit 9fd255d was successfully pushed to GitHub and deployed to Vercel Production.

At that checkpoint:

Environment: Production
Status: Ready
Domain: www.sahirate.in
Source branch: checkpoint-2026-08-19
Source commit: 9fd255d

The production site was opened and visually verified after that deployment.

Current HEAD is now 48d278f; production deployment must be re-verified after the next production code change.

3. Architecture Status

Approved architecture principle

Research discovers → Verification approves → Master Data defines → Database stores → Services calculate → API exposes → Frontend displays.

Deoghar is the first market, not the permanent architecture.

Location/Market is a first-class domain so that future expansion can support:

India
├── Jharkhand
│   ├── Deoghar
│   ├── Ranchi
│   └── ...
├── Bihar
│   ├── Patna
│   └── ...
└── Other states/cities

Architecture reference

ARCHITECTURE_MAP.md

is the separate long-term architecture document.

It defines:

target folder/module structure

domain boundaries

location/market strategy

research/evidence separation

backend/frontend modularization

image architecture

Entity / Section / Block reference system

one-source-of-truth rule

controlled migration protocol

Do not duplicate the full architecture document inside this file.

4. Current Architecture Phase

Phase 0 — Current Architecture Inventory

The architecture has been approved conceptually.

No mass modularization has been performed yet.

Required sequence

Current file inventory
        ↓
Dependency map
        ↓
KEEP / MOVE / SPLIT / MERGE / ARCHIVE
        ↓
Approved target structure
        ↓
Controlled one-module-at-a-time migration
        ↓
Compile / build / test
        ↓
Git commit

Current next action

Build the actual architecture inventory from the current project tree.

The inventory must identify:

File
Current purpose
Dependencies
Duplicate responsibility
Target module
KEEP / MOVE / SPLIT / MERGE / ARCHIVE
Risk

Do not start mass refactoring before this inventory is approved.

5. Modular Code Reference Standard

Line numbers are secondary because they change when code moves.

Primary future reference:

FILE
+
SR-SECTION
+
SR-BLOCK / ENTITY

Example:

FILE:
backend/data/brands/tmt.py

SECTION:
SR-SECTION: TMT-BRANDS

BLOCK:
SR-BLOCK: BRAND-TMT-JINDAL-PANTHER

Standard section:

# ==========================================================
# SR-SECTION: TMT-BRANDS
# PURPOSE: TMT brand master data
# ==========================================================

Standard block:

# SR-BLOCK: BRAND-TMT-JINDAL-PANTHER

Future code instructions should use:

Path → Section → Block → Exact Change → Test

Approximate line numbers may be supplied only as secondary navigation.

6. Backend Current State

Important current files already shared in this session

backend/seed_data.py
backend/routes/materials.py
frontend/src/lib/api.js

Do not unnecessarily request these files again during the current working session.

backend/seed_data.py

This is currently a large mixed-data file and is the first major modularization candidate.

It currently contains material/master/brand/price/dealer-related seed logic and supporting calculations.

Target direction:

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

seed_data.py should eventually become a small orchestration/compatibility layer rather than a giant source file.

Do not split it blindly.

First map its sections and dependencies.

backend/routes/materials.py

Current responsibilities:

/materials

/materials/{slug}

local material image mapping

migration of missing/external material images to local filenames

material response

dealer comparison

material statistics through compute_material_stats

This route should not be rewritten blindly during modularization.

Backend services — target

backend/services/
├── material_service.py
├── price_service.py
├── dealer_service.py
├── project_service.py
└── manpower_service.py

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

7. Frontend Current State

Stack

React

React Router

Vite

Axios

Tailwind/CSS

Lucide

Active SEO component

frontend/src/components/SEO.jsx

Old:

frontend/src/seo/SEO.jsx

has been removed.

Important pages/components

Home
Materials
Material Detail
Dealers
Dealer Detail
Live Prices
About
Contact
Careers
Terms & Conditions
Navbar
Footer
WelcomeOverlay
AISearchDialog

Current source structure includes:

frontend/src/
├── components/
│   ├── home/
│   └── ui/
├── constants/
├── context/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── App.css
├── App.jsx
├── index.css
├── index.js
└── main.jsx

Future feature-oriented structure:

components/
├── common/
├── materials/
├── dealers/
├── projects/
└── manpower/

Existing home/ and generic ui/ components should be evolved, not destroyed.

Large pages such as MaterialDetail.jsx should eventually become page orchestration layers with feature components underneath.

8. Frontend API Boundary

Current:

frontend/src/lib/api.js

contains public and admin API operations.

Public

fetchMaterials
fetchMaterial
fetchDealers
fetchDealer
fetchDailyPrices
aiSearch

Admin

adminLogin
createMaterial
updateMaterial
deleteMaterial
getAdminDealers
createDealer
updateDealer
deleteDealer

It also contains:

backend URL resolution

Axios client

admin bearer-token interceptor

This should initially remain the API boundary.

If it becomes large enough later, it may be split into:

lib/api/
├── public.js
├── materials.js
├── dealers.js
├── prices.js
├── admin.js
└── index.js

Do not split merely for appearance.

9. Material Master / Data Status

Current material image migration

backend/seed_data.py was updated in commit:

d09246a
Add material market status and local images

Relevant brand records received:

market_status: "NOT_YET_VERIFIED"

Old external material image URLs were replaced by local filenames for the mapped materials.

Current local mapping:

bricks        → redbricks.jpg
stone-chips   → Stone_Chips.jpg
aggregate     → aggregate.jpg
cement        → cement.jpg
tmt-steel     → tmt-steel.jpg
sand          → river-sand.jpg
ac-blocks     → AAC_Blocks.jpg
binding-wire  → binding_wire.jpg
nails         → nail.jpg
nariyal-rassi → narival_rassi.jpg

Syntax verification

Successfully checked with:

py -m py_compile .\backend\seed_data.py

No output = successful syntax check.

The python command was not available through the Windows execution alias, while py worked correctly.

10. Deoghar Market Master Data — Current Priority

SahiRate is Deoghar-first, but the architecture must remain India-scale.

Required logical hierarchy:

Category
  ↓
Material
  ↓
Brand
  ↓
Product / Sub-brand
  ↓
Grade / Size / Variant
  ↓
Dealer
  ↓
Local Price

Examples:

Cement → Brand → Product → Grade
TMT Steel → Brand → Product → Grade → Diameter
Bricks → Type → Local Manufacturer/Brand → Size
AAC Blocks → Brand → Size

Market verification rule

Do not create a generic India-wide market list merely because a brand exists nationally.

Each market-specific brand/product should eventually be classified using evidence, for example:

MARKET_ACTIVE
AVAILABLE_ON_ORDER
NOT_YET_VERIFIED

Prices must come from actual dealer/market evidence.

Never fabricate local prices.

Candidate master data should be based on:

Deoghar dealer evidence

Deoghar project/tender approved-make evidence

dealer-submitted products

actual local price observations

credible public Deoghar/Jharkhand evidence

National availability alone is not proof of Deoghar stock.

11. Research Architecture

Research is evidence, not production master data.

Target:

research/
├── markets/
│   ├── IN-JH-DGR/
│   ├── IN-JH-RNC/
│   └── ...
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

Evidence states:

UNVERIFIED
VERIFIED
REJECTED
OUTDATED

A research discovery must not become verified market intelligence merely because it was found online.

12. Dealer / Vendor Ecosystem

Intended workflow:

Dealer submits
    ↓
Pending
    ↓
Admin review
    ↓
Verification
    ↓
OTP/claim where required
    ↓
Final approval
    ↓
Dealer ID
    ↓
Public dealer flow

Production-grade verification remains pending.

SahiRate is not a marketplace/checkout platform.

Future dealer functionality includes:

dealer registration

onboarding

admin approval

dealer login/profile

price submission/update

verification

dashboard

13. Price Intelligence

Current daily-price capability exists.

Target future intelligence:

Current price
Min price
Max price
Average price
Daily trend
Historical data
30-day history
90-day history
365-day history
Price charts
Material-wise movement
Dealer-wise comparison
Market insights

Historical/deeper price intelligence is still pending.

14. Construction Intelligence

Future construction-intelligence domains:

Cost Calculator

Area input
Material quantity estimation
Cement calculation
Steel calculation
Sand calculation
Aggregate calculation
Bricks calculation
Current-rate integration
Estimated material cost

Manpower Intelligence

Future foundation:

Manpower Supplier
Manpower Team
Worker
Skill
Trade
Experience
Availability
Capacity
Project History
Verification
Performance

This is intended to support future large-project requirements.

15. Project Intelligence

Private foundation planned for future use.

Target logical entities:

Project
Project Evidence
Project Material Usage
Project Brands
Project Dealers
Project Prices
Project Documents
Project Milestones

Example relationship:

Project
  ↓
Material
  ↓
Brand / Product
  ↓
Dealer
  ↓
Price Evidence

Project evidence is not automatically equivalent to market-active evidence.

This intelligence layer will initially remain private/admin-oriented and will not be exposed as a public marketing claim without sufficient verified evidence.

16. Image / Asset Architecture

Images are a first-class architecture domain.

Current project has both:

public/images/
src/assets/

with overlapping brand/material assets.

Known current areas include:

public/images/brands/cement/
public/images/brands/tmt/
public/images/materials/

src/assets/brands/
src/assets/brands/tmt/
src/assets/

Target public image structure

public/
└── images/
    ├── brand/
    │   ├── cement/
    │   ├── tmt/
    │   └── ...
    ├── material/
    │   ├── cement/
    │   ├── tmt/
    │   ├── bricks/
    │   ├── sand/
    │   ├── stone-chips/
    │   ├── aggregate/
    │   └── aac-blocks/
    ├── projects/
    ├── dealers/
    ├── markets/
    └── ui/

Asset rules

New filenames should be predictable and preferably lowercase/kebab-case.

Do not use random filenames.

Do not use external Unsplash URLs for production material images.

Brand assets and material photographs are separate asset types.

Project evidence images must not be mixed with generic material images.

Market-specific imagery must not be confused with national brand assets.

Before moving any existing image, search all imports/references.

Delete duplicates only after reference verification.

No image mass-move or deletion has been approved yet.

First perform an asset inventory:

filename
location
type
import/reference
duplicate status
public vs bundled usage

17. SEO Status

SEO is approximately 70–75% complete.

Completed

central SEO component

titles/descriptions/keywords

canonical URLs

robots

Open Graph basics

Twitter metadata

basic Website JSON-LD

sitemap

robots.txt

Google verification file

page-level path corrections

Remaining

full public-page SEO audit

Material Detail dynamic SEO

Dealer Detail dynamic SEO

page-specific structured data

production canonical verification

localhost/development URL check

final production indexing verification

SEO remains a separate workstream after product/data architecture is stable.

18. SahiAI / Ask AI

NOT PRODUCTION READY.

Keep hidden or clearly marked Coming Soon until:

backend is ready

frontend is ready

security/rate limiting is verified

input handling is verified

reliability is verified

Do not expose unfinished AI as production-ready.

19. Responsive / QA

Final QA remains pending across the public site.

Target checks:

Desktop 1440+
Laptop ~1280
Tablet
Mobile 390 / 430

Check:

navbar
hero
cards
buttons
typography
forms
footer
overflow
contrast
touch targets
404 handling
API errors
loading states
empty states
console errors
network errors
SEO
production smoke test
final regression

20. Existing Work / Verified Foundation

The current platform foundation includes:

Home
Materials
Dealers
Live Prices
SahiAI architecture
About
Contact

Also established:

React frontend

FastAPI backend

MongoDB integration

core material APIs

dealer APIs

daily price API

AI Search architecture

Admin/Auth foundation

production deployment

custom domain

Careers page

Terms & Conditions page

Important completed material-detail work

The latest working history records:

Material Detail UI/data binding fix verified locally

responsive hero image fit fixed using object-cover

Market Overview layout updated

Leading Brands section implemented using actual uploaded logos

brand logo links connect to official brand websites

cement catalog includes ACC, Ambuja, UltraTech, Shree Cement, Nuvoco, Dalmia and Emami

local API performance improved by using local FastAPI during development instead of the Render API

frontend Vite production build passed after those changes

Do not redo these completed items unless regression testing reveals a real problem.

21. Current Known Functional Issues

The previous material checkpoint identified:

Material Stats

Material cards showed:

Min = --
Average = --
Max = --
Dealer Count = 0

Expected stats:

stats.min
stats.max
stats.avg
stats.dealer_count

Cause identified at that checkpoint: the /api/materials list response was not attaching the required stats object.

Do not break the existing material detail endpoint while fixing this.

AAC Blocks

Required image mapping:

ac-blocks → AAC_Blocks.jpg

This mapping has been included in the current local image mapping work, but final end-to-end UI/API verification remains part of the pending QA.

Deoghar Master Data

Still needs finalization:

Material
→ Brand
→ Product/Sub-brand
→ Variant
→ Dealer
→ Local Price

22. Feedback System

PENDING — implementation later.

Planned:

simple Hindi/Hinglish feedback

quick-click feedback

optional text

optional voice/audio

record

play

re-record

submit

material/page context

backend feedback + audio storage

admin viewing/listening

lightweight mobile UI

Purpose:

price accuracy

dealer trust

missing materials/brands

user experience

23. Original Roadmap

Priority 1

Existing functions — verify/fix completely.

Priority 2

Admin + Authentication.

Priority 3

Dealer onboarding + dealer price management.

Priority 4

Price History + deeper price intelligence.

Priority 5

Construction Cost Calculator.

Priority 6

Manpower Directory / Intelligence.

Priority 7

Alerts.

Priority 8

Mobile / PWA.

Priority 9

Multi-city expansion.

Priority 10

Final production QA.

Final QA is not only a last step; smaller QA passes must happen after each phase as well.

24. Geographic Expansion

Current focus:

Deoghar ✅

Future:

Ranchi ⚪
Dhanbad ⚪
Bokaro ⚪
Other Jharkhand cities ⚪
Other states ⚪

Multi-city database architecture is being designed now so expansion does not require a fundamental rewrite.

Do not jump to other cities operationally before the current Deoghar market is stable.

25. API / Environment

Production frontend environment:

VITE_BACKEND_URL=https://sahirate-api.onrender.com

Do not replace this with localhost except for deliberate local backend testing.

Frontend local path:

C:\Users\sunil\Documents\GitHub\sahirate-app\frontend

Useful commands:

npm.cmd run dev
npm.cmd run build

Current local URL:

http://localhost:3000/

Historical CRACO/npm-start issues should not be reopened unless a current test requires it.

26. Project Rules

Do not repeat completed work unless verification shows a real problem.

Do not guess current code state.

Inspect files before editing.

Make small, testable changes.

Update this state file after meaningful sessions.

Do not fabricate prices, dealer data, brand availability or local market facts.

Do not expose unfinished AI as production-ready.

Do not change CORS/API configuration without demonstrated need.

Do not replace production API configuration with localhost unintentionally.

Keep checkpoint-2026-08-19 as active working/live branch unless explicitly changed.

Do not overwrite main without explicit approval.

Do not blindly move/delete files or assets.

Do not make Deoghar a hard-coded architectural dependency.

Do not mix research evidence with production master data.

Do not use line numbers as the only code reference.

One module at a time during modularization.

Test before moving to the next module.

Do not ask again for code already shared in the current session unless it has changed and the new version is required.

27. Current Phase Status

[✓] Existing project history preserved
[✓] Deoghar-first / India-scale principle established
[✓] Architecture direction approved
[✓] ARCHITECTURE_MAP.md created
[✓] ARCHITECTURE_MAP.md committed
[✓] ARCHITECTURE_MAP.md pushed
[✓] Entity / Section / Block reference strategy established
[✓] Image architecture strategy established
[✓] Material market_status changes committed
[✓] Local material image migration committed
[✓] seed_data.py syntax checked

[ ] Current architecture inventory
[ ] Dependency map
[ ] KEEP / MOVE / SPLIT / MERGE / ARCHIVE classification
[ ] Final target folder map
[ ] Backend data modularization
[ ] Backend service/route modularization
[ ] Asset/image dependency migration
[ ] Frontend feature modularization
[ ] Research verification integration
[ ] Project intelligence foundation
[ ] Manpower intelligence foundation

28. Exact Next Development Order

Immediate — Architecture

Build current file inventory.

Build dependency map.

Classify files:

KEEP

MOVE

SPLIT

MERGE

ARCHIVE

Approve final target structure.

Modularize one safe module at a time.

Compile/build/test.

Inspect Git diff.

Commit the completed module.

After architecture baseline

Finalize Deoghar Material → Brand → Product/Sub-brand → Variant structure.

Create verified Deoghar-relevant brand/product master.

Implement compatible backend/database model.

Fix Material Stats.

Verify AAC Blocks image/product mapping.

Complete Material Detail QA.

Verify Dealers.

Finalize Contact production workflow.

Keep SahiAI Coming Soon until production-ready.

Complete SEO to 100%.

Complete responsive QA.

Production build, Git review, push and smoke test.

29. Resume Point

Resume from:

Build the Current Architecture Inventory from the actual project tree, then classify every important source/asset file as KEEP / MOVE / SPLIT / MERGE / ARCHIVE before changing the project structure.

Do not start mass refactoring before the inventory and dependency map are approved.

30. Session Checkpoint Rule

Whenever SahiRate work is paused, record a short checkpoint containing:

Current file/task
Completed
Current issue
Exact next step

This checkpoint must be concise and sufficient to resume work without losing continuity.