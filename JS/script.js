/* === DOM === */

const themeSwitch = document.querySelector(".theme-switch");
const body = document.body;

/* === ТЕМА (сохранение) === */

// загрузка темы при открытии
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
}

// переключение темы
themeSwitch.addEventListener("click", () => {
  body.classList.toggle("light");

  // сохраняем
  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

/* === АВАТАР (заготовка) === */

// пример: если есть сохранённый аватар
const savedAvatar = localStorage.getItem("avatar");

if (savedAvatar) {
  const profileBtn = document.querySelector(".profile-btn");
  const avatar = profileBtn.querySelector(".avatar");

  avatar.src = savedAvatar;
  profileBtn.classList.add("logged");
}

/* =========================
   NOTIFICATION
========================= */

const notification = document.querySelector(".notification");

function showNotification(text, type) {
  notification.textContent = text;

  notification.className = `notification show ${type}`;

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2600);
}
