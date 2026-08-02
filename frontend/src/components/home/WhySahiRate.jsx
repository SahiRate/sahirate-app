import FeatureCard from "./FeatureCard";

export default function WhySahiRate() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Glow */}

      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-orange-100 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold tracking-wide text-orange-600">
            WHY SAHIRATE
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Everything You Need to Make Better
            Construction Decisions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            <span className="font-semibold text-slate-900">
              SahiRate
            </span>{" "}
            combines transparent pricing, market intelligence,
            verified supplier information, and
            <span className="font-semibold text-slate-900">
              {" "}SahiAI
            </span>{" "}
            insights into one intelligent platform for builders,
            contractors, architects, dealers, and homeowners.
          </p>

        </div>

        {/* Feature Grid */}

        <div className="mt-16 grid gap-6 md:grid-cols-2">

          <FeatureCard
            icon="prices"
            title="Transparent Market Prices"
            description="Access reliable and up-to-date building material prices before every purchase, helping you avoid overpaying."
          />

          <FeatureCard
            icon="ai"
            title="Powered by SahiAI"
            description="Receive intelligent recommendations, pricing signals, and market insights to make faster and smarter decisions."
          />

          <FeatureCard
            icon="trends"
            title="Price Trends & Analytics"
            description="Track historical prices, identify market movement, and plan procurement with greater confidence."
          />

          <FeatureCard
            icon="network"
            title="Trusted Supplier Network"
            description="Compare verified suppliers, evaluate pricing transparently, and choose reliable partners for every project."
          />

        </div>

      </div>

    </section>
  );
}