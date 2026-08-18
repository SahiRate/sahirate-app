import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Sparkles,
  Search,
  Loader2,
  ArrowRight,
  MapPin,
  Star,
  ShieldCheck,
  Package,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { aiSearch } from "../lib/api";

const SUGGESTIONS = [
  {
    text: "Where can I get the cheapest cement in Deoghar today?",
    label: "Best price",
  },
  {
    text: "Compare TMT steel prices under ₹7000 per quintal",
    label: "Compare prices",
  },
  {
    text: "Which verified dealers offer home delivery for bricks?",
    label: "Find dealers",
  },
  {
    text: "What is the average price of stone chips this week?",
    label: "Market insight",
  },
];

export default function AISearchDialog({ open, onOpenChange }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);
  const requestIdRef = useRef(0);
  useEffect(() => {
  if (open) {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timer);
  }

  requestIdRef.current += 1;
  setQ("");
  setResult(null);
  setError(null);
  setLoading(false);
}, [open]);

  const submit = async (query) => {
  const text = (query ?? q).trim();

  if (!text || loading || !open) return;

  const normalized = text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const requestId = ++requestIdRef.current;

  let instantAnswer = null;

  // ======================================================
  // GREETINGS
  // ======================================================
  if (
    normalized === "hi" ||
    normalized === "hello" ||
    normalized === "hey" ||
    normalized === "how are you" ||
    normalized === "how are you?"
  ) {
    instantAnswer =
      "Hello! I’m SahiAI — your building material intelligence assistant. I can help you check prices, compare dealers and understand the Deoghar construction market.";
  }

  // ======================================================
  // SAHIAI
  // ======================================================
  else if (
    normalized.includes("what is sahiai") ||
    normalized.includes("what is sahi ai") ||
    normalized.includes("who is sahiai") ||
    normalized.includes("who are you")
  ) {
    instantAnswer =
      "SahiAI means Sahi + AI. It is the intelligence assistant of SahiRate, designed to help you understand building-material prices, dealers and local market information using relevant SahiRate data.";
  }

  // ======================================================
  // SAHIRATE
  // ======================================================
  else if (
    normalized.includes("what is sahirate") ||
    normalized.includes("what is sahi rate") ||
    normalized.includes("about sahirate") ||
    normalized.includes("why sahirate")
  ) {
    instantAnswer =
      "SahiRate is India's Building Material Intelligence Platform, starting from Deoghar. It brings material prices, dealer information, comparisons and market insights together so buyers can check the market before they buy. Har Material ka Sahi Rate. Sahi Jankari. Behtar Faisle.";
  }

  // ======================================================
  // DEOGHAR
  // ======================================================
  else if (
    normalized.includes("about deoghar") ||
    normalized.includes("deoghar ke bare") ||
    normalized.includes("deoghar ke baare") ||
    normalized.includes("deoghar ke bare mein") ||
    normalized.includes("deoghar ke baare mein") ||
    normalized.includes("tell me something about deoghar") ||
    normalized.includes("deoghar famous") ||
    normalized.includes("why is deoghar famous") ||
    normalized.includes("baidyanath") ||
    normalized.includes("jyotirlinga") ||
    normalized.includes("baba dham")
  ) {
    instantAnswer =
      "Deoghar is widely known for Baba Baidyanath Dham, one of India's twelve Jyotirlingas. Beyond its religious importance, Deoghar has a growing network of traders, dealers, contractors, builders and construction-related businesses. Its connectivity also connects it with the wider regional market. SahiRate starts from Deoghar to bring greater transparency to the local building-material market.";
  }

  // ======================================================
  // INSTANT RESPONSE
  // ======================================================
  if (instantAnswer) {
    if (!open || requestId !== requestIdRef.current) {
      return;
    }

    setQ(text);
    setError(null);
    setLoading(false);

    setResult({
      query: text,
      answer: instantAnswer,
      ai_powered: false,
      materials: [],
      dealers: [],
      market: null,
      local_response: true,
    });

    return;
  }

  // ======================================================
  // BACKEND SEARCH
  // ======================================================
  setQ(text);
  setLoading(true);
  setError(null);
  setResult(null);

  try {
    const r = await Promise.race([
      aiSearch(text),

      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("SEARCH_TIMEOUT")),
          15000
        )
      ),
    ]);

    if (!open || requestId !== requestIdRef.current) {
      return;
    }

    setResult(r.data);
  } catch (e) {
    if (!open || requestId !== requestIdRef.current) {
      return;
    }

    setError(
      e?.message === "SEARCH_TIMEOUT"
        ? "The search is taking too long. Please try again."
        : e?.response?.data?.detail ||
          "Search failed. Please try again."
    );
  } finally {
    if (open && requestId === requestIdRef.current) {
      setLoading(false);
    }
  }
};

  const resetSearch = () => {
  requestIdRef.current += 1;

  setQ("");
  setResult(null);
  setError(null);
  setLoading(false);

  setTimeout(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, 50);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-24px)]
          max-w-3xl
          p-0
          overflow-hidden
          border border-slate-200
          bg-white
          rounded-3xl
          shadow-[0_24px_80px_rgba(10,25,47,0.18)]
        "
        data-testid="ai-search-dialog"
      >
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="border-b border-slate-100 bg-white">
          <div className="px-5 sm:px-6 pt-5 pb-4">

            {/* AI identity */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl
                  bg-[#FFF4ED]
                  text-[#FF5722]
                  border border-[#FFE1D2]
                "
              >
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[17px] font-bold text-[#0A192F]">
                    SahiAI
                  </h2>

                  <span
                    className="
                      rounded-full
                      bg-[#FFF4ED]
                      px-2 py-0.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#FF5722]
                    "
                  >
                    Beta
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Building Material Intelligence
                </p>
              </div>
            </div>

            {/* Search box */}
            <div
              className="
                flex items-center gap-3
                rounded-2xl
                border border-slate-200
                bg-slate-50/70
                px-3
                py-2
                transition-all
                focus-within:border-[#FF5722]
                focus-within:bg-white
                focus-within:ring-4
                focus-within:ring-orange-500/10
              "
            >
              <Search className="h-5 w-5 shrink-0 text-slate-400" />

              <input
                ref={inputRef}
                data-testid="ai-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submit();
                  }
                }}
                placeholder="Ask about materials, prices or dealers..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  py-2
                  text-[15px]
                  text-[#0A192F]
                  outline-none
                  placeholder:text-slate-400
                "
              />

              {q && (
                <button
                  type="button"
                  onClick={resetSearch}
                  className="
                    hidden sm:flex
                    h-8 w-8
                    items-center justify-center
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                  aria-label="Clear search"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}

              <button
                data-testid="ai-search-submit"
                onClick={() => submit()}
                disabled={loading || !q.trim()}
                className="
                  inline-flex
                  h-10
                  shrink-0
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#0A192F]
                  px-4
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-[#132B4B]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}

                <span className="hidden sm:inline">
                  {loading ? "Thinking" : "Ask SahiAI"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            CONTENT
        ========================================================= */}
        <div className="max-h-[68vh] overflow-y-auto">
          {/* =====================================================
              DEFAULT / SUGGESTIONS
          ===================================================== */}
          {!result && !loading && !error && (
            <div className="px-5 py-6 sm:px-6">

              <div className="mb-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF5722]">
                  Ask SahiAI
                </p>

                <h3 className="mt-1 text-[18px] font-bold text-[#0A192F]">
                  What would you like to know?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Get price information, dealer comparisons and local
                  market insights.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    data-testid={`ai-suggestion-${index}`}
                    onClick={() => {
                      setQ(suggestion.text);
                      submit(suggestion.text);
                    }}
                    className="
                      group
                      rounded-2xl
                      border border-slate-200
                      bg-white
                      p-4
                      text-left
                      transition-all
                      hover:-translate-y-[1px]
                      hover:border-[#FFD0B8]
                      hover:bg-[#FFFAF7]
                      hover:shadow-[0_8px_25px_rgba(10,25,47,0.07)]
                    "
                  >
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          {suggestion.label}
                        </div>

                        <p className="text-sm font-medium leading-5 text-[#0A192F]">
                          {suggestion.text}
                        </p>
                      </div>

                      <div
                        className="
                          mt-1
                          flex h-8 w-8 shrink-0
                          items-center justify-center
                          rounded-full
                          border border-slate-200
                          text-slate-400
                          transition-all
                          group-hover:border-[#FF5722]
                          group-hover:bg-[#FFF4ED]
                          group-hover:text-[#FF5722]
                        "
                      >
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Powered by SahiRate market data
              </div>
            </div>
          )}

          {/* =====================================================
              LOADING
          ===================================================== */}
          {loading && (
            <div className="px-5 py-14 sm:px-6">
              <div className="flex flex-col items-center text-center">

                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-[#FFF4ED]
                    text-[#FF5722]
                  "
                >
                  <Sparkles className="h-6 w-6" />
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-[#FF5722]" />

                  <p className="text-sm font-semibold text-[#0A192F]">
                    SahiAI is checking the market...
                  </p>
                </div>

                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  Looking through material prices and verified dealer
                  information for the best available answer.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              ERROR
          ===================================================== */}
          {error && (
            <div className="px-5 py-6 sm:px-6">
              <div
                data-testid="ai-search-error"
                className="
                  rounded-2xl
                  border border-red-100
                  bg-red-50/70
                  p-5
                "
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      We couldn't complete that search.
                    </p>

                    <p className="mt-1 text-sm leading-5 text-red-700">
                      {error}
                    </p>

                    <button
                      onClick={() => submit()}
                      className="
                        mt-4
                        text-sm
                        font-semibold
                        text-red-700
                        underline
                        underline-offset-4
                        hover:text-red-900
                      "
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

                    {/* =====================================================
              RESULT
          ===================================================== */}
          {result && (
            <div
              className="px-5 py-6 sm:px-6"
              data-testid="ai-search-result"
            >
              {/* Question */}
              {q && (
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Your question
                  </p>

                  <p className="mt-1 text-sm font-medium leading-5 text-[#0A192F]">
                    {q}
                  </p>
                </div>
              )}

              {/* =================================================
                  MARKET INTELLIGENCE HEADER
              ================================================= */}
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border border-[#FFE1D2]
                  bg-gradient-to-br from-[#FFFBF8] via-white to-[#FFF7F2]
                "
              >
                <div className="p-5 sm:p-6">

                  {/* AI Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          bg-[#FFF0E7]
                          text-[#FF5722]
                          border border-[#FFE1D2]
                        "
                      >
                        <Sparkles className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#0A192F]">
                          SahiAI
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">
                          Market intelligence
                        </p>
                      </div>
                    </div>

                    {result.ai_powered && (
                      <span
                        className="
                          rounded-full
                          bg-emerald-50
                          px-2.5 py-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-emerald-700
                        "
                      >
                        AI Powered
                      </span>
                    )}
                  </div>

                  {/* Material */}
                  {result.materials?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF5722]">
                        Material
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-[#0A192F]">
                          {result.materials[0].name}
                        </h3>

                        {result.materials[0].unit && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                            {result.materials[0].unit}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Best Price */}
                  {result.dealers?.length > 0 && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">

                      <div
                        className="
                          rounded-2xl
                          bg-[#0A192F]
                          p-5
                          text-white
                          shadow-[0_12px_30px_rgba(10,25,47,0.12)]
                        "
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                          Lowest listed price
                        </p>

                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-3xl font-bold tracking-tight">
                            ₹{result.dealers[0].price?.toLocaleString("en-IN")}
                          </span>

                          <span className="text-xs text-white/60">
                            {result.market?.unit || ""}
                          </span>
                        </div>

                        <div className="mt-4 border-t border-white/10 pt-3">
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">
                            Best available dealer
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {result.dealers[0].name}
                          </p>

                          <p className="mt-0.5 text-xs text-white/55">
                            {result.dealers[0].area}
                          </p>
                        </div>
                      </div>

                      {/* Market Range */}
                      {result.market && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            Market range
                          </p>

                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-[#0A192F]">
                              ₹{result.market.min?.toLocaleString("en-IN")}
                            </span>

                            <span className="text-xs text-slate-400">
                              to
                            </span>

                            <span className="text-xl font-bold text-[#0A192F]">
                              ₹{result.market.max?.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">
                                Average
                              </p>
                              <p className="mt-1 text-sm font-bold text-[#0A192F]">
                                ₹{result.market.avg?.toLocaleString("en-IN")}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">
                                Dealers tracked
                              </p>
                              <p className="mt-1 text-sm font-bold text-[#0A192F]">
                                {result.market.dealer_count}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  AI SUMMARY
              ================================================= */}
              {result.answer && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#FF5722]" />

                    <p className="text-xs font-bold tracking-[0.04em] text-[#0A192F]">
                      SahiAI Insight
                    </p>
                  </div>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {result.answer}
                  </p>
                </div>
              )}

              {/* =================================================
                  DEALERS
              ================================================= */}
              {result.dealers?.length > 0 && (
                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#FF5722]" />

                      <h3 className="text-sm font-bold text-[#0A192F]">
                        Matching dealers
                      </h3>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      {result.dealers.length} found
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {result.dealers.map((d, index) => (
                      <Link
                        key={d.id}
                        to={`/dealers/${d.id}`}
                        onClick={() => onOpenChange(false)}
                        className="
                          group
                          block
                          rounded-2xl
                          border border-slate-200
                          bg-white
                          p-4
                          transition-all
                          hover:-translate-y-[1px]
                          hover:border-[#FFD0B8]
                          hover:bg-[#FFFAF7]
                          hover:shadow-[0_8px_25px_rgba(10,25,47,0.06)]
                        "
                      >
                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0 flex-1">

                            {/* Dealer name + rank */}
                            <div className="flex items-start gap-2">
                              <span
                                className="
                                  mt-0.5
                                  flex h-5 w-5 shrink-0
                                  items-center justify-center
                                  rounded-full
                                  bg-slate-100
                                  text-[9px]
                                  font-bold
                                  text-slate-500
                                "
                              >
                                {index + 1}
                              </span>

                              <div className="min-w-0">
                                <p className="text-sm font-bold leading-5 text-[#0A192F]">
                                  {d.name}
                                </p>

                                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">

                                  <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {d.area}
                                  </span>

                                  <span className="inline-flex items-center gap-1">
                                    <Star className="h-3.5 w-3.5 fill-[#FF8A3D] text-[#FF8A3D]" />
                                    <span className="font-semibold text-slate-700">
                                      {d.rating}
                                    </span>
                                  </span>

                                </div>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="mt-3 flex flex-wrap gap-2 pl-7">

                              {d.verified && (
                                <span
                                  className="
                                    inline-flex items-center gap-1.5
                                    rounded-full
                                    bg-emerald-50
                                    px-2.5 py-1
                                    text-[10px]
                                    font-semibold
                                    text-emerald-700
                                  "
                                >
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                  Verified
                                </span>
                              )}

                              {d.delivery && (
                                <span
                                  className="
                                    inline-flex items-center gap-1.5
                                    rounded-full
                                    bg-orange-50
                                    px-2.5 py-1
                                    text-[10px]
                                    font-semibold
                                    text-[#D85A25]
                                  "
                                >
                                  <Package className="h-3.5 w-3.5" />
                                  Home Delivery
                                </span>
                              )}

                            </div>
                          </div>

                          {/* Price + arrow */}
                          <div className="flex shrink-0 items-center gap-3">

                            <div className="text-right">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-400">
                                Listed
                              </p>

                              <p className="mt-0.5 text-base font-bold text-[#0A192F]">
                                ₹{d.price?.toLocaleString("en-IN")}
                              </p>
                            </div>

                            <div
                              className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                border border-slate-200
                                text-slate-400
                                transition-all
                                group-hover:border-[#FF5722]
                                group-hover:bg-[#FFF4ED]
                                group-hover:text-[#FF5722]
                              "
                            >
                              <ArrowRight className="h-4 w-4" />
                            </div>

                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================
                  RELATED MATERIALS
              ================================================= */}
              {result.materials?.length > 0 && (
                <div className="mt-7">
                  <div className="mb-3 flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#FF5722]" />

                    <h3 className="text-sm font-bold text-[#0A192F]">
                      Related material
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.materials.map((m) => (
                      <Link
                        key={m.slug}
                        to={`/materials/${m.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border border-slate-200
                          bg-white
                          px-3.5 py-2
                          text-sm
                          font-medium
                          text-[#0A192F]
                          transition-all
                          hover:border-[#FFB994]
                          hover:bg-[#FFFAF7]
                          hover:text-[#FF5722]
                        "
                      >
                        {m.name}

                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================
                  ASK ANOTHER QUESTION
              ================================================= */}
              <div className="mt-7 flex justify-center">
                <button
                  onClick={resetSearch}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border border-slate-200
                    bg-white
                    px-4 py-2.5
                    text-sm
                    font-semibold
                    text-[#0A192F]
                    transition-all
                    hover:border-[#FFB994]
                    hover:bg-[#FFFAF7]
                    hover:text-[#FF5722]
                  "
                >
                  <Search className="h-4 w-4" />
                  Ask another question
                </button>
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}