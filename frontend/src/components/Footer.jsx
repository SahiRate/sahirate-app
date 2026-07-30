import { Link } from "react-router-dom";
import SahiRateLogo from "../assets/sahirate-logo.png";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#06111D] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <img
              src={SahiRateLogo}
              alt="SahiRate"
              className="mb-6 h-16 w-auto lg:h-20"
              draggable="false"
            />

            <h3 className="mb-3 text-xl font-semibold leading-snug text-white">
              India's Trusted Building Material
              <br />
              Intelligence Platform
            </h3>

            <p className="max-w-sm leading-8 text-slate-400">
              SahiRate helps builders, contractors, architects, dealers and homeowners
              make smarter construction decisions with transparent material prices,
              trusted dealer information and AI-powered market intelligence.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-6 font-bold text-white">
              Platform
            </h3>

            <div className="space-y-4">
              <Link to="/" className="block transition hover:text-[#FF6B00]">
                Home
              </Link>

              <Link
                to="/materials"
                className="block transition hover:text-[#FF6B00]"
              >
                Materials
              </Link>

              <Link
                to="/dealers"
                className="block transition hover:text-[#FF6B00]"
              >
                Dealers
              </Link>

              <Link
                to="/prices"
                className="block transition hover:text-[#FF6B00]"
              >
                Live Prices
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 font-bold text-white">
              Company
            </h3>

            <div className="space-y-4">
              <Link
                to="/about"
                className="block transition hover:text-[#FF6B00]"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="block transition hover:text-[#FF6B00]"
              >
                Contact
              </Link>

              <Link
                to="/privacy-policy"
                className="block transition hover:text-[#FF6B00]"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="block transition hover:text-[#FF6B00]"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-bold text-white">
              Contact
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0"
                />

                <span>
                  Deoghar, Jharkhand,
                  <br />
                  India
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-1 shrink-0"
                />

                <a
                  href="mailto:sahirateindia@gmail.com"
                  className="break-all transition hover:text-[#FF6B00]"
                >
                  sahirateindia@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-1 shrink-0"
                />

                <span>Phone Support Coming Soon</span>
              </div>
            </div>

            <p className="mt-8 mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Connect With Us
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/sahirateindia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#FF6B00] hover:bg-white/5 hover:text-[#FF6B00]"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://x.com/sahirateindia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#FF6B00] hover:bg-white/5 hover:text-[#FF6B00]"
              >
                <Twitter size={20} />
              </a>

              <a
                href="https://www.youtube.com/@SahiRateIndia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#FF6B00] hover:bg-white/5 hover:text-[#FF6B00]"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 text-center md:flex-row md:text-left lg:px-10">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SahiRate. All Rights Reserved.
          </p>

          <p className="mt-3 text-sm font-medium tracking-wide text-slate-400 md:mt-0">
            Har Material ka Sahi Rate.
          </p>
        </div>
      </div>
    </footer>
  );
}