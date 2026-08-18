/**
 * Arbre de décision de la page Méthodes : redirige vers le bon groupe
 * (voir GROUPS dans DiscipulusMethodesPage.tsx) à partir de 1 ou 2 questions,
 * plutôt que de laisser le visiteur deviner lequel des 4 chapitres le concerne.
 * `groupTitle` doit correspondre exactement à un `title` de GROUPS.
 */
export interface DecisionLeaf {
  label: string
  groupTitle: string
  hint: string
}

export interface DecisionBranch {
  label: string
  next: DecisionStep
}

export interface DecisionStep {
  question: string
  leaves?: DecisionLeaf[]
  branches?: DecisionBranch[]
}

export const methodesDecisionTree: DecisionStep = {
  question: "Dans quel cadre écris-tu ?",
  leaves: [
    {
      label: "Épreuve de lycée (commentaire de document, bac)",
      groupTitle: "Scolaire",
      hint: "→ Commentaire de carte ou de document géographique",
    },
  ],
  branches: [
    {
      label: "Après le bac",
      next: {
        question: "Quel type de travail dois-tu produire ?",
        leaves: [
          {
            label: "Dissertation, croquis ou préparation concours (CAPES/Agrégation)",
            groupTitle: "Concours",
            hint: "→ Dissertation, croquis de synthèse, préparation aux épreuves de concours",
          },
          {
            label: "Rapport technique SIG ou télédétection (stage, mission)",
            groupTitle: "Professionnel",
            hint: "→ Rapport technique et sémiologie graphique appliquée",
          },
          {
            label: "Mémoire de recherche ou article scientifique",
            groupTitle: "Recherche",
            hint: "→ Structure IMRaD et rigueur statistique",
          },
        ],
      },
    },
  ],
}
