import type { ContentBlock } from "./types"

export const cartographieWebContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Une carte imprimée est figée : une échelle, une projection, un instant. Une carte web se déplace, zoome, se met à jour en direct — sans jamais recharger l'intégralité de la Terre à chaque interaction. Cette salle explique comment, techniquement : la pyramide de tuiles qui rend le zoom possible, les bibliothèques qui l'affichent dans un navigateur, et les standards qui échangent la donnée entre serveur et client. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },
  {
    type: "link",
    to: "/module/projections-avancees",
    label: "Avant de commencer : Web Mercator (EPSG:3857)",
    description: "La quasi-totalité des cartes web repose sur cette projection précise — le module Projections avancées explique pourquoi et ses limites.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. De la carte statique à la carte interactive", level: "lycee" },
  {
    type: "paragraph",
    text: "Une carte web moderne n'est presque jamais une seule grande image : afficher le monde entier à pleine résolution à chaque interaction serait beaucoup trop volumineux à transférer. La solution technique universelle, utilisée aussi bien par OpenStreetMap que par Google Maps, est de découper la carte en petites images carrées, les tuiles, et de n'envoyer au navigateur que celles réellement visibles à l'écran, au niveau de zoom demandé.",
  },

  { type: "heading", text: "2. La pyramide de tuiles (tile pyramid)", level: "lycee" },
  {
    type: "paragraph",
    text: "Chaque niveau de zoom (z) découpe le monde entier en une grille carrée de 2^z × 2^z tuiles, presque toujours de 256×256 pixels chacune. Au zoom 0, une seule tuile représente le monde entier ; au zoom 1, quatre tuiles ; au zoom 18 (une rue), plus de 68 milliards de tuiles couvrent le globe, mais seule une poignée est chargée à un instant donné.",
  },
  {
    type: "formula",
    label: "Nombre de tuiles à un niveau de zoom z",
    formula: "N = 4^z = (2^z)²",
    note: "z=0 → 1 tuile (le monde). z=10 → environ 1 million de tuiles. z=18 → environ 68,7 milliards de tuiles, dont seules quelques dizaines sont chargées pour une vue d'écran donnée.",
  },
  {
    type: "diagram",
    name: "tile-pyramid",
    caption: "Au zoom 0, une seule tuile couvre le monde entier ; chaque niveau supplémentaire multiplie leur nombre par quatre.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Identifier une tuile",
    text: "L'URL https://tile.openstreetmap.org/14/8281/5928.png demande la tuile au zoom 14 (z), colonne 8281 (x, comptée depuis l'ouest) et ligne 5928 (y, comptée depuis le nord). Un client de cartographie web calcule automatiquement quelles tuiles z/x/y couvrent la zone visible avant de les demander une à une au serveur.",
  },
  {
    type: "live",
    name: "tile-pyramid-explorer",
    caption: "Choisis un point et un niveau de zoom : la planche calcule en direct ses indices z/x/y, le nombre total de tuiles à ce niveau, et la résolution au sol correspondante.",
  },

  { type: "heading", text: "3. Tuiles raster vs tuiles vectorielles", level: "lycee" },
  {
    type: "paragraph",
    text: "Les tuiles historiques (OpenStreetMap classique, fonds de carte Google Maps) sont des images raster déjà dessinées côté serveur : rapides à afficher, mais figées dans leur style. Les tuiles vectorielles, plus récentes, transmettent la géométrie brute (routes, bâtiments, polygones), et laissent le navigateur dessiner et styliser la carte lui-même, en temps réel.",
  },
  {
    type: "comparison",
    items: [
      { label: "Tuiles raster", points: ["Images déjà dessinées (PNG/JPEG)", "Style figé côté serveur", "Rendu simple, léger pour le client"] },
      { label: "Tuiles vectorielles", points: ["Géométrie brute, transmise au client", "Style modifiable en direct côté client", "Rotation/inclinaison 3D possibles"] },
    ],
  },

  { type: "heading", text: "4. Comment un site affiche sa carte : une bibliothèque JavaScript", level: "lycee" },
  {
    type: "paragraph",
    text: "Un développeur qui veut afficher une carte interactive sur son site ne réécrit jamais lui-même la gestion du zoom, du déplacement à la souris ou du chargement des tuiles : il utilise une bibliothèque JavaScript déjà prête, qui s'occupe de tout ça, et ne lui laisse plus qu'à indiquer quel fond de carte afficher et quelles données ajouter par-dessus.",
  },
  {
    type: "table",
    headers: ["Bibliothèque", "Ce qui la distingue", "Exemple de site qui l'utilise"],
    rows: [
      ["Leaflet", "La plus simple à apprendre, quelques lignes de code suffisent pour une première carte", "De très nombreux sites associatifs et institutionnels"],
      ["MapLibre GL", "Affiche des tuiles vectorielles, peut incliner et faire tourner la carte en 3D", "Applications cartographiques plus récentes, cartes très animées"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Une carte que tu utilises tous les jours en cache probablement une",
    text: "Une application de covoiturage, un site immobilier qui affiche les biens sur une carte, un site de randonnée : presque tous s'appuient sur une bibliothèque comme Leaflet ou MapLibre GL plutôt que de programmer leur propre moteur de carte depuis zéro. Repérer laquelle est utilisée est possible en ouvrant les outils de développement du navigateur (F12), onglet réseau : le nom de la bibliothèque apparaît généralement dans les fichiers chargés par la page.",
  },

  { type: "heading", text: "5. D'où vient la donnée affichée, et pourquoi il faut toujours citer sa source", level: "lycee" },
  {
    type: "paragraph",
    text: "Le fond de carte affiché (les rues, les bâtiments, les frontières) ne sort pas de nulle part : il vient presque toujours d'un jeu de données ouvert, le plus connu étant OpenStreetMap (OSM), une carte du monde construite et mise à jour en continu par des milliers de contributeurs bénévoles, un peu comme Wikipédia mais pour la géographie.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "L'attribution n'est pas une option de politesse",
    text: "La licence d'OpenStreetMap (ODbL) exige explicitement de mentionner sa source sur toute carte qui l'utilise (généralement un petit texte « © OpenStreetMap contributors » discret dans un coin de la carte) : ce n'est pas une simple courtoisie, c'est une condition légale d'utilisation des données, au même titre que citer un auteur pour un texte.",
  },
  { type: "heading", text: "6. Pourquoi une carte avec beaucoup de données reste fluide", level: "lycee" },
  {
    type: "paragraph",
    text: "Afficher des dizaines de milliers de routes ou de points d'intérêt d'un coup ferait ramer n'importe quel navigateur. Deux astuces simples permettent d'éviter ça : simplifier une géométrie complexe (garder moins de détails à un zoom éloigné, où ils ne seraient de toute façon pas visibles), et regrouper les points trop proches en un seul symbole numéroté tant que le zoom ne permet pas de les distinguer un par un.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Une tuile déjà servie n'est pas redessinée",
    text: "Une tuile de fond de carte change rarement une fois publiée : le navigateur, et souvent un serveur intermédiaire, la garde en mémoire (cache) plutôt que de la redemander à chaque fois. C'est cette mise en cache, bien plus qu'une connexion internet rapide, qui explique pourquoi zoomer et dézoomer sur une carte déjà visitée semble quasi instantané.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : une carte web découpe le monde en tuiles carrées (2^z × 2^z au zoom z) pour n'envoyer que ce qui est visible ; une tuile raster est une image déjà dessinée, une tuile vectorielle transmet la géométrie et laisse le navigateur la dessiner ; une bibliothèque comme Leaflet ou MapLibre GL gère le zoom/déplacement/chargement des tuiles pour qu'un site n'ait pas à le reprogrammer ; la donnée affichée (souvent OpenStreetMap) doit toujours être créditée, une obligation de licence, pas une option ; simplifier les géométries et regrouper les points denses garde une carte fluide, une tuile déjà servie est mise en cache plutôt que redessinée.",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Voir aussi : les analyses spatiales côté serveur/SIG",
    description: "Le module Le Compas couvre les opérations spatiales qui précèdent souvent la publication d'une donnée sur une carte web.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. La pyramide de tuiles, formalisée", level: "superieur" },
  {
    type: "paragraph",
    text: "Une carte web moderne n'est presque jamais une seule grande image : afficher le monde entier à pleine résolution à chaque interaction serait beaucoup trop volumineux à transférer. La solution technique universelle est de découper la carte en petites images carrées, les tuiles, et de n'envoyer au navigateur que celles réellement visibles à l'écran, au niveau de zoom demandé. Chaque niveau de zoom (z) découpe le monde entier en une grille carrée de 2^z × 2^z tuiles, presque toujours de 256×256 pixels chacune. Chaque tuile est identifiée par trois nombres (z/x/y), le schéma XYZ, quasi universel.",
  },
  {
    type: "diagram",
    name: "tile-pyramid",
    caption: "Au zoom 0, une seule tuile couvre le monde entier ; chaque niveau supplémentaire multiplie leur nombre par quatre.",
  },
  {
    type: "formula",
    label: "Convertir une position géographique en indices de tuile (z/x/y)",
    formula: "x = ⌊(lon + 180) / 360 × 2^z⌋      y = ⌊(1 − ln(tan(lat) + sec(lat)) / π) / 2 × 2^z⌋",
    note: "lon/lat en degrés (lat convertie en radians pour le calcul du logarithme), z le niveau de zoom demandé. Cette formule, dite « slippy map », dérive directement de la projection Web Mercator : c'est elle que toute bibliothèque de cartographie web recalcule en silence à chaque déplacement de la carte, pour savoir précisément quelles tuiles demander au serveur.",
  },
  { type: "live", name: "tile-pyramid-explorer", caption: "La formule ci-dessus appliquée à un point choisi : indices z/x/y, nombre total de tuiles et résolution au sol, recalculés en direct." },
  {
    type: "callout",
    tone: "rappel",
    title: "Rappel : Web Mercator, une projection conforme (module Projections avancées)",
    text: "Le module Projections avancées classe Web Mercator (EPSG:3857) parmi les projections conformes : elle préserve les angles et déforme fortement les surfaces aux hautes latitudes. C'est cette propriété qui permet des tuiles carrées identiques à tout niveau de zoom — au prix de ne jamais l'utiliser pour un calcul de surface.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "XYZ et TMS ne comptent pas les lignes dans le même sens",
    text: "Le schéma XYZ quasi universel (OpenStreetMap, Google, la plupart des bibliothèques web) compte y depuis le nord : y=0 tout en haut de la pyramide. Le schéma TMS (Tile Map Service), plus ancien, compte y depuis le sud. Connecter un fond de tuiles TMS à un client qui attend du XYZ sans inverser explicitement l'indice y affiche une carte retournée par bandes horizontales — une source d'erreur classique lors de la connexion à un ancien serveur de tuiles.",
  },

  { type: "heading", text: "2. Tuiles raster vs tuiles vectorielles", level: "superieur" },
  {
    type: "paragraph",
    text: "Les tuiles historiques (OpenStreetMap classique, fonds de carte Google Maps) sont des images raster déjà dessinées côté serveur : rapides à afficher, mais figées dans leur style, lourdes à transférer et impossibles à recolorer sans redemander une nouvelle image. Les tuiles vectorielles, plus récentes, transmettent la géométrie brute (routes, bâtiments, polygones) dans un format compact, et laissent le navigateur dessiner et styliser la carte lui-même, en temps réel.",
  },
  {
    type: "comparison",
    items: [
      { label: "Tuiles raster", points: ["Images déjà dessinées (PNG/JPEG)", "Style figé côté serveur", "Rendu simple, léger pour le client", "Format historique (OSM classique, WMTS)"] },
      { label: "Tuiles vectorielles", points: ["Géométrie brute (format .pbf, Mapbox Vector Tiles)", "Style modifiable en direct côté client", "Rendu plus coûteux (nécessite WebGL pour rester fluide)", "Rotation/inclinaison 3D possibles"] },
    ],
  },

  { type: "heading", text: "3. Le format vectoriel tuilé : Mapbox Vector Tiles (MVT)", level: "superieur" },
  {
    type: "paragraph",
    text: "Les tuiles vectorielles échangées entre serveur et navigateur suivent presque toutes le même format de fait, les Mapbox Vector Tiles (MVT), devenu un standard de facto de l'industrie bien au-delà de son éditeur d'origine. Une tuile MVT n'est pas un fichier texte lisible comme un GeoJSON : c'est un binaire compact encodé en Protocol Buffers (protobuf), pensé pour minimiser le volume transféré à chaque déplacement de la carte.",
  },
  {
    type: "list",
    items: [
      "Un fichier .mvt/.pbf par tuile z/x/y, encodé en protobuf : bien plus léger qu'un GeoJSON équivalent, au prix d'un format non lisible tel quel",
      "Plusieurs « layers » thématiques nommés à l'intérieur d'une même tuile (ex. water, building, road, poi), que le style choisit d'afficher, de masquer ou de restyliser indépendamment les uns des autres",
      "Coordonnées quantifiées sur une grille locale à la tuile (typiquement 4096 unités par côté), pas en degrés ni en mètres : une géométrie MVT n'a de sens qu'une fois replacée dans sa tuile d'origine",
      "Géométries pré-généralisées dès la génération de la tuile : une tuile de faible zoom contient déjà une version simplifiée des contours, pas la précision complète recalculée à la volée par le navigateur",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "La donnée et le style, deux fichiers séparés",
    text: "Un même jeu de tuiles vectorielles MVT peut être affiché avec des styles radicalement différents (fond clair, fond sombre, thématique administrative) sans regénérer une seule tuile : seul change le document de style (JSON, suivant la Mapbox/MapLibre Style Spec) que le navigateur applique au moment du rendu. C'est structurellement impossible avec des tuiles raster, où le style est cuit dans l'image dès sa génération côté serveur.",
  },

  { type: "heading", text: "4. Les bibliothèques de cartographie web", level: "superieur" },
  {
    type: "paragraph",
    text: "Trois bibliothèques dominent la cartographie web actuelle, avec des technologies de rendu différentes :",
  },
  {
    type: "table",
    headers: ["Bibliothèque", "Rendu", "Points forts", "Type de tuiles"],
    rows: [
      ["Leaflet", "DOM/Canvas (léger)", "Très simple à prendre en main, immense écosystème de plugins, license libre (BSD-2)", "Raster principalement, vectoriel via plugin"],
      ["MapLibre GL (fork libre de Mapbox GL JS)", "WebGL (accéléré matériellement)", "Tuiles vectorielles natives, rotation/inclinaison 3D, animations fluides à grande échelle", "Vectoriel natif"],
      ["OpenLayers", "Canvas/WebGL selon la couche", "Le plus complet en projections et formats supportés (WMS, WFS, WMTS natifs), plus verbeux à utiliser", "Raster et vectoriel"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi Leaflet reste un premier choix pédagogique",
    text: "Sa simplicité d'API (quelques lignes suffisent pour une première carte fonctionnelle) et sa légèreté en font le point d'entrée le plus courant pour apprendre la cartographie web, avant, si le projet l'exige (très gros volumes de données vectorielles, rendu 3D), de migrer vers une bibliothèque accélérée par WebGL comme MapLibre GL.",
  },

  { type: "heading", text: "5. Les standards OGC du service cartographique", level: "superieur" },
  {
    type: "paragraph",
    text: "Avant même l'ère des tuiles, l'Open Geospatial Consortium (OGC) a normalisé la façon dont un serveur cartographique expose ses données sur le web — des standards encore massivement utilisés aujourd'hui, notamment dans l'administration publique et la recherche.",
  },
  {
    type: "table",
    headers: ["Standard", "Ce qu'il fournit", "Usage typique"],
    rows: [
      ["WMS (Web Map Service)", "Une image déjà dessinée du serveur, à la demande (bbox, style)", "Fonds de carte thématiques (occupation du sol, risques), affichage seulement"],
      ["WMTS (Web Map Tile Service)", "Les mêmes images, mais pré-découpées en tuiles fixes, mises en cache", "Fonds de carte à fort trafic, plus performant que WMS pour un usage répété"],
      ["WFS (Web Feature Service)", "La géométrie et les attributs bruts (features vecteur), pas une image", "Récupérer les données elles-mêmes pour analyse, pas seulement les afficher"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Trois requêtes, trois sémantiques différentes",
    text: "WMS GetMap — .../wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=occupation_sol&BBOX=...&WIDTH=800&HEIGHT=600&CRS=EPSG:3857&FORMAT=image/png : redessine une image pour une emprise arbitraire, propre à cet appel. WMTS GetTile — .../wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=occupation_sol&TILEMATRIX=14&TILEROW=5928&TILECOL=8281&FORMAT=image/png : renvoie une tuile pré-calculée à un z/x/y fixe, jamais redessinée à la demande. WFS GetFeature — .../wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=parcelles&BBOX=...&OUTPUTFORMAT=application/json : renvoie la géométrie et les attributs bruts, pas une image du tout.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une confusion fréquente : croire que WMS fonctionne « par tuiles »",
    text: "Certains clients (le mode WMS-C de QGIS, le plugin Leaflet.WMS) simulent un comportement tuilé en alignant leurs requêtes GetMap sur une grille fixe, pour profiter d'un cache HTTP standard. C'est une convention ajoutée par le client, pas une propriété du protocole WMS lui-même : WMS, par construction, accepte n'importe quelle bbox arbitraire et la redessine à chaque appel côté serveur. Seul WMTS intègre la tuile fixe dans la sémantique même du protocole.",
  },

  { type: "heading", text: "6. GeoJSON et la donnée vecteur sur le web", level: "superieur" },
  {
    type: "paragraph",
    text: "Le GeoJSON (voir le module Fondements) est le format d'échange vecteur de référence du web géospatial : texte lisible, directement exploitable en JavaScript sans bibliothèque de parsing dédiée, nativement en WGS84 (EPSG:4326) par convention. Une bibliothèque comme Leaflet ou MapLibre GL le reprojette automatiquement vers Web Mercator au moment de l'affichage — le fichier source, lui, reste en coordonnées géographiques.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un GeoJSON volumineux ralentit le navigateur, pas seulement le réseau",
    text: "Charger un unique fichier GeoJSON de plusieurs dizaines de milliers de sommets d'un coup peut faire fonctionner un onglet de navigateur au ralenti, même une fois le fichier reçu : chaque sommet doit être reprojeté et dessiné. Au-delà d'un certain volume, découper la donnée en tuiles (vectorielles ou en GeoJSON pré-découpé par zone) redevient nécessaire, exactement pour la même raison qui a motivé les tuiles raster à l'origine : ne transmettre et ne dessiner que ce qui est réellement visible.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "GeoJSON (fichier unique)",
        points: [
          "Un seul fichier texte, toute la donnée transmise d'un coup",
          "Facile à générer, lire, déboguer, versionner (diff lisible dans un outil de gestion de version)",
          "Reprojection et rendu entièrement à la charge du navigateur",
          "Adapté à quelques centaines ou milliers d'entités, pas nettement au-delà",
        ],
      },
      {
        label: "Tuiles vectorielles (MVT)",
        points: [
          "Découpées par zone et par niveau de zoom, chargées à la demande",
          "Génération plus complexe : nécessite un pipeline de tuilage dédié (ex. Tippecanoe, l'outil libre de Mapbox)",
          "Passe à l'échelle jusqu'à des millions d'entités sans jamais tout charger d'un coup",
          "Format binaire peu lisible en l'état, plus difficile à déboguer ou versionner",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Un seuil pratique, pas une règle stricte",
    text: "Il n'existe pas de nombre magique de sommets au-delà duquel un GeoJSON devient interdit : cela dépend du matériel de l'utilisateur final, de la complexité du style appliqué et de la fréquence d'interaction attendue. En pratique, un projet qui commence en GeoJSON simple et dont le volume de données croît migre naturellement vers des tuiles vectorielles générées une fois pour toutes, plutôt que de continuer à alourdir un fichier unique.",
  },

  { type: "heading", text: "7. Sources de tuiles ouvertes et leurs licences", level: "superieur" },
  {
    type: "paragraph",
    text: "OpenStreetMap (licence ODbL, données librement réutilisables avec attribution) fournit la donnée source de la plupart des fonds de carte libres, mais la politique d'usage des tuiles pré-rendues officielles (tile.openstreetmap.org) est stricte : elle est prévue pour du développement/test à faible trafic, pas pour un site en production à fort trafic, qui doit s'appuyer sur un fournisseur dédié (auto-hébergement, ou un service comme MapTiler, Stadia Maps, Thunderforest) plutôt que solliciter l'infrastructure gratuite communautaire au-delà de ce qu'elle prévoit.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Une donnée vivante, pas figée",
    text: "OpenStreetMap est mise à jour en continu par des contributeurs, contrairement à une image satellite figée à sa date d'acquisition (voir le module Le Regard) : c'est cette réactivité, interrogeable directement via l'API Overpass, qu'exploite ailleurs sur ce site le bloc de données vivantes sur Vitrolles — une illustration concrète de donnée OSM récupérée en direct, même si son affichage n'y prend pas la forme d'une carte tuilée classique.",
  },

  { type: "heading", text: "8. Erreurs fréquentes en cartographie web", level: "superieur" },
  {
    type: "list",
    items: [
      "Confondre le système de coordonnées d'affichage (Web Mercator, EPSG:3857) et celui du fichier source (souvent EPSG:4326) — la bibliothèque de cartographie reprojette automatiquement à l'affichage, mais un calcul fait en amont sur le fichier source doit, lui, être fait dans un système adapté (voir module Projections avancées)",
      "Charger un fond de tuiles sans citer sa source (attribution obligatoire pour OpenStreetMap et la plupart des fournisseurs, une condition de licence, pas une simple courtoisie)",
      "Solliciter un serveur de tuiles gratuit communautaire à un volume de requêtes dépassant sa politique d'usage prévue, au risque d'un blocage de l'adresse IP du site",
      "Charger un GeoJSON complet et volumineux sans simplification ni découpage, provoquant un ralentissement visible du navigateur plutôt qu'un simple délai réseau",
      "Confondre les schémas XYZ et TMS (indexation y inversée) lors de la connexion à un ancien serveur de tuiles, ce qui produit une carte retournée par bandes horizontales",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : z/x/y identifie une tuile, dérivé directement de Web Mercator ; raster = image figée, vectoriel (MVT) = géométrie restylable côté client ; Leaflet pour débuter, MapLibre GL pour du gros volume/3D ; WMS = image à la demande, WMTS = image en tuiles fixes, WFS = données brutes ; GeoJSON simple jusqu'à quelques milliers d'entités, tuiles vectorielles au-delà ; l'attribution OSM est une obligation de licence, pas une option.",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Voir aussi : les analyses spatiales côté serveur/SIG",
    description: "Le module Le Compas couvre les opérations spatiales (intersection, buffer, autocorrélation) qui précèdent souvent la publication d'une donnée sur une carte web.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Générer un pipeline de tuiles vectorielles en production", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Produire des tuiles MVT (piste Licence/BUT) pour un jeu de données volumineux n'est jamais une simple exportation : c'est un pipeline dédié, qui doit décider, à chaque niveau de zoom, quelles géométries garder, lesquelles simplifier, et lesquelles fusionner, avant même de découper le résultat en tuiles z/x/y.",
  },
  {
    type: "table",
    headers: ["Outil", "Approche", "Contexte typique"],
    rows: [
      ["Tippecanoe (Mapbox)", "Génère un jeu complet de tuiles .mbtiles en un seul passage batch, à partir de GeoJSON en entrée", "Jeu de données statique, régénéré périodiquement (OSM extrait, cadastre)"],
      ["ST_AsMVT (PostGIS)", "Génère une tuile MVT à la demande, directement par une requête SQL sur la base", "Donnée qui change souvent, tuile toujours à jour sans re-génération complète"],
      ["Planetiler / tilemaker", "Pipeline optimisé pour tuiler l'intégralité d'OpenStreetMap en quelques heures plutôt qu'en jours", "Fond de carte mondial auto-hébergé, alternative aux fournisseurs commerciaux"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Simplifier trop tôt dans la chaîne casse la topologie",
    text: "Simplifier chaque géométrie indépendamment (Douglas-Peucker naïf, appliqué polygone par polygone) peut ouvrir des trous entre deux polygones normalement adjacents, une fois simplifiés séparément avec des tolérances légèrement différentes. Un pipeline de tuilage sérieux (Tippecanoe, avec son option de préservation topologique) simplifie en tenant compte des géométries voisines, pas une par une isolément.",
  },

  { type: "heading", text: "2. Performance à grande échelle : simplification, clustering, découpage", level: "approfondissement" },
  {
    type: "list",
    items: [
      "Simplification géométrique (algorithme de Douglas-Peucker) : réduire le nombre de sommets d'une ligne ou d'un polygone selon le niveau de zoom, invisible à l'œil mais très économe en volume",
      "Clustering de points : regrouper visuellement des milliers de marqueurs proches en un seul cercle numéroté tant que le zoom ne permet pas de les distinguer individuellement",
      "Découpage spatial de la donnée source (par zone, par tuile) : ne charger que la zone visible plutôt que l'intégralité d'un jeu de données, le même principe que la pyramide de tuiles appliqué à du vecteur brut plutôt qu'à des images",
      "Chargement progressif au déplacement de la carte (pan/zoom), plutôt que tout charger dès l'ouverture de la page",
    ],
  },
  { type: "game" },

  { type: "heading", text: "3. Mise en cache et diffusion : CDN et en-têtes HTTP", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une tuile change rarement une fois publiée : c'est cette stabilité que toute l'architecture de diffusion à grande échelle exploite, en évitant de redessiner ou même de retransmettre une tuile déjà servie une première fois.",
  },
  {
    type: "diagram",
    name: "tile-pyramid",
    caption: "Pré-générer (seeding) une pyramide entière coûte cher en stockage à mesure que le zoom augmente : chaque niveau contient quatre fois plus de tuiles que le précédent.",
  },
  {
    type: "list",
    items: [
      "En-tête HTTP Cache-Control avec une durée de validité longue (par exemple max-age fixé à plusieurs jours) : une tuile d'un fond de carte topographique change rarement, autant éviter de la redemander à chaque session utilisateur",
      "Un CDN (réseau de diffusion de contenu) répartit géographiquement des copies des tuiles les plus demandées au plus près de l'utilisateur final, réduisant la latence perçue indépendamment de la localisation du serveur d'origine",
      "Pré-génération (seeding) : calculer et stocker à l'avance toutes les tuiles d'une zone et d'une plage de zoom, plutôt que de les dessiner à la demande — un compromis espace disque contre temps de réponse",
      "Génération à la volée avec mise en cache (GeoWebCache, TileCache, Tegola) : ne dessiner une tuile qu'à sa première demande, puis la conserver pour les suivantes, un compromis entre les deux approches précédentes, adapté aux couches trop volumineuses pour un seeding complet",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Invalider un cache de tuiles n'est jamais gratuit",
    text: "Mettre à jour la donnée source (une nouvelle route, un bâtiment démoli) ne suffit pas à mettre à jour ce que voit l'utilisateur si les anciennes tuiles restent servies depuis un cache HTTP ou un CDN qui n'a aucune raison de les considérer périmées. Les stratégies courantes consistent soit à purger explicitement le cache après chaque mise à jour, soit à versionner l'URL des tuiles (un paramètre ou un chemin qui change avec chaque nouvelle génération), pour que l'ancienne et la nouvelle version cohabitent sans jamais se confondre.",
  },

  { type: "heading", text: "4. Cartographie web et accessibilité", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une carte interactive pose des défis d'accessibilité spécifiques : elle est par nature visuelle et dépend de la souris/du tactile pour se déplacer. Les bonnes pratiques incluent une navigation clavier alternative (zoomer/déplacer sans souris), un contraste suffisant pour les fonds de carte et les symboles, et systématiquement un résumé textuel ou tabulaire de la donnée essentielle affichée sur la carte, pour qu'un lecteur d'écran ne dépende pas uniquement du rendu graphique.",
  },
  {
    type: "list",
    items: [
      "Navigation clavier : tabulation pour atteindre les contrôles (zoom, boutons), flèches ou touches dédiées pour déplacer le centre de la carte sans souris ni tactile",
      "Attributs ARIA (rôle explicite, libellé descriptif) sur le conteneur de la carte, pour qu'un lecteur d'écran annonce la nature du composant plutôt que de le passer sous silence comme une simple image",
      "Contraste suffisant entre symboles/étiquettes et fond de carte, y compris sur un fond sombre ou une image satellite chargée visuellement",
      "Palettes adaptées au daltonisme pour toute carte choroplèthe ou tout dégradé de couleur, plutôt que le seul contraste rouge/vert — une forme de daltonisme concerne environ 8 % des hommes",
      "Un résumé textuel ou tabulaire de la donnée essentielle, indépendant du rendu graphique, pour qu'un lecteur d'écran ne dépende pas d'un canvas ou d'un contexte WebGL qu'il ne peut pas interroger",
    ],
  },
  {
    type: "table",
    headers: ["Type de palette", "Usage typique", "Recommandation daltonisme"],
    rows: [
      ["Séquentielle (une teinte, dégradé de clarté)", "Variable ordonnée du faible au fort (densité, indice continu)", "Sûre par nature : la clarté seule porte l'information, lisible même en vision monochrome"],
      ["Divergente (deux teintes autour d'un point médian)", "Variable avec un zéro ou un seuil significatif (écart à la moyenne, perte/gain)", "Préférer un couple comme bleu/orange, distinguable par les formes courantes de daltonisme, plutôt que rouge/vert"],
      ["Qualitative (catégories sans ordre)", "Occupation du sol, classes discrètes sans hiérarchie", "Limiter à une poignée de couleurs et vérifier avec un simulateur de daltonisme"],
    ],
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Une carte de risque affiche une palette divergente rouge/vert (faible risque en vert, fort risque en rouge). En t'appuyant sur cette section, explique pourquoi ce choix est problématique, et propose une alternative concrète qui garde le même sens de lecture (faible → fort) sans reposer sur cette paire de couleurs.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : un pipeline de tuilage (Tippecanoe, ST_AsMVT, Planetiler) simplifie en préservant la topologie, jamais géométrie par géométrie isolément ; Douglas-Peucker simplifie une géométrie selon le zoom, le clustering regroupe des points denses ; Cache-Control et CDN évitent de redessiner une tuile déjà servie, mais invalider un cache a un coût réel ; une carte accessible combine navigation clavier, ARIA, contraste, palettes daltonisme-sûres et un résumé textuel indépendant du rendu graphique.",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Voir aussi : les analyses spatiales côté serveur/SIG",
    description: "Le module Le Compas couvre les opérations spatiales (intersection, buffer, autocorrélation) qui précèdent souvent la publication d'une donnée sur une carte web.",
  },
]
