import { useRef, useState } from "react"
import { polygon as turfPolygon, intersect, union, difference, featureCollection } from "@turf/turf"
import type { Feature, Polygon, Position } from "geojson"
import { planarArea } from "@/lib/planarGeom"
import { cn } from "@/lib/utils"

// Mêmes deux rectangles fixes que SpatialOperationGame (reconnaissance visuelle
// à choix multiples) — ici l'élève ne reconnaît plus le résultat, il le
// DESSINE lui-même point par point, un cran de plus dans la taxonomie de
// Bloom (reconnaître → produire) sur exactement la même paire de formes.
const A: Position[] = [
  [20, 20],
  [100, 20],
  [100, 80],
  [20, 80],
  [20, 20],
]
const B: Position[] = [
  [60, 50],
  [140, 50],
  [140, 110],
  [60, 110],
  [60, 50],
]

const polyA = turfPolygon([A])
const polyB = turfPolygon([B])

type OpKey = "intersection" | "union" | "diffAB" | "diffBA"

const OPS: { key: OpKey; label: string; compute: () => Feature<Polygon> | null }[] = [
  { key: "intersection", label: "Intersection(A, B)", compute: () => intersect(featureCollection([polyA, polyB])) as Feature<Polygon> | null },
  { key: "union", label: "Union(A, B)", compute: () => union(featureCollection([polyA, polyB])) as Feature<Polygon> | null },
  { key: "diffAB", label: "Différence A − B", compute: () => difference(featureCollection([polyA, polyB])) as Feature<Polygon> | null },
  { key: "diffBA", label: "Différence B − A", compute: () => difference(featureCollection([polyB, polyA])) as Feature<Polygon> | null },
]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pathFromRing(coords: Position[]): string {
  return coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + " Z"
}

/** Un seul anneau extérieur attendu (les 4 opérations retenues ici — voir OPS — produisent toutes un polygone simple sur cette paire de rectangles, jamais un trou ni un multi-polygone). */
function pathFromPolygon(f: Feature<Polygon> | null): string {
  if (!f || f.geometry.type !== "Polygon") return ""
  return pathFromRing(f.geometry.coordinates[0])
}

type Feedback = { iou: number; tier: "reussi" | "proche" | "revoir" | "invalide" }

/**
 * L'élève clique des sommets pour dessiner lui-même le résultat de l'opération
 * demandée (au lieu de le reconnaître parmi des vignettes, voir
 * SpatialOperationGame juste au-dessus) puis ferme la forme : comparaison
 * automatique au vrai résultat (turf.intersect/union/difference sur les
 * mêmes deux rectangles) via l'IoU (Intersection over Union), déjà enseigné
 * comme métrique de segmentation — voir planche "IoU" du module L'Intelligence.
 */
export function DrawOperationGame() {
  const [order] = useState(() => shuffled(OPS))
  const [index, setIndex] = useState(0)
  const [points, setPoints] = useState<Position[]>([])
  const [closed, setClosed] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [solvedCount, setSolvedCount] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const op = order[index]
  const isDone = index >= order.length

  function toSvgPoint(e: React.MouseEvent<SVGSVGElement>): Position | null {
    const svg = svgRef.current
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    const local = pt.matrixTransform(ctm.inverse())
    return [Math.round(local.x), Math.round(local.y)]
  }

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (closed || isDone) return
    const p = toSvgPoint(e)
    if (!p) return
    setPoints((prev) => [...prev, p])
  }

  function handleClear() {
    setPoints([])
    setClosed(false)
    setFeedback(null)
  }

  function handleCloseShape() {
    if (points.length < 3) return
    setClosed(true)
    const ring = [...points, points[0]]
    let drawn: Feature<Polygon>
    try {
      drawn = turfPolygon([ring])
    } catch {
      setFeedback({ iou: 0, tier: "invalide" })
      return
    }
    const real = op.compute()
    try {
      const inter = intersect(featureCollection([drawn, real as Feature<Polygon>]))
      const uni = union(featureCollection([drawn, real as Feature<Polygon>]))
      const areaInter = planarArea(inter)
      const areaUnion = planarArea(uni)
      const iou = areaUnion > 0 ? areaInter / areaUnion : 0
      const tier = iou >= 0.75 ? "reussi" : iou >= 0.45 ? "proche" : "revoir"
      setFeedback({ iou, tier })
      if (tier === "reussi") setSolvedCount((n) => n + 1)
    } catch {
      setFeedback({ iou: 0, tier: "invalide" })
    }
  }

  function handleNext() {
    setIndex((i) => i + 1)
    setPoints([])
    setClosed(false)
    setFeedback(null)
  }

  function handleReset() {
    setIndex(0)
    setPoints([])
    setClosed(false)
    setFeedback(null)
    setSolvedCount(0)
  }

  const realResult = op ? op.compute() : null
  const drawnPath = points.length > 0 ? pathFromRing(closed ? [...points, points[0]] : points) : ""

  return (
    <div>
      {isDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            {solvedCount} / {order.length} formes dessinées avec un IoU ≥ 0,75.
          </p>
          <button type="button" onClick={handleReset} className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 hover:bg-gilt/10 transition-colors">
            Rejouer
          </button>
        </div>
      ) : (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-3">
            {index + 1} / {order.length} · {solvedCount} réussie{solvedCount !== 1 ? "s" : ""}
          </p>
          <p className="font-heading text-xl mb-4 text-parchment">
            Dessine le résultat de : <span className="text-gilt">{op.label}</span>
          </p>
          <p className="text-sm text-parchment-dim mb-4 text-justify">
            Clique les sommets de la forme résultat dans l'ordre, puis « Fermer la forme ». A et B sont affichés en pointillés comme repère.
          </p>

          <svg
            ref={svgRef}
            viewBox="0 0 160 130"
            onClick={handleClick}
            className={cn("w-full max-w-md border border-gilt/20 bg-white/[0.02]", !closed && "cursor-crosshair")}
          >
            <rect x={20} y={20} width={80} height={60} fill="none" stroke="rgb(var(--color-parchment-dim))" strokeWidth={1} strokeDasharray="3,3" />
            <rect x={60} y={50} width={80} height={60} fill="none" stroke="rgb(var(--color-parchment-dim))" strokeWidth={1} strokeDasharray="3,3" />
            <text x={22} y={34} className="fill-parchment-dim" style={{ font: "8px monospace" }}>A</text>
            <text x={126} y={64} className="fill-parchment-dim" style={{ font: "8px monospace" }}>B</text>

            {feedback && (
              <path d={pathFromPolygon(realResult)} fill="none" stroke="rgb(var(--color-lapis-bright))" strokeWidth={2} strokeDasharray="4,3" />
            )}

            {drawnPath && (
              <path
                d={drawnPath}
                fill="rgb(var(--color-gilt))"
                fillOpacity={0.3}
                stroke="rgb(var(--color-gilt))"
                strokeWidth={2}
              />
            )}
            {points.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={2.5} fill="rgb(var(--color-gilt-bright))" />
            ))}
          </svg>

          <div className="flex flex-wrap gap-2 mt-4">
            {!closed && (
              <>
                <button
                  type="button"
                  onClick={handleCloseShape}
                  disabled={points.length < 3}
                  className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  Fermer la forme ({points.length} sommet{points.length !== 1 ? "s" : ""})
                </button>
                <button type="button" onClick={handleClear} disabled={points.length === 0} className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-1.5 hover:text-oxblood-bright hover:border-oxblood/40 transition-colors disabled:opacity-30 disabled:pointer-events-none">
                  Effacer
                </button>
              </>
            )}
            {closed && feedback && (
              <button type="button" onClick={handleNext} className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors">
                Suivante →
              </button>
            )}
            {closed && !feedback && (
              <button type="button" onClick={handleClear} className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-1.5 hover:text-oxblood-bright hover:border-oxblood/40 transition-colors">
                Recommencer cette forme
              </button>
            )}
          </div>

          {feedback && (
            <div
              className={cn(
                "mt-4 border p-4",
                feedback.tier === "reussi" && "border-gilt/40 bg-gilt/[0.06]",
                feedback.tier === "proche" && "border-lapis/40 bg-lapis/[0.08]",
                (feedback.tier === "revoir" || feedback.tier === "invalide") && "border-oxblood/40 bg-oxblood/[0.08]",
              )}
            >
              <p className="font-mono text-[11px] uppercase tracking-wider mb-1 text-parchment-dim">IoU (Intersection over Union)</p>
              <p className="font-heading text-2xl mb-2">
                {feedback.tier === "invalide" ? "Forme invalide" : `${Math.round(feedback.iou * 100)} %`}
              </p>
              <p className="text-sm text-parchment-dim text-justify">
                {feedback.tier === "reussi" && "Bonne forme — le contour bleu en pointillés (vrai résultat) et ta forme dorée se superposent presque parfaitement."}
                {feedback.tier === "proche" && "Assez proche : compare ta forme (dorée) au vrai résultat (contour bleu en pointillés) pour voir où l'écart se situe."}
                {feedback.tier === "revoir" && "Écart important : le contour bleu en pointillés montre le vrai résultat de l'opération demandée."}
                {feedback.tier === "invalide" && "Le contour dessiné se croise lui-même — recommence en cliquant les sommets dans l'ordre du pourtour, sans repasser sur une ligne déjà tracée."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
