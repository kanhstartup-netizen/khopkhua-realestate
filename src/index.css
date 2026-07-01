@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  background: #060912;
  color: #e8edf7;
  -webkit-font-smoothing: antialiased;
  font-family: "Noto Sans Lao", "Inter", system-ui, sans-serif;
}

/* Phone-frame gradient backdrop */
.app-bg {
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(124, 58, 237, 0.18), transparent 60%),
    radial-gradient(900px 500px at -10% 20%, rgba(16, 185, 129, 0.12), transparent 55%),
    linear-gradient(180deg, #0a0e1a 0%, #070a14 100%);
}

.card {
  background: linear-gradient(180deg, rgba(22, 29, 51, 0.9), rgba(17, 23, 41, 0.9));
  border: 1px solid rgba(35, 48, 79, 0.8);
  border-radius: 18px;
}

.glass {
  background: rgba(17, 23, 41, 0.6);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(35, 48, 79, 0.6);
}

.gradient-btn {
  background: linear-gradient(90deg, #7c3aed, #d946ef);
}

.gradient-text {
  background: linear-gradient(90deg, #34d399, #10b981);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.gold-text {
  background: linear-gradient(180deg, #f5d479, #c9941f);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(124, 58, 237, 0.4);
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(124,58,237,0.5); }
  70% { box-shadow: 0 0 0 16px rgba(124,58,237,0); }
  100% { box-shadow: 0 0 0 0 rgba(124,58,237,0); }
}
.pulse-ring { animation: pulse-ring 2.5s infinite; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fade-up 0.4s ease both; }

@media (prefers-reduced-motion: reduce) {
  .animate-float, .pulse-ring, .fade-up { animation: none !important; }
}

button:focus-visible, a:focus-visible, input:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

/* ===== Animated header effects ===== */
.header-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
}
.header-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(28px);
  opacity: 0.5;
  pointer-events: none;
}
@keyframes orb-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, 12px) scale(1.15); }
}
@keyframes orb-b {
  0%, 100% { transform: translate(0, 0) scale(1.1); }
  50% { transform: translate(-24px, -10px) scale(0.95); }
}
.orb-a { animation: orb-a 7s ease-in-out infinite; }
.orb-b { animation: orb-b 9s ease-in-out infinite; }

@keyframes shimmer-move {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(220%); }
}
.header-shimmer {
  position: absolute;
  top: 0; bottom: 0;
  width: 40%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.06), transparent);
  animation: shimmer-move 5.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes logo-glow-pulse {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(1.15); }
}
.logo-glow { animation: logo-glow-pulse 3.5s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .orb-a, .orb-b, .header-shimmer, .logo-glow { animation: none !important; }
}
