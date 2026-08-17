import type { ContentBlock } from "./types"

export const travauxPratiquesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Chaque séance ci-dessous est autonome : elle peut constituer un TP complet à elle seule, avec son objectif, ses exercices à plusieurs niveaux, ses ressources et un corrigé dépliable. Elles sont néanmoins conçues pour s'enchaîner — en particulier les séances 2 et 3, qui réutilisent directement le résultat l'une de l'autre. Utilise le module La Méthode pour la structure attendue d'un compte-rendu ou d'un rapport, et le module Références pour les sources de données et de documentation. Le corrigé de chaque séance est volontairement masqué par défaut : chercher d'abord, comparer ensuite — c'est la vérification qui consolide l'apprentissage, pas la lecture seule de la réponse.",
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
    type: "solution",
    title: "Séance 1",
    text: "Une donnée numérique continue (population, superficie) se porte par la variable visuelle valeur (dégradé clair → foncé d'une même teinte) ou par la taille (ronds proportionnels), jamais par une palette de teintes qualitatives sans ordre — voir le module La Méthode, section sémiologie graphique. Une classification par quantiles (autant d'entités par classe) donne en général une carte plus lisible qu'une classification à intervalles égaux quand la donnée est très inégalement répartie (cas fréquent d'une population communale). Le CRS du projet doit afficher EPSG:2154 en bas à droite avant tout calcul de surface — sinon $area renvoie une valeur en degrés carrés, inexploitable.",
    items: [
      "Critère 1 : le CRS du projet est bien Lambert-93 (EPSG:2154), vérifié avant toute mesure",
      "Critère 2 : la variable visuelle choisie correspond au type de donnée (valeur/taille pour une quantité, teinte pour une catégorie)",
      "Critère 3 : la légende, l'échelle et l'orientation sont toutes trois présentes sur la mise en page finale",
    ],
  },
  {
    type: "link",
    to: "/references",
    label: "Ressources : data.gouv.fr, documentation QGIS",
    description: "Voir le thème « Géomatique, SIG et données géographiques » dans les Références.",
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Approfondir : la sémiologie graphique",
    description: "Le module La Méthode détaille les six variables visuelles de Bertin mobilisées pour choisir une symbologie.",
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
  {
    type: "solution",
    title: "Séance 2",
    text: "Sur une grille régulière sans rotation, une transformation affine à 6 points bien répartis donne typiquement un résidu par point inférieur à 1/100e de l'espacement réel de la grille (par exemple, moins de 20 m de résidu pour une grille DFCI espacée de 2 km) — un résidu du même ordre de grandeur que l'espacement de la grille signale presque toujours une erreur de lecture de coordonnée sur au moins un point, pas une limite de la méthode. Une transformation polynomiale d'ordre 2 avec seulement 4-6 points donne souvent un résidu affiché plus faible que l'affine, sans que ce soit un signe de meilleure qualité : c'est un sur-ajustement (le polynôme absorbe le bruit de pointage plutôt que la vraie distorsion), à éviter en dessous d'une dizaine de points de contrôle.",
    items: [
      "Critère 1 : au moins 6 GCP utilisés, répartis sur toute l'étendue de l'image (pas regroupés dans un coin)",
      "Critère 2 : le résidu par point, une fois la transformation calculée, reste très inférieur à l'espacement réel de la grille",
      "Critère 3 : le résultat est comparé à une couche de référence indépendante avant d'être considéré comme fiable",
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
    type: "solution",
    title: "Séance 3",
    text: "Un ΔNDVI se classe généralement en trois catégories à partir d'un seuil autour de ±0.05 à ±0.1 (au-delà de l'incertitude de mesure habituelle entre deux dates) : une variation plus faible que ce seuil est considérée stable, pas un vrai changement. Un ΔNDVI très négatif localisé (chute franche, au-delà de -0.3) sur une zone auparavant boisée est la signature typique d'une coupe rase ou d'un défrichement plutôt que d'un simple cycle saisonnier, qui produit rarement une chute aussi abrupte d'une date à l'autre si les deux images sont prises à la même saison.",
    items: [
      "Critère 1 : le NDVI est calculé sur l'image géoréférencée, pas sur l'image brute (position exploitable)",
      "Critère 2 : les deux dates comparées sont prises à une saison comparable, sinon le ΔNDVI mélange changement réel et cycle végétatif normal",
      "Critère 3 : un seuil explicite (documenté) sépare perte / stable / gain, plutôt qu'un découpage arbitraire",
    ],
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Revoir : indices composés et complexes",
    description: "Le module Les Couleurs détaille la logique des indices composés avant de les mettre en pratique ici.",
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
  {
    type: "solution",
    title: "Séance 4",
    text: "Une parcelle qui chevauche partiellement le buffer (et non entièrement) apparaît en plusieurs entités après l'intersection — une pour la portion dans le buffer, la géométrie d'origine de la parcelle n'est pas conservée telle quelle. C'est le comportement normal de l'outil Intersection, pas une erreur : sommer $area sur le résultat donne bien la surface réellement concernée par la contrainte, même pour les parcelles partiellement traversées.",
    items: [
      "Critère 1 : le buffer est créé sur une couche en CRS projeté métrique (EPSG:2154), jamais en degrés",
      "Critère 2 : le résultat de l'intersection contient une entité par portion de parcelle réellement recoupée par le buffer, pas par parcelle entière",
      "Critère 3 : la surface totale est calculée par somme de $area sur le résultat de l'intersection, pas sur la couche de parcelles d'origine",
    ],
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
    type: "solution",
    title: "Séance 5",
    text: "Exercice 1 : le piège le plus fréquent est d'oublier crs='EPSG:4326' à la construction du GeoDataFrame (les colonnes lon/lat n'étant que des nombres, GeoPandas ne devine jamais le CRS source) — sans cette précision, la reprojection ultérieure vers EPSG:2154 produit un résultat silencieusement faux, sans erreur levée. Exercice 2 : gdf.to_crs(epsg=2154).geometry.buffer(200).unary_union.area donne l'aire réellement couverte (chevauchements fusionnés) ; gdf.buffer(200).area.sum() surestime dès que deux buffers se recouvrent, ce qui est fréquent sur des points rapprochés. Exercice 3 : diviser par np.where(denominateur==0, 1, denominateur) ou utiliser un masque évite une division par zéro sur les pixels où NIR+Rouge = 0 (bordures de l'image, valeurs nodata). Exercice 4 : gdalinfo -stats ajoute les statistiques (min/max/moyenne/écart-type) aux métadonnées du fichier — utile pour repérer d'un coup d'œil un NDVI hors de l'intervalle [-1, 1], signe d'une erreur en amont.",
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
    type: "solution",
    title: "Séance 6",
    text: "Avec 4 classes bien choisies (spectralement distinctes : forêt, culture, bâti, eau) et des polygones d'entraînement propres, une précision globale de 80 à 95 % et un kappa supérieur à 0.75 sont des résultats typiques pour un premier essai. Un kappa nettement plus faible (< 0.6) signale le plus souvent l'une de ces trois causes, dans cet ordre de fréquence : des classes spectralement trop proches pour la résolution utilisée (ex. distinguer deux types de culture avec une seule date d'image), des polygones d'entraînement mal placés (à cheval sur deux classes), ou une confusion bâti/sol nu déjà repérée au module Les Couleurs — un NDBI en entrée du classifieur, en plus des bandes brutes, corrige souvent ce dernier cas.",
    items: [
      "Critère 1 : le jeu de test n'a jamais été montré au classifieur pendant l'entraînement (pas de fuite de données)",
      "Critère 2 : la matrice de confusion est présentée avant toute interprétation, comme un vrai rapport technique (voir module La Méthode)",
      "Critère 3 : les confusions les plus fréquentes de la matrice (hors diagonale) sont commentées, pas seulement le score global",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : classification supervisée et matrice de confusion",
    description: "Le module L'Intelligence détaille les méthodes de classification et les métriques d'évaluation avant de les pratiquer ici.",
  },

  { type: "heading", text: "Séance 7 : Classification par réseau de neurones simple", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Le module L'Intelligence détaille les CNN, U-Net et Transformers, mais la séance 6 n'a mis en pratique que des classificateurs classiques (maximum de vraisemblance, forêts aléatoires). Cette séance ferme cet écart avec le plus simple des réseaux de neurones — un perceptron multicouche (MLP) — sur les mêmes données qu'en séance 6, pour comparer directement sa précision à celle d'un Random Forest sur un pied d'égalité.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Constater par la pratique qu'un réseau de neurones, même simple, s'entraîne et s'évalue exactement selon le même protocole qu'un classificateur classique (train/validation/test, matrice de confusion, kappa) — la différence est dans le modèle, pas dans la méthodologie d'évaluation.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Reprendre le jeu d'entraînement/test de la séance 6 (mêmes polygones, même découpage train/test — condition indispensable pour une comparaison honnête)",
      "Entraîner un MLP à une couche cachée avec scikit-learn (MLPClassifier) sur les bandes brutes et/ou les indices calculés (NDVI, NDMI, NDBI) comme variables d'entrée",
      "Faire varier le nombre de neurones de la couche cachée (ex. 10, 50, 200) et observer l'effet sur la précision d'entraînement vs la précision de test (voir module L'Intelligence, sur-apprentissage)",
      "Comparer la matrice de confusion et le kappa obtenus à ceux du Random Forest de la séance 6, sur le même jeu de test",
      "Tracer la courbe de perte (loss) au fil des itérations d'entraînement (scikit-learn expose loss_curve_) pour vérifier qu'elle décroît puis se stabilise, sans jamais ré-augmenter (signe de sur-apprentissage si le suivi se fait aussi sur un jeu de validation)",
    ],
  },
  {
    type: "formula",
    label: "Entraîner un MLP avec scikit-learn",
    formula: "clf = MLPClassifier(hidden_layer_sizes=(50,), max_iter=500); clf.fit(X_train, y_train)",
    note: "X_train : tableau des bandes/indices par pixel ou par polygone d'entraînement ; y_train : la classe correspondante. Contrairement à un CNN complet (module L'Intelligence), ce MLP ne voit aucun voisinage spatial — chaque pixel est classé indépendamment de ses voisins, exactement comme le Random Forest de la séance 6. La différence de précision observée, si elle existe, vient donc uniquement de la capacité du modèle à combiner les variables d'entrée, pas d'une information spatiale supplémentaire.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un réseau de neurones n'est pas automatiquement meilleur",
    text: "Sur un jeu de données petit (quelques centaines à quelques milliers de pixels d'entraînement), un MLP fait souvent moins bien qu'un Random Forest, qui généralise mieux avec peu de données. L'avantage des réseaux profonds apparaît surtout à grande échelle (des dizaines de milliers d'exemples, ou l'exploitation du voisinage spatial par un vrai CNN) — un résultat \"décevant\" du MLP sur cette séance n'est donc pas une erreur, c'est une observation empirique cohérente avec la théorie du module L'Intelligence.",
  },
  {
    type: "solution",
    title: "Séance 7",
    text: "Sur un jeu de quelques centaines de polygones d'entraînement typique de cette séance, un MLP à 50 neurones cachés obtient généralement une précision proche (± quelques points) de celle du Random Forest de la séance 6, parfois légèrement en dessous — cohérent avec l'avertissement ci-dessus. Un MLP à 200 neurones cachés sur ce même petit jeu de données montre souvent un écart croissant entre précision d'entraînement (qui monte vers 100 %) et précision de test (qui stagne ou baisse) : c'est un surapprentissage direct, observable sur la courbe de perte qui continue de décroître sur l'entraînement bien après que la précision de test a cessé de s'améliorer.",
    items: [
      "Critère 1 : le même découpage train/test que la séance 6 est réutilisé à l'identique (comparaison valide)",
      "Critère 2 : la courbe de perte est tracée et commentée, pas seulement le score final",
      "Critère 3 : un écart de précision entre MLP et Random Forest est interprété (taille du jeu de données, absence de contexte spatial), pas seulement constaté",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : réseaux de neurones et sur-apprentissage",
    description: "Le module L'Intelligence détaille la fonction de perte, le sur-apprentissage et les architectures plus avancées (CNN, U-Net) que cette séance ne fait qu'effleurer avec un MLP simple.",
  },

  { type: "heading", text: "Séance 8 : Radar et interpolation spatiale", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Deux techniques présentées en théorie (module Le Regard pour le SAR, module Le Compas pour le krigeage) mais jamais pratiquées jusqu'ici. Cette séance les met en œuvre séparément, sur des données réelles.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger une scène Sentinel-1 (niveau GRD, Ground Range Detected) sur la même zone qu'une image Sentinel-2 déjà utilisée dans une séance précédente, via Copernicus Data Space Ecosystem",
      "Charger la scène dans QGIS, afficher la polarisation VV en niveaux de gris, puis comparer visuellement une zone en eau libre (signal faible, sombre) à une zone urbaine (signal fort, claire) — confirmer à l'œil ce que la section réflexion spéculaire/double-rebond du module Le Regard prédit",
      "Sur un jeu de points de mesure ponctuels (ex. relevés de température ou de pluviométrie d'un réseau de stations, ou à défaut un sous-échantillon aléatoire de pixels NDVI comme substitut pédagogique), calculer un variogramme expérimental (plugin QGIS SAGA ou script Python avec la bibliothèque scikit-gstat)",
      "Ajuster un modèle théorique (sphérique ou exponentiel) sur ce variogramme, puis interpoler par krigeage ordinaire sur toute l'emprise",
      "Comparer visuellement la carte krigée à une simple interpolation IDW (Inverse Distance Weighting) sur les mêmes points — et comparer la carte de variance de krigeage à la simple distance au point le plus proche",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi comparer à l'IDW plutôt qu'accepter le krigeage sans recul",
    text: "L'IDW et le krigeage donnent souvent des cartes de valeurs visuellement proches sur un jeu de points bien réparti — la vraie valeur ajoutée du krigeage n'est pas toujours flagrante sur la carte de valeurs elle-même. C'est la carte de variance de krigeage (que l'IDW ne produit pas) qui révèle l'apport réel : elle montre explicitement où l'estimation est fiable (près des points de mesure) et où elle ne l'est pas (zones peu échantillonnées) — une information absente de toute interpolation déterministe.",
  },
  {
    type: "solution",
    title: "Séance 8",
    text: "Sur la scène Sentinel-1 : une surface en eau calme apparaît nettement plus sombre en VV qu'une zone bâtie, qui ressort au contraire très brillante (effet de coin, double rebond façade/sol) — un contraste souvent plus net et plus rapide à lire que sur l'image optique correspondante, en particulier si celle-ci comporte des nuages ce jour-là. Sur le variogramme : un effet de pépite élevé par rapport au palier signale un point de mesure bruité ou une variabilité à une échelle plus fine que l'espacement du réseau de points — dans ce cas, le krigeage doit être interprété avec prudence quel que soit le modèle ajusté.",
    items: [
      "Critère 1 : le contraste eau/bâti en polarisation VV est identifié et relié à la physique de rétrodiffusion (module Le Regard), pas seulement décrit visuellement",
      "Critère 2 : le variogramme expérimental est ajusté avec un modèle théorique explicite (sphérique/exponentiel), pas laissé brut",
      "Critère 3 : la carte de variance de krigeage est produite et interprétée, pas seulement la carte de valeurs interpolées",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : géostatistique et krigeage",
    description: "Le module Le Compas détaille le variogramme et la théorie du krigeage avant de les pratiquer ici.",
  },

  { type: "heading", text: "Séance 9 : Étude de cas et mini-projet final", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Les huit séances précédentes traitent chacune une compétence isolée. Le mini-projet les combine toutes, au service d'une vraie question. Quatre familles de sujets reviennent le plus souvent :",
  },
  {
    type: "list",
    items: [
      "Risques naturels : croiser indices d'humidité/de végétation, pente et vent pour cartographier un risque incendie (voir le module Les Couleurs pour un exemple réel d'indice composite de comportement du feu)",
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
    type: "solution",
    title: "Séance 9 — grille d'auto-évaluation du rendu",
    items: [
      "La carte a un titre problématisé (pas un simple intitulé du sujet) — voir module La Méthode, section croquis",
      "La légende est organisée en rubriques logiques, pas une liste de symboles dans l'ordre de création",
      "Chaque figuré cartographique respecte la sémiologie de Bertin (variable adaptée au type de donnée qu'il porte)",
      "Le rapport sépare nettement résultats (cartes, chiffres) et discussion (limites, incertitude) — jamais mélangés dans le même paragraphe",
      "Les sources de données (capteur, date, résolution) sont documentées, pas seulement citées de mémoire",
      "Au moins une limite du résultat est explicitement discutée (résolution, incertitude, hypothèse simplificatrice)",
    ],
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Structurer le rapport rendu",
    description: "Le module La Méthode détaille la structure attendue d'un rapport technique (contexte, données et méthode, résultats, discussion, recommandations) et la sémiologie graphique d'une carte de synthèse.",
  },
]
