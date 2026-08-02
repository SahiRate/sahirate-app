import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="text-sm text-slate-400">{title}</div>

      <div className="mt-2 text-3xl font-bold text-white">
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