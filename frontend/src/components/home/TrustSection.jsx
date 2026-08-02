import {
  ShieldCheck,
  BadgeCheck,
  Database,
  Clock3,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Verified Information",
    description:
      "Material prices are collected from trusted market sources and verified supplier networks.",
  },
  {
    icon: Database,
    title: "Reliable Market Data",
    description:
      "Continuously updated market information helps you make informed purchasing decisions with confidence.",
  },
  {
    icon: Clock3,
    title: "Regular Updates",
    description:
      "Prices, trends, and insights are refreshed frequently to reflect changing market conditions.",
  },
  {
    icon: BadgeCheck,
    title: "Built for Professionals",
    description:
      "Designed for builders, contractors, architects, dealers, developers, and homeowners across India.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-100 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold tracking-wide text-orange-600">
            WHY TRUST SAHIRATE
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Trusted Information for Better
            Construction Decisions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            <span className="font-semibold text-slate-900">
              SahiRate
            </span>{" "}
            combines verified market information, transparent pricing, and
            <span className="font-semibold text-slate-900">
              {" "}SahiAI
            </span>{" "}
            insights to help every construction professional make smarter and
            more confident purchasing decisions.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
              >

                {/* Icon */}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-100">

                  <Icon
                    className="text-orange-500 transition-transform duration-300 group-hover:scale-110"
                    size={30}
                  />

                </div>

                {/* Content */}

                <h3 className="mt-6 text-2xl font-semibold leading-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 flex-grow leading-7 text-slate-600">
                  {item.description}
                </p>

                {/* Footer */}

                <div className="mt-8 flex items-center gap-2 font-medium text-orange-500 transition-all duration-300 group-hover:gap-3">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}