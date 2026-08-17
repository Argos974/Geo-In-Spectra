import type { ContentBlock } from "../types"

export const outilsSigFiche: ContentBlock[] = [
  {
    type: "table",
    headers: ["Opération", "Ce qu'elle fait"],
    rows: [
      ["Buffer", "Zone tampon à distance fixe"],
      ["Intersection", "Partie commune entre deux couches"],
      ["Union / Dissolve", "Fusionne les géométries adjacentes"],
      ["Jointure spatiale", "Attributs transférés selon la position"],
      ["Clip", "Découpe selon l'emprise d'une autre couche"],
    ],
  },
  {
    type: "comparison",
    items: [
      { label: "PyQGIS", points: ["API Python intégrée à QGIS", "Automatise des traitements existants"] },
      { label: "GeoPandas", points: ["Bibliothèque autonome", "Pipeline hors interface graphique"] },
    ],
  },
  {
    type: "formula",
    label: "GeoPandas : calcul de surface",
    formula: "gdf['surface_ha'] = gdf.to_crs(epsg=2154).area / 10_000",
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Un buffer ou un calcul d'aire fait sans reprojection préalable en système métrique donne un résultat en degrés, pas en mètres.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Moran, MAUP et krigeage",
    text: "Indice de Moran proche de +1 : valeurs voisines qui se ressemblent fortement. MAUP : un même jeu de données change de résultat statistique selon le découpage spatial choisi. Krigeage : interpolation qui ajoute une carte d'incertitude, contrairement à l'IDW.",
  },
]
