/* =========================
   DOM
========================= */

const favoritesGrid = document.querySelector(".favorites-grid");
const favoritesEmpty = document.querySelector(".favorites-empty");

/* =========================
   FAVORITES STORAGE
========================= */

function getFavoriteIds() {
  try {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveFavoriteIds(ids) {
  localStorage.setItem("favorites", JSON.stringify(ids));
}

function syncFavoritesCounter() {
  const count = getFavoriteIds().length;

  document.querySelectorAll(".favorites-count").forEach((counter) => {
    counter.textContent = count;
    counter.setAttribute("aria-label", `В избранном ${count}`);
  });
}

function syncEmptyState() {
  const hasCards = favoritesGrid && favoritesGrid.children.length > 0;

  if (favoritesEmpty) {
    favoritesEmpty.style.display = hasCards ? "none" : "flex";
  }
}

/* =========================
   RENDER
========================= */

function renderFavoriteCard(perfume) {
  const card = document.createElement("div");

  card.classList.add("perfume-card", "favorite-card");
  card.tabIndex = 0;
  card.setAttribute("role", "link");

  card.innerHTML = `
    <div class="perfume-image">
      <button type="button" class="favorite-btn active" aria-label="Убрать из избранного">
        ♥
      </button>
      <img src="${perfume.image}" alt="${perfume.name}" />
    </div>
    <div class="perfume-info">
      <div class="perfume-brand">${perfume.brand}</div>
      <h3>${perfume.name}</h3>
      <p class="perfume-type">${perfume.concentration || "Fragrance"}</p>
      <p class="perfume-description">${perfume.description}</p>
      <div class="perfume-tags" aria-label="Аккорды аромата">
        ${perfume.accords
          .slice(0, 3)
          .map((tag) => `<span class="perfume-tag">${tag}</span>`)
          .join("")}
      </div>
      <div class="perfume-actions">
        <button type="button" class="product-action-btn">Подробнее</button>
      </div>
    </div>
  `;

  const favoriteBtn = card.querySelector(".favorite-btn");
  const actionBtn = card.querySelector(".product-action-btn");

  favoriteBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    saveFavoriteIds(getFavoriteIds().filter((id) => id !== perfume.id));
    card.remove();
    syncFavoritesCounter();
    syncEmptyState();
  });

  actionBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    openPerfumePage();
  });

  function openPerfumePage() {
    window.location.href = `perfume.html?id=${perfume.id}`;
  }

  card.addEventListener("click", openPerfumePage);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPerfumePage();
    }
  });

  favoritesGrid.appendChild(card);
}

const favoritePerfumes = perfumes.filter((perfume) =>
  getFavoriteIds().includes(perfume.id),
);

favoritePerfumes.forEach(renderFavoriteCard);
syncEmptyState();
