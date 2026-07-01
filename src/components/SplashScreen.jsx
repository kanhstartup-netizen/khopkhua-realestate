import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import Logo from "./Logo";

// Luxury villa at NIGHT (lit windows, pool). Darkened so text stays readable.
const HOUSE_IMG =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=70";

export default function SplashScreen({ onDone, minDuration = 2600 }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / minDuration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        setLeaving(true);
        setTimeout(onDone, 500);
      }
    }, 40);
    return () => clearInterval(tick);
  }, [minDuration, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-hidden transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#04101f" }}
    >
      {/* Full-screen night villa photo (dimmed) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HOUSE_IMG}')`, opacity: 0.42 }}
      />
      {/* Strong dark overlay so text is always dominant */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,12,24,0.92) 0%, rgba(5,16,32,0.7) 42%, rgba(4,14,28,0.72) 62%, rgba(4,12,24,0.95) 100%)",
        }}
      />
      {/* extra global darken */}
      <div className="absolute inset-0" style={{ background: "rgba(4,10,20,0.35)" }} />

      {/* skyline light beams */}
      <span className="absolute top-[46%] left-8 w-px h-24 bg-gradient-to-b from-cyan-300/40 to-transparent" />
      <span className="absolute top-[42%] right-12 w-px h-16 bg-gradient-to-b from-cyan-300/30 to-transparent" />
      <span className="absolute top-[40%] left-12 w-1 h-1 rounded-full bg-cyan-300/60 animate-pulse" />
      <span className="absolute top-[48%] right-20 w-1 h-1 rounded-full bg-cyan-300/50 animate-pulse" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center">
        <div className="flex flex-col items-center pt-[16%] px-8 text-center">
          <div className="animate-float">
            <Logo size={118} glow />
          </div>

          <h1 className="text-white text-[34px] font-extrabold tracking-tight mt-5 leading-[1.05] drop-shadow-lg">
            Khopkhua
            <br />
            <span className="gradient-text">Realestate</span>
          </h1>

          <p className="text-white/75 text-[15px] mt-4 leading-snug drop-shadow">
            Smart Real Estate
            <br />
            Management System
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent my-5" />

          <p className="text-[15px] font-medium drop-shadow">
            <span className="text-white/90">Manage. Connect. </span>
            <span className="text-gold">Grow.</span>
          </p>
        </div>

        <div className="mt-auto w-full px-12 pb-10 flex flex-col items-center">
          <p className="text-white/90 text-lg font-medium mb-3 drop-shadow">Loading...</p>
          <div className="h-2.5 w-full rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #19c37d, #34d399)",
                boxShadow: "0 0 14px rgba(52,211,153,0.7)",
              }}
            />
          </div>
          <p className="text-brand-400 font-bold text-xl mt-3 drop-shadow">{progress}%</p>

          <div className="w-12 h-12 rounded-full bg-brand-500/15 border border-brand-400/30 flex items-center justify-center mt-5">
            <Home size={22} className="text-brand-400" />
          </div>
          <p className="text-white/55 text-[13px] mt-3 text-center leading-snug drop-shadow">
            Building better connections
            <br />
            in real estate
          </p>
        </div>
      </div>
    </div>
  );
}
