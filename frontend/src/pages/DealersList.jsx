import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Truck,
  Star,
  ArrowUpRight,
  Building2,
  MapPin,
  MessageCircle,
  SlidersHorizontal,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
  Package,
} from "lucide-react";

import SEO from "../components/SEO";
import { fetchDealers, fetchMaterials } from "@/lib/api";

const formatPhone = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");

  const number =
    digits.startsWith("91") && digits.length === 12
      ? digits.slice(2)
      : digits.slice(-10);

  if (number.length !== 10) return phone || "";

  return `+91 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
};

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

const formatUpdated = (value) => {
  if (!value) return "Rate available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Rate available";

  const hours = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60)
  );

  if (hours <= 0) return "Updated just now";
  if (hours === 1) return "Updated 1 hour ago";
  if (hours < 24) return `Updated ${hours} hours ago`;

  return `Updated ${Math.floor(hours / 24)} days ago`;
};

function Trend({ trend, price, previous }) {
  const actual =
    trend ||
    (Number(price) > Number(previous)
      ? "up"
      : Number(price) < Number(previous)
      ? "down"
      : "flat");

  if (actual === "up") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
        <TrendingUp size={13} />
        Rising
      </span>
    );
  }

  if (actual === "down") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
        <TrendingDown size={13} />
        Falling
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
      <Minus size={13} />
      Stable
    </span>
  );
}

export default function DealersList() {
  const [dealers, setDealers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    Promise.all([fetchDealers(), fetchMaterials()])
      .then(([dealerRes, materialRes]) => {
        setDealers(
          Array.isArray(dealerRes) ? dealerRes : []
        );

        setMaterials(
          Array.isArray(materialRes) ? materialRes : []
        );
      })
      .catch((err) => {
        console.error("Dealers page API error:", err);
        setDealers([]);
        setMaterials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const materialMap = useMemo(
    () =>
      Object.fromEntries(
        materials.map((material) => [
          material.slug,
          material,
        ])
      ),
    [materials]
  );

  const areas = useMemo(() => {
    return [
      ...new Set(
        dealers
          .map((dealer) => dealer.area)
          .filter(Boolean)
      ),
    ].sort();
  }, [dealers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = dealers.filter((dealer) => {
      const searchable = [
        dealer.name,
        dealer.area,
        dealer.city,
        ...(dealer.materials_offered || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (q && !searchable.includes(q)) return false;

      if (materialFilter) {
        const offers = (dealer.prices || []).some(
          (price) => price.material_slug === materialFilter
        );

        if (!offers) return false;
      }

      if (areaFilter && dealer.area !== areaFilter) {
        return false;
      }

      if (verifiedOnly && !dealer.verified) return false;
      if (deliveryOnly && !dealer.delivery) return false;

      return true;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return (
          Number(b.rating || 0) -
          Number(a.rating || 0)
        );
      }

      if (sortBy === "reviews") {
        return (
          Number(b.reviews_count || 0) -
          Number(a.reviews_count || 0)
        );
      }

      if (sortBy === "materials") {
        return (
          Number(b.prices?.length || 0) -
          Number(a.prices?.length || 0)
        );
      }

      return (a.name || "").localeCompare(
        b.name || ""
      );
    });
  }, [
    dealers,
    query,
    materialFilter,
    areaFilter,
    verifiedOnly,
    deliveryOnly,
    sortBy,
  ]);

  const verifiedCount = dealers.filter(
    (dealer) => dealer.verified
  ).length;

  const materialCount = new Set(
    dealers.flatMap((dealer) =>
      (dealer.prices || []).map(
        (price) => price.material_slug
      )
    )
  ).size;

  const clearFilters = () => {
    setQuery("");
    setMaterialFilter("");
    setAreaFilter("");
    setVerifiedOnly(false);
    setDeliveryOnly(false);
    setSortBy("rating");
  };

  return (
    <>
      <SEO
        title="Building Material Dealers Near You | SahiRate"
        description="Find verified building material dealers, compare current material prices, and connect with trusted suppliers."
        path="/dealers"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#F4F1EA]">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
              <ShieldCheck size={15} className="text-orange-500" />
              SahiRate Dealer Network
            </div>

            <h1
              className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-[#172033] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Find the right dealer.
              <span className="block text-orange-600">
                Check the rate first.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Search trusted local dealers and see the material
              rates they currently share on SahiRate — before you
              call or visit.
            </p>
          </div>

          <div className="mt-9 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat
              value={dealers.length}
              label="Registered dealers"
            />
            <Stat
              value={verifiedCount}
              label="Verified dealers"
            />
            <Stat
              value={`${materialCount}+`}
              label="Material types"
              extraClass="hidden sm:block"
            />
          </div>
        </div>
      </section>

      {/* Search / filters */}
      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dealer, area or material..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFAF8] pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <FilterSelect
              value={materialFilter}
              onChange={setMaterialFilter}
              placeholder="All materials"
              options={materials.map((material) => ({
                value: material.slug,
                label: material.name,
              }))}
            />

            <FilterSelect
              value={areaFilter}
              onChange={setAreaFilter}
              placeholder="All areas"
              options={areas.map((area) => ({
                value: area,
                label: area,
              }))}
            />

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition ${
                showFilters || verifiedOnly || deliveryOnly
                  ? "border-slate-800 bg-[#172033] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
              <FilterButton
                active={verifiedOnly}
                onClick={() =>
                  setVerifiedOnly(!verifiedOnly)
                }
                icon={<ShieldCheck size={15} />}
              >
                Verified dealers
              </FilterButton>

              <FilterButton
                active={deliveryOnly}
                onClick={() =>
                  setDeliveryOnly(!deliveryOnly)
                }
                icon={<Truck size={15} />}
              >
                Delivery available
              </FilterButton>

              {(verifiedOnly ||
                deliveryOnly ||
                materialFilter ||
                areaFilter ||
                query) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 px-3 py-2 text-xs font-bold text-orange-600 hover:text-orange-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#FBFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                Dealer results
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#172033]">
                {filtered.length} dealers
              </h2>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-500">
              Sort by
              <span className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400"
                >
                  <option value="rating">Rating</option>
                  <option value="reviews">Reviews</option>
                  <option value="materials">Materials</option>
                  <option value="name">Name</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </span>
            </label>
          </div>

          {loading ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
              <Building2
                size={48}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-xl font-bold text-[#172033]">
                No matching dealers
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try another area, material or remove one of the
                filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-lg bg-[#172033] px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {filtered.map((dealer) => (
                <DealerCard
                  key={dealer.dealer_code}
                  dealer={dealer}
                  materialMap={materialMap}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function DealerCard({ dealer, materialMap }) {
  const prices = dealer.prices || [];
  const visiblePrices = prices.slice(0, 4);
  const remaining = Math.max(prices.length - 4, 0);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_22px_rgba(23,32,51,0.045)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_16px_40px_rgba(23,32,51,0.09)]">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Dealer identity */}
        <div className="border-b border-slate-100 p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-start">
             <div className="min-w-0 flex-1">
              <div className="inline-flex max-w-full rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-white px-3.5 py-2.5 shadow-sm">
                <h3 className="text-base font-extrabold leading-5 text-[#172033]">
                  {dealer.name}
                </h3>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  {dealer.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      <ShieldCheck size={12} />
                      Verified
                    </span>
                  )}
                </div>

                <Link
                  to={`/dealers/${dealer.dealer_code}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-200 text-orange-600 transition hover:bg-orange-50 group-hover:border-orange-300"
                  title="View dealer"
                >
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin size={15} className="shrink-0 text-orange-500" />
              <span>
                {dealer.area || "Deoghar"}
                {dealer.city ? `, ${dealer.city}` : ""}
              </span>
            </div>

            {dealer.phone && (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-[13px] font-bold text-slate-400">
                  +91
                </span>
                <span>
                  {formatPhone(dealer.phone).replace("+91 ", "")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5">
              <Star
                size={16}
                className="fill-orange-500 text-orange-500"
              />
              <span className="text-sm font-extrabold text-[#172033]">
                {Number(dealer.rating || 0).toFixed(1)}
              </span>
            </div>

            <span className="text-xs text-slate-400">
              {dealer.reviews_count || 0} reviews
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {dealer.delivery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">
                <Truck size={13} />
                Delivery
              </span>
            )}

            {dealer.whatsapp && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600">
                <MessageCircle size={13} />
                WhatsApp
              </span>
            )}
          </div>

          <Link
            to={`/dealers/${dealer.dealer_code}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700"
          >
            View dealer profile
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Dealer prices */}
        <div className="bg-[#FCFCFA] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Package size={15} className="text-orange-500" />
                <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-slate-500">
                  Current rates
                </p>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                {prices.length} material{prices.length === 1 ? "" : "s"} listed
              </p>
            </div>

            {prices[0]?.updated_at && (
              <span className="text-right text-[10px] font-semibold text-slate-400">
                {formatUpdated(prices[0].updated_at)}
              </span>
            )}
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {visiblePrices.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-slate-400">
                No current rates available.
              </div>
            ) : (
              visiblePrices.map((price) => {
                const material =
                  materialMap[price.material_slug];

                return (
                  <div
                    key={price.material_slug}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-700">
                        {material?.name ||
                          price.material_slug}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {material?.unit || ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-[#172033]">
                        ₹{formatPrice(price.price)}
                      </p>

                      <Trend
                        trend={price.trend}
                        price={price.price}
                        previous={price.previous_price}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">
              Prices may vary by quantity & delivery.
            </span>

            <Link
              to={`/dealers/${dealer.dealer_code}`}
              className="shrink-0 rounded-lg border border-orange-200 bg-white px-3.5 py-2 text-xs font-extrabold text-orange-600 transition hover:bg-orange-50"
            >
              {remaining > 0
                ? `View ${remaining} more`
                : "All prices"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({ value, label, extraClass = "" }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white/70 px-4 py-3 ${extraClass}`}
    >
      <p className="text-xl font-black text-[#172033]">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
        {label}
      </p>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 min-w-[155px] appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-bold transition ${
        active
          ? "border-[#172033] bg-[#172033] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

