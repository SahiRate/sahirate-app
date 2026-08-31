import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { calculateSmartBuild } from "@/lib/api";
import plasteringIcon from "../assets/smartbuild/plastering.png";
import foundationIcon from "../assets/smartbuild/foundation.png";
import {
  ArrowRight,
  BrickWall,
  Package,
  Waves,
  Mountain,
  Dumbbell,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock3,
  HardHat,
  Info,
  Layers3,
  RotateCcw,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

const CALCULATOR_OPTIONS = [
  { value: "brick_wall", label: "ईंट की दीवार", short: "Brick Wall", description: "ईंट, सीमेंट, बालू, मिस्त्री और समय का प्रारंभिक अनुमान।" },
  { value: "rcc_slab", label: "RCC छत / Slab", short: "RCC Slab", description: "सीमेंट, बालू, गिट्टी, TMT, labour और समय का अनुमान।" },
  { value: "pcc", label: "PCC", short: "PCC", description: "PCC के लिए सीमेंट, बालू, गिट्टी और labour का अनुमान।" },
  { value: "plaster", label: "प्लास्टर", short: "Plaster", description: "प्लास्टर के लिए सीमेंट, बालू, labour और समय का अनुमान।" },
  { value: "foundation", label: "Foundation", short: "Foundation", description: "Foundation के लिए प्रारंभिक material, labour और समय का अनुमान।" },
];

const FIELD_CONFIG = {
  brick_wall: [
    { name: "length", label: "लंबाई", unit: "ft", type: "number" },
    { name: "height", label: "ऊंचाई", unit: "ft", type: "number" },
    {
      name: "thickness",
      label: "दीवार की मोटाई",
      type: "select",
      options: [
        { label: "4.5 inch (आधी ईंट)", value: "0.375" },
        { label: "9 inch (एक ईंट)", value: "0.75" },
        { label: "13.5 inch (डेढ़ ईंट)", value: "1.125" },
      ],
    },
    { name: "brick_grade", label: "ईंट की क्वालिटी(गुणवत्ता)", type: "select", options: [
      { label: "A Grade (1 Number)", value: "A" },
      { label: "B Grade (2 Number)", value: "B" },
      { label: "C Grade (3 Number)", value: "C" },
    ] },
  ],
  rcc_slab: [
    { name: "length", label: "लंबाई", unit: "ft", type: "number" },
    { name: "width", label: "चौड़ाई", unit: "ft", type: "number" },
    { name: "thickness", label: "Slab की मोटाई", type: "select", options: [
      { label: "4 inch", value: "0.333333" },
      { label: "5 inch", value: "0.416667" },
      { label: "6 inch", value: "0.5" },
      { label: "8 inch", value: "0.666667" },
    ] },
    { name: "aggregate_size", label: "गिट्टी का size", type: "select", options: ["10mm", "12.5mm", "16mm", "20mm", "40mm"] },
  ],
  pcc: [
    { name: "length", label: "लंबाई", unit: "ft", type: "number" },
    { name: "width", label: "चौड़ाई", unit: "ft", type: "number" },
    { name: "thickness", label: "PCC की मोटाई", type: "select", options: [
      { label: "4 inch", value: "0.333333" },
      { label: "6 inch", value: "0.5" },
      { label: "9 inch", value: "0.75" },
    ] },
    { name: "aggregate_size", label: "गिट्टी का size", type: "select", options: ["10mm", "12.5mm", "16mm", "20mm", "40mm"] },
  ],
  plaster: [
    { name: "area", label: "कुल area", unit: "sq ft", type: "number" },
    { name: "application", label: "कहाँ का प्लास्टर?", type: "select", options: [
      { label: "अंदर की दीवार", value: "internal" },
      { label: "बाहर की दीवार", value: "external" },
    ] },
    { name: "thickness_mm", label: "प्लास्टर की मोटाई", type: "select", options: [
      { label: "12 mm (सामान्य)", value: "12" },
      { label: "15 mm", value: "15" },
      { label: "18 mm", value: "18" },
    ] },
    { name: "mortar_ratio", label: "मसाला ratio", type: "select", options: ["1:4", "1:5", "1:6"] },
  ],
  foundation: [
    { name: "foundation_type", label: "Foundation type", type: "select", options: [{ label: "Footing", value: "footing" }] },
    { name: "length", label: "लंबाई", unit: "ft", type: "number" },
    { name: "width", label: "चौड़ाई", unit: "ft", type: "number" },
    { name: "thickness", label: "गहराई / मोटाई", type: "select", options: [
      { label: "12 inch", value: "1" },
      { label: "18 inch", value: "1.5" },
      { label: "24 inch", value: "2" },
    ] },
    { name: "aggregate_size", label: "गिट्टी का size", type: "select", options: ["10mm", "12.5mm", "16mm", "20mm", "40mm"] },
  ],
};

const DEFAULT_VALUES = {
  brick_wall: { length: "20", height: "10", thickness: "0.75", brick_grade: "A" },
  rcc_slab: { length: "20", width: "15", thickness: "0.5", aggregate_size: "20mm" },
  pcc: { length: "20", width: "10", thickness: "0.5", aggregate_size: "40mm" },
  plaster: { area: "1000", application: "internal", thickness_mm: "12", mortar_ratio: "1:6" },
  foundation: { foundation_type: "footing", length: "6", width: "6", thickness: "1.5", aggregate_size: "20mm" },
};

// Local, customer-friendly purchase assumptions.
// Exact calculation remains visible for transparency.
const SAND_CFT_PER_TRACTOR = 15;
const AGGREGATE_CFT_PER_TRACTOR = 15;

function formatNumber(value, decimals = 2) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function practicalUnit(slug, quantity) {
  const n = Number(quantity) || 0;
  if (slug === "sand") {
    return {
      value: Math.ceil(n / SAND_CFT_PER_TRACTOR),
      unit: "ट्रैक्टर",
      note: `लगभग 1 ट्रैक्टर = ${SAND_CFT_PER_TRACTOR} CFT (स्थानीय माप के हिसाब से थोड़ा फर्क हो सकता है)`,
    };
  }
  if (slug === "aggregate") {
    return {
      value: Math.ceil(n / AGGREGATE_CFT_PER_TRACTOR),
      unit: "ट्रैक्टर",
      note: `लगभग 1 ट्रैक्टर = ${AGGREGATE_CFT_PER_TRACTOR} CFT (स्थानीय भराई के अनुसार बदल सकता है)`,
    };
  }
  return null;
}

function optionLabel(field, value) {
  const option = field.options?.find((item) => (typeof item === "object" ? item.value : item) === value);
  return typeof option === "object" ? option.label : option ?? value;
}

function roundPurchase(slug, quantity) {
  const n = Number(quantity) || 0;
  if (slug === "bricks") return Math.ceil(n / 100) * 100;
  if (slug === "cement") return Math.ceil(n);
  if (slug === "sand" || slug === "aggregate") return Math.ceil(n / 5) * 5;
  if (slug === "tmt-steel" || slug === "tmt") return Math.ceil(n / 5) * 5;
  return Math.ceil(n * 100) / 100;
}

function materialName(slug) {
  return {
    bricks: "ईंट",
    cement: "सीमेंट",
    sand: "बालू (Sand)",
    aggregate: "गिट्टी (Aggregate)",
    "tmt-steel": "TMT Steel",
    tmt: "TMT Steel",
  }[slug] || slug;
}

function materialIcon(slug) {
  return {
    bricks: BrickWall,
    cement: Package,
    sand: Waves,
    aggregate: Mountain,
    "tmt-steel": Dumbbell,
    tmt: Dumbbell,
  }[slug] || Package;
}

function unitLabel(unit) {
  return {
    piece: "पीस",
    bag: "बैग",
    cft: "CFT (घन फीट)",
    kg: "किलो",
    tonne: "टन",
  }[unit] || unit;
}

function SmartBuild() {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("brick_wall");
  const [values, setValues] = useState(DEFAULT_VALUES.brick_wall);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  const selectedCalculator = useMemo(() => CALCULATOR_OPTIONS.find((item) => item.value === purpose), [purpose]);
  const fields = FIELD_CONFIG[purpose];

  const handlePurposeChange = (event) => {
    const next = event.target.value;
    setPurpose(next);
    setValues(DEFAULT_VALUES[next]);
    setResult(null);
    setError("");
    setDetailsOpen(false);
  };

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    setResult(null);
    setError("");
  };

  const handleCalculate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const inputs = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number.isFinite(Number(value)) && value !== "" ? Number(value) : value]));
      const data = await calculateSmartBuild(purpose, inputs);

      sessionStorage.setItem(
        "sahirate-smartbuild-estimate",
        JSON.stringify(data)
      );
      navigate("/smartbuild/estimate");

      setResult(data);
      setDetailsOpen(false);
    } catch (err) {
      console.error("SmartBuild calculation failed:", err);
      setError(err?.response?.data?.detail || err?.message || "Calculation failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const dimensions = fields.map((field) => `${field.name === "thickness" ? optionLabel(field, values[field.name]) : `${values[field.name]} ${field.unit || ""}`}`).join(" × ");

  return (
    <>
<SEO
  title="Construction Cost Calculator | SmartBuild by SahiRate"
  description="Estimate construction material quantities, labour requirements, duration and project cost with SahiRate SmartBuild."
  keywords="construction cost calculator, building material calculator, construction estimate calculator, material quantity calculator, construction cost Deoghar, SmartBuild SahiRate"
  path="/smartbuild"
/>

      <main className="min-h-screen bg-[#F4F7FB] text-[#071A33]">
        {/* HERO — fixed two-column composition to keep the page visually balanced */}
        <section className="relative overflow-hidden bg-[#071A33] text-white">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute right-[12%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/5" />
            <div className="absolute right-[15%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/5" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-10 sm:py-12 lg:px-10 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-300">
                  <Sparkles size={16} /> SahiRate SmartBuild
                </div>

                <h1 className="!text-white mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-[4.4rem]">
                  Construction ka estimate{" "}
                  <span className="text-orange-400">ab simple.</span>
                </h1>

                <p className="!text-slate-200 mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-200 sm:text-lg">
                  कितना सामान लगेगा, कितने मिस्त्री चाहिए और काम में लगभग कितना
                  समय लगेगा — अब आसान भाषा में एक ही जगह समझिए।
                </p>
              </div>

              {/* Visual balance panel — CSS only, no generated/external image */}
              <div className="hidden lg:block">
                <div className="relative mx-auto max-w-md rounded-[30px] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur">
                  <div className="absolute -right-3 -top-3 rounded-full bg-orange-500 px-4 py-2 text-xs font-black shadow-lg">
                    Smart Estimate
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#102541] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          आज का अनुमान
                        </p>
                        <p className="mt-1 text-2xl font-black">ईंट की दीवार</p>
                      </div>
                      <Calculator className="text-orange-400" size={28} />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {[
                        ["ईंट", "4,500+", "पीस"],
                        ["सीमेंट", "7", "बैग"],
                        ["बालू", "3", "ट्रैक्टर"],
                      ].map(([title, value, unit]) => (
                        <div key={title} className="rounded-2xl bg-white/[0.06] p-3">
                          <p className="text-xs font-bold text-slate-400">{title}</p>
                          <p className="mt-2 text-xl font-black text-white">{value}</p>
                          <p className="text-[11px] font-semibold text-slate-400">{unit}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-2xl bg-orange-500/10 px-4 py-3">
                      <span className="text-sm font-bold text-slate-200">समय</span>
                      <span className="font-black text-orange-300">लगभग 1 दिन</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Layers3, title: "सामान", text: "कितना सामान चाहिए" },
                { icon: Users, title: "श्रमिक", text: "मिस्त्री + हेल्पर" },
                { icon: Clock3, title: "समय", text: "लगभग कितने दिन" },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur"
                >
                  <Icon className="text-orange-400" size={22} />
                  <p className="mt-3 font-extrabold">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-7 sm:px-5 sm:py-9 lg:px-10 lg:py-10">
          <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
            {/* STEP 1 */}
            <aside className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(7,26,51,0.08)] lg:sticky lg:top-24">
              <div className="flex items-center gap-3 px-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Calculator size={21} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Step 1
                  </p>
                  <h2 className="text-xl font-black">क्या बनाना है?</h2>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {CALCULATOR_OPTIONS.map((option) => {
                  const active = option.value === purpose;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handlePurposeChange({ target: { value: option.value } })}
                      className={`w-full rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-orange-400 bg-orange-50 shadow-[0_8px_24px_rgba(249,115,22,0.10)]"
                          : "border-slate-200 bg-white hover:border-orange-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          {option.value === "brick_wall"
                            ? "🧱"
                            : option.value === "rcc_slab"
                              ? "🏗️"
                              : option.value === "pcc"
                                ? "🧱"
                                : option.value === "plaster"
                                  ? <img src={plasteringIcon} alt="" className="h-8 w-8 object-contain" />
                                  : <img src={foundationIcon} alt="" className="h-8 w-8 object-contain" />}
                        </span>
                        <div className="min-w-0">
                          <p className={`font-black ${active ? "text-[#071A33]" : "text-slate-800"}`}>
                            {option.label}
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-slate-500">
                            {option.short}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl bg-[#071A33] p-4 text-white">
                <p className="font-black">{selectedCalculator.label}</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-300">
                  {selectedCalculator.description}
                </p>
              </div>

              <div className="mt-3 rounded-2xl border border-orange-200 bg-orange-50 p-3.5 text-xs leading-5 text-orange-900">
                <div className="flex gap-2">
                  <Info className="mt-0.5 shrink-0" size={16} />
                  <p>
                    <strong>प्रारंभिक अनुमान:</strong> खरीदने से पहले वास्तविक
                    आवश्यकता की पुष्टि करें।
                  </p>
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-5">
              {/* STEP 2 */}
              <form
                onSubmit={handleCalculate}
                className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(7,26,51,0.08)] sm:p-7"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-500">
                      Step 2
                    </p>
                    <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                      कृपया अपनी जानकारी भरें
                    </h2>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">
                    जानकारी भरें → निर्माण के लिए Material Estimate प्राप्त करें
                  </p>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-2 block text-sm font-extrabold text-[#071A33]">
                        {field.label}
                      </span>

                      <div className="relative">
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            value={values[field.name]}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-11 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                          >
                            {field.options.map((option) => {
                              const value =
                                typeof option === "object" ? option.value : option;
                              const label =
                                typeof option === "object" ? option.label : option;
                              return (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <input
                            required
                            name={field.name}
                            type="number"
                            min="0"
                            step="any"
                            value={values[field.name]}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-16 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                          />
                        )}

                        {field.type === "select" ? (
                          <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                          />
                        ) : field.unit ? (
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                            {field.unit}
                          </span>
                        ) : null}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-base font-black text-white shadow-[0_14px_30px_rgba(249,115,22,0.28)] transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70"
                  >
                    {loading ? (
                      "अनुमान तैयार हो रहा है…"
                    ) : (
                      <>
                        <Calculator size={19} />
                        Build My Estimate
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setValues(DEFAULT_VALUES[purpose]);
                      setResult(null);
                      setError("");
                      setDetailsOpen(false);
                    }}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <RotateCcw size={17} /> फिर से भरें
                  </button>
                </div>
              </form>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
                  <p className="font-black">अनुमान नहीं बन पाया</p>
                  <p className="mt-1 text-sm">{error}</p>
                </div>
              )}

              {result && (
                <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(7,26,51,0.12)]">
                  <div className="relative overflow-hidden bg-[#071A33] p-6 text-white sm:p-8">
                    <div className="absolute right-[-90px] top-[-110px] h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
                    <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300"><CheckCircle2 size={17} /> आपका प्रारंभिक अनुमान तैयार है</div>
                        <h2 className="mt-3 text-3xl font-black sm:text-4xl">{selectedCalculator.label}</h2>
                        <p className="mt-2 text-slate-300">आपकी दी हुई जानकारी: {dimensions}</p>
                      </div>
                      <span className="rounded-full border border-orange-400/50 bg-orange-500/10 px-4 py-2 text-xs font-black text-orange-300">प्रारंभिक अनुमान</span>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">
                    <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                      <Layers3 className="text-orange-500" size={22} strokeWidth={2} />
                      <p className="mt-3 text-sm font-semibold text-slate-500">सामग्री</p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#071A33]">{result.materials?.length || 0} चीज़ें</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-400">ईंट · सीमेंट · बालू</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                      <Users className="text-orange-500" size={22} strokeWidth={2} />
                      <p className="mt-3 text-sm font-semibold text-slate-500">श्रमिक</p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#071A33]">{result.labour?.length || 0} प्रकार</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-400">मिस्त्री · हेल्पर</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                      <Clock3 className="text-orange-500" size={22} strokeWidth={2} />
                      <p className="mt-3 text-sm font-semibold text-slate-500">समय</p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#071A33]">लगभग {result.duration?.estimated_days ?? "—"} दिन</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-400">काम पूरा होने का अनुमान</p>
                    </div>
                  </div>

                  <div className="grid gap-5 px-5 pb-6 sm:px-7 sm:pb-8">
                    <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                      <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">Material Requirement</p><h3 className="mt-1 text-2xl font-black">आपको कितना सामान चाहिए?</h3></div><span className="text-sm font-bold text-slate-400"></span></div>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {(result.materials || []).map((item) => {
                          const purchase = roundPurchase(item.slug, item.quantity);
                          const local = practicalUnit(item.slug, item.quantity);
                          const displayValue = local ? local.value : purchase;
                          const displayUnit = local ? local.unit : unitLabel(item.unit);

                          return (
                            <div
                              key={item.slug}
                              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm"
                            >
                              <div className="grid gap-4">
                                <div className="flex min-w-0 items-center gap-3">
                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm ring-1 ring-slate-100">
                                    {(() => {
                                      const Icon = materialIcon(item.slug);
                                      return <Icon size={22} strokeWidth={2.1} />;
                                    })()}
                                  </span>

                                  <div className="min-w-0">
                                    <p className="text-lg font-extrabold leading-tight text-[#071A33]">
                                      {materialName(item.slug)}
                                    </p>
                                    <p className="mt-2 text-sm font-semibold leading-5 text-slate-500">
                                      <span>Calculation:</span><br></br>{" "}
                                      <span className="font-extrabold text-slate-700">
                                        {formatNumber(item.quantity)} {unitLabel(item.unit)}
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                <div className="rounded-xl bg-white px-4 py-3">
                                  <p className="text-xs font-bold text-slate-400">
                                    खरीदने के लिए लगभग
                                  </p>

                                  <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
                                    <span className="text-[29px] font-black leading-none tracking-tight text-[#071A33]">
                                      {displayValue.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-lg font-extrabold leading-none text-[#071A33]">
                                      {displayUnit}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {local && (
                                <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2.5 text-xs font-semibold leading-5 text-orange-900">
                                  {local.note}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 flex gap-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-900"><Info className="mt-0.5 shrink-0" size={16} />ऊपर दी गई “लगभग” मात्रा खरीदारी आसान बनाने के लिए है। हिसाब के अनुसार सटीक मात्रा नीचे विवरण में दी गई है। खरीदने से पहले स्थानीय मिस्त्री या सप्लायर से पुष्टि करें।</div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3 lg:col-span-3">
                      <div className="rounded-2xl border border-slate-200 p-5 sm:p-6"><div className="flex items-center gap-2"><HardHat className="text-orange-500" size={22} /><h3 className="text-xl font-black">श्रमिक की आवश्यकता</h3></div><div className="mt-5 space-y-3">{(result.labour || []).map((item) => <div key={item.role} className="rounded-xl bg-slate-50 p-4"><div className="flex justify-between gap-3"><div><p className="font-black">{item.role === "mason" ? "मिस्त्री" : item.role === "helper" ? "हेल्पर" : item.role}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500"><span>Calculation:</span> <span className="font-extrabold text-slate-600">{formatNumber(item.person_days)} व्यक्ति-दिन</span></p></div><p className="text-xl font-black">{item.count} व्यक्ति</p></div></div>)}</div></div>
                      <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                          <Clock3 className="text-orange-500" size={22} />
                          <h3 className="text-xl font-black">समय</h3>
                        </div>
                        <div className="mt-5 rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-bold text-slate-400">अनुमानित समय</p>
                          <p className="mt-2 text-3xl font-black text-[#071A33]">
                            {result.duration?.estimated_days ?? "—"} दिन
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            काम पूरा होने का अनुमान
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-orange-50 p-5 sm:p-6"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white"><Truck size={21} /></div><div><p className="font-black">आज का खर्च भी जानना चाहते हैं?</p><p className="mt-1 text-sm text-orange-900/70">Local market rate जुड़ने पर cost estimate पूरा होगा।</p></div></div><div className="mt-4 rounded-xl bg-white/70 p-3 text-sm font-bold text-orange-800">खर्च: {result.cost?.status === "RATE_DATA_REQUIRED" ? "रेट अभी उपलब्ध नहीं है" : result.cost?.grand_total}</div>

                      </div>
                    </div>
                  </div>

                  <div className="mx-5 mb-5 grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:mx-7 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => setDetailsOpen((open) => !open)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-[#071A33] shadow-sm hover:bg-slate-100"
                    >
                      <ChevronDown size={17} className={`transition ${detailsOpen ? "rotate-180" : ""}`} />
                      पूरी जानकारी
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-[#071A33] shadow-sm hover:bg-slate-100"
                    >
                      ↓ PDF डाउनलोड करें
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          if (navigator.share) {
                            await navigator.share({
                              title: "SahiRate SmartBuild Estimate",
                              text: `${selectedCalculator.label} — SahiRate SmartBuild`,
                              url: window.location.href,
                            });
                          } else {
                            await navigator.clipboard.writeText(window.location.href);
                            alert("Link copied");
                          }
                        } catch (shareError) {
                          if (shareError?.name !== "AbortError") console.error(shareError);
                        }
                      }}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-orange-600"
                    >
                      ↗ शेयर करें
                    </button>
                  </div>

                  <div className="border-t border-slate-200 bg-slate-50">
                    <button type="button" onClick={() => setDetailsOpen((open) => !open)} className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Detailed Calculation</p><p className="mt-1 font-extrabold">यह अनुमान कैसे निकला?</p></div><ChevronDown className={`transition ${detailsOpen ? "rotate-180" : ""}`} /></button>
                    {detailsOpen && (
                      <div className="border-t border-slate-200 bg-white p-5 sm:p-7">
                        <div className="grid gap-3 sm:grid-cols-3">
                          {Object.entries(result.quantities || {}).map(([key, value]) => {
                          const quantityLabels = {
                            wall_volume_cft: "Wall Volume (CFT)",
                            wall_volume_m3: "Wall Volume (M3)",
                            bricks: "Bricks (PCS)",
                            cement_bags: "Cement (Bags)",
                            sand_cft: "Sand (CFT)",
                            aggregate_cft: "Aggregate (CFT)",
                            tmt_kg: "TMT Steel (KG)",
                            typical_1500_piece_loads: "Typical 1500 Loads (PCS)",
                          };

                          return (
                            <div key={key} className="rounded-xl border border-slate-200 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                {quantityLabels[key] || key.replaceAll("_", " ")}
                              </p>

                              <p className="mt-2 text-xl font-black">
                                {formatNumber(value)}
                              </p>
                            </div>
                          );
                        })}
                        </div>
                        {(result.materials || []).some((item) => item.slug === "sand" || item.slug === "aggregate") && (
                          <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm font-semibold text-orange-900">
                            <strong>ट्रैक्टर का हिसाब:</strong> बालू/गिट्टी के लिए यहाँ लगभग {SAND_CFT_PER_TRACTOR} CFT प्रति ट्रैक्टर का सामान्य अनुमान लिया गया है। वास्तविक मात्रा ट्रैक्टर की भराई और स्थानीय सप्लायर के हिसाब से बदल सकती है।
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SmartBuild;









