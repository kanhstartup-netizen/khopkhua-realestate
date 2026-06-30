import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SplashScreen({ onDone, minDuration = 1800 }) {
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
        setTimeout(onDone, 400);
      }
    }, 60);
    return () => clearInterval(tick);
  }, [minDuration, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-between overflow-hidden transition-opacity duration-400 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #142447 0%, #0a1124 55%, #060a16 100%)",
      }}
    >
      {/* top glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #1f9d6b, transparent 70%)" }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <div className="animate-float">
          <Logo size={110} />
        </div>
        <div className="mt-5 text-center leading-snug">
          <p className="gold-text font-display text-2xl font-bold">
            ຄອບຄົວ ອະສັງຫາ
          </p>
          <h1 className="text-white text-3xl font-extrabold tracking-tight mt-1">
            Khopkhua <span className="gradient-text">Realestate</span>
          </h1>
          <p className="text-white/55 text-sm mt-3">
            Smart Real Estate Management System
          </p>
        </div>
      </div>

      {/* House photo footer, like the design mockup */}
      <div className="relative w-full">
        <div
          className="w-full h-44 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=60')",
            maskImage: "linear-gradient(to bottom, transparent, black 35%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 35%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a16] via-transparent to-transparent" />
      </div>

      <div className="w-full px-10 pb-9 -mt-2 relative">
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full gradient-btn transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-white/40 text-[11px] mt-2">
          ກຳລັງໂຫລດ... {progress}%
        </p>
      </div>
    </div>
  );
}
