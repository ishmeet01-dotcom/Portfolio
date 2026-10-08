/**
 * Dedicated Skills Page Orchestrator — Ishmeet Singh
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import { technicalSkills, interpersonalSkills } from "../data/skills.js";
import { initSiteChrome } from "../modules/siteNav.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("skills");
  renderSkills();
});

function renderSkills() {
  const techContainer = document.getElementById("technicalSkillsGrid");
  const interContainer = document.getElementById("interpersonalSkillsColumn");

  if (techContainer) {
    techContainer.innerHTML = technicalSkills.map(s => `
      <div class="skill-tech-card">
        <div class="skill-cat-label">${s.category}</div>
        <div class="skill-title-row">
          <h4 class="skill-name">${s.name}</h4>
          <span class="skill-level-pill">${s.level}</span>
        </div>
        <p class="skill-focus-note">${s.focus}</p>
      </div>
    `).join("");
  }

  if (interContainer) {
    interContainer.innerHTML = interpersonalSkills.map(s => `
      <div class="interpersonal-item">
        <h4 class="interpersonal-title">${s.name}</h4>
        <p class="interpersonal-desc">${s.description}</p>
      </div>
    `).join("");
  }
}
