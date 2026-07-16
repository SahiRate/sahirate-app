import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Minus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchDailyPrices } from "../lib/api";
import SEO from "../components/SEO";

const TrendIcon = ({ trend }) => {
  if (trend === "up") {
    return <ArrowUpRight className="w-5 h-5 text-[#FF5722]" />;
  }

  if (trend === "down") {
    return <ArrowDownRight className="w-5 h-5 text-emerald-600" />;
  }

  return <Minus className="w-5 h-5 text-slate-400" />;
};

export default function LivePrices({ onOpenSearch }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDailyPrices().then(setData);

    const t = setInterval(() => {
      fetchDailyPrices().then(setData);
    }, 60000);

    return () => clearInterval(t);
  }, []);

  return (
    <>
      <SEO
        title="Live Building Material Prices Today | SahiRate"
        description="Get daily updated construction material prices including cement, steel and more."
        url="https://www.sahirate.in/prices"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>

            <div className="text-xs uppercase font-mono tracking-widest text-[#FF5722] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              Live · {data?.city ?? "Deoghar"}, Jharkhand
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight">
              Today's building material market.
            </h1>

            <p className="mt-4 text-slate-600 max-w-2xl">
              The pulse of Deoghar's construction economy — updated in real time from every listed dealer.
            </p>

          </div>

          <button
            onClick={onOpenSearch}
            data-testid="live-ask-ai-btn"
            className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#e64a1c] text-white font-semibold px-5 py-3 rounded-md self-start"
          >
            <Sparkles className="w-4 h-4" />
            Ask AI about today
          </button>

        </div>


        {!data ? (

          <div className="text-slate-500">
            Loading live board...
          </div>

        ) : (

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            data-testid="live-board"
          >

            {data.board.map((b) => (

              <Link
                key={b.slug}
                to={`/materials/${b.slug}`}
                className="group border border-slate-200 rounded-lg bg-white p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
                data-testid={`live-card-${b.slug}`}
              >

                <div className="flex items-start justify-between">

                  <div>

                    <div className="text-xs uppercase font-mono tracking-widest text-slate-500">
                      {b.unit}
                    </div>

                    <h3 className="text-lg font-bold text-[#0A192F] mt-1">
                      {b.name}
                    </h3>

                  </div>

                  <TrendIcon trend={b.trend} />

                </div>


                <div className="mt-6 flex items-baseline gap-2">

                  <span className="text-3xl font-black font-mono text-[#0A192F]">
                    ₹{b.avg}
                  </span>

                  <span className="text-xs text-slate-500">
                    avg
                  </span>

                </div>


                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">

                  <div>

                    <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                      Low
                    </div>

                    <div className="font-mono font-bold text-emerald-700">
                      ₹{b.min}
                    </div>

                  </div>


                  <div className="text-right">

                    <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                      High
                    </div>

                    <div className="font-mono font-bold text-[#FF5722]">
                      ₹{b.max}
                    </div>

                  </div>

                </div>


                <div className="mt-4 text-xs text-slate-500">

                  <span className="font-mono">
                    {b.dealer_count}
                  </span>{" "}
                  dealers offering

                </div>


              </Link>

            ))}

          </div>

        )}

      </div>
    </>
  );
}