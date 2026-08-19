const curves: { label: string; d: string; dash?: string }[] = [
  { label: "Végétation", d: "M 40 190 C 70 185 90 150 110 60 C 130 20 200 15 280 25 C 340 35 400 70 460 100 L 500 115" },
  { label: "Eau", d: "M 40 60 C 100 90 180 150 260 185 C 340 210 420 218 500 220", dash: "2 3" },
  { label: "Sol nu", d: "M 40 170 C 120 155 220 130 320 110 C 400 96 460 88 500 84", dash: "6 3" },
  { label: "Bâti", d: "M 40 175 C 130 168 230 150 320 140 C 400 132 460 140 500 150", dash: "1 4" },
]

export function SpectralSignatures() {
  return (
    <svg viewBox="0 0 560 285" className="w-full h-auto" role="img" aria-label="Signatures spectrales comparées de la végétation, de l'eau, du sol nu et du bâti">
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <line x1="40" y1="30" x2="40" y2="220" strokeWidth="1.2" />
        <line x1="40" y1="220" x2="520" y2="220" strokeWidth="1.2" />
        {curves.map((c) => (
          <path key={c.label} d={c.d} strokeWidth="1.6" strokeDasharray={c.dash} />
        ))}
      </g>
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="280" y="245" fontSize="10" textAnchor="middle" letterSpacing="1">LONGUEUR D'ONDE →</text>
        <text x="20" y="30" fontSize="10" textAnchor="end">100%</text>
        <text x="20" y="224" fontSize="10" textAnchor="end">0%</text>
      </g>
      {/* Légende : chaque étiquette porte l'échantillon de trait (plein/pointillé)
          de sa courbe, seul repère visuel qui les distingue (rendu monochrome
          currentColor) — sans ça rien ne relie "Végétation" à sa courbe. */}
      <g fontFamily="'IBM Plex Mono', monospace" fontSize="10">
        {curves.map((c, i) => {
          const x0 = 40 + i * 130
          return (
            <g key={c.label}>
              <line x1={x0} y1="270" x2={x0 + 26} y2="270" stroke="currentColor" strokeWidth="1.6" strokeDasharray={c.dash} />
              <text x={x0 + 32} y="273" fill="currentColor" stroke="none" textAnchor="start">{c.label}</text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
