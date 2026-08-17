const parts = [
  { label: "Introduction", detail: "accroche, définitions, problématique, annonce de plan" },
  { label: "I. Thèse", detail: "premier axe de réponse, arguments + exemples" },
  { label: "II. Antithèse / nuance", detail: "limites, contre-exemples, complexification" },
  { label: "III. Dépassement", detail: "synthèse, échelle ou angle nouveau" },
  { label: "Conclusion", detail: "bilan, réponse à la problématique, ouverture" },
]

export function DissertationPlan() {
  const rowH = 40
  return (
    <svg viewBox="0 0 560 220" className="w-full h-auto" role="img" aria-label="Plan-type d'une dissertation de géographie : introduction, trois parties, conclusion">
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <line x1="30" y1="10" x2="30" y2="210" strokeWidth="1.2" />
        {parts.map((_, i) => (
          <line key={i} x1="24" y1={10 + i * rowH + rowH / 2} x2="36" y2={10 + i * rowH + rowH / 2} />
        ))}
      </g>
      {parts.map((p, i) => (
        <g key={p.label} fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
          <text x="46" y={10 + i * rowH + rowH / 2 - 4} fontSize="12" fontFamily="Cinzel, serif">{p.label}</text>
          <text x="46" y={10 + i * rowH + rowH / 2 + 12} fontSize="9" opacity="0.75">{p.detail}</text>
        </g>
      ))}
    </svg>
  )
}
