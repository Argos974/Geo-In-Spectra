export function VariogramDiagram() {
  const x0 = 50
  const y0 = 190
  const nugget = 30
  const sill = 60
  const rangeX = 330

  // Courbe de montée du nugget vers le palier, jusqu'à la portée (approximation
  // visuelle d'un modèle sphérique : montée rapide puis aplatissement).
  const curve = `M ${x0} ${y0 - nugget} C ${x0 + 60} ${y0 - nugget - 70}, ${x0 + 140} ${y0 - sill + 10}, ${rangeX} ${y0 - sill}`
  const flat = `M ${rangeX} ${y0 - sill} L 560 ${y0 - sill}`

  return (
    <svg viewBox="0 0 600 246" className="w-full h-auto" role="img" aria-label="Un variogramme : la semi-variance augmente avec la distance jusqu'à un palier, atteint à la portée">
      <g stroke="currentColor" strokeWidth="1.1" fill="none">
        <line x1={x0} y1={y0} x2="570" y2={y0} strokeWidth="1.3" />
        <line x1={x0} y1={y0} x2={x0} y2="20" strokeWidth="1.3" />

        <line x1={x0} y1={y0 - sill} x2={rangeX} y2={y0 - sill} strokeDasharray="3 3" opacity="0.6" />
        <line x1={rangeX} y1={y0} x2={rangeX} y2={y0 - sill} strokeDasharray="3 3" opacity="0.6" />
        <line x1={x0} y1={y0 - nugget} x2={x0 + 10} y2={y0 - nugget} strokeWidth="1.6" />

        <path d={curve} />
        <path d={flat} />
      </g>

      <circle cx={x0} cy={y0 - nugget} r="3.2" fill="currentColor" stroke="none" />

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="300" y="238" fontSize="11" textAnchor="middle" letterSpacing="1">DISTANCE h</text>
        <text x="18" y="110" fontSize="11" textAnchor="middle" letterSpacing="0.5" transform="rotate(-90 18 110)">γ(h)</text>

        <text x={x0 - 8} y={y0 - nugget - 8} fontSize="9.5" textAnchor="start" fontStyle="italic">effet de pépite</text>
        <text x={rangeX + 8} y={y0 - sill - 10} fontSize="9.5" textAnchor="start" fontStyle="italic">palier (sill)</text>
        <text x={rangeX} y={y0 + 18} fontSize="9.5" textAnchor="middle" fontStyle="italic">portée (range)</text>
      </g>
    </svg>
  )
}
