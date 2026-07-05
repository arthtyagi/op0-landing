import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// op0-landing — Vite + React 19 + Tailwind v4 + shaders (WebGPU/WebGL).
// Builds to dist/ as a static SPA; deployed to a CF Worker (op0-landing-preview).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Keep the heavy shader/three chunk separate from app code.
        manualChunks: {
          shader: ["shaders", "three"],
          react: ["react", "react-dom", "motion"],
        },
      },
    },
  },
});
