import type { ContentBlock } from "../types"

export const methodologieFiche: ContentBlock[] = [
  {
    type: "list",
    ordered: true,
    items: [
      "Commentaire de document : identification → description organisée → analyse → critique du document",
      "Dissertation : analyse du sujet → problématique → plan en 3 parties → transitions explicites",
      "Rapport technique : contexte → données et méthode → résultats → discussion → recommandations",
    ],
  },
  {
    type: "diagram",
    name: "dissertation-plan",
    caption: "Squelette d'une dissertation.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Décrire n'est pas analyser. \"On observe X\" décrit ; \"X s'explique par Y\" analyse. Un commentaire noté haut fait systématiquement le second.",
  },
  {
    type: "callout",
    tone: "info",
    title: "En rapport technique",
    text: "Toujours séparer les résultats bruts de leur discussion/interprétation : deux sections distinctes, jamais mélangées.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Mémoire de recherche (IMRaD) et p-value",
    text: "Introduction → Méthode → Résultats → Discussion. Une p-value n'est pas la probabilité que l'hypothèse soit vraie : c'est la probabilité d'observer un résultat aussi extrême si l'effet n'existait pas. Toujours préciser ce qu'est \"une observation\" et si les observations sont indépendantes.",
  },
]
