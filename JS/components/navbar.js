import { getFavorites } from "../services/favorites.js";
import { getCurrentPage } from "../utils/helpers.js";

const NAV_ITEMS = [
  { href: "index.html", label: "Главная" },
  { href: "catalog.html", label: "Каталог" },
  { href: "favorites.html", label: "Избранное", hasCounter: true },
];

function getLinkClass(item, baseClass, currentPage) {
  const isActive = item.href === currentPage;

  return `${baseClass}${isActive ? " active" : ""}`;
}

function getAriaCurrent(item, currentPage) {
  return item.href === currentPage ? ' aria-current="page"' : "";
}

function getCounterMarkup(item, favoritesCount) {
  if (!item.hasCounter) {
    return "";
  }

  return `<span class="favorites-count" aria-label="В избранном ${favoritesCount}">
    ${favoritesCount}
  </span>`;
}

function getActionCounterMarkup(favoritesCount) {
  if (favoritesCount <= 0) {
    return "";
  }

  return `<span class="navbar-action-count" aria-label="В избранном ${favoritesCount}">
    ${favoritesCount}
  </span>`;
}

function renderNavLinks(baseClass, currentPage, favoritesCount) {
  return NAV_ITEMS.map(
    (item) => `
      <a
        href="${item.href}"
        class="${getLinkClass(item, baseClass, currentPage)}"
        ${getAriaCurrent(item, currentPage)}
      >
        <span>${item.label}</span>
        ${getCounterMarkup(item, favoritesCount)}
      </a>
    `,
  ).join("");
}

function renderNavbarMarkup(currentPage, favoritesCount) {
  return `
    <nav class="navbar" aria-label="Главная навигация">
      <a
        href="index.html"
        class="navbar-logo"
        aria-label="На главную страницу PERFUMESITE"
      >
        <span class="navbar-logo-mark">GS</span>
        <span class="navbar-logo-copy">
          <span class="navbar-logo-title">PERFUMESITE</span>
          <span class="navbar-logo-subtitle">Discover your essence</span>
        </span>
      </a>

      <div class="navbar-center">
        ${renderNavLinks("nav-pill", currentPage, favoritesCount)}
      </div>

      <div class="navbar-actions">
        <button
          class="icon-btn search-btn"
          type="button"
          aria-label="Открыть поиск"
        >
          <svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </button>

        <a
          class="icon-btn favorites-action-btn"
          href="favorites.html"
          aria-label="Открыть избранное"
        >
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 4.6a5.2 5.2 0 0 0-7.4 0L12 6l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 20.8l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z" />
          </svg>
          ${getActionCounterMarkup(favoritesCount)}
        </a>

        <button
          class="icon-btn profile-btn"
          type="button"
          aria-label="Открыть профиль"
        >
          <img class="avatar" src="" alt="Аватар пользователя" />

          <svg class="icon default-user" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c2-4 14-4 16 0" />
          </svg>
        </button>

        <button
          class="theme-switch"
          type="button"
          aria-label="Включить светлую тему"
          aria-pressed="false"
        >
          <svg class="icon sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <g stroke-width="2">
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.2" y1="4.2" x2="6.5" y2="6.5" />
              <line x1="17.5" y1="17.5" x2="19.8" y2="19.8" />
              <line x1="4.2" y1="19.8" x2="6.5" y2="17.5" />
              <line x1="17.5" y1="6.5" x2="19.8" y2="4.2" />
            </g>
          </svg>

          <svg class="icon moon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="
                M21 12.8
                A9 9 0 0 1 11.2 3
                7 7 0 1 0 21 12.8z
              "
            />
          </svg>

          <span class="switch-circle" aria-hidden="true"></span>
        </button>

        <button
          class="icon-btn menu-toggle"
          type="button"
          aria-label="Открыть меню"
          aria-expanded="false"
          aria-controls="mobile-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        class="mobile-menu"
        id="mobile-navigation"
        aria-hidden="true"
      >
        ${renderNavLinks("mobile-menu-link", currentPage, favoritesCount)}
      </div>
    </nav>

    <div class="mobile-nav-backdrop" aria-hidden="true"></div>
  `;
}

function initThemeSwitch() {
  const themeSwitch = document.querySelector(".theme-switch");

  if (!themeSwitch) {
    return;
  }

  function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light", isLight);

    themeSwitch.setAttribute("aria-pressed", String(isLight));
    themeSwitch.setAttribute(
      "aria-label",
      isLight ? "Включить тёмную тему" : "Включить светлую тему",
    );
  }

  const savedTheme =
    localStorage.getItem("theme") === "light" ? "light" : "dark";

  applyTheme(savedTheme);

  themeSwitch.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light")
      ? "dark"
      : "light";

    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

function initProfileAvatar() {
  const profileBtn = document.querySelector(".profile-btn");

  if (!profileBtn) {
    return;
  }

  const avatar = profileBtn.querySelector(".avatar");
  const savedAvatar = localStorage.getItem("avatar");

  if (!savedAvatar || !avatar) {
    return;
  }

  avatar.src = savedAvatar;
  profileBtn.classList.add("logged");
}

function initMobileMenu() {
  const navbarElement = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileBackdrop = document.querySelector(".mobile-nav-backdrop");

  if (!navbarElement || !menuToggle || !mobileMenu || !mobileBackdrop) {
    return;
  }

  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  const desktopMedia = window.matchMedia("(min-width: 901px)");

  function setMobileMenu(isOpen) {
    navbarElement.classList.toggle("menu-open", isOpen);
    document.body.classList.toggle("nav-lock", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Закрыть меню" : "Открыть меню",
    );

    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    mobileBackdrop.classList.toggle("active", isOpen);

    mobileMenuLinks.forEach((link) => {
      link.tabIndex = isOpen ? 0 : -1;
    });
  }

  setMobileMenu(false);

  menuToggle.addEventListener("click", () => {
    const isOpen = navbarElement.classList.contains("menu-open");

    setMobileMenu(!isOpen);
  });

  mobileBackdrop.addEventListener("click", () => {
    setMobileMenu(false);
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenu(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenu(false);
    }
  });

  desktopMedia.addEventListener("change", (event) => {
    if (event.matches) {
      setMobileMenu(false);
    }
  });
}

function initNavbarScroll() {
  const navbarElement = document.querySelector(".navbar");

  if (!navbarElement) {
    return;
  }

  function updateNavbarOnScroll() {
    navbarElement.classList.toggle("scrolled", window.scrollY > 40);
  }

  updateNavbarOnScroll();
  window.addEventListener("scroll", updateNavbarOnScroll);
}

export function initNavbar() {
  const navbarRoot = document.querySelector("#navbar");

  if (!navbarRoot) {
    return;
  }

  const currentPage = getCurrentPage();
  const favoritesCount = getFavorites().length;

  navbarRoot.innerHTML = renderNavbarMarkup(currentPage, favoritesCount);

  initThemeSwitch();
  initProfileAvatar();
  initMobileMenu();
  initNavbarScroll();
}
