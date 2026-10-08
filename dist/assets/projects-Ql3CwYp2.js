import{i as n}from"./siteNav-e8-O1-lu.js";import{p as c,e as o}from"./experience-BSYqZUD3.js";document.addEventListener("DOMContentLoaded",()=>{n("projects-experience"),l(),d()});function l(){const s=document.getElementById("projectsStack");s&&(s.innerHTML=c.map(e=>{const a=e.architecture.cores.map(t=>`
      <div>
        <div class="core-item-name">${t.name}</div>
        <div class="core-item-desc">${t.responsibilities}</div>
      </div>
    `).join(""),r=e.capabilities.map(t=>`
      <li class="project-cap-item"><span>${t}</span></li>
    `).join(""),i=e.technologies.map(t=>`
      <span class="stack-pill">${t}</span>
    `).join("");return`
      <article class="project-feature-card" id="proj-${e.id}">
        <div class="project-card-header">
          <div>
            <span class="project-index-badge">${e.index} / ${e.category.toUpperCase()}</span>
            <h3 class="project-title">${e.name}</h3>
            <p class="project-tagline">${e.tagline}</p>
          </div>
          <div>
            <span class="meta-status-pill" style="font-size: 0.75rem;">${e.status}</span>
          </div>
        </div>

        <p class="project-summary">${e.summary}</p>

        <div class="project-arch-box">
          <div class="project-arch-title">ARCHITECTURE // ${e.architecture.headline}</div>
          <div class="project-cores-grid">
            ${a}
          </div>
          <div class="project-workflow-strip">
            <strong>PIPELINE:</strong> ${e.architecture.workflow}
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 700;">
            Key Capabilities
          </div>
          <ul class="project-capabilities-list">
            ${r}
          </ul>
        </div>

        <div class="project-stack-wrap">
          ${i}
        </div>

        <div class="project-actions">
          <a href="${e.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.8125rem; padding: 0.6rem 1.2rem;">
            <span>View on GitHub</span>
            <span>↗</span>
          </a>
        </div>
      </article>
    `}).join(""))}function d(){const s=document.getElementById("experienceGrid");s&&(s.innerHTML=o.map(e=>{const a=e.contributions.map(i=>`<li>${i}</li>`).join(""),r=e.technologies.map(i=>`<span class="stack-pill">${i}</span>`).join("");return`
      <div class="exp-card">
        <div class="exp-header">
          <h4 class="exp-role">${e.role}</h4>
          <span class="exp-badge">${e.badge}</span>
        </div>
        <div class="exp-org">${e.organization} · ${e.location}</div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${e.summary}</p>
        <ul class="exp-bullets" style="margin-bottom: 1.25rem;">
          ${a}
        </ul>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${r}
        </div>
      </div>
    `}).join(""))}
