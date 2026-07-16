import { Link, NavLink } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/materials", label: "Materials" },
  { to: "/dealers", label: "Dealers" },
  { to: "/prices", label: "Live Prices" },
];

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="SahiRate"
            className="h-12 w-auto"
          />

          <div className="leading-none">

            <div
              className="text-2xl font-extrabold text-[#0A192F]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              SahiRate
            </div>

            <div
              className="text-xs tracking-[0.25em] uppercase text-slate-500 mt-1"
            >
              India's Building Material Intelligence Platform
            </div>

          </div>
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-10">

          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-[#FF6B00]"
                  : "font-medium text-slate-700 hover:text-[#FF6B00] transition"
              }
            >
              {item.label}
            </NavLink>
          ))}

        </nav>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 bg-[#FF6B00] hover:bg-[#eb5d00] transition text-white px-5 py-3 rounded-xl font-semibold shadow-lg"
          >
            <Sparkles size={18} />

            Ask AI
          </button>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* Mobile */}

      {mobileOpen && (

        <div className="lg:hidden border-t border-slate-200 bg-white">

          <div className="px-6 py-5 flex flex-col gap-5">

            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-slate-700 font-medium"
              >
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenSearch();
              }}
              className="bg-[#FF6B00] text-white rounded-xl py-3 font-semibold"
            >
              Ask AI
            </button>

          </div>

        </div>

      )}

    </header>
  );
}