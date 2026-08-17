import type { ContentBlock } from "./types"

export const methodologieContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Les six salles précédentes donnent des connaissances : systèmes de coordonnées, capteurs, indices, outils, traitements. Celle-ci donne une méthode pour les mobiliser à l'écrit — au lycée comme à l'université, en examen comme en concours, dans un devoir comme dans un rapport professionnel.",
  },

  { type: "heading", text: "1. Le commentaire de carte ou de document géographique", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Un commentaire de document ne se réduit jamais à une description : il progresse par étapes, chacune préparant la suivante.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Identification : nature du document (carte topographique, image satellite, photographie aérienne…), source, date, échelle, sujet apparent",
      "Description organisée : ne pas énumérer au hasard — partir du général (structure d'ensemble) vers le particulier (détails significatifs), ou suivre un ordre spatial cohérent",
      "Analyse : expliquer ce qui est observé — mettre en relation les éléments entre eux, convoquer des connaissances extérieures au document pour interpréter, pas seulement décrire",
      "Critique du document : ses limites (échelle trop petite pour tel phénomène, date ancienne, absence de légende sur un point clé) — un bon commentaire questionne aussi la source",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "L'erreur la plus fréquente",
    text: "Décrire sans jamais expliquer. \"On observe une zone urbanisée au sud\" est une description ; \"cette urbanisation s'explique par la proximité de l'axe routier visible au nord-est\" est une analyse. Le second niveau seul est noté comme une vraie compétence de commentaire.",
  },

  { type: "heading", text: "2. La dissertation de géographie", level: "superieur" },
  {
    type: "paragraph",
    text: "Une dissertation répond à une question qui n'a pas de réponse évidente ni univoque — sinon, il n'y aurait rien à démontrer. La méthode se joue avant même la rédaction :",
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
    text: "« Le satellite peut-il remplacer le terrain dans la gestion des risques naturels ? » — Partie I : ce que le satellite apporte réellement (couverture large, répétée, indices quantifiés). Partie II : ses limites concrètes (résolution, occlusion nuageuse, absence de contexte humain/social). Partie III : la complémentarité effective observée dans les dispositifs réels (le satellite oriente, le terrain confirme et affine).",
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
      ["Résultats", "Cartes, indices, tableaux — présentés avant toute interprétation"],
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

  { type: "heading", text: "4. Préparer un concours (CAPES / Agrégation d'histoire-géographie)", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Les épreuves de concours d'enseignement en histoire-géographie mobilisent directement les compétences des sections précédentes, avec des attentes spécifiques :",
  },
  {
    type: "list",
    items: [
      "L'épreuve écrite de dissertation attend un plan démonstratif rigoureux et des références précises (auteurs, exemples localisés, dates)",
      "L'épreuve de cartographie thématique (fréquente à l'oral) évalue la capacité à choisir une sémiologie graphique adaptée au phénomène représenté, pas seulement une carte esthétique",
      "Les rapports de jury, publiés après chaque session, sont la ressource la plus utile pour calibrer précisément le niveau d'exigence attendu — bien plus qu'un manuel générique",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "La carte n'est pas une illustration",
    text: "En épreuve de cartographie thématique, une carte mal choisie (par exemple des ronds proportionnels là où un dégradé de couleur conviendrait à une donnée relative) est sanctionnée même si le fond de carte est soigné. Le choix sémiologique fait partie de la réponse, pas de sa mise en forme.",
  },
]
