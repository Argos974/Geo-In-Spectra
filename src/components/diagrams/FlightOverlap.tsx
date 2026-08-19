export function FlightOverlap() {
  const rowY = [30, 96]
  const colX = [40, 120, 200, 280, 360, 440]
  const w = 100
  const h = 66

  return (
    <svg viewBox="0 0 560 230" className="w-full h-auto" role="img" aria-label="Plan de vol drone : recouvrement longitudinal entre photos consécutives d'une bande, recouvrement latéral entre bandes adjacentes">
      {rowY.map((y, ri) => (
        <g key={ri} stroke="currentColor" fill="none" strokeWidth="1.1">
          {colX.slice(0, 4).map((x, ci) => (
            <rect key={ci} x={x} y={y} width={w} height={h} fill="currentColor" fillOpacity={ri === 0 ? 0.05 : 0.09} />
          ))}
        </g>
      ))}

      {/* Fleches de trajectoire */}
      <g stroke="currentColor" strokeWidth="1.3" fill="none">
        <line x1="40" y1={30 + h / 2} x2="420" y2={30 + h / 2} strokeDasharray="2 4" opacity="0.7" />
        <path d="M 415 63 L 424 63 L 419 58 Z" fill="currentColor" stroke="none" />
        <line x1="440" y1={96 + h / 2} x2="60" y2={96 + h / 2} strokeDasharray="2 4" opacity="0.7" />
        <path d="M 65 129 L 56 129 L 61 124 Z" fill="currentColor" stroke="none" />
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="140" y="20" fontSize="9.5" textAnchor="middle" fontStyle="italic">recouvrement longitudinal (70-80 %)</text>
        <text x={colX[0] + w - 10} y={30 + h / 2 + 3} fontSize="8" textAnchor="end" opacity="0.6">chevauche</text>

        <text x="500" y={(30 + 96 + h) / 2} fontSize="9.5" textAnchor="start" fontStyle="italic">recouv.</text>
        <text x="500" y={(30 + 96 + h) / 2 + 12} fontSize="9.5" textAnchor="start" fontStyle="italic">latéral</text>
        <text x="500" y={(30 + 96 + h) / 2 + 24} fontSize="9.5" textAnchor="start" fontStyle="italic">(60-70 %)</text>

        <text x="280" y="215" fontSize="9" textAnchor="middle" letterSpacing="0.5" opacity="0.75">bande 1 (aller) — bande 2 (retour) — chaque point vu sous ≥ 2 angles</text>
      </g>
    </svg>
  )
}
