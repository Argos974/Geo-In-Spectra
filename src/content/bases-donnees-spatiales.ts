import type { ContentBlock } from "./types"

export const basesDonneesSpatialesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Le module Le Compas introduit PostGIS en une section : une base de données spatiale existe, elle sait exécuter une requête spatiale en SQL. Cette salle va plus loin sur ce qui rend une base spatiale réellement utilisable à grande échelle : comment un index spatial fonctionne concrètement, comment lire le plan d'exécution d'une requête, comment imposer une cohérence topologique, et comment une base spatiale s'insère dans le reste d'une infrastructure (raster, web, historique).",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Avant de commencer : PostGIS, une première requête spatiale",
    description: "Le Compas (section 7) introduit PostGIS et une première requête ST_Intersects — prérequis direct de cette salle.",
  },

  { type: "heading", text: "1. Pourquoi une base de données plutôt qu'un fichier", level: "lycee" },
  {
    type: "paragraph",
    text: "Un fichier (Shapefile, GeoPackage) convient à un projet isolé, mais atteint vite ses limites dès que plusieurs personnes doivent le modifier simultanément, que le volume dépasse quelques centaines de milliers d'entités, ou que la donnée doit être interrogée par plusieurs applications différentes en même temps (un SIG desktop, un site web, un script d'automatisation) sans risque de conflit ou de version incohérente entre elles.",
  },
  {
    type: "table",
    headers: ["Besoin", "Fichier seul", "Base de données spatiale"],
    rows: [
      ["Accès concurrent multi-utilisateur", "Risque de conflit, verrouillage manuel", "Gestion native des transactions concurrentes"],
      ["Requêtes complexes (jointures, agrégations)", "Limité, souvent hors SIG desktop", "SQL complet, y compris fonctions spatiales"],
      ["Cohérence garantie (topologie, contraintes)", "Aucune garantie structurelle", "Contraintes et règles imposables au niveau base"],
      ["Exposition à plusieurs applications à la fois", "Copies multiples, risque de divergence", "Source unique, interrogée par toutes les applications"],
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "Fichier seul (Shapefile, GeoPackage)",
        points: [
          "Adapté à un projet isolé, jusqu'à quelques centaines de milliers d'entités",
          "Un seul rédacteur à la fois, sans risque réel de conflit",
          "Distribution simple : un ou quelques fichiers à copier",
          "Aucune garantie de cohérence entre fichiers si plusieurs copies circulent",
        ],
      },
      {
        label: "Base de données spatiale (PostGIS)",
        points: [
          "Adaptée à plusieurs millions d'entités, interrogées en continu",
          "Plusieurs utilisateurs et applications lisent/écrivent en même temps, sans copie divergente",
          "Nécessite un serveur à installer et administrer (sauvegardes, droits d'accès)",
          "Une seule source de vérité, interrogée à la demande plutôt que dupliquée",
        ],
      },
    ],
  },

  { type: "heading", text: "2. Rappel : PostGIS et les types géométriques", level: "superieur" },
  {
    type: "paragraph",
    text: "PostGIS ajoute à PostgreSQL un type de colonne `geometry` (ou `geography` pour un calcul directement sur l'ellipsoïde plutôt qu'après projection), qui stocke un point, une ligne ou un polygone comme n'importe quelle autre colonne d'une table — la géométrie devient un attribut parmi d'autres d'une ligne de table relationnelle classique, pas un objet à part dans un système séparé.",
  },
  {
    type: "formula",
    label: "Créer une colonne géométrique typée",
    formula: "ALTER TABLE parcelles ADD COLUMN geom geometry(Polygon, 2154);",
    note: "Le type est explicitement contraint (ici : polygone, système de coordonnées EPSG:2154) — une insertion d'une géométrie d'un autre type ou d'un autre système échoue à l'écriture plutôt que de corrompre silencieusement la table, contrairement à un fichier qui ne vérifie généralement rien de tel à l'insertion d'une entité individuelle.",
  },

  { type: "heading", text: "3. L'index spatial : pourquoi une requête spatiale a besoin d'un index dédié", level: "superieur" },
  {
    type: "paragraph",
    text: "Un index classique (B-tree) trie une colonne selon un ordre total (numérique, alphabétique) — inapplicable à une géométrie 2D, qui n'a pas d'ordre naturel unique. Un index spatial GiST (Generalized Search Tree) résout ce problème différemment : il organise les géométries par rectangles englobants (bounding box) imbriqués, permettant d'éliminer rapidement la grande majorité des entités qui ne peuvent géométriquement pas satisfaire une requête, avant même de tester leur géométrie exacte.",
  },
  {
    type: "formula",
    label: "Créer un index spatial",
    formula: "CREATE INDEX idx_parcelles_geom ON parcelles USING GIST (geom);",
    note: "Sans cet index, toute requête spatiale (ST_Intersects, ST_Contains…) doit comparer la géométrie de chaque ligne une par une avec la géométrie recherchée — un balayage complet de la table, catastrophique en temps au-delà de quelques dizaines de milliers d'entités (voir module Le Compas, section 7).",
  },

  {
    type: "diagram",
    name: "spatial-index-tree",
    caption: "Un index GiST organise les géométries en rectangles englobants imbriqués, structurés en arbre — éliminer vite les candidats impossibles avant de tester la géométrie exacte.",
  },

  { type: "heading", text: "4. Écrire une requête spatiale : jointures et opérateurs", level: "superieur" },
  {
    type: "paragraph",
    text: "Une jointure spatiale associe deux tables non pas sur une clé identique (comme une jointure SQL classique) mais sur une relation géométrique — l'équivalent SQL d'une jointure spatiale QGIS (module Le Compas, section 2), mais exécutable directement sur des millions d'entités sans passer par une interface graphique.",
  },
  {
    type: "table",
    headers: ["Fonction PostGIS", "Relation testée"],
    rows: [
      ["ST_Intersects(a, b)", "Les deux géométries se touchent ou se chevauchent, même partiellement"],
      ["ST_Contains(a, b)", "a contient entièrement b"],
      ["ST_DWithin(a, b, d)", "a et b sont à une distance inférieure à d l'une de l'autre"],
      ["ST_Within(a, b)", "a est entièrement contenu dans b (inverse de ST_Contains)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "L'opérateur && avant la fonction exacte, pas à la place",
    text: "L'opérateur `&&` teste seulement le recouvrement des rectangles englobants (rapide, utilise directement l'index GiST), pas la géométrie exacte. Une requête bien écrite combine les deux : `WHERE a.geom && b.geom AND ST_Intersects(a.geom, b.geom)` — le premier filtre élimine rapidement l'essentiel des paires non pertinentes via l'index, le second confirme précisément sur le nombre réduit de candidats restants. Omettre le second (`&&` seul) donne des faux positifs (rectangles englobants qui se recouvrent sans que les géométries réelles se touchent) ; omettre le premier laisse le moteur de requête moins bien exploiter l'index selon les versions.",
  },

  { type: "heading", text: "5. Topologie : imposer des règles de cohérence géométrique", level: "superieur" },
  {
    type: "paragraph",
    text: "Un fichier Shapefile ou GeoPackage ne garantit structurellement rien sur la cohérence entre entités : deux parcelles peuvent se chevaucher, un réseau routier peut contenir des tronçons non connectés, sans qu'aucune alerte ne soit levée à l'enregistrement. PostGIS Topology (une extension dédiée) permet de définir un schéma topologique où de telles règles sont vérifiées et maintenues activement — un chevauchement invalide entre deux parcelles cadastrales, par exemple, peut être rejeté à l'écriture plutôt que découvert des mois plus tard en analyse.",
  },

  { type: "heading", text: "6. Performance : EXPLAIN ANALYZE et le plan de requête spatial", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Face à une requête spatiale lente, la première étape de diagnostic n'est jamais de deviner mais de lire le plan d'exécution réel que PostgreSQL a choisi, via `EXPLAIN ANALYZE`. Ce plan révèle en particulier si l'index spatial a été utilisé (« Index Scan using idx_parcelles_geom ») ou ignoré au profit d'un balayage complet de table (« Seq Scan »), la cause la plus fréquente d'une requête spatiale anormalement lente sur une grande table.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi un index existant n'est parfois pas utilisé",
    text: "PostgreSQL peut ignorer un index spatial existant si les statistiques internes de la table sont obsolètes (résolu par `ANALYZE nom_table`), ou si la requête compare la géométrie à une expression calculée plutôt qu'à une valeur directe (ex. reprojeter une colonne à la volée dans la clause WHERE empêche souvent l'utilisation de l'index sur cette colonne) — un piège classique, la reprojection doit être faite une fois, en amont, pas répétée à chaque ligne comparée dans la requête.",
  },
  { type: "game" },

  { type: "heading", text: "7. Raster en base : PostGIS Raster", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà du vecteur, l'extension PostGIS Raster stocke des données raster (une image satellite, un MNT) directement en base, découpées automatiquement en tuiles internes pour rester interrogeables efficacement, avec des fonctions dédiées (`ST_Value` pour lire la valeur d'un pixel à une coordonnée donnée, `ST_SummaryStats` pour des statistiques de zone directement en SQL) — la même logique que les statistiques de zone du module Le Compas, mais exécutée en base plutôt que dans un logiciel SIG desktop.",
  },

  { type: "heading", text: "8. Versionner une donnée spatiale : historiser les modifications", level: "superieur" },
  {
    type: "paragraph",
    text: "Contrairement à un fichier réécrit à chaque modification (l'état précédent perdu sauf sauvegarde manuelle), une base de données spatiale peut historiser chaque changement : une table d'historique (souvent via des triggers PostgreSQL) qui conserve chaque ancienne version d'une géométrie avec sa date de modification, permettant de reconstituer l'état d'une couche à une date passée — une exigence fréquente en cadastre, urbanisme réglementaire, ou tout usage où « qui a changé quoi, quand » doit rester traçable.",
  },

  { type: "heading", text: "9. PostGIS et le reste de l'écosystème", level: "superieur" },
  {
    type: "table",
    headers: ["Solution", "Contexte typique"],
    rows: [
      ["PostGIS (PostgreSQL)", "Standard open-source de référence, serveur dédié, gros volumes multi-utilisateurs"],
      ["SpatiaLite", "Extension spatiale de SQLite : base spatiale en un seul fichier, sans serveur, pour un usage local/embarqué"],
      ["Extensions spatiales cloud (BigQuery GIS, Snowflake, etc.)", "Analyse spatiale à très grande échelle sur des entrepôts de données cloud, requêtes ponctuelles plutôt qu'un serveur applicatif permanent"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "SpatiaLite : PostGIS sans serveur",
    text: "Pour un projet local, un prototype, ou une donnée à distribuer en un seul fichier autonome, SpatiaLite (déjà lisible nativement par QGIS) offre l'essentiel du modèle PostGIS (types géométriques, index spatial, fonctions ST_*) sans nécessiter d'installer et d'administrer un serveur PostgreSQL séparé — un compromis pertinent quand la concurrence multi-utilisateur et les très gros volumes ne sont pas le besoin principal.",
  },

  { type: "heading", text: "10. Exposer une base spatiale sur le web", level: "superieur" },
  {
    type: "paragraph",
    text: "Une base spatiale n'est utile à une carte web (module Cartographie web) que si elle est exposée par un service intermédiaire : GeoServer ou MapServer publient une base PostGIS en WMS/WFS (mêmes standards OGC que le module Cartographie web, section 5) sans que le client web n'ait jamais un accès direct à la base elle-même, une couche de sécurité et d'abstraction indispensable en production.",
  },
  {
    type: "link",
    to: "/module/cartographie-web",
    label: "Voir aussi : WMS, WMTS, WFS",
    description: "Le module Cartographie web détaille ces standards côté client — cette salle les aborde côté serveur/base de données.",
  },
]
