import {
  Building2,
  HardHat,
  Compass,
  Store,
  House,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

const icons = {
  builders: Building2,
  contractors: HardHat,
  engineers: BriefcaseBusiness,
  architects: Compass,
  dealers: Store,
  homeowners: House,
};

export default function TrustCard({
  icon,
  title,
  description,
}) {
  const Icon = icons[icon];

  return (
    <div className="group flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">

      {/* Icon */}

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] bg-orange-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-100">

        <Icon
          size={30}
          strokeWidth={2}
          className="text-orange-500 transition-transform duration-300 group-hover:scale-110"
        />

      </div>

      {/* Content */}

      <h3 className="text-[30px] font-bold tracking-[-0.03em] leading-none text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-[17px] flex-grow leading-[1.75] text-slate-600">
        {description}
      </p>

      {/* Footer */}

      <div className="mt-8 flex items-center gap-2 font-semibold text-orange-500 transition-all duration-300 group-hover:gap-3">

        Learn More

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

      </div>

    </div>
  );
}