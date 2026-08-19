import { useEffect, useMemo, useRef, useState } from "react"
import {
  loadFullRaster,
  sampleBands,
  computeStretch,
  stretchToByte,
  rampColor,
  INDEX_DEFS,
  type IndexKey,
  type LoadedRaster,
  type BandSample,
} from "@/lib/raster"
import { cn } from "@/lib/utils"

const BANDS_URL = "/data/sample-vitrolles-2024/sentinel2_2024-08-06_vitrolles_bands.tif"

type Mode = "rgb" | IndexKey

const MODE_LABELS: Record<Mode, string> = {
  rgb: "RVB naturel",
  ndvi: "NDVI",
  ndmi: "NDMI",
  ndbi: "NDBI",
  ndre: "NDRE",
  ndwi: "NDWI",
}

const BAND_LABEL: Record<keyof BandSample, string> = {
  blue: "Bleu (B2)",
  green: "Vert (B3)",
  red: "Rouge (B4)",
  rededge: "Red-edge (B5)",
  nir: "NIR (B8)",
  swir: "SWIR (B11)",
}

/**
 * Referme la boucle Formulaire ↔ Indices spectraux ↔ Dataset : les 6 bandes
 * réelles du jeu de données canonique (sentinel2_2024-08-06_vitrolles_bands.tif,
 * réflectance de surface 0–1, EPSG:2154, 10 m) chargées et décodées entièrement
 * dans le navigateur (geotiff.js, aucun serveur) — 334×342 px, assez petit pour
 * ne pas nécessiter de fenêtrage. Un clic pixel calcule l'indice choisi EN DIRECT
 * à partir des bandes brutes, formule affichée avec les vraies valeurs du pixel
 * plutôt qu'un exemple générique.
 */
export function RasterExplorer() {
  const [state, setState] = useState<{ status: "loading" | "error" | "done"; raster?: LoadedRaster; error?: string }>({ status: "loading" })
  const [mode, setMode] = useState<Mode>("ndvi")
  const [picked, setPicked] = useState<{ px: number; py: number; sample: BandSample } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    loadFullRaster(BANDS_URL)
      .then((raster) => {
        if (!cancelled) setState({ status: "done", raster })
      })
      .catch((err) => {
        if (!cancelled) setState({ status: "error", error: err instanceof Error ? err.message : "erreur de chargement" })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const stretch = useMemo(() => {
    if (state.status !== "done" || !state.raster) return null
    return { red: computeStretch(state.raster.bands[2]), green: computeStretch(state.raster.bands[1]), blue: computeStretch(state.raster.bands[0]) }
  }, [state])

  useEffect(() => {
    if (state.status !== "done" || !state.raster || !canvasRef.current) return
    const raster = state.raster
    const canvas = canvasRef.current
    canvas.width = raster.width
    canvas.height = raster.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const imgData = ctx.createImageData(raster.width, raster.height)

    if (mode === "rgb" && stretch) {
      for (let i = 0; i < raster.width * raster.height; i++) {
        imgData.data[i * 4 + 0] = stretchToByte(raster.bands[2][i], stretch.red.lo, stretch.red.hi)
        imgData.data[i * 4 + 1] = stretchToByte(raster.bands[1][i], stretch.green.lo, stretch.green.hi)
        imgData.data[i * 4 + 2] = stretchToByte(raster.bands[0][i], stretch.blue.lo, stretch.blue.hi)
        imgData.data[i * 4 + 3] = 255
      }
    } else if (mode !== "rgb") {
      const def = INDEX_DEFS[mode]
      for (let i = 0; i < raster.width * raster.height; i++) {
        const sample: BandSample = {
          blue: raster.bands[0][i],
          green: raster.bands[1][i],
          red: raster.bands[2][i],
          rededge: raster.bands[3][i],
          nir: raster.bands[4][i],
          swir: raster.bands[5][i],
        }
        const v = def.compute(sample)
        const [r, g, b] = rampColor(def.ramp, v)
        imgData.data[i * 4 + 0] = r
        imgData.data[i * 4 + 1] = g
        imgData.data[i * 4 + 2] = b
        imgData.data[i * 4 + 3] = 255
      }
    }
    ctx.putImageData(imgData, 0, 0)
  }, [state, mode, stretch])

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (state.status !== "done" || !state.raster || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const px = Math.floor(((e.clientX - rect.left) / rect.width) * state.raster.width)
    const py = Math.floor(((e.clientY - rect.top) / rect.height) * state.raster.height)
    const sample = sampleBands(state.raster, px, py)
    if (sample) setPicked({ px, py, sample })
  }

  const activeDef = mode !== "rgb" ? INDEX_DEFS[mode] : null
  const pickedValue = picked && activeDef ? activeDef.compute(picked.sample) : null

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Sentinel-2 réel, décodé dans le navigateur</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-5">
        Vitrolles, 06/08/2024 — 6 bandes réelles en réflectance de surface (0–1), EPSG:2154, 10 m. Clique un pixel pour voir ses bandes et l'indice calculé en direct.
      </p>

      {state.status === "loading" && <p className="font-mono text-sm text-parchment-dim">Décodage du GeoTIFF (334 × 342 px)…</p>}

      {state.status === "error" && (
        <p className="font-mono text-sm text-oxblood-bright">Échec du chargement ({state.error}). Vérifie que le jeu de données est bien servi sur ce domaine.</p>
      )}

      {state.status === "done" && (
        <div className="grid md:grid-cols-[1fr_280px] gap-6">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors",
                    mode === m ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50",
                  )}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>
            <canvas
              ref={canvasRef}
              onClick={handleClick}
              className="w-full h-auto border border-gilt/15 cursor-crosshair"
              style={{ imageRendering: "pixelated" }}
            />
            <p className="font-mono text-[10px] text-parchment-dim/70 mt-2">
              {picked ? `Pixel (${picked.px}, ${picked.py})` : "Aucun pixel sélectionné"}
            </p>
          </div>

          <div className="border border-gilt/15 bg-gilt/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-3">Bandes au pixel</p>
            {picked ? (
              <table className="w-full font-mono text-[11px] mb-4">
                <tbody>
                  {(Object.keys(BAND_LABEL) as (keyof BandSample)[]).map((k) => (
                    <tr key={k} className="border-b border-gilt/10 last:border-b-0">
                      <td className="py-1.5 text-parchment-dim">{BAND_LABEL[k]}</td>
                      <td className="py-1.5 text-right text-parchment tabular-nums">{picked.sample[k].toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="font-mono text-[11px] text-parchment-dim/70 mb-4">Clique un pixel de la planche pour voir sa réflectance réelle par bande.</p>
            )}

            {activeDef && (
              <>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-2">{activeDef.formulaLabel}</p>
                {picked && pickedValue !== null ? (
                  <>
                    <p className="font-mono text-[11px] text-parchment-dim mb-1">
                      {activeDef.formulaTemplate(picked.sample[activeDef.bands[0]], picked.sample[activeDef.bands[1]])}
                    </p>
                    <p className="font-mono text-xl text-gilt-bright tabular-nums">= {pickedValue.toFixed(3)}</p>
                  </>
                ) : (
                  <p className="font-mono text-[11px] text-parchment-dim/70">Clique un pixel pour calculer sa valeur réelle.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
