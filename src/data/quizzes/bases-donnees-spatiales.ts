import type { QuizQuestion } from "./types"

export const basesDonneesSpatialesQuiz: QuizQuestion[] = [
  {
    question: "Un avantage structurel d'une base de données spatiale sur un simple fichier est :",
    choices: [
      "Elle réduit toujours la taille du fichier stocké sur disque grâce à une compression native systématique",
      "Elle gère nativement l'accès concurrent multi-utilisateur et peut imposer des contraintes de cohérence",
      "Elle dispense l'administrateur de mettre en place des sauvegardes, la réplication interne étant suffisante",
      "Elle convertit automatiquement toutes les données vers un système de coordonnées commun à chaque table"
    ],
    correctIndex: 1,
    explanation: "Un fichier seul n'offre aucune garantie structurelle face à des modifications concurrentes ou des règles de cohérence, contrairement à une base spatiale.",
  },
  {
    question: "Un index spatial GiST organise les géométries selon :",
    choices: [
      "Une grille régulière de cellules de taille fixe recouvrant toute l'emprise des données",
      "Des rectangles englobants (bounding box) imbriqués selon une hiérarchie arborescente",
      "Une clé géographique (geohash) calculée à partir des coordonnées du centroïde",
      "Le nombre de sommets de chaque géométrie, des plus simples aux plus complexes",
    ],
    correctIndex: 1,
    explanation: "GiST élimine rapidement les entités qui ne peuvent géométriquement pas satisfaire une requête via leur rectangle englobant, avant de tester la géométrie exacte.",
  },
  {
    question: "Sans index spatial, une requête ST_Intersects sur une grande table doit :",
    choices: [
      "Utiliser automatiquement l'index sur la clé primaire pour accélérer le filtrage géométrique",
      "Comparer la géométrie de chaque ligne une par une (balayage complet), potentiellement très lent",
      "Se limiter aux lignes déjà présentes dans le cache mémoire d'une requête précédente",
      "Basculer automatiquement sur un index B-tree classique construit sur la colonne géométrique",
    ],
    correctIndex: 1,
    explanation: "Sans index spatial dédié, PostgreSQL doit tester chaque ligne individuellement — catastrophique en temps au-delà de quelques dizaines de milliers d'entités.",
  },
  {
    question: "Dans la clause `WHERE a.geom && b.geom AND ST_Intersects(a.geom, b.geom)`, le rôle de l'opérateur `&&` est :",
    choices: [
      "De remplacer entièrement ST_Intersects, qui devient redondant après ce filtrage préalable",
      "De filtrer rapidement via les rectangles englobants (indexé), avant la vérification géométrique exacte",
      "De calculer la distance exacte séparant les deux géométries avant toute comparaison",
      "De vérifier que les deux géométries partagent le même système de coordonnées",
    ],
    correctIndex: 1,
    explanation: "&& teste seulement le recouvrement des bounding boxes (rapide, exploite l'index) ; ST_Intersects confirme ensuite la géométrie exacte sur le nombre réduit de candidats restants.",
  },
  {
    question: "PostGIS Topology permet notamment de :",
    choices: [
      "Optimiser exclusivement le rendu cartographique des couches raster volumineuses",
      "Imposer et vérifier des règles de cohérence géométrique (ex. absence de chevauchement entre parcelles)",
      "Remplacer complètement la nécessité de créer un index spatial classique sur la table",
      "Convertir automatiquement chaque géométrie vectorielle en grille raster équivalente"
    ],
    correctIndex: 1,
    explanation: "Un fichier seul ne garantit rien structurellement ; un schéma topologique PostGIS peut rejeter une géométrie incohérente à l'écriture.",
  },
  {
    question: "Face à une requête spatiale anormalement lente, la première étape de diagnostic recommandée est :",
    choices: [
      "Ajouter un second index spatial redondant sur la même colonne géométrique",
      "Lire le plan d'exécution réel via EXPLAIN ANALYZE, pour voir si l'index spatial a été utilisé",
      "Reconstruire systématiquement l'index spatial existant sans vérifier s'il est réellement utilisé",
      "Migrer la table vers un autre système de gestion de base de données réputé plus rapide",
    ],
    correctIndex: 1,
    explanation: "EXPLAIN ANALYZE révèle si un Index Scan ou un Seq Scan (balayage complet, souvent la cause de la lenteur) a été choisi par le planificateur de requêtes.",
  },
  {
    question: "Reprojeter une colonne géométrique à la volée dans la clause WHERE d'une requête est risqué car :",
    choices: [
      "Cela empêche souvent PostgreSQL d'utiliser l'index spatial existant sur cette colonne",
      "Cela ne ralentit la requête que lors du tout premier appel de la session, puis le résultat est mis en cache",
      "Cela n'affecte que le format d'affichage des coordonnées, jamais le temps d'exécution réel",
      "Cela oblige à recréer entièrement la table avec la nouvelle projection avant de pouvoir interroger",
    ],
    correctIndex: 0,
    explanation: "Comparer à une expression calculée plutôt qu'à une valeur directe empêche souvent l'usage de l'index — la reprojection doit être faite une fois, en amont.",
  },
  {
    question: "PostGIS Raster permet notamment de :",
    choices: [
      "Stocker les données raster uniquement comme fichiers externes référencés, jamais réellement en base",
      "Stocker des données raster en base, découpées en tuiles internes, avec des fonctions comme ST_Value ou ST_SummaryStats",
      "Remplacer entièrement les logiciels SIG de bureau comme QGIS pour la visualisation cartographique",
      "Convertir automatiquement chaque raster importé vers une projection géographique unique",
    ],
    correctIndex: 1,
    explanation: "PostGIS Raster stocke des rasters directement en base, interrogeables efficacement via des fonctions SQL dédiées, comme les statistiques de zone du module Le Compas.",
  },
  {
    question: "SpatiaLite se distingue de PostGIS principalement par :",
    choices: [
      "Il nécessite l'installation d'un serveur dédié encore plus lourd à administrer que PostgreSQL",
      "Il offre l'essentiel du modèle spatial sans nécessiter d'installer et d'administrer un serveur PostgreSQL séparé",
      "Il impose un format propriétaire fermé, illisible par les logiciels SIG courants comme QGIS",
      "Il ne prend en charge que les données raster, la gestion du vecteur restant réservée à PostGIS",
    ],
    correctIndex: 1,
    explanation: "SpatiaLite (base SQLite spatiale, un seul fichier) convient à un usage local/embarqué sans le besoin d'un serveur dédié, contrairement à PostGIS.",
  },
  {
    question: "GeoServer ou MapServer, exposant une base PostGIS en WMS/WFS, servent principalement à :",
    choices: [
      "Se substituer complètement à la base de données, en stockant eux-mêmes les géométries",
      "Fournir une couche intermédiaire entre la base et le client web, évitant un accès direct à la base",
      "Optimiser exclusivement la fréquence des sauvegardes automatiques de la base de données",
      "Convertir systématiquement chaque couche vectorielle en un fichier local dans un autre format",
    ],
    correctIndex: 1,
    explanation: "Exposer directement une base au client web serait un risque de sécurité ; un serveur cartographique intermédiaire (GeoServer/MapServer) publie la donnée via des standards OGC (module Cartographie web).",
  },
]
