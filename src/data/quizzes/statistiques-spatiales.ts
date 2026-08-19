import type { QuizQuestion } from "./types"

export const statistiquesSpatialesQuiz: QuizQuestion[] = [
  {
    question: "Quelle est la principale limite de l'indice de Moran global que le LISA corrige ?",
    choices: [
      "Il suppose que les poids spatiaux doivent être binaires (contiguïté simple), ce qui empêche toute pondération par distance",
      "Il résume toute la zone d'étude en une seule valeur globale, sans localiser où la structure spatiale se concentre réellement",
      "Il ne peut être interprété que si les données suivent une distribution normale, contrairement au LISA qui s'en affranchit",
      "Il exige un nombre minimal de 30 entités pour être statistiquement valide, ce que le LISA ne requiert pas",
    ],
    correctIndex: 1,
    explanation: "Le LISA (Local Moran's I) décompose l'indice global en une valeur par entité, révélant où les regroupements se situent réellement.",
  },
  {
    question: "Un type LISA « Haut-Bas » (HL) signale :",
    choices: [
      "Une valeur élevée entourée de voisins également élevés, formant un cluster homogène de valeurs fortes",
      "Une valeur élevée entourée de voisins à valeurs faibles, signalant une anomalie locale plutôt qu'un cluster homogène",
      "Une valeur faible entourée de voisins également faibles, formant un cluster homogène de valeurs basses",
      "Une valeur faible isolée entourée de voisins à valeurs élevées — l'anomalie inverse du type Bas-Haut",
    ],
    correctIndex: 1,
    explanation: "HL et LH signalent des anomalies locales (une valeur qui détonne par rapport à son voisinage), à distinguer des clusters homogènes HH/LL.",
  },
  {
    question: "Pourquoi une correction pour comparaisons multiples est-elle nécessaire en lisant une carte LISA ou Gi* ?",
    choices: [
      "Elle ne s'applique qu'à l'indice de Moran global, jamais aux indices locaux qui sont déjà individuellement significatifs",
      "Calculer un indice pour chaque entité revient à effectuer des milliers de tests simultanés, dont ~5% seraient \"significatifs\" par hasard au seuil 0.05",
      "Elle sert uniquement à ajuster la palette de couleurs pour éviter de sur-représenter visuellement les valeurs extrêmes",
      "Elle n'est requise que lorsque le nombre d'entités dépasse le seuil asymptotique de normalité, généralement fixé à 30",
    ],
    correctIndex: 1,
    explanation: "Sans correction (Bonferroni, Benjamini-Hochberg), une carte LISA/Gi* peut afficher des clusters \"significatifs\" qui ne sont qu'un artefact du grand nombre de tests effectués.",
  },
  {
    question: "En quoi la statistique Gi* de Getis-Ord diffère-t-elle spécifiquement du LISA ?",
    choices: [
      "Le Gi* n'inclut jamais l'entité elle-même dans le calcul de son propre voisinage, contrairement au LISA qui l'inclut systématiquement",
      "Le Gi* cible spécifiquement les points chauds (hautes valeurs) et points froids (faibles valeurs), pas la similarité locale en général",
      "Le Gi* détecte uniquement les regroupements de valeurs élevées, sans jamais pouvoir signaler de regroupements de valeurs faibles",
      "Le Gi* utilise obligatoirement une matrice de poids basée sur la distance, alors que le LISA se limite à la contiguïté",
    ],
    correctIndex: 1,
    explanation: "Le Gi* donne un score Z directement interprétable comme point chaud (positif significatif) ou point froid (négatif significatif) — une question plus ciblée que la similarité locale générale du LISA.",
  },
  {
    question: "Dans l'estimation de densité par noyau (KDE), le paramètre le plus déterminant du résultat est :",
    choices: [
      "La taille des cellules (pixel size) de sortie : elle détermine à elle seule la structure statistique de la densité",
      "La largeur de bande (bandwidth, h) : trop petite, résultat bruité ; trop grande, résultat sur-lissé",
      "La forme de la fonction noyau (gaussienne, quartique, etc.), qui prime sur tout autre paramètre du résultat",
      "Le nombre total de points d'entrée, indépendamment de la distance qui les sépare les uns des autres",
    ],
    correctIndex: 1,
    explanation: "h détermine directement à quel point la carte de densité reflète la structure réelle des points plutôt que du bruit ou un lissage excessif — il doit être justifié, jamais laissé par défaut.",
  },
  {
    question: "Une carte de chaleur (KDE) visuellement convaincante prouve-t-elle, à elle seule, une concentration statistiquement anormale ?",
    choices: [
      "Oui, à condition que la largeur de bande ait été choisie par validation croisée plutôt que fixée arbitrairement",
      "Non : une KDE simple ne fournit par défaut aucun test de significativité, contrairement au Gi*",
      "Oui, dès lors que la densité observée dépasse la densité moyenne de la zone d'étude sur au moins un pixel",
      "Oui, mais seulement pour des jeux de données de plus de 1000 points, seuil où la loi des grands nombres s'applique",
    ],
    correctIndex: 1,
    explanation: "Une KDE décrit une densité observée ; elle est visuellement convaincante même sur des données aléatoires. Le Gi* est l'outil qui teste réellement la significativité.",
  },
  {
    question: "Dans la structure Risque = Aléa × Enjeux × Vulnérabilité, que représente la « vulnérabilité » ?",
    choices: [
      "La probabilité d'occurrence et l'intensité du phénomène physique lui-même, indépendamment de ce qui est exposé",
      "La sensibilité intrinsèque des enjeux exposés au phénomène, par exemple le matériau de construction ou l'âge du bâti",
      "La valeur totale des enjeux exposés, comptabilisée en nombre de bâtiments ou en valeur financière estimée",
      "Le cumul historique des dommages déjà observés lors d'événements passés sur la zone d'étude",
    ],
    correctIndex: 1,
    explanation: "L'aléa mesure le phénomène lui-même, les enjeux ce qui est exposé, la vulnérabilité la sensibilité de ces enjeux au phénomène — trois composantes distinctes à ne pas confondre.",
  },
  {
    question: "Pourquoi les résidus d'une régression OLS sur une donnée spatiale peuvent-ils poser problème ?",
    choices: [
      "S'ils sont spatialement autocorrélés, cela biaise systématiquement la valeur des coefficients estimés, quel que soit l'échantillon",
      "S'ils sont eux-mêmes spatialement autocorrélés, l'hypothèse d'indépendance de l'OLS est violée, sous-estimant l'incertitude réelle des coefficients",
      "Une autocorrélation résiduelle n'affecte que le R² du modèle, sans conséquence sur la significativité des coefficients",
      "Une autocorrélation résiduelle ne peut provenir que de l'omission d'une variable dépendante spatialement décalée",
    ],
    correctIndex: 1,
    explanation: "Une autocorrélation spatiale résiduelle non prise en compte gonfle artificiellement la significativité statistique apparente du modèle (intervalles de confiance trop étroits).",
  },
  {
    question: "Que teste la fonction K de Ripley, que la densité par noyau seule ne teste pas ?",
    choices: [
      "Si un semis de points est regroupé ou aléatoire à une distance fixe unique, correspondant à la largeur de bande optimale du noyau",
      "Si un semis de points est regroupé, régulier, ou indiscernable de l'aléatoire, à plusieurs échelles de distance à la fois",
      "Si la répartition des points est due au hasard, sans jamais pouvoir détecter une répartition régulière (sur-dispersée)",
      "La corrélation entre deux variables continues mesurées aux mêmes points, indépendamment de leur position géographique"
    ],
    correctIndex: 1,
    explanation: "Contrairement à un indice global unique, la fonction K balaie une gamme de distances, révélant des structures qui changent selon l'échelle (regroupé à petite échelle, aléatoire à grande échelle, par exemple).",
  },
  {
    question: "Qu'est-ce que l'effet de bord (edge effect) en analyse spatiale locale ?",
    choices: [
      "Une surestimation artificielle de l'autocorrélation spatiale globale causée par un choix de matrice de poids trop restrictif",
      "Une entité au bord de la zone d'étude a mécaniquement moins de voisins recensés, ce qui biaise les indices locaux calculés à cet endroit",
      "Une distorsion des distances mesurées, propre aux projections coniques, qui n'affecte pas les projections cylindriques",
      "Un synonyme exact du problème d'unité spatiale modifiable (MAUP), désignant la même sensibilité au découpage administratif",
    ],
    correctIndex: 1,
    explanation: "Sans correction (zone tampon d'étude plus large que la zone d'intérêt, par exemple), les entités en bordure de zone d'étude sont sous-estimées en nombre de voisins, biaisant LISA/Gi*/KDE à cet endroit précis.",
  },
]
