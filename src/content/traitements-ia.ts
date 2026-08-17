import type { ContentBlock } from "./types"

export const traitementsIaContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Les modules précédents s'arrêtent au calcul d'un indice simple, pixel par pixel. Cette salle va plus loin : comment combiner plusieurs indices entre eux, comment exploiter le voisinage d'un pixel plutôt que le pixel seul, et comment une machine peut apprendre à reconnaître un type de terrain plutôt que suivre une règle écrite à la main. Chaque partie indique le public auquel elle s'adresse en priorité — les parties « Approfondissement » supposent les précédentes acquises.",
  },

  { type: "heading", text: "1. Des indices simples aux indices composés", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Un indice simple (NDVI, NDMI, NDBI) combine deux bandes brutes d'un capteur. Un indice composé va un cran plus loin : il combine plusieurs indices déjà calculés entre eux, plutôt que de repartir des bandes. L'objectif est de faire ressortir un phénomène qu'aucun indice seul ne capture correctement.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple réel : un indice composite de comportement du feu",
    text: "Un système de cartographie du risque incendie peut pondérer plusieurs entrées déjà calculées (indice d'humidité de la végétation, alignement du vent avec la pente, exposition solaire) dans une seule moyenne pondérée pour produire un indice de comportement du feu. Aucune de ces entrées prise seule ne suffit : c'est leur combinaison réfléchie qui a un sens opérationnel.",
  },

  { type: "heading", text: "2. Indices complexes : au-delà du simple ratio", level: "superieur" },
  {
    type: "paragraph",
    text: "Un indice complexe ne se limite pas à une division entre deux bandes : il peut combiner linéairement plusieurs bandes avec des coefficients fixes, ou reposer sur une transformation statistique de l'image entière. Deux exemples classiques :",
  },
  {
    type: "list",
    items: [
      "Tasseled Cap (transformation de Kauth-Thomas) : combine toutes les bandes d'une image via des coefficients fixes, propres à chaque capteur, pour produire trois axes interprétables (luminosité du sol, verdeur de la végétation, humidité)",
      "Analyse en composantes principales (ACP) appliquée à l'image : recombine les bandes corrélées entre elles en un plus petit nombre de composantes non corrélées, qui concentrent l'essentiel de l'information utile",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi ne pas toujours utiliser un indice complexe ?",
    text: "Un indice simple (NDVI) est interprétable en un coup d'œil et comparable d'une étude à l'autre. Un indice complexe est souvent plus précis pour un usage donné, mais ses coefficients sont propres à un capteur et un contexte : il perd en généralité ce qu'il gagne en finesse.",
  },

  { type: "heading", text: "3. Le filtre à noyau (kernel)", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Jusqu'ici, chaque pixel était traité indépendamment de ses voisins. Un filtre à noyau (ou filtre de convolution) fait l'inverse : il recalcule la valeur d'un pixel à partir de lui-même et de son voisinage immédiat, pondérés par une petite matrice de coefficients (le noyau), le plus souvent 3×3.",
  },
  {
    type: "formula",
    label: "Noyau de lissage (moyenne 3×3)",
    formula: "1/9 × [[1,1,1],[1,1,1],[1,1,1]]",
    note: "Remplace chaque pixel par la moyenne de son voisinage 3×3 : effet de flou, utile pour atténuer le bruit d'une image avant un calcul d'indice.",
  },

  { type: "heading", text: "4. Le filtre passe-haut : détecter les contours", level: "superieur" },
  {
    type: "paragraph",
    text: "À l'inverse d'un filtre de lissage (passe-bas), un filtre passe-haut accentue les variations brutales de valeur entre pixels voisins : les contours, les limites de parcelles, les bords de bâtiments. C'est la base de la détection de contours en traitement d'image.",
  },
  {
    type: "formula",
    label: "Noyau de renforcement des contours (passe-haut)",
    formula: "[[0,-1,0],[-1,5,-1],[0,-1,0]]",
    note: "Un pixel isolé, très différent de ses voisins, ressort fortement après ce filtre ; une zone homogène reste quasiment inchangée.",
  },
  {
    type: "diagram",
    name: "kernel-convolution",
    caption: "Un noyau 3×3 glissé sur la grille de pixels : chaque pixel de sortie dépend de son voisinage, pas de lui seul.",
  },

  { type: "heading", text: "5. Classification non supervisée", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Classer une image, c'est attribuer une catégorie (forêt, eau, bâti, culture…) à chaque pixel plutôt qu'une simple valeur numérique. La classification non supervisée regroupe automatiquement les pixels aux signatures spectrales proches (algorithme des k-moyennes, par exemple), sans qu'aucun exemple étiqueté ne soit fourni au préalable. L'opérateur nomme les classes après coup, en les comparant à des images ou des relevés de terrain.",
  },

  { type: "heading", text: "6. Classification supervisée", level: "superieur" },
  {
    type: "paragraph",
    text: "La classification supervisée part, à l'inverse, d'échantillons d'entraînement : des zones où la classe réelle est déjà connue (relevé de terrain, photo-interprétation). L'algorithme apprend à partir de ces exemples, puis l'applique au reste de l'image. Méthodes classiques : maximum de vraisemblance (fait l'hypothèse d'une distribution statistique par classe), forêts aléatoires (assemble de nombreux arbres de décision), machines à vecteurs de support.",
  },
  {
    type: "formula",
    label: "Évaluer une classification : la matrice de confusion",
    formula: "Précision globale = (pixels correctement classés) / (total des pixels de référence)",
    note: "Une matrice de confusion croise, ligne par ligne, la classe prédite et la classe réelle observée sur le terrain. L'indice kappa affine cette mesure en corrigeant l'accord attendu par pur hasard.",
  },
  {
    type: "diagram",
    name: "classification-methods",
    caption: "Non supervisée : les classes émergent des données. Supervisée : les classes sont apprises depuis des exemples étiquetés.",
  },

  { type: "heading", text: "7. Du modèle statistique au machine learning", level: "superieur" },
  {
    type: "paragraph",
    text: "Le maximum de vraisemblance et la régression logistique multinomiale (un modèle statistique classique qui prédit la probabilité d'appartenance à chacune de plusieurs classes) sont les ancêtres directs du machine learning moderne : même principe (apprendre une règle à partir de données), formalisation mathématique plus explicite, mais moins de capacité à capturer des relations complexes que les méthodes qui ont suivi.",
  },

  { type: "heading", text: "8. Réseaux de neurones et deep learning", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un réseau de neurones convolutif (CNN) reprend le principe du filtre à noyau de la partie 3, mais avec une différence essentielle : au lieu de fixer les coefficients du noyau à la main (moyenne, contours…), le réseau les apprend automatiquement à partir de milliers d'images d'entraînement. Empilées sur plusieurs couches, ces convolutions apprises détectent d'abord des motifs simples (contours, textures), puis des structures de plus en plus complexes (un bâtiment, une route, une parcelle agricole).",
  },
  {
    type: "diagram",
    name: "neural-network",
    caption: "Schéma de principe d'un réseau à plusieurs couches : chaque couche recombine les sorties de la précédente.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le deep learning ne remplace pas les parties précédentes",
    text: "Un CNN entraîné sur de l'imagerie satellite reste souvent alimenté par les mêmes indices et bandes que les méthodes classiques : NDVI, NDMI, bandes brutes. Comprendre ce qu'un indice mesure physiquement reste indispensable pour interpréter, corriger ou faire confiance à ce qu'un modèle produit.",
  },

  { type: "heading", text: "9. Où l'IA change déjà la pratique", level: "superieur" },
  {
    type: "list",
    items: [
      "Classification automatique de l'occupation du sol à l'échelle nationale, mise à jour annuelle plutôt que tous les dix ans",
      "Détection de changement automatisée (déforestation, urbanisation) sur de longues séries temporelles, impossible à examiner manuellement image par image",
      "Segmentation sémantique : délimiter automatiquement chaque bâtiment, chaque parcelle, chaque route sur une image, plutôt que de simplement les classer",
      "Fusion de données multi-capteurs (optique, radar, LiDAR) apprise plutôt que combinée par des règles fixes",
    ],
  },

  { type: "heading", text: "10. Limites et vigilance", level: "approfondissement" },
  {
    type: "callout",
    tone: "warning",
    title: "Ce que l'IA en télédétection ne résout pas automatiquement",
    text: "Un modèle appris sur des données d'une région ou d'une saison se généralise mal ailleurs si le paysage ou l'éclairage diffère (biais du jeu d'entraînement). Un réseau profond reste largement une boîte noire : difficile d'expliquer pourquoi un pixel précis a été classé d'une certaine façon, ce qui pose un vrai problème dans un usage réglementaire ou juridique. Enfin, aucun modèle ne remplace la vérité terrain : il faut toujours des relevés réels pour entraîner et vérifier un modèle, jamais seulement d'autres prédictions.",
  },
]
