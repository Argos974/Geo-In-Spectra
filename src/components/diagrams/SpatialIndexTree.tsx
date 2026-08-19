const leaves = [
  { x: 30, y: 30, w: 34, h: 24 },
  { x: 74, y: 44, w: 26, h: 20 },
  { x: 26, y: 62, w: 22, h: 18 },
  { x: 190, y: 26, w: 28, h: 22 },
  { x: 226, y: 50, w: 30, h: 26 },
]

export function SpatialIndexTree() {
  return (
    <svg viewBox="0 0 560 260" className="w-full h-auto" role="img" aria-label="Un index spatial GiST regroupe les géométries par rectangles englobants imbriqués, organisés en arbre">
      {/* Carte : rectangles englobants imbriques */}
      <g transform="translate(20,10)" stroke="currentColor" fill="none">
        <rect x="14" y="16" width="100" height="84" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
        <rect x="178" y="12" width="92" height="78" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
        <rect x="4" y="4" width="280" height="106" strokeWidth="1.3" />
        {leaves.map((l, i) => (
          <rect key={i} x={l.x} y={l.y} width={l.w} height={l.h} strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
        ))}
      </g>
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="30" y="18" fontSize="8.5" fontStyle="italic" opacity="0.75">nœud racine (bbox englobante)</text>
        <text x="46" y="118" fontSize="8.5" fontStyle="italic" opacity="0.75">nœud A</text>
        <text x="200" y="102" fontSize="8.5" fontStyle="italic" opacity="0.75">nœud B</text>
      </g>

      {/* Arbre correspondant */}
      <g stroke="currentColor" strokeWidth="1.1" fill="none">
        <line x1="300" y1="150" x2="150" y2="190" />
        <line x1="300" y1="150" x2="450" y2="190" />
        <line x1="150" y1="190" x2="100" y2="230" />
        <line x1="150" y1="190" x2="150" y2="230" />
        <line x1="150" y1="190" x2="200" y2="230" />
        <line x1="450" y1="190" x2="410" y2="230" />
        <line x1="450" y1="190" x2="480" y2="230" />
      </g>
      <g fill="currentColor" stroke="none">
        <rect x="284" y="138" width="32" height="18" />
        <rect x="134" y="180" width="32" height="18" opacity="0.85" />
        <rect x="434" y="180" width="32" height="18" opacity="0.85" />
        {[100, 150, 200, 410, 480].map((cx, i) => (
          <rect key={i} x={cx - 13} y="224" width="26" height="16" fillOpacity="0.5" />
        ))}
      </g>
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="300" y="150" fontSize="8" textAnchor="middle">racine</text>
        <text x="150" y="192" fontSize="8" textAnchor="middle">A</text>
        <text x="450" y="192" fontSize="8" textAnchor="middle">B</text>
        <text x="300" y="256" fontSize="9.5" textAnchor="middle" letterSpacing="0.5" opacity="0.8">feuilles = géométries réelles</text>
      </g>
    </svg>
  )
}
