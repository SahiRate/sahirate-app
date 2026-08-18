SahiRate Project State

Purpose: Master checkpoint for the SahiRate project. Keep this file in the project root so development continuity does not depend only on chat history.

1. Project

Project: SahiRate

Website: https://www.sahirate.in

Repository: SahiRate/sahirate-app

Product: India's Building Material Intelligence Platform

Current phase: Frontend + Backend integration, UI finalization and production-readiness

Current verified working area: Live Prices

2. Overall Current Status

Completed / verified recently

Main frontend pages/components have been substantially redesigned and are running on the current Vite setup.

About page UI has been balanced/finalized through the current sections:

Why SahiRate / Mission / Vision / Future

Problem / Why SahiRate

Expansion Plan

Core Values

Final CTA

Contact page UI and enquiry form are present and visually functional.

Home page hero and CTA sections have been worked on; HeroContent.jsx and related home components are active.

Live Prices page is now successfully connected to the production backend.

Production API endpoint has been directly verified from PowerShell with HTTP 200.

Production CORS preflight has been verified for http://localhost:3000 with HTTP 200.

Frontend Vite server is currently working with:
npm.cmd run dev

Current frontend local URL:
http://localhost:3000/

Current frontend is a Vite app; do not use the historical npm start instruction.

Current Live Prices result

The /prices page successfully displays live data from:
https://sahirate-api.onrender.com/api/prices/daily

Verified current board response includes:

Aggregate — ₹60.46 avg — 13 dealers — trend down

Cement — ₹420.40 avg — 15 dealers — trend flat

Red Bricks — ₹8,530.14 avg — 14 dealers — trend down

River Sand — ₹51.40 avg — 10 dealers — trend up

Stone Chips — ₹68.91 avg — 11 dealers — trend flat

TMT Steel — ₹6,866.77 avg — 13 dealers — trend down

Live Prices status: DONE / VERIFIED.

3. Current Frontend Architecture

Stack

React

React Router

Vite

Axios

Tailwind/CSS utility styling

Lucide React icons

Important frontend areas

frontend/src/App.jsx

frontend/src/components/Navbar.jsx

frontend/src/components/Footer.jsx

frontend/src/components/AISearchDialog.jsx

frontend/src/components/WelcomeOverlay.jsx

frontend/src/components/home/

frontend/src/pages/Home.jsx

frontend/src/pages/MaterialsList.jsx

frontend/src/pages/MaterialDetail.jsx

frontend/src/pages/DealersList.jsx

frontend/src/pages/DealerDetail.jsx

frontend/src/pages/LivePrices.jsx

frontend/src/pages/About.jsx

frontend/src/pages/Contact.jsx

frontend/src/lib/api.js

frontend/src/seo/SEO.jsx / current SEO component location must be verified before edits

Current API configuration

frontend/src/lib/api.js uses:

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://sahirate-api.onrender.com";

const API = `${BACKEND_URL}/api`;

The frontend .env was corrected from the local-only backend URL to:

VITE_BACKEND_URL=https://sahirate-api.onrender.com

After changing .env, Vite must be restarted.

Important: Do not revert this production API URL unless deliberately switching to a local backend test environment.

4. Live Prices — Completed

Frontend

frontend/src/pages/LivePrices.jsx now has:

loading state

API error state

empty-data state

successful price-board rendering

60-second refresh interval

trend icons

material detail links

Ask AI CTA

The successful pattern is:

const result = await fetchDailyPrices();
setData(result);

with proper try/catch/finally handling.

Backend/API verification

Verified directly:

GET https://sahirate-api.onrender.com/api/prices/daily
HTTP/1.1 200 OK

The endpoint returns the expected JSON price board.

CORS verification

Verified:

OPTIONS https://sahirate-api.onrender.com/api/prices/daily
Origin: http://localhost:3000
Access-Control-Request-Method: GET

Response returned HTTP 200 and:

access-control-allow-origin: http://localhost:3000
access-control-allow-credentials: true

Therefore the previously suspected CORS issue is resolved / not currently a blocker.

5. Backend

Stack

FastAPI

MongoDB

Uvicorn

JWT-based admin authentication

API areas

Materials

Dealers

Prices

Search / AI search

Admin

Dealer onboarding

Current backend changes known from working tree

Modified files previously observed include:

backend/routes/dealers.py

backend/routes/materials.py

backend/schemas/dealer.py

backend/schemas/material.py

backend/seed_data.py

backend/server.py

backend/routes/onboarding.py (new/untracked at the checkpoint)

backend/master/ (new/untracked at the checkpoint)

backend/utils/ (new/untracked at the checkpoint)

admin/ (new/untracked at the checkpoint)

These files should be reviewed before commit. Do not blindly commit or discard them.

CORS configuration

backend/server.py includes allowed origins for:

http://localhost:3000

http://127.0.0.1:3000

http://localhost:3001

http://127.0.0.1:3001

http://localhost:5173

http://127.0.0.1:5173

https://sahirate.in

https://www.sahirate.in

The production endpoint has already been verified against localhost:3000.

6. Vendor / Dealer Onboarding — PENDING

The intended workflow is:

Dealer/vendor submits onboarding information.

Application remains controlled/pending.

Admin reviews application.

Field verification is completed.

Mobile OTP/claim verification is completed as required.

Final approval is performed securely.

Dealer ID is generated at the appropriate approval stage.

Approved dealer becomes available in the intended dealer/public flow.

Previously verified

Backend startup and health endpoint were verified locally.

Swagger/OpenAPI loaded successfully.

Dealer onboarding creation endpoint was tested successfully.

Public listing endpoint was tested successfully.

Public-field allow-list was tested.

Admin login returned HTTP 200 and a JWT.

OTP request API returned OTP_REQUESTED.

Still pending

Admin JWT authorization in Swagger/test client.

Successful field verification for test application:
6a842267e5a70a1e92f32687

Final approval security test.

Successful final approval and Dealer ID generation.

Verify approved dealer appears correctly in dealer/public flow.

Real mobile OTP delivery and OTP verification.

Production-grade validation and role/status testing.

Important security rule

Final approval must not mark a dealer as verified unless all required verification conditions are satisfied.

Do not weaken or bypass authentication merely to make the test pass.

SMS status

SpringEdge SMS testing is paused.

Real OTP delivery was not confirmed.

Resume SMS provider integration separately; do not alter core OTP logic unnecessarily.

7. Materials — NEXT PRIORITY

Live Prices cards link to:

/materials/{slug}

Therefore the next practical frontend verification is:

Open /materials.

Verify material list loads from production API.

Open each material detail route.

Verify data, price/unit, trend and dealer information.

Verify broken/missing slug handling.

Check mobile layout.

Status: PENDING verification.

8. Dealers — PENDING VERIFICATION

Need to verify:

/dealers list loads from backend.

Dealer cards display correctly.

Dealer detail route works.

Search/filter/sort behavior works if implemented.

Public fields do not expose private/admin data.

Approved/onboarded dealers integrate correctly with public dealer flow.

Mobile layout is acceptable.

Status: PENDING.

9. Contact — PARTIALLY COMPLETE / NEEDS FINAL TEST

Current Contact page includes:

Hero section

Email information

Location information

Business hours

Enquiry form

Name/email/message validation

Enquiry type selection

Send Enquiry CTA

The current UI has been visually corrected.

Still pending

Test the form end-to-end.

Confirm exactly how the enquiry is delivered/stored.

If it currently opens the user's default email application, decide whether production should retain that or use a backend/contact-service workflow.

Add/verify Contact Us / Feedback capture for production.

Status: UI DONE; production workflow PENDING.

10. Ask AI / SahiAI — NOT PRODUCTION READY

Current UI contains Ask AI entry points, including the Live Prices page button.

Product decision remains:

Ask AI should remain hidden or be clearly shown as Coming Soon until fully tested and production-ready.

Pending

Verify current AI search backend behavior.

Verify frontend dialog behavior.

Verify error/loading states.

Verify security/rate limiting/input handling.

Decide whether to expose the feature publicly.

If not production-ready, replace active-looking CTA with Coming Soon rather than implying a working production feature.

Status: PENDING / NOT PRODUCTION READY.

11. Home Page — FINAL QA PENDING

Home page has been substantially redesigned.

Known active areas include:

Hero

Hero stats

Live price CTA

How It Works

Dashboard showcase

Feature cards

Live search/demo sections

Trust/why SahiRate sections

Vision/future content

Important recent issue

HeroContent.jsx previously produced:

Uncaught ReferenceError: HeroStats is not defined

The project contains HeroStats.jsx and the current HeroContent.jsx includes its import, but this should be rechecked after any further Home changes.

Pending

Test all Home CTAs.

Verify Explore Live Prices navigates to /prices.

Verify See How It Works opens/navigates to the intended How It Works behavior.

Verify mobile responsiveness.

Check contrast/readability of all sections.

Remove or hide any unfinished functionality.

Status: UI largely complete; final functional QA pending.

12. About Page — UI WORK COMPLETED / FINAL QA PENDING

Current About page includes:

Why SahiRate

Mission / Vision / Future cards

Problem statement / Why better information

Why SahiRate feature panel

Expansion Plan: Deoghar → India

Core Values

Final CTA

Recent corrections improved text visibility and visual balance, including the CTA heading:

Ready to Build Smarter?

Pending

Final desktop/mobile QA.

Check section spacing and overflow.

Verify roadmap text contrast on mobile.

Verify CTA links.

Status: UI DONE; final QA PENDING.

13. Branding / Product Decisions

Main positioning:
India's Building Material Intelligence Platform

Main tagline:
Har Material ka Sahi Rate.

Supporting positioning:
Sahi Jankari. Behtar Faisle.

SahiRate should communicate transparency, trust, market intelligence and smarter construction decisions.

Public SahiRate branding should not prominently identify Sangam Infra Resources as the developer.

Logo should not be changed without an explicit decision.

Keep the overall visual language around navy + orange, premium and clean.

14. SEO — PENDING FINALIZATION

SEO component exists and the site URL is:

https://www.sahirate.in

Pending

Verify every page has correct title and description.

Verify canonical URLs.

Verify Open Graph metadata.

Verify page-specific descriptions for Materials, Dealers, Prices, About and Contact.

Verify sitemap/robots setup for production.

Verify no development/local URLs are exposed in production metadata.

Status: Needs final SEO audit.

15. Responsive / Production QA — PENDING

Before production release, verify at minimum:

Desktop 1440px+

Laptop ~1280px

Tablet

Mobile 390px / 430px

Check:

Navbar

Hero

Cards

Buttons

Typography

Roadmap

Forms

Footer

Horizontal overflow

Text contrast

Touch targets

Status: PENDING.

16. Git / Release Status

The working tree previously contained multiple modified and untracked files. Do not assume everything is committed.

Pending Git work

Review git status from project root.

Review important diffs.

Separate intended project changes from accidental/unrelated files.

Run frontend build:
npm.cmd run build

Run backend checks/tests as applicable.

Commit in logical groups.

Push to GitHub.

Record the final commit hash here.

Important: Earlier attempts to run git add backend/server.py while already inside backend caused a path error. Run Git commands from the project root when using root-relative paths.

17. Current Environment Commands

Frontend

Current frontend is Vite.

From:

C:\Users\sunil\Documents\GitHub\sahirate-app\frontend

Use:

npm.cmd run dev

Current verified local URL:

http://localhost:3000/

Do not use the historical npm start instruction.

Backend

Project backend is FastAPI/Uvicorn.

Use the actual configured Python launcher/environment after checking the current environment. Historical local command was:

py -m uvicorn server:app --reload

Verify current environment before running it.

18. Historical Environment Notes

Earlier development encountered:

date-fns / react-day-picker dependency conflict.

CRACO ajv/dist/compile/codegen startup issue.

Old frontend setup used CRACO and npm start.

These are historical. The current frontend is Vite and uses npm.cmd run dev.

Do not reopen old dependency/setup work unless a current test demonstrates that it is necessary.

19. Rules for Continuing the Project

Do not repeat completed work unless verification shows it is necessary.

Do not guess the current code state.

Before changing a file, inspect its current contents and related imports/routes.

Make changes in small, testable steps.

After each meaningful change, update this state file.

Record important architecture and workflow decisions here.

Keep production/security considerations in mind for authentication, onboarding and admin approval.

Do not expose unfinished AI functionality as production-ready.

Prefer backward-compatible changes unless a breaking change is explicitly required.

Do not change backend CORS or API code without a demonstrated need; production Live Prices API and CORS are currently verified.

Do not replace working production API configuration with localhost unless intentionally testing a local backend.

Keep the project checkpoint current before ending a major development session.

20. Current Session Checkpoint — 2026-08-18

What was fixed / verified in this session

Identified that npm start was invalid because the current frontend package uses Vite.

Verified npm.cmd run scripts:

dev → vite

build → vite build

preview → vite preview

lint → eslint src --ext js,jsx

format → prettier --write .

Started Vite successfully with npm.cmd run dev.

Verified Vite is serving the frontend at http://localhost:3000/.

Diagnosed Live Prices Network Error as an incorrect frontend .env backend URL.

Correct production backend URL identified:
https://sahirate-api.onrender.com

Correct frontend .env value:
VITE_BACKEND_URL=https://sahirate-api.onrender.com

Restarted/verified Vite after the environment correction.

Direct production API test returned HTTP 200 and the expected live price board.

CORS preflight from http://localhost:3000 returned HTTP 200 with the expected allow-origin header.

/prices now successfully renders the live material price cards.

Current blocker

There is no current blocker on Live Prices.

Current exact next development step

NEXT: Verify the Materials flow.

Open http://localhost:3000/materials.

Confirm material list loads from the production API.

Open material detail pages from the Live Prices cards.

Verify all slugs/data/links.

Fix only demonstrated issues.

Then move to Dealers verification.

After Materials / Dealers

Continue in this order:

Materials verification/fixes

Dealers verification/fixes

Contact enquiry production workflow

Ask AI decision/testing (Coming Soon until production-ready)

Home CTA/functionality QA

About final QA

SEO audit

Mobile/responsive QA

Production build

Git review/commit/push

Final production smoke test

Update this file with final release status and commit hash

21. Change Log

2026-08-18

Created/maintained the master SahiRate project checkpoint.

Continued dealer onboarding workflow checkpoint and recorded pending admin/OTP tests.

Completed frontend UI corrections across Home/About/Contact areas during the current development cycle.

Fixed Live Prices frontend state handling with loading/error/empty states.

Verified production /api/prices/daily endpoint returns HTTP 200 and valid board data.

Verified production CORS for localhost:3000.

Corrected frontend VITE_BACKEND_URL from local http://127.0.0.1:8000 to https://sahirate-api.onrender.com.

Verified Vite frontend starts with npm.cmd run dev and serves on localhost:3000.

Verified /prices now displays live Aggregate, Cement, Red Bricks, River Sand, Stone Chips and TMT Steel data.

Marked Live Prices as DONE/VERIFIED.

Updated the next checkpoint to Materials verification.

How to use this file

At the end of each meaningful development session, update:

Current file

Current task

What was completed

Current error/problem

Last change

Exact next step

Pending work

Git/commit status

This file should be committed to GitHub along with the project so the checkpoint stays with the codebase.