export function CoordinateSystems() {
  return (
    <svg viewBox="0 0 640 300" className="w-full h-auto" role="img" aria-label="Un même point représenté en coordonnées géographiques sur un globe, puis projeté en coordonnées métriques sur un plan">
      <g stroke="currentColor" fill="none" strokeWidth="1.1">
        {/* Globe */}
        <circle cx="150" cy="150" r="95" />
        <ellipse cx="150" cy="150" rx="95" ry="32" />
        <ellipse cx="150" cy="150" rx="95" ry="62" />
        <ellipse cx="150" cy="150" rx="32" ry="95" />
        <ellipse cx="150" cy="150" rx="62" ry="95" />
        <line x1="150" y1="55" x2="150" y2="245" strokeWidth="1.3" />

        {/* point marqué sur le globe */}
        <circle cx="118" cy="108" r="4" fill="currentColor" stroke="none" />
        <line x1="118" y1="108" x2="118" y2="30" strokeDasharray="2 3" strokeWidth="0.8" opacity="0.6" />

        {/* Grille projetée */}
        <g transform="translate(400,55)" strokeWidth="1">
          {[0, 40, 80, 120, 160].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="190" />
          ))}
          {[0, 38, 76, 114, 152, 190].map((y) => (
            <line key={y} x1="0" y1={y} x2="160" y2={y} />
          ))}
          <rect x="0" y="0" width="160" height="190" strokeWidth="1.6" />
          <circle cx="40" cy="76" r="4" fill="currentColor" stroke="none" />
        </g>

        {/* flèche de projection */}
        <path d="M 230 100 Q 320 60 390 90" strokeWidth="1.2" markerEnd="url(#arrowhead)" />
      </g>

      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="150" y="270" fontSize="11" textAnchor="middle" letterSpacing="1">GÉOGRAPHIQUES — WGS84</text>
        <text x="90" y="95" fontSize="9.5">43.53° N</text>
        <text x="90" y="107" fontSize="9.5">5.45° E</text>

        <text x="480" y="270" fontSize="11" textAnchor="middle" letterSpacing="1">PROJETÉES — LAMBERT-93</text>
        <text x="450" y="122" fontSize="9.5">X 892 000</text>
        <text x="450" y="134" fontSize="9.5">Y 6 247 000</text>

        <text x="310" y="55" fontSize="10" textAnchor="middle" fontStyle="italic">projection</text>
      </g>
    </svg>
  )
}
