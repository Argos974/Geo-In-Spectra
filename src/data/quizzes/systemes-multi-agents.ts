import type { QuizQuestion } from "./types"

export const systemesMultiAgentsQuiz: QuizQuestion[] = [
  {
    question: "Qu'est-ce qui caractérise fondamentalement un agent dans un système multi-agent ?",
    choices: [
      "Il a toujours accès à une vue d'ensemble complète du système avant de décider",
      "Il perçoit seulement une petite portion de son environnement immédiat et décide selon des règles qui lui sont propres, sans vision globale",
      "Il suit toujours les instructions d'un agent central qui coordonne l'ensemble",
      "Il ne peut interagir qu'avec un seul autre agent à la fois",
    ],
    correctIndex: 1,
    explanation: "Un agent perçoit localement, décide selon ses propres règles, puis agit — sans jamais avoir accès à une vue d'ensemble du système entier. C'est cette absence de contrôle centralisé qui rend possible un comportement émergent.",
  },
  {
    question: "Qu'appelle-t-on un « comportement émergent » ?",
    choices: [
      "Un comportement planifié à l'avance par un agent meneur du groupe",
      "Un comportement collectif organisé qui naît des interactions locales répétées entre agents, sans qu'aucun agent ne le vise individuellement",
      "Un bug de simulation qui doit être corrigé avant publication",
      "Un comportement identique chez tous les agents du système",
    ],
    correctIndex: 1,
    explanation: "Un comportement émergent (un vol d'étourneaux, une ségrégation résidentielle) résulte des interactions locales répétées entre de nombreux agents, sans qu'aucun agent pris isolément n'en ait l'intention ni la vue d'ensemble.",
  },
  {
    question: "Dans le Jeu de la Vie de Conway, une cellule vivante avec exactement deux ou trois voisines vivantes :",
    choices: [
      "Meurt systématiquement, quel que soit son état précédent",
      "Reste vivante (équilibre)",
      "Devient automatiquement le centre d'un nouveau planeur",
      "Ne peut être calculée qu'avec un ordinateur, jamais à la main",
    ],
    correctIndex: 1,
    explanation: "Les règles du Jeu de la Vie : une cellule vivante avec moins de deux voisines meurt (isolement), avec deux ou trois reste vivante (équilibre), avec plus de trois meurt (surpopulation) ; une cellule morte avec exactement trois voisines vivantes naît.",
  },
  {
    question: "Les trois règles des boids de Reynolds sont :",
    choices: [
      "Accélération, freinage, avancée",
      "Séparation, alignement, cohésion",
      "Perception, décision, action",
      "Overview, Design concepts, Details",
    ],
    correctIndex: 1,
    explanation: "Séparation (s'écarter des voisins trop proches), alignement (adopter la direction moyenne des voisins) et cohésion (se rapprocher du centre du groupe local) suffisent, appliquées simultanément, à produire un vol de groupe crédible.",
  },
  {
    question: "Le résultat le plus marquant du modèle de ségrégation de Schelling est que :",
    choices: [
      "Seule une hostilité forte entre groupes peut produire une ségrégation résidentielle observable",
      "Une préférence individuelle très modérée (tolérer une large majorité de voisins différents) suffit à produire, une fois généralisée, une ségrégation collective forte et non désirée par personne",
      "La ségrégation n'apparaît jamais si le seuil de tolérance dépasse 50 %",
      "Le modèle ne fonctionne que sur des grilles de très grande taille",
    ],
    correctIndex: 1,
    explanation: "Même avec un seuil de tolérance modéré (par exemple 30-40 %), le modèle de Schelling produit typiquement, après quelques déménagements, une ségrégation bien plus marquée que ce que chaque agent, pris individuellement, exigeait — un exemple classique d'émergence non désirée.",
  },
  {
    question: "Quelle est la différence entre un voisinage de Moore et un voisinage de von Neumann dans un automate cellulaire ?",
    choices: [
      "Moore compte 8 cellules (diagonales incluses), von Neumann seulement 4 (sans diagonale)",
      "Von Neumann compte toujours plus de cellules que Moore",
      "Les deux voisinages sont strictement identiques, seul le nom change",
      "Moore ne s'applique qu'à des grilles triangulaires",
    ],
    correctIndex: 0,
    explanation: "Le voisinage de Moore inclut les 8 cellules environnantes (y compris les diagonales) ; le voisinage de von Neumann se limite aux 4 cellules directement adjacentes (haut/bas/gauche/droite).",
  },
  {
    question: "Dans l'optimisation par colonies de fourmis (ACO), comment le chemin le plus court finit-il par émerger ?",
    choices: [
      "Une fourmi reine calcule le chemin optimal et le communique aux autres",
      "Les chemins courts accumulent plus de phéromone (empruntés et donc renforcés plus souvent) tandis que l'évaporation efface progressivement les chemins longs délaissés",
      "Chaque fourmi mémorise individuellement la carte complète du graphe",
      "L'algorithme fonctionne uniquement si le nombre de fourmis dépasse le nombre de nœuds du graphe",
    ],
    correctIndex: 1,
    explanation: "Aucune fourmi n'a de vue d'ensemble du graphe : le dépôt de phéromone (renforcé sur les chemins courts, empruntés plus souvent) combiné à son évaporation progressive fait émerger collectivement le chemin le plus court.",
  },
  {
    question: "Qu'est-ce qui distingue principalement la plateforme GAMA de NetLogo ou Mesa ?",
    choices: [
      "GAMA ne peut simuler que des automates cellulaires, jamais des agents mobiles",
      "GAMA charge nativement de vraies couches SIG (Shapefile, GeoTIFF projetés) comme environnement du modèle, alors que NetLogo/Mesa utilisent une grille ou un espace abstrait",
      "NetLogo et Mesa sont plus récents que GAMA",
      "GAMA ne permet pas d'écrire de code, contrairement à NetLogo et Mesa",
    ],
    correctIndex: 1,
    explanation: "GAMA (langage GAML) est conçue dès l'origine pour la géo-simulation : elle charge directement des couches SIG réelles, avec leur CRS et leur géométrie exacte, comme environnement natif — NetLogo et Mesa restent des plateformes généralistes où une vraie couche SIG doit d'abord être convertie en grille abstraite.",
  },
  {
    question: "À quoi sert le protocole ODD (Overview, Design concepts, Details) ?",
    choices: [
      "À optimiser automatiquement les paramètres d'un modèle multi-agent",
      "À standardiser la documentation d'un modèle multi-agent publié, pour qu'il soit reproductible et comparable à d'autres modèles",
      "À calculer la centralité d'un nœud dans un réseau d'agents",
      "À remplacer entièrement le besoin de calibrer un modèle",
    ],
    correctIndex: 1,
    explanation: "ODD structure la description d'un ABM en trois blocs standardisés pour que des détails d'implémentation habituellement omis (ordonnancement, gestion des bords, initialisation) soient documentés systématiquement, rendant le modèle reproductible par une équipe tierce.",
  },
  {
    question: "Pourquoi un modèle multi-agent doté d'un très grand nombre de paramètres libres est-il un risque, même s'il reproduit bien un motif observé ?",
    choices: [
      "Parce qu'un tel modèle est toujours plus lent à exécuter",
      "Parce qu'il peut reproduire à peu près n'importe quel motif en ajustant ses paramètres, sans que cela prouve que le mécanisme simulé est le mécanisme réellement à l'œuvre (risque de sur-paramétrage/équifinalité)",
      "Parce que NetLogo et Mesa limitent techniquement le nombre de paramètres autorisés",
      "Parce qu'un modèle à beaucoup de paramètres ne peut jamais être documenté par le protocole ODD",
    ],
    correctIndex: 1,
    explanation: "Un modèle trop libre peut « expliquer » a posteriori n'importe quel motif sans que son bon ajustement prouve le réalisme de son mécanisme (équifinalité) — un piège comparable au surapprentissage en machine learning. La modélisation orientée motifs (POM) réduit ce risque en confrontant le modèle à plusieurs motifs indépendants à la fois.",
  },
]
