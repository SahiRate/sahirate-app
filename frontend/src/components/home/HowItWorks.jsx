import { useState } from "react";
import FeatureDetailModal from "./FeatureDetailModal";
import {
  Search,
  BarChart3,
  BrainCircuit,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Search Material",
    feature: "howSearch",
    description:
      "Quickly search any building material and access the latest market prices from trusted sources.",
    icon: Search,
    accent: "orange",
  },
  {
    number: "02",
    title: "Compare Market Prices",
    feature: "howCompare",
    description:
      "Compare prices across dealers and markets to identify the best value before purchasing.",
    icon: BarChart3,
    accent: "amber",
  },
  {
    number: "03",
    title: "Get SahiAI Insights",
    feature: "howAI",
    description:
      "Receive intelligent recommendations, price trends, and market signals powered by SahiAI.",
    icon: BrainCircuit,
    accent: "green",
  },
  {
    number: "04",
    title: "Buy with Confidence",
    feature: "howBuy",
    description:
      "Purchase with greater confidence using transparent pricing and reliable market intelligence.",
    icon: ShoppingCart,
    accent: "blue",
  },
];

const accentStyles = {
  orange: {
    iconBg: "bg-orange-50",
    iconText: "text-orange-500",
    line: "border-orange-300",
    dot: "bg-orange-500",
    ribbon: "bg-orange-500",
    underline: "bg-orange-500",
  },
  amber: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-500",
    line: "border-amber-300",
    dot: "bg-amber-500",
    ribbon: "bg-amber-500",
    underline: "bg-amber-500",
  },
  green: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-500",
    line: "border-emerald-300",
    dot: "bg-emerald-500",
    ribbon: "bg-emerald-500",
    underline: "bg-emerald-500",
  },
  blue: {
    iconBg: "bg-blue-50",
    iconText: "text-blue-500",
    line: "border-blue-300",
    dot: "bg-blue-500",
    ribbon: "bg-blue-500",
    underline: "bg-blue-500",
  },
};

export default function HowItWorks() {
  const [activeFeature, setActiveFeature] = useState(null);
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mx-auto max-w-5xl text-center">

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-orange-200
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              uppercase
              tracking-[0.22em]
              text-orange-500
              shadow-sm
            "
          >
            How It Works
          </div>

          <h2
            className="
              mt-8
              text-4xl
              font-bold
              leading-[1.05]
              tracking-[-0.045em]
              text-slate-950
              sm:text-5xl
              lg:text-[64px]
            "
          >
            Build Smarter in Four Simple Steps
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-orange-500" />

          <p
            className="
              mx-auto
              mt-7
              max-w-4xl
              text-lg
              leading-8
              text-slate-600
              sm:text-xl
            "
          >
            From checking prices to making informed purchasing decisions,{" "}
            <span className="font-bold text-slate-900">
              Sahi<span className="text-orange-500">Rate</span>
            </span>{" "}
            makes the entire buying journey simple, transparent and powered by{" "}
            <span className="font-bold text-slate-900">SahiAI</span>.
          </p>

        </div>

        {/* =====================================================
            JOURNEY
        ===================================================== */}

                    <div className="relative mt-16 lg:mt-20">

                      {/* Desktop connector */}
                      <div
              className="
                pointer-events-none
                absolute
                left-[8%]
                right-[8%]
                top-[92px]
                hidden
                h-[70px]
                lg:block
              "
            >
              <svg
                viewBox="0 0 1000 80"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="
                    M 0 40
                    C 85 40, 95 40, 125 40
                    C 165 40, 175 15, 210 15
                    C 245 15, 255 65, 290 65
                    C 325 65, 335 40, 375 40
                    C 415 40, 425 15, 460 15
                    C 495 15, 505 65, 540 65
                    C 575 65, 585 40, 625 40
                    C 665 40, 675 15, 710 15
                    C 745 15, 755 65, 790 65
                    C 825 65, 835 40, 875 40
                    C 915 40, 930 40, 1000 40
                  "
                  fill="none"
                  stroke="#FED7AA"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">

            {steps.map((step) => {
              const Icon = step.icon;
              const styles = accentStyles[step.accent];

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center"
                >

                  {/* =================================================
                      ICON
                  ================================================= */}

                  <div className="relative z-10">

                    <div
                      className={`
                        flex
                        h-36
                        w-36
                        items-center
                        justify-center
                        rounded-full
                        border-[3px]
                        border-white
                        bg-white
                        shadow-[0_12px_35px_rgba(15,23,42,0.10)]
                        ring-1
                        ring-slate-100
                      `}
                    >
                      <div
                        className={`
                          flex
                          h-24
                          w-24
                          items-center
                          justify-center
                          rounded-full
                          ${styles.iconBg}
                        `}
                      >
                        <Icon
                          size={52}
                          strokeWidth={1.8}
                          className={styles.iconText}
                        />
                      </div>
                    </div>

                    {/* connector dot */}
                    <div
                      className={`
                        absolute
                        -bottom-5
                        left-1/2
                        h-5
                        w-5
                        -translate-x-1/2
                        rounded-full
                        border-4
                        border-white
                        ${styles.dot}
                        shadow-sm
                      `}
                    />

                  </div>

                  {/* =================================================
                      CARD
                  ================================================= */}

                  <div
                    className="
                      relative
                      mt-8
                      w-full
                      overflow-hidden
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white
                      px-7
                      pb-7
                      pt-9
                      shadow-[0_10px_35px_rgba(15,23,42,0.06)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-orange-200
                      hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]
                    "
                  >

                    {/* Step ribbon */}
                    <div
                      className={`
                        absolute
                        left-0
                        top-0
                        flex
                        h-16
                        w-16
                        items-start
                        justify-start
                        ${styles.ribbon}
                      `}
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 0 100%)",
                      }}
                    >
                      <span
                        className="
                          ml-3
                          mt-2
                          text-lg
                          font-bold
                          text-white
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    <div className="text-center">

                      <h3
                        className="
                          text-[23px]
                          font-bold
                          leading-tight
                          tracking-[-0.025em]
                          text-slate-950
                        "
                      >
                        {step.title}
                      </h3>

                      <div
                        className={`
                          mx-auto
                          mt-4
                          h-1
                          w-12
                          rounded-full
                          ${styles.underline}
                        `}
                      />

                      <p
                        className="
                          mt-5
                          min-h-[108px]
                          text-[16px]
                          leading-7
                          text-slate-600
                        "
                      >
                        {step.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => setActiveFeature(step.feature)}
                        className="
                          group
                          mt-5
                          inline-flex
                          items-center
                          gap-2
                          font-semibold
                          text-orange-500
                          transition-all
                          duration-300
                          hover:gap-3
                          hover:text-orange-600
                        "
                      >
                        Learn More

                        <ArrowRight
                          size={18}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            BOTTOM BRANDING STRIP
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-14
            flex
            max-w-5xl
            flex-col
            items-center
            gap-5
            rounded-3xl
            border
            border-orange-100
            bg-orange-50/40
            px-6
            py-6
            text-center
            sm:flex-row
            sm:justify-center
            sm:text-left
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-orange-100
            "
          >
            <ShieldCheck
              size={28}
              className="text-orange-500"
            />
          </div>

          <div className="h-px w-16 bg-orange-200 sm:h-12 sm:w-px" />

          <p
            className="
              text-xl
              font-medium
              text-slate-600
            "
          >
            Har Material ka{" "}
            <span className="font-bold text-slate-900">
              Sahi<span className="text-orange-500">Rate</span>
            </span>
            .
          </p>

          <div className="hidden h-12 w-px bg-orange-200 sm:block" />

          <p
            className="
              max-w-xl
              text-base
              leading-7
              text-slate-600
            "
          >
            Sahi jankari, Sahi comparison aur Sahi decision —
            yahi hai smart construction ki pehchaan.
          </p>

        </div>

      </div>
      <FeatureDetailModal
        feature={activeFeature}
        onClose={() => setActiveFeature(null)}
      />
    </section>
  );
}