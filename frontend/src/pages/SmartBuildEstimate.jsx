import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  BarChart3,
  Users,
  Package,
  ShieldCheck,
  MapPin,
  RefreshCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

const STORAGE_KEY = "sahirate-smartbuild-estimate";

function formatNumber(value, decimals = 2) {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return "—";
  }

  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return "—";
  }

  return `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function prettyLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function materialName(slug) {
  const names = {
    bricks: "ईंट",
    cement: "सीमेंट",
    sand: "बालू",
    steel: "स्टील",
    aggregate: "एग्रीगेट",
  };

  return names[slug] || prettyLabel(slug);
}

function rateLabel(status) {
  const labels = {
    MARKET_AVERAGE: "Market Average",
    MARKET_MIN: "Market Minimum",
    RATE_UNAVAILABLE: "Rate unavailable",
  };

  return labels[status] || prettyLabel(status || "Estimate");
}

const money = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};
function SmartBuildEstimate() {
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);

      if (stored) {
        setEstimate(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Unable to load SmartBuild estimate:", error);
    }
  }, []);

  const quantities = estimate?.quantities || {};
  const materials = estimate?.materials || [];
  const labour = estimate?.labour || [];
  const duration = estimate?.duration || {};
  const cost = estimate?.cost || {};
  const marketPricing = estimate?.market_pricing || {};

  const materialTotal = Number(cost.material_total);
  const hasMaterialTotal = Number.isFinite(materialTotal);
  const hasGrandTotal =
    cost.grand_total != null && Number.isFinite(Number(cost.grand_total));

  const totalMarketObservations = Object.values(marketPricing).reduce(
    (sum, item) => sum + Number(item?.dealer_observations || 0),
    0
  );

  const verifiedObservations = Object.values(marketPricing).reduce(
    (sum, item) => sum + Number(item?.verified_observations || 0),
    0
  );

  const labourTotal = Number(cost.labour_total);
  const hasLabourRate = Number.isFinite(labourTotal) && labourTotal > 0;
  const marketCoverageLabel =
    verifiedObservations > 0
      ? "Verified market view"
      : totalMarketObservations > 0
        ? "Dealer market view"
        : "Limited market data";

  const decisionHeadline = hasGrandTotal
    ? "Ready for rate comparison"
    : hasLabourRate
      ? "Material estimate ready"
      : "काम तय करने से पहले, श्रम दर (Labo Rate) की सही जानकारी अवश्य सुनिश्चित करें।";

  const decisionSubline = hasGrandTotal
    ? "Compare the estimate against current dealer quotes before purchase."
    : "सामग्री की मौजूदा बाज़ार दर के साथ-साथ, अंतिम बजट तय करने से पहले श्रम की वास्तविक दर की भी पुष्टि जरूर करें।";

  if (!estimate) {
    return (
      <>
        <SEO
          title="SmartBuild Estimate | SahiRate"
          description="View your SahiRate SmartBuild construction estimate."
          path="/smartbuild/estimate"
        />

        
<main className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={() => navigate("/smartbuild")}
              className="inline-flex items-center gap-2 font-bold text-white transition hover:text-orange-600"
            >
              <ArrowLeft size={18} />
              SmartBuild पर वापस जाएँ
            </button>

            <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(7,26,51,0.08)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
                <FileText className="text-orange-500" size={34} />
              </div>

              <h1 className="mt-5 text-2xl font-black text-[#071A33]">
                Estimate उपलब्ध नहीं है
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
                पहले SmartBuild में calculation करके estimate तैयार करें।
              </p>

              <button
                type="button"
                onClick={() => navigate("/smartbuild")}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 font-black text-[#071A33] shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Get Estimate
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title="SmartBuild Estimate | SahiRate"
        description="Detailed SahiRate SmartBuild construction estimate with quantities, materials, labour, duration and local market context."
        path="/smartbuild/estimate"
      />

      
<main className="smartbuild-light min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f8fc_42%,#eef3f9_100%)] px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => navigate("/smartbuild")}
            className="inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-orange-600"
          >
            <ArrowLeft size={18} />
            SmartBuild पर वापस जाएँ
          </button>

          {/* Hero */}
          <section className="sahirate-dark-hero relative mt-5 overflow-hidden rounded-[32px] bg-[#071A33] shadow-[0_28px_80px_rgba(7,26,51,0.18)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.55) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2 text-xs font-black text-emerald-300">
                  <CheckCircle2 size={15} />
                  Estimate तैयार है
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black leading-[1.08] tracking-tight text-[#071A33] drop-shadow-[0_3px_18px_rgba(0,0,0,0.25)] sm:text-5xl">
                    {estimate.rule || "SmartBuild Estimate"}
                  </h1>

                  <span className="rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-orange-300">
                    {estimate.rule_status || "PRELIMINARY"}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  SahiRate SmartBuild ने आपकी requirement के आधार पर quantity,
                  labour और local market context तैयार किया है।
                </p>

                <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
                  <span className="rounded-xl bg-white/5 px-3 py-2">
                    Rule {estimate.rule_version || "—"}
                  </span>
                  <span className="rounded-xl bg-white/5 px-3 py-2">
                    Preliminary calculation
                  </span>
                  <span className="rounded-xl bg-white/5 px-3 py-2">
                    Local market context
                  </span>
                </div>
              </div>

              <div className="flex min-h-[300px] min-w-[250px] flex-col justify-between rounded-[28px] border border-white/15 bg-white/[0.08] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Estimated Material Cost
                </p>

                <p className="mt-4 text-4xl font-black tracking-tight text-[#071A33] sm:text-5xl lg:text-[3.2rem] !text-white">
                  {hasMaterialTotal ? formatCurrency(materialTotal) : "—"}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Based on available market rates
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-orange-300 !text-orange-300">
                  <BarChart3 size={17} />
                  {totalMarketObservations || 0} dealer observations
                </div>
              </div>
            </div>
          </section>

          {/* Quick stats */}
          <section className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Work Volume
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Package size={19} />
                </span>
              </div>

              <p className="mt-4 text-3xl font-black text-[#071A33]">
                {formatNumber(quantities.wall_volume_m3)} m³
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-400">
                {formatNumber(quantities.wall_volume_cft)} CFT work volume
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Labour Duration
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Clock3 size={19} />
                </span>
              </div>

              <p className="mt-4 text-3xl font-black text-[#071A33]">
                {formatNumber(duration.estimated_days)} days
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-400">
                Preliminary working estimate
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Market Confidence
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={19} />
                </span>
              </div>

              <p className="mt-4 text-3xl font-black text-[#071A33]">
                {verifiedObservations || 0}
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-400">
                verified market observations
              </p>
            </div>
          </section>

          {/* Materials + Labour */}
          <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">
                    Quantity Plan
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-[#071A33]">
                    Material Estimate
                  </h2>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-500">
                  {materials.length} items
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {materials.map((item, index) => {
                  const market = marketPricing[item.slug] || {};
                  const amount = Number(item.amount);

                  return (
                    <div
                      key={`${item.slug || item.unit}-${index}`}
                      className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 transition hover:border-orange-100 hover:bg-orange-50/40"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                              <Package size={17} />
                            </span>
                            <div>
                              <p className="font-black text-[#071A33]">
                                {materialName(item.slug)}
                              </p>
                              <p className="text-xs font-semibold text-slate-400">
                                {rateLabel(item.status)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xl font-black text-[#071A33]">
                            {formatNumber(item.quantity)}{" "}
                            <span className="text-sm text-slate-400">
                              {item.unit}
                            </span>
                          </p>
                          {Number.isFinite(amount) && amount > 0 && (
                            <p className="mt-1 text-xs font-bold text-emerald-600">
                              {formatCurrency(amount)}
                            </p>
                          )}
                        </div>
                      </div>

                      {market.market_avg != null && (
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-500">
                          <span>
                            Avg {formatCurrency(market.market_avg)}
                          </span>
                          <span>
                            Range {formatCurrency(market.market_min)}–{formatCurrency(market.market_max)}
                          </span>
                          {market.lowest_listed_dealer && (
                            <span className="inline-flex items-center gap-1 text-slate-600">
                              <MapPin size={12} />
                              Lowest: {market.lowest_listed_dealer}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">
                  Crew Plan
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#071A33]">
                  Labour Estimate
                </h2>
              </div>

              <div className="mt-6 space-y-3">
                {labour.map((item, index) => (
                  <div
                    key={`${item.role}-${index}`}
                    className="rounded-2xl bg-[#f8fafc] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                          <Users size={18} />
                        </span>
                        <div>
                          <p className="font-black capitalize text-[#071A33]">
                            {item.role}
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-slate-400">
                            {item.count || 0} worker(s)
                          </p>
                        </div>
                      </div>

                      <p className="text-right text-lg font-black text-[#071A33]">
                        {formatNumber(item.person_days)}
                        <span className="block text-[11px] font-bold text-slate-400">
                          person-days
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-orange-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                    <Clock3 size={18} />
                  </span>
                  <div>
                    <p className="text-lg font-black text-[#071A33]">
                      {formatNumber(duration.estimated_days)} working days
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      Preliminary productivity basis. Actual site duration can vary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost */}
          <section className="mt-5 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(7,26,51,0.06)]">
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#071A33] to-[#0b2748] p-5 text-[#071A33] sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
                    Procurement Intelligence
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-[#071A33]">
                    What to buy & what to watch
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    Required quantity को current local market signals के साथ देखें।
                    Final purchase से पहले dealer quote, delivery और applicable taxes verify करें।
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-wider !text-slate-300" style={{color:"#cbd5e1",opacity:1}}>Estimate basis
                  </p>
                  <p className="mt-1 text-sm font-black !text-white" style={{color:"#ffffff",opacity:1}}>{totalMarketObservations} market observations
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {materials.map((item, index) => {
                const market = marketPricing[item.slug] || {};
                const avg = Number(market.market_avg);
                const low = Number(market.lowest_listed_rate);
                const quantity = Number(item.quantity);
                const hasAvg = Number.isFinite(avg) && avg > 0;
                const hasLow = Number.isFinite(low) && low > 0;
                const estimatedSpend =
                  hasAvg && Number.isFinite(quantity) ? quantity * avg : null;

                const buyingSignal =
                  hasAvg && hasLow
                    ? low <= avg * 0.97
                      ? "Good opportunity"
                      : "Fair market"
                    : "Rate check required";

                return (
                  <div key={`procurement-${item.slug}-${index}`} className="p-5 sm:p-6">
                    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr_auto] lg:items-center">
                      <div className="flex items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                          <Package size={19} />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-black text-[#071A33]">
                              {materialName(item.slug)}
                            </h3>
                            {market.lowest_listed_verified && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">
                                <ShieldCheck size={11} />
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm font-semibold text-slate-400">
                            Required:{" "}
                            <strong className="text-white">
                              {item.quantity} {item.unit}
                            </strong>
                          </p>
                          {market.lowest_listed_dealer && (
                            <p className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-slate-500">
                              <MapPin size={13} className="mt-0.5 shrink-0 text-orange-500" />
                              Lowest listed at{" "}
                              <strong className="text-white">
                                {market.lowest_listed_dealer}
                              </strong>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Average
                          </p>
                          <p className="mt-1 text-sm font-black text-[#071A33]">
                            {hasAvg ? money(avg) : "—"}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-emerald-50 p-3">
                          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                            Lowest
                          </p>
                          <p className="mt-1 text-sm font-black text-emerald-700">
                            {hasLow ? money(low) : "—"}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-orange-50 p-3">
                          <p className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                            Est. Spend
                          </p>
                          <p className="mt-1 text-sm font-black text-[#071A33]">
                            {estimatedSpend != null ? money(estimatedSpend) : "—"}
                          </p>
                        </div>
                      </div>

                      <div className="lg:text-right">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-black ${
                            buyingSignal === "Good opportunity"
                              ? "bg-emerald-50 text-emerald-700"
                              : buyingSignal === "Fair market"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {buyingSignal}
                        </span>
                        <p className="mt-2 text-[11px] font-semibold text-slate-400">
                          Compare quote before purchase
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-2 text-xs font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Market prices are reference signals, not guaranteed transaction quotes.
                </span>
                <span className="font-black text-[#071A33]">
                  Verify quantity · GST · transport · delivery
                </span>
              </div>
            </div>
          </section>

          <section className="mt-5 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">
                Cost Snapshot
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#071A33]">
                Estimated Project Cost
              </h2>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">
              <div className="rounded-[22px] bg-slate-50 p-5 shadow-[0_8px_24px_rgba(7,26,51,0.035)]">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Materials
                </p>
                <p className="mt-2 text-2xl font-black text-[#071A33]">
                  {formatCurrency(cost.material_total)}
                </p>
              </div>

              <div className="rounded-[22px] bg-slate-50 p-5 shadow-[0_8px_24px_rgba(7,26,51,0.035)]">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Labour
                </p>
                <p className="mt-2 text-2xl font-black text-[#071A33]">
                  {formatCurrency(cost.labour_total)}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  Rate data currently unavailable
                </p>
              </div>

              <div className="rounded-2xl bg-[#071A33] p-5 text-[#071A33]">
                <p className="text-xs font-black uppercase tracking-wider text-orange-300">
                  Estimated Total
                </p>
                <p className="mt-2 text-2xl font-black">
                  {hasGrandTotal
                    ? formatCurrency(cost.grand_total)
                    : "Labour rate not available"}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {hasGrandTotal
                    ? "Based on currently available rates"
                    : "सामग्री की लागत उपलब्ध है। श्रम दर की पुष्टि के बाद कुल लागत का बेहतर अनुमान मिल सकेगा।"}
                </p>
              </div>
            </div>
          </section>

          {/* Market intelligence */}
          {Object.keys(marketPricing).length > 0 && (
            <section className="mt-5 rounded-[30px] border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">
                    SahiRate Market Intelligence
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-[#071A33]">
                    Local market context
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Calculation के साथ available dealer observations और
                    listed market rates भी देखें।
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-black text-slate-500">
                  <BarChart3 size={15} className="text-orange-500" />
                  {totalMarketObservations} observations · {verifiedObservations} verified
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {Object.entries(marketPricing).map(([slug, market]) => (
                  <div
                    key={slug}
                    className="rounded-[22px] border border-white bg-white p-5 shadow-[0_10px_28px_rgba(7,26,51,0.06)] transition duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-[#071A33]">
                        {materialName(slug)}
                      </p>
                      {market.lowest_listed_verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-600">
                          <ShieldCheck size={11} />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xl font-black text-[#071A33]">
                      {formatCurrency(market.market_avg)}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {market.market_unit || "Market average"}
                    </p>

                    <div className="mt-3 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                      <div className="flex justify-between gap-3">
                        <span>Market range</span>
                        <span className="font-black text-white">
                          {formatCurrency(market.market_min)} – {formatCurrency(market.market_max)}
                        </span>
                      </div>
                      {market.lowest_listed_dealer && (
                        <div className="mt-2 flex items-start gap-1.5">
                          <MapPin size={13} className="mt-0.5 shrink-0 text-orange-500" />
                          <span>
                            Lowest listed:{" "}
                            <strong className="text-white">
                              {market.lowest_listed_dealer}
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Decision intelligence */}
          <section className="mt-5 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(7,26,51,0.06)]">
            <div className="border-b border-slate-100 bg-gradient-to-r from-white to-orange-50/60 px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">
                    SahiRate Decision Layer
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-[#071A33]">
                    इस इस्टीमेट से आपको क्या पता चलता है। 
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    सही खरीदारी का निर्णय लेने से पहले, इस अनुमान के इन महत्वपूर्ण पहलुओं को जरूर देखें।
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                  <CheckCircle2 size={14} />
                  {marketCoverageLabel}
                </span>
              </div>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">
              <div className="rounded-[22px] border border-slate-100 bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Market coverage
                </p>
                <p className="mt-2 text-2xl font-black text-[#071A33]">
                  {totalMarketObservations || 0}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  dealer observations · {verifiedObservations || 0} verified
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-100 bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Cost visibility
                </p>
                <p className="mt-2 text-2xl font-black text-[#071A33]">
                  {hasGrandTotal ? "Complete" : "Partial"}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {hasGrandTotal
                    ? "material + labour pricing available"
                    : "👉 सामग्री की दर उपलब्ध है · श्रम दर की पुष्टि बाकी है"}
                </p>
              </div>

              <div className="rounded-[22px] border border-orange-100 bg-orange-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-500">
                  Next best action
                </p>
                <p className="mt-2 text-lg font-black text-[#071A33]">
                  {decisionHeadline}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                  {decisionSubline}
                </p>
              </div>
            </div>

            <div className="mx-5 mb-5 flex flex-col gap-3 rounded-[22px] border border-slate-200 bg-[#071A33] p-4 text-[#071A33] sm:mx-7 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black">Kharidari se pehle dhyan rakhein</p>
                <p className="mt-1 text-xs font-medium text-slate-300">
                  Market average ko single truth na मानें — range, dealer और verification साथ देखें।
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/smartbuild")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-black text-[#071A33] transition hover:bg-orange-600"
              >
                Estimate फिर से देखें
                <ArrowLeft className="rotate-180" size={16} />
              </button>
            </div>
          </section>

          {/* Transparency */}
          <section className="mt-5 rounded-[30px] border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-5 shadow-[0_12px_34px_rgba(7,26,51,0.045)] sm:p-7">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                <ShieldCheck size={19} />
              </span>

              <div>
                <h2 className="font-black text-[#071A33]">
                  यह अनुमान कैसे तैयार हुआ? - आइए, आसान भाषा में समझते हैं। 
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  यह Estimate Preliminary Calculation Rules पर आधारित है।
                  इसे Final Structural Design, BOQ - Bill of Quantities, Tender Quantity या Statutory
                  Approval का Substitute नहीं माना जाना चाहिए।
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Calculation
                </p>
                <p className="mt-1 font-black text-white">
                  {estimate.rule_status === "PRELIMINARY"
                    ? "Preliminary"
                    : prettyLabel(estimate.rule_status || "Preliminary")}
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Reference
                </p>
                <p className="mt-1 font-black text-white">
                  {estimate.reference_status === "PENDING_VERIFICATION"
                    ? "Verification pending"
                    : prettyLabel(estimate.reference_status || "Pending")}
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Rule Version
                </p>
                <p className="mt-1 font-black text-white">
                  {estimate.rule_version || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-3 pb-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/smartbuild")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-black text-white shadow-sm transition hover:border-orange-200 hover:text-orange-600"
            >
              <RefreshCcw size={17} />
              Estimate फिर से बनाएँ
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default SmartBuildEstimate;



























