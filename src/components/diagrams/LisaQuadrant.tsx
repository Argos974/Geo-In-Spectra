const points: { x: number; y: number; q: "HH" | "LL" | "HL" | "LH" }[] = [
  { x: 60, y: 55, q: "HH" }, { x: 75, y: 40, q: "HH" }, { x: 50, y: 62, q: "HH" }, { x: 68, y: 30, q: "HH" },
  { x: -60, y: -50, q: "LL" }, { x: -75, y: -35, q: "LL" }, { x: -48, y: -65, q: "LL" }, { x: -65, y: -28, q: "LL" },
  { x: 55, y: -45, q: "HL" }, { x: 70, y: -30, q: "HL" },
  { x: -55, y: 48, q: "LH" }, { x: -68, y: 35, q: "LH" },
]

export function LisaQuadrant() {
  const cx = 280
  const cy = 130
  return (
    <svg viewBox="0 0 560 260" className="w-full h-auto" role="img" aria-label="Nuage de Moran : chaque entité classée Haut-Haut, Bas-Bas, Haut-Bas ou Bas-Haut selon sa valeur et celle de son voisinage">
      <g stroke="currentColor" fill="none">
        <line x1="40" y1={cy} x2="520" y2={cy} strokeWidth="1.2" />
        <line x1={cx} y1="20" x2={cx} y2="240" strokeWidth="1.2" />
        <line x1={cx - 100} y1={cy + 100} x2={cx + 100} y2={cy - 100} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      </g>

      <g fill="currentColor" stroke="none">
        {points.map((p, i) => (
          <circle
            key={i}
            cx={cx + p.x}
            cy={cy - p.y}
            r="4"
            fillOpacity={p.q === "HH" || p.q === "LL" ? 0.9 : 0.4}
          />
        ))}
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="490" y={cy - 10} fontSize="10" textAnchor="end" letterSpacing="0.5">HH</text>
        <text x="70" y={cy + 20} fontSize="10" textAnchor="start" letterSpacing="0.5">LL</text>
        <text x="490" y={cy + 20} fontSize="10" textAnchor="end" letterSpacing="0.5">HL</text>
        <text x="70" y={cy - 10} fontSize="10" textAnchor="start" letterSpacing="0.5">LH</text>
        <text x="280" y="252" fontSize="10" textAnchor="middle" letterSpacing="1">VALEUR STANDARDISÉE xᵢ</text>
        <text x="16" y="130" fontSize="10" textAnchor="middle" letterSpacing="0.5" transform="rotate(-90 16 130)">DÉCALAGE SPATIAL Σwᵢⱼxⱼ</text>
      </g>
    </svg>
  )
}
