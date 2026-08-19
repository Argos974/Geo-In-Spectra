import type { ContentBlock } from "../types"

export const projectionsAvanceesFiche: ContentBlock[] = [
  {
    type: "comparison",
    items: [
      { label: "Conforme", points: ["Préserve les angles/formes locales", "Déforme les surfaces", "Lambert-93, Mercator, UTM"] },
      { label: "Équivalente", points: ["Préserve les surfaces", "Déforme les angles/formes", "Albers, Mollweide"] },
    ],
  },
  {
    type: "formula",
    label: "Lambert-93 (EPSG:2154)",
    formula: "Parallèles standards 44°N/49°N — méridien central 3°E",
    note: "Référence officielle française depuis 2006, quasi sans déformation sur le territoire métropolitain.",
  },
  {
    type: "formula",
    label: "UTM — facteur d'échelle",
    formula: "k₀ = 0,9996 au méridien central, fuseaux de 6°",
  },
  {
    type: "list",
    items: [
      "Datum ≠ projection : reprojeter sans transformer le datum laisse un décalage résiduel",
      "Ne jamais mesurer une surface directement en EPSG:3857 (Web Mercator)",
      "Toujours reprojeter en système métrique projeté avant tout calcul de distance/surface",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À vérifier avant tout calcul",
    text: "Système de coordonnées du projet, système projeté (pas géographique), même datum sur toutes les couches.",
  },
]
