import type { QuizQuestion } from "./types"

export const traitementsIaQuiz: QuizQuestion[] = [
  {
    question: "Un indice composé se distingue d'un indice simple parce qu'il :",
    choices: [
      "Utilise toujours trois bandes brutes minimum",
      "Combine plusieurs indices déjà calculés entre eux",
      "Ne peut être calculé que par une IA",
      "N'existe qu'en télédétection radar",
    ],
    correctIndex: 1,
    explanation: "Un indice composé repart d'indices déjà calculés (ex. NDMI + pente + vent) plutôt que des bandes brutes du capteur, pour produire un indicateur qu'aucun indice seul ne capture.",
  },
  {
    question: "Un filtre à noyau (kernel) recalcule la valeur d'un pixel à partir de :",
    choices: [
      "Sa seule valeur d'origine",
      "La moyenne de toute l'image",
      "Lui-même et son voisinage, pondérés par une matrice de coefficients",
      "Un pixel choisi au hasard ailleurs dans l'image",
    ],
    correctIndex: 2,
    explanation: "Contrairement à un indice pixel par pixel, un filtre de convolution utilise le voisinage immédiat du pixel, pondéré par le noyau (souvent 3×3).",
  },
  {
    question: "Quelle est la différence essentielle entre classification supervisée et non supervisée ?",
    choices: [
      "La supervisée est toujours plus rapide à calculer",
      "La supervisée part d'exemples étiquetés, la non supervisée regroupe sans exemple préalable",
      "La non supervisée ne fonctionne que sur des images radar",
      "Il n'y a aucune différence, ce sont deux noms pour le même algorithme",
    ],
    correctIndex: 1,
    explanation: "La classification supervisée apprend depuis des zones dont la classe réelle est déjà connue ; la non supervisée regroupe automatiquement les pixels aux signatures proches, sans exemple fourni au préalable.",
  },
  {
    question: "Dans un CNN (réseau de neurones convolutif), qu'est-ce qui remplace le noyau fixé à la main d'un filtre classique ?",
    choices: [
      "Rien, les CNN n'utilisent pas de convolution",
      "Un noyau appris automatiquement depuis les données d'entraînement",
      "Un opérateur humain qui règle chaque coefficient",
      "Une moyenne calculée une seule fois avant l'entraînement",
    ],
    correctIndex: 1,
    explanation: "Le principe de convolution reste le même que pour un filtre classique, mais les coefficients du noyau sont appris automatiquement à partir de milliers d'exemples plutôt que fixés à la main.",
  },
  {
    question: "Quelle affirmation sur les limites de l'IA en télédétection est correcte ?",
    choices: [
      "Un modèle entraîné se généralise toujours parfaitement à toute nouvelle région",
      "Un réseau profond explique toujours clairement pourquoi il classe un pixel ainsi",
      "Un modèle appris sur une région ou une saison peut mal généraliser ailleurs, et reste souvent difficile à expliquer",
      "L'IA supprime le besoin de vérité terrain",
    ],
    correctIndex: 2,
    explanation: "Le biais du jeu d'entraînement (mauvaise généralisation) et le manque d'explicabilité sont deux limites réelles et documentées, tout comme le besoin permanent de vérité terrain pour entraîner et vérifier un modèle.",
  },
]
