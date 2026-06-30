export default function Logo({ size = 56, showText = false, glow = false }) {
  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Khopkhua Realestate logo"
        style={glow ? { filter: "drop-shadow(0 0 14px rgba(227,178,60,0.45))" } : undefined}
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbe79a" />
            <stop offset="0.45" stopColor="#e8b840" />
            <stop offset="1" stopColor="#a9760f" />
          </linearGradient>
          <linearGradient id="greenG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2cb37e" />
            <stop offset="1" stopColor="#0c5b3d" />
          </linearGradient>
        </defs>

        {/* Roof outline */}
        <path
          d="M110 14 L190 70 L178 84 L168 77 L168 50 L150 50 L150 64 L110 36 L40 84 L28 70 Z"
          fill="url(#gold)"
        />

        {/* Arch / ກ shape - outer green stroke arch */}
        <path
          d="M58 80
             C58 80 58 150 58 188
             L86 188
             L86 132
             C86 110 100 96 122 96
             C144 96 156 112 156 132
             L156 150
             C156 162 165 170 178 170
             L178 142
             C178 142 178 96 178 80"
          stroke="url(#greenG)"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner gold arch line */}
        <path
          d="M72 84
             C72 84 72 150 72 184"
          stroke="url(#gold)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M122 96
             C100 96 86 110 86 132 L86 184"
          stroke="url(#gold)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M122 96 C144 96 156 112 156 132 L156 150 C156 162 165 170 178 170"
          stroke="url(#gold)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* small window dots on left & right pillars */}
        <circle cx="72" cy="150" r="2.4" fill="url(#gold)" />
        <circle cx="72" cy="162" r="2.4" fill="url(#gold)" />
        <circle cx="178" cy="150" r="2.4" fill="url(#gold)" />
        <circle cx="178" cy="162" r="2.4" fill="url(#gold)" />

        {/* base line */}
        <rect x="50" y="184" width="136" height="7" rx="3.5" fill="url(#gold)" />
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
