import type { QuizQuestion } from "./types"

export const cartographieWebQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi une carte web découpe-t-elle son fond en tuiles plutôt que d'afficher une seule grande image ?",
    choices: [
      "Pour que chaque image puisse être mise en cache côté serveur indépendamment des autres",
      "Pour ne transférer et dessiner que la zone réellement visible à l'écran, à chaque niveau de zoom",
      "Parce que la plupart des navigateurs limitent la taille d'une image affichée en un seul bloc",
      "Parce que c'est une convention historique héritée des premiers systèmes de navigation GPS",
    ],
    correctIndex: 1,
    explanation: "Le monde entier à pleine résolution serait beaucoup trop volumineux à transférer d'un coup ; découper en tuiles permet de ne charger que ce qui est affiché.",
  },
  {
    question: "Au niveau de zoom z, combien de tuiles couvrent le monde entier ?",
    choices: ["z tuiles", "2z tuiles", "4^z tuiles", "z² + 1 tuiles"],
    correctIndex: 2,
    explanation: "La grille est de 2^z × 2^z tuiles, soit 4^z au total — une croissance rapide (plus de 68 milliards de tuiles à z=18).",
  },
  {
    question: "Quelle est la principale différence entre tuiles raster et tuiles vectorielles ?",
    choices: [
      "Les tuiles vectorielles sont des images déjà mises en forme par le serveur, plus compactes à transférer",
      "Les tuiles raster sont des images déjà dessinées ; les tuiles vectorielles transmettent la géométrie brute, dessinée côté client",
      "Les deux types de tuiles transmettent la même géométrie brute, seule la palette de couleurs diffère à l'affichage",
      "Les tuiles vectorielles sont un format propre au hors-ligne, incompatible avec un affichage nécessitant une connexion réseau",
    ],
    correctIndex: 1,
    explanation: "Ce transfert du dessin vers le client permet un style modifiable en temps réel, au prix d'un rendu plus coûteux (nécessitant souvent WebGL).",
  },
  {
    question: "Quelle technologie de rendu MapLibre GL utilise-t-elle, contrairement à Leaflet ?",
    choices: [
      "Le DOM HTML, avec des éléments positionnés en absolu pour chaque couche",
      "WebGL, ce qui permet une accélération matérielle du rendu graphique",
      "Uniquement du SVG, redessiné entièrement à chaque changement de vue",
      "Un rendu Canvas 2D classique, sans accélération matérielle dédiée",
    ],
    correctIndex: 1,
    explanation: "WebGL permet à MapLibre GL d'afficher de grands volumes de tuiles vectorielles avec rotation et inclinaison fluides ; Leaflet reste en DOM/Canvas, plus léger mais moins accéléré.",
  },
  {
    question: "Que fournit un service WFS (Web Feature Service), à la différence d'un WMS ?",
    choices: [
      "Une image raster déjà composée côté serveur, prête à être affichée telle quelle",
      "La géométrie et les attributs bruts de chaque objet, exploitables directement pour une analyse",
      "Des tuiles vectorielles déjà découpées et mises en cache, sans attributs interrogeables individuellement",
      "Un service de conversion d'adresses postales en coordonnées géographiques précises",
    ],
    correctIndex: 1,
    explanation: "Le WMS renvoie une image ; le WFS renvoie les données vecteur elles-mêmes, nécessaires pour une analyse plutôt qu'un simple affichage.",
  },
  {
    question: "Dans quel système de coordonnées un fichier GeoJSON est-il, par convention, exprimé ?",
    choices: [
      "Lambert-93 conique conforme (EPSG:2154)",
      "WGS84 géographique, en degrés décimaux (EPSG:4326)",
      "Web Mercator, projeté en mètres (EPSG:3857)",
      "UTM fuseau 31N, projeté en mètres (EPSG:32631)",
    ],
    correctIndex: 1,
    explanation: "Le GeoJSON est nativement en WGS84 (degrés) par convention ; la bibliothèque de cartographie le reprojette elle-même à l'affichage.",
  },
  {
    question: "Pourquoi un très gros fichier GeoJSON chargé d'un coup peut-il ralentir un navigateur, même une fois reçu ?",
    choices: [
      "Non : une fois le fichier reçu par le navigateur, son affichage est instantané quel que soit son volume",
      "Chaque sommet doit être reprojeté et dessiné, un coût qui grandit avec le nombre de sommets",
      "L'analyse syntaxique (parsing) du texte JSON est à elle seule l'étape la plus coûteuse du processus",
      "Les navigateurs modernes imposent un plafond strict de mémoire allouée à l'affichage d'une carte",
    ],
    correctIndex: 1,
    explanation: "Le coût n'est pas que réseau : le rendu (reprojection + dessin) de dizaines de milliers de sommets peut ralentir l'onglet, d'où l'intérêt de simplifier ou découper au-delà d'un certain volume.",
  },
  {
    question: "L'algorithme de Douglas-Peucker sert à :",
    choices: [
      "Calculer une zone tampon (buffer) à distance fixe tout autour du contour d'une géométrie",
      "Réduire le nombre de sommets d'une ligne ou d'un polygone selon le zoom, sans changement visible",
      "Reprojeter l'ensemble des coordonnées d'une couche d'un système de référence vers un autre",
      "Détecter puis fusionner automatiquement les entités dupliquées présentes dans un même jeu de données",
    ],
    correctIndex: 1,
    explanation: "C'est l'algorithme de simplification géométrique standard, qui réduit le volume de données transmis/dessiné sans dégrader visuellement le rendu.",
  },
  {
    question: "Pourquoi ne pas faire pointer un site à fort trafic directement vers tile.openstreetmap.org ?",
    choices: [
      "C'est en réalité l'usage par défaut prévu pour ce service, y compris pour un trafic de production élevé",
      "La politique de ce service prévoit un usage de développement/test à faible trafic, pas la production à grande échelle",
      "Ce service impose une limite technique stricte de requêtes par seconde, au-delà de laquelle l'accès est bloqué",
      "OpenStreetMap facture chaque tuile servie au-delà d'un certain volume mensuel, comme un service commercial",
    ],
    correctIndex: 1,
    explanation: "Un usage en production à fort trafic doit passer par un fournisseur dédié ou un auto-hébergement, pour ne pas solliciter l'infrastructure communautaire gratuite au-delà de ce qu'elle prévoit.",
  },
  {
    question: "Quel est un principe de base d'accessibilité pour une carte interactive ?",
    choices: [
      "Ajouter uniquement un attribut alt textuel sur l'image de fond, comme pour une image statique classique",
      "Prévoir une navigation clavier en complément de la souris, et un résumé textuel des données essentielles",
      "Limiter volontairement les niveaux de zoom disponibles afin de réduire la charge cognitive des utilisateurs",
      "Choisir une palette de couleurs à fort contraste, sans prévoir d'alternative non visuelle aux données",
    ],
    correctIndex: 1,
    explanation: "Une carte dépendante uniquement de la souris/du tactile et du rendu graphique exclut les utilisateurs de lecteurs d'écran ou de navigation clavier — un résumé textuel/tabulaire reste nécessaire.",
  },
]
