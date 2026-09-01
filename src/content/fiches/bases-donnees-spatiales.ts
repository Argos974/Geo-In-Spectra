import type { ContentBlock } from "../types"

export const basesDonneesSpatialesFiche: ContentBlock[] = [
  {
    type: "formula",
    label: "Index spatial",
    formula: "CREATE INDEX idx ON table USING GIST (geom);",
    note: "Sans lui : balayage complet de table sur toute requête spatiale.",
  },
  {
    type: "formula",
    label: "Jointure spatiale correcte",
    formula: "WHERE a.geom && b.geom AND ST_Intersects(a.geom, b.geom)",
    note: "&& filtre rapide (bbox, indexé) avant la fonction exacte, jamais à sa place.",
  },
  {
    type: "list",
    items: [
      "EXPLAIN ANALYZE avant tout diagnostic de lenteur : vérifier Index Scan vs Seq Scan",
      "Topologie : impose des règles de cohérence (pas de chevauchement) que le fichier seul ne garantit jamais",
      "SpatiaLite = PostGIS sans serveur, pour un usage local/embarqué",
      "Sécurité : GRANT/REVOKE (table), Row-Level Security (ligne, via une politique SQL) — un rôle applicatif unique partagé casse toute traçabilité individuelle",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Reprojection dans WHERE",
    text: "Reprojeter une colonne à la volée dans la clause WHERE empêche souvent l'usage de l'index — reprojeter une fois, en amont.",
  },
]
