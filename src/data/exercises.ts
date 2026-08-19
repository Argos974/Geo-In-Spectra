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
  "projections-avancees": {
    title: "Exercices : Les Projections",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Une carte du monde en Mercator est utilisée pour comparer visuellement la taille du Groenland et de l'Afrique. Pourquoi ce n'est pas une comparaison valide ?",
        solutionText: "Mercator est une projection conforme, pas équivalente : elle préserve les angles/formes locales mais déforme fortement les surfaces, de plus en plus en s'éloignant de l'équateur. Le Groenland y paraît comparable à l'Afrique alors qu'il est environ 14 fois plus petit en réalité. Une projection équivalente est nécessaire pour comparer des surfaces valablement.",
      },
      {
        prompt: "Deux couches SIG semblent décalées d'environ 200 m dans la même direction partout sur la carte, alors qu'elles sont annoncées dans le même système de coordonnées projeté. Quelle est la cause la plus probable, et comment la distinguer d'un problème de projection ?",
        solutionText: "Probablement une confusion de datum (ex. une couche encore en NTF non transformée vers RGF93/WGS84), pas un problème de projection : un décalage de datum est systématique (même direction, même ampleur partout), alors qu'une déformation de projection varie selon la position sur la carte.",
      },
      {
        prompt: "Pourquoi Lambert-93 n'est-il pas un bon choix pour une carte web mondiale, alors qu'il est excellent pour une carte de France ?",
        solutionText: "Lambert-93 est calé (parallèles standards 44°N/49°N, méridien central 3°E) spécifiquement pour minimiser la déformation sur l'étendue et la latitude du territoire français. Hors de cette zone, la déformation croît rapidement. Une carte mondiale a besoin d'un système pensé pour le globe entier (Web Mercator pour l'affichage, une projection équivalente pour comparer des surfaces).",
      },
    ],
  },
  "cartographie-web": {
    title: "Exercices : Le Web",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Une carte web affiche 4 tuiles au zoom 1. Combien de tuiles couvrent le monde entier au zoom 5 ?",
        solutionText: "N = 4^z, donc 4^5 = 1024 tuiles au zoom 5. Seule une petite fraction de ces tuiles est chargée à un instant donné, celles correspondant à la zone réellement visible à l'écran.",
      },
      {
        prompt: "Un site affiche un fond de carte via des tuiles vectorielles rendues en WebGL plutôt que des tuiles raster classiques. Quel avantage concret cela apporte-t-il à l'utilisateur ?",
        solutionText: "Le style de la carte (couleurs, labels affichés, thème clair/sombre) peut changer en temps réel côté client sans redemander de nouvelles images au serveur, et la carte peut s'incliner/pivoter en 3D — impossible avec des tuiles raster déjà dessinées et figées côté serveur.",
      },
      {
        prompt: "Un développeur charge un fichier GeoJSON de 80 000 sommets d'un seul coup sur une carte Leaflet, et la carte devient saccadée même après le chargement complet du fichier. Quelle est la cause, et quelles solutions envisager ?",
        solutionText: "Le ralentissement vient du rendu (reprojection et dessin de chaque sommet), pas seulement du transfert réseau. Solutions : simplifier la géométrie (Douglas-Peucker), découper la donnée par zone/tuile pour ne charger que la partie visible, ou utiliser du clustering si ce sont des points plutôt que des lignes/polygones complexes.",
      },
    ],
  },
  "statistiques-spatiales": {
    title: "Exercices : Les Statistiques",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Un indice de Moran global sur le taux de départs de feu par commune d'un département vaut +0.65, significatif. Le maire d'une commune isolée en zone plutôt calme te demande si sa commune est concernée par un cluster à risque. L'indice global suffit-il à répondre ?",
        solutionText: "Non : l'indice global de Moran ne dit rien sur la localisation précise des regroupements, seulement qu'il en existe globalement sur le département. Un indicateur local (LISA) ou une statistique Gi* est nécessaire pour savoir si cette commune précise appartient à un cluster (HH), en est à l'écart, ou constitue une anomalie isolée (HL/LH).",
      },
      {
        prompt: "Une carte de densité par noyau (KDE) de départs de feu sur 15 ans affiche une zone rouge vif bien visible. Cette zone représente-t-elle nécessairement une concentration statistiquement anormale de départs de feu ?",
        solutionText: "Pas nécessairement. Une KDE produit toujours une image visuellement convaincante, même sur des données sans structure réelle : elle décrit une densité observée, sans test de significativité par défaut. Un Gi* sur la même donnée est nécessaire pour vérifier si cette concentration dépasse statistiquement ce qu'on attendrait d'une répartition aléatoire.",
      },
      {
        prompt: "Une régression tentant de prédire la vulnérabilité au feu à partir de variables socio-économiques présente un R² élevé, mais un indice de Moran calculé sur ses résidus est fortement positif et significatif. Que faut-il en conclure sur ce modèle ?",
        solutionText: "Les résidus ne sont pas indépendants (autocorrélation spatiale résiduelle) : l'hypothèse d'indépendance de la régression classique (OLS) est violée. La significativité statistique des coefficients du modèle est probablement surestimée (intervalles de confiance trop étroits). Un modèle de régression spatiale (retard spatial ou erreur spatiale) serait plus approprié.",
      },
    ],
  },
  "photogrammetrie-drones": {
    title: "Exercices : Le Drone",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Un vol de drone est planifié avec seulement 40 % de recouvrement longitudinal pour gagner du temps de batterie. Quel risque cela fait-il courir au traitement final ?",
        solutionText: "Un recouvrement insuffisant (la norme est 70-80 % longitudinal) risque de laisser des zones du terrain visibles sur une seule photo, jamais sous deux angles différents : ces zones ne peuvent pas être reconstruites en 3D, ce qui se traduit par des trous dans le nuage de points ou l'orthophoto finale, généralement découverts seulement au traitement, trop tard pour corriger sans revoler.",
      },
      {
        prompt: "Un modèle 3D de drone est cohérent en géométrie relative mais mal positionné dans le référentiel Lambert-93 réel. Quelle est la cause la plus probable, et comment la corriger ?",
        solutionText: "L'absence ou l'insuffisance de points d'appui au sol (GCP) mesurés précisément au GPS. La SfM seule produit une géométrie cohérente entre elle mais pas nécessairement bien calée en position/échelle absolue : des GCP bien répartis sur toute l'emprise du chantier, identifiables sur plusieurs photos, permettent de recaler le modèle sur le référentiel géographique réel.",
      },
      {
        prompt: "Pourquoi un MNT calculé par photogrammétrie de drone au-dessus d'une forêt dense est-il structurellement moins fiable qu'un MNT LiDAR sur la même zone ?",
        solutionText: "La photogrammétrie est un capteur passif qui ne voit que la première surface opaque rencontrée par la caméra : sous une canopée dense, aucune photo ne voit jamais directement le sol, donc le MNT photogrammétrique n'est qu'une estimation filtrée à partir du MNS. Le LiDAR, capteur actif, laisse une partie de son signal pénétrer entre les feuilles et mesure directement des points au sol (retours multiples), rendant son MNT structurellement plus fiable sous couvert dense.",
      },
    ],
  },
  lidar: {
    title: "Exercices : Le LiDAR",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Un pulse LiDAR aller-retour met 6,68 microsecondes à revenir au capteur. Calcule la distance mesurée (c ≈ 3×10⁸ m/s).",
        solutionText: "d = (c × t) / 2 = (3×10⁸ × 6,68×10⁻⁶) / 2 = 2004 / 2 = 1002 m, soit environ 1000 m — une distance de vol aéroporté classique.",
      },
      {
        prompt: "Un relevé LiDAR annonce une densité de 10 points/m², mais le MNT produit reste lacunaire sous une zone de forêt très dense. Explique cette apparente contradiction.",
        solutionText: "La densité annoncée (10 points/m²) est presque toujours la densité globale du nuage brut, avant classification. Sous un couvert très dense, très peu de pulses atteignent réellement le sol : la densité de points classés \"sol\" spécifiquement peut être bien plus faible que la densité globale, expliquant un MNT lacunaire malgré une densité annoncée élevée.",
      },
      {
        prompt: "Pourquoi un nuage de points LiDAR brut ne peut-il pas, à lui seul, produire une orthophoto colorée classique ?",
        solutionText: "Un LiDAR pur mesure une distance et une intensité de retour, pas une couleur RVB : il n'a pas de capteur optique de couleur natif. Produire une orthophoto colorée à partir d'un relevé LiDAR nécessite de fusionner le nuage de points avec des photos prises par une caméra embarquée séparée, plaquées ensuite sur la géométrie mesurée par le laser.",
      },
    ],
  },
  "bases-donnees-spatiales": {
    title: "Exercices : La Base",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Une requête ST_Intersects sur une table de 3 millions de parcelles met plusieurs minutes à s'exécuter. Quelle est la première chose à vérifier, et comment ?",
        solutionText: "Vérifier si un index spatial GiST existe sur la colonne géométrique, et s'il est réellement utilisé, via EXPLAIN ANALYZE : un plan affichant un \"Seq Scan\" (balayage complet de table) plutôt qu'un \"Index Scan\" indique que l'index n'est pas exploité, la cause la plus fréquente d'une requête spatiale anormalement lente sur une grande table.",
      },
      {
        prompt: "Une requête filtre `WHERE ST_Transform(a.geom, 2154) && b.geom`. Pourquoi cette écriture risque-t-elle d'être lente même si un index spatial existe sur a.geom ?",
        solutionText: "La reprojection ST_Transform est appliquée à la volée, ligne par ligne, dans la clause WHERE : PostgreSQL compare alors une expression calculée à une valeur, ce qui empêche souvent l'utilisation de l'index existant sur la colonne brute. La reprojection devrait être faite une fois, en amont (stockée dans une colonne dédiée ou une vue matérialisée), pas répétée à chaque ligne comparée dans la requête.",
      },
      {
        prompt: "Pourquoi un simple fichier Shapefile ne peut-il pas garantir qu'aucune parcelle cadastrale ne chevauche une autre, contrairement à une base PostGIS avec un schéma topologique ?",
        solutionText: "Un Shapefile ne vérifie structurellement rien à l'écriture d'une entité : deux parcelles peuvent se chevaucher sans qu'aucune alerte ne soit levée. PostGIS Topology permet de définir des règles de cohérence géométrique (ex. absence de chevauchement) activement vérifiées et maintenues, capables de rejeter une géométrie incohérente dès son enregistrement plutôt que de découvrir le problème des mois plus tard en analyse.",
      },
    ],
  },
  "etudes-de-cas-sectorielles": {
    title: "Exercices : Les Secteurs",
    intro: "Trois questions courtes pour vérifier les bases avant de continuer.",
    exercises: [
      {
        prompt: "Une carte de vigueur agricole en 4 classes est produite à partir d'un unique NDVI Sentinel-2, sans autre donnée. Quelle limite méthodologique cela pose-t-il pour une vraie carte de préconisation ?",
        solutionText: "Un NDVI isolé ne distingue pas la cause d'une vigueur faible (stress hydrique, carence en azote, maladie, ou simplement un sol naturellement moins profond) : une préconisation agronomique fiable croise le NDVI avec un historique de rendement, une analyse de sol, ou une série temporelle plutôt qu'une image unique.",
      },
      {
        prompt: "Une commune calcule un ΔNDBI entre deux images d'été, dix ans d'écart, et détecte une forte hausse sur une zone qui n'a en réalité connu aucune construction nouvelle. Quelle vérification manquait probablement en amont ?",
        solutionText: "Vérifier que les deux images sont réellement comparables : même saison (déjà le cas ici), mais surtout correction atmosphérique appliquée aux deux dates et absence de différences d'humidité du sol ou de stress de végétation ponctuel pouvant faire varier le NDBI sans changement réel du bâti. Sans ce contrôle, un artefact radiométrique peut être confondu avec une vraie artificialisation.",
      },
      {
        prompt: "Deux communes voisines, en croisant les mêmes trois couches (aléa, enjeux, vulnérabilité) pour un risque incendie, obtiennent des cartes de priorisation très différentes. Est-ce nécessairement une erreur méthodologique ?",
        solutionText: "Pas nécessairement : chaque commune peut légitimement pondérer différemment les trois composantes selon son contexte réel (une commune avec beaucoup d'habitat isolé en forêt pondérera davantage la vulnérabilité). Ce qui doit être vérifié, ce n'est pas que les deux cartes soient identiques, mais que chaque pondération soit explicitement documentée et justifiée, condition nécessaire pour auditer ou comparer les deux résultats honnêtement.",
      },
    ],
  },
}
