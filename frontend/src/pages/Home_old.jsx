import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  ChevronRight,
} from "lucide-react";

import SEO from "../components/SEO";
import { fetchDailyPrices, fetchMaterials } from "@/lib/api";
import SahiRateWordmark from "../assets/sahirate-wordmark.png";

export default function Home({ onOpenSearch }) {
  const [board, setBoard] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [showAiComingSoon, setShowAiComingSoon] = useState(false);

  useEffect(() => {
    fetchDailyPrices()
      .then((d) => {
        setBoard(d?.board || []);
      })
      .catch(() => {
        setBoard([]);
      });

    fetchMaterials()
      .then((data) => {
        setMaterials(
          Array.isArray(data)
            ? data
            : data?.materials || []
        );
      })
      .catch(() => {
        setMaterials([]);
      });
  }, []);

  return (
    <>
      <SEO
        title="SahiRate - Building Material Prices in Jharkhand"
        description="Check latest cement, steel, sand and construction material prices near you."
        url="https://www.sahirate.in/"
      />

      {/* ===========================================================
                           HERO SECTION
      =========================================================== */}
      <section className="relative overflow-hidden bg-[#0A192F]">

  {/* Background Glow */}
  <div className="absolute -top-48 -right-48 h-[650px] w-[650px] rounded-full bg-[#FF6B00]/20 blur-[120px]" />
  <div className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[120px]" />

  <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 lg:px-10">

    {/* Top Badge */}
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-medium text-orange-300 backdrop-blur">

      <Sparkles className="h-4 w-4" />

      <span>
        🇮🇳 India's Trusted Building Material Intelligence Platform
      </span>

    </div>

    {/* Main Heading */}

    <h1
      className="mt-8 font-extrabold leading-tight text-white"
      style={{
        fontFamily: "Plus Jakarta Sans",
        fontSize: "clamp(3rem,6vw,5.2rem)",
      }}
    >
      Know the

      <span className="text-[#FF6B00]">
        {" "}
        Right Price{" "}
      </span>

      before you build.
    </h1>

    {/* Hero Description */}

    <p className="mt-8 max-w-[42rem] text-lg leading-9 text-slate-300">

      <span className="font-semibold text-white">
        Building Material kharidne se pehle
      </span>{" "}

      <span className="font-semibold text-[#FFB27A]">
        uska Sahi Rate
      </span>{" "}

      janiye,

      <span className="font-semibold text-[#FFB27A]">
        {" "}verified dealers{" "}
      </span>

      ke rates compare kijiye aur

      <span className="font-semibold text-[#FFB27A]">
        {" "}smarter construction decisions{" "}
      </span>

      lijiye — trusted market data aur local insights ke saath.

      <br />

      <span className="mt-3 inline-block font-medium text-white">

        <strong>Starting from Deoghar, Jharkhand.</strong>

        {" "}Expanding across India.

      </span>

    </p>

    {/* CTA Buttons */}

    <div className="mt-12 flex flex-wrap gap-4">

      <button
        onClick={() => setShowAiComingSoon(true)}
        className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 font-semibold text-white shadow-xl transition hover:bg-[#EB5D00]"
      >
        <Sparkles size={20} />
        Ask AI
      </button>

      <Link
        to="/materials"
        className="flex items-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
      >
        📊 Explore Materials
        <ArrowRight size={18} />
      </Link>

    </div>

    {/* Hero Statistics */}

    <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">

      {[
        {
          value: "15+",
          label: "Verified Dealers",
        },
        {
          value: "100%",
          label: "Price Transparency",
        },
        {
          value: "Daily",
          label: "Market Updates",
        },
        {
          value: "AI",
          label: "Construction Intelligence",
        },
      ].map((item) => (

        <div key={item.label}>

          <div className="text-4xl font-extrabold text-white">
            {item.value}
          </div>

          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {item.label}
          </div>

        </div>

      ))}

    </div>

  </div>

</section>
      {/* ===========================================================
                          LIVE PRICE STRIP
      =========================================================== */}

      {board.length > 0 && (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">

            <div className="mb-5 flex items-center gap-3">
              <TrendingUp className="text-[#FF6B00]" />

              <h2 className="font-bold text-[#0A192F]">
                Today's Market Prices
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              {(board || []).map((item) => (

                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-[#0A192F]">
                      {item.name}
                    </h3>

                    <TrendingUp
                      className={`h-5 w-5 ${
                        item.trend === "up"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    />

                  </div>

                  <div className="mt-5 text-3xl font-black text-[#0A192F]">
                    ₹{item.avg}
                  </div>

                  <div className="mt-2 text-sm text-slate-500">
                    {item.unit}
                  </div>

                </div>

              ))}

            </div>

          </div>
        </section>
      )}
            {/* ===========================================================
                          MATERIAL CATEGORIES
      =========================================================== */}

      <section className="bg-[#F8FAFC] py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Section Header */}

          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
                Categories
              </span>

              <h2
                className="mt-4 font-extrabold leading-tight text-[#0A192F]"
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "clamp(2rem,4vw,3.3rem)",
                }}
              >
                Compare Building Materials with Confidence
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">

                Daily updated prices, verified dealers,
                market insights and historical price trends —
                everything you need to make smarter
                construction decisions.

              </p>

            </div>

            <Link
              to="/materials"
              className="hidden items-center gap-2 font-semibold text-[#FF6B00] transition hover:gap-3 lg:flex"
            >

              Explore All Materials

              <ArrowRight size={18} />

              <ChevronRight size={18} />

            </Link>

          </div>

          {/* Material Cards */}

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {(materials || []).map((item) => (

              <Link
                key={item.slug}
                to={`/materials/${item.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >                {/* Material Image */}

                <div className="aspect-[16/10] overflow-hidden bg-slate-100">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                {/* Card Content */}

                <div className="p-7">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold text-[#0A192F]">
                      {item.name}
                    </h3>

                    <ArrowRight
                      className="text-[#FF6B00] transition duration-300 group-hover:translate-x-1"
                    />

                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-500">
                    {item.unit}
                  </p>

                  {/* Price */}

                  <div className="mt-6">

                    <div className="flex items-end gap-2">

                      <span className="text-4xl font-black text-[#0A192F]">
                        ₹{item.stats?.avg ?? "--"}
                      </span>

                      <span className="mb-1 text-sm text-slate-500">
                        Average Market Price
                      </span>

                    </div>

                  </div>

                  {/* Divider */}

                  <div className="my-6 h-px bg-slate-200" />

                  {/* CTA */}

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-[#FF6B00]">
                      View Price Details
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3EC] text-[#FF6B00] transition group-hover:bg-[#FF6B00] group-hover:text-white">

                      <ArrowRight size={18} />

                    </div>

                  </div>

                </div>              </Link>

            ))}

          </div>

          {/* Mobile CTA */}

          <div className="mt-12 flex justify-center lg:hidden">

            <Link
              to="/materials"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#EB5D00]"
            >
              Explore All Materials

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

      {/* ===========================================================
                          WHY SAHIRATE
      =========================================================== */}
      
      <section className="bg-white py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Section Header */}

          <div className="mx-auto max-w-4xl text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
              Why SahiRate
            </span>

            <h2
              className="mt-5 font-extrabold leading-tight text-[#0A192F]"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "clamp(2.3rem,4vw,3.8rem)",
              }}
            >
              Build with the Right Information.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Construction decisions should be based on
              <strong className="text-[#0A192F]">
                {" "}accurate market information
              </strong>,
              not guesswork. SahiRate helps builders,
              contractors, dealers and homeowners compare
              prices, understand market trends and purchase
              building materials with confidence.
            </p>

          </div>

          {/* Brand Statement */}

          <div className="mt-16 text-center">

            <p className="text-4xl font-bold leading-tight text-[#0A192F] md:text-5xl">
              बेहतर निर्माण की शुरुआत,
            </p>

            <img
              src={SahiRateWordmark}
              alt="SahiRate"
              className="mx-auto mt-5 h-14 w-auto md:h-16"
            />

            <p className="mt-3 text-3xl font-bold text-[#0A192F] md:text-4xl">
              से।
            </p>

          </div>

          {/* Feature Cards */}

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {[
              {
                icon: <TrendingUp size={34} />,
                title: "Live Market Prices",
                desc: "Daily updated building material prices collected from verified local dealers.",
              },
              {
                icon: <ShieldCheck size={34} />,
                title: "Verified Dealers",
                desc: "Connect only with trusted suppliers and genuine construction businesses.",
              },
              {
                icon: <Building2 size={34} />,
                title: "Construction Intelligence",
                desc: "AI-powered insights that help you compare prices and make smarter buying decisions.",
              },
            ].map((card) => (

              <div
                key={card.title}
                className="group rounded-3xl border border-slate-200 bg-white p-10 transition duration-300 hover:-translate-y-2 hover:border-[#FF6B00]/30 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3EC] text-[#FF6B00] transition group-hover:bg-[#FF6B00] group-hover:text-white">

                  {card.icon}

                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#0A192F]">
                  {card.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {card.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ===========================================================
                          EXPANSION PLAN
      =========================================================== */}
            
      <section className="relative overflow-hidden bg-[#0A192F] py-24 text-white">

        {/* Background Glow */}
        <div className="absolute -top-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#FF6B00]/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          {/* Heading */}

          <div className="mx-auto max-w-4xl text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF8A33]">
              Expansion Roadmap
            </span>

            <h2
              className="mt-5 font-extrabold leading-tight text-white"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "clamp(2.3rem,4vw,3.8rem)",
              }}
            >
              Building India's Largest
              <br />
              Building Material Intelligence Platform.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              We begin with Deoghar, strengthen our local network,
              validate real market prices and expand district by
              district until every builder, contractor and homeowner
              in India can access transparent building material prices.
            </p>

          </div>

          {/* Timeline */}

          <div className="mt-16 grid gap-8 lg:grid-cols-4">

            {[
              {
                phase: "Phase 1",
                city: "Deoghar",
                year: "Current",
                desc: "Pilot launch with verified dealers, live pricing and customer validation.",
              },
              {
                phase: "Phase 2",
                city: "Jharkhand",
                year: "Next",
                desc: "District-wise expansion with stronger dealer coverage and market intelligence.",
              },
              {
                phase: "Phase 3",
                city: "Bihar",
                year: "Upcoming",
                desc: "Regional growth powered by AI recommendations and deeper price analytics.",
              },
              {
                phase: "Phase 4",
                city: "India",
                year: "Vision",
                desc: "Nationwide Building Material Intelligence Platform for the entire construction ecosystem.",
              },
            ].map((step) => (

              <div
                key={step.phase}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#FF6B00]/40 hover:bg-white/10 hover:shadow-2xl"
              >

                {/* Phase */}

                <span className="inline-flex rounded-full bg-[#FF6B00]/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FFB27A]">
                  {step.phase}
                </span>

                {/* City */}

                <h3 className="mt-6 text-3xl font-extrabold text-white">
                  {step.city}
                </h3>

                {/* Timeline */}

                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFB27A]">
                  {step.year}
                </div>

                {/* Description */}

                <p className="mt-6 leading-8 text-slate-300">
                  {step.desc}
                </p>

                {/* Bottom Accent */}

                <div className="mt-8 h-1 w-16 rounded-full bg-[#FF6B00] transition-all duration-300 group-hover:w-full" />

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ===========================================================
                              FAQ
      =========================================================== */}
            {/* ===========================================================
                              FAQ
      =========================================================== */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-5xl px-6">

          <div className="text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
              FAQ
            </span>

            <h2
              className="mt-5 font-extrabold leading-tight text-[#0A192F]"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "clamp(2.2rem,4vw,3.4rem)",
              }}
            >
              Frequently Asked Questions
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Everything you need to know about SahiRate and our Building
              Material Intelligence Platform.
            </p>

          </div>

          <div className="mt-16 space-y-6">

            {[
              {
                q: "How often are prices updated?",
                a: "Material prices are updated regularly based on verified local dealer information.",
              },
              {
                q: "Are all dealers verified?",
                a: "Yes. Every listed dealer is verified before appearing on the platform.",
              },
              {
                q: "Is SahiRate free to use?",
                a: "Yes. During the launch phase SahiRate is completely free.",
              },
              {
                q: "Which locations are currently available?",
                a: "We are starting from Deoghar, Jharkhand and expanding across India.",
              },
            ].map((faq) => (

              <article
                key={faq.q}
                className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-[#FF6B00]/30 hover:shadow-xl"
              >

                <h3 className="text-xl font-bold text-[#0A192F]">
                  {faq.q}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {faq.a}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ===========================================================
                              FINAL CTA
      =========================================================== */}

      <section className="bg-[#F8FAFC] py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="relative overflow-hidden rounded-[36px] bg-[#0A192F]">

            <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#11284A] to-[#FF6B00] opacity-95" />

            <div className="relative flex flex-col items-center justify-between gap-12 px-10 py-16 text-center lg:flex-row lg:px-20 lg:py-20 lg:text-left">

              <div className="max-w-2xl">

                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFB27A]">
                  Join SahiRate
                </span>

                <h2
                  className="mt-5 font-extrabold leading-tight text-white"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "clamp(2.2rem,4vw,3.8rem)",
                  }}
                >
                  Know the Right Price.
                  <br />
                  Build with Confidence.
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Compare prices, connect with verified dealers and make
                  smarter construction decisions with India's trusted
                  Building Material Intelligence Platform.
                </p>

              </div>

              <div className="flex flex-wrap justify-center gap-4">

                <button
                  onClick={() => setShowAiComingSoon(true)}
                  className="rounded-xl bg-[#FF6B00] px-8 py-4 font-semibold text-white shadow-xl transition hover:bg-[#EB5D00]"
                >
                  ✨ Ask SahiAI
                </button>

                <Link
                  to="/dealers"
                  className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  Find Dealers
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===========================================================
                            AI POPUP
      =========================================================== */}

      {showAiComingSoon && (

        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
          onClick={() => setShowAiComingSoon(false)}
        >

          <div
            className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">

                <Sparkles className="h-8 w-8 text-[#FF6B00]" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-[#0A192F]">
                  SahiAI
                </h2>

                <p className="font-semibold text-[#FF6B00]">
                  Coming Soon
                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-slate-600">
              We are building an AI assistant specially designed for
              Builders, Contractors, Dealers, Architects and Homeowners.

              <br />
              <br />

              Soon you'll be able to ask construction-related questions,
              compare materials, estimate costs and get intelligent buying
              recommendations—all in one place.
            </p>

            <button
              onClick={() => setShowAiComingSoon(false)}
              className="mt-8 w-full rounded-xl bg-[#FF6B00] py-3 font-semibold text-white transition hover:bg-[#EB5D00]"
            >
              Got it
            </button>

          </div>

        </div>

      )}

    </>

  );

}