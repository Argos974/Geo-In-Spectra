import type { ContentBlock } from "../types"

export const travauxPratiquesFiche: ContentBlock[] = [
  {
    type: "diagram",
    name: "workflow-tp",
    caption: "Le fil directeur, commun aux trois pistes.",
  },
  {
    type: "paragraph",
    text: "Trois pistes indépendantes de 12 séances, un semestre chacune (filtre « Afficher » de la page pour n'en voir qu'une) : Lycée (socle, sans code), Licence/BUT (technique, Python, livrable professionnel), Master/Recherche (rigueur statistique, IMRaD, techniques avancées).",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Lycée 1-4 : cartographie de base, coordonnées Lambert-93, vecteur/raster, buffer + intersection",
      "Lycée 5-8 : photo-interprétation, NDVI, NDBI/NDWI, mise en page et sémiologie",
      "Lycée 9-12 : commenter un document, carte ancienne vs récente, Mercator/Peters, mini-projet",
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Licence/BUT 1-4 : automatisation QGIS, géoréférencement par grille, ΔNDVI, jointure spatiale",
      "Licence/BUT 5-8 : GeoPandas/rasterio, PostGIS, classification supervisée (RF), algèbre raster",
      "Licence/BUT 9-12 : radar + krigeage, audit qualité ISO 19115, rapport technique SIG, mini-projet professionnel",
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Master/Recherche 1-4 : cadrage IMRaD, réflectance TOA/BOA, validation d'indice, séries temporelles",
      "Master/Recherche 5-8 : MLP vs Random Forest, test de McNemar, krigeage avancé (validation croisée), AHP",
      "Master/Recherche 9-12 : hyperspectral, polarimétrie SAR, mini-projet recherche, mémoire IMRaD",
    ],
  },
  {
    type: "formula",
    label: "Calculatrice raster QGIS : NDVI",
    formula: "(\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Niveau L1C (non corrigé) vs L2A (corrigé des effets atmosphériques) : toujours utiliser L2A pour un calcul d'indice fiable. Et : un géoréférencement approximatif « à l'œil » n'est jamais fiable, seuls des points de contrôle à coordonnée réelle certaine le sont.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Jeu de données canonique (réel, fourni avec le site)",
    text: "Scène Sentinel-2 réelle (Vitrolles, 6 août 2024, /data/sample-vitrolles-2024/) : NDVI moyen 0.33, NDMI -0.09, NDBI +0.09. Résultat réel mesuré (classification) : MLP à 50 neurones légèrement meilleur que Random Forest sur ce jeu (kappa 0.673 contre 0.640), contredit l'intuition générale, à vérifier sur son propre jeu plutôt qu'à présumer.",
  },
]
