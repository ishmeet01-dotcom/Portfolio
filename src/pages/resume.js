/**
 * Dedicated Resume Page Orchestrator — Ishmeet Singh
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import profile from "../data/profile.js";
import { initSiteChrome } from "../modules/siteNav.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("resume");
});
