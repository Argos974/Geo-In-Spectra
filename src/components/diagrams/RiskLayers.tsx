export function RiskLayers() {
  const layers = [
    { label: "ALÉA", y: 20, detail: "probabilité et intensité du phénomène" },
    { label: "ENJEUX", y: 76, detail: "ce qui est exposé (population, bâti)" },
    { label: "VULNÉRABILITÉ", y: 132, detail: "sensibilité des enjeux au phénomène" },
  ]
  return (
    <svg viewBox="0 0 560 240" className="w-full h-auto" role="img" aria-label="Le risque se construit en croisant trois couches distinctes : aléa, enjeux et vulnérabilité">
      {layers.map((l, i) => (
        <g key={l.label}>
          <rect x="60" y={l.y} width="300" height="42" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" />
          <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
            <text x="80" y={l.y + 18} fontSize="11" letterSpacing="1">{l.label}</text>
            <text x="80" y={l.y + 33} fontSize="8.5" fontStyle="italic" opacity="0.7">{l.detail}</text>
          </g>
          {i < layers.length - 1 && (
            <text x="210" y={l.y + 58} fontSize="14" textAnchor="middle" fill="currentColor" stroke="none">×</text>
          )}
        </g>
      ))}

      <g stroke="currentColor" fill="none" strokeWidth="1.2">
        <path d="M 210 190 L 210 205" />
        <path d="M 204 200 L 210 208 L 216 200" />
      </g>

      <rect x="60" y="210" width="300" height="26" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12" />
      <text x="210" y="227" fontFamily="'IBM Plex Mono', monospace" fontSize="11" textAnchor="middle" letterSpacing="1.5" fill="currentColor" stroke="none">RISQUE</text>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="400" y="60" fontSize="9" fontStyle="italic" opacity="0.75">un aléa fort sans</text>
        <text x="400" y="72" fontSize="9" fontStyle="italic" opacity="0.75">aucun enjeu exposé</text>
        <text x="400" y="84" fontSize="9" fontStyle="italic" opacity="0.75">ne produit aucun</text>
        <text x="400" y="96" fontSize="9" fontStyle="italic" opacity="0.75">risque opérationnel</text>
      </g>
    </svg>
  )
}
