// Real Khopkhua logo (house emblem). Uses the cropped PNG in /public.
const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

export default function Logo({ size = 56, showText = false, glow = false }) {
  return (
    <div className="flex flex-col items-center select-none">
      <img
        src={LOGO_SRC}
        alt="Khopkhua Realestate logo"
        width={size}
        height={size}
        className="object-contain"
        style={{
          width: size,
          height: size,
          filter: glow ? "drop-shadow(0 0 16px rgba(227,178,60,0.5))" : undefined,
        }}
      />
      {showText && (
        <div className="mt-2 text-center leading-tight">
          <div className="gold-text font-display text-lg font-bold">ຄອບຄົວ ອະສັງຫາ</div>
          <div className="text-xs text-white/70">Khopkhua Real estate</div>
        </div>
      )}
    </div>
  );
}
