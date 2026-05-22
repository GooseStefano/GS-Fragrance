/* =========================
   DOM
========================= */

const perfumeGrid = document.querySelector(".perfume-grid");
const searchInput = document.querySelector(".search-input");
const catalogFiltersRoot = document.querySelector("#catalog-filters");
const filterResetBtn = document.querySelector(".filter-reset-btn");
const catalogResultsMeta = document.querySelector(".catalog-results-meta");
const catalogEmpty = document.querySelector(".catalog-empty");

const modalOverlay = document.querySelector(".perfume-modal-overlay");
const modalClose = document.querySelector(".modal-close");
const modalPerfumeImage = document.querySelector("#modalPerfumeImage");
const modalPerfumeBrand = document.querySelector("#modalPerfumeBrand");
const modalPerfumeName = document.querySelector("#modalPerfumeName");
const modalPerfumeRating = document.querySelector("#modalPerfumeRating");
const modalPerfumeDescription = document.querySelector(
  "#modalPerfumeDescription",
);
const modalPerfumeTags = document.querySelector("#modalPerfumeTags");

/* =========================
   FILTER GROUPS CONFIG
========================= */

const FILTER_GROUPS = [
  {
    key: "brands",
    title: "Бренды",
    openByDefault: true,
    getOptions: () =>
      getUniqueBrands(perfumes).map((brand) => ({
        value: brand,
        label: brand,
      })),
  },
  {
    key: "genders",
    title: "Пол",
    options: [
      { value: "men", label: "Мужские" },
      { value: "women", label: "Женские" },
      { value: "unisex", label: "Унисекс" },
    ],
  },
  {
    key: "seasons",
    title: "Сезон",
    options: [
      { value: "Spring", label: "Весна" },
      { value: "Summer", label: "Лето" },
      { value: "Autumn", label: "Осень" },
      { value: "Winter", label: "Зима" },
    ],
  },
  {
    key: "concentrations",
    title: "Концентрация",
    options: [
      { value: "Parfum", label: "Parfum" },
      { value: "EDP", label: "EDP" },
      { value: "EDT", label: "EDT" },
      { value: "EDC", label: "EDC" },
    ],
  },
  {
    key: "notes",
    title: "Ноты",
    getOptions: () =>
      getUniqueNotes(perfumes).map((note) => ({
        value: note,
        label: note,
      })),
  },
];

/* =========================
   STATE
========================= */

const catalogState = {
  query: "",
  filters: {
    brands: [],
    genders: [],
    seasons: [],
    concentrations: [],
    notes: [],
    ...getInitialCatalogFiltersFromURL(),
  },
};

/* =========================
   FAVORITES
========================= */

function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* =========================
   FILTERS UI
========================= */

function createFilterCheckbox(groupKey, option, isChecked) {
  const inputId = `filter-${groupKey}-${option.value.replace(/\s+/g, "-").toLowerCase()}`;

  return `
    <label class="filter-option" for="${inputId}">
      <input
        type="checkbox"
        id="${inputId}"
        data-filter="${groupKey}"
        value="${option.value}"
        ${isChecked ? "checked" : ""}
      />
      <span class="filter-option-box" aria-hidden="true"></span>
      <span class="filter-option-text">${option.label}</span>
    </label>
  `;
}

function createFilterGroup(groupConfig) {
  const options = groupConfig.getOptions
    ? groupConfig.getOptions()
    : groupConfig.options;

  const selectedValues = catalogState.filters[groupConfig.key] || [];

  const group = document.createElement("div");
  group.className = "filter-group";

  group.innerHTML = `
    <button type="button" class="filter-toggle">${groupConfig.title}</button>
    <div class="filter-content ${groupConfig.openByDefault ? "active" : ""}">
      <div class="filter-content-inner">
        ${options
          .map((option) =>
            createFilterCheckbox(
              groupConfig.key,
              option,
              selectedValues.includes(option.value),
            ),
          )
          .join("")}
      </div>
    </div>
  `;

  return group;
}

function renderFilterGroups() {
  if (!catalogFiltersRoot) {
    return;
  }

  catalogFiltersRoot.innerHTML = "";

  FILTER_GROUPS.forEach((groupConfig) => {
    catalogFiltersRoot.appendChild(createFilterGroup(groupConfig));
  });

  bindFilterAccordion();
  initFilterAccordionHeights();
  bindFilterCheckboxes();
  syncSidebarScroll();
}

const filtersSidebarScroll = document.querySelector(".filters-sidebar-scroll");

function getFilterContentHeight(content) {
  const inner = content.querySelector(".filter-content-inner");

  if (!inner) {
    return 0;
  }

  return inner.scrollHeight;
}

function setFilterContentOpen(content, isOpen) {
  if (isOpen) {
    content.classList.add("active");
    content.style.maxHeight = `${getFilterContentHeight(content)}px`;
    return;
  }

  content.style.maxHeight = `${getFilterContentHeight(content)}px`;

  requestAnimationFrame(() => {
    content.style.maxHeight = "0px";
    content.classList.remove("active");
  });
}

function initFilterAccordionHeights() {
  if (!catalogFiltersRoot) {
    return;
  }

  catalogFiltersRoot.querySelectorAll(".filter-content").forEach((content) => {
    if (content.classList.contains("active")) {
      content.style.maxHeight = `${getFilterContentHeight(content)}px`;
      return;
    }

    content.style.maxHeight = "0px";
  });
}

function syncSidebarScroll() {
  if (!filtersSidebarScroll) {
    return;
  }

  requestAnimationFrame(() => {
    const maxScroll =
      filtersSidebarScroll.scrollHeight - filtersSidebarScroll.clientHeight;

    if (filtersSidebarScroll.scrollTop > maxScroll) {
      filtersSidebarScroll.scrollTop = Math.max(0, maxScroll);
    }
  });
}

function bindFilterAccordion() {
  const filterToggles = catalogFiltersRoot.querySelectorAll(".filter-toggle");

  filterToggles.forEach((toggle) => {
    const content = toggle.nextElementSibling;
    const isOpen = content.classList.contains("active");

    toggle.setAttribute("aria-expanded", String(isOpen));

    toggle.addEventListener("click", () => {
      const willOpen = !content.classList.contains("active");

      setFilterContentOpen(content, willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    content.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "max-height") {
        return;
      }

      if (content.classList.contains("active")) {
        content.style.maxHeight = `${getFilterContentHeight(content)}px`;
      }

      syncSidebarScroll();
    });
  });
}

function readFiltersFromDOM() {
  const nextFilters = {
    brands: [],
    genders: [],
    seasons: [],
    concentrations: [],
    notes: [],
  };

  Object.keys(nextFilters).forEach((groupKey) => {
    nextFilters[groupKey] = [
      ...catalogFiltersRoot.querySelectorAll(
        `input[data-filter="${groupKey}"]:checked`,
      ),
    ].map((input) => input.value);
  });

  return nextFilters;
}

function bindFilterCheckboxes() {
  const filterInputs = catalogFiltersRoot.querySelectorAll(
    "input[type='checkbox']",
  );

  filterInputs.forEach((input) => {
    input.addEventListener("change", () => {
      catalogState.filters = readFiltersFromDOM();
      updateCatalog();
    });
  });
}

/* =========================
   RENDER PERFUMES
========================= */

function renderPerfumes(data) {
  if (!perfumeGrid) {
    return;
  }

  perfumeGrid.innerHTML = "";

  const hasResults = data.length > 0;

  if (catalogEmpty) {
    catalogEmpty.hidden = hasResults;
  }

  if (perfumeGrid) {
    perfumeGrid.hidden = !hasResults;
  }

  if (!hasResults) {
    updateResultsMeta(0);
    return;
  }

  data.forEach((perfume) => {
    const card = document.createElement("div");
    const favorites = getFavorites();
    const isFavorite = favorites.includes(perfume.id);

    card.classList.add("perfume-card");

    card.innerHTML = `
      <div class="perfume-image">
        <button type="button" class="favorite-btn" aria-label="Добавить в избранное">
          ♡
        </button>
        <img src="${perfume.image}" alt="${perfume.name}" />
      </div>
      <div class="perfume-info">
        <div class="perfume-brand">${perfume.brand}</div>
        <h3>${perfume.name}</h3>
        <p>${perfume.description}</p>
        <div class="perfume-tags">
          ${perfume.accords
            .map((tag) => `<span class="perfume-tag">${tag}</span>`)
            .join("")}
        </div>
        <div class="perfume-rating">⭐ ${perfume.rating}</div>
      </div>
    `;

    const favoriteBtn = card.querySelector(".favorite-btn");

    if (isFavorite) {
      favoriteBtn.textContent = "♥";
      favoriteBtn.classList.add("active");
      favoriteBtn.setAttribute("aria-label", "Убрать из избранного");
    }

    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      let nextFavorites = getFavorites();
      const favoriteActive = nextFavorites.includes(perfume.id);

      if (favoriteActive) {
        nextFavorites = nextFavorites.filter((id) => id !== perfume.id);
        favoriteBtn.textContent = "♡";
        favoriteBtn.classList.remove("active");
        favoriteBtn.setAttribute("aria-label", "Добавить в избранное");
      } else {
        nextFavorites.push(perfume.id);
        favoriteBtn.textContent = "♥";
        favoriteBtn.classList.add("active");
        favoriteBtn.setAttribute("aria-label", "Убрать из избранного");
      }

      saveFavorites(nextFavorites);
    });

    card.addEventListener("click", () => {
      openPerfumeModal(perfume);
    });

    perfumeGrid.appendChild(card);
  });

  updateResultsMeta(data.length);
}

function updateResultsMeta(count) {
  if (!catalogResultsMeta) {
    return;
  }

  const total = perfumes.length;
  const label =
    count === total
      ? `Показано ${count} ароматов`
      : `Показано ${count} из ${total}`;

  catalogResultsMeta.textContent = label;
}

function openPerfumeModal(perfume) {
  if (!modalOverlay) {
    return;
  }

  modalOverlay.classList.add("active");
  modalPerfumeImage.src = perfume.image;
  modalPerfumeImage.alt = perfume.name;
  modalPerfumeBrand.textContent = perfume.brand;
  modalPerfumeName.textContent = perfume.name;
  modalPerfumeRating.textContent = `⭐ ${perfume.rating}`;
  modalPerfumeDescription.textContent = perfume.description;
  modalPerfumeTags.innerHTML = perfume.accords
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  const modalButton = document.querySelector(".modal-main-btn");

  if (modalButton) {
    modalButton.href = `perfume.html?id=${perfume.id}`;
  }

  document.body.style.overflow = "hidden";
}

function closePerfumeModal() {
  if (!modalOverlay) {
    return;
  }

  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================
   CATALOG UPDATE
========================= */

function getVisiblePerfumes() {
  return filterPerfumeList(perfumes, {
    query: catalogState.query,
    filters: catalogState.filters,
  });
}

function updateCatalog() {
  renderPerfumes(getVisiblePerfumes());
}

function resetCatalogFilters() {
  catalogState.query = "";
  catalogState.filters = {
    brands: [],
    genders: [],
    seasons: [],
    concentrations: [],
    notes: [],
  };

  if (searchInput) {
    searchInput.value = "";
  }

  renderFilterGroups();
  syncSidebarScroll();
  updateCatalog();
}

/* =========================
   EVENTS
========================= */

if (searchInput) {
  searchInput.addEventListener("input", () => {
    catalogState.query = searchInput.value;
    updateCatalog();
  });
}

if (filterResetBtn) {
  filterResetBtn.addEventListener("click", resetCatalogFilters);
}

if (modalClose) {
  modalClose.addEventListener("click", closePerfumeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closePerfumeModal();
    }
  });
}

/* =========================
   INIT
========================= */

renderFilterGroups();
updateCatalog();
