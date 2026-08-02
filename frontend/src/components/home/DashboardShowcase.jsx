import {
  Activity,
  BrainCircuit,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import StatCard from "./StatCard";

const materials = [
  {
    name: "TMT Steel",
    price: "₹58,200 / MT",
    change: "+2.4%",
  },
  {
    name: "Cement OPC 53",
    price: "₹398 / Bag",
    change: "-1.2%",
  },
  {
    name: "River Sand",
    price: "₹52 / CFT",
    change: "+0.8%",
  },
  {
    name: "Bricks",
    price: "₹8.20 / Piece",
    change: "+3.1%",
  },
];

export default function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#081B33] pt-24 pb-20 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2.5 text-[13px] font-semibold tracking-[0.16em] text-orange-300">
            PRODUCT PREVIEW
          </span>

          <h2 className="mt-5 text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-white md:text-[52px] lg:text-[60px]">
            Live Building Material Intelligence
          </h2>

          <p className="mx-auto mt-7 max-w-[760px] text-[18px] leading-8 text-slate-300 md:text-[20px]">
            Monitor prices, compare suppliers, understand market
            movement and make smarter purchasing decisions powered by
            <span className="font-semibold text-white">
              {" "}SahiAI
            </span>.
          </p>

        </div>

        {/* Stats */}

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Materials Tracked"
            value="250+"
            change="+18 this month"
          />

          <StatCard
            title="Daily Price Updates"
            value="5,000+"
            change="+12%"
          />

          <StatCard
            title="Verified Dealers"
            value="850+"
            change="+42"
          />

          <StatCard
            title="Market Accuracy"
            value="98.7%"
            change="+0.8%"
          />

        </div>

        {/* Dashboard */}

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-3">

          {/* Left */}

          <div className="lg:col-span-2 self-start rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-semibold">
                  Today's Material Prices
                </h3>

                <p className="mt-1 text-slate-400">
                  Updated market snapshot
                </p>

              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-400">

                <Activity size={16} />

                Live

              </div>

            </div>

            <div className="mt-6 divide-y divide-white/10">
                          {materials.map((item) => (

                <div
                  key={item.name}
                  className="flex items-center justify-between py-4"
                >

                  <div>

                    <h4 className="text-lg font-semibold text-white">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Latest Market Rate
                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-lg font-bold text-white">
                      {item.price}
                    </div>

                    <div
                      className={`mt-1 text-sm font-medium ${
                        item.change.startsWith("-")
                          ? "text-red-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {item.change}
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Right */}

          <div className="space-y-5 self-start">

            {/* Powered by SahiAI */}

            <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15">

                  <BrainCircuit
                    className="text-orange-400"
                    size={24}
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    Powered by
                  </p>

                  <h3 className="text-xl font-bold text-white">
                    SahiAI
                  </h3>

                </div>

              </div>

              <p className="mt-5 leading-7 text-slate-300">
                Steel prices continue to remain strong.
                Compare multiple suppliers before placing
                bulk orders to achieve the best overall cost.
              </p>

            </div>

            {/* Quick Insights */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

              <h3 className="text-lg font-semibold text-white">
                Quick Insights
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-emerald-400"
                  />

                  <span className="text-slate-300">
                    250+ materials tracked across multiple categories.
                  </span>

                </div>

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-emerald-400"
                  />

                  <span className="text-slate-300">
                    Daily updates from verified dealers.
                  </span>

                </div>

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-emerald-400"
                  />

                  <span className="text-slate-300">
                    Market movements analysed by
                    <span className="font-semibold text-white">
                      {" "}SahiAI
                    </span>.
                  </span>

                </div>

              </div>

            </div>
                        {/* Weekly Trend */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

              <div className="flex items-center gap-3">

                <BarChart3
                  className="text-orange-400"
                  size={22}
                />

                <h3 className="text-lg font-semibold text-white">
                  Weekly Trend
                </h3>

              </div>

              <div className="mt-5 flex h-28 items-end justify-between gap-2">

                {[45, 65, 60, 82, 75, 92, 100].map((h, i) => (

                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-orange-500 to-orange-300 transition-all duration-300 hover:opacity-80"
                  />

                ))}

              </div>

            </div>

            {/* CTA */}

            <div className="rounded-3xl bg-white p-5 text-slate-900 shadow-lg">

              <h3 className="text-xl font-bold">
                Explore Complete Market Data
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Compare prices, discover verified dealers,
                track market trends and make smarter
                purchasing decisions with
                <span className="font-semibold">
                  {" "}SahiAI
                </span>.
              </p>

              <button
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-orange-600
                  hover:shadow-lg
                "
              >

                Explore Dashboard

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}