import type { ContentBlock } from "./types"

export const systemesMultiAgentsContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Dans « Jeux d'enfants » (1560), Pieter Brueghel l'Ancien peint plus de deux cents enfants sur une même place, chacun absorbé dans son propre jeu, sa propre règle, sans meneur ni chef d'orchestre — et pourtant l'ensemble forme une scène cohérente, une place de village qui « fonctionne ». C'est exactement le principe d'un système multi-agent : de nombreuses entités autonomes, chacune ne suivant que ses propres règles locales, sans vue d'ensemble ni coordination centrale, dont les interactions produisent malgré tout un comportement collectif organisé — parfois même un comportement qu'aucun agent, pris isolément, n'a jamais eu l'intention de produire. Ce module explore cette idée depuis son intuition la plus simple (un automate cellulaire, un banc de poissons) jusqu'à sa mise en œuvre rigoureuse en géographie : simulation de croissance urbaine, de trafic, d'épidémie, de foule. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Qu'est-ce qu'un agent ?", level: "lycee" },
  {
    type: "paragraph",
    text: "Un agent, au sens de la modélisation multi-agent, est une entité autonome capable de percevoir une petite portion de son environnement immédiat, de décider d'une action selon des règles qui lui sont propres, puis d'agir — sans jamais avoir accès à une vue d'ensemble du système entier. Un piéton dans une foule, une fourmi dans une colonie, un véhicule dans un embouteillage : chacun ne voit que ses voisins immédiats, ignore ce qui se passe à l'autre bout de la place ou de la route, et pourtant agit.",
  },
  {
    type: "list",
    items: [
      "Perception : ce que l'agent peut observer autour de lui — souvent limité à un petit rayon ou à ses voisins directs, jamais le système entier",
      "Décision : la règle (souvent très simple) qui transforme cette perception en un choix d'action",
      "Action : le geste effectivement réalisé, qui modifie à son tour l'environnement ou la position de l'agent",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Aucun agent n'a la carte du système entier",
    text: "C'est le point le plus important à retenir avant tout le reste : un agent suit des règles simples et locales, sans connaître ni contrôler le comportement global qui va en résulter. Personne, dans un banc de poissons, ne « décide » de la forme du banc.",
  },

  { type: "heading", text: "2. Le comportement émergent : le tout est plus que la somme des parties", level: "lycee" },
  {
    type: "paragraph",
    text: "Un banc de poissons qui se resserre d'un seul mouvement pour éviter un prédateur, un vol d'étourneaux qui dessine dans le ciel des nuages mouvants et fluides (un « murmure », ou murmuration) : aucun poisson, aucun oiseau ne connaît la forme d'ensemble qu'il contribue à dessiner. Chacun réagit seulement à ses quelques voisins les plus proches. La forme globale — organisée, parfois spectaculaire — n'existe dans l'esprit d'aucun individu : elle émerge des interactions locales répétées entre des milliers d'agents identiques. C'est ce qu'on appelle un comportement émergent.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Émergent ne veut pas dire planifié",
    text: "L'erreur la plus fréquente est de supposer qu'un comportement collectif aussi organisé doit forcément être piloté par un chef (un poisson meneur, un oiseau leader). C'est faux dans l'immense majorité des cas étudiés : le mouvement d'ensemble apparaît sans qu'aucun agent n'ait de rôle central, et disparaît si on modifie légèrement la règle individuelle — pas la position d'un supposé « chef ».",
  },

  { type: "heading", text: "3. Un automate cellulaire simple : le Jeu de la Vie de Conway", level: "lycee" },
  {
    type: "paragraph",
    text: "Un automate cellulaire est une grille de cellules qui évoluent toutes ensemble, pas à pas, selon une règle strictement locale : l'état futur d'une cellule ne dépend que de son état actuel et de celui de ses voisines immédiates. Le Jeu de la Vie, inventé par le mathématicien John Conway en 1970, en est l'exemple le plus célèbre : chaque cellule d'une grille est soit vivante, soit morte, et change d'état à chaque génération selon trois règles seulement.",
  },
  {
    type: "list",
    items: [
      "Une cellule vivante avec moins de deux voisines vivantes meurt (sous-population, isolement)",
      "Une cellule vivante avec deux ou trois voisines vivantes reste vivante (équilibre)",
      "Une cellule vivante avec plus de trois voisines vivantes meurt (surpopulation)",
      "Une cellule morte avec exactement trois voisines vivantes devient vivante (naissance)",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Des motifs qui apparaissent sans être écrits nulle part",
    text: "Ces quatre règles, appliquées génération après génération à une grille de départ, font apparaître des motifs très variés, qu'aucune des quatre règles ne mentionne pourtant explicitement : ils émergent simplement de leur application répétée — exactement la même idée que le banc de poissons, mais sur une grille et avec des règles écrites noir sur blanc.",
  },
  {
    type: "table",
    headers: ["Motif", "Comportement"],
    rows: [
      ["Nature morte (ex. le « bloc », 4 cellules)", "Reste identique à elle-même génération après génération, un équilibre stable"],
      ["Oscillateur (ex. le « clignotant », 3 cellules)", "Alterne entre deux ou plusieurs formes, à intervalle régulier, sans jamais se stabiliser ni disparaître"],
      ["Vaisseau (ex. le « planeur », 5 cellules)", "Se déplace tout seul à travers la grille en reprenant, décalée, sa forme de départ après quelques générations"],
    ],
  },

  { type: "heading", text: "4. Simuler un vol d'oiseaux avec des règles locales : les boids de Reynolds", level: "lycee" },
  {
    type: "paragraph",
    text: "En 1986, l'informaticien Craig Reynolds cherchait à animer un vol d'oiseaux de façon crédible à l'écran, sans dessiner chaque trajectoire à la main. Sa solution — les « boids » (contraction de bird-oid, « en forme d'oiseau ») — donne à chaque oiseau simulé trois règles locales seulement, appliquées en permanence vis-à-vis de ses voisins les plus proches :",
  },
  {
    type: "list",
    items: [
      "Séparation : s'écarter des voisins trop proches, pour ne pas les percuter",
      "Alignement : orienter sa vitesse dans la même direction moyenne que ses voisins",
      "Cohésion : se rapprocher du centre du petit groupe de voisins, pour ne pas se retrouver isolé",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Trois règles, un vol convaincant",
    text: "Aucune des trois règles ne dit « former un vol d'oiseaux ». Pourtant, des centaines de boids suivant ces trois règles simultanément produisent à l'écran un mouvement de groupe visuellement indiscernable d'un vrai vol d'étourneaux — au point que cet algorithme, quarante ans plus tard, anime encore des foules et des troupeaux dans des films et des jeux vidéo.",
  },

  { type: "heading", text: "5. Un modèle de ségrégation résidentielle : le modèle de Schelling", level: "lycee" },
  {
    type: "paragraph",
    text: "L'économiste Thomas Schelling a proposé en 1971 un modèle simple pour expliquer un phénomène observé dans de nombreuses villes : une forte ségrégation résidentielle entre groupes, alors même qu'aucun habitant pris individuellement ne se dit fermement hostile à la mixité. Sur une grille où chaque case est un logement occupé par un agent de l'un de deux groupes (ou vide), chaque agent applique une règle très modérée : il reste satisfait tant qu'une proportion minimale de ses voisins immédiats lui ressemble (par exemple seulement 30 %) ; sinon, il déménage vers une case libre au hasard.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une préférence douce, un résultat radical",
    text: "Le résultat surprenant du modèle de Schelling est qu'une préférence individuelle très modérée (accepter une large majorité de voisins différents, vouloir seulement éviter d'être totalement isolé) suffit, une fois répétée sur toute la grille, à produire au bout de quelques dizaines de déménagements une ségrégation collective très marquée — des zones presque entièrement homogènes — alors que personne, individuellement, ne voulait un résultat aussi extrême. C'est un exemple d'émergence non désirée : le comportement global ne reflète l'intention d'aucun agent pris isolément.",
  },

  { type: "heading", text: "6. Où la géographie utilise ces modèles", level: "lycee" },
  {
    type: "paragraph",
    text: "Ces principes — des agents autonomes, des règles locales, un comportement global émergent — s'appliquent directement à des questions géographiques concrètes, partout où de nombreux individus ou entités interagissent dans l'espace :",
  },
  {
    type: "table",
    headers: ["Domaine", "Ce que les agents représentent"],
    rows: [
      ["Trafic routier", "Chaque véhicule est un agent qui accélère, freine ou change de voie selon ce qu'il perçoit devant et autour de lui — des embouteillages « fantômes » émergent sans aucun accident ni obstacle réel"],
      ["Épidémiologie spatiale", "Chaque individu est un agent qui peut être sain, infecté ou immunisé, et qui transmet la maladie à ses contacts proches selon une probabilité — la propagation d'ensemble émerge des milliers de contacts individuels"],
      ["Dynamique urbaine", "Chaque ménage ou chaque entreprise est un agent qui choisit où s'installer selon des critères locaux (prix, voisinage, accessibilité) — la forme de la ville émerge de ces milliers de choix individuels"],
      ["Évacuation de foule", "Chaque personne est un agent qui cherche la sortie la plus proche tout en évitant la bousculade — la fluidité ou, au contraire, le goulot d'étranglement à une porte, émerge du comportement collectif"],
    ],
  },
  {
    type: "devoir",
    format: "Simulation à la main",
    title: "Faire vivre une petite grille, génération par génération",
    prompt: "Sur une grille 5×5 dessinée sur papier quadrillé, place à la main un « planeur » du Jeu de la Vie (5 cellules vivantes, motif : une cellule en haut au centre, une cellule en bas à gauche, et trois cellules formant la ligne du bas). Applique les quatre règles du Jeu de la Vie à la main pour calculer les générations 1, 2 et 3, en dessinant chaque grille intermédiaire. Vérifie que le motif se déplace bien d'une case en diagonale au bout de 4 générations, sans jamais changer de forme.",
    criteria: [
      "Les quatre règles sont appliquées à chaque cellule de la grille, y compris les cellules mortes qui pourraient naître",
      "Chaque génération intermédiaire est bien dessinée séparément, pas seulement le résultat final",
      "Le motif du planeur est reconnu comme identique à lui-même, simplement décalé, après 4 générations",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : un agent perçoit localement, décide selon une règle propre, agit, sans jamais voir le système entier ; un comportement émergent (banc de poissons, vol d'étourneaux) naît des interactions répétées, sans meneur ; le Jeu de la Vie de Conway montre comment quatre règles locales font apparaître des motifs (planeurs, oscillateurs) non écrits dans la règle ; les boids de Reynolds (séparation, alignement, cohésion) animent un vol crédible sans scénario ; le modèle de Schelling montre qu'une préférence individuelle modérée peut produire une ségrégation collective forte, non désirée par personne ; ces principes structurent la simulation de trafic, d'épidémie, de dynamique urbaine et d'évacuation de foule.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : de la théorie aux données réelles",
    description: "L'Atelier applique des méthodes d'analyse spatiale sur de vraies données, le terrain naturel pour tester ensuite une simulation multi-agent.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Anatomie formelle d'un modèle multi-agent", level: "superieur" },
  {
    type: "paragraph",
    text: "Un modèle multi-agent (agent-based model, ABM) se décompose toujours en trois éléments formels, quelle que soit la plateforme utilisée pour l'implémenter.",
  },
  {
    type: "table",
    headers: ["Élément", "Ce qu'il définit"],
    rows: [
      ["Agents", "Des entités autonomes, chacune avec un état interne (position, ressources, statut…) et des règles de comportement qui transforment cet état à chaque pas de temps, en fonction de ce que l'agent perçoit"],
      ["Environnement", "L'espace dans lequel les agents évoluent et interagissent : une grille (comme un automate cellulaire), un réseau (graphe de nœuds et d'arêtes, ex. un réseau routier), ou un espace continu (coordonnées réelles, comme les boids)"],
      ["Interactions", "Les règles qui régissent comment les agents s'influencent entre eux ou avec l'environnement : compétition pour une ressource, transmission d'une information, évitement d'une collision"],
    ],
  },
  {
    type: "table",
    headers: ["Type d'environnement", "Ce qu'il permet de représenter"],
    rows: [
      ["Grille (automate cellulaire)", "Un espace discrétisé en cellules régulières — le plus proche d'un raster SIG, adapté à une occupation du sol ou une propagation"],
      ["Réseau (graphe)", "Des nœuds et des arêtes — le plus proche d'un réseau routier ou hydrographique vectoriel, adapté à un déplacement contraint"],
      ["Espace continu", "Des coordonnées réelles, sans découpage en cellules — adapté à un mouvement libre (boids, foule) où la position exacte compte plus que la cellule occupée"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "L'ordonnancement (scheduler) : un choix qui change le résultat",
    text: "À chaque pas de temps, dans quel ordre les agents agissent-ils ? Ce choix, souvent négligé, n'est pas neutre. Un ordonnancement séquentiel (chaque agent agit l'un après l'autre, dans un ordre fixe) peut avantager systématiquement les premiers agents de la liste, qui voient l'état déjà modifié par personne alors que les derniers voient un environnement déjà transformé par tous les autres. Un ordonnancement aléatoire (l'ordre est retiré au hasard à chaque pas de temps) élimine ce biais systématique. Un ordonnancement simultané (tous les agents perçoivent le même état gelé, décident, puis toutes les actions s'appliquent ensemble) évite tout effet d'ordre, au prix d'un calcul plus coûteux et de règles de résolution de conflit à prévoir (que se passe-t-il si deux agents veulent la même case libre au même instant ?). Changer uniquement le type d'ordonnancement, toutes règles égales par ailleurs, peut changer significativement le résultat d'une simulation — un piège classique de reproductibilité.",
  },

  { type: "heading", text: "2. Automates cellulaires approfondis", level: "superieur" },
  {
    type: "paragraph",
    text: "Le Jeu de la Vie (piste Lycée) est un cas particulier d'une famille plus large : tout automate cellulaire définit une grille, un voisinage, et une règle de transition qui recalcule l'état de chaque cellule à partir de l'état de son voisinage. Deux définitions de voisinage dominent la pratique.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Voisinage de Moore (8 cellules)",
        points: [
          "Les 8 cellules qui entourent une cellule, y compris les 4 diagonales",
          "Utilisé par le Jeu de la Vie classique",
          "Capture aussi les contacts « en coin », pertinent pour une propagation qui peut sauter en diagonale (feu, épidémie)",
        ],
      },
      {
        label: "Voisinage de von Neumann (4 cellules)",
        points: [
          "Seulement les 4 cellules directement adjacentes (haut, bas, gauche, droite)",
          "Plus restrictif : ignore les diagonales",
          "Souvent plus réaliste pour une propagation strictement le long d'un réseau ou d'une grille orthogonale (ex. un système d'irrigation en damier)",
        ],
      },
    ],
  },
  {
    type: "diagram",
    name: "kernel-convolution",
    caption: "Par analogie : un noyau de convolution glissé pixel par pixel illustre la même logique qu'une règle de transition d'automate cellulaire, recalculée à partir du seul voisinage immédiat de chaque cellule.",
  },
  {
    type: "list",
    items: [
      "Automate de feu de forêt : chaque cellule est un arbre sain, en feu, ou brûlé ; une cellule saine prend feu avec une certaine probabilité si au moins une cellule voisine (Moore) est déjà en feu, puis devient brûlée au pas de temps suivant — un automate cellulaire probabiliste, pas strictement déterministe comme le Jeu de la Vie",
      "Propagation épidémique sur grille : chaque cellule (ou chaque agent occupant une cellule) est saine, infectée ou immunisée (modèle SIR spatialisé) ; une cellule saine s'infecte avec une probabilité qui croît avec le nombre de voisines infectées, illustrant directement comment une épidémie se propage en tache d'huile dans l'espace plutôt qu'instantanément partout",
    ],
  },
  {
    type: "formula",
    label: "Règle probabiliste de l'automate de feu de forêt",
    formula: "P(sain → en feu) = 1 − (1 − p)ⁿ",
    note: "p = probabilité qu'une seule cellule voisine en feu transmette l'incendie à la cellule saine considérée, n = nombre de cellules voisines déjà en feu (voisinage de Moore, donc n entre 0 et 8). Chaque voisine en feu tente indépendamment d'enflammer la cellule ; la probabilité qu'aucune n'y parvienne est (1 − p)ⁿ, d'où la probabilité complémentaire ci-dessus. Une cellule entourée de trois foyers voisins (n = 3) a donc une probabilité de prendre feu bien supérieure à une cellule qui n'en touche qu'un seul — un effet de masse directement comparable, dans son principe, au seuil de voisins infectés d'une propagation épidémique sur grille.",
  },
  {
    type: "callout",
    tone: "info",
    title: "L'automate cellulaire au service d'une vraie carte : CA_MARKOV",
    text: "Ce que ce module présente ici reste le mécanisme général d'un automate cellulaire, indépendant de toute application. Le module TerrSet applique précisément ce mécanisme à une vraie carte d'occupation du sol dans CA_MARKOV (piste Master/Recherche) : chaque pixel d'une image satellite change de classe selon son état actuel, une carte d'aptitude au changement, et l'état de ses pixels voisins — exactement la même logique de voisinage et de règle de transition, appliquée cette fois à un vrai problème de simulation d'occupation du sol plutôt qu'à une grille abstraite.",
  },
  {
    type: "brique",
    id: "nagel-schreckenberg",
    title: "Le modèle de Nagel-Schreckenberg : le trafic comme automate cellulaire",
    blocks: [
      {
        type: "paragraph",
        text: "Le trafic routier lui-même se prête à un automate cellulaire à une dimension : Nagel et Schreckenberg (1992) modélisent une file de véhicules sur une route à voie unique comme une ligne de cellules, chaque cellule pouvant contenir au plus un véhicule caractérisé par une vitesse entière.",
      },
      {
        type: "list",
        items: [
          "Accélération : si la vitesse du véhicule est inférieure à la vitesse maximale et à la distance libre devant lui, elle augmente de 1",
          "Freinage : si la distance libre devant le véhicule est inférieure à sa vitesse actuelle, sa vitesse est ramenée à cette distance (pour ne pas percuter le véhicule suivant)",
          "Freinage aléatoire : avec une petite probabilité p, la vitesse diminue encore de 1, même sans obstacle — cette seule règle stochastique suffit à faire apparaître des embouteillages qui se propagent vers l'arrière sans aucune cause extérieure (accident, feu rouge)",
          "Avancée : chaque véhicule avance enfin d'autant de cellules que sa vitesse finale",
        ],
      },
      {
        type: "callout",
        tone: "example",
        title: "Le bouchon fantôme, un comportement émergent documenté",
        text: "Le résultat le plus cité du modèle de Nagel-Schreckenberg est de reproduire numériquement le « bouchon fantôme » (phantom traffic jam) : un ralentissement qui se forme et se propage vers l'arrière du flux sans qu'aucun accident, péage ou obstacle ne l'explique — la seule règle de freinage aléatoire, appliquée à de nombreux véhicules, suffit à le faire émerger, exactement le même principe d'émergence que le Jeu de la Vie ou Schelling, appliqué cette fois à un flux de trafic à une dimension.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Le paradoxe de Braess : un autre résultat contre-intuitif du trafic simulé",
        text: "Un second résultat célèbre de la modélisation du trafic, documenté par Dietrich Braess (1968) et depuis reproduit dans de nombreuses simulations multi-agents de réseau routier, montre qu'ajouter une route supplémentaire à un réseau peut, dans certaines configurations, augmenter le temps de trajet moyen de tous les usagers plutôt que le réduire : chaque conducteur, en choisissant égoïstement le trajet le plus rapide pour lui à cet instant (un comportement d'agent parfaitement rationnel et local), peut collectivement aboutir à un équilibre plus lent pour tout le monde que si cette route n'avait jamais existé. Un exemple de plus, appliqué au trafic, du thème central de ce module : un comportement individuellement rationnel n'aboutit pas nécessairement à un optimum collectif.",
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "La classification de Wolfram : quatre grandes familles de comportement",
    text: "Stephen Wolfram (« A New Kind of Science », 2002) a proposé, à partir de l'étude systématique des automates cellulaires les plus simples possibles (une seule ligne de cellules, deux états, voisinage à 3 cellules — les « automates cellulaires élémentaires »), une classification en quatre classes de comportement qui se retrouve aussi, en pratique, sur des automates bidimensionnels plus riches comme le Jeu de la Vie : Classe I, tout converge rapidement vers un état uniforme et figé (extinction) ; Classe II, le système se stabilise en motifs périodiques simples, stables ou oscillants ; Classe III, le comportement reste chaotique et imprévisible en permanence, sans structure durable ; Classe IV, la plus riche et la plus rare, produit des structures complexes qui persistent, interagissent et se déplacent sans jamais se figer ni sombrer dans le chaos total — c'est précisément dans cette classe IV que se trouvent le Jeu de la Vie et ses planeurs. Cette classification aide à situer d'emblée un nouvel automate cellulaire géographique (feu de forêt, épidémie) : un automate qui s'éteint toujours (classe I) ou qui reste toujours chaotique (classe III) est en général moins informatif pour une simulation qu'un automate en classe IV, capable de motifs spatiaux durables et interprétables.",
  },

  { type: "heading", text: "3. Le modèle de Schelling formalisé", level: "superieur" },
  {
    type: "paragraph",
    text: "Formellement, chaque agent i occupe une case d'une grille et appartient à l'un de deux groupes (ou davantage). Il calcule à chaque pas de temps la proportion de ses voisins immédiats (voisinage de Moore, typiquement) qui appartiennent au même groupe que lui, et compare cette proportion à un seuil de tolérance t fixé pour toute la simulation.",
  },
  {
    type: "formula",
    label: "Règle de satisfaction de Schelling",
    formula: "satisfait(i) = [ proportion de voisins du même groupe que i ] ≥ t",
    note: "Si satisfait(i) est faux, l'agent i déménage vers une case libre choisie au hasard sur la grille (ou vers la case libre la plus proche, selon la variante). La simulation s'arrête quand plus aucun agent n'est insatisfait, ou après un nombre de pas de temps fixé.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Sensibilité au paramètre de tolérance",
    text: "Faire varier uniquement t change radicalement le résultat final. Avec t = 0 (aucune exigence), la grille reste proche de sa configuration initiale aléatoire, sans ségrégation notable. Avec t autour de 0,3 à 0,4 (une préférence très modérée, loin d'être une hostilité), la grille converge presque toujours vers de larges zones homogènes bien séparées — la ségrégation collective mesurée (par exemple la proportion moyenne de voisins du même groupe, une fois la simulation stabilisée) dépasse largement le seuil de tolérance individuel qui l'a pourtant produite. C'est l'expérience de calibration la plus instructive du modèle : rejouer la simulation pour plusieurs valeurs de t et comparer la ségrégation résultante.",
  },
  {
    type: "table",
    headers: ["Seuil de tolérance t", "Résultat typique observé après stabilisation"],
    rows: [
      ["0,0 – 0,1", "Grille proche du désordre initial, mélange quasi aléatoire des deux groupes"],
      ["0,3 – 0,4", "Ségrégation collective forte : larges zones homogènes, malgré une exigence individuelle modérée"],
      ["0,6 et au-delà", "Ségrégation quasi totale, souvent atteinte en très peu de déménagements"],
    ],
  },

  { type: "heading", text: "4. NetLogo : prise en main de la plateforme", level: "superieur" },
  {
    type: "paragraph",
    text: "NetLogo (Wilensky, Northwestern University, depuis 1999) est l'environnement de modélisation multi-agent le plus utilisé en enseignement et en recherche exploratoire, pour sa prise en main rapide. Le monde y est une grille de « patches » (cellules fixes de l'environnement, comme les cases d'un automate cellulaire) sur laquelle se déplacent des « turtles » (agents mobiles, malgré leur nom, qui peuvent représenter n'importe quoi — un piéton, un véhicule, un ménage).",
  },
  {
    type: "list",
    items: [
      "Interface : une vue du monde en grille, des curseurs (sliders) pour ajuster les paramètres du modèle sans toucher au code, des boutons pour lancer/mettre en pause la simulation",
      "Langage NetLogo : un langage de haut niveau, proche de l'anglais courant, conçu pour qu'un utilisateur non-programmeur puisse lire et modifier un modèle existant",
      "Bibliothèque de modèles intégrée (Models Library) : des dizaines de modèles ABM classiques prêts à l'emploi, dont une implémentation du modèle de Schelling et du Jeu de la Vie",
    ],
  },
  {
    type: "formula",
    label: "Pseudo-NetLogo : une règle de propagation simplifiée",
    formula: "to go\n  ask turtles [\n    if any? neighbors with [infected?] [\n      set infected? true\n    ]\n  ]\n  tick\nend",
    note: "`ask turtles [...]` applique le bloc de code à chaque agent tour à tour (ordonnancement séquentiel par défaut de NetLogo, modifiable) ; `neighbors` renvoie les patches ou turtles voisins (Moore par défaut) ; `tick` avance l'horloge de simulation d'un pas. Cette syntaxe très lisible — proche du pseudo-code — est la raison principale du succès pédagogique de NetLogo.",
  },
  {
    type: "formula",
    label: "Pseudo-NetLogo : le modèle de Schelling",
    formula: "to go\n  ask turtles with [not satisfied?] [\n    move-to one-of patches with [not any? turtles-here]\n  ]\n  ask turtles [\n    let voisins (turtles-on neighbors)\n    let semblables count voisins with [groupe = [groupe] of myself]\n    set satisfied? (semblables / (count voisins + 1)) >= seuil-tolerance\n  ]\n  tick\nend",
    note: "`seuil-tolerance` est exposé comme un curseur (slider) réglable directement dans l'interface, sans toucher au code : c'est ce qui permet, dans NetLogo, de rejouer immédiatement l'expérience de sensibilité au paramètre t décrite en section 3, sans reprogrammer quoi que ce soit.",
  },

  { type: "heading", text: "5. Mesa (Python) : construire un modèle agent-based en code", level: "superieur" },
  {
    type: "paragraph",
    text: "Mesa est un framework Python de modélisation multi-agent, plus verbeux que NetLogo mais entièrement intégré à l'écosystème Python (NumPy, pandas, GeoPandas) déjà rencontré dans ce site — un choix naturel dès qu'un modèle doit s'articuler avec de vraies données géographiques. Un modèle Mesa s'organise systématiquement autour de deux classes.",
  },
  {
    type: "brique",
    id: "mesa-anatomie",
    title: "Anatomie d'un modèle Mesa",
    blocks: [
      {
        type: "list",
        items: [
          "Classe Agent : définit l'état d'un agent (attributs) et sa méthode step(), exécutée à chaque pas de temps — l'équivalent direct de la règle de comportement d'un agent",
          "Classe Model : instancie la grille d'environnement (MultiGrid si plusieurs agents peuvent partager une case, SingleGrid si une case n'accueille qu'un agent à la fois, comme dans Schelling), crée la population d'agents, et définit sa propre méthode step() qui fait avancer tous les agents d'un pas de temps selon l'ordonnancement choisi",
          "DataCollector : objet qui enregistre, à chaque pas de temps, une ou plusieurs statistiques (nombre d'agents satisfaits, proportion infectée…) pour analyse et visualisation après la simulation, sans avoir à instrumenter soi-même chaque boucle",
        ],
      },
      {
        type: "formula",
        label: "Squelette minimal d'un agent Mesa",
        formula: "class ResidentAgent(Agent):\n    def step(self):\n        voisins = self.model.grid.get_neighbors(self.pos, moore=True)\n        meme_groupe = sum(1 for v in voisins if v.groupe == self.groupe)\n        if len(voisins) and meme_groupe / len(voisins) < self.seuil:\n            self.model.grid.move_to_empty(self)",
        note: "Directement l'équivalent Python de la règle de satisfaction de Schelling formalisée en section 3 : get_neighbors(moore=True) applique un voisinage de Moore, move_to_empty déplace l'agent vers une case libre s'il est insatisfait.",
      },
      {
        type: "formula",
        label: "La classe Model qui l'entoure",
        formula: "class SchellingModel(Model):\n    def __init__(self, largeur, hauteur, seuil):\n        self.grid = SingleGrid(largeur, hauteur, torus=False)\n        self.schedule = RandomActivation(self)\n        self.datacollector = DataCollector(\n            model_reporters={\"pct_satisfaits\": lambda m: part_satisfaits(m)}\n        )\n        # création et placement aléatoire des agents ResidentAgent…\n\n    def step(self):\n        self.datacollector.collect(self)\n        self.schedule.step()",
        note: "RandomActivation applique un ordonnancement aléatoire (section 1) plutôt que séquentiel, pour éviter tout biais systématique lié à l'ordre de création des agents. datacollector.collect(self) est appelé à chaque pas de temps, avant que les agents n'agissent, pour enregistrer l'état du système et pouvoir tracer, après coup, l'évolution de la proportion d'agents satisfaits — exactement la statistique dont dépend l'expérience de sensibilité au seuil t de la section 3.",
      },
    ],
  },

  { type: "heading", text: "6. Intelligence en essaim (swarm intelligence)", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà de l'imitation d'un comportement biologique (boids), certains algorithmes d'essaim exploitent directement le comportement émergent d'agents simples pour résoudre un problème d'optimisation — trouver un chemin, un minimum, une meilleure configuration — sans qu'aucun agent n'ait de vision globale du problème.",
  },
  {
    type: "brique",
    id: "aco-pso",
    title: "ACO et PSO : deux algorithmes d'essaim",
    blocks: [
      {
        type: "paragraph",
        text: "L'optimisation par colonies de fourmis (Ant Colony Optimization, ACO, Dorigo, 1992) s'inspire directement du comportement réel des fourmis : chaque fourmi explore le graphe (un réseau de chemins possibles) en déposant une trace de phéromone sur le chemin qu'elle emprunte, cette phéromone s'évaporant progressivement avec le temps.",
      },
      {
        type: "formula",
        label: "Mise à jour de phéromone (ACO)",
        formula: "τᵢⱼ(t+1) = (1 − ρ) · τᵢⱼ(t) + Σₖ Δτᵢⱼᵏ",
        note: "τᵢⱼ = quantité de phéromone sur l'arête entre les nœuds i et j, ρ = taux d'évaporation (entre 0 et 1), Δτᵢⱼᵏ = phéromone déposée par la fourmi k sur cette arête, généralement inversement proportionnelle à la longueur totale du chemin qu'elle a suivi (un chemin court reçoit plus de phéromone qu'un chemin long). Au fil des itérations, les chemins courts accumulent plus de phéromone (empruntés plus souvent, donc renforcés plus souvent) tandis que l'évaporation efface progressivement les chemins longs délaissés : le chemin le plus court émerge sans qu'aucune fourmi n'ait jamais eu connaissance du graphe entier.",
      },
      {
        type: "paragraph",
        text: "L'optimisation par essaims particulaires (Particle Swarm Optimization, PSO, Kennedy & Eberhart, 1995) s'inspire du vol groupé (proche des boids) plutôt que des fourmis : chaque particule explore un espace de solutions possibles avec une position et une vitesse, ajustées à chaque itération en fonction de la meilleure position qu'elle a personnellement trouvée et de la meilleure position trouvée par l'essaim entier.",
      },
      {
        type: "formula",
        label: "Mise à jour de vitesse (PSO)",
        formula: "vᵢ(t+1) = w·vᵢ(t) + c₁r₁·(pᵢ − xᵢ(t)) + c₂r₂·(g − xᵢ(t))",
        note: "vᵢ = vitesse de la particule i, xᵢ = sa position actuelle, pᵢ = la meilleure position qu'elle a personnellement rencontrée, g = la meilleure position rencontrée par l'essaim entier, w = coefficient d'inertie (garde une part du mouvement précédent), c₁ et c₂ = poids respectifs de l'attirance vers le meilleur personnel et le meilleur collectif, r₁ et r₂ = nombres aléatoires entre 0 et 1 (introduisent une exploration non déterministe). La position se met ensuite à jour simplement par xᵢ(t+1) = xᵢ(t) + vᵢ(t+1).",
      },
      {
        type: "callout",
        tone: "info",
        title: "Un point commun : jamais de carte globale",
        text: "Ni une fourmi ni une particule ne connaît la structure entière du problème qu'elle contribue à résoudre. ACO n'a de la carte que ce que chaque fourmi individuelle en a parcouru ; PSO n'a du paysage de solutions que ce que chaque particule a personnellement exploré, complété par le seul résumé (le meilleur point trouvé) partagé avec l'essaim. C'est la même logique d'émergence que le reste de ce module, appliquée à un problème d'optimisation plutôt qu'à une simulation.",
      },
      {
        type: "table",
        headers: ["Algorithme", "Type de problème", "Application géographique typique"],
        rows: [
          ["ACO", "Un chemin optimal sur un graphe (problème combinatoire, ex. le voyageur de commerce)", "Optimiser une tournée de collecte de déchets ou une tournée de livraison sur un réseau routier réel"],
          ["PSO", "Trouver le minimum ou le maximum d'une fonction continue (problème d'optimisation continue)", "Calibrer automatiquement les paramètres libres d'un modèle spatial (par exemple les poids d'une AHP, module Le Compas) en minimisant l'écart à un motif observé"],
        ],
      },
    ],
  },

  { type: "heading", text: "7. Les boids de Reynolds formalisés", level: "superieur" },
  {
    type: "paragraph",
    text: "Les trois règles de Reynolds (piste Lycée) se formalisent chacune comme un vecteur de correction de vitesse, calculé à partir des seuls voisins situés dans un rayon de perception r autour de l'agent. La vitesse résultante à chaque pas de temps est une somme pondérée des trois vecteurs.",
  },
  {
    type: "formula",
    label: "Mise à jour de vitesse d'un boid",
    formula: "v(t+1) = v(t) + wₛ·Séparation + wₐ·Alignement + w𝒸·Cohésion",
    note: "Séparation = vecteur qui éloigne l'agent de ses voisins trop proches (souvent pondéré inversement à la distance, pour repousser plus fortement un voisin très proche) ; Alignement = différence entre la vitesse moyenne des voisins et la vitesse actuelle de l'agent ; Cohésion = vecteur dirigé vers le centre de masse (le barycentre des positions) des voisins. wₛ, wₐ, w𝒸 sont des poids réglables : augmenter wₛ produit un vol plus dispersé, augmenter w𝒸 produit un vol plus compact — la même vitesse résultante est ensuite bornée par une vitesse maximale, sans quoi le vecteur de cohésion peut faire diverger la simulation si deux groupes de boids sont très éloignés l'un de l'autre.",
  },

  { type: "heading", text: "8. Application géographique complète : croissance urbaine par agents", level: "superieur" },
  {
    type: "paragraph",
    text: "Un modèle multi-agent de croissance urbaine typique combine directement plusieurs notions déjà vues dans ce site : chaque agent est un ménage ou un promoteur qui choisit une parcelle à urbaniser selon une carte d'aptitude (distance aux routes, pente, occupation du sol actuelle — les mêmes couches qu'une évaluation multicritère, module TerrSet), tandis que l'environnement lui-même est une grille raster réelle chargée depuis un SIG plutôt qu'une grille abstraite.",
  },
  {
    type: "list",
    items: [
      "L'occupation du sol initiale (module Le Compas, statistiques de zone) fournit l'état de départ de la grille",
      "Le réseau routier (module TerrSet, section MCE) fournit un critère d'accessibilité qui pondère l'attractivité de chaque cellule pour un nouvel agent",
      "Chaque agent (ménage) applique une règle de choix locale, comparable à la règle de satisfaction de Schelling : occuper la cellule libre la plus attractive dans son rayon de recherche, plutôt que la cellule globalement optimale sur toute la carte",
      "Répété sur de nombreux pas de temps, ce processus fait émerger un patron spatial de croissance urbaine (extension continue le long des axes routiers, ou au contraire mitage dispersé) sans qu'aucun agent n'ait planifié la forme finale de la ville",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Variante : la diffusion spatiale d'une innovation",
    text: "Le même schéma agent + environnement SIG s'applique à la diffusion d'une innovation dans l'espace (une nouvelle pratique agricole, l'équipement en panneaux solaires) plutôt qu'à la croissance urbaine. Le modèle de diffusion de Bass (1969), à l'origine non spatial, distingue deux mécanismes d'adoption : une adoption par innovation propre (un agent adopte spontanément, indépendamment de ses voisins) et une adoption par imitation (un agent adopte d'autant plus vite qu'une grande proportion de ses voisins a déjà adopté). Rendre ce modèle spatialement explicite revient à remplacer la population globale du modèle de Bass par des agents individuels situés sur une vraie carte, où le terme d'imitation ne dépend plus de la proportion adoptée dans la population entière mais seulement du voisinage local de chaque agent — un patron de diffusion en tache d'huile émerge alors depuis les premiers foyers d'adoption, comparable dans sa forme à la propagation épidémique sur grille de la section 2.",
  },
  {
    type: "devoir",
    format: "Modèle sur papier ou tableur",
    title: "Faire tourner un Schelling simplifié à la main",
    prompt: "Sur une grille 6×6, place au hasard 12 agents du groupe A, 12 agents du groupe B, et laisse 12 cases vides. Fixe un seuil de tolérance t = 0,4. Applique la règle de satisfaction à chaque agent (voisinage de Moore, bords traités comme absents plutôt que cycliques) et fais migrer chaque agent insatisfait vers une case vide choisie au hasard, pas de temps par pas de temps, pendant 3 pas de temps. Mesure la proportion moyenne de voisins du même groupe au début et à la fin.",
    criteria: [
      "Le voisinage de Moore est correctement identifié pour les cellules de bord (moins de 8 voisins réels)",
      "La règle de satisfaction est appliquée à tous les agents insatisfaits avant qu'aucun ne déménage (simultané), pas les uns après les autres avec l'état déjà modifié",
      "La ségrégation mesurée en fin de simulation est bien supérieure au seuil de tolérance individuel de 0,4, illustrant l'écart entre préférence individuelle et résultat collectif",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : un ABM formel = agents (état + règles) + environnement (grille/réseau/continu) + interactions + ordonnancement (séquentiel/aléatoire/simultané, jamais neutre) ; voisinage de Moore (8) contre von Neumann (4) ; Schelling se formalise par un seuil de tolérance comparé à la proportion de voisins semblables ; NetLogo (patches/turtles, langage haut niveau) contre Mesa (classes Agent/Model, DataCollector, Python) ; ACO exploite dépôt/évaporation de phéromone, PSO combine meilleure position individuelle et collective ; les boids se formalisent en trois vecteurs de correction pondérés ; un modèle de croissance urbaine articule ces règles sur de vraies couches SIG.",
    ],
  },
  {
    type: "link",
    to: "/module/terrset",
    label: "Voir l'application géospatiale : CA_MARKOV",
    description: "Le module TerrSet applique le mécanisme général d'automate cellulaire présenté ici à une vraie simulation d'occupation du sol, couplée à une chaîne de Markov.",
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Revoir les données mobilisées : occupation du sol et réseau routier",
    description: "Le module Le Compas détaille les statistiques de zone et les opérations spatiales qui alimentent la carte d'aptitude d'un modèle de croissance urbaine.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. GAMA : une plateforme de géo-simulation multi-agent", level: "approfondissement" },
  {
    type: "paragraph",
    text: "NetLogo et Mesa (piste Licence/BUT) sont des plateformes généralistes : leur grille d'environnement est une abstraction, pas une vraie donnée géographique projetée. GAMA (GAML Agent-based Modeling Architecture) se distingue en étant conçue dès l'origine pour la géo-simulation : son langage propre, GAML (GAma Modeling Language), charge directement des couches SIG réelles — vectorielles (Shapefile, GeoJSON) ou raster (GeoTIFF) — comme environnement natif d'un modèle, avec leur système de coordonnées et leur géométrie exacte, sans conversion préalable en grille abstraite.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "NetLogo / Mesa",
        points: [
          "Environnement généraliste : grille de patches ou grille NumPy abstraite",
          "Une vraie couche SIG doit être importée puis convertie en grille avant usage",
          "Idéal pour l'enseignement, le prototypage rapide, un modèle conceptuel",
        ],
      },
      {
        label: "GAMA (GAML)",
        points: [
          "Environnement nativement géographique : charge un Shapefile ou un GeoTIFF projeté comme espace du modèle",
          "Les agents peuvent se déplacer le long d'un réseau routier réel importé tel quel, avec sa topologie",
          "Conçu pour la recherche appliquée en géo-simulation (urbanisme, épidémiologie spatiale, gestion de crise)",
        ],
      },
    ],
  },

  {
    type: "table",
    headers: ["Plateforme", "Langage", "Point fort"],
    rows: [
      ["NetLogo", "Langage NetLogo, haut niveau", "Prise en main la plus rapide, bibliothèque de modèles prête à l'emploi"],
      ["Mesa", "Python", "Intégration complète à l'écosystème scientifique Python (NumPy, GeoPandas, scikit-learn)"],
      ["GAMA", "GAML", "Environnement nativement géographique : charge des couches SIG projetées, réseau routier réel, raster de contraintes"],
    ],
  },
  {
    type: "formula",
    label: "Pseudo-GAML : charger un environnement SIG réel",
    formula: "global {\n  file shape_communes <- shape_file(\"communes.shp\");\n  file routes <- shape_file(\"reseau_routier.shp\");\n  geometry shape <- envelope(shape_communes);\n}\n\nspecies pieton skills: [moving] {\n  reflex se_deplacer {\n    do goto target: one_of(routes) on: routes_network;\n  }\n}",
    note: "`shape_file(...)` charge directement une couche vectorielle projetée (le même Shapefile qu'un export QGIS) comme géométrie du modèle ; `skills: [moving]` et `on: routes_network` font se déplacer l'agent le long de la topologie réelle du réseau routier importé, plutôt que sur une grille orthogonale approximative — la différence concrète, en une poignée de lignes, avec NetLogo ou Mesa évoquée dans le tableau ci-dessus.",
  },

  { type: "heading", text: "2. Calibration et validation d'un modèle multi-agent", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un ABM, une fois construit, doit être calibré (ajuster ses paramètres pour qu'il reproduise un comportement plausible) puis validé (vérifier que ce comportement correspond réellement à une observation indépendante) — deux étapes distinctes, souvent confondues à tort.",
  },
  {
    type: "callout",
    tone: "info",
    title: "La modélisation orientée motifs (pattern-oriented modeling, POM)",
    text: "Proposée par Volker Grimm et ses collègues (2005), la POM part du constat qu'un seul motif de sortie (par exemple, une courbe agrégée) laisse en général de nombreuses combinaisons de paramètres capables de la reproduire également bien — le modèle est sous-déterminé par une seule observation. La POM impose de confronter le modèle à plusieurs motifs observés simultanément, à différentes échelles (motif agrégé ET motif individuel, par exemple la forme globale d'une ville ET la trajectoire d'un ménage type) : seule une combinaison de paramètres qui reproduit tous ces motifs à la fois est retenue, ce qui réduit fortement l'espace des paramètres plausibles par rapport à un calage sur un seul critère.",
  },
  {
    type: "list",
    items: [
      "Analyse de sensibilité : faire varier chaque paramètre du modèle (un à un, ou en combinaison) pour mesurer à quel point le résultat de la simulation en dépend — un paramètre auquel le résultat est insensible peut être fixé arbitrairement sans risque, un paramètre très sensible doit être calibré avec soin",
      "Comparaison à un motif réel observé : confronter la carte, la courbe ou la distribution produite par la simulation à une observation indépendante (recensement, image satellite, comptage de trafic), jamais aux seules données qui ont servi à calibrer le modèle",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Le même problème que la validation à trois cartes de Pontius",
    text: "Le module TerrSet (section CA_MARKOV) détaille la méthode de Pontius (2004) : comparer une carte simulée non pas naïvement à la seule carte de référence, mais à un triplet de cartes (t1, t2 réelle, t2 simulée) pour séparer le désaccord de quantité du désaccord de localisation, et comparer systématiquement le résultat au score qu'obtiendrait un « null model » (ne rien changer). La même logique de rigueur s'applique à tout ABM validé sur un motif spatial observé : un ABM qui reproduit un motif agrégé plausible peut, comme CA_MARKOV, se tromper largement sur la localisation précise — la validation doit être aussi spatialement explicite que le modèle lui-même, pas seulement globale.",
  },

  { type: "heading", text: "3. Le protocole ODD : documenter un modèle pour qu'il soit reproductible", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Publier un article décrivant un ABM en prose libre laisse presque toujours de côté des détails d'implémentation qui changent pourtant le résultat — l'ordonnancement exact, la gestion des bords de grille, l'ordre d'évaluation des règles en cas de conflit — rendant le modèle publié impossible à reproduire fidèlement par une équipe tierce, un problème documenté de façon récurrente dans la littérature avant l'adoption d'un standard commun.",
  },
  {
    type: "callout",
    tone: "info",
    title: "ODD : Overview, Design concepts, Details",
    text: "Le protocole ODD (Grimm et al., 2006, révisé en 2010 et 2020) structure la documentation de tout ABM publié en trois blocs standardisés : Overview (objectif du modèle, entités, échelles temporelles et spatiales, vue d'ensemble du déroulement), Design concepts (émergence attendue, adaptation des agents, perception, interaction, stochasticité — les choix conceptuels qui distinguent un ABM d'une simple simulation déterministe), et Details (initialisation exacte, données d'entrée, sous-modèles détaillés — assez précis, en principe, pour ré-implémenter le modèle sans accès au code source original). Ce standard ne rend pas un modèle meilleur ; il le rend comparable à d'autres modèles publiés et vérifiable par des pairs qui n'ont pas accès au code.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Pourquoi ce protocole a dû être inventé",
    text: "Avant l'adoption large d'ODD, la reproduction indépendante d'un ABM publié à partir de sa seule description textuelle échouait fréquemment, précisément parce que des détails jugés mineurs par les auteurs (l'ordre d'ordonnancement, la définition exacte d'un voisinage, l'initialisation aléatoire) changeaient significativement le résultat sans être toujours documentés. ODD existe pour rendre ces détails obligatoires plutôt qu'optionnels.",
  },

  { type: "heading", text: "4. Modèles hybrides : coupler un ABM à un SIG réel", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà de GAMA (section 1), un modèle hybride désigne plus largement tout couplage entre un moteur multi-agent et des données ou logiciels SIG produits indépendamment : des agents qui se déplacent sur un graphe routier réel exporté depuis QGIS (module Le Compas), ou un environnement raster de contraintes produit par TerrSet (une carte d'aptitude LCM, ou le résultat d'un CA_MARKOV lui-même repris comme point de départ d'un ABM plus fin).",
  },
  {
    type: "list",
    items: [
      "Réseau routier réel comme environnement : les agents (véhicules, piétons) se déplacent le long des arêtes d'un graphe topologiquement correct, plutôt que sur une grille orthogonale approximative — indispensable pour une simulation de trafic ou d'évacuation crédible",
      "Raster de contraintes hérité d'un autre modèle : une carte d'aptitude produite par une MCE ou par LCM (module TerrSet) peut directement piloter la règle de décision d'un agent (un ménage ne considère que les cellules dont l'aptitude dépasse un seuil), articulant ainsi un ABM avec un modèle prédictif raster construit indépendamment",
    ],
  },
  {
    type: "table",
    headers: ["Type de couplage", "Ce qui vient du SIG", "Ce que l'ABM y ajoute"],
    rows: [
      ["Réseau vectoriel (QGIS)", "Topologie exacte d'un réseau routier ou hydrographique réel", "Des agents mobiles qui empruntent ce réseau selon leurs propres règles de décision"],
      ["Raster de contraintes (TerrSet)", "Une carte d'aptitude ou un résultat CA_MARKOV déjà calé sur des tendances observées", "Une dynamique d'agents individuels plus fine que la seule règle de transition pixel par pixel"],
    ],
  },
  {
    type: "link",
    to: "/module/qgis",
    label: "Préparer le réseau et les couches d'un modèle hybride",
    description: "La salle De la Géométrie Pensive (QGIS) détaille comment préparer et exporter un réseau routier ou des couches de contraintes vecteur, prêtes à être chargées comme environnement d'un ABM.",
  },
  {
    type: "link",
    to: "/module/terrset",
    label: "Réutiliser une carte d'aptitude ou un raster CA_MARKOV",
    description: "Une carte d'aptitude (MCE) ou le résultat d'un CA_MARKOV, produits sous TerrSet, peuvent directement alimenter la règle de décision des agents d'un modèle hybride.",
  },

  { type: "heading", text: "5. Limites et enjeux épistémologiques d'un modèle multi-agent", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un ABM n'est pas neutre : le construire engage des choix qui pèsent directement sur ce qu'on peut légitimement en conclure.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le risque de sur-paramétrage",
    text: "Un modèle doté d'un grand nombre de paramètres libres peut, en les ajustant suffisamment, reproduire à peu près n'importe quel motif observé — y compris un motif obtenu par pur hasard sur les données de calage. Un tel modèle « explique » tout a posteriori mais ne prédit rien de fiable pour une situation nouvelle, et son bon score de calibration ne prouve rien sur son réalisme mécanistique : c'est le même piège, formulé différemment, que le sur-apprentissage d'un modèle de machine learning (module L'Intelligence) qui mémorise ses données d'entraînement sans généraliser. La POM (section 2) est en partie une réponse directe à ce risque : contraindre le modèle par plusieurs motifs indépendants réduit la liberté qu'un excès de paramètres lui laisserait sur un seul critère.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Équifinalité : plusieurs mécanismes pour un même résultat",
    text: "Le sur-paramétrage est un cas particulier d'un problème plus général, nommé équifinalité (Beven, 1996, à l'origine en hydrologie, mais transposé depuis à la modélisation multi-agent) : plusieurs jeux de paramètres — ou même plusieurs règles de comportement individuelles franchement différentes — peuvent produire un motif de sortie observable indiscernable. Un bon score d'ajustement à une observation ne permet donc jamais, à lui seul, de conclure que le mécanisme individuel simulé est le mécanisme réellement à l'œuvre sur le terrain ; il montre seulement qu'il en est un parmi, peut-être, plusieurs tout aussi plausibles. C'est une raison supplémentaire de préférer, comme le recommande la POM, la confrontation à plusieurs motifs indépendants plutôt qu'à un seul.",
  },
  {
    type: "list",
    items: [
      "Difficulté de validation empirique : contrairement à un modèle statistique ajusté sur des données mesurées, un ABM simule un mécanisme causal souvent invérifiable directement (on n'observe jamais la « règle de décision » réelle d'un ménage, seulement le résultat agrégé de millions de décisions)",
      "Reproductibilité : au-delà d'ODD (section 3), reproduire un ABM exige aussi les mêmes pratiques déjà vues pour un script R ou Python (modules Programmation R et VS Code) — code source versionné, graine aléatoire (seed) fixée et documentée pour toute composante stochastique, environnement logiciel précisé — sans quoi deux exécutions du « même » modèle publié peuvent diverger sans que personne ne puisse dire pourquoi",
      "Compromis réalisme/interprétabilité : un modèle très détaillé (des centaines de règles, des dizaines de types d'agents) peut sembler plus réaliste, mais devient à son tour difficile à comprendre et à calibrer ; un modèle volontairement minimal (comme Schelling, deux règles) reste plus facile à interpréter et à attribuer un mécanisme causal précis à un résultat, au prix d'un réalisme moindre — un choix de modélisation, pas une hiérarchie absolue entre les deux approches",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "KISS contre KIDS : deux philosophies assumées",
    text: "Edmonds et Moss (2005) ont nommé explicitement ce compromis. La philosophie KISS (« Keep It Simple, Stupid ») privilégie le modèle le plus simple possible capable de produire le phénomène observé — c'est la philosophie de Schelling ou du Jeu de la Vie : chaque règle ajoutée doit se justifier, et un mécanisme causal clair reste identifiable dans le résultat. La philosophie KIDS (« Keep It Descriptive, Stupid ») défend au contraire qu'un modèle destiné à informer une vraie décision territoriale (urbanisme, gestion de crise) doit intégrer toute la complexité empiriquement documentée du terrain, quitte à perdre en lisibilité du mécanisme causal — c'est la philosophie d'un modèle hybride couplé à un vrai SIG (section 4). Aucune des deux n'est « la bonne » dans l'absolu : le choix dépend de l'objectif du modèle (comprendre un mécanisme contre informer une décision opérationnelle précise).",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Le modèle de Schelling, avec seulement deux paramètres (seuil de tolérance, taille de grille), est l'un des ABM les plus cités de toute la littérature en sciences sociales — alors qu'un modèle de croissance urbaine réaliste en compte souvent des dizaines. En quoi ce petit nombre de paramètres est-il, à l'inverse d'un défaut, une des raisons de son succès scientifique durable ?",
  },

  { type: "heading", text: "6. Étude de cas approfondie : simulation d'évacuation de foule", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une simulation d'évacuation de foule (bâtiment, stade, place publique en cas d'alerte) illustre, sur un cas concret complet, l'ensemble des notions de ce module : anatomie ABM, choix d'environnement, calibration, limites.",
  },
  {
    type: "list",
    items: [
      "Agents : chaque personne est un agent avec une position continue (pas une grille discrète, contrairement à Schelling), une vitesse maximale de marche, et un objectif fixé (la sortie la plus proche perçue)",
      "Environnement : un plan réel du bâtiment ou de l'espace public, avec ses murs, portes et obstacles comme contraintes géométriques dures que les agents ne peuvent pas traverser",
      "Règles de comportement : une combinaison directe de séparation (éviter la collision avec les agents voisins, la même règle que les boids), d'attraction vers la sortie perçue, et d'un ralentissement local quand la densité d'agents autour de soi dépasse un seuil (modélisant un effet de bousculade et de goulot d'étranglement à une porte étroite)",
      "Ce qu'on en tire : le temps total d'évacuation simulé, l'identification des goulots d'étranglement (une porte où la densité dépasse un seuil critique plus longtemps qu'ailleurs), et la comparaison entre plusieurs scénarios d'aménagement (une deuxième sortie, une porte élargie) avant toute modification réelle et coûteuse du bâtiment",
    ],
  },
  {
    type: "formula",
    label: "Le modèle de forces sociales (Helbing & Molnár, 1995)",
    formula: "mᵢ (dvᵢ/dt) = mᵢ (v⁰ᵢeᵢ − vᵢ)/τᵢ + Σⱼ fᵢⱼ(répulsion) + Σw fᵢw(murs)",
    note: "La référence académique standard pour la dynamique de foule : chaque agent i est traité comme soumis à des « forces » qui accélèrent son mouvement. Le premier terme (mᵢ(v⁰ᵢeᵢ − vᵢ)/τᵢ) tire l'agent vers sa vitesse désirée v⁰ᵢ dans la direction souhaitée eᵢ (la sortie), avec un temps de relaxation τᵢ. Le terme Σⱼ fᵢⱼ est une force de répulsion sociale qui augmente fortement quand un autre agent j devient trop proche (l'équivalent continu, en dynamique de forces plutôt qu'en règle discrète, de la séparation des boids). Le terme Σw fᵢw repousse l'agent des murs et obstacles fixes. C'est ce modèle, ou l'une de ses variantes, qui sous-tend la quasi-totalité des logiciels professionnels de simulation d'évacuation utilisés pour le dimensionnement réglementaire des issues de secours dans un bâtiment.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un résultat contre-intuitif bien documenté : l'effet de goulot asymétrique",
    text: "Plusieurs études de simulation d'évacuation ont documenté qu'ajouter un obstacle correctement placé juste avant une porte étroite (une colonne légèrement décalée du centre) peut réduire le temps d'évacuation total, en cassant la compétition directe de plusieurs flux d'agents pour le même point de passage — un résultat qui aurait semblé absurde avant d'être observé en simulation (puis partiellement vérifié expérimentalement), et qu'aucune intuition individuelle sur le comportement d'un seul piéton n'aurait permis de prévoir : un nouvel exemple, appliqué cette fois à un enjeu de sécurité publique réel, de comportement émergent contre-intuitif au sens de la section 2 (piste Lycée).",
  },
  {
    type: "callout",
    tone: "info",
    title: "Variante : diffusion épidémique sur un réseau de contacts, pas sur une grille",
    text: "L'automate épidémique de la section 2 (piste Licence/BUT) propage l'infection à travers une grille régulière, où chaque cellule n'a de contact qu'avec ses 4 ou 8 voisines géographiques immédiates. Un modèle agent-based plus réaliste remplace cette grille par un réseau de contacts (graphe où chaque agent est un nœud, et chaque arête un contact social réel — collègue, colocataire, camarade de classe) : la probabilité de transmission dépend alors du nombre et de la structure des contacts de chaque agent, pas seulement de sa position géographique. Un même agent peut ainsi transmettre l'infection à un contact situé à l'autre bout de la ville (un collègue) plus facilement qu'à un voisin géographique avec lequel il n'a aucun contact social — une différence structurelle majeure avec la propagation strictement locale d'un automate cellulaire sur grille, qui explique pourquoi un « super-propagateur » (un agent à très nombreux contacts, comme un nœud à haut degré dans le graphe) peut faire diverger une épidémie bien plus qu'un agent isolé géographiquement proche du foyer initial.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Vers le jumeau numérique urbain",
    text: "Coupler un ABM d'évacuation ou de trafic (section 6) à des données SIG mises à jour en temps réel (comptages de capteurs, position GPS anonymisée de véhicules) plutôt qu'à un état figé au moment de la calibration est l'ambition du « jumeau numérique » (digital twin) urbain : une simulation multi-agent continuellement recalée sur l'état observé de la ville, utilisée pour tester en amont l'effet d'une fermeture de rue ou d'une évacuation avant qu'elle ne survienne réellement. C'est un prolongement direct des modèles hybrides de la section 4, poussé jusqu'à un flux de données vivant plutôt qu'un jeu de couches SIG statique.",
  },
  {
    type: "devoir",
    format: "Protocole de modélisation",
    title: "Rédiger un mini-ODD pour un modèle d'évacuation",
    prompt: "Choisis un espace public que tu connais (une salle de classe, un hall de gare, une place). Rédige un mini-protocole ODD en trois parties courtes : Overview (objectif du modèle, entités, échelle spatiale/temporelle) ; Design concepts (quel comportement émergent est attendu ? quelle part de stochasticité, par exemple le choix de sortie en cas d'ambiguïté ?) ; Details (règles précises de déplacement, gestion des obstacles, condition d'arrêt de la simulation). Compare ensuite ton protocole à celui d'un camarade sur le même espace : où vos deux modèles divergent-ils sur des détails que la prose seule n'aurait pas fait apparaître ?",
    criteria: [
      "Les trois blocs ODD (Overview, Design concepts, Details) sont bien distingués, pas fondus en un seul texte",
      "Design concepts identifie explicitement un comportement émergent attendu, pas seulement une règle individuelle",
      "Details précise un point souvent oublié (ordonnancement, gestion des bords, condition d'arrêt) qui changerait le résultat si un tiers l'implémentait différemment",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : GAMA charge nativement des couches SIG réelles (GAML), à la différence de NetLogo/Mesa ; la POM confronte un modèle à plusieurs motifs observés simultanément pour réduire la sous-détermination des paramètres, dans le même esprit que la validation à trois cartes de Pontius ; ODD standardise la documentation (Overview/Design concepts/Details) pour rendre un ABM reproductible ; un modèle hybride couple un ABM à un vrai réseau routier ou un vrai raster de contraintes ; le sur-paramétrage menace tout ABM trop libre, la reproductibilité exige les mêmes pratiques qu'un script scientifique versionné ; une simulation d'évacuation illustre à elle seule agents, environnement, règles et comportement émergent contre-intuitif.",
    ],
  },
  {
    type: "link",
    to: "/module/programmation-r",
    label: "Revoir les pratiques de reproductibilité scriptée",
    description: "Le module R détaille versionnement, graine aléatoire et environnement documenté — les mêmes exigences que la reproductibilité d'un ABM publié.",
  },
  {
    type: "link",
    to: "/module/vscode",
    label: "L'environnement pour coder et versionner un modèle Mesa",
    description: "VS Code, déjà présenté pour un script GeoPandas, est le même environnement de travail naturel pour un modèle Mesa en Python.",
  },
]
