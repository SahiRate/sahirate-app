import {
  Target,
  Eye,
  Rocket,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Mission",
    description:
      "Bring price transparency to India's construction ecosystem so every purchasing decision is based on trusted information instead of guesswork.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "Become India's most trusted construction intelligence platform connecting buyers, suppliers, and market insights in one place.",
  },
  {
    icon: Rocket,
    title: "Future",
    description:
      "Expand beyond price discovery into complete construction procurement intelligence powered by SahiAI.",
  },
];

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wide text-orange-300">
            OUR VISION
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight lg:text-5xl">
            Building India's Most Trusted
            Construction Intelligence Platform
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We believe every builder, contractor, architect, dealer, developer,
            and homeowner deserves transparent market information.
            <span className="font-semibold text-white"> SahiRate </span>
            combines trusted data with
            <span className="font-semibold text-orange-300">
              {" "}SahiAI
            </span>{" "}
            to make construction purchasing more informed, transparent, and
            reliable across India.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/40 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.30)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/15 transition-all duration-300 group-hover:bg-orange-500/20">

                  <Icon
                    size={30}
                    className="text-orange-400 transition-transform duration-300 group-hover:scale-110"
                  />

                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 flex-grow leading-7 text-slate-300">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-medium text-orange-300 transition-all duration-300 group-hover:gap-3">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}