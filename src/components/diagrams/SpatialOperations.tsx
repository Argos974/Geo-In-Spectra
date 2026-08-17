export function SpatialOperations() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto" role="img" aria-label="Trois opérations spatiales : tampon, intersection et union de deux géométries">
      <g stroke="currentColor" fill="none" strokeWidth="1.1">
        {/* Buffer */}
        <g transform="translate(60,40)">
          <path d="M 0 60 L 100 20 L 130 90" strokeWidth="1.4" />
          <circle cx="0" cy="60" r="3" fill="currentColor" stroke="none" />
          <circle cx="100" cy="20" r="3" fill="currentColor" stroke="none" />
          <circle cx="130" cy="90" r="3" fill="currentColor" stroke="none" />
          <path d="M -22 60 Q -22 20 0 20 Q 40 -22 100 -22 Q 122 -22 122 0 M 130 68 Q 152 68 152 90 Q 152 112 130 112 L 0 112 Q -22 112 -22 90 Z" strokeDasharray="3 3" opacity="0.7" />
        </g>

        {/* Intersection */}
        <g transform="translate(280,50)">
          <circle cx="30" cy="50" r="45" />
          <circle cx="85" cy="50" r="45" />
          <path d="M 55 15 A 45 45 0 0 1 55 85 A 45 45 0 0 1 55 15 Z" fill="currentColor" fillOpacity="0.35" stroke="none" />
        </g>

        {/* Union / dissolve */}
        <g transform="translate(450,50)">
          <path
            d="M 30 5 A 45 45 0 0 0 -5 68 A 45 45 0 0 0 60 92 A 45 45 0 0 0 85 30 A 45 45 0 0 0 30 5 Z"
            strokeWidth="1.6"
          />
          <circle cx="20" cy="50" r="45" opacity="0.25" />
          <circle cx="70" cy="50" r="45" opacity="0.25" />
        </g>
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="120" y="200" fontSize="11" textAnchor="middle" letterSpacing="0.5">TAMPON</text>
        <text x="355" y="200" fontSize="11" textAnchor="middle" letterSpacing="0.5">INTERSECTION</text>
        <text x="525" y="200" fontSize="11" textAnchor="middle" letterSpacing="0.5">UNION</text>
      </g>
    </svg>
  )
}
