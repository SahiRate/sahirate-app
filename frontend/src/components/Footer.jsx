import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A192F] text-slate-300 mt-24">
      <div className="sahi-noise" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FF5722] flex items-center justify-center">
              <span className="text-white font-black text-lg" style={{ fontFamily: "Outfit" }}>S</span>
            </div>
            <div className="font-bold text-xl text-white" style={{ fontFamily: "Outfit" }}>SahiRate</div>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            AI-powered building material price intelligence.
            Bringing radical price transparency to India's construction ecosystem —
            one city at a time. Starting from Deoghar, Jharkhand.
          </p>
          <div className="mt-6 text-xs text-slate-500 font-mono uppercase tracking-widest">
            Live in · Deoghar · Jharkhand · India
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">Platform</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/materials" className="hover:text-[#FF5722]">Materials</Link></li>
            <li><Link to="/dealers" className="hover:text-[#FF5722]">Dealer Directory</Link></li>
            <li><Link to="/prices" className="hover:text-[#FF5722]">Daily Prices</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">Coming Soon</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Cost Calculator</li>
            <li>365-day Price History</li>
            <li>Manpower Directory</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div>© {new Date().getFullYear()} SahiRate. Built for builders, by builders.</div>
          <div className="font-mono uppercase tracking-widest mt-2 md:mt-0">v0.1 · Phase 1</div>
        </div>
      </div>
    </footer>
  );
}
