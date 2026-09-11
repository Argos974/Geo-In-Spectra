import type { QuizQuestion } from "./types"

export const terrsetQuiz: QuizQuestion[] = [
  {
    question: "TerrSet se distingue de QGIS avant tout parce que :",
    choices: [
      "TerrSet ne peut afficher que des données vectorielles, jamais de raster",
      "TerrSet est un logiciel raster spécialisé en modélisation prédictive du changement, complémentaire de QGIS plutôt que concurrent",
      "TerrSet et QGIS sont deux noms différents pour un même logiciel, développé par Clark Labs",
      "TerrSet est un module intégré directement à l'intérieur de QGIS",
    ],
    correctIndex: 1,
    explanation: "TerrSet (Clark Labs, ex-IDRISI) travaille presque exclusivement en raster et se concentre sur la modélisation prédictive (classification, changement, MCE) — beaucoup de projets préparent leurs données sous QGIS puis les modélisent sous TerrSet.",
  },
  {
    question: "Pourquoi ne faut-il jamais séparer un fichier .rst de son fichier .rdc ?",
    choices: [
      "Parce que .rdc contient les métadonnées (dimensions, CRS, type de valeurs) indispensables pour interpréter les données binaires du .rst",
      "Parce que .rdc contient en réalité la moitié des pixels de l'image raster",
      "Parce que .rst est un simple raccourci qui pointe vers le fichier .rdc",
      "Parce que TerrSet fusionne automatiquement les deux fichiers au premier chargement",
    ],
    correctIndex: 0,
    explanation: "Le format raster propre à TerrSet va toujours par paire : .rst porte les données binaires, .rdc les métadonnées qui permettent de les interpréter (résolution, CRS, dimensions). Un .rst seul est illisible.",
  },
  {
    question: "Sur une matrice de changement produite par CROSSTAB, que représente la diagonale ?",
    choices: [
      "Les pixels qui n'ont pas changé de classe entre les deux dates comparées",
      "Les erreurs de classification détectées automatiquement par le module",
      "Les pixels situés en bordure de l'emprise étudiée",
      "La moyenne globale de tous les changements observés",
    ],
    correctIndex: 0,
    explanation: "La diagonale d'une matrice de changement (Forêt→Forêt, Culture→Culture…) représente la stabilité ; tout ce qui est hors diagonale est un changement réel de classe entre les deux dates.",
  },
  {
    question: "Quelle est la différence entre CLUSTER et le couple MAKESIG + MAXLIKE ?",
    choices: [
      "CLUSTER est une classification non supervisée (sans exemple), MAKESIG + MAXLIKE une classification supervisée (à partir de zones d'entraînement)",
      "CLUSTER traite uniquement des données vectorielles, MAKESIG + MAXLIKE uniquement des rasters",
      "Les deux méthodes produisent toujours exactement le même résultat sur une même image",
      "MAKESIG + MAXLIKE ne peut s'appliquer qu'à des images en noir et blanc",
    ],
    correctIndex: 0,
    explanation: "CLUSTER regroupe les pixels par proximité spectrale sans exemple fourni. MAKESIG construit des signatures à partir de zones d'entraînement connues, que MAXLIKE utilise ensuite pour classer l'image entière par maximum de vraisemblance.",
  },
  {
    question: "Que prédit le module MARKOV, à partir d'une matrice de probabilités de transition ?",
    choices: [
      "L'emplacement exact où chaque pixel va changer de classe",
      "Les proportions futures de chaque classe, sans indiquer où ces changements auront lieu",
      "La précision globale d'une classification déjà réalisée",
      "Le nombre optimal de classes à utiliser dans une classification non supervisée",
    ],
    correctIndex: 1,
    explanation: "MARKOV projette des quantités de classes futures à partir des tendances de transition observées, mais ne dit pas où ces changements se produiront : c'est le rôle de CA_MARKOV, qui y ajoute une composante spatiale.",
  },
  {
    question: "Dans une évaluation multicritère (MCE) sous TerrSet, à quoi sert le module FUZZY ?",
    choices: [
      "À dériver le poids relatif de chaque critère à partir d'une matrice de comparaison par paires",
      "À transformer un critère brut en un score continu de 0 à 1, plutôt qu'un seuil binaire net",
      "À combiner plusieurs critères déjà normalisés en une seule carte de synthèse",
      "À calculer automatiquement une distance de coût sur une surface de friction",
    ],
    correctIndex: 1,
    explanation: "FUZZY normalise un critère brut (distance, pente…) en un score continu, une transition progressive plus réaliste qu'un seuil « apte / inapte » net. WEIGHT dérive ensuite les poids, MCE combine le tout.",
  },
  {
    question: "Pourquoi une contrainte absolue (zone inondable, réserve naturelle) ne doit-elle jamais être intégrée comme un simple critère pondéré dans une MCE ?",
    choices: [
      "Parce qu'un poids, même faible, laisse toujours la possibilité qu'un bon score sur d'autres critères compense une zone censée être strictement exclue",
      "Parce que TerrSet refuse techniquement d'exécuter une MCE contenant une contrainte",
      "Parce qu'une contrainte ne peut porter que sur des données vectorielles, jamais raster",
      "Parce que cela ferait automatiquement doubler le nombre de classes de la carte finale",
    ],
    correctIndex: 0,
    explanation: "Une contrainte absolue doit être traitée en masque booléen multiplicatif, en dehors de la pondération — sinon, un excellent score sur les autres critères peut compenser à tort une zone qui aurait dû être strictement exclue.",
  },
  {
    question: "En quoi CA_MARKOV va-t-il plus loin que MARKOV seul ?",
    choices: [
      "Il ajoute un filtre de contiguïté (automate cellulaire) qui localise spatialement le changement, en plus des quantités prédites par Markov",
      "Il remplace entièrement le besoin d'une classification préalable de l'image",
      "Il calcule directement un indice de Moran sur l'image d'occupation du sol",
      "Il ne fonctionne que sur des séries temporelles de plus de cent dates",
    ],
    correctIndex: 0,
    explanation: "CA_MARKOV couple la chaîne de Markov à un automate cellulaire : à chaque itération, un filtre de contiguïté favorise le changement là où une classe est déjà présente dans le voisinage, produisant des taches de changement cohérentes plutôt qu'un semis aléatoire.",
  },
  {
    question: "Dans la méthode de validation à trois cartes de Pontius, pourquoi comparer une simulation au « modèle nul » (aucun changement, recopier t1) ?",
    choices: [
      "Parce que le modèle nul est toujours plus précis qu'une simulation CA_MARKOV",
      "Parce que la plupart des pixels ne changent pas entre deux dates : un accord global élevé peut donc ne refléter que cette stabilité de fond, pas un vrai apport de la simulation",
      "Parce que TerrSet l'exige avant d'autoriser l'export d'une carte simulée",
      "Parce que le modèle nul sert uniquement à calibrer la résolution du raster utilisé",
    ],
    correctIndex: 1,
    explanation: "Sur un territoire où 90 % des pixels ne changent pas, le modèle nul atteint déjà 90 % d'accord sans aucune modélisation : c'est ce niveau de référence, pas 0 %, qu'une simulation doit dépasser pour démontrer un apport réel.",
  },
  {
    question: "Quelle affirmation décrit correctement la place de TerrSet dans l'écosystème logiciel présenté sur ce site ?",
    choices: [
      "TerrSet est libre et gratuit, exactement comme QGIS et R",
      "TerrSet est un logiciel à licence commerciale (souvent académique), complémentaire de l'écosystème libre QGIS/R plutôt qu'interchangeable avec lui",
      "TerrSet remplace entièrement QGIS pour tout usage cartographique",
      "TerrSet ne peut échanger aucune donnée avec QGIS, faute de format commun",
    ],
    correctIndex: 1,
    explanation: "TerrSet reste un logiciel propriétaire, le plus souvent accessible via une licence académique, à la différence de QGIS et R (libres et gratuits) — mais ses données (GeoTIFF notamment) s'échangent sans perte significative avec ces deux outils.",
  },
]
