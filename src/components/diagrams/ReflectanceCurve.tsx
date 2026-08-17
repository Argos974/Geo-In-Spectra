export function ReflectanceCurve() {
  return (
    <svg viewBox="0 0 560 260" className="w-full h-auto" role="img" aria-label="Courbe de réflectance de la végétation en bonne santé : faible dans le rouge, très élevée dans le proche infrarouge">
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {/* axes */}
        <line x1="40" y1="40" x2="40" y2="205" strokeWidth="1.2" />
        <line x1="40" y1="205" x2="520" y2="205" strokeWidth="1.2" />

        {/* repères verticaux */}
        <line x1="160" y1="205" x2="160" y2="60" strokeDasharray="2 3" opacity="0.5" />
        <line x1="280" y1="205" x2="280" y2="55" strokeDasharray="2 3" opacity="0.5" />

        {/* courbe de réflectance */}
        <path
          d="M 40 198 C 70 193 90 178 110 181 C 130 185 145 195 160 196 C 175 155 185 95 205 72 C 235 57 300 57 360 63 C 380 93 390 133 400 113 C 415 83 425 73 440 78 C 450 113 460 143 470 123 L 500 133"
          strokeWidth="1.6"
        />
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="160" y="222" fontSize="10" textAnchor="middle">Rouge</text>
        <text x="280" y="222" fontSize="10" textAnchor="middle">PIR</text>
        <text x="440" y="222" fontSize="10" textAnchor="middle">SWIR</text>
        <text x="30" y="45" fontSize="10" textAnchor="end">100%</text>
        <text x="30" y="209" fontSize="10" textAnchor="end">0%</text>
        <text x="280" y="245" fontSize="10" textAnchor="middle" letterSpacing="1">LONGUEUR D'ONDE →</text>
        <text x="40" y="20" fontSize="10" transform="rotate(0)">RÉFLECTANCE</text>
      </g>
    </svg>
  )
}
