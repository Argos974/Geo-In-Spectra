const steps = ["Charger", "Styliser", "Analyser", "Exporter"]

export function WorkflowTp() {
  const spacing = 140
  const startX = 50
  const y = 60

  return (
    <svg viewBox="0 0 600 140" className="w-full h-auto" role="img" aria-label="Étapes d'un traitement type dans un SIG : charger, styliser, analyser, exporter">
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <path
          d={`M ${startX} ${y} ${steps.map((_, i) => `L ${startX + i * spacing} ${y}`).join(" ")}`}
          strokeDasharray="1 6"
          strokeLinecap="round"
          strokeWidth="1.4"
        />
        {steps.map((_, i) => (
          <circle key={i} cx={startX + i * spacing} cy={y} r="22" strokeWidth="1.3" fill="rgb(var(--color-ink))" />
        ))}
      </g>
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        {steps.map((label, i) => (
          <g key={label}>
            <text x={startX + i * spacing} y={y + 5} fontSize="13" textAnchor="middle" fontFamily="Cinzel, serif">
              {["I", "II", "III", "IV"][i]}
            </text>
            <text x={startX + i * spacing} y={y + 45} fontSize="10.5" textAnchor="middle" letterSpacing="0.5">
              {label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
