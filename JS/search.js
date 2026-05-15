/* =========================
   DOM READY
========================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
       DOM
    ========================= */

  const searchBtn = document.querySelector(".search-btn");

  const searchOverlay = document.querySelector(".search-overlay");

  const searchClose = document.querySelector(".search-close");

  const searchInput = document.querySelector(".global-search-input");

  const searchResults = document.querySelector(".search-results");

  /* safety */

  if (!searchBtn || !searchOverlay) {
    return;
  }

  /* =========================
       OPEN
    ========================= */

  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");

    searchInput.focus();
  });

  /* =========================
       CLOSE
    ========================= */

  searchClose.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  /* overlay click */

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });

  /* =========================
       ESC CLOSE
    ========================= */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchOverlay.classList.remove("active");
    }
  });
});
