/* =========================
   DOM READY
========================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
       DOM
    ========================= */

  const profileBtn = document.querySelector(".profile-btn");

  const authOverlay = document.querySelector(".auth-overlay");

  const authClose = document.querySelector(".auth-close");

  const authTabs = document.querySelectorAll(".auth-tab");

  const authForms = document.querySelectorAll(".auth-form");

  /* safety */

  if (!profileBtn || !authOverlay) {
    return;
  }

  /* =========================
       OPEN
    ========================= */

  profileBtn.addEventListener("click", () => {
    authOverlay.classList.add("active");
  });

  /* =========================
       CLOSE
    ========================= */

  authClose.addEventListener("click", () => {
    authOverlay.classList.remove("active");
  });

  /* overlay click */

  authOverlay.addEventListener("click", (e) => {
    if (e.target === authOverlay) {
      authOverlay.classList.remove("active");
    }
  });

  /* =========================
       ESC CLOSE
    ========================= */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      authOverlay.classList.remove("active");
    }
  });

  /* =========================
       TABS
    ========================= */

  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const currentTab = tab.dataset.tab;

      /* remove active */

      authTabs.forEach((t) => {
        t.classList.remove("active");
      });

      authForms.forEach((form) => {
        form.classList.remove("active");
      });

      /* activate */

      tab.classList.add("active");

      document
        .querySelector(`#${currentTab}-form`)

        .classList.add("active");
    });
  });

  /* =========================
   PASSWORD TOGGLE
========================= */

  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector(".password-input");

      if (input.type === "password") {
        input.type = "text";

        toggle.classList.add("active");
      } else {
        input.type = "password";

        toggle.classList.remove("active");
      }
    });
  });
});
