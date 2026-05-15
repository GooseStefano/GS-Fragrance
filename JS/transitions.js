/* =========================
   DOM
========================= */

const page = document.querySelector(".page-transition");

/* =========================
   PAGE LOADED
========================= */

window.addEventListener("load", () => {
  page.classList.add("loaded");
});

/* =========================
   PAGE LEAVING
========================= */

const links = document.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) {
      return;
    }

    e.preventDefault();

    page.classList.add("leaving");

    setTimeout(() => {
      window.location.href = href;
    }, 450);
  });
});
