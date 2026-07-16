import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Truck,
  Sparkles,
  TrendingUp,
  BadgeIndianRupee,
  Building2
} from "lucide-react";

import SEO from "@/seo/SEO";
import { fetchMaterial } from "@/lib/api";

function TrendPill({ trend, previous, current }) {
  const diff = current - previous;

  const pct =
    previous > 0
      ? ((diff / previous) * 100).toFixed(1)
      : "0.0";

  if (trend === "up") {
    return (
      <div className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-600 px-3 py-1 text-xs font-semibold">
        <ArrowUpRight size={14} />
        +{pct}%
      </div>
    );
  }

  if (trend === "down") {
    return (
      <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-600 px-3 py-1 text-xs font-semibold">
        <ArrowDownRight size={14} />
        {pct}%
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-xs font-semibold">
      <Minus size={14} />
      Stable
    </div>
  );
}

function PriceCard({
  title,
  value,
  highlight = false
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        highlight
          ? "border-[#FF6B00] bg-orange-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">

        {title}

      </div>

      <div
        className={`mt-3 text-3xl font-black ${
          highlight
            ? "text-[#FF6B00]"
            : "text-[#0A192F]"
        }`}
      >
        ₹{value ?? "--"}
      </div>
    </div>
  );
}

export default function MaterialDetail() {

  const { slug } = useParams();

  const [data, setData] = useState(null);

  const [sort, setSort] = useState("price");

  useEffect(() => {

    setData(null);

    fetchMaterial(slug)

      .then(setData)

      .catch(() =>
        setData({
          error: true
        })
      );

  }, [slug]);

  const comparison = useMemo(() => {

    if (!data?.comparison)
      return [];

    const list = [...data.comparison];

    switch (sort) {

      case "rating":

        list.sort(
          (a, b) =>
            b.rating - a.rating
        );

        break;

      default:

        list.sort(
          (a, b) =>
            a.price - b.price
        );
    }

    return list;

  }, [data, sort]);

  if (!data) {

    return (
      <div className="max-w-7xl mx-auto py-24 px-6">

        Loading material...

      </div>
    );

  }

  if (data.error) {

    return (
      <div className="max-w-7xl mx-auto py-24 px-6">

        Material not found.

      </div>
    );

  }

  const cheapest = comparison[0];

  return (
    <>

      <SEO
        title={`${data.name} Price in Deoghar | SahiRate`}
        description={data.description}
        path={`/materials/${slug}`}
      />

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="bg-[#0A192F] overflow-hidden relative">

        <div className="absolute right-[-200px] top-[-150px] w-[500px] h-[500px] rounded-full bg-[#FF6B00]/20 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative">

          <Link
            to="/materials"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
          >

            <ArrowLeft size={18} />

            Back to Materials

          </Link>

          <div className="grid lg:grid-cols-[420px_1fr] gap-14 items-center mt-12">

            <div className="rounded-[28px] overflow-hidden shadow-2xl">

              <img
                src={data.image}
                alt={data.name}
                className="w-full aspect-[4/3] object-cover"
              />

            </div>

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-5 py-2 text-orange-300">

                <Sparkles size={15} />

                Live Material Price

              </div>

              <h1
                className="mt-7 text-white font-extrabold leading-tight"
                style={{
                  fontFamily:
                    "Plus Jakarta Sans",
                  fontSize:
                    "clamp(2.7rem,5vw,4.6rem)"
                }}
              >
                {data.name}
              </h1>

              <p className="mt-6 text-slate-300 leading-8 max-w-2xl">

                {data.description}

              </p>

              <div className="mt-10 grid sm:grid-cols-3 gap-5">

                <PriceCard
                  title="Lowest"
                  value={data.stats?.min}
                />

                <PriceCard
                  title="Average"
                  value={data.stats?.avg}
                  highlight
                />

                <PriceCard
                  title="Highest"
                  value={data.stats?.max}
                />

              </div>              <div className="mt-10 flex flex-wrap gap-3">

                {(data.brands || []).map((brand) => (

                  <span
                    key={brand}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                  >
                    {brand}
                  </span>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* MARKET OVERVIEW */}
      {/* ================================================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid xl:grid-cols-[1.6fr_420px] gap-10">

            {/* Left */}

            <div>

              <div className="flex items-center gap-3">

                <TrendingUp className="text-[#FF6B00]" />

                <h2 className="text-3xl font-bold text-[#0A192F]">

                  Market Overview

                </h2>

              </div>

              <p className="mt-6 text-slate-600 leading-8">

                Compare prices from verified dealers in Deoghar.
                The comparison below helps you identify the best
                available price before placing an order.

              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div className="rounded-2xl border border-slate-200 p-6">

                  <div className="flex items-center gap-3">

                    <BadgeIndianRupee
                      className="text-[#FF6B00]"
                    />

                    <span className="font-semibold">

                      Average Price

                    </span>

                  </div>

                  <div className="mt-5 text-4xl font-black text-[#0A192F]">

                    ₹{data.stats?.avg}

                  </div>

                  <div className="mt-2 text-slate-500 text-sm">

                    {data.unit}

                  </div>

                </div>

                <div className="rounded-2xl border border-slate-200 p-6">

                  <div className="flex items-center gap-3">

                    <Building2
                      className="text-[#FF6B00]"
                    />

                    <span className="font-semibold">

                      Dealers

                    </span>

                  </div>

                  <div className="mt-5 text-4xl font-black text-[#0A192F]">

                    {data.stats?.dealer_count || 0}

                  </div>

                  <div className="mt-2 text-slate-500 text-sm">

                    Verified Sellers

                  </div>

                </div>

                <div className="rounded-2xl border border-slate-200 p-6">

                  <div className="flex items-center gap-3">

                    <MapPin
                      className="text-[#FF6B00]"
                    />

                    <span className="font-semibold">

                      Location

                    </span>

                  </div>

                  <div className="mt-5 text-3xl font-black text-[#0A192F]">

                    Deoghar

                  </div>

                  <div className="mt-2 text-slate-500 text-sm">

                    Jharkhand

                  </div>

                </div>

              </div>

            </div>

            {/* Cheapest Dealer */}

            <div className="rounded-3xl bg-[#0A192F] p-8 text-white">

              <div className="text-sm uppercase tracking-[0.25em] text-orange-300">

                Best Price Today

              </div>

              <h3 className="mt-4 text-3xl font-bold">

                {cheapest?.dealer_name}

              </h3>

              <div className="mt-4 flex items-center gap-2 text-slate-300">

                <MapPin size={16} />

                {cheapest?.area}

              </div>

              <div className="mt-8 text-5xl font-black text-[#FF6B00]">

                ₹{cheapest?.price}

              </div>

              <div className="mt-2 text-slate-400">

                {data.unit}

              </div>

              <div className="mt-8">

                <TrendPill
                  trend={cheapest?.trend}
                  previous={cheapest?.previous_price}
                  current={cheapest?.price}
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* DEALER COMPARISON */}
      {/* ================================================= */}

      <section className="py-20 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="flex flex-wrap justify-between items-center gap-4 mb-10">

            <h2 className="text-3xl font-bold text-[#0A192F]">

              Dealer Comparison

            </h2>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-slate-200 px-5 py-3"
            >

              <option value="price">
                Lowest Price
              </option>

              <option value="rating">
                Highest Rating
              </option>

            </select>

          </div>          <div className="grid gap-6">

            {comparison.map((dealer, index) => (

              <div
                key={`${dealer.dealer_id}-${index}`}
                className="rounded-3xl bg-white border border-slate-200 p-7 hover:shadow-xl transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  {/* Dealer Info */}

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <Link
                        to={`/dealers/${dealer.dealer_id}`}
                        className="text-2xl font-bold text-[#0A192F] hover:text-[#FF6B00]"
                      >
                        {dealer.dealer_name}
                      </Link>

                      {dealer.verified && (

                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">

                          <ShieldCheck size={14} />

                          Verified

                        </span>

                      )}

                    </div>

                    <div className="mt-4 flex flex-wrap gap-5 text-slate-500 text-sm">

                      <span className="inline-flex items-center gap-2">

                        <MapPin size={15} />

                        {dealer.area}

                      </span>

                      <span>

                        ⭐ {dealer.rating}

                      </span>

                      {dealer.delivery && (

                        <span className="inline-flex items-center gap-2">

                          <Truck size={15} />

                          Delivery Available

                        </span>

                      )}

                    </div>

                  </div>

                  {/* Price */}

                  <div className="text-center">

                    <div className="text-sm uppercase tracking-[0.25em] text-slate-500">

                      Today's Price

                    </div>

                    <div className="mt-2 text-5xl font-black text-[#0A192F]">

                      ₹{dealer.price}

                    </div>

                    <div className="mt-2 text-slate-500">

                      {data.unit}

                    </div>

                    <div className="mt-5 flex justify-center">

                      <TrendPill
                        trend={dealer.trend}
                        previous={dealer.previous_price}
                        current={dealer.price}
                      />

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex flex-col gap-3 lg:w-[180px]">

                    <a
                      href={`tel:${dealer.phone}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#0A192F] text-white py-3 font-semibold hover:bg-[#132947] transition"
                    >

                      <Phone size={18} />

                      Call Dealer

                    </a>

                    <a
                      href={`https://wa.me/${dealer.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366] text-[#25D366] py-3 font-semibold hover:bg-[#25D366] hover:text-white transition"
                    >

                      <MessageCircle size={18} />

                      WhatsApp

                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* AI INSIGHTS */}
      {/* ================================================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="rounded-[32px] bg-gradient-to-r from-[#0A192F] to-[#102B50] text-white overflow-hidden">

            <div className="p-10 lg:p-14">

              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-orange-300">

                <Sparkles size={15} />

                AI Market Insight

              </div>

              <h2
                className="mt-6 font-extrabold"
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "clamp(2rem,4vw,3.4rem)"
                }}
              >
                Before buying {data.name},
                compare at least 3 verified dealers.
              </h2>

              <p className="mt-6 text-slate-300 leading-8 max-w-3xl">

                Prices may vary depending on delivery location,
                brand availability, transportation cost and market demand.
                SahiRate helps you identify the best available deal before purchasing.

              </p>

            </div>

          </div>

        </div>

      </section>      {/* ================================================= */}
      {/* BUYING TIPS */}
      {/* ================================================= */}

      <section className="py-20 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center">

            <span className="uppercase tracking-[0.25em] text-[#FF6B00] text-sm font-semibold">

              Buying Tips

            </span>

            <h2
              className="mt-5 font-extrabold text-[#0A192F]"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "clamp(2rem,4vw,3.3rem)"
              }}
            >
              Purchase Smarter with SahiRate
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                title: "Compare Multiple Dealers",
                text: "Always compare prices from at least three verified dealers before placing an order."
              },
              {
                title: "Check Delivery Charges",
                text: "A lower product price may include higher delivery charges. Verify the total cost."
              },
              {
                title: "Confirm Stock Availability",
                text: "Contact the dealer before visiting to ensure the material is currently available."
              }
            ].map((tip) => (

              <div
                key={tip.title}
                className="rounded-3xl bg-white border border-slate-200 p-8 hover:shadow-lg transition"
              >

                <h3 className="text-xl font-bold text-[#0A192F]">

                  {tip.title}

                </h3>

                <p className="mt-5 text-slate-600 leading-8">

                  {tip.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="rounded-[32px] bg-[#0A192F] overflow-hidden">

            <div className="px-10 py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row justify-between items-center gap-10">

              <div>

                <h2
                  className="text-white font-extrabold"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "clamp(2rem,4vw,3.5rem)"
                  }}
                >

                  Know the Right Price.
                  <br />

                  Build with Confidence.

                </h2>

                <p className="mt-6 text-slate-300 max-w-2xl leading-8">

                  Compare prices, connect with trusted dealers
                  and make better construction decisions with
                  SahiRate.

                </p>

              </div>

              <div className="flex flex-wrap gap-4">

                <Link
                  to="/materials"
                  className="px-8 py-4 rounded-xl bg-[#FF6B00] text-white font-semibold hover:bg-[#eb5d00] transition"
                >
                  Compare Materials
                </Link>

                <Link
                  to="/dealers"
                  className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
                >
                  View Dealers
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}