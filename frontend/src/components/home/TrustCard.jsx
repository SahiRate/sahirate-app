import {
  Building2,
  HardHat,
  Compass,
  Store,
  House,
  BriefcaseBusiness,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";

const icons = {
  builders: Building2,
  contractors: HardHat,
  engineers: BriefcaseBusiness,
  architects: Compass,
  dealers: Store,
  homeowners: House,
};

const details = {
  builders: {
    title: "Builders",
    subtitle: "Build with better price visibility.",
    description:
      "SahiRate helps builders understand current material prices before procurement, so project budgets and purchasing decisions can be made with greater confidence.",
    points: [
      "Check current material rates before bulk purchases.",
      "Compare available supplier prices before ordering.",
      "Keep project budgeting closer to the real market.",
      "Reduce the chance of paying more than necessary.",
    ],
  },

  contractors: {
    title: "Contractors",
    subtitle: "Protect your project margins.",
    description:
      "For contractors, every purchase affects the project. SahiRate helps you compare local rates and make better procurement decisions before placing an order.",
    points: [
      "Compare local prices before every important purchase.",
      "Understand the going market rate for materials.",
      "Make procurement decisions with better information.",
      "Protect project margins through smarter buying.",
    ],
  },

  engineers: {
    title: "Engineers",
    subtitle: "Better estimates start with better information.",
    description:
      "Engineers can use current material price information to prepare more realistic estimates and support project planning with greater confidence.",
    points: [
      "Refer to current material price levels.",
      "Prepare more practical project estimates.",
      "Understand local market price differences.",
      "Support planning with clearer cost information.",
    ],
  },

  architects: {
    title: "Architects",
    subtitle: "Design with cost awareness.",
    description:
      "Architects can understand current material pricing and market conditions while discussing material choices and project budgets with clients.",
    points: [
      "Understand current market prices for key materials.",
      "Support clients with better cost awareness.",
      "Compare material choices with pricing in mind.",
      "Make recommendations with greater confidence.",
    ],
  },

  dealers: {
    title: "Dealers",
    subtitle: "Build visibility and customer trust.",
    description:
      "SahiRate helps dealers become more visible to construction buyers while supporting a more transparent and trustworthy buying experience.",
    points: [
      "Increase visibility among local construction buyers.",
      "Showcase your business and material availability.",
      "Build confidence through transparent information.",
      "Become part of the growing SahiRate dealer network.",
    ],
  },

  homeowners: {
    title: "Homeowners",
    subtitle: "Make every construction purchase with confidence.",
    description:
      "For a homeowner, building a house is a major investment. SahiRate helps you understand material prices before you spend your hard-earned money.",
    points: [
      "Check market rates before visiting a supplier.",
      "Compare prices before making a purchase.",
      "Understand whether a quoted rate looks reasonable.",
      "Make important construction purchases with more confidence.",
    ],
  },
};

export default function TrustCard({
  icon,
  title,
  description,
}) {
  const Icon = icons[icon];
  const detail = details[icon];

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* =====================================================
          CARD
      ===================================================== */}

      <div
        className="
          group
          flex
          h-full
          flex-col
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-orange-300
          hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]
        "
      >
        {/* Icon */}

        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[20px]
            bg-orange-50
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:bg-orange-100
          "
        >
          <Icon
            size={30}
            strokeWidth={2}
            className="
              text-orange-500
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </div>

        {/* Title */}

        <h3 className="text-[30px] font-bold leading-none tracking-[-0.03em] text-slate-900">
          {title}
        </h3>

        {/* Description */}

        <p className="mt-4 text-[17px] leading-[1.7] text-slate-600">
          {description}
        </p>

        {/* Learn More */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            mt-7
            inline-flex
            w-fit
            items-center
            gap-2
            border-0
            bg-transparent
            p-0
            font-semibold
            text-orange-500
            transition-all
            duration-300
            hover:gap-3
            hover:text-orange-600
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-orange-400
            focus-visible:ring-offset-2
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

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-slate-950/55
            px-4
            py-6
            backdrop-blur-sm
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-[760px]
              overflow-y-auto
              overflow-hidden
              rounded-[28px]
              bg-white
              shadow-[0_30px_100px_rgba(15,23,42,0.28)]
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top Accent */}

            <div className="h-1.5 w-full bg-[#FF6B00]" />

            <div className="p-7 md:p-9">

              {/* Header */}

              <div className="flex items-start justify-between gap-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                    <Icon
                      size={28}
                      strokeWidth={2}
                      className="text-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <div className="text-[24px] font-extrabold leading-none tracking-[-0.03em]">
                      <span className="text-[#0A2342]">
                        Sahi
                      </span>
                      <span className="text-[#FF5A00]">
                        Rate
                      </span>
                    </div>

                    <h2 className="mt-2 text-[26px] font-bold leading-tight tracking-[-0.03em] text-slate-900 md:text-[30px]">
                      {detail.title}
                    </h2>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-500
                    transition
                    hover:bg-slate-200
                    hover:text-slate-900
                  "
                >
                  <X size={20} />
                </button>

              </div>

              {/* Main Content */}

              <div className="mt-7">

                <h3 className="text-[22px] font-bold leading-[1.3] tracking-[-0.02em] text-slate-900 md:text-[24px]">
                  {detail.subtitle}
                </h3>

                <p className="mt-4 text-[16px] leading-7 text-slate-600 md:text-[17px]">
                  {detail.description}
                </p>

              </div>

              {/* Helpful Points */}

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-5 md:p-6">

                <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  How SahiRate Helps
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  {detail.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />

                      <span className="text-[15px] leading-6 text-slate-600">
                        {point}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

              {/* Footer */}

              <div className="mt-6 border-t border-slate-200 pt-5">

                <div className="flex items-center justify-between gap-5">

                  {/* Brand line — English/Latin only */}

                  <p className="text-[16px] font-medium text-slate-500">
                    Har Material ka{" "}
                    <span className="font-extrabold text-[#0A2342]">
                      Sahi
                    </span>
                    <span className="font-extrabold text-[#FF5A00]">
                      Rate
                    </span>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                      rounded-xl
                      bg-[#FF6B00]
                      px-6
                      py-3
                      text-[15px]
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-[#E55F00]
                      hover:shadow-lg
                    "
                  >
                    Got It
                  </button>

                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}