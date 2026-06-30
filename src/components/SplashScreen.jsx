import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import Logo from "./Logo";

// Modern luxury villa at night — close to the demo mockup
const HOUSE_IMG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=70";

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
      {/* Full-bleed night house photo, anchored lower half */}
      <div
        className="absolute inset-x-0 bottom-0 top-[42%] bg-cover bg-center"
        style={{ backgroundImage: `url('${HOUSE_IMG}')` }}
      />
      {/* Deep blue gradient overlays to blend the photo into the dark top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #04101f 0%, #051428 30%, rgba(5,20,40,0.55) 52%, rgba(4,16,31,0.25) 72%, rgba(4,16,31,0.9) 100%)",
        }}
      />
      {/* subtle skyline light beams */}
      <div className="absolute top-[44%] left-6 w-px h-24 bg-gradient-to-b from-cyan-300/50 to-transparent" />
      <div className="absolute top-[40%] right-10 w-px h-16 bg-gradient-to-b from-cyan-300/40 to-transparent" />
      <div className="absolute top-[47%] right-24 w-px h-10 bg-gradient-to-b from-cyan-300/30 to-transparent" />
      <span className="absolute top-[40%] left-10 w-1 h-1 rounded-full bg-cyan-300/70 animate-pulse" />
      <span className="absolute top-[46%] right-16 w-1 h-1 rounded-full bg-cyan-300/60 animate-pulse" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center">
        {/* Top: logo + titles */}
        <div className="flex flex-col items-center pt-[12%] px-8 text-center">
          <div className="animate-float">
            <Logo size={120} glow />
          </div>

          <h1 className="text-white text-[34px] font-extrabold tracking-tight mt-4 leading-[1.05]">
            Khopkhua
            <br />
            <span className="gradient-text">Realestate</span>
          </h1>

          <p className="text-white/65 text-[15px] mt-4 leading-snug">
            Smart Real Estate
            <br />
            Management System
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent my-5" />

          <p className="text-[15px] font-medium">
            <span className="text-white/90">Manage. Connect. </span>
            <span className="text-gold">Grow.</span>
          </p>
        </div>

        {/* Bottom: loading area */}
        <div className="mt-auto w-full px-12 pb-10 flex flex-col items-center">
          <p className="text-white/90 text-lg font-medium mb-3">Loading...</p>
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
          <p className="text-brand-400 font-bold text-xl mt-3">{progress}%</p>

          <div className="w-12 h-12 rounded-full bg-brand-500/15 border border-brand-400/30 flex items-center justify-center mt-5">
            <Home size={22} className="text-brand-400" />
          </div>
          <p className="text-white/45 text-[13px] mt-3 text-center leading-snug">
            Building better connections
            <br />
            in real estate
          </p>
        </div>
      </div>
    </div>
  );
}
