import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is set for GitHub Pages relative paths.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          recharts: ["recharts"],
        },
      },
    },
  },
});
