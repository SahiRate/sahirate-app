import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const materials = [
  {
    name: "TMT Steel",
    location: "Deoghar Market",
    price: "₹58,200 / MT",
    trend: "+2.4%",
    up: true,
  },
  {
    name: "Cement OPC 53",
    location: "Jasidih",
    price: "₹398 / Bag",
    trend: "-1.2%",
    up: false,
  },
  {
    name: "River Sand",
    location: "Dumka",
    price: "₹52 / CFT",
    trend: "+0.8%",
    up: true,
  },
];

export default function LiveSearchDemo() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">

      {/* Soft background glow */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-24
          h-[420px] w-[420px]
          -translate-x-1/2
          rounded-full
          bg-orange-100/50
          blur-[130px]
        "
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">

        {/* =========================
            HEADING
        ========================== */}
        <div className="mx-auto max-w-4xl text-center">

          <span
            className="
              inline-flex items-center
              rounded-full
              border border-orange-200
              bg-orange-50
              px-5 py-2
              text-[11px] sm:text-[12px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-orange-600
            "
          >
            LIVE SEARCH DEMO
          </span>

          <h2
            className="
              mt-5
              text-[38px]
              font-black
              leading-[1.08]
              tracking-[-0.045em]
              text-[#0A192F]
              sm:text-[46px]
              md:text-[54px]
              lg:text-[60px]
            "
          >
            Find Material Prices in Seconds
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[760px]
              text-[16px]
              leading-7
              text-slate-600
              sm:text-[18px]
              sm:leading-8
            "
          >
            Search any construction material and instantly explore
            market prices, price trends, and intelligent recommendations
            powered by{" "}
            <span className="font-semibold text-[#0A192F]">
              SahiAI
            </span>
            .
          </p>

        </div>

        {/* =========================
            SEARCH DEMO
        ========================== */}
        <div
          className="
            mx-auto
            mt-10
            max-w-6xl
            rounded-[28px]
            border border-slate-200
            bg-white
            p-5
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            sm:mt-12
            sm:p-7
            md:p-8
          "
        >

          {/* Search box */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border border-slate-200
              bg-slate-50/70
              px-4
              py-3.5
              transition-all
              duration-300
              focus-within:border-orange-300
              focus-within:bg-white
              focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.06)]
            "
          >
            <Search
              size={21}
              strokeWidth={2}
              className="shrink-0 text-orange-500"
            />

            <input
              type="text"
              value="TMT Steel"
              readOnly
              aria-label="Search material"
              className="
                w-full
                bg-transparent
                text-[16px]
                font-medium
                text-[#0A192F]
                outline-none
                sm:text-[17px]
              "
            />
          </div>

          {/* =========================
              RESULTS
          ========================== */}
          <div className="mt-5 space-y-3">

            {materials.map((item, index) => (
              <div
                key={item.name}
                className="
                  group
                  flex
                  min-h-[92px]
                  flex-col
                  justify-between
                  gap-4
                  rounded-[20px]
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-4
                  transition-all
                  duration-300
                  hover:-translate-y-[1px]
                  hover:border-orange-300
                  hover:shadow-[0_12px_32px_rgba(15,23,42,0.07)]
                  sm:flex-row
                  sm:items-center
                  sm:px-6
                "
              >

                {/* Material information */}
                <div className="min-w-0">

                  <div className="flex items-center gap-3">

                    <span
                      className="
                        hidden
                        text-[10px]
                        font-bold
                        tracking-[0.14em]
                        text-slate-300
                        sm:inline
                      "
                    >
                      0{index + 1}
                    </span>

                    <h3
                      className="
                        text-[19px]
                        font-bold
                        tracking-[-0.02em]
                        text-[#0A192F]
                        sm:text-[21px]
                      "
                    >
                      {item.name}
                    </h3>

                  </div>

                  <div
                    className="
                      mt-1.5
                      flex
                      items-center
                      gap-1.5
                      text-[13px]
                      text-slate-500
                    "
                  >
                    <MapPin size={15} />
                    {item.location}
                  </div>

                </div>

                {/* Price */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    sm:justify-end
                  "
                >

                  <div
                    className="
                      text-[20px]
                      font-black
                      tracking-[-0.025em]
                      text-[#0A192F]
                      sm:text-[23px]
                    "
                  >
                    {item.price}
                  </div>

                  <div
                    className={`
                      flex
                      shrink-0
                      items-center
                      gap-1
                      text-[13px]
                      font-semibold
                      ${
                        item.up
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }
                    `}
                  >
                    {item.up ? (
                      <TrendingUp size={15} />
                    ) : (
                      <TrendingDown size={15} />
                    )}

                    {item.trend}
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Small footer hint */}
          <div className="mt-5 text-center">
            <p className="text-[11px] text-slate-400">
              Live market information • Updated regularly
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}