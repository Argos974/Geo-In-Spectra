import type { ContentBlock } from "../types"

export const lidarFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "Distance par temps de vol",
    formula: "d = (c × t) / 2",
    note: "c = vitesse de la lumière, t = temps aller-retour mesuré.",
  },
  {
    type: "table",
    headers: ["Retour", "Usage"],
    rows: [
      ["Premier retour", "MNS"],
      ["Derniers retours", "MNT (après filtrage)"],
      ["Intermédiaires", "Structure verticale végétation"],
    ],
  },
  {
    type: "list",
    items: [
      "Densité annoncée = nuage brut, pas la densité de points sol classés (toujours plus faible)",
      "LiDAR bathymétrique : longueur d'onde verte, pénètre l'eau claire",
      "Actif (laser) vs radar (micro-ondes) vs photogrammétrie (passif) : trois principes différents",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Sous canopée très dense",
    text: "Densité de points sol réelle peut rester insuffisante même avec une densité globale élevée annoncée.",
  },
]
