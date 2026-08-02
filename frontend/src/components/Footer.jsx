import { Link } from "react-router-dom";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#06111D] text-slate-300">

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.15fr]">

          {/* Left */}

          <div>

            

            <h2 className="max-w-[520px] text-[22px] lg:text-[20px] font-extrabold leading-[1.2] tracking-[-0.01em] text-white">
              India's Trusted Building Material Intelligence Platform
            </h2>

            <p className="mt-5 text-[17px] font-semibold tracking-[0.08em] text-[#FF6B00]">
              Har Material Ka Sahi Rate
            </p>

            <div className="mt-4 h-[3px] w-14 rounded-full bg-[#FF6B00]" />

            <p className="mt-4 max-w-[440px] text-[17px] leading-[2.15] text-slate-300">
            SahiRate empowers construction professionals and homeowners with
            transparent material prices, trusted market insights and{" "}
            <span className="font-semibold text-white">
              SahiAI-powered intelligence
            </span>
            .
          </p>

          </div>

          {/* Platform */}

          <div>

            <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.28em] text-white">
              Platform
            </h3>

            <div className="space-y-6">

              {[
                ["Home", "/"],
                ["Materials", "/materials"],
                ["Dealers", "/dealers"],
                ["Live Prices", "/prices"],
                ["Powered by SahiAI", "/"],
              ].map(([title, link]) => (

                <Link
                  key={title}
                  to={link}
                  className="group flex items-center justify-between border-b border-white/10 pb-3 text-lg text-slate-300 transition hover:text-[#FF6B00]"
                >
                  {title}

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.28em] text-white">
              Company
            </h3>

            <div className="space-y-6">

              {[
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Careers", "/careers"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms-and-conditions"],
              ].map(([title, link]) => (

                <Link
                  key={title}
                  to={link}
                  className="group flex items-center justify-between border-b border-white/10 pb-3 text-lg text-slate-300 transition hover:text-[#FF6B00]"
                >
                  {title}

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

              ))}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.28em] text-white">
              Contact
            </h3>

            <div className="space-y-8">

              <div className="flex gap-4">

                <MapPin
                  className="mt-1 shrink-0 text-white"
                  size={24}
                />

                <span className="text-lg leading-8 whitespace-nowrap">
                  Deoghar, Jharkhand, India
                </span>

              </div>

              <div className="flex gap-4">

                <Mail
                  className="mt-1 shrink-0 text-white"
                  size={24}
                />

                <a
                  href="mailto:sahirateindia@gmail.com"
                  className="text-lg transition hover:text-[#FF6B00]"
                >
                  sahirateindia@gmail.com
                </a>

              </div>

              <div className="flex gap-4">

                <Phone
                  className="mt-1 shrink-0 text-white"
                  size={24}
                />

                <span className="text-lg">
                  Phone Support Coming Soon
                </span>

              </div>

            </div>

            <h4 className="mt-6 mb-5 text-sm uppercase tracking-[0.28em] text-slate-500">
              Connect With Us
            </h4>

            <div className="flex gap-5">

              {[Instagram, Twitter, Youtube].map((Icon, i) => (

                <a
                  key={i}
                  href="#"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition hover:border-[#FF6B00] hover:bg-[#FF6B00]"
                >
                  <Icon size={24} />
                </a>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div
          className="border-t"
          style={{
            borderImage:
              "linear-gradient(to right, transparent, rgba(255,107,0,.65), transparent) 1",
          }}
        >

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-6 py-7 text-sm md:grid-cols-3 lg:px-10">

          {/* Left */}
          <p className="text-center text-slate-500 md:justify-self-start md:text-left">
            © {new Date().getFullYear()}
            <span className="font-semibold text-white">
              {" "}
              SahiRate
            </span>
            . All Rights Reserved.
          </p>

          {/* Center */}
          <p className="justify-self-center text-center text-[15px] tracking-wide text-slate-500">
            Powered by{" "}
            <span className="font-semibold text-[#FF6B00]">
              SahiAI
            </span>
          </p>

          {/* Right */}
          <p className="text-center text-slate-400 md:justify-self-end md:text-right">
            Har Material ka Sahi Rate
          </p>

        </div>
              </div>

    </footer>
  );
}