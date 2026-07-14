import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { fetchMaterials } from "../lib/api";

export default function MaterialsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="mb-12 max-w-3xl">
        <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">Materials</div>
        <h1 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight">
          Compare every material.<br/>Every dealer. Every day.
        </h1>
        <p className="mt-4 text-slate-600">
          Real prices from real dealers in Deoghar — refreshed every day.
        </p>
      </div>

      {loading ? (
        <div className="text-slate-500">Loading materials...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-testid="materials-grid">
          {items.map(m => {
            const trend = m.stats?.avg && m.stats?.min ? (m.stats.avg > (m.stats.min + m.stats.max) / 2 ? "up" : "down") : "flat";
            return (
              <Link
                key={m.slug}
                to={`/materials/${m.slug}`}
                data-testid={`material-card-${m.slug}`}
                className="group grid grid-cols-[140px_1fr] gap-5 border border-slate-200 bg-white rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="bg-slate-100 overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="py-5 pr-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#0A192F]">{m.name}</h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722]" />
                  </div>
                  <div className="text-xs text-slate-500">{m.unit}</div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <Stat label="Min" value={m.stats?.min} tone="down" />
                    <Stat label="Avg" value={m.stats?.avg} tone="flat" />
                    <Stat label="Max" value={m.stats?.max} tone="up" />
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    <span className="font-mono">{m.stats?.dealer_count || 0}</span> dealers offering
                    <span className="ml-2 inline-flex items-center gap-1">
                      {trend === "up" && <ArrowUpRight className="w-3 h-3 text-[#FF5722]" />}
                      {trend === "down" && <ArrowDownRight className="w-3 h-3 text-emerald-600" />}
                      {trend === "flat" && <Minus className="w-3 h-3" />}
                      trending
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Stat = ({ label, value, tone }) => {
  const color = tone === "down" ? "text-emerald-700" : tone === "up" ? "text-[#FF5722]" : "text-[#0A192F]";
  return (
    <div className="border border-slate-200 rounded-md p-2">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{label}</div>
      <div className={`font-mono font-bold ${color}`}>₹{value ?? "—"}</div>
    </div>
  );
};
