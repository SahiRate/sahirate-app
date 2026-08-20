import SEO from "../components/SEO";

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers | SahiRate"
        description="Join SahiRate and help build India's Building Material Intelligence Platform."
        path="/careers"
      />

      <div className="min-h-[70vh] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#FF5722]">
              Careers at SahiRate
            </div>

            <h1 className="text-4xl font-black tracking-tight text-[#0A192F] md:text-6xl">
              Build the future of construction intelligence.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We are building a smarter and more transparent construction
              ecosystem through reliable building-material prices, market
              intelligence and technology.
            </p>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-2xl font-bold text-[#0A192F]">
                Opportunities coming soon
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                We are currently building our core platform and team. Career
                opportunities will be listed here as we expand.
              </p>

              <a
                href="mailto:careers@sahirate.in"
                className="mt-6 inline-flex rounded-xl bg-[#FF5722] px-6 py-3 font-semibold text-white transition hover:bg-[#e64a1c]"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}