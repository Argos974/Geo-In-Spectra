import type { ContentBlock } from "./types"

export const fondamentauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La géomatique regroupe l'ensemble des disciplines qui permettent d'acquérir, de traiter, d'analyser et de représenter des données géographiques : cartographie, systèmes d'information géographique (SIG), télédétection, GPS. Ce module pose les bases indispensables avant d'aborder l'imagerie satellite : comment on repère un point sur Terre, et comment on le transforme en position sur une carte plane.",
  },

  { type: "heading", text: "1. Le problème de départ : la Terre n'est pas plate" },
  {
    type: "paragraph",
    text: "La Terre est un ellipsoïde (une sphère légèrement aplatie aux pôles, sous l'effet de la force centrifuge liée à sa rotation). Toute donnée géographique doit d'abord être rattachée à un modèle mathématique de cette forme : c'est le rôle d'un système géodésique (ou datum). Le plus utilisé au monde est WGS84, la référence du GPS. En France, l'IGN utilise RGF93, quasiment identique à WGS84 à quelques centimètres près.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Latitude / longitude : ce ne sont pas des mètres",
    text: "Un degré de longitude ne mesure pas la même distance au niveau de l'équateur qu'à Marseille : les méridiens se rapprochent vers les pôles. C'est pourquoi on ne calcule jamais une distance ou une surface directement en degrés : il faut d'abord projeter les coordonnées dans un système métrique (voir section 4).",
  },

  { type: "heading", text: "2. L'ellipsoïde n'est encore qu'une approximation : le géoïde", level: "approfondissement" },
  {
    type: "paragraph",
    text: "L'ellipsoïde est un objet mathématique parfaitement lisse ; la surface réelle de la Terre ne l'est pas, ni topographiquement (montagnes, fosses), ni même sous l'effet de la seule gravité. Le géoïde est la surface équipotentielle du champ de gravité terrestre qui coïncide en moyenne avec le niveau des mers au repos : il ondule par rapport à l'ellipsoïde de référence, de -106 m (dans l'océan Indien, près du Sri Lanka) à +85 m (au-dessus de la Nouvelle-Guinée), selon les variations locales de densité de la croûte et du manteau terrestre.",
  },
  {
    type: "formula",
    label: "Altitude géodésique vs altitude orthométrique",
    formula: "h (altitude ellipsoïdale, GPS brut) = H (altitude orthométrique, \"vraie\" altitude au sens de l'écoulement de l'eau) + N (ondulation du géoïde)",
    note: "Un GPS mesure directement h, une altitude par rapport à l'ellipsoïde mathématique, et non l'altitude affichée sur une carte IGN, qui est une altitude orthométrique H, rattachée au niveau moyen des mers (repère altimétrique NGF-IGN69 en France). Ignorer cette différence peut introduire des écarts d'altitude de plusieurs dizaines de mètres entre une mesure GPS brute et une carte topographique.",
  },
  {
    type: "marginnote",
    title: "Anecdote : la Terre est-elle allongée ou aplatie ?",
    text: "Au XVIIIe siècle, Newton prédisait une Terre aplatie aux pôles ; Cassini (voir plus bas), depuis ses mesures françaises, penchait pour l'inverse. Pour trancher, l'Académie des sciences envoie deux expéditions mesurer un degré de méridien : Maupertuis en Laponie (1736), La Condamine au Pérou (1735-1744). Verdict : Newton avait raison. C'est cette controverse, pas un calcul de bureau, qui a fixé la forme ellipsoïdale de la Terre.",
  },

  { type: "heading", text: "3. Comment un GPS calcule une position : la trilatération", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un récepteur GPS (ou plus largement GNSS, Global Navigation Satellite System, qui inclut aussi le système européen Galileo, le russe GLONASS et le chinois BeiDou) ne connaît jamais sa position directement : il la déduit par trilatération, à partir de la distance qui le sépare de plusieurs satellites dont la position orbitale est connue à chaque instant.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Chaque satellite émet en continu un signal horodaté avec une extrême précision (horloge atomique embarquée)",
      "Le récepteur mesure le temps de trajet du signal, et en déduit la distance au satellite (distance = vitesse de la lumière × temps de trajet)",
      "Avec la distance à 3 satellites, la position se réduit théoriquement à deux points possibles dans l'espace (intersection de trois sphères) ; un quatrième satellite lève l'ambiguïté et corrige simultanément l'imprécision de l'horloge, bien moins précise, du récepteur lui-même",
      "Un récepteur grand public capte en pratique 8 à 12 satellites simultanément pour affiner et fiabiliser le résultat",
    ],
  },
  {
    type: "paragraph",
    text: "Un signal GPS brut est affecté par plusieurs sources d'erreur communes (retard ionosphérique/troposphérique, erreur d'horloge satellite résiduelle, multi-trajets). Plusieurs techniques d'augmentation corrigent tout ou partie de ces erreurs, à des coûts et des précisions très différents :",
  },
  {
    type: "table",
    headers: ["Technique", "Principe", "Précision typique", "Usage"],
    rows: [
      ["GPS grand public (autonome)", "Aucune correction externe", "3 – 8 m", "Smartphone, navigation routière"],
      ["DGPS (Differential GPS)", "Correction diffusée en temps réel par une station de référence fixe proche", "0.5 – 3 m", "Agriculture de précision d'entrée de gamme, navigation maritime"],
      ["RTK (Real-Time Kinematic)", "Corrections de phase porteuse en temps réel depuis une station de référence (ou un réseau, ex. RGP de l'IGN)", "1 – 2 cm", "Relevés topographiques, géoréférencement de précision, engins agricoles autoguidés"],
      ["PPK (Post-Processed Kinematic)", "Même principe que le RTK, mais la correction est appliquée après coup, en post-traitement, sans lien radio temps réel", "1 – 2 cm", "Photogrammétrie par drone, zones sans réseau de correction temps réel"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "RTK vs PPK : le compromis temps réel / robustesse",
    text: "Le RTK exige une liaison de correction continue (radio ou internet) au moment même de la mesure : une coupure, même brève, dégrade instantanément la précision. Le PPK enregistre les données brutes sur le terrain et applique la correction ensuite, en bureau : plus robuste (aucune dépendance à un lien temps réel sur site), au prix de ne pas connaître la position précise avant le retour au bureau. C'est le compromis typique des relevés par drone en zone isolée.",
  },
  {
    type: "marginnote",
    title: "Anecdote : la nuit où le GPS civil a gagné 10x en précision",
    text: "Jusqu'en mai 2000, le signal GPS civil était volontairement dégradé par l'armée américaine (Selective Availability), limitant la précision à ~100 m, pour empêcher un usage militaire hostile. Le président Clinton ordonne sa désactivation dans la nuit du 1er au 2 mai 2000 : la précision civile passe quasi instantanément à ~10-20 m, sans qu'aucun récepteur n'ait changé.",
  },

  { type: "heading", text: "4. Coordonnées géographiques vs coordonnées projetées" },
  {
    type: "comparison",
    items: [
      {
        label: "Géographiques (angulaires)",
        points: [
          "Latitude / longitude, en degrés décimaux",
          "Exemple : 43.5297° N, 5.4474° E (Marseille)",
          "Référence : WGS84 (EPSG:4326)",
          "Pratique pour l'échange de données, pas pour mesurer des distances/surfaces",
        ],
      },
      {
        label: "Projetées (métriques)",
        points: [
          "X / Y en mètres, sur un plan",
          "Exemple : 892 000 ; 6 247 000 (Lambert-93)",
          "Référence en France : Lambert-93 (EPSG:2154)",
          "Nécessaire pour calculer distances, surfaces, buffers, superposer des couches",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Convention du projet",
    text: "L'ensemble des traitements géomatiques de ce cours (et des projets réels associés) utilise Lambert-93 / EPSG:2154 comme référentiel de calcul : c'est le standard officiel français depuis 2006. Les données sources en WGS84 (GPS, beaucoup de fichiers GeoJSON publics) sont systématiquement reprojetées avant tout calcul de distance ou de surface.",
  },

  {
    type: "diagram",
    name: "coordinate-systems",
    caption: "Un même point de Marseille, lu en degrés sur le globe puis reporté en mètres sur le plan projeté.",
  },

  { type: "heading", text: "5. Les projections cartographiques" },
  {
    type: "paragraph",
    text: "Projeter, c'est transformer la surface courbe de l'ellipsoïde en un plan. Cette opération déforme nécessairement quelque chose : les surfaces, les angles, les distances, ou un mélange des trois : c'est une conséquence mathématique inévitable, démontrée dès 1827 par le Theorema Egregium de Gauss (une surface courbe ne peut être développée sur un plan sans déformation). Le choix d'une projection dépend donc de l'usage :",
  },
  {
    type: "list",
    items: [
      "Conforme (conserve les angles/formes localement) : ex. Lambert conique conforme, utilisée pour Lambert-93",
      "Équivalente (conserve les surfaces) : utile pour comparer des superficies (ex. usage agricole, forestier)",
      "Équidistante (conserve certaines distances) : rare en usage général",
      "Mercator (conforme, très déformante en surface aux hautes latitudes) : standard des cartes web (Google Maps, OpenStreetMap) pour sa simplicité de calcul, pas pour sa précision métrique",
    ],
  },
  {
    type: "marginnote",
    title: "Anecdote : un cartographe flamand, pas un mathématicien",
    text: "Gerardus Mercator (latinisation de Gerard de Kremer, né en 1512 dans l'actuelle Belgique) publie sa projection en 1569 sous le titre \"Nova et Aucta Orbis Terrae Descriptio\", un outil pensé pour les marins : suivre un cap constant à la boussole y trace toujours une ligne droite (loxodromie), au prix de surfaces trahies aux hautes latitudes. Quatre siècles plus tard, c'est exactement ce même compromis qu'hérite le Web Mercator de Google Maps.",
  },
  {
    type: "paragraph",
    text: "Lambert-93 appartient à la famille des projections coniques conformes : on imagine un cône posé sur l'ellipsoïde le long de deux parallèles de référence (dits parallèles standards, 44° N et 49° N pour Lambert-93), sur lesquels la déformation d'échelle est nulle par construction. Elle augmente ensuite progressivement en s'éloignant de ces deux parallèles vers le nord ou le sud, un compromis pensé spécifiquement pour l'étendue en latitude de la France métropolitaine, et inadapté tel quel à un territoire qui s'étend surtout en longitude ou situé à une autre latitude (d'où l'existence de projections UTM par fuseaux, utilisées par exemple pour les territoires d'outre-mer français).",
  },
  {
    type: "formula",
    label: "Le facteur d'échelle k : quantifier la déformation en un point",
    formula: "k(φ) = 1 exactement aux deux parallèles standards (44° N, 49° N)   ·   k(φ) > 1 hors de cet intervalle, k(φ) < 1 entre les deux",
    note: "k est le rapport entre une distance mesurée sur la carte projetée et la distance réelle sur l'ellipsoïde en ce point : k = 1 signifie aucune déformation locale d'échelle. Pour une projection conique conforme, la formule complète de k(φ) en fonction de la latitude et des deux parallèles standards est donnée par Snyder (1987, USGS Professional Paper 1395). À retenir ici : l'écart de k à 1 mesure directement, en un point donné, l'erreur relative qu'introduit la projection sur une distance mesurée à la règle sur la carte plutôt que calculée sur l'ellipsoïde.",
  },
  {
    type: "formula",
    label: "Code EPSG : identifiant universel d'un système de coordonnées",
    formula: "EPSG:4326 = WGS84 (géographique)   ·   EPSG:2154 = Lambert-93 (France métropolitaine)   ·   EPSG:3857 = Web Mercator",
    note: "Chaque logiciel SIG (QGIS, PostGIS, Leaflet, MapLibre…) identifie un référentiel par son code EPSG. Se tromper de code EPSG au chargement d'une couche est l'erreur la plus fréquente en géomatique. Elle produit des données décalées de plusieurs centaines de mètres, parfois sans erreur visible immédiate.",
  },

  { type: "heading", text: "6. Vecteur vs raster : les deux familles de données" },
  {
    type: "comparison",
    items: [
      {
        label: "Vecteur",
        points: [
          "Objets géométriques : points, lignes, polygones",
          "Chaque objet porte des attributs (nom, catégorie, valeur…)",
          "Exemples : parcelles cadastrales, réseau routier, limites administratives",
          "Formats courants : Shapefile (.shp), GeoJSON, GeoPackage (.gpkg)",
        ],
      },
      {
        label: "Raster",
        points: [
          "Grille régulière de pixels, chaque pixel porte une valeur",
          "Résolution = taille au sol d'un pixel (ex. 10 m pour Sentinel-2)",
          "Exemples : image satellite, modèle numérique de terrain (MNT), carte de température",
          "Formats courants : GeoTIFF (.tif), NetCDF",
        ],
      },
    ],
  },
  {
    type: "diagram",
    name: "vector-raster",
    caption: "Le même paysage lu comme des objets (points, ligne, polygone) ou comme une grille de cellules.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Un même phénomène, deux représentations possibles",
    text: "Une zone forestière peut être représentée en vecteur (un polygone \"forêt\" avec un attribut essence dominante) ou en raster (un indice de végétation calculé pixel par pixel depuis une image satellite). Le choix dépend de la précision recherchée et de la source de donnée disponible : c'est un fil conducteur qu'on retrouvera dans le module Télédétection.",
  },

  { type: "heading", text: "7. Formats de données courants", level: "lycee" },
  {
    type: "paragraph",
    text: "De la même façon qu'un texte peut être un .docx, un .pdf ou un simple .txt selon l'usage, une donnée géographique existe sous plusieurs formats de fichier selon ce qu'on veut en faire : les quatre ci-dessous sont les plus courants.",
  },
  {
    type: "table",
    headers: ["Format", "Type", "Points clés"],
    rows: [
      ["Shapefile (.shp)", "Vecteur", "Ancien standard (Esri), toujours très utilisé, multi-fichiers (.shp/.shx/.dbf/.prj)"],
      ["GeoJSON", "Vecteur", "Texte lisible, standard du web, coordonnées en WGS84 par convention"],
      ["GeoPackage (.gpkg)", "Vecteur (+ raster)", "Fichier unique type base de données, remplace progressivement le Shapefile"],
      ["GeoTIFF (.tif)", "Raster", "Image géoréférencée, standard pour l'imagerie satellite et les MNT"],
    ],
  },

  { type: "heading", text: "8. D'autres formats, pour des besoins précis", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà des quatre formats du cœur du métier, chaque besoin a fait émerger son propre format, aujourd'hui incontournable dans un contexte précis :",
  },
  {
    type: "table",
    headers: ["Format", "Type", "Usage typique"],
    rows: [
      ["KML / KMZ", "Vecteur", "Format ouvert par Google Earth, très lisible, pédagogique"],
      ["WMS (Web Map Service)", "Service raster", "Diffuse une carte déjà stylisée en tant qu'image (pas de données brutes)"],
      ["WFS (Web Feature Service)", "Service vecteur", "Diffuse les entités géographiques elles-mêmes, interrogeables"],
      ["CSV avec coordonnées", "Tabulaire", "Le format le plus simple pour un relevé de terrain (colonnes X/Y ou lat/lon)"],
      ["NetCDF", "Raster multidimensionnel", "Données climatiques/océaniques avec une dimension temporelle en plus de l'espace"],
      ["LAS / LAZ", "Nuage de points", "Données LiDAR : des millions de points 3D, LAZ = LAS compressé"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "WMS vs WFS : la différence qui piège le plus souvent",
    text: "Un flux WMS renvoie une image déjà mise en forme (impossible d'en changer la couleur ou de récupérer les attributs). Un flux WFS renvoie les géométries et leurs attributs bruts, modifiables et interrogeables dans un SIG. Confondre les deux est une source fréquente de blocage en début de projet web-cartographique.",
  },

  { type: "heading", text: "9. Codes et identifiants géographiques", level: "superieur" },
  {
    type: "paragraph",
    text: "Le code EPSG identifie un système de coordonnées (section 5), mais ce n'est qu'un type de code parmi d'autres utilisés en géographie pour désigner un lieu de façon non ambiguë, sans redire son nom en toutes lettres :",
  },
  {
    type: "list",
    items: [
      "Code INSEE / COG (Code Officiel Géographique) : identifiant à 5 chiffres unique de chaque commune française, stable même si son nom change",
      "Codes NUTS (Nomenclature des Unités Territoriales Statistiques) : découpage européen normalisé (région, département, canton) utilisé pour comparer des statistiques entre pays",
      "Référence cadastrale : identifie une parcelle précise (section + numéro) au sein d'une commune, indépendamment de ses coordonnées",
      "Code postal : identifiant de distribution postale, à ne pas confondre avec une unité administrative (un code postal peut chevaucher plusieurs communes)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un code postal n'est pas une commune",
    text: "Joindre des données par code postal plutôt que par code INSEE est une erreur fréquente : plusieurs communes peuvent partager un même code postal, et une commune peut en couvrir plusieurs. Le code INSEE (ou son équivalent cadastral pour la parcelle) est la clé de jointure fiable en géomatique française.",
  },
  { type: "game" },

  { type: "heading", text: "10. Petite histoire de la cartographie", level: "lycee" },
  {
    type: "paragraph",
    text: "Mesurer et représenter la Terre n'a rien d'une invention récente. Le fil qui va de Ptolémée aux satellites d'observation actuels est continu : à chaque époque, un instrument nouveau a permis de mesurer un peu plus précisément ce que l'époque précédente ne pouvait qu'estimer.",
  },
  {
    type: "diagram",
    name: "cartography-timeline",
    caption: "De la Géographie de Ptolémée aux satellites d'observation actuels, une même quête de précision.",
  },
  {
    type: "list",
    items: [
      "Antiquité : Ératosthène (~240 av. J.-C.) estime la circonférence terrestre à partir de la différence d'angle d'ombre entre Alexandrie et Syène, avec un écart de quelques pourcents seulement par rapport à la valeur actuelle ; Ptolémée (~150 apr. J.-C.) formalise ensuite un système de coordonnées et une première projection dans sa Géographia",
      "Moyen Âge / Renaissance : les portulans, cartes marines fondées sur le relevé au compas entre ports, précèdent la triangulation terrestre",
      "XVIᵉ siècle : Mercator (1569) publie sa projection conforme, encore la base du Web Mercator des cartes en ligne aujourd'hui",
      "XVIIIᵉ siècle : la famille Cassini triangule systématiquement la France, premier grand relevé topographique national",
      "XXᵉ siècle : le système GPS, développé par le département de la Défense américain, atteint sa pleine capacité opérationnelle en 1995, puis s'ouvre progressivement à l'usage civil",
      "XXᵉ – XXIᵉ siècle : de Landsat 1 (1972, premier satellite civil d'observation) à Sentinel-2 (2015, données ouvertes et gratuites)",
    ],
  },
  {
    type: "marginnote",
    title: "Moyen mnémotechnique : la méthode d'Ératosthène",
    text: "À midi au solstice d'été, le Soleil est exactement au zénith à Syène (Assouan) : aucune ombre. Au même instant à Alexandrie, un bâton projette une ombre d'environ 7,2°. Sachant la distance Alexandrie-Syène (mesurée en jours de marche de caravane), Ératosthène en déduit la circonférence terrestre : règle de trois entre 7,2° (soit 1/50 de cercle) et la distance mesurée. Sans satellite, ni horloge, ni GPS.",
  },
  {
    type: "marginnote",
    title: "Anecdote : une dynastie sur quatre générations",
    text: "La Carte de Cassini n'est pas l'œuvre d'un seul homme : Jean-Dominique Cassini (Cassini Iᵉʳ) lance le projet, son fils Jacques (Cassini II) le poursuit, son petit-fils César-François (Cassini III) en dresse le plan général, et son arrière-petit-fils Jean-Dominique (Cassini IV) l'achève : plus d'un siècle de relevés (1683-1789) porté par la même famille, quatre générations de suite.",
  },

  { type: "heading", text: "11. Lire une carte", level: "lycee" },
  {
    type: "paragraph",
    text: "Une carte topographique se lit avec une méthode, pas au hasard. Quatre éléments à vérifier systématiquement avant d'interpréter le contenu lui-même :",
  },
  {
    type: "list",
    items: [
      "La légende : sans elle, aucun symbole n'a de sens garanti. Ne jamais supposer qu'une couleur ou un pictogramme signifie la même chose d'une carte à l'autre",
      "L'échelle : le rapport entre une distance sur la carte et la distance réelle (ex. 1:25 000 = 1 cm sur la carte pour 250 m sur le terrain)",
      "L'orientation : par convention le nord est en haut, sauf mention contraire explicite (flèche du nord)",
      "Les courbes de niveau : relient les points de même altitude ; plus elles sont rapprochées, plus la pente est forte",
    ],
  },

  { type: "heading", text: "12. Le débat des projections : Mercator contre Peters", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La projection de Mercator (section 5) conserve les angles, ce qui la rend précieuse pour la navigation, mais déforme considérablement les surfaces aux hautes latitudes : le Groenland y paraît aussi grand que l'Afrique, alors qu'il est en réalité environ 14 fois plus petit. La projection de Peters (1973), équivalente, corrige les surfaces mais déforme fortement les formes.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un choix de projection n'est jamais neutre",
    text: "Le débat Mercator/Peters dépasse la seule technique : représenter le monde avec une projection qui agrandit visuellement les pays du Nord (Mercator) ou qui respecte les surfaces réelles au prix de formes moins familières (Peters) porte un message implicite sur l'importance relative des territoires. C'est un bon sujet de commentaire de carte ou de dissertation (voir le module Méthodologie).",
  },

  { type: "heading", text: "13. Repères de référence : ITRF, ETRS89 et la dérive des plaques", level: "approfondissement" },
  {
    type: "paragraph",
    text: "WGS84 (section 1) n'est pas un point fixe dans le temps : la croûte terrestre se déplace en permanence (dérive des plaques tectoniques, ~2 à 3 cm/an en Europe de l'Ouest). Deux familles de référentiels gèrent ce mouvement de façon radicalement différente.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "ITRF (International Terrestrial Reference Frame)",
        points: [
          "Référentiel global, recalculé et mis à jour en continu (ITRS/ITRF, maintenu par l'IERS)",
          "Les coordonnées d'un même point au sol changent d'une année sur l'autre, car le référentiel suit le mouvement réel de la croûte",
          "Indispensable pour la géodésie de précision à l'échelle mondiale (mesure de la dérive elle-même, sismologie, océanographie spatiale)",
        ],
      },
      {
        label: "ETRS89 (European Terrestrial Reference System) / RGF93",
        points: [
          "Référentiel \"gelé\" sur la plaque eurasienne à une époque de référence (1989)",
          "Un point français garde pratiquement la même coordonnée dans le temps, puisque toute la plaque eurasienne (et le référentiel avec elle) se déplace ensemble",
          "C'est ce choix, pas ITRF, qui permet à une carte ou un cadastre français de rester utilisable des décennies sans recalcul",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le piège d'un relevé GNSS de précision comparé à un ancien relevé",
    text: "Un récepteur GNSS professionnel donne nativement une position en ITRF (référentiel de calcul des orbites satellites), pas en ETRS89/RGF93. Comparer directement une coordonnée ITRF récente à une coordonnée RGF93 ancienne, sans passer par la transformation officielle (grille de conversion IGN), introduit une erreur systématique de plusieurs centimètres : négligeable pour une carte grand public, rédhibitoire pour un relevé topographique de précision ou une étude de déformation du sol.",
  },

  { type: "heading", text: "14. Passer d'un référentiel à un autre : la transformation à 7 paramètres de Helmert", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Convertir des coordonnées d'un système géodésique à un autre (par exemple d'un ancien référentiel local vers RGF93) n'est pas qu'une reprojection : c'est un changement de datum, qui suppose un modèle mathématique du décalage entre les deux ellipsoïdes de référence. Le modèle standard est la transformation de similitude à 7 paramètres de Helmert.",
  },
  {
    type: "formula",
    label: "Transformation de Helmert à 7 paramètres",
    formula: "X' = (1 + s) · R(rx, ry, rz) · X + T",
    note: "3 paramètres de translation (T : décalage d'origine en X/Y/Z), 3 de rotation (R : rx/ry/rz, désalignement des axes) et 1 facteur d'échelle (s, différence de taille entre les deux ellipsoïdes) : 7 paramètres en tout, déterminés empiriquement à partir de points communs mesurés dans les deux référentiels. En France, l'IGN diffuse une grille de conversion (plus précise qu'un simple Helmert à 7 paramètres uniforme, car elle absorbe aussi les distorsions locales historiques des anciens réseaux géodésiques) plutôt qu'une formule unique nationale.",
  },
  {
    type: "callout",
    tone: "info",
    title: "En pratique : l'approximation aux petits angles",
    text: "La forme écrite ci-dessus utilise une matrice de rotation complète R(rx, ry, rz). En géodésie, les rotations entre deux référentiels proches (comme ITRF et ETRS89) sont toujours minuscules (fractions de seconde d'arc) : on linéarise alors la formule en une transformation affine à 7 paramètres, où R est remplacée par une matrice antisymétrique simple (identité + petites rotations), ce qui rend le système résoluble directement par moindres carrés à partir des points communs. C'est cette version linéarisée, pas la rotation complète, qu'utilisent en pratique les logiciels de conversion de coordonnées (dont PROJ, la bibliothèque sous-jacente à QGIS).",
  },

  {
    type: "callout",
    tone: "warning",
    title: "À retenir avant le module suivant",
    text: "La télédétection produit presque exclusivement des données raster (images satellite). Comprendre la différence entre résolution spatiale d'un raster et précision géométrique d'un vecteur est indispensable pour interpréter correctement une image satellite : c'est le point de départ du module 2.",
  },
  {
    type: "link",
    to: "/module/teledetection",
    label: "Continuer : le rayonnement électromagnétique et les capteurs satellite",
    description: "Le module Le Regard part de ces bases (raster, résolution) pour expliquer comment un satellite mesure la surface terrestre.",
  },
]
