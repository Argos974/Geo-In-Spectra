import proj4 from "proj4"

/**
 * WGS84 → UTM 31N (EPSG:32631), via proj4 (implémentation PROJ standard,
 * plutôt qu'une réimplémentation maison de la transverse de Mercator
 * ellipsoïdale — moins de code à faire confiance pour un calcul géodésique).
 * Nécessaire pour SentinelSwipe : les COG Sentinel-2 (sentinel-cogs, AWS)
 * sont en UTM, il faut convertir l'emprise de Vitrolles pour calculer la
 * fenêtre de pixels à lire (readRasters window) sans télécharger la scène
 * entière (~110×110 km, décodée par fenêtrage HTTP Range).
 */
const UTM31N = "+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs"

export function toUtm31(lon: number, lat: number): { x: number; y: number } {
  const [x, y] = proj4("EPSG:4326", UTM31N, [lon, lat])
  return { x, y }
}

/** Emprise [minX, minY, maxX, maxY] en UTM 31N à partir d'une bbox lon/lat (4 coins projetés, pas juste 2 — une bbox lon/lat n'est pas un rectangle en UTM). */
export function bboxToUtm31(bbox: { w: number; s: number; e: number; n: number }): [number, number, number, number] {
  const corners = [
    toUtm31(bbox.w, bbox.s),
    toUtm31(bbox.e, bbox.s),
    toUtm31(bbox.e, bbox.n),
    toUtm31(bbox.w, bbox.n),
  ]
  const xs = corners.map((c) => c.x)
  const ys = corners.map((c) => c.y)
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
}
