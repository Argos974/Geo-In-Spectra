export function TilePyramid() {
  const levels = [
    { z: 0, n: 1, y: 24, size: 40 },
    { z: 1, n: 2, y: 96, size: 26 },
    { z: 2, n: 4, y: 168, size: 15 },
  ]
  return (
    <svg viewBox="0 0 560 240" className="w-full h-auto" role="img" aria-label="Pyramide de tuiles : au zoom 0 le monde tient sur une tuile, au zoom 1 sur quatre, au zoom 2 sur seize">
      {levels.map(({ z, n, y, size }) => {
        const totalW = n * size
        const startX = 280 - totalW / 2
        return (
          <g key={z}>
            <g stroke="currentColor" fill="none" strokeWidth="1.1">
              {Array.from({ length: n }).map((_, col) =>
                Array.from({ length: n }).map((__, row) => (
                  <rect key={`${col}-${row}`} x={startX + col * size} y={y + row * size} width={size} height={size} fill="currentColor" fillOpacity="0.05" />
                )),
              )}
            </g>
            <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
              <text x={startX - 12} y={y + (n * size) / 2 + 3} fontSize="10" textAnchor="end" letterSpacing="0.5">z={z}</text>
              <text x={startX + n * size + 12} y={y + (n * size) / 2 + 3} fontSize="9" textAnchor="start" fontStyle="italic" opacity="0.75">
                {n * n} tuile{n * n > 1 ? "s" : ""}
              </text>
            </g>
          </g>
        )
      })}
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="280" y="230" fontSize="10" textAnchor="middle" letterSpacing="1">N = 4^z TUILES PAR NIVEAU</text>
      </g>
    </svg>
  )
}
