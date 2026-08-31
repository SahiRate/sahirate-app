import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const prices = [
  {
    material: "UltraTech Cement",
    dealer: "Sharma Traders",
    price: "₹385",
    change: "+4",
    up: true,
  },
  {
    material: "TMT Bar Fe550",
    dealer: "Steel Point",
    price: "₹61/kg",
    change: "-2",
    up: false,
  },
  {
    material: "River Sand",
    dealer: "Maa Suppliers",
    price: "₹58/cft",
    change: "+1",
    up: true,
  },
];

export default function HeroDashboard() {
  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 rounded-[40px] bg-[#FF6B00]/10 blur-3xl" />

      {/* Floating Badge */}
      <div className="absolute -top-6 -right-4 z-20 rounded-2xl border border-orange-300/40 bg-[#FF6B00] px-4 py-2.5 shadow-xl">
        <div className="flex items-center gap-2 text-white">
          <Sparkles size={18} />
          <span className="text-[15px] font-bold tracking-[0.01em] antialiased">
            Powered by SahiAI
          </span>
        </div>
      </div>

      {/* Dashboard */}
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/10 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_100px_rgba(15,23,42,0.24)]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-white">
              Live Market Snapshot
            </h3>

            <p className="mt-1 text-sm text-slate-300">
              Today's Market Prices
            </p>
          </div>

          <div className="rounded-xl bg-[#FF6B00]/15 p-2">
            <ShieldCheck className="text-[#FF6B00]" />
          </div>
        </div>

        {/* Price List */}
        <div className="space-y-2.5 p-5">
          {prices.map((item) => (
            <div
              key={item.material}
              className="rounded-2xl border border-white/5 bg-white/5 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[17px] font-semibold text-white">
                    {item.material}
                  </h4>

                  <p className="mt-0.5 text-[13px] text-slate-400">
                    {item.dealer}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[22px] font-bold tracking-[-0.02em] text-white">
                    {item.price}
                  </div>

                  <div
                    className={`mt-1 flex items-center justify-end gap-1 text-sm ${
                      item.up
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {item.up ? (
                      <TrendingUp size={15} />
                    ) : (
                      <TrendingDown size={15} />
                    )}

                    {item.change} Today
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="border-t border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FF6B00]/20 p-3">
              <Sparkles className="text-[#FF6B00]" />
            </div>

            <div>
              <h4 className="font-semibold text-white">
                SahiAI Insight
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Cement prices are showing an upward trend this week. Compare nearby dealers before placing your order to get a better market rate.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3.5">
          <span className="text-sm text-slate-400">
            Updated 5 min ago
          </span>

          <button className="group flex items-center gap-2 text-sm font-semibold text-[#FF6B00] transition-all duration-300 hover:gap-3">
            View Full Market

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
