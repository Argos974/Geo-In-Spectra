import type { ContentBlock } from "./types"

export const programmationRContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "R est un langage de programmation et un environnement dédiés au calcul statistique et à la visualisation de données, né au début des années 1990 comme implémentation libre du langage S. En géomatique, R occupe une place particulière : au-delà de la statistique généraliste, il porte un écosystème de packages spatiaux mature (sf, terra, spdep, gstat, tmap) qui permet de reproduire en code, ligne par ligne, ce qu'un SIG comme QGIS fait par clics — avec l'avantage d'un script reproductible, versionnable et automatisable sur des dizaines de jeux de données identiques. Ce module présente RStudio, la syntaxe du langage, la visualisation avec ggplot2, puis la cartographie et la statistique spatiale. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Installer R et RStudio, l'atelier de travail", level: "lycee" },
  {
    type: "paragraph",
    text: "R et RStudio sont deux logiciels distincts, installés séparément et dans cet ordre : R est le moteur qui exécute réellement le code (à télécharger sur le CRAN, cran.r-project.org) ; RStudio est l'IDE (Integrated Development Environment) qui l'entoure d'une interface confortable — éditeur de script, aide contextuelle, gestion des graphiques. Sans R déjà installé, RStudio n'a rien à exécuter : c'est une coquille vide.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une confusion fréquente au premier lancement",
    text: "Installer uniquement RStudio sans R au préalable (ou l'inverse dans le mauvais ordre) fait échouer le lancement de RStudio, ou le laisse sans version de R détectée à sélectionner. Toujours installer R en premier, RStudio ensuite : RStudio se contente de le détecter automatiquement au démarrage.",
  },
  {
    type: "list",
    items: [
      "Console (en bas à gauche, ou à gauche seul) : zone où le code s'exécute réellement, ligne par ligne, résultat affiché immédiatement — utile pour tester une instruction ponctuelle",
      "Script / Source (en haut à gauche) : éditeur de texte pour écrire un fichier .R complet, gardé, modifiable, réexécutable — Ctrl+Entrée (Cmd+Entrée sur Mac) envoie la ligne courante à la Console sans quitter l'éditeur",
      "Environnement / Historique (en haut à droite) : liste de toutes les variables actuellement en mémoire (un data frame chargé, un vecteur créé) et de l'historique des commandes exécutées",
      "Fichiers / Graphiques / Packages / Aide (en bas à droite) : navigateur de fichiers du projet, affichage des graphiques produits, liste des packages installés/activés, et panneau d'aide intégrée",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Toujours travailler dans un script, jamais seulement dans la Console",
    text: "Une ligne tapée directement dans la Console s'exécute mais disparaît de toute trace organisée. Écrire dans un fichier Script (.R), puis l'envoyer ligne par ligne ou en bloc vers la Console, garde un historique complet et réexécutable de tout le travail — le même réflexe qu'enregistrer un projet QGIS plutôt que de faire des traitements qu'on ne pourra jamais reproduire à l'identique.",
  },

  { type: "heading", text: "2. Premiers calculs, variables, types simples", level: "lycee" },
  {
    type: "paragraph",
    text: "La Console de R se comporte d'abord comme une calculatrice : taper 2 + 2 et valider affiche 4. L'opérateur d'affectation <- (une flèche, composée d'un chevron et d'un tiret) stocke un résultat dans une variable, pour le réutiliser ensuite sans le retaper.",
  },
  {
    type: "formula",
    label: "Affecter une valeur à une variable",
    formula: "altitude <- 1250\nnom_sommet <- 'Aiguille du Midi'\nest_enneige <- TRUE",
    note: "<- est l'opérateur d'affectation conventionnel en R (= fonctionne aussi dans la plupart des contextes, mais <- reste la convention à adopter). Une fois exécutée, chaque variable apparaît dans le panneau Environnement, à droite.",
  },
  {
    type: "table",
    headers: ["Type simple", "Exemple", "Fonction pour vérifier"],
    rows: [
      ["numeric", "1250, 3.14, -8", "class(altitude)"],
      ["character", "'Aiguille du Midi'", "class(nom_sommet)"],
      ["logical", "TRUE, FALSE", "class(est_enneige)"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "class() dit ce qu'est une variable",
    text: "class(x) renvoie le type d'une variable x. C'est le premier réflexe de diagnostic en R : avant de comprendre pourquoi un calcul échoue, vérifier que la variable est bien du type attendu (un nombre plutôt qu'un texte, par exemple, est une source d'erreur très courante en important un tableau).",
  },

  { type: "heading", text: "3. Vecteurs, fonctions de base, l'aide intégrée", level: "lycee" },
  {
    type: "paragraph",
    text: "En R, même une valeur unique (altitude <- 1250 ci-dessus) est techniquement un vecteur de longueur 1 : le vecteur est l'unité de base du langage. La fonction c() (« combine ») assemble plusieurs valeurs en un seul vecteur.",
  },
  {
    type: "formula",
    label: "Créer un vecteur de notes",
    formula: "notes <- c(12, 8, 15, 10, 16)",
    note: "notes contient maintenant cinq valeurs numériques, dans l'ordre où elles ont été saisies, accessibles individuellement par leur position : notes[1] vaut 12 (R indexe à partir de 1, pas de 0).",
  },
  {
    type: "list",
    items: [
      "mean(notes) : moyenne des valeurs du vecteur",
      "sum(notes) : somme des valeurs",
      "length(notes) : nombre de valeurs dans le vecteur",
      "max(notes) et min(notes) : valeur la plus haute et la plus basse",
      "sort(notes) : trie le vecteur par ordre croissant",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "?fonction : l'aide est toujours à portée de main",
    text: "Taper ?mean (ou help(mean)) dans la Console ouvre, dans le panneau Aide en bas à droite, la documentation officielle de la fonction mean() : ce qu'elle attend en argument, ce qu'elle renvoie, des exemples d'usage. Ce réflexe — consulter l'aide intégrée plutôt que deviner — est la compétence la plus rentable à acquérir dès le début, bien avant de mémoriser des fonctions par cœur.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "mean(notes) sur c(12, 8, 15, 10, 16) renvoie 12.2 : la moyenne de classe. sort(notes) renvoie c(8, 10, 12, 15, 16) — utile pour repérer d'un coup d'œil la note la plus basse et la plus haute sans les chercher une par une.",
  },

  { type: "heading", text: "4. Importer un tableau, un data frame", level: "lycee" },
  {
    type: "paragraph",
    text: "Un data frame est la structure de données centrale de R pour tout tableau : chaque ligne est une observation, chaque colonne une variable — exactement la même logique qu'une table attributaire QGIS ou une feuille de tableur. read.csv() importe directement un fichier .csv dans un data frame.",
  },
  {
    type: "formula",
    label: "Importer un fichier .csv",
    formula: "donnees <- read.csv('meteo_communes.csv')",
    note: "donnees est désormais un data frame en mémoire, visible dans le panneau Environnement. Le chemin est relatif au répertoire de travail courant (getwd() l'affiche ; setwd() le change, ou mieux : ouvrir RStudio via un fichier .Rproj, voir piste Master/Recherche sur here::here()).",
  },
  {
    type: "callout",
    tone: "warning",
    title: "read.csv() ou read.csv2() ? Un piège très fréquent en France",
    text: "read.csv() attend une virgule comme séparateur de colonnes et un point comme séparateur décimal (convention anglo-saxonne). Un fichier exporté depuis Excel en France utilise typiquement le point-virgule comme séparateur de colonnes et la virgule comme séparateur décimal : il faut alors read.csv2(), pas read.csv(). Un import qui ne produit qu'une seule colonne géante au lieu de plusieurs colonnes distinctes est le symptôme classique de cette confusion.",
  },
  {
    type: "list",
    items: [
      "View(donnees) : ouvre le tableau dans un onglet façon tableur, pour l'inspecter visuellement",
      "str(donnees) : affiche la structure du data frame — nombre de lignes/colonnes, type de chaque colonne, premières valeurs",
      "head(donnees) : affiche seulement les six premières lignes, utile sur un gros tableau",
      "nrow(donnees) et ncol(donnees) : nombre de lignes et de colonnes",
      "donnees$temperature : accède directement à la colonne temperature du data frame donnees",
    ],
  },

  { type: "heading", text: "5. Premier graphique avec ggplot2", level: "lycee" },
  {
    type: "paragraph",
    text: "ggplot2 (package à installer une fois avec install.packages('ggplot2'), puis à charger à chaque session avec library(ggplot2)) construit un graphique par couches successives, ajoutées avec l'opérateur +. En une phrase, sa grammaire des graphiques répond toujours à trois questions : quelles données (data), quelle correspondance entre une colonne et un élément visuel (aes, les esthétiques : axe x, axe y, couleur…), et quelle forme géométrique représente chaque observation (geom_point pour des points, geom_bar/geom_col pour des barres…).",
  },
  {
    type: "formula",
    label: "Nuage de points avec ggplot2",
    formula: "ggplot(donnees, aes(x = altitude, y = temperature)) +\n  geom_point()",
    note: "ggplot(donnees, aes(...)) prépare le système d'axes à partir du data frame donnees ; + geom_point() ajoute la couche qui dessine effectivement un point par ligne du tableau. Chaque + ajoute une couche supplémentaire sans jamais retirer les précédentes.",
  },
  {
    type: "formula",
    label: "Diagramme en barres avec ggplot2",
    formula: "ggplot(donnees, aes(x = commune, y = temperature)) +\n  geom_col()",
    note: "geom_col() dessine une barre dont la hauteur vaut directement la valeur de y (contrairement à geom_bar(), qui compte par défaut le nombre d'observations par catégorie plutôt que de lire une colonne de hauteur).",
  },
  {
    type: "callout",
    tone: "info",
    title: "L'opérateur + n'est pas une addition arithmétique ici",
    text: "Dans ggplot(...) + geom_point() + labs(title = '...'), le + empile des couches graphiques (données, géométrie, habillage) les unes sur les autres, comme des calques QGIS superposés. C'est une syntaxe propre à ggplot2, à ne pas confondre avec le pipe |> vu en section suivante, qui enchaîne lui des étapes de traitement sur un tableau, pas des couches graphiques.",
  },

  { type: "heading", text: "6. Filtrer et trier avec dplyr, le pipe natif", level: "lycee" },
  {
    type: "paragraph",
    text: "Le package dplyr fournit des verbes simples pour manipuler un data frame : filter() garde seulement certaines lignes selon une condition, arrange() les trie selon une colonne. Le pipe natif |> (disponible depuis R 4.1, sans package supplémentaire) enchaîne plusieurs étapes en les lisant de gauche à droite, comme une phrase.",
  },
  {
    type: "formula",
    label: "Filtrer puis trier avec le pipe",
    formula: "donnees |>\n  filter(temperature > 20) |>\n  arrange(desc(temperature))",
    note: "Se lit : « prends donnees, PUIS garde les lignes où temperature > 20, PUIS trie par température décroissante (desc()) ». Sans le pipe, la même opération s'écrirait arrange(filter(donnees, temperature > 20), desc(temperature)) — techniquement identique, mais lue de l'intérieur vers l'extérieur, dans l'ordre inverse des étapes réellement effectuées.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi le pipe se lit plus naturellement",
    text: "Une suite d'opérations imbriquées (arrange(filter(select(donnees, commune, temperature), temperature > 20), desc(temperature))) oblige à lire de l'intérieur vers l'extérieur pour reconstituer l'ordre réel des étapes. La même suite avec |> se lit dans l'ordre où elle s'exécute réellement, du haut vers le bas — un gain de lisibilité qui devient décisif dès qu'une chaîne dépasse deux ou trois étapes (voir la piste Licence/BUT).",
  },
  {
    type: "devoir",
    format: "Script R commenté",
    title: "Analyser un relevé météo communal",
    prompt: "Importe un tableau météo (température moyenne par commune, une colonne commune et une colonne temperature — utilise un relevé public téléchargé ou un tableau que tu construis toi-même à partir de dix communes de ta région) avec read.csv() ou read.csv2() selon son format. Produis un graphique ggplot2 (geom_col ou geom_point) montrant la température par commune, avec un titre et des axes nommés via labs(). Ajoute un filtre dplyr qui ne garde que les communes au-dessus de la température moyenne, calculée avec mean().",
    criteria: [
      "Le bon séparateur (read.csv ou read.csv2) a été identifié et l'import ne produit pas une colonne unique mal découpée",
      "Le graphique porte un titre et des axes nommés (labs(title = ..., x = ..., y = ...))",
      "Le filtre dplyr utilise effectivement la moyenne calculée avec mean(), pas un seuil choisi au hasard",
      "Le script est commenté (lignes commençant par #) pour expliquer chaque étape à quelqu'un qui le lirait après coup",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : R exécute le code, RStudio l'entoure d'une interface (Console, Script, Environnement, Fichiers/Graphiques) ; <- affecte une valeur à une variable, class() en donne le type ; c() construit un vecteur, mean()/sum()/length() le résument, ?fonction ouvre l'aide intégrée ; read.csv()/read.csv2() importe un tableau en data frame (str(), head(), View() pour l'inspecter) ; ggplot2 empile des couches avec + (données, esthétiques aes(), géométrie geom_...()) ; dplyr filtre (filter()) et trie (arrange()), le pipe |> enchaîne les étapes dans leur ordre réel d'exécution.",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Voir aussi : les mêmes opérations, en interface graphique",
    description: "Le module Le Compas présente les mêmes gestes (filtrer, trier, représenter) directement dans l'interface de QGIS, sans écrire de code.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Le tidyverse en pratique", level: "superieur" },
  {
    type: "paragraph",
    text: "Le tidyverse (Hadley Wickham) est une collection cohérente de packages qui partagent une même philosophie de données « nettes » (tidy data, Wickham 2014) : une observation par ligne, une variable par colonne. dplyr manipule les lignes/colonnes d'un tableau, tidyr en restructure la forme, ggplot2 le visualise, purrr y applique des fonctions répétitives — tous conçus pour s'enchaîner avec le pipe |>.",
  },
  {
    type: "formula",
    label: "Charger le tidyverse",
    formula: "install.packages('tidyverse')  # une seule fois\nlibrary(tidyverse)              # à chaque session",
    note: "library(tidyverse) charge en réalité une dizaine de packages d'un coup (dplyr, tidyr, ggplot2, readr, purrr, tibble, stringr, forcats…), plutôt que de les charger un par un.",
  },
  {
    type: "formula",
    label: "mutate() et group_by()/summarise() : créer et résumer par groupe",
    formula: "donnees |>\n  group_by(region) |>\n  summarise(temp_moyenne = mean(temperature, na.rm = TRUE), n = n())",
    note: "mutate() ajoute une nouvelle colonne calculée à partir des existantes (ex. donnees |> mutate(ecart = temperature - temp_moyenne)) ; group_by() découpe le tableau en sous-groupes invisibles (ici, par région) ; summarise() réduit chaque groupe à une seule ligne de statistiques. na.rm = TRUE retire les valeurs manquantes (NA) avant le calcul de la moyenne — un oubli fréquent qui fait échouer silencieusement mean() en renvoyant NA.",
  },
  {
    type: "formula",
    label: "tidyr : pivot_longer() pour empiler des colonnes",
    formula: "pivot_longer(donnees,\n  cols = c(ndvi_2020, ndvi_2021),\n  names_to = 'annee',\n  values_to = 'ndvi')",
    note: "Transforme deux colonnes ndvi_2020/ndvi_2021 (format large, une colonne par année) en deux colonnes annee/ndvi (format long, une ligne par observation-année) — le format qu'attend justement ggplot2 pour comparer plusieurs années sur un même graphique. pivot_wider() effectue l'opération inverse.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Format large ou format long : ggplot2 veut du format long",
    text: "Un tableau au format large (une colonne par année de mesure) est lisible pour un humain mais inutilisable directement pour tracer une évolution temporelle avec ggplot2, qui a besoin d'une seule colonne valeur et d'une colonne date/année à mettre en aes(). pivot_longer() est presque toujours la première étape avant un graphique temporel ou une facette (section suivante).",
  },

  { type: "heading", text: "2. ggplot2 approfondi : facettes, échelles, cartes", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà d'un graphique unique, ggplot2 permet de dupliquer automatiquement un même graphique pour chaque sous-groupe (facette), de contrôler explicitement les échelles de couleur ou d'axe, et de représenter directement une géométrie spatiale avec geom_sf() — la carte choroplèthe devient alors un graphique ggplot2 comme un autre.",
  },
  {
    type: "formula",
    label: "facet_wrap() : un panneau par région",
    formula: "ggplot(donnees, aes(x = annee, y = ndvi)) +\n  geom_line() +\n  facet_wrap(~ region)",
    note: "facet_wrap(~ region) répète le même graphique (ici une courbe géom_line) une fois par valeur distincte de region, sur une grille de panneaux, sans qu'il soit nécessaire de filtrer et retracer manuellement chaque région une à une.",
  },
  {
    type: "formula",
    label: "Carte choroplèthe avec geom_sf()",
    formula: "ggplot(communes) +\n  geom_sf(aes(fill = densite)) +\n  scale_fill_viridis_c() +\n  theme_minimal()",
    note: "geom_sf() lit directement la colonne géométrie d'un objet sf (section 3) sans conversion préalable. scale_fill_viridis_c() applique une palette continue perceptuellement uniforme (viridis) plutôt que la palette arc-en-ciel par défaut, souvent trompeuse pour une donnée quantitative. theme_minimal() retire le fond gris par défaut de ggplot2.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Une seule syntaxe, deux usages",
    text: "geom_sf() se combine avec les mêmes outils que n'importe quel autre graphique ggplot2 déjà vus (facet_wrap(~ annee) pour comparer plusieurs dates côte à côte, labs() pour le titre, theme() pour l'habillage) : cartographier avec ggplot2 n'introduit aucune nouvelle grammaire, seulement une nouvelle géométrie au sein de celle déjà apprise.",
  },

  { type: "heading", text: "3. Le package sf : données vectorielles", level: "superieur" },
  {
    type: "paragraph",
    text: "sf (Simple Features, norme ISO 19125 reprise par l'OGC) est le package de référence pour manipuler des données vectorielles en R : chaque géométrie (point, ligne, polygone) est stockée dans une colonne spéciale (geometry) d'un data frame ordinaire — un objet sf reste un data frame, manipulable avec tous les verbes dplyr déjà vus, avec cette seule colonne en plus.",
  },
  {
    type: "formula",
    label: "Lire une couche et gérer son CRS",
    formula: "communes <- st_read('communes.gpkg')\nst_crs(communes)\ncommunes_l93 <- st_transform(communes, crs = 2154)",
    note: "st_read() accepte Shapefile, GeoPackage, GeoJSON et la plupart des formats vectoriels courants, détectés automatiquement par extension. st_crs() affiche le système de coordonnées courant ; st_transform() reprojette — ici vers l'EPSG:2154 (Lambert-93), indispensable avant tout calcul de distance ou de surface (module Fondements).",
  },
  {
    type: "callout",
    tone: "rappel",
    title: "Rappel : un CRS géographique ne mesure pas en mètres",
    text: "Comme en QGIS, un objet sf resté en coordonnées géographiques (EPSG:4326, degrés) renvoie des distances et surfaces en degrés si on omet st_transform() vers un CRS projeté avant st_buffer() ou st_area() (voir module Fondements et le module Le Compas) — une erreur silencieuse : R n'avertit pas automatiquement que le résultat est dans une unité inutilisable.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Un objet sf reste un data frame",
    text: "class(communes) renvoie à la fois 'sf' et 'data.frame' : toute la syntaxe dplyr déjà apprise (filter(communes, population > 10000), communes |> mutate(...)) fonctionne directement sur un objet sf, colonne géométrie comprise, sans changer d'outil ni de syntaxe.",
  },

  { type: "heading", text: "4. Opérations spatiales avec sf", level: "superieur" },
  {
    type: "paragraph",
    text: "sf implémente directement en R les opérations spatiales vues sous QGIS (module Le Compas) ou GeoPandas en Python : buffer, intersection, jointure spatiale. La correspondance entre l'outil graphique et la fonction R est presque toujours directe.",
  },
  {
    type: "table",
    headers: ["Fonction sf", "Équivalent QGIS/GeoPandas", "Usage"],
    rows: [
      ["st_buffer(x, dist = 200)", "Buffer (zone tampon)", "Zone de 200 m autour d'une géométrie"],
      ["st_intersection(a, b)", "Intersection", "Partie commune entre deux couches"],
      ["st_union(x)", "Dissolve / Union", "Fusionne des géométries en une seule"],
      ["st_difference(a, b)", "Différence", "Retire d'une couche ce qui recoupe une autre"],
      ["st_join(a, b)", "Jointure spatiale", "Associe les attributs de b à a selon leur position"],
    ],
  },
  {
    type: "formula",
    label: "Buffer, intersection et jointure spatiale",
    formula: "zone_tampon <- st_buffer(riviere, dist = 200)\nparcelles_inondables <- st_intersection(parcelles, zone_inondable)\nbatiments_communes <- st_join(batiments, communes, join = st_within)",
    note: "st_join() prend un argument join qui précise la relation spatiale testée (st_within, st_intersects, st_touches…) — exactement les mêmes relations spatiales qu'un générateur d'expressions QGIS (« Sélection par emplacement »), mais exprimées comme argument de fonction plutôt que choisies dans un menu déroulant.",
  },
  {
    type: "link",
    to: "/module/qgis",
    label: "Comparer : les mêmes opérations, en interface QGIS",
    description: "Le module QGIS détaille buffer, intersection, jointure spatiale et Clip cliqués dans l'interface — sf en est l'équivalent direct en code.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir la théorie : les cinq opérations spatiales de base",
    description: "Le module Le Compas explique la logique d'ensemble (buffer, intersection, union, différence, jointure) que sf implémente ici fonction par fonction.",
  },

  { type: "heading", text: "5. Rasters avec terra", level: "superieur" },
  {
    type: "paragraph",
    text: "terra (successeur du package raster, aujourd'hui déprécié) manipule les données raster : charger une image, en extraire des valeurs, calculer des statistiques par zone — l'équivalent direct des statistiques de zone vues sous QGIS ou de zonal_stats en Python.",
  },
  {
    type: "formula",
    label: "Charger un raster et calculer des statistiques de zone",
    formula: "r <- rast('ndvi.tif')\nstats_ndvi <- extract(r, vect(parcelles), fun = mean, na.rm = TRUE)",
    note: "rast() charge un raster (GeoTIFF, entre autres formats). vect(parcelles) convertit un objet sf en objet vect propre à terra. extract() résume les valeurs du raster r à l'intérieur de chaque polygone de parcelles selon la fonction fun (mean, sum, max…) — le NDVI moyen de chaque parcelle plutôt que sa valeur pixel par pixel, exactement comme les statistiques de zone du module Le Compas.",
  },
  {
    type: "callout",
    tone: "info",
    title: "terra remplace raster",
    text: "Le package raster (Robert Hijmans, historique dans l'écosystème R spatial) reste documenté dans une grande partie de la littérature et des tutoriels plus anciens, mais terra, du même auteur, est aujourd'hui la référence : syntaxe proche, mais bien plus rapide sur de gros rasters. Tout nouveau script gagne à utiliser terra directement plutôt que raster.",
  },

  { type: "heading", text: "6. Cartographie avec tmap", level: "superieur" },
  {
    type: "paragraph",
    text: "tmap (« thematic maps ») produit des cartes soignées à partir d'objets sf/terra avec une syntaxe proche de ggplot2 (couches empilées avec +), mais pensée spécifiquement pour la cartographie thématique : légende automatique, échelle, flèche du nord, export direct.",
  },
  {
    type: "formula",
    label: "Carte statique puis interactive avec tmap",
    formula: "tmap_mode('plot')\ncarte <- tm_shape(communes) + tm_polygons(col = 'densite', palette = 'viridis')\ntmap_mode('view')\ncarte  # la même carte, maintenant interactive (fond Leaflet)",
    note: "tmap_mode('plot') produit une carte statique imprimable ; tmap_mode('view') affiche exactement le même objet carte en mode interactif, avec zoom et fond de carte web (via Leaflet), sans réécrire une seule ligne de code de la carte elle-même — seul le mode global change.",
  },
  {
    type: "formula",
    label: "Exporter une carte",
    formula: "tmap_save(carte, 'carte_densite.png', width = 2000, height = 1500)",
  },

  { type: "heading", text: "7. Fonctions personnalisées et boucles", level: "superieur" },
  {
    type: "paragraph",
    text: "Répéter un même traitement (charger un fichier, calculer une statistique de zone) sur plusieurs jeux de données identiques ne doit jamais se faire en copiant-collant le même bloc de code plusieurs fois : une fonction personnalisée factorise ce bloc une fois pour toutes, une boucle for ou la famille apply/purrr::map l'applique ensuite à chaque élément.",
  },
  {
    type: "formula",
    label: "Définir une fonction personnalisée",
    formula: "calculer_stats_zone <- function(raster, polygones) {\n  extract(raster, vect(polygones), fun = mean, na.rm = TRUE)\n}",
    note: "function(raster, polygones) { ... } définit une fonction réutilisable prenant deux arguments : une fois écrite, calculer_stats_zone(r, parcelles) remplace tout un bloc qu'il aurait fallu recopier à chaque usage.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Boucle for",
        points: [
          "for (fichier in liste_fichiers) { ... } : syntaxe familière, proche d'autres langages",
          "Utile quand chaque itération produit un effet de bord (écrire un fichier, afficher un graphique)",
          "Nécessite de préallouer le résultat à l'avance pour rester performant",
        ],
      },
      {
        label: "purrr::map()",
        points: [
          "map(liste_fichiers, read.csv) : applique une fonction à chaque élément, renvoie toujours une liste",
          "map_dbl(), map_chr() : variantes qui renvoient directement un vecteur numérique/texte plutôt qu'une liste",
          "S'enchaîne naturellement avec le pipe |>, dans l'esprit tidyverse",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais faire grandir un vecteur ligne par ligne dans une boucle",
    text: "resultats <- c() suivi de resultats <- c(resultats, nouvelle_valeur) à chaque itération d'une boucle recopie tout le vecteur en mémoire à chaque tour : sur quelques dizaines d'éléments cela ne se voit pas, mais sur plusieurs milliers de fichiers le script devient dramatiquement lent. Préallouer le vecteur à sa taille finale (resultats <- vector('numeric', length(liste_fichiers))) avant la boucle, ou utiliser directement purrr::map_dbl(), évite ce piège classique.",
  },
  {
    type: "formula",
    label: "sapply() : la famille apply de base R",
    formula: "sapply(1:10, function(x) x^2)",
    note: "sapply() (et sa cousine lapply(), qui renvoie toujours une liste) appartient à base R, sans dépendre du tidyverse : une alternative légitime à purrr::map() quand on ne charge pas le tidyverse en entier pour un script court.",
  },

  { type: "heading", text: "8. R Markdown : un rapport reproductible", level: "superieur" },
  {
    type: "paragraph",
    text: "Un fichier R Markdown (.Rmd) mêle du texte rédigé (en Markdown, un format de texte léger) et des blocs de code R exécutables (chunks), le tout compilé par le package knitr en un document final (HTML, PDF, Word) où texte, code et résultats (tableaux, graphiques) restent toujours synchronisés : modifier une donnée source et recompiler regénère automatiquement tous les chiffres et graphiques du rapport, sans copier-coller manuel.",
  },
  {
    type: "formula",
    label: "Structure minimale d'un fichier .Rmd",
    formula: "---\ntitle: 'Rapport météo communal'\noutput: html_document\n---\n\nLa température moyenne observée est de `r round(mean(donnees$temperature), 1)` °C.\n\n```{r}\nggplot(donnees, aes(x = commune, y = temperature)) + geom_col()\n```",
    note: "L'en-tête entre --- (YAML) définit le titre et le format de sortie. `r ...` insère un résultat R calculé directement dans une phrase de texte courant. Un bloc ```{r} ... ``` exécute du code R et insère son résultat (tableau, graphique) dans le document final — c'est knitr qui orchestre cette compilation, invoqué par le bouton « Knit » de RStudio.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi c'est plus fiable qu'un copier-coller Word/Excel",
    text: "Un rapport rédigé en recopiant à la main un chiffre calculé dans R vers un document Word se désynchronise au premier changement de donnée : le chiffre affiché dans Word reste l'ancien tant que quelqu'un ne pense pas à le mettre à jour manuellement. Un chunk `r round(mean(donnees$temperature), 1)` recalcule et réinsère automatiquement la bonne valeur à chaque recompilation du .Rmd — aucune désynchronisation possible entre le texte et la donnée.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : le tidyverse (dplyr, tidyr, ggplot2, purrr…) partage la même philosophie de données nettes et s'enchaîne avec |> ; facet_wrap() duplique un graphique par sous-groupe, geom_sf() cartographie directement un objet sf ; sf stocke la géométrie comme colonne d'un data frame (st_read, st_transform, st_crs) et implémente buffer/intersection/jointure (st_buffer, st_intersection, st_join) ; terra gère les rasters (rast(), extract() pour les statistiques de zone) ; tmap produit des cartes soignées, statiques ou interactives (tmap_mode) ; une fonction personnalisée puis une boucle for ou purrr::map() évitent de recopier du code, à condition de préallouer ; R Markdown compile texte et code en un rapport toujours synchronisé avec la donnée.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Continuer : LISA, Gi* et régression spatiale, en théorie",
    description: "Le module Les Statistiques pose les concepts (LISA, Gi*, régression spatiale) que la piste Master/Recherche ci-dessous implémente directement en R.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Statistique spatiale avec spdep : recalculer Moran en R", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Le module Le Compas introduit l'indice de Moran global comme formule théorique ; le module Les Statistiques le décompose localement (LISA, Gi*). Le package spdep implémente directement ces calculs en R, à partir d'une matrice de voisinage construite explicitement plutôt qu'implicite dans un logiciel graphique.",
  },
  {
    type: "formula",
    label: "Matrice de voisinage et test de Moran",
    formula: "nb <- poly2nb(communes)\nlw <- nb2listw(nb, style = 'W')\nmoran.test(communes$taux, lw)",
    note: "poly2nb() construit la liste de voisinage à partir des polygones de communes (contiguïté par contact de frontière, par défaut). nb2listw() la convertit en objet listw pondéré (style = 'W' : pondération normalisée par ligne, chaque voisin comptant 1/nombre de voisins). moran.test(x, listw) exécute le test paramétrique de significativité de l'indice de Moran, calculé sur la variable communes$taux — la même formule I = (n/S0)·[ΣᵢΣⱼwᵢⱼ(xᵢ−x̄)(xⱼ−x̄)]/Σᵢ(xᵢ−x̄)² que le module Le Compas présente en théorie.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le choix de la matrice de voisinage n'est pas neutre",
    text: "poly2nb() accepte un argument queen (TRUE par défaut : contiguïté « reine », un simple contact de coin suffit ; FALSE : contiguïté « tour », il faut un partage de frontière) qui change la matrice de voisinage, et donc potentiellement le résultat du test — le même avertissement que le module Le Compas fait pour tout choix de pondération wᵢⱼ, à documenter systématiquement plutôt qu'à laisser à la valeur par défaut sans vérification.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir la théorie : indice de Moran et MAUP",
    description: "Le module Le Compas introduit la formule de Moran et le problème du zonage arbitraire (MAUP) que ce calcul R implémente directement.",
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Revoir la théorie : LISA et Gi*",
    description: "Le module Les Statistiques décompose Moran en indicateurs locaux (LISA) et détecte les points chauds (Gi*) — spdep fournit localmoran() et localG() pour les recalculer en R de la même façon que moran.test() ci-dessus.",
  },

  { type: "heading", text: "2. Régression spatiale avec spatialreg", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une régression classique (moindres carrés ordinaires, OLS) suppose des résidus indépendants — une hypothèse régulièrement violée sur donnée spatiale (module Les Statistiques). spatialreg ajuste des modèles qui intègrent explicitement l'autocorrélation spatiale : le modèle à retard spatial (SAR, spatial lag) et le modèle à erreur spatiale (souvent estimé comme un CAR, conditional autoregressive).",
  },
  {
    type: "formula",
    label: "OLS classique, puis diagnostic des résidus",
    formula: "modele_ols <- lm(taux ~ chomage + densite, data = communes)\nlm.morantest(modele_ols, lw)",
    note: "lm() ajuste une régression OLS ordinaire. lm.morantest() (spdep) calcule l'indice de Moran directement sur les résidus du modèle plutôt que sur la variable brute : un résultat significatif signale que l'OLS a laissé passer une structure spatiale qu'un modèle spatial expliciterait mieux.",
  },
  {
    type: "formula",
    label: "Modèle à retard spatial (SAR) et à erreur spatiale (CAR)",
    formula: "modele_sar <- lagsarlm(taux ~ chomage + densite, data = communes, listw = lw)\nmodele_car <- spautolm(taux ~ chomage + densite, data = communes, listw = lw, family = 'CAR')\nsummary(modele_sar)",
    note: "lagsarlm() ajuste un modèle à retard spatial : la valeur d'une commune dépend explicitement de la moyenne pondérée de ses voisines, en plus des variables explicatives classiques (utile quand le phénomène se diffuse, une contagion). spautolm(..., family = 'CAR') ajuste un modèle conditionnel autorégressif, qui modélise plutôt la structure spatiale dans le terme d'erreur.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "OLS (lm)",
        points: [
          "Suppose des résidus indépendants",
          "Rapide, coefficients directement interprétables",
          "Sous-estime l'incertitude réelle si les résidus sont autocorrélés spatialement",
        ],
      },
      {
        label: "SAR / CAR (spatialreg)",
        points: [
          "Intègre explicitement l'autocorrélation, via lw",
          "Coefficients plus fiables, incertitude correctement estimée",
          "Interprétation plus subtile : un coefficient SAR inclut un effet de diffusion indirect vers les voisins",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "GWR : rappel du module Les Statistiques",
    text: "SAR et CAR corrigent l'autocorrélation mais gardent un coefficient unique pour tout le territoire. La régression géographiquement pondérée (GWR, module Les Statistiques) ajuste un coefficient différent en chaque point ; le package R correspondant, spgwr, en est l'implémentation directe — non détaillé ici pour rester concentré sur la correction de l'autocorrélation résiduelle plutôt que sur la variation spatiale des coefficients.",
  },

  { type: "heading", text: "3. Géostatistique et krigeage avec gstat", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Le module Le Compas introduit le krigeage en théorie, comme méthode d'interpolation statistiquement optimale une fois le variogramme ajusté. Le package gstat en est l'implémentation R directe : de la même donnée ponctuelle aux mêmes trois paramètres (portée, palier, pépite), jusqu'à la carte krigée et sa carte d'incertitude — ce que QGIS ou TerrSet font via un module d'interpolation en interface, gstat le fait ligne de code par ligne de code, reproductible et scriptable sur autant de jeux de données que nécessaire.",
  },
  {
    type: "formula",
    label: "Variogramme expérimental, puis ajustement d'un modèle théorique",
    formula: "v <- variogram(zinc ~ 1, data = mesures)\nv_modele <- fit.variogram(v, model = vgm(psill = 1, model = 'Sph', range = 300, nugget = 0.1))\nplot(v, v_modele)",
    note: "variogram(zinc ~ 1, data = mesures) calcule le variogramme expérimental de la variable zinc sur l'objet spatial mesures (le membre droit ~ 1 signale une interpolation sans variable auxiliaire — un krigeage ordinaire). vgm() propose un modèle théorique de départ (ici sphérique, 'Sph', avec palier, portée et pépite estimés à l'œil sur le nuage expérimental) ; fit.variogram() en affine ensuite les paramètres par optimisation numérique. plot(v, v_modele) superpose le nuage expérimental et la courbe ajustée — la même figure que le diagramme théorique ci-dessous.",
  },
  {
    type: "diagram",
    name: "variogram",
    caption: "Forme typique d'un variogramme : effet de pépite à l'origine, montée jusqu'au palier, atteint à la portée — les trois paramètres que fit.variogram() estime numériquement.",
  },
  {
    type: "formula",
    label: "Krigeage ordinaire sur une grille",
    formula: "krigeage <- krige(zinc ~ 1, locations = mesures, newdata = grille, model = v_modele)",
    note: "krige() interpole la variable zinc sur chaque point/cellule de grille, en utilisant le modèle de variogramme v_modele ajusté ci-dessus. Le résultat comporte deux colonnes : var1.pred (la valeur interpolée) et var1.var (la variance de krigeage, la carte d'incertitude que ni le plus proche voisin ni l'IDW ne fournissent — le point déjà souligné dans le module Le Compas).",
  },
  {
    type: "callout",
    tone: "info",
    title: "Reproduire en code ce qu'un module graphique fait en un clic",
    text: "L'interpolation par krigeage disponible dans QGIS (via SAGA ou GRASS) ou dans TerrSet propose les mêmes trois paramètres (pépite, palier, portée) derrière une boîte de dialogue. Le faire en R avec gstat n'apporte rien de statistiquement différent, mais rend chaque étape (ajustement du variogramme, choix du modèle théorique, paramètres retenus) explicite, documentée dans un script, et immédiatement reproductible sur un nouveau jeu de mesures sans reconfigurer une interface à chaque fois.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir la théorie : variogramme, portée, palier, pépite",
    description: "Le module Le Compas introduit le krigeage et le variogramme théoriquement ; cette section en est le contrepoint direct, implémenté en R avec gstat.",
  },

  { type: "heading", text: "4. Modèles additifs généralisés pour données spatiales (mgcv)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une régression linéaire (OLS, ou même SAR/CAR ci-dessus) suppose une relation linéaire entre variables explicatives et variable à expliquer. Quand cette hypothèse ne tient pas — un NDVI qui augmente avec l'altitude jusqu'à un optimum puis rechute, par exemple — un modèle additif généralisé (GAM, package mgcv) ajuste une courbe lisse plutôt qu'une droite, sans imposer sa forme à l'avance.",
  },
  {
    type: "formula",
    label: "GAM avec lissage spatial",
    formula: "modele_gam <- gam(ndvi ~ s(altitude) + s(x, y), data = donnees)\nsummary(modele_gam)\nplot(modele_gam)",
    note: "s(altitude) ajuste une courbe lisse (spline) plutôt qu'une droite pour l'effet de l'altitude, dont la forme n'est pas imposée à l'avance mais estimée à partir des données elles-mêmes. s(x, y) ajoute un lissage bidimensionnel des coordonnées, qui capture une tendance spatiale résiduelle non expliquée par les variables explicatives — une alternative continue au découpage discret d'un modèle SAR/CAR. plot(modele_gam) trace chaque courbe lisse ajustée séparément.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Quand préférer un GAM à une régression spatiale",
    text: "Un GAM s'impose quand le doute porte sur la forme de la relation elle-même (linéaire ou non), tandis que SAR/CAR s'imposent quand la relation est linéaire mais que ce sont les résidus qui restent spatialement structurés. Les deux logiques peuvent se combiner (un GAM avec un terme s(x, y) joue en partie ce rôle), mais partent d'un diagnostic différent : non-linéarité contre autocorrélation résiduelle.",
  },

  { type: "heading", text: "5. Simulation Monte Carlo, bootstrap spatial et tests de permutation", level: "approfondissement" },
  {
    type: "paragraph",
    text: "moran.test() (section 1) est un test paramétrique : il suppose que l'indice de Moran suit, sous l'hypothèse nulle d'absence d'autocorrélation, une distribution théorique connue. Un test de permutation construit à la place cette distribution empiriquement, en recalculant l'indice sur des milliers de réarrangements aléatoires de la même donnée — sans supposer aucune forme théorique a priori.",
  },
  {
    type: "formula",
    label: "moran.mc() : test de Moran par permutation (Monte Carlo)",
    formula: "moran.mc(communes$taux, lw, nsim = 999)",
    note: "moran.mc() recalcule l'indice de Moran sur nsim = 999 permutations aléatoires des valeurs de communes$taux entre les entités (la position géographique reste fixe, seules les valeurs sont mélangées), puis situe l'indice réellement observé dans cette distribution simulée. Une valeur observée extrême par rapport aux 999 simulations (p ≈ rang / (nsim + 1)) signale une autocorrélation significative, sans dépendre d'une hypothèse de normalité sous-jacente comme moran.test().",
  },
  {
    type: "comparison",
    items: [
      {
        label: "moran.test() — paramétrique",
        points: [
          "Suppose une distribution théorique connue sous l'hypothèse nulle",
          "Calcul immédiat, aucune simulation nécessaire",
          "Moins fiable si les hypothèses distributionnelles sont mal respectées (petits échantillons, valeurs extrêmes)",
        ],
      },
      {
        label: "moran.mc() — permutation",
        points: [
          "Construit la distribution empiriquement par simulation (nsim répétitions)",
          "Aucune hypothèse de normalité requise",
          "Plus coûteux en calcul, mais plus robuste sur données irrégulières",
        ],
      },
    ],
  },
  {
    type: "formula",
    label: "Bootstrap manuel : ré-échantillonner avec remise",
    formula: "moyennes_bootstrap <- replicate(1000, mean(sample(communes$taux, replace = TRUE)))\nquantile(moyennes_bootstrap, c(0.025, 0.975))",
    note: "sample(x, replace = TRUE) tire un nouvel échantillon de même taille que x, avec remise (une même valeur peut être tirée plusieurs fois). replicate(1000, ...) répète l'opération 1000 fois et empile les résultats. quantile(..., c(0.025, 0.975)) donne un intervalle de confiance empirique à 95 %, sans supposer de distribution théorique pour la moyenne — le même principe que moran.mc() ci-dessus, appliqué ici à une statistique non spatiale pour en montrer la généralité.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un bootstrap naïf ignore encore la dépendance spatiale",
    text: "sample(communes$taux, replace = TRUE) traite chaque commune comme un tirage indépendant, en ignorant sa position — exactement le biais de pseudoréplication déjà signalé dans le module Les Statistiques. Un bootstrap spatial correct (par blocs géographiques contigus plutôt que par entité isolée, ou en conservant la structure de voisinage à chaque ré-échantillonnage) est nécessaire dès que la donnée elle-même est spatialement autocorrélée, sous peine de sous-estimer l'incertitude réelle malgré l'apparence de rigueur d'une méthode de rééchantillonnage.",
  },

  { type: "heading", text: "6. Reproductibilité : renv, here, Git", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un script qui fonctionne aujourd'hui peut cesser de fonctionner dans un an si les packages installés ont changé de version entre-temps (une fonction renommée, un comportement par défaut modifié). Trois pratiques garantissent qu'un projet R reste reproductible : verrouiller les versions de packages, ne jamais dépendre d'un chemin de fichier absolu, et suivre l'évolution du code avec Git.",
  },
  {
    type: "formula",
    label: "renv : verrouiller les versions de packages d'un projet",
    formula: "renv::init()       # démarre un environnement isolé pour ce projet\nrenv::snapshot()   # enregistre les versions exactes des packages utilisés dans renv.lock\nrenv::restore()    # réinstalle exactement ces versions sur une autre machine",
    note: "renv.lock (un fichier texte versionnable avec Git) fixe la version exacte de chaque package utilisé. Une autre personne (ou soi-même, un an plus tard) qui clone le projet et lance renv::restore() retrouve un environnement R identique, package par package — le même problème que résout requirements.txt en Python, ou renv.lock lui-même documente.",
  },
  {
    type: "formula",
    label: "here::here() : des chemins relatifs au projet, pas à la machine",
    formula: "donnees <- read.csv(here::here('data', 'communes.csv'))",
    note: "here::here() construit un chemin relatif à la racine du projet (repérée automatiquement via le fichier .Rproj ou un marqueur .here), plutôt qu'un chemin absolu (C:/Users/... ou /home/...) qui ne fonctionne que sur la machine où le script a été écrit. Un script qui utilise here::here() partout s'exécute à l'identique une fois le dossier du projet copié ou cloné ailleurs.",
  },
  {
    type: "list",
    items: [
      "renv verrouille les versions de packages (renv.lock), Git verrouille les versions du code lui-même : les deux se complètent, l'un sans l'autre laisse la reproductibilité incomplète",
      "RStudio intègre un panneau Git natif (onglet Git, en haut à droite) : commit, historique, diff visuel, sans quitter l'IDE",
      "Un .gitignore de projet R exclut typiquement .Rhistory, .RData et le dossier renv/library (les binaires de packages, régénérés par renv::restore(), n'ont pas leur place dans l'historique Git)",
    ],
  },
  {
    type: "link",
    to: "/module/vscode",
    label: "Aller plus loin sur Git",
    description: "Le module VS Code détaille Git en profondeur (branches, historique, résolution de conflits) au-delà du panneau Git intégré de RStudio, suffisant pour un usage courant mais plus limité.",
  },

  { type: "heading", text: "7. Quarto et R Markdown avancé : rapports paramétrés", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Quarto (successeur multi-langage de R Markdown, même principe de chunks exécutables mêlés à du texte) permet de paramétrer un rapport : plutôt que de rédiger un rapport par commune à la main, un unique fichier .qmd, écrit une fois, se recompile automatiquement pour chaque commune en substituant un paramètre.",
  },
  {
    type: "formula",
    label: "Paramètres déclarés dans l'en-tête YAML d'un .qmd",
    formula: "---\ntitle: 'Bilan climatique'\nformat: html\nparams:\n  region: 'Occitanie'\n---\n\nBilan pour la région `r params$region`.",
    note: "params: region: 'Occitanie' déclare une valeur par défaut. Dans le corps du document, params$region la réutilise partout où le rapport doit s'adapter à la région choisie (titre, filtre dplyr, sous-titre de graphique).",
  },
  {
    type: "formula",
    label: "Générer automatiquement un rapport par région",
    formula: "regions <- c('Occitanie', 'Bretagne', 'Grand Est')\nfor (r in regions) {\n  quarto::quarto_render('bilan.qmd',\n    output_file = paste0('bilan_', r, '.html'),\n    execute_params = list(region = r))\n}",
    note: "Une boucle for combinée à quarto_render() (package quarto) recompile bilan.qmd une fois par élément de regions, en changeant execute_params à chaque tour : trois rapports HTML distincts générés automatiquement, sans jamais rouvrir ni modifier le fichier source à la main — la même logique d'automatisation qu'un script PyQGIS/GeoPandas sur cinquante fichiers, appliquée ici à la production de rapports plutôt qu'à un traitement géographique.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Le même principe qu'un mailing, appliqué à un rapport de données",
    text: "Produire un rapport paramétré par commune, département ou année revient au même geste qu'un publipostage de courrier type : un seul gabarit, une liste de valeurs à substituer, autant de documents finaux générés que d'éléments dans la liste — sauf qu'ici chaque document recalcule aussi ses propres chiffres et graphiques à partir de la donnée réelle, pas seulement un nom et une adresse.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : spdep recalcule Moran en R (poly2nb, nb2listw, moran.test), matrice de voisinage à documenter comme tout choix méthodologique ; spatialreg corrige l'autocorrélation résiduelle qu'une OLS classique ignore (lagsarlm, spautolm), au prix d'une interprétation plus subtile des coefficients ; gstat implémente le krigeage de bout en bout (variogram, fit.variogram, krige), la contrepartie directe et reproductible d'un module d'interpolation graphique ; mgcv::gam() ajuste une relation non linéaire sans lui imposer de forme a priori ; moran.mc() et le bootstrap testent par simulation, sans hypothèse de distribution théorique, à condition de respecter la dépendance spatiale dans le rééchantillonnage ; renv verrouille les packages, here::here() les chemins, Git le code — les trois ensemble garantissent la reproductibilité ; Quarto paramétré automatise la production de rapports en substituant un paramètre à chaque recompilation.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : krigeage et interpolation en conditions réelles",
    description: "L'Atelier applique le krigeage à un jeu de données radar/pluviométrique complet — de quoi comparer directement le résultat obtenu ici en R à celui obtenu par une interface graphique.",
  },
]
