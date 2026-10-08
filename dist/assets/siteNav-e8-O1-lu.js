(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const l={name:"Ishmeet Singh",monogram:"IS",positioning:"Offensive Security · Red Teaming · Vulnerability Research · AI Security · Generative AI",email:"ishmeet1180@cuchd.in",github:"https://github.com/ishmeet01-dotcom",linkedin:"https://www.linkedin.com/in/ishmeet-singh-93636b377/",uid:"25BAI10010"},c="portfolio_theme_pref";function h(){const t=document.getElementById("themeToggleBtn"),e=localStorage.getItem(c),a=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;d(e||(a?"dark":"light")),t&&t.addEventListener("click",()=>{const n=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";d(n),localStorage.setItem(c,n)})}function d(t){t==="dark"?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme"),m(t)}function m(t){const e=document.getElementById("themeToggleBtn");e&&(t==="dark"?(e.innerHTML=`
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `,e.setAttribute("aria-label","Switch to Light Mode"),e.setAttribute("title","Switch to Light Mode")):(e.innerHTML=`
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `,e.setAttribute("aria-label","Switch to Dark Mode"),e.setAttribute("title","Switch to Dark Mode")))}const u=[{id:"home",num:"01",label:"Home",href:"/",anchor:"#home"},{id:"about",num:"02",label:"About",href:"/about/",anchor:"#about"},{id:"projects-experience",num:"03",label:"Projects & Experience",href:"/projects/",anchor:"#projects-experience"},{id:"skills",num:"04",label:"Skills",href:"/skills/",anchor:"#skills"},{id:"education",num:"05",label:"Education",href:"/education/",anchor:"#education"},{id:"achievements",num:"06",label:"Achievements",href:"/achievements/",anchor:"#achievements"},{id:"coa",num:"07",label:"COA Lab",href:"/coa/",anchor:"#coa-lab"},{id:"resume",num:"08",label:"Resume",href:"/resume/",anchor:"#resume"},{id:"contact",num:"09",label:"Contact",href:"/contact/",anchor:"#contact"}];function y(t){f(t),v(),h(),g(),p(),b(t)}function f(t){const e=document.getElementById("siteHeader");if(!e)return;const a=t==="home",r=u.map(n=>{const o=n.id===t;return`
      <li>
        <a href="${a?n.anchor:n.href}" class="nav-capsule-link ${o?"active":""}" data-nav="${n.id}">
          <span class="nav-num-badge">${n.num}</span>
          <span>${n.label}</span>
        </a>
      </li>
    `}).join(""),i=u.map(n=>{const o=n.id===t;return`
      <li>
        <a href="${a?n.anchor:n.href}" class="mobile-drawer-link ${o?"active":""}" data-nav="${n.id}">
          <span class="nav-num-badge">${n.num}</span>
          <span>${n.label}</span>
        </a>
      </li>
    `}).join("");e.innerHTML=`
    <nav class="navbar-capsule" aria-label="Main Navigation">
      <!-- Monogram / Personal Brand -->
      <a href="/" class="brand-capsule" aria-label="Ishmeet Singh Home">
        <span class="brand-badge">${l.monogram}</span>
        <span style="font-weight: 750; letter-spacing: -0.02em;">${l.name.toUpperCase()}</span>
      </a>

      <!-- Desktop Floating Links Capsule -->
      <ul class="nav-links-wrap" role="menubar">
        ${r}
      </ul>

      <!-- Action Controls -->
      <div class="nav-controls">
        <button type="button" id="themeToggleBtn" class="theme-capsule-btn" aria-label="Toggle light or dark theme" title="Toggle theme">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        <button type="button" id="mobileNavToggle" class="mobile-capsule-toggle" aria-label="Open navigation menu" aria-expanded="false">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div id="mobileNavDrawer" class="mobile-nav-drawer" aria-label="Mobile Navigation">
      <ul class="mobile-drawer-links">
        ${i}
      </ul>
    </div>
  `}function g(){const t=document.getElementById("mobileNavToggle"),e=document.getElementById("mobileNavDrawer");if(!t||!e)return;function a(){e.classList.contains("open")?(e.classList.remove("open"),t.setAttribute("aria-expanded","false")):(e.classList.add("open"),t.setAttribute("aria-expanded","true"))}t.addEventListener("click",a),e.querySelectorAll("a").forEach(r=>{r.addEventListener("click",()=>{e.classList.remove("open"),t.setAttribute("aria-expanded","false")})}),document.addEventListener("click",r=>{!e.contains(r.target)&&!t.contains(r.target)&&e.classList.contains("open")&&(e.classList.remove("open"),t.setAttribute("aria-expanded","false"))})}function p(){document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(e){const a=this.getAttribute("href");if(a==="#")return;const r=document.querySelector(a);r&&(e.preventDefault(),r.scrollIntoView({behavior:"smooth",block:"start"}),history.pushState(null,null,a))})})}function b(t){if(t!=="home")return;const e=document.querySelectorAll("section[id]");if(!e.length)return;const a=new IntersectionObserver(r=>{r.forEach(i=>{if(i.isIntersecting){const n=i.target.getAttribute("id");document.querySelectorAll(".nav-capsule-link").forEach(o=>{const s=o.getAttribute("href");s===`#${n}`?o.classList.add("active"):s.startsWith("#")&&o.classList.remove("active")})}})},{threshold:.25,rootMargin:"-10% 0px -60% 0px"});e.forEach(r=>a.observe(r))}function v(){const t=document.getElementById("siteFooter");if(!t)return;const e=new Date().getFullYear();t.innerHTML=`
    <div class="container">
      <div class="footer-inner-grid">
        <div>
          <div class="footer-brand-title">${l.name.toUpperCase()}</div>
          <p class="footer-brand-desc">
            ${l.positioning}. Exploring how systems break to understand how they work.
          </p>
        </div>

        <div>
          <div class="footer-col-title">NAVIGATION</div>
          <ul class="footer-links-list">
            <li><a href="/#about">About Identity</a></li>
            <li><a href="/#projects-experience">Projects &amp; Experience</a></li>
            <li><a href="/#skills">Technical Arsenal</a></li>
            <li><a href="/#education">Academic Background</a></li>
            <li><a href="/#achievements">Credentials &amp; Gallery</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">LABS &amp; RESUME</div>
          <ul class="footer-links-list">
            <li><a href="/coa/">COA Interactive Lab</a></li>
            <li><a href="/resume/">Verified Resume</a></li>
            <li><a href="/#contact">Direct Contact</a></li>
            <li><a href="${l.github}" target="_blank" rel="noopener noreferrer">GitHub Profile ↗</a></li>
            <li><a href="${l.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div>© ${e} ${l.name}. All rights reserved.</div>
        <div>Chandigarh University · UID: ${l.uid} · Mohali, Punjab</div>
      </div>
    </div>
  `}export{y as i,l as p};
