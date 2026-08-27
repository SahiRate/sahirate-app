from datetime import datetime, timezone
from xml.sax.saxutils import escape

from fastapi import APIRouter, Request, Response

router = APIRouter(tags=["SEO"])

SITE_URL = "https://www.sahirate.in"

STATIC_PAGES = [
    "/",
    "/deoghar",
    "/materials",
    "/dealers",
    "/prices",
    "/smartbuild",
    "/about",
    "/contact",
    "/careers",
    "/privacy-policy",
    "/terms-and-conditions",
]


def normalize_datetime(value):
    if value is None:
        return None

    if isinstance(value, datetime):
        dt = value
    elif isinstance(value, str):
        try:
            dt = datetime.fromisoformat(
                value.replace("Z", "+00:00")
            )
        except ValueError:
            return None
    else:
        return None

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)

    return dt.astimezone(timezone.utc)


def sitemap_url(path, lastmod=None):
    loc = escape(f"{SITE_URL}{path}")

    parts = [
        "<url>",
        f"<loc>{loc}</loc>",
    ]

    if lastmod:
        parts.append(
            f"<lastmod>{lastmod.isoformat()}</lastmod>"
        )

    parts.append("</url>")

    return "".join(parts)


@router.get("/sitemap.xml", include_in_schema=False)
async def sitemap(request: Request):
    db = request.app.state.db

    urls = []

    # ------------------------------------------------------
    # Static pages
    # ------------------------------------------------------

    for path in STATIC_PAGES:
        urls.append(
            sitemap_url(path)
        )

    # ------------------------------------------------------
    # Materials
    # ------------------------------------------------------

    materials = await db.materials.find(
        {},
        {
            "_id": 0,
            "slug": 1,
        },
    ).to_list(length=None)

    # ------------------------------------------------------
    # Dealer price records
    # ------------------------------------------------------

    dealers = await db.dealers.find(
        {},
        {
            "_id": 0,
            "prices": 1,
        },
    ).to_list(length=None)

    latest_updates = {}

    for dealer in dealers:
        for price in dealer.get("prices") or []:
            material_slug = price.get("material_slug")
            updated_at = normalize_datetime(
                price.get("updated_at")
            )

            if not material_slug or not updated_at:
                continue

            current = latest_updates.get(material_slug)

            if current is None or updated_at > current:
                latest_updates[material_slug] = updated_at

    # ------------------------------------------------------
    # Deoghar material price pages
    # ------------------------------------------------------

    for material in materials:
        slug = material.get("slug")

        if not slug:
            continue

        clean_slug = str(slug).strip().strip("/")

        if not clean_slug:
            continue

        if clean_slug.endswith("-price-today"):
            seo_slug = clean_slug
        else:
            seo_slug = f"{clean_slug}-price-today"

        lastmod = latest_updates.get(
            clean_slug
        )

        urls.append(
            sitemap_url(
                f"/deoghar/{seo_slug}",
                lastmod,
            )
        )

    # ------------------------------------------------------
    # Remove duplicate URLs
    # ------------------------------------------------------

    unique_urls = []
    seen = set()

    for url in urls:
        if url in seen:
            continue

        seen.add(url)
        unique_urls.append(url)

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset '
        'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + "".join(unique_urls)
        + "</urlset>"
    )

    return Response(
        content=xml,
        media_type="application/xml",
    )

