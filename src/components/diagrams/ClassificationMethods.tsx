const unsupervised = [
  [30, 30], [45, 42], [22, 48], [40, 55],
  [140, 35], [155, 48], [162, 30], [148, 58],
  [80, 90], [95, 100], [70, 105], [90, 115],
]

const supervisedDots = [
  { x: 30, y: 30, cls: "a" }, { x: 45, y: 42, cls: "a" }, { x: 22, y: 48, cls: "a" }, { x: 40, y: 55, cls: "a" },
  { x: 140, y: 90, cls: "b" }, { x: 155, y: 105, cls: "b" }, { x: 162, y: 85, cls: "b" }, { x: 148, y: 112, cls: "b" },
]
const trained = [
  { x: 35, y: 38, cls: "a" }, { x: 150, y: 98, cls: "b" },
]

export function ClassificationMethods() {
  return (
    <svg viewBox="0 0 560 220" className="w-full h-auto" role="img" aria-label="Classification non supervisée : les groupes émergent des données. Classification supervisée : les classes sont apprises depuis des exemples étiquetés">
      <g transform="translate(20,20)">
        {unsupervised.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" fill="currentColor" stroke="none" />
        ))}
        <ellipse cx="34" cy="44" rx="30" ry="26" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="151" cy="43" rx="26" ry="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="84" cy="103" rx="26" ry="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      </g>

      <g transform="translate(310,20)">
        <path d="M 90 0 Q 60 70 100 150" stroke="currentColor" strokeWidth="1.3" fill="none" />
        {supervisedDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="3.2" fill="currentColor" fillOpacity={d.cls === "a" ? 0.9 : 0.35} stroke="none" />
        ))}
        {trained.map((d, i) => (
          <rect key={i} x={d.x - 5} y={d.y - 5} width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        ))}
      </g>

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x="105" y="205" fontSize="11" textAnchor="middle" letterSpacing="0.5">NON SUPERVISÉE</text>
        <text x="420" y="205" fontSize="11" textAnchor="middle" letterSpacing="0.5">SUPERVISÉE</text>
        <text x="420" y="42" fontSize="8.5" textAnchor="middle" fontStyle="italic">□ échantillons d'entraînement</text>
      </g>
    </svg>
  )
}
