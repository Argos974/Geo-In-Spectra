import type { ContentBlock } from "./types"

export const cartographieWebContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Une carte imprimée est figée : une échelle, une projection, un instant. Une carte web se déplace, zoome, se met à jour en direct — sans jamais recharger l'intégralité de la Terre à chaque interaction. Cette salle explique comment, techniquement : la pyramide de tuiles qui rend le zoom possible, les bibliothèques qui l'affichent dans un navigateur, et les standards qui échangent la donnée entre serveur et client.",
  },
  {
    type: "link",
    to: "/module/projections-avancees",
    label: "Avant de commencer : Web Mercator (EPSG:3857)",
    description: "La quasi-totalité des cartes web repose sur cette projection précise — le module Projections avancées explique pourquoi et ses limites.",
  },

  { type: "heading", text: "1. De la carte statique à la carte interactive", level: "lycee" },
  {
    type: "paragraph",
    text: "Une carte web moderne n'est presque jamais une seule grande image : afficher le monde entier à pleine résolution à chaque interaction serait beaucoup trop volumineux à transférer. La solution technique universelle, utilisée aussi bien par OpenStreetMap que par Google Maps, est de découper la carte en petites images carrées, les tuiles, et de n'envoyer au navigateur que celles réellement visibles à l'écran, au niveau de zoom demandé.",
  },

  { type: "heading", text: "2. La pyramide de tuiles (tile pyramid)", level: "lycee" },
  {
    type: "paragraph",
    text: "Chaque niveau de zoom (z) découpe le monde entier en une grille carrée de 2^z × 2^z tuiles, presque toujours de 256×256 pixels chacune. Au zoom 0, une seule tuile représente le monde entier ; au zoom 1, quatre tuiles ; au zoom 18 (une rue), plus de 68 milliards de tuiles couvrent le globe, mais seule une poignée est chargée à un instant donné. Chaque tuile est identifiée par trois nombres (z/x/y), le schéma XYZ, quasi universel.",
  },
  {
    type: "formula",
    label: "Nombre de tuiles à un niveau de zoom z",
    formula: "N = 4^z = (2^z)²",
    note: "z=0 → 1 tuile (le monde). z=10 → environ 1 million de tuiles. z=18 → environ 68,7 milliards de tuiles, dont seules quelques dizaines sont chargées pour une vue d'écran donnée.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Identifier une tuile",
    text: "L'URL https://tile.openstreetmap.org/14/8281/5928.png demande la tuile au zoom 14 (z), colonne 8281 (x, comptée depuis l'ouest) et ligne 5928 (y, comptée depuis le nord). Un client de cartographie web calcule automatiquement quelles tuiles z/x/y couvrent la zone visible avant de les demander une à une au serveur.",
  },

  { type: "heading", text: "3. Tuiles raster vs tuiles vectorielles", level: "superieur" },
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

  { type: "heading", text: "7. Performance à grande échelle : simplification, clustering, découpage", level: "approfondissement" },
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

  { type: "heading", text: "8. Sources de tuiles ouvertes et leurs licences", level: "superieur" },
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

  { type: "heading", text: "9. Cartographie web et accessibilité", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une carte interactive pose des défis d'accessibilité spécifiques : elle est par nature visuelle et dépend de la souris/du tactile pour se déplacer. Les bonnes pratiques incluent une navigation clavier alternative (zoomer/déplacer sans souris), un contraste suffisant pour les fonds de carte et les symboles, et systématiquement un résumé textuel ou tabulaire de la donnée essentielle affichée sur la carte, pour qu'un lecteur d'écran ne dépende pas uniquement du rendu graphique.",
  },

  { type: "heading", text: "10. Erreurs fréquentes en cartographie web", level: "superieur" },
  {
    type: "list",
    items: [
      "Confondre le système de coordonnées d'affichage (Web Mercator, EPSG:3857) et celui du fichier source (souvent EPSG:4326) — la bibliothèque de cartographie reprojette automatiquement à l'affichage, mais un calcul fait en amont sur le fichier source doit, lui, être fait dans un système adapté (voir module Projections avancées)",
      "Charger un fond de tuiles sans citer sa source (attribution obligatoire pour OpenStreetMap et la plupart des fournisseurs, une condition de licence, pas une simple courtoisie)",
      "Solliciter un serveur de tuiles gratuit communautaire à un volume de requêtes dépassant sa politique d'usage prévue, au risque d'un blocage de l'adresse IP du site",
      "Charger un GeoJSON complet et volumineux sans simplification ni découpage, provoquant un ralentissement visible du navigateur plutôt qu'un simple délai réseau",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Voir aussi : les analyses spatiales côté serveur/SIG",
    description: "Le module Le Compas couvre les opérations spatiales (intersection, buffer, autocorrélation) qui précèdent souvent la publication d'une donnée sur une carte web.",
  },
]
