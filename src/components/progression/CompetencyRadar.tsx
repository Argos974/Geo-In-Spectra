import { modules } from "@/data/modules"
import type { ModuleProgress } from "@/lib/progress"

interface CompetencyRadarProps {
  progress: Record<string, ModuleProgress>
}

/**
 * Radar de compétences en SVG fait main — cohérent avec les diagrammes déjà
 * custom du site (src/components/diagrams/), pas de nouvelle dépendance de
 * graphique. Un axe par module, valeur composite = moyenne de 3 signaux déjà
 * suivis (visité / score quiz % / exercices) — pas d'invention de nouvelles
 * données, juste une lecture d'ensemble que la table plate ne donnait pas.
 */
export function CompetencyRadar({ progress }: CompetencyRadarProps) {
  const size = 320
  const center = size / 2
  const radius = size / 2 - 56
  const n = modules.length
  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const values = modules.map((m) => {
    const p = progress[m.slug]
    const visited = p?.visited ? 1 : 0
    const quizPct = p?.quizScore ? p.quizScore.score / p.quizScore.total : 0
    const exercises = p?.exercisesVisited ? 1 : 0
    return (visited + quizPct + exercises) / 3
  })

  function pointAt(i: number, value: number) {
    const a = angleFor(i)
    const r = radius * value
    return [center + r * Math.cos(a), center + r * Math.sin(a)] as const
  }

  const polygonPoints = values.map((v, i) => pointAt(i, v).join(",")).join(" ")
  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <div className="border border-gilt/20 bg-canvas p-6 flex flex-col items-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-4 self-start">Radar de compétences</p>
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" className="max-w-xs" role="img" aria-label="Radar de compétences par module">
        {rings.map((r) => (
          <polygon
            key={r}
            points={Array.from({ length: n }, (_, i) => pointAt(i, r).join(",")).join(" ")}
            fill="none"
            stroke="rgb(var(--color-gilt) / 0.15)"
            strokeWidth={1}
          />
        ))}
        {modules.map((_, i) => {
          const [x, y] = pointAt(i, 1)
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgb(var(--color-gilt) / 0.15)" strokeWidth={1} />
        })}
        <polygon points={polygonPoints} fill="rgb(var(--color-gilt) / 0.18)" stroke="rgb(var(--color-gilt))" strokeWidth={1.5} />
        {values.map((v, i) => {
          const [x, y] = pointAt(i, v)
          return <circle key={i} cx={x} cy={y} r={2.5} fill="rgb(var(--color-gilt))" />
        })}
        {modules.map((m, i) => {
          const [x, y] = pointAt(i, 1.22)
          return (
            <text
              key={m.slug}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-parchment-dim"
              style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase" }}
            >
              {m.navLabel}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
