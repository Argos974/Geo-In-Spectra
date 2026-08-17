const bands = [
  { label: "Visible", sub: "0.4–0.7 µm", from: 0, to: 130, opacity: 0.15 },
  { label: "NIR", sub: "0.7–1.3 µm", from: 130, to: 260, opacity: 0.35 },
  { label: "SWIR", sub: "1.3–2.5 µm", from: 260, to: 420, opacity: 0.55 },
  { label: "Thermique", sub: "8–14 µm", from: 420, to: 560, opacity: 0.75 },
]

export function EmSpectrum() {
  return (
    <svg viewBox="0 0 600 160" className="w-full h-auto" role="img" aria-label="Le spectre électromagnétique divisé en domaines visible, proche infrarouge, infrarouge à ondes courtes et infrarouge thermique">
      <g transform="translate(20,40)">
        {bands.map((b) => (
          <rect
            key={b.label}
            x={b.from}
            y={0}
            width={b.to - b.from}
            height={50}
            fill="currentColor"
            fillOpacity={b.opacity}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        <line x1="0" y1="50" x2="560" y2="50" stroke="currentColor" strokeWidth="1.3" />

        {bands.map((b) => (
          <g key={b.label} fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
            <text x={(b.from + b.to) / 2} y={70} fontSize="11" textAnchor="middle" letterSpacing="0.5">
              {b.label}
            </text>
            <text x={(b.from + b.to) / 2} y={84} fontSize="9" textAnchor="middle" opacity="0.75">
              {b.sub}
            </text>
          </g>
        ))}

        {/* onde stylisée au-dessus */}
        <path
          d="M 0 -10 Q 20 -25 40 -10 Q 60 5 80 -10 Q 100 -25 120 -10 Q 140 5 160 -10 Q 180 -25 200 -10 Q 220 5 240 -10 Q 260 -25 280 -10 Q 300 5 320 -10 Q 340 -25 360 -10 Q 380 5 400 -10 Q 420 -25 440 -10 Q 460 5 480 -10 Q 500 -25 520 -10 Q 540 5 560 -10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}
