const segments = [
  { from: -1, to: 0, label: "Eau / nuages", opacity: 0.1 },
  { from: 0, to: 0.2, label: "Sol nu / bâti", opacity: 0.3 },
  { from: 0.2, to: 0.4, label: "Végétation clairsemée", opacity: 0.55 },
  { from: 0.4, to: 0.8, label: "Végétation dense", opacity: 0.85 },
]

const X0 = 30
const WIDTH = 540
const scale = (v: number) => X0 + ((v + 1) / 2) * WIDTH

export function NdviScale() {
  return (
    <svg viewBox="0 0 600 140" className="w-full h-auto" role="img" aria-label="Échelle du NDVI de -1 à 1, avec ses classes d'interprétation">
      <g>
        {segments.map((s) => (
          <rect
            key={s.label}
            x={scale(s.from)}
            y={30}
            width={scale(s.to) - scale(s.from)}
            height={30}
            fill="currentColor"
            fillOpacity={s.opacity}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        <line x1={X0} y1="60" x2={X0 + WIDTH} y2="60" stroke="currentColor" strokeWidth="1.3" />
        {[-1, -0.5, 0, 0.5, 1].map((t) => (
          <line key={t} x1={scale(t)} y1="60" x2={scale(t)} y2="68" stroke="currentColor" strokeWidth="1" />
        ))}
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        {[-1, -0.5, 0, 0.5, 1].map((t) => (
          <text key={t} x={scale(t)} y="82" fontSize="9.5" textAnchor="middle">
            {t.toFixed(1)}
          </text>
        ))}
        {segments.map((s) => (
          <text
            key={s.label}
            x={(scale(s.from) + scale(s.to)) / 2}
            y="20"
            fontSize="9"
            textAnchor="middle"
            letterSpacing="0.2"
          >
            {s.label}
          </text>
        ))}
      </g>
    </svg>
  )
}
