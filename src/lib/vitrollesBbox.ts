/**
 * Emprise exacte du jeu de données canonique (emprise.geojson, séance 1-9 de
 * l'Atelier) — bornes partagées par toutes les planches vivantes centrées sur
 * cette même zone (comptage OSM, carte OSM, choroplèthe de grille), pour
 * comparer la même zone d'un composant à l'autre.
 */
export const VITROLLES_BBOX = { s: 43.42921, w: 5.21384, n: 43.46083, e: 5.25627 }

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
