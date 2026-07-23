import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  Sparkles,
  X,
  ChartNoAxesCombined,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/materials", label: "Materials" },
  { to: "/dealers", label: "Dealers" },
  { to: "/prices", label: "Live Prices" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="SahiRate"
            className="h-14 w-auto"
          />

          <div className="leading-tight">
            <div
              className="text-2xl font-extrabold text-[#0A192F]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              SahiRate
            </div>

            <div className="mt-1 max-w-[250px] text-[11px] leading-[1.25] uppercase tracking-[0.16em] text-slate-500">
              India's Building Material Intelligence Platform
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                item.label === "Live Prices"
                  ? `flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2 font-semibold transition ${
                      isActive
                        ? "border border-orange-200 bg-orange-100 text-[#FF6B00]"
                        : "border border-transparent text-[#FF6B00] hover:border-orange-200 hover:bg-orange-50"
                    }`
                  : isActive
                  ? "font-semibold text-[#FF6B00]"
                  : "font-medium text-slate-700 transition hover:text-[#FF6B00]"
              }
            >
              {item.label === "Live Prices" && (
                <ChartNoAxesCombined className="h-5 w-5" />
              )}

              {item.label}
            </NavLink>
          ))}
        </nav>
                {/* Right */}
        <div className="flex items-center gap-5">
          <div className="hidden h-10 w-px bg-slate-200 lg:block" />

          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-3 rounded-2xl border border-orange-200 bg-white px-6 py-2.5 shadow-sm transition-all duration-200 hover:bg-orange-50 hover:shadow-md lg:flex"
          >
            <Sparkles
              size={22}
              className="text-[#FF6B00]"
            />

            <div className="text-left leading-tight">
              <div className="font-bold text-[#FF6B00]">
                Ask SahiAI
              </div>

              <div className="text-xs text-slate-500">
                AI Assistant
              </div>
            </div>

            <ChevronRight
              size={18}
              className="text-[#FF6B00]"
            />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="flex flex-col gap-5 px-6 py-5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#FF6B00]"
                    : "font-medium text-slate-700"
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white py-3 font-semibold text-[#FF6B00] transition hover:bg-orange-50"
            >
              <Sparkles size={18} />
              Ask SahiAI
            </button>
          </div>
        </div>
      )}
    </header>
  );
}