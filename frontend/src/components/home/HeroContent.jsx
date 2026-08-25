import { ArrowRight, PlayCircle, Calculator } from "lucide-react";
import HeroStats from "./HeroStats";
import { Link } from "react-router-dom";
export default function HeroContent() {
  return (
    <div>
      {/* Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[14px] font-semibold text-orange-300 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />

        India's Building Material Intelligence Platform
      </div>

      {/* Heading */}

      <h1 className="mt-6 max-w-[560px]">

        <span
          className="
            mt-2
            block
            font-logo
            text-[50px]
            font-bold
            leading-[0.95]
            tracking-[-0.03em]
            text-[#ffffff]
            lg:text-[64px]
          "
        >
          Har Material ka
        </span>

        <span
          className="
            mt-0
            block
            font-logo
            text-[54px]
            font-extrabold
            leading-[0.88]
            tracking-[-0.05em]
            text-[#FF6B00]
            lg:text-[66px]
          "
        >
          SahiRate
        </span>

      </h1>

      {/* Description */}

      <p className="mt-12 max-w-[560px] text-[20px] font-normal leading-[1.8] text-slate-200">
        Check market rates before you buy. Compare trusted dealers, understand price trends, and make smarter purchasing decisions with SahiAI.
      </p>

      {/* CTA */}

      <div className="flex flex-row flex-wrap items-center gap-4 mt-8  -wrap gap-4 w-max max-w-none flex-nowrap">

        <Link
          to="/prices"
          className="group inline-flex items-center gap-2 rounded-[18px] bg-[#FF6B00] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E55F00] hover:shadow-xl"
        >
          Explore Live Prices

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <button
        type="button"
        onClick={() =>
          document.getElementById("how-it-works")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="group inline-flex items-center gap-2 rounded-[18px] border border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
        >

          <PlayCircle
            size={18}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          See How It Works

        </button>
        <div className="relative inline-flex shrink-0">

          <Link
            to="/smartbuild"
            data-testid="home-smartbuild-cta"
            className="group relative inline-flex items-center gap-2 rounded-[18px] border border-[#FF6B00] bg-[#FF6B00]/5 px-8 py-4 font-semibold text-white shadow-[0_0_0_rgba(255,107,0,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF6B00]/10 hover:shadow-[0_0_24px_rgba(255,107,0,0.22)]"
          >
            {/* Conversion callout — decorative only, does not affect CTA row */}
            <div className="pointer-events-none absolute -top-[82px] left-1/2 z-30 -translate-x-1/2 text-center">
              <div className="whitespace-nowrap font-[cursive] text-[15px] font-bold italic leading-tight text-white">
                Instant Estimate
              </div>

              <div className="whitespace-nowrap font-[cursive] text-[15px] font-bold italic leading-tight text-[#FF6B00]">
                in seconds
              </div>

              <svg
                className="mx-auto mt-1 h-10 w-14 overflow-visible text-[#FF6B00]"
                viewBox="0 0 56 40"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 4 C42 5 49 18 35 34"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M35 34 L29 27 M35 34 L39 26"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="pointer-events-none absolute -bottom-[58px] left-1/2 z-30 -translate-x-1/2 text-center">
              <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#FF6B00]/70 bg-[#FF6B00]/10 text-[#FF6B00]">
                <Calculator size={14} />
              </div>

              <div className="whitespace-nowrap font-[cursive] text-[13px] font-bold italic leading-tight text-white">
                Know Your Cost.
              </div>

              <div className="whitespace-nowrap font-[cursive] text-[13px] font-bold italic leading-tight text-[#FF6B00]">
                Build With Confidence.
              </div>
            </div>
            <Calculator
              size={18}
              className="text-[#FF6B00] transition-transform duration-300 group-hover:scale-110"
            />

            Calculate Estimate

            <ArrowRight
              size={17}
              className="text-[#FF6B00] transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-10">

        <HeroStats />

      </div>
    </div>
  );
}





