import type { ContentBlock } from "./types"

export const etudesDeCasSectoriellesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Les salles précédentes donnent des méthodes génériques : un indice, une projection, une analyse spatiale s'appliquent quel que soit le domaine. Cette salle fait l'inverse : partir de trois secteurs réels (agriculture, urbanisme, risques naturels) et suivre, sur chacun, comment les méthodes déjà vues s'enchaînent concrètement jusqu'à une décision — la synthèse plutôt qu'une nouvelle méthode. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Avant de commencer : structure du risque (aléa/enjeux/vulnérabilité)",
    description: "La salle Les Statistiques pose la structure conceptuelle du risque, mobilisée en détail dans l'étude de cas de cette salle.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Pourquoi des études de cas sectorielles", level: "lycee" },
  {
    type: "paragraph",
    text: "Une méthode apprise isolément (un indice, une statistique spatiale) reste abstraite tant qu'elle n'a pas été vue mobilisée dans un enchaînement complet, de la donnée brute à une décision concrète. Chaque secteur ci-dessous suit ce même enchaînement — donnée, traitement, indicateur, décision — avec ses propres contraintes et son propre vocabulaire professionnel.",
  },

  { type: "heading", text: "2. Agriculture de précision, en pratique", level: "lycee" },
  {
    type: "paragraph",
    text: "L'agriculture de précision ajuste un intrant (engrais, eau, produit phytosanitaire) selon la variabilité réelle intra-parcellaire, plutôt qu'une dose uniforme sur toute une parcelle qui peut pourtant présenter des zones de vigueur très différentes — sol plus ou moins profond, exposition, historique cultural. Un NDVI (module Les Couleurs) calculé par satellite ou par drone repère ces zones, qui sont ensuite regroupées en quelques classes (faible/moyenne/forte vigueur) associées chacune à une dose d'intrant différente.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un ordre de grandeur d'économie d'intrant",
    text: "Sur une parcelle de 20 ha zonée en trois classes de vigueur, une modulation qui réduit la dose d'azote de 20 % sur les zones déjà bien pourvues et l'augmente de 15 % sur les zones faibles se traduit typiquement par une économie nette de quelques pourcents à l'échelle de la parcelle entière, sans perte de rendement sur les zones auparavant sous-dosées — l'ordre de grandeur exact dépend entièrement du contexte agronomique local.",
  },

  { type: "heading", text: "3. Ce que ces secteurs partagent, malgré leurs différences", level: "lycee" },
  {
    type: "comparison",
    items: [
      {
        label: "Agriculture de précision",
        points: ["Donnée : NDVI répété dans la saison", "Décision : dose d'intrant modulée", "Échelle : intra-parcellaire"],
      },
      {
        label: "Urbanisme (artificialisation)",
        points: ["Donnée : évolution du NDBI sur plusieurs années", "Décision : indicateur de politique publique (ZAN)", "Échelle : communale/intercommunale"],
      },
      {
        label: "Risque incendie",
        points: ["Donnée : aléa/enjeux/vulnérabilité croisés", "Décision : priorisation de la prévention", "Échelle : communale, ciblée par secteur"],
      },
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : les trois secteurs suivent le même enchaînement — donnée datée, indice ou classification intermédiaire, décision finale — même quand le vocabulaire professionnel diffère ; un indice satellite (NDVI, NDBI) sert toujours de première étape, jamais de décision en lui-même.",
    ],
  },
  {
    type: "link",
    to: "/discipulus/progression",
    label: "Faire le point sur l'ensemble du parcours",
    description: "Cette salle referme la boucle : chaque méthode mobilisée ici renvoie à la salle où elle a été apprise en détail — un bon moment pour vérifier sa progression d'ensemble.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Agriculture de précision : cartographier la vigueur pour moduler l'intrant", level: "superieur" },
  {
    type: "paragraph",
    text: "L'agriculture de précision ajuste un intrant (engrais, eau, produit phytosanitaire) selon la variabilité réelle intra-parcellaire, plutôt qu'une dose uniforme sur toute une parcelle qui peut pourtant présenter des zones de vigueur très différentes — sol plus ou moins profond, exposition, historique cultural.",
  },
  {
    type: "callout",
    tone: "rappel",
    title: "Rappel : le NDVI, un indice de contraste rouge/NIR (module Les Couleurs)",
    text: "Le module Les Couleurs définit le NDVI = (NIR − Rouge)/(NIR + Rouge), un indice normalisé entre -1 et 1 qui exploite le contraste spectral de la végétation saine. C'est ce même indice, calculé ici sur une série d'images plutôt qu'une seule, qui sert de base à la classification en classes de vigueur ci-dessous.",
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
    text: "Sur une parcelle de 20 ha zonée en trois classes de vigueur (faible/moyenne/forte), une modulation qui réduit la dose d'azote de 20 % sur les 6 ha de classe forte (déjà bien pourvus) et l'augmente de 15 % sur les 4 ha de classe faible, dose uniforme inchangée sur les 10 ha restants, se traduit typiquement par une économie nette d'intrant de l'ordre de quelques pourcents à l'échelle de la parcelle entière, sans perte de rendement sur les zones sous-dosées à tort par l'ancienne dose uniforme. Le calcul : à dose de référence D par hectare, la dose uniforme totalise 20D ; la dose modulée totalise 6×0.8D + 4×1.15D + 10×D = 4.8D + 4.6D + 10D = 19.4D, soit une économie de 0.6D sur 20D ≈ 3 %. Un ordre de grandeur illustratif, jamais transposable tel quel d'une parcelle à l'autre : il dépend entièrement des surfaces réellement concernées et du contexte agronomique local.",
  },

  { type: "heading", text: "2. Étude de cas : d'un NDVI à une carte de préconisation à taux variable", level: "superieur" },
  {
    type: "table",
    headers: ["Étape", "Méthode mobilisée (déjà vue)", "Salle de référence"],
    rows: [
      ["Calcul du NDVI", "Algèbre raster : (NIR−Rouge)/(NIR+Rouge)", "Les Couleurs"],
      ["Nettoyage des artefacts (nuages, ombres)", "Masquage par bande de classification (SCL Sentinel-2)", "L'Atelier"],
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

  { type: "heading", text: "3. Urbanisme : artificialisation des sols et îlots de chaleur", level: "superieur" },
  {
    type: "paragraph",
    text: "L'artificialisation des sols (transformation d'un sol naturel ou agricole en surface bâtie ou imperméabilisée) est un indicateur central des politiques d'urbanisme actuelles (objectif « zéro artificialisation nette » en France) — mesurable directement par télédétection à partir du NDBI (module Les Couleurs) et de son évolution dans le temps.",
  },
  {
    type: "formula",
    label: "Détection de changement par différence de NDBI",
    formula: "ΔNDBI = NDBI(date récente) − NDBI(date ancienne)",
    note: "Une hausse marquée et localisée du NDBI entre deux dates signale une artificialisation récente à cet endroit précis — la même logique de détection de changement que l'Atelier applique déjà au NDVI (ΔNDVI), transposée ici au bâti plutôt qu'à la végétation.",
  },
  {
    type: "callout",
    tone: "info",
    title: "L'îlot de chaleur urbain, une conséquence mesurable de l'artificialisation",
    text: "Les surfaces artificialisées (bitume, béton) stockent et restituent la chaleur différemment d'un sol végétalisé, créant des écarts de température locaux de plusieurs degrés entre un centre-ville dense et sa périphérie végétalisée — mesurable par télédétection thermique (bande infrarouge thermique, disponible sur Landsat mais pas nativement sur Sentinel-2) et directement corrélé, spatialement, au NDBI et à l'inverse au NDVI du même secteur.",
  },

  { type: "heading", text: "4. Étude de cas : suivre l'artificialisation communale dans le temps", level: "superieur" },
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
    text: "Le seuil de ΔNDBI retenu comme « changement significatif » doit être calibré sur des zones de vérité terrain connues (une zone effectivement urbanisée récemment vs une zone restée stable), pas fixé arbitrairement : un seuil trop bas confond bruit radiométrique normal et vrai changement, un seuil trop haut manque des changements réels de faible intensité.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Une commune de 1 200 ha couverte par 120 000 pixels Sentinel-2 (10 m de résolution, 100 m² par pixel). Un seuillage à ΔNDBI > 0.15, calibré sur une zone témoin connue, isole 900 pixels en hausse significative, soit 9 hectares (900 × 100 m²) nouvellement artificialisés en 3 ans — 0.75 % de la surface communale sur la période, un chiffre directement comparable d'une commune à l'autre à condition que le même seuil, calibré de la même façon, soit appliqué partout.",
  },
  {
    type: "paragraph",
    text: "L'objectif « zéro artificialisation nette » (loi Climat et Résilience, 2021, dont les modalités de mise en œuvre ont ensuite été ajustées par la loi du 20 juillet 2023) fixe une trajectoire de réduction du rythme d'artificialisation, mesurée précisément par ce type de suivi ΔNDBI à l'échelle communale ou intercommunale — un exemple direct où une méthode de télédétection alimente un indicateur de politique publique opposable, pas seulement une carte descriptive.",
  },

  { type: "heading", text: "5. Gestion des risques naturels : croiser aléa, enjeux, vulnérabilité en pratique", level: "superieur" },
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

  { type: "heading", text: "6. Ce que ces secteurs partagent méthodologiquement", level: "superieur" },
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
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : chaque secteur enchaîne acquisition datée → indice/classification intermédiaire → décision, jamais un raccourci direct de l'image à la décision ; une détection de changement (ΔNDVI, ΔNDBI) répond à une question d'évolution, pas d'état ; une décision multicritère (AHP) documente toujours sa pondération.",
    ],
  },
  {
    type: "link",
    to: "/discipulus/progression",
    label: "Faire le point sur l'ensemble du parcours",
    description: "Cette salle referme la boucle : chaque méthode mobilisée ici renvoie à la salle où elle a été apprise en détail — un bon moment pour vérifier sa progression d'ensemble.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Étude de cas : hiérarchiser un risque incendie à l'échelle communale", level: "approfondissement" },
  {
    type: "table",
    headers: ["Composante", "Donnée mobilisée", "Salle de référence"],
    rows: [
      ["Aléa", "Pente, exposition, type de végétation (indice composite), historique des départs de feu (Gi*)", "Fondements (pente), Les Couleurs (NDVI/type de couvert), Les Statistiques (Gi*)"],
      ["Enjeux", "Densité de bâti par statistique de zone, distance aux voies d'accès pompiers", "Le Compas"],
      ["Vulnérabilité", "Matériaux de construction dominants, âge du bâti (donnée cadastrale/INSEE croisée spatialement)", "Le Compas (jointure spatiale)"],
      ["Priorisation finale", "Analyse multicritère (AHP) pondérant les trois couches, documentée explicitement", "Le Compas ; Les Statistiques"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi documenter la pondération, pas seulement la carte finale",
    text: "Deux communes voisines peuvent légitimement pondérer différemment aléa/enjeux/vulnérabilité selon leurs priorités locales (une commune avec beaucoup d'habitat isolé en forêt pondérera davantage la vulnérabilité qu'une commune essentiellement agricole). La carte finale seule, sans la pondération documentée qui l'a produite, ne peut ni être auditée ni être comparée honnêtement à celle d'une autre commune.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré : une pondération AHP appliquée à deux secteurs",
    text: "Poids retenus et documentés pour cette commune : 0.5 (aléa), 0.3 (enjeux), 0.2 (vulnérabilité), chaque composante normalisée entre 0 et 1. Secteur A (massif forestier peu habité) : aléa 0.9, enjeux 0.2, vulnérabilité 0.4 → score = 0.5×0.9 + 0.3×0.2 + 0.2×0.4 = 0.45 + 0.06 + 0.08 = 0.59. Secteur B (lisière avec habitat dispersé) : aléa 0.6, enjeux 0.7, vulnérabilité 0.8 → score = 0.30 + 0.21 + 0.16 = 0.67. Malgré un aléa nettement plus faible, le secteur B ressort prioritaire devant le secteur A : c'est l'effet recherché d'une pondération multicritère, qui empêcherait un classement fondé sur l'aléa seul de sous-estimer un secteur à enjeux et vulnérabilité élevés.",
  },

  { type: "heading", text: "2. Foresterie et gestion des ressources naturelles", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La gestion forestière mobilise une combinaison différente : un modèle de hauteur de canopée LiDAR (module LiDAR) pour estimer un volume de bois sur pied, croisé avec une classification d'essence par imagerie multispectrale ou hyperspectrale (module Le Regard) et un suivi temporel de coupes rases par détection de changement (même logique ΔNDVI que pour l'urbanisme), pour planifier une exploitation durable plutôt que réagir après coup à une coupe déjà réalisée.",
  },
  {
    type: "link",
    to: "/module/lidar",
    label: "Voir aussi : le modèle de hauteur de canopée (CHM)",
    description: "Le module LiDAR détaille le calcul CHM = MNS − MNT mobilisé ici pour estimer un volume de bois sur pied.",
  },

  { type: "heading", text: "3. Étude de cas : estimer un volume de bois sur pied", level: "approfondissement" },
  {
    type: "table",
    headers: ["Étape", "Méthode mobilisée (déjà vue)", "Salle de référence"],
    rows: [
      ["Modèle de hauteur de canopée (CHM)", "CHM = MNS − MNT, différence de deux surfaces LiDAR", "LiDAR"],
      ["Classification d'essence (résineux/feuillus)", "Classification supervisée sur signature spectrale", "Le Regard, L'Intelligence"],
      ["Volume sur pied par placette", "Équation allométrique hauteur → volume, calibrée par essence", "Introduite ici, propre à ce secteur"],
      ["Suivi des coupes rases dans le temps", "Détection de changement, seuillage ΔNDVI", "Les Couleurs"],
    ],
  },
  {
    type: "formula",
    label: "Forme générale d'une équation allométrique hauteur → volume",
    formula: "V = a × Hᵇ",
    note: "V = volume de bois sur pied (m³), H = hauteur dominante issue du CHM (m), a et b = coefficients ajustés par régression sur des placettes mesurées au sol, propres à l'essence et à la région étudiées — sans valeur universelle (voir la mise en garde ci-dessous). À titre d'illustration du mécanisme, pas comme des coefficients à réutiliser : pour un peuplement résineux avec a=0.03 et b=2, une hauteur CHM de 18 m donnerait V ≈ 0.03 × 18² ≈ 9.7 m³ par arbre-type de la placette, à multiplier ensuite par la densité de tiges à l'hectare pour un volume sur pied surfacique.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une équation allométrique n'est valable que dans son domaine de calibration",
    text: "La relation entre hauteur de canopée et volume de bois (équation allométrique) est calibrée sur un échantillon de placettes mesurées au sol, pour une essence et une région données. L'appliquer telle quelle à une essence différente, ou à un peuplement d'âge très différent de celui de l'échantillon de calibration, produit une estimation de volume potentiellement fausse sans qu'aucune erreur ne soit visible dans le calcul lui-même — seule une nouvelle calibration locale, ou une équation publiée explicitement pour ce contexte, garantit un résultat fiable.",
  },

  { type: "heading", text: "4. Limites d'un transfert méthodologique d'un secteur à l'autre", level: "approfondissement" },
  {
    type: "callout",
    tone: "warning",
    title: "Une méthode qui marche dans un secteur ne se transpose pas automatiquement",
    text: "Un seuil de ΔNDBI calibré pour détecter une artificialisation urbaine n'a aucune raison de bien fonctionner tel quel pour détecter un changement agricole (rotation de cultures normale, pas un vrai changement d'occupation du sol) : chaque secteur a sa propre dynamique temporelle et ses propres faux positifs typiques. Réutiliser une méthode d'un secteur à l'autre exige de re-calibrer sur une vérité terrain propre au nouveau secteur, jamais de transposer directement un seuil ou un poids validé ailleurs.",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Un service technique propose de réutiliser directement, pour détecter les coupes rases en foresterie (étude de cas ci-dessus), le seuil de ΔNDVI validé pour l'agriculture de précision (piste Licence/BUT). En t'appuyant sur cette section, explique pourquoi cette réutilisation directe est risquée, et ce qu'il faudrait faire avant de l'adopter.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : une priorisation de risque documente sa pondération AHP, jamais implicite ; une équation allométrique n'est valide que dans son domaine de calibration (essence, région, âge du peuplement) ; un seuil ou un poids validé dans un secteur ne se transpose jamais automatiquement à un autre secteur sans nouvelle calibration sur une vérité terrain propre à ce secteur.",
    ],
  },
  {
    type: "link",
    to: "/discipulus/progression",
    label: "Faire le point sur l'ensemble du parcours",
    description: "Cette salle referme la boucle : chaque méthode mobilisée ici renvoie à la salle où elle a été apprise en détail — un bon moment pour vérifier sa progression d'ensemble.",
  },
]
