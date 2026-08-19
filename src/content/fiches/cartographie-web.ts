import type { ContentBlock } from "../types"

export const cartographieWebFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "Tuiles par niveau de zoom",
    formula: "N = 4^z",
    note: "z=0 → 1 tuile, z=18 → environ 68,7 milliards de tuiles (dont seule une poignée est chargée à la fois).",
  },
  {
    type: "comparison",
    items: [
      { label: "Tuiles raster", points: ["Images déjà dessinées", "Style figé", "OSM classique, WMTS"] },
      { label: "Tuiles vectorielles", points: ["Géométrie brute (.pbf)", "Style modifiable en direct", "Nécessite WebGL (MapLibre GL)"] },
    ],
  },
  {
    type: "table",
    headers: ["Standard OGC", "Fournit"],
    rows: [
      ["WMS", "Une image à la demande"],
      ["WMTS", "Les mêmes images, pré-découpées en tuiles"],
      ["WFS", "La géométrie/attributs bruts, pas une image"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas oublier",
    text: "Attribution obligatoire des fonds de carte (OSM = licence ODbL), reprojection avant tout calcul, simplification/découpage au-delà d'un certain volume de données.",
  },
]
