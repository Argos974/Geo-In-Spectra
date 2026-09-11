import type { ContentBlock } from "./types"

export const algorithmesSpatiauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Sur la gravure d'Albrecht Dürer qui prête son décor à cette salle, deux hommes transfèrent la forme d'un luth vers une surface plane, point par point, à travers une grille tendue entre eux et l'objet : un protocole reproductible, pas un coup d'œil d'artiste. C'est exactement ce que fait un algorithme spatial — une suite d'étapes précises, les mêmes à chaque exécution, qui transforme des coordonnées en une forme, une distance, une estimation ou un chemin. Les modules Le Compas, Les Statistiques et La Base ont déjà mis en situation plusieurs de ces algorithmes (Moran, MAUP, krigeage, Dijkstra/A*, AHP, LISA, Gi*, KDE, régression spatiale, index GiST) : cette salle ne les répète pas, elle les prolonge dans une autre direction. Elle se lit comme un catalogue — volontairement dense, pensé pour qu'on y revienne consulter un algorithme précis plutôt que pour une seule lecture continue du début à la fin. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Avant de commencer : Tobler, Moran, krigeage, Dijkstra/A*, AHP",
    description: "Le Compas pose les bases théoriques et les tout premiers algorithmes d'analyse spatiale — cette salle les prolonge sans les répéter.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Le plus proche voisin", level: "lycee" },
  {
    type: "paragraph",
    text: "Le problème du plus proche voisin (nearest neighbor) est le plus simple de tous les algorithmes spatiaux : étant donné un point de référence et un ensemble d'autres points, trouver celui qui en est le plus proche. C'est la brique de base sur laquelle se construisent presque tous les algorithmes plus avancés de ce module — interpolation, clustering, détection de motifs.",
  },
  {
    type: "formula",
    label: "Distance euclidienne entre deux points",
    formula: "d(A, B) = √[(xB − xA)² + (yB − yA)²]",
    note: "La distance « à vol d'oiseau » entre deux points de coordonnées connues. Trouver le plus proche voisin d'un point donné revient à calculer cette distance vers chaque candidat, puis à garder le minimum.",
  },
  {
    type: "list",
    items: [
      "Trouver la station météo la plus proche d'un lieu donné pour lui attribuer une mesure de température",
      "Trouver la pharmacie de garde la plus proche d'une adresse",
      "Trouver le point de recharge électrique le plus proche d'une position GPS",
      "Attribuer à chaque bâtiment la ligne de transport en commun la plus proche",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Trois stations météo S1(2, 1), S2(5, 6) et S3(8, 2) (coordonnées en km sur une grille locale). Pour un point P(4, 3) : d(P, S1) = √[(4−2)² + (3−1)²] = √8 ≈ 2,83 km ; d(P, S2) = √[(4−5)² + (3−6)²] = √10 ≈ 3,16 km ; d(P, S3) = √[(4−8)² + (3−2)²] = √17 ≈ 4,12 km. La station la plus proche de P est S1.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Un coût qui grandit avec le nombre de points",
    text: "Trouver le plus proche voisin parmi 3 stations comme ci-dessus prend un instant ; parmi 50 000 capteurs répartis sur tout un pays, comparer P à chacun un par un reste possible mais de plus en plus lent. La section 6 de cette piste, puis la piste Licence/BUT, montrent comment éviter de comparer à tous les points à chaque fois.",
  },

  { type: "heading", text: "2. Interpoler une valeur manquante", level: "lycee" },
  {
    type: "paragraph",
    text: "Interpoler, c'est estimer une valeur inconnue en un point (une température, une pluviométrie) à partir des valeurs connues de points voisins. Deux méthodes très simples, du plus proche voisin (recopier la valeur du point connu le plus proche) à une moyenne pondérée qui tient compte de plusieurs voisins à la fois.",
  },
  {
    type: "brique",
    id: "ppv-idw-lycee",
    title: "Plus proche voisin vs pondération inverse à la distance (IDW)",
    blocks: [
      {
        type: "comparison",
        items: [
          {
            label: "Interpolation par plus proche voisin",
            points: [
              "Recopie simplement la valeur du point connu le plus proche",
              "Très simple, mais produit des zones à valeur strictement identique (des « marches d'escalier »), sans transition progressive",
              "Ignore tous les autres points connus, même très proches",
            ],
          },
          {
            label: "Pondération inverse à la distance (IDW)",
            points: [
              "Fait la moyenne de plusieurs points connus, en donnant plus de poids aux plus proches",
              "Produit une surface qui varie progressivement, sans à-coups brutaux",
              "Plus un point connu est loin, moins il pèse dans la moyenne, mais il compte quand même un peu",
            ],
          },
        ],
      },
      {
        type: "formula",
        label: "IDW (pondération inverse à la distance)",
        formula: "Z(P) = [ Σᵢ zᵢ / dᵢ² ] / [ Σᵢ 1 / dᵢ² ]",
        note: "zᵢ = valeur connue au point i, dᵢ = distance entre le point P (où l'on veut estimer) et le point i. Chaque valeur connue est divisée par le carré de sa distance à P, puis tout est ramené à une moyenne pondérée.",
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré : IDW à la main",
    text: "Trois stations mesurent une pluviométrie : S1 à 2 km de P avec 40 mm, S2 à 4 km de P avec 20 mm, S3 à 5 km de P avec 10 mm. Poids : 1/2² = 0,25 ; 1/4² = 0,0625 ; 1/5² = 0,04. Somme des poids = 0,3525. Numérateur = 40×0,25 + 20×0,0625 + 10×0,04 = 10 + 1,25 + 0,4 = 11,65. Z(P) = 11,65 / 0,3525 ≈ 33,0 mm. La station la plus proche (S1, 40 mm) domine largement l'estimation, mais les deux autres stations l'infléchissent un peu vers le bas — contrairement au plus proche voisin seul, qui aurait donné 40 mm tout net, sans tenir compte de S2 et S3.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le plus proche voisin seul crée de fausses frontières nettes",
    text: "Colorier tout le territoire selon la seule valeur de la station la plus proche découpe l'espace en zones à bord parfaitement net, comme des morceaux de puzzle — un artefact de la méthode, pas une vraie limite physique du phénomène mesuré (la pluviométrie ne change jamais aussi brutalement d'un mètre à l'autre). Ce découpage a un nom : c'est un diagramme de Voronoï/Thiessen, détaillé formellement en piste Licence/BUT.",
  },

  { type: "heading", text: "3. L'enveloppe convexe (convex hull)", level: "lycee" },
  {
    type: "paragraph",
    text: "L'enveloppe convexe d'un nuage de points est le plus petit polygone convexe (sans creux ni angle rentrant) qui les contient tous. Intuitivement : tendre un élastique autour de tous les points et le laisser se resserrer — l'élastique épouse exactement les points les plus extérieurs, et laisse tous les points intérieurs à l'intérieur, sans les toucher.",
  },
  {
    type: "list",
    items: [
      "Délimiter la zone d'étude minimale qui contient un ensemble de mesures de terrain (capteurs, relevés GPS), sans zone inutile autour",
      "Détecter la forme générale d'un semis de points (un territoire de chasse animal reconstitué à partir de positions GPS collier, par exemple)",
      "Vérifier rapidement si un point donné se trouve dans la zone couverte par un ensemble de mesures, ou en dehors",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Construire une enveloppe convexe à la main",
    text: "Sur un nuage de huit points dispersés sur une feuille, l'enveloppe convexe s'obtient en partant du point le plus bas (ou le plus à gauche), puis en tournant toujours dans le même sens (par exemple le sens horaire) en choisissant à chaque étape le point suivant qui laisse tous les autres points d'un même côté du segment tracé — jusqu'à revenir au point de départ. Les points qui se retrouvent « à l'intérieur » du polygone ainsi tracé ne font pas partie de l'enveloppe : ils sont ignorés, quelle que soit leur position exacte.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Convexe : aucun angle rentrant",
    text: "Un polygone est convexe si, pour deux points quelconques pris à l'intérieur (ou sur le bord), le segment qui les relie reste entièrement dans le polygone. Une étoile à cinq branches n'est pas convexe (le segment entre deux pointes opposées sort de la figure) ; un hexagone régulier l'est. L'enveloppe convexe d'un nuage de points, par construction, n'a jamais d'angle rentrant.",
  },

  { type: "heading", text: "4. Simplifier une ligne : l'algorithme de Douglas-Peucker", level: "lycee" },
  {
    type: "paragraph",
    text: "Une ligne (un cours d'eau, une route, une limite administrative) numérisée avec précision peut compter des milliers de sommets. Affichée sur une carte à petite échelle (toute la France sur une page), la plupart de ces détails deviennent invisibles et alourdissent inutilement le fichier. Simplifier une ligne consiste à retirer les sommets les moins utiles, tout en gardant une forme reconnaissable — l'algorithme de Douglas-Peucker (1973) est la méthode de référence pour le faire automatiquement.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Relier le premier et le dernier point de la ligne par un segment droit",
      "Trouver, parmi tous les points intermédiaires, celui qui est le plus éloigné de ce segment (distance perpendiculaire)",
      "Si cette distance maximale dépasse une tolérance ε fixée à l'avance : garder ce point, puis répéter les mêmes étapes séparément sur les deux moitiés de la ligne qu'il délimite",
      "Sinon : supprimer tous les points intermédiaires entre le premier et le dernier point — un seul segment droit suffit à représenter cette portion",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Intuition : garder les points qui comptent",
    text: "Sur une ligne en zigzag qui suit presque un cours d'eau presque droit, un seul détour important au milieu doit être conservé (il change vraiment la forme de la ligne), alors qu'une multitude de petits crans presque alignés entre deux points peuvent disparaître sans que la ligne perde sa forme reconnaissable. Douglas-Peucker automatise exactement ce tri : garder ce qui s'écarte franchement d'une trajectoire droite, supprimer ce qui s'en écarte à peine.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Le lien avec l'échelle d'une carte",
    text: "Plus une carte est \"petite échelle\" (un grand territoire sur une petite surface de papier ou d'écran), plus la tolérance ε doit être grande : des détails significatifs au 1:5 000 deviennent du bruit imperceptible au 1:1 000 000. La généralisation cartographique — simplifier une donnée pour qu'elle reste lisible à une échelle donnée — repose directement sur ce principe, pas seulement sur Douglas-Peucker (voir aussi Visvalingam-Whyatt, piste Licence/BUT).",
  },

  { type: "heading", text: "5. Un point est-il dans un polygone ? Le test du rayon", level: "lycee" },
  {
    type: "paragraph",
    text: "Savoir si un point donné (une adresse, une position GPS) se trouve à l'intérieur d'un polygone (une commune, une parcelle, une zone inondable) est une question qui revient sans cesse en géomatique. Le test du rayon (ray casting) y répond par une astuce géométrique simple, sans avoir besoin de « voir » la forme du polygone.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Tracer, depuis le point à tester, une demi-droite qui part vers l'infini dans une direction quelconque (souvent horizontale, vers la droite)",
      "Compter le nombre de fois où cette demi-droite traverse un bord du polygone",
      "Si ce nombre est impair, le point est à l'intérieur du polygone ; s'il est pair, le point est à l'extérieur",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi ça marche : l'intuition",
    text: "Sortir d'un polygone impose de traverser son bord un nombre impair de fois de plus qu'on ne l'a traversé pour y entrer. Un point extérieur qui envoie une demi-droite vers l'infini traverse le bord un nombre pair de fois (il entre puis ressort autant de fois) ; un point intérieur en traverse un nombre impair (il finit par sortir une fois de plus qu'il n'est entré, puisqu'il partait de l'intérieur). Compter les traversées suffit donc, sans jamais avoir besoin de connaître la forme précise du polygone à l'avance.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un cas limite fréquent",
    text: "Si la demi-droite passe exactement par un sommet du polygone, compter cette traversée devient ambigu (elle peut compter zéro, une ou deux fois selon l'implémentation). Les bibliothèques SIG gèrent ce cas particulier avec des règles précises ; à la main, le plus simple est de choisir une direction de demi-droite qui évite ce genre de coïncidence.",
  },

  { type: "heading", text: "6. Découper l'espace en cellules régulières : la grille", level: "lycee" },
  {
    type: "paragraph",
    text: "Avant même de parler d'un « index » au sens informatique (piste Licence/BUT), l'idée la plus simple pour s'orienter rapidement dans un grand nuage de points est de découper l'espace en cellules régulières, comme un quadrillage. Chaque point est rangé dans la cellule qui le contient ; chercher tous les points proches d'un endroit donné revient alors à ne regarder que quelques cellules voisines, plutôt que la totalité du nuage de points.",
  },
  {
    type: "list",
    items: [
      "Recensement par carreaux (grilles INSEE de 200 m ou 1 km) : chaque cellule résume une population, une densité, sans avoir à énumérer chaque bâtiment individuellement",
      "Accélérer une recherche de plus proche voisin (section 1) : ne comparer un point qu'aux points de sa cellule et des cellules immédiatement voisines, pas à tous les points du territoire",
      "Simplifier une analyse statistique de zone (module Le Compas) quand aucun découpage administratif pertinent n'existe déjà",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Vers la piste Licence/BUT",
    text: "Une grille régulière fonctionne bien quand les points sont répartis de façon à peu près homogène sur le territoire. Dès que les points se regroupent fortement dans certaines zones et se raréfient ailleurs (une ville dense entourée de campagne), une grille à taille de cellule fixe devient inefficace : certaines cellules débordent de points, d'autres restent vides pour rien. Le quadtree et le k-d tree, détaillés en piste Licence/BUT, résolvent précisément cette limite en adaptant la taille des cellules à la densité réelle des données.",
  },
  {
    type: "devoir",
    format: "Exercice noté",
    title: "Construire une enveloppe convexe à la main",
    prompt: "Sur une feuille quadrillée, place les huit points suivants (coordonnées en km) : A(1, 1), B(4, 1), C(6, 3), D(5, 6), E(2, 6), F(0, 3), G(3, 3), H(4, 4). (1) Détermine, en les listant dans l'ordre (par exemple dans le sens horaire), les sommets qui forment l'enveloppe convexe de ce nuage de points. (2) Explique pourquoi les deux points restants n'en font pas partie. (3) Imagine que ces huit points sont des stations de mesure de qualité de l'air posées par une collectivité : à quoi servirait concrètement de calculer l'enveloppe convexe de leurs positions avant de lancer une étude sur ce territoire ?",
    criteria: [
      "Les sommets de l'enveloppe (A, B, C, D, E, F) sont listés dans le bon ordre, sans en oublier ni en ajouter",
      "G et H sont correctement identifiés comme intérieurs, avec une justification géométrique claire (ils se trouvent \"à l'intérieur\" du polygone tracé par les six autres points)",
      "L'application concrète proposée est correctement reliée à l'idée de zone d'étude minimale, pas seulement recopiée du cours",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : le plus proche voisin compare une distance à chaque candidat et garde le minimum ; l'IDW moyenne plusieurs voisins en pondérant par l'inverse du carré de la distance, plus progressif que recopier le seul plus proche voisin ; l'enveloppe convexe est le plus petit polygone convexe qui contient tous les points d'un nuage ; Douglas-Peucker simplifie une ligne en gardant les points qui s'écartent franchement d'une trajectoire droite ; le test du rayon détermine si un point est dans un polygone en comptant les traversées de son bord (impair = dedans) ; une grille régulière découpe l'espace pour éviter de comparer un point à tous les autres, mais suppose une densité de points à peu près homogène.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : dessiner soi-même une opération géométrique",
    description: "L'Atelier fait manipuler directement des géométries sous QGIS — un bon terrain pour retrouver, en pratique, l'enveloppe convexe ou la simplification d'une ligne présentées ici.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Structures d'indexation spatiale : grille, quadtree, k-d tree", level: "superieur" },
  {
    type: "paragraph",
    text: "Chercher « tous les points à moins de 500 m de cet endroit » ou « le plus proche voisin de ce point » en comparant un par un à chacun des n points d'un jeu de données coûte, dans le pire des cas, autant de comparaisons qu'il y a de points : une recherche naïve en O(n). Sur quelques centaines de points, cela reste instantané ; sur plusieurs millions, cela devient rapidement impraticable si la même recherche doit être répétée de nombreuses fois. Une structure d'indexation spatiale prétraite les données une fois pour toutes afin que chaque recherche ultérieure élimine d'emblée l'immense majorité des candidats impossibles.",
  },
  {
    type: "brique",
    id: "index-spatial-quadtree-kdtree",
    title: "Grille, quadtree et k-d tree : trois façons d'indexer un nuage de points",
    blocks: [
      {
        type: "comparison",
        items: [
          {
            label: "Grille régulière",
            points: [
              "Découpe l'espace en cellules de taille fixe, indépendamment de la densité réelle des points",
              "Construction très simple : chaque point est rangé dans sa cellule selon ses coordonnées",
              "Recherche efficace (O(1) en moyenne) si les points sont répartis de façon à peu près homogène",
              "Dégénère si les points sont très inégalement répartis : certaines cellules débordent, d'autres restent vides",
            ],
          },
          {
            label: "Quadtree",
            points: [
              "Subdivise récursivement une région en quatre quadrants égaux dès qu'elle contient plus d'un nombre fixé de points",
              "S'adapte automatiquement à la densité : les zones denses sont finement subdivisées, les zones vides restent en une seule grande cellule",
              "Recherche en O(log n) en moyenne pour un arbre à peu près équilibré",
              "Cas dégénéré : des points alignés ou très regroupés peuvent produire un arbre déséquilibré, proche d'un O(n) dans le pire cas",
            ],
          },
          {
            label: "k-d tree",
            points: [
              "Arbre binaire qui divise l'espace en alternant les axes (x, puis y, puis x…) à la valeur médiane de l'axe courant",
              "Construction en O(n log n) (recherche de médiane à chaque niveau)",
              "Recherche du plus proche voisin en O(log n) en moyenne, en élaguant les branches trop éloignées pour contenir un meilleur candidat",
              "Particulièrement efficace pour des données ponctuelles en faible dimension (2D, 3D) ; ses performances se dégradent en haute dimension",
            ],
          },
        ],
      },
      {
        type: "table",
        headers: ["Méthode", "Recherche (cas moyen)", "Recherche (pire cas)", "Adaptée à…"],
        rows: [
          ["Recherche naïve (aucun index)", "O(n)", "O(n)", "Un très petit jeu de données, ou une seule recherche isolée"],
          ["Grille régulière", "O(1)", "O(n)", "Points à densité à peu près homogène"],
          ["Quadtree", "O(log n)", "O(n)", "Points 2D à densité très irrégulière (zones denses et zones vides)"],
          ["k-d tree", "O(log n)", "O(n)", "Recherche de plus proche(s) voisin(s) en faible dimension"],
        ],
      },
    ],
  },
  {
    type: "diagram",
    name: "spatial-index-tree",
    caption: "Le principe commun au quadtree et au k-d tree : subdiviser récursivement l'espace pour éliminer d'un coup les régions qui ne peuvent contenir aucun candidat pertinent, avant de tester les rares points restants un par un.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Et pour des géométries étendues, pas seulement des points ? Le R-tree",
    text: "Grille, quadtree et k-d tree indexent naturellement des points. Pour des géométries étendues (lignes, polygones), le R-tree (Guttman, 1984) regroupe les géométries proches dans des rectangles englobants (bounding box) eux-mêmes imbriqués hiérarchiquement : une recherche élimine d'abord les branches dont le rectangle englobant ne peut pas concerner la requête, avant de tester la géométrie exacte des rares candidats restants — le même principe de pruning que le quadtree, appliqué à des rectangles plutôt qu'à des points. C'est exactement la structure que l'index GiST de PostGIS implémente concrètement en base de données.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le mauvais index pour le mauvais type de requête",
    text: "Un k-d tree, très efficace pour un plus proche voisin ponctuel, gère mal des géométries étendues qui se chevauchent (deux polygones peuvent avoir des centres très éloignés tout en se recoupant). Une grille régulière, très simple, devient contre-productive sur des données extrêmement regroupées (une seule cellule contiendrait alors presque tous les points, annulant tout l'intérêt de l'index). Choisir un index adapté au type de géométrie (point vs polygone) et à la distribution réelle des données (homogène vs très regroupée) n'est jamais un détail secondaire.",
  },
  {
    type: "link",
    to: "/module/bases-donnees-spatiales",
    label: "Aller plus loin : l'index GiST concrètement, en PostGIS",
    description: "Le module La Base détaille comment ce principe de rectangles englobants imbriqués est implémenté concrètement dans une vraie base de données spatiale, avec EXPLAIN ANALYZE pour vérifier qu'il est bien utilisé.",
  },

  { type: "heading", text: "2. Triangulation de Delaunay et polygones de Voronoï/Thiessen", level: "superieur" },
  {
    type: "paragraph",
    text: "Deux constructions géométriques, duales l'une de l'autre, répondent chacune à une question différente sur un même nuage de points : comment les relier en triangles de la façon la plus « équilibrée » possible (Delaunay), et quelle portion du territoire est la plus proche de chaque point (Voronoï/Thiessen).",
  },
  {
    type: "brique",
    id: "delaunay-voronoi",
    title: "Delaunay et Voronoï : deux constructions duales",
    blocks: [
      {
        type: "formula",
        label: "Condition de Delaunay (critère du cercle circonscrit)",
        formula: "Un triangle appartient à la triangulation de Delaunay ⟺ aucun autre point du nuage ne se trouve à l'intérieur de son cercle circonscrit",
        note: "Parmi toutes les façons possibles de relier un nuage de points en triangles, la triangulation de Delaunay (1934) est celle qui maximise le plus petit angle de chaque triangle, évitant les triangles très allongés et aplatis — une propriété directement utile pour interpoler ensuite à l'intérieur de chaque triangle (section 3, TIN).",
      },
      {
        type: "paragraph",
        text: "Le diagramme de Voronoï (ou polygones de Thiessen) associe à chaque point du nuage la région de l'espace plus proche de lui que de tout autre point — exactement le découpage en « marches d'escalier » rencontré en piste Lycée avec l'interpolation par plus proche voisin, mais construit ici comme un objet géométrique à part entière plutôt que comme un simple effet de bord d'une interpolation.",
      },
      {
        type: "callout",
        tone: "info",
        title: "La dualité entre Delaunay et Voronoï",
        text: "Les deux constructions se déduisent directement l'une de l'autre : chaque sommet du diagramme de Voronoï est le centre du cercle circonscrit d'un triangle de Delaunay, et chaque arête de Voronoï est portée par la médiatrice de l'arête de Delaunay correspondante (perpendiculaire au milieu du segment qui relie les deux points voisins). Construire l'une des deux structures donne immédiatement l'autre, sans recalcul indépendant.",
      },
    ],
  },
  {
    type: "table",
    headers: ["Construction", "Répond à…", "Application typique"],
    rows: [
      ["Triangulation de Delaunay", "Comment relier ces points en triangles les plus \"réguliers\" possible ?", "Base d'un TIN (section 3), maillage pour une interpolation ou une simulation"],
      ["Diagramme de Voronoï / Thiessen", "Quelle portion du territoire est la plus proche de chaque point ?", "Zone de desserte/chalandise (la pharmacie la plus proche d'une adresse), interpolation par plus proche voisin formalisée"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne pas confondre les deux",
    text: "Une erreur fréquente consiste à demander « la triangulation de Delaunay » quand on veut en réalité des zones de desserte (Voronoï), ou l'inverse. Un repère simple : Delaunay relie des points par des lignes (des triangles) ; Voronoï découpe l'espace en zones (des polygones). Les deux se déduisent l'un de l'autre, mais ne répondent pas à la même question.",
  },

  { type: "heading", text: "3. Le TIN, un réseau irrégulier de triangles pour un MNT", level: "superieur" },
  {
    type: "paragraph",
    text: "Un modèle numérique de terrain (MNT) peut être représenté de deux façons : une grille régulière de pixels d'altitude (un raster classique, module Fondements), ou un TIN (Triangulated Irregular Network), un maillage de triangles de Delaunay construits directement sur les points de mesure d'altitude, où qu'ils se trouvent.",
  },
  {
    type: "formula",
    label: "Interpolation à l'intérieur d'un triangle du TIN",
    formula: "z(x, y) = λ₁z₁ + λ₂z₂ + λ₃z₃,  avec λ₁ + λ₂ + λ₃ = 1",
    note: "z₁, z₂, z₃ = altitudes connues aux trois sommets du triangle qui contient le point (x, y) ; λ₁, λ₂, λ₃ = coordonnées barycentriques du point dans ce triangle. Cette interpolation revient à ajuster un plan exact passant par les trois sommets : à l'intérieur d'un même triangle, la pente reste strictement constante.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "TIN (triangles de Delaunay)",
        points: [
          "Densité de sommets variable : plus fine où le terrain change vite (une crête, une rupture de pente), plus lâche sur un plateau régulier",
          "Restitue fidèlement les lignes de rupture (crêtes, talwegs) si elles sont fournies comme contraintes de la triangulation",
          "Stockage proportionnel au nombre de points de mesure réels, pas à une résolution fixée arbitrairement",
        ],
      },
      {
        label: "Grille régulière (raster DEM)",
        points: [
          "Résolution fixe partout, qu'il y ait ou non un vrai besoin de détail local",
          "Plus simple à manipuler (algèbre raster directe, module Le Compas), format quasi universel",
          "Peut sur-échantillonner les zones plates (gaspillage de stockage) ou sous-échantillonner les zones accidentées (perte de détail)",
        ],
      },
    ],
  },

  { type: "heading", text: "4. Interpolation spatiale approfondie : IDW, spline, et krigeage", level: "superieur" },
  {
    type: "paragraph",
    text: "La piste Lycée a introduit l'IDW de façon intuitive. Un paramètre, laissé implicite plus haut, contrôle en réalité tout le comportement de la méthode : l'exposant de pondération.",
  },
  {
    type: "formula",
    label: "IDW généralisée, avec exposant de pondération p",
    formula: "Z(P) = [ Σᵢ zᵢ / dᵢᵖ ] / [ Σᵢ 1 / dᵢᵖ ]",
    note: "p contrôle à quel point l'influence d'un point décroît vite avec la distance. p = 1 : décroissance douce, chaque point connu garde une influence significative même loin de P. p = 2 (le choix le plus courant, celui de la piste Lycée) : décroissance plus marquée. p élevé (p = 4, 5…) : la méthode se rapproche du plus proche voisin pur, les points un peu plus lointains devenant presque négligeables. Le choix de p n'est jamais neutre et doit être justifié, pas laissé à la valeur par défaut du logiciel.",
  },
  {
    type: "paragraph",
    text: "L'interpolation par spline ajuste, au lieu d'une simple moyenne pondérée, une fonction mathématique lisse (typiquement une somme de fonctions polynomiales par morceaux) qui passe exactement par chaque valeur connue tout en minimisant sa courbure globale — un peu comme une règle flexible qu'on plierait pour toucher chaque point de mesure sans faire d'angle brusque. Le résultat est une surface visuellement plus lisse qu'une IDW (sans les motifs concentriques caractéristiques de l'IDW autour de chaque point de mesure isolé), mais qui peut produire des valeurs légèrement supérieures ou inférieures aux valeurs mesurées entre deux points très contrastés (un dépassement, ou overshoot), un comportement que l'IDW, bornée par construction entre le minimum et le maximum des valeurs connues, ne produit jamais.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "IDW",
        points: [
          "Moyenne pondérée par la distance, jamais au-delà du min/max des valeurs connues",
          "Motifs concentriques (\"œil de bœuf\") autour de chaque point isolé",
          "Simple à paramétrer (un seul exposant p), aucune hypothèse statistique sur le phénomène",
        ],
      },
      {
        label: "Spline",
        points: [
          "Surface lisse, sans motifs concentriques",
          "Peut dépasser localement le min/max des valeurs mesurées (overshoot) entre deux valeurs très contrastées",
          "Adaptée à un phénomène qu'on sait varier progressivement (une surface topographique, par exemple)",
        ],
      },
      {
        label: "Krigeage (module Le Compas)",
        points: [
          "Pondération dérivée statistiquement d'un variogramme ajusté sur les données, pas d'une convention arbitraire (p ou une formule spline)",
          "Fournit en prime une carte d'incertitude (variance de krigeage)",
          "Plus exigeant à mettre en œuvre (nécessite un échantillon suffisant pour ajuster un variogramme fiable)",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Trois méthodes, une hiérarchie de rigueur croissante",
    text: "IDW, spline et krigeage répondent à la même question (estimer une valeur continue à partir d'un échantillon de points), mais avec un degré de rigueur statistique croissant : IDW pondère selon une convention géométrique arbitraire, la spline selon une contrainte purement mathématique de lissage, le krigeage selon la structure spatiale réellement mesurée du phénomène (le variogramme). Aucune des trois n'est \"la meilleure\" dans l'absolu : IDW convient à un besoin rapide et simple, la spline à un phénomène qu'on sait lisse par nature, le krigeage dès qu'une estimation de l'incertitude est nécessaire en plus de l'estimation elle-même.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : le krigeage et le variogramme en détail",
    description: "Le Compas détaille la construction du variogramme (portée, palier, pépite) et ce que le krigeage ajoute par rapport à une simple pondération par la distance.",
  },

  { type: "heading", text: "5. Plus court chemin, au-delà de Dijkstra et A*", level: "superieur" },
  {
    type: "paragraph",
    text: "Le Compas a déjà présenté Dijkstra (calcul du plus court chemin depuis une source unique, avec des poids positifs) et A* (Dijkstra guidé par une heuristique). Deux situations que ces deux algorithmes ne couvrent pas directement : des poids d'arêtes négatifs, et le besoin du plus court chemin entre toutes les paires de nœuds à la fois plutôt que depuis une seule source.",
  },
  {
    type: "formula",
    label: "Bellman-Ford : relaxation répétée de toutes les arêtes",
    formula: "Pour chaque arête (u, v, w), répéter |V| − 1 fois : si dist[u] + w < dist[v], alors dist[v] ← dist[u] + w",
    note: "Complexité O(V·E) (V = nombre de nœuds, E = nombre d'arêtes), plus lent que Dijkstra en O((V+E) log V), mais Bellman-Ford (1958) fonctionne même avec des poids d'arêtes négatifs, ce que Dijkstra ne garantit pas (un poids négatif peut faire manquer le vrai plus court chemin à Dijkstra). Une passe supplémentaire après les |V| − 1 répétitions permet même de détecter un cycle de poids total négatif (un chemin qu'on pourrait raccourcir indéfiniment en tournant en boucle), une situation que Dijkstra ne détecte pas du tout.",
  },
  {
    type: "formula",
    label: "Floyd-Warshall : tous les plus courts chemins, entre toutes les paires",
    formula: "dist[i][j] ← min( dist[i][j], dist[i][k] + dist[k][j] )  pour chaque nœud intermédiaire k",
    note: "Complexité O(V³), indépendante du nombre d'arêtes. Contrairement à Dijkstra (une seule source à la fois) ou Bellman-Ford, Floyd-Warshall (1962) calcule en une seule passe le plus court chemin entre chaque paire de nœuds du graphe, en autorisant progressivement chaque nœud k comme intermédiaire possible. Économique quand on a réellement besoin de toutes les paires (une matrice complète de distances entre toutes les communes d'un réseau, par exemple) ; inutilement coûteux si on ne cherche qu'un seul chemin source-destination.",
  },
  {
    type: "table",
    headers: ["Algorithme", "Répond à…", "Complexité", "Poids négatifs ?"],
    rows: [
      ["Dijkstra (module Le Compas)", "Plus court chemin depuis une source unique", "O((V+E) log V)", "Non"],
      ["A* (module Le Compas)", "Idem, guidé par une heuristique vers la destination", "Dépend de l'heuristique, souvent bien inférieur à Dijkstra en pratique", "Non"],
      ["Bellman-Ford", "Plus court chemin depuis une source unique, poids négatifs autorisés", "O(V·E)", "Oui (détecte aussi les cycles négatifs)"],
      ["Floyd-Warshall", "Plus court chemin entre toutes les paires de nœuds à la fois", "O(V³)", "Oui (pas de cycle négatif)"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi des poids négatifs, en géomatique ?",
    text: "Un poids d'arête négatif paraît étrange pour une distance physique (jamais négative), mais apparaît naturellement dès que le poids représente autre chose : un gain net plutôt qu'un coût pur (un dénivelé négatif qui \"rembourse\" de l'énergie en descente dans un modèle de coût énergétique d'un trajet), ou un différentiel économique entre deux itinéraires logistiques concurrents. Bellman-Ford reste alors le seul des algorithmes de cette page directement utilisable sans transformation préalable du graphe.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : Dijkstra et A* en détail",
    description: "Le Compas détaille le fonctionnement de Dijkstra et l'apport de l'heuristique d'A*, les deux algorithmes de plus court chemin les plus utilisés en pratique (itinéraires routiers).",
  },

  { type: "heading", text: "6. Clustering spatial basé sur la densité : DBSCAN", level: "superieur" },
  {
    type: "paragraph",
    text: "Regrouper des points en clusters (des grappes) selon leur seule position géographique est un problème distinct de tout ce qui précède : on ne cherche plus une valeur (interpolation) ni un chemin (réseau), mais une partition du nuage de points en groupes denses, séparés par des zones plus clairsemées. DBSCAN (Density-Based Spatial Clustering of Applications with Noise, Ester et al., 1996) est l'algorithme de référence pour cette tâche.",
  },
  {
    type: "brique",
    id: "dbscan-clustering",
    title: "DBSCAN : regrouper par densité, avec détection de bruit",
    blocks: [
      {
        type: "list",
        items: [
          "eps (ε) : le rayon de voisinage autour de chaque point",
          "minPts : le nombre minimal de points (le point lui-même inclus) qui doivent se trouver dans ce voisinage pour qu'un point soit considéré comme \"dense\"",
          "Point cœur (core point) : un point dont le voisinage à distance eps contient au moins minPts points",
          "Point de bordure (border point) : un point qui n'est pas lui-même un point cœur, mais qui se trouve dans le voisinage d'un point cœur",
          "Bruit (noise) : un point qui n'est ni un point cœur, ni dans le voisinage d'aucun point cœur — DBSCAN ne force jamais un point isolé à rejoindre un cluster",
        ],
      },
      {
        type: "paragraph",
        text: "Un cluster DBSCAN est l'ensemble de tous les points cœurs connectés de proche en proche (chacun dans le voisinage d'au moins un autre point cœur du même groupe), auquel s'ajoutent leurs points de bordure. Le nombre de clusters n'est jamais fixé à l'avance : il émerge directement de la structure de densité des données, contrairement à un algorithme qui demanderait de préciser k clusters en entrée.",
      },
      {
        type: "formula",
        label: "Complexité de DBSCAN",
        formula: "O(n log n) avec un index spatial (section 1) pour chaque requête de voisinage ; O(n²) sans index",
        note: "Chaque point doit interroger son voisinage à distance eps : avec un quadtree ou un k-d tree, cette requête coûte O(log n) en moyenne, soit O(n log n) au total sur n points ; sans index, chaque requête de voisinage compare naïvement à tous les autres points, soit O(n²) — l'illustration directe de pourquoi les structures d'indexation de la section 1 comptent en pratique, pas seulement en théorie.",
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple : eps = 1,5 km, minPts = 3",
    text: "Un semis de départs de feu de forêt : cinq points serrés dans un rayon de 800 m les uns des autres (chacun a au moins deux autres points dans son voisinage à 1,5 km → tous points cœurs, un seul cluster) ; un sixième point isolé à 4 km du groupe le plus proche (aucun point dans son voisinage à 1,5 km → classé bruit, pas rattaché de force au cluster). DBSCAN produit ainsi un seul cluster dense plus un point de bruit, sans qu'on ait eu à décider à l'avance qu'il fallait chercher exactement un groupe.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "DBSCAN (clustering spatial par densité)",
        points: [
          "Le nombre de clusters émerge des données, jamais fixé à l'avance",
          "Détecte explicitement le bruit (points isolés, non rattachés à un cluster)",
          "Peut trouver des clusters de forme quelconque, pas seulement des groupes ronds/compacts",
        ],
      },
      {
        label: "k-means (module Du Hasard et de la Preuve)",
        points: [
          "Le nombre de clusters k doit être choisi à l'avance par l'opérateur",
          "Force chaque point dans un cluster, aucune notion de bruit",
          "Suppose implicitement des clusters à peu près ronds/compacts autour d'un centre",
        ],
      },
      {
        label: "Gi* de Getis-Ord (module Les Statistiques)",
        points: [
          "Teste un point chaud/froid sur une variable mesurée (une valeur par zone), pas un simple regroupement géométrique de points",
          "Répond à une question statistique de significativité (Z-score), pas à une partition de l'espace en clusters",
          "S'applique typiquement sur des zones déjà découpées, DBSCAN s'applique directement sur un semis de points bruts",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Choisir eps et minPts n'est jamais anodin",
    text: "Un eps trop petit fragmente un vrai cluster en plusieurs petits morceaux artificiels (voire classe presque tout en bruit) ; un eps trop grand fusionne deux clusters réellement distincts en un seul. Une méthode courante consiste à tracer, pour chaque point, la distance à son k-ième plus proche voisin (k = minPts), triée par ordre croissant : le \"coude\" de cette courbe donne une estimation raisonnable d'eps. Un minPts trop petit (2 ou 3) rend l'algorithme très sensible au bruit ; une règle empirique courante est de partir de minPts ≥ dimension de l'espace + 1, et souvent minPts = 2×dimension en pratique.",
  },

  { type: "heading", text: "7. Généralisation cartographique automatisée", level: "superieur" },
  {
    type: "paragraph",
    text: "La piste Lycée a présenté Douglas-Peucker intuitivement. Deux précisions techniques, et un second algorithme qui répond au même problème par un critère différent.",
  },
  {
    type: "formula",
    label: "Complexité de Douglas-Peucker",
    formula: "O(n log n) en moyenne ; O(n²) dans le pire cas",
    note: "Le cas moyen suppose que le point le plus éloigné du segment courant divise la ligne en deux moitiés à peu près équilibrées à chaque récursion (comme un tri rapide bien équilibré) ; le pire cas survient quand ce point est systématiquement proche d'une extrémité, ce qui ne divise presque pas le problème à chaque étape.",
  },
  {
    type: "paragraph",
    text: "Visvalingam-Whyatt (1993) simplifie une ligne selon un critère différent de la distance perpendiculaire de Douglas-Peucker : l'aire du triangle formé par chaque point et ses deux voisins immédiats.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Pour chaque point intermédiaire de la ligne, calculer l'aire du triangle qu'il forme avec ses deux voisins immédiats",
      "Retirer le point dont le triangle a la plus petite aire — c'est le point qui, localement, contribue le moins à la forme de la ligne",
      "Recalculer l'aire des triangles des deux nouveaux voisins du point supprimé (leur voisinage a changé)",
      "Répéter jusqu'à atteindre le nombre de points visé, ou jusqu'à ce que la plus petite aire restante dépasse un seuil fixé",
    ],
  },
  {
    type: "formula",
    label: "Aire du triangle formé par trois points (formule du déterminant)",
    formula: "Aire = ½ · |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|",
    note: "Avec une file de priorité (tas), retirer à chaque étape le point d'aire minimale coûte O(log n), pour un total en O(n log n) sur toute la ligne — la même complexité moyenne que Douglas-Peucker, mais un critère de suppression différent.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Douglas-Peucker",
        points: [
          "Critère : distance perpendiculaire au segment courant",
          "Garde fidèlement les grands écarts de trajectoire, même isolés",
          "Peut laisser des micro-détails côte à côte si aucun ne dépasse seul la tolérance, produisant un résultat parfois anguleux",
        ],
      },
      {
        label: "Visvalingam-Whyatt",
        points: [
          "Critère : aire du triangle local (une notion d'\"importance visuelle\" du point)",
          "Résultat généralement perçu comme visuellement plus naturel, la ligne simplifiée \"ressemble\" davantage à l'originale de loin",
          "Traite la ligne de façon plus globale et progressive (un point à la fois, du moins important au plus important), plutôt que par découpes récursives indépendantes",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Lequel choisir ?",
    text: "Douglas-Peucker reste le plus répandu (implémenté nativement dans presque tous les SIG, dont QGIS) et suffit dans l'immense majorité des cas. Visvalingam-Whyatt est préféré quand le rendu visuel final compte particulièrement (cartographie soignée à plusieurs échelles, généralisation progressive d'un même jeu de données pour un webmapping multi-niveaux de zoom), car son critère d'aire produit statistiquement moins d'artefacts anguleux visibles à l'œil.",
  },

  { type: "heading", text: "8. Opérations géométriques robustes", level: "superieur" },
  {
    type: "paragraph",
    text: "Tous les algorithmes de cette page supposent des géométries \"propres\" : polygones sans auto-intersection, coordonnées parfaitement exactes. En pratique, une donnée réelle contient souvent des géométries invalides, et les ordinateurs ne calculent jamais avec une précision infinie — deux sources d'erreurs classiques en géométrie computationnelle.",
  },
  {
    type: "table",
    headers: ["Problème", "Cause typique", "Remède courant"],
    rows: [
      ["Polygone auto-intersectant", "Erreur de numérisation, fusion mal contrôlée de deux couches", "ST_MakeValid (PostGIS) ou l'astuce buffer(0), qui reconstruit une géométrie valide équivalente"],
      ["Sommets dupliqués ou quasi confondus", "Export/import répété entre logiciels, arrondi de coordonnées", "Un seuil de tolérance (snapping) qui fusionne les sommets plus proches qu'une distance donnée"],
      ["Test d'orientation instable près de trois points presque alignés", "Calcul en précision flottante standard (les fameuses erreurs d'arrondi du binaire)", "Prédicats géométriques robustes (arithmétique exacte ou adaptative), implémentés dans les bibliothèques de référence comme GEOS"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Trois points presque alignés : un piège classique",
    text: "Le test d'orientation (le point C est-il à gauche, à droite, ou exactement sur la droite formée par A et B ?), utilisé en interne par la plupart des algorithmes de cette page (convex hull, Delaunay, ray casting), repose sur le signe d'un déterminant. Quand trois points sont presque, mais pas exactement, alignés, l'arrondi en virgule flottante standard peut inverser ce signe par rapport au résultat mathématiquement exact — un bug rare, difficile à reproduire, mais réel dans toute implémentation naïve. Les bibliothèques de géométrie computationnelle de référence (GEOS, JTS, CGAL) utilisent des prédicats robustes spécifiquement conçus pour éviter ce piège, plutôt qu'une simple comparaison de flottants.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Une géométrie invalide propage l'erreur en silence",
    text: "Calculer une intersection, une union ou un buffer sur un polygone auto-intersectant peut, selon la bibliothèque utilisée, produire un résultat silencieusement faux (une surface incorrecte, un polygone à trou inattendu) plutôt qu'une erreur explicite. Vérifier la validité géométrique d'une couche avant tout traitement lourd (ST_IsValid en PostGIS, l'outil \"Vérifier la validité\" de QGIS) est un réflexe aussi important que vérifier le CRS d'un projet (module Le Compas), pour une raison symétrique : une erreur silencieuse est toujours plus coûteuse à détecter après coup qu'avant.",
  },
  {
    type: "devoir",
    format: "Exercice noté",
    title: "Classer des points par DBSCAN, à la main",
    prompt: "Dix capteurs de qualité de l'air sont installés aux coordonnées suivantes (en km) : P1(0, 0), P2(0.5, 0.3), P3(1, 0), P4(0.3, 1), P5(6, 6), P6(6.5, 6.2), P7(6.2, 6.8), P8(7, 6), P9(3, 3), P10(0.8, 0.8). Avec eps = 1,5 km et minPts = 3 : (1) pour chaque point, détermine s'il s'agit d'un point cœur, d'un point de bordure ou de bruit (une estimation visuelle des distances, sans calcul exact au mètre près, est acceptée). (2) Déduis-en le nombre de clusters trouvés et leur composition. (3) Explique en une phrase pourquoi P9 est traité différemment par DBSCAN et par un algorithme comme le k-means, où k aurait été fixé à 2 au départ.",
    criteria: [
      "Les points cœurs, de bordure et de bruit sont correctement distingués selon eps et minPts donnés",
      "Le nombre de clusters trouvés est cohérent avec la classification établie à l'étape 1",
      "La différence de traitement de P9 (point isolé) entre DBSCAN (bruit possible) et k-means (toujours rattaché à un cluster) est correctement expliquée",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : grille régulière, quadtree et k-d tree accélèrent une recherche spatiale de O(n) naïf à O(log n) en moyenne, chacun adapté à un type de distribution de données différent (R-tree pour des géométries étendues, cross-link GiST/PostGIS) ; Delaunay et Voronoï sont duaux (triangles vs zones de proximité) ; un TIN interpole exactement par plan à l'intérieur de chaque triangle, contrairement à une grille régulière ; l'exposant p de l'IDW contrôle la localité de l'estimation, la spline lisse au prix d'un possible dépassement, le krigeage reste le seul des trois à fonder sa pondération sur une structure spatiale mesurée ; Bellman-Ford gère les poids négatifs, Floyd-Warshall calcule toutes les paires en O(V³) ; DBSCAN regroupe par densité sans fixer k à l'avance et détecte le bruit, contrairement au k-means ou au Gi* ; Douglas-Peucker (distance) et Visvalingam-Whyatt (aire) simplifient une ligne selon deux critères différents ; une géométrie invalide ou un cas limite en précision flottante peut fausser silencieusement un résultat géométrique.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Continuer : LISA, Gi* et KDE",
    description: "Les Statistiques prolonge cette page sur le terrain spécifiquement statistique — significativité, autocorrélation locale — plutôt que purement géométrique/algorithmique.",
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : indexation et simplification sous QGIS",
    description: "L'Atelier applique concrètement la création d'un index spatial et la simplification d'une couche vectorielle sur un vrai jeu de données.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Analyse de motifs ponctuels : Clark-Evans, Ripley K, enveloppes de simulation", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Avant de chercher où une structure spatiale se manifeste (LISA, Gi*, module Les Statistiques) ou de simplement estimer une densité (KDE, même module), une question plus fondamentale se pose sur un semis de points brut : ce semis est-il statistiquement distinguable d'une répartition complètement aléatoire (CSR, Complete Spatial Randomness — un processus de Poisson spatial homogène), ou révèle-t-il un vrai regroupement (agrégation) ou au contraire une répulsion (régularité) ?",
  },
  {
    type: "brique",
    id: "clark-evans-monte-carlo",
    title: "Clark-Evans, Ripley K et test de significativité par simulation",
    blocks: [
      {
        type: "formula",
        label: "Indice du plus proche voisin de Clark-Evans",
        formula: "R = r̄A / r̄E,  avec r̄E = 1 / (2√(n/A))",
        note: "r̄A = distance moyenne observée au plus proche voisin, calculée sur les n points réels. r̄E = distance moyenne théorique attendue sous CSR, pour une densité n/A (A = aire de la zone d'étude). R = 1 : semis statistiquement indiscernable d'un processus aléatoire. R < 1 : agrégation (les points sont, en moyenne, plus proches de leur plus proche voisin que sous l'hypothèse aléatoire). R > 1 : régularité/dispersion (R = 2,1491 au maximum théorique, atteint pour une grille hexagonale parfaite, la répartition la plus régulière possible).",
      },
      {
        type: "callout",
        tone: "example",
        title: "Exemple chiffré",
        text: "Sur une zone d'étude de 100 km² (A = 100), 5 points d'ignition de feux de forêt affichent une distance moyenne observée au plus proche voisin r̄A = 1,2 km. Densité n/A = 5/100 = 0,05 point/km². r̄E = 1 / (2×√0,05) = 1 / (2×0,2236) ≈ 2,236 km. R = 1,2 / 2,236 ≈ 0,54. R nettement inférieur à 1 : les départs de feu sont significativement plus regroupés dans l'espace que ce qu'un hasard pur produirait — cohérent avec des foyers de départ liés à des facteurs communs (axes routiers, lignes électriques), pas dispersés au hasard sur tout le territoire. Un test statistique (écart-type théorique sous CSR ≈ 0,26136/√(n × n/A)) permet de vérifier si cet écart à R = 1 est significatif plutôt que dû au hasard d'échantillonnage sur seulement 5 points.",
      },
      {
        type: "paragraph",
        text: "L'indice de Clark-Evans (1954) résume tout un semis de points en un seul chiffre, à une seule échelle de distance implicite (celle du plus proche voisin). La fonction K de Ripley, déjà présentée en détail dans le module Les Statistiques, généralise cette même question à une infinité de distances h simultanément — un semis peut être regroupé à petite échelle tout en restant proche du hasard à grande échelle, une nuance qu'un seul indice comme R ne peut jamais révéler à lui seul.",
      },
      {
        type: "callout",
        tone: "rappel",
        title: "Rappel : la fonction K de Ripley est déjà détaillée ailleurs",
        text: "Formule complète, exemple chiffré et correction de bord de la fonction K de Ripley : voir le module Les Statistiques, piste Master/Recherche. Cette page ne la répète pas ; elle ajoute ci-dessous ce que Les Statistiques ne détaille pas — comment tester rigoureusement la significativité de K(h) (ou de R ci-dessus) par simulation, plutôt que par une seule formule de test asymptotique.",
      },
    ],
  },
  {
    type: "formula",
    label: "Test de significativité par enveloppe de simulation Monte Carlo",
    formula: "Enveloppe = [min, max] (ou percentiles 2,5 %/97,5 %) de la statistique calculée sur N semis simulés sous CSR",
    note: "Principe : générer un grand nombre N de semis de points artificiels (typiquement 99 ou 999 simulations), chacun respectant strictement l'hypothèse CSR (n points tirés uniformément au hasard dans la même zone d'étude A), puis calculer la statistique d'intérêt (Clark-Evans R, ou K(h) pour chaque distance h) sur chacun de ces semis simulés. L'ensemble des valeurs simulées borne une enveloppe de confiance : si la statistique observée sur les vraies données sort de cette enveloppe (typiquement au-delà de la plus extrême des 99 simulations, un seuil p ≈ 0,01), l'écart à CSR est considéré statistiquement significatif — sans jamais supposer de forme théorique particulière pour la distribution de la statistique sous l'hypothèse nulle, contrairement à un test reposant sur une formule d'écart-type asymptotique.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi simuler plutôt que calculer une formule ?",
    text: "La formule de test asymptotique de Clark-Evans (basée sur un écart-type théorique) suppose un grand nombre de points et une zone d'étude simple (souvent rectangulaire). Sur un petit échantillon, une zone d'étude de forme irrégulière (un massif forestier aux contours sinueux, pas un rectangle), ou une statistique plus complexe comme K(h) à de multiples distances simultanément, la simulation Monte Carlo reste valide dans tous les cas : elle respecte exactement la vraie forme de la zone d'étude et le vrai nombre de points, sans aucune approximation mathématique supplémentaire à justifier.",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Un collègue calcule un indice de Clark-Evans R = 0,85 sur un semis de 12 points et conclut directement à une agrégation significative, sans test de significativité. Pourquoi cette conclusion est-elle prématurée avec un échantillon aussi petit, et en quoi une enveloppe de simulation Monte Carlo répondrait-elle mieux à la question que R seul ?",
  },

  { type: "heading", text: "2. Clustering spatial avancé : OPTICS, et la régionalisation (SKATER, AZP)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "DBSCAN (piste Licence/BUT) suppose une densité de cluster à peu près homogène, fixée par un seul couple (eps, minPts) pour tout le jeu de données. OPTICS (Ordering Points To Identify the Clustering Structure, Ankerst et al., 1999) généralise DBSCAN pour gérer des clusters de densités variables au sein d'un même semis de points, sans avoir à choisir un seul eps global a priori.",
  },
  {
    type: "list",
    items: [
      "Distance de cœur (core-distance) d'un point p : la distance à son minPts-ième plus proche voisin — la valeur d'eps minimale qui ferait de p un point cœur",
      "Distance d'accessibilité (reachability-distance) d'un point p depuis un point o : max(core-distance(o), distance(p, o)) — combien il faudrait au minimum agrandir le rayon de densité pour atteindre p depuis o",
      "OPTICS ordonne tous les points selon un parcours qui reste toujours le plus proche possible de la structure dense courante, et produit un graphique d'accessibilité (reachability plot) : les \"vallées\" de ce graphique correspondent aux clusters, leur profondeur relative à leur densité respective",
      "Extraire des clusters à différents seuils de densité revient alors à couper ce graphique à différentes hauteurs, sans avoir à relancer tout l'algorithme pour chaque seuil testé — un avantage direct sur DBSCAN, qu'il faudrait relancer entièrement pour chaque nouvel eps",
    ],
  },
  {
    type: "formula",
    label: "Complexité d'OPTICS",
    formula: "O(n log n) avec un index spatial (section 1, piste Licence/BUT), la même complexité que DBSCAN",
    note: "OPTICS coûte le même ordre de grandeur que DBSCAN à exécuter, pour un résultat bien plus riche (une hiérarchie de densités explorable a posteriori plutôt qu'une seule partition figée) — le compromis est presque uniquement dans la complexité de mise en œuvre et d'interprétation du reachability plot, pas dans le temps de calcul.",
  },
  {
    type: "paragraph",
    text: "Un problème différent, souvent confondu avec le clustering spatial, est la régionalisation : constituer des régions qui soient à la fois statistiquement homogènes (comme un cluster classique) ET spatialement contiguës (chaque région forme un seul bloc connexe sur la carte, jamais des fragments disjoints). DBSCAN ou OPTICS, appliqués tels quels sur des données mêlant position et attribut, ne garantissent jamais cette contiguïté.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "SKATER (Spatial 'K'luster Analysis by Tree Edge Removal, Assunção et al., 2006)",
        points: [
          "Construit d'abord un graphe de contiguïté entre zones voisines, pondéré par leur dissemblance d'attributs",
          "Calcule l'arbre couvrant de poids minimal (MST) de ce graphe",
          "Retire itérativement, dans cet arbre, l'arête dont la suppression réduit le plus l'hétérogénéité interne des sous-arbres obtenus",
          "S'arrête au nombre de régions k souhaité — chaque sous-arbre restant est une région, contiguë par construction (c'est un sous-arbre connexe)",
        ],
      },
      {
        label: "AZP (Automatic Zoning Procedure, Openshaw, 1977)",
        points: [
          "Part d'un découpage initial en k régions déjà contiguës (un point de départ, pas une reconstruction depuis zéro)",
          "Recherche locale : déplace une unité spatiale d'une région vers une région adjacente si ce déplacement réduit l'hétérogénéité interne totale, sous contrainte de préserver la contiguïté des deux régions concernées",
          "Répète jusqu'à ne plus trouver de déplacement qui améliore le résultat (un optimum local, pas nécessairement global)",
          "Peut être relancé avec des points de départ différents, ou selon une variante recuit simulé, pour tenter d'échapper à un optimum local médiocre",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "La régionalisation n'est pas un simple clustering appliqué à des zones",
    text: "Appliquer un k-means ou un DBSCAN directement sur des attributs de zones (sans tenir compte de leur contiguïté géographique) peut très bien regrouper deux communes aux caractéristiques socio-économiques proches mais situées aux deux extrémités opposées du territoire — un résultat statistiquement valide, mais inutilisable pour découper un territoire en bassins d'emploi ou en secteurs d'intervention, qui doivent rester des blocs continus sur la carte. SKATER et AZP imposent explicitement cette contrainte de contiguïté, absente par construction d'un clustering classique.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Voir aussi : autocorrélation spatiale et MAUP",
    description: "Le Compas rappelle que le découpage d'un territoire n'est jamais neutre pour une statistique de zone (MAUP) — la régionalisation (SKATER/AZP) construit ce découpage rigoureusement plutôt que de le subir.",
  },

  { type: "heading", text: "3. Analyse de réseau avancée : TSP, VRP, centralité", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà du plus court chemin entre deux points (Dijkstra, A*, Bellman-Ford, Floyd-Warshall), l'analyse de réseau couvre des problèmes d'optimisation combinatoire plus vastes — visiter plusieurs points dans le meilleur ordre possible, répartir des tournées entre plusieurs véhicules — et des mesures qui ne cherchent plus un chemin mais l'importance relative de chaque nœud dans l'ensemble du réseau.",
  },
  {
    type: "formula",
    label: "Le problème du voyageur de commerce (TSP)",
    formula: "Trouver le cycle de coût total minimal qui visite chacun des n nœuds exactement une fois",
    note: "Le TSP est NP-difficile : aucun algorithme connu ne le résout en temps polynomial dans le cas général. La méthode exacte de Held-Karp (programmation dynamique) le résout en O(n² · 2ⁿ), praticable seulement jusqu'à une vingtaine, une trentaine de nœuds. Au-delà, on recourt à des heuristiques : le plus proche voisin (choisir à chaque étape le nœud non visité le plus proche, rapide mais souvent loin de l'optimal), le 2-opt (recherche locale qui élimine les croisements d'itinéraire en échangeant deux arêtes), ou l'algorithme de Christofides, une approximation garantie à 1,5 fois l'optimal pour un TSP métrique (les distances respectent l'inégalité triangulaire), fondée sur un arbre couvrant minimal complété par un couplage parfait de poids minimal sur les nœuds de degré impair.",
  },
  {
    type: "paragraph",
    text: "Le problème de tournées de véhicules (VRP, Vehicle Routing Problem) généralise le TSP à plusieurs véhicules partant d'un même dépôt, chacun avec une capacité limitée (un nombre de colis, un volume) à répartir entre plusieurs clients. Une heuristique classique, l'algorithme des économies (Clarke-Wright, 1964), part d'une tournée séparée pour chaque client puis fusionne progressivement les tournées qui réduisent le plus la distance totale parcourue, tout en respectant la capacité de chaque véhicule.",
  },
  {
    type: "formula",
    label: "Centralité d'intermédiarité (betweenness) et de proximité (closeness)",
    formula: "C_B(v) = Σₛ≠ᵥ≠ₜ σₛₜ(v) / σₛₜ   ;   C_C(v) = (n − 1) / Σᵤ d(v, u)",
    note: "C_B(v) (Freeman, 1977) : pour chaque paire de nœuds (s, t) autres que v, σₛₜ = nombre total de plus courts chemins entre s et t, σₛₜ(v) = combien de ces chemins passent par v. Un nœud à forte centralité d'intermédiarité est un \"pont\" critique du réseau : sa disparition (un pont fermé, un carrefour saturé) allonge fortement de nombreux trajets. C_C(v) : l'inverse de la distance moyenne de v à tous les autres nœuds (n = nombre total de nœuds) — un nœud à forte centralité de proximité atteint rapidement le reste du réseau, un bon candidat pour l'implantation d'un équipement central (caserne de pompiers, entrepôt logistique).",
  },
  {
    type: "table",
    headers: ["Mesure/algorithme", "Répond à…", "Application typique"],
    rows: [
      ["TSP (heuristiques)", "Dans quel ordre visiter n points pour minimiser la distance totale ?", "Tournée de relevé de compteurs, circuit touristique optimisé"],
      ["VRP (Clarke-Wright)", "Comment répartir n clients entre plusieurs véhicules à capacité limitée ?", "Planification de tournées de livraison depuis un ou plusieurs dépôts"],
      ["Centralité d'intermédiarité", "Quels nœuds concentrent le plus de trajets qui les traversent ?", "Identifier les carrefours critiques d'un réseau routier, les nœuds à protéger en priorité"],
      ["Centralité de proximité", "Quel nœud atteint le reste du réseau le plus rapidement en moyenne ?", "Localisation optimale d'un équipement d'urgence (caserne, hôpital)"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "TSP et VRP ne sont pas Dijkstra à plus grande échelle",
    text: "Dijkstra répond à \"quel est le plus court chemin entre A et B\", un problème résolu exactement et rapidement même sur un immense réseau. Demander en plus \"dans quel ordre visiter dix points précis avant de revenir au dépôt\" change radicalement la nature du problème : ce n'est plus un plus court chemin sur un graphe fixe, mais un choix parmi un nombre de permutations qui explose de façon factorielle avec le nombre de points à visiter — exactement pourquoi le TSP est NP-difficile alors que le plus court chemin entre deux points ne l'est pas.",
  },

  { type: "heading", text: "4. Complexité algorithmique appliquée : pourquoi le choix dépend de la taille réelle des données", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Cette page a mentionné une classe de complexité pour presque chaque algorithme présenté. Les rassembler dans un seul tableau rend visible ce qui distingue un algorithme utilisable à toute échelle d'un algorithme réservé à de petits jeux de données.",
  },
  {
    type: "table",
    headers: ["Algorithme", "Complexité typique", "Praticable jusqu'à…"],
    rows: [
      ["Recherche naïve de plus proche voisin", "O(n)", "Quelques dizaines de milliers de points, si peu de requêtes répétées"],
      ["Quadtree / k-d tree (recherche)", "O(log n) moyen", "Plusieurs millions de points"],
      ["Enveloppe convexe (Graham scan)", "O(n log n)", "Très grands volumes, contrainte surtout par la mémoire"],
      ["Triangulation de Delaunay", "O(n log n)", "Plusieurs millions de points (implémentations optimisées)"],
      ["Douglas-Peucker / Visvalingam-Whyatt", "O(n log n) moyen, O(n²) pire cas", "Une ligne de plusieurs dizaines de milliers de sommets"],
      ["DBSCAN / OPTICS (avec index)", "O(n log n)", "Plusieurs millions de points"],
      ["Dijkstra (tas binaire)", "O((V+E) log V)", "Un réseau routier national entier"],
      ["Bellman-Ford", "O(V·E)", "Un réseau de taille moyenne (poids négatifs)"],
      ["Floyd-Warshall (toutes les paires)", "O(V³)", "Quelques milliers de nœuds seulement, au-delà : trop lent"],
      ["TSP exact (Held-Karp)", "O(n² · 2ⁿ)", "Une vingtaine à une trentaine de nœuds, pas plus"],
      ["TSP heuristique (2-opt, Christofides)", "Polynomial", "Des milliers de nœuds, sans garantie d'optimalité stricte"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Un O(n²) n'est pas toujours un mauvais choix",
    text: "Sur 200 points, un algorithme en O(n²) (40 000 opérations) et un algorithme en O(n log n) (environ 1 500 opérations) sont tous deux quasi instantanés pour un ordinateur moderne : la différence ne se voit pas. Sur 2 millions de points, le même écart devient vertigineux : O(n²) donnerait 4 000 milliards d'opérations (des heures, voire des jours), O(n log n) en donnerait environ 42 millions (une fraction de seconde). Choisir un algorithme plus complexe à implémenter pour sa complexité asymptotique meilleure n'a de sens qu'à partir d'une taille de données où cet écart devient réellement sensible — une décision d'ingénierie, pas un réflexe systématique à appliquer sans réfléchir à l'échelle réelle du problème.",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Calculer toutes les distances entre toutes les paires de 500 communes d'un département avec Floyd-Warshall (O(V³) ≈ 125 millions d'opérations) reste praticable. Faire de même pour les 35 000 communes de France (O(V³) ≈ 42 900 milliards d'opérations) ne l'est plus. Quelle alternative proposerais-tu pour obtenir malgré tout, de façon praticable, la distance de chaque commune aux communes qui l'intéressent réellement (ses k plus proches voisines, par exemple), sans jamais calculer la matrice complète des 35 000 × 35 000 distances ?",
  },

  { type: "heading", text: "5. Passage à l'échelle : quand n devient très grand", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà de quelques dizaines de millions de géométries, même les structures d'indexation les plus efficaces (section 1) atteignent leurs limites pratiques : la structure elle-même ne tient plus entièrement en mémoire vive, et certains algorithmes (Delaunay exact, TSP même heuristique sur des millions de nœuds) deviennent trop lents même avec la meilleure complexité asymptotique disponible.",
  },
  {
    type: "list",
    items: [
      "Simplification en flux (streaming) : traiter une ligne ou un polygone sommet par sommet, dans l'ordre du fichier, sans jamais charger la géométrie entière en mémoire — une variante de Douglas-Peucker adaptée au flux existe, au prix d'un résultat parfois légèrement moins optimal qu'une version qui voit la ligne entière d'un coup",
      "Parallélisation : répartir un traitement spatial (une jointure, une simplification en masse) sur plusieurs cœurs ou plusieurs machines, chacune traitant une portion géographique distincte du jeu de données — l'approche des moteurs de traitement spatial distribué comme Apache Sedona (ex-GeoSpark), construits au-dessus d'un moteur de calcul distribué généraliste",
      "Indexation hors mémoire (out-of-core) : un R-tree ou un quadtree peut être organisé et stocké directement sur disque, structuré en blocs de taille fixe (souvent la taille d'une page disque), pour rester interrogeable sans jamais devoir tenir intégralement en RAM — le même principe qu'un index de base de données classique (module La Base), appliqué à une géométrie plutôt qu'à un identifiant numérique",
      "Partitionnement spatial (tuilage) : découper le territoire en dalles ou en tuiles traitées indépendamment, souvent la première étape avant toute parallélisation ou tout traitement hors mémoire",
    ],
  },
  {
    type: "diagram",
    name: "spatial-index-tree",
    caption: "À très grande échelle, le même principe de rectangles englobants imbriqués s'organise directement sur disque plutôt qu'en mémoire vive : chaque nœud de l'arbre correspond à un bloc lu à la demande, pas à l'ensemble de la structure chargée d'un coup.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Les limites pratiques ne sont pas seulement une question de mémoire",
    text: "Un TSP exact (Held-Karp) reste mathématiquement défini pour n'importe quel nombre de nœuds, mais devient concrètement incalculable bien avant qu'un problème de mémoire ne se pose (dès quelques dizaines de nœuds, la complexité O(n²·2ⁿ) explose). À l'inverse, une recherche de plus proche voisin indexée reste en théorie parfaitement soutenable jusqu'à des milliards de points ; c'est alors la mémoire disponible, pas la complexité de l'algorithme, qui devient la vraie contrainte. Diagnostiquer laquelle des deux limites (complexité algorithmique intrinsèque, ou ressources matérielles disponibles) est réellement en cause conditionne complètement la solution à apporter.",
  },

  { type: "heading", text: "6. Détection de motifs de co-localisation spatiale", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà d'une corrélation globale entre deux variables continues (module Du Hasard et de la Preuve) ou d'une autocorrélation d'une seule variable (Moran, module Le Compas), une question différente se pose souvent sur des données catégorielles géolocalisées : quelles catégories d'entités ont tendance à apparaître ensemble dans l'espace, plus souvent que ne le voudrait le hasard ? La détection de motifs de co-localisation spatiale (spatial co-location pattern mining, Shekhar & Huang, 2001) répond précisément à cette question.",
  },
  {
    type: "formula",
    label: "Indice de participation d'un motif de co-localisation",
    formula: "PR(C, fᵢ) = |instances de fᵢ participant à C| / |instances totales de fᵢ|   ;   PI(C) = minᵢ PR(C, fᵢ)",
    note: "Pour un motif C = {f1, f2} (par exemple \"distributeur automatique\" et \"commerce de restauration rapide\"), PR(C, fᵢ) mesure la proportion des instances de la catégorie fᵢ qui se trouvent effectivement à proximité d'au moins une instance de l'autre catégorie du motif. L'indice de participation global PI(C), le minimum des PR sur toutes les catégories du motif, résume la force du motif dans son ensemble : un motif n'est considéré comme \"prévalent\" que si PI(C) dépasse un seuil minimal fixé à l'avance, garantissant que les deux catégories se co-localisent réellement dans les deux sens, pas seulement dans un seul.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "Sur un jeu de données de commerces urbains, 80 distributeurs automatiques sur 100 se trouvent à moins de 50 m d'un commerce de restauration rapide (PR = 0,80), et 60 commerces de restauration rapide sur 150 se trouvent à moins de 50 m d'un distributeur (PR = 0,40). PI({distributeur, restauration rapide}) = min(0,80, 0,40) = 0,40. Ce motif de co-localisation n'est ni purement symétrique (les distributeurs \"cherchent\" davantage la proximité des commerces de restauration que l'inverse), ni négligeable — une nuance que ni une simple carte de densité superposée, ni un indice de corrélation global entre deux variables continues, ne mettrait en évidence de cette façon.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Une question différente de LISA ou de Gi*",
    text: "LISA et Gi* (module Les Statistiques) travaillent sur une variable mesurée continue (un taux, un indice) répartie sur des zones. La co-localisation travaille directement sur des catégories d'entités ponctuelles distinctes (deux types de commerces, une espèce végétale et un type de sol) : ce n'est pas la même donnée en entrée (catégorielle et ponctuelle, plutôt que continue et zonale), et donc jamais un cas particulier de LISA/Gi*, même si l'intuition sous-jacente — la proximité spatiale porte de l'information — reste, une fois de plus, celle de Tobler.",
  },
  {
    type: "devoir",
    format: "Exercice noté",
    title: "Calculer une centralité d'intermédiarité à la main",
    prompt: "Un petit réseau routier relie cinq bourgs par les tronçons suivants, avec leur temps de trajet en minutes : A–B (4), B–C (3), C–D (2), D–E (5), B–D (6), A–E (10). (1) Détermine le plus court chemin (en temps total) entre chacune des six paires de bourgs qui n'impliquent pas B directement comme extrémité (A–C, A–D, A–E, C–D, C–E, D–E), en indiquant si ce chemin passe par B. (2) À partir de ce décompte, calcule la centralité d'intermédiarité de B au sens de Freeman (la part des plus courts chemins, parmi ces six paires, qui passent effectivement par B). (3) Un service technique dispose d'un budget limité pour renforcer un seul tronçon du réseau contre les coupures. Le résultat de la question 2 justifie-t-il de prioriser un tronçon connecté à B plutôt qu'un autre ? Justifie.",
    criteria: [
      "Les six plus courts chemins sont correctement calculés (temps total minimal, en tenant compte de tous les tronçons disponibles, pas seulement du chemin direct)",
      "La centralité d'intermédiarité de B est calculée comme la proportion correcte de plus courts chemins passant par B parmi les six paires considérées",
      "La recommandation finale relie explicitement une centralité d'intermédiarité élevée au risque de fragilisation du réseau en cas de coupure de ce nœud",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : Clark-Evans résume un semis de points en un seul indice R à l'échelle du plus proche voisin, la fonction K de Ripley (module Les Statistiques) généralise à toutes les échelles à la fois ; une enveloppe de simulation Monte Carlo teste la significativité de ces deux statistiques sans hypothèse de forme théorique ; OPTICS généralise DBSCAN à des densités variables via un reachability plot ; SKATER et AZP résolvent un problème différent du clustering — la régionalisation sous contrainte de contiguïté spatiale ; le TSP est NP-difficile (heuristiques : plus proche voisin, 2-opt, Christofides), le VRP le généralise à plusieurs véhicules, la centralité d'intermédiarité identifie les nœuds critiques d'un réseau, la centralité de proximité les nœuds les mieux placés en moyenne ; le choix d'un algorithme dépend de la taille réelle n des données, pas seulement de sa complexité asymptotique dans l'absolu ; au-delà de plusieurs dizaines de millions de géométries, le streaming, la parallélisation et l'indexation hors mémoire prennent le relais des structures classiques ; la co-localisation détecte quelles catégories d'entités s'associent spatialement, une question distincte de l'autocorrélation d'une seule variable continue.",
    ],
  },
  {
    type: "link",
    to: "/module/bases-donnees-spatiales",
    label: "Continuer : passage à l'échelle d'une base spatiale",
    description: "La Base détaille le partitionnement et la parallélisation côté base de données (EXPLAIN ANALYZE, partitionnement, PostGIS Raster) — le pendant applicatif du passage à l'échelle présenté ici de façon algorithmique.",
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Voir aussi : LISA, Gi* et régression spatiale",
    description: "Les Statistiques prolonge cette page sur le terrain de la significativité statistique locale — un terrain complémentaire, pas redondant, de la détection de motifs présentée ici.",
  },
]
