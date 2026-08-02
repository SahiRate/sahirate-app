import { NavLink } from "react-router-dom";
import { useState } from "react";

import BrandLockup from "./ui/BrandLockup";

import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ChartNoAxesCombined,
} from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[96px] max-w-[1400px] items-center justify-between px-8 lg:px-10">

        {/* Logo */}
        <BrandLockup />

        {/* Desktop Navigation */}
        <nav className="ml-8 hidden flex-1 items-center justify-center gap-12 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                if (item.label === "Live Prices") {
                  return `flex items-center gap-2 rounded-xl px-4 py-2 transition ${
                    isActive
                      ? "bg-orange-50 font-semibold text-[#FF6B00]"
                      : "text-[#FF6B00] hover:bg-orange-50"
                  }`;
                }

                return isActive
                  ? "relative font-semibold text-[#FF6B00] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-[#FF6B00]"
                  : "font-medium text-slate-700 transition hover:text-[#FF6B00]";
              }}
            >
              {item.label === "Live Prices" && (
                <ChartNoAxesCombined size={20} />
              )}

              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <div className="hidden h-12 w-px bg-slate-200 lg:block" />

          <button
            onClick={onOpenSearch}
            className="group hidden h-[64px] w-[310px] items-center rounded-2xl border border-orange-200 bg-white px-5 shadow-sm transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md lg:flex"
          >

            <Sparkles
              size={20}
              className="mr-3 shrink-0 text-[#FF6B00]"
            />

            <div className="flex flex-1 flex-col items-start justify-center">

              <div className="font-heading text-[16px] font-bold leading-[1.1] tracking-[-0.02em] text-[#FF6B00]">
                Powered by SahiAI
              </div>

              <span className="mt-[3px] text-[12px] leading-none text-slate-500">
                Building Material Intelligence
              </span>

            </div>

            <ChevronRight
              size={18}
              className="ml-4 shrink-0 text-[#FF6B00] transition group-hover:translate-x-1"
            />

          </button>

          {/* Mobile Menu Button */}

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (

        <div className="border-t border-slate-200 bg-white lg:hidden">

          <div className="flex flex-col gap-5 px-6 py-6">

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
              className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 py-3 font-semibold text-[#FF6B00] hover:bg-orange-50"
            >
              <Sparkles size={18} />
              Powered by SahiAI
            </button>

          </div>

        </div>

      )}

    </header>
  );
}