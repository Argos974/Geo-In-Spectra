const CELL = 26
const COLS = 6
const ROWS = 6

export function KernelConvolution() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto" role="img" aria-label="Un noyau 3x3 glissé sur une grille de pixels, produisant une grille de sortie plus petite">
      <g transform="translate(30,20)" stroke="currentColor" fill="none" strokeWidth="0.7" opacity="0.6">
        {Array.from({ length: COLS + 1 }).map((_, i) => (
          <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={ROWS * CELL} />
        ))}
        {Array.from({ length: ROWS + 1 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * CELL} x2={COLS * CELL} y2={i * CELL} />
        ))}
      </g>
      <rect
        x={30 + CELL * 1.5}
        y={20 + CELL * 1.5}
        width={CELL * 3}
        height={CELL * 3}
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path d="M 230 130 Q 270 130 300 130" stroke="currentColor" strokeWidth="1.2" fill="none" markerEnd="url(#kernel-arrow)" />

      <g transform="translate(340,60)" stroke="currentColor" fill="none" strokeWidth="0.7" opacity="0.6">
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={4 * CELL} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * CELL} x2={4 * CELL} y2={i * CELL} />
        ))}
      </g>
      <rect x={340 + CELL} y={60 + CELL} width={CELL} height={CELL} fill="currentColor" fillOpacity="0.4" />

      <defs>
        <marker id="kernel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="126" y="205" fontSize="11" textAnchor="middle" letterSpacing="0.5">IMAGE D'ENTRÉE</text>
        <text x="440" y="205" fontSize="11" textAnchor="middle" letterSpacing="0.5">IMAGE FILTRÉE</text>
        <text x="265" y="115" fontSize="9.5" textAnchor="middle" fontStyle="italic">noyau 3×3</text>
      </g>
    </svg>
  )
}
