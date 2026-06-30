import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import Logo from "./Logo";

export default function SplashScreen({ onDone, minDuration = 2400 }) {
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
        setTimeout(onDone, 450);
      }
    }, 50);
    return () => clearInterval(tick);
  }, [minDuration, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center overflow-hidden transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "linear-gradient(180deg, #060b18 0%, #081026 45%, #060a16 100%)" }}
    >
      {/* faint vertical light beams like skyline */}
      <div className="absolute top-10 left-10 w-px h-40 bg-gradient-to-b from-cyan-400/40 to-transparent" />
      <div className="absolute top-24 right-14 w-px h-28 bg-gradient-to-b from-cyan-400/30 to-transparent" />
      <div className="absolute top-6 right-28 w-px h-20 bg-gradient-to-b from-cyan-400/20 to-transparent" />

      <div className="flex flex-col items-center pt-16 px-8 relative z-10">
        <div className="animate-float">
          <Logo size={104} glow />
        </div>

        <h1 className="text-white text-[28px] font-extrabold tracking-tight mt-4 leading-tight text-center">
          Khopkhua
          <br />
          <span className="gradient-text">Realestate</span>
        </h1>
        <p className="text-white/55 text-sm mt-3 text-center leading-snug">
          Smart Real Estate
          <br />
          Management System
        </p>

        <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent my-4 opacity-60" />

        <p className="text-sm text-center">
          <span className="text-white/85">Manage. Connect. </span>
          <span className="text-gold font-semibold">Grow.</span>
        </p>
      </div>

      {/* House photo */}
      <div className="relative w-full flex-1 mt-6 min-h-[210px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=65')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,10,22,0) 0%, rgba(6,10,22,0.2) 55%, #060a16 100%)",
          }}
        />
      </div>

      {/* Loading bar + footer */}
      <div className="w-full px-10 pb-10 relative z-10 -mt-2">
        <p className="text-center text-white/80 text-sm mb-2">ກຳລັງໂຫລດ... Loading</p>
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #19c37d, #34d399)",
              boxShadow: "0 0 12px rgba(52,211,153,0.6)",
            }}
          />
        </div>
        <p className="text-center text-brand-400 font-bold text-lg mt-2">{progress}%</p>

        <div className="flex flex-col items-center mt-4">
          <div className="w-11 h-11 rounded-full bg-brand-600/15 border border-brand-400/30 flex items-center justify-center">
            <Home size={20} className="text-brand-400" />
          </div>
          <p className="text-white/40 text-[11px] mt-2 text-center">
            ສ້າງການເຊື່ອມຕໍ່ທີ່ດີກວ່າ ໃນວົງການອະສັງຫາ
          </p>
        </div>
      </div>
    </div>
  );
}
