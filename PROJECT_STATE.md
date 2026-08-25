SahiRate — Master Project Continuity Checkpoint

Last Updated: 26 August 2026
Purpose: Single source of truth for project continuity. Update this file after every meaningful development session. Do not append duplicate full checkpoints.

1. Project Identity

Project: SahiRate

Website: https://www.sahirate.in

Repository: SahiRate/sahirate-app

Product: India's Building Material Intelligence Platform

Primary market: Deoghar, Jharkhand

Core positioning: Building Material Price Intelligence + Market Information + Dealer Discovery + Price Transparency + Construction Decision Support

Tagline: Har Material ka Sahi Rate.

Supporting line: Sahi Jankari. Behtar Faisle.

Do not prominently identify Sangam Infra Resources on public SahiRate pages.

Do not change the logo without explicit approval.

Current visual language: premium navy + orange.

Keep unfinished/experimental SahiAI functionality out of production until tested.

2. Current Development Status — IMPORTANT

Overall

The project is currently in an active functional-integration phase, not a redesign phase.

Completed in the latest work

SmartBuild calculation engine completed and regression-tested.

SmartBuild frontend is now implemented at /smartbuild.

SmartBuild civil icons were added:

frontend/src/assets/smartbuild/plastering.png

frontend/src/assets/smartbuild/foundation.png

SmartBuild UI was visually tested locally.

Dealer master import completed.

MongoDB dealer count verified at 69.

Dealers page verified showing 69 dealers.

Real dealer data is now flowing through MongoDB → backend → frontend.

Dealer search/filter/sort UI already exists and currently exposes:

dealer/area/material search

material filter

area filter

sorting (including Rating)

Plus Codes from the real dealer dataset were preserved where available.

Current immediate priority

Do not restart SmartBuild architecture or dealer import.

Next work should focus on:

Dealer data quality / missing-field workflow.

Dealer search/sort/filter QA.

Admin dealer management and future employee shop-visit workflow.

SmartBuild functional QA and backend/API hardening.

Only then broader UI/SEO/production polish.

3. Git / Branch Context

Working branch previously used:
checkpoint-2026-08-19

Important earlier commits:

48d278f — docs: add SahiRate architecture map

496bcdb — Add Careers page

c8ab27c — Phase 2 materials data flow and homepage fixes

31fcbc7 — Fix material image paths

9fd255d — Update SahiRate material pricing and brand assets

Git rule

Before committing:

git status

Do not overwrite main without explicit approval.

Do not assume the working tree is clean.

4. Frontend

Stack

React

React Router

Vite

Axios

Tailwind/CSS utilities

Lucide React

Frontend directory

C:\Users\sunil\Documents\GitHub\sahirate-app\frontend

Correct local command

The frontend is a Vite app.

cd C:\Users\sunil\Documents\GitHub\sahirate-app\frontend
npm.cmd run dev

Do NOT use:

npm.cmd start

npm run currently exposes:

dev → vite

build → vite build

preview → vite preview

lint

format

Local frontend

Current local URL:

http://localhost:3000/

Important pages:

/

/materials

/dealers

/live-prices

/about

/contact

/smartbuild

Important files:

frontend/src/App.jsx
frontend/src/components/Navbar.jsx
frontend/src/components/Footer.jsx
frontend/src/components/AISearchDialog.jsx
frontend/src/components/WelcomeOverlay.jsx
frontend/src/pages/Home.jsx
frontend/src/pages/MaterialsList.jsx
frontend/src/pages/MaterialDetail.jsx
frontend/src/pages/DealersList.jsx
frontend/src/pages/DealerDetail.jsx
frontend/src/pages/LivePrices.jsx
frontend/src/pages/SmartBuild.jsx
frontend/src/lib/api.js
frontend/src/components/SEO.jsx

5. Backend

Backend directory

C:\Users\sunil\Documents\GitHub\sahirate-app\backend

Python

Use:

py

Do not rely on the Windows python alias.

Correct local backend command

Run from the backend directory:

cd C:\Users\sunil\Documents\GitHub\sahirate-app\backend
py -m uvicorn server:app --host 0.0.0.0 --port 8000

Verified successfully in the latest session:

Application startup complete.
Uvicorn running on http://0.0.0.0:8000

The FastAPI on_event deprecation warnings are non-blocking. Do not refactor them unless deliberately scheduled.

Swagger:

http://127.0.0.1:8000/docs

6. API Configuration

Production frontend API must remain:

https://sahirate-api.onrender.com

frontend/src/lib/api.js is intended to use:

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://sahirate-api.onrender.com";

const API = `${BACKEND_URL}/api`;

Do not replace production API configuration with localhost unintentionally.

For local backend testing, use the deliberate local environment only.

7. SmartBuild — CURRENT STATUS

Purpose

SmartBuild is a major SahiRate USP.

Target value:

Material Quantity
+
Mason Requirement
+
Helper/Labour Requirement
+
Estimated Duration
+
Material Cost
+
Labour Cost
+
Grand Estimate
+
PDF / Share / WhatsApp

The product should help users understand the complete construction requirement, not only material prices.

Frontend status

IMPLEMENTED

Route:

/smartbuild

The SmartBuild page was opened and visually verified locally.

Current supported construction purposes:

Brick Wall

RCC Slab

PCC

Plaster

Foundation

The SmartBuild UI displays material requirements, labour information, duration and estimate information.

Important UI decision

Do not redesign the whole SahiRate UI now.

Functional integration and data correctness come first.

8. SmartBuild Calculation Engine — COMPLETED

Directory:

backend/calculation/

Key modules include:

engine.py
rules.py
units.py
labour.py
cost.py
schema.py
registry.py
reference_registry.py
region_rules.py
pcc.py
pcc_engine.py
plaster.py
plaster_engine.py
foundation.py
foundation_engine.py
aggregate_master.py
aggregate_rates.py
aggregate_provider.py
sand_master.py
brick_master.py
cement_master.py
tmt_master.py

Implemented calculators:

Brick Wall

RCC Slab

PCC

Plaster

Foundation

Regression verification previously passed:

CALCULATORS: 5
SCHEMA: 1.0
RULE VERSIONS: ['0.1.0']
REFERENCE STATUS: ['PENDING_VERIFICATION']
SMARTBUILD REGRESSION: PASS

Each calculator returns:

result

schema version

rule version

reference status

materials

labour

duration

cost

When rate data is incomplete:

RATE_DATA_REQUIRED

Calculations remain:

PRELIMINARY_ESTIMATE

Do not present preliminary productivity or engineering assumptions as guaranteed site requirements.

9. SmartBuild Reference / Material Architecture

Completed masters:

Aggregate

Sand

Brick

Cement

TMT

Architecture principle:

Rule
 ↓
Reference
 ↓
Region
 ↓
Verification

Current reference status:

PENDING_VERIFICATION

Deoghar is the first market, not a permanent hard-coded limitation.

Important rules

Do not mix research evidence with production master data.

Do not fabricate local rates or availability.

Do not automatically convert CFT ↔ tonne without a verified density basis.

Catalog brand/source presence does not prove current Deoghar availability.

Local aggregate/sand source names are identifiers until independently verified.

10. Dealer Master — LATEST MAJOR COMPLETION

Database result

The real dealer import is COMPLETE.

Import result:

Real master records : 57
Matched existing    : 3
Inserted new        : 54
Final dealer count  : 69

Verified separately:

DEALER COUNT: 69

The public Dealers page was then verified locally and showed:

69 Registered dealers
69 dealers

Real dealer cards were visible on the page.

Dealer codes

New real dealers received:

SR-DGR-001
...
SR-DGR-054

Existing dealer records were preserved.

Three matched records

R K Steel ↔ existing Jss Traders

matched by Plus Code

DATA QUALITY FLAG: name mismatch; do not silently rename without verification.

Shiv Tara Traders

matched by Plus Code.

SHRI GOPAL ENTERPRISES

matched by phone.

Important

Do not run the real dealer import again.

The database is already at 69 dealers.

11. Real Dealer Data / Future Employee Workflow

The real dealer dataset is intended to become the foundation for an ongoing employee shop-visit process.

Employees will later collect/update:

actual decided dealer name

business details

phone / WhatsApp

exact location / Plus Code

area

materials sold

brands

current rates

delivery availability

verification status

verification date

verified by

last updated

photos/logo/gallery where applicable

reviews/rating data where legitimately sourced

Missing data should be maintained as a separate fill-later list, not guessed.

The system should remain scalable for future shop visits and admin updates.

12. Dealer Search / Discovery Requirements

The dealer experience should support:

Alphabetical sorting

Area-wise search/filter

Material-wise search/filter

Rating-wise sorting

Review-count-aware sorting/filtering

Dealer name search

Exact-location navigation using Plus Code where available

Current Dealers UI already contains:

dealer/area/material search

All materials filter

All areas filter

Filters control

Sort control

Rating sort

Future work should QA these against all 69 records.

13. Dealer Schema / Location Fields

Dealer schema now contains defaults for optional operational data, including:

years_in_business
delivery
whatsapp
verified
status
rating
reviews_count

Location/verification fields added:

plus_code
verification_status
verification_date
verified_by
last_updated

Compilation verified with:

py -m compileall .\backend\schemas\dealer.py

Dealer ID generation uses ULID architecture in:

backend/utils/id_generator.py

from ulid import ULID

def generate_uid() -> str:
    return str(ULID())

Do not replace existing ID strategy casually.

14. Dealer Data Reference Files — KEEP FOR AUDIT / REFERENCE

These files are useful for traceability and should NOT be treated as primary runtime data unless code explicitly uses them.

Keep — REFERENCE ONLY

backend/data/existing_dealers_snapshot.txt

Purpose:

snapshot of the original 15 database dealers before real import.

historical comparison only.

backend/data/dealers/backups/dealers_before_real_import_20260825_190505.json

Purpose:

pre-import database backup.

recovery/audit reference.

do not delete casually.

backend/data/dealers/logs/real_dealer_import_20260825_190505.json

Purpose:

audit trail of the real dealer import.

keep for traceability.

backend/data/dealers/deoghar_real_dealers.json

Purpose:

real Deoghar dealer master/import source.

this is the important project reference dataset for the real dealer records.

future changes should preserve traceability.

Historical / disposable scripts

These were created during troubleshooting/import and should not be treated as the canonical workflow:

backend/merge_real_dealers.py
backend/check_dealer_count.py
backend/import_real_deoghar_dealers.py

If no longer required by the final application workflow, they may be moved to a clearly named tools/archive/ or removed after confirming no production/runtime dependency.

Do not delete the import backup or import log.

15. Existing Product Work — COMPLETED / EXISTING

Existing SahiRate product areas:

Homepage

Main navigation

Materials

Material Detail

Dealers

Dealer Detail

Live Prices

About

Contact

Careers

Privacy Policy

Terms & Conditions

Welcome Overlay

SahiAI foundation

Production deployment

Production API

Architecture map

Do not rebuild these unless a real defect is demonstrated.

16. Production Context

Production:

Website: https://www.sahirate.in
API: https://sahirate-api.onrender.com
Frontend hosting: Vercel
Backend hosting: Render

Do not reuse old displayed prices as current market truth without a fresh API/data check.

17. Pending Work — CURRENT PRIORITY ORDER

P0 — Functional QA

Verify all 69 dealer records render correctly.

Verify dealer search.

Verify area filter.

Verify material filter.

Verify alphabetical sorting.

Verify rating/review sorting.

Verify Plus Code/location behavior.

Investigate the R K Steel / Jss Traders identity mismatch.

Verify dealer detail pages for newly imported records.

Verify admin dealer edit/create flow with the expanded schema.

P1 — Dealer data quality

Build missing-data report.

Separate unknown/missing fields from verified fields.

Establish employee shop-visit update workflow.

Add clear verification status handling.

Add/update last-updated and verified-by workflow.

P1 — SmartBuild

Calculation foundation

Brick Wall

RCC Slab

PCC

Plaster

Foundation

Labour layer

Cost layer

Estimate schema

Rule registry

Reference registry

Region rules

Aggregate master

Aggregate rate history/provider

Sand master

Brick master

Cement master

TMT master

Regression testing

SmartBuild frontend page

Local visual verification

SmartBuild backend API boundary hardening

Unified Material Catalog

Sand rate provider

Brick rate provider

Cement rate provider

TMT rate provider

Customer-friendly summary report

PDF report

WhatsApp/share flow

Production QA

P2 — Existing product

Deoghar Material → Brand → Product/Sub-brand → Variant structure

Initial Deoghar-relevant brand/product master

Compatible backend/database model

Material Stats QA

AAC Blocks image/product mapping

Material Detail QA

SahiAI production readiness

SEO completion

Responsive QA

Production build

Git review

Push

Production smoke test

18. Architecture / Safety Rules

Do not repeat completed work unless verification shows a real problem.

Inspect files before editing.

Make small, testable changes.

Do not guess current code state.

Do not fabricate prices, dealer data, brand availability or local market facts.

Do not expose unfinished AI as production-ready.

Do not change CORS/API without demonstrated need.

Do not replace production API configuration with localhost unintentionally.

Do not overwrite main without explicit approval.

Preserve backward compatibility unless a breaking change is explicitly required.

Do not mass-move/delete assets without dependency/reference audit.

Do not delete historical dealer backups/logs casually.

Do not rerun the real dealer import unless a deliberate re-import is required.

Do not treat preliminary calculation rules as final engineering/design values.

Do not automatically convert CFT ↔ tonne without verified density.

Do not treat catalog brand/source entries as proof of current local availability.

Deoghar is the first market, not the permanent architectural limit.

Keep this file as the single continuity checkpoint.

When work pauses, update this file with:

current task

completed work

current issue

exact next step

19. Exact Resume Point

If the chat session is lost, do not restart from old SmartBuild calculation work or dealer import work.

Resume from:

Dealer + SmartBuild Functional QA

First:

Confirm local backend is running with Uvicorn.

Confirm frontend is running with npm.cmd run dev.

Open /dealers and verify the 69-dealer dataset.

Test search/filter/sort/location behavior.

Review missing dealer fields.

Review the R K Steel / Jss Traders Plus Code match.

Then continue SmartBuild API/report work.

Current verified local commands

Backend:

cd C:\Users\sunil\Documents\GitHub\sahirate-app\backend
py -m uvicorn server:app --host 0.0.0.0 --port 8000

Frontend:

cd C:\Users\sunil\Documents\GitHub\sahirate-app\frontend
npm.cmd run dev

Database verification:

DEALER COUNT: 69

Dealer page verification:

69 Registered dealers
69 dealers

20. Final Continuity Summary

SahiRate is no longer at the old “15 dummy dealers + unfinished SmartBuild” state.

Current reality:

SahiRate core product exists.

SmartBuild calculation engine is complete and tested.

SmartBuild frontend exists at /smartbuild.

Real Deoghar dealer data has been imported.

Database contains 69 dealers.

Dealers page displays 69 dealers.

Real dealer codes use the SR-DGR-### sequence for newly inserted records.

Plus Codes are preserved where provided.

Dealer backups and import logs exist for audit/recovery.

Local backend has been successfully run with Uvicorn.

Local frontend runs through Vite using npm.cmd run dev.

The next work is functional QA and data-quality workflow, not re-importing dealers or rebuilding SmartBuild.

SahiRate — Har Material ka Sahi Rate.
Sahi Jankari. Behtar Faisle.