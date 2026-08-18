import type { ContentBlock } from "./types"

export const travauxPratiquesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Chaque séance ci-dessous est autonome : elle peut constituer un TP complet à elle seule, avec son objectif, ses exercices à plusieurs niveaux, ses ressources et un corrigé dépliable. Elles sont néanmoins conçues pour s'enchaîner, en particulier les séances 2 et 3, qui réutilisent directement le résultat l'une de l'autre. Utilise le module La Méthode pour la structure attendue d'un compte-rendu ou d'un rapport, et le module Références pour les sources de données et de documentation. Le corrigé de chaque séance est volontairement masqué par défaut : chercher d'abord, comparer ensuite, c'est la vérification qui consolide l'apprentissage, pas la lecture seule de la réponse.",
  },
  {
    type: "diagram",
    name: "workflow-tp",
    caption: "Le fil directeur des séances : de la donnée brute géoréférencée jusqu'à la carte de synthèse et son rapport.",
  },

  { type: "heading", text: "Le jeu de données canonique : une vraie scène Sentinel-2" },
  {
    type: "paragraph",
    text: "Plutôt que de renvoyer vers « télécharge une image quelque part », plusieurs séances ci-dessous (3, 5, 6, 7, 9) s'appuient sur un même jeu de données réel, extrait directement de l'archive Copernicus et fourni avec le site : une scène Sentinel-2 authentique, quasiment sans nuage, sur une emprise de 3,2 × 3,3 km à Vitrolles (Bouches-du-Rhône), qui mélange volontairement bâti dense, infrastructure aéroportuaire, végétation de garrigue et une portion de l'étang de Berre, de quoi illustrer chaque indice du module Les Couleurs sur un seul et même territoire.",
  },
  {
    type: "image",
    src: "/images/sample-vitrolles-2024-rgb.jpg",
    alt: "Composition colorée réelle (rouge/vert/bleu) de la scène Sentinel-2 du 6 août 2024 sur Vitrolles",
    caption: "Composition couleur naturelle réelle, scène S2B_31TFJ_20240806_0_L2A (6 août 2024, 0.008 % de nuages). Étang de Berre en haut à gauche, tissu urbain de Vitrolles à droite, piste de l'aéroport Marseille-Provence en bas à gauche.",
  },
  {
    type: "image",
    src: "/images/sample-vitrolles-2024-ndvi.jpg",
    alt: "NDVI réel calculé sur la même emprise, palette marron-blanc-vert",
    caption: "Le NDVI réellement calculé sur cette même image (formule du module Les Couleurs) : le contraste végétation (vert) / bâti-piste-eau (blanc à marron) saute aux yeux sans aucune interprétation nécessaire.",
  },
  {
    type: "table",
    headers: ["Fichier", "Contenu"],
    rows: [
      ["sentinel2_2024-08-06_vitrolles_bands.tif", "6 bandes réelles en réflectance de surface (0–1) : bleu, vert, rouge, red-edge (B5), NIR, SWIR (B11), EPSG:2154, 10 m"],
      ["sentinel2_2024-08-06_vitrolles_indices.tif", "NDVI, NDMI, NDBI, NDRE, NDWI déjà calculés, en 5 bandes, pour vérifier un calcul plutôt que le refaire"],
      ["emprise.geojson", "Polygone exact de l'emprise, pour un découpage (clip) propre"],
      ["grille_100m_indices.geojson", "1122 cellules de 100 m avec la moyenne réelle de NDVI/NDMI/NDBI par cellule, résultat de référence pour la séance 3"],
      ["stats.json", "Statistiques réelles (min/max/moyenne/écart-type) de chaque indice sur toute l'emprise"],
    ],
  },
  {
    type: "formula",
    label: "Accès direct aux fichiers",
    formula: "/data/sample-vitrolles-2024/<nom-du-fichier>",
    note: "Les 5 fichiers du tableau ci-dessus sont servis statiquement par le site à cette adresse relative (ex. /data/sample-vitrolles-2024/emprise.geojson), à charger directement dans QGIS (Couche > Ajouter une couche) via l'URL complète du site, ou à télécharger avec un clic droit > Enregistrer sous depuis le navigateur.",
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

  { type: "heading", text: "Séance 1 : Cartographie de base sous QGIS", level: "lycee" },
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
    text: "Une donnée numérique continue (population, superficie) se porte par la variable visuelle valeur (dégradé clair → foncé d'une même teinte) ou par la taille (ronds proportionnels), jamais par une palette de teintes qualitatives sans ordre, voir le module La Méthode, section sémiologie graphique. Une classification par quantiles (autant d'entités par classe) donne en général une carte plus lisible qu'une classification à intervalles égaux quand la donnée est très inégalement répartie (cas fréquent d'une population communale). Le CRS du projet doit afficher EPSG:2154 en bas à droite avant tout calcul de surface : sinon $area renvoie une valeur en degrés carrés, inexploitable.",
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
  {
    type: "devoir",
    format: "Carte",
    title: "Une carte thématique simple, sur une vraie donnée publique",
    prompt: "En reprenant exactement la méthode de la séance 1 (télécharger, vérifier le CRS, styliser, mettre en page), produis une carte de la répartition d'un indicateur au choix (population, superficie, densité…) sur les communes d'un département de ton choix, à partir d'un jeu de données réel de data.gouv.fr. La carte doit être exportée en PDF ou image, prête à être présentée telle quelle.",
    criteria: [
      "Le CRS du projet est vérifié et correspond à un système projeté métrique",
      "La variable visuelle (taille, valeur ou teinte) correspond au type de donnée représentée",
      "Légende, échelle et orientation figurent toutes trois sur la mise en page finale",
      "La source des données (nom du jeu, date de téléchargement) est indiquée sur la carte ou en note",
    ],
  },

  { type: "heading", text: "Séance 2 : Géoréférencer une image par grille", level: "superieur" },
  {
    type: "paragraph",
    text: "Une image scannée ou une photo aérienne ancienne n'a, à l'origine, aucune coordonnée : ses pixels ne sont repérés que par leur ligne et leur colonne. La géoréférencer, c'est établir la correspondance entre ces pixels et de vraies coordonnées terrain, une compétence indispensable pour exploiter n'importe quelle archive cartographique ou image non géoréférencée.",
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
    text: "Un géoréférencement peut sembler correct visuellement tout en étant décalé de plusieurs dizaines de mètres. Toujours comparer le résultat à une couche de référence connue et indépendante (ex. un réseau routier ou une grille administrative déjà géoréférencée) avant de considérer l'image comme fiable : c'est la même logique de contrôle indépendant que la RMSE présentée au module Le Compas.",
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
    text: "Sur une grille régulière sans rotation, une transformation affine à 6 points bien répartis donne typiquement un résidu par point inférieur à 1/100e de l'espacement réel de la grille (par exemple, moins de 20 m de résidu pour une grille DFCI espacée de 2 km), un résidu du même ordre de grandeur que l'espacement de la grille signale presque toujours une erreur de lecture de coordonnée sur au moins un point, pas une limite de la méthode. Une transformation polynomiale d'ordre 2 avec seulement 4-6 points donne souvent un résidu affiché plus faible que l'affine, sans que ce soit un signe de meilleure qualité : c'est un sur-ajustement (le polynôme absorbe le bruit de pointage plutôt que la vraie distorsion), à éviter en dessous d'une dizaine de points de contrôle.",
    items: [
      "Critère 1 : au moins 6 GCP utilisés, répartis sur toute l'étendue de l'image (pas regroupés dans un coin)",
      "Critère 2 : le résidu par point, une fois la transformation calculée, reste très inférieur à l'espacement réel de la grille",
      "Critère 3 : le résultat est comparé à une couche de référence indépendante avant d'être considéré comme fiable",
    ],
  },
  {
    type: "devoir",
    format: "Introduction",
    title: "Rédiger l'introduction d'un compte-rendu de géoréférencement",
    prompt: "Avant même d'avoir les résultats, rédige l'introduction (150 à 200 mots) du compte-rendu de la séance 2 : contexte (nature du document à géoréférencer, pourquoi il en a besoin), objectif précis (quelle exploitation ultérieure ce géoréférencement doit permettre), et méthode annoncée (grille de coordonnées, nombre de points de contrôle prévu, transformation envisagée), sans anticiper les résultats eux-mêmes, qui n'ont pas leur place ici.",
    criteria: [
      "Le contexte explique la nature du document et pourquoi un géoréférencement est nécessaire, pas seulement « on va géoréférencer une image »",
      "L'objectif est formulé de façon précise, pas comme un simple rappel du titre de la séance",
      "La méthode est annoncée (grille, nombre de points, transformation) sans qu'aucun résultat ou chiffre de résidu n'apparaisse encore",
      "Le texte respecte la fourchette de longueur demandée (150-200 mots), signe d'un travail de synthèse réel",
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
      "Calculer le NDVI sur l'image nouvellement géoréférencée (calculatrice raster, voir module Le Regard/Les Couleurs pour la formule), sans géoréférencement préalable, ce calcul produirait un résultat exact en valeur mais inutilisable en position",
      "Superposer une grille régulière (fishnet) sur l'emprise de l'image et calculer, pour chaque cellule, la moyenne du NDVI qu'elle contient (Vecteur > Analyse > Statistiques de zone, ou l'outil « Statistiques de zone » du menu Raster, voir module Le Compas, section algèbre raster)",
      "Répéter le géoréférencement et le calcul de NDVI sur une seconde image de la même zone, prise à une date différente",
      "Composer un indice complexe à partir des deux dates : ΔNDVI = NDVI(date 2) − NDVI(date 1), qui met en évidence les zones de changement plutôt que l'état à un instant donné",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi passer par la cellule plutôt que le pixel seul",
    text: "Une moyenne par cellule lisse le bruit pixel-à-pixel et rend le résultat directement comparable à une grille administrative ou réglementaire (commune, parcelle, zone de gestion), c'est la même logique que les statistiques zonales utilisées dans un vrai projet de suivi de territoire.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Valider sa propre méthode contre un résultat déjà connu",
    text: "Une fois l'étape 2 maîtrisée sur une image personnelle, la refaire sur sentinel2_2024-08-06_vitrolles_bands.tif (le jeu de données canonique présenté en tête de ce module) permet une vraie vérification : grille_100m_indices.geojson donne déjà, pour 1122 cellules de 100 m, la moyenne réelle de NDVI/NDMI/NDBI calculée sur les mêmes bandes. Un fishnet + statistiques de zone fait correctement sur ce fichier doit reproduire ces valeurs à peu de choses près (petits écarts possibles selon l'alignement exact de la grille), un net écart signale une erreur dans sa propre chaîne de traitement, pas une variante légitime.",
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
  {
    type: "devoir",
    format: "Analyse de texte",
    title: "Analyser l'article fondateur d'un indice que tu viens d'utiliser",
    prompt: "Trouve et lis le résumé (abstract) de l'article original ayant introduit le NDVI (Rouse et al., 1974, « Monitoring vegetation systems in the Great Plains with ERTS ») ou celui du SAVI (Huete, 1988, « A soil-adjusted vegetation index »), les deux sont largement documentés et cités dans la littérature de télédétection, cherchables par leur titre exact. Rédige une analyse de 300 à 400 mots qui répond à trois questions : quel problème concret l'auteur cherchait-il à résoudre ? quelle est l'idée centrale de sa solution ? en quoi la limite qu'il identifie (ou corrige) rejoint-elle ce que tu as observé toi-même en séance 3 (ΔNDVI, confusion sol nu/végétation clairsemée) ?",
    criteria: [
      "La source exacte (auteur, année, titre) est citée, pas une paraphrase anonyme de « un article sur le NDVI »",
      "Le problème initial identifié par l'auteur est reformulé avec ses propres mots, pas recopié",
      "Un lien explicite est établi avec l'expérience concrète de la séance 3, pas une simple juxtaposition",
      "La longueur demandée (300-400 mots) est respectée : ni un résumé trop court, ni un remplissage hors sujet",
    ],
  },

  { type: "heading", text: "Séance 4 : Analyse spatiale, buffer et intersection", level: "lycee" },
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
    text: "Une parcelle qui chevauche partiellement le buffer (et non entièrement) apparaît en plusieurs entités après l'intersection : une pour la portion dans le buffer, la géométrie d'origine de la parcelle n'est pas conservée telle quelle. C'est le comportement normal de l'outil Intersection, pas une erreur : sommer $area sur le résultat donne bien la surface réellement concernée par la contrainte, même pour les parcelles partiellement traversées.",
    items: [
      "Critère 1 : le buffer est créé sur une couche en CRS projeté métrique (EPSG:2154), jamais en degrés",
      "Critère 2 : le résultat de l'intersection contient une entité par portion de parcelle réellement recoupée par le buffer, pas par parcelle entière",
      "Critère 3 : la surface totale est calculée par somme de $area sur le résultat de l'intersection, pas sur la couche de parcelles d'origine",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : buffer, intersection et opérations spatiales",
    description: "Le module Le Compas détaille les opérations spatiales (buffer, intersection, union, différence) mobilisées dans cette séance, avant de les pratiquer ici.",
  },
  {
    type: "devoir",
    format: "Carte",
    title: "Carte d'une contrainte réglementaire réelle, buffer + intersection",
    prompt: "Choisis une contrainte réglementaire réelle basée sur une distance (bande de 200 m autour d'un cours d'eau, périmètre de protection autour d'un monument, zone tampon autour d'une ICPE…) sur un territoire de ton choix. Produis une carte qui montre la zone tampon, les parcelles ou bâtiments concernés (résultat de l'intersection), et une légende qui distingue clairement les entités entièrement incluses des entités seulement partiellement recoupées. Accompagne la carte d'un paragraphe de critique du document (module La Méthode, section 1) : quelle limite cette analyse comporte-t-elle (distance réglementaire simplifiée, données parcellaires pas toujours à jour…) ?",
    criteria: [
      "Le buffer est calculé sur une couche projetée métrique, la distance correspond à une vraie contrainte nommée et sourcée",
      "La légende distingue visuellement les entités entièrement dans le buffer de celles seulement partiellement recoupées",
      "La surface totale concernée est indiquée sur la carte ou dans le texte d'accompagnement",
      "Le paragraphe de critique identifie au moins une limite réelle de l'analyse, pas une remarque générique",
    ],
  },

  { type: "heading", text: "Bonus séance 4 : la même question, sur une donnée vivante" },
  {
    type: "paragraph",
    text: "Le jeu de données canonique (bâti, végétation, eau) est une photographie figée au 06/08/2024. OpenStreetMap couvre la même emprise exacte, mais c'est une donnée vivante (VGI, volunteered geographic information) : n'importe quel contributeur peut la corriger ou la compléter à tout moment. Le bloc ci-dessous interroge l'API Overpass en direct, au moment où tu charges cette page, pas une capture figée à l'avance.",
  },
  { type: "live", name: "osm-buffer-vitrolles", caption: "Planche vivante. Mêmes bornes géographiques que l'emprise Sentinel-2 canonique, comptées en direct sur OpenStreetMap." },
  {
    type: "callout",
    tone: "example",
    title: "Consigne",
    text: "Note le nombre de bâtiments affiché. Recharge la page dans quelques minutes (bouton « Rafraîchir ») : le chiffre a-t-il changé ? Compare ensuite ce nombre à ta propre lecture visuelle du bâti sur l'image Sentinel-2 de la séance 1, te semble-t-il cohérent (même ordre de grandeur), ou la couverture OSM te paraît-elle nettement incomplète sur cette zone précise ?",
  },
  {
    type: "solution",
    title: "Bonus séance 4",
    text: "Il n'y a volontairement pas de nombre \"correct\" à retenir ici : c'est le point de l'exercice. Deux lectures possibles, selon ce que tu observes : si le nombre de bâtiments OSM est proche de ta lecture visuelle, la zone est bien cartographiée par la communauté (fréquent en zone urbaine dense en France). S'il est nettement inférieur, tu viens de mettre en évidence une limite réelle et fréquente des données participatives (VGI) : une complétude très inégale selon les zones et les contributeurs locaux, contrairement à un jeu de données satellite qui, lui, couvre uniformément tout le territoire à chaque passage : c'est la différence entre donnée autoritative (Sentinel-2, produite et validée de façon homogène) et donnée participative (OSM, aussi bonne que ses contributeurs locaux).",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : opérations spatiales et sources de données",
    description: "Le module Le Compas détaille les opérations spatiales appliquées ici à une donnée interrogée en direct plutôt qu'à un fichier statique.",
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
    note: "Reprendre le GeoDataFrame de l'exercice 1, créer un buffer de 200 m autour de chaque point, puis calculer l'aire cumulée de tous les buffers (attention aux chevauchements, non gérés par une simple somme, utiliser gdf.unary_union avant de mesurer l'aire réelle couverte).",
  },
  {
    type: "formula",
    label: "Exercice 3 (avancé) : automatiser un calcul NDVI par lot",
    formula: "for red, nir in zip(sorted(glob('*_B04.tif')), sorted(glob('*_B08.tif'))): ndvi = (read(nir) - read(red)) / (read(nir) + read(red))",
    note: "Avec rasterio : parcourir un dossier contenant plusieurs paires de bandes rouge/NIR, calculer le NDVI de chacune, et enregistrer chaque résultat sous un nom dérivé du fichier source, la base de tout traitement par lot en télédétection.",
  },
  {
    type: "formula",
    label: "Exercice 4 (découverte) : inspecter une donnée en ligne de commande avec GDAL",
    formula: "gdalinfo -stats sentinel2_2024-08-06_vitrolles_indices.tif",
    note: "GDAL/OGR (la bibliothèque sur laquelle repose la quasi-totalité des logiciels SIG, dont QGIS) fournit des utilitaires en ligne de commande pour inspecter rapidement une couche sans l'ouvrir dans une interface graphique : ogrinfo pour le vecteur (nombre d'entités, CRS, champs), gdalinfo pour le raster (dimensions, résolution, statistiques par bande). Sur le fichier réel du jeu de données canonique (bande 1 = NDVI), gdalinfo -stats doit afficher un minimum proche de -1, un maximum proche de 1 et une moyenne proche de 0.33 : les mêmes chiffres que le callout \"Valeurs réelles de référence\" en tête de ce module : un réflexe utile pour vérifier une donnée avant de l'intégrer à un traitement automatisé plus long, ou simplement pour confirmer qu'un fichier téléchargé n'est pas corrompu.",
  },
  {
    type: "solution",
    title: "Séance 5",
    text: "Exercice 1 : le piège le plus fréquent est d'oublier crs='EPSG:4326' à la construction du GeoDataFrame (les colonnes lon/lat n'étant que des nombres, GeoPandas ne devine jamais le CRS source), sans cette précision, la reprojection ultérieure vers EPSG:2154 produit un résultat silencieusement faux, sans erreur levée. Exercice 2 : gdf.to_crs(epsg=2154).geometry.buffer(200).unary_union.area donne l'aire réellement couverte (chevauchements fusionnés) ; gdf.buffer(200).area.sum() surestime dès que deux buffers se recouvrent, ce qui est fréquent sur des points rapprochés. Exercice 3 : diviser par np.where(denominateur==0, 1, denominateur) ou utiliser un masque évite une division par zéro sur les pixels où NIR+Rouge = 0 (bordures de l'image, valeurs nodata). Exercice 4 : gdalinfo -stats ajoute les statistiques (min/max/moyenne/écart-type) aux métadonnées du fichier, utile pour repérer d'un coup d'œil un NDVI hors de l'intervalle [-1, 1], signe d'une erreur en amont.",
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
    prompt: "Trouve deux sources distinctes (documentation officielle, article de blog technique signé, présentation de conférence FOSS4G/PyData…) qui discutent, chacune à sa manière, du choix entre automatiser un traitement dans PyQGIS ou dans un pipeline Python autonome (GeoPandas, rasterio). Rédige une synthèse de 250 mots qui ne juxtapose pas les deux sources l'une après l'autre, mais les met en dialogue : sur quel critère sont-elles d'accord, sur lequel divergent-elles, et quelle est ta propre conclusion sur ce jeu de données précis (celui de Vitrolles) ?",
    criteria: [
      "Les deux sources sont identifiées précisément (auteur/organisation, titre, où les trouver), pas de « j'ai lu quelque part que »",
      "La synthèse compare les deux sources entre elles, pas un résumé de la première puis un résumé de la seconde",
      "Une conclusion personnelle et justifiée referme le texte, appliquée au cas du jeu de données Vitrolles",
      "La longueur (250 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance 6 : Classification supervisée et évaluation de précision", level: "approfondissement" },
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
      "Charger sentinel2_2024-08-06_vitrolles_bands.tif (jeu de données canonique ci-dessus) et sa bande SCL, la Scene Classification Layer, calculée par l'algorithme officiel ESA/Sen2Cor, une vérité terrain déjà disponible sans digitalisation manuelle pour 3 classes franches : végétation, sol nu/bâti, eau",
      "Réserver un tiers de l'emprise (par exemple le tiers droit) comme jeu de test, jamais montré à l'entraînement, un découpage spatial, pas un tirage aléatoire pixel par pixel (voir module L'Intelligence, mise en garde sur la fuite de données)",
      "Entraîner une classification supervisée (Random Forest, scikit-learn ou SCP dans QGIS) sur les deux tiers restants uniquement, avec les 6 bandes comme variables d'entrée",
      "Appliquer le classifieur à l'ensemble de l'emprise",
      "Construire la matrice de confusion entre la classification obtenue et les pixels de test, puis calculer la précision globale et le coefficient kappa (formules détaillées au module L'Intelligence)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais évaluer un modèle sur les données qui ont servi à l'entraîner",
    text: "Calculer la précision d'une classification sur les mêmes pixels que ceux utilisés pour l'entraîner donne un chiffre optimiste, souvent proche de 100 %, qui ne dit rien de la performance réelle du modèle sur le reste de l'image. C'est l'erreur méthodologique la plus grave et la plus fréquente en classification supervisée, voir la mise en garde sur la fuite de données au module L'Intelligence.",
  },
  {
    type: "solution",
    title: "Séance 6 : résultat réel, mesuré sur le jeu de données Vitrolles (pas une estimation)",
    text: "Sur ce jeu réel (113 000 pixels labellisés par la SCL, découpage spatial 2/3 gauche = entraînement / 1/3 droit = test) : un Random Forest à 200 arbres atteint 100 % de précision sur l'entraînement mais seulement 96.2 % sur le test, avec un kappa de 0.640 : l'écart net entre les deux confirme le sur-apprentissage attendu d'un Random Forest peu contraint (module L'Intelligence, section sur-apprentissage). La matrice de confusion réelle montre la quasi-totalité des erreurs sur la frontière végétation ↔ sol nu/bâti (1009 pixels de végétation classés sol nu/bâti sur 2390 pixels de végétation en test), cohérent avec la confusion bâti/sol nu déjà annoncée au module Les Couleurs.",
    items: [
      "Critère 1 : le découpage entraînement/test est spatial (par zone), jamais un tirage aléatoire pixel par pixel",
      "Critère 2 : la matrice de confusion réelle est présentée avant toute interprétation, comme un vrai rapport technique (voir module La Méthode)",
      "Critère 3 (piège réel rencontré sur ce jeu de données) : la classe eau, présente uniquement dans l'étang de Berre en haut à gauche de l'emprise, se retrouve à 100 % du côté entraînement avec ce découpage par tiers verticaux : 0 pixel d'eau dans le jeu de test. Un score de précision qui semble bon peut donc masquer une classe jamais réellement évaluée : toujours vérifier que chaque classe a des effectifs non nuls des deux côtés du découpage avant de faire confiance au score global.",
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
    format: "Analyse de texte",
    title: "Analyser une source méthodologique sur l'évaluation d'une classification",
    prompt: "Cherche une source qui traite spécifiquement de l'évaluation de précision d'une classification (matrice de confusion, kappa, ou leurs limites, par exemple un article citant Congalton, 1991, référence classique du domaine, ou une documentation technique d'un organisme comme l'ESA/Copernicus). Rédige une analyse de 350 mots qui met en regard ce que dit la source et le résultat réel mesuré en séance 6 (kappa 0.640, erreurs concentrées sur la frontière végétation/sol nu, classe eau totalement absente du jeu de test) : la source permet-elle d'expliquer ou de relativiser ce résultat précis ?",
    criteria: [
      "La source est identifiée précisément, pas anonyme",
      "L'analyse convoque explicitement les chiffres réels de la séance 6 (kappa, matrice de confusion), pas seulement des généralités",
      "Le texte distingue clairement ce qui vient de la source de ce qui est une interprétation personnelle",
      "La longueur (350 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance 7 : Classification par réseau de neurones simple", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Le module L'Intelligence détaille les CNN, U-Net et Transformers, mais la séance 6 n'a mis en pratique que des classificateurs classiques (maximum de vraisemblance, forêts aléatoires). Cette séance ferme cet écart avec le plus simple des réseaux de neurones, un perceptron multicouche (MLP), sur les mêmes données qu'en séance 6, pour comparer directement sa précision à celle d'un Random Forest sur un pied d'égalité.",
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
      "Reprendre le jeu d'entraînement/test de la séance 6 (mêmes polygones, même découpage train/test, condition indispensable pour une comparaison honnête)",
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
    note: "X_train : tableau des bandes/indices par pixel ou par polygone d'entraînement ; y_train : la classe correspondante. Contrairement à un CNN complet (module L'Intelligence), ce MLP ne voit aucun voisinage spatial : chaque pixel est classé indépendamment de ses voisins, exactement comme le Random Forest de la séance 6. La différence de précision observée, si elle existe, vient donc uniquement de la capacité du modèle à combiner les variables d'entrée, pas d'une information spatiale supplémentaire.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne pas présumer du vainqueur avant de mesurer",
    text: "L'intuition générale (un Random Forest généralise souvent mieux qu'un MLP sur peu de données, l'avantage des réseaux de neurones apparaissant surtout à grande échelle) n'est qu'une tendance, pas une loi : elle peut être contredite sur un jeu de données précis, comme le montre le résultat réel ci-dessous. La bonne pratique n'est jamais de présumer lequel gagnera, mais de toujours mesurer sur son propre jeu de test.",
  },
  {
    type: "solution",
    title: "Séance 7 : résultat réel, mesuré sur le même jeu de données que la séance 6",
    text: "Contrairement à l'intuition générale : sur ce jeu réel, le MLP à 50 neurones cachés fait légèrement MIEUX que le Random Forest de la séance 6 sur le jeu de test : kappa 0.673 contre 0.640, pour une précision test quasi identique (96.3 % contre 96.2 %). Le MLP à 200 neurones cachés (kappa 0.672, précision test 96.4 %) n'apporte rien de plus que celui à 50 neurones : la capacité supplémentaire ne sert à rien ici, le facteur limitant n'est pas la taille du réseau mais l'ambiguïté spectrale intrinsèque entre végétation et sol nu/bâti à cette résolution. Autre différence réelle mesurée : le Random Forest atteint 100 % de précision sur l'entraînement (sur-apprentissage net) quand le MLP plafonne à 97.3 % sur l'entraînement : sa frontière de décision, plus lisse, colle moins parfaitement aux données d'entraînement, ce qui explique en partie sa meilleure tenue sur le test.",
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
  {
    type: "devoir",
    format: "Dissertation",
    title: "« Le deep learning rend-il obsolètes les méthodes de classification classiques en télédétection ? »",
    prompt: "Traite ce sujet en une dissertation complète (plan dialectique conseillé, voir module La Méthode), 600 mots minimum. Ta partie centrale doit s'appuyer explicitement sur le résultat réel mesuré en séances 6 et 7 (le MLP, un réseau de neurones pourtant très simple, fait légèrement mieux qu'un Random Forest sur ce jeu précis) comme exemple concret, pas seulement sur des généralités issues du module L'Intelligence.",
    criteria: [
      "Le plan est explicite et démonstratif (voir module La Méthode) : introduction, problématique, parties, transitions",
      "Le résultat réel RF vs MLP (séances 6-7) est utilisé comme argument concret dans au moins une partie, pas relégué en simple exemple décoratif",
      "Une limite ou nuance est explicitement discutée (taille du jeu de données, absence de contexte spatial dans un MLP pixel-par-pixel, coût de calcul/données d'un deep learning plus complexe)",
      "La longueur minimale (600 mots) est respectée",
    ],
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
      "Charger la scène dans QGIS, afficher la polarisation VV en niveaux de gris, puis comparer visuellement une zone en eau libre (signal faible, sombre) à une zone urbaine (signal fort, claire), confirmer à l'œil ce que la section réflexion spéculaire/double-rebond du module Le Regard prédit",
      "Sur un jeu de points de mesure ponctuels (ex. relevés de température ou de pluviométrie d'un réseau de stations, ou à défaut un sous-échantillon aléatoire de pixels NDVI comme substitut pédagogique), calculer un variogramme expérimental (plugin QGIS SAGA ou script Python avec la bibliothèque scikit-gstat)",
      "Ajuster un modèle théorique (sphérique ou exponentiel) sur ce variogramme, puis interpoler par krigeage ordinaire sur toute l'emprise",
      "Comparer visuellement la carte krigée à une simple interpolation IDW (Inverse Distance Weighting) sur les mêmes points, et comparer la carte de variance de krigeage à la simple distance au point le plus proche",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi comparer à l'IDW plutôt qu'accepter le krigeage sans recul",
    text: "L'IDW et le krigeage donnent souvent des cartes de valeurs visuellement proches sur un jeu de points bien réparti : la vraie valeur ajoutée du krigeage n'est pas toujours flagrante sur la carte de valeurs elle-même. C'est la carte de variance de krigeage (que l'IDW ne produit pas) qui révèle l'apport réel : elle montre explicitement où l'estimation est fiable (près des points de mesure) et où elle ne l'est pas (zones peu échantillonnées), une information absente de toute interpolation déterministe.",
  },
  {
    type: "solution",
    title: "Séance 8",
    text: "Sur la scène Sentinel-1 : une surface en eau calme apparaît nettement plus sombre en VV qu'une zone bâtie, qui ressort au contraire très brillante (effet de coin, double rebond façade/sol), un contraste souvent plus net et plus rapide à lire que sur l'image optique correspondante, en particulier si celle-ci comporte des nuages ce jour-là. Sur le variogramme : un effet de pépite élevé par rapport au palier signale un point de mesure bruité ou une variabilité à une échelle plus fine que l'espacement du réseau de points, dans ce cas, le krigeage doit être interprété avec prudence quel que soit le modèle ajusté.",
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
  {
    type: "devoir",
    format: "Étude bibliographique",
    title: "Un cas réel d'usage opérationnel du radar ou du krigeage",
    prompt: "Recherche un cas réel et documenté d'usage opérationnel (pas académique/théorique) de l'une des deux techniques de cette séance : le service Copernicus Emergency Management Service (EMS) pour la cartographie rapide d'inondation par SAR, ou un exemple documenté de krigeage en agriculture de précision, hydrologie ou santé publique. Rédige une synthèse de 400 mots qui explique le contexte opérationnel (qui, pourquoi, avec quelle contrainte de délai), la méthode réellement employée, et compare-la à ta propre mise en œuvre de la séance 8.",
    criteria: [
      "Le cas cité est réel et sourcé précisément (organisme, document, date), pas un exemple générique inventé",
      "Le contexte opérationnel (contrainte de délai, décideur destinataire) est explicité, pas seulement la technique",
      "Une comparaison explicite est faite avec la mise en œuvre personnelle de la séance 8",
      "La longueur (400 mots) est respectée",
    ],
  },

  { type: "heading", text: "Séance 9 : Étude de cas et mini-projet final", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Les huit séances précédentes traitent chacune une compétence isolée. Le mini-projet les combine toutes, au service d'une vraie question : le rendu attendu ici est délibérément plus exigeant que celui de toute séance précédente : un vrai sujet, une vraie problématique, une analyse qui montre une compréhension réelle de l'outil et de la matière, pas seulement une carte techniquement correcte. Quatre familles de sujets reviennent le plus souvent :",
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
    title: "Trois sujets réels, déjà problématisés, à choisir tels quels ou à adapter à ton propre territoire",
    text: "1. « La vulnérabilité à la surchauffe estivale d'une commune est-elle corrélée à la densité du bâti et au déficit de végétation ? » (croiser NDBI, NDVI et pente : risques naturels × urbanisme). 2. « Comment le stress hydrique d'un secteur agricole a-t-il évolué sur plusieurs années, lu à travers le NDVI en pleine saison sèche ? » (série temporelle NDVI : agriculture de précision). 3. « Le front urbain d'une commune littorale a-t-il progressé vers une zone à risque (submersion, incendie) entre deux dates ? » (détection de changement, comme en séance 3, croisée à une zone à aléa : urbanisme × risques naturels). Chacun de ces trois sujets mobilise volontairement plus d'une compétence isolée des séances précédentes : c'est cette combinaison, pas la difficulté technique d'une seule étape, qui distingue le mini-projet d'un simple exercice supplémentaire.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Interdisciplinarité : un atout, jamais une obligation",
    text: "Chacun des trois sujets ci-dessus admet une lecture purement physique (aléa, contrainte du milieu) ou peut être enrichi d'une dimension humaine (politique d'aménagement, inégalité d'exposition selon les quartiers, choix agricoles économiques), les deux angles, ou un seul, sont recevables. Un projet qui articule explicitement géographie physique et géographie humaine (ex. \"le risque est physique, mais son exposition sociale ne l'est pas\") démontre une compréhension plus large de la discipline, et cela se retrouve dans le barème ci-dessous, mais un projet mono-disciplinaire rigoureux et bien mené n'est pas pénalisé pour autant.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Cahier des charges du mini-projet",
    text: "Choisir un territoire et un sujet (l'un des trois ci-dessus, ou une variante personnelle sur le même modèle). Produire une carte finale qui combine au minimum : une donnée vecteur, une donnée raster ou un indice spectral calculé, et au moins une analyse spatiale (buffer, intersection ou jointure spatiale). Le rendu attendu est une carte mise en page (légende organisée, échelle, source des données, sémiologie graphique justifiée) accompagnée d'un rapport complet structuré selon le module La Méthode (contexte, données et méthode, résultats, discussion, recommandations), pas un simple paragraphe de commentaire.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Démarrer directement sur le jeu de données canonique",
    text: "Sans territoire personnel en tête, le jeu de données Vitrolles présenté en tête de ce module se prête directement au sujet 1 (NDBI déjà calculé sur du bâti réel, dont l'aéroport Marseille-Provence, contraste net avec la garrigue environnante), un point de départ réel et déjà vérifié, plutôt qu'un jeu de données à dénicher soi-même avant de pouvoir commencer.",
  },
  {
    type: "table",
    headers: ["Section évaluée", "Barème indicatif"],
    rows: [
      ["Problématique et cadrage du sujet (précision, pertinence par rapport au territoire choisi)", "/3"],
      ["Données et méthode (sources documentées, reproductible par un tiers)", "/4"],
      ["Carte de synthèse (sémiologie de Bertin, légende, lisibilité)", "/5"],
      ["Résultats présentés avant toute interprétation", "/3"],
      ["Discussion (limites, incertitude, ouverture interdisciplinaire le cas échéant)", "/4"],
      ["Forme du rendu (structure du rapport, présentation)", "/1"],
    ],
  },
  {
    type: "devoir",
    format: "Rapport",
    title: "Rapport complet du mini-projet",
    prompt: "Rédige le rapport complet (pas seulement la carte) : contexte et objectif, données et méthode documentées de façon reproductible, résultats présentés avant toute interprétation, discussion des limites, et, si le sujet choisi s'y prête, une ouverture interdisciplinaire explicite (géographie humaine et/ou physique). Ce rapport est le rendu le plus exigeant de l'Atelier : il doit démontrer une vraie compréhension de l'outil et de la matière, pas seulement l'exécution correcte d'une suite d'étapes techniques.",
    criteria: [
      "Le sujet traité est l'un des trois problématisés ci-dessus, ou une variante personnelle construite sur le même modèle (pas un sujet vague du type \"étudier la végétation d'une zone\")",
      "Chaque section du barème ci-dessus est identifiable dans le rendu (problématique, données/méthode, carte, résultats, discussion)",
      "La discussion admet explicitement au moins une limite réelle du travail, pas une formule de politesse",
      "Si une dimension interdisciplinaire est choisie, elle est articulée avec le résultat physique, pas juxtaposée en paragraphe séparé sans lien",
    ],
  },
  {
    type: "solution",
    title: "Séance 9 : grille d'auto-évaluation du rendu",
    items: [
      "La carte a un titre problématisé (pas un simple intitulé du sujet), voir module La Méthode, section croquis",
      "La légende est organisée en rubriques logiques, pas une liste de symboles dans l'ordre de création",
      "Chaque figuré cartographique respecte la sémiologie de Bertin (variable adaptée au type de donnée qu'il porte)",
      "Le rapport sépare nettement résultats (cartes, chiffres) et discussion (limites, incertitude), jamais mélangés dans le même paragraphe",
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
