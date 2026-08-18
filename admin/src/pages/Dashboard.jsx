import { useEffect, useState } from "react";
import {
  Package,
  Store,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import {
  fetchMaterials,
  fetchDailyPrices,
  getAdminDealers,
} from "../lib/api";

export default function Dashboard() {
  const [materials, setMaterials] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [prices, setPrices] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [materialsRes, dealersRes, pricesRes] =
        await Promise.all([
          fetchMaterials(),
          getAdminDealers(),
          fetchDailyPrices(),
        ]);

      setMaterials(
        Array.isArray(materialsRes.data)
          ? materialsRes.data
          : []
      );

      setDealers(
        Array.isArray(dealersRes.data?.dealers)
          ? dealersRes.data.dealers
          : []
      );

      setPrices(
        Array.isArray(pricesRes.data?.board)
          ? pricesRes.data.board
          : []
      );

    } catch (error) {
      console.error(
        "Dashboard loading failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Materials",
      value: materials.length,
      subtitle: "Registered materials",
      icon: Package,
    },
    {
      title: "Dealers",
      value: dealers.length,
      subtitle: "Registered dealers",
      icon: Store,
    },
    {
      title: "Live Prices",
      value: prices.length,
      subtitle: "Tracked materials",
      icon: TrendingUp,
    },
  ];

  const recentDealers = [...dealers]
    .sort((a, b) =>
      String(b.created_at || "").localeCompare(
        String(a.created_at || "")
      )
    )
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-[1400px]">

{/* ================= HERO ================= */}
<section className="relative overflow-hidden rounded-2xl bg-[#071a33] px-8 py-9 text-white shadow-sm">

  {/* Decorative background */}
  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

  <div className="relative flex flex-col items-center text-center">

    {/* Label */}
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
      Administration
    </p>

    {/* Heading */}
    <h1 className="mt-3 text-4xl font-bold tracking-tight !text-white">
      Dashboard

    </h1>


    {/* Description */}
    <p className="mx-auto mt-5 max-w-5xl text-center text-[16px] leading-7 text-slate-300">
  Monitor{" "}
  <span className="font-semibold text-orange-400">
    SahiRate's building material ecosystem
  </span>
  , registered dealers &{" "}
  <span className="font-semibold text-orange-400">
    market intelligence
  </span>{" "}
  — all from one place.
</p>

    {/* Refresh Action */}
    <button
      onClick={loadDashboard}
      disabled={loading}
      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/15 hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RefreshCw
        size={16}
        className={loading ? "animate-spin" : ""}
      />

      {loading ? "Refreshing..." : "Refresh Data"}
    </button>

  </div>

</section>

      {/* ================= STATS ================= */}
      <section className="mt-7 grid gap-5 md:grid-cols-3">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
                key={stat.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#071a33]">
                    {loading ? "—" : stat.value}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {stat.subtitle}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f59e0b]/10 text-[#d97706]">
                  <Icon size={20} />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-slate-400">
                View details
                <ArrowUpRight size={13} />
              </div>

            </div>
          );
        })}

      </section>

      {/* ================= CONTENT GRID ================= */}
      <section className="mt-7 grid gap-7 lg:grid-cols-[1.35fr_0.65fr]">

        {/* Recent Dealers */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Dealers
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest registered dealers in SahiRate
              </p>
            </div>

            <a
              href="/dealers"
              className="flex items-center gap-1 text-xs font-semibold text-[#d97706] hover:text-[#b45309]"
            >
              View all
              <ArrowRight size={14} />
            </a>

          </div>

          <div>

            {recentDealers.length === 0 && !loading ? (
              <div className="px-6 py-12 text-center text-sm text-slate-400">
                No dealers available.
              </div>
            ) : (
              recentDealers.map((dealer, index) => (
                <div
                  key={dealer.id || index}
                  className="flex items-center justify-between border-b border-slate-100 px-6 py-4 last:border-b-0"
                >

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071a33] text-sm font-semibold text-white">
                      {String(dealer.name || "D")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-slate-800">
                        {dealer.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {dealer.area || "Deoghar"}
                        {" • "}
                        {dealer.phone || "No phone"}
                      </p>

                    </div>

                  </div>

                  <div className="ml-4 flex shrink-0 items-center gap-2">

                    {dealer.verified && (
                      <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 sm:inline-flex">
                        Verified
                      </span>
                    )}

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
                      Active
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>
        </div>

        {/* Market Snapshot */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <h2 className="text-base font-semibold text-slate-900">
              Market Snapshot
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Current material price overview
            </p>

          </div>

          <div className="divide-y divide-slate-100">

            {prices.slice(0, 5).map((price) => (

              <div
                key={price.slug}
                className="flex items-center justify-between px-6 py-4"
              >

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {price.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {price.dealer_count || 0} dealers
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-sm font-bold text-[#071a33]">
                    ₹{Number(price.avg || 0).toLocaleString("en-IN")}
                  </p>

                  <p
                    className={[
                      "mt-1 text-[11px] font-semibold",
                      price.trend === "up"
                        ? "text-red-500"
                        : price.trend === "down"
                        ? "text-emerald-600"
                        : "text-slate-400",
                    ].join(" ")}
                  >
                    {price.trend === "up"
                      ? "↑ Rising"
                      : price.trend === "down"
                      ? "↓ Falling"
                      : "→ Stable"}
                  </p>

                </div>

              </div>

            ))}

            {prices.length === 0 && !loading && (
              <div className="px-6 py-10 text-center text-sm text-slate-400">
                No market data available.
              </div>
            )}

          </div>

        </div>

      </section>

      {/* ================= FOOTER INFO ================= */}
      <section className="mt-7 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold text-slate-800">
              SahiRate Admin Console
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Manage materials, dealers and building material intelligence.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 SahiRate
          </p>

        </div>

      </section>

    </div>
  );
}
