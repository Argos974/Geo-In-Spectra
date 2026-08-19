import type { ContentBlock } from "../types"

export const etudesDeCasSectoriellesFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "Détection de changement (NDBI ou NDVI)",
    formula: "Δindice = indice(date récente) − indice(date ancienne)",
    note: "Seuil de changement significatif à calibrer sur vérité terrain, jamais fixé arbitrairement.",
  },
  {
    type: "list",
    items: [
      "Agriculture de précision : NDVI → nettoyage → classes de vigueur → carte de préconisation",
      "Urbanisme : ΔNDBI → surfaces nouvellement artificialisées → suivi communal dans le temps",
      "Risque incendie : aléa (pente/végétation/historique) × enjeux (bâti) × vulnérabilité (matériaux) → AHP pondéré et documenté",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Pas de transfert automatique entre secteurs",
    text: "Un seuil calibré pour un secteur (urbanisme) ne se transpose jamais tel quel à un autre (agriculture) — re-calibrer sur une vérité terrain propre.",
  },
]
