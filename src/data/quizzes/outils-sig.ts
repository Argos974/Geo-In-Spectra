import type { QuizQuestion } from "./types"

export const outilsSigQuiz: QuizQuestion[] = [
  {
    question: "Quelle opération spatiale ne garde que la partie commune entre deux couches ?",
    choices: ["Buffer", "Intersection", "Union / Dissolve", "Clip"],
    correctIndex: 1,
    explanation: "L'intersection ne conserve que la zone commune (ex. parcelles agricoles qui recoupent une zone inondable). Le buffer crée une zone tampon, l'union fusionne, le clip découpe selon une emprise.",
  },
  {
    question: "Un buffer de \"200\" appliqué sur une couche en EPSG:4326 produira une zone tampon de :",
    choices: ["200 mètres, comme prévu", "200 degrés, pas 200 mètres", "200 kilomètres", "Cela provoquera une erreur bloquante"],
    correctIndex: 1,
    explanation: "EPSG:4326 est un système géographique en degrés : un buffer de \"200\" y crée une zone de 200 degrés. Il faut d'abord reprojeter en système métrique (ex. Lambert-93).",
  },
  {
    question: "Dans QGIS, où vérifie-t-on le système de coordonnées (CRS) du projet ?",
    choices: ["Dans la table attributaire", "En bas à droite de la fenêtre", "Dans le menu Aide", "Il n'est jamais affiché"],
    correctIndex: 1,
    explanation: "Le CRS du projet est affiché en bas à droite de la fenêtre QGIS — à vérifier avant tout calcul de distance ou de surface.",
  },
  {
    question: "PyQGIS et GeoPandas se distinguent principalement par :",
    choices: [
      "PyQGIS est plus rapide dans tous les cas",
      "PyQGIS s'utilise à l'intérieur de QGIS, GeoPandas fonctionne en dehors de toute interface graphique",
      "GeoPandas ne sait pas lire de fichiers vecteur",
      "Ce sont deux noms pour la même bibliothèque",
    ],
    correctIndex: 1,
    explanation: "PyQGIS est l'API Python intégrée à QGIS (automatiser des traitements existants). GeoPandas est une bibliothèque autonome pour manipuler des données vecteur en pipeline, hors interface graphique.",
  },
  {
    question: "Avant de calculer une surface avec GeoPandas (`gdf.area`), il faut impérativement :",
    choices: [
      "Trier les entités par ordre alphabétique",
      "Reprojeter dans un système métrique (ex. EPSG:2154)",
      "Convertir le fichier en GeoTIFF",
      "Rien, `gdf.area` fonctionne correctement quel que soit le CRS",
    ],
    correctIndex: 1,
    explanation: "Comme pour un buffer, un calcul de surface directement en coordonnées géographiques (degrés) donne un résultat non interprétable. Reprojeter en Lambert-93 (ou un autre système métrique) est indispensable.",
  },
]
