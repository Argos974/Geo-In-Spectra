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
    note: "SAVI corrige l'effet du sol nu, EVI corrige la saturation en forte biomasse, NDRE (bandes red-edge, Sentinel-2 uniquement) sature plus tard que le NDVI. RedEdge = B5 (705 nm) ou B6 (740 nm) selon les études, toujours préciser laquelle.",
  },
  {
    type: "formula",
    label: "MCARI / TCARI",
    formula: "MCARI = [(R700−R670) − 0.2×(R700−R550)] × (R700/R670)   ·   TCARI = 3 × MCARI-comme-ci-dessus",
    note: "Indices de chlorophylle (Daughtry 2000 / Haboudane 2002), R550/670/700 ≈ Vert/Rouge/RedEdge B5 sur Sentinel-2. TCARI s'utilise presque toujours en ratio TCARI/OSAVI, rarement seul.",
  },
]
