import{i as n}from"./siteNav-e8-O1-lu.js";import{t as s,i as t}from"./skills-CZUgICWH.js";document.addEventListener("DOMContentLoaded",()=>{n("skills"),a()});function a(){const e=document.getElementById("technicalSkillsGrid"),i=document.getElementById("interpersonalSkillsColumn");e&&(e.innerHTML=s.map(l=>`
      <div class="skill-tech-card">
        <div class="skill-cat-label">${l.category}</div>
        <div class="skill-title-row">
          <h4 class="skill-name">${l.name}</h4>
          <span class="skill-level-pill">${l.level}</span>
        </div>
        <p class="skill-focus-note">${l.focus}</p>
      </div>
    `).join("")),i&&(i.innerHTML=t.map(l=>`
      <div class="interpersonal-item">
        <h4 class="interpersonal-title">${l.name}</h4>
        <p class="interpersonal-desc">${l.description}</p>
      </div>
    `).join(""))}
