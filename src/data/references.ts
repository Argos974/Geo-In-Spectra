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
    theme: "Géomatique, SIG et données géographiques",
    refs: [
      { type: "manuel", label: "Denègre, J. & Salgé, F.", detail: "Les systèmes d'information géographique, coll. Que sais-je ?, PUF" },
      { type: "site", label: "Documentation officielle QGIS", detail: "Manuel utilisateur complet, en français", url: "https://docs.qgis.org" },
      { type: "video", label: "Chaîne QGIS officielle", detail: "Tutoriels et retours d'expérience de la communauté QGIS" },
      { type: "site", label: "data.gouv.fr", detail: "Portail français des données publiques ouvertes, dont données géographiques", url: "https://www.data.gouv.fr" },
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
    ],
  },
  {
    theme: "Indices spectraux et traitement d'image",
    refs: [
      { type: "manuel", label: "Girard, M.-C. & Girard, C.", detail: "Traitement des données de télédétection, Dunod" },
      { type: "manuel", label: "Gonzalez, R. C. & Woods, R. E.", detail: "Digital Image Processing, Pearson" },
      { type: "revue", label: "Cybergeo — European Journal of Geography", detail: "Revue scientifique en libre accès" },
      { type: "revue", label: "M@ppemonde", detail: "Revue de cartographie et de sciences de l'information géographique" },
    ],
  },
  {
    theme: "Intelligence artificielle et apprentissage automatique",
    refs: [
      { type: "manuel", label: "Bishop, C.", detail: "Pattern Recognition and Machine Learning, Springer" },
      { type: "revue", label: "Zhu, X. X. et al. (2017)", detail: "Deep Learning in Remote Sensing, IEEE Geoscience and Remote Sensing Magazine" },
    ],
  },
  {
    theme: "Méthodologie académique et concours",
    refs: [
      { type: "site", label: "Géoconfluences — corpus méthodologique", detail: "Fiches méthode : commentaire de document, dissertation de géographie", url: "https://geoconfluences.ens-lyon.fr" },
      { type: "officiel", label: "Sites des jurys CAPES/Agrégation d'histoire-géographie", detail: "Rapports de jury, repères d'évaluation des épreuves de cartographie thématique" },
    ],
  },
]
