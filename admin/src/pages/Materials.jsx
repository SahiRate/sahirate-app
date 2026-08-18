import { useEffect, useMemo, useState } from "react";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Image as ImageIcon,
  Search,
  Scale,
} from "lucide-react";

import {
  fetchMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../lib/api";

import {
  MATERIAL_IMAGE_OPTIONS,
  getMaterialImagePath,
} from "../config/materialImages";


// ============================================================
// DEFAULT IMAGE BY MATERIAL SLUG
// ============================================================
//
// Agar database me material.image missing ho,
// to slug ke basis par SahiRate image library se image milegi.
//

const DEFAULT_MATERIAL_IMAGES = {
  bricks: "redbricks.jpg",
  "stone-chips": "Stone_Chips.jpg",
  aggregate: "aggregate.jpg",
  cement: "cement.jpg",
  "tmt-steel": "tmt-steel.jpg",
  sand: "river-sand.jpg",
  "ac-blocks": "AAC_Blocks.jpg",

  "binding-wire": "binding_wire.jpg",
  nails: "nail.jpg",
  "nariyal-rassi": "narival_rassi.jpg",

  "plumbing-fittings": "Plumbing_Duct_Pipes_Fittings.jpg",
  "plumbing-pipes": "plumbing_pipes_1.jpg",
  "plumbing-pipes-2": "plumbing_pipes_2.jpg",

  "aggregate-2": "aggregate_2.jpg",
};


// ============================================================
// GET DEFAULT IMAGE
// ============================================================

function getDefaultMaterialImage(slug) {
  if (!slug) {
    return "";
  }

  const filename = DEFAULT_MATERIAL_IMAGES[slug];

  if (!filename) {
    return "";
  }

  return getMaterialImagePath(filename);
}

function getMaterialFallbackImage(slug) {
  return getDefaultMaterialImage(slug);
}

// ============================================================
// MATERIALS PAGE
// ============================================================

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [viewingMaterial, setViewingMaterial] = useState(null);

  const [imageSearch, setImageSearch] = useState("");

  const [form, setForm] = useState({
    slug: "",
    name: "",
    unit: "",
    description: "",
    image: "",
  });


  // ==========================================================
  // IMAGE OPTIONS
  // ==========================================================

  const imageOptions = Array.isArray(MATERIAL_IMAGE_OPTIONS)
    ? MATERIAL_IMAGE_OPTIONS
    : [];

  const getOptionValue = (option) =>
    option?.value ??
    option?.file ??
    option?.filename ??
    option?.path ??
    option?.name ??
    "";

  const getOptionLabel = (option) =>
    option?.label ??
    option?.title ??
    option?.name ??
    option?.filename ??
    option?.file ??
    option?.value ??
    "Material image";

  const filteredImageOptions = useMemo(() => {
    const query = imageSearch.trim().toLowerCase();

    if (!query) {
      return imageOptions;
    }

    return imageOptions.filter((option) =>
      `${getOptionLabel(option)} ${getOptionValue(option)}`
        .toLowerCase()
        .includes(query)
    );
  }, [imageSearch, imageOptions]);


  // ==========================================================
  // LOAD MATERIALS
  // ==========================================================

  const loadMaterials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchMaterials();

      setMaterials(
        Array.isArray(response?.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to load materials."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadMaterials();
  }, []);


  // ==========================================================
  // ADD MATERIAL
  // ==========================================================

  const openAddForm = () => {
    setEditingMaterial(null);

    setForm({
      slug: "",
      name: "",
      unit: "",
      description: "",
      image: "",
    });

    setImageSearch("");
    setError("");
    setShowForm(true);
  };


  // ==========================================================
  // EDIT MATERIAL
  // ==========================================================

  const openEditForm = (material) => {
    setEditingMaterial(material);

    setForm({
      slug: material.slug || "",
      name: material.name || "",
      unit: material.unit || "",
      description: material.description || "",
      image: material.image || "",
    });

    setImageSearch("");
    setError("");
    setShowForm(true);
  };


  // ==========================================================
  // CLOSE FORM
  // ==========================================================

  const closeForm = () => {
    if (saving) {
      return;
    }

    setShowForm(false);
    setEditingMaterial(null);
    setImageSearch("");
    setError("");
  };


  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };


  // ==========================================================
  // SELECT IMAGE
  // ==========================================================

  const selectImage = (value) => {
    setForm((current) => ({
      ...current,
      image: value,
    }));
  };


  // ==========================================================
  // SAVE MATERIAL
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return setError("Material name is required.");
    }

    if (!form.unit.trim()) {
      return setError("Unit is required.");
    }

    if (!editingMaterial && !form.slug.trim()) {
      return setError(
        "Slug is required for a new material."
      );
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        unit: form.unit.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
      };

      if (editingMaterial) {
        await updateMaterial(
          editingMaterial.slug,
          payload
        );
      } else {
        await createMaterial({
          slug: form.slug.trim(),
          ...payload,
        });
      }

      closeForm();

      await loadMaterials();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to save material."
      );
    } finally {
      setSaving(false);
    }
  };


  // ==========================================================
  // DELETE MATERIAL
  // ==========================================================

  const handleDelete = async (material) => {
    if (
      !window.confirm(
        `Delete "${material.name}"?\n\nThis action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setError("");

      await deleteMaterial(material.slug);

      await loadMaterials();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to delete material."
      );
    }
  };


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="mx-auto max-w-[1400px] space-y-7 pb-10">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
            <Package size={15} />
            Material Management
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Building Materials
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage SahiRate&apos;s building material catalogue,
            units, descriptions and visual references.
          </p>

        </div>


        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={loadMaterials}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                loading ? "animate-spin" : ""
              }
            />

            Refresh
          </button>


          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(249,115,22,0.22)] transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            <Plus size={18} />

            Add Material
          </button>

        </div>

      </section>


      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}


      {/* ======================================================
          REGISTERED MATERIALS
      ====================================================== */}

      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative flex items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <Package size={22} />
            </div>

            <div>

              <p className="font-bold text-slate-900">
                Registered Materials
              </p>

              <p className="mt-0.5 text-sm text-slate-500">
                Materials currently available in SahiRate
              </p>

            </div>

          </div>


          <div className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
            {materials.length}
          </div>

        </div>

      </section>


      {/* ======================================================
          MATERIAL LIST
      ====================================================== */}

      {loading ? (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[490px] animate-pulse rounded-[22px] border border-slate-200 bg-white shadow-sm"
            />
          ))}

        </div>

      ) : materials.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Package size={25} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            No materials found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Add your first building material to get started.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
          >
            Add Material
          </button>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {materials.map((material) => {
  const fallbackImagePath = getMaterialFallbackImage(
    material.slug
  );

  const imagePath =
    getMaterialImagePath(material.image) ||
    fallbackImagePath;

  return (
    <article
      key={material.slug}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.11)]"
    >
      {/* IMAGE */}
      <div className="relative h-52 shrink-0 overflow-hidden bg-slate-100">

        {imagePath ? (
          <img
            src={imagePath}
            alt={material.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            onError={(event) => {
              const img = event.currentTarget;

              if (
                fallbackImagePath &&
                img.src !==
                  window.location.origin +
                    fallbackImagePath
              ) {
                img.src = fallbackImagePath;
                return;
              }

              img.style.display = "none";

              const fallback =
                img.parentElement?.querySelector(
                  "[data-material-image-fallback]"
                );

              fallback?.classList.remove("hidden");
            }}
          />
        ) : null}

        {/* FINAL FALLBACK */}
        <div
          data-material-image-fallback
          className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-300 ${
            imagePath ? "hidden" : ""
          }`}
        >
          <ImageIcon size={40} />

          <span className="mt-2 text-xs font-semibold">
            No image
          </span>
        </div>

        {/* IMAGE OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">

        <h2 className="truncate text-[22px] font-bold tracking-tight text-slate-950">
          {material.name}
        </h2>

        <div className="mt-2 inline-flex w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
          {material.unit}
        </div>

        <div className="mt-4 min-h-[96px]">
          {material.description ? (
            <>
              <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                {material.description}
              </p>

              {material.description.length > 150 && (
                <button
                  type="button"
                  onClick={() =>
                    setViewingMaterial(material)
                  }
                  className="mt-1 text-xs font-bold text-orange-600 transition hover:text-orange-700"
                >
                  View full description →
                </button>
              )}
            </>
          ) : (
            <p className="text-sm italic leading-6 text-slate-400">
              No description added yet.
            </p>
          )}
        </div>

        <div className="mt-5 flex shrink-0 gap-3">

          <button
            type="button"
            onClick={() =>
              openEditForm(material)
            }
            className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-4 text-sm font-bold text-orange-600 transition hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              handleDelete(material)
            }
            className="flex h-[46px] w-[54px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-red-500 transition hover:border-red-200 hover:bg-red-50"
            title="Delete material"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </article>
  );
})}

        </div>
      )}

      {/* ======================================================
          VIEW MATERIAL
      ====================================================== */}

      {viewingMaterial && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-5 backdrop-blur-md">

          <div className="w-full max-w-2xl overflow-hidden rounded-[24px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.28)]">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Material Details
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  {viewingMaterial.name}
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setViewingMaterial(null)
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>

            </div>


            <div className="max-h-[70vh] overflow-y-auto p-6">

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Unit
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {viewingMaterial.unit || "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Slug
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {viewingMaterial.slug || "—"}
                  </p>
                </div>
              </div>


              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Description
                </p>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {viewingMaterial.description ||
                    "No description added yet."}
                </p>

              </div>

            </div>


            <div className="flex justify-end border-t border-slate-100 px-6 py-4">

              <button
                type="button"
                onClick={() =>
                  setViewingMaterial(null)
                }
                className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          ADD / EDIT FORM
      ====================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-5 backdrop-blur-md">

          <div className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.28)]">

            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 py-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Material Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  {editingMaterial
                    ? "Edit Material"
                    : "Add Material"}
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

              <div className="space-y-6 p-6">

                {!editingMaterial && (

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Slug
                    </label>

                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="e.g. cement"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Use lowercase letters, numbers and hyphens.
                    </p>

                  </div>

                )}


                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Material Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter material name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Unit
                    </label>
                    <input
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      placeholder="e.g. 50 kg bag, Per Kg, Per CFT"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                </div>


                {/* ==================================================
                    MATERIAL IMAGE
                ================================================== */}

                <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <label className="block text-sm font-bold text-slate-700">
                        Material Image
                      </label>

                      <p className="mt-1 text-xs text-slate-400">
                        Select an image from the SahiRate material library.
                      </p>

                    </div>


                    {form.image && (

                      <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                        Selected
                      </span>

                    )}

                  </div>


                  <div className="relative mt-4">

                    <Search
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={imageSearch}
                      onChange={(event) =>
                        setImageSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search material images..."
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />

                  </div>


                  <div className="mt-4 grid max-h-80 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">

                    {filteredImageOptions.length ? (

                      filteredImageOptions.map(
                        (option, index) => {

                          const value =
                            getOptionValue(option);

                          const label =
                            getOptionLabel(option);

                          const path =
                            getMaterialImagePath(
                              value
                            );

                          const selected =
                            form.image === value;


                          return (

                            <button
                              type="button"
                              key={`${value}-${index}`}
                              onClick={() =>
                                selectImage(value)
                              }
                              className={`group overflow-hidden rounded-xl border bg-white text-left transition ${
                                selected
                                  ? "border-orange-400 ring-2 ring-orange-100"
                                  : "border-slate-200 hover:border-orange-200 hover:shadow-sm"
                              }`}
                            >

                              <div className="h-24 overflow-hidden bg-slate-100">

                                <img
                                  src={path}
                                  alt={label}
                                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                  onError={(event) => {
                                    event.currentTarget.style.opacity =
                                      "0.15";
                                  }}
                                />

                              </div>


                              <div className="px-3 py-2.5">

                                <p className="truncate text-sm font-bold text-slate-700">
                                  {label}
                                </p>

                                <p className="mt-0.5 truncate text-[11px] text-slate-400">
                                  {value}
                                </p>

                              </div>

                            </button>

                          );
                        }
                      )

                    ) : (

                      <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-sm text-slate-400">
                        No matching images found.
                      </div>

                    )}

                  </div>


                  {form.image && (

                    <div className="mt-4 overflow-hidden rounded-xl border border-orange-100 bg-white">

                      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">

                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Selected Image
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              image: "",
                            }))
                          }
                          className="text-xs font-semibold text-slate-400 hover:text-red-500"
                        >
                          Clear
                        </button>

                      </div>


                      <div className="h-36 bg-slate-50">

                        <img
                          src={getMaterialImagePath(
                            form.image
                          )}
                          alt="Selected material"
                          className="h-full w-full object-cover"
                        />

                      </div>

                    </div>

                  )}

                </section>


                {/* DESCRIPTION */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the material..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />

                </div>


                {error && (

                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>

                )}

              </div>


              {/* FORM ACTIONS */}

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
                    : editingMaterial
                    ? "Save Changes"
                    : "Create Material"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}
