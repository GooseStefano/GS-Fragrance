/* =========================
   DOM
========================= */

const perfumeGrid = document.querySelector(".perfume-grid");

const searchInput = document.querySelector(".search-input");

const filterToggles = document.querySelectorAll(".filter-toggle");

const checkboxes = document.querySelectorAll(".filter-content input");

/* =========================
   FAVORITES
========================= */

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(
    "favorites",

    JSON.stringify(favorites),
  );
}

/* =========================
   MODAL DOM
========================= */

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
   ACCORDION
========================= */

filterToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;

    content.classList.toggle("active");
  });
});

/* =========================
   RENDER PERFUMES
========================= */

function renderPerfumes(data) {
  perfumeGrid.innerHTML = "";

  data.forEach((perfume) => {
    const card = document.createElement("div");
    const favorites = getFavorites();

    const isFavorite = favorites.includes(perfume.id);
    card.classList.add("perfume-card");

    card.innerHTML = `

      <div class="perfume-image">

        <button class="favorite-btn">

          ♡

        </button>

        <img
          src="${perfume.image}"
          alt="${perfume.name}"
        >

      </div>



      <div class="perfume-info">

        <div class="perfume-brand">

          ${perfume.brand}

        </div>



        <h3>

          ${perfume.name}

        </h3>



        <p>

          ${perfume.description}

        </p>



        <div class="perfume-tags">

          ${perfume.accords
            .map(
              (tag) => `

            <span class="perfume-tag">

              ${tag}

            </span>

          `,
            )
            .join("")}

        </div>



        <div class="perfume-rating">

          ⭐ ${perfume.rating}

        </div>

      </div>

    `;

    const favoriteBtn = card.querySelector(".favorite-btn");

    if (isFavorite) {
      favoriteBtn.textContent = "♥";

      favoriteBtn.classList.add("active");
    }

    favoriteBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      let favorites = getFavorites();

      const isFavorite = favorites.includes(perfume.id);

      if (isFavorite) {
        favorites = favorites.filter((id) => id !== perfume.id);

        favoriteBtn.textContent = "♡";

        favoriteBtn.classList.remove("active");
      } else {
        favorites.push(perfume.id);

        favoriteBtn.textContent = "♥";

        favoriteBtn.classList.add("active");
      }

      saveFavorites(favorites);
    });

    /* OPEN MODAL */

    card.addEventListener("click", () => {
      modalOverlay.classList.add("active");

      modalPerfumeImage.src = perfume.image;

      modalPerfumeImage.alt = perfume.name;

      modalPerfumeBrand.textContent = perfume.brand;

      modalPerfumeName.textContent = perfume.name;

      modalPerfumeRating.textContent = `⭐ ${perfume.rating}`;

      modalPerfumeDescription.textContent = perfume.description;

      modalPerfumeTags.innerHTML = perfume.accords
        .map(
          (tag) => `

          <span>

            ${tag}

          </span>

        `,
        )
        .join("");

      const modalButton = document.querySelector(".modal-main-btn");

      modalButton.href = `perfume.html?id=${perfume.id}`;

      document.body.style.overflow = "hidden";
    });

    perfumeGrid.appendChild(card);
  });
}

/* =========================
   SEARCH
========================= */

function filterPerfumes() {
  const searchValue = searchInput.value.toLowerCase();

  const filtered = perfumes.filter(
    (perfume) =>
      perfume.name.toLowerCase().includes(searchValue) ||
      perfume.brand.toLowerCase().includes(searchValue),
  );

  renderPerfumes(filtered);
}

/* =========================
   EVENTS
========================= */

searchInput.addEventListener("input", filterPerfumes);

/* CLOSE MODAL */

modalClose.addEventListener("click", () => {
  modalOverlay.classList.remove("active");

  document.body.style.overflow = "";
});

/* overlay click */

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");

    document.body.style.overflow = "";
  }
});

/* =========================
   INITIAL
========================= */

renderPerfumes(perfumes);
