const curves: { label: string; d: string; dash?: string }[] = [
  { label: "Végétation", d: "M 40 190 C 70 185 90 150 110 60 C 130 20 200 15 280 25 C 340 35 400 70 460 100 L 500 115" },
  { label: "Eau", d: "M 40 60 C 100 90 180 150 260 185 C 340 210 420 218 500 220", dash: "2 3" },
  { label: "Sol nu", d: "M 40 170 C 120 155 220 130 320 110 C 400 96 460 88 500 84", dash: "6 3" },
  { label: "Bâti", d: "M 40 175 C 130 168 230 150 320 140 C 400 132 460 140 500 150", dash: "1 4" },
]

export function SpectralSignatures() {
  return (
    <svg viewBox="0 0 560 260" className="w-full h-auto" role="img" aria-label="Signatures spectrales comparées de la végétation, de l'eau, du sol nu et du bâti">
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
        {curves.map((c, i) => (
          <text key={c.label} x={440} y={40 + i * 16} fontSize="10">{c.label}</text>
        ))}
      </g>
    </svg>
  )
}
