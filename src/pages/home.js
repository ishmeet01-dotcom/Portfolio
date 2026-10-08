/**
 * Home Page Orchestrator — Ishmeet Singh
 * Editorial narrative connecting all facets of technical identity.
 */

import "../styles/variables.css";
import "../styles/editorial.css";

import profile from "../data/profile.js";
import projects from "../data/projects.js";
import { technicalSkills, interpersonalSkills } from "../data/skills.js";
import experience from "../data/experience.js";
import education from "../data/education.js";
import { initSiteChrome } from "../modules/siteNav.js";
import { initAchievementsSection } from "../modules/achievementsManager.js";
import { initContactForm } from "../modules/contactForm.js";

document.addEventListener("DOMContentLoaded", () => {
  initSiteChrome("home");
  renderDynamicSections();
  initAchievementsSection();
  initContactForm();
});

function renderDynamicSections() {
  renderProjects();
  renderExperience();
  renderSkills();
  renderEducation();
}

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
            <span>View Repository</span>
            <span>↗</span>
          </a>
          <button type="button" class="btn-subtle" onclick="navigator.clipboard.writeText('${proj.githubUrl}').then(() => alert('Repository URL copied to clipboard!'))">
            Copy Repo URL
          </button>
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
      <h4 class="edu-secondary-degree">${e.degree}</h4>
      <div class="edu-secondary-inst">${e.institution}, ${e.location}</div>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4;">${e.summary}</p>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="edu-card-dominant">
      <span class="edu-tag-dominant">HIGHER EDUCATION &amp; UNDERGRADUATE</span>
      <h3 class="edu-degree-dominant">${dominantEdu.degree}</h3>
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
