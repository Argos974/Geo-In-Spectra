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
      "Tasseled Cap (transformation de Kauth-Thomas, 1976) : combine toutes les bandes d'une image via des coefficients fixes, propres à chaque capteur, pour produire trois axes interprétables — luminosité du sol (brightness), verdeur de la végétation (greenness), humidité (wetness)",
      "Analyse en composantes principales (ACP) appliquée à l'image : recombine les bandes corrélées entre elles en un plus petit nombre de composantes non corrélées, qui concentrent l'essentiel de l'information utile",
    ],
  },
  {
    type: "formula",
    label: "Tasseled Cap — axe \"greenness\" (coefficients Landsat TM, Crist & Cicone, 1984)",
    formula: "Greenness ≈ −0.283·B1 − 0.660·B2 + 0.577·B3 + 0.388·B4 − 0.045·B5 − 0.472·B7",
    note: "Contrairement au NDVI, ces coefficients ne sont pas universels : ils sont recalculés pour chaque capteur (des jeux distincts existent pour Landsat TM, ETM+, OLI et pour Sentinel-2) à partir d'une analyse statistique des images de ce capteur précis. C'est le prix de leur précision accrue.",
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
  {
    type: "formula",
    label: "Principe des k-moyennes (k-means)",
    formula: "1) placer k centres au hasard  2) assigner chaque pixel au centre le plus proche  3) recalculer chaque centre comme la moyenne de ses pixels  4) répéter 2-3 jusqu'à stabilité",
    note: "k (le nombre de classes recherchées) est choisi par l'opérateur avant de lancer l'algorithme — un choix arbitraire qui influence fortement le résultat, à documenter dans toute méthode.",
  },

  { type: "heading", text: "6. Classification supervisée", level: "superieur" },
  {
    type: "paragraph",
    text: "La classification supervisée part, à l'inverse, d'échantillons d'entraînement : des zones où la classe réelle est déjà connue (relevé de terrain, photo-interprétation). L'algorithme apprend à partir de ces exemples, puis l'applique au reste de l'image. Méthodes classiques : maximum de vraisemblance (fait l'hypothèse d'une distribution statistique par classe), forêts aléatoires (Random Forest, Breiman, 2001 — assemble de nombreux arbres de décision entraînés sur des sous-échantillons aléatoires, dont le vote majoritaire réduit le risque de surapprentissage d'un arbre isolé), machines à vecteurs de support (SVM, Cortes & Vapnik, 1995 — cherche la frontière qui sépare au mieux les classes dans un espace de caractéristiques).",
  },
  {
    type: "formula",
    label: "Évaluer une classification : la matrice de confusion",
    formula: "Précision globale = (pixels correctement classés) / (total des pixels de référence)",
    note: "Une matrice de confusion croise, ligne par ligne, la classe prédite et la classe réelle observée sur le terrain. C'est le standard décrit par Congalton (1991) pour l'évaluation de la précision thématique en télédétection.",
  },
  {
    type: "table",
    headers: ["", "Réf. Forêt", "Réf. Culture", "Réf. Bâti", "Total prédit"],
    rows: [
      ["Prédit Forêt", "85", "5", "0", "90"],
      ["Prédit Culture", "10", "70", "5", "85"],
      ["Prédit Bâti", "0", "5", "20", "25"],
      ["Total référence", "95", "80", "25", "200"],
    ],
  },
  {
    type: "formula",
    label: "Le coefficient kappa (Cohen, 1960)",
    formula: "κ = (Po − Pe) / (1 − Pe)",
    note: "Po = précision observée (les cases diagonales de la matrice ci-dessus, ici (85+70+20)/200 = 0.875). Pe = précision attendue par pur hasard, calculée à partir des totaux marge de la matrice. Le kappa corrige la précision globale de l'accord qui surviendrait même par une classification aléatoire biaisée par la fréquence des classes : κ = 1 est un accord parfait, κ = 0 équivaut au hasard, κ < 0 est pire que le hasard.",
  },
  {
    type: "diagram",
    name: "classification-methods",
    caption: "Non supervisée : les classes émergent des données. Supervisée : les classes sont apprises depuis des exemples étiquetés.",
  },

  { type: "heading", text: "7. Sur-apprentissage, sous-apprentissage et découpage des données", level: "superieur" },
  {
    type: "paragraph",
    text: "Un modèle qui apprend « trop bien » ses exemples d'entraînement, au point de mémoriser leurs particularités plutôt que la règle générale, est en situation de surapprentissage (overfitting) : sa précision sur les données d'entraînement est excellente, mais s'effondre sur des données nouvelles. À l'inverse, un modèle trop simple pour capturer la structure réelle des données est en sous-apprentissage (underfitting) — ses deux précisions, entraînement et test, restent médiocres.",
  },
  {
    type: "list",
    items: [
      "Jeu d'entraînement (train) : les exemples sur lesquels le modèle ajuste ses paramètres",
      "Jeu de validation : sert à régler les hyperparamètres (profondeur d'un arbre, nombre de couches d'un réseau) sans jamais toucher au jeu de test",
      "Jeu de test : n'est utilisé qu'une seule fois, à la toute fin, pour estimer la performance réelle du modèle sur des données jamais vues",
      "Validation croisée (k-fold) : répète l'entraînement/test sur k découpages différents des mêmes données, pour obtenir une estimation de performance moins dépendante d'un découpage particulier",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une fuite de données (data leakage) invalide toute l'évaluation",
    text: "Si des pixels du jeu de test proviennent de la même parcelle, voire du même pixel voisin, qu'un exemple du jeu d'entraînement, la précision mesurée est artificiellement gonflée : le modèle n'a pas appris à généraliser, il a simplement retrouvé un voisin quasi identique. En télédétection, découper spatialement (par parcelle ou par zone entière, jamais pixel par pixel au hasard) est indispensable pour une évaluation honnête.",
  },

  { type: "heading", text: "8. Du modèle statistique au machine learning", level: "superieur" },
  {
    type: "paragraph",
    text: "Le maximum de vraisemblance et la régression logistique multinomiale (un modèle statistique classique qui prédit la probabilité d'appartenance à chacune de plusieurs classes) sont les ancêtres directs du machine learning moderne : même principe (apprendre une règle à partir de données), formalisation mathématique plus explicite, mais moins de capacité à capturer des relations complexes que les méthodes qui ont suivi.",
  },

  { type: "heading", text: "9. Réseaux de neurones et deep learning", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un réseau de neurones convolutif (CNN) reprend le principe du filtre à noyau de la partie 3, mais avec une différence essentielle : au lieu de fixer les coefficients du noyau à la main (moyenne, contours…), le réseau les apprend automatiquement à partir de milliers d'images d'entraînement (LeCun et al., 2015, revue de référence Nature). Empilées sur plusieurs couches, ces convolutions apprises détectent d'abord des motifs simples (contours, textures), puis des structures de plus en plus complexes (un bâtiment, une route, une parcelle agricole).",
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

  { type: "heading", text: "10. Architectures spécialisées : segmentation et attention", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un CNN de classification produit une seule étiquette par image ou par petite fenêtre. Pour délimiter précisément chaque bâtiment ou chaque parcelle pixel par pixel (segmentation sémantique), l'architecture U-Net (Ronneberger et al., 2015, conçue à l'origine pour l'imagerie biomédicale, aujourd'hui un standard aussi en télédétection) combine un chemin qui réduit la résolution spatiale pour capturer le contexte large, et un chemin symétrique qui la restaure pour produire une carte de sortie à la même résolution que l'image d'entrée, avec des connexions directes entre les deux qui préservent le détail fin des contours.",
  },
  {
    type: "paragraph",
    text: "Plus récemment, les architectures Transformer (Vaswani et al., 2017, mécanisme d'attention initialement conçu pour le traitement du langage) ont été adaptées à l'image (Vision Transformer, Dosovitskiy et al., 2021) puis spécifiquement à l'imagerie satellite multi-bandes et multi-temporelle. Des modèles fondateurs pré-entraînés sur de très larges archives Sentinel-2/Landsat (par exemple Prithvi de la NASA/IBM, ou SatMAE) commencent à être réutilisés par transfert d'apprentissage plutôt que ré-entraînés de zéro pour chaque nouvelle tâche — une évolution encore active du domaine, à considérer comme un axe de recherche en cours plutôt qu'un standard stabilisé.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Le transfert d'apprentissage (transfer learning)",
    text: "Ré-entraîner un réseau profond de zéro nécessite des dizaines de milliers d'exemples étiquetés, rarement disponibles pour un projet précis. Le transfert d'apprentissage part d'un modèle déjà entraîné sur une tâche large (classification générale d'images, ou un modèle fondateur satellite), puis ne ré-ajuste que ses dernières couches sur un jeu de données spécifique, beaucoup plus petit — une pratique aujourd'hui standard, qui réduit d'un facteur souvent supérieur à 10 le volume de données d'entraînement nécessaire.",
  },

  { type: "heading", text: "11. Où l'IA change déjà la pratique", level: "superieur" },
  {
    type: "list",
    items: [
      "Classification automatique de l'occupation du sol à l'échelle nationale, mise à jour annuelle plutôt que tous les dix ans",
      "Détection de changement automatisée (déforestation, urbanisation) sur de longues séries temporelles, impossible à examiner manuellement image par image",
      "Segmentation sémantique : délimiter automatiquement chaque bâtiment, chaque parcelle, chaque route sur une image, plutôt que de simplement les classer",
      "Fusion de données multi-capteurs (optique, radar, LiDAR) apprise plutôt que combinée par des règles fixes",
    ],
  },

  { type: "heading", text: "12. Limites et vigilance", level: "approfondissement" },
  {
    type: "callout",
    tone: "warning",
    title: "Ce que l'IA en télédétection ne résout pas automatiquement",
    text: "Un modèle appris sur des données d'une région ou d'une saison se généralise mal ailleurs si le paysage ou l'éclairage diffère (biais du jeu d'entraînement, décalage de distribution ou \"domain shift\"). Un réseau profond reste largement une boîte noire : difficile d'expliquer pourquoi un pixel précis a été classé d'une certaine façon, ce qui pose un vrai problème dans un usage réglementaire ou juridique — un enjeu qui a donné naissance à un sous-champ actif, l'IA explicable (XAI). Enfin, aucun modèle ne remplace la vérité terrain : il faut toujours des relevés réels pour entraîner et vérifier un modèle, jamais seulement d'autres prédictions.",
  },
]
