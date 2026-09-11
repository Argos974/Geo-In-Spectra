import type { ContentBlock } from "./types"

export const qgisContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Le module Le Compas présente les SIG en général et QGIS en particulier, mais reste volontairement une vue d'ensemble. Cette salle est un vrai tutoriel : installer QGIS, apprendre son interface bouton par bouton, produire une carte imprimable, puis, plus loin, automatiser des traitements entiers par script. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin, sur QGIS 3.x en version LTR (« Long Term Release », la version stable recommandée, par exemple 3.34 « Prizren »).",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Avant de commencer : à quoi sert un SIG",
    description: "Le module Le Compas pose le vocabulaire (couche, symbologie, opérations spatiales) que ce tutoriel QGIS suppose déjà connu, ou qu'il redéfinit au fil de l'eau.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Installer QGIS", level: "lycee" },
  {
    type: "paragraph",
    text: "QGIS est un logiciel libre et gratuit : il s'installe sans licence à acheter, sur Windows, macOS ou Linux, depuis le site officiel qgis.org. Deux versions sont proposées au téléchargement : ne pas s'y tromper.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Version LTR (Long Term Release)",
        points: [
          "Version stable, maintenue et corrigée pendant environ un an",
          "C'est celle que ce tutoriel utilise, et celle recommandée pour un usage scolaire ou professionnel",
          "Moins de nouveautés, mais moins de bugs de jeunesse",
        ],
      },
      {
        label: "Dernière version (Latest)",
        points: [
          "Contient les fonctionnalités les plus récentes",
          "Évolue plus vite, changements d'interface plus fréquents d'une version à l'autre",
          "À réserver à qui veut tester une fonctionnalité toute nouvelle, pas à un premier apprentissage",
        ],
      },
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Aller sur qgis.org, cliquer sur « Télécharger maintenant »",
      "Choisir l'installeur correspondant à son système d'exploitation, puis la ligne « QGIS a une version à long terme (LTR) »",
      "Lancer l'installeur téléchargé et accepter les options par défaut (elles installent aussi GDAL/OGR et les autres bibliothèques nécessaires, invisibles mais indispensables)",
      "Au premier lancement, QGIS démarre en anglais si le système n'est pas déjà en français ; la langue se change dans Préférences > Options > onglet Système > section Locale, en cochant « Ignorer les paramètres système » et en choisissant Français, puis en redémarrant QGIS",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "QGIS Desktop, pas QGIS Server",
    text: "L'installeur standard propose « QGIS Desktop » (l'application avec interface graphique, celle de ce tutoriel) : à ne pas confondre avec QGIS Server, une brique séparée qui publie des cartes sur le web (WMS/WFS, voir module Fondements) et qui ne s'installe pas de la même façon.",
  },

  { type: "heading", text: "2. Anatomie de l'interface", level: "lycee" },
  {
    type: "paragraph",
    text: "Au premier lancement, la fenêtre de QGIS peut sembler chargée : elle se compose en réalité de quelques zones bien définies, toujours aux mêmes endroits par défaut.",
  },
  {
    type: "table",
    headers: ["Zone", "Rôle"],
    rows: [
      ["Vue carte (au centre)", "Affiche les couches chargées ; navigation à la molette (zoom) et au clic-glisser (déplacement)"],
      ["Panneau des couches (Couches, à gauche)", "Liste les données chargées dans le projet ; l'ordre du haut vers le bas est l'ordre d'affichage (une couche en haut de la liste recouvre celles du dessous)"],
      ["Navigateur (à gauche, sous ou à côté des Couches)", "Explore l'arborescence des fichiers et connexions (dossiers, bases de données) sans quitter QGIS, pour glisser directement une donnée dans la vue carte"],
      ["Table attributaire", "S'ouvre par couche (clic droit sur la couche > Ouvrir la table attributaire) : chaque ligne est une entité géométrique, chaque colonne un attribut"],
      ["Barres d'outils", "Rangées de boutons regroupés par fonction : barre Carte (zoom, déplacement), barre Attributs (sélection, table), barre Numérisation (créer/modifier des géométries)"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Une barre d'outils manquante n'est pas perdue",
    text: "Si une barre d'outils ou un panneau a disparu (fermé par erreur), le menu Affichage > Barres d'outils et Affichage > Panneaux les réaffichent tous, cochés ou décochés individuellement — rien n'est jamais supprimé définitivement, seulement masqué.",
  },
  {
    type: "table",
    headers: ["Outil de la barre Numérisation", "Rôle"],
    rows: [
      ["Basculer l'édition (icône crayon)", "Active/désactive le mode modification d'une couche ; obligatoire avant de pouvoir créer ou modifier une géométrie"],
      ["Ajouter une entité (point/ligne/polygone)", "Dessine une nouvelle géométrie, clic par clic ; double-clic ou clic droit pour terminer un tracé"],
      ["Déplacer/modifier un sommet", "Sélectionne et déplace un point d'une géométrie déjà tracée"],
      ["Enregistrer les modifications de la couche", "Écrit les modifications sur le disque ; rien n'est définitif tant que ce bouton n'a pas été utilisé"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "L'accrochage (snapping) évite les micro-trous entre géométries",
    text: "Sans accrochage activé (icône aimant, barre Numérisation, ou menu Projet > Options d'accrochage), deux polygones censés partager exactement le même bord se dessinent avec un écart invisible à l'œil mais réel dans les coordonnées — une source classique d'erreurs de topologie. Activer l'accrochage aux sommets et aux segments avant toute numérisation qui doit rester jointive avec une couche existante.",
  },

  { type: "heading", text: "3. Charger une première donnée", level: "lycee" },
  {
    type: "paragraph",
    text: "QGIS distingue deux grandes familles de données géographiques, chacune avec sa propre méthode de chargement : le vecteur (points, lignes, polygones, avec une table d'attributs) et le raster (une grille régulière de pixels, une image satellite ou un fond topographique).",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Couche vecteur (GeoJSON, Shapefile .shp) : menu Couche > Ajouter une couche > Couche vecteur…, ou plus simplement glisser-déposer le fichier depuis l'explorateur de fichiers directement dans la vue carte",
      "Couche raster (GeoTIFF .tif) : menu Couche > Ajouter une couche > Couche raster…, même principe de glisser-déposer possible",
      "Une fois chargée, chaque couche apparaît dans le panneau des Couches avec une case à cocher : décocher masque la couche sans la supprimer du projet",
      "Réorganiser l'ordre d'affichage : cliquer-glisser une couche vers le haut ou le bas de la liste ; un raster placé au-dessus d'un vecteur le recouvrira entièrement",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un Shapefile, ce sont plusieurs fichiers",
    text: "Un Shapefile n'est jamais un seul fichier : .shp (géométries), .dbf (attributs), .shx (index) et souvent .prj (système de coordonnées) doivent rester ensemble dans le même dossier, sous le même nom, sinon QGIS refuse de le charger ou le charge sans son CRS. Le format GeoPackage (.gpkg), plus récent, évite ce problème en regroupant tout dans un seul fichier — à préférer quand c'est possible.",
  },

  { type: "heading", text: "4. Le système de coordonnées du projet (CRS)", level: "lycee" },
  {
    type: "paragraph",
    text: "Chaque couche chargée a son propre système de coordonnées de référence (CRS), mais le projet QGIS lui-même en a un aussi, affiché en permanence dans le coin inférieur droit de la fenêtre.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Reprojection à la volée : un affichage, pas un calcul",
    text: "QGIS reprojette automatiquement à l'affichage toute couche dont le CRS diffère de celui du projet (« reprojection à la volée ») : deux couches en systèmes différents s'alignent visuellement sans manipulation. Mais cette reprojection est purement visuelle : un calcul de distance ou de surface (voir section 5) doit toujours se faire dans un système de coordonnées projeté et métrique. Vérifier le CRS du projet avant tout calcul est un réflexe, détaillé dans le module Fondements.",
  },
  {
    type: "link",
    to: "/module/fondamentaux",
    label: "Rappel : systèmes de coordonnées et projections",
    description: "Le module Fondements explique la différence entre CRS géographique (degrés) et CRS projeté (mètres), et pourquoi elle change tout pour un calcul de surface.",
  },

  { type: "heading", text: "5. La table attributaire : trier, sélectionner, calculer", level: "lycee" },
  {
    type: "list",
    items: [
      "Trier : cliquer sur l'en-tête d'une colonne de la table attributaire trie toutes les lignes selon cette colonne, un second clic inverse l'ordre",
      "Sélectionner : cliquer sur une ligne la met en surbrillance à la fois dans la table et sur la carte ; l'outil « Sélectionner des entités » (flèche jaune dans la barre Attributs) fait l'inverse, sélectionner sur la carte surligne la ligne correspondante",
      "Calculatrice de champs : icône en forme de boulier en haut de la table attributaire, ouvre le générateur d'expressions pour créer un nouveau champ calculé à partir d'une formule",
    ],
  },
  {
    type: "formula",
    label: "Calculer une surface en hectares",
    formula: "$area / 10000",
    note: "$area renvoie la surface d'un polygone dans l'unité du CRS du projet (des m² en système projeté) ; diviser par 10 000 convertit en hectares. Ne fonctionne correctement que si le CRS du projet est bien un système projeté et métrique (section 4) — sinon $area renvoie une valeur en degrés carrés, sans signification physique directe.",
  },

  { type: "heading", text: "6. Symbologie : catégorisée ou graduée", level: "lycee" },
  {
    type: "paragraph",
    text: "La symbologie détermine comment une couche s'affiche. Un clic droit sur une couche > Propriétés > onglet Symbologie ouvre le réglage ; le menu déroulant en haut permet de choisir le type de rendu.",
  },
  {
    type: "table",
    headers: ["Type de rendu", "Adapté à", "Exemple"],
    rows: [
      ["Symbole unique", "Une seule catégorie, pas de variation à représenter", "Toutes les routes en une seule couleur"],
      ["Catégorisée", "Une donnée qualitative (catégories sans ordre)", "Un type d'occupation du sol par couleur (forêt, culture, bâti)"],
      ["Graduée", "Une donnée quantitative continue (un ordre existe)", "Un dégradé de couleur selon la population d'une commune"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne pas confondre catégorisée et graduée",
    text: "Appliquer une symbologie catégorisée à une donnée quantitative (une couleur différente et sans ordre pour chaque valeur de population) donne une carte illisible, sans hiérarchie visible. À l'inverse, un dégradé continu appliqué à une donnée réellement qualitative (type d'occupation du sol) laisse croire à un ordre qui n'existe pas. Le choix du type de rendu doit correspondre à la nature de la donnée, pas à un critère esthétique.",
  },

  { type: "heading", text: "7. Mettre en page et exporter une carte", level: "lycee" },
  {
    type: "paragraph",
    text: "La vue carte de QGIS sert à travailler la donnée ; la Mise en page (Print Layout) sert à produire un document fini, destiné à être imprimé ou exporté en image/PDF, avec tous les éléments attendus d'une vraie carte.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Menu Projet > Nouvelle mise en page…, donner un nom à la mise en page",
      "Dans la fenêtre de mise en page : Ajouter un élément > Ajouter une carte, puis dessiner un rectangle dans la page pour y placer la vue carte actuelle",
      "Ajouter une légende (Ajouter un élément > Ajouter une légende) : elle se remplit automatiquement à partir des couches visibles",
      "Ajouter une barre d'échelle (Ajouter un élément > Ajouter une barre d'échelle) et une flèche du nord (Ajouter un élément > Ajouter une image, puis choisir un motif de flèche du nord dans la bibliothèque intégrée)",
      "Exporter : menu Mise en page > Exporter en image… ou Exporter en PDF…",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une carte sans légende, échelle ni orientation n'est pas une carte",
    text: "Ces trois éléments ne sont pas décoratifs : sans légende, les couleurs restent muettes ; sans échelle, aucune distance n'est interprétable ; sans flèche du nord (ou sans grille de coordonnées), l'orientation n'est jamais garantie évidente selon la zone cartographiée. Une mise en page qui en oublie un reste, au sens strict, incomplète — voir le module La Méthode sur la sémiologie graphique.",
  },

  { type: "heading", text: "8. Enregistrer et organiser son projet", level: "lycee" },
  {
    type: "paragraph",
    text: "Un projet QGIS (menu Projet > Enregistrer sous…) ne contient pas les données elles-mêmes : il enregistre seulement les chemins vers les fichiers chargés, leur symbologie et la mise en page. Déplacer ou renommer un fichier de données après coup casse le lien, et QGIS affiche la couche comme manquante à la réouverture.",
  },
  {
    type: "list",
    items: [
      "Garder toutes les données d'un projet dans un même dossier, à côté du fichier projet (.qgz), plutôt que dispersées sur le disque",
      "Le format .qgz (par défaut depuis QGIS 3) est une archive compressée ; l'alternative .qgs est un simple fichier XML texte, plus volumineux mais lisible et plus facile à suivre avec un outil de version comme Git (voir piste Master/Recherche)",
      "Un chemin relatif (Projet > Propriétés > Général > Enregistrer les chemins) permet de déplacer le dossier entier (projet + données) sans casser les liens, du moment que leur position relative ne change pas",
    ],
  },
  {
    type: "devoir",
    format: "Carte imprimée",
    title: "Reproduire une carte thématique complète",
    prompt: "À partir d'une donnée publique de ton choix (limites communales sur data.gouv.fr ou le Géoportail, par exemple), produis une carte thématique complète sous QGIS : charge la couche, choisis un champ numérique ou qualitatif pertinent, applique la symbologie adaptée (catégorisée ou graduée selon la nature du champ), puis exporte une mise en page en PDF avec légende, échelle et flèche du nord.",
    criteria: [
      "Le CRS du projet est un système projeté (par exemple EPSG:2154, Lambert-93), vérifié avant toute mesure",
      "Le type de symbologie (catégorisée/graduée) correspond à la nature réelle du champ choisi",
      "La mise en page exportée comporte une légende lisible, une barre d'échelle et une flèche du nord",
      "Le fichier projet et ses données restent regroupés dans un même dossier, rouvrables sans lien cassé",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : privilégier la version LTR pour un usage stable ; l'ordre des couches dans le panneau détermine l'ordre d'affichage ; QGIS reprojette l'affichage à la volée mais tout calcul de surface/distance exige un CRS projeté ; $area/$length calculent une géométrie directement dans la table attributaire ; catégorisée = donnée qualitative, graduée = donnée quantitative ; une mise en page exportée doit toujours porter légende, échelle et orientation ; un projet .qgz ne contient que des chemins vers les données, à garder groupées dans un même dossier.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : les premiers pas sous QGIS",
    description: "La séance 1 de l'Atelier applique directement cette prise en main sur un vrai jeu de données.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. La boîte à outils de traitement (Processing)", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà des outils accessibles depuis les menus Vecteur/Raster, QGIS regroupe des centaines d'algorithmes prêts à l'emploi dans la boîte à outils de traitement (menu Traitement > Boîte à outils, ou Ctrl+Alt+T) — beaucoup viennent en réalité de GDAL/OGR, SAGA ou GRASS, intégrés à QGIS plutôt que réécrits, ce qui explique pourquoi un même résultat porte parfois plusieurs noms selon le fournisseur choisi.",
  },
  {
    type: "list",
    items: [
      "Barre de recherche en haut du panneau : taper un mot-clé (« tampon », « clip », « statistiques ») filtre immédiatement les algorithmes correspondants, plus rapide que naviguer dans l'arborescence par catégorie",
      "Traitement > Historique : conserve la trace de chaque algorithme exécuté, avec ses paramètres exacts — utile pour reproduire ou documenter un traitement après coup, ou pour le renvoyer directement vers le Modeleur graphique (section 6)",
      "Traitement par lot (Batch Processing) : clic droit sur un algorithme dans la boîte à outils > Exécuter en tant que traitement par lot…, ouvre un tableau où chaque ligne applique le même algorithme à un fichier différent, en une seule exécution plutôt que de répéter la même suite de clics",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Le traitement par lot évite l'erreur du fichier 37",
    text: "Refaire à la main la même suite de clics sur cinquante fichiers multiplie le risque d'erreur : un clic oublié, un paramètre mal réglé sur un seul fichier au milieu de la pile. Le traitement par lot applique exactement les mêmes paramètres à chaque ligne, ce qui élimine ce risque — la première étape naturelle vers l'automatisation complète par script vue en piste Master/Recherche.",
  },

  { type: "heading", text: "2. Le générateur d'expressions QGIS", level: "superieur" },
  {
    type: "paragraph",
    text: "Le générateur d'expressions (icône fx, présente dans la calculatrice de champs, le styleur ou l'étiquetage) utilise un langage propre à QGIS, proche du SQL mais étendu de fonctions géométriques et de manipulation de chaînes.",
  },
  {
    type: "table",
    headers: ["Fonction", "Rôle"],
    rows: [
      ["$area / $length", "Surface ou longueur de la géométrie de l'entité courante, dans l'unité du CRS du projet"],
      ["\"nom_du_champ\"", "Référence à la valeur d'un champ de l'entité courante (guillemets doubles)"],
      ["CASE WHEN … THEN … ELSE … END", "Classification conditionnelle : renvoie une valeur différente selon une ou plusieurs conditions testées dans l'ordre"],
      ["concat(), coalesce()", "Assembler des chaînes de caractères ; remplacer une valeur nulle par une valeur par défaut"],
      ["round(), to_string(), to_real()", "Arrondir un nombre ; convertir explicitement entre texte et nombre"],
    ],
  },
  {
    type: "formula",
    label: "Classer une commune par tranche de population",
    formula: "CASE WHEN \"population\" < 2000 THEN 'Rurale' WHEN \"population\" < 20000 THEN 'Petite ville' ELSE 'Grande ville' END",
    note: "Chaque WHEN est testé dans l'ordre ; dès qu'une condition est vraie, la valeur associée est renvoyée et les suivantes ignorées. ELSE couvre tout ce qui n'a matché aucune condition précédente : sans lui, les entités non couvertes reçoivent une valeur nulle (NULL), souvent une source de bug silencieux en aval.",
  },

  { type: "heading", text: "3. Jointures attributaire et spatiale", level: "superieur" },
  {
    type: "comparison",
    items: [
      {
        label: "Jointure attributaire",
        points: [
          "Associe deux tables sur un champ commun identique (ex. un code INSEE présent dans les deux)",
          "Propriétés de la couche > Jointures > bouton +, choisir la couche cible et le champ de correspondance de chaque côté",
          "N'ajoute aucune géométrie, seulement des attributs",
        ],
      },
      {
        label: "Jointure spatiale",
        points: [
          "Associe deux couches selon leur position relative, sans champ commun nécessaire",
          "Algorithme Processing « Joindre les attributs par localisation » (qgis:joinattributesbylocation)",
          "Le critère spatial (intersecte, contient, à une distance de…) remplace le champ de correspondance",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "Attribuer à chaque bâtiment (couche vecteur) le nom de sa commune (autre couche vecteur) se fait par jointure spatiale — aucun champ commun ne relie a priori les deux tables, seule leur position le fait, via une relation « est contenu dans ». Une jointure attributaire serait ici impossible : il faut un champ identique des deux côtés (par exemple un code commune déjà présent sur la couche bâtiments), ce qui n'est pas le cas de figure ici.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Jointure spatiale avec résumé statistique",
    text: "Quand plusieurs entités de la couche jointe correspondent à une seule entité cible (plusieurs arbres dans une même parcelle, par exemple), l'algorithme « Joindre les attributs par localisation (résumé) » (qgis:joinbylocationsummary) agrège automatiquement leurs valeurs (compte, somme, moyenne) en un seul champ par entité cible, plutôt que de dupliquer une ligne par correspondance comme le fait une jointure spatiale simple.",
  },

  { type: "heading", text: "4. Géotraitements vectoriels : buffer, clip, dissolve, union", level: "superieur" },
  {
    type: "paragraph",
    text: "Ces quatre opérations, présentées en principe dans le module Le Compas, se paramètrent ici précisément via Processing (menu Vecteur > Outils de géotraitement, ou directement dans la boîte à outils).",
  },
  {
    type: "table",
    headers: ["Algorithme Processing", "Paramètres clés", "Point de vigilance"],
    rows: [
      ["Tampon (native:buffer)", "Distance, Segments (nombre de segments pour arrondir un angle), Dissoudre le résultat (fusionne les tampons qui se chevauchent)", "La distance est exprimée dans l'unité du CRS de la couche source : vérifier qu'elle est bien projetée et métrique avant de saisir des mètres"],
      ["Découper (Clip, native:clip)", "Couche en entrée, Couche de découpage (l'emprise)", "Ne conserve que les attributs de la couche découpée ; la couche de découpage ne sert que de gabarit géométrique"],
      ["Fusionner (Dissolve, native:dissolve)", "Champ de dissolution (facultatif) : sans lui, toutes les entités fusionnent en une seule ; avec lui, une entité par valeur distincte", "Les attributs numériques des entités fusionnées ne sont pas recalculés automatiquement (pas de somme ni de moyenne native) sauf à activer les statistiques de champs disponibles dans l'algorithme"],
      ["Union (native:union)", "Deux couches en entrée", "Conserve les attributs des deux couches combinés sur chaque géométrie résultante, y compris les portions non recoupées — à distinguer de l'Intersection, qui les exclut"],
    ],
  },
  {
    type: "diagram",
    name: "spatial-operations",
    caption: "Trois opérations spatiales fondamentales, vues comme des figures géométriques — le paramétrage Processing correspondant est détaillé dans le tableau ci-dessus.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Toujours vérifier le CRS de sortie",
    text: "Un algorithme Processing propose presque toujours un champ « CRS de sortie », par défaut celui de la couche source. Enchaîner plusieurs géotraitements sans y prêter attention peut faire dériver silencieusement une couche vers un CRS géographique (degrés) au milieu d'une chaîne de calculs censés rester métriques — une source d'erreur discrète, puisque QGIS continue d'afficher la couche correctement (reprojection à la volée) sans signaler le problème.",
  },

  { type: "heading", text: "5. Calculatrice raster, reclassement et statistiques de zone", level: "superieur" },
  {
    type: "list",
    items: [
      "Calculatrice raster (Raster > Calculatrice raster…, ou l'algorithme Processing équivalent) : combine plusieurs rasters pixel à pixel par une expression arithmétique — c'est ainsi que se calcule un indice comme le NDVI directement dans QGIS",
      "Reclassement (Processing « Reclassifier par table », native:reclassifybytable) : transforme une plage de valeurs continues en classes discrètes selon une table de correspondance (ex. pente en degrés → classes « faible/moyenne/forte »)",
      "Statistiques de zone (Processing « Statistiques de zone », native:zonalstatisticsfb) : calcule une statistique (moyenne, somme, écart-type) d'un raster à l'intérieur de chaque polygone d'une couche vectorielle, un champ ajouté par statistique demandée",
    ],
  },
  {
    type: "formula",
    label: "Exemple de calculatrice raster : NDVI",
    formula: "(\"nir@1\" - \"red@1\") / (\"nir@1\" + \"red@1\")",
    note: "Dans la calculatrice raster de QGIS, chaque bande référencée se note nom_de_la_couche@numéro_de_bande. Le résultat, un nouveau raster continu entre -1 et 1, se symbolise ensuite avec un dégradé de couleur (module Les Couleurs, échelle NDVI).",
  },
  {
    type: "live",
    name: "grid-choropleth",
    caption: "Planche vivante. Statistiques de zone réelles, l'équivalent du résultat que produit l'algorithme Processing « Statistiques de zone » : 1122 cellules de 100 m, moyenne NDVI/NDMI/NDBI par cellule.",
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Voir en pratique : calcul et interprétation du NDVI",
    description: "Le module Les Couleurs détaille ce que mesure physiquement le NDVI calculé ici via la calculatrice raster.",
  },

  { type: "heading", text: "6. Le Modeleur graphique : chaîner des algorithmes", level: "superieur" },
  {
    type: "paragraph",
    text: "Une suite fixe de géotraitements (par exemple : tampon puis intersection puis statistiques de zone) répétée sur plusieurs jeux de données gagne à être chaînée une bonne fois pour toutes dans le Modeleur graphique (Traitement > Modeleur graphique…), plutôt que relancée manuellement algorithme par algorithme.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Ajouter une entrée de modèle (panneau de gauche, onglet Entrées) : par exemple une couche vecteur, qui deviendra un paramètre demandé à chaque exécution plutôt qu'un fichier fixe",
      "Glisser les algorithmes voulus (onglet Algorithmes) sur le canevas central, dans l'ordre du traitement",
      "Relier la sortie d'un algorithme à l'entrée du suivant en cliquant-glissant entre les deux connecteurs",
      "Marquer comme sortie finale le ou les résultats à conserver (clic droit sur le connecteur de sortie > Modifier la sortie du modèle)",
      "Enregistrer le modèle : il apparaît ensuite comme un algorithme à part entière dans la boîte à outils, réutilisable sur n'importe quelle nouvelle couche sans reconfigurer chaque étape",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Du modèle graphique au script Python",
    text: "Un modèle terminé peut s'exporter directement en script Python (bouton Modèle > Exporter en tant que script Python…) : QGIS traduit automatiquement chaque bloc du canevas en un appel processing.run() équivalent (section 7). C'est une passerelle naturelle entre l'interface graphique et le script, utile pour découvrir la syntaxe PyQGIS d'un algorithme sans la chercher dans la documentation.",
  },

  { type: "heading", text: "7. La console Python (PyQGIS)", level: "superieur" },
  {
    type: "paragraph",
    text: "La console Python (Extension > Console Python, ou icône dédiée dans la barre d'outils) donne un accès direct à l'API PyQGIS depuis l'intérieur même de QGIS : le projet ouvert, ses couches, et tous les algorithmes de Processing deviennent scriptables sans quitter l'interface.",
  },
  {
    type: "formula",
    label: "Itérer sur les couches du projet",
    formula: "for layer in QgsProject.instance().mapLayers().values():\n    print(layer.name(), layer.featureCount())",
    note: "QgsProject.instance() renvoie le projet actuellement ouvert ; mapLayers() renvoie un dictionnaire de toutes ses couches. featureCount() ne s'applique qu'à une couche vecteur (une couche raster n'a pas d'entités à compter).",
  },
  {
    type: "formula",
    label: "Lancer un algorithme Processing depuis un script",
    formula: "processing.run(\"native:buffer\", {'INPUT': layer, 'DISTANCE': 200, 'OUTPUT': 'memory:'})",
    note: "processing.run() accepte n'importe quel algorithme de la boîte à outils par son identifiant technique (visible en survolant l'algorithme dans la boîte à outils, ou dans l'historique de traitement, section 1). 'memory:' comme OUTPUT crée une couche temporaire en mémoire plutôt qu'un fichier sur disque, pratique pour un résultat intermédiaire.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "La console convient au test, pas au vrai script",
    text: "Pour une ligne isolée ou un test rapide, la console suffit. Pour un script de plusieurs dizaines de lignes, un éditeur dédié (VS Code, voir la salle De la Plume et du Texte) reste préférable : coloration syntaxique fiable, autocomplétion, débogueur pas à pas et suivi de version, absents ou limités dans la console intégrée.",
  },

  { type: "heading", text: "8. Le gestionnaire d'extensions (Plugin Manager)", level: "superieur" },
  {
    type: "paragraph",
    text: "QGIS s'étend par des extensions (plugins), installables sans quitter l'application, depuis le dépôt officiel ou un dépôt tiers ajouté manuellement.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Menu Extension > Installer/Gérer les extensions…",
      "Onglet « Tout » : barre de recherche pour trouver une extension par son nom (ex. QuickMapServices, pour ajouter des fonds de carte en un clic)",
      "Sélectionner l'extension puis bouton « Installer l'extension » : elle apparaît ensuite dans le menu Extension, ou ajoute ses propres menus/panneaux",
      "Onglet « Installées » : désactiver ou désinstaller une extension déjà présente",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une extension tierce n'est pas maintenue par le projet QGIS",
    text: "Le dépôt officiel héberge des extensions écrites par des tiers, avec un niveau de maintenance très variable : certaines cessent de fonctionner après une montée de version de QGIS. Vérifier la date de dernière mise à jour et la compatibilité annoncée avant d'en dépendre pour un usage régulier.",
  },

  { type: "heading", text: "9. Style basé sur des règles et étiquetage avancé", level: "superieur" },
  {
    type: "list",
    items: [
      "Symbole basé sur des règles (Propriétés > Symbologie > menu déroulant « Basée sur des règles ») : chaque règle est une expression (section 2) qui détermine quelles entités reçoivent quel style, utile quand catégorisée/graduée ne suffit pas (combinaison de plusieurs champs, seuils personnalisés)",
      "Étiquetage (Propriétés > Étiquettes) : afficher un champ comme texte sur la carte, avec placement automatique",
      "Étiquettes basées sur des règles : même logique que la symbologie par règles, mais pour choisir quel champ étiqueter et selon quel style, entité par entité",
      "Onglet Rendu : limiter l'affichage des étiquettes à une plage d'échelle (éviter un fouillis illisible en vue large), et gérer les collisions d'étiquettes qui se chevauchent",
    ],
  },
  {
    type: "table",
    headers: ["Option de placement (étiquette de polygone)", "Effet"],
    rows: [
      ["Horizontale (au centre)", "Toujours horizontale, centrée sur le polygone, sans tenir compte de sa forme"],
      ["Autour du centroïde libre", "Peut légèrement se déplacer autour du centre pour éviter les chevauchements avec d'autres étiquettes"],
      ["Utiliser la forme du polygone (curved/perimeter)", "Suit le contour ou l'orientation de l'entité, utile pour des polygones très allongés"],
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : Processing regroupe des centaines d'algorithmes (dont beaucoup viennent de GDAL/SAGA/GRASS) accessibles par recherche, avec historique et traitement par lot ; le générateur d'expressions ($area, CASE WHEN) est la brique commune à la calculatrice de champs, au style et à l'étiquetage ; jointure attributaire = champ commun, jointure spatiale = position ; buffer/clip/dissolve/union se paramètrent précisément en Processing, toujours en vérifiant le CRS de sortie ; calculatrice raster + reclassement + statistiques de zone relient raster et vecteur ; le Modeleur graphique chaîne des algorithmes et s'exporte en script Python ; PyQGIS (QgsProject, processing.run()) scripte QGIS depuis l'intérieur ; le gestionnaire d'extensions installe des plugins tiers, de maintenance variable ; le style et l'étiquetage basés sur des règles utilisent le même générateur d'expressions que la calculatrice de champs.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : géotraitements et calculatrice raster",
    description: "Plusieurs séances de l'Atelier appliquent directement le buffer, l'intersection et la calculatrice raster présentés ici sur un vrai jeu de données.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. PyQGIS avancé : scripts autonomes hors interface", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà de la console interne (piste Licence/BUT), PyQGIS s'utilise aussi en dehors de toute interface graphique : un script Python autonome, lancé depuis un terminal ou planifié (cron, tâche planifiée), qui initialise QGIS en mode « headless » (sans fenêtre) pour traiter un dossier entier de fichiers sans jamais ouvrir l'application.",
  },
  {
    type: "formula",
    label: "Initialiser QGIS en mode headless",
    formula: "from qgis.core import QgsApplication\nQgsApplication.setPrefixPath('/chemin/vers/qgis', True)\nqgs = QgsApplication([], False)\nqgs.initQgis()\n# ... traitements ...\nqgs.exitQgis()",
    note: "Le second argument False de QgsApplication désactive l'interface graphique. setPrefixPath() pointe vers l'installation QGIS locale (variable selon le système). initQgis()/exitQgis() encadrent tout le script : oublier exitQgis() peut laisser des ressources non libérées en fin d'exécution.",
  },
  {
    type: "formula",
    label: "Traiter un dossier de fichiers en lot, par script",
    formula: "import glob\nfor path in glob.glob('/donnees/*.gpkg'):\n    layer = QgsVectorLayer(path, 'temp', 'ogr')\n    processing.run('native:buffer', {'INPUT': layer, 'DISTANCE': 200, 'OUTPUT': path.replace('.gpkg', '_buffer.gpkg')})",
    note: "glob.glob() liste tous les fichiers correspondant au motif ; la boucle applique le même traitement à chacun, sans limite de nombre et sans risque d'oubli — l'automatisation complète de ce qu'ébauchait le traitement par lot de l'interface (piste Licence/BUT, section 1).",
  },

  { type: "heading", text: "2. Développer un algorithme Processing ou une extension minimale", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà de scripter des algorithmes existants, PyQGIS permet d'en écrire de nouveaux, intégrés à la boîte à outils au même titre que ceux fournis par défaut, ou de développer une extension complète avec sa propre interface.",
  },
  {
    type: "list",
    items: [
      "Un algorithme Processing personnalisé hérite de QgsProcessingAlgorithm, déclare ses paramètres d'entrée/sortie dans initAlgorithm(), et implémente sa logique dans processAlgorithm() — une fois enregistré via un QgsProcessingProvider, il apparaît dans la boîte à outils comme n'importe quel algorithme natif, utilisable aussi en script ou dans le Modeleur graphique",
      "L'extension « Plugin Builder », installable depuis le gestionnaire d'extensions, génère le squelette complet d'une nouvelle extension QGIS (structure de fichiers, métadonnées, interface minimale) à partir de quelques questions, plutôt que de partir d'une page blanche",
      "L'extension générée se recharge en développement avec « Plugin Reloader » (autre extension), qui évite de redémarrer QGIS entier à chaque modification du code",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Script, algorithme Processing ou extension : trois niveaux d'intégration",
    text: "Un script autonome (section 1) convient à un traitement ponctuel ou planifié, sans besoin d'interface. Un algorithme Processing personnalisé convient dès qu'un traitement doit être réutilisé par d'autres, combiné dans un Modeleur graphique, ou appelé en ligne de commande (section 4). Une extension complète ne se justifie que lorsqu'une vraie interface graphique dédiée (panneaux, dialogues, outils de carte personnalisés) apporte quelque chose qu'un simple algorithme ne peut pas offrir.",
  },
  {
    type: "list",
    items: [
      "Tester un algorithme personnalisé sur des cas limites avant de le diffuser : géométrie vide, valeur de champ nulle, couche sans entité sélectionnée — les mêmes catégories d'erreurs qu'un script Python classique, mais plus faciles à ignorer derrière une interface qui semble fonctionner sur le premier exemple testé",
      "Le cadre de test officiel de QGIS (QGIS Testing Framework, basé sur unittest/pytest) permet d'écrire de vrais tests automatisés pour une extension, exécutés sans interface graphique, sur le même principe qu'un test unitaire pour n'importe quel logiciel",
    ],
  },

  { type: "heading", text: "3. Connexion à PostGIS depuis QGIS", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà d'un fichier local (GeoPackage, Shapefile), QGIS se connecte directement à une base de données spatiale PostGIS, ce qui change l'échelle possible d'un projet : plusieurs utilisateurs simultanés, des volumes de plusieurs millions d'entités, et des requêtes exécutées côté serveur plutôt que rapatriées intégralement en mémoire.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Gestionnaire de sources de données (Ctrl+L, ou Couche > Ajouter une couche > Couche PostGIS…) : créer une nouvelle connexion (hôte, port, base, identifiants), puis parcourir les tables/vues disponibles et les charger comme des couches classiques",
      "Une fois connectée, une couche PostGIS se comporte comme n'importe quelle couche vecteur dans QGIS : symbologie, table attributaire, Processing s'appliquent sans différence visible",
      "DB Manager (Base de données > DB Manager…) : exécuter directement une requête SQL spatiale sur la base connectée, et charger son résultat comme couche temporaire — utile pour une jointure ou un filtre complexe que l'interface QGIS n'exprime pas nativement",
    ],
  },
  {
    type: "formula",
    label: "Exemple de requête dans DB Manager",
    formula: "SELECT nom, geom FROM communes WHERE ST_Intersects(geom, ST_Buffer((SELECT geom FROM rivieres WHERE nom = 'Durance'), 200));",
    note: "Exécutée côté serveur PostGIS, cette requête ne rapatrie vers QGIS que le résultat déjà filtré, pas la table entière — un avantage décisif face à un fichier local dès que le volume dépasse quelques dizaines de milliers d'entités.",
  },
  {
    type: "link",
    to: "/module/bases-donnees-spatiales",
    label: "Aller plus loin : PostGIS, index spatiaux et performance",
    description: "Le module La Base détaille PostGIS en profondeur : index GiST, EXPLAIN ANALYZE, topologie, exposition web d'une base spatiale.",
  },

  { type: "heading", text: "4. Automatiser en ligne de commande : qgis_process", level: "approfondissement" },
  {
    type: "paragraph",
    text: "qgis_process, installé avec QGIS, exécute n'importe quel algorithme de Processing directement depuis un terminal, sans jamais ouvrir l'interface graphique — la brique qui permet d'intégrer un traitement QGIS dans un pipeline plus large (un script shell, une tâche planifiée, une chaîne de traitement continue).",
  },
  {
    type: "formula",
    label: "Lister puis exécuter un algorithme en CLI",
    formula: "qgis_process list\nqgis_process run native:buffer --INPUT=communes.gpkg --DISTANCE=200 --OUTPUT=buffer.gpkg",
    note: "qgis_process list affiche l'identifiant exact de chaque algorithme disponible (le même identifiant technique qu'utilise processing.run() en PyQGIS) ; run l'exécute avec ses paramètres passés en ligne de commande, sans dépendance à une session QGIS graphique ouverte.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Intégrer qgis_process dans un pipeline",
    text: "Un serveur qui reçoit chaque nuit une nouvelle image satellite peut déclencher automatiquement une chaîne qgis_process (calcul d'indice, statistiques de zone, export) via une tâche planifiée, sans qu'un opérateur n'ouvre jamais QGIS lui-même : le traitement par lot de l'interface (piste Licence/BUT) et le script Python (section 1) convergent ici vers un même objectif, l'automatisation complète, par une troisième voie qui ne nécessite même pas de connaître PyQGIS.",
  },
  {
    type: "formula",
    label: "Chaîner qgis_process dans un script shell",
    formula: "#!/bin/bash\nfor f in /donnees/entrantes/*.tif; do\n  qgis_process run gdal:rastercalculator --INPUT_A=\"$f\" --BAND_A=1 --FORMULA=\"A*0.0001\" --OUTPUT=\"/donnees/sorties/$(basename \"$f\")\"\ndone",
    note: "Un script shell classique orchestre plusieurs appels qgis_process, un par fichier : la même logique que le script Python de la section 1, mais sans écrire une seule ligne de PyQGIS, en s'appuyant uniquement sur le CLI Processing.",
  },

  { type: "heading", text: "5. Interopérabilité : GDAL/OGR et l'écosystème hors QGIS", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La plupart des formats que QGIS lit ou écrit (Shapefile, GeoTIFF, GeoPackage…) passent en réalité par GDAL (raster) et OGR (vecteur), deux bibliothèques logicielles indépendantes de QGIS, invisibles depuis l'interface mais qui font le même travail derrière d'autres outils : ogr2ogr (conversion et reprojection en ligne de commande), gdal_translate, mais aussi les bibliothèques Python (GeoPandas, rasterio) ou R (sf) hors de toute interface SIG.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Le même fichier, plusieurs outils",
    text: "Un GeoPackage produit par QGIS s'ouvre sans conversion dans R (bibliothèque sf) ou dans un script Python autonome (GeoPandas) : les trois environnements s'appuient sur le même GDAL/OGR en coulisses, ce qui garantit une compatibilité qui n'a rien d'un hasard. Choisir QGIS, R ou un script Python hors QGIS pour une étape donnée d'un pipeline est souvent affaire de commodité, pas de format imposé.",
  },
  {
    type: "list",
    items: [
      "Un script GeoPandas peut préparer une donnée que QGIS affichera ensuite (mise en page finale, section Lycée) — l'inverse fonctionne tout aussi bien",
      "R, via le paquet sf (basé sur GDAL/OGR/PROJ, les mêmes bibliothèques que QGIS), prend le relais pour une analyse statistique spatiale poussée (régression spatiale, modèles) que QGIS n'offre pas nativement",
      "Un environnement de développement dédié (VS Code) reste l'outil de référence pour écrire, déboguer et versionner ces scripts, qu'ils appellent PyQGIS, GeoPandas ou R",
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "programmation-r",
        points: [
          "Langage dédié à la statistique, avec sf pour la donnée spatiale",
          "Pertinent dès qu'une analyse statistique dépasse ce qu'une interface graphique propose",
        ],
      },
      {
        label: "vscode",
        points: [
          "Éditeur de code générique, pas spécifique à la géomatique",
          "Environnement de travail réel pour tout script PyQGIS, GeoPandas ou R au-delà de quelques lignes",
        ],
      },
    ],
  },
  {
    type: "link",
    to: "/module/programmation-r",
    label: "La statistique spatiale en R",
    description: "La salle De l'Instrument et du Nombre reprend l'analyse spatiale depuis le langage R, avec sf et tmap.",
  },
  {
    type: "link",
    to: "/module/vscode",
    label: "L'éditeur pour écrire et déboguer ces scripts",
    description: "La salle De la Plume et du Texte détaille VS Code : extensions Python/Jupyter, débogueur, Git intégré.",
  },

  { type: "heading", text: "6. Reproductibilité : versionner un projet QGIS", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un projet de recherche ou une chaîne de production répétée dans le temps gagne à être reproductible : n'importe qui (soi-même six mois plus tard, ou un collègue) doit pouvoir reconstituer exactement le même résultat à partir des mêmes données brutes.",
  },
  {
    type: "comparison",
    items: [
      {
        label: ".qgz (par défaut)",
        points: [
          "Archive compressée (format ZIP), plus légère sur disque",
          "Contenu binaire : un outil de version (Git) affiche « fichier modifié » sans jamais pouvoir montrer ce qui a changé à l'intérieur",
        ],
      },
      {
        label: ".qgs (XML)",
        points: [
          "Simple fichier texte structuré, plus volumineux",
          "Un différentiel Git (git diff) reste lisible ligne par ligne : quel paramètre de symbologie a changé, quelle couche a été ajoutée",
        ],
      },
    ],
  },
  {
    type: "list",
    items: [
      "Pour un projet suivi dans Git, préférer explicitement le format .qgs (Projet > Enregistrer sous…, choisir le type de fichier) malgré sa taille plus importante, justement pour profiter d'un historique de modifications lisible",
      "Ne jamais versionner les données volumineuses elles-mêmes dans le même dépôt Git qu'un projet QGIS : un dépôt Git n'est pas conçu pour de gros fichiers binaires répétés (raster, Shapefile volumineux) ; les référencer par chemin relatif et les stocker à part (serveur de données, Git LFS) reste la pratique correcte",
      "Documenter un traitement : l'historique de Processing (piste Licence/BUT, section 1) s'exporte en script Python reproductible ; un modèle du Modeleur graphique s'enregistre comme fichier .model3, lui aussi versionnable en Git au même titre qu'un script",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Un pipeline reproductible de bout en bout",
    text: "Un dépôt Git qui contient un projet .qgs, un script qgis_process ou PyQGIS documentant chaque étape de traitement, et un fichier listant précisément les données brutes attendues (sans les données elles-mêmes) permet à quiconque clone ce dépôt de reconstruire le résultat final à l'identique — la même exigence de reproductibilité qu'un notebook R Markdown versionné (salle De l'Instrument et du Nombre) ou qu'un script Python versionné sous VS Code (salle De la Plume et du Texte).",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : PyQGIS headless (QgsApplication, initQgis/exitQgis) traite un dossier entier sans interface ; un algorithme Processing personnalisé (QgsProcessingAlgorithm) ou une extension (Plugin Builder) prolongent un simple script réutilisable ; PostGIS se connecte via le Gestionnaire de sources ou DB Manager, avec SQL spatial exécuté côté serveur ; qgis_process exécute Processing en CLI, intégrable à un pipeline planifié ; GDAL/OGR sous-tend QGIS, GeoPandas et R (sf), d'où leur interopérabilité native ; .qgs (XML) se versionne lisiblement en Git, .qgz beaucoup moins ; les données volumineuses ne se versionnent jamais directement dans le même dépôt qu'un projet QGIS.",
    ],
  },
  {
    type: "link",
    to: "/module/bases-donnees-spatiales",
    label: "Continuer : bases de données spatiales en profondeur",
    description: "Le module La Base reprend PostGIS depuis les index spatiaux jusqu'à l'exposition web d'une base spatiale complète.",
  },
]
