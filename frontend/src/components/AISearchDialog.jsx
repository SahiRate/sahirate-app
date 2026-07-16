import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Sparkles, Search, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aiSearch } from "../lib/api";

const SUGGESTIONS = [
  "Where can I get the cheapest cement in Deoghar today?",
  "Compare TMT steel prices under ₹7000 per quintal",
  "Which verified dealers offer home delivery for bricks?",
  "What is the average price of stone chips this week?",
];

export default function AISearchDialog({ open, onOpenChange }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    if (!open) { setQ(""); setResult(null); setError(null); }
  }, [open]);

  const submit = async (query) => {
    const text = (query ?? q).trim();
    if (!text) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await aiSearch(text);
      setResult(r);
    } catch (e) {
      setError(e?.response?.data?.detail || "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
  className="max-w-3xl p-0 overflow-hidden border-slate-200 rounded-2xl"
  data-testid="ai-search-dialog">
        <div className="border-b border-slate-200 p-4 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#FF5722]" />
          <input
            ref={inputRef}
            data-testid="ai-search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Ask anything about materials, prices or dealers in Deoghar..."
            className="flex-1 bg-transparent outline-none text-base placeholder:text-slate-400"
          />
          <button
            data-testid="ai-search-submit"
            onClick={() => submit()}
            disabled={loading || !q.trim()}
            className="inline-flex items-center gap-2 bg-[#0A192F] text-white text-sm px-4 py-2 rounded-md hover:bg-[#0f2647] disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Ask
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!result && !loading && !error && (
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-3">
                Try asking
              </div>
              <div className="space-y-2">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    data-testid={`ai-suggestion-${i}`}
                    onClick={() => { setQ(s); submit(s); }}
                    className="w-full text-left px-4 py-3 rounded-md border border-slate-200 hover:border-[#FF5722] hover:bg-orange-50/40 text-sm text-slate-700 transition-colors flex items-center justify-between group"
                  >
                    <span>{s}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center py-12 gap-3 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-[#FF5722]" />
              <div className="text-sm">Searching live prices and verified dealers...</div>
            </div>
          )}

          {error && (
            <div data-testid="ai-search-error" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-4">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6 fade-in-up" data-testid="ai-search-result">
              <div>
                <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-2">
                  SahiRate AI Assistant
                </div>
                <p className="text-[15px] leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {result.answer}
                </p>
              </div>

              {result.materials?.length > 0 && (
                <div>
                  <div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2">
                    Related materials
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.materials.map(m => (
                      <Link
                        key={m.slug}
                        to={`/materials/${m.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="px-3 py-1.5 border border-slate-200 rounded-md text-sm hover:border-[#FF5722] hover:text-[#FF5722]"
                      >
                        {m.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {result.dealers?.length > 0 && (
                <div>
                  <div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2">
                    Matching dealers
                  </div>
                  <div className="space-y-2">
                    {result.dealers.map(d => (
                      <Link
                        key={d.id}
                        to={`/dealers/${d.id}`}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:border-[#FF5722]"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0A192F]">{d.name}</div>
                          <div className="text-xs text-slate-500">{d.area} · ★ {d.rating}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
