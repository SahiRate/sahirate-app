import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-white/10">
      <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {title}
      </div>

      <div className="mt-3 text-[42px] font-black tracking-[-0.03em] text-white">
        {value}
      </div>

      <div
        className={`mt-3 flex items-center gap-2 text-sm font-medium ${
          positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {positive ? (
          <TrendingUp size={16} />
        ) : (
          <TrendingDown size={16} />
        )}

        {change}
      </div>
    </div>
  );
}