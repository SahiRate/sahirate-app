import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, MapPin, ShieldCheck, Truck, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { fetchMaterial } from "../lib/api";

const TrendPill = ({ trend, prev, price }) => {
  const diff = price - prev;
  const pct = prev ? ((diff / prev) * 100).toFixed(1) : 0;
  if (trend === "up") return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-[#FF5722]">
      <ArrowUpRight className="w-3 h-3" />+{pct}%
    </span>
  );
  if (trend === "down") return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-600">
      <ArrowDownRight className="w-3 h-3" />{pct}%
    </span>
  );
  return <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500"><Minus className="w-3 h-3" />0%</span>;
};

export default function MaterialDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [sort, setSort] = useState("price");

  useEffect(() => {
    setData(null);
    fetchMaterial(slug).then(setData).catch(() => setData({ error: true }));
  }, [slug]);

  if (!data) return <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-slate-500">Loading material data...</div>;
  if (data.error) return <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">Material not found.</div>;

  const sorted = [...(data.comparison || [])].sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });
  const cheapest = sorted[0];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <Link to="/materials" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#FF5722] mb-6" data-testid="back-to-materials">
        <ArrowLeft className="w-4 h-4" /> Back to materials
      </Link>

      {/* Header */}
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-center mb-12">
        <div className="rounded-lg overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
          <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">Material · Deoghar</div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight">{data.name}</h1>
          <div className="text-slate-500 mt-1">{data.unit}</div>
          <p className="mt-4 text-slate-600 max-w-2xl">{data.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
            <PriceStat label="Cheapest" value={data.stats?.min} highlight />
            <PriceStat label="Average" value={data.stats?.avg} />
            <PriceStat label="Highest" value={data.stats?.max} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {data.brands?.map(b => (
              <span key={b} className="text-xs border border-slate-200 rounded-full px-3 py-1 text-slate-600">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Cheapest highlight */}
      {cheapest && (
        <div className="mb-8 p-6 rounded-lg border-2 border-[#FF5722] bg-orange-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" data-testid="cheapest-highlight">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-1">Cheapest today</div>
            <div className="text-xl font-bold text-[#0A192F]">{cheapest.dealer_name}</div>
            <div className="text-sm text-slate-600 flex items-center gap-1"><MapPin className="w-3 h-3" /> {cheapest.area}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-[#FF5722] font-mono">₹{cheapest.price}</div>
            <div className="text-xs text-slate-500">{data.unit}</div>
          </div>
        </div>
      )}

      {/* Comparison table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#0A192F]">All dealers · {sorted.length}</h2>
        <div className="flex gap-2 text-xs">
          <button
            data-testid="sort-price"
            onClick={() => setSort("price")}
            className={`px-3 py-1.5 rounded-md border ${sort === "price" ? "bg-[#0A192F] text-white border-[#0A192F]" : "border-slate-200 text-slate-600"}`}
          >Sort by price</button>
          <button
            data-testid="sort-rating"
            onClick={() => setSort("rating")}
            className={`px-3 py-1.5 rounded-md border ${sort === "rating" ? "bg-[#0A192F] text-white border-[#0A192F]" : "border-slate-200 text-slate-600"}`}
          >Sort by rating</button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden" data-testid="comparison-table">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-mono tracking-widest text-slate-500">
          <div>Dealer</div>
          <div className="text-right">Price</div>
          <div className="text-right">Trend</div>
          <div className="text-center">Status</div>
          <div className="text-right">Action</div>
        </div>
        {sorted.map((c, i) => (
          <div
            key={c.dealer_id + i}
            data-testid={`compare-row-${c.dealer_id}`}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 border-b border-slate-100 items-center hover:bg-slate-50/60 transition-colors"
          >
            <div>
              <Link to={`/dealers/${c.dealer_id}`} className="font-semibold text-[#0A192F] hover:text-[#FF5722]">
                {c.dealer_name}
              </Link>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.area}</span>
                <span>★ {c.rating}</span>
                {c.verified && <span className="inline-flex items-center gap-1 text-emerald-700"><ShieldCheck className="w-3 h-3" /> Verified</span>}
                {c.delivery && <span className="inline-flex items-center gap-1 text-slate-600"><Truck className="w-3 h-3" /> Delivery</span>}
              </div>
            </div>
            <div className="text-right font-mono font-bold text-[#0A192F]">₹{c.price}</div>
            <div className="text-right"><TrendPill trend={c.trend} prev={c.previous_price} price={c.price} /></div>
            <div className="text-center">
              {c.in_stock ? (
                <span className="text-[11px] uppercase tracking-widest font-mono text-emerald-700">In stock</span>
              ) : (
                <span className="text-[11px] uppercase tracking-widest font-mono text-slate-400">No stock</span>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <a href={`tel:${c.phone}`} data-testid={`call-${c.dealer_id}`} className="p-2 rounded-md border border-slate-200 hover:border-[#FF5722] hover:text-[#FF5722]">
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
                target="_blank" rel="noreferrer"
                data-testid={`whatsapp-${c.dealer_id}`}
                className="p-2 rounded-md border border-slate-200 hover:border-[#FF5722] hover:text-[#FF5722]"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PriceStat = ({ label, value, highlight }) => (
  <div className={`border rounded-md p-3 ${highlight ? "border-[#FF5722] bg-orange-50/40" : "border-slate-200 bg-white"}`}>
    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{label}</div>
    <div className={`font-mono font-black text-lg ${highlight ? "text-[#FF5722]" : "text-[#0A192F]"}`}>₹{value ?? "—"}</div>
  </div>
);
