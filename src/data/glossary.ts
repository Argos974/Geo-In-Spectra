export interface GlossaryTerm {
  term: string
  definition: string
  moduleSlug: string
}

export const glossary: GlossaryTerm[] = [
  { term: "Buffer (zone tampon)", definition: "Polygone créé à une distance fixe autour d'une géométrie vecteur.", moduleSlug: "outils-sig" },
  { term: "Datum", definition: "Modèle géodésique de référence auquel sont rattachées les coordonnées (ex. WGS84, RGF93).", moduleSlug: "fondamentaux" },
  { term: "EPSG", definition: "Code numérique identifiant un système de coordonnées (ex. EPSG:2154 pour Lambert-93).", moduleSlug: "fondamentaux" },
  { term: "GeoJSON", definition: "Format vecteur texte, standard du web, coordonnées en WGS84 par convention.", moduleSlug: "fondamentaux" },
  { term: "GeoPackage (.gpkg)", definition: "Fichier vecteur (et raster) unique de type base de données, successeur du Shapefile.", moduleSlug: "fondamentaux" },
  { term: "GeoTIFF (.tif)", definition: "Format raster géoréférencé, standard pour l'imagerie satellite et les modèles de terrain.", moduleSlug: "fondamentaux" },
  { term: "Intersection", definition: "Opération spatiale qui ne garde que la partie commune entre deux couches.", moduleSlug: "outils-sig" },
  { term: "Lambert-93", definition: "Système de coordonnées projeté, référence officielle française (EPSG:2154) depuis 2006.", moduleSlug: "fondamentaux" },
  { term: "MNT (modèle numérique de terrain)", definition: "Raster où chaque pixel porte une altitude.", moduleSlug: "fondamentaux" },
  { term: "NDBI", definition: "Normalized Difference Built-up Index : indice de détection du bâti à partir des bandes SWIR et NIR.", moduleSlug: "indices-spectraux" },
  { term: "NDMI", definition: "Normalized Difference Moisture Index : indice d'humidité de la végétation à partir des bandes NIR et SWIR.", moduleSlug: "indices-spectraux" },
  { term: "NDVI", definition: "Normalized Difference Vegetation Index : indice de vigueur végétale à partir des bandes NIR et Rouge.", moduleSlug: "indices-spectraux" },
  { term: "NIR (proche infrarouge)", definition: "Domaine du spectre juste au-delà du visible, très réfléchi par la végétation en bonne santé.", moduleSlug: "teledetection" },
  { term: "Projection cartographique", definition: "Transformation mathématique de la surface courbe de la Terre en un plan.", moduleSlug: "fondamentaux" },
  { term: "Raster", definition: "Donnée organisée en grille régulière de pixels, chacun porteur d'une valeur.", moduleSlug: "fondamentaux" },
  { term: "Réflectance", definition: "Proportion de lumière incidente réfléchie par une surface, mesurée par bande spectrale.", moduleSlug: "teledetection" },
  { term: "Résolution radiométrique", definition: "Nombre de niveaux d'intensité qu'un capteur peut coder par pixel.", moduleSlug: "teledetection" },
  { term: "Résolution spatiale", definition: "Taille au sol représentée par un pixel d'image satellite.", moduleSlug: "teledetection" },
  { term: "Résolution spectrale", definition: "Nombre et finesse des bandes du spectre mesurées par un capteur.", moduleSlug: "teledetection" },
  { term: "Résolution temporelle", definition: "Fréquence à laquelle un satellite repasse au-dessus d'un même lieu.", moduleSlug: "teledetection" },
  { term: "SAR (radar à synthèse d'ouverture)", definition: "Capteur actif qui émet sa propre onde radar ; fonctionne de nuit et à travers les nuages.", moduleSlug: "teledetection" },
  { term: "Shapefile (.shp)", definition: "Ancien standard vecteur multi-fichiers (Esri), toujours largement utilisé.", moduleSlug: "fondamentaux" },
  { term: "SIG (système d'information géographique)", definition: "Logiciel ou système permettant de stocker, visualiser et analyser des données géographiques.", moduleSlug: "outils-sig" },
  { term: "SWIR (infrarouge à ondes courtes)", definition: "Domaine du spectre sensible à l'humidité de la végétation et des sols.", moduleSlug: "teledetection" },
  { term: "Vecteur", definition: "Donnée géométrique (point, ligne, polygone) porteuse d'attributs.", moduleSlug: "fondamentaux" },
  { term: "WGS84", definition: "Système géodésique géographique mondial, référence du GPS (EPSG:4326).", moduleSlug: "fondamentaux" },
]
