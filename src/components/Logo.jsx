export default function Logo({ size = 56, showText = false }) {
  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Khopkhua Realestate logo"
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7dd8a" />
            <stop offset="0.5" stopColor="#e3b23c" />
            <stop offset="1" stopColor="#b07d18" />
          </linearGradient>
          <linearGradient id="greenG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1f9d6b" />
            <stop offset="1" stopColor="#0d5e3f" />
          </linearGradient>
        </defs>

        {/* Roof */}
        <path
          d="M100 18 L172 78 L160 90 L100 42 L40 90 L28 78 Z"
          fill="url(#gold)"
        />
        {/* House body / arch */}
        <path
          d="M48 86 L48 158 L72 158 L72 116 Q72 92 100 92 Q128 92 128 116 L128 158 L152 158 L152 86 L100 46 Z"
          fill="url(#greenG)"
          stroke="url(#gold)"
          strokeWidth="5"
        />
        {/* Central pillar */}
        <rect x="92" y="100" width="16" height="58" rx="3" fill="url(#gold)" opacity="0.9" />
        {/* base line */}
        <rect x="40" y="158" width="120" height="8" rx="3" fill="url(#gold)" />
      </svg>
      {showText && (
        <div className="mt-2 text-center leading-tight">
          <div className="gold-text font-display text-lg font-bold">ຄອບຄົວ ອະສັງຫາ</div>
          <div className="text-xs text-white/70">Khopkhua Real estate</div>
        </div>
      )}
    </div>
  );
}
