import { useEffect } from "react";
import { useEffect } from "react";

const SITE_URL = "https://www.sahirate.in";

function SEO({
  title = "SahiRate — Building Material Prices in Deoghar, Jharkhand",
  description = "Compare building material prices, find trusted dealers, and check live construction material prices in Deoghar, Jharkhand.",
  path = "/",
}) {
  useEffect(() => {
    const fullTitle = title.includes("SahiRate") ? title : `${title} | SahiRate`;
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = fullTitle;

    const setMeta = (name, content, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta("description", description);

    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:site_name", "SahiRate", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    return () => {
      document.title =
        "SahiRate — Building Material Prices in Deoghar, Jharkhand";
    };
  }, [title, description, path]);

  return null;
}

export default SEO;
