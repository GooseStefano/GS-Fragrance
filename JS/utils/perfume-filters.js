/* =========================
   PERFUME FILTERS
   Pure functions — no DOM
========================= */

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function getPerfumeSearchText(perfume) {
  const parts = [
    perfume.name,
    perfume.brand,
    perfume.description,
    perfume.concentration,
    perfume.gender,
    ...(perfume.accords || []),
    ...(perfume.topNotes || []),
    ...(perfume.middleNotes || []),
    ...(perfume.baseNotes || []),
    ...(perfume.season || []),
    ...(perfume.category || []),
  ];

  return parts.map(normalizeText).join(" ");
}

function matchesSearch(perfume, query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  return getPerfumeSearchText(perfume).includes(normalizedQuery);
}

function matchesArraySelection(perfumeValues, selectedValues) {
  if (!selectedValues.length) {
    return true;
  }

  const values = Array.isArray(perfumeValues) ? perfumeValues : [perfumeValues];

  return selectedValues.some((selected) =>
    values.some((value) => normalizeText(value) === normalizeText(selected)),
  );
}

function matchesNoteSelection(perfume, selectedNotes) {
  if (!selectedNotes.length) {
    return true;
  }

  const perfumeNotes = [
    ...(perfume.topNotes || []),
    ...(perfume.middleNotes || []),
    ...(perfume.baseNotes || []),
  ];

  return selectedNotes.some((note) =>
    perfumeNotes.some(
      (perfumeNote) => normalizeText(perfumeNote) === normalizeText(note),
    ),
  );
}

function matchesFilters(perfume, filters = {}) {
  const {
    brands = [],
    genders = [],
    seasons = [],
    concentrations = [],
    notes = [],
  } = filters;

  if (brands.length && !brands.includes(perfume.brand)) {
    return false;
  }

  if (genders.length && !genders.includes(perfume.gender)) {
    return false;
  }

  if (!matchesArraySelection(perfume.season, seasons)) {
    return false;
  }

  if (
    concentrations.length &&
    !concentrations.includes(perfume.concentration)
  ) {
    return false;
  }

  if (!matchesNoteSelection(perfume, notes)) {
    return false;
  }

  return true;
}

function filterPerfumeList(list, { query = "", filters = {} } = {}) {
  return list.filter(
    (perfume) =>
      matchesSearch(perfume, query) && matchesFilters(perfume, filters),
  );
}

function getUniqueBrands(list) {
  return [...new Set(list.map((perfume) => perfume.brand))].sort((a, b) =>
    a.localeCompare(b, "ru"),
  );
}

function getUniqueNotes(list) {
  const notes = list.flatMap((perfume) => [
    ...(perfume.topNotes || []),
    ...(perfume.middleNotes || []),
    ...(perfume.baseNotes || []),
  ]);

  return [...new Set(notes)].sort((a, b) => a.localeCompare(b, "ru"));
}

function getInitialCatalogFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const gender = params.get("gender");
  const allowedGenders = ["men", "women", "unisex"];

  if (!gender || !allowedGenders.includes(gender)) {
    return { genders: [] };
  }

  return { genders: [gender] };
}
