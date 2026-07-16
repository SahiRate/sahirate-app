import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Search,
  Filter,
  Sparkles,
  TrendingUp
} from "lucide-react";
import SEO from "../components/SEO";
import { fetchMaterials } from "@/lib/api";

export default function MaterialsList() {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {

    fetchMaterials()

      .then((data) => {

        setMaterials(data);

        setLoading(false);

      })

      .catch(() => {

        setLoading(false);

      });

  }, []);

  const filtered = useMemo(() => {

    let data = [...materials];

    if (search.trim()) {

      data = data.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );

    }

    switch (sortBy) {

      case "price":

        data.sort(
          (a, b) =>
            (b.stats?.avg || 0) -
            (a.stats?.avg || 0)
        );

        break;

      case "dealer":

        data.sort(
          (a, b) =>
            (b.stats?.dealer_count || 0) -
            (a.stats?.dealer_count || 0)
        );

        break;

      default:

        data.sort((a, b) => a.name.localeCompare(b.name));

    }

    return data;

  }, [materials, search, sortBy]);

  return (

    <>

      <SEO
 title="Building Materials Price List | SahiRate"
 description="Check latest cement, steel, sand and construction material prices from trusted sources."
 url="https://www.sahirate.in/materials"
/>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="bg-[#0A192F] relative overflow-hidden">

        <div className="absolute right-[-200px] top-[-200px] w-[500px] h-[500px] rounded-full bg-[#FF6B00]/20 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative">

          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-2 text-orange-300">

            <Sparkles size={16} />

            Building Materials

          </div>

          <h1
            className="mt-8 text-white font-extrabold"
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "clamp(2.8rem,5vw,4.8rem)"
            }}
          >

            Compare Every
            <span className="text-[#FF6B00]">
              {" "}Building Material
            </span>

          </h1>

          <p className="mt-8 text-slate-300 max-w-2xl text-lg leading-9">

            Daily updated prices from verified dealers.
            Compare average, minimum and maximum prices
            before buying.

          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* FILTER BAR */}
      {/* ================================================= */}

      <section className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

          <div className="grid lg:grid-cols-[1fr_220px] gap-5">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search materials..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 rounded-xl border border-slate-200 pl-14 pr-5 outline-none focus:border-[#FF6B00]"
              />

            </div>

            <div className="relative">

              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-14 rounded-xl border border-slate-200 pl-12 pr-5 outline-none appearance-none bg-white"
              >

                <option value="name">
                  Sort by Name
                </option>

                <option value="price">
                  Highest Price
                </option>

                <option value="dealer">
                  Dealer Count
                </option>

              </select>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* MATERIAL GRID */}
      {/* ================================================= */}

      <section className="py-20 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {loading ? (

            <div className="text-center text-slate-500">

              Loading materials...

            </div>

          ) : (

            <div
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
              data-testid="materials-grid"
            >
              {filtered.map((m) => {

                const trend =
                  m.stats?.avg && m.stats?.min
                    ? m.stats.avg >
                      (m.stats.min + m.stats.max) / 2
                      ? "up"
                      : "down"
                    : "flat";

                return (

                  <Link
                    key={m.slug}
                    to={`/materials/${m.slug}`}
                    className="group bg-white rounded-[28px] overflow-hidden border border-slate-200 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                  >

                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">

                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />

                    </div>

                    <div className="p-7">

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="text-2xl font-bold text-[#0A192F]">

                            {m.name}

                          </h3>

                          <div className="text-slate-500 mt-1">

                            {m.unit}

                          </div>

                        </div>

                        <ArrowRight className="text-[#FF6B00] group-hover:translate-x-1 transition" />

                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-8">

                        <Stat
                          label="Min"
                          value={m.stats?.min}
                          tone="down"
                        />

                        <Stat
                          label="Average"
                          value={m.stats?.avg}
                          tone="flat"
                        />

                        <Stat
                          label="Max"
                          value={m.stats?.max}
                          tone="up"
                        />

                      </div>

                      <div className="mt-8 flex justify-between items-center">

                        <div className="text-sm text-slate-500">

                          <span className="font-bold text-[#0A192F]">

                            {m.stats?.dealer_count || 0}

                          </span>

                          {" "}Verified Dealers

                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold">

                          {trend === "up" && (
                            <>
                              <ArrowUpRight
                                size={16}
                                className="text-red-500"
                              />
                              <span className="text-red-500">

                                Rising

                              </span>
                            </>
                          )}

                          {trend === "down" && (
                            <>
                              <ArrowDownRight
                                size={16}
                                className="text-emerald-600"
                              />
                              <span className="text-emerald-600">

                                Stable

                              </span>
                            </>
                          )}

                          {trend === "flat" && (
                            <>
                              <Minus
                                size={16}
                                className="text-slate-400"
                              />
                              <span className="text-slate-500">

                                Flat

                              </span>
                            </>
                          )}

                        </div>

                      </div>

                    </div>

                  </Link>

                );

              })}

            </div>

          )}

        </div>

      </section>

    </>

  );

}

function Stat({ label, value, tone }) {

  const color =
    tone === "up"
      ? "text-red-500"
      : tone === "down"
      ? "text-emerald-600"
      : "text-[#0A192F]";

  return (

    <div className="rounded-xl border border-slate-200 p-4">

      <div className="text-[11px] uppercase tracking-widest text-slate-400">

        {label}

      </div>

      <div className={`mt-2 text-xl font-extrabold ${color}`}>

        ₹{value ?? "--"}

      </div>

    </div>

  );

}