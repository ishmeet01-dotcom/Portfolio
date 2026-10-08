/**
 * Dedicated Contact Page Orchestrator — Ishmeet Singh
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import { initSiteChrome } from "../modules/siteNav.js";
import { initContactForm } from "../modules/contactForm.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("contact");
  initContactForm();
});
