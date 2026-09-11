import type { ContentBlock } from "../types"

export const systemesMultiAgentsFiche: ContentBlock[] = [
  {
    type: "list",
    items: [
      "Agent : perception locale → décision (règle propre) → action, sans vue d'ensemble du système",
      "Comportement émergent : le collectif dépasse la somme des règles individuelles (banc de poissons, vol d'étourneaux)",
    ],
  },
  {
    type: "table",
    headers: ["Élément d'un ABM", "Rôle"],
    rows: [
      ["Agents", "État interne + règles de comportement"],
      ["Environnement", "Grille, réseau (graphe) ou espace continu"],
      ["Interactions", "Comment les agents s'influencent"],
      ["Ordonnancement", "Séquentiel / aléatoire / simultané — change le résultat"],
    ],
  },
  {
    type: "comparison",
    items: [
      { label: "Voisinage de Moore", points: ["8 cellules, diagonales incluses", "Jeu de la Vie"] },
      { label: "Voisinage de von Neumann", points: ["4 cellules, sans diagonale", "Propagation le long d'un réseau"] },
    ],
  },
  {
    type: "list",
    items: [
      "Jeu de la Vie (Conway) : 4 règles de voisinage → planeurs, oscillateurs émergent sans être décrits",
      "Boids (Reynolds) : séparation + alignement + cohésion → vol de groupe crédible",
      "Schelling : seuil de tolérance t ; satisfait(i) = proportion de voisins semblables ≥ t → ségrégation collective forte même avec t modéré",
    ],
  },
  {
    type: "formula",
    label: "Boids : mise à jour de vitesse",
    formula: "v(t+1) = v(t) + wₛ·Séparation + wₐ·Alignement + w𝒸·Cohésion",
  },
  {
    type: "formula",
    label: "ACO : mise à jour de phéromone",
    formula: "τᵢⱼ(t+1) = (1 − ρ)·τᵢⱼ(t) + Σₖ Δτᵢⱼᵏ",
    note: "ρ = évaporation ; les chemins courts sont renforcés plus vite qu'ils ne s'évaporent.",
  },
  {
    type: "formula",
    label: "PSO : mise à jour de vitesse",
    formula: "vᵢ(t+1) = w·vᵢ(t) + c₁r₁·(pᵢ−xᵢ) + c₂r₂·(g−xᵢ)",
    note: "pᵢ = meilleure position individuelle, g = meilleure position de l'essaim.",
  },
  {
    type: "comparison",
    items: [
      { label: "NetLogo", points: ["Patches + turtles", "Langage haut niveau, prise en main rapide"] },
      { label: "Mesa (Python)", points: ["Classes Agent / Model", "MultiGrid/SingleGrid, step(), DataCollector"] },
      { label: "GAMA (GAML)", points: ["Charge nativement des couches SIG réelles", "Géo-simulation dédiée"] },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Cellulaire automaton → géo : CA_MARKOV",
    text: "Le module TerrSet applique ce même mécanisme (voisinage + règle de transition) à une vraie occupation du sol, couplé à une chaîne de Markov.",
  },
  {
    type: "list",
    items: [
      "Modélisation orientée motifs (POM, Grimm) : confronter le modèle à plusieurs motifs observés à la fois, pas un seul, pour réduire le sur-paramétrage",
      "ODD (Overview, Design concepts, Details) : protocole standard pour documenter et reproduire un ABM publié",
      "Validation : comparer à un motif réel + à un « null model » — rejoint la méthode à trois cartes de Pontius (TerrSet)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Sur-paramétrage",
    text: "Un modèle avec trop de paramètres libres peut reproduire n'importe quel motif observé sans rien expliquer — le même piège que le sur-apprentissage en machine learning.",
  },
]
