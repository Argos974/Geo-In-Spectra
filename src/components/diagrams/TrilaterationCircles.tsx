// Trois émetteurs (satellites ou refuges, selon le contexte d'usage) à
// distance connue d'un point cherché : chaque distance trace un cercle, les
// trois cercles se recoupent (approximativement, à l'erreur de mesure près)
// en un seul point commun — la position, retrouvée sans jamais connaître les
// angles, juste des distances. Coordonnées choisies à la main pour que les
// trois cercles s'intersectent visiblement près d'un même point sans se
// confondre ni sortir du cadre.
const emitters = [
  { label: "A", cx: 150, cy: 120, r: 145 },
  { label: "B", cx: 430, cy: 110, r: 150 },
  { label: "C", cx: 300, cy: 330, r: 140 },
]
const fix = { x: 296, y: 168 }

export function TrilaterationCircles() {
  return (
    <div>
      <svg viewBox="0 0 580 400" className="w-full h-auto" role="img" aria-label="Trois cercles de distance autour de trois émetteurs, se recoupant en un seul point : le principe de la trilatération">
        <g fill="none" stroke="currentColor">
          {emitters.map((e) => (
            <circle key={e.label} cx={e.cx} cy={e.cy} r={e.r} strokeWidth="1.3" strokeOpacity="0.55" strokeDasharray="4 3" />
          ))}
        </g>

        <g fill="currentColor" stroke="none">
          {emitters.map((e) => (
            <circle key={e.label} cx={e.cx} cy={e.cy} r="4.5" />
          ))}
        </g>

        <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" fontSize="13">
          {emitters.map((e) => (
            <text key={e.label} x={e.cx} y={e.cy - 12} textAnchor="middle">
              {e.label}
            </text>
          ))}
        </g>

        {/* Le point trouvé : cercle plein bien plus marqué que les points-émetteurs, seul repère non pointillé de la planche */}
        <circle cx={fix.x} cy={fix.y} r="6" fill="currentColor" />
        <circle cx={fix.x} cy={fix.y} r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x={fix.x + 16} y={fix.y - 8} fontFamily="'IBM Plex Mono', monospace" fontSize="12" fill="currentColor" stroke="none">
          Position
        </text>
      </svg>

      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-wide">
        Distance connue à trois émetteurs A, B, C → trois cercles → une seule intersection commune
      </p>
    </div>
  )
}
