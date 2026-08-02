import { ArrowRight, PlayCircle } from "lucide-react";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div>
      {/* Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 text-[15px] font-semibold text-orange-300 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />

        India's Building Material Intelligence Platform
      </div>

      {/* Heading */}

      <h1 className="mt-8 max-w-[760px] leading-[0.95]">

        <span className="block whitespace-nowrap text-[64px] font-extrabold tracking-[-0.045em] text-white lg:text-[82px]">
          Har Material ka
        </span>

        <span className="font-brand mt-1 block text-[82px] leading-[0.90] tracking-[-0.06em] text-[#FF6B00] lg:text-[102px]">
          SahiRate
        </span>

      </h1>

      {/* Description */}

      <p className="mt-8 max-w-[610px] text-[21px] font-medium leading-[1.7] text-slate-300">
        Compare building material prices, discover trusted dealers,
        track market trends and make smarter construction decisions —
        all powered by{" "}

        <span className="font-brand text-white">
          SahiAI
        </span>

        .
      </p>

      {/* CTA */}

      <div className="mt-10 flex flex-wrap gap-5">

        <button className="group inline-flex items-center gap-2 rounded-[18px] bg-[#FF6B00] px-9 py-[18px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E55F00] hover:shadow-xl">

          Explore Live Prices

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />

        </button>

        <button className="group inline-flex items-center gap-2 rounded-[18px] border border-white/20 px-9 py-[18px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10">

          <PlayCircle
            size={18}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          See How It Works

        </button>

      </div>

      {/* Stats */}

      <div className="mt-14">

        <HeroStats />

      </div>
    </div>
  );
}