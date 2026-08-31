import TrustCard from "./TrustCard";

export default function IndustryTrust() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-100 opacity-70 blur-[90px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-[13px] font-semibold tracking-[0.16em] text-orange-600">
            TRUSTED ACROSS THE INDUSTRY
          </span>

          <h2 className="mt-5 text-[44px] font-bold leading-[1.05] tracking-[-0.04em] text-slate-900 lg:text-[56px]">
            Built for Everyone in Construction
          </h2>

          <p className="mx-auto mt-7 max-w-[780px] text-[18px] leading-8 text-slate-600 md:text-[20px]">
            Whether you're constructing a home, managing a commercial project,
            or supplying building materials,
            <span className="font-brand text-slate-900"> SahiRate </span>
            helps you make faster, smarter, and more transparent purchasing
            decisions.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          <TrustCard
            icon="builders"
            title="Builders"
            description="Manage project costs with accurate market prices, better budgeting, and smarter planning."
          />

          <TrustCard
            icon="contractors"
            title="Contractors"
            description="Compare local material prices before every purchase and maximize project profitability."
          />

          <TrustCard
            icon="engineers"
            title="Engineers"
            description="Prepare accurate estimates using reliable and transparent building material prices."
          />

          <TrustCard
            icon="architects"
            title="Architects"
            description="Recommend the right materials confidently with current pricing and market insights."
          />

          <TrustCard
            icon="dealers"
            title="Dealers"
            description="Increase customer trust through transparent pricing and stronger market visibility."
          />

          <TrustCard
            icon="homeowners"
            title="Homeowners"
            description="Build your dream home with confidence by avoiding overpriced building materials."
          />

        </div>

      </div>

    </section>
  );
}
