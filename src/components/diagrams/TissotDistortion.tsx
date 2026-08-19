const LAT_ROWS = [0, 1, 2, 3]

export function TissotDistortion() {
  return (
    <svg viewBox="0 0 560 260" className="w-full h-auto" role="img" aria-label="Indicatrice de Tissot : un cercle identique avant projection devient une ellipse dont la déformation dépend de la famille de projection">
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="140" y="18" fontSize="10.5" textAnchor="middle" letterSpacing="1">CONFORME</text>
        <text x="420" y="18" fontSize="10.5" textAnchor="middle" letterSpacing="1">ÉQUIVALENTE</text>
      </g>

      {/* Panneau conforme : cercles qui grossissent en gardant leur forme vers les hautes latitudes */}
      <g transform="translate(140,140)" stroke="currentColor" fill="none" strokeWidth="1.2">
        {LAT_ROWS.map((i) => {
          const r = 12 + i * 9
          const y = -90 + i * 60
          return <circle key={i} cx="0" cy={y} r={r} />
        })}
      </g>

      {/* Panneau equivalente : ellipses qui s'aplatissent mais gardent la meme aire */}
      <g transform="translate(420,140)" stroke="currentColor" fill="none" strokeWidth="1.2">
        {LAT_ROWS.map((i) => {
          const base = 20
          const rx = base + i * 7
          const ry = (base * base) / rx
          const y = -90 + i * 60
          return <ellipse key={i} cx="0" cy={y} rx={rx} ry={ry} />
        })}
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="140" y="248" fontSize="9" textAnchor="middle" fontStyle="italic">angles préservés, aires exagérées</text>
        <text x="420" y="248" fontSize="9" textAnchor="middle" fontStyle="italic">aires préservées, angles déformés</text>
        <text x="30" y="52" fontSize="8.5" textAnchor="start" opacity="0.7">équateur</text>
        <text x="30" y="222" fontSize="8.5" textAnchor="start" opacity="0.7">haute latitude</text>
      </g>
    </svg>
  )
}
