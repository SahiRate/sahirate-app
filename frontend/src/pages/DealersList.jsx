import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Truck, Star, ArrowRight, Search } from "lucide-react";
import { fetchDealers } from "../lib/api";

export default function DealersList() {
  const [dealers, setDealers] = useState([]);
  const [q, setQ] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);

  useEffect(() => {
    fetchDealers().then(setDealers).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return dealers.filter(d => {
      if (q && !(d.name.toLowerCase().includes(q.toLowerCase()) || d.area.toLowerCase().includes(q.toLowerCase()))) return false;
      if (onlyVerified && !d.verified) return false;
      if (onlyDelivery && !d.delivery) return false;
      return true;
    });
  }, [dealers, q, onlyVerified, onlyDelivery]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="mb-10 max-w-3xl">
        <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">Directory</div>
        <h1 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight">
          Every trusted dealer in Deoghar.
        </h1>
        <p className="mt-4 text-slate-600">
          GST-verified. Rated by real buyers. Call or WhatsApp instantly.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center flex-1 min-w-[260px] border border-slate-200 rounded-md px-3 focus-within:border-[#FF5722]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            data-testid="dealer-search-input"
            placeholder="Search by name or area..."
            className="flex-1 px-3 py-2.5 text-sm outline-none"
          />
        </div>
        <button
          data-testid="filter-verified"
          onClick={() => setOnlyVerified(v => !v)}
          className={`px-4 py-2.5 rounded-md text-sm border transition-colors ${
            onlyVerified ? "bg-[#0A192F] text-white border-[#0A192F]" : "border-slate-200 text-slate-700"
          }`}
        >
          Verified only
        </button>
        <button
          data-testid="filter-delivery"
          onClick={() => setOnlyDelivery(v => !v)}
          className={`px-4 py-2.5 rounded-md text-sm border transition-colors ${
            onlyDelivery ? "bg-[#0A192F] text-white border-[#0A192F]" : "border-slate-200 text-slate-700"
          }`}
        >
          Home delivery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="dealers-grid">
        {filtered.map(d => (
          <Link
            key={d.id}
            to={`/dealers/${d.id}`}
            data-testid={`dealer-card-${d.id}`}
            className="group bg-white border border-slate-200 rounded-lg p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-[#0A192F] text-lg leading-tight">{d.name}</h3>
                <div className="text-xs text-slate-500 mt-1">{d.area} · Deoghar</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722]" />
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#0A192F]">
                <Star className="w-3.5 h-3.5 fill-[#FF5722] text-[#FF5722]" />
                {d.rating}
              </span>
              <span className="text-slate-500">({d.reviews_count} reviews)</span>
              <span className="text-slate-500">· {d.years_in_business} yrs</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {d.materials_offered.slice(0, 4).map((m, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{m}</span>
              ))}
              {d.materials_offered.length > 4 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  +{d.materials_offered.length - 4}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest">
              {d.verified && (
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
              {d.delivery && (
                <span className="inline-flex items-center gap-1 text-slate-600">
                  <Truck className="w-3 h-3" /> Delivery
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-slate-500 py-16 text-center">No dealers match your filters.</div>
      )}
    </div>
  );
}
