import { useMemo, useState } from "react"
import { FRANCE_OUTLINE_BBOX, FRANCE_OUTLINE_CORSICA, FRANCE_OUTLINE_MAINLAND } from "@/data/franceOutline"

export interface CityCoord {
  name: string
  /** Coordonnées Lambert-93 réelles (approximatives), en mètres — affichées telles quelles au joueur. */
  x: number
  y: number
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const VIEW = 400
const PAD = 20

/**
 * Positionne chaque ville sur le vrai contour de la France (Lambert-93,
 * `src/data/franceOutline.ts`) selon ses vraies coordonnées — X croissant
 * vers l'est, Y croissant vers le nord, donc inversé en SVG dont l'axe Y
 * croît vers le bas. L'échelle est uniforme (pas d'étirement séparé en X/Y)
 * et calée sur l'emprise réelle du pays, pas sur le nuage de villes du jeu,
 * pour que le contour et les points restent cohérents entre eux. Le joueur
 * doit déduire la position d'un point à partir de son couple de coordonnées,
 * pas reconnaître un nom de ville sur une carte — un vrai exercice de
 * lecture de système de coordonnées, simplement posé sur un vrai fond.
 */
const OUTLINE_MARGIN = 40_000 // m, marge autour du contour réel pour laisser respirer les points côtiers

const { xMin, xMax, yMin, yMax } = FRANCE_OUTLINE_BBOX
const boxX = xMax - xMin + 2 * OUTLINE_MARGIN
const boxY = yMax - yMin + 2 * OUTLINE_MARGIN
const scale = Math.min((VIEW - 2 * PAD) / boxX, (VIEW - 2 * PAD) / boxY)
const drawnW = boxX * scale
const drawnH = boxY * scale
const offsetX = (VIEW - drawnW) / 2
const offsetY = (VIEW - drawnH) / 2

function project(x: number, y: number) {
  const sx = (x - xMin + OUTLINE_MARGIN) * scale + offsetX
  const sy = drawnH - (y - yMin + OUTLINE_MARGIN) * scale + offsetY
  return { sx, sy }
}

function ringToPath(ring: readonly [number, number][]) {
  return ring.map(([x, y], i) => {
    const { sx, sy } = project(x, y)
    return `${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`
  }).join(" ") + " Z"
}

export function CoordinateMapGame({ cities }: { cities: CityCoord[] }) {
  const mainlandPath = useMemo(() => ringToPath(FRANCE_OUTLINE_MAINLAND), [])
  const corsicaPath = useMemo(() => ringToPath(FRANCE_OUTLINE_CORSICA), [])

  function toSvg(c: CityCoord) {
    return project(c.x, c.y)
  }

  const order = useMemo(() => shuffled(cities.map((_, i) => i)), [cities])
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [wrongIndex, setWrongIndex] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)

  const isDone = revealed.size === cities.length
  const targetIndex = order[step]
  const target = cities[targetIndex]

  function pick(i: number) {
    if (wrongIndex !== null || revealed.has(i)) return
    setAttempts((n) => n + 1)
    if (i === targetIndex) {
      setRevealed((s) => new Set(s).add(i))
      setStep((s) => s + 1)
    } else {
      setWrongIndex(i)
      window.setTimeout(() => setWrongIndex(null), 550)
    }
  }

  function reset() {
    setStep(0)
    setRevealed(new Set())
    setWrongIndex(null)
    setAttempts(0)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-10">
        {revealed.size} / {cities.length} placées · {attempts} essai{attempts !== 1 ? "s" : ""}
      </p>

      {isDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            {cities.length} villes placées en {attempts} essai{attempts !== 1 ? "s" : ""}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 hover:bg-gilt/10 transition-colors"
          >
            Rejouer
          </button>
        </div>
      ) : (
        <div>
          <p className="font-heading text-xl mb-1 text-parchment">
            Où se trouve <span className="text-gilt">{target.name}</span> ?
          </p>
          <p className="font-mono text-sm text-parchment-dim mb-6">
            X = {target.x.toLocaleString("fr-FR")} &nbsp;·&nbsp; Y = {target.y.toLocaleString("fr-FR")} (Lambert-93)
          </p>

          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full max-w-md border border-gilt/15 bg-white/[0.02]">
            <path d={mainlandPath} fill="rgb(var(--color-parchment-dim))" fillOpacity={0.1} stroke="rgb(var(--color-gilt))" strokeOpacity={0.5} strokeWidth={1} />
            <path d={corsicaPath} fill="rgb(var(--color-parchment-dim))" fillOpacity={0.1} stroke="rgb(var(--color-gilt))" strokeOpacity={0.5} strokeWidth={1} />
            <text x={VIEW - PAD} y={VIEW - 6} textAnchor="end" fontSize={10} fill="rgb(var(--color-gilt))" fontFamily="monospace">X (est) →</text>
            <text x={PAD - 6} y={PAD + 4} textAnchor="end" fontSize={10} fill="rgb(var(--color-gilt))" fontFamily="monospace" transform={`rotate(-90 ${PAD - 6} ${PAD + 4})`}>Y (nord) ↑</text>

            {cities.map((c, i) => {
              const { sx, sy } = toSvg(c)
              const isRevealed = revealed.has(i)
              const isWrong = wrongIndex === i
              return (
                <g key={c.name}>
                  <circle
                    cx={sx}
                    cy={sy}
                    r={9}
                    className="cursor-pointer"
                    fill={isRevealed ? "rgb(var(--color-gilt))" : isWrong ? "rgb(var(--color-oxblood))" : "rgb(var(--color-lapis))"}
                    fillOpacity={isRevealed ? 0.5 : 0.35}
                    stroke={isRevealed ? "rgb(var(--color-gilt))" : isWrong ? "rgb(var(--color-oxblood))" : "rgb(var(--color-lapis))"}
                    strokeWidth={2}
                    onClick={() => pick(i)}
                  />
                  {isRevealed && (
                    <text x={sx + 12} y={sy + 4} fontSize={11} fill="rgb(var(--color-gilt))" fontFamily="monospace">
                      {c.name}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      )}
    </div>
  )
}
