const rows = [
  { label: "TAILLE", sub: "→ une quantité", y: 46 },
  { label: "VALEUR", sub: "→ un ordre, une intensité", y: 126 },
  { label: "FORME / COULEUR", sub: "→ une catégorie, sans ordre", y: 206 },
]

export function SemiologyVariables() {
  return (
    <svg viewBox="0 0 640 240" className="w-full h-auto" role="img" aria-label="Trois variables visuelles de Bertin : la taille pour une quantité, la valeur (clair à foncé) pour un ordre, la forme ou la couleur pour une catégorie sans ordre">
      <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.5">
        <line x1="0" y1="80" x2="640" y2="80" strokeDasharray="2 4" />
        <line x1="0" y1="160" x2="640" y2="160" strokeDasharray="2 4" />
      </g>

      {rows.map((r) => (
        <text key={r.label} x="30" y={r.y - 18} fontSize="12" fontFamily="Cinzel, serif" fill="currentColor" stroke="none" letterSpacing="0.5">
          {r.label}
        </text>
      ))}

      {/* Taille : trois cercles croissants */}
      <g fill="currentColor" stroke="none">
        <circle cx="70" cy={rows[0].y} r="6" />
        <circle cx="110" cy={rows[0].y} r="11" />
        <circle cx="160" cy={rows[0].y} r="17" />
      </g>

      {/* Valeur : quatre carrés, opacité croissante, même teinte */}
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.75">
        {[0.15, 0.4, 0.65, 0.95].map((op, i) => (
          <rect key={i} x={260 + i * 32} y={rows[1].y - 14} width="24" height="24" fillOpacity={op} />
        ))}
      </g>

      {/* Forme/couleur : trois formes distinctes, sans gradation */}
      <g fill="currentColor" stroke="none">
        <circle cx="270" cy={rows[2].y} r="9" />
        <rect x="315" y={rows[2].y - 9} width="18" height="18" />
        <polygon points={`370,${rows[2].y - 10} 380,${rows[2].y + 8} 360,${rows[2].y + 8}`} />
      </g>

      {rows.map((r) => (
        <text key={r.sub} x="410" y={r.y + 4} fontSize="10" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" opacity="0.8">
          {r.sub}
        </text>
      ))}
    </svg>
  )
}
