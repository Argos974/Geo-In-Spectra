import type { ContentBlock } from "../types"

export const fondamentauxFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "Codes EPSG à retenir",
    formula: "EPSG:4326 = WGS84 (degrés) · EPSG:2154 = Lambert-93 (mètres, France) · EPSG:3857 = Web Mercator",
    note: "Toujours reprojeter en système métrique (Lambert-93) avant un calcul de distance ou de surface.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Vecteur",
        points: ["Points, lignes, polygones", "Porte des attributs", "Formats : .shp, GeoJSON, .gpkg"],
      },
      {
        label: "Raster",
        points: ["Grille de pixels", "Chaque pixel = une valeur", "Formats : .tif (GeoTIFF)"],
      },
    ],
  },
  {
    type: "table",
    headers: ["Type de projection", "Conserve"],
    rows: [
      ["Conforme (Lambert-93)", "Les angles et les formes"],
      ["Équivalente", "Les surfaces"],
      ["Équidistante", "Certaines distances"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Coordonnées géographiques (degrés, WGS84) ≠ coordonnées projetées (mètres, Lambert-93). Un buffer ou un calcul de surface fait en degrés donne un résultat faux, sans message d'erreur.",
  },
  {
    type: "callout",
    tone: "info",
    title: "ITRF vs ETRS89/RGF93",
    text: "ITRF suit en continu la dérive des plaques tectoniques (~2-3 cm/an). ETRS89/RGF93 est \"gelé\" à l'époque 1989 : un point français garde la même coordonnée dans le temps — la transformation entre les deux passe par un modèle à 7 paramètres (Helmert : 3 translations, 3 rotations, 1 échelle).",
  },
]
