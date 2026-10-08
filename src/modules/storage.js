/**
 * Browser Local Persistence Engine for Uploads & User Contributions
 * Stores added certificates, achievements, hackathons, and gallery items in localStorage.
 * Ensures data is preserved across sessions and tabs without needing an external database.
 */

import certifications from "../data/certifications.js";
import achievements from "../data/achievements.js";
import hackathons from "../data/hackathons.js";
import galleryItems from "../data/gallery.js";

const KEYS = {
  CERTS: "ishmeet_portfolio_certs_v1",
  ACHIEVEMENTS: "ishmeet_portfolio_achievements_v1",
  HACKATHONS: "ishmeet_portfolio_hackathons_v1",
  GALLERY: "ishmeet_portfolio_gallery_v1"
};

// --- CERTIFICATES ---
export function getStoredCertificates() {
  try {
    const raw = localStorage.getItem(KEYS.CERTS);
    const custom = raw ? JSON.parse(raw) : [];
    return [...custom, ...certifications];
  } catch (e) {
    console.warn("Storage read error for certificates:", e);
    return certifications;
  }
}

export function saveCertificate(newCert) {
  try {
    const raw = localStorage.getItem(KEYS.CERTS);
    const custom = raw ? JSON.parse(raw) : [];
    const certWithId = {
      ...newCert,
      id: "custom-cert-" + Date.now(),
      isCustom: true
    };
    custom.unshift(certWithId);
    localStorage.setItem(KEYS.CERTS, JSON.stringify(custom));
    return { success: true, item: certWithId };
  } catch (e) {
    console.error("Failed to save certificate to local storage:", e);
    return { success: false, error: e.message || "Storage error" };
  }
}

export function deleteStoredCertificate(id) {
  try {
    const raw = localStorage.getItem(KEYS.CERTS);
    if (!raw) return false;
    let custom = JSON.parse(raw);
    custom = custom.filter(c => c.id !== id);
    localStorage.setItem(KEYS.CERTS, JSON.stringify(custom));
    return true;
  } catch (e) {
    return false;
  }
}

// --- ACHIEVEMENTS ---
export function getStoredAchievements() {
  try {
    const raw = localStorage.getItem(KEYS.ACHIEVEMENTS);
    const custom = raw ? JSON.parse(raw) : [];
    return [...custom, ...achievements];
  } catch (e) {
    return achievements;
  }
}

export function saveAchievement(newAch) {
  try {
    const raw = localStorage.getItem(KEYS.ACHIEVEMENTS);
    const custom = raw ? JSON.parse(raw) : [];
    const itemWithId = {
      ...newAch,
      id: "custom-ach-" + Date.now(),
      isCustom: true
    };
    custom.unshift(itemWithId);
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(custom));
    return { success: true, item: itemWithId };
  } catch (e) {
    return { success: false, error: e.message || "Storage error" };
  }
}

export function deleteStoredAchievement(id) {
  try {
    const raw = localStorage.getItem(KEYS.ACHIEVEMENTS);
    if (!raw) return false;
    let custom = JSON.parse(raw);
    custom = custom.filter(a => a.id !== id);
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(custom));
    return true;
  } catch (e) {
    return false;
  }
}

// --- HACKATHONS ---
export function getStoredHackathons() {
  try {
    const raw = localStorage.getItem(KEYS.HACKATHONS);
    const custom = raw ? JSON.parse(raw) : [];
    return [...custom, ...hackathons];
  } catch (e) {
    return hackathons;
  }
}

export function saveHackathon(newHack) {
  try {
    const raw = localStorage.getItem(KEYS.HACKATHONS);
    const custom = raw ? JSON.parse(raw) : [];
    const itemWithId = {
      ...newHack,
      id: "custom-hack-" + Date.now(),
      isCustom: true
    };
    custom.unshift(itemWithId);
    localStorage.setItem(KEYS.HACKATHONS, JSON.stringify(custom));
    return { success: true, item: itemWithId };
  } catch (e) {
    return { success: false, error: e.message || "Storage error" };
  }
}

export function deleteStoredHackathon(id) {
  try {
    const raw = localStorage.getItem(KEYS.HACKATHONS);
    if (!raw) return false;
    let custom = JSON.parse(raw);
    custom = custom.filter(h => h.id !== id);
    localStorage.setItem(KEYS.HACKATHONS, JSON.stringify(custom));
    return true;
  } catch (e) {
    return false;
  }
}

// --- GALLERY ---
export function getStoredGalleryItems() {
  try {
    const raw = localStorage.getItem(KEYS.GALLERY);
    const custom = raw ? JSON.parse(raw) : [];
    return [...custom, ...galleryItems];
  } catch (e) {
    return galleryItems;
  }
}

export function saveGalleryItem(newMedia) {
  try {
    const raw = localStorage.getItem(KEYS.GALLERY);
    const custom = raw ? JSON.parse(raw) : [];
    const itemWithId = {
      ...newMedia,
      id: "custom-media-" + Date.now(),
      isCustom: true
    };
    custom.unshift(itemWithId);
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(custom));
    return { success: true, item: itemWithId };
  } catch (e) {
    return { success: false, error: e.message || "Image too large for browser storage quota" };
  }
}

export function deleteStoredGalleryItem(id) {
  try {
    const raw = localStorage.getItem(KEYS.GALLERY);
    if (!raw) return false;
    let custom = JSON.parse(raw);
    custom = custom.filter(m => m.id !== id);
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(custom));
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  getStoredCertificates,
  saveCertificate,
  deleteStoredCertificate,
  getStoredAchievements,
  saveAchievement,
  deleteStoredAchievement,
  getStoredHackathons,
  saveHackathon,
  deleteStoredHackathon,
  getStoredGalleryItems,
  saveGalleryItem,
  deleteStoredGalleryItem
};
