/* =========================
   NOTIFICATION
========================= */

const notification = document.querySelector(".notification");

function showNotification(text, type = "info") {
  if (!notification) {
    return;
  }

  notification.textContent = text;

  notification.className = `notification show ${type}`;

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2600);
}

window.showNotification = showNotification;
