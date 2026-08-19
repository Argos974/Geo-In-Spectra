import { fromUrl, type GeoTIFFImage } from "geotiff"

/**
 * Moteur raster partagé par les planches vivantes qui lisent un vrai GeoTIFF
 * dans le navigateur (RasterExplorer, SentinelSwipe) — ordre de bandes et
 * formules vérifiés numériquement contre sentinel2_2024-08-06_vitrolles_indices.tif
 * (indices déjà précalculés du jeu de données canonique) : NDVI calculé ici à
 * partir des 6 bandes brutes reproduit la bande NDVI précalculée à moins de
 * 1e-6 près sur un échantillon testé. Réflectance déjà en 0–1 dans les deux
 * fichiers (offset BOA déjà appliqué), aucune mise à l'échelle nécessaire.
 */
export const BAND_INDEX = { blue: 0, green: 1, red: 2, rededge: 3, nir: 4, swir: 5 } as const

export interface BandSample {
  blue: number
  green: number
  red: number
  rededge: number
  nir: number
  swir: number
}

export type IndexKey = "ndvi" | "ndmi" | "ndbi" | "ndre" | "ndwi"

interface IndexDef {
  label: string
  formulaLabel: string
  /** Formule avec espaces réservés {a}/{b} remplacés par les valeurs réelles du pixel cliqué. */
  formulaTemplate: (a: number, b: number) => string
  bands: [keyof BandSample, keyof BandSample]
  compute: (s: BandSample) => number
  /** Rampe diverging à 3 arrêts (bas → 0 → haut), cohérente avec le sens physique de l'indice. */
  ramp: [[number, number, number], [number, number, number], [number, number, number]]
}

const RAMP_VEGETATION: IndexDef["ramp"] = [
  [122, 47, 36],
  [236, 227, 207],
  [46, 125, 50],
]
const RAMP_MOISTURE: IndexDef["ramp"] = [
  [138, 106, 47],
  [236, 227, 207],
  [63, 110, 165],
]
const RAMP_BUILTUP: IndexDef["ramp"] = [
  [46, 125, 50],
  [236, 227, 207],
  [122, 47, 36],
]

export const INDEX_DEFS: Record<IndexKey, IndexDef> = {
  ndvi: {
    label: "NDVI",
    formulaLabel: "NDVI = (NIR − Rouge) / (NIR + Rouge)",
    formulaTemplate: (nir, red) => `(${nir.toFixed(3)} − ${red.toFixed(3)}) / (${nir.toFixed(3)} + ${red.toFixed(3)})`,
    bands: ["nir", "red"],
    compute: (s) => (s.nir - s.red) / (s.nir + s.red),
    ramp: RAMP_VEGETATION,
  },
  ndmi: {
    label: "NDMI",
    formulaLabel: "NDMI = (NIR − SWIR) / (NIR + SWIR)",
    formulaTemplate: (nir, swir) => `(${nir.toFixed(3)} − ${swir.toFixed(3)}) / (${nir.toFixed(3)} + ${swir.toFixed(3)})`,
    bands: ["nir", "swir"],
    compute: (s) => (s.nir - s.swir) / (s.nir + s.swir),
    ramp: RAMP_MOISTURE,
  },
  ndbi: {
    label: "NDBI",
    formulaLabel: "NDBI = (SWIR − NIR) / (SWIR + NIR)",
    formulaTemplate: (swir, nir) => `(${swir.toFixed(3)} − ${nir.toFixed(3)}) / (${swir.toFixed(3)} + ${nir.toFixed(3)})`,
    bands: ["swir", "nir"],
    compute: (s) => (s.swir - s.nir) / (s.swir + s.nir),
    ramp: RAMP_BUILTUP,
  },
  ndre: {
    label: "NDRE",
    formulaLabel: "NDRE = (NIR − RedEdge) / (NIR + RedEdge)",
    formulaTemplate: (nir, re) => `(${nir.toFixed(3)} − ${re.toFixed(3)}) / (${nir.toFixed(3)} + ${re.toFixed(3)})`,
    bands: ["nir", "rededge"],
    compute: (s) => (s.nir - s.rededge) / (s.nir + s.rededge),
    ramp: RAMP_VEGETATION,
  },
  ndwi: {
    label: "NDWI",
    formulaLabel: "NDWI = (Vert − NIR) / (Vert + NIR)",
    formulaTemplate: (green, nir) => `(${green.toFixed(3)} − ${nir.toFixed(3)}) / (${green.toFixed(3)} + ${nir.toFixed(3)})`,
    bands: ["green", "nir"],
    compute: (s) => (s.green - s.nir) / (s.green + s.nir),
    ramp: RAMP_MOISTURE,
  },
}

export function rampColor(ramp: IndexDef["ramp"], value: number): [number, number, number] {
  const t = Math.max(-1, Math.min(1, value))
  const [lo, mid, hi] = ramp
  const stop = t < 0 ? [lo, mid] : [mid, hi]
  const local = t < 0 ? t + 1 : t
  const [c0, c1] = stop
  return [
    Math.round(c0[0] + (c1[0] - c0[0]) * local),
    Math.round(c0[1] + (c1[1] - c0[1]) * local),
    Math.round(c0[2] + (c1[2] - c0[2]) * local),
  ]
}

export interface LoadedRaster {
  image: GeoTIFFImage
  width: number
  height: number
  /** [minX, minY, maxX, maxY] dans le CRS natif du fichier (EPSG:2154, mètres). */
  bbox: [number, number, number, number]
  bands: Float32Array[]
}

/** Charge un GeoTIFF multi-bandes en entier (petites scènes, ex. 334×342 px du jeu de données canonique — pas de fenêtrage nécessaire). */
export async function loadFullRaster(url: string): Promise<LoadedRaster> {
  const tiff = await fromUrl(url)
  const image = await tiff.getImage()
  const width = image.getWidth()
  const height = image.getHeight()
  const bbox = image.getBoundingBox() as [number, number, number, number]
  const data = await image.readRasters()
  const bands = Array.from({ length: (data as unknown as Float32Array[]).length }, (_, i) => (data as unknown as Float32Array[])[i])
  return { image, width, height, bbox, bands }
}

export function sampleBands(raster: LoadedRaster, px: number, py: number): BandSample | null {
  if (px < 0 || py < 0 || px >= raster.width || py >= raster.height) return null
  const i = py * raster.width + px
  const b = raster.bands
  return { blue: b[0][i], green: b[1][i], red: b[2][i], rededge: b[3][i], nir: b[4][i], swir: b[5][i] }
}

/** Étirement 2–98 % (par bande) pour un rendu RVB lisible — une scène Sentinel-2 en réflectance brute paraît presque noire sans lui. */
export function computeStretch(band: Float32Array): { lo: number; hi: number } {
  const sorted = Float32Array.from(band).sort()
  const lo = sorted[Math.floor(sorted.length * 0.02)]
  const hi = sorted[Math.floor(sorted.length * 0.98)]
  return { lo, hi: Math.max(hi, lo + 1e-6) }
}

export function stretchToByte(v: number, lo: number, hi: number): number {
  return Math.max(0, Math.min(255, Math.round(((v - lo) / (hi - lo)) * 255)))
}

export interface WindowedBand {
  data: Float32Array
  width: number
  height: number
}

/**
 * Lit une seule bande d'un GeoTIFF distant (COG) sur une fenêtre de pixels
 * précise, sans jamais télécharger le fichier entier — geotiff.js émet des
 * requêtes HTTP Range vers uniquement les tuiles internes couvrant la
 * fenêtre. Utilisé par SentinelSwipe pour lire les bandes B04/B08 d'une
 * scène Sentinel-2 (sentinel-cogs, AWS, ~110×110 km) réduites à l'emprise de
 * Vitrolles (~3×3 km). Valeurs déjà en réflectance 0–1 (offset BOA déjà
 * appliqué par le producteur, comme le jeu de données canonique local).
 */
export async function loadWindowedBand(url: string, utmBbox: [number, number, number, number]): Promise<WindowedBand> {
  const tiff = await fromUrl(url)
  const image = await tiff.getImage()
  const [imgMinX, imgMinY, imgMaxX, imgMaxY] = image.getBoundingBox() as [number, number, number, number]
  const width = image.getWidth()
  const height = image.getHeight()
  const resX = (imgMaxX - imgMinX) / width
  const resY = (imgMaxY - imgMinY) / height
  const [minX, minY, maxX, maxY] = utmBbox

  let left = Math.floor((minX - imgMinX) / resX)
  let right = Math.ceil((maxX - imgMinX) / resX)
  let top = Math.floor((imgMaxY - maxY) / resY)
  let bottom = Math.ceil((imgMaxY - minY) / resY)
  left = Math.max(0, Math.min(width - 1, left))
  top = Math.max(0, Math.min(height - 1, top))
  right = Math.max(left + 1, Math.min(width, right))
  bottom = Math.max(top + 1, Math.min(height, bottom))

  const raster = await image.readRasters({ window: [left, top, right, bottom] })
  const raw = (raster as unknown as (Uint16Array | Float32Array)[])[0]
  const data = new Float32Array(raw.length)
  for (let i = 0; i < raw.length; i++) data[i] = raw[i] / 10000
  return { data, width: right - left, height: bottom - top }
}
