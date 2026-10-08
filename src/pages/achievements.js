/**
 * Dedicated Achievements Page Orchestrator — Ishmeet Singh
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import { initSiteChrome } from "../modules/siteNav.js";
import { initAchievementsSection } from "../modules/achievementsManager.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("achievements");
  initAchievementsSection();
});
