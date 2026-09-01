import type { ContentBlock } from "./types"

export const basesDonneesSpatialesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Le module Le Compas introduit PostGIS en une section : une base de données spatiale existe, elle sait exécuter une requête spatiale en SQL. Cette salle va plus loin sur ce qui rend une base spatiale réellement utilisable à grande échelle : comment un index spatial fonctionne concrètement, comment lire le plan d'exécution d'une requête, comment imposer une cohérence topologique, et comment une base spatiale s'insère dans le reste d'une infrastructure (raster, web, historique). Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Avant de commencer : PostGIS, une première requête spatiale",
    description: "Le Compas introduit PostGIS et une première requête ST_Intersects — prérequis direct de cette salle.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
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

  { type: "heading", text: "2. Pourquoi chercher dans une carte a besoin d'un index", level: "lycee" },
  {
    type: "paragraph",
    text: "Chercher « toutes les parcelles qui touchent cette rivière » sans index revient à comparer la rivière à chaque parcelle de la base, une par une, jusqu'à la dernière — un peu comme chercher un mot dans un dictionnaire en lisant chaque page depuis le début plutôt qu'en utilisant l'ordre alphabétique. Un index spatial range les géométries par zone plutôt que par ordre alphabétique (une géométrie n'a pas d'ordre naturel comme un mot), pour éliminer d'un coup l'immense majorité des entités qui ne peuvent géométriquement pas être concernées.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Sans index, chaque requête ralentit avec la taille de la base",
    text: "Une requête spatiale sans index compare la géométrie recherchée à chaque ligne de la table : sur 1 000 entités, c'est rapide ; sur 10 millions, la même requête peut prendre plusieurs minutes au lieu de quelques millisecondes. C'est cette différence de comportement à grande échelle, pas la lenteur en elle-même sur un petit jeu de données, qui rend l'index indispensable dès qu'une base grandit.",
  },

  { type: "heading", text: "3. Exposer une base sur le web : jamais un accès direct", level: "lycee" },
  {
    type: "paragraph",
    text: "Une base spatiale n'est utile à une carte web (module Cartographie web) que si elle est exposée par un service intermédiaire, jamais en donnant à chaque visiteur du site un accès direct à la base elle-même. GeoServer ou MapServer publient une base PostGIS en WMS/WFS (les mêmes standards que ceux vus côté client dans le module Cartographie web), une couche de sécurité et de contrôle indispensable dès qu'un site est accessible publiquement.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : une base spatiale gère l'accès concurrent et garantit une cohérence qu'un fichier ne garantit pas ; un index spatial élimine d'un coup les entités impossibles avant de tester la géométrie exacte, indispensable dès que la base grandit ; une carte web n'accède jamais directement à la base, toujours via un service intermédiaire (GeoServer, MapServer).",
    ],
  },
  {
    type: "link",
    to: "/module/cartographie-web",
    label: "Voir aussi : WMS, WMTS, WFS",
    description: "Le module Cartographie web détaille ces standards côté client — cette salle les aborde côté serveur/base de données.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Rappel : PostGIS et les types géométriques", level: "superieur" },
  {
    type: "paragraph",
    text: "PostGIS ajoute à PostgreSQL un type de colonne `geometry` (ou `geography` pour un calcul directement sur l'ellipsoïde plutôt qu'après projection), qui stocke un point, une ligne ou un polygone comme n'importe quelle autre colonne d'une table — la géométrie devient un attribut parmi d'autres d'une ligne de table relationnelle classique, pas un objet à part dans un système séparé.",
  },
  {
    type: "callout",
    tone: "rappel",
    title: "Rappel : vecteur et raster, deux familles de données (module Fondements)",
    text: "Le module Fondements distingue le vecteur (objets géométriques — points, lignes, polygones — porteurs d'attributs) du raster (grille régulière de pixels). Le type `geometry` de PostGIS ci-dessous stocke précisément cette famille vecteur en base ; PostGIS Raster, plus loin dans cette salle, fait l'équivalent pour la famille raster.",
  },
  {
    type: "formula",
    label: "Créer une colonne géométrique typée",
    formula: "ALTER TABLE parcelles ADD COLUMN geom geometry(Polygon, 2154);",
    note: "Le type est explicitement contraint (ici : polygone, système de coordonnées EPSG:2154) — une insertion d'une géométrie d'un autre type ou d'un autre système échoue à l'écriture plutôt que de corrompre silencieusement la table, contrairement à un fichier qui ne vérifie généralement rien de tel à l'insertion d'une entité individuelle.",
  },

  { type: "heading", text: "2. L'index spatial : pourquoi une requête spatiale a besoin d'un index dédié", level: "superieur" },
  {
    type: "paragraph",
    text: "Un index classique (B-tree) trie une colonne selon un ordre total (numérique, alphabétique) — inapplicable à une géométrie 2D, qui n'a pas d'ordre naturel unique. Un index spatial GiST (Generalized Search Tree) résout ce problème différemment : il organise les géométries par rectangles englobants (bounding box) imbriqués, permettant d'éliminer rapidement la grande majorité des entités qui ne peuvent géométriquement pas satisfaire une requête, avant même de tester leur géométrie exacte.",
  },
  {
    type: "formula",
    label: "Créer un index spatial",
    formula: "CREATE INDEX idx_parcelles_geom ON parcelles USING GIST (geom);",
    note: "Sans cet index, toute requête spatiale (ST_Intersects, ST_Contains…) doit comparer la géométrie de chaque ligne une par une avec la géométrie recherchée — un balayage complet de la table, catastrophique en temps au-delà de quelques dizaines de milliers d'entités.",
  },
  {
    type: "diagram",
    name: "spatial-index-tree",
    caption: "Un index GiST organise les géométries en rectangles englobants imbriqués, structurés en arbre — éliminer vite les candidats impossibles avant de tester la géométrie exacte.",
  },

  { type: "heading", text: "3. Écrire une requête spatiale : jointures et opérateurs", level: "superieur" },
  {
    type: "paragraph",
    text: "Une jointure spatiale associe deux tables non pas sur une clé identique (comme une jointure SQL classique) mais sur une relation géométrique — l'équivalent SQL d'une jointure spatiale QGIS (module Le Compas), mais exécutable directement sur des millions d'entités sans passer par une interface graphique.",
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
    title: "&& teste un rectangle englobant, ST_Intersects la géométrie exacte",
    text: "L'opérateur `&&` teste seulement le recouvrement des rectangles englobants (rapide, utilise directement l'index GiST), pas la géométrie exacte : utilisé seul, il donne des faux positifs (rectangles englobants qui se recouvrent sans que les géométries réelles se touchent). PostGIS récent (2.x/3.x) exploite déjà automatiquement l'index GiST pour `ST_Intersects(a.geom, b.geom)` seule, sans qu'il soit nécessaire d'écrire explicitement le `&&` : le filtre rapide sur rectangle englobant, puis la confirmation exacte, ont lieu en interne. Écrire `WHERE a.geom && b.geom AND ST_Intersects(a.geom, b.geom)` reste correct et peut aider le planificateur sur une version ancienne ou une requête complexe, mais ce n'est plus, sur une installation moderne, une condition de correction — seulement une optimisation ponctuelle à vérifier avec `EXPLAIN ANALYZE` plutôt qu'une règle systématique.",
  },

  { type: "heading", text: "4. Topologie : imposer des règles de cohérence géométrique", level: "superieur" },
  {
    type: "paragraph",
    text: "Un fichier Shapefile ou GeoPackage ne garantit structurellement rien sur la cohérence entre entités : deux parcelles peuvent se chevaucher, un réseau routier peut contenir des tronçons non connectés, sans qu'aucune alerte ne soit levée à l'enregistrement. PostGIS Topology (une extension dédiée) permet de définir un schéma topologique où de telles règles sont vérifiées et maintenues activement — un chevauchement invalide entre deux parcelles cadastrales, par exemple, peut être rejeté à l'écriture plutôt que découvert des mois plus tard en analyse.",
  },
  { type: "game" },

  { type: "heading", text: "5. Versionner une donnée spatiale : historiser les modifications", level: "superieur" },
  {
    type: "paragraph",
    text: "Contrairement à un fichier réécrit à chaque modification (l'état précédent perdu sauf sauvegarde manuelle), une base de données spatiale peut historiser chaque changement : une table d'historique (souvent via des triggers PostgreSQL) qui conserve chaque ancienne version d'une géométrie avec sa date de modification, permettant de reconstituer l'état d'une couche à une date passée — une exigence fréquente en cadastre, urbanisme réglementaire, ou tout usage où « qui a changé quoi, quand » doit rester traçable.",
  },

  { type: "heading", text: "6. PostGIS et le reste de l'écosystème", level: "superieur" },
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

  { type: "heading", text: "7. Exposer une base spatiale sur le web", level: "superieur" },
  {
    type: "paragraph",
    text: "Une base spatiale n'est utile à une carte web (module Cartographie web) que si elle est exposée par un service intermédiaire : GeoServer ou MapServer publient une base PostGIS en WMS/WFS (mêmes standards OGC que le module Cartographie web) sans que le client web n'ait jamais un accès direct à la base elle-même, une couche de sécurité et d'abstraction indispensable en production.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : `geometry(Polygon, 2154)` type et contraint une colonne dès l'écriture ; l'index GiST élimine par rectangle englobant avant de tester la géométrie exacte, automatiquement pour ST_Intersects/ST_Contains sur PostGIS récent, `&&` restant une optimisation ponctuelle plutôt qu'une obligation ; PostGIS Topology impose des règles de cohérence qu'un fichier ne garantit jamais ; SpatiaLite offre l'essentiel sans serveur ; une base n'est jamais exposée directement au client web, toujours via WMS/WFS.",
    ],
  },
  {
    type: "link",
    to: "/module/cartographie-web",
    label: "Voir aussi : WMS, WMTS, WFS",
    description: "Le module Cartographie web détaille ces standards côté client — cette salle les aborde côté serveur/base de données.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Performance : EXPLAIN ANALYZE et le plan de requête spatial", level: "approfondissement" },
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

  { type: "heading", text: "2. Raster en base : PostGIS Raster", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà du vecteur, l'extension PostGIS Raster stocke des données raster (une image satellite, un MNT) directement en base, découpées automatiquement en tuiles internes pour rester interrogeables efficacement, avec des fonctions dédiées (`ST_Value` pour lire la valeur d'un pixel à une coordonnée donnée, `ST_SummaryStats` pour des statistiques de zone directement en SQL) — la même logique que les statistiques de zone du module Le Compas, mais exécutée en base plutôt que dans un logiciel SIG desktop.",
  },

  { type: "heading", text: "3. Passer à l'échelle : partitionnement et parallélisation", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà de quelques dizaines de millions de lignes, même un index GiST bien utilisé peut ne plus suffire : le partitionnement spatial découpe une table en plusieurs partitions physiques (par exemple par région ou par dalle géographique), chacune interrogeable indépendamment. PostgreSQL peut alors ignorer entièrement les partitions dont la zone ne recoupe pas la requête (partition pruning), sans même consulter leur index, une économie que l'index seul n'apporte pas sur une table monolithique gigantesque.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Partitionner n'est pas gratuit non plus",
    text: "Un découpage trop fin multiplie le nombre de partitions à gérer (maintenance, statistiques séparées) sans gain supplémentaire ; un découpage trop grossier laisse des partitions individuellement trop volumineuses pour bénéficier du pruning. Le bon découpage dépend de la distribution réelle des requêtes attendues (par région administrative ? par grille régulière ?), pas d'une règle universelle — la même logique de compromis que le choix d'un h en KDE (module Les Statistiques) ou d'une résolution de grille en analyse raster.",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Une base nationale de parcelles cadastrales (plusieurs dizaines de millions de lignes) reçoit presque exclusivement des requêtes limitées à un seul département à la fois. Propose un critère de partitionnement adapté à cet usage, et explique en quoi il réduirait le travail réel de PostgreSQL par rapport à un index GiST seul sur la table entière.",
  },

  { type: "heading", text: "4. Sécurité et contrôle d'accès sur une base spatiale partagée", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une base spatiale accessible à plusieurs applications et plusieurs équipes (voir section 2, jointures exécutées directement en SQL) pose une question qu'un fichier isolé ne pose jamais : qui a le droit de lire, modifier ou supprimer quoi. PostgreSQL gère ces droits au niveau du rôle (utilisateur ou groupe), de la table, et jusqu'à la ligne individuelle — trois granularités bien distinctes, souvent combinées.",
  },
  {
    type: "table",
    headers: ["Mécanisme", "Granularité", "Exemple d'usage géospatial"],
    rows: [
      ["GRANT / REVOKE", "Table ou colonne entière", "Un compte de lecture seule pour le service web (SELECT uniquement), aucun droit d'écriture"],
      ["Row-Level Security (RLS)", "Ligne individuelle, selon une politique SQL", "Un agent de terrain ne voit que les parcelles de son secteur géographique, filtrées par une politique fondée sur ST_Intersects"],
      ["Schémas séparés", "Ensemble de tables", "Isoler les données de production des tables de travail/import, sans dupliquer la base entière"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "La RLS, un filtre spatial appliqué automatiquement",
    text: "Une politique Row-Level Security peut restreindre chaque requête à une zone géographique sans que l'application cliente n'ait jamais besoin d'ajouter elle-même la condition spatiale : `CREATE POLICY secteur_agent ON parcelles USING (ST_Intersects(geom, secteur_de(current_user)))`. La politique s'applique automatiquement à toute requête du rôle concerné, y compris une jointure ou une vue construite par-dessus — un agent malveillant ou un bug applicatif ne peut pas contourner la restriction en écrivant une requête différente.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un rôle applicatif unique masque qui a fait quoi",
    text: "Faire se connecter toute une application par un seul rôle PostgreSQL partagé (pratique courante pour simplifier la configuration) rend impossible de savoir, a posteriori, quel utilisateur final a modifié quelle géométrie — l'historisation par trigger (section 5, versionner une donnée spatiale) enregistre alors « qui » au sens du rôle technique, pas de la personne réelle. Propager l'identité de l'utilisateur final jusqu'à la base (rôle nommé, ou colonne dédiée renseignée par l'application) est nécessaire dès qu'une traçabilité réglementaire (cadastre, urbanisme) est en jeu.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : EXPLAIN ANALYZE révèle si un index est réellement utilisé (Index Scan) ou ignoré (Seq Scan) ; PostGIS Raster applique la logique des statistiques de zone directement en base, en tuiles internes ; au-delà de quelques dizaines de millions de lignes, le partitionnement spatial permet d'ignorer entièrement des partitions non concernées, un gain que l'index seul n'apporte plus à cette échelle ; GRANT/REVOKE, Row-Level Security et schémas séparés gèrent l'accès à trois granularités différentes, un rôle applicatif unique partagé casse toute traçabilité individuelle.",
    ],
  },
  {
    type: "link",
    to: "/module/cartographie-web",
    label: "Voir aussi : WMS, WMTS, WFS",
    description: "Le module Cartographie web détaille comment cette base, une fois optimisée, est exposée côté client.",
  },
]
