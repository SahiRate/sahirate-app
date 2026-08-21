SahiRate — Project State

Single source of truth for project continuity. Do not append duplicate full checkpoints.

Project

Website: https://www.sahirate.in

Repository: SahiRate/sahirate-app

Product: India's Building Material Intelligence Platform

Primary market: Deoghar, Jharkhand

Current phase: Phase 2 — Materials architecture, Deoghar market master data, integration and production stabilization

Git / Production

Working/live branch: checkpoint-2026-08-19

main: not overwritten

Latest pushed commit: 31fcbc7 — Fix material image paths

Frontend: Vercel

Backend: Render

Production site: https://www.sahirate.in

Production API: https://sahirate-api.onrender.com

Recent commits:

496bcdb — Careers page

c8ab27c — Phase 2 materials data flow and homepage fixes

31fcbc7 — Fix material image paths

Frontend

React + React Router + Vite + Axios + Tailwind/CSS + Lucide

Active SEO component: frontend/src/components/SEO.jsx

Old frontend/src/seo/SEO.jsx removed

Important pages/components include Home, Materials, Material Detail, Dealers, Dealer Detail, Live Prices, About, Contact, Careers, Terms & Conditions, Navbar, Footer, WelcomeOverlay and AISearchDialog.

API Configuration

Production frontend environment:
VITE_BACKEND_URL=https://sahirate-api.onrender.com

Do not replace this with localhost except for deliberate local backend testing.

Completed / Verified

Homepage

Startup-style redesign substantially completed.

Hero, stats, dashboard showcase, How It Works, trust, live search/demo and vision sections active.

Explore Live Prices routes to /prices.

See How It Works uses smooth scrolling.

Final responsive/functional QA remains pending.

Navigation / Footer

Navbar and Footer updated.

Careers route added.

Terms & Conditions route added.

WhatsApp/contact entry added.

Materials

Production /api/materials returns material data.

fetchMaterials() correctly consumes API response.

Materials cards render from production API.

Dealer links use dealer_code.

Material detail routes use slugs.

Material Images

Images were available in admin/public/images/materials/ and have also been added to:
frontend/public/images/materials/

MaterialsList.jsx now uses:
src={\/images/materials/${m.image}`}`

Image fix was committed/pushed as 31fcbc7.

Live Prices

Status: DONE / VERIFIED

Production /api/prices/daily returns HTTP 200.

Live board renders Aggregate, Cement, Red Bricks, River Sand, Stone Chips and TMT Steel.

Loading/error/empty states, trend indicators, material links and 60-second refresh are implemented.

Production CORS was verified during testing.

Current Materials Issues

Materials cards still show:

Min = --

Average = --

Max = --

Dealer Count = 0

Cause: /api/materials list response does not currently attach the required stats object.

Required stats:

stats.min

stats.max

stats.avg

stats.dealer_count

Do not break the existing material detail endpoint while fixing this.

AAC Blocks

ac-blocks exists but currently lacks the required image value.

Required mapping:
ac-blocks → AAC_Blocks.jpg

Deoghar Market Master Data — PRIMARY PRIORITY

SahiRate must be designed around the Deoghar market first.

Required hierarchy:

Category → Material → Brand → Product / Sub-brand → Grade / Size / Variant → Dealer → Local Price

Examples:

Cement → Brand → Product → Grade

TMT Steel → Brand → Product → Grade → Diameter

Bricks → Type → Local Manufacturer/Brand → Size

AAC Blocks → Brand → Size

Plumbing → Brand → Product → Size/Specification

Market rule

Do not create a generic India-wide brand list merely because a brand exists nationally.

Each brand/product should eventually be classified:

DEOGAR_MARKET_ACTIVE

AVAILABLE_ON_ORDER

NOT_YET_VERIFIED

Prices must come from actual dealer/market data. Never fabricate local prices.

Candidate master data should be based on:

Deoghar dealer evidence

Deoghar project/tender approved-make evidence

Dealer-submitted products

Actual local price observations

Public Deoghar/Jharkhand evidence can identify candidates, but national availability alone is not proof of Deoghar stock.

Target Data Model

The current brands: [...] array is useful for display but not sufficient for scalable price intelligence.

Target logical entities:

materials

brands

products

variants

dealer_prices

Example:
Cement → JK Cement → JK Super → PPC → Dealer X → local price

First finalize the Deoghar master data; then implement schema changes in small, testable steps.

Dealers / Vendor Onboarding

Intended workflow:
Dealer submits → Pending → Admin review → Verification → OTP/claim where required → Final approval → Dealer ID → Public dealer flow

Still pending full production-grade verification. Never bypass authentication or verification requirements.

Contact

UI substantially complete.

Pending:

end-to-end production submission test

confirm delivery/storage mechanism

production feedback capture workflow

SahiAI / Ask AI

NOT PRODUCTION READY

Keep hidden or clearly marked Coming Soon until backend, frontend, security/rate limiting, input handling and reliability are verified.

SEO

Approximately 70–75% complete.

Completed:

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

Remaining:

Full public-page SEO audit

Material Detail dynamic SEO

Dealer Detail dynamic SEO

Page-specific structured data

Production canonical verification

Check for localhost/development URLs in metadata

Final production indexing verification

SEO remains a separate workstream after product/data architecture is stable.

Responsive / QA

Final QA remains pending for Home/About and the broader public site:

desktop 1440+

laptop ~1280

tablet

mobile 390 / 430

navbar, hero, cards, buttons, typography, forms, footer, overflow, contrast, touch targets

Branding / Product Decisions

Positioning: India's Building Material Intelligence Platform

Tagline: Har Material ka SahiRate.

Supporting line: Sahi Jankari. Behtar Faisle.

Communicate transparency, trust, market intelligence and smarter construction decisions.

Do not prominently identify Sangam Infra Resources on public SahiRate pages.

Do not change the logo without explicit decision.

Keep premium navy + orange visual language.

Environment

Frontend:
C:\Users\sunil\Documents\GitHub\sahirate-app\frontend

Commands:
npm.cmd run dev
npm.cmd run build

Current local URL:
http://localhost:3000/

Historical CRACO/npm-start issues should not be reopened unless a current test requires it.

Project Rules

Do not repeat completed work unless verification shows a real problem.

Do not guess current code state.

Inspect files before editing.

Make small, testable changes.

Update this state file after meaningful sessions.

Do not fabricate prices, dealer data, brand availability or local market facts.

Do not expose unfinished AI as production-ready.

Do not change CORS/API without demonstrated need.

Do not replace production API configuration with localhost unintentionally.

Keep checkpoint-2026-08-19 as active working/live branch unless explicitly changed.

Do not overwrite main without explicit approval.

Exact Next Development Order

Finalize Deoghar Material → Brand → Product/Sub-brand → Variant structure.

Create initial Deoghar-relevant brand/product master.

Implement compatible backend/database model.

Fix Material Stats.

Fix AAC Blocks image/product mapping.

Complete Material Detail QA.

Verify Dealers.

Finalize Contact production workflow.

Keep SahiAI Coming Soon until production-ready.

Complete SEO to 100%.

Complete responsive QA.

Production build, Git review, push and smoke test.

Current Checkpoint — 2026-08-21

Completed:

Production frontend build verified.

Materials production API verified.

Material image issue identified and fixed.

Material images added to frontend public assets.

MaterialsList.jsx image path fixed.

Image fix pushed as 31fcbc7.

Remaining Materials issues isolated to stats and AAC Blocks mapping.

Decision made to prioritize Deoghar-focused Brand/Product/Sub-brand/Variant architecture before generic nationwide data.

SEO confirmed incomplete and kept as a later workstream.

Current blockers:

Material stats missing on list cards.

AAC Blocks image mapping incomplete.

Deoghar market master data not finalized.

Brand/product/sub-brand/variant data model not yet implemented.

Exact next action:
Finalize the Deoghar master-data structure and initial Deoghar-relevant brand/product list before changing the backend schema.

Single Source of Truth

This file supersedes older duplicated project-state sections. Do not append another full copy when updating it.