import { Helmet } from "react-helmet";

const SITE_URL = "https://www.sahirate.in";

export default function SEO({
  title = "SahiRate | India's Building Material Intelligence Platform",
  description = "Compare live building material prices, find verified dealers and make smarter construction decisions with SahiRate.",
  keywords = "building material prices, cement price, tmt price, brick price, sand price, deoghar building material, sahirate",
  image = `${SITE_URL}/og-image.jpg`,
  path = "/",
  type = "website",
}) {
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="SahiRate" />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="SahiRate" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SahiRate",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
          description:
            "India's Building Material Intelligence Platform",
          sameAs: [],
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SahiRate",
          url: SITE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  );
}