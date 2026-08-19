import type { ContentBlock } from "./types"

export const methodologieContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Les six salles précédentes donnent des connaissances : systèmes de coordonnées, capteurs, indices, outils, traitements. Celle-ci donne une méthode pour les mobiliser à l'écrit : au lycée comme à l'université, en examen comme en concours, dans un devoir comme dans un rapport professionnel.",
  },

  { type: "heading", text: "1. Le commentaire de carte ou de document géographique", level: "lycee" },
  {
    type: "paragraph",
    text: "Un commentaire de document ne se réduit jamais à une description : il progresse par étapes, chacune préparant la suivante.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Identification : nature du document (carte topographique, image satellite, photographie aérienne…), source, date, échelle, sujet apparent",
      "Description organisée : ne pas énumérer au hasard, mais partir du général (structure d'ensemble) vers le particulier (détails significatifs), ou suivre un ordre spatial cohérent",
      "Analyse : expliquer ce qui est observé, en mettant en relation les éléments entre eux, en convoquant des connaissances extérieures au document pour interpréter, pas seulement décrire",
      "Critique du document : ses limites (échelle trop petite pour tel phénomène, date ancienne, absence de légende sur un point clé) ; un bon commentaire questionne aussi la source",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "L'erreur la plus fréquente",
    text: "Décrire sans jamais expliquer. \"On observe une zone urbanisée au sud\" est une description ; \"cette urbanisation s'explique par la proximité de l'axe routier visible au nord-est\" est une analyse. Le second niveau seul est noté comme une vraie compétence de commentaire.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Grille de lecture pour un document de télédétection précisément",
    text: "Pour une image satellite ou un indice cartographié (NDVI, NDBI…), l'identification doit préciser en plus : le capteur et sa résolution spatiale (une image Sentinel-2 à 10 m ne permet pas les mêmes conclusions qu'une image Pléiades à 0.5 m), la composition affichée (naturelle ou fausse couleur, voir module Le Regard) et, pour un indice, sa formule et son échelle de valeurs. Omettre ces précisions techniques dans l'identification est sanctionné comme une identification incomplète, au même titre qu'oublier l'échelle d'une carte topographique.",
  },
  {
    type: "paragraph",
    text: "Une photographie aérienne se lit différemment selon sa prise de vue : verticale (l'appareil pointe vers le sol, c'est la géométrie de la photogrammétrie et des orthophotos), elle se compare à une carte et permet de mesurer des distances une fois orthorectifiée ; oblique (prise de biais), elle donne un rendu plus lisible pour un public non spécialiste mais déforme les distances et les surfaces de façon croissante avec l'éloignement au point de prise de vue — un commentaire doit préciser laquelle est utilisée avant d'en tirer une mesure quelconque.",
  },
  {
    type: "list",
    items: [
      "Vérifier avant de conclure : le nord est-il indiqué ? l'échelle est-elle graphique (fiable après un redimensionnement de l'image) ou seulement numérique (faussée si l'image a été redimensionnée) ?",
      "Une seule date ne permet jamais de conclure sur une évolution : une comparaison exige au minimum deux documents comparables (même saison si le phénomène est saisonnier, résolutions compatibles)",
      "Relire la légende avant la carte elle-même : une légende mal comprise fausse toute la lecture qui suit",
    ],
  },

  { type: "heading", text: "2. La dissertation de géographie", level: "superieur" },
  {
    type: "paragraph",
    text: "Une dissertation répond à une question qui n'a pas de réponse évidente ni univoque : sinon, il n'y aurait rien à démontrer. La méthode se joue avant même la rédaction :",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Analyser le sujet : définir chaque mot clé, repérer les bornes spatiales et temporelles implicites",
      "Construire une problématique : une question qui met en tension deux idées, pas une simple reformulation du sujet",
      "Bâtir un plan : classiquement en trois parties, chacune apportant un angle de réponse différent, pas trois exemples de la même idée",
      "Rédiger avec des transitions explicites entre les parties : le lecteur doit comprendre pourquoi on passe de l'une à l'autre",
    ],
  },
  {
    type: "diagram",
    name: "dissertation-plan",
    caption: "Le squelette d'une dissertation : chaque partie répond à une fonction précise, pas seulement à \"encore un exemple\".",
  },
  {
    type: "callout",
    tone: "example",
    title: "Sujet travaillé",
    text: "« Le satellite peut-il remplacer le terrain dans la gestion des risques naturels ? » Partie I : ce que le satellite apporte réellement (couverture large, répétée, indices quantifiés). Partie II : ses limites concrètes (résolution, occlusion nuageuse, absence de contexte humain/social). Partie III : la complémentarité effective observée dans les dispositifs réels (le satellite oriente, le terrain confirme et affine).",
  },
  {
    type: "paragraph",
    text: "Trois familles de plans reviennent le plus souvent en géographie, à choisir selon la nature exacte du sujet, jamais par habitude :",
  },
  {
    type: "table",
    headers: ["Type de plan", "Quand l'utiliser", "Risque principal"],
    rows: [
      ["Thématique (I. Aspect A, II. Aspect B, III. Aspect C)", "Sujet qui invite à explorer plusieurs dimensions d'un même phénomène", "Trois parties qui juxtaposent sans dialoguer entre elles"],
      ["Dialectique (I. Thèse, II. Antithèse, III. Synthèse)", "Sujet formulé comme une question fermée ou un débat explicite", "Une antithèse artificielle, construite juste pour la forme du plan"],
      ["Chronologique / évolutif (I. Avant, II. Rupture, III. Aujourd'hui)", "Sujet portant sur une évolution, une transition technique ou historique", "Une simple chronique des faits, sans problématique transversale"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le plan doit se déduire de la problématique, pas l'inverse",
    text: "Un plan-type plaqué sur un sujet qu'il ne sert pas est une des critiques les plus fréquentes en évaluation. Le test simple : si l'on peut permuter deux parties du plan sans rien perdre à la démonstration, c'est que le plan ne démontre en réalité rien de progressif : il ne fait qu'illustrer.",
  },

  { type: "heading", text: "3. Le rapport technique SIG et télédétection", level: "superieur" },
  {
    type: "paragraph",
    text: "En milieu professionnel ou en stage, le format change mais l'exigence de méthode reste : un rapport technique se lit dans l'ordre, mais doit aussi pouvoir être consulté par sections isolément (un décideur pressé lira le résumé et les recommandations, pas la méthode complète).",
  },
  {
    type: "table",
    headers: ["Section", "Contenu attendu"],
    rows: [
      ["Contexte et objectif", "Pourquoi cette étude, pour qui, avec quelle contrainte de délai/budget"],
      ["Données et méthode", "Sources précises (capteur, date, résolution), prétraitements appliqués, outils utilisés"],
      ["Résultats", "Cartes, indices, tableaux, présentés avant toute interprétation"],
      ["Discussion", "Limites, incertitude, sensibilité du résultat aux choix méthodologiques"],
      ["Recommandations", "Ce que le commanditaire doit concrètement en faire"],
      ["Annexes / métadonnées", "Traçabilité complète : de quelles données exactement vient ce résultat"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Résultats avant interprétation",
    text: "Séparer nettement les résultats bruts de leur discussion évite au lecteur de confondre ce qui a été mesuré et ce que l'auteur du rapport en pense. Cette distinction, banale à l'écrit scientifique, est souvent la première chose qui manque dans un premier rapport technique.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Documenter une incertitude, pas seulement un résultat",
    text: "\"Le NDVI moyen de la parcelle est de 0.62\" est une affirmation incomplète pour un rapport technique. \"Le NDVI moyen de la parcelle est de 0.62 (image Sentinel-2 du 14/07, niveau L2A, résolution 10 m, ±quelques pixels nuageux masqués sur le quart nord-est)\" permet à un lecteur externe d'évaluer lui-même la fiabilité du chiffre : c'est cette transparence, plus que le chiffre seul, qui distingue un rapport technique d'une simple affirmation.",
  },

  { type: "heading", text: "4. La sémiologie graphique : le langage visuel de la carte", level: "superieur" },
  {
    type: "paragraph",
    text: "Une carte n'est pas une illustration libre : elle obéit à un langage visuel formalisé par Jacques Bertin dans la Sémiologie graphique (1967), qui reste la référence de toute cartographie thématique aujourd'hui enseignée en France. Bertin identifie six variables visuelles qu'un symbole cartographique peut porter, et associe chacune à un type de donnée qu'elle représente correctement, ou trahit, si mal choisie.",
  },
  {
    type: "table",
    headers: ["Variable visuelle", "Convient pour représenter"],
    rows: [
      ["Taille", "Une quantité (donnée d'ordre ou de quantité) : ex. ronds proportionnels à une population"],
      ["Valeur (clair → foncé)", "Un ordre, une intensité progressive : ex. dégradé de couleur pour un taux, une densité"],
      ["Grain / texture", "Un ordre également, moins précis visuellement que la valeur"],
      ["Couleur (teinte)", "Une donnée qualitative, sans ordre : ex. type d'occupation du sol (forêt, culture, bâti)"],
      ["Orientation", "Rarement utilisée seule ; combinable avec d'autres variables"],
      ["Forme", "Une donnée qualitative catégorielle : ex. pictogrammes différenciant un type d'équipement"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "L'erreur sémiologique la plus commune : la couleur pour une quantité",
    text: "Utiliser un dégradé de teintes qualitatives différentes (par exemple rouge puis bleu puis vert) pour représenter une donnée ordonnée (un taux croissant) brouille la lecture : l'œil ne perçoit pas d'ordre naturel entre des teintes. Une variable de quantité ou d'ordre doit être portée par la taille ou par un dégradé de valeur d'une même teinte (clair → foncé), jamais par une succession de couleurs sans ordre perceptif.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Application directe à un indice spectral",
    text: "Un NDVI cartographié est une donnée continue et ordonnée (de -1 à 1) : une palette séquentielle à une seule teinte (ex. blanc → vert foncé) ou une palette divergente centrée sur 0 (ex. marron → blanc → vert, si l'on veut distinguer explicitement le négatif du positif) respecte la sémiologie de Bertin. Une palette arc-en-ciel non ordonnée (souvent choisie par défaut dans un logiciel) est un contre-exemple classique : elle introduit des ruptures visuelles qui ne correspondent à aucune rupture réelle dans la donnée.",
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Voir l'indice concerné : le NDVI",
    description: "Le module Les Couleurs détaille la formule et l'échelle de valeurs du NDVI utilisé comme exemple ci-dessus.",
  },
  { type: "game" },

  { type: "heading", text: "5. Le croquis et la carte de synthèse", level: "superieur" },
  {
    type: "paragraph",
    text: "Le croquis de géographie (fréquent en épreuve de bac et de concours) répond aux mêmes exigences de méthode qu'une dissertation, mais transposées au langage cartographique : il doit avoir un titre problématisé (pas un simple intitulé de sujet), une légende organisée en rubriques logiques (jamais une liste de symboles dans l'ordre où ils viennent à l'esprit), et une nomenclature choisie pour appuyer une démonstration, pas pour être exhaustive.",
  },
  {
    type: "list",
    items: [
      "Le titre du croquis doit annoncer une problématique, comme le ferait l'intitulé d'un plan de dissertation",
      "La légende s'organise en 2 à 4 rubriques thématiques (ex. \"Les dynamiques du territoire\", \"Les contraintes physiques\", \"Les réseaux\"), jamais en vrac",
      "Chaque figuré cartographique choisi doit respecter la sémiologie de Bertin (section 4) : le figuré doit être justifié par la nature de la donnée qu'il porte",
      "La légende, la nomenclature et le figuré ne doivent jamais être plus détaillés que ce que l'échelle du fond de carte permet réellement de représenter",
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "Croquis d'examen (bac, concours)",
        points: [
          "Fond de carte imposé, à main levée ou tracé simple",
          "Temps contraint : légende schématique, peu de rubriques",
          "Juge la démonstration, pas la finition graphique",
        ],
      },
      {
        label: "Carte de synthèse professionnelle (rapport, mémoire)",
        points: [
          "Fond de carte choisi et sourcé, réalisé en SIG",
          "Temps long : légende exhaustive, sources et échelle précisées",
          "Juge aussi la lisibilité et la conformité aux normes cartographiques (échelle, orientation, source)",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Une légende organisée, sur un exemple concret",
    text: "Sujet : « L'artificialisation des sols en périphérie d'une métropole ». Une légende en vrac listerait pêle-mêle zones bâties, routes, cours d'eau, zones agricoles. Une légende organisée regroupe par rubrique : « I. Les espaces artificialisés » (bâti dense, zones d'activité, réseau routier structurant), « II. Les espaces encore ouverts » (agriculture, espaces boisés, trame verte résiduelle), « III. Les dynamiques et tensions » (fronts d'urbanisation, flèches de pression foncière). Le lecteur comprend la structure du raisonnement avant même de lire le texte du devoir.",
  },
  {
    type: "devoir",
    format: "Croquis noté",
    title: "Construire la légende d'un croquis de synthèse",
    prompt: "À partir d'un sujet de ton choix portant sur un territoire connu (ta commune, ta région), rédige uniquement le titre problématisé et la légende organisée (2 à 4 rubriques, chaque figuré justifié) — sans tracer le fond de carte. L'objectif est d'évaluer la structuration de la légende indépendamment du dessin.",
    criteria: [
      "Le titre annonce une problématique, pas seulement le thème du sujet",
      "La légende compte 2 à 4 rubriques thématiques cohérentes, pas une liste plate",
      "Chaque figuré est justifié par la nature de la donnée qu'il représente (sémiologie de Bertin, section 4)",
      "Aucun élément de légende ne dépasse ce qu'une échelle raisonnable permettrait réellement de représenter",
    ],
  },

  { type: "heading", text: "6. Préparer un concours (CAPES / Agrégation d'histoire-géographie)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Les épreuves de concours d'enseignement en histoire-géographie mobilisent directement les compétences des sections précédentes, avec des attentes spécifiques :",
  },
  {
    type: "list",
    items: [
      "L'épreuve écrite de dissertation attend un plan démonstratif rigoureux et des références précises (auteurs, exemples localisés, dates)",
      "L'épreuve de cartographie thématique (fréquente à l'oral) évalue la capacité à choisir une sémiologie graphique adaptée au phénomène représenté (section 4), pas seulement une carte esthétique",
      "Les rapports de jury, publiés après chaque session, sont la ressource la plus utile pour calibrer précisément le niveau d'exigence attendu, bien plus qu'un manuel générique",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "La carte n'est pas une illustration",
    text: "En épreuve de cartographie thématique, une carte mal choisie (par exemple des ronds proportionnels là où un dégradé de couleur conviendrait à une donnée relative) est sanctionnée même si le fond de carte est soigné. Le choix sémiologique fait partie de la réponse, pas de sa mise en forme.",
  },
  {
    type: "callout",
    tone: "info",
    title: "L'oral de concours : reformuler, ne pas réciter",
    text: "Un jury évalue autant la capacité à répondre à une question précise posée en direct qu'à dérouler un exposé préparé. Le réflexe le plus utile : reformuler brièvement la question avant d'y répondre, pour vérifier qu'on l'a bien comprise et laisser au jury l'occasion de préciser s'il le souhaite, un geste simple, souvent négligé sous la pression du temps.",
  },
  {
    type: "list",
    items: [
      "Gérer le temps de préparation en deux passes : une première lecture complète du sujet et des documents sans rien rédiger, puis seulement la construction du plan — rédiger dès la première lecture pousse presque toujours vers un plan bancal",
      "Réserver systématiquement les dernières minutes de préparation à une relecture du plan, pas à en ajouter davantage : un plan clair et tenu vaut mieux qu'un plan surchargé mal exposé",
      "À l'oral, annoncer le plan dès l'introduction et le rappeler brièvement à chaque transition : le jury doit pouvoir suivre la démonstration sans avoir le plan sous les yeux",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Mettre en pratique : le mini-projet et son rapport",
    description: "La séance 7 de l'Atelier applique cette méthode à un rapport complet, avec une grille d'auto-évaluation corrigée.",
  },

  { type: "heading", text: "7. Le mémoire de recherche : structure IMRaD et rigueur statistique", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un mémoire de master recherche ou un article scientifique obéit à une structure différente du rapport technique de la section 3 : la structure IMRaD (Introduction, Méthode, Résultats, and Discussion), quasi universelle dans les sciences empiriques, y compris en géographie quantitative et en télédétection.",
  },
  {
    type: "table",
    headers: ["Section IMRaD", "Fonction", "Erreur fréquente à éviter"],
    rows: [
      ["Introduction", "Situe la question dans la littérature existante, justifie pourquoi elle reste ouverte", "Un état de l'art qui résume sans jamais dire ce qui manque encore"],
      ["Méthode", "Décrit précisément ce qui a été fait, de façon à ce qu'un tiers puisse reproduire l'étude", "Une méthode décrite après coup pour justifier le résultat obtenu, plutôt que fixée avant l'analyse"],
      ["Résultats", "Présente les données obtenues, sans interprétation", "Mélanger résultat et interprétation dans la même phrase (voir section 3)"],
      ["Discussion", "Interprète, compare à la littérature, admet les limites", "Une discussion qui ignore les résultats qui ne vont pas dans le sens attendu"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Lire et écrire un test statistique correctement",
    text: "Une valeur de p (p-value) ne mesure pas la probabilité que l'hypothèse étudiée soit vraie : c'est la probabilité d'observer un résultat au moins aussi extrême que celui obtenu, si l'hypothèse nulle (\"aucun effet réel\") était vraie. p < 0.05 est un seuil conventionnel, pas une preuve absolue, et un résultat significatif sur un échantillon non indépendant (ex. plusieurs mesures successives du même phénomène, comme des pas horaires d'un seul événement) surestime la confiance qu'on peut réellement y accorder si cette non-indépendance n'est pas prise en compte dans le test (test apparié, correction pour pseudo-réplication).",
  },
  {
    type: "list",
    items: [
      "Toujours rapporter la taille d'échantillon et préciser ce qu'est \"une observation\" (un pixel ? un pas de temps ? un site ?) : deux études avec le même p peuvent avoir une robustesse très différente selon ce choix",
      "Distinguer significativité statistique (l'effet existe-t-il probablement) et significativité pratique (l'effet est-il assez grand pour compter) : un effet minuscule peut devenir statistiquement significatif avec un échantillon assez grand, sans être opérationnellement intéressant",
      "Documenter une limite méthodologique honnêtement (échantillon unique, absence d'indépendance entre observations) est un signe de rigueur, pas un aveu de faiblesse : un résultat présenté sans ses limites est moins crédible, pas plus, aux yeux d'un lecteur averti",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Revue de littérature : synthétiser, pas empiler",
    text: "Une revue de littérature organisée chronologiquement (\"en 1990, X a montré... puis en 2005, Y a montré...\") reste souvent une paraphrase juxtaposée. Une revue organisée par débat ou par méthode (\"deux approches s'opposent sur ce point : d'un côté X, Y ; de l'autre Z\") démontre une réelle appropriation de la littérature : c'est ce second type qui est attendu dans l'introduction d'un mémoire de recherche.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Citer une source, y compris une donnée géospatiale",
    text: "Le plagiat ne concerne pas que le texte : reprendre un jeu de données, un fond de carte ou une méthode de traitement sans en citer l'origine (producteur, date, licence) est une faute de même nature. Une donnée Copernicus, IGN ou OpenStreetMap réutilisée dans un mémoire doit être créditée avec la même rigueur qu'une citation d'auteur — attendu explicitement dans la section Méthode d'un travail IMRaD.",
  },
]
