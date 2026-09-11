import type { QuizQuestion } from "./types"

export const algorithmesSpatiauxQuiz: QuizQuestion[] = [
  {
    question: "En interpolation IDW (pondération inverse à la distance), que se passe-t-il si on augmente fortement l'exposant p ?",
    choices: [
      "L'estimation devient une simple moyenne arithmétique de tous les points connus, sans pondération",
      "L'influence des points lointains diminue encore plus vite, et la méthode se rapproche du plus proche voisin pur",
      "La méthode devient équivalente au krigeage",
      "L'exposant p n'a aucun effet sur le résultat final",
    ],
    correctIndex: 1,
    explanation: "p contrôle la vitesse à laquelle l'influence d'un point décroît avec la distance : un p élevé rend les points lointains presque négligeables, rapprochant l'IDW d'une simple recopie du plus proche voisin.",
  },
  {
    question: "Quel est le principe de la triangulation de Delaunay ?",
    choices: [
      "Relier les points par les segments les plus courts possible, sans autre contrainte",
      "Construire les triangles de sorte qu'aucun autre point ne se trouve à l'intérieur du cercle circonscrit de chaque triangle",
      "Découper l'espace en régions selon le point connu le plus proche",
      "Trier les points par ordre croissant de coordonnée x avant de les relier",
    ],
    correctIndex: 1,
    explanation: "Le critère du cercle circonscrit définit la triangulation de Delaunay : un triangle en fait partie si et seulement si aucun autre point du nuage ne se trouve à l'intérieur de son cercle circonscrit — ce qui maximise le plus petit angle de chaque triangle.",
  },
  {
    question: "Que répond un diagramme de Voronoï/Thiessen, à la différence d'une triangulation de Delaunay ?",
    choices: [
      "Comment relier les points par des triangles les plus réguliers possible",
      "Quelle portion du territoire est la plus proche de chaque point",
      "Quel est le plus court chemin entre deux points du nuage",
      "Quelle est la structure d'indexation la plus efficace pour ce nuage de points",
    ],
    correctIndex: 1,
    explanation: "Voronoï découpe l'espace en zones (chaque zone regroupant les positions les plus proches d'un point donné que de tout autre), tandis que Delaunay relie les points par des triangles — les deux constructions sont duales mais répondent à des questions différentes.",
  },
  {
    question: "Pourquoi un quadtree est-il en général plus efficace qu'une grille régulière sur des points très inégalement répartis ?",
    choices: [
      "Parce qu'un quadtree ne peut indexer que des points, jamais des polygones",
      "Parce qu'un quadtree subdivise finement les zones denses et laisse une seule grande cellule pour les zones vides, s'adaptant à la densité réelle",
      "Parce qu'une grille régulière est toujours plus lente à construire qu'un quadtree",
      "Parce qu'un quadtree n'a aucune limite de taille de structure",
    ],
    correctIndex: 1,
    explanation: "Une grille régulière découpe l'espace en cellules de taille fixe, indépendamment de la densité réelle ; un quadtree subdivise récursivement selon la densité observée, évitant qu'une zone dense ne déborde ou qu'une zone vide ne gaspille de la structure.",
  },
  {
    question: "Quel algorithme de plus court chemin fonctionne correctement même avec des poids d'arêtes négatifs ?",
    choices: [
      "Dijkstra",
      "A*",
      "Bellman-Ford",
      "Un quadtree",
    ],
    correctIndex: 2,
    explanation: "Contrairement à Dijkstra et A* (qui supposent des poids positifs), Bellman-Ford gère les poids négatifs et peut même détecter un cycle de poids total négatif, au prix d'une complexité O(V·E) plus élevée.",
  },
  {
    question: "Quel algorithme calcule en une seule passe le plus court chemin entre absolument toutes les paires de nœuds d'un graphe ?",
    choices: [
      "Dijkstra, relancé une fois par nœud source",
      "Floyd-Warshall",
      "DBSCAN",
      "L'enveloppe convexe",
    ],
    correctIndex: 1,
    explanation: "Floyd-Warshall calcule directement, en O(V³), la matrice complète des plus courts chemins entre toutes les paires de nœuds, en autorisant progressivement chaque nœud comme intermédiaire possible.",
  },
  {
    question: "Qu'est-ce qui distingue fondamentalement DBSCAN d'un algorithme comme le k-means ?",
    choices: [
      "DBSCAN ne fixe pas le nombre de clusters à l'avance et peut classer certains points comme du bruit, contrairement au k-means",
      "DBSCAN ne fonctionne que sur des données à une seule dimension",
      "Le k-means détecte toujours des clusters de forme quelconque, DBSCAN seulement des clusters ronds",
      "DBSCAN et k-means sont deux noms pour le même algorithme",
    ],
    correctIndex: 0,
    explanation: "DBSCAN découvre le nombre de clusters directement depuis la structure de densité des données (paramètres eps et minPts) et laisse certains points isolés non classés (bruit) ; le k-means impose un nombre k de clusters fixé à l'avance et force chaque point dans un cluster.",
  },
  {
    question: "L'algorithme de Douglas-Peucker simplifie une ligne en se basant sur quel critère ?",
    choices: [
      "Le nombre total de sommets de la ligne, réduit à une valeur fixe",
      "La distance perpendiculaire de chaque point intermédiaire au segment reliant les deux extrémités",
      "L'aire du triangle formé par chaque point et ses deux voisins immédiats",
      "La couleur de la ligne sur la carte",
    ],
    correctIndex: 1,
    explanation: "Douglas-Peucker garde un point s'il s'écarte, en distance perpendiculaire, de plus d'une tolérance ε du segment courant ; l'algorithme de Visvalingam-Whyatt utilise un critère différent, l'aire du triangle local.",
  },
  {
    question: "Le problème du voyageur de commerce (TSP) est dit NP-difficile. Que cela signifie-t-il en pratique ?",
    choices: [
      "Qu'il n'existe aucun algorithme, même approximatif, capable de le traiter",
      "Qu'aucun algorithme connu ne le résout exactement en temps polynomial pour un grand nombre de nœuds, d'où le recours à des heuristiques (2-opt, Christofides) au-delà d'une trentaine de nœuds",
      "Que le problème ne peut être posé que sur un réseau routier réel, jamais sur un graphe abstrait",
      "Qu'il se résout toujours plus vite que Dijkstra pour la même taille de graphe",
    ],
    correctIndex: 1,
    explanation: "La résolution exacte (Held-Karp) coûte O(n²·2ⁿ), praticable seulement jusqu'à une vingtaine ou une trentaine de nœuds ; au-delà, des heuristiques (plus proche voisin, 2-opt, Christofides) donnent une solution proche de l'optimal sans garantie stricte d'optimalité.",
  },
  {
    question: "Un nœud à forte centralité d'intermédiarité (betweenness) dans un réseau routier est :",
    choices: [
      "Un nœud isolé, rarement emprunté",
      "Un nœud par lequel passe une grande proportion des plus courts chemins entre les autres paires de nœuds — un « pont » critique du réseau",
      "Le nœud géographiquement le plus central du territoire, indépendamment du réseau",
      "Un nœud dont la suppression n'a aucun effet sur les trajets des autres nœuds",
    ],
    correctIndex: 1,
    explanation: "La centralité d'intermédiarité mesure la part des plus courts chemins entre toutes les paires de nœuds qui transitent par un nœud donné : un nœud à forte centralité d'intermédiarité est un point de passage critique, dont la disparition allongerait fortement de nombreux trajets.",
  },
]
