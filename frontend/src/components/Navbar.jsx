import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/materials", label: "Materials" },
  { to: "/dealers", label: "Dealers" },
  { to: "/prices", label: "Live Prices" },
];

export default function Navbar({ onOpenSearch }) {
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-40 glass-header">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="nav-logo">
          <div className="w-9 h-9 rounded-lg bg-[#0A192F] flex items-center justify-center">
            <span className="text-white font-black text-lg" style={{ fontFamily: "Outfit" }}>S</span>
          </div>
          <div className="leading-none">
            <div className="font-bold text-lg tracking-tight text-[#0A192F]" style={{ fontFamily: "Outfit" }}>
              SahiRate
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
              Deoghar · Jharkhand
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => {
            const active = loc.pathname === n.to || (n.to !== "/" && loc.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                data-testid={`nav-${n.label.toLowerCase().replace(" ", "-")}`}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  active
                    ? "text-[#FF5722] font-semibold"
                    : "text-slate-700 hover:text-[#0A192F]"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={onOpenSearch}
          data-testid="nav-ai-search-btn"
          className="inline-flex items-center gap-2 bg-[#FF5722] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#e64a1c] transition-colors shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Ask AI
        </button>
      </div>
    </header>
  );
}
