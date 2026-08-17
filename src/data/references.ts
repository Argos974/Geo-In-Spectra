export interface Reference {
  type: "manuel" | "revue" | "site" | "video" | "officiel"
  label: string
  detail: string
  url?: string
}

export interface ReferenceGroup {
  theme: string
  refs: Reference[]
}

export const referenceGroups: ReferenceGroup[] = [
  {
    theme: "Cartographie, histoire et fondements géographiques",
    refs: [
      { type: "manuel", label: "Denègre, J. & Salgé, F.", detail: "Les systèmes d'information géographique, coll. Que sais-je ?, PUF" },
      { type: "site", label: "Géoconfluences", detail: "Ressource pédagogique de référence en géographie (ENS de Lyon)", url: "https://geoconfluences.ens-lyon.fr" },
      { type: "site", label: "Hypergéo", detail: "Encyclopédie collaborative de géographie et d'épistémologie de la discipline", url: "https://www.hypergeo.eu" },
      { type: "officiel", label: "IGN — Institut national de l'information géographique et forestière", detail: "Référentiels géodésiques français, documentation Lambert-93/RGF93", url: "https://www.ign.fr" },
      { type: "officiel", label: "cartes.gouv.fr", detail: "Plateforme cartographique officielle française (IGN), qui a repris et unifié Géoportail", url: "https://www.cartes.gouv.fr" },
    ],
  },
  {
    theme: "Géodésie et positionnement (GNSS)",
    refs: [
      { type: "manuel", label: "Hofmann-Wellenhof, B., Lichtenegger, H. & Wasle, E.", detail: "GNSS – Global Navigation Satellite Systems: GPS, GLONASS, Galileo & more, Springer" },
      { type: "officiel", label: "IGN — RGF93 et réseau GNSS permanent (RGP)", detail: "Documentation géodésique officielle française, transformations de référentiels", url: "https://geodesie.ign.fr" },
    ],
  },
  {
    theme: "Géomatique, SIG et données géographiques",
    refs: [
      { type: "manuel", label: "Denègre, J. & Salgé, F.", detail: "Les systèmes d'information géographique, coll. Que sais-je ?, PUF" },
      { type: "manuel", label: "Longley, P. A., Goodchild, M. F., Maguire, D. J. & Rhind, D. W.", detail: "Geographic Information Science and Systems, Wiley" },
      { type: "site", label: "Documentation officielle QGIS", detail: "Manuel utilisateur complet, en français", url: "https://docs.qgis.org" },
      { type: "site", label: "Documentation officielle PostGIS", detail: "Référence complète des fonctions spatiales SQL", url: "https://postgis.net/documentation" },
      { type: "video", label: "Chaîne QGIS officielle", detail: "Tutoriels et retours d'expérience de la communauté QGIS" },
      { type: "site", label: "data.gouv.fr", detail: "Portail français des données publiques ouvertes, dont données géographiques", url: "https://www.data.gouv.fr" },
      { type: "revue", label: "Tobler, W. R. (1970)", detail: "A Computer Movie Simulating Urban Growth in the Detroit Region, Economic Geography — origine de la \"première loi de la géographie\"" },
      { type: "revue", label: "Moran, P. A. P. (1950)", detail: "Notes on Continuous Stochastic Phenomena, Biometrika — indice d'autocorrélation spatiale" },
      { type: "revue", label: "Openshaw, S. (1984)", detail: "The Modifiable Areal Unit Problem, CATMOG 38, Geo Books" },
      { type: "officiel", label: "ISO 19115", detail: "Norme internationale de structuration des métadonnées géographiques" },
    ],
  },
  {
    theme: "Télédétection et imagerie satellite",
    refs: [
      { type: "manuel", label: "Girard, M.-C. & Girard, C.", detail: "Traitement des données de télédétection, Dunod" },
      { type: "manuel", label: "Campbell, J. B. & Wynne, R. H.", detail: "Introduction to Remote Sensing, Guilford Press" },
      { type: "manuel", label: "Lillesand, T., Kiefer, R. & Chipman, J.", detail: "Remote Sensing and Image Interpretation, Wiley" },
      { type: "officiel", label: "Copernicus Data Space Ecosystem", detail: "Téléchargement gratuit des images Sentinel (ESA/UE)", url: "https://dataspace.copernicus.eu" },
      { type: "officiel", label: "USGS EarthExplorer", detail: "Téléchargement gratuit des images Landsat (USGS/NASA)", url: "https://earthexplorer.usgs.gov" },
      { type: "video", label: "Supports de formation RUS Copernicus", detail: "Webinaires et exercices guidés sur les données Copernicus" },
      { type: "revue", label: "Chavez, P. S. (1988)", detail: "An Improved Dark-Object Subtraction Technique for Atmospheric Scattering Correction of Multispectral Data, Remote Sensing of Environment" },
      { type: "revue", label: "Vermote, E. F. et al. (1997)", detail: "Second Simulation of the Satellite Signal in the Solar Spectrum (6S), IEEE Transactions on Geoscience and Remote Sensing" },
    ],
  },
  {
    theme: "Indices spectraux et traitement d'image",
    refs: [
      { type: "manuel", label: "Girard, M.-C. & Girard, C.", detail: "Traitement des données de télédétection, Dunod" },
      { type: "manuel", label: "Gonzalez, R. C. & Woods, R. E.", detail: "Digital Image Processing, Pearson" },
      { type: "revue", label: "Cybergeo — European Journal of Geography", detail: "Revue scientifique en libre accès" },
      { type: "revue", label: "M@ppemonde", detail: "Revue de cartographie et de sciences de l'information géographique" },
      { type: "revue", label: "Rouse, J. W., Haas, R. H., Schell, J. A. & Deering, D. W. (1974)", detail: "Monitoring Vegetation Systems in the Great Plains with ERTS, NASA SP-351 — publication d'origine du NDVI" },
      { type: "revue", label: "Tucker, C. J. (1979)", detail: "Red and Photographic Infrared Linear Combinations for Monitoring Vegetation, Remote Sensing of Environment" },
      { type: "revue", label: "Huete, A. R. (1988)", detail: "A Soil-Adjusted Vegetation Index (SAVI), Remote Sensing of Environment" },
      { type: "revue", label: "Qi, J. et al. (1994)", detail: "A Modified Soil Adjusted Vegetation Index (MSAVI2), Remote Sensing of Environment" },
      { type: "revue", label: "Huete, A. et al. (2002)", detail: "Overview of the Radiometric and Biophysical Performance of the MODIS Vegetation Indices (EVI), Remote Sensing of Environment" },
      { type: "revue", label: "Gao, B.-C. (1996)", detail: "NDWI — A Normalized Difference Water Index for Remote Sensing of Vegetation Liquid Water from Space, Remote Sensing of Environment" },
      { type: "revue", label: "McFeeters, S. K. (1996)", detail: "The Use of the Normalized Difference Water Index (NDWI) in the Delineation of Open Water Features, International Journal of Remote Sensing" },
      { type: "revue", label: "Zha, Y., Gao, J. & Ni, S. (2003)", detail: "Use of Normalized Difference Built-Up Index (NDBI) in Automatically Mapping Urban Built-Up Areas, International Journal of Remote Sensing" },
      { type: "revue", label: "Key, C. H. & Benson, N. C. (2006)", detail: "Landscape Assessment: Ground Measure of Severity, the Normalized Burn Ratio (NBR), USDA Forest Service" },
      { type: "revue", label: "Gitelson, A. A. et al. (1996)", detail: "Use of a Green Channel in Remote Sensing of Global Vegetation from EOS-MODIS (GNDVI), Remote Sensing of Environment" },
      { type: "revue", label: "Kauth, R. J. & Thomas, G. S. (1976)", detail: "The Tasseled Cap — A Graphic Description of the Spectral-Temporal Development of Agricultural Crops, LARS Symposia" },
    ],
  },
  {
    theme: "Intelligence artificielle et apprentissage automatique",
    refs: [
      { type: "manuel", label: "Bishop, C.", detail: "Pattern Recognition and Machine Learning, Springer" },
      { type: "revue", label: "Zhu, X. X. et al. (2017)", detail: "Deep Learning in Remote Sensing, IEEE Geoscience and Remote Sensing Magazine" },
      { type: "revue", label: "Breiman, L. (2001)", detail: "Random Forests, Machine Learning" },
      { type: "revue", label: "Cortes, C. & Vapnik, V. (1995)", detail: "Support-Vector Networks, Machine Learning" },
      { type: "revue", label: "Cohen, J. (1960)", detail: "A Coefficient of Agreement for Nominal Scales (kappa), Educational and Psychological Measurement" },
      { type: "revue", label: "Congalton, R. G. (1991)", detail: "A Review of Assessing the Accuracy of Classifications of Remotely Sensed Data, Remote Sensing of Environment" },
      { type: "revue", label: "LeCun, Y., Bengio, Y. & Hinton, G. (2015)", detail: "Deep Learning, Nature" },
      { type: "revue", label: "Ronneberger, O., Fischer, P. & Brox, T. (2015)", detail: "U-Net: Convolutional Networks for Biomedical Image Segmentation, MICCAI" },
      { type: "revue", label: "Vaswani, A. et al. (2017)", detail: "Attention Is All You Need, NeurIPS — mécanisme d'attention à l'origine des Transformers" },
    ],
  },
  {
    theme: "Méthodologie académique et concours",
    refs: [
      { type: "site", label: "Géoconfluences — corpus méthodologique", detail: "Fiches méthode : commentaire de document, dissertation de géographie", url: "https://geoconfluences.ens-lyon.fr" },
      { type: "officiel", label: "Sites des jurys CAPES/Agrégation d'histoire-géographie", detail: "Rapports de jury, repères d'évaluation des épreuves de cartographie thématique" },
      { type: "manuel", label: "Bertin, J. (1967)", detail: "Sémiologie graphique : les diagrammes, les réseaux, les cartes, Gauthier-Villars / EHESS — référence fondatrice du langage visuel cartographique" },
    ],
  },
]
