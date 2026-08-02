import FeatureCard from "./FeatureCard";

export default function WhySahiRate() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-24 pb-20">

      {/* Background Glow */}

      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-orange-100 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-[13px] font-semibold tracking-[0.16em] text-orange-600">
            WHY SAHIRATE
          </span>

          <h2 className="mt-5 text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-slate-900 md:text-[52px] lg:text-[60px]">
            Everything You Need to Make Better
            Construction Decisions
          </h2>

          <p className="mx-auto mt-7 max-w-[760px] text-[18px] leading-8 text-slate-600 md:text-[20px]">
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

        <div className="mt-14 grid gap-8 md:grid-cols-2">

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