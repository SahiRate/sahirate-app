import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Truck,
  Star,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";

import SEO from "@/seo/SEO";
import { fetchDealers } from "@/lib/api";

export default function DealersList() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [deliveryOnly, setDeliveryOnly] = useState(false);

  useEffect(() => {
    fetchDealers()
      .then((data) => {
        setDealers(Array.isArray(data) ? data : []);
      })
      .catch(() => setDealers([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return dealers.filter((dealer) => {
      const name = dealer.name?.toLowerCase() || "";
      const area = dealer.area?.toLowerCase() || "";

      if (q && !name.includes(q) && !area.includes(q)) {
        return false;
      }

      if (verifiedOnly && !dealer.verified) {
        return false;
      }

      if (deliveryOnly && !dealer.delivery) {
        return false;
      }

      return true;
    });
  }, [dealers, query, verifiedOnly, deliveryOnly]);

  return (
    <>
      <SEO
        title="Verified Building Material Dealers | SahiRate"
        description="Find trusted building material dealers in Deoghar."
        path="/dealers"
      />

      <section className="relative overflow-hidden bg-[#0A192F]">
        <div className="absolute right-[-180px] top-[-180px] h-[520px] w-[520px] rounded-full bg-[#FF6B00]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-orange-300">
            <Sparkles size={15} />
            Verified Dealer Network
          </div>

          <h1
            className="mt-8 font-extrabold text-white"
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "clamp(2.8rem,5vw,4.8rem)",
            }}
          >
            Trusted Building{" "}
            <span className="text-[#FF6B00]">
              Material Dealers
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">
            Compare verified dealers, customer ratings,
            delivery availability and contact suppliers directly.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">

            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dealer or area..."
                className="h-14 w-full rounded-xl border border-slate-200 pl-14 pr-5 outline-none focus:border-[#FF6B00]"
              />
            </div>

            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={
                verifiedOnly
                  ? "h-14 rounded-xl border px-6 border-[#0A192F] bg-[#0A192F] text-white"
                  : "h-14 rounded-xl border px-6 border-slate-200 text-slate-700"
              }
            >
              <ShieldCheck
                size={18}
                className="mr-2 inline"
              />
              Verified
            </button>

            <button
              type="button"
              onClick={() => setDeliveryOnly(!deliveryOnly)}
              className={
                deliveryOnly
                  ? "h-14 rounded-xl border px-6 border-[#0A192F] bg-[#0A192F] text-white"
                  : "h-14 rounded-xl border px-6 border-slate-200 text-slate-700"
              }
            >
              <Truck
                size={18}
                className="mr-2 inline"
              />
              Delivery
            </button>

          </div>
        </div>
      </section>      <section className="bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {loading ? (
            <div className="py-20 text-center text-slate-500">
              Loading dealers...
            </div>
          ) : filtered.length === 0 ? (

            <div className="rounded-3xl border border-slate-200 bg-white px-10 py-20 text-center">

              <Building2
                size={56}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-6 text-2xl font-bold text-[#0A192F]">
                No Dealers Found
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-8 text-slate-500">
                We couldn't find any dealer matching your search.
              </p>

            </div>

          ) : (

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {filtered.map((dealer) => (

                <Link
                  key={dealer.id}
                  to={`/dealers/${dealer.id}`}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <div className="p-8">

                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="text-2xl font-bold text-[#0A192F]">
                          {dealer.name}
                        </h3>

                        <div className="mt-2 text-slate-500">
                          {dealer.area || "Deoghar"}, Deoghar
                        </div>

                      </div>

                      <ArrowRight
                        className="text-[#FF6B00] transition group-hover:translate-x-1"
                      />

                    </div>

                    <div className="mt-8 flex items-center gap-5 text-sm">

                      <div className="flex items-center gap-2">

                        <Star
                          size={18}
                          className="fill-[#FF6B00] text-[#FF6B00]"
                        />

                        <span className="font-bold">
                          {dealer.rating ?? "N/A"}
                        </span>

                      </div>

                      <span className="text-slate-500">
                        {dealer.reviews_count ?? 0} Reviews
                      </span>

                      <span className="text-slate-500">
                        {dealer.years_in_business ?? 0} Years
                      </span>

                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">

                      {(dealer.materials_offered || [])
                        .slice(0, 5)
                        .map((item) => (

                          <span
                            key={item}
                            className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-700"
                          >
                            {item}
                          </span>

                        ))}

                      {(dealer.materials_offered || []).length > 5 && (

                        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-500">
                          +{dealer.materials_offered.length - 5}
                        </span>

                      )}

                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4">

                      <div className="flex flex-wrap gap-3">

                        {dealer.verified && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                            <ShieldCheck size={15} />
                            Verified
                          </span>
                        )}

                        {dealer.delivery && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                            <Truck size={15} />
                            Home Delivery
                          </span>
                        )}

                      </div>

                      <div className="flex shrink-0 items-center gap-2 font-semibold text-[#FF6B00]">
                        View Profile
                        <ArrowRight size={18} />
                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>
      </section>    </>
  );
}
