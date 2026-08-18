import type { QuizQuestion } from "./types"

export const traitementsIaQuiz: QuizQuestion[] = [
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
  {
    question: "Le coefficient kappa, contrairement à la précision globale d'une matrice de confusion, corrige :",
    choices: [
      "Les erreurs de géoréférencement de l'image",
      "L'accord qui surviendrait même par une classification aléatoire biaisée par la fréquence des classes",
      "La résolution spatiale du capteur",
      "Le nombre de bandes utilisées",
    ],
    correctIndex: 1,
    explanation: "κ = (Po − Pe) / (1 − Pe) : Pe est la précision attendue par pur hasard. Le kappa évite qu'une classification qui prédit toujours la classe majoritaire paraisse artificiellement bonne.",
  },
  {
    question: "Une fuite de données (data leakage) en classification survient quand :",
    choices: [
      "Le jeu de test contient des pixels trop proches ou identiques à ceux du jeu d'entraînement",
      "Le modèle est entraîné sur trop peu de données",
      "L'image contient des pixels nuageux",
      "Le CRS de la couche est mal renseigné",
    ],
    correctIndex: 0,
    explanation: "Si le jeu de test provient de la même parcelle que l'entraînement, la précision mesurée est artificiellement gonflée : le modèle a retrouvé un voisin quasi identique plutôt que d'avoir généralisé.",
  },
  {
    question: "L'architecture U-Net est spécifiquement conçue pour :",
    choices: [
      "Classer une image entière avec une seule étiquette",
      "Segmenter une image pixel par pixel (ex. délimiter chaque bâtiment)",
      "Calculer un NDVI plus rapidement",
      "Remplacer entièrement la classification non supervisée",
    ],
    correctIndex: 1,
    explanation: "U-Net (Ronneberger et al., 2015) combine un chemin de réduction puis de restauration de la résolution spatiale pour produire une carte de sortie à la même résolution que l'image d'entrée, une étiquette par pixel.",
  },
  {
    question: "Pourquoi le kappa n'est-il pas la bonne métrique pour évaluer une segmentation (ex. sortie d'un U-Net) ?",
    choices: [
      "Le kappa évalue un accord pixel par pixel, indépendamment de la géométrie ; l'IoU (recouvrement prédiction/vérité terrain) est la métrique adaptée à la forme d'un objet",
      "Le kappa ne peut être calculé que sur des images radar",
      "Il n'y a en réalité aucune différence entre les deux métriques",
      "Le kappa est toujours égal à 1 pour une segmentation",
    ],
    correctIndex: 0,
    explanation: "L'IoU (Intersection over Union) mesure directement le recouvrement entre la forme prédite et la forme réelle d'un objet, la métrique standard des benchmarks de segmentation, contrairement au kappa qui ignore la géométrie.",
  },
  {
    question: "Les architectures Transformer (Vision Transformer) utilisées aujourd'hui sur l'imagerie satellite proviennent à l'origine :",
    choices: [
      "D'un mécanisme d'attention conçu pour le traitement automatique du langage",
      "D'une amélioration directe des filtres à noyau classiques",
      "De la classification non supervisée",
      "D'un capteur radar spécifique",
    ],
    correctIndex: 0,
    explanation: "Le mécanisme d'attention (Vaswani et al., 2017) a d'abord été conçu pour le langage, puis adapté à l'image (Vision Transformer, Dosovitskiy et al., 2021) et spécifiquement à l'imagerie satellite multi-bandes.",
  },
  {
    question: "Un modèle atteint 99 % de précision sur l'entraînement et 61 % sur le jeu de test. Quel est le diagnostic le plus probable ?",
    choices: [
      "Sous-apprentissage : le modèle est trop simple",
      "Sur-apprentissage : le modèle mémorise l'entraînement au lieu de généraliser",
      "Le jeu de test est mal étiqueté, le modèle est en réalité excellent",
      "C'est un résultat normal, aucun problème à corriger",
    ],
    correctIndex: 1,
    explanation: "Un écart aussi marqué entre précision d'entraînement et de test est la signature du sur-apprentissage (overfitting) : avant même de réduire la complexité du modèle, il faut d'abord vérifier l'absence de fuite de données entre les deux jeux.",
  },
]
