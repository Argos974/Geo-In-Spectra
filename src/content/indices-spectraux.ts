import type { ContentBlock } from "./types"

export const indicesSpectrauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Un indice spectral est une combinaison mathématique simple entre plusieurs bandes d'une image satellite, conçue pour faire ressortir un phénomène précis (végétation, humidité, bâti…) tout en atténuant les effets parasites (éclairage, ombre, type de sol). Le principe commun : opposer une bande où le phénomène réfléchit fortement à une bande où il réfléchit faiblement, puis normaliser le résultat entre -1 et 1.",
  },

  { type: "heading", text: "1. NDVI — Normalized Difference Vegetation Index" },
  {
    type: "formula",
    label: "Formule du NDVI",
    formula: "NDVI = (NIR − Rouge) / (NIR + Rouge)",
    note: "NIR = réflectance proche infrarouge, Rouge = réflectance dans le rouge visible. Résultat toujours compris entre -1 et 1.",
  },
  {
    type: "paragraph",
    text: "C'est l'indice le plus utilisé en télédétection. Il exploite le contraste déjà présenté au module précédent : la végétation en bonne santé réfléchit fortement le proche infrarouge et absorbe le rouge (photosynthèse), ce qui donne un NDVI élevé. Un sol nu, une surface bâtie ou de l'eau donnent un NDVI faible, voire négatif.",
  },
  {
    type: "table",
    headers: ["Valeur NDVI", "Interprétation typique"],
    rows: [
      ["< 0", "Eau, neige, nuages"],
      ["0 – 0.2", "Sol nu, roche, zone bâtie/minérale"],
      ["0.2 – 0.4", "Végétation clairsemée ou stressée"],
      ["0.4 – 0.8", "Végétation dense et vigoureuse"],
    ],
  },
  {
    type: "diagram",
    name: "ndvi-scale",
    caption: "L'échelle du NDVI et ses classes de lecture, de l'eau à la végétation dense.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Limite importante : la saturation",
    text: "Au-delà d'une certaine densité de canopée (forêt dense, culture en pleine croissance), le NDVI sature — il n'augmente plus alors que la biomasse continue de croître. Pour ces cas, on utilise des indices dérivés comme le SAVI (Soil-Adjusted Vegetation Index) ou l'EVI (Enhanced Vegetation Index), qui corrigent partiellement cet effet.",
  },

  { type: "heading", text: "2. NDMI — Normalized Difference Moisture Index" },
  {
    type: "formula",
    label: "Formule du NDMI",
    formula: "NDMI = (NIR − SWIR) / (NIR + SWIR)",
    note: "SWIR = réflectance infrarouge à ondes courtes (~1.6 µm sur Sentinel-2, bande B11).",
  },
  {
    type: "paragraph",
    text: "L'eau contenue dans les tissus végétaux absorbe fortement le SWIR. Une végétation bien hydratée a donc un NDMI élevé ; une végétation en stress hydrique (sécheresse, précurseur de risque incendie) voit son NDMI chuter avant même que le changement soit visible à l'œil nu ou détectable par le NDVI seul. C'est un indicateur précoce très utilisé pour le suivi de sécheresse et l'évaluation de l'inflammabilité de la végétation.",
  },

  { type: "heading", text: "3. NDBI — Normalized Difference Built-up Index" },
  {
    type: "formula",
    label: "Formule du NDBI",
    formula: "NDBI = (SWIR − NIR) / (SWIR + NIR)",
    note: "Symétrique du NDMI — les surfaces bâties réfléchissent davantage le SWIR que le NIR, contrairement à la végétation.",
  },
  {
    type: "paragraph",
    text: "Utilisé pour cartographier l'étalement urbain, détecter les surfaces imperméabilisées, ou — combiné au NDVI — distinguer une zone bâtie d'un sol nu (les deux ont un NDVI faible, mais un NDBI les différencie).",
  },

  { type: "heading", text: "4. Autres indices courants" },
  {
    type: "table",
    headers: ["Indice", "Formule", "Usage"],
    rows: [
      ["NDWI", "(Vert − NIR) / (Vert + NIR)", "Détection de surfaces en eau libre"],
      ["SAVI", "(NIR−Rouge)/(NIR+Rouge+L) × (1+L)", "NDVI corrigé de l'effet du sol nu (L ≈ 0.5)"],
      ["BAI", "1 / ((0.1−Rouge)² + (0.06−NIR)²)", "Détection de zones brûlées (Burned Area Index)"],
    ],
  },

  { type: "heading", text: "5. Limites communes à tous les indices spectraux" },
  {
    type: "list",
    items: [
      "Effets atmosphériques — nuages, brume, aérosols faussent la réflectance mesurée si l'image n'est pas correctement corrigée (niveau L2A pour Sentinel-2)",
      "Résolution spatiale — un pixel de 10 m peut mélanger plusieurs types de couverture (effet de mélange spectral)",
      "Angle de prise de vue et ombres portées — un même objet peut avoir une réflectance différente selon l'heure et la saison de l'acquisition",
      "Saturation — voir NDVI ci-dessus, un phénomène général à haute densité de signal",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple d'application concrète",
    text: "Un projet de cartographie du risque incendie de forêt peut croiser NDMI (stress hydrique de la végétation), NDVI (densité de combustible), pente et exposition au vent pour produire un indice composite de comportement du feu — c'est exactement ce type de croisement multi-indices qui est mis en pratique dans le module Travaux pratiques.",
  },
]
