import { useEffect, useRef, useState } from "react"
import { findTwoContrastingScenes, type StacScene } from "@/lib/stac"
import { loadWindowedBand, rampColor, INDEX_DEFS } from "@/lib/raster"
import { bboxToUtm31 } from "@/lib/utm"
import { VITROLLES_BBOX } from "@/lib/vitrollesBbox"

/**
 * Deux dates RÉELLES (été/hiver, faible nuage) interrogées en direct sur le
 * catalogue public Element84/AWS (même source que le jeu de données canonique,
 * voir DatasetPage) — pas deux images choisies à l'avance : le catalogue est
 * requêté à chaque chargement (findTwoContrastingScenes), NDVI recalculé en
 * direct sur les bandes B04/B08 lues par fenêtrage HTTP Range (aucun serveur à
 * nous, ~3×3 km lus sur une scène de ~110×110 km). Rejoint le point
 * pédagogique de télédétection = suivi du changement, sur la même emprise que
 * les autres planches vivantes du site.
 */
export function SentinelSwipe() {
  const [state, setState] = useState<{ status: "loading" | "error" | "done"; error?: string }>({ status: "loading" })
  const [scenes, setScenes] = useState<{ summer: StacScene; winter: StacScene } | null>(null)
  const [split, setSplit] = useState(50)
  const summerCanvasRef = useRef<HTMLCanvasElement>(null)
  const winterCanvasRef = useRef<HTMLCanvasElement>(null)

  async function load() {
    setState({ status: "loading" })
    try {
      const found = await findTwoContrastingScenes()
      setScenes(found)
      const utmBbox = bboxToUtm31(VITROLLES_BBOX)

      async function renderScene(scene: StacScene, canvas: HTMLCanvasElement | null) {
        if (!canvas) return
        const [red, nir] = await Promise.all([loadWindowedBand(scene.redHref, utmBbox), loadWindowedBand(scene.nirHref, utmBbox)])
        const width = Math.min(red.width, nir.width)
        const height = Math.min(red.height, nir.height)
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        const imgData = ctx.createImageData(width, height)
        const def = INDEX_DEFS.ndvi
        for (let i = 0; i < width * height; i++) {
          const r = red.data[i]
          const n = nir.data[i]
          const v = (n - r) / (n + r)
          const [cr, cg, cb] = rampColor(def.ramp, v)
          imgData.data[i * 4 + 0] = cr
          imgData.data[i * 4 + 1] = cg
          imgData.data[i * 4 + 2] = cb
          imgData.data[i * 4 + 3] = 255
        }
        ctx.putImageData(imgData, 0, 0)
      }

      await Promise.all([renderScene(found.summer, summerCanvasRef.current), renderScene(found.winter, winterCanvasRef.current)])
      setState({ status: "done" })
    } catch (err) {
      setState({ status: "error", error: err instanceof Error ? err.message : "erreur réseau" })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- charge des données au montage, pas une valeur dérivée du rendu
    load()
  }, [])

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
  }

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Deux dates réelles, catalogue Sentinel-2 interrogé en direct</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-5">
        NDVI recalculé en direct sur les bandes B04/B08 de deux acquisitions réelles (été/hiver, faible couverture nuageuse), même emprise que le jeu de données canonique. Fais glisser le curseur.
      </p>

      {state.status === "loading" && <p className="font-mono text-sm text-parchment-dim">Interrogation du catalogue Sentinel-2 (Element84/AWS) et lecture des bandes…</p>}

      {state.status === "error" && (
        <div>
          <p className="font-mono text-sm text-oxblood-bright mb-3">
            Échec ({state.error}). Le catalogue public Sentinel-2 (Element84/AWS) est une infrastructure partagée, elle peut saturer ou être temporairement indisponible, indépendamment de ce site.
          </p>
          <button type="button" onClick={load} className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors">
            Réessayer
          </button>
        </div>
      )}

      {state.status === "done" && scenes && (
        <div>
          <div className="relative border border-gilt/15 select-none" style={{ aspectRatio: "1 / 1" }}>
            <canvas ref={summerCanvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
              <canvas ref={winterCanvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />
            </div>
            <div className="absolute inset-y-0 bg-gilt-bright/80 w-0.5 pointer-events-none" style={{ left: `${split}%` }} />
            <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wider bg-ink/80 text-gilt px-1.5 py-0.5">
              {formatDate(scenes.summer.datetime)}
            </div>
            <div className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wider bg-ink/80 text-gilt px-1.5 py-0.5">
              {formatDate(scenes.winter.datetime)}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            className="w-full mt-3 accent-gilt"
            aria-label="Position du curseur de comparaison"
          />
          <p className="font-mono text-[10px] text-parchment-dim/70 mt-2 text-justify">
            Gauche : {formatDate(scenes.summer.datetime)} (nuage {scenes.summer.cloudCover.toFixed(1)} %) · Droite :{" "}
            {formatDate(scenes.winter.datetime)} (nuage {scenes.winter.cloudCover.toFixed(1)} %). Palette NDVI identique aux autres
            planches (rouge = faible, vert = fort).
          </p>
        </div>
      )}
    </div>
  )
}
