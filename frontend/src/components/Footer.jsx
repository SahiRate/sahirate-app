import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#081321] text-slate-300 mt-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>

            <img
              src="/logo.png"
              alt="SahiRate"
              className="h-14 mb-5"
            />

            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              SahiRate
            </h2>

            <p className="mt-5 leading-8 text-slate-400">

              India's Building Material Intelligence Platform helping
              homeowners, builders, contractors and dealers make better
              construction decisions through verified market intelligence.

            </p>

          </div>

          {/* Platform */}

          <div>

            <h3 className="font-bold text-white mb-6">
              Platform
            </h3>

            <div className="space-y-4">

              <Link to="/materials" className="block hover:text-[#FF6B00]">
                Materials
              </Link>

              <Link to="/dealers" className="block hover:text-[#FF6B00]">
                Dealers
              </Link>

              <Link to="/prices" className="block hover:text-[#FF6B00]">
                Live Prices
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-bold text-white mb-6">
              Company
            </h3>

            <div className="space-y-4">

              <Link to="/">About</Link>

              <Link to="/">Contact</Link>

              <Link to="/">Privacy Policy</Link>

              <Link to="/">Terms & Conditions</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin size={18} />

                <span>

                  Deoghar,
                  Jharkhand,
                  India

                </span>

              </div>

              <div className="flex gap-3">

                <Mail size={18} />

                <span>

                  support@sahirate.in

                </span>

              </div>

              <div className="flex gap-3">

                <Phone size={18} />

                <span>

                  Coming Soon

                </span>

              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <Facebook size={20} />

              <Instagram size={20} />

              <Twitter size={20} />

              <Linkedin size={20} />

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center">

          <div className="text-sm text-slate-500">

            © {new Date().getFullYear()} SahiRate

          </div>

          <div className="text-sm text-slate-500 mt-3 md:mt-0">

            Know the Right Price. Build with Confidence.

          </div>

        </div>

      </div>

    </footer>
  );
}