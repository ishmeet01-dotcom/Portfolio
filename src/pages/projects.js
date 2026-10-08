/**
 * Dedicated Projects & Experience Page Orchestrator — Ishmeet Singh
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import projects from "../data/projects.js";
import experience from "../data/experience.js";
import { initSiteChrome } from "../modules/siteNav.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("projects-experience");
  renderProjects();
  renderExperience();
});

function renderProjects() {
  const container = document.getElementById("projectsStack");
  if (!container) return;

  container.innerHTML = projects.map(proj => {
    const coresHtml = proj.architecture.cores.map(c => `
      <div>
        <div class="core-item-name">${c.name}</div>
        <div class="core-item-desc">${c.responsibilities}</div>
      </div>
    `).join("");

    const capsHtml = proj.capabilities.map(cap => `
      <li class="project-cap-item"><span>${cap}</span></li>
    `).join("");

    const stackHtml = proj.technologies.map(tech => `
      <span class="stack-pill">${tech}</span>
    `).join("");

    return `
      <article class="project-feature-card" id="proj-${proj.id}">
        <div class="project-card-header">
          <div>
            <span class="project-index-badge">${proj.index} / ${proj.category.toUpperCase()}</span>
            <h3 class="project-title">${proj.name}</h3>
            <p class="project-tagline">${proj.tagline}</p>
          </div>
          <div>
            <span class="meta-status-pill" style="font-size: 0.75rem;">${proj.status}</span>
          </div>
        </div>

        <p class="project-summary">${proj.summary}</p>

        <div class="project-arch-box">
          <div class="project-arch-title">ARCHITECTURE // ${proj.architecture.headline}</div>
          <div class="project-cores-grid">
            ${coresHtml}
          </div>
          <div class="project-workflow-strip">
            <strong>PIPELINE:</strong> ${proj.architecture.workflow}
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 700;">
            Key Capabilities
          </div>
          <ul class="project-capabilities-list">
            ${capsHtml}
          </ul>
        </div>

        <div class="project-stack-wrap">
          ${stackHtml}
        </div>

        <div class="project-actions">
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.8125rem; padding: 0.6rem 1.2rem;">
            <span>View on GitHub</span>
            <span>↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");
}

function renderExperience() {
  const container = document.getElementById("experienceGrid");
  if (!container) return;

  container.innerHTML = experience.map(exp => {
    const bulletsHtml = exp.contributions.map(c => `<li>${c}</li>`).join("");
    const techHtml = exp.technologies.map(t => `<span class="stack-pill">${t}</span>`).join("");

    return `
      <div class="exp-card">
        <div class="exp-header">
          <h4 class="exp-role">${exp.role}</h4>
          <span class="exp-badge">${exp.badge}</span>
        </div>
        <div class="exp-org">${exp.organization} · ${exp.location}</div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${exp.summary}</p>
        <ul class="exp-bullets" style="margin-bottom: 1.25rem;">
          ${bulletsHtml}
        </ul>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${techHtml}
        </div>
      </div>
    `;
  }).join("");
}
