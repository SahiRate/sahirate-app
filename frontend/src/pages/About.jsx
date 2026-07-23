import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
export default function About() {
  return (
    <>
      <SEO
        title="About SahiRate"
        description="Learn about SahiRate and our mission to bring price transparency to India's construction ecosystem."
      />

      <main className="min-h-screen">
  <section className="relative overflow-hidden bg-[#0A192F]">
    <div className="absolute -top-52 -right-52 h-[700px] w-[700px] rounded-full bg-[#FF6B00]/20 blur-[140px]" />
    <div className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[120px]" />

    <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-28">
      <span className="inline-flex items-center rounded-full border border-orange-300/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300">
        About SahiRate
      </span>

      <h2 className="text-2xl md:text-3xl font-bold text-white">
  India's Most Trusted Building Material Intelligence Platform.
</h2>

<p className="mt-4 text-lg text-slate-300">
  Know the Right Price. Build with Confidence.
</p>

      <p className="mt-8 max-w-3xl text-lg leading-9 text-slate-300">
        SahiRate is building a transparent construction ecosystem where
        contractors, engineers, builders, dealers and homeowners can
        confidently compare prices, discover trusted suppliers and make
        smarter purchasing decisions.
      </p>
    </div>
  </section>
<section className="bg-white py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">

    <div>
      <span className="text-[#FF6B00] font-semibold uppercase tracking-widest">
        Our Mission
      </span>

      <h2
        className="mt-4 text-4xl font-extrabold text-[#0A192F]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Bringing Price Transparency to India's Construction Industry
      </h2>

      <p className="mt-8 text-lg leading-9 text-slate-600">
        Construction material prices often vary from one market to another,
        making it difficult for buyers to make informed decisions.
        SahiRate aims to bridge this information gap by providing reliable
        price insights, trusted dealer information, and market intelligence
        on one platform.
      </p>

      <p className="mt-6 text-lg leading-9 text-slate-600">
        Our goal is to empower builders, contractors, architects,
        developers, dealers, and homeowners with transparent information
        that helps them save time, reduce costs, and make smarter
        purchasing decisions.
      </p>
    </div>

    <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-10">
      <h3 className="text-2xl font-bold text-[#0A192F]">
        Why SahiRate?
      </h3>

      <ul className="mt-8 space-y-5 text-slate-700">
        <li>✔ Transparent building material prices</li>
        <li>✔ Trusted local dealer discovery</li>
        <li>✔ Market insights and price trends</li>
        <li>✔ AI-powered construction intelligence</li>
        <li>✔ Smarter and more informed buying decisions</li>
      </ul>
    </div>

  </div>
</section>
<section className="bg-slate-50 py-24">
  <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">

    <span className="text-[#FF6B00] font-semibold uppercase tracking-widest">
      Our Vision
    </span>

    <h2
      className="mt-4 text-4xl font-extrabold text-[#0A192F]"
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      Empowering Every Construction Decision with Reliable Data
    </h2>

    <p className="mt-8 text-lg leading-9 text-slate-600">
      We envision a future where every builder, contractor, architect,
      developer, dealer, and homeowner across India has access to transparent,
      accurate, and reliable building material information. By combining
      technology, market intelligence, and data-driven insights, SahiRate aims
      to become the trusted platform for smarter construction decisions.
    </p>

  </div>
</section>

<section className="bg-white py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    <div className="text-center">
      <span className="text-[#FF6B00] font-semibold uppercase tracking-widest">
        Our Core Values
      </span>

      <h2
        className="mt-4 text-4xl font-extrabold text-[#0A192F]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        What Drives SahiRate
      </h2>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-3xl border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-[#0A192F]">
          Transparency
        </h3>

        <p className="mt-4 text-slate-600">
          We believe informed decisions begin with open, reliable and transparent information.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-[#0A192F]">
          Trust
        </h3>

        <p className="mt-4 text-slate-600">
          Building confidence through accurate market data and dependable insights.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-[#0A192F]">
          Innovation
        </h3>

        <p className="mt-4 text-slate-600">
          Leveraging modern technology and AI to simplify construction decisions.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-[#0A192F]">
          Customer First
        </h3>

        <p className="mt-4 text-slate-600">
          Every feature we build is focused on helping our users make better decisions.
        </p>
      </div>

    </div>

  </div>
</section>

<section className="bg-[#0A192F] py-24">
  <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">

    <h2
      className="text-4xl font-extrabold text-white"
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      Ready to Build Smarter?
    </h2>

    <p className="mt-6 text-lg leading-9 text-slate-300 max-w-3xl mx-auto">
      Explore transparent building material prices, discover trusted dealers,
      and make better construction decisions with SahiRate.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
  <Link
    to="/materials"
    className="rounded-xl bg-[#FF6B00] px-8 py-4 font-bold text-white hover:bg-[#e65f00] transition"
  >
    Explore Materials
  </Link>

  <Link
    to="/contact"
    className="rounded-xl border border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-[#0A192F] transition"
  >
    Contact Us
  </Link>
</div>

  </div>
</section>

</main>
    </>
  );
}