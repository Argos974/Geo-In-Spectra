export interface DemoSite {
  id: string
  label: string
  bbox: { s: number; w: number; n: number; e: number }
  bandsUrl: string
  gridUrl: string
  sceneId: string
  date: string
  cloudCover: string
  description: string
}

/**
 * Les deux terrains réels sur lesquels les planches vivantes (RasterExplorer,
 * GridChoropleth, OsmBufferVitrolles, SentinelSwipe) peuvent être basculées —
 * un périurbain méditerranéen et un cœur de métropole dense, pour que l'élève
 * voie les mêmes indices réagir différemment ailleurs qu'à Vitrolles. Chaque
 * bbox correspond exactement à l'emprise du jeu de données précalculé
 * (bandsUrl/gridUrl) pour ce terrain — les deux jeux de données sont extraits
 * de vraies scènes Sentinel-2 (voir DatasetPage), pas de valeurs inventées.
 */
export const DEMO_SITES: DemoSite[] = [
  {
    id: "vitrolles",
    label: "Vitrolles (13)",
    bbox: { s: 43.42921, w: 5.21384, n: 43.46083, e: 5.25627 },
    bandsUrl: "/data/sample-vitrolles-2024/sentinel2_2024-08-06_vitrolles_bands.tif",
    gridUrl: "/data/sample-vitrolles-2024/grille_100m_indices.geojson",
    sceneId: "S2B_31TFJ_20240806_0_L2A",
    date: "6 août 2024",
    cloudCover: "0,008 %",
    description: "périurbain méditerranéen : bâti dense, aéroport, garrigue, étang de Berre",
  },
  {
    id: "paris",
    label: "Paris centre",
    bbox: { s: 48.845, w: 2.285, n: 48.875, e: 2.335 },
    bandsUrl: "/data/sample-paris-2026/sentinel2_2026-08-12_paris_bands.tif",
    gridUrl: "/data/sample-paris-2026/grille_100m_indices.geojson",
    sceneId: "S2B_31UDQ_20260812_0_L2A",
    date: "12 août 2026",
    cloudCover: "0,002 %",
    description: "cœur de métropole dense : tissu haussmannien, Seine, grands parcs",
  },
]

export const DEFAULT_SITE_ID = "vitrolles"

export function getSite(id: string): DemoSite {
  return DEMO_SITES.find((s) => s.id === id) ?? DEMO_SITES[0]
}
