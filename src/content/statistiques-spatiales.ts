import type { ContentBlock } from "./types"

export const statistiquesSpatialesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Le module Le Compas introduit l'indice de Moran global et le krigeage : la position dans l'espace n'est pas neutre statistiquement, la première loi de la géographie de Tobler le pose clairement. Cette salle va plus loin sur trois terrains que Le Compas ne fait qu'effleurer : détecter où, précisément, une structure spatiale se manifeste (pas seulement si elle existe globalement), analyser des semis de points plutôt que des zones, et cartographier un risque en combinant plusieurs couches statistiques rigoureusement.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Avant de commencer : indice de Moran global, MAUP, variogramme",
    description: "Le Compas (section 4 et 8) pose les bases de l'autocorrélation spatiale et du krigeage, prérequis de cette salle.",
  },

  { type: "heading", text: "1. Global vs local : où se cache la structure spatiale", level: "lycee" },
  {
    type: "paragraph",
    text: "L'indice de Moran global (module Le Compas) donne un seul chiffre pour tout le territoire étudié : une forte autocorrélation d'ensemble, mais où exactement ? Un I de Moran global élevé peut masquer une réalité très hétérogène : une seule grande zone de regroupement quelque part sur le territoire suffit à faire remonter l'indice global, même si le reste de la carte est statistiquement aléatoire. Les indicateurs locaux d'association spatiale répondent précisément à cette limite.",
  },

  { type: "heading", text: "2. Indicateurs locaux d'association spatiale (LISA)", level: "superieur" },
  {
    type: "paragraph",
    text: "Le Local Indicator of Spatial Association (LISA), formalisé par Luc Anselin (1995), décompose l'indice de Moran global en une valeur par entité, plutôt qu'un seul chiffre pour l'ensemble de l'étude. Chaque entité reçoit un Local Moran's I, qui la classe dans l'un de quatre types selon sa propre valeur et celle de son voisinage.",
  },
  {
    type: "formula",
    label: "Local Moran's I (LISA)",
    formula: "Iᵢ = [(xᵢ − x̄) / S²] · Σⱼ wᵢⱼ (xⱼ − x̄)",
    note: "S² = variance de l'échantillon. Contrairement à l'indice global (une seule valeur), chaque entité i reçoit son propre Iᵢ, cartographiable directement — c'est cette cartographie, pas la formule seule, qui rend le LISA opérationnellement utile.",
  },
  {
    type: "table",
    headers: ["Type LISA", "Signification", "Exemple"],
    rows: [
      ["Haut-Haut (HH)", "Une valeur élevée entourée de voisins à valeur élevée", "Un foyer de forte densité d'habitat entouré d'autres zones denses"],
      ["Bas-Bas (LL)", "Une valeur faible entourée de voisins à valeur faible", "Une zone rurale peu peuplée, entourée d'autres zones rurales"],
      ["Haut-Bas (HL)", "Une valeur élevée isolée au milieu de voisins faibles — une anomalie locale", "Un hameau dense isolé au milieu d'un massif peu peuplé"],
      ["Bas-Haut (LH)", "Une valeur faible isolée au milieu de voisins élevés — une anomalie locale", "Une zone naturelle protégée enclavée dans un tissu urbain dense"],
    ],
  },
  {
    type: "diagram",
    name: "lisa-quadrant",
    caption: "Le nuage de Moran : chaque entité classée selon sa propre valeur et celle de son voisinage — Haut-Haut et Bas-Bas signalent un vrai regroupement, Haut-Bas et Bas-Haut une anomalie locale.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Comparaisons multiples : ne pas lire chaque Iᵢ isolément sans correction",
    text: "Calculer un Local Moran's I pour chacune de plusieurs milliers d'entités revient à effectuer autant de tests statistiques simultanés : au seuil conventionnel p < 0.05, environ 5 % des entités apparaîtront « significatives » par pur hasard, même en l'absence de toute vraie structure spatiale. Une correction pour comparaisons multiples (ex. Bonferroni, ou le taux de fausse découverte de Benjamini-Hochberg) est nécessaire avant d'interpréter une carte LISA comme identifiant des clusters réellement significatifs plutôt qu'un artefact du grand nombre de tests effectués.",
  },

  { type: "heading", text: "3. Détecter les points chauds : la statistique Gi* de Getis-Ord", level: "superieur" },
  {
    type: "paragraph",
    text: "Le Local Moran's I détecte des similarités locales (y compris de faibles valeurs regroupées, LL). Quand la question posée est spécifiquement « où sont les points chauds de valeurs élevées, et où sont les points froids de valeurs faibles », la statistique Gi* (Getis & Ord, 1992) est l'outil dédié : elle compare la somme des valeurs dans un voisinage local à ce qu'on attendrait si les valeurs étaient réparties au hasard sur toute la zone d'étude.",
  },
  {
    type: "formula",
    label: "Statistique Gi* de Getis-Ord",
    formula: "Gi* = [ Σⱼ wᵢⱼ xⱼ − X̄ Σⱼ wᵢⱼ ] / [ S · √( (n Σⱼ wᵢⱼ² − (Σⱼ wᵢⱼ)²) / (n−1) ) ]",
    note: "Un Gi* positif et statistiquement significatif signale un point chaud (hot spot) ; négatif et significatif, un point froid (cold spot). Le résultat est un score Z, directement interprétable comme un test statistique standard (Z > 1.96 ≈ p < 0.05, avec la même réserve sur les comparaisons multiples que pour le LISA).",
  },
  {
    type: "callout",
    tone: "example",
    title: "Application directe à la cartographie du risque",
    text: "Sur une couche de points d'éclosion de feux de forêt sur plusieurs décennies, une carte Gi* identifie précisément les secteurs où les départs de feu se concentrent statistiquement au-delà du hasard, distincts des secteurs qui en comptent simplement beaucoup parce que la zone d'étude y est plus grande ou plus peuplée d'entités. C'est cette distinction — concentration réelle vs simple densité brute — qui rend le Gi* directement utile à la priorisation d'une politique de prévention, plutôt qu'une carte de densité brute qui confond les deux.",
  },

  { type: "heading", text: "4. Densité de points : l'estimation par noyau (KDE)", level: "superieur" },
  {
    type: "paragraph",
    text: "Le Gi* teste une hypothèse sur des zones déjà découpées (communes, carreaux). Pour un semis de points brut (chaque incendie, chaque accident, chaque observation individuelle géolocalisée), l'estimation par noyau (Kernel Density Estimation, KDE) construit directement une surface continue de densité, sans imposer de découpage arbitraire au préalable — une façon d'éviter d'emblée le MAUP (module Le Compas) pour cette étape de l'analyse.",
  },
  {
    type: "formula",
    label: "Estimation de densité par noyau",
    formula: "f(x) = (1 / n·h²) · Σᵢ K( (x − xᵢ) / h )",
    note: "K = fonction noyau (souvent gaussienne ou quartique), h = largeur de bande (bandwidth) : le paramètre le plus déterminant du résultat. Un h trop petit produit une carte bruitée, dominée par chaque point individuel ; un h trop grand lisse excessivement et masque les concentrations réelles. Le choix de h doit être justifié (par validation croisée, ou par une distance caractéristique du phénomène étudié), jamais laissé à la valeur par défaut du logiciel sans vérification.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une carte de chaleur (heatmap) n'est pas neutre",
    text: "Une carte de densité par noyau produit toujours une image visuellement convaincante, y compris sur des données sans aucune structure spatiale réelle : la seule présence de quelques points suffit à générer des zones colorées d'apparence significative. Contrairement au Gi*, une KDE simple ne fournit par défaut aucun test de significativité — elle décrit une densité observée, elle ne prouve pas à elle seule un phénomène statistiquement anormal.",
  },

  { type: "heading", text: "5. Aléa, enjeux, vulnérabilité : la structure d'une cartographie du risque", level: "superieur" },
  {
    type: "paragraph",
    text: "Cartographier un risque naturel (incendie, inondation, mouvement de terrain) ne se réduit jamais à une seule couche statistique : la définition standard en gestion des risques (Cadre d'action de Hyogo, ONU, 2005 ; largement reprise en France par les services de prévention) décompose le risque en trois composantes distinctes, à cartographier et croiser séparément plutôt que confondre.",
  },
  {
    type: "formula",
    label: "Structure conceptuelle du risque",
    formula: "Risque = Aléa × Enjeux × Vulnérabilité",
    note: "Aléa : probabilité et intensité physique du phénomène (ex. probabilité d'éclosion et de propagation d'un feu selon le terrain, la végétation, le vent). Enjeux : ce qui est exposé (population, bâti, infrastructures présentes dans la zone). Vulnérabilité : la sensibilité de ces enjeux au phénomène (une habitation en bois est plus vulnérable au feu qu'un bâtiment en pierre à jardin dégagé). Un aléa fort sans aucun enjeu exposé ne produit aucun risque au sens opérationnel du terme — une distinction régulièrement source de confusion dans le langage courant, où « risque » et « aléa » sont souvent employés l'un pour l'autre.",
  },
  {
    type: "table",
    headers: ["Composante", "Méthode statistique spatiale typique"],
    rows: [
      ["Aléa", "Gi*/LISA sur l'historique des occurrences, KDE sur les points d'ignition, indices composites (pente, vent, combustible)"],
      ["Enjeux", "Densité de population/bâti (statistiques de zone, module Le Compas), distance aux infrastructures"],
      ["Vulnérabilité", "Indices composites pondérés (type de matériau, âge du bâti, capacité d'évacuation)"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Une carte de risque combine, elle ne moyenne pas naïvement",
    text: "Combiner ces trois couches par une simple moyenne arithmétique non pondérée traite implicitement chaque composante comme d'égale importance et d'échelle comparable, une hypothèse rarement justifiée sans une analyse multicritère explicite (voir l'analyse multicritère, module Le Compas, section 9) qui documente les poids choisis et leur justification, plutôt que de les laisser implicites dans le choix arbitraire d'une formule.",
  },

  { type: "heading", text: "6. Régression spatiale : quand les résidus ne sont pas indépendants", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une régression linéaire classique (moindres carrés ordinaires, OLS) suppose que ses résidus (l'écart entre valeur observée et valeur prédite) sont indépendants les uns des autres. Sur une donnée spatiale, cette hypothèse est régulièrement violée : si le phénomène étudié a une structure spatiale (la première loi de Tobler, encore), les résidus d'un modèle qui l'ignore présentent eux-mêmes de l'autocorrélation spatiale, détectable en calculant un indice de Moran directement sur les résidus du modèle.",
  },
  {
    type: "list",
    items: [
      "Modèle à retard spatial (spatial lag model) : ajoute la valeur moyenne des voisins comme variable explicative supplémentaire, quand la valeur d'une entité dépend directement de celle de ses voisines (diffusion, contagion)",
      "Modèle à erreur spatiale (spatial error model) : modélise l'autocorrélation dans le terme d'erreur lui-même, quand une variable non observée mais spatialement structurée influence le phénomène (un facteur environnemental non mesuré, par exemple)",
      "Dans les deux cas, ignorer une autocorrélation spatiale résiduelle avérée ne rend pas les coefficients du modèle faux en moyenne, mais sous-estime systématiquement leur incertitude réelle : des intervalles de confiance trop étroits, une significativité statistique artificiellement gonflée",
    ],
  },
  {
    type: "link",
    to: "/discipulus/methodes",
    label: "Voir aussi : lire une valeur de p correctement",
    description: "Le module Méthodes (section Mémoire de recherche) détaille l'interprétation correcte d'une p-value et le risque de pseudo-réplication sur des observations non indépendantes — directement lié à l'autocorrélation spatiale résiduelle décrite ici.",
  },
  { type: "game" },

  { type: "heading", text: "7. Analyse de semis de points : la fonction K de Ripley", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà de la simple densité (KDE, section 4), la fonction K de Ripley (Ripley, 1976) teste si un semis de points est plus regroupé, plus régulier, ou statistiquement indiscernable d'une répartition complètement aléatoire (CSR, Complete Spatial Randomness — un processus de Poisson spatial) à différentes échelles de distance simultanément, plutôt qu'à une seule échelle fixée d'avance.",
  },
  {
    type: "formula",
    label: "Fonction K de Ripley (estimateur empirique)",
    formula: "K(h) = (A / n²) · Σᵢ Σⱼ≠ᵢ 1[dᵢⱼ ≤ h]",
    note: "A = aire de la zone d'étude, n = nombre de points, dᵢⱼ = distance entre les points i et j, 1[·] = 1 si la condition est vraie, 0 sinon. K(h) observé est comparé à sa valeur théorique sous CSR (πh²) : au-dessus, regroupement à cette distance h ; en dessous, régularité (répulsion) ; proche, absence de structure détectable à cette échelle précise.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi tester plusieurs échelles à la fois",
    text: "Un semis de points peut être regroupé à petite échelle (des feux qui démarrent près des axes routiers, à quelques centaines de mètres) tout en restant réparti de façon quasi aléatoire à grande échelle (aucune région entière plus touchée qu'une autre). La fonction K, en balayant h de façon continue, révèle ce changement d'échelle, invisible à un indice global unique comme le Moran ou une simple densité moyenne.",
  },

  { type: "heading", text: "8. Pièges statistiques propres aux données spatiales", level: "superieur" },
  {
    type: "list",
    items: [
      "Pseudoréplication : traiter des observations spatialement dépendantes (des cellules voisines d'une même grille, des mesures répétées au même endroit) comme des observations indépendantes gonfle artificiellement la taille d'échantillon effective, et donc la confiance accordée à un résultat",
      "MAUP (module Le Compas) : le résultat d'une statistique de zone dépend du découpage choisi, pas seulement de la donnée sous-jacente",
      "Confondre corrélation spatiale et causalité : deux phénomènes peuvent covarier spatialement (Tobler) sans lien causal direct, chacun pouvant simplement répondre au même facteur sous-jacent non mesuré (le relief, par exemple, influence à la fois la végétation et l'habitat)",
      "Ignorer l'effet de bord (edge effect) : une entité située au bord de la zone d'étude a mécaniquement moins de voisins recensés dans l'analyse, ce qui biaise les indices locaux (LISA, Gi*, KDE) qui y sont calculés, sauf correction explicite (zone tampon d'étude plus large que la zone d'intérêt, pondération d'edge effect)",
    ],
  },

  { type: "heading", text: "9. Outils et bibliothèques", level: "superieur" },
  {
    type: "table",
    headers: ["Outil", "Type", "Points forts"],
    rows: [
      ["GeoDa", "Logiciel libre autonome (interface graphique)", "Conçu spécifiquement pour l'analyse exploratoire de données spatiales (Anselin), LISA/Gi* accessibles sans code"],
      ["PySAL (Python Spatial Analysis Library)", "Bibliothèque Python", "Équivalent programmable de GeoDa, s'intègre avec GeoPandas (module Le Compas)"],
      ["Extension QGIS « Analyse spatiale statistique »", "Plugin QGIS", "LISA/Gi* directement dans l'interface déjà utilisée pour le reste du projet, sans changer d'environnement"],
      ["R (packages spdep, gstat)", "Langage statistique dédié", "Référence académique historique pour la statistique spatiale, très large littérature et documentation associées"],
    ],
  },

  { type: "heading", text: "10. Étude de cas : cartographier un risque à partir de trois couches", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une commune dispose de trois couches : un indice d'aléa incendie par cellule de 50 m (issu d'un modèle physique, terrain/végétation/vent), une couche de densité de bâti (enjeux), et un indice de vulnérabilité du bâti (matériaux, âge). Une démarche rigoureuse ne les combine jamais à l'aveugle : elle vérifie d'abord que chaque couche est dans le même système de coordonnées et la même résolution (module Fondements/Projections avancées), documente explicitement la pondération choisie pour les combiner (section 5), puis, si l'objectif est de prioriser une action de prévention plutôt que seulement décrire, applique un Gi* sur le résultat final pour identifier les secteurs où le risque combiné est statistiquement concentré, pas seulement ponctuellement élevé sur une poignée de cellules isolées.",
  },
]
