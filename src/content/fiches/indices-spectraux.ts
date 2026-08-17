import type { ContentBlock } from "../types"

export const indicesSpectrauxFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "NDVI (végétation)",
    formula: "NDVI = (NIR − Rouge) / (NIR + Rouge)",
  },
  {
    type: "formula",
    label: "NDMI (humidité)",
    formula: "NDMI = (NIR − SWIR) / (NIR + SWIR)",
  },
  {
    type: "formula",
    label: "NDBI (bâti)",
    formula: "NDBI = (SWIR − NIR) / (SWIR + NIR)",
  },
  {
    type: "table",
    headers: ["NDVI", "Interprétation"],
    rows: [
      ["< 0", "Eau, neige, nuages"],
      ["0 – 0.2", "Sol nu, bâti"],
      ["0.2 – 0.4", "Végétation clairsemée"],
      ["0.4 – 0.8", "Végétation dense"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Sol nu et zone bâtie ont tous deux un NDVI faible : c'est le NDBI, pas le NDVI, qui permet de les distinguer.",
  },
  {
    type: "formula",
    label: "SAVI, EVI, NDRE",
    formula: "SAVI = (NIR−Rouge)/(NIR+Rouge+L)×(1+L)  ·  EVI = 2.5×(NIR−Rouge)/(NIR+6·Rouge−7.5·Bleu+1)  ·  NDRE = (NIR−RedEdge)/(NIR+RedEdge)",
    note: "SAVI corrige l'effet du sol nu, EVI corrige la saturation en forte biomasse, NDRE (bandes red-edge, Sentinel-2 uniquement) sature plus tard que le NDVI.",
  },
]
