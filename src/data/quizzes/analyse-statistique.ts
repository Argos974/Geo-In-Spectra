import type { QuizQuestion } from "./types"

export const analyseStatistiqueQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi la médiane est-elle souvent préférée à la moyenne pour résumer un revenu ?",
    choices: [
      "La médiane est toujours plus simple à calculer que la moyenne",
      "La médiane est robuste aux valeurs extrêmes, contrairement à la moyenne qu'un très haut revenu isolé peut fortement déplacer",
      "La moyenne ne peut se calculer que sur un nombre pair de valeurs",
      "La médiane et la moyenne donnent toujours exactement le même résultat",
    ],
    correctIndex: 1,
    explanation: "Un petit nombre de très hauts revenus déplace fortement la moyenne vers le haut, alors que la médiane (la valeur centrale) reste insensible à l'ampleur exacte des valeurs extrêmes, seulement à leur rang.",
  },
  {
    question: "Que signifie la règle empirique « 68-95-99,7 % » pour une loi normale ?",
    choices: [
      "68 % des valeurs sont inférieures à la moyenne, 95 % supérieures, 99,7 % égales à la médiane",
      "Environ 68 %, 95 % et 99,7 % des valeurs se trouvent respectivement à moins de 1, 2 et 3 écarts-types de la moyenne",
      "Le test statistique est valide à condition d'avoir au moins 68 observations",
      "68 % des données sont toujours des valeurs aberrantes à exclure",
    ],
    correctIndex: 1,
    explanation: "Pour une distribution normale, environ 68 % des valeurs se trouvent dans l'intervalle [moyenne − 1σ ; moyenne + 1σ], 95 % dans [−2σ ; +2σ], et 99,7 % dans [−3σ ; +3σ].",
  },
  {
    question: "Une étude trouve une forte corrélation entre le nombre de noyades et les ventes de glaces. Que peut-on en conclure ?",
    choices: [
      "Manger des glaces cause des noyades",
      "Les noyades causent une hausse des ventes de glaces",
      "Rien de causal directement : un facteur de confusion (la chaleur estivale) explique probablement les deux à la fois",
      "La corrélation est nécessairement calculée avec une erreur, puisque le résultat est absurde",
    ],
    correctIndex: 2,
    explanation: "Corrélation n'est pas causalité : une variable tierce (ici la température, qui pousse à la fois à se baigner et à consommer des glaces) peut expliquer une corrélation entre deux variables sans lien causal direct entre elles.",
  },
  {
    question: "Dans un test d'hypothèse, que représente l'erreur de type I ?",
    choices: [
      "Ne pas rejeter H0 alors qu'elle est fausse",
      "Rejeter H0 alors qu'elle est en réalité vraie",
      "Choisir un échantillon trop petit pour le test",
      "Confondre corrélation et causalité",
    ],
    correctIndex: 1,
    explanation: "L'erreur de type I (risque α, fixé avant le test) consiste à conclure à un effet significatif qui n'existe en réalité pas. L'erreur de type II (risque β) est l'inverse : ne pas détecter un effet qui existe réellement.",
  },
  {
    question: "À quoi sert le coefficient de détermination R² d'une régression linéaire ?",
    choices: [
      "Il indique le nombre de variables explicatives utilisées dans le modèle",
      "Il mesure la part de variance de la variable à expliquer effectivement expliquée par le modèle",
      "Il remplace le test de Student pour comparer deux moyennes",
      "Il indique toujours si la relation entre les variables est causale",
    ],
    correctIndex: 1,
    explanation: "R² (entre 0 et 1) indique la proportion de variance de y expliquée par le modèle : un R² proche de 1 signifie que le modèle explique presque toute la variabilité observée, proche de 0 qu'il n'explique presque rien.",
  },
  {
    question: "Un facteur d'inflation de la variance (VIF) élevé pour une variable d'une régression multiple signale :",
    choices: [
      "Que cette variable n'a aucun effet sur la variable à expliquer",
      "Une forte multicolinéarité : cette variable est fortement corrélée à d'autres variables explicatives du modèle",
      "Que le modèle contient une erreur de calcul qu'il faut corriger",
      "Que la variable doit obligatoirement être transformée en variable qualitative",
    ],
    correctIndex: 1,
    explanation: "Un VIF élevé (généralement > 5 ou 10) signale une multicolinéarité : la variable partage une grande partie de son information avec d'autres variables explicatives, ce qui rend l'interprétation des coefficients individuels instable.",
  },
  {
    question: "Que fait concrètement l'analyse en composantes principales (ACP) ?",
    choices: [
      "Elle teste si deux groupes ont des moyennes significativement différentes",
      "Elle réduit un grand nombre de variables numériques corrélées en un petit nombre de nouvelles variables (composantes) qui résument l'essentiel de la variance",
      "Elle prédit une variable binaire à partir de plusieurs variables explicatives",
      "Elle calcule un intervalle de confiance pour une moyenne",
    ],
    correctIndex: 1,
    explanation: "L'ACP construit de nouvelles variables (composantes principales), combinaisons linéaires des variables d'origine, ordonnées par variance expliquée décroissante — un outil de réduction de dimension, pas un test d'hypothèse.",
  },
  {
    question: "Quelle est la différence essentielle entre le k-means et la classification ascendante hiérarchique (CAH) ?",
    choices: [
      "Le k-means ne fonctionne que sur des données qualitatives, la CAH uniquement sur des données numériques",
      "Le k-means exige de fixer le nombre de groupes k à l'avance, la CAH construit un dendrogramme sans imposer k au départ",
      "La CAH est toujours plus rapide à calculer que le k-means",
      "Les deux méthodes produisent systématiquement exactement le même résultat",
    ],
    correctIndex: 1,
    explanation: "Le k-means impose de choisir k avant de lancer l'algorithme ; la CAH fusionne progressivement les observations en un dendrogramme, dont on peut choisir le nombre de groupes a posteriori en coupant l'arbre à la hauteur voulue.",
  },
  {
    question: "Pourquoi évaluer un modèle prédictif uniquement sur ses données d'entraînement est-il trompeur ?",
    choices: [
      "Parce que cela surestime systématiquement la performance réelle du modèle sur de nouvelles données (surapprentissage)",
      "Parce que les données d'entraînement contiennent toujours des erreurs de saisie",
      "Parce qu'un modèle ne peut techniquement pas être évalué sur les données qui ont servi à l'entraîner",
      "Parce que cela sous-estime systématiquement la performance réelle du modèle",
    ],
    correctIndex: 0,
    explanation: "Un modèle peut mémoriser les particularités de ses données d'entraînement plutôt que d'apprendre une règle générale : sa performance y paraît alors meilleure qu'elle ne le sera réellement sur des données nouvelles. La validation croisée (k-fold) donne une estimation plus honnête.",
  },
  {
    question: "Le bootstrap (rééchantillonnage avec remise) permet notamment de :",
    choices: [
      "Calculer un intervalle de confiance empirique sans supposer de forme théorique particulière pour la distribution de la statistique",
      "Remplacer entièrement le besoin de collecter de nouvelles données",
      "Éliminer automatiquement toute valeur aberrante d'un jeu de données",
      "Transformer une variable qualitative en variable quantitative",
    ],
    correctIndex: 0,
    explanation: "Le bootstrap génère de nombreux échantillons par tirage avec remise à partir des données observées, recalcule la statistique d'intérêt sur chacun, et utilise la distribution empirique obtenue pour construire un intervalle de confiance — sans hypothèse de normalité ou d'une autre forme théorique.",
  },
]
