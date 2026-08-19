import type { ContentBlock } from "../types"

export const photogrammetrieDronesFiche: ContentBlock[] = [
  {
    type: "list",
    items: [
      "Recouvrement longitudinal 70-80 %, latéral 60-70 % — condition de base avant tout vol",
      "SfM : reconstruit trajectoire caméra + géométrie 3D simultanément, sans calibration préalable",
      "MNS = tout ce qui est visible d'en haut ; MNT = sol nu seul (filtrage requis)",
    ],
  },
  {
    type: "formula",
    label: "Hauteur de canopée",
    formula: "CHM = MNS − MNT",
  },
  {
    type: "comparison",
    items: [
      { label: "Photogrammétrie", points: ["Passif, peu coûteux", "Texture couleur native", "Ne voit pas sous canopée dense"] },
      { label: "LiDAR", points: ["Actif, plus coûteux", "Pénètre partiellement la canopée", "Pas de texture native"] },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "GCP mal répartis",
    text: "Regroupés plutôt qu'étalés sur toute l'emprise → précision dégradée, surtout en altitude.",
  },
]
