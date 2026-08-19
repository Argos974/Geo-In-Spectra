import type { ContentBlock } from "./types"

export const etudesDeCasSectoriellesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Les salles précédentes donnent des méthodes génériques : un indice, une projection, une analyse spatiale s'appliquent quel que soit le domaine. Cette salle fait l'inverse : partir de trois secteurs réels (agriculture, urbanisme, risques naturels) et suivre, sur chacun, comment les méthodes déjà vues s'enchaînent concrètement jusqu'à une décision — la synthèse plutôt qu'une nouvelle méthode.",
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Avant de commencer : structure du risque (aléa/enjeux/vulnérabilité)",
    description: "La salle Les Statistiques (section 5) pose la structure conceptuelle du risque, mobilisée en détail dans l'étude de cas de la section 6.",
  },

  { type: "heading", text: "1. Pourquoi des études de cas sectorielles", level: "lycee" },
  {
    type: "paragraph",
    text: "Une méthode apprise isolément (un indice, une statistique spatiale) reste abstraite tant qu'elle n'a pas été vue mobilisée dans un enchaînement complet, de la donnée brute à une décision concrète. Chaque secteur ci-dessous suit ce même enchaînement — donnée, traitement, indicateur, décision — avec ses propres contraintes et son propre vocabulaire professionnel.",
  },

  { type: "heading", text: "2. Agriculture de précision : cartographier la vigueur pour moduler l'intrant", level: "superieur" },
  {
    type: "paragraph",
    text: "L'agriculture de précision ajuste un intrant (engrais, eau, produit phytosanitaire) selon la variabilité réelle intra-parcellaire, plutôt qu'une dose uniforme sur toute une parcelle qui peut pourtant présenter des zones de vigueur très différentes — sol plus ou moins profond, exposition, historique cultural.",
  },
  {
    type: "list",
    items: [
      "Acquisition : NDVI (module Les Couleurs) par satellite (Sentinel-2, révisite ~5 jours) ou par drone (module Photogrammétrie et drones, résolution centimétrique mais couverture plus limitée par vol)",
      "Traitement : lissage/nettoyage des pixels aberrants (nuages, ombres), puis classification en 3 à 5 classes de vigueur (module L'Intelligence, classification non supervisée souvent suffisante ici)",
      "Carte de préconisation : chaque classe de vigueur associée à une dose d'intrant, exportée vers le système de guidage du tracteur (format shapefile ou ISO-XML compatible avec le matériel agricole moderne)",
    ],
  },

  {
    type: "callout",
    tone: "example",
    title: "Un ordre de grandeur d'économie d'intrant",
    text: "Sur une parcelle de 20 ha zonée en trois classes de vigueur (faible/moyenne/forte), une modulation qui réduit la dose d'azote de 20 % sur les 6 ha de classe forte (déjà bien pourvus) et l'augmente de 15 % sur les 4 ha de classe faible, dose uniforme inchangée sur le reste, se traduit typiquement par une économie nette d'intrant de l'ordre de quelques pourcents à l'échelle de la parcelle entière, sans perte de rendement sur les zones sous-dosées à tort par l'ancienne dose uniforme — l'ordre de grandeur exact dépend entièrement du contexte agronomique local, jamais transposable tel quel d'une parcelle à l'autre.",
  },

  { type: "heading", text: "3. Étude de cas : d'un NDVI à une carte de préconisation à taux variable", level: "superieur" },
  {
    type: "table",
    headers: ["Étape", "Méthode mobilisée (déjà vue)", "Salle de référence"],
    rows: [
      ["Calcul du NDVI", "Algèbre raster : (NIR−Rouge)/(NIR+Rouge)", "Les Couleurs"],
      ["Nettoyage des artefacts (nuages, ombres)", "Masquage par bande de classification (SCL Sentinel-2)", "L'Atelier, séance 5"],
      ["Classification en zones de vigueur", "Classification non supervisée (k-moyennes)", "L'Intelligence"],
      ["Vérification du zonage à différentes échelles de parcelle", "MAUP : le zonage dépend de la maille choisie", "Le Compas"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un NDVI unique ne suffit jamais à une vraie préconisation",
    text: "Une zone de NDVI faible peut signaler un stress hydrique, une carence en azote, une maladie, ou simplement un sol naturellement moins profond — le NDVI seul ne distingue pas la cause. Une préconisation agronomique fiable croise systématiquement le NDVI avec un historique de rendement, une analyse de sol, ou plusieurs dates de NDVI (série temporelle) plutôt qu'une image isolée.",
  },

  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Voir aussi : classification non supervisée",
    description: "Le module L'Intelligence détaille les k-moyennes et les autres méthodes de classification mobilisées ici pour zoner la vigueur.",
  },

  { type: "heading", text: "4. Urbanisme : artificialisation des sols et îlots de chaleur", level: "superieur" },
  {
    type: "paragraph",
    text: "L'artificialisation des sols (transformation d'un sol naturel ou agricole en surface bâtie ou imperméabilisée) est un indicateur central des politiques d'urbanisme actuelles (objectif « zéro artificialisation nette » en France) — mesurable directement par télédétection à partir du NDBI (module Les Couleurs) et de son évolution dans le temps.",
  },
  {
    type: "formula",
    label: "Détection de changement par différence de NDBI",
    formula: "ΔNDBI = NDBI(date récente) − NDBI(date ancienne)",
    note: "Une hausse marquée et localisée du NDBI entre deux dates signale une artificialisation récente à cet endroit précis — la même logique de détection de changement que l'Atelier applique déjà au NDVI (ΔNDVI, séance 3), transposée ici au bâti plutôt qu'à la végétation.",
  },
  {
    type: "callout",
    tone: "info",
    title: "L'îlot de chaleur urbain, une conséquence mesurable de l'artificialisation",
    text: "Les surfaces artificialisées (bitume, béton) stockent et restituent la chaleur différemment d'un sol végétalisé, créant des écarts de température locaux de plusieurs degrés entre un centre-ville dense et sa périphérie végétalisée — mesurable par télédétection thermique (bande infrarouge thermique, disponible sur Landsat mais pas nativement sur Sentinel-2) et directement corrélé, spatialement, au NDBI et à l'inverse au NDVI du même secteur.",
  },

  { type: "heading", text: "5. Étude de cas : suivre l'artificialisation communale dans le temps", level: "superieur" },
  {
    type: "list",
    items: [
      "Calculer le NDBI sur deux dates espacées de plusieurs années, sur la même emprise communale",
      "Vérifier que les deux images sont comparables (même saison, correction atmosphérique appliquée aux deux, module Le Regard) avant toute comparaison",
      "Calculer le ΔNDBI et seuiller les pixels en hausse significative pour isoler les zones nouvellement artificialisées",
      "Calculer la surface artificialisée par statistique de zone (module Le Compas) à l'échelle communale, comparable d'une année à l'autre pour un indicateur de suivi",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un seuil de détection de changement n'est jamais universel",
    text: "Le seuil de ΔNDBI retenu comme \"changement significatif\" doit être calibré sur des zones de vérité terrain connues (une zone effectivement urbanisée récemment vs une zone restée stable), pas fixé arbitrairement : un seuil trop bas confond bruit radiométrique normal et vrai changement, un seuil trop haut manque des changements réels de faible intensité.",
  },

  {
    type: "paragraph",
    text: "L'objectif « zéro artificialisation nette » (loi Climat et Résilience, 2021) fixe une trajectoire de réduction du rythme d'artificialisation, mesurée précisément par ce type de suivi ΔNDBI à l'échelle communale ou intercommunale — un exemple direct où une méthode de télédétection alimente un indicateur de politique publique opposable, pas seulement une carte descriptive.",
  },

  { type: "heading", text: "6. Gestion des risques naturels : croiser aléa, enjeux, vulnérabilité en pratique", level: "superieur" },
  {
    type: "paragraph",
    text: "Le module Les Statistiques pose la structure conceptuelle Risque = Aléa × Enjeux × Vulnérabilité. Appliquée à un risque incendie communal, chaque composante mobilise des méthodes déjà vues séparément dans les salles précédentes, combinées ici pour la première fois dans un même exercice complet.",
  },
  {
    type: "diagram",
    name: "risk-layers",
    caption: "Trois couches distinctes, jamais confondues : un aléa fort sans aucun enjeu exposé ne produit aucun risque au sens opérationnel.",
  },
  { type: "game" },

  { type: "heading", text: "7. Étude de cas : hiérarchiser un risque incendie à l'échelle communale", level: "approfondissement" },
  {
    type: "table",
    headers: ["Composante", "Donnée mobilisée", "Salle de référence"],
    rows: [
      ["Aléa", "Pente, exposition, type de végétation (indice composite), historique des départs de feu (Gi*)", "Fondements (pente), Les Couleurs (NDVI/type de couvert), Les Statistiques (Gi*)"],
      ["Enjeux", "Densité de bâti par statistique de zone, distance aux voies d'accès pompiers", "Le Compas"],
      ["Vulnérabilité", "Matériaux de construction dominants, âge du bâti (donnée cadastrale/INSEE croisée spatialement)", "Le Compas (jointure spatiale)"],
      ["Priorisation finale", "Analyse multicritère (AHP) pondérant les trois couches, documentée explicitement", "Le Compas, section 9 ; Les Statistiques, section 5"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi documenter la pondération, pas seulement la carte finale",
    text: "Deux communes voisines peuvent légitimement pondérer différemment aléa/enjeux/vulnérabilité selon leurs priorités locales (une commune avec beaucoup d'habitat isolé en forêt pondérera davantage la vulnérabilité qu'une commune essentiellement agricole). La carte finale seule, sans la pondération documentée qui l'a produite, ne peut ni être auditée ni être comparée honnêtement à celle d'une autre commune.",
  },

  { type: "heading", text: "8. Foresterie et gestion des ressources naturelles", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La gestion forestière mobilise une combinaison différente : un modèle de hauteur de canopée LiDAR (module LiDAR) pour estimer un volume de bois sur pied, croisé avec une classification d'essence par imagerie multispectrale ou hyperspectrale (module Le Regard) et un suivi temporel de coupes rases par détection de changement (même logique ΔNDVI que la section 5), pour planifier une exploitation durable plutôt que réagir après coup à une coupe déjà réalisée.",
  },

  { type: "heading", text: "9. Étude de cas : estimer un volume de bois sur pied", level: "approfondissement" },
  {
    type: "table",
    headers: ["Étape", "Méthode mobilisée (déjà vue)", "Salle de référence"],
    rows: [
      ["Modèle de hauteur de canopée (CHM)", "CHM = MNS − MNT, différence de deux surfaces LiDAR", "LiDAR"],
      ["Classification d'essence (résineux/feuillus)", "Classification supervisée sur signature spectrale", "Le Regard, L'Intelligence"],
      ["Volume sur pied par placette", "Équation allométrique hauteur → volume, calibrée par essence", "—"],
      ["Suivi des coupes rases dans le temps", "Détection de changement, seuillage ΔNDVI", "Les Couleurs, section 5 (ci-dessus)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une équation allométrique n'est valable que dans son domaine de calibration",
    text: "La relation entre hauteur de canopée et volume de bois (équation allométrique) est calibrée sur un échantillon de placettes mesurées au sol, pour une essence et une région données. L'appliquer telle quelle à une essence différente, ou à un peuplement d'âge très différent de celui de l'échantillon de calibration, produit une estimation de volume potentiellement fausse sans qu'aucune erreur ne soit visible dans le calcul lui-même — seule une nouvelle calibration locale, ou une équation publiée explicitement pour ce contexte, garantit un résultat fiable.",
  },

  { type: "heading", text: "10. Ce que ces secteurs partagent méthodologiquement", level: "superieur" },
  {
    type: "list",
    items: [
      "Une acquisition (satellite, drone, LiDAR, terrain) toujours datée et documentée, jamais traitée comme une vérité intemporelle",
      "Un indice ou une classification intermédiaire, jamais l'interprétation finale directement",
      "Une détection de changement quand la question porte sur une évolution, pas seulement un état à un instant donné",
      "Une combinaison multicritère explicitement pondérée et documentée dès qu'une décision finale croise plusieurs couches",
    ],
  },

  {
    type: "comparison",
    items: [
      {
        label: "Agriculture de précision",
        points: ["Donnée : NDVI répété dans la saison", "Décision : dose d'intrant modulée", "Échelle : intra-parcellaire"],
      },
      {
        label: "Urbanisme (artificialisation)",
        points: ["Donnée : ΔNDBI pluriannuel", "Décision : indicateur ZAN, PLU", "Échelle : communale/intercommunale"],
      },
      {
        label: "Risque incendie",
        points: ["Donnée : aléa/enjeux/vulnérabilité croisés", "Décision : priorisation de la prévention", "Échelle : communale, ciblée par secteur"],
      },
      {
        label: "Foresterie",
        points: ["Donnée : CHM LiDAR + classification d'essence", "Décision : plan d'exploitation durable", "Échelle : peuplement/parcelle forestière"],
      },
    ],
  },

  { type: "heading", text: "11. Limites d'un transfert méthodologique d'un secteur à l'autre", level: "approfondissement" },
  {
    type: "callout",
    tone: "warning",
    title: "Une méthode qui marche dans un secteur ne se transpose pas automatiquement",
    text: "Un seuil de ΔNDBI calibré pour détecter une artificialisation urbaine n'a aucune raison de bien fonctionner tel quel pour détecter un changement agricole (rotation de cultures normale, pas un vrai changement d'occupation du sol) : chaque secteur a sa propre dynamique temporelle et ses propres faux positifs typiques. Réutiliser une méthode d'un secteur à l'autre exige de re-calibrer sur une vérité terrain propre au nouveau secteur, jamais de transposer directement un seuil ou un poids validé ailleurs.",
  },
  {
    type: "link",
    to: "/discipulus/progression",
    label: "Faire le point sur l'ensemble du parcours",
    description: "Cette salle referme la boucle : chaque méthode mobilisée ici renvoie à la salle où elle a été apprise en détail — un bon moment pour vérifier sa progression d'ensemble.",
  },
]
