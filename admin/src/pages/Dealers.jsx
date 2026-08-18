import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  RefreshCw,
  Store,
  X,
  Pencil,
  Trash2,
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  Star,
  CircleDollarSign,
} from "lucide-react";
import { toast } from "sonner";

import {
  createDealer,
  getAdminDealers,
  updateDealer,
  deleteDealer,
  fetchMaterials,
} from "../lib/api";

const initialForm = {
  business_name: "",
  owner_name: "",
  business_categories: [],
  gst_number: "",
  phone: "",
  alternate_phone: "",
  email: "",
  website: "",
  address: "",
  area: "",
  city: "Deoghar",
  district: "Deoghar",
  state: "Jharkhand",
  pincode: "",
  years_in_business: 0,
  description: "",
  delivery: false,
  whatsapp: true,
  verified: false,
  status: "ACTIVE",
  rating: 0,
  reviews_count: 0,
  logo: "",
  cover_image: "",
  gallery: [],
  prices: [],
};

const emptyPrice = (materialSlug = "") => ({
  material_slug: materialSlug,
  price: "",
  previous_price: "",
  trend: "flat",
  updated_at: new Date().toISOString(),
  in_stock: true,
});

export default function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDealer, setEditingDealer] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [categoriesText, setCategoriesText] = useState("");
  const [priceRows, setPriceRows] = useState([]);
  const [error, setError] = useState("");

  const materialMap = useMemo(
    () => Object.fromEntries(materials.map((m) => [m.slug, m])),
    [materials]
  );

  const loadDealers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAdminDealers();
      setDealers(res.data.dealers || []);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.detail || "Unable to load dealers";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const loadMaterials = async () => {
    try {
      const res = await fetchMaterials();
      setMaterials(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load materials");
    }
  };

  useEffect(() => {
    loadDealers();
    loadMaterials();
  }, []);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setCategoriesText("");
    setPriceRows([]);
    setEditingDealer(null);
    setError("");
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (dealer) => {
    setEditingDealer(dealer);

    setForm({
      business_name: dealer.name || "",
      owner_name: dealer.owner_name || "",
      business_categories: dealer.business_categories || [],
      gst_number: dealer.gst_number || "",
      phone: dealer.phone || "",
      alternate_phone: dealer.alternate_phone || "",
      email: dealer.email || "",
      website: dealer.website || "",
      address: dealer.address || "",
      area: dealer.area || "",
      city: dealer.city || "Deoghar",
      district: dealer.district || "Deoghar",
      state: dealer.state || "Jharkhand",
      pincode: dealer.pincode || "",
      years_in_business: dealer.years_in_business || 0,
      description: dealer.description || "",
      delivery: !!dealer.delivery,
      whatsapp: dealer.whatsapp !== false,
      verified: !!dealer.verified,
      status: dealer.status || "ACTIVE",
      rating: dealer.rating || 0,
      reviews_count: dealer.reviews_count || 0,
      logo: dealer.logo || "",
      cover_image: dealer.cover_image || "",
      gallery: dealer.gallery || [],
      prices: dealer.prices || [],
    });

    setCategoriesText((dealer.business_categories || []).join(", "));

    setPriceRows(
      (dealer.prices || []).map((price) => ({
        material_slug: price.material_slug || "",
        price: price.price ?? "",
        previous_price: price.previous_price ?? "",
        trend: price.trend || "flat",
        updated_at: price.updated_at || new Date().toISOString(),
        in_stock: price.in_stock !== false,
      }))
    );

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    resetForm();
  };

  const addPriceRow = () => {
    const used = new Set(priceRows.map((row) => row.material_slug));
    const nextMaterial = materials.find((m) => !used.has(m.slug));

    if (!nextMaterial) {
      toast.info("All available materials are already added.");
      return;
    }

    setPriceRows((rows) => [...rows, emptyPrice(nextMaterial.slug)]);
  };

  const removePriceRow = (index) => {
    setPriceRows((rows) => rows.filter((_, rowIndex) => rowIndex !== index));
  };

  const updatePriceRow = (index, field, value) => {
    setPriceRows((rows) =>
      rows.map((row, rowIndex) =>
        rowIndex === index
          ? { ...row, [field]: value }
          : row
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.business_name.trim()) {
      toast.error("Business name is required");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    if (!form.area.trim()) {
      toast.error("Area is required");
      return;
    }

    const invalidPrice = priceRows.some(
      (row) =>
        !row.material_slug ||
        row.price === "" ||
        Number(row.price) <= 0
    );

    if (invalidPrice) {
      toast.error("Please enter a valid price for every material.");
      return;
    }

    const duplicateMaterials =
      new Set(priceRows.map((row) => row.material_slug)).size !==
      priceRows.length;

    if (duplicateMaterials) {
      toast.error("A material can only be added once.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        business_name: form.business_name.trim(),
        owner_name: form.owner_name.trim() || null,
        business_categories: categoriesText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        gst_number: form.gst_number.trim() || null,
        phone: form.phone.trim(),
        alternate_phone: form.alternate_phone.trim() || null,
        email: form.email.trim() || null,
        website: form.website.trim() || null,
        address: form.address.trim() || null,
        area: form.area.trim(),
        pincode: form.pincode.trim() || null,
        description: form.description.trim() || null,
        logo: form.logo.trim() || null,
        cover_image: form.cover_image.trim() || null,
        gallery: form.gallery || [],
        prices: priceRows.map((row) => ({
          material_slug: row.material_slug,
          price: Number(row.price),
          previous_price:
            row.previous_price === ""
              ? Number(row.price)
              : Number(row.previous_price),
          trend: row.trend || "flat",
          updated_at: row.updated_at || new Date().toISOString(),
          in_stock: !!row.in_stock,
        })),
      };

      if (editingDealer) {
        await updateDealer(editingDealer.dealer_code, payload);
        toast.success("Dealer updated successfully");
      } else {
        await createDealer(payload);
        toast.success("Dealer created successfully");
      }

      closeForm();
      await loadDealers();
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.detail ||
        "Unable to save dealer";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (dealer) => {
    if (
      !window.confirm(
        `Delete "${dealer.name}"?\n\nThis will remove the dealer and its stored prices.`
      )
    ) {
      return;
    }

    try {
      await deleteDealer(dealer.dealer_code);
      toast.success("Dealer deleted successfully");
      await loadDealers();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail ||
          "Unable to delete dealer"
      );
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-7 pb-10">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
            <Store size={15} />
            Dealer Management
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Registered Dealers
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage trusted SahiRate dealers, contact details,
            services and live material prices.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={loadDealers}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(249,115,22,0.22)] transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Dealer
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <Store size={22} />
            </div>

            <div>
              <p className="font-bold text-slate-900">
                Dealer Network
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                Registered SahiRate dealers and their market data
              </p>
            </div>
          </div>

          <div className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
            {dealers.length}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-[22px] border border-slate-200 bg-white shadow-sm"
            />
          ))}
        </div>
      ) : dealers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Store
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No dealers found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add your first dealer to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {dealers.map((dealer) => (
            <article
              key={dealer.dealer_code}
              className="flex flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.11)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-xl font-bold leading-tight text-slate-950">
                    {dealer.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {dealer.dealer_code}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    dealer.status === "ACTIVE"
                      ? "bg-green-50 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {dealer.status || "ACTIVE"}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-1 font-bold text-slate-800">
                  <Star
                    size={15}
                    className="fill-current text-orange-500"
                  />
                  {Number(dealer.rating || 0).toFixed(1)}
                </span>
                <span>•</span>
                <span>{dealer.reviews_count || 0} reviews</span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {dealer.phone}
                {dealer.area ? ` • ${dealer.area}` : ""}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {dealer.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    <CheckCircle2 size={13} />
                    Verified
                  </span>
                )}

                {dealer.delivery && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    <Truck size={13} />
                    Delivery
                  </span>
                )}

                {dealer.whatsapp && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <MessageCircle size={13} />
                    WhatsApp
                  </span>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Materials
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-800">
                    <Package size={14} />
                    {dealer.prices?.length || 0}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                    Area
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {dealer.area || "—"}
                  </p>
                </div>
              </div>

              {dealer.prices?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Latest Prices
                  </p>

                  <div className="space-y-2">
                    {dealer.prices.slice(0, 3).map((price) => (
                      <div
                        key={price.material_slug}
                        className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5"
                      >
                        <span className="truncate text-sm font-semibold text-slate-700">
                          {materialMap[price.material_slug]?.name ||
                            price.material_slug}
                        </span>

                        <span className="ml-3 shrink-0 text-sm font-bold text-slate-900">
                          ₹{Number(price.price || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto flex gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => openEditForm(dealer)}
                  className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white text-sm font-bold text-orange-600 transition hover:bg-orange-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(dealer)}
                  className="flex h-[46px] w-[54px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-red-500 transition hover:border-red-200 hover:bg-red-50"
                  title="Delete dealer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-5 backdrop-blur-md">
          <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.28)]">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Dealer Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  {editingDealer ? "Edit Dealer" : "Add Dealer"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >
              <div className="space-y-7 p-6">
                <section>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Basic Information
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Business Name *"
                      value={form.business_name}
                      onChange={(value) =>
                        updateField("business_name", value)
                      }
                    />

                    <Field
                      label="Owner Name"
                      value={form.owner_name}
                      onChange={(value) =>
                        updateField("owner_name", value)
                      }
                    />
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Business
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Business Categories"
                      placeholder="Cement, Steel, Plumbing"
                      value={categoriesText}
                      onChange={setCategoriesText}
                    />

                    <Field
                      label="GST Number"
                      value={form.gst_number}
                      onChange={(value) =>
                        updateField("gst_number", value)
                      }
                    />
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Contact
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Phone *"
                      value={form.phone}
                      onChange={(value) =>
                        updateField("phone", value)
                      }
                    />

                    <Field
                      label="Alternate Phone"
                      value={form.alternate_phone}
                      onChange={(value) =>
                        updateField("alternate_phone", value)
                      }
                    />

                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(value) =>
                        updateField("email", value)
                      }
                    />

                    <Field
                      label="Website"
                      value={form.website}
                      onChange={(value) =>
                        updateField("website", value)
                      }
                    />
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Address
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <Field
                        label="Address"
                        value={form.address}
                        onChange={(value) =>
                          updateField("address", value)
                        }
                      />
                    </div>

                    <Field
                      label="Area *"
                      value={form.area}
                      onChange={(value) =>
                        updateField("area", value)
                      }
                    />

                    <Field
                      label="City"
                      value={form.city}
                      onChange={(value) =>
                        updateField("city", value)
                      }
                    />

                    <Field
                      label="District"
                      value={form.district}
                      onChange={(value) =>
                        updateField("district", value)
                      }
                    />

                    <Field
                      label="State"
                      value={form.state}
                      onChange={(value) =>
                        updateField("state", value)
                      }
                    />

                    <Field
                      label="Pincode"
                      value={form.pincode}
                      onChange={(value) =>
                        updateField("pincode", value)
                      }
                    />
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Business Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Years in Business"
                      type="number"
                      value={form.years_in_business}
                      onChange={(value) =>
                        updateField(
                          "years_in_business",
                          Number(value)
                        )
                      }
                    />

                    <Field
                      label="Status"
                      value={form.status}
                      onChange={(value) =>
                        updateField("status", value.toUpperCase())
                      }
                    />

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Description
                      </label>

                      <textarea
                        rows={4}
                        value={form.description}
                        onChange={(event) =>
                          updateField(
                            "description",
                            event.target.value
                          )
                        }
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Services & Trust
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        These fields control dealer information shown on SahiRate.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-6">
                    <Checkbox
                      label="Delivery Available"
                      checked={form.delivery}
                      onChange={(value) =>
                        updateField("delivery", value)
                      }
                    />

                    <Checkbox
                      label="WhatsApp Available"
                      checked={form.whatsapp}
                      onChange={(value) =>
                        updateField("whatsapp", value)
                      }
                    />

                    <Checkbox
                      label="Verified Dealer"
                      checked={form.verified}
                      onChange={(value) =>
                        updateField("verified", value)
                      }
                    />
                  </div>
                </section>

                <section className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CircleDollarSign
                          size={19}
                          className="text-orange-500"
                        />
                        <h3 className="text-lg font-bold text-slate-900">
                          Material Prices
                        </h3>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Add the dealer's current material prices, stock status and price trend.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addPriceRow}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
                    >
                      <Plus size={16} />
                      Add Price
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {priceRows.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-orange-200 bg-white px-5 py-8 text-center">
                        <p className="text-sm font-semibold text-slate-600">
                          No material prices added
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Add prices to make this dealer useful for live comparison.
                        </p>
                      </div>
                    ) : (
                      priceRows.map((row, index) => {
                        const material = materialMap[row.material_slug];

                        return (
                          <div
                            key={`${row.material_slug}-${index}`}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                          >
                            <div className="grid gap-3 md:grid-cols-5">
                              <div className="md:col-span-2">
                                <label className="mb-1.5 block text-xs font-bold text-slate-500">
                                  Material
                                </label>

                                <select
                                  value={row.material_slug}
                                  onChange={(event) =>
                                    updatePriceRow(
                                      index,
                                      "material_slug",
                                      event.target.value
                                    )
                                  }
                                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                                >
                                  <option value="">
                                    Select material
                                  </option>

                                  {materials.map((item) => (
                                    <option
                                      key={item.slug}
                                      value={item.slug}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                                </select>

                                {material?.unit && (
                                  <p className="mt-1 text-[11px] text-slate-400">
                                    {material.unit}
                                  </p>
                                )}
                              </div>

                              <Field
                                label="Current Price"
                                type="number"
                                value={row.price}
                                onChange={(value) =>
                                  updatePriceRow(
                                    index,
                                    "price",
                                    value
                                  )
                                }
                              />

                              <Field
                                label="Previous Price"
                                type="number"
                                value={row.previous_price}
                                onChange={(value) =>
                                  updatePriceRow(
                                    index,
                                    "previous_price",
                                    value
                                  )
                                }
                              />

                              <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-500">
                                  Trend
                                </label>

                                <select
                                  value={row.trend}
                                  onChange={(event) =>
                                    updatePriceRow(
                                      index,
                                      "trend",
                                      event.target.value
                                    )
                                  }
                                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                                >
                                  <option value="up">Rising</option>
                                  <option value="flat">Stable</option>
                                  <option value="down">Falling</option>
                                </select>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                              <Checkbox
                                label="In Stock"
                                checked={row.in_stock}
                                onChange={(value) =>
                                  updatePriceRow(
                                    index,
                                    "in_stock",
                                    value
                                  )
                                }
                              />

                              <button
                                type="button"
                                onClick={() => removePriceRow(index)}
                                className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </section>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(249,115,22,0.22)] transition hover:bg-orange-600 disabled:opacity-60"
                >
                  {saving && (
                    <RefreshCw
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : editingDealer
                    ? "Save Changes"
                    : "Create Dealer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      />
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded"
      />
      {label}
    </label>
  );
}
