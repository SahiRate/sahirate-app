import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { fetchMaterials } from "@/lib/api";

const CITY = "Deoghar";
const STATE = "Jharkhand";

const faqs = [
  {
    question: "Deoghar me building material prices kahan check karein?",
    answer:
      "SahiRate par Deoghar ke building material prices, market rates aur available dealer information compare ki ja sakti hai.",
  },
  {
    question: "Kya SahiRate par different building materials ke rates milte hain?",
    answer:
      "Haan. SahiRate ka platform cement, TMT steel, bricks, sand aur future mein add hone wale other building materials ke rates ko support karta hai.",
  },
  {
    question: "Kya Deoghar ke material prices daily update ho sakte hain?",
    answer:
      "SahiRate ka price intelligence system available market information ko update karne ke liye designed hai. Available data ke basis par latest rates display kiye jaate hain.",
  },
];

function getMaterialName(material) {
  return (
    material?.name ||
    material?.material_name ||
    material?.title ||
    "Building Material"
  );
}

function getMaterialSlug(material) {
  return (
    material?.slug ||
    material?.material_slug ||
    ""
  );
}

function getMaterialDescription(material) {
  const name = getMaterialName(material);

  return (
    material?.description ||
    `Check current ${name} prices, market rates and available dealers in Deoghar.`
  );
}

function getSeoSlug(material) {
  const slug = getMaterialSlug(material);

  if (!slug) return "";

  if (slug.endsWith("-price-today")) {
    return slug;
  }

  return `${slug}-price-today`;
}

export default function DeogharHub() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMaterials = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMaterials();

        if (!active) return;

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.materials)
            ? data.materials
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setMaterials(list);
      } catch (err) {
        if (!active) return;

        console.error("Failed to load Deoghar materials:", err);
        setError(true);
        setMaterials([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMaterials();

    return () => {
      active = false;
    };
  }, []);

  const validMaterials = materials.filter(
    (material) => getMaterialSlug(material)
  );

  return (
    <>
      <SEO
        title="Building Material Prices in Deoghar, Jharkhand | SahiRate"
        description="Check building material prices in Deoghar, Jharkhand. Compare cement, TMT steel, sand, bricks and other construction material rates with SahiRate."
        keywords="building material prices Deoghar, construction material prices Deoghar, cement price Deoghar, TMT price Deoghar, sand rate Deoghar, brick price Deoghar, building material dealers Deoghar, SahiRate"
        path="/deoghar"
        breadcrumbs={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: CITY,
            url: "/deoghar",
          },
        ]}
        faq={faqs}
      />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20">
            <div className="max-w-4xl">
              <div className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-[#FF5722]">
                {CITY} · {STATE}
              </div>

              <h1 className="text-4xl font-black tracking-tight text-[#0A192F] md:text-6xl">
                Building Material Prices in {CITY}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Compare current building material rates in {CITY},{" "}
                {STATE}. Check prices, explore materials and make smarter
                construction decisions with SahiRate.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/materials"
                  className="rounded-lg bg-[#FF5722] px-5 py-3 font-semibold text-white transition hover:bg-[#e64a1c]"
                >
                  Explore all materials
                </Link>

                <Link
                  to="/dealers"
                  className="rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-[#0A192F] transition hover:border-slate-300"
                >
                  Find dealers
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
              Material price pages
            </div>

            <h2 className="mt-2 text-3xl font-black text-[#0A192F]">
              Today’s building material rates in {CITY}
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Explore available material price pages. Every material returned
              by the SahiRate materials API can use the same local SEO
              architecture.
            </p>
          </div>

          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              Loading materials...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-700">
                Unable to load materials right now.
              </p>

              <p className="mt-2 text-sm text-red-600">
                Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && validMaterials.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No material price pages are available yet.
            </div>
          )}

          {!loading && !error && validMaterials.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {validMaterials.map((material) => {
                const name = getMaterialName(material);
                const seoSlug = getSeoSlug(material);

                return (
                  <Link
                    key={getMaterialSlug(material)}
                    to={`/deoghar/${seoSlug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#FF5722]/40 hover:shadow-sm"
                  >
                    <div className="text-xs font-mono uppercase tracking-widest text-[#FF5722]">
                      {CITY}
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-[#0A192F] group-hover:text-[#FF5722]">
                      {name} Price
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {getMaterialDescription(material)}
                    </p>

                    <div className="mt-5 text-sm font-semibold text-[#0A192F]">
                      Check today’s rate →
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-3">
              <InfoCard
                title="Compare prices"
                text="Compare available material prices and understand the local market before buying."
              />

              <InfoCard
                title="Find dealers"
                text="Explore building material dealers and contact information available through SahiRate."
              />

              <InfoCard
                title="Make smarter decisions"
                text="Use market information and price intelligence to plan construction purchases with greater confidence."
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-14 md:px-12 md:py-20">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5722]">
            Deoghar building material guide
          </div>

          <h2 className="mt-3 text-3xl font-black text-[#0A192F]">
            Construction material prices in {CITY}, {STATE}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            SahiRate brings building material price information together in
            one place so builders, contractors, architects, developers and
            homeowners can research local market rates before making a
            purchase.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Explore the available material categories above and check their
            dedicated price pages for current market information.
          </p>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-6 py-14 md:px-12 md:py-20">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
              Frequently asked questions
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#0A192F]">
              {CITY} building material price FAQs
            </h2>

            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <summary className="cursor-pointer font-semibold text-[#0A192F]">
                    {faq.question}
                  </summary>

                  <p className="mt-3 leading-7 text-slate-600">
                    {faq.answer}
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

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-xl font-bold text-[#0A192F]">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}

