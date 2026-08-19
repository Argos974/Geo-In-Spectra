export function LidarReturns() {
  const groundY = 210
  const canopyTopY = 60
  const pulseX = 300

  return (
    <svg viewBox="0 0 560 240" className="w-full h-auto" role="img" aria-label="Un pulse laser LiDAR traverse la canopée : premier retour sur la cime, retour intermédiaire sur une branche, dernier retour au sol">
      <g stroke="currentColor" fill="none">
        {/* Capteur aeroporte */}
        <g transform="translate(300,14)">
          <path d="M -22 0 L 22 0 L 14 14 L -14 14 Z" strokeWidth="1.3" />
          <text x="0" y="-6" fontFamily="'IBM Plex Mono', monospace" fontSize="9" textAnchor="middle" fill="currentColor" stroke="none" letterSpacing="0.5">CAPTEUR</text>
        </g>

        {/* Sol */}
        <line x1="20" y1={groundY} x2="540" y2={groundY} strokeWidth="1.4" />

        {/* Silhouette de canopee, en pointilles */}
        <path
          d={`M 180 ${groundY - 8} C 190 ${canopyTopY + 30}, 210 ${canopyTopY}, 240 ${canopyTopY + 10}
              C 260 ${canopyTopY - 10}, 300 ${canopyTopY - 6}, 320 ${canopyTopY + 14}
              C 350 ${canopyTopY - 4}, 380 ${canopyTopY + 20}, 400 ${canopyTopY + 40}
              C 410 ${groundY - 30}, 400 ${groundY - 10}, 380 ${groundY - 6}
              L 200 ${groundY - 6} C 185 ${groundY - 10}, 178 ${groundY - 20}, 180 ${groundY - 8} Z`}
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.65"
        />

        {/* Branche intermediaire */}
        <line x1="270" y1="140" x2="330" y2="132" strokeWidth="1.6" opacity="0.8" />

        {/* Trajet du pulse, en pointilles fins */}
        <line x1={pulseX} y1="28" x2={pulseX - 8} y2={canopyTopY + 12} strokeWidth="1.1" strokeDasharray="1 3" />
        <line x1={pulseX - 8} y1={canopyTopY + 12} x2={pulseX - 2} y2="138" strokeWidth="1.1" strokeDasharray="1 3" />
        <line x1={pulseX - 2} y1="138" x2={pulseX + 6} y2={groundY} strokeWidth="1.1" strokeDasharray="1 3" />
      </g>

      {/* Points de retour */}
      <g fill="currentColor" stroke="none">
        <circle cx={pulseX - 8} cy={canopyTopY + 12} r="4" />
        <circle cx={pulseX - 2} cy="138" r="4" opacity="0.75" />
        <circle cx={pulseX + 6} cy={groundY} r="4" />
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x={pulseX - 8} y={canopyTopY - 2} fontSize="9.5" textAnchor="middle" fontStyle="italic">1ᵉʳ retour — cime</text>
        <text x={pulseX + 70} y="134" fontSize="9.5" textAnchor="start" fontStyle="italic">retour intermédiaire — branche</text>
        <text x={pulseX + 6} y={groundY + 18} fontSize="9.5" textAnchor="middle" fontStyle="italic">dernier retour — sol (MNT)</text>
        <text x="40" y={groundY - 12} fontSize="9" textAnchor="start" letterSpacing="0.5" opacity="0.7">SOL</text>
      </g>
    </svg>
  )
}
