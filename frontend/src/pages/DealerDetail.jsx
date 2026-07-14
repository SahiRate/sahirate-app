import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, ShieldCheck, Truck, Star, MapPin } from "lucide-react";
import { fetchDealer } from "../lib/api";

export default function DealerDetail() {
  const { id } = useParams();
  const [d, setD] = useState(null);

  useEffect(() => {
    setD(null);
    fetchDealer(id).then(setD).catch(() => setD({ error: true }));
  }, [id]);

  if (!d) return <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-slate-500">Loading dealer...</div>;
  if (d.error) return <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">Dealer not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <Link to="/dealers" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#FF5722] mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to dealers
      </Link>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8 mb-10">
        <div>
          <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">Dealer · Deoghar</div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight">{d.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-slate-600"><MapPin className="w-4 h-4" /> {d.area}, Deoghar</span>
            <span className="flex items-center gap-1 font-semibold text-[#0A192F]">
              <Star className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" /> {d.rating}
            </span>
            <span className="text-slate-500">({d.reviews_count} reviews)</span>
            <span className="text-slate-500">· {d.years_in_business} years in business</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {d.verified && <Badge tone="emerald" icon={<ShieldCheck className="w-3 h-3" />}>GST Verified</Badge>}
            {d.delivery && <Badge tone="navy" icon={<Truck className="w-3 h-3" />}>Home delivery</Badge>}
            {d.gst_registered && <Badge tone="navy">GSTIN registered</Badge>}
            {d.whatsapp && <Badge tone="navy">WhatsApp</Badge>}
          </div>
        </div>

        <div className="bg-[#0A192F] text-white rounded-lg p-6 relative overflow-hidden">
          <div className="sahi-noise" />
          <div className="relative">
            <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722]">Contact</div>
            <div className="mt-2 font-mono text-2xl">{d.phone}</div>
            <div className="mt-4 flex gap-2">
              <a href={`tel:${d.phone}`} data-testid="dealer-call-btn" className="flex-1 bg-[#FF5722] hover:bg-[#e64a1c] text-white font-semibold px-4 py-3 rounded-md inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a
                href={`https://wa.me/${d.phone.replace(/\D/g, "")}`}
                target="_blank" rel="noreferrer"
                data-testid="dealer-whatsapp-btn"
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-md inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#0A192F] mb-4">Live prices at this dealer</h2>
      <div className="border border-slate-200 rounded-lg overflow-hidden" data-testid="dealer-prices-table">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-mono tracking-widest text-slate-500">
          <div>Material</div>
          <div className="text-right">Price</div>
          <div className="text-right">Unit</div>
          <div className="text-center">Stock</div>
        </div>
        {d.prices?.map((p, i) => (
          <Link
            key={i}
            to={`/materials/${p.material_slug}`}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-4 border-b border-slate-100 items-center hover:bg-slate-50/60"
          >
            <div className="font-semibold text-[#0A192F]">{p.material_name}</div>
            <div className="text-right font-mono font-bold text-[#0A192F]">₹{p.price}</div>
            <div className="text-right text-xs text-slate-500 font-mono">{p.unit}</div>
            <div className="text-center">
              {p.in_stock ? (
                <span className="text-[11px] uppercase tracking-widest font-mono text-emerald-700">In stock</span>
              ) : (
                <span className="text-[11px] uppercase tracking-widest font-mono text-slate-400">Out</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const Badge = ({ tone, icon, children }) => {
  const cls = tone === "emerald"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-slate-50 text-[#0A192F] border-slate-200";
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${cls}`}>
      {icon}{children}
    </span>
  );
};
