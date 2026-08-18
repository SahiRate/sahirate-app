import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import FeatureDetailModal from "./FeatureDetailModal";

const icons = {
  prices: BarChart3,
  ai: BrainCircuit,
  trends: TrendingUp,
  network: ShieldCheck,
};

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  const Icon = icons[icon];

  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
          hover:shadow-[0_24px_64px_rgba(15,23,42,0.14)]
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
            rounded-2xl
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

        <h3
          className="
            text-[30px]
            font-bold
            leading-[1.1]
            tracking-[-0.03em]
            text-slate-900
          "
        >
          {title}
        </h3>

        {/* Description */}

        <p
          className="
            mt-4
            flex-grow
            text-[17px]
            leading-[1.7]
            text-slate-600
          "
        >
          {description}
        </p>

        {/* Highlights */}

        <div className="mt-7 space-y-3.5">

          <div className="flex items-start gap-3">

            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <span className="text-[15px] leading-6 text-slate-600">
              Reliable & verified market information.
            </span>

          </div>

          <div className="flex items-start gap-3">

            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <span className="text-[15px] leading-6 text-slate-600">
              Continuously updated pricing and insights.
            </span>

          </div>

        </div>

        {/* Learn More */}

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="
            mt-7
            inline-flex
            w-fit
            items-center
            gap-2
            font-semibold
            text-[#FF6B00]
            transition-all
            duration-300
            hover:gap-3
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

      {/* Feature Detail Modal */}

      {showModal && (
        <FeatureDetailModal
          feature={icon}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}