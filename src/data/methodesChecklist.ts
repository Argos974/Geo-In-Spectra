/**
 * Auto-évaluation avant de rendre un travail — contenu propre à Méthodes,
 * pas une reprise d'un bloc existant. Volontairement court (5 items) : une
 * checklist qu'on relit vraiment en 30 secondes avant de rendre, pas un
 * questionnaire long qu'on abandonne.
 */
export interface ChecklistItem {
  label: string
  detail: string
}

export const methodesChecklist: ChecklistItem[] = [
  {
    label: "J'ai distingué description et analyse",
    detail: "Chaque observation est suivie d'une explication (« pourquoi »), pas seulement d'un constat.",
  },
  {
    label: "J'ai vérifié le système de coordonnées et l'échelle cités",
    detail: "Toute carte, image ou indice mentionné précise sa source, sa date et sa résolution.",
  },
  {
    label: "Mon plan répond réellement à la problématique posée",
    detail: "Si on permute deux parties sans rien perdre à la démonstration, le plan ne démontre rien de progressif.",
  },
  {
    label: "La sémiologie choisie correspond au type de donnée",
    detail: "Quantité/ordre → taille ou valeur ; catégorie sans ordre → couleur ou forme (voir section 4).",
  },
  {
    label: "J'ai cité mes sources et documenté mes incertitudes",
    detail: "Un chiffre sans sa provenance, ou un résultat sans ses limites, perd en crédibilité, pas l'inverse.",
  },
]
