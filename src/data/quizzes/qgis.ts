import type { QuizQuestion } from "./types"

export const qgisQuiz: QuizQuestion[] = [
  {
    question: "Quelle version de QGIS ce tutoriel recommande-t-il pour un usage scolaire ou professionnel ?",
    choices: [
      "La version « Latest », toujours la plus récente disponible au téléchargement",
      "La version LTR (Long Term Release), maintenue et corrigée pendant environ un an",
      "Une version antérieure à QGIS 2, plus légère à installer",
      "Peu importe, les deux versions sont strictement identiques en pratique",
    ],
    correctIndex: 1,
    explanation: "La version LTR est stable et corrigée sur une plus longue durée : c'est celle recommandée pour un premier apprentissage ou un usage régulier, la « Latest » évoluant plus vite avec plus de changements d'interface.",
  },
  {
    question: "Pourquoi un Shapefile (.shp) pose-t-il un risque particulier lors d'un déplacement de fichiers ?",
    choices: [
      "Parce qu'il s'agit d'un format propriétaire qui nécessite une licence payante pour être ouvert",
      "Parce qu'il est en réalité composé de plusieurs fichiers (.shp, .dbf, .shx…) qui doivent rester ensemble",
      "Parce qu'il ne peut contenir que des points, jamais de lignes ni de polygones",
      "Parce qu'il ne peut être ouvert que par QGIS, aucun autre logiciel SIG ne le lit",
    ],
    correctIndex: 1,
    explanation: "Un Shapefile n'est jamais un seul fichier : géométries, attributs, index et CRS sont répartis sur plusieurs fichiers de même nom. En perdre un seul en cours de déplacement casse la couche.",
  },
  {
    question: "Que signifie la « reprojection à la volée » dans QGIS ?",
    choices: [
      "QGIS convertit et réenregistre définitivement chaque couche dans le CRS du projet dès son chargement",
      "QGIS aligne l'affichage de couches en CRS différents, sans jamais modifier les coordonnées réelles stockées",
      "QGIS refuse de charger une couche dont le CRS diffère de celui du projet",
      "QGIS choisit automatiquement le CRS le plus précis parmi toutes les couches chargées",
    ],
    correctIndex: 1,
    explanation: "La reprojection à la volée n'est qu'un affichage : les coordonnées stockées ne changent pas. Un calcul de surface ou de distance doit toujours se faire dans un CRS projeté et métrique, vérifié au préalable.",
  },
  {
    question: "Dans le générateur d'expressions QGIS, à quoi sert `$area` ?",
    choices: [
      "Il renvoie le nombre total d'entités présentes dans la couche active",
      "Il renvoie la surface de la géométrie de l'entité courante, dans l'unité du CRS du projet",
      "Il ouvre directement la boîte à outils de traitement (Processing)",
      "Il calcule automatiquement une surface en hectares, quel que soit le CRS du projet",
    ],
    correctIndex: 1,
    explanation: "$area renvoie la surface dans l'unité du CRS courant (des m² en système projeté) : un CRS géographique en degrés donnerait un résultat en degrés carrés, sans signification physique directe.",
  },
  {
    question: "Quelle est la différence essentielle entre l'algorithme Clip et l'algorithme Intersection ?",
    choices: [
      "Clip ne fonctionne que sur des rasters, Intersection uniquement sur des couches vecteur",
      "Clip ne conserve que les attributs de la couche découpée, Intersection combine les attributs des deux couches",
      "Il n'existe aucune différence réelle, ce sont deux noms pour le même algorithme",
      "Clip nécessite un CRS géographique, Intersection un CRS projeté",
    ],
    correctIndex: 1,
    explanation: "Les deux gardent la même zone de recouvrement géométrique, mais Clip ne conserve que les attributs de la couche découpée (l'autre ne sert que de gabarit), tandis qu'Intersection combine les attributs des deux couches.",
  },
  {
    question: "À quoi sert le traitement par lot (Batch Processing) dans la boîte à outils de traitement ?",
    choices: [
      "À appliquer un même algorithme avec les mêmes paramètres à plusieurs fichiers en une seule exécution",
      "À accélérer l'affichage d'une couche volumineuse en la simplifiant automatiquement",
      "À fusionner plusieurs projets QGIS différents en un seul fichier .qgz",
      "À convertir automatiquement tous les rasters d'un dossier en couches vectorielles",
    ],
    correctIndex: 0,
    explanation: "Le traitement par lot répète un même algorithme, une ligne par fichier, en une seule exécution — ce qui élimine le risque d'un clic oublié ou d'un paramètre mal réglé sur un seul fichier au milieu d'une longue série.",
  },
  {
    question: "Que produit le Modeleur graphique une fois un enchaînement d'algorithmes terminé et enregistré ?",
    choices: [
      "Un nouvel algorithme réutilisable, qui apparaît ensuite dans la boîte à outils de traitement",
      "Une simple image du schéma, sans aucune valeur d'exécution",
      "Un fichier qui ne peut s'exécuter que depuis la fenêtre du Modeleur elle-même",
      "Une extension QGIS complète, publiée automatiquement sur le dépôt officiel",
    ],
    correctIndex: 0,
    explanation: "Un modèle enregistré devient un algorithme à part entière de la boîte à outils, réutilisable sur n'importe quelle nouvelle couche sans reconfigurer chaque étape — il peut aussi s'exporter en script Python.",
  },
  {
    question: "En PyQGIS, que fait `processing.run(\"native:buffer\", {...})` ?",
    choices: [
      "Il ouvre la fenêtre graphique de l'algorithme « Tampon », sans l'exécuter",
      "Il exécute directement l'algorithme Processing indiqué, avec les paramètres fournis en dictionnaire",
      "Il installe l'extension nécessaire pour utiliser l'algorithme « Tampon »",
      "Il liste tous les algorithmes de géotraitement vectoriel disponibles dans QGIS",
    ],
    correctIndex: 1,
    explanation: "processing.run() exécute n'importe quel algorithme de la boîte à outils par son identifiant technique, avec ses paramètres passés en dictionnaire Python — la base de l'automatisation par script PyQGIS.",
  },
  {
    question: "Quel outil exécute un algorithme de Processing directement en ligne de commande, sans jamais ouvrir l'interface graphique de QGIS ?",
    choices: [
      "DB Manager",
      "Le Plugin Manager",
      "qgis_process",
      "Le Modeleur graphique",
    ],
    correctIndex: 2,
    explanation: "qgis_process exécute Processing depuis un terminal, sans interface graphique — utile pour intégrer un traitement QGIS dans un pipeline automatisé (script shell, tâche planifiée).",
  },
  {
    question: "Pourquoi préférer le format de projet .qgs (XML) au format .qgz par défaut lorsqu'un projet QGIS est versionné avec Git ?",
    choices: [
      "Parce que .qgs se charge plus vite dans QGIS que .qgz, quelle que soit la taille du projet",
      "Parce que .qgs est un simple fichier texte, dont le différentiel Git (git diff) reste lisible ligne par ligne",
      "Parce que .qgz n'est pas reconnu par les versions récentes de QGIS",
      "Parce que .qgs compresse davantage les données géographiques associées au projet",
    ],
    correctIndex: 1,
    explanation: ".qgz est une archive compressée (contenu binaire, illisible en diff) ; .qgs est un fichier XML texte, dont un différentiel Git reste interprétable — au prix d'une taille de fichier plus importante.",
  },
]
