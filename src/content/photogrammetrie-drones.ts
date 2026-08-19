import type { ContentBlock } from "./types"

export const photogrammetrieDronesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Le module Le Regard traite l'image satellite, acquise depuis 700-800 km d'altitude, résolution fixée par le capteur. Cette salle traite l'image aérienne rapprochée, acquise par drone ou avion à quelques dizaines ou centaines de mètres : une autre échelle, une autre méthode — reconstruire un modèle 3D à partir de nombreuses photos qui se recouvrent, plutôt que lire directement des bandes spectrales.",
  },
  {
    type: "link",
    to: "/module/fondamentaux",
    label: "Avant de commencer : géoréférencement par points de contrôle",
    description: "Le module Fondements pose déjà le principe des points de contrôle pour caler une image sur un référentiel — cette salle l'étend à un modèle 3D entier.",
  },

  { type: "heading", text: "1. De la photo aérienne au modèle 3D : le principe de la photogrammétrie", level: "lycee" },
  {
    type: "paragraph",
    text: "La photogrammétrie reconstruit la géométrie 3D d'une scène à partir de plusieurs photographies 2D qui se recouvrent, prises sous des angles légèrement différents — le même principe que la vision stéréoscopique humaine (deux yeux, deux points de vue légèrement décalés, le cerveau reconstitue la profondeur), mais appliqué à des dizaines ou des centaines d'images plutôt qu'à deux.",
  },

  { type: "heading", text: "2. Le recouvrement : condition indispensable à la reconstruction", level: "lycee" },
  {
    type: "paragraph",
    text: "Un point du terrain ne peut être positionné en 3D que s'il est visible sur au moins deux photos prises sous des angles différents. Un plan de vol de drone impose donc un recouvrement systématique entre images consécutives (recouvrement longitudinal, le long d'une même bande de vol) et entre bandes adjacentes (recouvrement latéral).",
  },
  {
    type: "table",
    headers: ["Type de recouvrement", "Valeur typique", "Conséquence si insuffisant"],
    rows: [
      ["Longitudinal (le long d'une bande)", "70-80 %", "Trous dans la reconstruction, zones jamais vues sous deux angles"],
      ["Latéral (entre bandes adjacentes)", "60-70 %", "Décalages ou trous entre les bandes de vol adjacentes"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un recouvrement insuffisant ne se voit qu'après coup",
    text: "Les photos elles-mêmes peuvent sembler nettes et bien exposées ; le manque de recouvrement ne se révèle qu'au traitement, sous forme de trous dans le nuage de points ou l'orthophoto finale, généralement après le vol — d'où l'importance de planifier le recouvrement en amont plutôt que de l'improviser sur le terrain.",
  },

  { type: "heading", text: "3. Structure from Motion (SfM) : reconstruire sans mesurer directement", level: "superieur" },
  {
    type: "paragraph",
    text: "L'algorithme Structure from Motion (Ullman, 1979 pour le principe théorique ; largement démocratisé pour la photogrammétrie de drone dans les années 2010) détecte automatiquement des points caractéristiques (coins, textures contrastées) répétés sur plusieurs photos, met en correspondance ces points d'une image à l'autre, puis résout simultanément deux inconnues : la position/orientation de chaque photo (la trajectoire du drone) et la position 3D de chaque point caractéristique — sans qu'aucune des deux ne soit connue au départ.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi la SfM a démocratisé la photogrammétrie",
    text: "Avant la SfM automatique, la photogrammétrie aérienne exigeait des caméras métriques calibrées et un opérateur spécialisé. La SfM tolère des caméras grand public non calibrées (y compris celle d'un drone commercial) : elle calibre la caméra elle-même comme sous-produit du calcul, à partir des correspondances entre images — c'est ce qui a rendu la photogrammétrie de drone accessible hors du cercle des professionnels spécialisés.",
  },

  { type: "heading", text: "4. MNS et MNT : deux surfaces, pas la même chose", level: "superieur" },
  {
    type: "paragraph",
    text: "La reconstruction SfM produit d'abord un Modèle Numérique de Surface (MNS) : l'altitude du sommet de tout ce qui est visible d'en haut — toiture, cime des arbres, sol nu. Le Modèle Numérique de Terrain (MNT), lui, décrit uniquement l'altitude du sol nu, sans le bâti ni la végétation : il s'obtient en filtrant le MNS pour retirer ces objets, une étape de calcul distincte, jamais un sous-produit automatique de la prise de vue elle-même.",
  },
  {
    type: "formula",
    label: "Modèle de hauteur de canopée",
    formula: "CHM = MNS − MNT",
    note: "La différence entre les deux surfaces donne directement la hauteur de ce qui dépasse du sol (bâti, végétation) en tout point — une opération d'algèbre raster simple (module Le Compas, section 5) une fois les deux modèles obtenus séparément.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un MNT filtré par photogrammétrie reste fragile sous couvert dense",
    text: "Contrairement au LiDAR (voir la salle suivante), la photogrammétrie ne voit que la première surface opaque rencontrée par la caméra : sous une canopée forestière dense, aucune photo ne voit jamais le sol, donc aucun MNT fiable n'en est directement extrait. C'est la limite structurelle la plus citée de la photogrammétrie face au LiDAR, qui, lui, laisse une partie de son signal laser pénétrer entre les feuilles.",
  },

  { type: "heading", text: "5. Points d'appui au sol (GCP) et précision du modèle", level: "superieur" },
  {
    type: "paragraph",
    text: "La reconstruction SfM seule produit un modèle cohérent en géométrie relative (les distances entre points sont correctes entre elles) mais pas nécessairement bien positionné dans un référentiel géographique réel (Lambert-93, par exemple), ni à la bonne échelle absolue. Des points d'appui au sol (Ground Control Points, GCP), mesurés précisément au GPS avant ou pendant le vol et identifiables sur plusieurs photos, calent le modèle sur ce référentiel — exactement le même principe que le géoréférencement par grille du module Fondements, appliqué ici à un modèle 3D entier plutôt qu'à une seule image 2D.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Répartition des GCP, pas seulement leur nombre",
    text: "Comme pour tout géoréférencement (module Fondements), des GCP nombreux mais regroupés dans un coin du chantier laissent le reste du modèle mal contraint, en particulier en altitude (l'axe le plus sensible à une mauvaise répartition des GCP). Une répartition régulière sur toute l'emprise du vol, GCP en périphérie compris, est indispensable à une précision homogène.",
  },

  { type: "heading", text: "6. Planifier un vol de drone : altitude, résolution au sol, recouvrement", level: "superieur" },
  {
    type: "paragraph",
    text: "La résolution au sol d'une image de drone (GSD, Ground Sampling Distance : la taille réelle représentée par un pixel) dépend directement de l'altitude de vol et des caractéristiques du capteur — plus le drone vole haut, plus le GSD est grossier, mais plus la surface couverte par vol est grande pour un même nombre de photos.",
  },
  {
    type: "formula",
    label: "Résolution au sol (GSD), forme simplifiée",
    formula: "GSD ≈ (altitude de vol × taille du capteur) / (distance focale × nombre de pixels du capteur)",
    note: "En pratique, la plupart des logiciels de planification de vol (Pix4D, DJI Pilot, etc.) calculent directement le GSD à partir de l'altitude choisie et du modèle de capteur du drone — la formule reste utile pour comprendre pourquoi doubler l'altitude double approximativement le GSD (résolution deux fois plus grossière), un compromis direct entre précision et surface couverte par vol.",
  },

  { type: "heading", text: "7. RTK/PPK : la correction GPS embarquée", level: "superieur" },
  {
    type: "paragraph",
    text: "Un GPS grand public seul positionne un drone à quelques mètres près — largement insuffisant sans GCP au sol. Les drones professionnels embarquent de plus en plus un GPS RTK (Real-Time Kinematic, corrigé en temps réel par une station de référence proche) ou PPK (Post-Processed Kinematic, corrigé après coup à partir des mêmes données), ramenant la précision de position de chaque photo à quelques centimètres.",
  },
  {
    type: "callout",
    tone: "info",
    title: "RTK/PPK réduit le besoin en GCP, sans l'éliminer totalement",
    text: "Un vol RTK/PPK bien calibré peut réduire fortement le nombre de GCP nécessaires (parfois à quelques points de vérification plutôt qu'un maillage dense), mais ne dispense pas totalement d'un contrôle terrain indépendant : la précision RTK/PPK dépend elle-même de la qualité de sa propre station de référence et de la durée de calibration, deux points à vérifier avant de faire totalement confiance au résultat sans aucune vérification externe.",
  },
  { type: "game" },

  { type: "heading", text: "8. Nuage de points et maillage (mesh)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La sortie brute de la SfM est un nuage de points épars (les points caractéristiques mis en correspondance), densifié ensuite par un algorithme de correspondance dense (Multi-View Stereo, MVS) en un nuage de plusieurs millions à milliards de points. Ce nuage peut ensuite être transformé en un maillage 3D continu (triangulation entre points voisins) pour produire un modèle solide texturé, utile pour la visualisation ou l'impression 3D, au-delà du seul usage cartographique du nuage de points ou du MNS qui en dérive.",
  },

  { type: "heading", text: "9. Photogrammétrie vs LiDAR : forces et limites respectives", level: "approfondissement" },
  {
    type: "comparison",
    items: [
      { label: "Photogrammétrie (SfM)", points: ["Capteur passif (caméra), peu coûteux", "Texture couleur native (orthophoto)", "Ne voit pas sous un couvert végétal dense", "Précision dépendante de la texture visuelle de la scène"] },
      { label: "LiDAR", points: ["Capteur actif (laser), plus coûteux", "Pénètre partiellement la canopée (retours multiples)", "Pas de texture couleur native (nuage de points en intensité/altitude)", "Précision plus stable, indépendante de la texture visuelle"] },
    ],
  },
  {
    type: "link",
    to: "/module/lidar",
    label: "Voir en détail : le LiDAR",
    description: "La salle suivante détaille le principe actif du LiDAR et son signal en retours multiples, évoqué ici en comparaison.",
  },

  { type: "heading", text: "10. Erreurs fréquentes en photogrammétrie de drone", level: "superieur" },
  {
    type: "list",
    items: [
      "Recouvrement insuffisant planifié pour gagner du temps de vol — se révèle sous forme de trous, souvent trop tard pour corriger sans revoler",
      "GCP mal répartis (regroupés plutôt qu'étalés sur toute l'emprise), en particulier en altitude",
      "Confondre MNS et MNT et calculer une hauteur de bâtiment ou un volume directement sur le MNS sans en soustraire le MNT",
      "Voler par vent fort ou lumière changeante (nuages qui passent), qui dégrade la cohérence photométrique entre photos et complique la mise en correspondance SfM",
      "Ignorer les zones homogènes sans texture (eau calme, surface bétonnée uniforme) : la SfM n'y trouve aucun point caractéristique fiable à mettre en correspondance, laissant des trous dans le modèle indépendamment du recouvrement",
    ],
  },
]
