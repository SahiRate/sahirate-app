import { Boxes, Store, MapPin, Activity } from "lucide-react";

const stats = [
  {
    icon: Boxes,
    value: "5,000+",
    label: "Materials",
  },
  {
    icon: Store,
    value: "500+",
    label: "Dealers",
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Cities",
  },
  {
    icon: Activity,
    value: "Live",
    label: "Updates",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
          >
            <div className="mb-4 inline-flex rounded-xl bg-[#FF6B00]/15 p-3">
              <Icon className="h-6 w-6 text-[#FF6B00] transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="text-3xl font-extrabold tracking-tight text-white">
              {item.value}
            </div>

            <div className="mt-2 text-sm font-medium text-slate-400">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}