import { useEffect, useRef, useState } from "react"
import { findTwoContrastingScenes, type StacScene } from "@/lib/stac"
import { loadWindowedBand, rampColor, INDEX_DEFS } from "@/lib/raster"
import { bboxToUtm31 } from "@/lib/utm"
import { DEMO_SITES, DEFAULT_SITE_ID, getSite } from "@/lib/sites"
import { cn } from "@/lib/utils"

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
interface RenderedNdvi {
  width: number
  height: number
  data: Uint8ClampedArray
}

interface SwipeResult {
  scenes: { summer: StacScene; winter: StacScene }
  images: { summer: RenderedNdvi; winter: RenderedNdvi }
}

function computeNdviImage(red: { data: Float32Array; width: number; height: number }, nir: { data: Float32Array; width: number; height: number }): RenderedNdvi {
  const width = Math.min(red.width, nir.width)
  const height = Math.min(red.height, nir.height)
  const data = new Uint8ClampedArray(width * height * 4)
  const def = INDEX_DEFS.ndvi
  for (let i = 0; i < width * height; i++) {
    const r = red.data[i]
    const n = nir.data[i]
    const v = (n - r) / (n + r)
    const [cr, cg, cb] = rampColor(def.ramp, v)
    data[i * 4 + 0] = cr
    data[i * 4 + 1] = cg
    data[i * 4 + 2] = cb
    data[i * 4 + 3] = 255
  }
  return { width, height, data }
}

export function SentinelSwipe() {
  const [siteId, setSiteId] = useState(DEFAULT_SITE_ID)
  const site = getSite(siteId)
  const [state, setState] = useState<{ status: "loading" | "error" | "done"; error?: string }>({ status: "loading" })
  const [result, setResult] = useState<SwipeResult | null>(null)
  const [split, setSplit] = useState(50)
  const summerCanvasRef = useRef<HTMLCanvasElement>(null)
  const winterCanvasRef = useRef<HTMLCanvasElement>(null)
  // Un seul appel STAC + une seule lecture des bandes par site — reprendre le
  // même aller-retour au même site relançait des requêtes Range redondantes
  // (sollicite inutilement l'API publique) sans jamais redessiner le canvas
  // correctement ; le résultat déjà calculé est réutilisé tel quel.
  const resultCache = useRef<Map<string, SwipeResult>>(new Map())

  async function load() {
    const cached = resultCache.current.get(siteId)
    if (cached) {
      setResult(cached)
      setState({ status: "done" })
      return
    }
    setState({ status: "loading" })
    try {
      const found = await findTwoContrastingScenes(site.bbox)
      const utmBbox = bboxToUtm31(site.bbox)
      const [summerBands, winterBands] = await Promise.all([
        Promise.all([loadWindowedBand(found.summer.redHref, utmBbox), loadWindowedBand(found.summer.nirHref, utmBbox)]),
        Promise.all([loadWindowedBand(found.winter.redHref, utmBbox), loadWindowedBand(found.winter.nirHref, utmBbox)]),
      ])
      const computed: SwipeResult = {
        scenes: found,
        images: { summer: computeNdviImage(summerBands[0], summerBands[1]), winter: computeNdviImage(winterBands[0], winterBands[1]) },
      }
      resultCache.current.set(siteId, computed)
      setResult(computed)
      setState({ status: "done" })
    } catch (err) {
      setState({ status: "error", error: err instanceof Error ? err.message : "erreur réseau" })
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId])

  // Dessin séparé du chargement : les <canvas> ne sont montés dans le DOM
  // qu'une fois state.status === "done" (rendu conditionnel ci-dessous), donc
  // les refs sont encore nulles pendant tout le chargement — dessiner ici,
  // après le commit qui suit ce même changement d'état, garantit que le
  // canvas existe déjà quand on y écrit.
  useEffect(() => {
    if (state.status !== "done" || !result) return
    for (const [canvas, img] of [
      [summerCanvasRef.current, result.images.summer],
      [winterCanvasRef.current, result.images.winter],
    ] as const) {
      if (!canvas) continue
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) continue
      const imgData = ctx.createImageData(img.width, img.height)
      imgData.data.set(img.data)
      ctx.putImageData(imgData, 0, 0)
    }
  }, [state, result])

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
  }

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Deux dates réelles, catalogue Sentinel-2 interrogé en direct</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-3">
        NDVI recalculé en direct sur les bandes B04/B08 de deux acquisitions réelles (été/hiver, faible couverture nuageuse), sur l'emprise {site.label}. Fais glisser le curseur.
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

      {state.status === "done" && result && (
        <div>
          <div className="relative border border-gilt/15 select-none" style={{ aspectRatio: "1 / 1" }}>
            <canvas ref={summerCanvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
              <canvas ref={winterCanvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />
            </div>
            <div className="absolute inset-y-0 bg-gilt-bright/80 w-0.5 pointer-events-none" style={{ left: `${split}%` }} />
            <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wider bg-ink/80 text-gilt px-1.5 py-0.5">
              {formatDate(result.scenes.summer.datetime)}
            </div>
            <div className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wider bg-ink/80 text-gilt px-1.5 py-0.5">
              {formatDate(result.scenes.winter.datetime)}
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
          <p className="font-mono text-[10px] text-parchment-dim/80 mt-2 text-justify">
            Gauche : {formatDate(result.scenes.summer.datetime)} (nuage {result.scenes.summer.cloudCover.toFixed(1)} %) · Droite :{" "}
            {formatDate(result.scenes.winter.datetime)} (nuage {result.scenes.winter.cloudCover.toFixed(1)} %). Palette NDVI identique aux autres
            planches (rouge = faible, vert = fort).
          </p>
        </div>
      )}
    </div>
  )
}
