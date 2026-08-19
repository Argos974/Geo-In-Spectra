/**
 * Projection équirectangulaire simple (lon/lat → pixel canvas) — l'emprise
 * fait ~3,2 × 3,3 km : à cette échelle, l'erreur d'une projection linéaire
 * plutôt qu'une vraie projection cartographique est invisible à l'œil, et
 * évite une dépendance supplémentaire pour ces planches.
 */
export function makeLocalProjector(bbox: { s: number; w: number; n: number; e: number }, width: number, height: number) {
  const spanLon = bbox.e - bbox.w
  const spanLat = bbox.n - bbox.s
  return (lon: number, lat: number): [number, number] => [
    ((lon - bbox.w) / spanLon) * width,
    ((bbox.n - lat) / spanLat) * height,
  ]
}
