import type { QuizQuestion } from "./types"

export const teledetectionQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi la végétation en bonne santé apparaît-elle très réfléchissante en proche infrarouge (NIR) ?",
    choices: [
      "La chlorophylle absorbe fortement le NIR",
      "La structure interne des feuilles réfléchit fortement le NIR",
      "L'eau des feuilles amplifie le signal NIR",
      "C'est un artefact des capteurs, pas un phénomène physique",
    ],
    correctIndex: 1,
    explanation: "La chlorophylle absorbe le rouge (photosynthèse) mais la structure interne des feuilles réfléchit fortement le proche infrarouge. Ce contraste est la base du NDVI.",
  },
  {
    question: "Un capteur radar (SAR) a un avantage majeur sur un capteur optique :",
    choices: [
      "Une meilleure résolution spectrale",
      "Il fonctionne de nuit et à travers les nuages",
      "Il coûte toujours moins cher",
      "Il ne nécessite aucun satellite",
    ],
    correctIndex: 1,
    explanation: "Le SAR est un capteur actif : il émet sa propre onde radar, ce qui le rend indépendant de l'éclairage solaire et capable de traverser la couverture nuageuse.",
  },
  {
    question: "Laquelle de ces résolutions décrit la taille au sol représentée par un pixel ?",
    choices: ["Résolution spectrale", "Résolution temporelle", "Résolution spatiale", "Résolution radiométrique"],
    correctIndex: 2,
    explanation: "La résolution spatiale est la taille au sol d'un pixel (10 m pour Sentinel-2 en visible/NIR). La spectrale concerne les bandes, la temporelle la fréquence de revisite, la radiométrique le nombre de niveaux d'intensité.",
  },
  {
    question: "Pourquoi aucun satellite ne maximise-t-il les quatre résolutions à la fois ?",
    choices: [
      "C'est un compromis physique et budgétaire",
      "La réglementation internationale l'interdit",
      "Les capteurs actuels n'y sont pas encore parvenus mais y arriveront bientôt",
      "Ce n'est pas vrai, Sentinel-2 les maximise toutes",
    ],
    correctIndex: 0,
    explanation: "Un capteur très haute résolution spatiale a une fauchée étroite et une revisite plus rare ; un capteur à revisite quotidienne a une résolution spatiale grossière. Le choix dépend de l'échelle du phénomène étudié.",
  },
  {
    question: "Sentinel-2 est souvent la référence pour ce cours parce qu'elle est :",
    choices: [
      "Payante mais très précise",
      "Gratuite, avec une résolution suffisante et les bandes nécessaires au NDVI/NDMI/NDBI",
      "La seule mission équipée d'un capteur radar",
      "Réservée aux usages militaires",
    ],
    correctIndex: 1,
    explanation: "Sentinel-2 (ESA/Copernicus) est gratuite, avec une résolution spatiale adaptée au travail à l'échelle d'une parcelle et les bandes rouge/NIR/SWIR nécessaires aux indices spectraux du cours.",
  },
]
