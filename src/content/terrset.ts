import type { ContentBlock } from "./types"

export const terrsetContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "TerrSet (anciennement IDRISI) est un logiciel de Clark Labs, spécialisé dans l'analyse raster et la modélisation prédictive de l'occupation du sol — là où QGIS (module Les Outils) est avant tout un SIG cartographique généraliste, capable aussi bien de vecteur que de raster, TerrSet se concentre sur le raster et sur une question précise : comment le territoire change-t-il, et comment changera-t-il demain ? Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Qu'est-ce que TerrSet ?", level: "lycee" },
  {
    type: "paragraph",
    text: "TerrSet est développé depuis les années 1980 par Clark Labs, un laboratoire de recherche rattaché à Clark University (Massachusetts, États-Unis). Le logiciel s'appelait à l'origine IDRISI, du nom du géographe et cartographe marocain du XIIe siècle Muhammad al-Idrisi, auteur d'une des premières grandes synthèses cartographiques du monde connu. Il a changé de nom pour TerrSet en 2015, en même temps qu'il intégrait de nouveaux modules dédiés au changement environnemental global.",
  },
  {
    type: "callout",
    tone: "info",
    title: "TerrSet à côté de QGIS, pas à sa place",
    text: "QGIS excelle à afficher, styliser, interroger et combiner des couches vectorielles et raster de façon interactive — c'est l'outil du quotidien pour produire une carte ou explorer un territoire. TerrSet part d'un autre principe : presque tout y est raster (une grille de pixels, jamais un point/ligne/polygone), et sa vocation n'est pas de faire de belles cartes mais de modéliser — classifier une image satellite, croiser des critères pour trouver le meilleur site, ou simuler l'occupation du sol de demain à partir de celle d'hier. Les deux logiciels sont complémentaires plus que concurrents : beaucoup de projets préparent leurs données sous QGIS puis les modélisent sous TerrSet, avant de ramener le résultat sous QGIS pour la mise en page finale.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un logiciel propriétaire",
    text: "Contrairement à QGIS (libre et gratuit), TerrSet est un logiciel commercial : son usage nécessite une licence, le plus souvent une licence académique fournie par un établissement d'enseignement ou de recherche. On y revient dans la piste Master/Recherche, en le comparant à l'écosystème libre (QGIS, R).",
  },

  { type: "heading", text: "2. L'interface : Explorer, fenêtres d'affichage, format propre", level: "lycee" },
  {
    type: "list",
    items: [
      "Explorer (Workspace / Project Explorer) : équivalent du panneau des couches de QGIS, mais organisé par « workspace » (dossier de travail) plutôt que par projet unique — chaque analyse déplace ou crée de nouveaux fichiers dans ce dossier",
      "Fenêtre d'affichage raster : chaque image ouverte (Display > Add Layer) s'affiche dans sa propre fenêtre, avec sa palette de couleurs associée, plutôt que toutes superposées comme dans la vue carte unique de QGIS",
      "Palette / légende : une image raster catégorielle (occupation du sol) s'affiche avec une palette de couleurs qui associe une teinte à chaque code de classe ; une image raster continue (altitude, NDVI) utilise un dégradé",
      "Deux formats natifs : le format raster propre à IDRISI/TerrSet, en réalité une paire de fichiers — un fichier de données binaires « .rst » et un fichier texte de métadonnées « .rdc » qui l'accompagne toujours (résolution, système de coordonnées, nombre de lignes/colonnes, type de valeurs) — et un format vecteur « .vct », plus rarement utilisé que le raster dans TerrSet",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais déplacer un .rst sans son .rdc",
    text: "Un fichier .rst seul, sans le fichier .rdc de même nom à côté, est illisible pour TerrSet : c'est le .rdc qui indique comment interpréter les octets du .rst (dimensions, système de coordonnées, type de données). Copier, renommer ou envoyer un raster TerrSet impose donc toujours de déplacer la paire .rst + .rdc ensemble, jamais un seul des deux fichiers.",
  },
  {
    type: "diagram",
    name: "vector-raster",
    caption: "TerrSet travaille presque exclusivement dans le monde de droite (raster) : une grille de pixels, chacun porteur d'une valeur — plutôt que des points/lignes/polygones vectoriels, le domaine principal de QGIS.",
  },
  {
    type: "list",
    items: [
      "Menu Analysis : regroupe la quasi-totalité des modules de traitement (RECLASS, CROSSTAB, classification, MCE, LCM…), organisés par grande famille (GIS Analysis, Image Processing, Change/Time Series, Decision Support)",
      "Menu Display : contrôle l'affichage (ajout de couche, composition colorée pour une image multibande, curseur de transparence)",
      "Chaque module s'ouvre dans sa propre boîte de dialogue, qui demande une image (ou plusieurs) en entrée et un nom de fichier de sortie — le même schéma répété d'un module à l'autre, ce qui rend l'interface prévisible une fois un premier module maîtrisé",
    ],
  },

  { type: "heading", text: "3. Lire une image classifiée d'occupation du sol", level: "lycee" },
  {
    type: "paragraph",
    text: "Une image classifiée d'occupation du sol n'est pas une photo : chaque pixel porte un code entier (1, 2, 3…) qui désigne une catégorie (forêt, eau, zone bâtie, culture…), et non une valeur de réflectance comme dans une image satellite brute (module Les Couleurs). La légende catégorielle associe à chaque code un nom de classe et une couleur — sans elle, une image classifiée n'est qu'une mosaïque de nombres sans signification.",
  },
  {
    type: "table",
    headers: ["Code", "Classe", "Couleur usuelle"],
    rows: [
      ["1", "Eau", "Bleu"],
      ["2", "Forêt", "Vert foncé"],
      ["3", "Zone bâtie", "Rouge / gris"],
      ["4", "Culture / sol nu", "Beige / brun"],
      ["5", "Prairie / végétation basse", "Vert clair"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Une image classifiée, une carte thématique",
    text: "Afficher une image classifiée avec sa légende catégorielle (module DISPLAY) produit exactement le même type d'objet qu'une carte thématique papier : chaque couleur renvoie à une catégorie discrète listée dans la légende, pas à une échelle continue de valeurs.",
  },

  { type: "heading", text: "4. Reclassement simple avec RECLASS", level: "lycee" },
  {
    type: "paragraph",
    text: "RECLASS est l'un des modules les plus utilisés de TerrSet : il attribue de nouveaux codes à une image raster, en regroupant plusieurs classes détaillées en une classe plus large, ou en isolant une classe précise du reste. C'est l'équivalent raster de fusionner des catégories dans une table attributaire vectorielle.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Ouvrir le module RECLASS et choisir l'image raster source (l'occupation du sol détaillée à reclasser)",
      "Définir une table de correspondance : pour chaque intervalle ou valeur d'entrée, indiquer la nouvelle valeur de sortie (ex. les codes 21, 22 et 23 « forêt de feuillus », « forêt de conifères », « forêt mixte » deviennent tous le code 2 « forêt »)",
      "Lancer le reclassement : TerrSet produit une nouvelle image raster, avec sa propre paire .rst/.rdc, sans modifier l'image source",
      "Vérifier le résultat en affichant la nouvelle image avec sa légende catégorielle simplifiée",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "Une occupation du sol détaillée en 15 classes (forêt de feuillus, forêt de conifères, forêt mixte, culture de blé, culture de maïs, prairie permanente…) devient, après RECLASS, une occupation du sol simplifiée en 5 grandes classes (forêt, culture, prairie, eau, bâti) — plus lisible pour une comparaison entre deux dates, et souvent la première étape avant une analyse de changement.",
  },

  { type: "heading", text: "5. Comparer deux dates avec CROSSTAB", level: "lycee" },
  {
    type: "paragraph",
    text: "CROSSTAB croise, pixel par pixel, deux images d'occupation du sol à deux dates différentes (par exemple 2010 et 2020), à condition qu'elles partagent exactement la même emprise et la même résolution. Le résultat est une matrice de changement (croisée) : chaque case indique combien de pixels appartenaient à une classe donnée en 2010 et à une autre (ou la même) classe en 2020.",
  },
  {
    type: "table",
    headers: ["2010 \\ 2020", "Forêt", "Culture", "Bâti"],
    rows: [
      ["Forêt", "820", "45", "10"],
      ["Culture", "15", "610", "60"],
      ["Bâti", "0", "5", "300"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Lire une matrice de changement",
    text: "La diagonale (Forêt→Forêt, Culture→Culture, Bâti→Bâti) représente les pixels qui n'ont pas changé de classe entre les deux dates. Tout ce qui est hors diagonale est un changement réel : par exemple 45 pixels classés « Forêt » en 2010 sont devenus « Culture » en 2020 (défrichement agricole), et 60 pixels « Culture » sont devenus « Bâti » (urbanisation).",
  },

  { type: "heading", text: "6. Calculer les surfaces qui changent de classe", level: "lycee" },
  {
    type: "paragraph",
    text: "Chaque pixel d'un raster représente une surface fixe et connue (par exemple 30 m × 30 m = 900 m² pour une image Landsat). Connaître le nombre de pixels d'une case de la matrice de changement suffit donc à calculer directement la surface concernée, sans passer par aucun calcul supplémentaire compliqué.",
  },
  {
    type: "formula",
    label: "Surface changée à partir d'un nombre de pixels",
    formula: "Surface (ha) = Nombre de pixels × (taille du pixel en m)² / 10 000",
    note: "Exemple : 45 pixels de 30 m de côté passés de Forêt à Culture représentent 45 × 900 m² = 40 500 m², soit 4,05 hectares défrichés entre les deux dates.",
  },
  {
    type: "devoir",
    format: "Exercice noté",
    title: "Interpréter une matrice de changement",
    prompt: "À partir de la matrice de changement 2010→2020 présentée en section 5 (résolution du pixel : 30 m), calcule la surface en hectares (1) qui est restée en forêt sur les deux dates, (2) qui est passée de forêt à culture, (3) qui est passée de culture à bâti. Conclus en une phrase sur la dynamique dominante observée entre ces deux dates (quelle classe gagne le plus de surface, laquelle en perd).",
    criteria: [
      "Les trois surfaces sont calculées avec la bonne formule (nombre de pixels × 900 m² / 10 000)",
      "La distinction entre diagonale (stabilité) et hors-diagonale (changement) est correctement appliquée",
      "La conclusion identifie correctement la classe qui gagne de la surface et celle qui en perd",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : TerrSet (Clark Labs, ex-IDRISI) est un logiciel raster et de modélisation prédictive, complémentaire de QGIS plutôt qu'un concurrent cartographique ; le format propre .rst (données) + .rdc (métadonnées) va toujours par paire, comme le format vecteur .vct ; une image classifiée porte un code par pixel, lu grâce à une légende catégorielle ; RECLASS regroupe des classes détaillées en classes plus larges ; CROSSTAB croise deux dates en une matrice de changement, dont la diagonale indique la stabilité et le reste les vrais changements ; connaître la taille du pixel suffit à convertir un nombre de pixels changés en surface réelle.",
    ],
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Revoir : lire une image satellite et ses indices",
    description: "Le module Les Couleurs explique la réflectance et les indices spectraux qui servent souvent de base à une classification d'occupation du sol.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Classification d'image : supervisée et non supervisée", level: "superieur" },
  {
    type: "paragraph",
    text: "Produire une image classifiée d'occupation du sol (celle lue en piste Lycée) à partir d'une image satellite brute est elle-même une analyse à part entière. TerrSet propose les deux grandes familles de classification déjà présentées de façon générale dans le module L'Intelligence : la classification non supervisée, qui regroupe automatiquement les pixels aux signatures spectrales proches sans exemple fourni, et la classification supervisée, qui apprend à partir d'échantillons d'entraînement dont la classe réelle est déjà connue.",
  },
  {
    type: "diagram",
    name: "classification-methods",
    caption: "Non supervisée : les classes émergent des données. Supervisée : les classes sont apprises depuis des exemples étiquetés — les deux voies que couvrent respectivement CLUSTER et MAKESIG + MAXLIKE sous TerrSet.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "CLUSTER (non supervisée)",
        points: [
          "Regroupe les pixels en un nombre de classes choisi par l'opérateur, selon leur seule proximité spectrale (bandes utilisées comme dimensions)",
          "Aucun échantillon de terrain requis au départ",
          "L'opérateur nomme chaque classe a posteriori, une fois les regroupements obtenus",
          "Utile en exploration rapide, ou quand aucune donnée de terrain fiable n'est disponible",
        ],
      },
      {
        label: "MAKESIG + MAXLIKE (supervisée)",
        points: [
          "MAKESIG construit une signature spectrale de référence pour chaque classe, à partir de zones d'entraînement dessinées par l'opérateur sur des secteurs de classe connue",
          "MAXLIKE (classification par maximum de vraisemblance) attribue ensuite chaque pixel de l'image entière à la classe dont la signature statistique le rend le plus probable",
          "Exige des zones d'entraînement représentatives et suffisamment nombreuses par classe",
          "Généralement plus précise que CLUSTER quand des données de terrain fiables existent",
        ],
      },
    ],
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger l'image multibande à classifier (composite des bandes utiles, souvent après un empilement type CONCAT)",
      "Dessiner ou importer les zones d'entraînement (polygones vectoriels convertis en raster) pour chaque classe à reconnaître",
      "Lancer MAKESIG sur ces zones : le module calcule, par classe, la moyenne et la variabilité (matrice de variance-covariance) des valeurs de réflectance sur chaque bande",
      "Lancer MAXLIKE en lui fournissant les signatures produites : chaque pixel de l'image est comparé statistiquement à chaque signature et affecté à la classe la plus vraisemblable",
      "Le résultat est une nouvelle image raster catégorielle, une classe par pixel — exactement le type d'image lu en piste Lycée",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Des zones d'entraînement pures, pas mélangées",
    text: "Une zone d'entraînement qui chevauche accidentellement deux classes réelles (par exemple une lisière forêt/culture) pollue la signature MAKESIG de la classe visée : la moyenne et la variance calculées ne représentent plus fidèlement la classe pure. Dessiner des zones d'entraînement strictement homogènes, loin des transitions, est la précaution la plus importante avant MAXLIKE — bien plus que le nombre exact de pixels par zone.",
  },
  {
    type: "table",
    headers: ["Hypothèse de MAXLIKE", "Conséquence si elle est violée"],
    rows: [
      ["Distribution normale des valeurs de réflectance par classe", "Une classe multimodale (ex. « bâti » qui mélange toit clair et toit sombre) est mal représentée par une seule moyenne/variance"],
      ["Zones d'entraînement représentatives de toute la variabilité de la classe", "Une classe sous-échantillonnée dans une seule partie de l'image généralise mal au reste"],
      ["Classes suffisamment séparées spectralement", "Deux classes aux signatures trop proches (ombre et eau, par exemple) se confondent systématiquement dans le résultat"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "CLUSTER : comment TerrSet regroupe sans exemple",
    text: "CLUSTER s'appuie sur un algorithme itératif proche des k-moyennes déjà présenté dans le module L'Intelligence : un nombre de classes k est fixé au départ, chaque pixel est d'abord affecté au centre le plus proche dans l'espace des bandes, puis chaque centre est recalculé comme la moyenne des pixels qui lui sont affectés, et ainsi de suite jusqu'à stabilisation. Le résultat dépend du nombre de classes k choisi au départ : un k trop petit fusionne des classes réellement distinctes, un k trop grand fragmente artificiellement une classe homogène en plusieurs sous-groupes.",
  },

  { type: "heading", text: "2. Évaluer une classification : matrice de confusion et kappa", level: "superieur" },
  {
    type: "paragraph",
    text: "Une classification produite par MAXLIKE ou CLUSTER n'est fiable qu'après vérification quantitative contre des points de référence indépendants (relevé de terrain, photo-interprétation, image à plus haute résolution) — exactement la méthode déjà détaillée dans le module L'Intelligence à propos de la matrice de confusion et du coefficient kappa, qui s'applique ici sans changement au résultat d'une classification TerrSet.",
  },
  {
    type: "callout",
    tone: "info",
    title: "ERRMAT, le module dédié sous TerrSet",
    text: "TerrSet dispose d'un module spécifique, ERRMAT (error matrix), qui croise une image classifiée et une image ou un jeu de points de référence pour produire directement la matrice de confusion, la précision globale, les précisions par classe et le coefficient kappa — l'équivalent raster-natif de ce que décrit le module L'Intelligence de façon plus générale.",
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : matrice de confusion et coefficient kappa en détail",
    description: "Le module L'Intelligence détaille le calcul du kappa (Cohen, 1960) et son interprétation, directement applicable au résultat d'ERRMAT sous TerrSet.",
  },

  { type: "heading", text: "3. CROSSTAB approfondi : taux de changement, gains et pertes", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà de la simple lecture de la diagonale (piste Lycée), CROSSTAB produit une matrice de transition complète qui permet de calculer, pour chaque classe, un bilan net de gains et de pertes : une classe peut perdre beaucoup de surface vers une classe tout en en gagnant presque autant depuis une autre, un bilan net proche de zéro qui masquerait une réalité très différente si l'on ne regardait que le solde final.",
  },
  {
    type: "formula",
    label: "Gain, perte et solde net d'une classe entre deux dates",
    formula: "Solde net (classe k) = Gains(k) − Pertes(k) = Σᵢ≠ₖ Transitionᵢ→ₖ − Σⱼ≠ₖ Transitionₖ→ⱼ",
    note: "Gains(k) = somme des pixels venus d'une autre classe vers k ; Pertes(k) = somme des pixels partis de k vers une autre classe. Un solde net proche de zéro peut correspondre soit à une classe réellement stable, soit à une classe qui échange simultanément beaucoup de surface dans les deux sens (churning) — CROSSTAB permet de distinguer les deux situations, une simple carte de différence ne le permettrait pas.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un solde net trompeur",
    text: "Une classe « prairie » qui perd 200 pixels au profit de la culture mais en gagne 190 depuis la forêt affiche un solde net de −10 pixels seulement — presque stable en apparence — alors que 390 pixels ont effectivement changé de classe dans un sens ou dans l'autre. Le taux de changement brut (gains + pertes), pas seulement le solde net, est l'indicateur à retenir pour caractériser la dynamique réelle d'une classe.",
  },

  { type: "heading", text: "4. Chaîne de Markov (MARKOV) : prédire les proportions futures", level: "superieur" },
  {
    type: "paragraph",
    text: "Une chaîne de Markov modélise un changement comme un processus probabiliste : la probabilité qu'un pixel appartenant à une classe donnée passe à une autre classe lors du prochain intervalle de temps ne dépend que de sa classe actuelle, pas de son historique antérieur. Le module MARKOV de TerrSet calcule cette matrice de probabilités de transition directement à partir de deux images d'occupation du sol à deux dates passées (le même type d'entrée que CROSSTAB), puis l'utilise pour projeter les proportions de classes à une date future.",
  },
  {
    type: "formula",
    label: "Matrice de transition markovienne",
    formula: "P(classe j au temps t+1 | classe i au temps t) = pᵢⱼ,  avec Σⱼ pᵢⱼ = 1 pour chaque ligne i",
    note: "Chaque ligne pᵢⱼ de la matrice de transition (obtenue en normalisant chaque ligne de la matrice de changement CROSSTAB par son total) donne la probabilité qu'un pixel de la classe i passe à la classe j lors du prochain pas de temps. MARKOV applique cette matrice aux surfaces globales actuelles pour projeter la proportion de chaque classe à une date future, en supposant que les tendances de transition observées se maintiennent.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "MARKOV prédit des quantités, pas des emplacements",
    text: "Le résultat direct de MARKOV est une table de proportions de classes futures (combien d'hectares de forêt, de culture, de bâti) et une image de probabilité de transition par classe — mais pas encore une carte de l'occupation du sol future : MARKOV ne dit pas où précisément chaque changement aura lieu. C'est le rôle de CA_MARKOV (piste Master/Recherche), qui combine ces probabilités avec un automate cellulaire spatialement explicite.",
  },

  { type: "heading", text: "5. Évaluation multicritère (MCE) : flou et pondération", level: "superieur" },
  {
    type: "paragraph",
    text: "L'évaluation multicritère (Multi-Criteria Evaluation, MCE) combine plusieurs couches raster de critères différents en une seule carte de synthèse — typiquement une carte d'aptitude à l'implantation d'une activité, ou de risque. Chaque critère doit d'abord être normalisé sur une échelle commune (souvent 0 à 255) avant de pouvoir être pondéré et combiné.",
  },
  {
    type: "brique",
    id: "terrset-fuzzy-mce",
    title: "FUZZY, WEIGHT et la combinaison linéaire pondérée",
    blocks: [
      {
        type: "list",
        items: [
          "FUZZY (fonctions d'appartenance floue) : transforme un critère brut (distance, pente, altitude) en un score continu de 0 à 1, selon une fonction sigmoïdale, linéaire, en J ou en cloche — plutôt qu'un seuil binaire (« apte » / « inapte »), un pixel à 490 m d'une route reçoit un score proche mais légèrement inférieur à un pixel à 500 m, une transition progressive plus réaliste qu'une coupure nette",
          "WEIGHT (comparaison par paires, méthode AHP de Saaty) : dérive le poids relatif de chaque critère à partir d'une matrice de comparaisons deux à deux (« la pente compte-t-elle plus ou moins que la distance aux routes, et dans quelle proportion ? »), avec un ratio de cohérence qui signale des jugements mutuellement contradictoires",
          "MCE (combinaison linéaire pondérée, Weighted Linear Combination) : additionne chaque critère normalisé multiplié par son poids pour produire la carte de synthèse finale",
        ],
      },
      {
        type: "formula",
        label: "Combinaison linéaire pondérée (WLC)",
        formula: "Aptitude(x) = Σᵢ wᵢ · critère_i(x)   avec Σᵢ wᵢ = 1",
        note: "Identique dans sa forme à la formule AHP déjà présentée dans le module Le Compas (piste Master/Recherche) — TerrSet fournit un module dédié (WEIGHT) pour dériver rigoureusement les wᵢ d'une matrice de comparaison par paires plutôt que de les fixer au jugé.",
      },
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir : l'AHP de Saaty en détail",
    description: "Le module Le Compas détaille la matrice de comparaison par paires et le ratio de cohérence de l'AHP, la méthode que WEIGHT implémente sous TerrSet.",
  },

  { type: "heading", text: "6. Analyse de distance et de coût (DISTANCE, COST)", level: "superieur" },
  {
    type: "paragraph",
    text: "DISTANCE calcule, pour chaque pixel de l'image, la distance euclidienne (à vol d'oiseau) jusqu'à l'entité la plus proche d'une couche cible (une route, un cours d'eau, une zone urbaine) — un critère brut, ensuite souvent passé dans FUZZY avant d'entrer dans une MCE. COST va plus loin : il remplace la distance à vol d'oiseau par un coût de déplacement cumulé, en tenant compte d'une surface de friction (pente, type de sol, présence d'obstacles) qui rend certains trajets plus coûteux que d'autres même sur une distance géométrique identique.",
  },
  {
    type: "list",
    items: [
      "DISTANCE : distance euclidienne pure, utile pour un critère simple d'accessibilité ou de zone tampon raster",
      "Surface de friction (coût unitaire de déplacement par pixel) : construite à partir de la pente, de l'occupation du sol, ou de contraintes réglementaires connues, préalable indispensable à COST",
      "COST (cost-distance) : distance de coût cumulé jusqu'à la cible la plus proche, en tenant compte de la surface de friction",
      "Cost-path : une fois la distance de coût calculée depuis une origine, extrait le tracé de coût minimal entre cette origine et une destination donnée — l'équivalent raster de Dijkstra (module Le Compas) sur une grille de friction plutôt que sur un graphe de routes",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "Une distance euclidienne de 2 km à travers un massif montagneux escarpé et une distance euclidienne identique de 2 km sur un plateau plat représentent, en réalité, des efforts d'accès radicalement différents. COST, calculé sur une surface de friction incluant la pente, restitue cette différence — DISTANCE seul, purement géométrique, ne le peut pas.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Construire la surface de friction : RECLASS ou une combinaison OVERLAY de plusieurs couches (pente, type de sol, obstacles) en un coût unitaire de déplacement par pixel, souvent normalisé sur une échelle simple (1 = coût minimal, valeurs croissantes = déplacement plus coûteux)",
      "Lancer COST à partir d'une ou plusieurs sources (routes existantes, points d'accès) et de cette surface de friction : le résultat est une image où chaque pixel porte le coût cumulé minimal pour l'atteindre depuis la source la plus proche",
      "Lancer cost-path entre une origine et une destination précises pour extraire le tracé optimal, si le besoin est un itinéraire plutôt qu'une carte de coût généralisée",
    ],
  },

  { type: "heading", text: "7. Produire une carte d'aptitude (site suitability)", level: "superieur" },
  {
    type: "paragraph",
    text: "Une analyse d'aptitude à l'implantation combine typiquement deux logiques complémentaires : des contraintes booléennes (des zones strictement exclues, quel que soit leur score sur les autres critères — une zone inondable, une réserve naturelle) et des critères continus combinés par MCE (accessibilité, pente, proximité aux réseaux). Confondre les deux logiques est l'erreur la plus fréquente en analyse d'aptitude.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Construire un masque booléen des contraintes absolues (RECLASS d'une couche réglementaire en 0 = exclu / 1 = autorisé), une par contrainte, puis les combiner par OVERLAY en mode multiplicatif pour n'en garder qu'un seul masque final",
      "Normaliser chaque critère continu retenu avec FUZZY (accessibilité routière via DISTANCE ou COST, pente, exposition…)",
      "Dériver les poids de chaque critère continu avec WEIGHT (comparaison par paires AHP)",
      "Combiner les critères normalisés et pondérés en une carte d'aptitude continue avec MCE (WLC)",
      "Multiplier la carte d'aptitude continue par le masque booléen des contraintes (OVERLAY) : toute zone exclue par une contrainte absolue reste à zéro, quel que soit son score sur les autres critères",
    ],
  },
  {
    type: "table",
    headers: ["Critère", "Traitement", "Poids AHP (exemple)"],
    rows: [
      ["Distance aux routes", "DISTANCE puis FUZZY décroissant", "0,35"],
      ["Pente", "RECLASS ou FUZZY décroissant", "0,25"],
      ["Distance aux zones déjà bâties", "DISTANCE puis FUZZY décroissant", "0,20"],
      ["Exposition solaire", "FUZZY croissant", "0,20"],
      ["Zone inondable", "RECLASS booléen (contrainte, hors pondération)", "—"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une contrainte n'est pas un critère à pondérer",
    text: "Intégrer une contrainte absolue (zone inondable, périmètre de protection réglementaire) comme un simple critère supplémentaire dans la MCE, avec un poids parmi d'autres, est une erreur méthodologique classique : un poids, même faible, laisse toujours la possibilité qu'un excellent score sur les autres critères compense une zone qui aurait dû être strictement exclue. Les contraintes se traitent en masque booléen multiplicatif, en dehors de la pondération — jamais comme un critère de plus.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : MAKESIG construit des signatures d'entraînement, MAXLIKE classe par maximum de vraisemblance (supervisée), CLUSTER regroupe sans exemple (non supervisée) ; ERRMAT évalue une classification (matrice de confusion, kappa) ; CROSSTAB en transition complète distingue gains, pertes et solde net (le churning peut masquer un solde net proche de zéro) ; MARKOV prédit des proportions futures de classes à partir d'une matrice de probabilités de transition, mais pas leur localisation ; FUZZY normalise un critère en continu, WEIGHT (AHP) pondère, MCE combine ; DISTANCE est euclidienne, COST intègre une surface de friction ; une carte d'aptitude sépare toujours contraintes booléennes (masque multiplicatif) et critères continus (MCE pondérée).",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : classification et indices sur une vraie image",
    description: "L'Atelier applique la classification supervisée et l'évaluation de précision sur un jeu de données réel, une base directement transposable sous TerrSet.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Land Change Modeler (LCM) : le workflow complet", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Land Change Modeler (LCM) est le module signature de TerrSet : un environnement intégré, construit au-dessus de CROSSTAB et MARKOV, qui guide l'utilisateur du diagnostic du changement historique jusqu'à la simulation spatialement explicite du changement futur, sans avoir à enchaîner manuellement chaque module bas niveau.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Analyse du changement historique : LCM compare deux cartes d'occupation du sol à deux dates passées (comme CROSSTAB), et affiche directement les transitions dominantes classées par surface, ainsi que des cartes de gains et de pertes par classe",
      "Sélection des transitions à modéliser : l'utilisateur choisit quelles transitions (ex. forêt → culture, prairie → bâti) sont suffisamment importantes en surface et en enjeu pour justifier un sous-modèle dédié — modéliser toutes les transitions possibles, y compris marginales, dilue inutilement la qualité du résultat",
      "Constitution des variables explicatives : un jeu de couches raster candidates pour expliquer où chaque transition a des chances de se produire — distance aux routes existantes, distance aux zones déjà urbanisées, pente, altitude, distance aux cours d'eau, zonage réglementaire",
      "Sous-modèles de transition : pour chaque transition retenue, LCM entraîne un modèle statistique qui relie la probabilité de transition observée aux variables explicatives, au choix par régression logistique ou par un perceptron multicouche (MLP) intégré au module — LCM restitue en sortie une carte de potentiel de transition par sous-modèle",
      "Prédiction : LCM combine les cartes de potentiel de transition avec les quantités de changement projetées par une chaîne de Markov (proportions futures de classes) pour produire une carte simulée de l'occupation du sol future",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Régression logistique ou perceptron multicouche : deux moteurs, un même rôle",
    text: "Les deux sous-modèles répondent à la même question — quelle est la probabilité qu'un pixel donné subisse cette transition, compte tenu de ses variables explicatives ? La régression logistique reste linéaire dans l'espace des variables (transformées par la fonction logistique) et ses coefficients s'interprètent directement (module L'Intelligence, tension biais/variance). Le perceptron multicouche (MLP) intégré à LCM, un réseau de neurones simple à une ou deux couches cachées, capture des relations non linéaires plus complexes entre variables explicatives, au prix d'une interprétabilité plus faible — un compromis déjà rencontré, sous une autre forme, dans le module L'Intelligence à propos des CNN.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Des variables explicatives pertinentes, pas seulement disponibles",
    text: "Ajouter une variable explicative simplement parce qu'elle existe dans le SIG, sans hypothèse claire sur son rôle causal ou au moins corrélationnel plausible, dilue la qualité du sous-modèle et complique son interprétation. LCM fournit un test de puissance explicative (Cramer's V) par variable : une variable au pouvoir explicatif proche de zéro pour une transition donnée n'a pas sa place dans le sous-modèle correspondant, même si elle reste utile pour une autre transition.",
  },
  {
    type: "table",
    headers: ["Variable explicative", "Transition typiquement expliquée"],
    rows: [
      ["Distance aux routes existantes", "Forêt → culture, prairie → bâti (accessibilité)"],
      ["Distance au bâti existant", "Toute transition vers le bâti (étalement urbain par contiguïté)"],
      ["Pente", "Culture → forêt (déprise agricole en zone pentue), inverse pour l'urbanisation"],
      ["Distance aux cours d'eau", "Bâti → interdiction de fait en zone inondable, culture irriguée"],
      ["Zonage réglementaire", "Contrainte forte sur toute transition en zone protégée"],
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : régression logistique et réseaux de neurones",
    description: "Le module L'Intelligence détaille les deux familles de modèles que LCM propose comme moteur de sous-modèle de transition.",
  },

  { type: "heading", text: "2. CA_MARKOV : automate cellulaire et simulation spatiale", level: "approfondissement" },
  {
    type: "paragraph",
    text: "MARKOV seul (piste Licence/BUT) prédit des quantités de classes futures, sans dire où elles se localiseront. CA_MARKOV comble ce manque en couplant la chaîne de Markov à un automate cellulaire (cellular automaton) : chaque pixel change d'état à chaque itération selon une règle qui dépend à la fois de son état actuel, d'une carte de potentiel/aptitude à changer (typiquement produite par LCM ou par une MCE), et de l'état de ses pixels voisins.",
  },
  {
    type: "list",
    items: [
      "Filtre de contiguïté : à chaque itération, l'automate cellulaire favorise le changement d'un pixel vers une classe déjà présente dans son voisinage immédiat (souvent un filtre 5×5), ce qui produit des taches de changement spatialement cohérentes plutôt qu'un semis aléatoire de pixels isolés — le changement d'occupation du sol se propage réellement dans l'espace, comme en réalité, plutôt que d'apparaître n'importe où selon la seule probabilité globale",
      "Itérations multiples : CA_MARKOV répartit la quantité totale de changement prédite par MARKOV sur plusieurs itérations intermédiaires plutôt qu'en un seul pas de temps, ce qui laisse le filtre de contiguïté influencer progressivement la forme spatiale du résultat",
      "Carte d'aptitude par transition : le potentiel de changement utilisé à chaque itération peut venir d'une MCE simple ou, de façon plus rigoureuse, des sous-modèles de transition de LCM (régression logistique ou MLP)",
    ],
  },
  {
    type: "diagram",
    name: "kernel-convolution",
    caption: "Le filtre de contiguïté de CA_MARKOV applique, à chaque itération, le même principe qu'un noyau de convolution glissé sur l'image : recalculer chaque pixel à partir de la composition de son voisinage immédiat.",
  },
  {
    type: "callout",
    tone: "example",
    title: "CA_MARKOV en pratique",
    text: "Pour simuler l'étalement urbain à horizon 2040 à partir de deux images 2000 et 2020 : MARKOV calcule combien d'hectares de plus seront bâtis d'ici 2040 en prolongeant la tendance observée ; une carte de potentiel de transition (LCM, expliquée par la distance aux routes et aux zones déjà bâties) indique où ce changement est le plus probable ; CA_MARKOV répartit spatialement ces nouveaux hectares bâtis, itération après itération, en favorisant la contiguïté avec le bâti déjà existant plutôt qu'un mitage dispersé.",
  },

  { type: "heading", text: "3. Valider une simulation : la méthode à trois cartes de Pontius", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une carte simulée pour une date déjà passée (par exemple simuler 2020 à partir des tendances observées entre 2000 et 2010, alors que la vraie carte 2020 est disponible) permet de valider la méthode avant de l'appliquer à une date réellement future. La comparer naïvement, pixel à pixel, à la seule carte de référence 2020 surestime cependant la qualité de la simulation : une bonne partie de l'accord vient simplement du fait que la plupart des pixels ne changent pas du tout, entre n'importe quelle paire de dates.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Les trois cartes de la méthode de Pontius (2004)",
    text: "La méthode, formalisée par Robert Gilmore Pontius Jr., compare trois cartes plutôt que deux : la carte de référence à la date de départ (t1), la carte de référence à la date d'arrivée (t2, la vérité terrain), et la carte simulée pour t2. Ce triplet permet de décomposer précisément l'accord entre simulation et réalité en zones où (a) référence et simulation s'accordent sur un changement, (b) elles s'accordent sur une absence de changement (souvent la majorité des pixels, peu informative), (c) la simulation prédit un changement qui n'a pas eu lieu, et (d) la simulation manque un changement qui a réellement eu lieu.",
  },
  {
    type: "formula",
    label: "Kappa spatialisé : quantité contre localisation",
    formula: "Kappa global = f(Kappa de quantité, Kappa de localisation)",
    note: "Pontius décompose le désaccord total entre simulation et réalité en deux composantes indépendantes : le désaccord de quantité (la simulation prédit-elle le bon nombre total de pixels qui changent vers chaque classe, indépendamment d'où ils se trouvent ?) et le désaccord de localisation (parmi une quantité correcte de changement prédit, ces pixels sont-ils localisés au bon endroit ?). Un modèle peut obtenir un bon kappa de quantité (les surfaces globales sont justes, grâce à MARKOV) et un mauvais kappa de localisation (le filtre de contiguïté ou les variables explicatives de LCM placent mal les pixels) — deux défauts de nature très différente que le kappa global, seul, ne distingue pas.",
  },
  {
    type: "table",
    headers: ["Situation observée sur un pixel", "Composante"],
    rows: [
      ["Référence et simulation s'accordent : changement prédit ET observé", "Accord de changement (informatif)"],
      ["Référence et simulation s'accordent : aucun changement ni prédit ni observé", "Accord de persistance (souvent majoritaire, peu informatif)"],
      ["La simulation prédit un changement qui n'a pas eu lieu", "Erreur de commission (fausse alerte)"],
      ["La simulation ne prédit pas un changement qui a pourtant eu lieu", "Erreur d'omission (changement manqué)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le piège du \"null model\"",
    text: "Comparer une simulation à une carte t2 de référence sans se demander quel score obtiendrait le modèle le plus simple possible — celui qui prédit simplement « aucun changement nulle part », c'est-à-dire recopier t1 — surestime la valeur ajoutée réelle de la simulation. Sur un territoire où 90 % des pixels ne changent pas entre deux dates, ce modèle nul atteint déjà 90 % d'accord global sans aucune modélisation : c'est ce niveau de référence, pas 0 %, que CA_MARKOV doit dépasser pour démontrer un apport réel.",
  },

  { type: "heading", text: "4. Planification multi-objectifs (MOLA)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "MOLA (Multi-Objective Land Allocation) répond à une situation différente de la MCE simple (piste Licence/BUT) : plusieurs objectifs d'affectation du sol concurrents (par exemple étendre l'agriculture ET préserver un corridor écologique) se disputent une même surface limitée, chacun avec sa propre carte d'aptitude, sans qu'un score global unique ne suffise à arbitrer entre eux.",
  },
  {
    type: "list",
    items: [
      "Chaque objectif dispose de sa propre carte d'aptitude continue (produite par MCE), indépendante des autres objectifs",
      "MOLA pondère l'importance relative de chaque objectif (un objectif peut avoir la priorité sur les autres, ou tous être traités à égalité)",
      "Pour les zones où plusieurs objectifs revendiquent un même pixel avec une aptitude élevée, MOLA arbitre en cherchant à maximiser l'aptitude totale allouée à l'ensemble du territoire, sous contrainte de la surface totale requise par chaque objectif",
      "Le résultat est une carte d'affectation unique, où chaque pixel est attribué à l'objectif pour lequel un compromis global optimal a été trouvé, pas nécessairement l'objectif qui le voulait le plus fortement",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "MCE contre MOLA",
    text: "Une MCE simple répond à « où est le meilleur site pour un seul objectif ? ». MOLA répond à « comment répartir le territoire entre plusieurs objectifs qui, mis bout à bout, réclament plus de surface qu'il n'y en a de disponible ? » — un problème d'arbitrage collectif, pas un simple classement de pixels un objectif à la fois.",
  },
  {
    type: "table",
    headers: ["Objectif", "Surface requise", "Priorité relative"],
    rows: [
      ["Extension agricole", "1200 ha", "Élevée"],
      ["Corridor écologique", "600 ha", "Élevée"],
      ["Zone d'expansion urbaine", "300 ha", "Moyenne"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Ce que MOLA ne fait pas",
    text: "MOLA arbitre des conflits d'allocation entre objectifs déjà bien définis, chacun avec sa carte d'aptitude propre ; il ne construit pas ces cartes d'aptitude lui-même (rôle de la MCE en amont) et ne modélise pas de dynamique temporelle (rôle de LCM/CA_MARKOV) : c'est un outil de répartition instantanée, pas de simulation.",
  },

  { type: "heading", text: "5. Earth Trends Modeler (ETM) : séries temporelles longues", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Earth Trends Modeler (ETM) traite un problème différent des sections précédentes : non plus comparer deux ou trois dates, mais analyser une longue série temporelle d'images (des dizaines à des centaines de dates), typique des produits satellitaires à répétition fréquente comme les composites NDVI MODIS (16 jours, plusieurs décennies d'archive).",
  },
  {
    type: "list",
    items: [
      "Analyse de tendance (trend) : ajuste pixel par pixel une tendance sur la série temporelle complète, révélant par exemple un verdissement ou un brunissement progressif d'une région sur plusieurs décennies, invisible en comparant seulement une image de début et une de fin",
      "Détection d'anomalies : compare chaque date de la série à ce qui serait normalement attendu à cette période de l'année (moyenne saisonnière de long terme), révélant des événements ponctuels (sécheresse, incendie, gel tardif) que la seule tendance de fond masquerait",
      "Décomposition saisonnière : sépare un signal temporel en une composante de tendance longue, une composante saisonnière cyclique (le cycle végétatif annuel) et un résidu, un principe déjà rencontré pour toute série chronologique (module Les Statistiques)",
      "Analyse en composantes principales temporelle : identifie les principaux modes de variabilité communs à l'ensemble de la série, utile pour résumer une dynamique complexe (ex. distinguer une tendance climatique de long terme d'un cycle El Niño récurrent) en quelques composantes dominantes",
    ],
  },
  {
    type: "table",
    headers: ["Sortie ETM", "Ce qu'elle révèle"],
    rows: [
      ["Pente de tendance par pixel", "Verdissement ou brunissement progressif sur toute la période étudiée"],
      ["Carte d'anomalies pour une date donnée", "Écart ponctuel à la normale saisonnière (sécheresse, incendie, gel tardif)"],
      ["Composante saisonnière", "Amplitude et forme du cycle végétatif annuel typique de chaque pixel"],
      ["Composantes principales temporelles", "Modes de variabilité dominants communs à toute la série (tendance climatique, cycle récurrent type El Niño)"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "ETM face à CROSSTAB/MARKOV : deux échelles temporelles",
    text: "CROSSTAB, MARKOV et CA_MARKOV raisonnent en quelques dates discrètes (deux ou trois cartes catégorielles d'occupation du sol) pour modéliser un changement de classe. ETM raisonne sur un signal continu à haute fréquence temporelle (souvent un indice comme le NDVI, pas une classification), pour caractériser une dynamique de long terme — tendance, saisonnalité, anomalie — plutôt qu'une transition entre catégories discrètes. Les deux approches sont complémentaires : une tendance ETM de dégradation progressive de la végétation peut motiver, en amont, le choix des variables explicatives d'un sous-modèle LCM.",
  },

  { type: "heading", text: "6. Interopérabilité et limites : logiciel propriétaire, écosystème libre", level: "approfondissement" },
  {
    type: "paragraph",
    text: "TerrSet reste un logiciel à licence commerciale, le plus souvent accessible via une licence académique institutionnelle — un choix d'accès très différent de QGIS ou R, tous deux libres et gratuits sans condition. Cette différence a des conséquences concrètes sur la pérennité d'un flux de travail au-delà du cadre universitaire.",
  },
  {
    type: "table",
    headers: ["", "TerrSet", "QGIS / R"],
    rows: [
      ["Licence", "Commerciale (souvent académique, limitée dans le temps)", "Libre et gratuite, sans condition"],
      ["Force principale", "Modélisation raster prédictive intégrée (LCM, CA_MARKOV, ETM)", "SIG généraliste (QGIS) / statistique et scripting reproductible (R)"],
      ["Échange de données", "Import/export GeoTIFF, conversion .rst ↔ GeoTIFF native", "GeoTIFF natif, interopérable par défaut"],
      ["Pérennité hors cadre académique", "Dépend du renouvellement de licence après la formation", "Aucune dépendance à une licence"],
    ],
  },
  {
    type: "list",
    items: [
      "Le format propre .rst/.rdc s'exporte et s'importe en GeoTIFF sans perte significative, ce qui permet de préparer des données sous QGIS, modéliser sous TerrSet, puis republier le résultat (carte simulée, carte d'aptitude) sous QGIS pour la diffusion ou la mise en page finale",
      "Le vecteur .vct de TerrSet reste secondaire dans la pratique : la plupart des flux de travail combinent vecteur préparé sous QGIS (zones d'entraînement, couches de contraintes) et traitement raster sous TerrSet",
      "R (module Programmation R) couvre une partie de ce que fait TerrSet — classification, séries temporelles, statistique spatiale — via des packages libres (terra, randomForest, forecast), avec l'avantage de la reproductibilité scriptée complète, mais sans l'équivalent intégré et prêt à l'emploi de LCM/CA_MARKOV",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ce que l'écosystème libre ne remplace pas encore intégralement",
    text: "Reproduire un pipeline LCM/CA_MARKOV complet en QGIS + R demande d'assembler soi-même plusieurs briques indépendantes (un modèle de régression logistique ou un MLP sous R, un automate cellulaire codé à la main ou via un package dédié, une gestion manuelle des itérations et du filtre de contiguïté) — faisable, mais nettement plus long à mettre en place qu'un module TerrSet intégré et déjà validé scientifiquement depuis des décennies d'usage académique. Le choix entre les deux écosystèmes est donc aussi un arbitrage entre rapidité de mise en œuvre et indépendance vis-à-vis d'une licence.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : LCM enchaîne diagnostic du changement, variables explicatives et sous-modèles de transition (régression logistique ou MLP) pour produire un potentiel de transition ; CA_MARKOV combine ce potentiel à un filtre de contiguïté pour localiser spatialement le changement prédit par MARKOV ; la méthode à trois cartes de Pontius et le kappa spatialisé (quantité vs. localisation) valident une simulation contre un modèle nul, pas juste contre une carte de référence brute ; MOLA arbitre entre objectifs d'affectation concurrents, au-delà d'une simple MCE mono-objectif ; ETM analyse des séries temporelles longues (tendance, anomalie, décomposition saisonnière), une autre échelle que CROSSTAB/MARKOV ; TerrSet reste propriétaire à licence académique, complémentaire de l'écosystème libre QGIS/R plutôt qu'interchangeable avec lui.",
    ],
  },
  {
    type: "link",
    to: "/module/programmation-r",
    label: "Comparer : séries temporelles et modèles statistiques sous R",
    description: "Le module Programmation R couvre en scripts reproductibles une partie de ce qu'ETM et LCM offrent de façon intégrée sous TerrSet.",
  },
  {
    type: "link",
    to: "/module/qgis",
    label: "Comparer : QGIS comme SIG généraliste",
    description: "Le module QGIS détaille l'écosystème libre auquel TerrSet, propriétaire, s'articule en amont (préparation vecteur) et en aval (diffusion cartographique) d'une modélisation.",
  },
]
