import type { ContentBlock } from "../types"

export const teledetectionFiche: ContentBlock[] = [
  {
    type: "table",
    headers: ["Domaine", "Longueur d'onde", "Usage"],
    rows: [
      ["Visible", "0.4 – 0.7 µm", "Couleur naturelle"],
      ["NIR (proche infrarouge)", "0.7 – 1.3 µm", "Vigueur végétale"],
      ["SWIR", "1.3 – 2.5 µm", "Humidité"],
      ["Thermique", "8 – 14 µm", "Température de surface"],
    ],
  },
  {
    type: "comparison",
    items: [
      { label: "Optique (passif)", points: ["Lumière solaire réfléchie", "Bloqué par les nuages", "Ex. Sentinel-2, Landsat"] },
      { label: "Radar / SAR (actif)", points: ["Émet sa propre onde", "Traverse nuages et nuit", "Ex. Sentinel-1"] },
    ],
  },
  {
    type: "list",
    items: [
      "Résolution spatiale : taille au sol d'un pixel",
      "Résolution spectrale : nombre/finesse des bandes",
      "Résolution temporelle : fréquence de revisite",
      "Résolution radiométrique : niveaux d'intensité codés",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Aucun satellite ne maximise les quatre résolutions à la fois : c'est toujours un compromis physique et budgétaire, jamais un oubli des fabricants.",
  },
]
