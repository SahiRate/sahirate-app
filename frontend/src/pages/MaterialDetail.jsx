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

import SEO from "../components/SEO";
import { fetchMaterial } from "@/lib/api";

import accLogo from "../assets/brands/adani_acc_logo.jpg";
import ambujaLogo from "../assets/brands/adani_ambuja_logo.jpg";
import ultraTechLogo from "../assets/brands/ultratech-cement-logo.png";
import nuvocoLogo from "../assets/brands/nuvoco.png";
import shreeLogo from "../assets/brands/shreecementlogo.jpg";
import dalmiaLogo from "../assets/brands/dalmia-bharat-cement.svg";
import emamiLogo from "../assets/brands/emamilogo.png";

import tataSteelLogo from "../assets/brands/tmt/tata-steel.webp";
import jindalSteelLogo from "../assets/brands/tmt/jindal-steel.png";
import sailLogo from "../assets/brands/tmt/sail.jpg";
import mongiaLogo from "../assets/brands/tmt/mongia-steel.png";
import salujaLogo from "../assets/brands/tmt/Saluja.png";
import shyamSteelLogo from "../assets/brands/tmt/shyam-steel.jpg";
import kay2Logo from "../assets/brands/tmt/kay2.svg";
import rungtaLogo from "../assets/brands/tmt/rungta-steel.png";
import jswLogo from "../assets/brands/tmt/jsw.png";
import kamdhenuLogo from "../assets/brands/tmt/kamdhenu.webp";
import captainLogo from "../assets/brands/tmt/captain-steel.webp";
import maithanLogo from "../assets/brands/tmt/maithan-steel.png";
import neoLogo from "../assets/brands/tmt/neo-steel.svg";
import stecolLogo from "../assets/brands/tmt/stecol.png";
import vizagLogo from "../assets/brands/tmt/vizag-steel.jpg";


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
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-[#FF6B00] bg-orange-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
        {title}
      </div>

      <div
        className={`mt-2 text-2xl font-black ${
          highlight
            ? "text-[#FF6B00]"
            : "text-[#0A192F]"
        }`}
      >
        {value !== undefined && value !== null && value !== 0
          ? `₹${value}`
          : "NA"}
      </div>
    </div>
  );
}


const brandLogoMap = {
  ACC: {
    logo: accLogo,
    website: "https://www.acclimited.com/",
  },

  Ambuja: {
    logo: ambujaLogo,
    website: "https://www.ambujacement.com/",
  },

  UltraTech: {
    logo: ultraTechLogo,
    website: "https://www.ultratechcement.com/",
  },

  "Shree Cement": {
    logo: shreeLogo,
    website: "https://www.shreecement.com/",
  },

  Nuvoco: {
    logo: nuvocoLogo,
    website: "https://www.nuvoco.com/",
  },

  "Nuvoco Cement": {
    logo: nuvocoLogo,
    website: "https://www.nuvoco.com/",
  },

  Dalmia: {
    logo: dalmiaLogo,
    website: "https://www.dalmiacement.com/",
  },

  Emami: {
    logo: emamiLogo,
    website: "https://www.emamicement.com/",
  },
};


const tmtBrandLogoMap = {
  Tata: {
    logo: tataSteelLogo,
    website: "https://www.tatatiscon.co.in/",
  },

  "Jindal Panther": {
    logo: jindalSteelLogo,
    website: "https://www.jindalpanther.com/",
  },

  SAIL: {
    logo: sailLogo,
    website: "https://www.sail.co.in/",
  },

  Mongia: {
    logo: mongiaLogo,
    website: "https://mongiasteel.com/",
  },

  Saluja: {
    logo: salujaLogo,
    website: "https://www.salujagold.com/",
  },

  "Shyam Steel": {
    logo: shyamSteelLogo,
    website: "https://www.shyamsteel.com/",
  },

  Kay2: {
    logo: kay2Logo,
    website: "https://www.kay2steel.com/",
  },

  Rungta: {
    logo: rungtaLogo,
    website: "https://www.rungtasteel.com/",
  },

  JSW: {
    logo: jswLogo,
    website: "https://www.jsw.in/",
  },

  Kamdhenu: {
    logo: kamdhenuLogo,
    website: "https://www.kamdhenu.com/",
  },

  Captain: {
    logo: captainLogo,
    website: "https://captainsteel.com/",
  },

  Maithan: {
    logo: maithanLogo,
    website: "https://www.maithansteel.com/",
  },

  Neo: {
    logo: neoLogo,
    website: "https://neosteel.in/",
  },

  Stecol: {
    logo: stecolLogo,
    website: "https://www.stecolsteel.com/",
  },

  Vizag: {
    logo: vizagLogo,
    website: "https://www.vizagsteel.com/",
  },
};
function BrandCard({ brand }) {
  const config = brandLogoMap[brand.brand];

  if (!config) {
    return null;
  }

  return (
    <a
      href={config.website}
      target="_blank"
      rel="noopener noreferrer"
      title={`Visit ${brand.brand} official website`}
      className="group relative flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-[#FF6B00]/50 hover:shadow-md"
    >
      <img
        src={config.logo}
        alt={`${brand.brand} logo`}
        className="max-h-16 max-w-[180px] w-auto object-contain"
      />

      <ArrowUpRight
        size={16}
        className="absolute right-3 top-3 text-slate-400 transition group-hover:text-[#FF6B00]"
      />
    </a>
  );
}


function TMTBrandCard({ brand }) {
  const config = tmtBrandLogoMap[brand.name];

  if (!config || !config.logo) {
    return null;
  }

  return (
    <a
      href={config.website}
      target="_blank"
      rel="noopener noreferrer"
      title={`Visit ${brand.name} official website`}
      className="group relative flex h-[76px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-2.5 py-2 transition-all duration-200 hover:border-[#FF6B00]/50 hover:shadow-md"
    >
      <div className="flex h-[52px] w-full items-center justify-center overflow-hidden">
        <img
          src={config.logo}
          alt={`${brand.name} logo`}
          className="block h-[42px] w-[108px] object-contain"
        />
      </div>

      <ArrowUpRight
        size={12}
        className="absolute right-1.5 top-1.5 text-slate-300 transition-colors group-hover:text-[#FF6B00]"
      />
    </a>
  );
}


function InsightCard({ data }) {
  return (
    <div className="rounded-3xl bg-[#0A192F] p-7 text-white">

      <div className="flex items-center gap-2 text-[#FF6B00]">
        <Sparkles size={19} />

        <span className="text-xs font-bold uppercase tracking-[0.22em]">
          AI Market Insight
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-extrabold leading-tight text-white">
        Before buying {data.name}, compare at least 3 verified dealers.
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-300">
        Prices may vary depending on delivery location, brand availability,
        transportation cost and market demand.
      </p>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        SahiRate helps you identify the best available deal before purchasing.
      </p>

    </div>
  );
}
export default function MaterialDetail() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [sort, setSort] = useState("price");
  const [activeDealerTab, setActiveDealerTab] = useState("comparison");

  useEffect(() => {
    setData(null);

    fetchMaterial(slug)
      .then(setData)
      .catch(() => {
        setData({
          error: true
        });
      });
  }, [slug]);

  const comparison = useMemo(() => {
    if (!data?.comparison) {
      return [];
    }

    const list = [...data.comparison];

    switch (sort) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;

      default:
        list.sort((a, b) => a.price - b.price);
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

  const tmtBrands = [
    { name: "Tata" },
    { name: "Jindal Panther" },
    { name: "SAIL" },
    { name: "Mongia" },
    { name: "Saluja" },
    { name: "Shyam Steel" },
    { name: "Kay2" },
    { name: "Rungta" },
    { name: "JSW" },
    { name: "Kamdhenu" },
    { name: "Captain" },
    { name: "Maithan" },
    { name: "Neo" },
    { name: "Stecol" },
    { name: "Vizag" },
  ];

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

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12 relative">

          <Link
            to="/materials"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Materials
          </Link>

          <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] gap-8 xl:gap-12 items-center mt-8">

            {/* Material Image */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl aspect-square">

              <img
                src={`/images/materials/${data.image || ""}`}
                alt={data.name}
                className="w-full h-full object-cover"
                loading="eager"
              />

            </div>

            {/* Material Information */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-5 py-2 text-orange-300">

                <Sparkles size={15} />

                Live Material Price

              </div>

              <h1
                className="mt-7 text-white font-extrabold leading-tight"
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "clamp(2.2rem,4vw,3.6rem)"
                }}
              >
                {data.name}
              </h1>

              <p className="mt-3 text-slate-300 leading-7 max-w-2xl">
                {data.description}
              </p>

              {/* Price Summary */}
              <div className="mt-6 grid sm:grid-cols-3 gap-3">

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

              </div>

            </div>

          </div>

        </div>

      </section>

{/* ================================================= */}
{/* MARKET OVERVIEW + TMT BRANDS */}
{/* ================================================= */}

<section className="py-10 bg-white">

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    <div className="grid xl:grid-cols-[1.08fr_0.92fr] gap-5 items-stretch">

      {/* ================================================= */}
      {/* MARKET OVERVIEW + BEST PRICE */}
      {/* ================================================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 lg:p-6 shadow-sm">

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-5 items-stretch">

          {/* MARKET OVERVIEW */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <TrendingUp className="text-[#FF6B00]" />

              <h2 className="text-3xl font-bold text-[#0A192F]">
                Market Overview
              </h2>

            </div>

            <p className="mt-4 text-slate-600 leading-7">
              Compare prices from verified dealers in Deoghar.
              The comparison below helps you identify the best
              available price before placing an order.
            </p>

            {/* ================================================= */}
            {/* STAT ROWS */}
            {/* ================================================= */}

            <div className="flex flex-col gap-3 mt-6">

              {/* ================================================= */}
              {/* AVERAGE PRICE */}
              {/* ================================================= */}

              <div className="grid grid-cols-[135px_145px_minmax(0,1fr)] items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 min-h-[92px]">

                <div className="flex items-center gap-3 min-w-0">

                  <BadgeIndianRupee
                    size={20}
                    className="text-[#FF6B00] shrink-0"
                  />

                  <span className="text-base font-semibold text-[#0A192F]">
                    Average Price
                  </span>

                </div>

                <div className="flex flex-col justify-center min-w-0">
                <div className="text-left text-3xl font-black text-[#0A192F] whitespace-nowrap">
                  {data.stats?.avg !== undefined &&
                  data.stats?.avg !== null &&
                  data.stats?.avg !== 0
                    ? `₹${data.stats.avg}`
                    : "NA"}
                </div>

                <div className="mt-1 text-left text-xs text-slate-500 whitespace-nowrap">
                  {data.unit}
                </div>
              </div>

              </div>

              {/* ================================================= */}
              {/* DEALERS */}
              {/* ================================================= */}

              <div className="grid grid-cols-[135px_145px_minmax(0,1fr)] items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 min-h-[92px]">

                <div className="flex items-center gap-3 min-w-0">

                  <Building2
                    size={20}
                    className="text-[#FF6B00] shrink-0"
                  />

                  <span className="text-base font-semibold text-[#0A192F]">
                    Dealers
                  </span>

                </div>

                <div className="flex flex-col justify-center min-w-0">
                <div className="text-left text-3xl font-black text-[#0A192F] whitespace-nowrap">
                  {data.stats?.dealer_count || 0}
                </div>

                <div className="mt-1 text-left text-xs text-slate-500 whitespace-nowrap">
                  Listed Sellers
                </div>
              </div>

              </div>

              {/* ================================================= */}
              {/* LOCATION */}
              {/* ================================================= */}

              <div className="grid grid-cols-[135px_145px_minmax(0,1fr)] items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 min-h-[92px]">

                <div className="flex items-center gap-3 min-w-0">

                  <MapPin
                    size={20}
                    className="text-[#FF6B00] shrink-0"
                  />

                  <span className="text-base font-semibold text-[#0A192F]">
                    Location
                  </span>

                </div>

                <div className="flex flex-col justify-center min-w-0">
                <div className="text-left text-3xl font-black text-[#0A192F] whitespace-nowrap">
                  Deoghar
                </div>

                <div className="mt-1 text-left text-xs text-slate-500 whitespace-nowrap">
                  Jharkhand
                </div>
              </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* BEST PRICE */}
          {/* ================================================= */}

          <div className="rounded-3xl bg-[#0A192F] p-6 text-white flex flex-col justify-between min-h-[250px]">

            <div>

              <div className="text-xs uppercase tracking-[0.2em] text-orange-300">
                Best Price Today
              </div>

              <h3 className="mt-3 text-xl font-bold text-white leading-tight">
                {cheapest?.dealer_name || "No dealer data"}
              </h3>

              {cheapest && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">

                  <MapPin size={15} />

                  {cheapest.area}

                </div>
              )}

            </div>

            {cheapest && (
              <div className="mt-6">

                <div className="text-4xl font-black text-[#FF6B00]">
                  ₹{cheapest.price}
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  {data.unit}
                </div>

                <div className="mt-5">

                  <TrendPill
                    trend={cheapest.trend}
                    previous={cheapest.previous_price}
                    current={cheapest.price}
                  />

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* TMT BRANDS */}
      {/* ================================================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 lg:p-6 shadow-sm">

        <div className="flex items-start gap-3">

          <Building2
            size={21}
            className="text-[#FF6B00]"
          />

          <div>

            <h3 className="text-xl font-bold text-[#0A192F]">
              {slug === "tmt-steel" ? "TMT Brands" : `${data.name} Brands`}
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {slug === "tmt-steel" ? `${tmtBrands.length} TMT brands available for this material` : `${(data.brand_catalog || []).length} ${data.name} brands available for this material`}
            </p>

          </div>

        </div>

        {(slug === "tmt-steel" || (data.brand_catalog || []).length > 0) && (
          <div className="mt-4">
            <>
          {slug === "tmt-steel" ? (

            <div className="grid grid-cols-3 gap-3">

              {tmtBrands.map((brand) => (
                <TMTBrandCard
                  key={brand.name}
                  brand={brand}
                />
              ))}

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-3">

              {(data.brand_catalog || [])
                .slice(0, 8)
                .map((brand) => (
                  <BrandCard
                    key={brand.brand}
                    brand={brand}
                  />
                ))}

            </div>

          )}
            </>
          </div>
        )}

      </div>

    </div>

  </div>

</section>

      {/* ================================================= */}
      {/* DEALER COMPARISON â€” COMPACT TABS */}
      {/* ================================================= */}

      <section className="py-10 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5">

              <button
                type="button"
                onClick={() => setActiveDealerTab("comparison")}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  activeDealerTab === "comparison"
                    ? "bg-[#0A192F] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Dealer Comparison
              </button>

              <button
                type="button"
                onClick={() => setActiveDealerTab("details")}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  activeDealerTab === "details"
                    ? "bg-[#0A192F] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Dealer Details
              </button>

            </div>

            {activeDealerTab === "comparison" && (
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-[#FF6B00]"
              >
                <option value="price">
                  Lowest Price
                </option>

                <option value="rating">
                  Highest Rating
                </option>
              </select>
            )}

          </div>


          {/* ================================================= */}
          {/* COMPARISON TAB */}
          {/* ================================================= */}

          {activeDealerTab === "comparison" && (

            <div className="grid gap-4">

              {comparison.length > 0 ? (

                comparison.map((dealer, index) => (

                  <div
  key={`${dealer.dealer_code}-${index}`}
  className="rounded-3xl bg-white border border-slate-200 px-6 py-5 hover:shadow-lg transition"
>
  <div className="grid lg:grid-cols-[minmax(0,1fr)_280px_280px] gap-6 items-center">

    {/* ================================================= */}
    {/* DEALER INFO */}
    {/* ================================================= */}

    <div className="min-w-0">

      <div className="flex flex-wrap items-center gap-3">

        <Link
          to={`/dealers/${dealer.dealer_code}`}
          className="text-xl font-bold text-[#0A192F] hover:text-[#FF6B00] transition"
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

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">

        <span className="inline-flex items-center gap-2">
          <MapPin size={15} />
          {dealer.area}
        </span>

        <span>
          â­ {dealer.rating}
        </span>

        {dealer.delivery && (
          <span className="inline-flex items-center gap-2">
            <Truck size={15} />
            Delivery Available
          </span>
        )}

      </div>

    </div>


    {/* ================================================= */}
    {/* PRICE INTELLIGENCE */}
    {/* ================================================= */}

    <div className="lg:border-l lg:border-r lg:border-slate-200 lg:px-6">

      <div className="text-xs text-slate-500">
        Today's Price
      </div>

      <div className="mt-1 text-4xl font-black text-[#0A192F] whitespace-nowrap">
        ₹{dealer.price}
      </div>

      <div className="mt-1 text-xs text-slate-500 whitespace-nowrap">
        {data.unit}
      </div>

      <div className="mt-3">
        <TrendPill
          trend={dealer.trend}
          previous={dealer.previous_price}
          current={dealer.price}
        />
      </div>

    </div>


    {/* ================================================= */}
    {/* ACTIONS */}
    {/* ================================================= */}

    <div className="flex flex-col gap-2">

      <div className="grid grid-cols-2 gap-2">

        <a
          href={`tel:${dealer.phone}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0A192F] text-white py-3 px-3 text-sm font-semibold hover:bg-[#132947] transition"
        >
          <Phone size={17} />
          Call
        </a>

        <a
          href={`https://wa.me/${dealer.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366] text-[#25D366] py-3 px-3 text-sm font-semibold hover:bg-[#25D366] hover:text-white transition"
        >
          <MessageCircle size={17} />
          WhatsApp
        </a>

      </div>

    </div>

  </div>
</div>

                ))

              ) : (

                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                  No dealer comparison data available.
                </div>

              )}

            </div>

          )}


          {/* ================================================= */}
          {/* DEALER DETAILS TAB */}
          {/* ================================================= */}

          {activeDealerTab === "details" && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

              {comparison.length > 0 ? (

                comparison.map((dealer, index) => (

                  <div
                    key={`${dealer.dealer_code}-detail-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <Link
                          to={`/dealers/${dealer.dealer_code}`}
                          className="font-bold text-[#0A192F] hover:text-[#FF6B00]"
                        >
                          {dealer.dealer_name}
                        </Link>

                        <div className="mt-2 text-xs text-slate-500">
                          {dealer.area}
                        </div>

                      </div>

                      {dealer.verified && (
                        <ShieldCheck
                          size={18}
                          className="text-emerald-600 shrink-0"
                        />
                      )}

                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs text-slate-500">
                          Rating
                        </div>

                        <div className="mt-1 font-bold text-[#0A192F]">
                          â­ {dealer.rating}
                        </div>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs text-slate-500">
                          Price
                        </div>

                        <div className="mt-1 font-bold text-[#0A192F]">
                          ₹{dealer.price}
                        </div>
                      </div>

                    </div>

                    {dealer.delivery && (
                      <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Truck size={14} />
                        Delivery Available
                      </div>
                    )}

                    <Link
                      to={`/dealers/${dealer.dealer_code}`}
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#0A192F] transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    >
                      View Dealer
                      <ArrowUpRight size={15} />
                    </Link>

                  </div>

                ))

              ) : (

                <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                  No dealer details available.
                </div>

              )}

            </div>

          )}

        </div>

      </section>
            {/* ================================================= */}
      {/* AI MARKET INSIGHT */}
      {/* ================================================= */}

      <section className="py-10 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-5">

            <InsightCard data={data} />

            {/* ================================================= */}
            {/* BUYING TIPS */}
            {/* ================================================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <Sparkles
                  size={20}
                  className="text-[#FF6B00]"
                />

                <h2 className="text-2xl font-bold text-[#0A192F]">
                  Smart Buying Tips
                </h2>

              </div>

              <div className="mt-6 space-y-4">

                {[
                  "Compare prices from multiple verified dealers before placing an order.",
                  "Confirm whether transportation and delivery charges are included.",
                  "Check brand availability before finalising your purchase.",
                  "Ask for the latest rate before making a bulk order.",
                ].map((tip, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >

                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-[#FF6B00]">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      {tip}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="py-10 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="rounded-3xl bg-[#0A192F] px-6 py-10 lg:px-10 text-center">

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Make a smarter construction decision.
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-slate-300 leading-7">
              Compare current market prices, check trusted dealers and
              choose the right option before you buy.
            </p>

            <Link
              to="/materials"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Explore Materials
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </div>

      </section>


    </>
  );
}



