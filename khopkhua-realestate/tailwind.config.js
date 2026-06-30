/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0e1a",
        panel: "#111729",
        panel2: "#161d33",
        line: "#23304f",
        gold: "#e3b23c",
        emerald: "#1f9d6b",
        brand: {
          50: "#eef9f4",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        violet: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["Noto Sans Lao", "Inter", "system-ui", "sans-serif"],
        display: ["Noto Serif Lao", "Poppins", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124,58,237,0.5)",
      },
    },
  },
  plugins: [],
};
