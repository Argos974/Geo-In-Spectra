export function IoUDiagram() {
  return (
    <svg viewBox="0 0 600 270" className="w-full h-auto" role="img" aria-label="Deux formes qui se chevauchent : la zone de recouvrement représente l'intersection, l'ensemble des deux zones colorées représente l'union">
      <g stroke="currentColor" strokeWidth="1.2" fill="currentColor">
        <circle cx="230" cy="115" r="85" fillOpacity="0.22" strokeDasharray="4 3" />
        <circle cx="340" cy="115" r="85" fillOpacity="0.22" strokeDasharray="4 3" />
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="160" y="40" fontSize="11" textAnchor="middle" letterSpacing="0.5">PRÉDICTION</text>
        <text x="410" y="40" fontSize="11" textAnchor="middle" letterSpacing="0.5">VÉRITÉ TERRAIN</text>
        <text x="285" y="119" fontSize="10" textAnchor="middle" fontStyle="italic" opacity="0.85">intersection</text>
        <text x="285" y="232" fontSize="10.5" textAnchor="middle" letterSpacing="0.3">
          IoU = aire la plus foncée / aire totale coloriée
        </text>
        <text x="285" y="250" fontSize="9" textAnchor="middle" opacity="0.7" fontStyle="italic">
          1 = recouvrement parfait · 0 = aucun recouvrement
        </text>
      </g>
    </svg>
  )
}
