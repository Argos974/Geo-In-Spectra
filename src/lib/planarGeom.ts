import type { Feature, Geometry, Polygon, MultiPolygon, Position } from "geojson"

/**
 * Aire planaire (shoelace), volontairement PAS turf.area (géodésique, suppose
 * des degrés WGS84) — les jeux de dessin (DrawOperationGame) travaillent en
 * coordonnées d'écran arbitraires (un viewBox SVG), pas en longitude/latitude.
 * turf.intersect/union/difference restent utilisables tels quels (opérations
 * de découpage purement planaires, indifférentes au sens des coordonnées) ;
 * seule la mesure d'aire a besoin de sa propre implémentation ici.
 */
function ringArea(ring: Position[]): number {
  let sum = 0
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i]
    const [x2, y2] = ring[i + 1]
    sum += x1 * y2 - x2 * y1
  }
  return Math.abs(sum) / 2
}

function polygonArea(coords: Position[][]): number {
  if (coords.length === 0) return 0
  const exterior = ringArea(coords[0])
  const holes = coords.slice(1).reduce((n, ring) => n + ringArea(ring), 0)
  return Math.max(0, exterior - holes)
}

export function planarArea(geometry: Geometry | Feature<Geometry> | null | undefined): number {
  if (!geometry) return 0
  const g = "type" in geometry && geometry.type === "Feature" ? geometry.geometry : (geometry as Geometry)
  if (!g) return 0
  if (g.type === "Polygon") return polygonArea((g as Polygon).coordinates)
  if (g.type === "MultiPolygon") return (g as MultiPolygon).coordinates.reduce((n, poly) => n + polygonArea(poly), 0)
  return 0
}
