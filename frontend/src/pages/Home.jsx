import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Minus, Sparkles, ShieldCheck, Zap, MapPin, TrendingUp } from "lucide-react";
import { fetchDailyPrices, fetchMaterials } from "../lib/api";

const TrendIcon = ({ trend }) => {
  if (trend === "up") return <ArrowUpRight className="w-4 h-4 text-[#FF5722]" />;
  if (trend === "down") return <ArrowDownRight className="w-4 h-4 text-emerald-600" />;
  return <Minus className="w-4 h-4 text-slate-400" />;
};

export default function Home({ onOpenSearch }) {
  const [board, setBoard] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchDailyPrices().then(d => setBoard(d.board || [])).catch(() => {});
    fetchMaterials().then(setMaterials).catch(() => {});
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0A192F] text-white">
        <div className="sahi-noise" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#FF5722] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF5722] opacity-10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-widest mb-8 fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            Now live in Deoghar, Jharkhand
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-[1.05] fade-in-up" style={{ animationDelay: "0.05s" }}>
            The <span className="text-[#FF5722]">right price</span> for every bag,<br/>
            brick and rod you buy.
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed fade-in-up" style={{ animationDelay: "0.15s" }}>
            SahiRate is India's AI-powered price intelligence platform for building materials.
            Compare live prices from verified dealers, discover the best rates near you,
            and build smarter — without overpaying.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 fade-in-up" style={{ animationDelay: "0.25s" }}>
            <button
              onClick={onOpenSearch}
              data-testid="hero-ai-search-btn"
              className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#e64a1c] text-white font-semibold px-6 py-3.5 rounded-md transition-colors shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-5 h-5" />
              Ask AI about prices
            </button>
            <Link
              to="/materials"
              data-testid="hero-compare-btn"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-md transition-colors"
            >
              Compare materials
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* stat strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 fade-in-up" style={{ animationDelay: "0.35s" }}>
            {[
              { k: "15+", v: "Verified dealers" },
              { k: "6", v: "Material categories" },
              { k: "Daily", v: "Price updates" },
              { k: "AI", v: "Powered search" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-white font-mono">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* live price ticker */}
        {board.length > 0 && (
          <div className="relative border-t border-white/10 bg-black/20 py-3 overflow-hidden">
            <div className="ticker">
              {[...board, ...board].map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <TrendIcon trend={b.trend} />
                  <span className="text-slate-300 font-semibold">{b.name}</span>
                  <span className="font-mono text-white">₹{b.avg}</span>
                  <span className="text-xs text-slate-500 uppercase font-mono">{b.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===== VALUE PROPS ===== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">Why SahiRate</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] tracking-tight">
            Stop guessing. Start comparing.
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            The way you plan cost for construction is broken. Every phone call gives you a different price.
            SahiRate solves that with radical transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Live price comparison",
              desc: "See what every dealer in Deoghar is charging — right now. Sort by price, rating and distance.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: "Verified dealers only",
              desc: "Every dealer is GST-registered and rating-verified. No middlemen, no inflated quotes.",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "AI-powered decisions",
              desc: "Ask any construction question in plain English. Get instant answers backed by real market data.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-slate-200 rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-md bg-[#FFF3EF] text-[#FF5722] flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg text-[#0A192F] mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MATERIAL CATEGORIES ===== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">Categories</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] tracking-tight">
              Every material, one dashboard.
            </h2>
          </div>
          <Link to="/materials" data-testid="home-view-all-materials" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#FF5722]">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {materials.map(m => (
            <Link
              key={m.slug}
              to={`/materials/${m.slug}`}
              data-testid={`home-material-${m.slug}`}
              className="group relative overflow-hidden border border-slate-200 rounded-lg bg-white hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#0A192F]">{m.name}</h3>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-1 text-xs text-slate-500">{m.unit}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-slate-500">Avg</span>
                  <span className="text-lg font-black text-[#0A192F] font-mono">
                    ₹{m.stats?.avg ?? "—"}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {m.stats?.dealer_count ? `· ${m.stats.dealer_count} dealers` : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-[#0A192F] text-white p-10 md:p-16">
          <div className="sahi-noise" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3">
                <MapPin className="w-3 h-3 inline mr-1" /> Deoghar first · India next
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Are you a dealer? Get listed on SahiRate.
              </h2>
              <p className="mt-4 text-slate-300 text-base">
                Reach thousands of contractors, builders and homeowners actively searching for the materials you sell.
                Free listing during our Deoghar launch phase.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                data-testid="cta-list-dealer"
                onClick={onOpenSearch}
                className="bg-[#FF5722] hover:bg-[#e64a1c] text-white font-semibold px-6 py-3.5 rounded-md"
              >
                Get listed
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
