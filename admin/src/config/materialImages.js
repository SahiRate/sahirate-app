// ============================================================
// SahiRate Material Image Library
// ============================================================

export const MATERIAL_IMAGE_BASE_PATH = "/images/materials";

export const MATERIAL_IMAGE_OPTIONS = [
  {
    file: "cement.jpg",
    label: "Cement",
  },
  {
    file: "tmt-steel.jpg",
    label: "TMT Steel",
  },
  {
    file: "redbricks.jpg",
    label: "Red Bricks",
  },
  {
    file: "river-sand.jpg",
    label: "River Sand",
  },
  {
    file: "Stone_Chips.jpg",
    label: "Stone Chips",
  },
  {
    file: "aggregate.jpg",
    label: "Aggregate",
  },
  {
    file: "AAC_Blocks.jpg",
    label: "AAC Blocks",
  },
  {
    file: "binding_wire.jpg",
    label: "Binding Wire",
  },
  {
    file: "nail.jpg",
    label: "Nails",
  },
  {
    file: "narival_rassi.jpg",
    label: "Nariyal Rassi",
  },
  {
    file: "Plumbing_Duct_Pipes_Fittings.jpg",
    label: "Plumbing Fittings",
  },
  {
    file: "plumbing_pipes_1.jpg",
    label: "Plumbing Pipes",
  },
  {
    file: "plumbing_pipes_2.jpg",
    label: "Plumbing Pipes 2",
  },
  {
    file: "aggregate_2.jpg",
    label: "Aggregate 2",
  },
];

// ============================================================
// OLD IMAGE NAME COMPATIBILITY
// ============================================================
//
// Database me agar purana filename saved hai,
// to automatically actual folder filename use hoga.
// ============================================================

// ============================================================
// DEFAULT IMAGE BY MATERIAL SLUG
// ============================================================

export const DEFAULT_MATERIAL_IMAGES = {
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


const LEGACY_IMAGE_MAP = {
  "TMT_Rebars.jpg": "tmt-steel.jpg",
  "tmt_rebars.jpg": "tmt-steel.jpg",
  "TMT-Rebars.jpg": "tmt-steel.jpg",

  "sand.jpg": "river-sand.jpg",
  "Sand.jpg": "river-sand.jpg",
  "river_sand.jpg": "river-sand.jpg",

  "red_bricks.jpg": "redbricks.jpg",
  "RedBricks.jpg": "redbricks.jpg",

  "stone_chips.jpg": "Stone_Chips.jpg",

  "aac_blocks.jpg": "AAC_Blocks.jpg",

  "binding-wire.jpg": "binding_wire.jpg",

  "coconut_rope.jpg": "narival_rassi.jpg",
};

// ============================================================
// IMAGE PATH
// ============================================================

export function getMaterialImagePath(image) {
  if (!image) {
    return "";
  }

  const value = String(image).trim();

  if (!value) {
    return "";
  }

  // External URL support
  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  // Remove query/hash
  const cleanValue = value
    .split("?")[0]
    .split("#")[0];

  // Get filename only
  const filename = cleanValue
    .split("/")
    .pop();

  if (!filename) {
    return "";
  }

  // Convert old filename to actual filename
  const resolvedFilename =
    LEGACY_IMAGE_MAP[filename] || filename;

  return `${MATERIAL_IMAGE_BASE_PATH}/${encodeURIComponent(
    resolvedFilename
  )}`;
}

// ============================================================
// DEFAULT MATERIAL IMAGE
// ============================================================

export function getDefaultMaterialImage(slug) {
  if (!slug) {
    return "";
  }

  const filename = DEFAULT_MATERIAL_IMAGES[slug];

  if (!filename) {
    return "";
  }

  return getMaterialImagePath(filename);
}