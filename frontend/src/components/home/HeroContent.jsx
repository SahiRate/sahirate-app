import { ArrowRight, PlayCircle, Calculator } from "lucide-react";
import HeroStats from "./HeroStats";
import { Link } from "react-router-dom";

export default function HeroContent() {
  return (
    <div className="min-w-0">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[14px] font-semibold text-orange-300 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
        India's Building Material Intelligence Platform
      </div>

      {/* Heading */}
      <h1 className="mt-6 max-w-[600px]">
        <span className="mt-2 block font-logo text-[50px] font-bold leading-[0.95] tracking-[-0.03em] text-white lg:text-[64px]">
          Har Material ka
        </span>

        <span className="mt-0 block font-logo text-[54px] font-extrabold leading-[0.88] tracking-[-0.05em] text-[#FF6B00] lg:text-[66px]">
          SahiRate
        </span>
      </h1>

      {/* Description */}
      <p className="mt-12 max-w-[600px] text-[20px] font-normal leading-[1.8] text-slate-200">
        Check market rates before you buy. Compare trusted dealers, understand
        price trends, and make smarter purchasing decisions with SahiAI.
      </p>

      {/* CTA AREA */}
      <div className="mt-8 flex w-full flex-col gap-5 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-3">

        {/* Explore Live Prices */}
        <Link
          to="/prices"
          className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[18px] bg-[#FF6B00] px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E55F00] hover:shadow-xl lg:w-auto lg:px-8"
        >
          <span className="whitespace-nowrap">
            Explore Live Prices
          </span>

          <ArrowRight
            size={18}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {/* See How It Works */}
        <button
          type="button"
          onClick={() =>
            document.getElementById("how-it-works")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[18px] border border-white/20 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 lg:w-auto lg:px-8"
        >
          <PlayCircle
            size={18}
            className="shrink-0 transition-transform duration-300 group-hover:scale-110"
          />

          <span className="whitespace-nowrap">
            See How It Works
          </span>
        </button>

        {/* Calculate Estimate */}
        <div className="relative w-full shrink-0 lg:w-auto">

          {/* Instant Estimate
              Mobile: normal flow
              Desktop: floating annotation
          */}
          <div className="mb-4 flex flex-col items-center text-center lg:absolute lg:-top-[82px] lg:left-1/2 lg:mb-0 lg:-translate-x-1/2">
            <div className="whitespace-nowrap font-[cursive] text-[14px] font-bold italic leading-tight text-white lg:text-[15px]">
              Instant Estimate
            </div>

            <div className="whitespace-nowrap font-[cursive] text-[14px] font-bold italic leading-tight text-[#FF6B00] lg:text-[15px]">
              in seconds
            </div>

            <svg
              className="mt-1 h-9 w-14 overflow-visible text-[#FF6B00] lg:h-10"
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

          {/* Calculate Button */}
          <Link
            to="/smartbuild"
            data-testid="home-smartbuild-cta"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-[#FF6B00] bg-[#FF6B00]/5 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF6B00]/10 hover:shadow-[0_0_24px_rgba(255,107,0,0.22)] lg:w-auto lg:px-8"
          >
            <Calculator
              size={18}
              className="shrink-0 text-[#FF6B00] transition-transform duration-300 group-hover:scale-110"
            />

            <span className="whitespace-nowrap">
              Calculate Estimate
            </span>

            <ArrowRight
              size={17}
              className="shrink-0 text-[#FF6B00] transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Know Your Cost
              Mobile: normal flow
              Desktop: floating annotation
          */}
          <div className="mt-3 flex items-center justify-center gap-2 lg:absolute lg:-bottom-[58px] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]/70 bg-[#FF6B00]/10 text-[#FF6B00] shadow-[0_0_18px_rgba(255,107,0,0.15)] lg:h-7 lg:w-7">
              <Calculator size={14} />
            </div>

            <div>
              <div className="whitespace-nowrap font-[cursive] text-[12px] font-bold italic leading-tight text-white lg:text-[13px]">
                Know Your Cost.
              </div>

              <div className="whitespace-nowrap font-[cursive] text-[12px] font-bold italic leading-tight text-[#FF6B00] lg:text-[13px]">
                Build With Confidence.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Stats */}
      <div className="mt-10">
        <HeroStats />
      </div>

    </div>
  );
}
