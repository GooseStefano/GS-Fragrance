export function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}
