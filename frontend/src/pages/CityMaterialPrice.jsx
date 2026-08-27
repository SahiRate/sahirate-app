import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import SEO from "../components/SEO";
import { fetchMaterial } from "@/lib/api";

const SITE_URL = "https://www.sahirate.in";

function getMaterialSlug(priceSlug = "") {
  return priceSlug.replace(/-price-today$/, "");
}

function formatDate(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getLastUpdated(material) {
  return (
    material?.updated_at ||
    material?.last_updated ||
    material?.stats?.updated_at ||
    null
  );
}

function getStats(material) {
  const stats = material?.stats || {};

  const values = Array.isArray(material?.prices)
    ? material.prices
        .map((item) => Number(item?.price))
        .filter(Number.isFinite)
    : [];

  const min =
    stats.min != null
      ? Number(stats.min)
      : values.length
        ? Math.min(...values)
        : null;

  const max =
    stats.max != null
      ? Number(stats.max)
      : values.length
        ? Math.max(...values)
        : null;

  const avg =
    stats.avg != null
      ? Number(stats.avg)
      : values.length
        ? values.reduce((sum, value) => sum + value, 0) /
          values.length
        : null;

  return {
    min: Number.isFinite(min) ? min : null,
    max: Number.isFinite(max) ? max : null,
    avg: Number.isFinite(avg) ? avg : null,
  };
}

function getBrands(material) {
  if (Array.isArray(material?.brands)) {
    return material.brands.filter(Boolean);
  }

  if (
    material?.brand_catalog &&
    typeof material.brand_catalog === "object"
  ) {
    return Object.keys(material.brand_catalog).filter(Boolean);
  }

  return [];
}

export default function CityMaterialPrice() {
  const { materialPriceSlug } = useParams();

  const materialSlug = getMaterialSlug(materialPriceSlug);

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(false);
    setMaterial(null);

    fetchMaterial(materialSlug)
      .then((data) => {
        if (active) {
          setMaterial(data);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [materialSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-slate-500">
        Loading material prices...
      </div>
    );
  }

  if (error || !material) {
    return (
      <>
        <SEO
          title="Material Price Not Found | SahiRate"
          description="The requested building material price page could not be found on SahiRate."
          path={`/deoghar/${materialPriceSlug || ""}`}
          noindex
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h1 className="text-3xl font-black text-[#0A192F]">
            Material price page not found
          </h1>

          <p className="mt-3 text-slate-600">
            The requested Deoghar material page is not available.
          </p>

          <Link
            to="/deoghar"
            className="inline-flex items-center gap-2 mt-6 text-[#FF5722] font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Deoghar
          </Link>
        </div>
      </>
    );
  }

  const stats = getStats(material);
  const brands = getBrands(material);
  const updatedAt = getLastUpdated(material);
  const formattedUpdated = formatDate(updatedAt);

  const prices = Array.isArray(material?.prices)
    ? material.prices
    : [];

  const offerCount =
    prices.length ||
    Number(material?.stats?.dealer_count) ||
    0;

  const hasPriceRange =
    stats.min != null &&
    stats.max != null &&
    offerCount > 0;

  const canonicalPath = `/deoghar/${materialPriceSlug}`;

  const title = `${material.name} Price Today in Deoghar, Jharkhand | Live Rates | SahiRate`;

  const description =
    `Check updated ${material.name} rates in Deoghar, Jharkhand. ` +
    `Compare available brands, dealer prices and market information on SahiRate` +
    (formattedUpdated
      ? `. Updated ${formattedUpdated}.`
      : ".");

  const keywords = [
    "SahiRate",
    `${material.name} price Deoghar`,
    `${material.name} price today Deoghar`,
    `${material.name} rate Deoghar`,
    `${material.name} dealers Deoghar`,
    `${material.name} price Jharkhand`,
    "building material prices Deoghar",
    ...brands.map(
      (brand) => `${brand} ${material.name} price Deoghar`
    ),
  ].join(", ");

  const breadcrumbs = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Deoghar",
      url: "/deoghar",
    },
    {
      name: `${material.name} Price`,
      url: canonicalPath,
    },
  ];

  const faq = [
    {
      question: `What is the ${material.name} price in Deoghar?`,
      answer: hasPriceRange
        ? `The available ${material.name} price range in Deoghar is ₹${stats.min} to ₹${stats.max}${material.unit ? ` per ${material.unit}` : ""}. Prices may vary by dealer, brand, specification, quantity and availability.`
        : `SahiRate currently does not have enough live ${material.name} price data to show a reliable price range for Deoghar.`,
    },
    {
      question: `Where can I check ${material.name} prices in Deoghar?`,
      answer:
        `SahiRate provides building material price information and dealer discovery for Deoghar. ` +
        `Check the available ${material.name} rates before contacting a dealer.`,
    },
  ];

  const productSchema =
    hasPriceRange
      ? {
          name: `${material.name} in Deoghar`,
          description:
            material.description || description,
          brand:
            brands.length === 1
              ? brands[0]
              : undefined,
          offers: {
            priceCurrency: "INR",
            lowPrice: stats.min,
            highPrice: stats.max,
            offerCount,
          },
        }
      : undefined;

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        image={
          material.image
            ? `${SITE_URL}/images/materials/${material.image}`
            : undefined
        }
        path={canonicalPath}
        modifiedTime={updatedAt || undefined}
        breadcrumbs={breadcrumbs}
        product={productSchema}
        faq={faq}
      />

      <main>
        <section className="bg-[#0A192F] text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <Link
              to="/deoghar"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Deoghar building materials
            </Link>

            <div className="mt-8 flex items-center gap-2 text-sm text-orange-300">
              <MapPin className="w-4 h-4" />
              Deoghar, Jharkhand
            </div>

            <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-black tracking-tight">
              Today's {material.name} Rate in Deoghar, Jharkhand
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Compare available {material.name} prices, brands and
              dealer information before making your construction purchase.
            </p>

            {formattedUpdated && (
              <p className="mt-5 text-sm text-slate-400">
                Last updated:{" "}
                <span className="text-white font-semibold">
                  {formattedUpdated}
                </span>
              </p>
            )}
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-3 gap-5">
              <PriceCard
                label="Minimum"
                value={stats.min}
                unit={material.unit}
              />

              <PriceCard
                label="Average"
                value={stats.avg}
                unit={material.unit}
              />

              <PriceCard
                label="Maximum"
                value={stats.max}
                unit={material.unit}
              />
            </div>

            {brands.length > 0 && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-[#0A192F]">
                  Available Brands
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FF5722]">
                  Deoghar Market
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#0A192F]">
                  {material.name} prices from Deoghar dealers
                </h2>
              </div>

              <Link
                to="/dealers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5722]"
              >
                Browse dealers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {prices.length > 0 ? (
              <div className="space-y-3">
                {prices.map((price, index) => (
                  <div
                    key={
                      price.dealer_id ||
                      price.dealer_code ||
                      index
                    }
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="font-bold text-[#0A192F]">
                          {price.dealer_name ||
                            price.name ||
                            "Deoghar Dealer"}
                        </div>

                        {(price.area || price.address) && (
                          <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                            <MapPin className="w-4 h-4" />
                            {price.area || price.address}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-5">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-slate-400">
                            Price
                          </div>

                          <div className="mt-1 text-2xl font-black text-[#0A192F]">
                            ₹{price.price ?? "--"}
                          </div>
                        </div>

                        {price.phone && (
                          <a
                            href={`tel:${price.phone}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#FF5722] px-4 py-3 text-sm font-semibold text-white"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
                Detailed dealer price records are currently unavailable.
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-[#0A192F]">
              About {material.name} prices in Deoghar
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              SahiRate helps buyers compare building material price
              information in Deoghar before contacting dealers or
              making a purchase. Prices may vary based on brand,
              specification, quantity, availability, delivery and dealer.
            </p>

            {material.description && (
              <p className="mt-4 text-slate-600 leading-8">
                {material.description}
              </p>
            )}
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-[#0A192F]">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <summary className="cursor-pointer font-bold text-[#0A192F]">
                    {item.question}
                  </summary>

                  <p className="mt-3 text-slate-600 leading-7">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function PriceCard({ label, value, unit }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="text-xs uppercase tracking-widest text-slate-400">
        {label}
      </div>

      <div className="mt-3 text-3xl font-black text-[#0A192F]">
        {value != null ? `₹${value}` : "--"}
      </div>

      {unit && (
        <div className="mt-1 text-sm text-slate-500">
          per {unit}
        </div>
      )}
    </div>
  );
}
