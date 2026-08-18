export interface Exercise {
  prompt: string
  solutionText: string
  solutionItems?: string[]
}

export interface ExerciseSet {
  title: string
  intro: string
  exercises: Exercise[]
}

/**
 * Exercices courts, un point d'entrée pratique dédié à chaque salle (même
 * logique que le quiz et le jeu : 1 page par salle) — complémentaires aux
 * séances de l'Atelier, pas un remplacement : ici, 3 questions courtes avec
 * corrigé, pas une séance complète. L'Atelier lui-même n'a pas d'entrée ici,
 * puisqu'il est déjà entièrement composé d'exercices.
 */
export const exercises: Record<string, ExerciseSet> = {
  fondamentaux: {
    title: "Exercices : Fondements",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Un fichier CSV contient des colonnes lon/lat. Dans quel système de coordonnées ces valeurs sont-elles très probablement exprimées ? Pourquoi ne peux-tu pas calculer une distance en mètres directement avec ?",
        solutionText: "Ce sont presque toujours des coordonnées géographiques WGS84 (EPSG:4326), en degrés décimaux, c'est le standard d'échange par défaut. Un degré ne représente pas la même distance au sol selon la latitude (les méridiens se rapprochent vers les pôles) : il faut reprojeter en système métrique (Lambert-93, EPSG:2154, en France) avant tout calcul de distance ou de surface.",
      },
      {
        prompt: "Un point a pour coordonnées Lambert-93 X = 750 000, Y = 6 600 000. Est-il plutôt au nord ou au sud de Paris (X ≈ 652 000, Y ≈ 6 862 000) ? À l'est ou à l'ouest ?",
        solutionText: "En Lambert-93, X croît vers l'est et Y croît vers le nord. Y = 6 600 000 est inférieur à celui de Paris (6 862 000) : le point est plus au sud. X = 750 000 est supérieur à celui de Paris (652 000) : le point est plus à l'est.",
      },
      {
        prompt: "Un géoréférencement calé sur seulement 3 points de contrôle, tous regroupés dans un coin de l'image, affiche un résidu très faible. Pourquoi ce résultat reste-t-il risqué ?",
        solutionText: "Un résidu faible ne garantit la précision qu'au voisinage immédiat des points de contrôle utilisés. Loin d'eux, la transformation extrapole sans aucune donnée réelle pour la valider : l'erreur peut y être bien plus grande que le résidu affiché ne le laisse penser. Des points de contrôle bien répartis sur toute l'étendue de l'image sont indispensables, pas seulement nombreux.",
      },
    ],
  },
  teledetection: {
    title: "Exercices : Le Regard",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Une image montre un plan d'eau très sombre en bande NIR mais relativement clair en bande bleue visible. Quel phénomène physique explique ce contraste ?",
        solutionText: "L'eau absorbe presque intégralement le rayonnement au-delà du visible : sa réflectance NIR est proche de zéro. Dans le visible, en particulier le bleu, une partie du rayonnement est réfléchie en surface et pénètre superficiellement, d'où une réflectance nettement plus élevée qu'en NIR. C'est exactement ce contraste que le NDWI exploite.",
      },
      {
        prompt: "Une image Sentinel-2 acquise à midi solaire en été, et une autre acquise à 9h en hiver, sur le même lieu : pourquoi ne sont-elles pas directement comparables pixel à pixel sans précaution ?",
        solutionText: "L'angle d'éclairage solaire diffère fortement (hauteur du soleil, azimut), ce qui change la réflectance mesurée d'une même surface (effets BRDF) et la longueur/position des ombres portées. La saison change aussi l'état de la végétation (phénologie). Comparer directement sans corriger ces effets confond changement réel et artefact d'acquisition.",
      },
      {
        prompt: "Un capteur radar et un capteur optique survolent la même zone le jour d'une tempête. Lequel produira une image exploitable, et pourquoi ?",
        solutionText: "Le radar (capteur actif) : il émet sa propre onde et la couverture nuageuse épaisse ne bloque pas les longueurs d'onde radar utilisées. L'optique (capteur passif, dépend de la lumière solaire réfléchie) est inutilisable sous une couverture nuageuse dense, qui masque complètement la surface.",
      },
    ],
  },
  "indices-spectraux": {
    title: "Exercices : Les Couleurs",
    intro: "Trois questions courtes, avec un vrai calcul à faire pour les deux premières.",
    exercises: [
      {
        prompt: "Un pixel a pour réflectance Rouge = 0.08 et NIR = 0.45. Calcule son NDVI et classe-le selon le tableau du module.",
        solutionText: "NDVI = (0.45 − 0.08) / (0.45 + 0.08) = 0.37 / 0.53 ≈ 0.70, dans la classe 0.4 à 0.8 : végétation dense et vigoureuse.",
      },
      {
        prompt: "Un pixel a pour réflectance SWIR = 0.30 et NIR = 0.20. Calcule son NDBI et interprète le résultat.",
        solutionText: "NDBI = (0.30 − 0.20) / (0.30 + 0.20) = 0.10 / 0.50 = 0.20, un NDBI positif signale une surface bâtie ou minérale (le SWIR y est plus réfléchi que le NIR), à l'opposé d'un pixel de végétation.",
      },
      {
        prompt: "Deux parcelles ont exactement le même NDVI (0.15) en plein été : l'une est un champ labouré, l'autre un parking. Quel indice permettrait de les distinguer, et pourquoi le NDVI seul ne suffit pas ?",
        solutionText: "Le NDBI. Sol nu agricole et surface bâtie ont tous deux un NDVI faible (peu ou pas de végétation) : le NDVI seul ne peut pas les séparer. Le NDBI exploite le contraste SWIR/NIR, très différent entre un matériau minéral construit (béton, bitume, tuile) et un sol nu naturel.",
      },
    ],
  },
  "outils-sig": {
    title: "Exercices : Le Compas",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Tu dois connaître la surface totale d'une commune couverte par une zone inondable, à partir de deux couches distinctes (limites communales, zone inondable). Quelle opération spatiale utiliser, et que dois-tu vérifier avant tout calcul de surface ?",
        solutionText: "Une intersection entre les deux couches, puis une somme des surfaces ($area) sur le résultat. Avant tout calcul, vérifier que les deux couches sont dans le même système de coordonnées projeté métrique (Lambert-93), un calcul de surface en système géographique (degrés) donne un résultat inexploitable, sans message d'erreur.",
      },
      {
        prompt: "Un indice de Moran calculé sur le taux de chômage par commune d'un département vaut +0.72. Que peux-tu en conclure sur la répartition spatiale de ce taux ?",
        solutionText: "Une forte autocorrélation spatiale positive : les communes à taux de chômage proche ont tendance à être géographiquement voisines (regroupement en \"taches\"), plutôt qu'une répartition aléatoire sur le territoire. Un indice proche de 0 signalerait l'absence de structure spatiale.",
      },
      {
        prompt: "Pourquoi le krigeage produit-il une carte d'incertitude alors qu'une simple pondération inverse à la distance (IDW) n'en produit pas ?",
        solutionText: "Le krigeage repose sur un modèle statistique explicite de la structure spatiale du phénomène (le variogramme), ce qui permet de calculer une variance d'estimation en tout point. L'IDW est une formule purement déterministe (pondération par la distance) sans modèle statistique sous-jacent : il n'y a rien dont dériver une incertitude.",
      },
    ],
  },
  "traitements-ia": {
    title: "Exercices : L'Intelligence",
    intro: "Trois questions courtes, avec un vrai calcul à faire pour la première.",
    exercises: [
      {
        prompt: "Une classification a une précision observée Po = 0.875 et une précision attendue par hasard Pe = 0.42. Calcule le kappa et commente le résultat.",
        solutionText: "κ = (0.875 − 0.42) / (1 − 0.42) = 0.455 / 0.58 ≈ 0.78, un accord largement supérieur au hasard, généralement considéré comme un bon résultat (au-delà de 0.75, l'accord est souvent qualifié de \"substantiel à quasi parfait\" dans la littérature).",
      },
      {
        prompt: "Un modèle atteint 99 % de précision sur l'entraînement et 61 % sur le test. Quel est le diagnostic, et que faire en premier ?",
        solutionText: "Sur-apprentissage net (le modèle mémorise les données d'entraînement au lieu de généraliser). Avant toute chose, vérifier qu'il n'y a pas de fuite de données (pixels de test trop proches de ceux d'entraînement) ; ensuite, réduire la complexité du modèle ou augmenter/diversifier les données d'entraînement.",
      },
      {
        prompt: "Pourquoi le kappa n'est-il pas la bonne métrique pour évaluer un U-Net qui délimite des bâtiments ?",
        solutionText: "Le kappa évalue un accord pixel par pixel, indépendamment de la géométrie de l'objet. Pour une segmentation, ce qui compte est le recouvrement entre la forme prédite et la forme réelle : c'est l'IoU (Intersection over Union) qui mesure cela, pas le kappa.",
      },
    ],
  },
  methodologie: {
    title: "Exercices : La Méthode",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Une carte affiche la population par commune avec 5 couleurs qualitatives différentes (rouge, bleu, vert, jaune, violet). Quelle erreur de sémiologie ceci illustre-t-il, et quelle correction proposer ?",
        solutionText: "La population est une donnée quantitative et ordonnée, portée ici par la variable couleur/teinte, qui n'a pas d'ordre perceptif naturel : l'œil ne perçoit pas de progression logique entre rouge, bleu, vert. Corriger en utilisant un dégradé de valeur d'une seule teinte (clair → foncé) ou la taille (ronds proportionnels).",
      },
      {
        prompt: "Une carte montre une zone industrielle installée près d'un port. Rédige une phrase qui décrit, puis une phrase qui analyse.",
        solutionText: "Description : \"On observe une zone industrielle implantée à proximité immédiate du port.\" Analyse : \"Cette implantation s'explique par la proximité logistique du port, qui facilite l'import de matières premières et l'export de produits finis.\" Le second niveau (la mise en relation causale) est ce qui distingue un commentaire noté haut d'une simple énumération.",
      },
      {
        prompt: "Dans un rapport technique, pourquoi séparer strictement la section Résultats de la section Discussion ?",
        solutionText: "Pour que le lecteur distingue clairement ce qui a été mesuré objectivement (les résultats) de ce que l'auteur en interprète (la discussion, avec ses limites et son incertitude). Mélanger les deux dans le même paragraphe est l'une des erreurs de rigueur les plus fréquentes dans un premier rapport technique.",
      },
    ],
  },
}
