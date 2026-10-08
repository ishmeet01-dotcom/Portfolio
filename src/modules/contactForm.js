/**
 * Contact Form Mechanism — Ishmeet Singh
 * Truly functional contact handler using native mailto: generation,
 * clipboard backup, and tactile UI feedback. No fake endpoints.
 */

import profile from "../data/profile.js";
import { showToast } from "./toast.js";

export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName")?.value.trim();
    const email = document.getElementById("contactEmail")?.value.trim();
    const subject = document.getElementById("contactSubject")?.value.trim() || "Collaboration / Security Inquiry";
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !email || !message) {
      showToast("Please provide your name, email, and message.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const recipient = profile.email;
    const emailBody = `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}\n\n---\nSent via Ishmeet Singh Portfolio`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Copy details to clipboard as fallback in case mailto client isn't configured
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`To: ${recipient}\nSubject: ${subject}\n\n${emailBody}`).then(() => {
        showToast("Email composed! Message details also copied to clipboard.", "success");
      }).catch(() => {
        showToast("Opening default mail client...", "info");
      });
    }

    // Trigger user mail client
    window.location.href = mailtoUrl;

    form.reset();
  });

  // Copy email button trigger
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(profile.email).then(() => {
          showToast(`Copied ${profile.email} to clipboard!`, "success");
        });
      }
    });
  }
}

export default initContactForm;
