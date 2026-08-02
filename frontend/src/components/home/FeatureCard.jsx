import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

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

  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-orange-300
        hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]
      "
    >
      {/* Icon */}

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-100">

        <Icon
          className="text-orange-500 transition-transform duration-300 group-hover:scale-110"
          size={30}
        />

      </div>

      {/* Title */}

      <h3 className="text-2xl font-semibold leading-tight text-slate-900">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-4 flex-grow leading-7 text-slate-600">
        {description}
      </p>

      {/* Highlights */}

      <div className="mt-7 space-y-3">

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-emerald-500"
          />

          <span className="text-sm leading-6 text-slate-600">
            Reliable & verified market information.
          </span>

        </div>

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-emerald-500"
          />

          <span className="text-sm leading-6 text-slate-600">
            Continuously updated pricing and insights.
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center gap-2 font-medium text-orange-500 transition-all duration-300 group-hover:gap-3">

        Learn More

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

      </div>

    </div>
  );
}