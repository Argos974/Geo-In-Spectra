import type { ContentBlock } from "./types"

export const analyseStatistiqueContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Dans Les Tricheurs du Caravage, un jeune joueur de cartes crédule affronte deux complices : l'un lit son jeu par-dessus son épaule, l'autre lui signale du bout des doigts, dans son dos, les cartes à jouer. Le tableau pose une question qui a une histoire précise en mathématiques : une série de pertes répétées relève-t-elle du hasard, ou d'un biais caché ? C'est exactement le problème que le chevalier de Méré soumit à Blaise Pascal en 1654 à propos d'une partie de dés interrompue avant son terme (le « problème des partis ») — la correspondance que Pascal échangea alors avec Pierre de Fermat pour le résoudre est reconnue comme l'acte de naissance du calcul des probabilités. Ce module part de cette même question — un résultat observé est-il dû au hasard, à une vraie régularité, ou à un biais de mesure ou d'échantillonnage — pour construire la boîte à outils statistique générale qui soutient tout le reste du site : les indicateurs spatiaux du module Les Statistiques, la matrice de confusion et le kappa d'une classification satellite (module L'Intelligence), les scripts d'analyse du module R. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Statistique descriptive : moyenne, médiane, mode", level: "lycee" },
  {
    type: "paragraph",
    text: "Résumer une série de nombreuses valeurs par un seul chiffre représentatif est le premier geste de toute analyse statistique. Trois indicateurs de tendance centrale existent, et ils ne répondent pas exactement à la même question.",
  },
  {
    type: "table",
    headers: ["Indicateur", "Définition", "Quand l'utiliser"],
    rows: [
      ["Moyenne", "Somme des valeurs divisée par leur nombre", "Série numérique sans valeur extrême qui déforme le résultat"],
      ["Médiane", "Valeur qui partage la série triée en deux effectifs égaux", "Série avec des valeurs extrêmes (salaires, prix immobiliers) : plus robuste que la moyenne"],
      ["Mode", "Valeur (ou catégorie) la plus fréquente", "Variable qualitative, ou pour repérer le sommet d'une distribution"],
    ],
  },
  {
    type: "formula",
    label: "Moyenne arithmétique",
    formula: "x̄ = (x₁ + x₂ + … + xₙ) / n",
    note: "x̄ (« x barre ») désigne la moyenne d'un échantillon de n valeurs. Pour trouver la médiane, il n'y a pas de formule : on trie la série puis on prend la valeur centrale (ou la moyenne des deux valeurs centrales si n est pair).",
  },
  {
    type: "callout",
    tone: "warning",
    title: "La moyenne est sensible aux valeurs extrêmes",
    text: "Sur neuf communes dont le revenu médian par foyer tourne autour de 22 000 €, une dixième commune très riche à 400 000 € fait grimper la moyenne du groupe bien au-dessus de ce que vivent neuf communes sur dix — alors que la médiane, elle, reste proche de 22 000 €. Une seule valeur extrême suffit à rendre la moyenne trompeuse ; c'est pour cela que les revenus, les prix de l'immobilier ou les notes d'un examen très hétérogène se résument plus honnêtement par une médiane.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Relevé de température à 8h sur sept jours (en °C) : 12, 13, 12, 14, 11, 13, 38 (un capteur défaillant le 7ᵉ jour). Moyenne = (12+13+12+14+11+13+38)/7 ≈ 16,1 °C : un chiffre qui ne décrit aucune journée réelle. Médiane (série triée 11, 12, 12, 13, 13, 14, 38) = 13 °C : bien plus représentative des six journées normales. Mode = 12 et 13 (deux valeurs à égalité, série bimodale).",
  },

  { type: "heading", text: "2. Mesures de dispersion : étendue, quartiles, écart-type, boîte à moustaches", level: "lycee" },
  {
    type: "paragraph",
    text: "Deux séries peuvent avoir exactement la même moyenne tout en étant très différentes : l'une resserrée autour de cette moyenne, l'autre étalée sur un grand intervalle. Les mesures de dispersion complètent la tendance centrale en décrivant cet étalement.",
  },
  {
    type: "brique",
    id: "dispersion-lycee",
    title: "Étendue, quartiles et écart-type",
    blocks: [
      {
        type: "list",
        items: [
          "Étendue : différence entre la plus grande et la plus petite valeur de la série — la mesure de dispersion la plus simple, mais très sensible à une seule valeur aberrante",
          "Quartiles (Q1, Q2, Q3) : les trois valeurs qui découpent la série triée en quatre groupes de même effectif ; Q2 est la médiane",
          "Écart interquartile (EIQ = Q3 − Q1) : étendue des 50 % de valeurs centrales, insensible aux valeurs extrêmes contrairement à l'étendue totale",
          "Écart-type (σ) : mesure la distance moyenne de chaque valeur à la moyenne — plus il est grand, plus la série est dispersée autour de x̄",
        ],
      },
      {
        type: "formula",
        label: "Écart-type d'une série",
        formula: "σ = √[ (1/n) · Σᵢ (xᵢ − x̄)² ]",
        note: "On calcule l'écart de chaque valeur à la moyenne, on l'élève au carré (pour que les écarts positifs et négatifs ne s'annulent pas), on fait la moyenne de ces carrés (la variance, σ²), puis on prend la racine carrée pour revenir à l'unité de départ.",
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Lire une boîte à moustaches (box plot)",
    text: "Une boîte à moustaches résume une série en cinq valeurs : le minimum, Q1, la médiane, Q3, le maximum. La boîte centrale va de Q1 à Q3 (elle contient donc 50 % des valeurs) et une barre marque la médiane à l'intérieur ; les « moustaches » s'étendent jusqu'au minimum et au maximum, sauf si des points sont isolés au-delà de 1,5 × EIQ au-delà de Q1 ou Q3 — ces points isolés, affichés séparément, signalent des valeurs potentiellement aberrantes plutôt qu'inclus dans la moustache.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Comparer deux séries d'un coup d'œil",
    text: "L'intérêt principal d'une boîte à moustaches est de comparer plusieurs séries côte à côte sur un même graphique (par exemple la température relevée dans cinq villes) : une boîte étroite et haute indique un groupe resserré autour d'une valeur élevée, une boîte large indique un groupe très dispersé — une lecture immédiate qu'un simple tableau de chiffres ne donne pas.",
  },

  { type: "heading", text: "3. Représenter une distribution : histogramme, effectifs et fréquences", level: "lycee" },
  {
    type: "paragraph",
    text: "Une fois les données résumées par quelques chiffres, encore faut-il pouvoir en visualiser toute la forme : c'est le rôle d'un graphique de distribution.",
  },
  {
    type: "table",
    headers: ["Terme", "Définition"],
    rows: [
      ["Effectif", "Nombre brut d'observations dans une classe ou une catégorie (ex. 12 communes ont une population entre 500 et 1000 habitants)"],
      ["Fréquence", "Effectif divisé par l'effectif total, souvent exprimé en % — permet de comparer deux séries d'effectifs totaux différents"],
      ["Classe", "Intervalle de valeurs (pour une variable numérique continue) regroupées ensemble avant de compter l'effectif"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Histogramme ou diagramme en barres ?",
    text: "Un histogramme représente une variable numérique continue découpée en classes : les barres sont jointives, car les classes se succèdent sans interruption sur l'axe. Un diagramme en barres représente une variable qualitative (catégories) ou discrète : les barres sont séparées par un espace, car il n'y a pas de continuité entre « forêt », « champ » et « zone urbaine ». Confondre les deux (barres jointives pour des catégories, par exemple) laisse croire à une continuité qui n'existe pas.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Le choix de la largeur des classes n'est pas neutre",
    text: "Des classes trop larges lissent excessivement la distribution et peuvent masquer plusieurs pics réels (une distribution bimodale devient un seul bloc) ; des classes trop étroites font apparaître un bruit d'échantillonnage qui n'a rien d'une vraie structure. Il n'existe pas de largeur « juste » universelle : on ajuste en fonction de la taille de l'échantillon et on vérifie que la forme obtenue reste stable si on modifie légèrement le découpage.",
  },

  { type: "heading", text: "4. Probabilités de base : événement, probabilité simple, indépendance, arbre de probabilité", level: "lycee" },
  {
    type: "paragraph",
    text: "Une expérience aléatoire (lancer un dé, tirer une carte) produit une issue parmi plusieurs possibles. Un événement est un ensemble d'issues qui nous intéresse (par exemple « obtenir un nombre pair »).",
  },
  {
    type: "formula",
    label: "Probabilité d'un événement (cas d'équiprobabilité)",
    formula: "P(A) = (nombre de cas favorables à A) / (nombre de cas possibles)",
    note: "Valable uniquement quand toutes les issues ont la même chance de se produire (dé non pipé, jeu de cartes non truqué — l'inverse, précisément, de ce que font les complices du tableau de Caravage). P(A) est toujours compris entre 0 (impossible) et 1 (certain).",
  },
  {
    type: "list",
    items: [
      "Événement contraire (non A) : P(non A) = 1 − P(A)",
      "Deux événements sont indépendants quand la réalisation de l'un ne change rien à la probabilité de l'autre (tirer à pile ou face deux fois de suite : le premier résultat n'influence pas le second)",
      "Un arbre de probabilité représente chaque étape d'une expérience par des branches, chacune étiquetée par sa probabilité ; la probabilité d'un chemin complet (une issue précise) s'obtient en multipliant les probabilités le long des branches parcourues",
    ],
  },
  {
    type: "formula",
    label: "Événements indépendants",
    formula: "P(A ∩ B) = P(A) × P(B)",
    note: "« ∩ » se lit « et » : P(A ∩ B) est la probabilité que A et B se produisent tous les deux. Cette formule de multiplication n'est valable que si A et B sont indépendants — sinon il faut tenir compte de l'influence de l'un sur l'autre (probabilité conditionnelle, vue en détail piste Licence/BUT et au-delà).",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré : deux tirages dans un jeu de cartes",
    text: "On tire une carte, on la remet dans le jeu, on mélange, puis on en tire une seconde (tirage « avec remise », donc indépendant). P(as au 1ᵉʳ tirage) = 4/32 = 0,125. P(as au 2ᵉ tirage) = 4/32 = 0,125, exactement la même probabilité puisque le jeu est reconstitué à l'identique. P(as puis as) = 0,125 × 0,125 ≈ 0,016, soit un peu plus d'une chance sur soixante. Sans remise, en revanche, les deux tirages ne seraient plus indépendants : le second dépendrait de ce qui a été retiré au premier.",
  },

  { type: "heading", text: "5. La loi normale (intuition) : la courbe en cloche", level: "lycee" },
  {
    type: "paragraph",
    text: "De très nombreux phénomènes mesurés dans la nature ou la société (une taille, une erreur de mesure, un score à un test) se répartissent selon une courbe en cloche, symétrique autour d'une valeur centrale : c'est la loi normale. La plupart des valeurs se regroupent près de la moyenne, et de moins en moins de valeurs se trouvent à mesure qu'on s'en éloigne, de façon symétrique des deux côtés.",
  },
  {
    type: "callout",
    tone: "info",
    title: "La règle empirique 68-95-99,7 %",
    text: "Pour une distribution qui suit une loi normale : environ 68 % des valeurs se trouvent à moins d'un écart-type de la moyenne (entre x̄ − σ et x̄ + σ), environ 95 % à moins de deux écarts-types, et environ 99,7 % à moins de trois écarts-types. Une valeur au-delà de deux écarts-types de la moyenne est donc déjà assez rare (moins de 5 % des cas) ; au-delà de trois, exceptionnelle.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Si la taille moyenne d'une classe d'élèves est x̄ = 170 cm avec un écart-type σ = 8 cm, la règle 68-95-99,7 % indique qu'environ 68 % des élèves mesurent entre 162 et 178 cm, environ 95 % entre 154 et 186 cm. Un élève mesurant 195 cm (plus de trois écarts-types au-dessus de la moyenne) est donc statistiquement rare dans ce groupe.",
  },

  { type: "heading", text: "6. Corrélation simple : nuage de points, corrélation n'est pas causalité", level: "lycee" },
  {
    type: "paragraph",
    text: "Un nuage de points place chaque individu (chaque commune, chaque élève, chaque parcelle) selon deux variables numériques, une en abscisse et une en ordonnée. La forme générale du nuage renseigne sur une éventuelle relation entre les deux variables, résumée par le coefficient de corrélation (noté r), compris entre −1 et +1 — sa formule complète est vue en détail piste Licence/BUT.",
  },
  {
    type: "table",
    headers: ["Valeur de r", "Lecture du nuage de points"],
    rows: [
      ["r proche de +1", "Points alignés le long d'une droite montante : quand une variable augmente, l'autre augmente aussi"],
      ["r proche de −1", "Points alignés le long d'une droite descendante : quand une variable augmente, l'autre diminue"],
      ["r proche de 0", "Nuage sans forme linéaire nette : les deux variables ne semblent pas liées linéairement"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Corrélation n'est pas causalité",
    text: "Observer que deux variables évoluent ensemble ne prouve jamais que l'une cause l'autre. Le nombre de noyades et les ventes de glaces sont fortement corrélés d'un mois à l'autre — non parce que manger une glace ferait se noyer, mais parce qu'une troisième variable, la chaleur estivale, augmente les deux en même temps. Cette variable cachée s'appelle un facteur de confusion : avant de parler de cause, il faut toujours se demander si un facteur de confusion plausible n'explique pas à lui seul la corrélation observée.",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Une commune où le nombre de panneaux publicitaires est élevé a aussi, en moyenne, un taux de pollution de l'air plus élevé. Peut-on en conclure que les panneaux publicitaires polluent l'air ? Quelle troisième variable pourrait expliquer cette corrélation sans lien de cause à effet direct entre les deux ?",
  },
  {
    type: "devoir",
    format: "Calcul et graphique à la main",
    title: "Analyser un relevé de terrain",
    prompt: "Voici les relevés de précipitations (en mm) enregistrés sur dix jours consécutifs par une station météo : 2, 0, 0, 15, 3, 1, 0, 42, 4, 2. Calcule la moyenne, la médiane, le mode (s'il existe), l'étendue, Q1 et Q3, puis construis à la main une boîte à moustaches de cette série. Termine par une phrase qui explique laquelle de la moyenne ou de la médiane décrit le mieux une journée « typique » de cette série, et pourquoi.",
    criteria: [
      "La moyenne et la médiane sont toutes deux calculées correctement (moyenne ≈ 6,9 mm, médiane = 2 mm)",
      "Q1 et Q3 sont identifiés sur la série triée, pas sur la série dans l'ordre de collecte",
      "La boîte à moustaches place correctement les cinq valeurs clés (min, Q1, médiane, Q3, max) et signale la valeur de 42 mm comme potentiellement aberrante",
      "La conclusion identifie explicitement que la valeur de 42 mm (un jour de forte pluie isolé) tire la moyenne vers le haut sans être représentative des autres jours",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : moyenne, médiane et mode répondent à des questions différentes, et la médiane résiste mieux aux valeurs extrêmes ; étendue, quartiles et écart-type mesurent la dispersion, la boîte à moustaches les résume visuellement ; un histogramme (barres jointives) décrit une variable continue, un diagramme en barres (barres séparées) une variable qualitative ; P(A) = cas favorables / cas possibles, et P(A∩B) = P(A)×P(B) seulement si A et B sont indépendants ; la règle 68-95-99,7 % décrit la loi normale ; un nuage de points et un coefficient r décrivent une corrélation, jamais une causalité à eux seuls.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : lire des indices spectraux comme une distribution",
    description: "L'Atelier calcule NDVI, NDMI et NDBI par cellule : moyenne, dispersion et histogramme s'y appliquent directement à des indices géographiques réels.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Échantillonnage et estimation : population, échantillon, erreur standard, intervalle de confiance", level: "superieur" },
  {
    type: "paragraph",
    text: "On appelle population l'ensemble complet des individus (ou des mesures) qui intéressent une étude — toutes les parcelles agricoles d'un département, par exemple — et échantillon un sous-ensemble effectivement mesuré, en général parce que mesurer toute la population est impossible ou trop coûteux. Un estimateur (comme la moyenne d'échantillon x̄) approche un paramètre de population inconnu (la vraie moyenne μ) ; deux échantillons différents tirés de la même population donnent presque toujours deux estimations légèrement différentes — c'est cette variabilité d'échantillonnage que l'erreur standard mesure.",
  },
  {
    type: "formula",
    label: "Erreur standard de la moyenne",
    formula: "SE = s / √n",
    note: "s est l'écart-type observé dans l'échantillon, n sa taille. L'erreur standard diminue quand n augmente (un échantillon plus grand donne une moyenne plus stable), mais seulement en 1/√n : quadrupler n ne fait que diviser SE par deux, pas par quatre.",
  },
  {
    type: "formula",
    label: "Intervalle de confiance à 95 % pour une moyenne",
    formula: "IC95% = x̄ ± t(0,025 ; n−1) · SE",
    note: "t(0,025 ; n−1) est la valeur critique de la loi de Student à n−1 degrés de liberté (environ 1,96 quand n est grand, où la loi de Student se confond avec la loi normale). L'intervalle obtenu ne signifie pas « il y a 95 % de chances que μ soit dans cet intervalle » — μ est une constante fixe, pas une variable aléatoire — mais que la méthode utilisée produit, sur un grand nombre d'échantillons répétés, un intervalle qui contient effectivement la vraie moyenne 95 % du temps.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un échantillon biaisé reste biaisé, même très grand",
    text: "Interroger 10 000 personnes en ligne un jour de semaine à midi ne représente pas la population générale, aussi grand que soit l'échantillon : augmenter n réduit l'erreur d'échantillonnage (le bruit aléatoire), mais ne corrige jamais un biais de sélection (une erreur systématique dans la façon dont l'échantillon a été constitué). Un échantillon de 200 personnes correctement tiré au hasard dans toute la population vaut mieux, pour l'inférence, qu'un échantillon de 10 000 personnes biaisé.",
  },

  { type: "heading", text: "2. Tests d'hypothèse : H0/H1, seuil α, p-value, erreurs de type I et II, puissance", level: "superieur" },
  {
    type: "paragraph",
    text: "Un test d'hypothèse arbitre entre deux affirmations concurrentes à partir de données observées : l'hypothèse nulle H0 (en général « pas d'effet », « pas de différence », « pas de lien ») et l'hypothèse alternative H1, celle qu'on cherche en général à mettre en évidence. Le test ne « prouve » jamais H1 au sens mathématique strict : il évalue seulement si les données observées sont compatibles avec H0, ou suffisamment improbables sous H0 pour la rejeter.",
  },
  {
    type: "list",
    items: [
      "Seuil de significativité α : probabilité qu'on accepte, avant même de voir les données, de se tromper en rejetant H0 alors qu'elle est vraie — classiquement fixé à 0,05 (5 %) par convention, pas par nécessité mathématique",
      "p-value : probabilité d'observer un résultat au moins aussi extrême que celui obtenu, si H0 était réellement vraie — plus elle est petite, plus le résultat observé serait surprenant sous H0",
      "Règle de décision : si p-value < α, on rejette H0 (résultat dit « statistiquement significatif ») ; sinon, on ne rejette pas H0, ce qui n'équivaut jamais à l'avoir démontrée vraie",
    ],
  },
  {
    type: "table",
    headers: ["", "H0 réellement vraie", "H0 réellement fausse"],
    rows: [
      ["On rejette H0", "Erreur de type I (probabilité α) — faux positif", "Décision correcte (probabilité = puissance, 1 − β)"],
      ["On ne rejette pas H0", "Décision correcte (probabilité 1 − α)", "Erreur de type II (probabilité β) — faux négatif"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une p-value non significative ne prouve pas l'absence d'effet",
    text: "« p = 0,21, non significatif » signifie seulement que les données ne permettent pas de rejeter H0 avec l'échantillon dont on dispose — pas que H0 est vraie, et pas que l'effet recherché n'existe pas. Un effet réel mais petit, ou un échantillon trop petit, produisent exactement le même résultat qu'une vraie absence d'effet : c'est précisément ce que mesure la puissance du test.",
  },
  {
    type: "callout",
    tone: "info",
    title: "La puissance d'un test (1 − β)",
    text: "La puissance est la probabilité de détecter un effet réel quand il existe réellement — donc d'éviter une erreur de type II. Elle augmente avec la taille de l'échantillon n, avec la taille de l'effet réel (un grand écart est plus facile à détecter qu'un petit), et diminue si on choisit un seuil α plus strict (0,01 plutôt que 0,05). Un test mené sur un échantillon trop petit est sous-puissant : même un effet réel a de bonnes chances d'y passer inaperçu.",
  },

  { type: "heading", text: "3. Test de Student (t-test) : comparer deux moyennes", level: "superieur" },
  {
    type: "paragraph",
    text: "Le test de Student compare la moyenne d'une variable numérique entre deux groupes, pour juger si l'écart observé est suffisamment grand pour ne pas s'expliquer par le seul hasard d'échantillonnage.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Échantillons appariés (test apparié)",
        points: [
          "Les deux mesures portent sur les mêmes individus (avant/après un traitement) ou sur des paires liées",
          "On travaille sur la série des différences dᵢ = x₁ᵢ − x₂ᵢ, ramenée à un test sur une seule moyenne",
          "Plus puissant qu'un test indépendant à effectif égal, car il élimine la variabilité propre à chaque individu",
        ],
      },
      {
        label: "Échantillons indépendants",
        points: [
          "Les deux groupes rassemblent des individus différents, sans lien entre une observation d'un groupe et une de l'autre",
          "Nécessite de comparer aussi la variabilité de chaque groupe, pas seulement leurs moyennes",
          "Le test suppose classiquement des variances comparables entre les deux groupes (à vérifier, par exemple par un test de Levene)",
        ],
      },
    ],
  },
  {
    type: "formula",
    label: "t-test apparié",
    formula: "t = d̄ / (s_d / √n)",
    note: "d̄ est la moyenne des différences individuelles, s_d leur écart-type, n le nombre de paires. Le résultat suit une loi de Student à n−1 degrés de liberté sous H0 (moyenne des différences nulle).",
  },
  {
    type: "formula",
    label: "t-test indépendant (variances supposées égales)",
    formula: "t = (x̄₁ − x̄₂) / [ sp · √(1/n₁ + 1/n₂) ]   avec   sp² = [(n₁−1)s₁² + (n₂−1)s₂²] / (n₁+n₂−2)",
    note: "sp² (variance combinée, « pooled ») met en commun la variabilité des deux groupes. Le résultat suit une loi de Student à n₁+n₂−2 degrés de liberté sous H0 (μ₁ = μ₂). Quand les variances des deux groupes sont trop différentes, on utilise à la place la correction de Welch, qui ajuste les degrés de liberté sans supposer des variances égales.",
  },
  {
    type: "list",
    items: [
      "Conditions d'application : variable numérique à peu près normalement distribuée dans chaque groupe (ou effectif assez grand pour que ce ne soit plus critique), observations indépendantes entre elles, et — pour la version classique — variances comparables entre groupes",
      "Avec des données trop éloignées d'une distribution normale et un petit échantillon, un test non paramétrique (comme le test de Mann-Whitney pour deux groupes indépendants) remplace le t-test sans supposer de forme de distribution particulière",
    ],
  },

  { type: "heading", text: "4. Le test du χ² (khi-deux)", level: "superieur" },
  {
    type: "paragraph",
    text: "Le t-test compare des moyennes de variables numériques ; le test du χ² compare, lui, des variables qualitatives (catégorielles), à partir de leurs effectifs observés.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Test d'indépendance du χ²",
        points: [
          "Teste si deux variables qualitatives sont liées (ex. occupation du sol × commune) à partir d'un tableau croisé",
          "H0 : les deux variables sont indépendantes",
        ],
      },
      {
        label: "Test d'ajustement du χ²",
        points: [
          "Teste si une seule variable qualitative suit une distribution théorique attendue (ex. répartition attendue des classes d'occupation du sol dans une région)",
          "H0 : la distribution observée correspond à la distribution théorique",
        ],
      },
    ],
  },
  {
    type: "formula",
    label: "Statistique du χ²",
    formula: "χ² = Σᵢ (Oᵢ − Eᵢ)² / Eᵢ",
    note: "Oᵢ = effectif observé dans la case i, Eᵢ = effectif théorique attendu sous H0 dans cette même case (pour un test d'indépendance, Eᵢ se calcule à partir des totaux de ligne et de colonne du tableau croisé). Plus les effectifs observés s'écartent des effectifs attendus, plus χ² est grand. Le nombre de degrés de liberté d'un test d'indépendance est (nombre de lignes − 1) × (nombre de colonnes − 1).",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une condition d'application souvent oubliée",
    text: "Le test du χ² n'est fiable que si les effectifs théoriques Eᵢ restent suffisamment grands (classiquement, au moins 5 dans chaque case) ; en deçà, l'approximation statistique sur laquelle repose le test devient peu fiable, et un test exact (comme le test exact de Fisher pour un tableau 2×2) est préférable.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Un tableau croisant deux communes (A, B) et l'occupation du sol dominante d'un échantillon de parcelles (forêt, agricole, urbain) donne des effectifs observés qui s'écartent des effectifs attendus si les deux communes avaient exactement la même répartition. Un χ² élevé (et une p-value < 0,05) indique que l'occupation du sol diffère significativement entre les deux communes — pas quelle commune a plus de forêt : c'est un test global, à compléter par une lecture directe du tableau croisé pour interpréter le sens de la différence.",
  },

  { type: "heading", text: "5. ANOVA (analyse de variance à un facteur)", level: "superieur" },
  {
    type: "paragraph",
    text: "Comparer plus de deux groupes en enchaînant des t-tests deux à deux gonfle artificiellement le risque global de faux positif (avec 5 groupes, cela ferait déjà 10 tests, chacun avec son propre risque de 5 % d'erreur de type I). L'ANOVA à un facteur compare directement k groupes en une seule fois, en distinguant la variabilité entre les groupes de la variabilité à l'intérieur de chaque groupe.",
  },
  {
    type: "formula",
    label: "Statistique F de l'ANOVA",
    formula: "F = (SSB / (k−1)) / (SSW / (N−k)) = CMB / CMW",
    note: "SSB (somme des carrés entre groupes) mesure la dispersion des moyennes de groupe autour de la moyenne générale ; SSW (somme des carrés intra-groupe) mesure la dispersion des observations autour de leur propre moyenne de groupe. k = nombre de groupes, N = effectif total. Si les groupes ne diffèrent pas réellement, la variabilité entre groupes n'est pas plus grande que la variabilité à l'intérieur d'un groupe et F reste proche de 1 ; un F grand indique que la variabilité entre groupes dépasse largement celle attendue par le seul hasard d'échantillonnage intra-groupe.",
  },
  {
    type: "table",
    headers: ["Source de variation", "Somme des carrés", "Degrés de liberté", "Carré moyen"],
    rows: [
      ["Entre les groupes", "SSB", "k − 1", "CMB = SSB / (k−1)"],
      ["Intra-groupe (résiduelle)", "SSW", "N − k", "CMW = SSW / (N−k)"],
      ["Totale", "SST = SSB + SSW", "N − 1", "—"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Un F significatif ne dit pas lesquels des groupes diffèrent",
    text: "Un résultat d'ANOVA significatif indique qu'au moins deux des k groupes diffèrent, sans préciser lesquels. Un test post-hoc (comme le test de Tukey HSD) compare ensuite les groupes deux à deux tout en contrôlant le risque global de faux positif — le prolongement logique et nécessaire d'une ANOVA significative, pas une étape optionnelle.",
  },

  { type: "heading", text: "6. Corrélation et régression linéaire simple", level: "superieur" },
  {
    type: "paragraph",
    text: "Le coefficient de corrélation de Pearson quantifie précisément la force et le sens d'une relation linéaire entre deux variables numériques, déjà abordé intuitivement piste Lycée.",
  },
  {
    type: "formula",
    label: "Coefficient de corrélation de Pearson",
    formula: "r = [ Σᵢ (xᵢ − x̄)(yᵢ − ȳ) ] / [ √(Σᵢ (xᵢ − x̄)²) · √(Σᵢ (yᵢ − ȳ)²) ]",
    note: "Le numérateur (covariance non normalisée) est positif si x et y augmentent ensemble, négatif s'ils varient en sens opposé. Le dénominateur normalise par les écarts-types respectifs, ce qui borne toujours r entre −1 et +1, quelle que soit l'unité des deux variables.",
  },
  {
    type: "paragraph",
    text: "La régression linéaire simple va plus loin que la corrélation : elle ajuste une droite qui prédit y à partir de x, en choisissant la droite qui minimise la somme des carrés des écarts verticaux entre chaque point observé et la droite (méthode des moindres carrés).",
  },
  {
    type: "formula",
    label: "Droite des moindres carrés",
    formula: "ŷ = b₀ + b₁x   avec   b₁ = Σᵢ(xᵢ−x̄)(yᵢ−ȳ) / Σᵢ(xᵢ−x̄)²   et   b₀ = ȳ − b₁x̄",
    note: "b₁ est la pente estimée (variation attendue de y pour une augmentation d'une unité de x), b₀ l'ordonnée à l'origine. « Moindres carrés » : parmi toutes les droites possibles, celle-ci minimise Σᵢ(yᵢ − ŷᵢ)², la somme des carrés des résidus.",
  },
  {
    type: "formula",
    label: "Coefficient de détermination R²",
    formula: "R² = 1 − (SSrés / SStot) = 1 − [ Σᵢ(yᵢ−ŷᵢ)² / Σᵢ(yᵢ−ȳ)² ]",
    note: "R² mesure la part de variance de y expliquée par le modèle, entre 0 (le modèle n'explique rien) et 1 (ajustement parfait). Pour une régression linéaire simple à une seule variable explicative, R² est exactement égal au carré du coefficient de Pearson (R² = r²) — ce qui cesse d'être vrai dès qu'on passe à plusieurs variables explicatives (section suivante).",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple chiffré",
    text: "Une régression de la teneur en matière organique du sol (y, en %) sur l'altitude (x, en m) donne b₁ = 0,004 : chaque mètre d'altitude supplémentaire est associé, en moyenne dans cet échantillon, à 0,004 point de matière organique en plus. Avec R² = 0,62, l'altitude seule explique 62 % de la variance observée de la teneur en matière organique entre les parcelles étudiées — les 38 % restants relèvent d'autres facteurs non inclus dans ce modèle simple (exposition, type de sol, usage agricole…).",
  },

  { type: "heading", text: "7. Régression linéaire multiple", level: "superieur" },
  {
    type: "paragraph",
    text: "La régression linéaire multiple étend la régression simple à plusieurs variables explicatives à la fois, pour estimer l'effet propre de chacune une fois les autres prises en compte.",
  },
  {
    type: "formula",
    label: "Modèle de régression linéaire multiple",
    formula: "ŷ = β₀ + β₁X₁ + β₂X₂ + … + βₚXₚ",
    note: "Chaque coefficient βⱼ s'interprète « toutes choses égales par ailleurs » : l'effet estimé d'une augmentation d'une unité de Xⱼ sur y, en maintenant fixes toutes les autres variables explicatives du modèle — une interprétation qui n'a de sens que si les variables explicatives ne sont pas elles-mêmes trop corrélées entre elles.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Multicolinéarité : quand les variables explicatives se recoupent",
    text: "Si deux variables explicatives sont elles-mêmes fortement corrélées (par exemple la température moyenne annuelle et l'altitude), le modèle ne parvient plus à distinguer clairement l'effet propre de chacune : les coefficients estimés deviennent instables, parfois de signe contre-intuitif, et leur erreur standard gonfle artificiellement — sans que la qualité prédictive globale du modèle (R²) s'en trouve nécessairement dégradée.",
  },
  {
    type: "formula",
    label: "Facteur d'inflation de la variance (VIF)",
    formula: "VIFⱼ = 1 / (1 − Rⱼ²)",
    note: "Rⱼ² est le R² obtenu en régressant la variable explicative Xⱼ sur toutes les autres variables explicatives du modèle (pas sur y). Un VIFⱼ élevé (au-delà de 5, parfois 10 selon les conventions du domaine) signale que Xⱼ est en grande partie redondante avec les autres variables explicatives déjà présentes dans le modèle.",
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Aller plus loin : la régression spatiale",
    description: "Quand les observations sont géographiques, les résidus d'une régression classique (OLS) sont souvent eux-mêmes autocorrélés dans l'espace — le module Les Statistiques présente la régression spatiale (et la GWR) qui corrige ce problème, ignoré ici volontairement puisqu'il est propre aux données spatiales.",
  },

  { type: "heading", text: "8. Régression logistique : prédire une variable binaire", level: "superieur" },
  {
    type: "paragraph",
    text: "Quand la variable à expliquer n'est plus numérique continue mais binaire (oui/non, présence/absence, inondé/non inondé), une régression linéaire classique n'est plus adaptée : rien n'empêche une droite de prédire des valeurs négatives ou supérieures à 1, dépourvues de sens pour une probabilité. La régression logistique modélise à la place la probabilité de l'événement par une courbe en S bornée entre 0 et 1.",
  },
  {
    type: "formula",
    label: "Fonction logistique",
    formula: "p = 1 / (1 + e^−(β₀ + β₁X₁ + … + βₚXₚ))     ⟺     ln( p / (1−p) ) = β₀ + β₁X₁ + … + βₚXₚ",
    note: "p est la probabilité prédite de l'événement (entre 0 et 1). Le membre de droite de la seconde écriture — la combinaison linéaire des variables explicatives — prédit non pas p directement mais le logarithme de la cote (log-odds) de l'événement, ln(p/(1−p)), qui lui peut prendre n'importe quelle valeur réelle.",
  },
  {
    type: "formula",
    label: "Odds ratio (rapport de cotes)",
    formula: "OR = e^βⱼ",
    note: "L'odds ratio associé à une variable Xⱼ s'obtient en prenant l'exponentielle de son coefficient. Un OR de 2 signifie que la cote de l'événement est multipliée par 2 pour chaque augmentation d'une unité de Xⱼ (toutes choses égales par ailleurs) ; un OR de 1 signifie aucun effet ; un OR entre 0 et 1 signifie un effet protecteur (qui réduit la cote de l'événement).",
  },
  {
    type: "callout",
    tone: "info",
    title: "Évaluer un modèle de classification : courbe ROC et AUC",
    text: "Une régression logistique produit une probabilité, pas directement une décision — il faut fixer un seuil (souvent 0,5 par défaut) pour convertir p en une prédiction « oui/non ». La courbe ROC trace, pour tous les seuils possibles, le taux de vrais positifs contre le taux de faux positifs ; l'aire sous cette courbe (AUC) résume la capacité du modèle à distinguer les deux classes indépendamment du seuil choisi, de 0,5 (pas mieux que le hasard) à 1 (séparation parfaite). L'évaluation détaillée d'une classification à partir d'une matrice de confusion (précision, rappel, F1-score, coefficient kappa) est traitée en profondeur dans le module L'Intelligence à propos des classifications satellites — la même logique statistique s'applique ici à une prédiction binaire tabulaire plutôt qu'à un pixel.",
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Voir en détail : matrice de confusion, précision, rappel, kappa",
    description: "Le module L'Intelligence détaille l'évaluation d'une classification (matrice de confusion, kappa de Cohen) — les mêmes outils qui complètent une courbe ROC/AUC ici.",
  },
  {
    type: "devoir",
    format: "Rapport d'analyse statistique",
    title: "Comparer deux protocoles de mesure de terrain",
    prompt: "Deux équipes mesurent la hauteur de la canopée sur les mêmes 15 placettes forestières, l'une au télémètre laser, l'autre par photo-interprétation d'un nuage de points LiDAR. Décris, étape par étape, la démarche statistique complète que tu mettrais en œuvre pour juger si les deux protocoles donnent des mesures significativement différentes : quel test choisir (et pourquoi, notamment le choix apparié/indépendant), quelles conditions d'application vérifier avant de l'appliquer, comment interpréter une p-value obtenue, et ce que tu ferais si le test ne montre aucune différence significative.",
    criteria: [
      "Le choix du t-test apparié est justifié explicitement par le fait que les mêmes placettes sont mesurées par les deux protocoles",
      "Au moins une condition d'application est vérifiée avant le test (normalité des différences, absence de valeur aberrante)",
      "L'interprétation de la p-value évite la formulation incorrecte « la probabilité que H0 soit vraie »",
      "La réponse distingue explicitement absence de preuve d'un effet et preuve de l'absence d'effet, en mentionnant la puissance du test",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : l'erreur standard (s/√n) mesure la variabilité d'échantillonnage, l'intervalle de confiance en découle ; un test d'hypothèse compare la p-value au seuil α, jamais l'inverse d'une preuve ; erreur de type I (faux positif, α) et de type II (faux négatif, β) s'opposent, la puissance (1−β) est leur miroir ; t-test (deux moyennes), χ² (variables qualitatives) et ANOVA (plus de deux groupes) répondent chacun à une structure de données différente ; R² = r² seulement en régression simple ; le VIF détecte la multicolinéarité en régression multiple ; la régression logistique prédit une probabilité via la fonction logistique, l'odds ratio en résume l'effet.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : validation statistique en conditions réelles",
    description: "L'Atelier applique ces tests à des données géographiques réelles (comparaison de mesures, validation de classification), du protocole à l'interprétation.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Analyse en composantes principales (ACP)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Face à un tableau de données avec de nombreuses variables numériques corrélées entre elles (par exemple une dizaine d'indicateurs socio-économiques mesurés par commune), l'analyse en composantes principales construit un nouveau jeu de variables — les composantes principales — non corrélées entre elles, ordonnées par la quantité de variance du jeu de données original qu'elles résument, ce qui permet de réduire drastiquement le nombre de dimensions à examiner tout en conservant l'essentiel de l'information.",
  },
  {
    type: "brique",
    id: "acp-valeurs-propres",
    title: "Valeurs propres et variance expliquée",
    blocks: [
      {
        type: "formula",
        label: "Décomposition en valeurs propres de la matrice de covariance",
        formula: "C · v = λ · v",
        note: "C est la matrice de covariance (ou de corrélation, si les variables sont standardisées au préalable) des variables d'origine. Chaque vecteur propre v définit la direction d'une composante principale dans l'espace des variables d'origine ; la valeur propre λ associée mesure la quantité de variance du jeu de données capturée par cette direction. Les composantes sont ordonnées par valeur propre décroissante : la première composante (PC1) capture le plus de variance, la seconde (PC2, orthogonale à PC1) la plus grande part de ce qui reste, et ainsi de suite.",
      },
      {
        type: "formula",
        label: "Part de variance expliquée par une composante",
        formula: "Variance expliquée par PCᵢ = λᵢ / Σⱼ λⱼ",
        note: "Le cumul des parts de variance expliquée des premières composantes indique combien de dimensions retenir : conserver par exemple les deux ou trois premières composantes si elles cumulent déjà 80 % de la variance totale du jeu de données original.",
      },
    ],
  },
  {
    type: "list",
    items: [
      "Cercle des corrélations : représente chaque variable d'origine par une flèche dans le plan des deux premières composantes ; deux variables dont les flèches pointent dans la même direction sont corrélées positivement dans le jeu de données, deux flèches perpendiculaires sont peu corrélées",
      "Les variables doivent en général être standardisées (centrées-réduites) avant l'ACP si elles ne sont pas dans la même unité, sans quoi une variable à grande échelle numérique (un revenu en euros) dominerait artificiellement une variable à petite échelle (un taux en %) dans le calcul de la variance",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "Une ACP sur dix indicateurs communaux (revenu médian, taux de chômage, part de logements sociaux, densité, distance au centre-ville…) révèle typiquement que les deux ou trois premières composantes suffisent à résumer 70-80 % de la variance totale : la première oppose souvent des communes aisées et denses à des communes plus modestes et périphériques, résumant à elle seule plusieurs variables corrélées entre elles en un seul axe interprétable.",
  },

  { type: "heading", text: "2. Analyse factorielle des correspondances (AFC) et analyse des correspondances multiples (ACM)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "L'ACP réduit la dimension d'un tableau de variables numériques ; l'AFC et l'ACM en sont l'équivalent conceptuel pour des données qualitatives (catégorielles), en s'appuyant sur la même logique de décomposition en valeurs propres, mais appliquée à un tableau de comptages plutôt qu'à une matrice de covariance.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "AFC (analyse factorielle des correspondances)",
        points: [
          "S'applique à un tableau de contingence croisant deux variables qualitatives (le même type de tableau qu'un test du χ²)",
          "Représente simultanément, sur un même plan, les modalités des deux variables (par exemple types d'occupation du sol × communes)",
          "La distance entre deux points du graphique reflète leur profil de répartition similaire, pas une distance géographique",
        ],
      },
      {
        label: "ACM (analyse des correspondances multiples)",
        points: [
          "Généralise l'AFC à plus de deux variables qualitatives simultanément (via le tableau disjonctif complet ou la matrice de Burt)",
          "Utile pour résumer une enquête à plusieurs questions à choix multiples en quelques axes de synthèse",
          "S'interprète comme l'ACP d'un tableau de variables qualitatives plutôt que numériques",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Le lien avec le test du χ²",
    text: "L'AFC part du même écart entre effectifs observés et effectifs attendus sous indépendance que le test du χ² (piste Licence/BUT) — mais là où le χ² se contente d'une statistique globale résumant si un lien existe, l'AFC décompose et visualise la structure de ce lien : quelles modalités de quelles variables s'associent entre elles, et avec quelle intensité relative.",
  },

  { type: "heading", text: "3. Classification non supervisée : k-means et classification ascendante hiérarchique (CAH)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Regrouper des individus (des communes, des placettes, des relevés) en classes homogènes sans étiquette préalable est un problème de classification non supervisée — la même famille de méthodes que le k-means déjà rencontré, dans le module L'Intelligence, pour regrouper des pixels selon leur signature spectrale ; ici, les mêmes principes s'appliquent à un tableau de données quelconques (des variables socio-économiques, environnementales…), pas seulement à des bandes d'image.",
  },
  {
    type: "formula",
    label: "Fonction objectif du k-means",
    formula: "J = Σₖ Σ_{i∈Ck} ‖xᵢ − μₖ‖²",
    note: "L'algorithme cherche à répartir les individus en k classes C₁…Cₖ de façon à minimiser la somme des distances au carré entre chaque individu xᵢ et le centre (centroïde) μₖ de sa classe — un critère purement géométrique dans l'espace des variables retenues, qui suppose que k est fixé à l'avance.",
  },
  {
    type: "paragraph",
    text: "La classification ascendante hiérarchique (CAH) suit une logique différente : elle ne fixe pas k à l'avance. Elle part de chaque individu comme sa propre classe, puis fusionne à chaque étape les deux classes les plus proches, jusqu'à ce que tous les individus soient regroupés en une seule classe — un processus entièrement représenté par un dendrogramme, un arbre qui trace l'historique complet des fusions.",
  },
  {
    type: "list",
    items: [
      "Méthode de Ward : critère de fusion le plus utilisé en CAH — à chaque étape, fusionne les deux classes dont la réunion augmente le moins la variance totale intra-classe (inertie intra-classe), ce qui produit en général des classes de taille comparable et bien séparées",
      "Lire un dendrogramme : la hauteur à laquelle deux branches fusionnent indique à quel point les deux classes fusionnées étaient dissemblables ; couper l'arbre horizontalement à une hauteur donnée fixe le nombre final de classes retenues",
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "k-means",
        points: [
          "Le nombre de classes k doit être fixé à l'avance",
          "Rapide, adapté à de très grands volumes de données",
          "Sensible à l'initialisation des centroïdes, résultat non déterministe d'un lancement à l'autre",
        ],
      },
      {
        label: "CAH (Ward)",
        points: [
          "Le nombre de classes se choisit a posteriori en coupant le dendrogramme",
          "Coûteuse en calcul sur de très grands effectifs (tous les individus comparés deux à deux)",
          "Déterministe : un même jeu de données produit toujours le même dendrogramme",
        ],
      },
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Revoir : k-means sur une image satellite",
    description: "Le module L'Intelligence applique le même principe de classification non supervisée aux pixels d'une image (bandes spectrales) plutôt qu'à un tableau de variables tabulaires.",
  },

  { type: "heading", text: "4. Arbres de décision et forêts aléatoires (Random Forest)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un arbre de décision prédit une variable (qualitative ou numérique) en posant une succession de questions simples sur les variables explicatives (« altitude > 800 m ? », « pente > 15° ? »), chaque question découpant les données en deux groupes de plus en plus homogènes jusqu'à une feuille terminale qui porte la prédiction finale.",
  },
  {
    type: "formula",
    label: "Indice de Gini (critère de découpage le plus courant)",
    formula: "Gini = 1 − Σᵢ pᵢ²",
    note: "pᵢ est la proportion de la classe i parmi les individus présents dans un nœud de l'arbre. Gini vaut 0 quand le nœud est parfaitement pur (une seule classe présente) et augmente avec le mélange des classes. À chaque étape, l'algorithme choisit la variable et le seuil de découpage qui réduisent le plus l'indice de Gini moyen des deux nœuds enfants par rapport au nœud parent — une alternative équivalente en pratique, l'entropie (H = −Σᵢ pᵢ log₂ pᵢ), suit la même logique.",
  },
  {
    type: "paragraph",
    text: "Un arbre unique, poussé trop profondément, mémorise facilement les particularités de son échantillon d'entraînement plutôt que la structure générale (surapprentissage, voir section suivante). La forêt aléatoire (Random Forest, Breiman 2001) corrige ce défaut en combinant un grand nombre d'arbres, chacun entraîné sur un tirage aléatoire différent des données (bootstrap, voir section 7) et n'ayant accès, à chaque découpage, qu'à un sous-ensemble aléatoire des variables explicatives — la prédiction finale résulte d'un vote majoritaire (classification) ou d'une moyenne (régression) sur l'ensemble des arbres.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Régression linéaire classique",
        points: [
          "Suppose une relation linéaire entre variables explicatives et variable à prédire",
          "Coefficients directement interprétables (effet, sens, magnitude)",
          "Sensible à la multicolinéarité, doit être spécifiée explicitement (termes d'interaction, transformations)",
        ],
      },
      {
        label: "Forêt aléatoire",
        points: [
          "Capture nativement des relations non linéaires et des interactions entre variables, sans les spécifier à la main",
          "Robuste aux valeurs aberrantes et aux variables corrélées entre elles",
          "Moins directement interprétable (boîte plus opaque), compensée par l'importance des variables",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Importance des variables (feature importance)",
    text: "Une forêt aléatoire fournit, pour chaque variable explicative, un score d'importance — le plus courant mesure de combien l'erreur de prédiction du modèle augmente lorsqu'on mélange aléatoirement les valeurs de cette seule variable (importance par permutation), ou de combien la variable contribue en moyenne à réduire l'indice de Gini sur l'ensemble des arbres. Ce classement des variables ne remplace pas un coefficient de régression interprétable, mais indique quelles variables pèsent le plus dans les prédictions du modèle.",
  },

  { type: "heading", text: "5. Validation croisée et surapprentissage", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Évaluer un modèle sur les mêmes données qui ont servi à l'entraîner surestime systématiquement sa performance réelle — le module L'Intelligence introduit déjà cette tension à propos de la classification d'images (train/validation/test) ; la validation croisée en est la version générale, applicable à n'importe quel modèle statistique.",
  },
  {
    type: "formula",
    label: "Validation croisée à k blocs (k-fold cross-validation)",
    formula: "CV(k) = (1/k) · Σᵢ₌₁ᵏ Erreurᵢ",
    note: "Les données sont découpées en k blocs de taille égale. Le modèle est entraîné k fois, à chaque fois sur k−1 blocs et évalué sur le bloc restant (jamais vu pendant cet entraînement) ; l'erreur finale retenue est la moyenne des k erreurs obtenues. Une valeur usuelle est k = 5 ou k = 10 — un compromis entre stabilité de l'estimation (k grand) et coût de calcul (k petit).",
  },
  {
    type: "formula",
    label: "Décomposition biais-variance",
    formula: "E[(y − f̂(x))²] = Biais[f̂(x)]² + Var[f̂(x)] + σ²",
    note: "L'erreur de prédiction attendue se décompose en trois termes : le biais (l'écart systématique d'un modèle trop simple qui ne peut pas capturer la vraie relation — sous-apprentissage), la variance (la sensibilité d'un modèle trop complexe aux particularités de l'échantillon d'entraînement — surapprentissage), et σ², une erreur irréductible propre au bruit des données elles-mêmes, que même le meilleur modèle possible ne peut éliminer.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le compromis biais-variance n'a pas de solution unique",
    text: "Réduire le biais (un modèle plus complexe, plus flexible) augmente en général la variance, et inversement : il n'existe pas de modèle qui minimise simultanément les deux. La validation croisée sert précisément à choisir, parmi plusieurs modèles ou plusieurs réglages d'un même modèle (profondeur d'un arbre, nombre de variables retenues), celui dont l'erreur estimée sur des données non vues est la plus faible — pas celui qui s'ajuste le mieux à l'échantillon d'entraînement.",
  },

  { type: "heading", text: "6. Séries temporelles : autocorrélation, ARIMA, décomposition", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une série temporelle (une mesure répétée dans le temps : température mensuelle, NDVI d'une parcelle sur plusieurs années) viole une hypothèse centrale des méthodes précédentes — l'indépendance des observations : une valeur à l'instant t dépend en général fortement de la valeur à l'instant t−1. Cette dépendance se mesure par l'autocorrélation temporelle.",
  },
  {
    type: "formula",
    label: "Autocorrélation à un décalage k (ACF)",
    formula: "rₖ = Σₜ₌₁ⁿ⁻ᵏ (xₜ − x̄)(xₜ₊ₖ − x̄) / Σₜ₌₁ⁿ (xₜ − x̄)²",
    note: "rₖ mesure la corrélation d'une série avec elle-même décalée de k pas de temps — une valeur au décalage k=12 élevée sur une série mensuelle de NDVI, par exemple, révèle un cycle annuel (une valeur ressemble fortement à celle du même mois l'année précédente).",
  },
  {
    type: "list",
    items: [
      "Décomposition d'une série temporelle : sépare le signal observé en une tendance (évolution de fond à long terme), une composante saisonnière (motif cyclique qui se répète à intervalle fixe, comme le cycle végétatif annuel) et un résidu (ce qui reste une fois tendance et saisonnalité retirées, l'écart au modèle)",
      "Cette décomposition est ce qui rend une anomalie détectable : un résidu inhabituellement bas ou haut à une date donnée signale un événement ponctuel (sécheresse, gel tardif, incendie) que la seule tendance de fond masquerait",
    ],
  },
  {
    type: "formula",
    label: "Modèle ARIMA(p, d, q)",
    formula: "Xₜ' = φ₁Xₜ₋₁' + … + φₚXₜ₋ₚ' + εₜ + θ₁εₜ₋₁ + … + θ_qεₜ₋q",
    note: "ARIMA combine trois briques : p (ordre autorégressif, AR) — la valeur actuelle dépend linéairement de p valeurs passées Xₜ₋₁' ; d (ordre de différenciation, I) — la série Xₜ' est la série d'origine différenciée d fois (Xₜ' = Xₜ − Xₜ₋₁ pour d=1), une opération qui retire une tendance non stationnaire avant modélisation ; q (ordre de moyenne mobile, MA) — la valeur actuelle dépend aussi linéairement de q erreurs passées εₜ₋ⱼ. Un ARIMA(1,1,1), par exemple, différencie une fois la série puis modélise un terme autorégressif et un terme de moyenne mobile d'ordre 1 chacun.",
  },
  {
    type: "link",
    to: "/module/terrset",
    label: "Voir en pratique : Earth Trends Modeler et les séries NDVI longues",
    description: "Le module TerrSet applique cette même mécanique statistique (tendance, décomposition saisonnière, anomalies) à des dizaines d'images NDVI MODIS — ce module en donne la théorie générale, TerrSet l'usage concret en télédétection.",
  },

  { type: "heading", text: "7. Bootstrap et méthodes de rééchantillonnage", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Calculer l'intervalle de confiance d'une statistique (une médiane, un coefficient de régression, un écart-type) suppose souvent, dans les formules classiques vues piste Licence/BUT, une distribution théorique connue — pas toujours réaliste sur un petit échantillon ou une statistique complexe sans formule d'erreur standard établie. Le bootstrap contourne ce problème en estimant la distribution d'échantillonnage directement à partir des données elles-mêmes, sans hypothèse théorique a priori.",
  },
  {
    type: "formula",
    label: "Intervalle de confiance bootstrap (méthode des percentiles)",
    formula: "IC95% = [ percentile 2,5 % ; percentile 97,5 % ] de la distribution de θ* sur B réplications",
    note: "On tire, avec remise, B échantillons (typiquement B = 1000 ou plus) de même taille n que l'échantillon original ; « avec remise » signifie qu'une même observation peut être piochée plusieurs fois dans un même tirage bootstrap, et d'autres pas du tout. On calcule la statistique d'intérêt θ* (une moyenne, un coefficient…) sur chacun de ces B échantillons, ce qui construit une distribution empirique de θ* ; ses percentiles 2,5 % et 97,5 % bornent directement un intervalle de confiance à 95 %, sans jamais avoir supposé de forme théorique (normale ou autre) pour cette distribution.",
  },
  {
    type: "callout",
    tone: "example",
    title: "À quoi ça sert concrètement",
    text: "L'écart-type d'une médiane, contrairement à celui d'une moyenne, n'a pas de formule simple en fonction de n et de σ. Le bootstrap donne malgré tout un intervalle de confiance pour une médiane (ou pour n'importe quelle statistique, aussi complexe soit-elle) en rééchantillonnant directement les données observées des milliers de fois, sans jamais avoir besoin de dériver une formule d'erreur standard propre à cette statistique.",
  },
  {
    type: "link",
    to: "/module/programmation-r",
    label: "Passer à la pratique : bootstrap et permutation en R",
    description: "Le module R implémente concrètement le bootstrap et les tests de permutation en quelques lignes (replicate(), sample()) — ce module en donne la théorie générale, celui-là le code qui l'exécute réellement.",
  },

  { type: "heading", text: "8. Choisir le bon test : une synthèse", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Face à un jeu de données réel, la question n'est jamais « quel est le meilleur test statistique » dans l'absolu, mais « quel test correspond au type de mes variables et à la question posée ». Le tableau suivant synthétise les méthodes vues dans les trois pistes de ce module selon ces deux critères.",
  },
  {
    type: "table",
    headers: ["Question posée", "Type(s) de variable(s)", "Méthode(s) appropriée(s)"],
    rows: [
      ["Comparer une moyenne à une valeur de référence", "1 variable numérique", "t-test à un échantillon"],
      ["Comparer les moyennes de deux groupes", "1 numérique + 1 qualitative à 2 modalités", "t-test indépendant (ou apparié si les mêmes individus sont mesurés deux fois)"],
      ["Comparer les moyennes de trois groupes ou plus", "1 numérique + 1 qualitative à k modalités", "ANOVA à un facteur, puis test post-hoc (Tukey) si significatif"],
      ["Tester un lien entre deux variables qualitatives", "2 variables qualitatives", "Test du χ² d'indépendance (ou test exact de Fisher si petits effectifs)"],
      ["Mesurer/tester un lien linéaire entre deux variables numériques", "2 variables numériques", "Corrélation de Pearson, régression linéaire simple"],
      ["Prédire une variable numérique à partir de plusieurs autres", "1 numérique à expliquer + plusieurs numériques explicatives", "Régression linéaire multiple (vérifier le VIF)"],
      ["Prédire une variable binaire", "1 binaire à expliquer + variables explicatives", "Régression logistique (évaluer par ROC/AUC)"],
      ["Résumer/réduire de nombreuses variables numériques corrélées", "Plusieurs variables numériques", "ACP"],
      ["Résumer/réduire de nombreuses variables qualitatives", "Plusieurs variables qualitatives", "AFC (2 variables) ou ACM (plus de 2)"],
      ["Regrouper des individus en classes homogènes, sans étiquette", "Plusieurs variables numériques", "k-means (k fixé à l'avance) ou CAH/Ward (nombre de classes choisi a posteriori)"],
      ["Prédire une variable en captant des relations non linéaires", "Variable à expliquer + variables explicatives quelconques", "Arbre de décision ou forêt aléatoire"],
      ["Étudier une mesure répétée dans le temps", "1 variable numérique datée", "Autocorrélation (ACF), décomposition, ARIMA"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Une question à se poser avant toute autre",
    text: "Avant même de choisir un test dans ce tableau : les observations sont-elles indépendantes les unes des autres ? Des mesures répétées sur les mêmes individus (piste Licence/BUT, test apparié), une série temporelle (autocorrélation, section 6), ou des données géographiques voisines (autocorrélation spatiale, module Les Statistiques) violent toutes cette hypothèse d'indépendance d'une façon différente — et un test qui l'ignore surestime systématiquement la significativité de ses propres résultats.",
  },
  {
    type: "devoir",
    format: "Étude de cas commentée",
    title: "Construire un pipeline d'analyse complet",
    prompt: "Un jeu de données rassemble, pour 200 parcelles agricoles, une dizaine de variables numériques (rendement, teneur en azote, pH du sol, pluviométrie annuelle, altitude…) et une variable qualitative (type de culture, 4 modalités). Propose un plan d'analyse statistique complet en trois étapes : (1) une étape exploratoire pour résumer et réduire les variables numériques corrélées entre elles, (2) une étape de comparaison du rendement selon le type de culture, (3) une étape de modélisation prédictive du rendement à partir des autres variables numériques, en expliquant comment tu évaluerais honnêtement la qualité de ce modèle prédictif sans le surestimer.",
    criteria: [
      "L'étape 1 propose une ACP (et non une AFC/ACM, puisque les variables citées sont numériques) avec une lecture correcte de la variance expliquée",
      "L'étape 2 choisit une ANOVA (4 groupes, pas un t-test) et mentionne un test post-hoc en cas de résultat significatif",
      "L'étape 3 distingue explicitement régression linéaire multiple et forêt aléatoire comme deux options valables, avec au moins un argument de choix entre les deux",
      "L'évaluation du modèle prédictif s'appuie explicitement sur une validation croisée (k-fold), pas sur l'erreur mesurée sur les données d'entraînement",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : l'ACP réduit des variables numériques corrélées via une décomposition en valeurs propres (variance expliquée = λᵢ/Σλ), l'AFC/ACM en sont l'équivalent qualitatif ; k-means (k fixé) et CAH/Ward (dendrogramme, k choisi après coup) regroupent sans étiquette ; un arbre de décision découpe selon l'indice de Gini, une forêt aléatoire combine de nombreux arbres pour réduire la variance et fournit une importance des variables ; la validation croisée (k-fold) estime honnêtement une erreur de généralisation, arbitrée par le compromis biais-variance ; l'autocorrélation temporelle et ARIMA(p,d,q) modélisent une série chronologique, décomposée en tendance/saisonnalité/résidu ; le bootstrap construit un intervalle de confiance empirique par rééchantillonnage avec remise, sans hypothèse théorique a priori ; le bon test dépend toujours du type de variable et du nombre de groupes/variables en jeu, jamais d'une préférence a priori.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Continuer : quand l'espace complique tout",
    description: "Le module Les Statistiques reprend plusieurs méthodes de ce module (régression, autocorrélation) dans leur version spatiale : autocorrélation spatiale (Moran, LISA, Gi*), MAUP, régression géographiquement pondérée.",
  },
]
