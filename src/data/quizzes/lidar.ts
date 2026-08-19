import type { QuizQuestion } from "./types"

export const lidarQuiz: QuizQuestion[] = [
  {
    question: "Un capteur LiDAR mesure une distance en se fondant sur :",
    choices: [
      "La réflectance dans le visible et le proche infrarouge, comme un capteur optique passif",
      "Le temps de vol d'une impulsion laser qu'il émet puis reçoit après réflexion sur la cible",
      "La phase d'une onde micro-ondes renvoyée par la cible, comme un radar interférométrique",
      "L'intensité de la lumière solaire ambiante réfléchie par la surface visée",
    ],
    correctIndex: 1,
    explanation: "Le LiDAR est un capteur actif : il émet sa propre impulsion laser et mesure son temps de vol aller-retour pour en déduire une distance.",
  },
  {
    question: "Pourquoi un LiDAR peut-il produire un MNT plus fiable qu'une photogrammétrie sous couvert forestier dense ?",
    choices: [
      "Parce qu'il n'enregistre que le dernier écho de chaque impulsion, qui correspond toujours au sol quel que soit le couvert",
      "Parce qu'une partie du signal laser traverse les interstices de la canopée et atteint le sol, produisant des retours multiples exploitables, contrairement à un capteur passif",
      "Parce que la photogrammétrie et le LiDAR reconstruisent le sol par la même méthode de corrélation d'images, sans différence sous couvert",
      "Parce que le LiDAR calcule une altitude moyenne du couvert forestier sans jamais différencier sol et végétation",
    ],
    correctIndex: 1,
    explanation: "Les retours multiples permettent d'enregistrer des échos venant du sol même sous canopée, contrairement à un capteur optique qui ne voit que la première surface opaque.",
  },
  {
    question: "Le \"premier retour\" d'une impulsion LiDAR correspond typiquement à :",
    choices: [
      "Au sol nu, quel que soit le couvert végétal traversé par l'impulsion",
      "Au sommet de la canopée ou à une toiture, la première surface rencontrée par l'impulsion",
      "Au dernier écho enregistré par le capteur pour cette impulsion",
      "À une mesure d'intensité de réflectance, pas à une position en hauteur",
    ],
    correctIndex: 1,
    explanation: "Le premier retour sert typiquement à construire le MNS ; les derniers retours, plus susceptibles de venir du sol sous couvert clairsemé, servent au MNT après filtrage.",
  },
  {
    question: "La densité de points \"sol\" classés dans un relevé LiDAR, comparée à la densité globale annoncée, est généralement :",
    choices: [
      "Rigoureusement identique à la densité globale, puisque chaque impulsion atteint le sol",
      "Plus faible que la densité globale annoncée, en particulier sous couvert végétal dense",
      "Systématiquement supérieure à la densité globale, le filtrage ajoutant des points interpolés",
      "Indépendante du couvert végétal, uniquement fonction de l'altitude de vol",
    ],
    correctIndex: 1,
    explanation: "La densité globale du nuage brut ne reflète pas directement la densité de points réellement classés sol, généralement inférieure sous végétation dense.",
  },
  {
    question: "Un algorithme de filtrage sol (TIN densification progressive) trop strict a pour effet :",
    choices: [
      "Un MNT plus dense, car davantage de points de végétation basse sont acceptés comme sol",
      "Un MNT lacunaire, car trop peu de points sont acceptés comme \"sol\" légitime",
      "Aucun changement mesurable, le filtrage n'affectant que la classification, pas la géométrie",
      "Une inversion complète des classes sol et végétation dans le nuage de points",
    ],
    correctIndex: 1,
    explanation: "Un paramétrage trop strict rejette à tort des points sol légitimes, produisant un MNT avec des trous ; trop permissif, il intègre à tort de la végétation basse.",
  },
  {
    question: "Le LiDAR bathymétrique utilise une longueur d'onde spécifique pour :",
    choices: [
      "Mesurer directement la température de surface de l'eau plutôt que sa profondeur",
      "Pénétrer l'eau claire sur plusieurs mètres à quelques dizaines de mètres selon la turbidité",
      "Détecter uniquement la position des embarcations en surface, sans mesurer le fond",
      "Remplacer entièrement le LiDAR topographique terrestre classique sur l'ensemble du levé",
    ],
    correctIndex: 1,
    explanation: "Une longueur d'onde verte pénètre l'eau claire, permettant de cartographier simultanément topographie terrestre et bathymétrie côtière — sa portée dépend fortement de la turbidité.",
  },
  {
    question: "Contrairement au LiDAR aéroporté ou terrestre mobile, un LiDAR satellite comme ICESat-2 ou GEDI fournit typiquement :",
    choices: [
      "Une couverture continue en grille sur toute la largeur de la trace au sol, comme un LiDAR aéroporté",
      "Des profils étroits et un échantillonnage épars le long de la trace, sans couverture continue",
      "Une densité de points supérieure à celle d'un LiDAR terrestre mobile sur la même zone",
      "Aucune donnée exploitable sur la structure de la végétation ou la hauteur de canopée",
    ],
    correctIndex: 1,
    explanation: "Le LiDAR satellite fournit des profils étroits (quelques mètres de large), un échantillonnage épars plutôt qu'une grille continue comme le LiDAR aéroporté.",
  },
  {
    question: "Une différence structurelle entre le LiDAR et le radar (InSAR) est que :",
    choices: [
      "Les deux capteurs sont passifs et ne mesurent que le rayonnement solaire réfléchi",
      "Le LiDAR mesure une distance par temps de vol optique, le radar une phase d'onde micro-ondes — deux principes physiques différents",
      "Le radar ne peut mesurer aucun déplacement ou affaissement du sol, contrairement au LiDAR",
      "Le LiDAR traverse la couverture nuageuse aussi bien que le radar, les deux étant insensibles à la météo",
    ],
    correctIndex: 1,
    explanation: "Le LiDAR (optique, temps de vol) et le radar (micro-ondes, phase) sont deux capteurs actifs mais fondés sur des principes physiques distincts, chacun avec ses forces propres.",
  },
  {
    question: "Un nuage de points LiDAR brut porte nativement :",
    choices: [
      "Une couleur RVB mesurée directement par le capteur laser lors de l'acquisition",
      "Une intensité de retour et une position 3D, sans couleur native tant qu'aucune caméra n'est fusionnée",
      "Une classification sol/végétation déjà établie automatiquement au moment de l'acquisition",
      "Une texture haute résolution équivalente à celle d'une orthophoto aérienne",
    ],
    correctIndex: 1,
    explanation: "Le LiDAR pur ne mesure pas de couleur : l'intensité de retour et l'altitude sont ses attributs natifs, une couleur RVB nécessite une fusion avec une caméra embarquée séparée.",
  },
  {
    question: "L'apport majeur du LiDAR aéroporté en archéologie est :",
    choices: [
      "Il ne détecte que des vestiges déjà visibles sur les images optiques classiques",
      "Il révèle des structures masquées sous une canopée forestière dense, invisibles sur toute image optique classique",
      "Il ne fonctionne que sur des sites en zone désertique dépourvue de végétation",
      "Il remplace entièrement le travail de fouille archéologique sur le terrain",
    ],
    correctIndex: 1,
    explanation: "Le LiDAR aéroporté a révélé des structures archéologiques entières sous couvert forestier dense, un usage désormais classique de la technologie.",
  },
]
