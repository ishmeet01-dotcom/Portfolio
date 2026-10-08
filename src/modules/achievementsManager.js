/**
 * Achievements Section Interactive Orchestrator
 * Manages 4 tabs: Certifications | Achievements | Hackathons/CTFs | Gallery
 * Handles Modal dialogues for adding/uploading items with persistent client storage and lightbox viewing.
 */

import {
  getStoredCertificates,
  saveCertificate,
  getStoredAchievements,
  saveAchievement,
  getStoredHackathons,
  saveHackathon,
  getStoredGalleryItems,
  saveGalleryItem
} from "./storage.js";
import { showToast } from "./toast.js";

let activeTab = "certifications";

export function initAchievementsSection() {
  bindTabs();
  renderActiveTab();
  initModals();
  initLightbox();
}

function bindTabs() {
  const tabBtns = document.querySelectorAll(".achievements-tabs-bar .tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      if (tab === activeTab) return;

      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTab = tab;
      renderActiveTab();
    });
  });
}

export function renderActiveTab() {
  const container = document.getElementById("achievementsTabContent");
  if (!container) return;

  switch (activeTab) {
    case "certifications":
      renderCertificationsTab(container);
      break;
    case "achievements":
      renderAchievementsTab(container);
      break;
    case "hackathons":
      renderHackathonsTab(container);
      break;
    case "gallery":
      renderGalleryTab(container);
      break;
  }
}

// 1. CERTIFICATIONS TAB
function renderCertificationsTab(container) {
  const certs = getStoredCertificates();

  const cardsHtml = certs.map(cert => {
    const credUrlHtml = cert.credentialUrl 
      ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn-subtle" style="font-size: 0.75rem;">Verify Credential ↗</a>` 
      : "";
    const previewBtnHtml = cert.image 
      ? `<button type="button" class="btn-subtle view-image-btn" data-img="${cert.image}" data-title="${cert.name}" style="font-size: 0.75rem;">View Certificate ⛶</button>` 
      : "";

    return `
      <div class="cert-card-editorial">
        <div>
          <span class="cert-badge-tag">${cert.badgeText || 'Verified Credential'}</span>
          <h4 class="cert-name-text">${cert.name}</h4>
          <p class="cert-issuer-text">${cert.issuer} ${cert.date ? `· ${cert.date}` : ''}</p>
          <p class="cert-desc-text">${cert.description || 'Professional cybersecurity and cloud computing credential.'}</p>
        </div>

        <div>
          <div class="cert-footer-row">
            <span>ID: ${cert.credentialId || 'N/A'}</span>
            <div style="display: flex; gap: 0.5rem;">
              ${previewBtnHtml}
              ${credUrlHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="tab-action-bar">
      <div>
        <h3 class="tab-action-title">Documented Certifications &amp; Credentials</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Industry standards and verified technical certifications</p>
      </div>
      <button type="button" id="openUploadCertBtn" class="btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">
        + Upload Certificate
      </button>
    </div>

    <div class="certs-grid">
      ${cardsHtml}
    </div>
  `;

  // Bind upload button
  const uploadBtn = document.getElementById("openUploadCertBtn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => openModal("certModal"));
  }

  // Bind image viewers
  bindImageViewers(container);
}

// 2. ACHIEVEMENTS TAB
function renderAchievementsTab(container) {
  const items = getStoredAchievements();

  const cardsHtml = items.map(item => `
    <div class="hackathon-card">
      <div class="hackathon-title-row">
        <div>
          <h4 class="hackathon-name">${item.title}</h4>
          <p style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.2rem;">
            ${item.organization}
          </p>
        </div>
        <span class="hackathon-result-pill">${item.category}</span>
      </div>
      <p class="hackathon-summary">${item.summary}</p>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="tab-action-bar">
      <div>
        <h3 class="tab-action-title">Honors &amp; Campus Leadership</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Recognitions, club leadership, and contributions</p>
      </div>
      <button type="button" id="openAddAchBtn" class="btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">
        + Add Achievement
      </button>
    </div>

    <div>
      ${cardsHtml}
    </div>
  `;

  const addBtn = document.getElementById("openAddAchBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal("achievementModal"));
  }
}

// 3. HACKATHONS TAB
function renderHackathonsTab(container) {
  const items = getStoredHackathons();

  const cardsHtml = items.map(item => {
    const certBtnHtml = item.certificateImage 
      ? `<button type="button" class="btn-subtle view-image-btn" data-img="${item.certificateImage}" data-title="${item.name}" style="font-size: 0.75rem;">View Certificate ⛶</button>`
      : "";

    return `
      <div class="hackathon-card">
        <div class="hackathon-title-row">
          <div>
            <h4 class="hackathon-name">${item.name}</h4>
            <p style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.2rem;">
              ${item.category} · ${item.date}
            </p>
          </div>
          <span class="hackathon-result-pill">${item.result}</span>
        </div>

        <p class="hackathon-summary">${item.summary}</p>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-hairline); padding-top: 0.75rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap; gap: 0.5rem;">
          <div>
            ${item.partnerOrgs ? `<span>Partners: ${item.partnerOrgs}</span>` : ''}
            ${item.credentialId ? `<span style="margin-left: 0.75rem;">ID: ${item.credentialId}</span>` : ''}
          </div>
          <div>
            ${certBtnHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="tab-action-bar">
      <div>
        <h3 class="tab-action-title">Capture The Flag &amp; Hackathon Records</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Verified competition results and international contests</p>
      </div>
      <button type="button" id="openAddHackBtn" class="btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">
        + Add Hackathon / CTF
      </button>
    </div>

    <div>
      ${cardsHtml}
    </div>
  `;

  const addBtn = document.getElementById("openAddHackBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal("hackathonModal"));
  }

  bindImageViewers(container);
}

// 4. GALLERY TAB
function renderGalleryTab(container) {
  const items = getStoredGalleryItems();

  const cardsHtml = items.map(item => `
    <div class="gallery-card view-image-btn" data-img="${item.imageUrl}" data-title="${item.title}">
      <img src="${item.imageUrl}" alt="${item.title}" class="gallery-media-thumb" loading="lazy" />
      <div class="gallery-card-info">
        <span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--accent-text); font-weight: 700; text-transform: uppercase;">${item.category}</span>
        <h4 class="gallery-item-title">${item.title}</h4>
        <p class="gallery-item-caption">${item.caption}</p>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="tab-action-bar">
      <div>
        <h3 class="tab-action-title">Verified Visual Gallery</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Competition certificates, project screenshots, and architectural artifacts</p>
      </div>
      <button type="button" id="openUploadMediaBtn" class="btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">
        + Upload Media
      </button>
    </div>

    <div class="gallery-masonry-grid">
      ${cardsHtml}
    </div>
  `;

  const addBtn = document.getElementById("openUploadMediaBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal("mediaModal"));
  }

  bindImageViewers(container);
}

// MODAL CONTROLS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    modal.querySelector("input, select, textarea")?.focus();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    modal.querySelector("form")?.reset();
  }
}

function initModals() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  document.querySelectorAll(".modal-close-btn, .modal-cancel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal-overlay")?.classList.remove("active");
    });
  });

  // ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
    }
  });

  // 1. Certificate Form Submit
  const certForm = document.getElementById("formUploadCert");
  if (certForm) {
    certForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("certName")?.value.trim();
      const issuer = document.getElementById("certIssuer")?.value.trim();
      const date = document.getElementById("certDate")?.value.trim();
      const credentialId = document.getElementById("certId")?.value.trim();
      const credentialUrl = document.getElementById("certUrl")?.value.trim();
      const fileInput = document.getElementById("certFile");

      if (!name || !issuer) {
        showToast("Please provide certification name and issuer", "error");
        return;
      }

      let imageBase64 = null;
      if (fileInput?.files?.[0]) {
        try {
          imageBase64 = await readFileAsDataURL(fileInput.files[0]);
        } catch (err) {
          console.warn("Could not encode certificate image", err);
        }
      }

      const res = saveCertificate({
        name,
        issuer,
        date: date || "Recently Added",
        credentialId: credentialId || "LOCAL-STORED",
        credentialUrl: credentialUrl || null,
        badgeText: "Added Credential",
        description: `Verified credential issued by ${issuer}.`,
        image: imageBase64
      });

      if (res.success) {
        closeModal("certModal");
        showToast("Certificate saved to browser storage!", "success");
        renderActiveTab();
      } else {
        showToast(res.error || "Storage limit exceeded", "error");
      }
    });
  }

  // 2. Achievement Form Submit
  const achForm = document.getElementById("formAddAchievement");
  if (achForm) {
    achForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("achTitle")?.value.trim();
      const organization = document.getElementById("achOrg")?.value.trim();
      const category = document.getElementById("achCat")?.value.trim() || "Honor";
      const summary = document.getElementById("achSummary")?.value.trim();

      if (!title || !organization || !summary) {
        showToast("Please fill in all required achievement fields", "error");
        return;
      }

      const res = saveAchievement({ title, organization, category, summary });
      if (res.success) {
        closeModal("achievementModal");
        showToast("Achievement added to browser storage!", "success");
        renderActiveTab();
      } else {
        showToast(res.error, "error");
      }
    });
  }

  // 3. Hackathon Form Submit
  const hackForm = document.getElementById("formAddHackathon");
  if (hackForm) {
    hackForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("hackName")?.value.trim();
      const category = document.getElementById("hackCat")?.value.trim();
      const result = document.getElementById("hackResult")?.value.trim();
      const date = document.getElementById("hackDate")?.value.trim();
      const summary = document.getElementById("hackSummary")?.value.trim();
      const fileInput = document.getElementById("hackFile");

      if (!name || !category || !result) {
        showToast("Please provide event name, category and result", "error");
        return;
      }

      let imageBase64 = null;
      if (fileInput?.files?.[0]) {
        try {
          imageBase64 = await readFileAsDataURL(fileInput.files[0]);
        } catch (err) {}
      }

      const res = saveHackathon({
        name,
        category,
        result,
        date: date || "2026",
        summary: summary || "Contest participation in offensive security.",
        certificateImage: imageBase64
      });

      if (res.success) {
        closeModal("hackathonModal");
        showToast("Hackathon record saved to browser storage!", "success");
        renderActiveTab();
      } else {
        showToast(res.error, "error");
      }
    });
  }

  // 4. Media Form Submit
  const mediaForm = document.getElementById("formUploadMedia");
  if (mediaForm) {
    mediaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("mediaTitle")?.value.trim();
      const category = document.getElementById("mediaCat")?.value.trim() || "Media";
      const caption = document.getElementById("mediaCaption")?.value.trim();
      const fileInput = document.getElementById("mediaFile");

      if (!title || !fileInput?.files?.[0]) {
        showToast("Please provide media title and select an image file", "error");
        return;
      }

      try {
        const imageBase64 = await readFileAsDataURL(fileInput.files[0]);
        const res = saveGalleryItem({
          title,
          category,
          caption: caption || title,
          imageUrl: imageBase64
        });

        if (res.success) {
          closeModal("mediaModal");
          showToast("Media uploaded and saved to browser storage!", "success");
          renderActiveTab();
        } else {
          showToast(res.error || "File too large for browser storage", "error");
        }
      } catch (err) {
        showToast("Could not process uploaded file", "error");
      }
    });
  }
}

// Lightbox for full-resolution previews
function initLightbox() {
  let lightbox = document.getElementById("imageLightboxModal");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "imageLightboxModal";
    lightbox.className = "modal-overlay";
    lightbox.innerHTML = `
      <div class="modal-window" style="max-width: 900px; padding: 1.5rem; background: var(--bg-surface); text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h4 id="lightboxTitle" style="font-size: 1.125rem; font-weight: 700;">Certificate Viewer</h4>
          <button type="button" class="modal-close-btn" id="closeLightboxBtn" aria-label="Close viewer">✕</button>
        </div>
        <div style="max-height: 75vh; overflow: auto; display: flex; justify-content: center; align-items: center; background: var(--bg-primary); border-radius: var(--radius-sm); padding: 0.5rem;">
          <img id="lightboxImg" src="" alt="Certificate Preview" style="max-height: 70vh; width: auto; object-fit: contain; box-shadow: var(--shadow-md);" />
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    document.getElementById("closeLightboxBtn")?.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
  }
}

function bindImageViewers(container) {
  container.querySelectorAll(".view-image-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const imgUrl = btn.dataset.img;
      const title = btn.dataset.title || "Document Preview";
      if (!imgUrl) return;

      const lightbox = document.getElementById("imageLightboxModal");
      const lightboxImg = document.getElementById("lightboxImg");
      const lightboxTitle = document.getElementById("lightboxTitle");

      if (lightbox && lightboxImg) {
        lightboxImg.src = imgUrl;
        if (lightboxTitle) lightboxTitle.textContent = title;
        lightbox.classList.add("active");
      }
    });
  });
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
