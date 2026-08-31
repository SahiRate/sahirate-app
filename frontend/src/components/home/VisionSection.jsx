import {
  Target,
  Eye,
  Rocket,
  MapPin,
  Building2,
  Globe2,
  ArrowRight,
} from "lucide-react";

const visionCards = [
  {
    number: "01",
    title: "Mission",
    icon: Target,
    text: "Bring price transparency to India's construction ecosystem so every purchasing decision is based on trusted information, not guesswork.",
  },
  {
    number: "02",
    title: "Vision",
    icon: Eye,
    text: "Become India's most trusted construction intelligence platform connecting buyers, suppliers, and market insights in one place.",
  },
  {
    number: "03",
    title: "Future",
    icon: Rocket,
    text: "Expand beyond price discovery into complete construction procurement intelligence powered by SahiAI.",
  },
];

const expansionPhases = [
  {
    number: "1",
    phase: "Phase 1 – Launch",
    location: "Deoghar",
    icon: Rocket,
    points: [
      "Pilot Market",
      "Dealer Onboarding",
      "Product Testing",
    ],
  },
  {
    number: "2",
    phase: "Phase 2 – Regional",
    location: "Godda, Dumka, Banka",
    icon: MapPin,
    points: [
      "District Level Expansion",
      "Brand Building",
    ],
  },
  {
    number: "3",
    phase: "Phase 3 – State",
    location: "Bhagalpur, Munger",
    icon: Building2,
    points: [
      "Bihar–Jharkhand Corridor",
      "Full Feature Launch",
    ],
  },
  {
    number: "4",
    phase: "Phase 4 – National",
    location: "Pan-India Platform",
    icon: Globe2,
    points: [
      "Enterprise Partnerships",
      "Complete Ecosystem",
    ],
  },
];

export default function OurVision() {
  return (
    <section className="relative overflow-hidden bg-[#061426] py-24 lg:py-28">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Orange glow */}
        <div
          className="
            absolute
            left-[8%]
            top-[30%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-orange-500/[0.06]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            right-[5%]
            top-[15%]
            h-[360px]
            w-[360px]
            rounded-full
            bg-blue-500/[0.05]
            blur-[120px]
          "
        />

        {/* Subtle construction grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">


        {/* =====================================================
            SECTION LABEL
        ===================================================== */}

        <div className="flex justify-center">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-500/30
              bg-orange-500/[0.06]
              px-5
              py-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-orange-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Our Vision
          </span>

        </div>


        {/* =====================================================
            HERO HEADING
        ===================================================== */}

        <div className="mx-auto mt-7 max-w-5xl text-center">

          <h2
            className="
              text-[2.5rem]
              font-extrabold
              leading-[1.08]
              tracking-[-0.045em]
              text-white
              sm:text-[3.5rem]
              lg:text-[4.5rem]
            "
          >
            Building India's Most Trusted
            <br />

            <span className="text-orange-500">
              Construction Intelligence Platform
            </span>
          </h2>


          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-slate-300
              sm:text-lg
            "
          >
            We believe every builder, contractor, architect, dealer,
            developer, and homeowner deserves transparent market
            information.{" "}
            <span className="font-semibold text-white">
              SahiRate
            </span>{" "}
            combines trusted data with{" "}
            <span className="font-semibold text-orange-400">
              SahiAI
            </span>{" "}
            to make construction purchasing more informed,
            transparent, and reliable across India.
          </p>

        </div>


        {/* =====================================================
            MISSION / VISION / FUTURE
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-6xl
            gap-5
            md:grid-cols-3
          "
        >

          {visionCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.number}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-500/40
                  hover:bg-white/[0.055]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                "
              >

                {/* Number */}
                <div
                  className="
                    absolute
                    right-6
                    top-5
                    text-sm
                    font-bold
                    text-white/25
                  "
                >
                  {card.number}
                </div>


                {/* Icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-500/30
                    bg-orange-500/[0.07]
                    text-orange-500
                    transition-all
                    duration-300
                    group-hover:border-orange-500/60
                    group-hover:bg-orange-500/10
                  "
                >
                  <Icon size={27} strokeWidth={1.8} />
                </div>


                {/* Title */}
                <h3
                  className="
                    mt-6
                    text-2xl
                    font-bold
                    tracking-[-0.025em]
                    text-white
                  "
                >
                  {card.title}
                </h3>


                {/* Accent */}
                <div className="mt-4 h-[2px] w-12 bg-orange-500" />


                {/* Description */}
                <p
                  className="
                    mt-5
                    text-sm
                    leading-7
                    text-slate-300
                  "
                >
                  {card.text}
                </p>

              </div>
            );
          })}

        </div>


        {/* =====================================================
            EXPANSION PLAN TITLE
        ===================================================== */}

        <div className="mt-16 flex items-center justify-center gap-4">

          <div className="hidden h-px w-24 bg-gradient-to-r from-transparent to-orange-500/60 sm:block" />

          <div
            className="
              flex
              items-center
              gap-3
              text-xs
              font-bold
              uppercase
              tracking-[0.22em]
              text-orange-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Expansion Plan
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          </div>

          <div className="hidden h-px w-24 bg-gradient-to-l from-transparent to-orange-500/60 sm:block" />

        </div>


        {/* =====================================================
            EXPANSION TIMELINE
        ===================================================== */}

        <div className="relative mx-auto mt-10 max-w-6xl">

          {/* Desktop timeline */}
          <div
            className="
              pointer-events-none
              absolute
              left-[8%]
              right-[8%]
              top-[34px]
              hidden
              h-px
              bg-gradient-to-r
              from-orange-500/20
              via-orange-500
              to-orange-500/20
              lg:block
            "
          />


          <div
            className="
              grid
              gap-8
              lg:grid-cols-4
              lg:gap-5
            "
          >

            {expansionPhases.map((phase) => {
              const Icon = phase.icon;

              return (
                <div
                  key={phase.number}
                  className="relative text-center lg:text-left"
                >

                  {/* Timeline point */}
                  <div className="relative z-10 mx-auto flex lg:mx-0">

                    <div
                      className="
                        flex
                        h-[68px]
                        w-[68px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-orange-500/50
                        bg-[#061426]
                        text-orange-500
                        shadow-[0_0_30px_rgba(255,107,0,0.12)]
                      "
                    >
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                  </div>


                  {/* Phase */}
                  <h4
                    className="
                      mt-5
                      text-base
                      font-bold
                      text-white
                    "
                  >
                    {phase.phase}
                  </h4>


                  {/* Location */}
                  <div
                    className="
                      mt-1
                      text-base
                      font-bold
                      text-orange-500
                    "
                  >
                    {phase.location}
                  </div>


                  {/* Points */}
                  <div className="mt-3 space-y-1.5">

                    {phase.points.map((point) => (
                      <div
                        key={point}
                        className="
                          flex
                          items-start
                          justify-center
                          gap-2
                          text-sm
                          leading-6
                          text-slate-300
                          lg:justify-start
                        "
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                        <span>{point}</span>
                      </div>
                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* =====================================================
            BOTTOM TAGLINE
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-12
            max-w-5xl
            rounded-2xl
            border
            border-white/10
            bg-white/[0.025]
            px-6
            py-5
            text-center
            shadow-[0_20px_60px_rgba(0,0,0,0.18)]
            sm:px-10
          "
        >

          <p className="text-base font-semibold text-white sm:text-xl">

            Har Material ka Sahi Rate.

            <span className="mx-2 text-slate-500">
              Sahi Jankari.
            </span>

            <span className="text-orange-500">
              Behtar Faisle.
            </span>

          </p>

        </div>

      </div>

    </section>
  );
}
