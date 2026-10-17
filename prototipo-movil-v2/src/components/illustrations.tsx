export function IllustDiagnostico() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="g1" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect width="280" height="160" fill="url(#g1)" opacity="0" />
      {[
        [40, 90],
        [90, 40],
        [140, 70],
        [190, 35],
        [230, 95],
        [120, 120],
        [70, 130],
        [175, 125],
      ].map(([x, y], i, arr) => (
        <g key={i}>
          {i < arr.length - 1 && (
            <line
              x1={x}
              y1={y}
              x2={arr[i + 1][0]}
              y2={arr[i + 1][1]}
              stroke="#a5f3fc"
              strokeOpacity="0.35"
              strokeWidth="1.2"
            />
          )}
          <circle cx={x} cy={y} r={i === 2 ? 8 : 5} fill="#ecfeff" fillOpacity="0.9" />
        </g>
      ))}
      <circle cx="140" cy="70" r="22" fill="none" stroke="#67e8f9" strokeOpacity="0.5" />
    </svg>
  );
}

export function IllustPrograma() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <g transform="translate(88,28)">
        <rect x="8" y="18" width="96" height="88" rx="6" fill="#ecfdf5" />
        <rect x="16" y="30" width="80" height="6" rx="3" fill="#6ee7b7" />
        <rect x="16" y="44" width="64" height="5" rx="2.5" fill="#a7f3d0" />
        <rect x="16" y="56" width="72" height="5" rx="2.5" fill="#a7f3d0" />
        <rect x="16" y="68" width="48" height="5" rx="2.5" fill="#a7f3d0" />
        <path
          d="M52 8 C52 8 44 22 52 34 C60 22 52 8 52 8 Z"
          fill="#34d399"
        />
        <path d="M52 34 v18" stroke="#059669" strokeWidth="3" />
        <path
          d="M52 42 C40 36 36 48 52 54 C68 48 64 36 52 42 Z"
          fill="#6ee7b7"
        />
      </g>
    </svg>
  );
}

export function IllustPlaneacion() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <g transform="translate(86,22)">
        <rect x="18" y="16" width="92" height="112" rx="8" fill="#dbeafe" />
        <rect x="42" y="8" width="44" height="18" rx="6" fill="#93c5fd" />
        <rect x="32" y="42" width="64" height="6" rx="3" fill="#60a5fa" />
        <rect x="32" y="56" width="52" height="5" rx="2.5" fill="#93c5fd" />
        <rect x="32" y="68" width="58" height="5" rx="2.5" fill="#93c5fd" />
        <rect x="32" y="86" width="18" height="18" rx="4" fill="#3b82f6" />
        <path d="M36 95 l6 6 10 -12" stroke="#eff6ff" strokeWidth="2.4" fill="none" />
      </g>
    </svg>
  );
}

export function IllustEvaluacion() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <g transform="translate(70,36)">
        <rect x="8" y="64" width="22" height="40" rx="4" fill="#fdba74" />
        <rect x="40" y="40" width="22" height="64" rx="4" fill="#fb923c" />
        <rect x="72" y="18" width="22" height="86" rx="4" fill="#f97316" />
        <rect x="104" y="48" width="22" height="56" rx="4" fill="#fdba74" />
        <circle cx="132" cy="22" r="16" fill="none" stroke="#fed7aa" strokeWidth="5" />
        <path d="M132 22 l8 -10" stroke="#fff7ed" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function JaliscoMark() {
  return (
    <div className="flex h-full flex-col items-start justify-end p-4">
      <svg viewBox="0 0 240 56" className="w-[86%]" aria-hidden>
        <text
          x="0"
          y="42"
          fill="#ff5a1f"
          fontFamily="Outfit, Segoe UI, sans-serif"
          fontSize="36"
          fontWeight="600"
        >
          @jaliscoedu.mx
        </text>
      </svg>
    </div>
  );
}
