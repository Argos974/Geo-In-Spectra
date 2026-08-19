import { useEffect, useMemo, useRef, useState } from "react"
import { booleanPointInPolygon, point as turfPoint } from "@turf/turf"
import type { Feature, Polygon } from "geojson"
import { makeLocalProjector } from "@/lib/vitrollesBbox"
import { DEMO_SITES, DEFAULT_SITE_ID, getSite } from "@/lib/sites"
import { cn } from "@/lib/utils"

const SIZE = 640

type IndexField = "ndvi_mean" | "ndmi_mean" | "ndbi_mean"

const FIELD_LABELS: Record<IndexField, string> = { ndvi_mean: "NDVI moyen", ndmi_mean: "NDMI moyen", ndbi_mean: "NDBI moyen" }

const RAMPS: Record<IndexField, [[number, number, number], [number, number, number], [number, number, number]]> = {
  ndvi_mean: [
    [122, 47, 36],
    [236, 227, 207],
    [46, 125, 50],
  ],
  ndmi_mean: [
    [138, 106, 47],
    [236, 227, 207],
    [63, 110, 165],
  ],
  ndbi_mean: [
    [46, 125, 50],
    [236, 227, 207],
    [122, 47, 36],
  ],
}

function rampColor(ramp: (typeof RAMPS)[IndexField], value: number): string {
  const t = Math.max(-1, Math.min(1, value))
  const [lo, mid, hi] = ramp
  const [c0, c1] = t < 0 ? [lo, mid] : [mid, hi]
  const local = t < 0 ? t + 1 : t
  const r = Math.round(c0[0] + (c1[0] - c0[0]) * local)
  const g = Math.round(c0[1] + (c1[1] - c0[1]) * local)
  const b = Math.round(c0[2] + (c1[2] - c0[2]) * local)
  return `rgb(${r} ${g} ${b})`
}

interface GridCell {
  feature: Feature<Polygon, Record<IndexField, number>>
  ring: [number, number][] // lon/lat exterior ring
}

/**
 * grille_100m_indices.geojson — 1122 cellules de 100 m, moyenne réelle de
 * NDVI/NDMI/NDBI (résultat de référence de la séance 3 de l'Atelier) — déjà
 * dans le jeu de données, jamais rendue jusqu'ici. Rendu canvas plutôt qu'une
 * bibliothèque cartographique complète : la grille est petite (1122 polygones)
 * et l'emprise fixe, un canvas suffit et évite une dépendance supplémentaire.
 */
export function GridChoropleth() {
  const [siteId, setSiteId] = useState(DEFAULT_SITE_ID)
  const site = getSite(siteId)
  const [state, setState] = useState<{ status: "loading" | "error" | "done"; cells?: GridCell[]; error?: string }>({ status: "loading" })
  const [field, setField] = useState<IndexField>("ndvi_mean")
  const [picked, setPicked] = useState<GridCell | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridCache = useRef<Map<string, GridCell[]>>(new Map())

  useEffect(() => {
    const cached = gridCache.current.get(site.gridUrl)
    if (cached) {
      setState({ status: "done", cells: cached })
      setPicked(null)
      return
    }
    let cancelled = false
    setState({ status: "loading" })
    setPicked(null)
    fetch(site.gridUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((geojson: { features: Feature<Polygon, Record<IndexField, number>>[] }) => {
        if (cancelled) return
        const cells: GridCell[] = geojson.features.map((f) => ({ feature: f, ring: f.geometry.coordinates[0] as [number, number][] }))
        gridCache.current.set(site.gridUrl, cells)
        setState({ status: "done", cells })
      })
      .catch((err) => {
        if (!cancelled) setState({ status: "error", error: err instanceof Error ? err.message : "erreur de chargement" })
      })
    return () => {
      cancelled = true
    }
  }, [site.gridUrl])

  const bbox = useMemo(() => {
    if (state.status !== "done" || !state.cells) return null
    let w = Infinity,
      s = Infinity,
      e = -Infinity,
      n = -Infinity
    for (const c of state.cells) {
      for (const [lon, lat] of c.ring) {
        if (lon < w) w = lon
        if (lon > e) e = lon
        if (lat < s) s = lat
        if (lat > n) n = lat
      }
    }
    return { w, s, e, n }
  }, [state])

  useEffect(() => {
    if (state.status !== "done" || !state.cells || !bbox || !canvasRef.current) return
    const canvas = canvasRef.current
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const project = makeLocalProjector(bbox, SIZE, SIZE)
    ctx.fillStyle = "rgb(13 14 18)"
    ctx.fillRect(0, 0, SIZE, SIZE)

    for (const cell of state.cells) {
      const value = cell.feature.properties[field]
      ctx.beginPath()
      cell.ring.forEach(([lon, lat], i) => {
        const [x, y] = project(lon, lat)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fillStyle = rampColor(RAMPS[field], value)
      ctx.fill()
      ctx.strokeStyle = "rgba(13,14,18,0.4)"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    if (picked) {
      ctx.beginPath()
      picked.ring.forEach(([lon, lat], i) => {
        const [x, y] = project(lon, lat)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.strokeStyle = "rgb(217 180 106)"
      ctx.lineWidth = 2.5
      ctx.stroke()
    }
  }, [state, bbox, field, picked])

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (state.status !== "done" || !state.cells || !bbox || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const spanLon = bbox.e - bbox.w
    const spanLat = bbox.n - bbox.s
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const lon = bbox.w + px * spanLon
    const lat = bbox.n - py * spanLat
    const pt = turfPoint([lon, lat])
    const hit = state.cells.find((c) => booleanPointInPolygon(pt, c.feature))
    if (hit) setPicked(hit)
  }

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Grille 100 m, résultat réel</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-3">
        {state.status === "done" && state.cells ? `${state.cells.length} cellules, ` : ""}moyenne réelle par cellule ({site.label}, {site.date}). Clique une cellule pour voir ses trois valeurs.
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {DEMO_SITES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSiteId(s.id)}
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors",
              siteId === s.id ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {state.status === "loading" && <p className="font-mono text-sm text-parchment-dim">Chargement de la grille…</p>}
      {state.status === "error" && <p className="font-mono text-sm text-oxblood-bright">Échec du chargement ({state.error}).</p>}

      {state.status === "done" && (
        <div className="grid md:grid-cols-[1fr_240px] gap-6">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(Object.keys(FIELD_LABELS) as IndexField[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setField(f)}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors",
                    field === f ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50",
                  )}
                >
                  {FIELD_LABELS[f]}
                </button>
              ))}
            </div>
            <canvas ref={canvasRef} onClick={handleClick} className="w-full h-auto border border-gilt/15 cursor-pointer" />
          </div>

          <div className="border border-gilt/15 bg-gilt/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-3">Cellule sélectionnée</p>
            {picked ? (
              <table className="w-full font-mono text-[11px]">
                <tbody>
                  {(Object.keys(FIELD_LABELS) as IndexField[]).map((f) => (
                    <tr key={f} className={cn("border-b border-gilt/10 last:border-b-0", f === field && "text-gilt-bright")}>
                      <td className="py-1.5 text-parchment-dim">{FIELD_LABELS[f]}</td>
                      <td className="py-1.5 text-right tabular-nums">{picked.feature.properties[f].toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="font-mono text-[11px] text-parchment-dim/80">Clique une cellule de la grille pour voir ses valeurs réelles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
