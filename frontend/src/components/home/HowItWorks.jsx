import {
  Search,
  BarChart3,
  BrainCircuit,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Material",
    description:
      "Quickly search any building material and access the latest market prices from trusted sources.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Compare Market Prices",
    description:
      "Compare prices across dealers and markets to identify the best value before purchasing.",
  },
  {
    icon: BrainCircuit,
    step: "03",
    title: "Get SahiAI Insights",
    description:
      "Receive intelligent recommendations, price trends, and market signals powered by SahiAI.",
  },
  {
    icon: ShoppingCart,
    step: "04",
    title: "Buy with Confidence",
    description:
      "Purchase with greater confidence using transparent pricing and reliable market intelligence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-100 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-[13px] font-semibold tracking-[0.16em] text-orange-600">
            HOW IT WORKS
          </span>

          <h2 className="mt-5 text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-slate-900 md:text-[52px] lg:text-[60px]">
            Build Smarter in Four Simple Steps
          </h2>

          <p className="mx-auto mt-7 max-w-[760px] text-[18px] leading-8 text-slate-600 md:text-[20px]">
            From checking prices to making informed purchasing decisions,
            <span className="font-semibold text-slate-900"> SahiRate </span>
            makes the entire buying journey simple, transparent and powered by
            <span className="font-semibold text-slate-900"> SahiAI</span>.
          </p>

        </div>

        {/* Steps */}

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {steps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="group flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-[0_24px_64px_rgba(15,23,42,0.14)]"
              >
                {/* Header */}

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 transition-colors duration-300 group-hover:bg-orange-100">

                    <Icon
                      className="text-orange-500 transition-transform duration-300 group-hover:scale-110"
                      size={28}
                    />

                  </div>

                  <span className="text-5xl font-extrabold text-slate-100">
                    {item.step}
                  </span>

                </div>

                {/* Content */}

                <h3 className="mt-8 text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 flex-grow text-[17px] leading-[1.75] text-slate-600">
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