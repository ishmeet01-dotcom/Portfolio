import{i as r,p as l}from"./siteNav-e8-O1-lu.js";import{i as c}from"./coaLabEngine-Bou3to78.js";import{p as d,e as m}from"./experience-BSYqZUD3.js";import{t as p,i as v}from"./skills-CZUgICWH.js";import{e as o}from"./education-U3nDwZpN.js";import{i as u}from"./achievementsManager-DIaQ_WaF.js";import{i as f}from"./contactForm-DLHbOcnf.js";import"./toast-Cci4BNr3.js";function y(a){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",a):a()}y(()=>{r("home"),g(),u(),c(),f()});function g(){$(),h(),b(),E()}function $(){const a=document.getElementById("projectsStack");a&&(a.innerHTML=d.map(e=>{const i=e.architecture.cores.map(s=>`
      <div>
        <div class="core-item-name">${s.name}</div>
        <div class="core-item-desc">${s.responsibilities}</div>
      </div>
    `).join(""),n=e.capabilities.map(s=>`
      <li class="project-cap-item"><span>${s}</span></li>
    `).join(""),t=e.technologies.map(s=>`
      <span class="stack-pill">${s}</span>
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
            ${i}
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
            ${n}
          </ul>
        </div>

        <div class="project-stack-wrap">
          ${t}
        </div>

        <div class="project-actions">
          <a href="${e.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.8125rem; padding: 0.6rem 1.2rem;">
            <span>View Repository</span>
            <span>↗</span>
          </a>
          <button type="button" class="btn-subtle" onclick="navigator.clipboard.writeText('${e.githubUrl}').then(() => alert('Repository URL copied to clipboard!'))">
            Copy Repo URL
          </button>
        </div>
      </article>
    `}).join(""))}function h(){const a=document.getElementById("experienceGrid");a&&(a.innerHTML=m.map(e=>{const i=e.contributions.map(t=>`<li>${t}</li>`).join(""),n=e.technologies.map(t=>`<span class="stack-pill">${t}</span>`).join("");return`
      <div class="exp-card">
        <div class="exp-header">
          <h4 class="exp-role">${e.role}</h4>
          <span class="exp-badge">${e.badge}</span>
        </div>
        <div class="exp-org">${e.organization} · ${e.location}</div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${e.summary}</p>
        <ul class="exp-bullets" style="margin-bottom: 1.25rem;">
          ${i}
        </ul>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${n}
        </div>
      </div>
    `}).join(""))}function b(){const a=document.getElementById("technicalSkillsGrid"),e=document.getElementById("interpersonalSkillsColumn");a&&(a.innerHTML=p.map(i=>`
      <div class="skill-tech-card">
        <div class="skill-cat-label">${i.category}</div>
        <div class="skill-title-row">
          <h4 class="skill-name">${i.name}</h4>
          <span class="skill-level-pill">${i.level}</span>
        </div>
        <p class="skill-focus-note">${i.focus}</p>
      </div>
    `).join("")),e&&(e.innerHTML=v.map(i=>`
      <div class="interpersonal-item">
        <h4 class="interpersonal-title">${i.name}</h4>
        <p class="interpersonal-desc">${i.description}</p>
      </div>
    `).join(""))}function E(){const a=document.getElementById("educationContainer");if(!a)return;const e=o.find(t=>t.dominant),n=o.filter(t=>!t.dominant).map(t=>`
    <div class="edu-card-secondary">
      <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); margin-bottom: 0.25rem;">
        ${t.period} · ${t.gradeLabel}: ${t.gradeValue}
      </div>
      <h4 class="edu-secondary-degree">${t.degree}</h4>
      <div class="edu-secondary-inst">${t.institution}, ${t.location}</div>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4;">${t.summary}</p>
    </div>
  `).join("");a.innerHTML=`
    <div class="edu-card-dominant">
      <span class="edu-tag-dominant">HIGHER EDUCATION &amp; UNDERGRADUATE</span>
      <h3 class="edu-degree-dominant">${e.degree}</h3>
      <p class="edu-inst-dominant">${e.institution} · ${e.location}</p>

      <div class="edu-meta-strip">
        <div>
          <span class="edu-meta-label">SESSION:</span>
          <span class="edu-meta-val">${e.period}</span>
        </div>
        <div>
          <span class="edu-meta-label">ACADEMIC STANDING:</span>
          <span class="edu-meta-val" style="color: var(--accent);">${e.gradeLabel} ${e.gradeValue}</span>
        </div>
        <div>
          <span class="edu-meta-label">STUDENT UID:</span>
          <span class="edu-meta-val">${l.uid}</span>
        </div>
      </div>

      <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
        ${e.summary}
      </p>

      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
        ${e.highlights.map(t=>`<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent); font-weight: bold;">✓</span> <span>${t}</span></li>`).join("")}
      </ul>
    </div>

    <div class="edu-secondary-stack">
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">
        SECONDARY &amp; MATRICULATION
      </div>
      ${n}
    </div>
  `}
