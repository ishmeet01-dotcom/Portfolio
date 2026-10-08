/**
 * Dedicated Education Page Orchestrator — Ishmeet Singh
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import profile from "../data/profile.js";
import education from "../data/education.js";
import { initSiteChrome } from "../modules/siteNav.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("education");
  renderEducation();
});

function renderEducation() {
  const container = document.getElementById("educationContainer");
  if (!container) return;

  const dominantEdu = education.find(e => e.dominant);
  const secondaryEdu = education.filter(e => !e.dominant);

  const secondaryHtml = secondaryEdu.map(e => `
    <div class="edu-card-secondary">
      <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); margin-bottom: 0.25rem;">
        ${e.period} · ${e.gradeLabel}: ${e.gradeValue}
      </div>
      <h3 class="edu-secondary-degree">${e.degree}</h3>
      <div class="edu-secondary-inst">${e.institution}, ${e.location}</div>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4;">${e.summary}</p>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="edu-card-dominant">
      <span class="edu-tag-dominant">HIGHER EDUCATION &amp; UNDERGRADUATE</span>
      <h2 class="edu-degree-dominant">${dominantEdu.degree}</h2>
      <p class="edu-inst-dominant">${dominantEdu.institution} · ${dominantEdu.location}</p>

      <div class="edu-meta-strip">
        <div>
          <span class="edu-meta-label">SESSION:</span>
          <span class="edu-meta-val">${dominantEdu.period}</span>
        </div>
        <div>
          <span class="edu-meta-label">ACADEMIC STANDING:</span>
          <span class="edu-meta-val" style="color: var(--accent);">${dominantEdu.gradeLabel} ${dominantEdu.gradeValue}</span>
        </div>
        <div>
          <span class="edu-meta-label">STUDENT UID:</span>
          <span class="edu-meta-val">${profile.uid}</span>
        </div>
      </div>

      <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
        ${dominantEdu.summary}
      </p>

      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
        ${dominantEdu.highlights.map(h => `<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent); font-weight: bold;">✓</span> <span>${h}</span></li>`).join("")}
      </ul>
    </div>

    <div class="edu-secondary-stack">
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">
        SECONDARY &amp; MATRICULATION
      </div>
      ${secondaryHtml}
    </div>
  `;
}
