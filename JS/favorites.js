/* =========================
   DOM
========================= */

const favoritesGrid = document.querySelector(".favorites-grid");

const favoritesEmpty = document.querySelector(".favorites-empty");

/* =========================
   GET FAVORITES
========================= */

const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

/* =========================
   FIND PERFUMES
========================= */

const favoritePerfumes = perfumes.filter((perfume) =>
  favoriteIds.includes(perfume.id),
);

/* =========================
   EMPTY STATE
========================= */

if (favoritePerfumes.length === 0) {
  favoritesEmpty.style.display = "flex";
}

/* =========================
   RENDER
========================= */

favoritePerfumes.forEach((perfume) => {
  const card = document.createElement("a");

  card.classList.add("favorite-card");

  card.href = `perfume.html?id=${perfume.id}`;

  card.innerHTML = `

    <div class="favorite-image">

      <img
        src="${perfume.image}"
        alt="${perfume.name}"
      >

    </div>



    <div class="favorite-info">

      <div class="favorite-brand">

        ${perfume.brand}

      </div>



      <h3>

        ${perfume.name}

      </h3>



      <div class="favorite-rating">

        ⭐ ${perfume.rating}

      </div>

    </div>

  `;

  favoritesGrid.appendChild(card);
});
