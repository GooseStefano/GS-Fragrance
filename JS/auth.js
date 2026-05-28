function createAuthOverlay() {
  if (document.querySelector(".auth-overlay")) {
    return;
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="auth-overlay">
        <div class="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <button class="auth-close" type="button" aria-label="Закрыть авторизацию">✕</button>

          <div class="auth-logo" aria-hidden="true">GS</div>

          <div class="auth-tabs" role="tablist" aria-label="Авторизация">
            <button class="auth-tab active" type="button" data-tab="login" role="tab" aria-selected="true">
              Вход
            </button>

            <button class="auth-tab" type="button" data-tab="register" role="tab" aria-selected="false">
              Регистрация
            </button>
          </div>

          <div class="auth-forms">
            <form class="auth-form active" id="login-form">
              <h2 id="auth-title">С возвращением</h2>

              <p>Войдите в свой аккаунт GS Fragrance</p>

              <div class="input-group">
                <input type="email" placeholder="Email" autocomplete="email" />
              </div>

              <div class="input-group">
                <input
                  type="password"
                  placeholder="Пароль"
                  class="password-input"
                  autocomplete="current-password"
                />

                <button type="button" class="password-toggle" aria-label="Показать пароль">
                  <svg class="eye-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                  </svg>

                  <svg class="eye-closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    <path
                      d="M4 4l16 16"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <button type="submit" class="auth-btn">Войти</button>
            </form>

            <form class="auth-form" id="register-form">
              <h2>Создать аккаунт</h2>

              <p>Присоединяйтесь к миру ароматов</p>

              <div class="input-group">
                <input type="text" placeholder="Имя" autocomplete="name" />
              </div>

              <div class="input-group">
                <input type="email" placeholder="Email" autocomplete="email" />
              </div>

              <div class="input-group">
                <input
                  type="password"
                  placeholder="Пароль"
                  class="password-input"
                  autocomplete="new-password"
                />

                <button type="button" class="password-toggle" aria-label="Показать пароль">
                  <svg class="eye-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                  </svg>

                  <svg class="eye-closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    <path
                      d="M4 4l16 16"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <button type="submit" class="auth-btn">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      </div>
    `,
  );
}

document.addEventListener("DOMContentLoaded", () => {
  createAuthOverlay();

  const profileBtn = document.querySelector(".profile-btn");
  const authOverlay = document.querySelector(".auth-overlay");
  const authClose = authOverlay.querySelector(".auth-close");
  const authTabs = authOverlay.querySelectorAll(".auth-tab");
  const authForms = authOverlay.querySelectorAll(".auth-form");

  if (!profileBtn || !authOverlay) {
    return;
  }

  function openAuth() {
    authOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeAuth() {
    authOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  profileBtn.addEventListener("click", openAuth);
  authClose.addEventListener("click", closeAuth);

  authOverlay.addEventListener("click", (event) => {
    if (event.target === authOverlay) {
      closeAuth();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAuth();
    }
  });

  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const currentTab = tab.dataset.tab;

      authTabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", String(item === tab));
      });

      authForms.forEach((form) => {
        form.classList.remove("active");
      });

      tab.classList.add("active");
      authOverlay.querySelector(`#${currentTab}-form`).classList.add("active");
    });
  });

  authForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      closeAuth();

      if (window.showNotification) {
        window.showNotification("Форма пока в демо-режиме", "success");
      }
    });
  });

  const passwordToggles = authOverlay.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector(".password-input");
      const isPasswordHidden = input.type === "password";

      input.type = isPasswordHidden ? "text" : "password";
      toggle.classList.toggle("active", isPasswordHidden);
      toggle.setAttribute(
        "aria-label",
        isPasswordHidden ? "Скрыть пароль" : "Показать пароль",
      );
    });
  });
});
