import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  Star,
  MapPin,
} from "lucide-react";

import { fetchDealer } from "../lib/api";
import SEO from "../components/SEO";

export default function DealerDetail() {
  const { id } = useParams();
  const [d, setD] = useState(null);

  useEffect(() => {
    setD(null);

    fetchDealer(id)
      .then(setD)
      .catch(() => setD({ error: true }));
  }, [id]);

  if (!d) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-slate-500">
        Loading dealer...
      </div>
    );
  }

  if (d.error) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        Dealer not found.
      </div>
    );
  }

  const dealerName = d.name || "Building Material Dealer";
  const dealerArea = d.area || "Deoghar";
  const phone = d.phone || null;
  const rating = d.rating ?? "—";
  const reviewsCount = d.reviews_count ?? 0;
  const yearsInBusiness = d.years_in_business ?? "—";
  const plusCode = d.plus_code || null;
  const address = d.address || null;

  return (
    <>
      <SEO
        title={`${dealerName} | Building Material Dealer in Deoghar | SahiRate`}
        description={`${dealerName} is a building material dealer in ${dealerArea}. Check available materials, current prices, contact details and dealer information on SahiRate.`}
        keywords={`${dealerName}, ${dealerName} Deoghar, building material dealer Deoghar, construction material dealer Deoghar, cement dealer Deoghar, TMT dealer Deoghar, ${dealerArea} building material dealer, SahiRate`}
        path={`/dealers/${id}`}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Back */}
        <Link
          to="/dealers"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#FF5722] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dealers
        </Link>

        {/* Dealer Header */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 mb-10">
          {/* Dealer Information */}
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">
              Dealer · Deoghar
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight">
              {dealerName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-4 h-4" />
                {dealerArea}, Deoghar
              </span>

              <span className="flex items-center gap-1 font-semibold text-[#0A192F]">
                <Star className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" />
                {rating}
              </span>

              <span className="text-slate-500">
                ({reviewsCount} reviews)
              </span>

              <span className="text-slate-500">
                · {yearsInBusiness} years in business
              </span>
            </div>
           
            {address && (
              <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5722]" />
                <span>{address}</span>
              </div>
            )}

            {(d.latitude && d.longitude) || plusCode ? (
              <a
                href={
                  d.latitude && d.longitude
                    ? `https://www.google.com/maps/search/?api=1&query=${d.latitude},${d.longitude}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        plusCode
                      )}`
                }
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0A192F] transition hover:border-[#FF5722]/40 hover:text-[#FF5722]"
              >
                <MapPin className="h-3.5 w-3.5 text-[#FF5722]" />
                View exact location
                {plusCode && !d.latitude && !d.longitude
                  ? ` · ${plusCode}`
                  : ""}
              </a>
            ) : null}

            {/* Dealer Shop Photo */}
            {d.cover_image && (
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <img
                  src={d.cover_image}
                  alt={`${dealerName} shop`}
                  className="h-64 w-full object-cover md:h-72"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Dealer Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {d.verified && (
                <Badge
                  tone="emerald"
                  icon={<ShieldCheck className="w-3 h-3" />}
                >
                  GST Verified
                </Badge>
              )}

              {d.delivery && (
                <Badge
                  tone="navy"
                  icon={<Truck className="w-3 h-3" />}
                >
                  Home delivery
                </Badge>
              )}

              {d.gst_registered && (
                <Badge tone="navy">
                  GSTIN registered
                </Badge>
              )}

              {d.whatsapp && (
                <Badge tone="navy">
                  WhatsApp
                </Badge>
              )}
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-[#0A192F] text-white rounded-lg p-6 relative overflow-hidden">
            <div className="sahi-noise" />

            <div className="relative">
              <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722]">
                Contact
              </div>

              <div className="mt-2 font-mono text-2xl">
                {phone || "Phone not available"}
              </div>

              <div className="mt-4 flex gap-2">
                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    data-testid="dealer-call-btn"
                    className="flex-1 bg-[#FF5722] hover:bg-[#e64a1c] text-white font-semibold px-4 py-3 rounded-md inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                ) : (
                  <div
                    className="flex-1 bg-white/10 text-white/50 font-semibold px-4 py-3 rounded-md inline-flex items-center justify-center gap-2 cursor-not-allowed"
                    title="Phone number not available"
                  >
                    <Phone className="w-4 h-4" />
                    Call unavailable
                  </div>
                )}

                {phone ? (
                  <a
                    href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="dealer-whatsapp-btn"
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-md inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                ) : (
                  <div
                    className="flex-1 bg-white/5 text-white/40 font-semibold px-4 py-3 rounded-md inline-flex items-center justify-center gap-2 cursor-not-allowed"
                    title="WhatsApp number not available"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp unavailable
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dealer Prices */}
        <h2 className="text-2xl font-bold text-[#0A192F] mb-4">
          Live prices at this dealer
        </h2>

        <div
          className="border border-slate-200 rounded-lg overflow-hidden"
          data-testid="dealer-prices-table"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-mono tracking-widest text-slate-500">
            <div>Material</div>

            <div className="text-right">
              Price
            </div>

            <div className="text-right">
              Unit
            </div>

            <div className="text-center">
              Stock
            </div>
          </div>

          {/* Price Rows */}
          {Array.isArray(d.prices) && d.prices.length > 0 ? (
            d.prices.map((p, i) => (
              <Link
                key={p.material_slug || i}
                to={`/materials/${p.material_slug}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-4 border-b border-slate-100 items-center hover:bg-slate-50/60"
              >
                <div className="font-semibold text-[#0A192F]">
                  {p.material_name || "Material"}
                </div>

                <div className="text-right font-mono font-bold text-[#0A192F]">
                  {p.price !== undefined && p.price !== null
                    ? `₹${p.price}`
                    : "—"}
                </div>

                <div className="text-right text-xs text-slate-500 font-mono">
                  {p.unit || "—"}
                </div>

                <div className="text-center">
                  {p.in_stock ? (
                    <span className="text-[11px] uppercase tracking-widest font-mono text-emerald-700">
                      In stock
                    </span>
                  ) : (
                    <span className="text-[11px] uppercase tracking-widest font-mono text-slate-400">
                      Out
                    </span>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="px-5 py-8 text-center text-sm text-slate-500">
              No live prices available for this dealer.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const Badge = ({ tone, icon, children }) => {
  const cls =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-slate-50 text-[#0A192F] border-slate-200";

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${cls}`}
    >
      {icon}
      {children}
    </span>
  );
};






