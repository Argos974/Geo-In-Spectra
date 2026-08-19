import type { QuizQuestion } from "./types"

export const traitementsIaQuiz: QuizQuestion[] = [
  {
    question: "Un filtre à noyau (kernel) recalcule la valeur d'un pixel à partir de :",
    choices: [
      "Sa seule valeur d'origine, sans tenir compte des pixels environnants",
      "La moyenne simple, non pondérée, de tous les pixels de l'image entière",
      "Lui-même et son voisinage immédiat, pondérés par les coefficients d'une matrice (le noyau)",
      "Un pixel unique choisi aléatoirement dans une fenêtre glissante centrée sur lui",
    ],
    correctIndex: 2,
    explanation: "Contrairement à un indice pixel par pixel, un filtre de convolution utilise le voisinage immédiat du pixel, pondéré par le noyau (souvent 3×3).",
  },
  {
    question: "Quelle est la différence essentielle entre classification supervisée et non supervisée ?",
    choices: [
      "La supervisée regroupe les pixels par similarité spectrale sans exemple fourni, la non supervisée apprend depuis des zones étiquetées",
      "La classification supervisée part d'exemples déjà étiquetés, la non supervisée regroupe les pixels sans exemple fourni au préalable",
      "Les deux méthodes ont besoin d'exemples étiquetés en entrée, seule la quantité de données requise diffère entre elles",
      "La différence tient uniquement à l'algorithme utilisé, les deux exploitent en réalité les mêmes données d'entraînement étiquetées",
    ],
    correctIndex: 1,
    explanation: "La classification supervisée apprend depuis des zones dont la classe réelle est déjà connue ; la non supervisée regroupe automatiquement les pixels aux signatures proches, sans exemple fourni au préalable.",
  },
  {
    question: "Dans un CNN (réseau de neurones convolutif), qu'est-ce qui remplace le noyau fixé à la main d'un filtre classique ?",
    choices: [
      "Rien : les CNN appliquent les mêmes noyaux fixes que les filtres classiques, sans jamais les modifier",
      "Un noyau dont les coefficients sont appris automatiquement depuis les données d'entraînement, plutôt que fixés à la main",
      "Un opérateur humain qui ajuste chaque coefficient du noyau après chaque cycle d'entraînement",
      "Une moyenne statistique des pixels, calculée une seule fois avant le début de l'entraînement",
    ],
    correctIndex: 1,
    explanation: "Le principe de convolution reste le même que pour un filtre classique, mais les coefficients du noyau sont appris automatiquement à partir de milliers d'exemples plutôt que fixés à la main.",
  },
  {
    question: "Quelle affirmation sur les limites de l'IA en télédétection est correcte ?",
    choices: [
      "Un modèle entraîné sur une région se généralise presque toujours sans perte de précision à toute nouvelle région",
      "Un réseau de neurones profond fournit toujours une explication claire et vérifiable du classement attribué à chaque pixel",
      "Un modèle appris sur une région ou une saison peut mal généraliser ailleurs, et reste souvent difficile à expliquer",
      "Une fois le modèle entraîné, l'IA supprime définitivement le besoin de vérité terrain pour le vérifier",
    ],
    correctIndex: 2,
    explanation: "Le biais du jeu d'entraînement (mauvaise généralisation) et le manque d'explicabilité sont deux limites réelles et documentées, tout comme le besoin permanent de vérité terrain pour entraîner et vérifier un modèle.",
  },
  {
    question: "Le coefficient kappa, contrairement à la précision globale d'une matrice de confusion, corrige :",
    choices: [
      "Les erreurs de géoréférencement entre l'image classée et les données de vérité terrain utilisées pour la valider",
      "L'accord qui surviendrait même par une classification aléatoire biaisée par la fréquence des classes",
      "Le biais introduit par la résolution spatiale du capteur utilisé pour acquérir l'image",
      "Le nombre de bandes spectrales prises en compte lors du calcul de la matrice de confusion",
    ],
    correctIndex: 1,
    explanation: "κ = (Po − Pe) / (1 − Pe) : Pe est la précision attendue par pur hasard. Le kappa évite qu'une classification qui prédit toujours la classe majoritaire paraisse artificiellement bonne.",
  },
  {
    question: "Une fuite de données (data leakage) en classification survient quand :",
    choices: [
      "Le jeu de test contient des pixels trop proches ou identiques à ceux du jeu d'entraînement",
      "Le modèle est entraîné sur un jeu de données trop restreint pour couvrir la diversité des classes",
      "L'image source contient une proportion importante de pixels nuageux non masqués avant le traitement",
      "Le système de projection (CRS) de la couche vectorielle ne correspond pas à celui de l'image raster",
    ],
    correctIndex: 0,
    explanation: "Si le jeu de test provient de la même parcelle que l'entraînement, la précision mesurée est artificiellement gonflée : le modèle a retrouvé un voisin quasi identique plutôt que d'avoir généralisé.",
  },
  {
    question: "L'architecture U-Net est spécifiquement conçue pour :",
    choices: [
      "Attribuer une seule étiquette de classe globale à l'ensemble de l'image, sans distinction spatiale",
      "Segmenter une image pixel par pixel, en délimitant précisément chaque objet comme un bâtiment",
      "Accélérer le calcul d'indices spectraux comme le NDVI grâce à son architecture convolutive",
      "Remplacer entièrement les méthodes de classification non supervisée par un apprentissage end-to-end",
    ],
    correctIndex: 1,
    explanation: "U-Net (Ronneberger et al., 2015) combine un chemin de réduction puis de restauration de la résolution spatiale pour produire une carte de sortie à la même résolution que l'image d'entrée, une étiquette par pixel.",
  },
  {
    question: "Pourquoi le kappa n'est-il pas la bonne métrique pour évaluer une segmentation (ex. sortie d'un U-Net) ?",
    choices: [
      "Le kappa évalue un accord pixel par pixel, indépendamment de la géométrie ; l'IoU (recouvrement prédiction/vérité terrain) est la métrique adaptée à la forme d'un objet",
      "Le kappa ne peut être calculé que sur des images radar, jamais sur de l'imagerie optique multispectrale",
      "Le kappa et l'IoU mesurent en réalité exactement la même chose, seul le nom change selon le domaine",
      "Le kappa atteint toujours une valeur proche de 1 dès lors que la segmentation provient d'un réseau profond",
    ],
    correctIndex: 0,
    explanation: "L'IoU (Intersection over Union) mesure directement le recouvrement entre la forme prédite et la forme réelle d'un objet, la métrique standard des benchmarks de segmentation, contrairement au kappa qui ignore la géométrie.",
  },
  {
    question: "Les architectures Transformer (Vision Transformer) utilisées aujourd'hui sur l'imagerie satellite proviennent à l'origine :",
    choices: [
      "D'un mécanisme d'attention initialement conçu pour le traitement automatique du langage naturel",
      "D'une amélioration directe des filtres à noyau convolutifs utilisés dans les CNN classiques",
      "Des algorithmes de classification non supervisée adaptés pour traiter des séries temporelles d'images",
      "D'un capteur radar à synthèse d'ouverture (SAR) conçu spécifiquement pour l'imagerie satellite",
    ],
    correctIndex: 0,
    explanation: "Le mécanisme d'attention (Vaswani et al., 2017) a d'abord été conçu pour le langage, puis adapté à l'image (Vision Transformer, Dosovitskiy et al., 2021) et spécifiquement à l'imagerie satellite multi-bandes.",
  },
  {
    question: "Un modèle atteint 99 % de précision sur l'entraînement et 61 % sur le jeu de test. Quel est le diagnostic le plus probable ?",
    choices: [
      "Sous-apprentissage : le modèle est trop simple pour capturer la complexité des données d'entraînement",
      "Sur-apprentissage : le modèle mémorise les exemples d'entraînement au lieu d'apprendre à généraliser",
      "Le jeu de test est mal étiqueté, le modèle est en réalité excellent",
      "C'est un résultat attendu à ce stade, aucune correction n'est nécessaire avant le déploiement",
    ],
    correctIndex: 1,
    explanation: "Un écart aussi marqué entre précision d'entraînement et de test est la signature du sur-apprentissage (overfitting) : avant même de réduire la complexité du modèle, il faut d'abord vérifier l'absence de fuite de données entre les deux jeux.",
  },
]
