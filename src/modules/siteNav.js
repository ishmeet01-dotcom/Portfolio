/**
 * Sticky Floating Navigation Capsule & Editorial Footer Orchestrator
 * Ishmeet Singh Personal Portfolio
 */

import profile from "../data/profile.js";
import { initTheme } from "./theme.js";

export const NAV_ITEMS = [
  { id: "home", num: "01", label: "Home", href: "/", anchor: "#home" },
  { id: "about", num: "02", label: "About", href: "/about/", anchor: "#about" },
  { id: "projects-experience", num: "03", label: "Projects & Experience", href: "/projects/", anchor: "#projects-experience" },
  { id: "skills", num: "04", label: "Skills", href: "/skills/", anchor: "#skills" },
  { id: "education", num: "05", label: "Education", href: "/education/", anchor: "#education" },
  { id: "achievements", num: "06", label: "Achievements", href: "/achievements/", anchor: "#achievements" },
  { id: "coa", num: "07", label: "COA Lab", href: "/coa/", anchor: "#coa-lab" },
  { id: "resume", num: "08", label: "Resume", href: "/resume/", anchor: "#resume" },
  { id: "contact", num: "09", label: "Contact", href: "/contact/", anchor: "#contact" }
];

export function initSiteChrome(activePageId) {
  renderNavbarCapsule(activePageId);
  renderFooter();
  initTheme();
  bindMobileDrawer();
  bindSmoothScroll();
  initScrollSpy(activePageId);
}

function renderNavbarCapsule(activePageId) {
  const headerContainer = document.getElementById("siteHeader");
  if (!headerContainer) return;

  const isHomePage = activePageId === "home";

  const linksHtml = NAV_ITEMS.map(item => {
    const isActive = item.id === activePageId;
    // On the homepage, use anchor links for seamless continuous scrolling
    // For dedicated pages, use their direct routes
    const targetHref = isHomePage ? item.anchor : item.href;

    return `
      <li>
        <a href="${targetHref}" class="nav-capsule-link ${isActive ? 'active' : ''}" data-nav="${item.id}">
          <span class="nav-num-badge">${item.num}</span>
          <span>${item.label}</span>
        </a>
      </li>
    `;
  }).join("");

  const mobileLinksHtml = NAV_ITEMS.map(item => {
    const isActive = item.id === activePageId;
    const targetHref = isHomePage ? item.anchor : item.href;

    return `
      <li>
        <a href="${targetHref}" class="mobile-drawer-link ${isActive ? 'active' : ''}" data-nav="${item.id}">
          <span class="nav-num-badge">${item.num}</span>
          <span>${item.label}</span>
        </a>
      </li>
    `;
  }).join("");

  headerContainer.innerHTML = `
    <nav class="navbar-capsule" aria-label="Main Navigation">
      <!-- Monogram / Personal Brand -->
      <a href="/" class="brand-capsule" aria-label="Ishmeet Singh Home">
        <span class="brand-badge">${profile.monogram}</span>
        <span style="font-weight: 750; letter-spacing: -0.02em;">${profile.name.toUpperCase()}</span>
      </a>

      <!-- Desktop Floating Links Capsule -->
      <ul class="nav-links-wrap" role="menubar">
        ${linksHtml}
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
        ${mobileLinksHtml}
      </ul>
    </div>
  `;
}

function bindMobileDrawer() {
  const toggleBtn = document.getElementById("mobileNavToggle");
  const drawer = document.getElementById("mobileNavDrawer");
  if (!toggleBtn || !drawer) return;

  function toggle() {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    } else {
      drawer.classList.add("open");
      toggleBtn.setAttribute("aria-expanded", "true");
    }
  }

  toggleBtn.addEventListener("click", toggle);

  // Close drawer on link click
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

function bindSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, targetId);
      }
    });
  });
}

function initScrollSpy(activePageId) {
  if (activePageId !== "home") return;

  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-capsule-link").forEach(link => {
          const href = link.getAttribute("href");
          if (href === `#${id}`) {
            link.classList.add("active");
          } else if (href.startsWith("#")) {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" });

  sections.forEach(sec => observer.observe(sec));
}

function renderFooter() {
  const footerContainer = document.getElementById("siteFooter");
  if (!footerContainer) return;

  const currentYear = new Date().getFullYear();

  footerContainer.innerHTML = `
    <div class="container">
      <div class="footer-inner-grid">
        <div>
          <div class="footer-brand-title">${profile.name.toUpperCase()}</div>
          <p class="footer-brand-desc">
            ${profile.positioning}. Exploring how systems break to understand how they work.
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
            <li><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub Profile ↗</a></li>
            <li><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div>© ${currentYear} ${profile.name}. All rights reserved.</div>
        <div>Chandigarh University · UID: ${profile.uid} · Mohali, Punjab</div>
      </div>
    </div>
  `;
}
