export function VectorRaster() {
  const cols = 8
  const rows = 5
  const cell = 18
  const filled = new Set(["2,1", "3,1", "3,2", "4,2", "2,2", "4,1", "5,2"])

  return (
    <svg viewBox="0 0 640 220" className="w-full h-auto" role="img" aria-label="Comparaison entre une représentation vecteur (points, ligne, polygone) et une représentation raster (grille de pixels)">
      <g stroke="currentColor" fill="none" strokeWidth="1.1">
        {/* Vecteur : polygone + ligne + points */}
        <polygon points="60,150 100,80 170,95 150,160" strokeWidth="1.3" />
        <path d="M 40 40 L 90 55 L 130 35" strokeDasharray="3 3" />
        <circle cx="40" cy="40" r="3.2" fill="currentColor" stroke="none" />
        <circle cx="90" cy="55" r="3.2" fill="currentColor" stroke="none" />
        <circle cx="130" cy="35" r="3.2" fill="currentColor" stroke="none" />

        {/* Raster : grille de cellules */}
        <g transform="translate(400,30)">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
              <rect
                key={`${c},${r}`}
                x={c * cell}
                y={r * cell}
                width={cell}
                height={cell}
                fillOpacity={filled.has(`${c},${r}`) ? 0.55 : 0}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.5"
              />
            )),
          )}
          <rect x="0" y="0" width={cols * cell} height={rows * cell} strokeWidth="1.4" />
        </g>
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="105" y="195" fontSize="11" textAnchor="middle" letterSpacing="1">VECTEUR</text>
        <text x="480" y="195" fontSize="11" textAnchor="middle" letterSpacing="1">RASTER</text>
      </g>
    </svg>
  )
}
