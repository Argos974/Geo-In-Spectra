import type { ContentBlock } from "../types"

export const travauxPratiquesFiche: ContentBlock[] = [
  {
    type: "diagram",
    name: "workflow-tp",
    caption: "La marche à suivre, commune à la plupart des séances.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Séance 1 : cartographie de base (charger, reprojeter, styliser, mettre en page)",
      "Séance 2 : géoréférencement par grille (points de contrôle, transformation affine)",
      "Séance 3 : NDVI sur l'image géoréférencée, moyenne par cellule, ΔNDVI multi-dates",
      "Séance 4 : buffer + intersection (200 m, zone réglementaire)",
      "Séance 5 : programmation (GeoPandas, Shapely, rasterio par lot)",
      "Séance 6 : étude de cas + mini-projet, rapport structuré (voir La Méthode)",
    ],
  },
  {
    type: "formula",
    label: "Calculatrice raster QGIS : NDVI",
    formula: "(\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Niveau L1C (non corrigé) vs L2A (corrigé des effets atmosphériques) : toujours utiliser L2A pour un calcul d'indice fiable. Et : un géoréférencement approximatif « à l'œil » n'est jamais fiable, seuls des points de contrôle à coordonnée réelle certaine le sont.",
  },
]
