import {
  ShieldCheck,
  Database,
  Clock3,
  BadgeCheck,
} from "lucide-react";

export default function WhySahiRate() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-28">

      {/* Subtle Background Accent */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-orange-100/50
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-[360px]
          w-[360px]
          rounded-full
          bg-slate-200/60
          blur-[100px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-4xl text-center">

          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-orange-200
              bg-white
              px-5
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#FF6B00]
              shadow-sm
            "
          >
            Why Trust SahiRate
          </span>

          <h2
            className="
              mt-7
              font-extrabold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#0A192F]
              text-[2.6rem]
              sm:text-[3.4rem]
              lg:text-[4.25rem]
            "
            style={{
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Information You Can Trust.
            <br />
            <span className="text-[#FF6B00]">
              Decisions You Can Feel Good About.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-slate-600
              sm:text-lg
            "
          >
            SahiRate combines verified market information, transparent
            pricing, and SahiAI insights to help every construction
            professional make smarter and more confident purchasing decisions.
          </p>

        </div>


        {/* ================= 4 TRUST CARDS ================= */}

        <div
          className="
            mt-16
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {/* CARD 01 */}

          <div
            className="
              group
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-[0_10px_35px_rgba(15,23,42,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-200
              hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[18px]
                bg-orange-50
                text-[#FF6B00]
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <ShieldCheck
                size={32}
                strokeWidth={1.8}
              />
            </div>

            <h3
              className="
                mt-7
                text-2xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#0A192F]
              "
            >
              Verified
              <br />
              Information
            </h3>

            <p
              className="
                mt-5
                text-base
                leading-7
                text-slate-600
              "
            >
              Material prices are collected from trusted market sources
              and verified supplier networks.
            </p>

          </div>


          {/* CARD 02 */}

          <div
            className="
              group
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-[0_10px_35px_rgba(15,23,42,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-200
              hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[18px]
                bg-orange-50
                text-[#FF6B00]
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Database
                size={32}
                strokeWidth={1.8}
              />
            </div>

            <h3
              className="
                mt-7
                text-2xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#0A192F]
              "
            >
              Reliable Market
              <br />
              Data
            </h3>

            <p
              className="
                mt-5
                text-base
                leading-7
                text-slate-600
              "
            >
              Continuously updated market information helps you make
              informed purchasing decisions with confidence.
            </p>

          </div>


          {/* CARD 03 */}

          <div
            className="
              group
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-[0_10px_35px_rgba(15,23,42,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-200
              hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[18px]
                bg-orange-50
                text-[#FF6B00]
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Clock3
                size={32}
                strokeWidth={1.8}
              />
            </div>

            <h3
              className="
                mt-7
                text-2xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#0A192F]
              "
            >
              Regular
              <br />
              Updates
            </h3>

            <p
              className="
                mt-5
                text-base
                leading-7
                text-slate-600
              "
            >
              Prices, trends, and insights are refreshed frequently
              to reflect changing market conditions.
            </p>

          </div>


          {/* CARD 04 */}

          <div
            className="
              group
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-[0_10px_35px_rgba(15,23,42,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-200
              hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[18px]
                bg-orange-50
                text-[#FF6B00]
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <BadgeCheck
                size={32}
                strokeWidth={1.8}
              />
            </div>

            <h3
              className="
                mt-7
                text-2xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#0A192F]
              "
            >
              Built for
              <br />
              Professionals
            </h3>

            <p
              className="
                mt-5
                text-base
                leading-7
                text-slate-600
              "
            >
              Designed for builders, contractors, architects, dealers,
              developers, and homeowners across India.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
