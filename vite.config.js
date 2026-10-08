import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about/index.html"),
        projects: resolve(import.meta.dirname, "projects/index.html"),
        skills: resolve(import.meta.dirname, "skills/index.html"),
        education: resolve(import.meta.dirname, "education/index.html"),
        achievements: resolve(import.meta.dirname, "achievements/index.html"),
        coa: resolve(import.meta.dirname, "coa/index.html"),
        resume: resolve(import.meta.dirname, "resume/index.html"),
        contact: resolve(import.meta.dirname, "contact/index.html")
      }
    }
  }
});
