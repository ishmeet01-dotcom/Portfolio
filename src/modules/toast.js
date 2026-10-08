/**
 * Subtle non-intrusive notification toast
 */
let toastTimeout = null;

export function showToast(message, type = "info", duration = 3000) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toastItem = document.createElement("div");
  toastItem.className = `toast-item toast-${type}`;
  
  const icon = type === "error" ? "⚠" : (type === "success" ? "✓" : "ℹ");
  toastItem.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toastItem);

  setTimeout(() => {
    toastItem.style.opacity = "0";
    toastItem.style.transform = "translateY(8px)";
    toastItem.style.transition = "all 0.2s ease";
    setTimeout(() => {
      if (toastItem.parentNode) {
        toastItem.parentNode.removeChild(toastItem);
      }
    }, 200);
  }, duration);
}

export default showToast;
