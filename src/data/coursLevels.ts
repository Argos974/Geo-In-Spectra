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
  "etudes-de-cas-sectorielles": {
    lycee: "Trois problèmes concrets, trois méthodes du cours appliquées",
    superieur: "Agriculture de précision, artificialisation, risque incendie",
    approfondissement: "Enchaîner les méthodes sur un cas professionnel complet",
  },
}
