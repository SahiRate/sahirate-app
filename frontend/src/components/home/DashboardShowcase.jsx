import {
  Activity,
  BrainCircuit,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

const materials = [
  {
    name: "TMT Steel",
    price: "₹58,200 / MT",
    change: "+2.4%",
    positive: true,
  },
  {
    name: "Cement OPC 53",
    price: "₹398 / Bag",
    change: "-1.2%",
    positive: false,
  },
  {
    name: "River Sand",
    price: "₹52 / CFT",
    change: "+0.8%",
    positive: true,
  },
  {
    name: "Bricks",
    price: "₹8.20 / Piece",
    change: "+3.1%",
    positive: true,
  },
];

const trendData = [45, 65, 60, 82, 75, 92, 100];

export default function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#081B33] pt-24 pb-20 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2.5 text-[13px] font-semibold tracking-[0.16em] text-orange-300">
            PRODUCT PREVIEW
          </span>

          <h2 className="mt-5 text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-white md:text-[52px] lg:text-[60px]">
            Live Building Material Intelligence
          </h2>

          <p className="mx-auto mt-7 max-w-[760px] text-[18px] leading-8 text-slate-300 md:text-[20px]">
            Monitor prices, compare suppliers, understand market movement
            and make smarter purchasing decisions powered by{" "}
            <span className="font-semibold text-white">
              SahiAI
            </span>
            .
          </p>

        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {[
            ["Materials Tracked", "250+", "+18 this month"],
            ["Daily Price Updates", "5,000+", "+12%"],
            ["Verified Dealers", "850+", "+42"],
            ["Market Accuracy", "98.7%", "+0.8%"],
          ].map(([title, value, change]) => (

            <div
              key={title}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-white/10"
            >

              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {title}
              </div>

              <div className="mt-3 text-[42px] font-black tracking-[-0.03em] text-white">
                {value}
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
                <TrendingUp size={16} />
                {change}
              </div>

            </div>

          ))}

        </div>

        {/* =====================================================
            MAIN DASHBOARD
        ===================================================== */}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.65fr_0.9fr]">

          {/* ===================================================
              LEFT — MARKET SNAPSHOT
          =================================================== */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:p-7">

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-[24px] font-bold tracking-[-0.02em] text-white">
                  Today's Material Prices
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Updated market snapshot
                </p>

              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-400">

                <Activity size={16} />

                Live

              </div>

            </div>

            {/* Price List */}

            <div className="mt-6 divide-y divide-white/10">

              {materials.map((item) => (

                <div
                  key={item.name}
                  className="flex items-center justify-between gap-6 py-5 transition-all duration-300 first:pt-2 hover:px-2"
                >

                  <div>

                    <h4 className="text-[18px] font-semibold text-white">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Latest Market Rate
                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-[19px] font-bold text-white">
                      {item.price}
                    </div>

                    <div
                      className={`mt-1 text-sm font-semibold ${
                        item.positive
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {item.change}
                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Market Summary */}

            <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Market Status
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="font-semibold text-emerald-400">
                    Stable
                  </span>

                </div>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Tracked Today
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  5,000+
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Last Update
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  5 min ago
                </p>

              </div>

            </div>

          </div>

          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}

          <div className="flex flex-col gap-5">

            {/* SahiAI */}

            <div className="rounded-[28px] border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-500/[0.03] p-6">

              <div className="flex items-center gap-4">

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

              <p className="mt-5 text-[15px] leading-7 text-slate-300">
                Steel prices continue to remain strong. Compare multiple
                suppliers before placing bulk orders to achieve the best
                overall cost.
              </p>

            </div>

            {/* Quick Insights */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6">

              <h3 className="text-lg font-semibold text-white">
                Quick Insights
              </h3>

              <div className="mt-5 space-y-4">

                {[
                  "250+ materials tracked across multiple categories.",
                  "Daily updates from verified dealers.",
                  "Market movements analysed by SahiAI.",
                ].map((text) => (

                  <div
                    key={text}
                    className="flex items-start gap-3"
                  >

                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <span className="text-[15px] leading-6 text-slate-300">
                      {text}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* Weekly Trend */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6">

              <div className="flex items-center gap-3">

                <BarChart3
                  className="text-orange-400"
                  size={22}
                />

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    Weekly Trend
                  </h3>

                  <p className="text-xs text-slate-500">
                    Market movement
                  </p>

                </div>

              </div>

              <div className="mt-5 flex h-24 items-end justify-between gap-2">

                {trendData.map((height, index) => (

                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-orange-500 to-orange-300 transition-all duration-300 hover:opacity-80"
                  />

                ))}

              </div>

            </div>

            {/* CTA */}

            <div className="rounded-[28px] bg-white p-6 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="text-xl font-bold tracking-[-0.02em]">
                    Explore Complete Market Data
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    Compare prices, discover verified dealers, track market
                    trends and make smarter purchasing decisions with{" "}
                    <span className="font-semibold text-slate-900">
                      SahiAI
                    </span>
                    .
                  </p>

                </div>

                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 sm:flex">

                  <ArrowUpRight
                    className="text-orange-500"
                    size={20}
                  />

                </div>

              </div>

              <Link
                to="/prices"
                className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
              >

                Explore Live Prices

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
