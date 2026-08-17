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
    text: "Toujours séparer les résultats bruts de leur discussion/interprétation — deux sections distinctes, jamais mélangées.",
  },
]
