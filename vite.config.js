import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is set for GitHub Pages. Change "khopkhua-realestate" to your repo name if different.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
