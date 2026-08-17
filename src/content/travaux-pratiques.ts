import type { ContentBlock } from "./types"

export const travauxPratiquesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Chaque séance ci-dessous est autonome : elle peut constituer un TP complet à elle seule, avec son objectif, ses exercices à plusieurs niveaux et ses ressources. Elles sont néanmoins conçues pour s'enchaîner — en particulier les séances 2 et 3, qui réutilisent directement le résultat l'une de l'autre. Utilise le module La Méthode pour la structure attendue d'un compte-rendu ou d'un rapport, et le module Références pour les sources de données et de documentation.",
  },
  {
    type: "diagram",
    name: "workflow-tp",
    caption: "Le fil directeur des séances : de la donnée brute géoréférencée jusqu'à la carte de synthèse et son rapport.",
  },

  { type: "heading", text: "Séance 1 : Cartographie de base sous QGIS", level: "college-lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Manipuler dans l'ordre les quatre gestes de base de tout projet SIG : charger une donnée, vérifier son système de coordonnées, la styliser selon un attribut, la mettre en page pour la communiquer. Ce sont les gestes qui reviennent dans toutes les séances suivantes.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger un jeu de données vecteur public (ex. limites communales sur data.gouv.fr, format GeoJSON ou Shapefile)",
      "Charger la couche dans QGIS (glisser-déposer, ou Couche > Ajouter une couche)",
      "Vérifier le CRS du projet et le reprojeter en EPSG:2154 (Lambert-93) si nécessaire",
      "Ouvrir la table attributaire, identifier un champ numérique pertinent (ex. population, superficie)",
      "Appliquer une symbologie graduée sur ce champ (Propriétés de la couche > Symbologie > Graduée), en choisissant une variable visuelle cohérente avec la nature de la donnée (voir module La Méthode, sémiologie graphique)",
      "Ajouter une légende, une échelle et une flèche du nord via la mise en page d'impression",
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "Découverte",
        points: ["Une seule couche, une seule classe de symbologie", "Légende et échelle suffisent pour valider la séance"],
      },
      {
        label: "Approfondissement",
        points: ["Superposer une deuxième couche (ex. cours d'eau) avec sa propre symbologie", "Justifier par écrit le choix de la palette de couleur (voir module La Méthode, critique du document)"],
      },
    ],
  },
  {
    type: "link",
    to: "/references",
    label: "Ressources : data.gouv.fr, documentation QGIS",
    description: "Voir le thème « Géomatique, SIG et données géographiques » dans les Références.",
  },

  { type: "heading", text: "Séance 2 : Géoréférencer une image par grille", level: "superieur" },
  {
    type: "paragraph",
    text: "Une image scannée ou une photo aérienne ancienne n'a, à l'origine, aucune coordonnée : ses pixels ne sont repérés que par leur ligne et leur colonne. La géoréférencer, c'est établir la correspondance entre ces pixels et de vraies coordonnées terrain — une compétence indispensable pour exploiter n'importe quelle archive cartographique ou image non géoréférencée.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Comprendre qu'un géoréférencement n'est fiable que s'il s'appuie sur des points de contrôle (GCP) à coordonnées réelles certaines — jamais sur un calage approximatif « à l'œil » contre un fond de carte.",
  },
  {
    type: "paragraph",
    text: "La méthode la plus fiable quand aucun repère topographique clair n'est disponible : utiliser une grille de coordonnées déjà imprimée sur le document (grille DFCI, grille Lambert, quadrillage kilométrique). Chaque intersection de la grille est un point de contrôle dont la coordonnée réelle se lit directement sur les codes affichés en marge.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Repérer sur l'image au moins 6 à 8 intersections de la grille, réparties sur toute l'étendue du document (pas seulement dans un coin)",
      "Lire la coordonnée réelle de chaque intersection à partir des codes de la grille imprimée",
      "Dans QGIS, ouvrir le Géoréférenceur (Raster > Géoréférencement), placer un point de contrôle sur chaque intersection repérée et saisir sa coordonnée réelle",
      "Choisir une transformation adaptée (une transformation affine linéaire suffit si la grille est régulière et sans rotation notable ; une transformation polynomiale d'ordre 2 ou plus absorbe une distorsion non linéaire, au prix d'un risque de sur-ajustement si peu de points sont disponibles)",
      "Lancer le géoréférencement et vérifier le résidu affiché par point : il doit rester très inférieur à l'espacement réel de la grille",
      "Exporter le raster géoréférencé (GeoTIFF, EPSG:2154)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Vérifier, ne pas supposer",
    text: "Un géoréférencement peut sembler correct visuellement tout en étant décalé de plusieurs dizaines de mètres. Toujours comparer le résultat à une couche de référence connue et indépendante (ex. un réseau routier ou une grille administrative déjà géoréférencée) avant de considérer l'image comme fiable — c'est la même logique de contrôle indépendant que la RMSE présentée au module Le Compas.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Découverte",
        points: ["4 points de contrôle sur une grille bien visible et régulière", "Transformation affine simple"],
      },
      {
        label: "Avancé",
        points: ["Grille partiellement illisible : combiner points de grille et repères topographiques identifiables", "Comparer deux transformations (affine vs polynomiale) et justifier laquelle convient le mieux, résidu par résidu"],
      },
    ],
  },

  { type: "heading", text: "Séance 3 : De l'image géoréférencée à l'indice composé", level: "superieur" },
  {
    type: "paragraph",
    text: "Cette séance part directement du résultat de la séance 2 : une image auparavant sans coordonnées, maintenant géoréférencée. Trois étapes progressives, du calcul le plus simple au plus complexe.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Calculer le NDVI sur l'image nouvellement géoréférencée (calculatrice raster, voir module Le Regard/Les Couleurs pour la formule) — sans géoréférencement préalable, ce calcul produirait un résultat exact en valeur mais inutilisable en position",
      "Superposer une grille régulière (fishnet) sur l'emprise de l'image et calculer, pour chaque cellule, la moyenne du NDVI qu'elle contient (Vecteur > Analyse > Statistiques de zone, ou l'outil « Statistiques de zone » du menu Raster — voir module Le Compas, section algèbre raster)",
      "Répéter le géoréférencement et le calcul de NDVI sur une seconde image de la même zone, prise à une date différente",
      "Composer un indice complexe à partir des deux dates : ΔNDVI = NDVI(date 2) − NDVI(date 1), qui met en évidence les zones de changement plutôt que l'état à un instant donné",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi passer par la cellule plutôt que le pixel seul",
    text: "Une moyenne par cellule lisse le bruit pixel-à-pixel et rend le résultat directement comparable à une grille administrative ou réglementaire (commune, parcelle, zone de gestion) — c'est la même logique que les statistiques zonales utilisées dans un vrai projet de suivi de territoire.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Intermédiaire",
        points: ["NDVI sur l'image géoréférencée + moyenne par cellule d'une grille fournie"],
      },
      {
        label: "Avancé",
        points: ["Les deux dates, le ΔNDVI complet, et une carte finale classant les cellules en trois catégories (perte, stable, gain de végétation)"],
      },
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : indices composés et complexes",
    description: "Le module L'Intelligence détaille la logique des indices composés avant de les mettre en pratique ici.",
  },

  { type: "heading", text: "Séance 4 : Analyse spatiale, buffer et intersection", level: "college-lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Répondre à une vraie question spatiale (« quelles parcelles sont concernées par telle contrainte ? ») en enchaînant deux opérations plutôt qu'en cherchant une réponse à l'œil sur la carte.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger une couche de cours d'eau et une couche de parcelles (ou bâtiments) sur une même zone",
      "Créer un buffer de 200 m autour des cours d'eau (Vecteur > Outils de géotraitement > Tampon)",
      "Intersecter ce buffer avec la couche de parcelles (Vecteur > Outils de géotraitement > Intersection)",
      "Ouvrir la table attributaire du résultat : chaque entité correspond à une parcelle (ou portion) située dans la zone tampon",
      "Calculer la surface totale concernée (Champ calculé : $area, après vérification du CRS en mètres)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Erreur fréquente",
    text: "Un buffer de \"200\" appliqué sur une couche en EPSG:4326 (degrés) produira une zone tampon de 200 degrés, pas 200 mètres. Toujours vérifier que la couche est en système projeté métrique avant de créer un buffer en mètres.",
  },

  { type: "heading", text: "Séance 5 : Programmation géospatiale simple", level: "superieur" },
  {
    type: "paragraph",
    text: "Quatre exercices courts, indépendants, qui couvrent les besoins les plus fréquents en géographie et télédétection : lire/transformer une donnée vecteur, mesurer, automatiser un calcul raster répétitif, et interroger une donnée en ligne de commande sans passer par une interface graphique.",
  },
  {
    type: "formula",
    label: "Exercice 1 (découverte) : d'un CSV à une carte",
    formula: "gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs='EPSG:4326')",
    note: "Charger un CSV de points (colonnes lon/lat), le convertir en GeoDataFrame, le reprojeter en EPSG:2154, puis l'exporter en GeoJSON.",
  },
  {
    type: "formula",
    label: "Exercice 2 (intermédiaire) : mesurer avec Shapely/GeoPandas",
    formula: "gdf['buffer_200m'] = gdf.to_crs(epsg=2154).geometry.buffer(200)",
    note: "Reprendre le GeoDataFrame de l'exercice 1, créer un buffer de 200 m autour de chaque point, puis calculer l'aire cumulée de tous les buffers (attention aux chevauchements, non gérés par une simple somme — utiliser gdf.unary_union avant de mesurer l'aire réelle couverte).",
  },
  {
    type: "formula",
    label: "Exercice 3 (avancé) : automatiser un calcul NDVI par lot",
    formula: "for red, nir in zip(sorted(glob('*_B04.tif')), sorted(glob('*_B08.tif'))): ndvi = (read(nir) - read(red)) / (read(nir) + read(red))",
    note: "Avec rasterio : parcourir un dossier contenant plusieurs paires de bandes rouge/NIR, calculer le NDVI de chacune, et enregistrer chaque résultat sous un nom dérivé du fichier source — la base de tout traitement par lot en télédétection.",
  },
  {
    type: "formula",
    label: "Exercice 4 (découverte) : inspecter une donnée en ligne de commande avec GDAL",
    formula: "ogrinfo -al -so parcelles.gpkg   ·   gdalinfo -stats sentinel2_ndvi.tif",
    note: "GDAL/OGR (la bibliothèque sur laquelle repose la quasi-totalité des logiciels SIG, dont QGIS) fournit des utilitaires en ligne de commande pour inspecter rapidement une couche sans l'ouvrir dans une interface graphique : ogrinfo pour le vecteur (nombre d'entités, CRS, champs), gdalinfo pour le raster (dimensions, résolution, statistiques par bande). Un réflexe utile pour vérifier une donnée avant de l'intégrer à un traitement automatisé plus long.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : PyQGIS et GeoPandas",
    description: "Le module Le Compas présente ces deux approches avant de les pratiquer ici.",
  },

  { type: "heading", text: "Séance 6 : Classification supervisée et évaluation de précision", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Aller jusqu'au bout d'une classification : constituer des échantillons d'entraînement représentatifs, entraîner un classifieur, puis évaluer honnêtement sa précision — l'étape la plus souvent négligée dans un premier projet de classification.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Digitaliser des polygones d'entraînement pour 3 à 4 classes (ex. forêt, culture, bâti, eau), répartis sur toute l'emprise de l'image, en s'appuyant sur la photo-interprétation (voir module Le Regard, section 9)",
      "Réserver environ 30 % de ces polygones, mis de côté et jamais montrés au classifieur, pour servir de jeu de test indépendant (voir module L'Intelligence, section sur le sur-apprentissage)",
      "Entraîner une classification supervisée (SCP — Semi-Automatic Classification Plugin pour QGIS, ou un script scikit-learn en Python) sur le jeu d'entraînement uniquement",
      "Appliquer le classifieur à l'ensemble de l'image",
      "Construire la matrice de confusion entre la classification obtenue et le jeu de test réservé à l'étape 2, puis calculer la précision globale et le coefficient kappa (formules détaillées au module L'Intelligence)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais évaluer un modèle sur les données qui ont servi à l'entraîner",
    text: "Calculer la précision d'une classification sur les mêmes polygones que ceux utilisés pour l'entraîner donne un chiffre optimiste, souvent proche de 100 %, qui ne dit rien de la performance réelle du modèle sur le reste de l'image. C'est l'erreur méthodologique la plus grave et la plus fréquente en classification supervisée — voir la mise en garde sur la fuite de données au module L'Intelligence.",
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : classification supervisée et matrice de confusion",
    description: "Le module L'Intelligence détaille les méthodes de classification et les métriques d'évaluation avant de les pratiquer ici.",
  },

  { type: "heading", text: "Séance 7 : Étude de cas et mini-projet final", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Les six séances précédentes traitent chacune une compétence isolée. Le mini-projet les combine toutes, au service d'une vraie question. Quatre familles de sujets reviennent le plus souvent :",
  },
  {
    type: "list",
    items: [
      "Risques naturels : croiser indices d'humidité/de végétation, pente et vent pour cartographier un risque incendie (voir le module L'Intelligence pour un exemple réel d'indice composite de comportement du feu)",
      "Agriculture de précision : suivi du NDVI d'une parcelle dans le temps pour cibler l'irrigation ou détecter un stress hydrique précoce",
      "Urbanisme : NDBI et séries temporelles pour mesurer l'étalement urbain d'une commune sur dix ans",
      "Climat et environnement : détection de changement (déforestation, recul d'un glacier) par comparaison de deux dates, comme en séance 3",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Cahier des charges du mini-projet",
    text: "Choisir un territoire et l'une des quatre familles ci-dessus. Produire une carte finale qui combine au minimum : une donnée vecteur, une donnée raster ou un indice spectral calculé, et au moins une analyse spatiale (buffer, intersection ou jointure spatiale). Le rendu attendu est une carte mise en page (légende organisée, échelle, source des données, sémiologie graphique justifiée) accompagnée d'un court rapport structuré selon le module La Méthode.",
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Structurer le rapport rendu",
    description: "Le module La Méthode détaille la structure attendue d'un rapport technique (contexte, données et méthode, résultats, discussion, recommandations) et la sémiologie graphique d'une carte de synthèse.",
  },
]
