/**
 * COA LAB — Dedicated Page Orchestrator
 * Ishmeet Singh Personal Portfolio
 */

import "../styles/variables.css";
import "../styles/editorial.css";
import "../styles/coa.css";

import profile from "../data/profile.js";
import { initSiteChrome } from "../modules/siteNav.js";
import { initCoaLab } from "../modules/coaLabEngine.js";

function runWhenReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

runWhenReady(() => {
  initSiteChrome("coa");
  document.title = `COA Lab — Interactive Computer Architecture | ${profile.name}`;
  initCoaLab();
});
