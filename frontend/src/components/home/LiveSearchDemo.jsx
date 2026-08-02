import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
  ArrowRight,
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
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-100 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold tracking-wide text-orange-600">
            LIVE SEARCH DEMO
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Find Material Prices in Seconds
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Search any construction material and instantly explore
            market prices, price trends, and intelligent recommendations
            powered by
            <span className="font-semibold text-slate-900">
              {" "}SahiAI
            </span>.
          </p>

        </div>

        {/* Demo */}

        <div className="mx-auto mt-16 max-w-5xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-1">

          {/* Search */}

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all duration-300 focus-within:border-orange-300">

            <Search
              className="text-orange-500"
              size={22}
            />

            <input
              type="text"
              value="TMT Steel"
              readOnly
              className="w-full bg-transparent text-lg font-medium text-slate-900 outline-none"
            />

          </div>

          {/* Results */}

          <div className="mt-8 space-y-4">

            {materials.map((item) => (

              <div
                key={item.name}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg md:flex-row md:items-center md:justify-between"
              >

                <div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-slate-500">

                    <MapPin size={16} />

                    {item.location}

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-xl font-bold text-slate-900">
                    {item.price}
                  </div>

                  <div
                    className={`mt-2 flex items-center justify-end gap-1 text-sm font-medium ${
                      item.up
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >

                    {item.up ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}

                    {item.trend}

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* SahiAI Insight */}

          <div className="mt-8 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100/40 p-6">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-orange-100 p-3">

                <BrainCircuit
                  className="text-orange-500"
                  size={24}
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                  Powered by
                </p>

                <h3 className="text-2xl font-bold text-slate-900">
                  SahiAI
                </h3>

              </div>

            </div>

            <p className="mt-5 leading-7 text-slate-700">
              Current market activity indicates stable demand for
              <span className="font-semibold">
                {" "}TMT Steel
              </span>.
              Compare prices across multiple suppliers before placing
              bulk orders to maximize savings.
            </p>

          </div>

          {/* Footer CTA */}

          <div className="mt-8 flex justify-end">

            <button className="group inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg">

              Explore Live Prices

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}