import type { ContentBlock } from "../types"

export const statistiquesSpatialesFiche: ContentBlock[] = [
  {
    type: "comparison",
    items: [
      { label: "LISA (Local Moran's I)", points: ["Similarité locale, 4 types (HH/LL/HL/LH)", "Détecte clusters ET anomalies isolées"] },
      { label: "Gi* (Getis-Ord)", points: ["Points chauds/froids spécifiquement", "Score Z directement interprétable"] },
    ],
  },
  {
    type: "formula",
    label: "Structure du risque",
    formula: "Risque = Aléa × Enjeux × Vulnérabilité",
    note: "Trois couches distinctes, à cartographier et pondérer séparément, jamais moyennées naïvement.",
  },
  {
    type: "formula",
    label: "KDE — largeur de bande",
    formula: "f(x) = (1/n·h²) · Σᵢ K((x−xᵢ)/h)",
    note: "h mal choisi = carte trompeuse (trop bruitée ou trop lissée).",
  },
  {
    type: "list",
    items: [
      "Correction pour comparaisons multiples nécessaire sur une carte LISA/Gi* (des milliers de tests simultanés)",
      "Une KDE seule ne teste rien statistiquement — toujours convaincante visuellement, même sur du bruit",
      "Résidus de régression spatialement autocorrélés → intervalles de confiance sous-estimés",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Pièges à vérifier systématiquement",
    text: "Pseudoréplication, MAUP, effet de bord sur les indices locaux, corrélation spatiale confondue avec causalité.",
  },
]
