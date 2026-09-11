import type { QuizQuestion } from "./types"

export const programmationRQuiz: QuizQuestion[] = [
  {
    question: "Quelle est la relation entre R et RStudio ?",
    choices: [
      "R et RStudio sont deux noms pour un même logiciel, installés en une seule opération",
      "R est le moteur qui exécute le code, RStudio est l'IDE qui l'entoure d'une interface — R doit être installé en premier",
      "RStudio exécute le code, R ne sert qu'à afficher les graphiques produits",
      "R ne fonctionne que sous Windows, RStudio uniquement sous macOS et Linux",
    ],
    correctIndex: 1,
    explanation: "R exécute réellement le code ; RStudio, installé après, l'entoure d'une interface confortable (Console, Script, Environnement). Installer RStudio sans R au préalable laisse l'IDE sans version de R à détecter.",
  },
  {
    question: "Pourquoi `read.csv2()` est-il souvent nécessaire plutôt que `read.csv()` sur un fichier exporté depuis Excel en France ?",
    choices: [
      "Parce que read.csv() est réservé aux très gros fichiers, read.csv2() aux petits tableaux",
      "Parce qu'un export français utilise typiquement le point-virgule comme séparateur de colonnes et la virgule comme séparateur décimal",
      "Parce que read.csv() ne peut lire que des fichiers encodés en UTF-8",
      "Parce que read.csv2() est plus récent et remplace totalement read.csv() depuis R 4.0",
    ],
    correctIndex: 1,
    explanation: "read.csv() attend la convention anglo-saxonne (virgule/point) ; un export Excel français (point-virgule/virgule) nécessite read.csv2(), sous peine d'obtenir une seule colonne mal découpée.",
  },
  {
    question: "En ggplot2, à quoi sert l'opérateur `+` dans une expression comme `ggplot(df, aes(x, y)) + geom_point()` ?",
    choices: [
      "À additionner deux colonnes numériques du tableau df",
      "À empiler des couches graphiques (données, esthétiques, géométrie) les unes sur les autres",
      "À enchaîner deux étapes de traitement du tableau, comme le pipe |>",
      "À dupliquer automatiquement le graphique en plusieurs panneaux",
    ],
    correctIndex: 1,
    explanation: "Le + de ggplot2 empile des couches graphiques successives, une syntaxe propre au package — à ne pas confondre avec le pipe |>, qui enchaîne des étapes de traitement de données, pas des couches graphiques.",
  },
  {
    question: "Que fait `donnees |> filter(temperature > 20) |> arrange(desc(temperature))` ?",
    choices: [
      "Il trie d'abord, puis filtre les lignes triées selon un ordre décroissant",
      "Il garde uniquement les lignes où la température dépasse 20, puis les trie par température décroissante",
      "Il calcule la température moyenne des lignes filtrées, sans les trier",
      "Il crée une nouvelle colonne temperature_triee sans modifier l'ordre des lignes",
    ],
    correctIndex: 1,
    explanation: "Le pipe |> enchaîne les étapes dans l'ordre où elles s'exécutent réellement : d'abord filter() garde les lignes concernées, puis arrange(desc(...)) les trie par température décroissante.",
  },
  {
    question: "Pourquoi faut-il souvent appeler `st_transform()` avant `st_buffer()` sur un objet sf ?",
    choices: [
      "Parce que st_buffer() ne fonctionne que sur des objets déjà convertis en data frame classique",
      "Parce qu'un objet resté en CRS géographique (degrés) renvoie une zone tampon exprimée en degrés, sans avertissement",
      "Parce que st_transform() supprime automatiquement les géométries invalides avant le calcul",
      "Parce que st_buffer() exige que l'objet sf contienne au moins une colonne numérique",
    ],
    correctIndex: 1,
    explanation: "Comme sous QGIS, un CRS géographique (EPSG:4326) renvoie des distances/surfaces en degrés si l'on omet une reprojection préalable vers un CRS projeté (ex. EPSG:2154) — une erreur silencieuse, non signalée par R.",
  },
  {
    question: "Dans le package terra, que fait `extract(r, vect(parcelles), fun = mean)` ?",
    choices: [
      "Il découpe le raster r selon l'emprise exacte des parcelles, sans aucun calcul de statistique",
      "Il calcule la valeur moyenne du raster r à l'intérieur de chaque polygone de parcelles",
      "Il convertit le raster r en objet vectoriel de type polygone",
      "Il reprojette automatiquement le raster r dans le CRS des parcelles",
    ],
    correctIndex: 1,
    explanation: "extract() résume les valeurs du raster à l'intérieur de chaque polygone selon la fonction fun (ici la moyenne) — l'équivalent direct des statistiques de zone vues sous QGIS ou TerrSet.",
  },
  {
    question: "Que teste `moran.test()` du package spdep, à partir d'une matrice de voisinage `lw` ?",
    choices: [
      "La normalité de la distribution d'une variable, indépendamment de toute position géographique",
      "La significativité de l'autocorrélation spatiale (indice de Moran) d'une variable, selon une distribution théorique",
      "La qualité d'un ajustement de régression linéaire classique (R²)",
      "Le nombre optimal de classes pour une classification non supervisée",
    ],
    correctIndex: 1,
    explanation: "moran.test() est un test paramétrique de significativité de l'indice de Moran, calculé à partir de la matrice de voisinage construite par poly2nb()/nb2listw() — l'implémentation directe en R de la formule théorique de Moran.",
  },
  {
    question: "Quel avantage le krigeage (package gstat) apporte-t-il par rapport à une simple pondération inverse à la distance (IDW) ?",
    choices: [
      "Il est systématiquement plus rapide à calculer sur un grand nombre de points",
      "Il fournit, en plus de la valeur interpolée, une carte de variance de krigeage qui documente l'incertitude de l'estimation",
      "Il ne nécessite aucun ajustement de variogramme au préalable",
      "Il ne peut s'appliquer qu'à des données déjà classifiées en catégories discrètes",
    ],
    correctIndex: 1,
    explanation: "krige() renvoie var1.pred (la valeur interpolée) et var1.var (la variance de krigeage) : une carte d'incertitude que l'IDW, purement déterministe, ne fournit pas — la même distinction déjà posée en théorie dans le module Le Compas.",
  },
  {
    question: "Pourquoi préallouer un vecteur (ou utiliser purrr::map()) plutôt que de le faire grandir ligne par ligne dans une boucle for ?",
    choices: [
      "Parce que R interdit techniquement de modifier un vecteur à l'intérieur d'une boucle for",
      "Parce que resultats <- c(resultats, nouvelle_valeur) recopie tout le vecteur en mémoire à chaque itération, ce qui devient très lent sur de nombreux éléments",
      "Parce qu'une boucle for ne peut traiter que des data frames, jamais des vecteurs simples",
      "Parce que purrr::map() est toujours plus rapide que n'importe quelle boucle for, sans exception",
    ],
    correctIndex: 1,
    explanation: "Faire grandir un vecteur élément par élément recopie l'ensemble du vecteur en mémoire à chaque tour de boucle : un piège classique de performance, invisible sur quelques éléments mais dramatique sur plusieurs milliers.",
  },
  {
    question: "Quel est le rôle du fichier `renv.lock` dans un projet R reproductible ?",
    choices: [
      "Il enregistre l'historique complet des commandes tapées dans la Console",
      "Il fixe la version exacte de chaque package utilisé, pour qu'une autre machine puisse reconstituer le même environnement",
      "Il remplace entièrement le besoin d'un dépôt Git pour suivre les modifications du code",
      "Il chiffre le contenu du script R pour en protéger l'accès",
    ],
    correctIndex: 1,
    explanation: "renv::snapshot() écrit dans renv.lock la version exacte de chaque package utilisé ; renv::restore() sur une autre machine réinstalle ces mêmes versions — renv verrouille les packages, Git verrouille le code, les deux ensemble garantissent la reproductibilité.",
  },
]
