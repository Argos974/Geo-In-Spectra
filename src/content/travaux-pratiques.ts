import type { ContentBlock } from "./types"

export const travauxPratiquesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "L'Atelier propose trois pistes indépendantes de douze séances chacune, un semestre par piste : Lycée (socle, guidé, sans code), Licence/BUT (technique, Python, livrable professionnel) et Master/Recherche (rigueur statistique, IMRaD, techniques avancées). Choisis un seul niveau dans le filtre « Afficher » ci-dessus pour ne voir que les douze séances de ta piste, dans l'ordre. Chaque séance est autonome (objectif, étapes, corrigé dépliable), mais les séances d'une même piste s'enchaînent, en particulier quand l'une réutilise directement le résultat de la précédente. Utilise le module La Méthode pour la structure attendue d'un compte-rendu ou d'un rapport, et le module Références pour les sources de données et de documentation. Le corrigé de chaque séance est volontairement masqué par défaut : chercher d'abord, comparer ensuite, c'est la vérification qui consolide l'apprentissage, pas la lecture seule de la réponse.",
  },
  {
    type: "diagram",
    name: "workflow-tp",
    caption: "Le fil directeur des séances : de la donnée brute géoréférencée jusqu'à la carte de synthèse et son rapport.",
  },

  { type: "heading", text: "Le jeu de données canonique : une vraie scène Sentinel-2" },
  {
    type: "paragraph",
    text: "Plutôt que de renvoyer vers « télécharge une image quelque part », de nombreuses séances des trois pistes s'appuient sur un même jeu de données réel, extrait directement de l'archive Copernicus et fourni avec le site : une scène Sentinel-2 authentique, quasiment sans nuage, sur une emprise de 3,2 × 3,3 km à Vitrolles (Bouches-du-Rhône), qui mélange volontairement bâti dense, infrastructure aéroportuaire, végétation de garrigue et une portion de l'étang de Berre, de quoi illustrer chaque indice du module Les Couleurs sur un seul et même territoire.",
  },
  {
    type: "imagepair",
    images: [
      {
        src: "/images/sample-vitrolles-2024-rgb.jpg",
        alt: "Composition colorée réelle (rouge/vert/bleu) de la scène Sentinel-2 du 6 août 2024 sur Vitrolles",
        label: "Composition couleur naturelle",
        caption: "Scène S2B_31TFJ_20240806_0_L2A (6 août 2024, 0.008 % de nuages). Étang de Berre en haut à gauche, tissu urbain de Vitrolles à droite, piste de l'aéroport Marseille-Provence en bas à gauche.",
      },
      {
        src: "/images/sample-vitrolles-2024-ndvi.jpg",
        alt: "NDVI réel calculé sur la même emprise, palette marron-blanc-vert",
        label: "NDVI calculé",
        caption: "Même image, formule du module Les Couleurs : le contraste végétation (vert) / bâti-piste-eau (blanc à marron) saute aux yeux sans interprétation nécessaire.",
      },
    ],
  },
  {
    type: "table",
    headers: ["Fichier", "Contenu"],
    rows: [
      ["sentinel2_2024-08-06_vitrolles_bands.tif", "6 bandes réelles en réflectance de surface (0–1) : bleu, vert, rouge, red-edge (B5), NIR, SWIR (B11), EPSG:2154, 10 m"],
      ["sentinel2_2024-08-06_vitrolles_indices.tif", "NDVI, NDMI, NDBI, NDRE, NDWI déjà calculés, en 5 bandes, pour vérifier un calcul plutôt que le refaire"],
      ["emprise.geojson", "Polygone exact de l'emprise, pour un découpage (clip) propre"],
      ["grille_100m_indices.geojson", "1122 cellules de 100 m avec la moyenne réelle de NDVI/NDMI/NDBI par cellule, résultat de référence utilisé dans plusieurs séances de géoréférencement et d'indices"],
      ["stats.json", "Statistiques réelles (min/max/moyenne/écart-type) de chaque indice sur toute l'emprise"],
      ["classification_reference.json", "Classification SCL réelle à 3 classes, découpage train/test et matrices de confusion Random Forest/MLP, référence pour les séances de classification (Licence/BUT et Master/Recherche)"],
    ],
  },
  {
    type: "link",
    to: "/jeux-de-donnees",
    label: "Télécharger les 6 fichiers",
    description: "Page dédiée avec un lien de téléchargement direct par fichier, pas besoin de reconstituer l'URL à la main.",
  },
  {
    type: "formula",
    label: "Accès direct aux fichiers",
    formula: "/data/sample-vitrolles-2024/<nom-du-fichier>",
    note: "Les 6 fichiers du tableau ci-dessus sont aussi servis statiquement par le site à cette adresse relative (ex. /data/sample-vitrolles-2024/emprise.geojson), pratique pour les charger directement dans QGIS (Couche > Ajouter une couche) via l'URL complète du site, sans passer par un téléchargement local.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Origine et licence de cette image",
    text: "Scène S2B_31TFJ_20240806_0_L2A, extraite du catalogue public Sentinel-2 L2A hébergé sur AWS (Element84 Earth Search STAC, sentinel-cogs, accès direct sans authentification), les données sources proviennent du programme Copernicus de l'Union européenne et de l'ESA. Conformément à la politique de données Copernicus (libre, complète et gratuite), toute réutilisation doit porter la mention « Contains modified Copernicus Sentinel data [2024] ».",
  },
  {
    type: "callout",
    tone: "example",
    title: "Valeurs réelles de référence (calculées sur toute l'emprise)",
    text: "NDVI : moyenne 0.33, écart-type 0.30 (de -1.0 à 1.0 selon les pixels). NDMI : moyenne -0.09, écart-type 0.16. NDBI : moyenne +0.09 (symétrique du NDMI, comme attendu de la formule). NDRE : moyenne 0.16. NDWI : moyenne -0.47, cohérent avec un territoire majoritairement non aquatique, comportant une portion d'étang. Ces chiffres, pas des estimations, servent de repère pour vérifier un calcul personnel : un NDVI moyen très éloigné de 0.33 sur cette même emprise signale une erreur de calcul (mauvaises bandes, mauvais CRS, image non corrigée), pas une variante légitime.",
  },

  // ============================================================================
  // PISTE LYCÉE — 12 séances, socle, guidé, sans code. Progression : mécanique
  // SIG de base (1-4) → lecture d'image et indices simples (5-7) → communication
  // cartographique (8-11) → synthèse (12).
  // ============================================================================

  { type: "heading", text: "Séance Lycée 1 : Cartographie de base sous QGIS", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Manipuler dans l'ordre les quatre gestes de base de tout projet SIG : charger une donnée, vérifier son système de coordonnées, la styliser selon un attribut, la mettre en page pour la communiquer. Ce sont les gestes qui reviennent dans toutes les séances suivantes de cette piste.",
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
    type: "solution",
    title: "Séance Lycée 1",
    text: "Une donnée numérique continue (population, superficie) se porte par la variable visuelle valeur (dégradé clair → foncé d'une même teinte) ou par la taille (ronds proportionnels), jamais par une palette de teintes qualitatives sans ordre, voir le module La Méthode, section sémiologie graphique. Le CRS du projet doit afficher EPSG:2154 en bas à droite avant tout calcul de surface : sinon $area renvoie une valeur en degrés carrés, inexploitable.",
    items: [
      "Critère 1 : le CRS du projet est bien Lambert-93 (EPSG:2154), vérifié avant toute mesure",
      "Critère 2 : la variable visuelle choisie correspond au type de donnée (valeur/taille pour une quantité, teinte pour une catégorie)",
      "Critère 3 : la légende, l'échelle et l'orientation sont toutes trois présentes sur la mise en page finale",
    ],
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Approfondir : la sémiologie graphique",
    description: "Le module La Méthode détaille les six variables visuelles de Bertin mobilisées pour choisir une symbologie.",
  },
  {
    type: "devoir",
    format: "Carte",
    title: "Une carte thématique simple, sur une vraie donnée publique",
    prompt: "En reprenant exactement la méthode de cette séance (télécharger, vérifier le CRS, styliser, mettre en page), produis une carte de la répartition d'un indicateur au choix (population, superficie, densité…) sur les communes d'un département de ton choix, à partir d'un jeu de données réel de data.gouv.fr.",
    criteria: [
      "Le CRS du projet est vérifié et correspond à un système projeté métrique",
      "La variable visuelle (taille, valeur ou teinte) correspond au type de donnée représentée",
      "Légende, échelle et orientation figurent toutes trois sur la mise en page finale",
    ],
  },

  { type: "heading", text: "Séance Lycée 2 : Lire et localiser, les coordonnées Lambert-93", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Comprendre concrètement ce que veut dire une coordonnée projetée (module Fondements) en la manipulant réellement, avant de l'utiliser sans y penser dans toutes les séances suivantes.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Ouvrir QGIS, activer l'affichage des coordonnées de la souris en bas de l'écran, vérifier qu'elles sont bien en EPSG:2154 (valeurs à 6-7 chiffres, en mètres, pas en degrés)",
      "Placer un point sur une ville connue et relever ses coordonnées X/Y réelles",
      "Comparer ce point à sa coordonnée théorique (voir le jeu « Le Compas des Coordonnées », module Fondements)",
      "Créer trois points supplémentaires à des coordonnées données, sans repère visuel, uniquement à partir des chiffres (Couche > Créer une couche > Couche temporaire, saisie manuelle)",
    ],
  },
  { type: "game" },
  {
    type: "solution",
    title: "Séance Lycée 2",
    text: "En EPSG:2154, X croît vers l'est et Y croît vers le nord, l'origine du système est choisie loin au sud-ouest de la France pour que toutes les coordonnées réelles du territoire restent positives. Une coordonnée qui commence par un 6 en X correspond à peu près à la moitié ouest de la France, un 9 ou 10 à l'extrême est ou au sud-est (voir les valeurs réelles du jeu du Compas des Coordonnées).",
    items: [
      "Critère 1 : les coordonnées affichées dans QGIS sont bien en EPSG:2154, pas en degrés",
      "Critère 2 : les trois points saisis sans repère visuel tombent au bon endroit une fois affichés sur un fond de carte",
    ],
  },
  {
    type: "devoir",
    format: "Exercice noté",
    title: "Localiser cinq villes à partir de leurs seules coordonnées",
    prompt: "Sans regarder aucune carte, place dans QGIS cinq points à partir de coordonnées Lambert-93 données par ton professeur ou trouvées toi-même (ex. sur cartes.gouv.fr). Une fois les cinq points placés, affiche un fond de carte et vérifie : chaque point tombe-t-il sur la bonne ville ?",
    criteria: [
      "Les cinq points sont saisis directement à partir des chiffres, sans triche visuelle préalable",
      "Le résultat est vérifié après coup contre un fond de carte réel",
    ],
  },

  { type: "heading", text: "Séance Lycée 3 : Vecteur ou raster, choisir la bonne donnée", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le module Fondements distingue vecteur et raster en théorie : cette séance fait manipuler les deux sur le même territoire pour rendre la différence concrète, pas seulement mémorisée.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger sentinel2_2024-08-06_vitrolles_bands.tif (raster, voir Ressources → Jeux de données) et une couche vecteur de bâtiments ou de parcelles sur la même zone",
      "Zoomer fortement sur les deux couches : observer que le raster se pixellise (grille régulière de valeurs) alors que le vecteur garde des contours nets quel que soit le zoom",
      "Mesurer la surface d'un même bâtiment de deux façons : $area sur le polygone vecteur, puis comptage de pixels × résolution sur le raster",
      "Lister, pour trois cas concrets (une limite de commune, la température d'une zone, un réseau routier), quel format est le plus adapté et pourquoi",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 3",
    text: "Le vecteur convient à une donnée qui a des limites nettes et un sens discret (une commune, un bâtiment, une route) ; le raster convient à un phénomène continu mesuré partout de la même façon (une température, une réflectance, une altitude). Les deux mesures de surface (vecteur exact vs comptage de pixels) diffèrent légèrement : c'est normal, la résolution du raster (10 m ici) introduit une marge d'erreur sur les contours que le vecteur n'a pas.",
    items: [
      "Critère 1 : les deux mesures de surface sont réellement effectuées et comparées, pas seulement l'une des deux",
      "Critère 2 : le choix vecteur/raster pour les trois cas est justifié, pas seulement affirmé",
    ],
  },
  {
    type: "link",
    to: "/module/fondamentaux",
    label: "Revoir : vecteur vs raster",
    description: "Le module Fondements détaille cette distinction avant de la pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Tableau comparatif",
    title: "Vecteur ou raster pour cinq données réelles",
    prompt: "Pour cinq données géographiques de ton choix (autres que les exemples de la séance), indique dans un tableau si chacune est naturellement vecteur ou raster, et justifie en une phrase.",
    criteria: [
      "Les cinq choix sont majoritairement corrects",
      "Chaque justification s'appuie sur la nature de la donnée (discrète/continue), pas sur une habitude logicielle",
    ],
  },

  { type: "heading", text: "Séance Lycée 4 : Buffer et intersection, une contrainte réglementaire simple", level: "lycee" },
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
    title: "Séance Lycée 4",
    text: "Une parcelle qui chevauche partiellement le buffer (et non entièrement) apparaît en plusieurs entités après l'intersection : une pour la portion dans le buffer, la géométrie d'origine de la parcelle n'est pas conservée telle quelle. C'est le comportement normal de l'outil Intersection, pas une erreur.",
    items: [
      "Critère 1 : le buffer est créé sur une couche en CRS projeté métrique (EPSG:2154), jamais en degrés",
      "Critère 2 : le résultat de l'intersection contient une entité par portion de parcelle réellement recoupée, pas par parcelle entière",
      "Critère 3 : la surface totale est calculée par somme de $area sur le résultat de l'intersection",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : buffer, intersection et opérations spatiales",
    description: "Le module Le Compas détaille les opérations spatiales mobilisées dans cette séance, avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Carte",
    title: "Carte d'une contrainte réglementaire réelle, buffer + intersection",
    prompt: "Choisis une contrainte réglementaire réelle basée sur une distance (bande de 200 m autour d'un cours d'eau, périmètre de protection autour d'un monument…) sur un territoire de ton choix. Produis une carte qui montre la zone tampon et les parcelles concernées, avec une légende qui distingue les entités entièrement incluses de celles seulement partiellement recoupées.",
    criteria: [
      "Le buffer est calculé sur une couche projetée métrique, la distance correspond à une vraie contrainte nommée et sourcée",
      "La légende distingue visuellement les deux cas (entièrement/partiellement inclus)",
      "La surface totale concernée est indiquée sur la carte ou dans le texte d'accompagnement",
    ],
  },

  { type: "heading", text: "Bonus : la même question, sur une donnée vivante" },
  {
    type: "paragraph",
    text: "Le jeu de données canonique (bâti, végétation, eau) est une photographie figée au 06/08/2024. OpenStreetMap couvre la même emprise exacte, mais c'est une donnée vivante (VGI, volunteered geographic information) : n'importe quel contributeur peut la corriger ou la compléter à tout moment. Le bloc ci-dessous interroge l'API Overpass en direct, au moment où tu charges cette page, pas une capture figée à l'avance.",
  },
  { type: "live", name: "osm-buffer-vitrolles", caption: "Planche vivante. Mêmes bornes géographiques que l'emprise Sentinel-2 canonique, comptées en direct sur OpenStreetMap." },
  {
    type: "callout",
    tone: "example",
    title: "Consigne",
    text: "Note le nombre de bâtiments affiché. Recharge la page dans quelques minutes (bouton « Rafraîchir ») : le chiffre a-t-il changé ? Compare ensuite ce nombre à ta propre lecture visuelle du bâti sur l'image Sentinel-2 vue plus haut, te semble-t-il cohérent, ou la couverture OSM te paraît-elle nettement incomplète sur cette zone précise ?",
  },
  {
    type: "solution",
    title: "Bonus",
    text: "Il n'y a volontairement pas de nombre \"correct\" à retenir ici : c'est le point de l'exercice. Si le nombre de bâtiments OSM est proche de ta lecture visuelle, la zone est bien cartographiée par la communauté. S'il est nettement inférieur, tu viens de mettre en évidence une limite réelle et fréquente des données participatives (VGI) : une complétude très inégale selon les zones, contrairement à un jeu de données satellite qui couvre uniformément tout le territoire.",
  },

  { type: "heading", text: "Séance Lycée 5 : Lire une image satellite à l'œil, la photo-interprétation", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Avant tout calcul d'indice, savoir lire une image à l'œil reste une compétence à part entière (module Le Regard, section 9) : les six clés classiques de la photo-interprétation, appliquées à une vraie image.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger la composition couleur naturelle du jeu de données Vitrolles (voir Ressources → Jeux de données)",
      "Identifier, une par une, les six clés de lecture sur l'image : texture, teinte, ombre portée, motif, association/contexte, forme (voir module Le Regard, section 9)",
      "Pour chaque clé, noter au moins un exemple précis localisé sur l'image (ex. « motif régulier » = rangées d'arbres visibles au sud-est)",
      "Rédiger une légende commentée de l'image en dix lignes maximum, une clé de lecture par ligne",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 5",
    text: "Sur cette image, la piste de l'aéroport Marseille-Provence est reconnaissable par sa texture lisse et sa forme allongée régulière (motif), le tissu urbain de Vitrolles par sa texture grenue et son association à un réseau routier visible, la garrigue environnante par sa texture irrégulière et sa teinte verte à brune hétérogène.",
    items: [
      "Critère 1 : les six clés sont toutes mobilisées, pas seulement la teinte (la plus facile)",
      "Critère 2 : chaque clé est illustrée par un exemple localisé précis sur l'image, pas une généralité",
    ],
  },
  {
    type: "link",
    to: "/module/teledetection",
    label: "Revoir : la photo-interprétation",
    description: "Le module Le Regard détaille les six clés de lecture classiques mobilisées ici.",
  },
  {
    type: "devoir",
    format: "Légende commentée",
    title: "Légende commentée d'une image satellite au choix",
    prompt: "Choisis une autre image satellite (une capture d'écran de cartes.gouv.fr ou Google Maps en vue satellite suffit) d'un lieu que tu connais. Rédige sa légende commentée selon les six clés de lecture, comme en séance.",
    criteria: [
      "Les six clés sont mobilisées",
      "Chaque observation est localisée précisément sur l'image, pas générale",
    ],
  },

  { type: "heading", text: "Séance Lycée 6 : Calculer et lire un NDVI", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Calculer le NDVI une première fois, sur une seule date, pour comprendre la mécanique de la formule (module Les Couleurs) avant toute complication (comparaison de dates, seuils de classification).",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger sentinel2_2024-08-06_vitrolles_bands.tif (voir Ressources → Jeux de données)",
      "Ouvrir la calculatrice raster de QGIS (Raster > Calculatrice raster)",
      "Saisir la formule NDVI = (NIR − Rouge) / (NIR + Rouge) en utilisant les bandes correspondantes du fichier",
      "Appliquer une palette de couleur divergente (marron → blanc → vert) centrée sur 0",
      "Comparer visuellement le résultat à la composition couleur naturelle de la même zone",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 6",
    text: "Le NDVI moyen réel sur cette emprise est de 0.33 (voir le callout « Valeurs réelles de référence » en tête de module) : un NDVI très éloigné de cette valeur sur le même fichier signale une erreur de formule (mauvaises bandes, division par zéro non gérée), pas une variante légitime. La végétation apparaît en vert, le bâti et la piste d'aéroport en blanc à marron, l'eau de l'étang de Berre proche de zéro ou légèrement négative.",
    items: [
      "Critère 1 : la formule utilise bien les bandes NIR et Rouge, pas une autre paire",
      "Critère 2 : le NDVI moyen obtenu est cohérent avec la valeur réelle de référence (0.33)",
    ],
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Revoir : la formule du NDVI",
    description: "Le module Les Couleurs détaille l'origine et la lecture du NDVI avant de le calculer ici.",
  },
  {
    type: "devoir",
    format: "Carte",
    title: "Carte NDVI commentée",
    prompt: "Produis une carte NDVI mise en page (légende, échelle) de l'emprise Vitrolles, accompagnée de trois phrases qui identifient et expliquent les zones les plus vertes et les plus marron.",
    criteria: [
      "La palette utilisée est divergente et centrée sur 0, pas une palette arc-en-ciel non ordonnée",
      "Les trois phrases identifient des zones précises, pas des généralités",
    ],
  },

  { type: "heading", text: "Séance Lycée 7 : Repérer le bâti et l'eau, NDBI et NDWI", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le NDVI répond à « où est la végétation ? ». D'autres indices, construits sur le même principe (différence normalisée de deux bandes), répondent à d'autres questions : où est le bâti, où est l'eau.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Sur le même fichier que la séance précédente, calculer le NDBI = (SWIR − NIR) / (SWIR + NIR) (module Les Couleurs)",
      "Calculer le NDWI = (Vert − NIR) / (Vert + NIR)",
      "Comparer les trois cartes (NDVI, NDBI, NDWI) côte à côte sur les mêmes zones : la piste d'aéroport, le tissu urbain, l'étang de Berre",
      "Formuler une phrase pour chaque indice : quelle zone y ressort le plus nettement, et pourquoi (quelle bande domine dans la formule) ?",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 7",
    text: "Le NDBI moyen réel sur cette emprise est de +0.09 (symétrique du NDMI, comme attendu de la formule), il ressort fortement positif sur la piste d'aéroport et le bâti dense. Le NDWI, moyenne réelle -0.47, cohérent avec un territoire majoritairement non aquatique, ne devient positif que sur l'étang de Berre lui-même.",
    items: [
      "Critère 1 : les deux formules utilisent les bonnes paires de bandes",
      "Critère 2 : chaque phrase relie la zone qui ressort à la bande dominante de la formule, pas une simple observation visuelle",
    ],
  },
  {
    type: "devoir",
    format: "Tableau",
    title: "Trois indices, trois cartes, un territoire",
    prompt: "Produis les trois cartes (NDVI, NDBI, NDWI) de l'emprise Vitrolles côte à côte, avec un tableau qui résume pour chacune : formule, bande dominante, zone qui ressort le plus nettement.",
    criteria: [
      "Les trois cartes utilisent des palettes cohérentes et lisibles",
      "Le tableau est correctement rempli pour les trois indices",
    ],
  },

  { type: "heading", text: "Séance Lycée 8 : Mettre en page une carte, légende et sémiologie", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Une carte techniquement correcte peut rester illisible si sa mise en page ne respecte pas la sémiologie graphique de Bertin (module La Méthode). Cette séance porte uniquement sur la communication, pas sur un nouveau calcul.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Reprendre une carte déjà produite dans une séance précédente (NDVI, NDBI, ou la carte thématique de la séance 1)",
      "Identifier la variable visuelle utilisée (taille, valeur, teinte, forme) et vérifier qu'elle correspond au type de donnée (module La Méthode, section 4)",
      "Organiser la légende par rubriques logiques plutôt que dans l'ordre de création des couches",
      "Ajouter un titre qui répond à une question, pas un simple intitulé technique (« Répartition du NDVI » plutôt que « NDVI »)",
      "Exporter la mise en page en PDF, vérifier qu'elle reste lisible imprimée en noir et blanc si possible",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 8",
    text: "L'erreur sémiologique la plus commune est d'utiliser une palette de teintes qualitatives (rouge puis bleu puis vert) pour une donnée ordonnée : l'œil ne perçoit pas d'ordre naturel entre des teintes. Une donnée continue et ordonnée comme le NDVI doit toujours être portée par un dégradé de valeur (clair → foncé d'une même teinte, ou divergent autour d'un centre significatif), jamais par une succession de couleurs sans ordre perceptif.",
    items: [
      "Critère 1 : la variable visuelle correspond bien au type de donnée représentée",
      "Critère 2 : le titre répond à une question, pas un simple intitulé technique",
      "Critère 3 : la légende est organisée par rubriques, pas dans l'ordre de création",
    ],
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Revoir : la sémiologie graphique de Bertin",
    description: "Le module La Méthode détaille les six variables visuelles avant de les appliquer ici.",
  },
  {
    type: "devoir",
    format: "Carte",
    title: "Refonte sémiologique d'une carte existante",
    prompt: "Reprends une carte produite dans une séance précédente et refais entièrement sa mise en page en appliquant strictement la sémiologie de Bertin. Joins une phrase qui explique ce qui a changé et pourquoi.",
    criteria: [
      "La nouvelle version corrige au moins un vrai défaut sémiologique de la version précédente",
      "La phrase d'explication justifie le changement par la sémiologie, pas par le goût personnel",
    ],
  },

  { type: "heading", text: "Séance Lycée 9 : Commenter un document cartographique", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Les séances précédentes produisent toutes un document. Celle-ci fait l'inverse : lire et commenter par écrit un document déjà produit, l'exercice le plus fréquent en épreuve de lycée (module La Méthode, section 1). Un commentaire de document n'est pas une description : c'est une lecture organisée qui répond à une problématique.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger la composition couleur naturelle et le NDVI du jeu de données Vitrolles (voir Ressources → Jeux de données)",
      "Identifier, sans aucun calcul, les grands ensembles visibles sur la composition naturelle : bâti, végétation, eau, infrastructure (séance Lycée 5)",
      "Comparer les mêmes zones sur le NDVI : formuler une problématique du type « le contraste bâti/végétation vu à l'œil se confirme-t-il, et se précise-t-il, une fois l'indice calculé ? »",
      "Rédiger un commentaire structuré (introduction avec problématique, deux ou trois parties, conclusion) qui répond à cette problématique, appuyé uniquement sur ce que montrent les deux documents",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "S'appuyer sur le document, pas sur une connaissance générale plaquée dessus",
    text: "L'erreur la plus fréquente d'un commentaire de document consiste à réciter une connaissance générale sur le NDVI sans jamais revenir au document précis fourni. Chaque affirmation doit pouvoir être localisée sur l'image, pas rester générale.",
  },
  {
    type: "solution",
    title: "Séance Lycée 9",
    text: "Sur ce jeu de données, la piste de l'aéroport Marseille-Provence et le tissu urbain de Vitrolles se distinguent nettement en blanc à marron sur le NDVI, cohérent avec la lecture à l'œil de la composition naturelle. L'étang de Berre apparaît en valeurs NDVI proches de zéro ou négatives, une nuance qu'une lecture purement visuelle ne permet pas de chiffrer aussi précisément. Un bon commentaire relève cette complémentarité : le NDVI ne remplace pas la lecture à l'œil, il la précise.",
    items: [
      "Critère 1 : la problématique figure explicitement en introduction",
      "Critère 2 : chaque affirmation renvoie à un endroit précis du document",
      "Critère 3 : la conclusion répond réellement à la problématique posée",
    ],
  },
  {
    type: "devoir",
    format: "Commentaire de document",
    title: "Commentaire structuré sur un document au choix",
    prompt: "En reprenant la méthode de cette séance, rédige un commentaire structuré (400 à 600 mots) sur la composition naturelle et le NDVI du jeu de données Vitrolles, ou sur un autre couple image/indice de ton choix issu d'une séance précédente.",
    criteria: [
      "Une problématique explicite figure en introduction et structure tout le commentaire",
      "Chaque partie s'appuie sur un élément localisable du document",
      "La longueur demandée (400-600 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance Lycée 10 : Une carte ancienne face à une image récente", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le module Fondements retrace la petite histoire de la cartographie (section 10) : cette séance confronte concrètement un document ancien à une donnée satellite actuelle, sur le même territoire.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Trouver une carte ancienne d'un territoire connu (carte de Cassini sur remonterletemps.ign.fr, ou une carte postale/plan ancien numérisé de ta commune)",
      "Charger, sur la même zone, une image satellite récente (Vitrolles, ou cartes.gouv.fr pour un autre territoire)",
      "Repérer au moins trois éléments présents sur la carte ancienne encore identifiables aujourd'hui (une route, un cours d'eau, un bâti ancien)",
      "Repérer au moins un changement majeur (urbanisation, disparition d'une zone agricole, nouvelle infrastructure)",
      "Rédiger un court texte qui date approximativement et explique ce changement",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 10",
    text: "Les éléments les plus stables dans le temps sont généralement le réseau hydrographique et les tracés routiers anciens (souvent conservés même urbanisés) ; les éléments les plus changeants sont l'occupation du sol elle-même (agricole → urbain) et les infrastructures récentes (aéroports, zones industrielles) qui n'existaient simplement pas sur un document ancien.",
    items: [
      "Critère 1 : les trois éléments stables identifiés sont réellement présents sur les deux documents",
      "Critère 2 : le changement identifié est expliqué, pas seulement constaté",
    ],
  },
  {
    type: "link",
    to: "/module/fondamentaux",
    label: "Revoir : petite histoire de la cartographie",
    description: "Le module Fondements retrace les grandes étapes de la cartographie avant cette confrontation pratique.",
  },
  {
    type: "devoir",
    format: "Texte comparatif",
    title: "Comparaison illustrée ancien/actuel",
    prompt: "Produis un document qui juxtapose la carte ancienne et l'image récente choisies, avec ton texte de comparaison (250 mots minimum).",
    criteria: [
      "Les deux documents sont juxtaposés de façon lisible, à échelle comparable",
      "Le texte identifie clairement continuité et changement, pas l'un sans l'autre",
    ],
  },

  { type: "heading", text: "Séance Lycée 11 : Le débat Mercator/Peters, mesurer une déformation", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le module Fondements présente le débat Mercator/Peters (section 12) : cette séance fait mesurer, pas seulement lire, l'ampleur réelle d'une déformation de projection.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Dans QGIS, afficher une couche mondiale des pays en projection Mercator (EPSG:3857) puis en projection équivalente (EPSG:8857, Equal Earth, ou une projection Peters approximée)",
      "Mesurer la surface réelle du Groenland et celle de l'Afrique (table attributaire ou $area, en reprojection appropriée pour une mesure de surface fiable)",
      "Comparer ce ratio réel à ce qu'en montre visuellement la projection Mercator",
      "Rédiger un court paragraphe qui prend position, avec les chiffres mesurés à l'appui, sur l'usage de Mercator comme carte scolaire par défaut",
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 11",
    text: "L'Afrique fait réellement environ 14 fois la surface du Groenland, alors qu'en projection Mercator les deux paraissent de taille quasi comparable sur une carte du monde standard : c'est l'exemple le plus souvent cité du débat Mercator/Peters, ici mesuré et non simplement affirmé.",
    items: [
      "Critère 1 : les deux surfaces sont réellement mesurées dans QGIS, pas recopiées d'une source externe sans vérification",
      "Critère 2 : le paragraphe final s'appuie explicitement sur les chiffres mesurés",
    ],
  },
  {
    type: "link",
    to: "/module/fondamentaux",
    label: "Revoir : le débat des projections",
    description: "Le module Fondements détaille les enjeux du choix d'une projection avant cette mesure pratique.",
  },
  {
    type: "devoir",
    format: "Paragraphe argumenté",
    title: "Prise de position sourcée sur le choix d'une projection",
    prompt: "Rédige un paragraphe argumenté (200 mots) qui prend position sur la question : une carte scolaire du monde devrait-elle rester en projection Mercator ? Appuie ta position sur les mesures réalisées en séance.",
    criteria: [
      "La position est claire et argumentée, pas seulement descriptive",
      "Les chiffres mesurés en séance sont explicitement mobilisés",
    ],
  },

  { type: "heading", text: "Séance Lycée 12 : Mini-projet, une carte thématique complète", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Les onze séances précédentes traitent chacune une compétence isolée. Ce mini-projet les combine : un vrai sujet, une problématique, une carte mise en page et un court commentaire, sans la complexité technique des pistes Licence/BUT ou Master/Recherche.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Cahier des charges",
    text: "Choisir un territoire et un sujet simple (répartition d'un indicateur, contrainte réglementaire par buffer, ou lecture NDVI/NDBI d'une zone). Produire une carte mise en page complète (titre problématisé, légende organisée, échelle, source) accompagnée d'un commentaire structuré de 300 mots (introduction, problématique, deux parties, conclusion).",
  },
  {
    type: "table",
    headers: ["Section évaluée", "Barème indicatif"],
    rows: [
      ["Problématique et cadrage du sujet", "/3"],
      ["Méthode (source documentée, geste SIG correct)", "/4"],
      ["Carte de synthèse (sémiologie, légende, lisibilité)", "/5"],
      ["Commentaire structuré (introduction, parties, conclusion)", "/5"],
      ["Forme du rendu", "/3"],
    ],
  },
  {
    type: "solution",
    title: "Séance Lycée 12 : grille d'auto-évaluation",
    items: [
      "La carte a un titre problématisé, pas un simple intitulé du sujet",
      "La légende est organisée en rubriques logiques",
      "Chaque figuré cartographique respecte la sémiologie de Bertin",
      "Le commentaire répond réellement à la problématique posée en introduction",
      "La source des données (nom, date) est indiquée sur la carte ou en note",
    ],
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Structurer le commentaire rendu",
    description: "Le module La Méthode détaille la structure attendue d'un commentaire de document.",
  },
  {
    type: "devoir",
    format: "Carte et commentaire",
    title: "Mini-projet complet",
    prompt: "Réalise le mini-projet complet selon le cahier des charges ci-dessus, sur un territoire de ton choix.",
    criteria: [
      "Le sujet est clairement problématisé",
      "Chaque section du barème est identifiable dans le rendu",
      "Le commentaire respecte la structure introduction/parties/conclusion",
    ],
  },

  // ============================================================================
  // PISTE LICENCE/BUT — 12 séances, technique, Python, livrable professionnel.
  // Progression : automatisation et géoréférencement (1-3) → analyse spatiale et
  // bases de données (4-6) → classification et statistiques (7-8) → radar,
  // audit qualité, rapport (9-11) → synthèse professionnelle (12).
  // ============================================================================

  { type: "heading", text: "Séance Licence/BUT 1 : Prise en main QGIS avancée et automatisation légère", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Aller au-delà du clic-bouton : automatiser une chaîne de traitements répétitive dans QGIS avant de passer au code pur (séance Licence/BUT 5), un palier intermédiaire souvent sauté à tort.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger un jeu de couches vecteur (communes, cours d'eau, bâtiments) sur un territoire de ton choix",
      "Construire un modèle de traitement dans QGIS (Traitement > Modeleur graphique) qui enchaîne reprojection, buffer et intersection en une seule opération réutilisable",
      "Exécuter ce modèle sur deux territoires différents sans retoucher les paramètres un par un",
      "Documenter le modèle (nom, description, paramètres) pour qu'un tiers puisse le réutiliser sans explication orale",
    ],
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 1",
    text: "Un modèle bien construit expose ses paramètres variables (couches d'entrée, distance de buffer) en haut du formulaire plutôt que de les figer en dur dans chaque sous-outil : c'est ce qui le rend réellement réutilisable sur un territoire différent, pas seulement rejouable à l'identique.",
    items: [
      "Critère 1 : le modèle s'exécute sans erreur sur un second territoire, sans modification manuelle des sous-outils",
      "Critère 2 : les paramètres variables sont exposés en haut du formulaire, pas figés",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : automatisation dans QGIS",
    description: "Le module Le Compas présente le modeleur graphique et l'automatisation Python avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Modèle documenté",
    title: "Modèle de traitement réutilisable",
    prompt: "Construis un modèle QGIS pour une chaîne de traitements de ton choix (au moins 3 étapes), documente-le, et fournis une capture d'écran de son exécution réussie sur deux territoires différents.",
    criteria: [
      "Le modèle comporte au moins 3 étapes enchaînées",
      "Il s'exécute sans erreur sur deux territoires distincts",
      "La documentation permet à un tiers de le réutiliser sans explication orale",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 2 : Géoréférencer une image par grille", level: "superieur" },
  {
    type: "paragraph",
    text: "Une image scannée ou une photo aérienne ancienne n'a, à l'origine, aucune coordonnée : ses pixels ne sont repérés que par leur ligne et leur colonne. La géoréférencer, c'est établir la correspondance entre ces pixels et de vraies coordonnées terrain.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Comprendre qu'un géoréférencement n'est fiable que s'il s'appuie sur des points de contrôle (GCP) à coordonnées réelles certaines, jamais sur un calage approximatif « à l'œil » contre un fond de carte.",
  },
  {
    type: "paragraph",
    text: "La méthode la plus fiable quand aucun repère topographique clair n'est disponible : utiliser une grille de coordonnées déjà imprimée sur le document (grille DFCI, grille Lambert, quadrillage kilométrique). Chaque intersection de la grille est un point de contrôle dont la coordonnée réelle se lit directement sur les codes affichés en marge.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Repérer sur l'image au moins 6 à 8 intersections de la grille, réparties sur toute l'étendue du document",
      "Lire la coordonnée réelle de chaque intersection à partir des codes de la grille imprimée",
      "Dans QGIS, ouvrir le Géoréférenceur (Raster > Géoréférencement), placer un point de contrôle sur chaque intersection repérée et saisir sa coordonnée réelle",
      "Choisir une transformation adaptée (affine si la grille est régulière et sans rotation ; polynomiale d'ordre 2+ pour une distorsion non linéaire, au risque de sur-ajustement avec peu de points)",
      "Lancer le géoréférencement et vérifier le résidu affiché par point",
      "Exporter le raster géoréférencé (GeoTIFF, EPSG:2154)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Vérifier, ne pas supposer",
    text: "Un géoréférencement peut sembler correct visuellement tout en étant décalé de plusieurs dizaines de mètres. Toujours comparer le résultat à une couche de référence connue et indépendante avant de le considérer comme fiable.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 2",
    text: "Sur une grille régulière sans rotation, une transformation affine à 6 points bien répartis donne typiquement un résidu par point inférieur à 1/100e de l'espacement réel de la grille. Une transformation polynomiale d'ordre 2 avec seulement 4-6 points donne souvent un résidu affiché plus faible, sans que ce soit un signe de meilleure qualité : c'est un sur-ajustement, à éviter en dessous d'une dizaine de points.",
    items: [
      "Critère 1 : au moins 6 GCP utilisés, répartis sur toute l'étendue de l'image",
      "Critère 2 : le résidu par point reste très inférieur à l'espacement réel de la grille",
      "Critère 3 : le résultat est comparé à une couche de référence indépendante",
    ],
  },
  {
    type: "devoir",
    format: "Introduction",
    title: "Rédiger l'introduction d'un compte-rendu de géoréférencement",
    prompt: "Avant même d'avoir les résultats, rédige l'introduction (150 à 200 mots) du compte-rendu de cette séance : contexte, objectif précis, méthode annoncée (grille, nombre de points, transformation), sans anticiper les résultats.",
    criteria: [
      "Le contexte explique la nature du document et pourquoi un géoréférencement est nécessaire",
      "La méthode est annoncée sans qu'aucun chiffre de résidu n'apparaisse encore",
      "La fourchette de longueur (150-200 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 3 : De l'image géoréférencée à l'indice composé", level: "superieur" },
  {
    type: "paragraph",
    text: "Cette séance part directement du résultat de la séance Licence/BUT 2 : une image auparavant sans coordonnées, maintenant géoréférencée.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Calculer le NDVI sur l'image nouvellement géoréférencée (calculatrice raster), sans géoréférencement préalable ce calcul serait exact en valeur mais inutilisable en position",
      "Superposer une grille régulière (fishnet) sur l'emprise et calculer, pour chaque cellule, la moyenne du NDVI (Statistiques de zone, module Le Compas)",
      "Répéter le géoréférencement et le calcul de NDVI sur une seconde image de la même zone, prise à une date différente",
      "Composer ΔNDVI = NDVI(date 2) − NDVI(date 1), qui met en évidence les zones de changement",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Valider sa propre méthode contre un résultat déjà connu",
    text: "Une fois l'étape 2 maîtrisée, la refaire sur sentinel2_2024-08-06_vitrolles_bands.tif permet une vraie vérification : grille_100m_indices.geojson donne déjà, pour 1122 cellules de 100 m, la moyenne réelle de NDVI/NDMI/NDBI calculée sur les mêmes bandes. Un fishnet + statistiques de zone fait correctement doit reproduire ces valeurs à peu de choses près.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 3",
    text: "Un ΔNDVI se classe généralement en trois catégories à partir d'un seuil autour de ±0.05 à ±0.1 : une variation plus faible que ce seuil est considérée stable. Un ΔNDVI très négatif localisé (au-delà de -0.3) sur une zone auparavant boisée est la signature typique d'une coupe rase plutôt que d'un simple cycle saisonnier.",
    items: [
      "Critère 1 : le NDVI est calculé sur l'image géoréférencée",
      "Critère 2 : les deux dates comparées sont prises à une saison comparable",
      "Critère 3 : un seuil explicite sépare perte / stable / gain",
    ],
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Revoir : indices composés et complexes",
    description: "Le module Les Couleurs détaille la logique des indices composés avant de les mettre en pratique ici.",
  },
  {
    type: "devoir",
    format: "Analyse de texte",
    title: "Analyser l'article fondateur d'un indice que tu viens d'utiliser",
    prompt: "Trouve et lis le résumé de l'article original ayant introduit le NDVI (Rouse et al., 1974) ou le SAVI (Huete, 1988). Rédige une analyse de 300 à 400 mots : quel problème l'auteur cherchait-il à résoudre ? quelle est l'idée centrale de sa solution ? en quoi la limite qu'il identifie rejoint-elle ce que tu as observé toi-même en séance (ΔNDVI, confusion sol nu/végétation clairsemée) ?",
    criteria: [
      "La source exacte est citée",
      "Le problème initial est reformulé avec ses propres mots",
      "Un lien explicite est établi avec l'expérience concrète de la séance",
      "La longueur (300-400 mots) est respectée",
    ],
  },
  { type: "game" },

  { type: "heading", text: "Séance Licence/BUT 4 : Analyse spatiale professionnelle, jointure et découpage", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Aller au-delà du buffer/intersection de base : jointure spatiale et clip sont les deux opérations les plus fréquentes d'un vrai projet SIG professionnel, rarement pratiquées ensemble en formation.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger une couche de bâtiments et une couche de communes sur un même territoire",
      "Réaliser une jointure spatiale (Vecteur > Gestion des données > Joindre les attributs par localisation) pour attribuer à chaque bâtiment sa commune",
      "Découper (Clip) la couche de bâtiments jointe selon l'emprise d'un seul département, vérifier que le résultat ne contient plus que les entités concernées",
      "Calculer, par commune, le nombre de bâtiments (Statistiques par attribut groupées) sans recompter manuellement",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Jointure spatiale n'est pas jointure attributaire",
    text: "Une jointure spatiale associe des entités par leur position (contenance, intersection, proximité), une jointure attributaire les associe par un champ commun (un code identique dans les deux tables). Confondre les deux est une erreur fréquente qui produit un résultat vide ou aberrant sans message d'erreur explicite.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 4",
    text: "Un bâtiment exactement sur une limite communale peut se voir attribué l'une ou l'autre commune selon la règle de jointure choisie (intersecte vs contient), un cas limite à documenter plutôt qu'à ignorer dans un vrai livrable professionnel.",
    items: [
      "Critère 1 : la jointure spatiale attribue correctement la commune à chaque bâtiment",
      "Critère 2 : le clip ne conserve que les entités réellement dans l'emprise choisie",
      "Critère 3 : le comptage par commune est vérifié sur au moins un cas connu",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : jointure spatiale et opérations de découpage",
    description: "Le module Le Compas détaille ces opérations avant de les pratiquer ici en contexte professionnel.",
  },
  {
    type: "devoir",
    format: "Tableau de bord",
    title: "Comptage par commune, jointure + découpage",
    prompt: "Sur un territoire de ton choix, produis un tableau (commune → nombre d'entités) obtenu par jointure spatiale et découpage, avec une carte qui l'illustre.",
    criteria: [
      "Le tableau est obtenu par jointure spatiale réelle, pas par comptage manuel",
      "Le découpage préalable est justifié et documenté",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 5 : Programmation géospatiale simple", level: "superieur" },
  {
    type: "paragraph",
    text: "Quatre exercices courts, indépendants, qui couvrent les besoins les plus fréquents en géographie et télédétection : lire/transformer une donnée vecteur, mesurer, automatiser un calcul raster répétitif, et interroger une donnée en ligne de commande.",
  },
  {
    type: "formula",
    label: "Exercice 1 : d'un CSV à une carte",
    formula: "gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs='EPSG:4326')",
    note: "Charger un CSV de points (colonnes lon/lat), le convertir en GeoDataFrame, le reprojeter en EPSG:2154, puis l'exporter en GeoJSON.",
  },
  {
    type: "formula",
    label: "Exercice 2 : mesurer avec Shapely/GeoPandas",
    formula: "gdf['buffer_200m'] = gdf.to_crs(epsg=2154).geometry.buffer(200)",
    note: "Créer un buffer de 200 m autour de chaque point, puis calculer l'aire cumulée réelle (gdf.unary_union avant de mesurer, pour ne pas compter deux fois les chevauchements).",
  },
  {
    type: "formula",
    label: "Exercice 3 : automatiser un calcul NDVI par lot",
    formula: "for red, nir in zip(sorted(glob('*_B04.tif')), sorted(glob('*_B08.tif'))): ndvi = (read(nir) - read(red)) / (read(nir) + read(red))",
    note: "Avec rasterio : parcourir un dossier de paires de bandes rouge/NIR, calculer le NDVI de chacune, enregistrer chaque résultat sous un nom dérivé du fichier source.",
  },
  {
    type: "formula",
    label: "Exercice 4 : inspecter une donnée en ligne de commande avec GDAL",
    formula: "gdalinfo -stats sentinel2_2024-08-06_vitrolles_indices.tif",
    note: "Sur le fichier réel du jeu de données canonique (bande 1 = NDVI), gdalinfo -stats doit afficher un minimum proche de -1, un maximum proche de 1 et une moyenne proche de 0.33 : un réflexe utile pour vérifier une donnée avant de l'intégrer à un traitement automatisé.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 5",
    text: "Exercice 1 : oublier crs='EPSG:4326' à la construction du GeoDataFrame produit une reprojection ultérieure silencieusement fausse, sans erreur levée. Exercice 2 : gdf.buffer(200).area.sum() surestime dès que deux buffers se recouvrent, contrairement à .unary_union.area. Exercice 3 : diviser par np.where(denominateur==0, 1, denominateur) évite une division par zéro sur les pixels nodata. Exercice 4 : gdalinfo -stats repère d'un coup d'œil un NDVI hors de l'intervalle [-1, 1], signe d'une erreur en amont.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : PyQGIS et GeoPandas",
    description: "Le module Le Compas présente ces deux approches avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Étude bibliographique",
    title: "Comparer deux sources sur le choix PyQGIS vs GeoPandas",
    prompt: "Trouve deux sources distinctes qui discutent du choix entre automatiser un traitement dans PyQGIS ou dans un pipeline Python autonome. Rédige une synthèse de 250 mots qui met les deux sources en dialogue, avec une conclusion personnelle appliquée au jeu de données Vitrolles.",
    criteria: [
      "Les deux sources sont identifiées précisément",
      "La synthèse compare les deux sources entre elles, pas un résumé successif",
      "La longueur (250 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 6 : Bases de données géographiques, PostGIS", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Un vrai projet SIG professionnel dépasse rapidement le fichier unique : PostGIS (extension spatiale de PostgreSQL) permet de stocker, interroger et croiser de grands volumes de données géographiques par SQL, la brique standard des SIG d'entreprise.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Installer PostgreSQL/PostGIS (ou utiliser une instance déjà fournie), créer une base et activer l'extension postgis",
      "Importer une couche vecteur depuis QGIS (clic droit > Exporter > Enregistrer les entités sous, choisir PostgreSQL comme format)",
      "Écrire une requête SQL spatiale simple : sélectionner les entités dans un rayon donné d'un point avec ST_DWithin",
      "Écrire une requête qui calcule une surface totale par catégorie avec ST_Area et GROUP BY",
      "Recharger le résultat de la requête comme couche dans QGIS (Couche > Ajouter une couche > Ajouter une couche PostGIS, avec une requête personnalisée)",
    ],
  },
  {
    type: "formula",
    label: "Requête spatiale de base",
    formula: "SELECT nom, ST_Area(geom) FROM parcelles WHERE ST_DWithin(geom, ST_MakePoint(x, y), 500)",
    note: "ST_DWithin est plus performant qu'un calcul de distance suivi d'un filtre, car il peut utiliser l'index spatial de la table directement.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 6",
    text: "Sans index spatial (CREATE INDEX ... USING GIST), une requête ST_DWithin sur une grande table scanne toutes les lignes une par une : la différence de performance devient flagrante au-delà de quelques dizaines de milliers d'entités, la vraie raison d'être de PostGIS par rapport à un simple fichier.",
    items: [
      "Critère 1 : l'extension postgis est activée et la couche importée avec succès",
      "Critère 2 : les deux requêtes SQL spatiales s'exécutent et donnent un résultat cohérent",
      "Critère 3 : le résultat est rechargé comme couche QGIS fonctionnelle",
    ],
  },
  {
    type: "link",
    to: "/references",
    label: "Documentation officielle PostGIS",
    description: "Voir le thème « Géomatique, SIG et données géographiques » dans les Références.",
  },
  {
    type: "devoir",
    format: "Requêtes documentées",
    title: "Trois requêtes SQL spatiales sur un jeu de données réel",
    prompt: "Importe un jeu de données de ton choix dans PostGIS, écris et documente trois requêtes spatiales distinctes (sélection par distance, agrégation par zone, intersection), fournis leur résultat.",
    criteria: [
      "Les trois requêtes s'exécutent sans erreur et donnent un résultat plausible",
      "Chaque requête est commentée (ce qu'elle fait, pourquoi ce choix de fonction spatiale)",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 7 : Classification supervisée et évaluation de précision", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Aller jusqu'au bout d'une classification : constituer des échantillons d'entraînement représentatifs, entraîner un classifieur, puis évaluer honnêtement sa précision, l'étape la plus souvent négligée dans un premier projet de classification.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger sentinel2_2024-08-06_vitrolles_bands.tif et sa bande SCL (Scene Classification Layer, ESA/Sen2Cor), une vérité terrain déjà disponible pour 3 classes franches : végétation, sol nu/bâti, eau",
      "Réserver un tiers de l'emprise (par exemple le tiers droit) comme jeu de test, jamais montré à l'entraînement : un découpage spatial, pas un tirage aléatoire pixel par pixel (module L'Intelligence, fuite de données)",
      "Entraîner une classification supervisée (Random Forest, scikit-learn ou SCP dans QGIS) sur les deux tiers restants uniquement, avec les 6 bandes comme variables d'entrée",
      "Appliquer le classifieur à l'ensemble de l'emprise",
      "Construire la matrice de confusion entre la classification obtenue et les pixels de test, puis calculer la précision globale et le coefficient kappa",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais évaluer un modèle sur les données qui ont servi à l'entraîner",
    text: "Calculer la précision d'une classification sur les mêmes pixels que ceux utilisés pour l'entraîner donne un chiffre optimiste, souvent proche de 100 %, qui ne dit rien de la performance réelle sur le reste de l'image.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 7 : résultat réel, mesuré sur le jeu de données Vitrolles",
    text: "Sur ce jeu réel (découpage spatial 2/3 gauche = entraînement / 1/3 droit = test) : un Random Forest à 200 arbres atteint 100 % de précision sur l'entraînement mais seulement 96.2 % sur le test, avec un kappa de 0.640, l'écart net confirme le sur-apprentissage attendu d'un Random Forest peu contraint. La classe eau, présente uniquement dans l'étang de Berre en haut à gauche de l'emprise, se retrouve à 100 % du côté entraînement avec ce découpage par tiers verticaux : 0 pixel d'eau dans le jeu de test.",
    items: [
      "Critère 1 : le découpage entraînement/test est spatial, jamais un tirage aléatoire pixel par pixel",
      "Critère 2 : la matrice de confusion réelle est présentée avant toute interprétation",
      "Critère 3 : chaque classe a des effectifs non nuls des deux côtés du découpage, vérifié explicitement",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : classification supervisée et matrice de confusion",
    description: "Le module L'Intelligence détaille les méthodes de classification et les métriques d'évaluation avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Rapport technique",
    title: "Rapport de classification sur le jeu Vitrolles",
    prompt: "Rédige un rapport technique court (400 mots) qui présente la méthode, la matrice de confusion réelle obtenue, le kappa, et discute explicitement la limite de la classe eau absente du jeu de test.",
    criteria: [
      "La méthode est décrite avec assez de précision pour être reproduite",
      "La matrice de confusion et le kappa réels sont présentés avant toute interprétation",
      "La limite de la classe eau est explicitement discutée",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 8 : Statistiques de zone et algèbre raster", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Combiner plusieurs rasters par calcul algébrique (module Le Compas, section 5) est une compétence distincte du simple calcul d'un indice sur une seule image : cette séance la pratique sur un cas à plusieurs couches.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger le fichier d'indices précalculés du jeu Vitrolles (NDVI, NDMI, NDBI, NDRE, NDWI)",
      "Construire un indice composite simple par combinaison algébrique (ex. score de végétation en stress = NDVI faible ET NDMI faible, avec la calculatrice raster et des conditions logiques)",
      "Calculer, par cellule d'une grille de 100 m, la statistique de zone (moyenne, écart-type, min, max) de ce nouvel indice composite",
      "Identifier les 10 cellules les plus extrêmes (les plus en stress) et vérifier leur cohérence visuelle avec la composition couleur naturelle",
    ],
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 8",
    text: "Un indice composite construit par simple combinaison logique (ET/OU de seuils) reste sensible au choix arbitraire des seuils, contrairement à un indice à formule fermée comme le NDVI : documenter explicitement les seuils choisis, et idéalement tester leur sensibilité (un seuil légèrement différent change-t-il beaucoup le résultat ?), fait partie intégrante d'une analyse rigoureuse.",
    items: [
      "Critère 1 : les seuils utilisés pour l'indice composite sont explicitement documentés",
      "Critère 2 : les statistiques de zone sont calculées correctement par cellule",
      "Critère 3 : la cohérence visuelle des cellules extrêmes est vérifiée, pas seulement le chiffre",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : statistiques de zone et algèbre raster",
    description: "Le module Le Compas détaille ces techniques avant de les pratiquer ici sur un cas composite.",
  },
  {
    type: "devoir",
    format: "Note technique",
    title: "Indice composite documenté",
    prompt: "Construis ton propre indice composite (au moins deux indices combinés) sur le jeu Vitrolles ou un autre territoire, documente les seuils choisis et teste leur sensibilité (un seuil ±20 % change-t-il beaucoup le résultat ?).",
    criteria: [
      "L'indice composite combine réellement au moins deux indices existants",
      "Les seuils sont documentés et leur sensibilité testée",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 9 : Radar et interpolation spatiale", level: "superieur" },
  {
    type: "paragraph",
    text: "Deux techniques présentées en théorie (module Le Regard pour le SAR, module Le Compas pour le krigeage) mais jamais pratiquées jusqu'ici.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger une scène Sentinel-1 (niveau GRD) sur la même zone qu'une image Sentinel-2 déjà utilisée, via Copernicus Data Space Ecosystem",
      "Charger la scène dans QGIS, afficher la polarisation VV en niveaux de gris, comparer visuellement une zone en eau libre (signal faible, sombre) à une zone urbaine (signal fort, claire)",
      "Sur un jeu de points de mesure ponctuels (relevés réels ou sous-échantillon de pixels NDVI comme substitut pédagogique), calculer un variogramme expérimental",
      "Ajuster un modèle théorique (sphérique ou exponentiel) sur ce variogramme, puis interpoler par krigeage ordinaire",
      "Comparer visuellement la carte krigée à une simple interpolation IDW sur les mêmes points",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi comparer à l'IDW plutôt qu'accepter le krigeage sans recul",
    text: "L'IDW et le krigeage donnent souvent des cartes de valeurs visuellement proches sur un jeu de points bien réparti : c'est la carte de variance de krigeage (que l'IDW ne produit pas) qui révèle l'apport réel, en montrant explicitement où l'estimation est fiable.",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 9",
    text: "Sur la scène Sentinel-1 : une surface en eau calme apparaît nettement plus sombre en VV qu'une zone bâtie, qui ressort au contraire très brillante (effet de coin, double rebond façade/sol). Sur le variogramme : un effet de pépite élevé par rapport au palier signale un point de mesure bruité ou une variabilité plus fine que l'espacement du réseau de points.",
    items: [
      "Critère 1 : le contraste eau/bâti en VV est identifié et relié à la physique de rétrodiffusion",
      "Critère 2 : le variogramme est ajusté avec un modèle théorique explicite",
      "Critère 3 : la carte de variance de krigeage est produite et interprétée",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : géostatistique et krigeage",
    description: "Le module Le Compas détaille le variogramme et la théorie du krigeage avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Étude bibliographique",
    title: "Un cas réel d'usage opérationnel du radar ou du krigeage",
    prompt: "Recherche un cas réel et documenté d'usage opérationnel (Copernicus Emergency Management Service pour le SAR, ou un exemple documenté de krigeage en agriculture de précision ou hydrologie). Rédige une synthèse de 400 mots qui compare ce cas à ta propre mise en œuvre.",
    criteria: [
      "Le cas cité est réel et sourcé précisément",
      "Le contexte opérationnel est explicité, pas seulement la technique",
      "Une comparaison explicite est faite avec la mise en œuvre personnelle",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 10 : Auditer la qualité d'un jeu de données SIG", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Un jeu de données n'est exploitable que si sa qualité a été vérifiée au préalable, pas supposée : une compétence professionnelle distincte de celle de produire une carte (module Le Compas, section 10, qualité des données et métadonnées).",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger les 6 fichiers du jeu de données Vitrolles (voir Ressources → Jeux de données)",
      "Vérifier la complétude : le nombre de cellules de grille_100m_indices.geojson correspond-il à ce qu'annonce la documentation (1122 cellules) ?",
      "Vérifier la cohérence du CRS : emprise.geojson et grille_100m_indices.geojson déclarent-ils bien EPSG:2154, et se superposent-ils réellement une fois chargés côte à côte ?",
      "Vérifier la plausibilité des valeurs attributaires : les NDVI/NDMI/NDBI de la grille restent-ils dans leur plage théorique (-1 à 1) ?",
      "Rédiger une fiche de métadonnées courte (source, date, CRS, résolution, limites connues) au format ISO 19115 simplifié",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Une anomalie réelle à chercher : la classe eau dans classification_reference.json",
    text: "classification_reference.json recense trois classes (végétation, sol nu/bâti, eau), mais sa matrice de confusion sur le jeu de test présente une ligne \"eau\" entièrement à zéro pour les trois modèles fournis. Un audit de qualité doit repérer cette anomalie et formuler une hypothèse plausible (classe absente du découpage spatial train/test, pas un modèle qui échouerait totalement sur l'eau).",
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 10",
    text: "Les 5 fichiers géographiques du jeu de données sont mutuellement cohérents (même CRS EPSG:2154, même emprise). Le point d'audit le plus instructif reste la ligne \"eau\" vide de classification_reference.json : elle rappelle qu'un jeu de données peut être par ailleurs parfaitement cohérent tout en portant une limite structurelle qu'aucune vérification de format ne révèle.",
    items: [
      "Critère 1 : la fiche de métadonnées mentionne CRS, date d'acquisition et résolution",
      "Critère 2 : au moins une vérification de plausibilité est réellement effectuée",
      "Critère 3 : l'anomalie de la classe eau est documentée avec une hypothèse",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : qualité des données et métadonnées",
    description: "Le module Le Compas détaille la norme ISO 19115 et les critères classiques de qualité d'un jeu de données géographique.",
  },
  {
    type: "devoir",
    format: "Fiche de métadonnées",
    title: "Fiche de métadonnées et rapport d'audit",
    prompt: "Produis une fiche de métadonnées complète du jeu de données Vitrolles accompagnée d'un court rapport d'audit (une page) qui documente au moins deux vérifications de qualité réellement effectuées.",
    criteria: [
      "La fiche couvre au moins six champs (source, licence, CRS, résolution, emprise, date)",
      "Au moins deux vérifications de qualité distinctes sont documentées avec leur résultat réel",
      "Toute anomalie trouvée est décrite avec une hypothèse plausible",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 11 : Rédiger un rapport technique SIG", level: "superieur" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Les séances précédentes produisent des résultats techniques (cartes, classifications, audits). Celle-ci les fait rédiger dans le format attendu d'un vrai livrable professionnel (module La Méthode, section 3), grille Professionnel de la page Évaluation.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Choisir un résultat déjà produit dans une séance précédente de cette piste (classification, audit qualité, indice composite)",
      "Rédiger une synthèse exécutive de 5 lignes maximum, lisible par un non-spécialiste, en tête du rapport",
      "Structurer le corps du rapport : contexte, données et méthode (reproductible par un tiers), résultats, discussion des limites, recommandations opérationnelles",
      "Vérifier que chaque source de donnée est citée avec sa limite de fiabilité, pas seulement son nom",
      "Confronter le rapport à la grille Professionnel de la page Évaluation avant de le considérer terminé",
    ],
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 11",
    text: "L'erreur la plus fréquente d'un premier rapport technique est de mélanger résultats et discussion dans le même paragraphe : un lecteur pressé doit pouvoir lire uniquement les résultats (faits, chiffres, cartes) sans se demander si une phrase donnée est un fait ou une interprétation. Séparer nettement les deux sections est le geste professionnel le plus simple à appliquer et le plus souvent négligé.",
    items: [
      "Critère 1 : la synthèse exécutive tient en 5 lignes et reste compréhensible sans jargon",
      "Critère 2 : résultats et discussion sont nettement séparés",
      "Critère 3 : les recommandations sont réalistes et formulées pour un décideur",
    ],
  },
  {
    type: "link",
    to: "/magister/evaluation",
    label: "Voir la grille de correction Professionnel",
    description: "La page Évaluation détaille les critères attendus d'un rapport technique SIG.",
  },
  {
    type: "devoir",
    format: "Rapport",
    title: "Rapport technique complet sur un résultat déjà produit",
    prompt: "Reprends un résultat d'une séance précédente et rédige-en le rapport technique complet selon la structure ci-dessus (600 mots minimum).",
    criteria: [
      "Toutes les sections attendues sont présentes et identifiables",
      "Résultats et discussion sont nettement séparés",
      "Au moins une limite réelle est explicitement discutée",
    ],
  },

  { type: "heading", text: "Séance Licence/BUT 12 : Mini-projet, un livrable professionnel complet", level: "superieur" },
  {
    type: "callout",
    tone: "warning",
    title: "Cahier des charges",
    text: "Choisir un territoire et un sujet technique (croisement d'indices, classification, ou audit de qualité appliqué à un cas réel). Produire un livrable professionnel complet : carte de synthèse mise en page, rapport technique structuré (synthèse exécutive, contexte, méthode reproductible, résultats, discussion, recommandations), conforme à la grille Professionnel de la page Évaluation.",
  },
  {
    type: "table",
    headers: ["Section évaluée", "Barème indicatif"],
    rows: [
      ["Cadrage du sujet et synthèse exécutive", "/3"],
      ["Méthode reproductible, données citées avec leurs limites", "/5"],
      ["Carte de synthèse (sémiologie, légende, lisibilité)", "/4"],
      ["Résultats présentés avant toute interprétation", "/3"],
      ["Discussion et recommandations opérationnelles", "/5"],
    ],
  },
  {
    type: "solution",
    title: "Séance Licence/BUT 12 : grille d'auto-évaluation",
    items: [
      "La synthèse exécutive est lisible par un non-spécialiste en moins d'une minute",
      "Chaque source de donnée est citée avec sa limite de fiabilité",
      "La carte respecte la sémiologie de Bertin",
      "Résultats et discussion sont nettement séparés",
      "Les recommandations sont réalistes, formulées pour un décideur",
    ],
  },
  {
    type: "link",
    to: "/magister/evaluation",
    label: "Confronter le rendu à la grille Professionnel",
    description: "La page Évaluation détaille les critères de correction attendus pour ce livrable.",
  },
  {
    type: "devoir",
    format: "Livrable professionnel",
    title: "Mini-projet complet",
    prompt: "Réalise le livrable professionnel complet selon le cahier des charges ci-dessus, sur un territoire de ton choix.",
    criteria: [
      "Chaque section du barème est identifiable dans le rendu",
      "La méthode est décrite avec assez de précision pour être reproduite par un tiers",
      "Au moins une limite réelle est explicitement discutée",
    ],
  },

  // ============================================================================
  // PISTE MASTER/RECHERCHE — 12 séances, rigueur statistique, IMRaD, techniques
  // avancées. Progression : cadrage et prétraitement rigoureux (1-2) →
  // validation d'indices et séries temporelles (3-4) → apprentissage automatique
  // et validation statistique (5-6) → géostatistique et décision avancées (7-8)
  // → physique du signal (9-10) → synthèse recherche (11-12).
  // ============================================================================

  { type: "heading", text: "Séance Master/Recherche 1 : Cadrer une question de recherche", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Avant tout traitement, une vraie démarche de recherche part d'une question précise et falsifiable, pas d'un thème vague (module La Méthode, section 7, structure IMRaD).",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Choisir un thème large en lien avec le jeu de données Vitrolles ou un territoire personnel (végétation, bâti, eau, changement)",
      "Reformuler ce thème en une question précise, répondable par une mesure (pas « étudier la végétation », mais « le NDVI moyen d'un secteur est-il corrélé à la distance au centre urbain ? »)",
      "Formuler une hypothèse testable, en précisant ce qui la confirmerait et ce qui l'infirmerait",
      "Esquisser le protocole (données nécessaires, méthode de mesure, méthode de validation) sans encore l'exécuter",
      "Faire relire la question par un pair : est-elle réellement répondable avec les données disponibles ?",
    ],
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 1",
    text: "Une question de recherche mal cadrée se reconnaît à l'absence de mesure possible en réponse : « la ville est-elle en stress hydrique ? » n'est pas répondable directement, « le NDMI moyen de la ville a-t-il diminué de plus de 0.05 entre deux dates estivales comparables ? » l'est. Le passage de l'un à l'autre est le vrai travail de cette séance.",
    items: [
      "Critère 1 : la question est formulée de façon à être répondable par une mesure précise",
      "Critère 2 : l'hypothèse précise explicitement ce qui la confirmerait et ce qui l'infirmerait",
      "Critère 3 : le protocole esquissé est réalisable avec des données réellement accessibles",
    ],
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Revoir : structure IMRaD et rigueur statistique",
    description: "Le module La Méthode détaille les exigences de cadrage d'un travail de recherche.",
  },
  {
    type: "devoir",
    format: "Note de cadrage",
    title: "Cadrage complet d'une question de recherche",
    prompt: "Rédige la note de cadrage complète (300 mots) de ta question de recherche : question précise, hypothèse falsifiable, protocole esquissé.",
    criteria: [
      "La question est répondable par une mesure",
      "L'hypothèse est falsifiable, pas une évidence non testable",
      "Le protocole esquissé est réaliste",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 2 : Prétraitement rigoureux, de la valeur brute à la réflectance", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Une image satellite brute (DN, Digital Number) n'est pas directement une réflectance physique comparable entre capteurs ou dates (module Le Regard, section 10). Un travail de recherche exige de documenter explicitement ce prétraitement, jamais de le supposer déjà fait.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Vérifier le niveau de traitement de l'image utilisée (L1C brut vs L2A corrigé atmosphériquement, pour Sentinel-2) et le documenter explicitement",
      "Pour une image L1C, appliquer la formule DN → radiance → réflectance TOA (module Le Regard, section 10)",
      "Comparer, sur une même zone, une réflectance TOA (L1C corrigé) à une réflectance BOA déjà fournie (L2A) : quantifier l'écart",
      "Documenter dans un tableau chaque étape de correction appliquée, avec la formule et les paramètres utilisés",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais comparer deux images à des niveaux de traitement différents",
    text: "Comparer un NDVI calculé sur une image L1C brute à un NDVI calculé sur une image L2A corrigée introduit un biais systématique lié à l'atmosphère, indépendant du phénomène étudié : un piège fréquent quand les images de deux dates proviennent de sources différentes.",
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 2",
    text: "L'écart entre réflectance TOA et BOA est généralement plus marqué dans les bandes courtes longueurs d'onde (bleu) que dans le proche infrarouge, la diffusion atmosphérique de Rayleigh étant plus forte aux courtes longueurs d'onde : un indice qui n'utilise que le rouge et le NIR (comme le NDVI) est donc moins sensible à ce choix qu'un indice utilisant le bleu.",
    items: [
      "Critère 1 : le niveau de traitement de chaque image utilisée est explicitement documenté",
      "Critère 2 : l'écart TOA/BOA est réellement quantifié, pas seulement mentionné",
      "Critère 3 : chaque étape de correction est documentée avec formule et paramètres",
    ],
  },
  {
    type: "link",
    to: "/module/teledetection",
    label: "Revoir : de la valeur brute à la réflectance physique",
    description: "Le module Le Regard détaille la chaîne de correction radiométrique et atmosphérique avant cette mise en pratique.",
  },
  {
    type: "devoir",
    format: "Note méthodologique",
    title: "Documentation complète d'une chaîne de prétraitement",
    prompt: "Documente, formule et paramètres à l'appui, la chaîne de prétraitement complète appliquée à une image de ton choix, avec la quantification de l'écart TOA/BOA si les deux niveaux sont disponibles.",
    criteria: [
      "Chaque étape est documentée avec sa formule",
      "L'écart TOA/BOA est quantifié quand les deux niveaux sont disponibles",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 3 : Valider un indice face à une mesure biophysique", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Un indice spectral n'est qu'une approximation optique d'une grandeur biophysique réelle (module Les Couleurs, section 11) : sa valeur n'a de sens scientifique que confrontée à une mesure de terrain indépendante.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Choisir une grandeur biophysique mesurable (humidité du sol, biomasse, LAI) et une source de mesure de terrain existante (réseau de stations, jeu de données publié) ou un substitut documenté si aucune mesure réelle n'est accessible",
      "Extraire la valeur d'indice spectral (NDVI, NDMI) au même point et à la même date que chaque mesure de terrain",
      "Calculer le coefficient de corrélation entre indice et mesure biophysique, ainsi que l'erreur quadratique moyenne (RMSE)",
      "Discuter la force de la corrélation obtenue à la lumière de la littérature (les corrélations NDVI/biomasse publiées dépassent rarement 0.7-0.8 en conditions réelles)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Corrélation n'est pas validation universelle",
    text: "Une corrélation forte obtenue sur un seul site et une seule saison ne se généralise pas automatiquement à un autre contexte (type de sol, espèce végétale, saison) : la limiter explicitement au contexte testé est une exigence de rigueur, pas une prudence excessive.",
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 3",
    text: "Un indice comme le NDVI sature à forte densité de végétation (au-delà d'un certain LAI, une augmentation de biomasse ne change presque plus le NDVI) : une corrélation qui s'affaiblit nettement aux valeurs élevées de la mesure biophysique est la signature attendue de cette saturation, pas une erreur de mesure.",
    items: [
      "Critère 1 : la corrélation et la RMSE sont calculées correctement",
      "Critère 2 : le résultat est discuté à la lumière de valeurs publiées comparables",
      "Critère 3 : la portée du résultat est explicitement limitée au contexte testé",
    ],
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Revoir : valider un indice contre une mesure biophysique",
    description: "Le module Les Couleurs détaille cette démarche de validation avant de la pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Note d'analyse",
    title: "Validation d'un indice contre une mesure réelle ou publiée",
    prompt: "Rédige une note d'analyse (400 mots) qui présente la corrélation obtenue entre un indice spectral et une mesure biophysique, la discute face à la littérature, et conclut sur la portée limitée du résultat.",
    criteria: [
      "La corrélation et la RMSE sont présentées avant toute interprétation",
      "Une comparaison avec des valeurs publiées est explicitement faite",
      "La conclusion limite la portée du résultat au contexte testé",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 4 : Séries temporelles et phénologie", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Une seule date ne renseigne qu'un instant. Une série temporelle d'un indice (module Les Couleurs, section 12) permet d'étudier la phénologie (le cycle saisonnier de la végétation) et de détecter une rupture réelle plutôt qu'une simple variation saisonnière.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Constituer une série temporelle de NDVI sur un même point ou une même parcelle, à partir d'images multi-dates (Copernicus Data Space, ou données déjà disponibles)",
      "Tracer la courbe NDVI en fonction du temps, identifier les phases (montée, pic, sénescence) du cycle végétatif",
      "Appliquer une détection de rupture simple sur la série (test de tendance, ou méthode plus avancée type BFAST si les outils sont disponibles)",
      "Distinguer, sur la courbe, ce qui relève du cycle saisonnier normal de ce qui pourrait signaler un changement réel (coupe, stress durable)",
    ],
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 4",
    text: "Une rupture phénologique réelle (coupe, dépérissement) se manifeste par une chute qui ne suit PAS le calendrier saisonnier habituel de la zone (ex. chute en plein printemps, période de pousse normale), alors qu'une simple sénescence automnale suit fidèlement le même calendrier chaque année : comparer plusieurs années de la même série est le seul moyen fiable de distinguer les deux.",
    items: [
      "Critère 1 : la série temporelle couvre au moins un cycle annuel complet",
      "Critère 2 : les phases phénologiques sont correctement identifiées sur la courbe",
      "Critère 3 : la distinction cycle normal / rupture réelle est argumentée, pas seulement affirmée",
    ],
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Revoir : séries temporelles et phénologie",
    description: "Le module Les Couleurs détaille cette approche avant de la pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Analyse de série",
    title: "Analyse phénologique d'une série temporelle réelle",
    prompt: "Constitue et analyse une série temporelle de NDVI sur un point ou une parcelle de ton choix, identifie les phases phénologiques et discute toute rupture éventuelle observée.",
    criteria: [
      "La série couvre au moins un cycle annuel",
      "Les phases sont correctement identifiées",
      "Toute rupture discutée est argumentée face au cycle saisonnier normal",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 5 : Classification par réseau de neurones simple", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Le module L'Intelligence détaille les CNN, U-Net et Transformers. Cette séance pratique le plus simple des réseaux de neurones, un perceptron multicouche (MLP), sur les mêmes données que la classification supervisée classique, pour comparer directement sa précision à celle d'un Random Forest sur un pied d'égalité.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Constater par la pratique qu'un réseau de neurones, même simple, s'entraîne et s'évalue exactement selon le même protocole qu'un classificateur classique (train/validation/test, matrice de confusion, kappa), la différence est dans le modèle, pas dans la méthodologie d'évaluation.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Reprendre le jeu d'entraînement/test du jeu de données Vitrolles (mêmes polygones, même découpage train/test, indispensable pour une comparaison honnête)",
      "Entraîner un MLP à une couche cachée avec scikit-learn (MLPClassifier) sur les bandes brutes et/ou les indices calculés comme variables d'entrée",
      "Faire varier le nombre de neurones de la couche cachée (10, 50, 200) et observer l'effet sur la précision d'entraînement vs de test",
      "Comparer la matrice de confusion et le kappa obtenus à ceux d'un Random Forest sur le même jeu de test",
      "Tracer la courbe de perte (loss_curve_) au fil des itérations, vérifier qu'elle décroît puis se stabilise sans jamais ré-augmenter",
    ],
  },
  {
    type: "formula",
    label: "Entraîner un MLP avec scikit-learn",
    formula: "clf = MLPClassifier(hidden_layer_sizes=(50,), max_iter=500); clf.fit(X_train, y_train)",
    note: "Contrairement à un CNN complet, ce MLP ne voit aucun voisinage spatial : chaque pixel est classé indépendamment de ses voisins, exactement comme un Random Forest pixel par pixel.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne pas présumer du vainqueur avant de mesurer",
    text: "L'intuition générale (un Random Forest généralise souvent mieux qu'un MLP sur peu de données) n'est qu'une tendance, pas une loi : elle peut être contredite sur un jeu de données précis, comme le montre le résultat réel ci-dessous.",
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 5 : résultat réel, mesuré sur le jeu de données Vitrolles",
    text: "Contrairement à l'intuition générale : le MLP à 50 neurones cachés fait légèrement MIEUX que le Random Forest sur le jeu de test : kappa 0.673 contre 0.640, pour une précision test quasi identique (96.3 % contre 96.2 %). Le MLP à 200 neurones (kappa 0.672) n'apporte rien de plus que celui à 50 : la capacité supplémentaire ne sert à rien ici, le facteur limitant est l'ambiguïté spectrale intrinsèque entre végétation et sol nu/bâti, pas la taille du réseau. Le Random Forest atteint 100 % de précision sur l'entraînement (sur-apprentissage net) quand le MLP plafonne à 97.3 %.",
    items: [
      "Critère 1 : le même découpage train/test est réutilisé à l'identique pour une comparaison valide",
      "Critère 2 : la courbe de perte est tracée et commentée",
      "Critère 3 : l'écart de précision entre MLP et Random Forest est interprété, pas seulement constaté",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : réseaux de neurones et sur-apprentissage",
    description: "Le module L'Intelligence détaille la fonction de perte, le sur-apprentissage et les architectures plus avancées.",
  },
  {
    type: "devoir",
    format: "Dissertation",
    title: "« Le deep learning rend-il obsolètes les méthodes de classification classiques en télédétection ? »",
    prompt: "Traite ce sujet en dissertation complète (plan dialectique conseillé), 600 mots minimum, en t'appuyant explicitement sur le résultat réel mesuré en séance (le MLP fait légèrement mieux qu'un Random Forest sur ce jeu précis) comme exemple concret.",
    criteria: [
      "Le plan est explicite et démonstratif",
      "Le résultat réel RF vs MLP est utilisé comme argument concret",
      "Une limite ou nuance est explicitement discutée",
      "La longueur minimale (600 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 6 : Valider statistiquement une classification", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "La séance précédente a comparé Random Forest et MLP sur le même jeu de test : le MLP obtient un kappa supérieur. Mais un écart de kappa observé sur un seul jeu de test suffit-il à conclure qu'un modèle est réellement meilleur, ou peut-il s'expliquer par le hasard de ce découpage particulier ? (module La Méthode, section 7, rigueur statistique).",
  },
  {
    type: "table",
    headers: ["Modèle", "Kappa (test, n = 37170)", "Exactitude (test)"],
    rows: [
      ["Random Forest", "0.6402", "0.9617"],
      ["MLP (50 neurones)", "0.6732", "0.9632"],
      ["MLP (200 neurones)", "0.6720", "0.9638"],
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger classification_reference.json (voir Ressources → Jeux de données) : il contient les trois matrices de confusion complètes",
      "À partir des matrices Random Forest et MLP(50), identifier les pixels que les deux modèles classent différemment : c'est la donnée nécessaire à un test de McNemar, le test standard pour comparer deux classifieurs évalués sur le même jeu de test",
      "Formuler l'hypothèse nulle explicitement : « les deux modèles se trompent avec la même fréquence, l'écart de kappa observé est compatible avec le hasard »",
      "Discuter ce qui rendrait cet écart de kappa (0.6402 contre 0.6732) plus ou moins convaincant : un grand nombre de désaccords cohérents dans un sens penche contre l'hypothèse nulle",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un seul jeu de test ne prouve jamais une supériorité générale",
    text: "Même si l'écart de kappa se révèle statistiquement significatif sur ce jeu de test précis, cela ne prouve pas que le MLP est supérieur au Random Forest en général, seulement sur cette scène, ce découpage et ces trois classes.",
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 6",
    text: "Le test de McNemar ne compare pas les scores agrégés (0.9617 contre 0.9632) mais spécifiquement les pixels où les deux modèles sont en désaccord : il ignore, à raison, tous les pixels classés de la même façon par les deux modèles, car ces cas ne renseignent en rien sur une différence entre eux. C'est une erreur fréquente de vouloir comparer deux exactitudes globales avec un test de Student : les deux échantillons ne sont pas indépendants (même jeu de test), condition que McNemar, conçu pour des données appariées, respecte.",
    items: [
      "Critère 1 : l'hypothèse nulle est formulée explicitement avant toute discussion du résultat",
      "Critère 2 : le raisonnement distingue clairement désaccords et accords",
      "Critère 3 : la conclusion reste prudente sur la portée du résultat",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : kappa et évaluation de précision",
    description: "Le module L'Intelligence détaille le calcul du kappa et les pièges classiques de l'évaluation d'une classification.",
  },
  {
    type: "devoir",
    format: "Note d'analyse",
    title: "Note d'analyse statistique de la comparaison RF / MLP",
    prompt: "Rédige une note d'analyse (300 à 500 mots) qui formule l'hypothèse nulle du test de McNemar, discute qualitativement ce qui rendrait l'écart de kappa observé plus ou moins convaincant, et conclut en rappelant la portée limitée du résultat.",
    criteria: [
      "L'hypothèse nulle est formulée correctement",
      "L'argument s'appuie sur les désaccords entre modèles, pas sur la simple différence d'exactitude globale",
      "La longueur demandée (300-500 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 7 : Krigeage avancé, validation croisée du variogramme", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Un krigeage se juge sur sa capacité prédictive réelle, pas sur la seule qualité visuelle de la carte produite : la validation croisée (leave-one-out) mesure objectivement cette capacité, une étape rarement pratiquée en dehors d'un contexte de recherche.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Reprendre un jeu de points avec variogramme déjà ajusté (ou en construire un nouveau sur un jeu de mesures réel)",
      "Retirer un point du jeu, prédire sa valeur par krigeage à partir des points restants, comparer à sa vraie valeur mesurée",
      "Répéter cette opération pour chaque point du jeu (validation croisée leave-one-out complète)",
      "Calculer l'erreur quadratique moyenne de validation croisée, et comparer plusieurs modèles de variogramme (sphérique, exponentiel, gaussien) sur ce critère plutôt qu'à l'œil",
      "Choisir le modèle final sur la base de cette validation, pas sur la seule apparence visuelle de l'ajustement",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un ajustement visuel n'est pas une validation",
    text: "Un variogramme qui semble bien ajusté à l'œil peut donner une moins bonne capacité prédictive réelle qu'un modèle légèrement moins élégant visuellement : seule la validation croisée tranche objectivement, jamais l'apparence de la courbe seule.",
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 7",
    text: "Le modèle de variogramme qui minimise l'erreur quadratique moyenne de validation croisée n'est pas toujours celui qui produit la carte visuellement la plus lisse : un compromis existe entre fidélité prédictive (ce que mesure la validation croisée) et lisibilité de la carte produite, à documenter explicitement dans le choix final.",
    items: [
      "Critère 1 : la validation croisée leave-one-out est réellement effectuée sur tous les points, pas un sous-échantillon",
      "Critère 2 : au moins deux modèles de variogramme sont comparés sur ce critère objectif",
      "Critère 3 : le choix final est justifié par le résultat de validation, pas par l'apparence seule",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : géostatistique et krigeage",
    description: "Le module Le Compas détaille le variogramme et la théorie du krigeage avant cette validation avancée.",
  },
  {
    type: "devoir",
    format: "Note d'analyse",
    title: "Comparaison de modèles de variogramme par validation croisée",
    prompt: "Compare au moins deux modèles de variogramme par validation croisée leave-one-out sur un jeu de points réel, justifie ton choix final par le résultat obtenu.",
    criteria: [
      "La validation croisée est réellement effectuée sur l'ensemble des points",
      "Au moins deux modèles sont comparés sur ce critère",
      "Le choix final est justifié par la validation, pas par l'apparence",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 8 : Analyse réseau et décision multicritère", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Certaines décisions territoriales combinent plusieurs critères de nature différente (module Le Compas, section 9) : l'analyse multicritère (AHP, Analytic Hierarchy Process) structure ce type de décision de façon reproductible, plutôt que par jugement intuitif non documenté.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Définir un problème de décision territoriale à plusieurs critères (ex. localisation optimale d'un équipement, en croisant distance au réseau routier, pente, exposition au risque)",
      "Construire une matrice de comparaison par paires entre les critères (méthode AHP, Saaty 1980) et en dériver des poids relatifs",
      "Calculer le ratio de cohérence de la matrice de comparaison, le vérifier acceptable (< 0.10) avant de poursuivre",
      "Combiner les critères pondérés en une carte de score final (algèbre raster, module Le Compas)",
      "Faire une analyse de sensibilité : les zones les mieux classées changent-elles significativement si un poids varie de ±20 % ?",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un ratio de cohérence trop élevé invalide la matrice",
    text: "Une matrice de comparaison par paires incohérente (A préféré à B, B préféré à C, mais C préféré à A) produit des poids qui ne reflètent aucun jugement stable : un ratio de cohérence supérieur à 0.10 signale qu'il faut revoir les comparaisons, pas poursuivre malgré tout.",
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 8",
    text: "L'analyse de sensibilité révèle souvent qu'une partie du territoire reste bien classée quel que soit le poids relatif des critères (zone robuste), tandis qu'une autre partie change de classement selon la pondération choisie (zone sensible au jugement de l'analyste) : distinguer les deux dans la restitution finale est plus honnête qu'une carte unique sans cette nuance.",
    items: [
      "Critère 1 : le ratio de cohérence de la matrice AHP est calculé et vérifié acceptable",
      "Critère 2 : l'analyse de sensibilité est réellement effectuée, pas seulement mentionnée",
      "Critère 3 : la restitution distingue zones robustes et zones sensibles au jugement",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : analyse réseau et décision multicritère",
    description: "Le module Le Compas détaille l'AHP et l'analyse réseau avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Rapport d'analyse multicritère",
    title: "Analyse multicritère complète avec sensibilité",
    prompt: "Réalise une analyse multicritère complète (AHP) sur un problème de décision territoriale de ton choix, avec vérification du ratio de cohérence et analyse de sensibilité.",
    criteria: [
      "Le ratio de cohérence est calculé et acceptable",
      "L'analyse de sensibilité distingue zones robustes et zones sensibles",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 9 : Au-delà du multispectral, l'imagerie hyperspectrale", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le multispectral (6 bandes, comme le jeu Vitrolles) résume le spectre en quelques bandes larges. L'hyperspectral (module Le Regard, section 12) mesure des centaines de bandes contiguës très fines : cette séance manipule une vraie signature spectrale complète plutôt qu'un simple indice à deux bandes.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger un extrait de données hyperspectrales publiques (ex. jeu AVIRIS, Pavia University, ou EnMAP, largement documentés et utilisés comme benchmarks académiques)",
      "Extraire la signature spectrale complète (réflectance en fonction de la longueur d'onde) de plusieurs pixels de classes différentes (végétation, sol, bâti)",
      "Comparer ces signatures complètes à ce qu'un capteur multispectral à 6 bandes aurait mesuré sur les mêmes pixels (sous-échantillonner les bandes hyperspectrales aux longueurs d'onde du multispectral)",
      "Identifier une caractéristique spectrale fine (absorption spécifique) visible en hyperspectral mais invisible en multispectral",
    ],
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 9",
    text: "Les bandes d'absorption étroites (ex. certaines signatures minérales, ou les red-edge fins de la végétation stressée) disparaissent complètement une fois les données sous-échantillonnées aux quelques bandes larges d'un capteur multispectral : c'est le compromis fondamental entre résolution spectrale et volume de données, déjà annoncé au module Le Regard (compromis résolution spatiale/spectrale/temporelle/radiométrique).",
    items: [
      "Critère 1 : la signature spectrale complète est réellement extraite pour plusieurs classes",
      "Critère 2 : la comparaison hyperspectral/multispectral sous-échantillonné est effectuée, pas seulement affirmée",
      "Critère 3 : une caractéristique fine perdue en multispectral est identifiée précisément",
    ],
  },
  {
    type: "link",
    to: "/module/teledetection",
    label: "Revoir : l'imagerie hyperspectrale",
    description: "Le module Le Regard détaille les principes de l'hyperspectral avant cette manipulation pratique.",
  },
  {
    type: "devoir",
    format: "Note d'analyse",
    title: "Signature spectrale comparée, hyperspectral vs multispectral",
    prompt: "Sur un jeu hyperspectral public de ton choix, compare les signatures spectrales complètes de deux classes à ce qu'un capteur multispectral en aurait vu, identifie ce qui se perd.",
    criteria: [
      "Les signatures complètes sont réellement extraites et présentées",
      "La comparaison au multispectral sous-échantillonné est effectuée",
      "Une perte d'information précise est identifiée",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 10 : Transfert radiatif et polarimétrie SAR", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le module Le Regard présente la physique complète du transfert radiatif et de la polarimétrie SAR (section 13) : cette séance en pratique un aspect concret, la décomposition polarimétrique.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger une scène Sentinel-1 en mode double polarisation (VV+VH) sur une zone mêlant eau, végétation et bâti",
      "Calculer le ratio VH/VV, un indicateur classique de structure de végétation (une végétation dense dépolarise davantage le signal)",
      "Mettre en œuvre une décomposition polarimétrique simple (Freeman-Durden à 3 composantes si les données quad-pol sont disponibles, sinon une approche double-pol simplifiée)",
      "Identifier, sur la carte de décomposition, les zones dominées par la réflexion de surface, le double rebond, et la diffusion volumique",
      "Relier chaque composante dominante au type de couverture au sol observé (module Le Regard, réflexion spéculaire/double rebond/diffusion)",
    ],
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 10",
    text: "L'eau calme domine par réflexion de surface (spéculaire, signal renvoyé loin du capteur, donc sombre), le bâti dense par double rebond (façade + sol, signal fort), la végétation par diffusion volumique (dépolarisation dans le couvert), une lecture directement dérivée de la physique du transfert radiatif présentée au module Le Regard, ici mesurée plutôt qu'affirmée.",
    items: [
      "Critère 1 : le ratio VH/VV est calculé et cartographié correctement",
      "Critère 2 : la décomposition polarimétrique identifie les trois mécanismes dominants",
      "Critère 3 : chaque mécanisme est relié explicitement à la physique du transfert radiatif",
    ],
  },
  {
    type: "link",
    to: "/module/teledetection",
    label: "Revoir : transfert radiatif et polarimétrie SAR",
    description: "Le module Le Regard détaille cette physique complète avant sa mise en pratique ici.",
  },
  {
    type: "devoir",
    format: "Note d'analyse",
    title: "Décomposition polarimétrique commentée",
    prompt: "Réalise et commente une décomposition polarimétrique sur une scène Sentinel-1 double-pol de ton choix, en reliant chaque mécanisme dominant identifié au type de couverture au sol réel.",
    criteria: [
      "La décomposition est réellement effectuée, pas seulement décrite en théorie",
      "Chaque mécanisme est relié à une observation réelle du terrain",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 11 : Étude de cas, mini-projet de recherche", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Les dix séances précédentes traitent chacune une compétence isolée. Ce mini-projet les combine, au service d'une vraie question de recherche cadrée dès la séance Master/Recherche 1 : le rendu attendu est délibérément plus exigeant, une analyse qui montre une compréhension réelle de l'outil et de la matière, pas seulement une carte techniquement correcte.",
  },
  {
    type: "list",
    items: [
      "Risques naturels : croiser indices d'humidité/de végétation, pente et vent pour cartographier un risque incendie (voir le module Les Couleurs pour un exemple réel d'indice composite de comportement du feu)",
      "Agriculture de précision : suivi du NDVI d'une parcelle dans le temps pour cibler l'irrigation ou détecter un stress hydrique précoce",
      "Urbanisme : NDBI et séries temporelles pour mesurer l'étalement urbain d'une commune sur dix ans",
      "Climat et environnement : détection de changement (déforestation, recul d'un glacier) par comparaison de deux dates, avec validation statistique de la significativité du changement",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Cahier des charges du mini-projet de recherche",
    text: "Reprendre la question de recherche cadrée en séance Master/Recherche 1 (ou en formuler une nouvelle sur le même modèle). Produire une carte finale combinant au minimum une donnée vecteur, un indice ou une classification, et au moins une validation statistique du résultat (corrélation, test de significativité, ou validation croisée selon le sujet). Le rendu est une carte mise en page accompagnée d'un rapport structuré selon le module La Méthode et la grille Recherche de la page Évaluation.",
  },
  {
    type: "table",
    headers: ["Section évaluée", "Barème indicatif"],
    rows: [
      ["Question de recherche et hypothèse (précision, falsifiabilité)", "/3"],
      ["Données et méthode (reproductible, prétraitement documenté)", "/4"],
      ["Validation statistique du résultat", "/4"],
      ["Carte de synthèse (sémiologie, légende, lisibilité)", "/3"],
      ["Discussion (limites, portée du résultat, ouverture)", "/4"],
      ["Forme du rendu", "/2"],
    ],
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 11 : grille d'auto-évaluation du rendu",
    items: [
      "La question de recherche est répondable par une mesure précise, formulée dès l'introduction",
      "Le prétraitement des données est explicitement documenté (niveau de correction, CRS, résolution)",
      "Une validation statistique réelle accompagne le résultat, pas une simple affirmation qualitative",
      "La discussion sépare nettement résultats et interprétation",
      "La portée du résultat est explicitement limitée au contexte testé",
    ],
  },
  {
    type: "link",
    to: "/module/methodologie",
    label: "Structurer le rapport selon IMRaD",
    description: "Le module La Méthode détaille la structure IMRaD et la rigueur statistique attendue d'un travail de recherche.",
  },
  {
    type: "devoir",
    format: "Rapport de recherche",
    title: "Rapport complet du mini-projet de recherche",
    prompt: "Rédige le rapport complet de ton mini-projet : question de recherche, données et méthode documentées, résultats présentés avant interprétation, validation statistique explicite, discussion des limites.",
    criteria: [
      "Chaque section du barème ci-dessus est identifiable dans le rendu",
      "Une validation statistique réelle accompagne le résultat principal",
      "La discussion admet explicitement au moins une limite réelle",
    ],
  },

  { type: "heading", text: "Séance Master/Recherche 12 : Rédiger un mémoire structuré IMRaD", level: "approfondissement" },
  {
    type: "callout",
    tone: "info",
    title: "Objectif méthodologique",
    text: "Le mini-projet de la séance précédente produit un résultat. Celle-ci le fait rédiger dans le format standard de la publication scientifique, IMRaD (Introduction, Méthode, Résultats, Discussion), module La Méthode section 7, grille Recherche de la page Évaluation.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Reprendre le résultat du mini-projet de recherche (séance Master/Recherche 11)",
      "Rédiger une revue de littérature courte qui situe le travail par rapport à l'existant (au moins 3 sources réelles citées), pas une simple liste de résumés juxtaposés",
      "Structurer le corps en IMRaD strict : introduction (contexte, question, hypothèse), méthode (reproductible), résultats (sans interprétation), discussion (interprétation, limites, ouverture)",
      "Vérifier la cohérence entre la méthode annoncée en introduction et celle réellement décrite en section méthode",
      "Constituer une bibliographie complète et normée, effectivement citée dans le corps du texte",
    ],
  },
  {
    type: "solution",
    title: "Séance Master/Recherche 12",
    text: "L'erreur la plus fréquente d'un premier mémoire IMRaD est de laisser filtrer de l'interprétation dans la section résultats (« le NDVI, en forte baisse, révèle un stress hydrique préoccupant » mélange un fait et une interprétation) : la section résultats doit se limiter au fait mesuré (« le NDVI moyen a baissé de 0.12 entre les deux dates »), l'interprétation n'apparaissant qu'en discussion.",
    items: [
      "Critère 1 : la revue de littérature situe réellement le travail, pas une juxtaposition de résumés",
      "Critère 2 : la section résultats ne contient aucune interprétation, strictement séparée de la discussion",
      "Critère 3 : la bibliographie est complète, normée, et effectivement citée dans le texte",
    ],
  },
  {
    type: "link",
    to: "/magister/evaluation",
    label: "Confronter le mémoire à la grille Recherche",
    description: "La page Évaluation détaille les critères de correction attendus pour un mémoire structuré IMRaD.",
  },
  {
    type: "devoir",
    format: "Mémoire",
    title: "Mémoire complet structuré IMRaD",
    prompt: "Rédige le mémoire complet de ton mini-projet de recherche selon la structure IMRaD stricte, avec revue de littérature et bibliographie normée.",
    criteria: [
      "La structure IMRaD est strictement respectée",
      "La section résultats ne contient aucune interprétation",
      "La bibliographie est complète, normée et effectivement citée",
    ],
  },
]
