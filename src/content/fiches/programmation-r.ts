import type { ContentBlock } from "../types"

export const programmationRFiche: ContentBlock[] = [
  {
    type: "table",
    headers: ["Étape", "Fonction R"],
    rows: [
      ["Importer un tableau", "read.csv() / read.csv2() (fichier français, ; et ,)"],
      ["Inspecter", "str(), head(), View(), nrow(), ncol()"],
      ["Filtrer / trier (dplyr)", "filter(), arrange(), enchaînés avec |>"],
      ["Créer / résumer (dplyr)", "mutate(), group_by() + summarise()"],
      ["Restructurer (tidyr)", "pivot_longer(), pivot_wider()"],
      ["Graphique (ggplot2)", "ggplot(df, aes(x, y)) + geom_point()/geom_col()"],
      ["Lire une couche (sf)", "st_read(), st_transform(crs = 2154), st_crs()"],
      ["Opérations spatiales (sf)", "st_buffer(), st_intersection(), st_join()"],
      ["Raster (terra)", "rast(), extract(r, vect(poly), fun = mean)"],
      ["Carte (tmap)", "tmap_mode('plot'/'view'), tm_shape() + tm_polygons()"],
      ["Moran (spdep)", "poly2nb(), nb2listw(), moran.test(), moran.mc()"],
      ["Régression spatiale", "lagsarlm(), spautolm(family = 'CAR')"],
      ["Krigeage (gstat)", "variogram(), fit.variogram(), krige()"],
      ["Reproductibilité", "renv::snapshot()/restore(), here::here()"],
    ],
  },
  {
    type: "comparison",
    items: [
      { label: "Boucle for", points: ["Syntaxe classique", "Effets de bord (fichiers, graphiques)", "Préallouer le résultat avant la boucle"] },
      { label: "purrr::map()", points: ["Applique une fonction à chaque élément", "map_dbl()/map_chr() : renvoie un vecteur direct", "S'enchaîne avec |>"] },
    ],
  },
  {
    type: "formula",
    label: "Krigeage ordinaire (gstat)",
    formula: "v <- variogram(z ~ 1, data = mesures)\nmod <- fit.variogram(v, vgm('Sph'))\nkrige(z ~ 1, mesures, grille, model = mod)",
  },
  {
    type: "formula",
    label: "Test de Moran par permutation vs paramétrique",
    formula: "moran.test(x, lw)        # paramétrique\nmoran.mc(x, lw, nsim = 999)  # permutation, sans hypothèse de distribution",
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas oublier",
    text: "st_transform(crs = 2154) avant tout st_buffer()/st_area() : un CRS en degrés (WGS84) renvoie des distances et surfaces en degrés, sans avertissement. Préférer read.csv2() sur un export Excel français (séparateur ; et décimale ,).",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pipe et packages spatiaux",
    text: "|> (natif, R ≥ 4.1) enchaîne des étapes dplyr/tidyr sur un tableau ; un objet sf reste un data frame (filter(), mutate() s'y appliquent directement, colonne geometry comprise). renv.lock verrouille les versions de packages, Git verrouille le code : les deux ensemble garantissent la reproductibilité d'un projet.",
  },
]
