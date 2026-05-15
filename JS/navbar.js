/* =========================
   NAVBAR
========================= */

const navbar = document.querySelector("#navbar");

/* =========================
   FAVORITES COUNT
========================= */

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* =========================
   CURRENT PAGE
========================= */

const currentPage = window.location.pathname.split("/").pop();

/* =========================
   RENDER
========================= */

navbar.innerHTML = `

<nav class="navbar">

  <!-- LOGO -->

  <a
    href="index.html"
    class="navbar-logo"
  >

    GS

  </a>



  <!-- CENTER -->

  <div class="navbar-center">



    <a
      href="index.html"

      class="
        nav-pill

        ${currentPage === "index.html" || currentPage === "" ? "active" : ""}
      "
    >

      Главная

    </a>



    <a
      href="catalog.html"

      class="
        nav-pill

        ${currentPage === "catalog.html" ? "active" : ""}
      "
    >

      Каталог

    </a>



    <a
      href="favorites.html"

      class="
        nav-pill

        ${currentPage === "favorites.html" ? "active" : ""}
      "
    >

      Избранное



      <span class="favorites-count">

        ${favorites.length}

      </span>

    </a>

  </div>



  <!-- ACTIONS -->

  <div class="navbar-actions">



    <!-- SEARCH -->

<button class="icon-btn search-btn">

  <svg
    viewBox="0 0 24 24"
    class="icon"
  >

    <circle
      cx="11"
      cy="11"
      r="7"
    />

    <line
      x1="16.5"
      y1="16.5"
      x2="22"
      y2="22"
    />

  </svg>

</button>



    <!-- THEME -->

<button class="theme-switch">
      
  <!-- SUN -->

  <svg
    class="icon sun"
    viewBox="0 0 24 24"
  >

    <circle
      cx="12"
      cy="12"
      r="4"
    />

    <g stroke-width="2">

      <line
        x1="12"
        y1="2"
        x2="12"
        y2="5"
      />

      <line
        x1="12"
        y1="19"
        x2="12"
        y2="22"
      />

      <line
        x1="2"
        y1="12"
        x2="5"
        y2="12"
      />

      <line
        x1="19"
        y1="12"
        x2="22"
        y2="12"
      />

      <line
        x1="4.2"
        y1="4.2"
        x2="6.5"
        y2="6.5"
      />

      <line
        x1="17.5"
        y1="17.5"
        x2="19.8"
        y2="19.8"
      />

      <line
        x1="4.2"
        y1="19.8"
        x2="6.5"
        y2="17.5"
      />

      <line
        x1="17.5"
        y1="6.5"
        x2="19.8"
        y2="4.2"
      />

    </g>

  </svg>



  <!-- MOON -->

  <svg
    class="icon moon"
    viewBox="0 0 24 24"
  >

    <path
      d="
      M21 12.8
      A9 9 0 0 1 11.2 3
      7 7 0 1 0 21 12.8z
      "
    />

  </svg>



  <!-- SWITCH -->

  <div class="switch-circle"></div>

</button>



    <!-- PROFILE -->

<button
  class="
    icon-btn
    profile-btn
  "
>

  <img
    class="avatar"
    src=""
    alt=""
  >



  <svg
    class="
      icon
      default-user
    "

    viewBox="0 0 24 24"
  >

    <circle
      cx="12"
      cy="8"
      r="4"
    />

    <path
      d="
      M4 20
      c2-4 14-4 16 0
      "
    />

  </svg>

</button>

  </div>

</nav>

`;

/* =========================
   SCROLL EFFECT
========================= */

const navbarElement = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbarElement.classList.add("scrolled");
  } else {
    navbarElement.classList.remove("scrolled");
  }
});
