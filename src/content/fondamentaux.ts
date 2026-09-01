import type { ContentBlock } from "./types"

export const fondamentauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La géomatique regroupe l'ensemble des disciplines qui permettent d'acquérir, de traiter, d'analyser et de représenter des données géographiques : cartographie, systèmes d'information géographique (SIG), télédétection, GPS. Ce module pose les bases indispensables avant d'aborder l'imagerie satellite : comment on repère un point sur Terre, et comment on le transforme en position sur une carte plane. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. La Terre n'est pas plate : comment on la mesure quand même", level: "lycee" },
  {
    type: "paragraph",
    text: "La Terre est un ellipsoïde : une sphère légèrement aplatie aux pôles par l'effet de sa propre rotation. Toute donnée géographique doit d'abord être rattachée à un modèle mathématique de cette forme : c'est le rôle d'un système géodésique (ou datum). Le plus utilisé au monde est WGS84, la référence du GPS. En France, l'IGN utilise RGF93, quasiment identique à WGS84 à quelques centimètres près.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Latitude / longitude : ce ne sont pas des mètres",
    text: "Un degré de longitude ne mesure pas la même distance au niveau de l'équateur qu'à Marseille : les méridiens se rapprochent vers les pôles. C'est pourquoi on ne calcule jamais une distance ou une surface directement en degrés : il faut d'abord projeter les coordonnées dans un système métrique.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "1° de longitude représente environ 111 km à l'équateur, mais seulement environ 81 km à la latitude de Marseille (43° N), et environ 74 km à celle de Brest (48° N) : plus on monte en latitude, plus les méridiens se rapprochent, plus un même degré représente une distance plus courte au sol.",
  },
  {
    type: "marginnote",
    title: "Anecdote : la Terre est-elle allongée ou aplatie ?",
    text: "Au XVIIIe siècle, Newton prédisait une Terre aplatie aux pôles ; Cassini, depuis ses mesures françaises, penchait pour l'inverse. Pour trancher, l'Académie des sciences envoie deux expéditions mesurer un degré de méridien : Maupertuis en Laponie (1736), La Condamine au Pérou (1735-1744). Verdict : Newton avait raison.",
  },

  { type: "heading", text: "2. Comment un GPS trouve sa position : la trilatération", level: "lycee" },
  {
    type: "paragraph",
    text: "Un récepteur GPS (ou plus largement GNSS, Global Navigation Satellite System, qui inclut aussi le système européen Galileo, le russe GLONASS et le chinois BeiDou) ne connaît jamais sa position directement : il la calcule en mesurant sa distance à plusieurs satellites dont la position est connue à chaque instant. Cette méthode s'appelle la trilatération : on trilatère quand on connaît des distances à des points de référence, pas des angles.",
  },
  {
    type: "callout",
    tone: "example",
    title: "À la main : trilatérer avec un compas",
    text: "Sur une carte, place trois points A, B, C dont tu connais la position exacte. Trace au compas un cercle de rayon 5 km autour de A, un cercle de rayon 3 km autour de B, un cercle de rayon 4 km autour de C. Les trois cercles se croisent (approximativement) en un seul point : c'est la position recherchée. Un GPS fait exactement ce raisonnement, en trois dimensions et avec des satellites à la place de A, B, C.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Triangulation (mesurer des angles)",
        points: [
          "On connaît la position de deux points de référence et les angles visés depuis eux",
          "Utilisée par les géomètres depuis des siècles (théodolite), et par la Carte de Cassini",
          "Nécessite une ligne de visée directe entre les points",
        ],
      },
      {
        label: "Trilatération (mesurer des distances)",
        points: [
          "On connaît la position de plusieurs points de référence et la distance à chacun",
          "C'est le principe du GPS : la distance au satellite se déduit du temps de trajet du signal",
          "Pas besoin de viser à l'œil, juste de recevoir un signal",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi le GPS trilatère plutôt qu'il ne triangule",
    text: "Mesurer un angle depuis un satellite qui file à 14 000 km/h serait peu pratique et peu précis. Mesurer un temps de trajet de signal radio, en revanche, se fait avec une horloge atomique embarquée d'une précision extrême : la trilatération est la méthode que la technologie du GPS rend possible, la triangulation était celle que permettait l'œil humain avec une lunette.",
  },
  {
    type: "table",
    headers: ["Technique", "Principe", "Précision typique", "Usage"],
    rows: [
      ["GPS grand public (autonome)", "Aucune correction externe", "3 – 8 m", "Smartphone, navigation routière"],
      ["RTK (Real-Time Kinematic)", "Corrections reçues en temps réel depuis une station de référence proche", "1 – 2 cm", "Relevés topographiques, agriculture de précision"],
    ],
  },
  {
    type: "marginnote",
    title: "Anecdote : la nuit où le GPS civil a gagné 10x en précision",
    text: "Jusqu'en mai 2000, le signal GPS civil était volontairement dégradé par l'armée américaine (Selective Availability), limitant la précision à ~100 m. Le président Clinton ordonne sa désactivation dans la nuit du 1er au 2 mai 2000 : la précision civile passe quasi instantanément à ~10-20 m, sans qu'aucun récepteur n'ait changé.",
  },

  { type: "heading", text: "3. Coordonnées géographiques vs coordonnées projetées", level: "lycee" },
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
    type: "diagram",
    name: "coordinate-systems",
    caption: "Un même point de Marseille, lu en degrés sur le globe puis reporté en mètres sur le plan projeté.",
  },

  { type: "heading", text: "4. Vecteur vs raster : les deux familles de données", level: "lycee" },
  {
    type: "comparison",
    items: [
      {
        label: "Vecteur",
        points: [
          "Objets géométriques : points, lignes, polygones",
          "Chaque objet porte des attributs (nom, catégorie, valeur…)",
          "Exemples : parcelles cadastrales, réseau routier, limites administratives",
        ],
      },
      {
        label: "Raster",
        points: [
          "Grille régulière de pixels, chaque pixel porte une valeur",
          "Résolution = taille au sol d'un pixel (ex. 10 m pour Sentinel-2)",
          "Exemples : image satellite, modèle numérique de terrain (MNT)",
        ],
      },
    ],
  },
  {
    type: "diagram",
    name: "vector-raster",
    caption: "Le même paysage lu comme des objets (points, ligne, polygone) ou comme une grille de cellules.",
  },

  { type: "heading", text: "5. Trois familles de projection, pas une seule « déformation »", level: "lycee" },
  {
    type: "paragraph",
    text: "Aplatir la surface courbe de la Terre sur un plan déforme nécessairement quelque chose — c'est un fait géométrique (le Theorema Egregium de Gauss, 1827), pas une limite qu'un meilleur logiciel résoudrait. La bonne question n'est donc pas « quelle projection déforme le moins » mais « quelle projection préserve ce dont j'ai besoin ». Toute projection appartient à l'une de ces trois familles :",
  },
  {
    type: "table",
    headers: ["Famille", "Ce qu'elle préserve", "Exemple"],
    rows: [
      ["Conforme", "Les angles et les formes locales", "Lambert-93, Mercator"],
      ["Équivalente", "Les surfaces exactes", "Albers, Mollweide"],
      ["Aphylactique", "Ni les angles ni les surfaces exactement — un compromis", "Winkel, Robinson (cartes murales du monde)"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Convention du projet",
    text: "L'ensemble des traitements géomatiques de ce cours utilise Lambert-93 / EPSG:2154 (une projection conforme) comme référentiel de calcul : c'est le standard officiel français depuis 2006.",
  },
  {
    type: "link",
    to: "/module/projections-avancees",
    label: "Aller plus loin : Lambert-93, UTM et le choix d'une projection",
    description: "Le module Les Projections détaille les trois familles et explique comment choisir la bonne selon l'usage réel.",
  },

  { type: "heading", text: "6. Formats de données courants", level: "lycee" },
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
  { type: "game" },

  { type: "heading", text: "7. Petite histoire de la cartographie", level: "lycee" },
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
      "Antiquité : Ératosthène (~240 av. J.-C.) estime la circonférence terrestre à partir de la différence d'angle d'ombre entre Alexandrie et Syène, avec un écart de quelques pourcents seulement par rapport à la valeur actuelle",
      "Moyen Âge / Renaissance : les portulans, cartes marines fondées sur le relevé au compas entre ports, précèdent la triangulation terrestre",
      "XVIᵉ siècle : Mercator (1569) publie sa projection conforme, encore la base du Web Mercator des cartes en ligne aujourd'hui",
      "XVIIIᵉ siècle : la famille Cassini triangule systématiquement la France, premier grand relevé topographique national — de la triangulation, pas de la trilatération (section 2)",
      "XXᵉ siècle : le système GPS, développé par le département de la Défense américain, atteint sa pleine capacité opérationnelle en 1995, puis s'ouvre progressivement à l'usage civil",
    ],
  },
  {
    type: "marginnote",
    title: "Moyen mnémotechnique : la méthode d'Ératosthène",
    text: "À midi au solstice d'été, le Soleil est exactement au zénith à Syène (Assouan) : aucune ombre. Au même instant à Alexandrie, un bâton projette une ombre d'environ 7,2°. Sachant la distance Alexandrie-Syène (mesurée en jours de marche de caravane), Ératosthène en déduit la circonférence terrestre : règle de trois entre 7,2° (soit 1/50 de cercle) et la distance mesurée.",
  },
  {
    type: "marginnote",
    title: "Anecdote : une dynastie sur quatre générations",
    text: "La Carte de Cassini n'est pas l'œuvre d'un seul homme : Jean-Dominique Cassini (Cassini Iᵉʳ) lance le projet, son fils Jacques (Cassini II) le poursuit, son petit-fils César-François (Cassini III) en dresse le plan général, et son arrière-petit-fils Jean-Dominique (Cassini IV) l'achève : plus d'un siècle de relevés (1683-1789), quatre générations de suite — un chantier de triangulation, justement (section 2).",
  },

  { type: "heading", text: "8. Lire une carte", level: "lycee" },
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
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Sur une carte IGN au 1:25 000 que tu as sous la main (ou une capture d'écran Géoportail), repère deux points distants de 4 cm sur la carte. Quelle distance réelle cela représente-t-il ? Et si la même carte était au 1:100 000, la même distance sur le papier représenterait-elle plus ou moins de terrain réel ?",
  },

  { type: "heading", text: "9. Décrire et tracer un profil topographique", level: "lycee" },
  {
    type: "paragraph",
    text: "Les courbes de niveau donnent l'altitude, mais restent difficiles à lire d'un coup d'œil : un profil topographique les traduit en une coupe du relief, lisible comme un graphique, le long d'une ligne choisie entre deux points.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Tracer sur la carte une ligne droite AB entre les deux points à étudier",
      "Relever, à chaque intersection de cette ligne avec une courbe de niveau, deux valeurs : la distance depuis A (à la règle, convertie avec l'échelle de la carte) et l'altitude de la courbe croisée",
      "Reporter chaque couple (distance ; altitude) sur un graphique : la distance en abscisse, l'altitude en ordonnée",
      "Relier les points par une ligne continue — c'est le profil topographique du trajet AB",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Sur une carte d'équidistance 10 m (l'écart d'altitude entre deux courbes voisines), la ligne AB croise des courbes à 0 m (départ, 40 m), 120 m (50 m), 260 m (60 m), 340 m (70 m) puis redescend à 480 m (60 m) : reportés sur le graphique distance/altitude, ces cinq points dessinent une montée régulière jusqu'à 340 m, puis une redescente — un sommet local, invisible d'un simple coup d'œil sur la carte plane elle-même.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "L'exagération verticale n'est pas une erreur de lecture",
    text: "Un profil topographique dessiné avec la même échelle en abscisse et en ordonnée paraît presque plat : le relief réel s'étale sur des kilomètres mais ne varie que de quelques dizaines à quelques centaines de mètres. Par convention, l'échelle verticale est donc volontairement exagérée (souvent ×5 à ×10) pour rendre la forme du relief lisible — à toujours indiquer explicitement sous le graphique, sans quoi le profil laisse croire à des pentes bien plus fortes qu'en réalité.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : datum (WGS84/RGF93) ≠ un point fixé une fois pour toutes, la Terre est un ellipsoïde ; le GPS trilatère (distances) là où un géomètre du XVIIIe triangulait (angles) ; degrés (WGS84) pour échanger des données, mètres (Lambert-93) pour calculer ; vecteur = objets + attributs, raster = grille de pixels ; une projection préserve soit les angles, soit les surfaces, soit un compromis entre les deux (aphylactique) — jamais tout à la fois ; un profil topographique traduit des courbes de niveau croisées le long d'une ligne en un graphique distance/altitude, à échelle verticale exagérée par convention.",
    ],
  },
  {
    type: "link",
    to: "/module/teledetection",
    label: "Continuer : le rayonnement électromagnétique et les capteurs satellite",
    description: "Le module Le Regard part de ces bases (raster, résolution) pour expliquer comment un satellite mesure la surface terrestre.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Système géodésique : rattacher un point à un modèle de la Terre", level: "superieur" },
  {
    type: "paragraph",
    text: "La Terre est un ellipsoïde (une sphère légèrement aplatie aux pôles, sous l'effet de la force centrifuge liée à sa rotation). Toute donnée géographique doit d'abord être rattachée à un modèle mathématique de cette forme : c'est le rôle d'un système géodésique (ou datum). Le plus utilisé au monde est WGS84, la référence du GPS. En France, l'IGN utilise RGF93, quasiment identique à WGS84 à quelques centimètres près.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Latitude / longitude : ce ne sont pas des mètres",
    text: "Un degré de longitude ne mesure pas la même distance au niveau de l'équateur qu'à Marseille : les méridiens se rapprochent vers les pôles. C'est pourquoi on ne calcule jamais une distance ou une surface directement en degrés : il faut d'abord projeter les coordonnées dans un système métrique (section 3).",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré : Marseille vs Brest",
    text: "Longueur d'1° de longitude ≈ 111.32 × cos(latitude) km. À Marseille (43.30° N) : ≈ 81.0 km. À Brest (48.39° N) : ≈ 73.9 km. Sept kilomètres d'écart sur un seul degré, entre deux villes du même pays : l'erreur devient massive si on traite des degrés comme des mètres à l'échelle d'un continent.",
  },

  { type: "heading", text: "2. GPS : trilatération, et deux façons très différentes de mesurer une distance", level: "superieur" },
  {
    type: "paragraph",
    text: "Un récepteur GPS (ou plus largement GNSS, Global Navigation Satellite System, qui inclut aussi Galileo, GLONASS et BeiDou) ne connaît jamais sa position directement : il la déduit par trilatération, à partir de la distance qui le sépare de plusieurs satellites dont la position orbitale est connue à chaque instant.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Triangulation (angles)",
        points: [
          "Position déduite d'angles mesurés depuis des points connus",
          "Méthode des géomètres classiques (théodolite) et de la Carte de Cassini",
          "Exige une ligne de visée directe entre les stations",
        ],
      },
      {
        label: "Trilatération (distances)",
        points: [
          "Position déduite de distances mesurées à des points connus",
          "Méthode du GPS : la distance au satellite se déduit du temps de trajet d'un signal radio",
          "Aucune ligne de visée requise, juste la réception d'un signal",
        ],
      },
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Chaque satellite émet en continu un signal horodaté avec une extrême précision (horloge atomique embarquée)",
      "Le récepteur mesure le temps de trajet du signal, et en déduit la distance au satellite (distance = vitesse de la lumière × temps de trajet)",
      "L'horloge du récepteur, bien moins précise que celle des satellites, introduit un décalage inconnu : la « distance » mesurée est en réalité une pseudo-distance (vraie distance + ce décalage × vitesse de la lumière), ce qui ajoute une quatrième inconnue (le décalage d'horloge) aux trois coordonnées x, y, z — d'où la nécessité d'un quatrième satellite pour résoudre le système",
      "Un récepteur grand public capte en pratique 8 à 12 satellites simultanément pour affiner et fiabiliser le résultat",
    ],
  },
  {
    type: "paragraph",
    text: "Cette distance au satellite peut se mesurer de deux façons radicalement différentes en précision — c'est la différence qui sépare un GPS de smartphone d'un récepteur RTK professionnel :",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Positionnement par code (pseudo-distance)",
        points: [
          "Le récepteur corrèle le code pseudo-aléatoire horodaté émis par le satellite avec sa propre copie du même code",
          "Le décalage temporel mesuré donne directement une distance (via la vitesse de la lumière)",
          "Précision limitée par la longueur d'onde du code : de l'ordre du mètre",
          "C'est la méthode par défaut d'un GPS grand public (smartphone, GPS de randonnée)",
        ],
      },
      {
        label: "Positionnement par phase porteuse",
        points: [
          "Le récepteur mesure la phase de l'onde porteuse elle-même (bien plus courte que le code, donc bien plus précise)",
          "Problème : la phase seule ne dit pas combien de cycles complets se sont écoulés — l'« ambiguïté entière » à résoudre",
          "Une fois l'ambiguïté résolue, précision centimétrique",
          "C'est la méthode qu'utilisent RTK et PPK",
        ],
      },
    ],
  },
  {
    type: "table",
    headers: ["Technique", "Principe", "Précision typique", "Usage"],
    rows: [
      ["GPS grand public (autonome)", "Code seul, aucune correction externe", "3 – 8 m", "Smartphone, navigation routière"],
      ["DGPS (Differential GPS)", "Code, corrigé en temps réel par une station de référence fixe proche", "0.5 – 3 m", "Agriculture de précision d'entrée de gamme, navigation maritime"],
      ["RTK (Real-Time Kinematic)", "Phase porteuse, corrections reçues en temps réel depuis une station de référence (ou un réseau, ex. RGP de l'IGN)", "1 – 2 cm", "Relevés topographiques, géoréférencement de précision, engins agricoles autoguidés"],
      ["PPK (Post-Processed Kinematic)", "Phase porteuse, même principe que le RTK mais la correction est appliquée après coup, en post-traitement, sans lien radio temps réel", "1 – 2 cm", "Photogrammétrie par drone, zones sans réseau de correction temps réel"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "RTK vs PPK : le compromis temps réel / robustesse",
    text: "Le RTK exige une liaison de correction continue (radio ou internet) au moment même de la mesure : une coupure, même brève, dégrade instantanément la précision. Le PPK enregistre les données brutes sur le terrain et applique la correction ensuite, en bureau : plus robuste (aucune dépendance à un lien temps réel sur site), au prix de ne pas connaître la position précise avant le retour au bureau. C'est le compromis typique des relevés par drone en zone isolée.",
  },
  {
    type: "callout",
    tone: "question",
    title: "Et ton propre appareil, dans quelle catégorie tombe-t-il ?",
    text: "Le smartphone ou l'ordinateur que tu utilises pour lire ce cours fait, presque à coup sûr, du positionnement par code : pas de RTK embarqué. La planche ci-dessous te le montre sur ta propre position, en direct.",
  },
  { type: "live", name: "gps-live-demo" },
  {
    type: "marginnote",
    title: "Anecdote : la nuit où le GPS civil a gagné 10x en précision",
    text: "Jusqu'en mai 2000, le signal GPS civil était volontairement dégradé par l'armée américaine (Selective Availability), limitant la précision à ~100 m, pour empêcher un usage militaire hostile. Le président Clinton ordonne sa désactivation dans la nuit du 1er au 2 mai 2000 : la précision civile passe quasi instantanément à ~10-20 m, sans qu'aucun récepteur n'ait changé.",
  },

  { type: "heading", text: "3. Deux systèmes de coordonnées, un seul pour calculer", level: "superieur" },
  {
    type: "brique",
    id: "lambert93-coordonnees",
    title: "Coordonnées Lambert-93",
    blocks: [
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

  { type: "heading", text: "4. Trois familles de projection : ce qu'elles préservent, pas ce qu'elles déforment", level: "superieur" },
  {
    type: "paragraph",
    text: "Projeter, c'est transformer la surface courbe de l'ellipsoïde en un plan. Cette opération déforme nécessairement quelque chose : les surfaces, les angles, les distances, ou un mélange des trois — c'est une conséquence mathématique inévitable, démontrée dès 1827 par le Theorema Egregium de Gauss (une surface courbe ne peut être développée sur un plan sans déformation). Plutôt que de partir de « ce qui se déforme », il est plus utile de partir de ce qu'une projection choisit de préserver : c'est ce qui définit sa famille, et donc son bon usage.",
  },
  {
    type: "table",
    headers: ["Famille", "Ce qui est préservé", "Ce qui est déformé", "Exemple"],
    rows: [
      ["Conforme", "Les angles locaux (formes préservées à petite échelle)", "Les surfaces, fortement aux hautes latitudes", "Lambert-93, Mercator, UTM"],
      ["Équivalente", "Les surfaces (aires exactement conservées)", "Les angles et les formes", "Albers, Mollweide"],
      ["Aphylactique", "Ni les angles ni les surfaces exactement — un compromis", "Un peu des deux, réparti", "Winkel, Robinson (cartes murales du monde)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une carte du monde en Mercator exagère les hautes latitudes",
    text: "Mercator est conforme : les angles (donc les formes locales) sont préservés, ce qui en fait l'outil historique de la navigation (un cap compas y est une ligne droite). Le prix : les surfaces sont de plus en plus exagérées en s'éloignant de l'équateur. Le Groenland y paraît de la taille de l'Afrique, alors qu'il fait réellement environ 14 fois moins de superficie.",
  },
  {
    type: "marginnote",
    title: "Anecdote : un cartographe flamand, pas un mathématicien",
    text: "Gerardus Mercator (latinisation de Gerard de Kremer, né en 1512 dans l'actuelle Belgique) publie sa projection en 1569, un outil pensé pour les marins : suivre un cap constant à la boussole y trace toujours une ligne droite (loxodromie), au prix de surfaces trahies aux hautes latitudes. Quatre siècles plus tard, c'est exactement ce même compromis qu'hérite le Web Mercator de Google Maps.",
  },
  {
    type: "paragraph",
    text: "Lambert-93 appartient à la famille des projections coniques conformes : on imagine un cône posé sur l'ellipsoïde le long de deux parallèles de référence (dits parallèles standards, 44° N et 49° N pour Lambert-93), sur lesquels la déformation d'échelle est nulle par construction. Elle augmente ensuite progressivement en s'éloignant de ces deux parallèles, un compromis pensé spécifiquement pour l'étendue en latitude de la France métropolitaine.",
  },
  {
    type: "formula",
    label: "Code EPSG : identifiant universel d'un système de coordonnées",
    formula: "EPSG:4326 = WGS84 (géographique)   ·   EPSG:2154 = Lambert-93 (France métropolitaine)   ·   EPSG:3857 = Web Mercator",
    note: "Chaque logiciel SIG (QGIS, PostGIS, Leaflet, MapLibre…) identifie un référentiel par son code EPSG. Se tromper de code EPSG au chargement d'une couche est l'erreur la plus fréquente en géomatique : elle produit des données décalées de plusieurs centaines de mètres, parfois sans erreur visible immédiate.",
  },
  {
    type: "link",
    to: "/module/projections-avancees",
    label: "Aller plus loin : UTM, datum et choisir sa projection selon l'usage",
    description: "Le module Les Projections détaille la construction de Lambert-93 et de l'UTM, et une méthode pour choisir la bonne projection selon la question posée.",
  },

  { type: "heading", text: "5. Vecteur vs raster : le choix qui détermine le traitement", level: "superieur" },
  {
    type: "brique",
    id: "vecteur-raster",
    title: "Vecteur vs raster",
    blocks: [
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
    text: "Une zone forestière peut être représentée en vecteur (un polygone « forêt » avec un attribut essence dominante) ou en raster (un indice de végétation calculé pixel par pixel depuis une image satellite). Le choix dépend de la précision recherchée et de la source de donnée disponible : c'est un fil conducteur qu'on retrouvera dans le module Télédétection.",
  },

  { type: "heading", text: "6. Formats de données : le cœur du métier, et au-delà", level: "superieur" },
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
    tone: "warning",
    title: "WMS vs WFS : la différence qui piège le plus souvent",
    text: "Un flux WMS renvoie une image déjà mise en forme (impossible d'en changer la couleur ou de récupérer les attributs). Un flux WFS renvoie les géométries et leurs attributs bruts, modifiables et interrogeables dans un SIG. Confondre les deux est une source fréquente de blocage en début de projet web-cartographique.",
  },
  { type: "game" },

  { type: "heading", text: "7. Codes et identifiants géographiques", level: "superieur" },
  {
    type: "paragraph",
    text: "Le code EPSG identifie un système de coordonnées (section 4), mais ce n'est qu'un type de code parmi d'autres utilisés en géographie pour désigner un lieu de façon non ambiguë, sans redire son nom en toutes lettres :",
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

  { type: "heading", text: "8. Évaluer la précision d'un géoréférencement : la RMSE", level: "superieur" },
  {
    type: "brique",
    id: "rmse-definition",
    title: "RMSE, l'erreur quadratique moyenne",
    blocks: [
      {
        type: "paragraph",
        text: "Caler une donnée géographique sur des points de référence (géoréférencer une carte scannée, une image satellite, un relevé de terrain) laisse toujours un résidu : un petit écart entre la position calée et la position réelle de chaque point de contrôle. La RMSE (Root Mean Square Error, erreur quadratique moyenne) résume ces résidus en un seul nombre.",
      },
      {
        type: "formula",
        label: "RMSE d'un géoréférencement",
        formula: "RMSE = √( (1/n) × Σ(dxᵢ² + dyᵢ²) )",
        note: "n = nombre de points de contrôle, dxᵢ/dyᵢ = écart (résidu) entre la position calée et la position réelle du point i, en mètres. Plus la RMSE est petite, plus le calage est fidèle en moyenne sur les points utilisés — c'est la mesure standard de précision géométrique d'un géoréférencement, réutilisée telle quelle dans l'exercice de ce module.",
      },
      {
        type: "table",
        headers: ["Point de contrôle", "dx (m)", "dy (m)", "dx² + dy²"],
        rows: [
          ["P1", "0.8", "−0.3", "0.73"],
          ["P2", "−1.1", "0.5", "1.46"],
          ["P3", "0.4", "0.9", "0.97"],
        ],
      },
      {
        type: "callout",
        tone: "example",
        title: "Exemple chiffré",
        text: "Somme des dx²+dy² = 0.73 + 1.46 + 0.97 = 3.16. Divisée par n = 3 points : 1.053. Racine carrée : RMSE ≈ 1.03 m. Ce calage géoréférence donc les points à environ 1 mètre près en moyenne — à comparer à la précision réellement nécessaire pour l'usage visé (1 m suffit pour une carte au 1:25 000, pas pour un cadastre).",
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une RMSE faible ne garantit que le voisinage des points de calage",
    text: "Si tous les points de contrôle sont regroupés dans un coin de l'image, la RMSE peut être excellente localement tout en cachant une erreur bien plus grande à l'autre bout de l'image, jamais testée par un point de contrôle. Répartir les points de contrôle sur toute l'étendue de la zone à géoréférencer, pas seulement où c'est facile de les trouver, est aussi important que la valeur de RMSE elle-même.",
  },

  {
    type: "list",
    items: [
      "Bilan — à retenir : WGS84/RGF93 rattachent un point à un modèle de la Terre (l'ellipsoïde) ; le GPS trilatère (distances), un géomètre classique triangule (angles) ; code = précision métrique, phase porteuse (RTK/PPK) = précision centimétrique, au prix de résoudre l'ambiguïté entière ; degrés pour échanger, Lambert-93/EPSG:2154 pour calculer ; conforme/équivalente/aphylactique = trois choix de préservation, jamais les trois ensemble ; WMS = image, WFS = données ; RMSE = résidu moyen d'un calage, à interpréter avec la répartition des points de contrôle.",
    ],
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

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. L'ellipsoïde n'est encore qu'une approximation : le géoïde", level: "approfondissement" },
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
    text: "Au XVIIIe siècle, Newton prédisait une Terre aplatie aux pôles ; Cassini, depuis ses mesures françaises, penchait pour l'inverse. Pour trancher, l'Académie des sciences envoie deux expéditions mesurer un degré de méridien : Maupertuis en Laponie (1736), La Condamine au Pérou (1735-1744). Verdict : Newton avait raison — un contentieux scientifique tranché par la mesure de terrain, pas par le calcul de cabinet.",
  },

  { type: "heading", text: "2. Trilatération GNSS et triangulation géodésique : deux généalogies", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un récepteur GNSS ne connaît jamais sa position directement : il la déduit par trilatération, à partir de la distance qui le sépare de plusieurs satellites dont l'orbite est connue à chaque instant. Cette méthode descend d'une tradition différente de celle des grands réseaux géodésiques historiques (Cassini, section suivante), fondés sur la triangulation : la distinction n'est pas seulement historique, elle détermine encore aujourd'hui deux façons différentes de densifier un réseau de référence.",
  },
  {
    type: "brique",
    id: "triangulation-trilateration",
    title: "Triangulation et trilatération",
    blocks: [
      {
        type: "comparison",
        items: [
          {
            label: "Triangulation (mesure d'angles)",
            points: [
              "Position déduite d'angles mesurés (théodolite) depuis des points de coordonnées connues",
              "Un réseau se densifie de proche en proche, chaîne de triangles emboîtés (méthode Cassini)",
              "Exige une visibilité directe entre stations : coûteux en relief accidenté",
            ],
          },
          {
            label: "Trilatération GNSS (mesure de distances)",
            points: [
              "Position déduite de distances déduites d'un temps de trajet de signal radio",
              "Un réseau moderne (RGP, section 4) se densifie par stations permanentes indépendantes, sans chaîne de visée",
              "Fonctionne sans visibilité directe entre stations, mais exige un ciel dégagé au-dessus du récepteur",
            ],
          },
        ],
      },
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Chaque satellite émet en continu un signal horodaté avec une extrême précision (horloge atomique embarquée)",
      "Le récepteur mesure le temps de trajet du signal, et en déduit la distance au satellite (distance = vitesse de la lumière × temps de trajet)",
      "L'horloge du récepteur, bien moins précise que celle des satellites, introduit un décalage inconnu : la « distance » mesurée est en réalité une pseudo-distance (vraie distance + ce décalage × vitesse de la lumière), ce qui ajoute une quatrième inconnue (le décalage d'horloge) aux trois coordonnées x, y, z — d'où la nécessité d'un quatrième satellite pour résoudre le système",
    ],
  },
  {
    type: "paragraph",
    text: "Deux façons de mesurer la distance au satellite coexistent, avec un ordre de grandeur de précision totalement différent :",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Code (pseudo-distance)",
        points: [
          "Corrélation d'un code pseudo-aléatoire horodaté (C/A ou P)",
          "Résolution limitée par la longueur d'onde effective du code",
          "Précision de l'ordre du mètre, sans ambiguïté à résoudre",
        ],
      },
      {
        label: "Phase de la porteuse",
        points: [
          "Mesure de la phase de l'onde porteuse L1/L2 (longueur d'onde ≈ 19 cm)",
          "Précise, mais le nombre entier de cycles écoulés (ambiguïté entière) reste inconnu au départ",
          "RTK/PPK résolvent cette ambiguïté (par double différence entre récepteurs) pour atteindre le centimètre",
        ],
      },
    ],
  },
  {
    type: "formula",
    label: "Résoudre l'ambiguïté entière (principe)",
    formula: "distance = N × λ + φ_mesurée × λ / (2π)",
    note: "λ = longueur d'onde de la porteuse (≈ 19 cm pour L1), φ_mesurée = phase mesurée (fraction de cycle, connue), N = nombre entier de cycles complets écoulés (inconnu). RTK/PPK déterminent N par double différence entre un récepteur mobile et une station de référence dont la position est connue, ce qui élimine une grande partie des erreurs communes (horloges, atmosphère) et permet de fixer N — l'étape qui fait passer d'une précision métrique à centimétrique.",
  },
  { type: "live", name: "rtk-network-map" },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Le réseau GNSS permanent français est-il suffisant pour couvrir toute la France en RTK ? Explore la carte ci-dessus région par région, compare le réseau RGP seul au réseau combiné avec Centipède RTK, puis compare une portée de 15 km à une portée de 20 km : la réponse est-elle la même partout, ou dépend-elle fortement de la région regardée ?",
  },

  { type: "heading", text: "3. Repères de référence : ITRF, ETRS89 et la dérive des plaques", level: "approfondissement" },
  {
    type: "paragraph",
    text: "WGS84 n'est pas un point fixe dans le temps : la croûte terrestre se déplace en permanence (dérive des plaques tectoniques, ~2 à 3 cm/an en Europe de l'Ouest). Deux familles de référentiels gèrent ce mouvement de façon radicalement différente.",
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
          "Référentiel « gelé » sur la plaque eurasienne à une époque de référence (1989)",
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
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré : dix ans de dérive",
    text: "À 2,5 cm/an, un point mesuré en ITRF il y a dix ans s'est déplacé d'environ 25 cm par rapport à un point resté « gelé » en RGF93 sur la même période — un écart bien supérieur à la précision centimétrique d'un relevé RTK, qui rend indispensable la transformation ITRF → RGF93 avant toute comparaison entre deux campagnes de mesure espacées dans le temps.",
  },

  { type: "heading", text: "4. Le réseau GNSS permanent français : la référence pour le RTK", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Le RTK (section 2) a besoin d'une station de référence dont la position est connue avec certitude. En France, le Réseau GNSS Permanent (RGP), fédéré par l'IGN, met à disposition environ 500 stations permanentes actives, complété depuis 2019 par Centipède RTK, un réseau ouvert et communautaire qui dépasse aujourd'hui les 750 stations. Ensemble, ils forment le maillage sur lequel s'appuie le RTK et le PPK professionnels en France métropolitaine.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Un réseau, pas une seule antenne",
    text: "Un récepteur RTK isolé, sans station de référence à proximité, n'atteint pas la précision centimétrique : c'est la distance à la station de référence la plus proche (la « ligne de base ») qui conditionne la qualité de la correction — au-delà d'une vingtaine de kilomètres environ, les erreurs atmosphériques cessent d'être suffisamment corrélées entre le mobile et la référence, et la précision se dégrade.",
  },

  { type: "heading", text: "5. Passer d'un référentiel à un autre : la transformation à 7 paramètres de Helmert", level: "approfondissement" },
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

  { type: "heading", text: "6. Le débat des projections : Mercator contre Peters", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La projection de Mercator conserve les angles, ce qui la rend précieuse pour la navigation, mais déforme considérablement les surfaces aux hautes latitudes : le Groenland y paraît aussi grand que l'Afrique, alors qu'il est en réalité environ 14 fois plus petit. La projection de Peters (1973), équivalente (elle préserve les surfaces, famille définie dans la piste Licence/BUT ci-dessus), corrige les surfaces mais déforme fortement les formes.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un choix de projection n'est jamais neutre",
    text: "Le débat Mercator/Peters dépasse la seule technique : représenter le monde avec une projection qui agrandit visuellement les pays du Nord (Mercator) ou qui respecte les surfaces réelles au prix de formes moins familières (Peters) porte un message implicite sur l'importance relative des territoires. C'est un bon sujet de commentaire de carte ou de dissertation (voir le module Méthodologie).",
  },

  {
    type: "list",
    items: [
      "Bilan — à retenir : le géoïde (surface réelle du champ de gravité) ondule de -106 à +85 m par rapport à l'ellipsoïde ; triangulation (angles, réseaux historiques) et trilatération (distances, GNSS) sont deux généalogies différentes de la mesure de position ; code = mètre, phase porteuse = centimètre une fois l'ambiguïté entière résolue (RTK/PPK) ; ITRF suit la dérive des plaques, ETRS89/RGF93 reste gelé ; le réseau RGP+Centipède (~500 à 750+ stations) rend le RTK possible, mais pas uniformément partout en France ; Helmert à 7 paramètres change de datum, une reprojection seule ne suffit pas.",
    ],
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
