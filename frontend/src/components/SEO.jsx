import { Helmet } from "react-helmet";

const SITE_URL = "https://www.sahirate.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_LOGO = `${SITE_URL}/logo.png`;

const DEFAULT_TITLE =
  "SahiRate | India's Building Material Intelligence Platform";

const DEFAULT_DESCRIPTION =
  "Compare building material prices, find trusted dealers, check market rates and make smarter construction decisions with SahiRate.";

const DEFAULT_KEYWORDS =
  "SahiRate, building material prices, building material price today, cement price, TMT price, brick price, sand price, aggregate price, construction material prices, Deoghar building material prices, Deoghar cement price, Deoghar TMT price, Deoghar building material dealers, Jharkhand building material prices";

function normalizePath(path = "/") {
  const value = path.startsWith("/") ? path : `/${path}`;

  if (value === "/") {
    return "/";
  }

  return value.replace(/\/+$/, "");
}

function buildCanonical(path) {
  const cleanPath = normalizePath(path);

  return cleanPath === "/"
    ? SITE_URL
    : `${SITE_URL}${cleanPath}`;
}

function toAbsoluteUrl(value, fallback = DEFAULT_IMAGE) {
  if (!value) {
    return fallback;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

function buildBreadcrumbSchema(breadcrumbs) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url, SITE_URL),
    })),
  };
}

function buildProductSchema(product) {
  if (!product || !product.name || !product.offers) {
    return null;
  }

  const offers = product.offers;

  if (
    offers.lowPrice == null ||
    offers.highPrice == null
  ) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: product.image
      ? [toAbsoluteUrl(product.image)]
      : undefined,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: offers.priceCurrency || "INR",
      lowPrice: Number(offers.lowPrice),
      highPrice: Number(offers.highPrice),
      ...(offers.offerCount != null
        ? {
            offerCount: Number(offers.offerCount),
          }
        : {}),
    },
  };

  return schema;
}

function buildFaqSchema(faq) {
  if (!Array.isArray(faq) || faq.length === 0) {
    return null;
  }

  const validFaq = faq.filter(
    (item) =>
      item &&
      typeof item.question === "string" &&
      item.question.trim() &&
      typeof item.answer === "string" &&
      item.answer.trim()
  );

  if (validFaq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  path = "/",
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  breadcrumbs = [],
  product,
  faq = [],
}) {
  const canonical = buildCanonical(path);
  const absoluteImage = toAbsoluteUrl(image);

  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SahiRate",
    url: SITE_URL,
    logo: DEFAULT_LOGO,
    description:
      "India's Building Material Intelligence Platform",
    areaServed: [
      {
        "@type": "City",
        name: "Deoghar",
      },
      {
        "@type": "State",
        name: "Jharkhand",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    knowsAbout: [
      "Building material prices",
      "Construction material prices",
      "Cement prices",
      "TMT prices",
      "Brick prices",
      "Sand prices",
      "Aggregate prices",
      "Building material dealers",
      "Construction cost estimation",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SahiRate",
    alternateName: "SahiRate India",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-IN",
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "SahiRate",
      url: SITE_URL,
    },
    inLanguage: "en-IN",
    ...(publishedTime
      ? {
          datePublished: publishedTime,
        }
      : {}),
    ...(modifiedTime
      ? {
          dateModified: modifiedTime,
        }
      : {}),
  };

  const breadcrumbSchema =
    buildBreadcrumbSchema(breadcrumbs);

  const productSchema =
    buildProductSchema(product);

  const faqSchema =
    buildFaqSchema(faq);

  const schemas = [
    organizationSchema,
    websiteSchema,
    webpageSchema,
    breadcrumbSchema,
    productSchema,
    faqSchema,
  ].filter(Boolean);

  return (
    <Helmet>
      <html lang="en-IN" />

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="author"
        content="SahiRate"
      />

      <meta
        name="robots"
        content={robots}
      />

      <link
        rel="canonical"
        href={canonical}
      />

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:image"
        content={absoluteImage}
      />

      <meta
        property="og:image:alt"
        content={`${title} | SahiRate`}
      />

      <meta
        property="og:site_name"
        content="SahiRate"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={absoluteImage}
      />

      <meta
        name="twitter:image:alt"
        content={`${title} | SahiRate`}
      />

      {publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}

      {modifiedTime && (
        <meta
          property="article:modified_time"
          content={modifiedTime}
        />
      )}

      {schemas.map((schema, index) => (
        <script
          key={`seo-schema-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

