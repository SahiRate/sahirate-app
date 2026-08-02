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
    <section className="relative overflow-hidden bg-slate-900 pt-24 pb-20 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2.5 text-[13px] font-semibold tracking-[0.16em] text-orange-300">
            OUR VISION
          </span>

          <h2 className="mt-5 text-[40px] font-black leading-[1.08] tracking-[-0.04em] md:text-[52px] lg:text-[60px]">
            Building India's Most Trusted
            Construction Intelligence Platform
          </h2>

          <p className="mx-auto mt-7 max-w-[820px] text-[18px] leading-8 text-slate-300 md:text-[20px]">
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

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/40 hover:bg-white/10 hover:shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/15 transition-all duration-300 group-hover:bg-orange-500/20">

                  <Icon
                    size={30}
                    className="text-orange-400 transition-transform duration-300 group-hover:scale-110"
                  />

                </div>

                <h3 className="mt-6 text-[30px] font-bold tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-4 flex-grow text-[17px] leading-[1.75] text-slate-300">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-orange-300 transition-all duration-300 group-hover:gap-3">

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