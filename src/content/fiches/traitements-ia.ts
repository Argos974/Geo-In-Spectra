import type { ContentBlock } from "../types"

export const traitementsIaFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "Noyau de lissage (moyenne 3×3)",
    formula: "1/9 × [[1,1,1],[1,1,1],[1,1,1]]",
  },
  {
    type: "formula",
    label: "Noyau passe-haut (contours)",
    formula: "[[0,-1,0],[-1,5,-1],[0,-1,0]]",
  },
  {
    type: "comparison",
    items: [
      { label: "Classification non supervisée", points: ["Regroupe les pixels proches (k-moyennes)", "Aucun exemple étiqueté requis", "Classes nommées après coup"] },
      { label: "Classification supervisée", points: ["Apprend depuis des échantillons étiquetés", "Maximum de vraisemblance, forêts aléatoires", "Évaluée par matrice de confusion"] },
    ],
  },
  {
    type: "list",
    items: [
      "Indice composé : combine plusieurs indices déjà calculés",
      "Indice complexe : combinaison linéaire fixe de bandes (Tasseled Cap, ACP)",
      "CNN : les filtres à noyau sont appris plutôt que fixés à la main",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Un modèle qui généralise mal hors de ses données d'entraînement n'est pas un modèle « intelligent » qui échoue exceptionnellement : c'est le comportement attendu de tout apprentissage statistique hors de son domaine d'entraînement.",
  },
  {
    type: "formula",
    label: "Kappa et IoU : deux métriques, deux usages",
    formula: "κ = (Po − Pe) / (1 − Pe)   ·   IoU = Aire(prédiction ∩ vérité) / Aire(prédiction ∪ vérité)",
    note: "Kappa pour une classification pixel par pixel ; IoU pour une segmentation (forme d'un objet, ex. sortie U-Net), ne pas utiliser le kappa pour évaluer une segmentation.",
  },
]
