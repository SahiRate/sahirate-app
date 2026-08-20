import { ArrowRight, PlayCircle } from "lucide-react";
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

      <div className="mt-8 flex flex-wrap gap-4">

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

      </div>

      {/* Stats */}

      <div className="mt-10">

        <HeroStats />

      </div>
    </div>
  );
}