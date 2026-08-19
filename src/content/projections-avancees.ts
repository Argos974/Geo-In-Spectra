import type { ContentBlock } from "./types"

export const projectionsAvanceesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Le module Fondements pose l'essentiel : une projection transforme la surface courbe de la Terre en un plan, et cette transformation déforme nécessairement quelque chose (angle, surface ou distance). Cette salle va plus loin : comment ces déformations sont réparties selon la famille de projection choisie, comment Lambert-93 et l'UTM sont réellement construits, et comment choisir une projection selon l'usage réel plutôt que par habitude.",
  },
  {
    type: "link",
    to: "/module/fondamentaux",
    label: "Avant de commencer : systèmes de coordonnées et EPSG",
    description: "Si la distinction entre système géographique (degrés) et système projeté (mètres) n'est pas encore claire, elle est posée dans le module Fondements.",
  },

  { type: "heading", text: "1. Pourquoi aucune projection n'est parfaite", level: "lycee" },
  {
    type: "paragraph",
    text: "Une sphère ou un ellipsoïde ne peut pas être mis à plat sans déchirure ni déformation : c'est un fait géométrique, pas une limite technique qu'un meilleur algorithme résoudrait un jour. Aplatir une pelure d'orange en un seul morceau, sans la déchirer ni l'étirer, est impossible pour la même raison mathématique (le théorème « Theorema Egregium » de Gauss, 1827, prouve qu'une surface courbe n'a pas la même courbure qu'un plan). Toute projection choisit donc quelle déformation elle accepte, et où elle la place sur la carte.",
  },
  {
    type: "callout",
    tone: "info",
    title: "L'indicatrice de Tissot : visualiser la déformation",
    text: "Nicolas Tissot (1881) propose de tracer, en plusieurs points du globe, un petit cercle identique avant projection : après projection, ce cercle devient une ellipse dont la forme et la taille révèlent exactement la déformation locale (angle, surface, ou les deux) en ce point précis de la carte. C'est l'outil standard pour comparer visuellement des projections entre elles.",
  },

  { type: "heading", text: "2. Les trois familles de déformation", level: "lycee" },
  {
    type: "paragraph",
    text: "Toute projection appartient à l'une de ces trois familles, selon ce qu'elle choisit de préserver localement — jamais les trois à la fois, c'est mathématiquement impossible dès qu'une zone dépasse un point isolé :",
  },
  {
    type: "table",
    headers: ["Famille", "Ce qui est préservé", "Ce qui est déformé", "Exemple"],
    rows: [
      ["Conforme", "Les angles locaux (formes préservées à petite échelle)", "Les surfaces, fortement aux hautes latitudes", "Lambert-93, Mercator, UTM"],
      ["Équivalente", "Les surfaces (aires exactement conservées)", "Les angles et les formes", "Albers, Mollweide"],
      ["Aphylactique", "Ni les angles ni les surfaces exactement — un compromis", "Un peu des deux, réparti", "Projection de Winkel, Robinson (cartes murales du monde)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une carte du monde en Mercator exagère les hautes latitudes",
    text: "Mercator est conforme : les angles (donc les formes locales) sont préservés, ce qui en fait l'outil historique de la navigation (un cap compas y est une ligne droite). Le prix : les surfaces sont de plus en plus exagérées en s'éloignant de l'équateur. Le Groenland y paraît de la taille de l'Afrique, alors qu'il fait réellement environ 14 fois moins de superficie. Ce n'est pas une erreur de la projection, c'est exactement ce qu'elle a choisi de préserver, au détriment des surfaces.",
  },

  { type: "heading", text: "3. La projection conique conforme de Lambert (Lambert-93)", level: "superieur" },
  {
    type: "paragraph",
    text: "Lambert-93 (EPSG:2154), référence officielle française depuis 2006, est une projection conique conforme sécante : on imagine un cône posé sur l'ellipsoïde terrestre, qui coupe sa surface le long de deux parallèles dits « parallèles standards » (44° N et 49° N pour la France métropolitaine). Le long de ces deux lignes, il n'y a strictement aucune déformation d'échelle ; entre elles et au-delà, la déformation croît progressivement mais reste minime sur toute l'étendue du territoire français, ce qui justifie ce choix plutôt qu'une projection cylindrique pour une carte nationale à cette latitude.",
  },
  {
    type: "formula",
    label: "Paramètres de Lambert-93",
    formula: "Parallèles standards : 44° N et 49° N — Méridien central : 3° E — Origine : 46,5° N, 3° E — Fausse origine : X₀ = 700 000 m, Y₀ = 6 600 000 m",
    note: "La fausse origine (false easting/northing) décale l'origine du repère pour que toutes les coordonnées du territoire soient positives — sans ça, une partie du pays aurait des X ou Y négatifs, source classique d'erreurs de signe dans un calcul.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi 44° et 49°, précisément",
    text: "Les deux parallèles standards sont choisis pour encadrer symétriquement l'étendue en latitude du territoire couvert (la France métropolitaine s'étend d'environ 41° à 51° N), ce qui répartit la déformation résiduelle le plus uniformément possible sur l'ensemble du pays plutôt que de la concentrer sur un seul bord. Un pays plus étroit en latitude (la Belgique, par exemple) choisirait des parallèles standards plus rapprochés.",
  },

  { type: "heading", text: "4. Le système UTM (Universal Transverse Mercator)", level: "superieur" },
  {
    type: "paragraph",
    text: "L'UTM découpe le globe en 60 fuseaux (zones) de 6° de longitude chacun, chaque fuseau étant projeté séparément par une Mercator transverse (le cylindre de projection est couché sur le côté, tangent à un méridien central plutôt qu'à l'équateur). Contrairement à Lambert-93 qui couvre tout un pays d'un seul tenant, l'UTM est pensé pour un usage global : n'importe quel point du globe appartient à une zone UTM précise, identifiée par un numéro (1 à 60) et un hémisphère (Nord/Sud).",
  },
  {
    type: "table",
    headers: ["Paramètre", "Valeur"],
    rows: [
      ["Largeur d'un fuseau", "6° de longitude"],
      ["Facteur d'échelle au méridien central", "0,9996 (légèrement inférieur à 1, pour répartir la déformation entre le centre et les bords du fuseau plutôt que de la concentrer sur les bords)"],
      ["Fausse origine (easting)", "500 000 m au méridien central"],
      ["Fausse origine (northing)", "0 m à l'équateur (hémisphère nord), 10 000 000 m à l'équateur (hémisphère sud)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un projet qui chevauche deux fuseaux UTM",
    text: "Une zone d'étude à cheval sur deux fuseaux UTM (par exemple près de 6° E ou 12° E) pose un vrai problème pratique : les coordonnées ne sont continues qu'à l'intérieur d'un même fuseau, un calcul de distance entre deux points de fuseaux différents sans reprojection commune donne un résultat faux. C'est un avantage supplémentaire de Lambert-93 pour un usage strictement national : la France entière tient dans un seul système cohérent, sans découpage arbitraire.",
  },

  { type: "heading", text: "5. Choisir sa projection selon l'usage réel", level: "superieur" },
  {
    type: "paragraph",
    text: "La question n'est jamais « quelle est la meilleure projection » dans l'absolu, mais « quelle déformation puis-je me permettre pour cet usage précis ». Un même jeu de données peut légitimement être projeté différemment selon la question posée.",
  },
  {
    type: "table",
    headers: ["Usage", "Projection recommandée", "Pourquoi"],
    rows: [
      ["Carte topographique nationale française, calcul de surface/distance en France", "Lambert-93 (EPSG:2154)", "Conforme et quasi sans déformation sur tout le territoire national, référence officielle IGN"],
      ["Carte web mondiale, tuiles (Leaflet, Google Maps, OSM)", "Web Mercator (EPSG:3857)", "Carreaux carrés à toute échelle, navigation fluide — au prix d'une forte déformation de surface aux hautes latitudes, acceptable pour un usage de navigation/repérage, pas pour un calcul de surface"],
      ["Comparer des surfaces à l'échelle mondiale ou continentale (déforestation, occupation du sol)", "Une projection équivalente (ex. Albers, Mollweide) adaptée à la zone d'étude", "Seule une projection équivalente garantit qu'un même nombre de km² à l'écran représente la même surface réelle partout sur la carte"],
      ["Navigation maritime ou aérienne, tracé de cap", "Mercator (conforme) ou projections spécifiques à l'aviation (Lambert conforme conique)", "La préservation des angles locaux rend un cap compas exploitable directement sur la carte"],
      ["Zone d'étude locale hors de France, sans système national dédié", "UTM (zone correspondant à la longitude du site)", "Déformation minime sur l'étendue d'un seul fuseau (6°), standard international bien supporté par tous les logiciels SIG"],
    ],
  },
  {
    type: "link",
    to: "/module/cartographie-web",
    label: "Aller plus loin : la projection Web Mercator en détail",
    description: "Le module Cartographie web explique pourquoi presque tous les fonds de carte en ligne utilisent EPSG:3857, malgré sa déformation de surface.",
  },

  { type: "heading", text: "6. Datum et transformation : ne pas confondre projection et système géodésique", level: "superieur" },
  {
    type: "paragraph",
    text: "Un système de coordonnées complet combine deux choses distinctes, souvent confondues : un datum géodésique (le modèle de référence de la forme de la Terre — un ellipsoïde et son point d'ancrage) et une projection cartographique (la transformation mathématique vers un plan). Deux jeux de données dans des projections différentes mais surtout dans des datums différents ne se superposent jamais correctement sans une transformation explicite entre les deux datums, une étape distincte d'un simple changement de projection.",
  },
  {
    type: "table",
    headers: ["Datum", "Ellipsoïde de référence", "Usage"],
    rows: [
      ["WGS84", "WGS84 (mondial)", "Standard mondial, GPS, la plupart des données satellite et web (Sentinel, OSM)"],
      ["RGF93", "IAG-GRS80 (quasi identique à WGS84, écart négligeable pour la plupart des usages)", "Référence officielle française actuelle, sous-jacente à Lambert-93"],
      ["NTF (legacy)", "Clarke 1880", "Ancien système français, encore présent dans d'anciennes données non reprojetées — un écart de plusieurs centaines de mètres avec RGF93 si confondu par erreur"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un décalage constant de plusieurs centaines de mètres, jamais aléatoire",
    text: "Superposer une couche encore en NTF avec une couche en RGF93/WGS84 sans transformation de datum produit un décalage systématique, dans la même direction et de la même ampleur partout sur la carte — un symptôme caractéristique qui distingue cette erreur d'un simple problème de projection (qui, lui, déforme de façon variable selon la position). L'IGN fournit les grilles de transformation officielles (ex. NTF vers RGF93) que tout logiciel SIG sérieux applique automatiquement une fois le datum source correctement déclaré.",
  },

  { type: "heading", text: "7. Web Mercator (EPSG:3857) : pratique mais déformée", level: "approfondissement" },
  {
    type: "paragraph",
    text: "EPSG:3857 (aussi appelée Pseudo-Mercator ou Google Web Mercator) est une variante simplifiée de Mercator, quasi universelle sur les cartes interactives en ligne : elle traite la Terre comme une sphère (calcul plus rapide qu'un ellipsoïde) et découpe le monde en tuiles carrées qui s'emboîtent parfaitement à tout niveau de zoom, un besoin technique propre au web que Lambert-93 ou l'UTM (pensés pour des zones limitées) ne remplissent pas nativement à l'échelle mondiale.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais mesurer une surface directement en EPSG:3857",
    text: "La déformation de surface en Web Mercator croît fortement avec la latitude (elle diverge même mathématiquement aux pôles, EPSG:3857 est d'ailleurs indéfinie exactement à 90°). Une mesure de surface faite directement sur des données en EPSG:3857, sans reprojection préalable vers un système équivalent ou local adapté, donne un résultat faux — d'autant plus faux que la zone étudiée est éloignée de l'équateur. C'est une erreur fréquente chez qui affiche des données sur un fond Leaflet/OSM (nativement en EPSG:3857) puis calcule une surface sans reprojeter d'abord.",
  },

  { type: "heading", text: "8. Mesurer une distance ou une surface correctement", level: "superieur" },
  {
    type: "list",
    ordered: true,
    items: [
      "Vérifier le système de coordonnées déclaré de chaque couche avant tout calcul — jamais supposer qu'il est correct sans le lire explicitement dans les métadonnées",
      "Reprojeter en système projeté métrique adapté à la zone d'étude (Lambert-93 en France, UTM ailleurs) avant tout calcul de distance ou de surface",
      "Ne jamais calculer une distance ou une surface directement sur des coordonnées en degrés (WGS84 géographique) : un degré ne représente pas la même distance au sol selon la latitude",
      "Pour une étude à l'échelle mondiale ou multi-continentale, où aucun système projeté local n'est adapté à toute la zone, une distance géodésique (calculée directement sur l'ellipsoïde, formule de Vincenty ou Haversine) est plus rigoureuse qu'une projection unique forcément déformée quelque part",
    ],
  },
  { type: "game" },

  { type: "heading", text: "9. Cas particuliers : hautes latitudes et projections polaires", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Ni Lambert-93 ni l'UTM ne conviennent près des pôles : une projection conique ou cylindrique y déforme excessivement, voire devient mathématiquement indéfinie exactement au pôle. Les études polaires (calotte arctique, Antarctique) utilisent des projections azimutales dédiées, en particulier la projection stéréographique polaire (conforme, tangente ou sécante au pôle) et le système UPS (Universal Polar Stereographic, le complément polaire de l'UTM au-delà de 84° N et 80° S, où l'UTM cesse d'être défini).",
  },
  {
    type: "callout",
    tone: "info",
    title: "Le repère general : aucune projection universelle",
    text: "Il n'existe aucune projection unique adaptée à tous les usages et toutes les zones du globe : Lambert-93 pour la France, UTM pour une zone locale ailleurs, une projection équivalente pour comparer des surfaces à grande échelle, une projection polaire pour les hautes latitudes. Le bon réflexe méthodologique n'est pas de mémoriser une seule projection « par défaut », mais de toujours se demander : quelle déformation ce projet peut-il tolérer, et où.",
  },

  { type: "heading", text: "10. Erreurs fréquentes et vérifications pratiques", level: "superieur" },
  {
    type: "list",
    items: [
      "Mélanger des couches dans des systèmes de coordonnées différents sans les reprojeter d'abord dans un référentiel commun — la plupart des logiciels SIG modernes reprojettent à la volée pour l'affichage, ce qui masque le problème visuellement tout en laissant les calculs faux si l'export ou l'analyse ne reprojette pas réellement les données",
      "Confondre datum et projection : reprojeter sans transformer le datum sous-jacent laisse un décalage résiduel de plusieurs centaines de mètres, invisible à l'œil sur une carte à petite échelle mais critique pour un géoréférencement précis",
      "Calculer une surface ou une distance sur des coordonnées géographiques (degrés) au lieu d'un système projeté métrique adapté",
      "Utiliser Web Mercator pour un calcul de surface plutôt que seulement pour l'affichage d'un fond de carte",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Vérification rapide avant tout calcul",
    text: "Avant de lancer un calcul de surface ou de distance dans un logiciel SIG : vérifier le système de coordonnées du projet (pas seulement de chaque couche individuellement), s'assurer qu'il s'agit bien d'un système projeté métrique et non géographique, et confirmer que toutes les couches partagent le même datum. Ces trois vérifications, prises ensemble, évitent la grande majorité des erreurs de mesure spatiale en pratique.",
  },
]
