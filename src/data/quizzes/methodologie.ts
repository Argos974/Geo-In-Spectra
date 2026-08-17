import type { QuizQuestion } from "./types"

export const methodologieQuiz: QuizQuestion[] = [
  {
    question: "Quelle est la différence entre décrire et analyser un document géographique ?",
    choices: [
      "Il n'y a aucune différence, ce sont des synonymes",
      "Décrire énumère ce qui est visible ; analyser explique pourquoi, en le mettant en relation avec d'autres éléments",
      "Analyser signifie uniquement citer des chiffres",
      "Décrire est réservé à l'oral, analyser à l'écrit",
    ],
    correctIndex: 1,
    explanation: "\"On observe une zone urbanisée\" décrit. \"Cette urbanisation s'explique par la proximité de l'axe routier\" analyse. C'est ce second niveau qui est évalué comme une vraie compétence.",
  },
  {
    question: "Une bonne problématique de dissertation doit surtout :",
    choices: [
      "Reformuler le sujet à l'identique",
      "Mettre en tension deux idées, sans réponse évidente a priori",
      "Être posée sous forme affirmative, jamais interrogative",
      "Annoncer directement la conclusion",
    ],
    correctIndex: 1,
    explanation: "Une problématique reformulée à l'identique du sujet ne permet pas de construire un plan démonstratif : il faut une tension réelle entre deux idées à trancher.",
  },
  {
    question: "Dans un rapport technique SIG, pourquoi séparer strictement résultats et discussion ?",
    choices: [
      "Ce n'est pas nécessaire, on peut les mélanger",
      "Pour éviter que le lecteur confonde ce qui a été mesuré et ce que l'auteur en pense",
      "Parce que la loi l'exige pour tout document technique",
      "Uniquement pour respecter un nombre de pages minimum",
    ],
    correctIndex: 1,
    explanation: "Séparer nettement les faits mesurés (résultats) de leur interprétation (discussion) est une exigence de rigueur scientifique, pas une convention arbitraire de mise en page.",
  },
  {
    question: "En épreuve de cartographie thématique de concours, une carte est sanctionnée si :",
    choices: [
      "Le fond de carte n'est pas assez esthétique",
      "La sémiologie graphique choisie n'est pas adaptée au type de donnée représenté",
      "Elle utilise une couleur non conventionnelle",
      "Elle est dessinée à la main plutôt qu'avec un logiciel",
    ],
    correctIndex: 1,
    explanation: "Le choix sémiologique (ronds proportionnels pour une donnée absolue, dégradé de couleur pour une donnée relative, par exemple) fait partie de la réponse évaluée, pas seulement de sa présentation.",
  },
]
