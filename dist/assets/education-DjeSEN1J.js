import{i as o,p as d}from"./siteNav-e8-O1-lu.js";import{e as t}from"./education-U3nDwZpN.js";document.addEventListener("DOMContentLoaded",()=>{o("education"),i()});function i(){const n=document.getElementById("educationContainer");if(!n)return;const a=t.find(e=>e.dominant),s=t.filter(e=>!e.dominant).map(e=>`
    <div class="edu-card-secondary">
      <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); margin-bottom: 0.25rem;">
        ${e.period} · ${e.gradeLabel}: ${e.gradeValue}
      </div>
      <h3 class="edu-secondary-degree">${e.degree}</h3>
      <div class="edu-secondary-inst">${e.institution}, ${e.location}</div>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4;">${e.summary}</p>
    </div>
  `).join("");n.innerHTML=`
    <div class="edu-card-dominant">
      <span class="edu-tag-dominant">HIGHER EDUCATION &amp; UNDERGRADUATE</span>
      <h2 class="edu-degree-dominant">${a.degree}</h2>
      <p class="edu-inst-dominant">${a.institution} · ${a.location}</p>

      <div class="edu-meta-strip">
        <div>
          <span class="edu-meta-label">SESSION:</span>
          <span class="edu-meta-val">${a.period}</span>
        </div>
        <div>
          <span class="edu-meta-label">ACADEMIC STANDING:</span>
          <span class="edu-meta-val" style="color: var(--accent);">${a.gradeLabel} ${a.gradeValue}</span>
        </div>
        <div>
          <span class="edu-meta-label">STUDENT UID:</span>
          <span class="edu-meta-val">${d.uid}</span>
        </div>
      </div>

      <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
        ${a.summary}
      </p>

      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
        ${a.highlights.map(e=>`<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent); font-weight: bold;">✓</span> <span>${e}</span></li>`).join("")}
      </ul>
    </div>

    <div class="edu-secondary-stack">
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">
        SECONDARY &amp; MATRICULATION
      </div>
      ${s}
    </div>
  `}
