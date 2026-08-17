const events = [
  { year: "~150", label: "Ptolémée" },
  { year: "~1300", label: "Portulans" },
  { year: "1569", label: "Mercator" },
  { year: "~1750", label: "Cassini" },
  { year: "1972", label: "Landsat 1" },
  { year: "2015", label: "Sentinel-2" },
]

export function CartographyTimeline() {
  const width = 560
  const marginX = 20
  const y = 80
  const step = (width - marginX * 2) / (events.length - 1)

  return (
    <svg viewBox="0 0 600 140" className="w-full h-auto" role="img" aria-label="Frise chronologique de la cartographie, de Ptolémée aux satellites d'observation actuels">
      <g stroke="currentColor" strokeWidth="1.2">
        <line x1={marginX} y1={y} x2={width - marginX} y2={y} />
      </g>
      {events.map((e, i) => {
        const x = marginX + i * step
        return (
          <g key={e.year}>
            <circle cx={x} cy={y} r="4" fill="currentColor" stroke="none" />
            <line x1={x} y1={y} x2={x} y2={y - 16} stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
              <text x={x} y={y - 22} fontSize="10" textAnchor="middle">{e.year}</text>
              <text x={x} y={y + 24} fontSize="10.5" textAnchor="middle" fontFamily="Cinzel, serif">{e.label}</text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}
