import type { ContentBlock } from "../types"

export const travauxPratiquesFiche: ContentBlock[] = [
  {
    type: "diagram",
    name: "workflow-tp",
    caption: "La marche à suivre pour chaque TP.",
  },
  {
    type: "formula",
    label: "Calculatrice raster QGIS : NDVI",
    formula: "(\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
  },
  {
    type: "list",
    items: [
      "TP 1 : cartographie de base (charger, reprojeter, styliser, mettre en page)",
      "TP 2 : NDVI depuis Sentinel-2 (niveau L2A, calculatrice raster)",
      "TP 3 : buffer + intersection (200 m, zone réglementaire)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Niveau L1C (non corrigé) vs L2A (corrigé des effets atmosphériques) : toujours utiliser L2A pour un calcul d'indice fiable.",
  },
]
