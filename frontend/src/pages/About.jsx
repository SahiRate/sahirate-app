import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function About() {
  const phases = [
    {
      number: "01",
      title: "Phase 1 � Launch",
      place: "Deoghar",
      text: "Pilot Market • Dealer Onboarding • Product Testing",
    },
    {
      number: "02",
      title: "Phase 2 � Regional",
      place: "Godda, Dumka, Banka",
      text: "District Level Expansion • Brand Building",
    },
    {
      number: "03",
      title: "Phase 3 � State",
      place: "Bihar�Jharkhand Corridor",
      text: "Full Feature Launch • Regional Market Expansion",
    },
    {
      number: "04",
      title: "Phase 4 � National",
      place: "Pan-India Platform",
      text: "Enterprise Partnerships • Complete Ecosystem",
    },
  ];

  const values = [
    {
      number: "01",
      title: "Transparency",
      text: "We believe better decisions start with clear and reliable information.",
    },
    {
      number: "02",
      title: "Trust",
      text: "We work to build confidence through dependable market information and insights.",
    },
    {
      number: "03",
      title: "Innovation",
      text: "We use modern technology and AI to make construction decisions simpler.",
    },
    {
      number: "04",
      title: "Customer First",
      text: "Everything we build is focused on helping people make better decisions.",
    },
  ];

  return (
    <>
      <SEO
        title="About SahiRate"
        description="Learn about SahiRate, our mission, vision, values and expansion plan to bring greater price transparency to India's construction ecosystem."
      />

      <main className="min-h-screen bg-white">

        {/* =====================================================
            01 � ABOUT HERO
        ====================================================== */}
        <section className="relative overflow-hidden bg-[#071426]">
          <div className="absolute inset-0 opacity-40">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: "54px 54px",
              }}
            />
          </div>

          <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              About SahiRate
            </span>

            <h1
              className="mt-8 max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              India's Most Trusted
              <span className="block text-[#FF6B00]">
                Building Material
              </span>
              Intelligence Platform.
            </h1>

            <div className="mt-8 h-1.5 w-24 rounded-full bg-[#FF6B00]" />

            <p className="mt-8 text-xl font-semibold text-slate-100 md:text-2xl">
              Know the Right Price. Build with Confidence.
            </p>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              SahiRate is building a transparent construction ecosystem where
              contractors, engineers, builders, dealers and homeowners can
              confidently compare prices, discover trusted suppliers and make
              smarter purchasing decisions.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm font-medium text-slate-300">
              <span>✓ Transparent Information</span>
              <span>✓ Market Intelligence</span>
              <span>✓ Smarter Decisions</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            02 � WHY SAHIRATE
        ====================================================== */}
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
                Why SahiRate
              </span>

              <h2
                className="mt-4 text-4xl font-extrabold tracking-tight text-[#071426] md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Built Around a Simple Belief.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Construction decisions become better when the information
                behind them is clear, useful and trustworthy.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">

              {/* Mission */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-xl text-[#FF6B00]">
                    ◎
                  </div>
                  <span className="text-5xl font-extrabold text-slate-100">
                    01
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-extrabold text-[#071426]">
                  Mission
                </h3>

                <div className="mt-4 h-1 w-14 rounded-full bg-[#FF6B00]" />

                <p className="mt-6 leading-8 text-slate-600">
                  Bring greater price transparency to India's construction
                  ecosystem so purchasing decisions are based on information,
                  not guesswork.
                </p>

                <div className="mt-7 font-semibold text-[#FF6B00]">
                  SahiRate ?
                </div>
              </div>

              {/* Vision */}
              <div className="rounded-3xl border border-orange-500/50 bg-[#071426] p-8 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-xl text-[#FF6B00]">
                    ◉
                  </div>
                  <span className="text-5xl font-extrabold text-white/10">
                    02
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-extrabold text-white">
                  Vision
                </h3>

                <div className="mt-4 h-1 w-14 rounded-full bg-[#FF6B00]" />

                <p className="mt-6 leading-8 text-slate-300">
                  Become a trusted construction intelligence platform that
                  connects buyers, suppliers and useful market information in
                  one place.
                </p>

                <div className="mt-7 font-semibold text-[#FF6B00]">
                  SahiRate ?
                </div>
              </div>

              {/* Future */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-xl text-[#FF6B00]">
                    ↗
                  </div>
                  <span className="text-5xl font-extrabold text-slate-100">
                    03
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-extrabold text-[#071426]">
                  Future
                </h3>

                <div className="mt-4 h-1 w-14 rounded-full bg-[#FF6B00]" />

                <p className="mt-6 leading-8 text-slate-600">
                  Expand beyond price discovery into a broader construction
                  procurement and intelligence ecosystem powered by SahiAI.
                </p>

                <div className="mt-7 font-semibold text-[#FF6B00]">
                  SahiRate ?
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            03 � THE PROBLEM
        ====================================================== */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
                The Problem We're Solving
              </span>

              <h2
                className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#071426] md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Why Construction Buying Needs Better Information
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
                Building material prices can vary significantly from one
                market to another. Buyers often have limited visibility into
                current rates, reliable suppliers and local market conditions.
              </p>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                SahiRate is being built to make that information easier to
                find, compare and understand before a purchase is made.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#071426] p-8 shadow-2xl md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-xl text-[#FF6B00]">
                ✓
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">
                What SahiRate Brings Together
              </h3>

              <div className="mt-6 divide-y divide-white/10">
                {[
                  "Building material prices",
                  "Trusted local dealer information",
                  "Market insights and price trends",
                  "Construction intelligence",
                  "Better purchasing decisions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 text-slate-200"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF6B00]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            04 � VISION STATEMENT
        ====================================================== */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
              Our Vision
            </span>

            <h2
              className="mt-4 text-4xl font-extrabold tracking-tight text-[#071426] md:text-5xl"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Better Information. Better Construction Decisions.
            </h2>

            <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-600">
              We want a future where builders, contractors, architects,
              developers, dealers and homeowners across India can access
              useful building material information with greater confidence.
            </p>

          </div>
        </section>

        {/* =====================================================
            05 � EXPANSION PLAN
        ====================================================== */}
        <section className="relative overflow-hidden bg-[#071426] py-24">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
                Expansion Plan
              </span>

              <h2
                className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                From Deoghar to India.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-300">
                We will grow market by market � learning, improving and
                building trust along the way.
              </p>
            </div>

            <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              <div className="absolute left-[8%] right-[8%] top-24 hidden h-px bg-orange-500/30 lg:block" />

              {phases.map((phase) => (
                <div
                  key={phase.number}
                  className="relative rounded-3xl border border-slate-700 bg-[#101d30] p-8 transition hover:-translate-y-1 hover:border-orange-500/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/40 bg-[#071426] text-2xl text-[#FF6B00]">
                      {phase.number === "01"
                        ? "↗"
                        : phase.number === "02"
                        ? "⌖"
                        : phase.number === "03"
                        ? "▥"
                        : "◎"}
                    </div>

                    <span className="text-4xl font-extrabold text-white/10">
                      {phase.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold text-white">
                    {phase.title}
                  </h3>

                  <p className="mt-3 text-lg font-bold text-[#FF6B00]">
                    {phase.place}
                  </p>

                  <p className="mt-5 leading-8 text-slate-400">
                    {phase.text}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-16 rounded-3xl border border-orange-500/20 bg-white/[0.04] px-6 py-7 text-center">
              <p className="text-lg font-semibold text-white md:text-xl">
                Har Material ka Sahi Rate.
                <span className="mx-3 text-slate-500">•</span>
                <span className="text-slate-300">Sahi Jankari.</span>
                <span className="mx-3 text-slate-500">•</span>
                <span className="text-[#FF6B00]">Behtar Faisle.</span>
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            06 � CORE VALUES
        ====================================================== */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
                Our Core Values
              </span>

              <h2
                className="mt-4 text-4xl font-extrabold tracking-tight text-[#071426] md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                What Drives SahiRate
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.number}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#FF6B00]">
                      {value.number}
                    </span>

                    <span className="text-xl text-slate-300 transition group-hover:text-[#FF6B00]">
                      ?
                    </span>
                  </div>

                  <h3 className="mt-9 text-xl font-extrabold text-[#071426]">
                    {value.title}
                  </h3>

                  <div className="mt-4 h-1 w-12 rounded-full bg-[#FF6B00]" />

                  <p className="mt-5 leading-7 text-slate-600">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =====================================================
            07 � FINAL CTA
        ====================================================== */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="rounded-[2rem] bg-[#071426] px-6 py-16 text-center shadow-2xl md:px-12">

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
                Build With Confidence
              </span>

              <h2
                className="mt-4 text-4xl font-extrabold text-white md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Ready to Build Smarter?
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Explore building material prices, discover trusted dealers,
                and make more informed construction decisions with SahiRate.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/materials"
                  className="rounded-xl bg-[#FF6B00] px-8 py-4 font-bold text-white transition hover:bg-[#e65f00]"
                >
                  Explore Materials ?
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-slate-600 px-8 py-4 font-bold text-white transition hover:border-white hover:bg-white hover:text-[#071426]"
                >
                  Contact Us
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
