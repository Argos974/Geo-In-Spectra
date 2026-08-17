import type { QuizQuestion } from "./types"

export const indicesSpectrauxQuiz: QuizQuestion[] = [
  {
    question: "Un pixel avec NDVI = 0.65 correspond le plus probablement à :",
    choices: ["De l'eau", "Un sol nu ou une zone bâtie", "Une végétation dense et vigoureuse", "Une végétation clairsemée ou stressée"],
    correctIndex: 2,
    explanation: "0.4 à 0.8 correspond à une végétation dense et vigoureuse. En dessous de 0, c'est de l'eau ; entre 0 et 0.2, un sol nu ou du bâti.",
  },
  {
    question: "Le NDMI utilise quelles bandes ?",
    choices: ["Rouge et NIR", "NIR et SWIR", "Vert et NIR", "Rouge et SWIR"],
    correctIndex: 1,
    explanation: "NDMI = (NIR − SWIR) / (NIR + SWIR). L'eau des tissus végétaux absorbe le SWIR, d'où la sensibilité à l'humidité.",
  },
  {
    question: "Que signifie la saturation du NDVI ?",
    choices: [
      "L'indice devient négatif au-delà d'un certain seuil",
      "Au-delà d'une certaine densité de canopée, l'indice n'augmente plus alors que la biomasse continue de croître",
      "L'image devient surexposée",
      "Le capteur cesse de fonctionner",
    ],
    correctIndex: 1,
    explanation: "Sur une forêt dense ou une culture en pleine croissance, le NDVI plafonne. Des indices dérivés comme le SAVI ou l'EVI corrigent partiellement cet effet.",
  },
  {
    question: "Le NDBI est utile pour distinguer une zone bâtie d'un sol nu parce que :",
    choices: [
      "Les deux ont un NDVI élevé mais un NDBI différent",
      "Les deux ont un NDVI faible mais un NDBI différent",
      "Le NDBI ne fonctionne que sur l'eau",
      "Il n'y a aucune différence possible entre les deux",
    ],
    correctIndex: 1,
    explanation: "Sol nu et zone bâtie ont tous deux un NDVI faible (peu de végétation), mais le NDBI les différencie car les surfaces bâties réfléchissent davantage le SWIR que le NIR.",
  },
  {
    question: "Quelle limite s'applique à TOUS les indices spectraux, pas seulement au NDVI ?",
    choices: [
      "Ils ne fonctionnent qu'en hiver",
      "Les effets atmosphériques et le mélange spectral à basse résolution",
      "Ils nécessitent obligatoirement un capteur radar",
      "Ils ne peuvent être calculés que sur QGIS",
    ],
    correctIndex: 1,
    explanation: "Nuages/brume/aérosols faussent la réflectance mesurée, et un pixel à résolution grossière peut mélanger plusieurs types de couverture : deux limites générales à tout indice spectral.",
  },
  {
    question: "Un indice composé se distingue d'un indice simple parce qu'il :",
    choices: [
      "Utilise toujours trois bandes brutes minimum",
      "Combine plusieurs indices déjà calculés entre eux, plutôt que directement des bandes brutes",
      "Ne peut être calculé que par une IA",
      "N'existe qu'en télédétection radar",
    ],
    correctIndex: 1,
    explanation: "Un indice composé repart d'indices déjà calculés (ex. NDMI + pente + vent) plutôt que des bandes brutes du capteur, pour produire un indicateur qu'aucun indice seul ne capture.",
  },
  {
    question: "Le SAVI corrige un défaut précis du NDVI, lequel ?",
    choices: [
      "Sa sensibilité à la réflectance du sol nu visible à travers un couvert clairsemé",
      "Son incapacité totale à détecter la végétation",
      "Son usage exclusif sur des images radar",
      "Sa dépendance à la bande thermique",
    ],
    correctIndex: 0,
    explanation: "Le SAVI (Huete, 1988) ajoute une constante L à la formule du NDVI pour atténuer l'influence de la réflectance du sol nu quand la végétation est clairsemée.",
  },
  {
    question: "Pourquoi le NDRE (red-edge) est-il particulièrement utile en agriculture de précision ?",
    choices: [
      "Il ne peut être calculé qu'à partir d'images radar",
      "Il reste sensible à la chlorophylle et sature plus tard que le NDVI, détectant un stress nutritionnel avant qu'il soit visible sur le NDVI",
      "Il remplace entièrement le NDVI dans tous les cas",
      "Il ne fonctionne que sur Landsat",
    ],
    correctIndex: 1,
    explanation: "Le NDRE exploite les bandes red-edge (uniques à des capteurs comme Sentinel-2, absentes de Landsat) : sensible à la teneur en chlorophylle, il sature beaucoup plus tard que le NDVI en forte biomasse.",
  },
]
