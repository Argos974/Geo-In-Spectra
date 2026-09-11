import type { ContentLevel } from "@/content/types"

/**
 * Sous-titre court et concret par module × piste, affiché sous le titre de
 * salle dans ModuleChapterBody. Le titre de salle (modules.ts) est volontaire-
 * ment poétique (frontispice de traité ancien) et le résumé décrit le module
 * entier — ni l'un ni l'autre ne dit à un élève, d'un coup d'œil, "c'est bien
 * ici que je retrouve ma piste". Ce sous-titre sert exactement ça : une phrase
 * mémorisable, propre à chaque piste, indépendante du CourseModule lui-même
 * (qui reste indifférent au niveau).
 */
export const coursLevelSubtitle: Record<string, Record<ContentLevel, string>> = {
  fondamentaux: {
    lycee: "Repérer un point sur Terre et le mettre sur une carte",
    superieur: "Coordonnées, projections, formats : les bases du métier SIG",
    approfondissement: "Géoïde, référentiels GNSS et transformation de Helmert",
  },
  teledetection: {
    lycee: "Comment un satellite voit la Terre",
    superieur: "Rayonnement, capteurs et résolutions : lire une image satellite",
    approfondissement: "Radiométrie, plateformes et limites physiques du capteur",
  },
  "indices-spectraux": {
    lycee: "Calculer un indice de végétation simple (NDVI)",
    superieur: "NDVI, NDMI, NDBI : la boîte à outils des indices spectraux",
    approfondissement: "Indices composés, Tasseled Cap et validation statistique",
  },
  "outils-sig": {
    lycee: "Premiers pas sous QGIS : afficher et mesurer une carte",
    superieur: "Analyses spatiales, géostatistique et automatisation SIG",
    approfondissement: "Moran, MAUP, krigeage et décision multicritère",
  },
  qgis: {
    lycee: "Installer QGIS et faire sa première carte, clic par clic",
    superieur: "Boîte à outils de traitement, modeleur graphique et expressions",
    approfondissement: "PyQGIS, extensions et automatisation d'un traitement par lot",
  },
  terrset: {
    lycee: "Ouvrir une image raster et lire une légende dans TerrSet",
    superieur: "Classification, changement d'occupation du sol et Markov",
    approfondissement: "Land Change Modeler, automates cellulaires et validation kappa",
  },
  "programmation-r": {
    lycee: "Faire calculer et tracer R, sans écrire un vrai programme",
    superieur: "Vecteurs, data frames et graphiques avec ggplot2",
    approfondissement: "Statistique spatiale, modèles et reproductibilité (R Markdown)",
  },
  vscode: {
    lycee: "Installer VS Code et exécuter son premier script",
    superieur: "Extensions Python/Jupyter, débogueur et terminal intégré",
    approfondissement: "Git intégré, espaces de travail et automatisation (tasks.json)",
  },
  "analyse-statistique": {
    lycee: "Moyenne, médiane, écart-type : résumer une série de données",
    superieur: "Tests d'hypothèse, corrélation et régression",
    approfondissement: "Analyse multivariée et apprentissage statistique",
  },
  "algorithmes-spatiaux": {
    lycee: "Interpoler une valeur manquante, trouver le plus court chemin",
    superieur: "Structures d'indexation, géométrie computationnelle, réseau",
    approfondissement: "Détection de motifs, algorithmes avancés et complexité",
  },
  "traitements-ia": {
    lycee: "Reconnaître une forme sur une image, comme une machine",
    superieur: "Classification supervisée/non supervisée et matrice de confusion",
    approfondissement: "Deep learning : CNN, U-Net, Transformers en télédétection",
  },
  "projections-avancees": {
    lycee: "Pourquoi aucune carte du monde n'est parfaite",
    superieur: "Lambert-93, UTM et Web Mercator : choisir sa projection",
    approfondissement: "Datum, projections polaires et territoires ultramarins",
  },
  "cartographie-web": {
    lycee: "Comment une carte en ligne s'affiche quand on zoome",
    superieur: "Tuiles, bibliothèques web et standards WMS/WFS",
    approfondissement: "Performance, accessibilité et architecture d'un service cartographique",
  },
  "statistiques-spatiales": {
    lycee: "Repérer où les choses se regroupent sur une carte",
    superieur: "LISA, points chauds (Gi*) et densité par noyau",
    approfondissement: "Régression spatiale et cartographie du risque",
  },
  "photogrammetrie-drones": {
    lycee: "Reconstruire un terrain à partir de photos de drone",
    superieur: "Structure from Motion, MNS/MNT et points d'appui au sol",
    approfondissement: "Planification de vol, RTK/PPK et limites de précision",
  },
  lidar: {
    lycee: "Mesurer une distance avec un laser",
    superieur: "Temps de vol, retours multiples et classification du nuage de points",
    approfondissement: "Plateformes LiDAR aéroportées, terrestres et satellite",
  },
  "bases-donnees-spatiales": {
    lycee: "Pourquoi ranger des données géographiques dans une base",
    superieur: "Index spatial, requêtes et jointures géographiques",
    approfondissement: "Topologie, performance et PostGIS Raster",
  },
  "systemes-multi-agents": {
    lycee: "Des règles simples, un comportement de groupe qui émerge",
    superieur: "Automates cellulaires, essaims et plateformes (NetLogo, Mesa)",
    approfondissement: "Calibration, validation et enjeux d'un modèle multi-agent",
  },
  "etudes-de-cas-sectorielles": {
    lycee: "Trois problèmes concrets, trois méthodes du cours appliquées",
    superieur: "Agriculture de précision, artificialisation, risque incendie",
    approfondissement: "Enchaîner les méthodes sur un cas professionnel complet",
  },
}
