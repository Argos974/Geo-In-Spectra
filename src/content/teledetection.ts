import type { ContentBlock } from "./types"

export const teledetectionContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La télédétection consiste à observer et mesurer la surface terrestre à distance, sans contact physique, généralement depuis un satellite ou un avion. Le principe physique commun à tous les capteurs optiques : chaque matériau (végétation, eau, bâti, sol nu) réfléchit la lumière différemment selon la longueur d'onde. En mesurant cette réflectance sur plusieurs bandes du spectre, on peut identifier et quantifier ce qui recouvre le sol.",
  },

  { type: "heading", text: "1. Le rayonnement électromagnétique" },
  {
    type: "paragraph",
    text: "Le Soleil émet un rayonnement qui couvre un large spectre de longueurs d'onde. Une partie atteint le sol, y est en partie absorbée et en partie réfléchie vers le capteur satellite. La proportion réfléchie, la réflectance, varie selon la longueur d'onde et selon la nature de la surface observée. C'est cette signature spectrale qui permet de distinguer une forêt d'un champ, d'un parking ou d'un plan d'eau.",
  },
  {
    type: "table",
    headers: ["Domaine", "Longueur d'onde", "Usage typique"],
    rows: [
      ["Visible (bleu, vert, rouge)", "~ 0.4 – 0.7 µm", "Composition couleur naturelle, distinction eau/sol/végétation"],
      ["Proche infrarouge (NIR)", "~ 0.7 – 1.3 µm", "Très réfléchi par la végétation en bonne santé ; cœur de la plupart des indices de végétation"],
      ["Infrarouge à ondes courtes (SWIR)", "~ 1.3 – 2.5 µm", "Sensible à l'humidité (végétation, sol) ; cœur des indices d'humidité et de stress hydrique"],
      ["Infrarouge thermique", "~ 8 – 14 µm", "Température de surface, détection de foyers actifs, îlots de chaleur urbains"],
    ],
  },
  {
    type: "diagram",
    name: "em-spectrum",
    caption: "Les quatre domaines du spectre utilisés en télédétection, du visible au thermique.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi la végétation est \"rouge\" en proche infrarouge",
    text: "La chlorophylle absorbe fortement le rouge visible (pour la photosynthèse) mais la structure interne des feuilles réfléchit très fortement le proche infrarouge. Ce contraste rouge/NIR est si marqué et si stable qu'il constitue la base de l'indice le plus utilisé en télédétection végétale : le NDVI (module suivant).",
  },
  {
    type: "diagram",
    name: "reflectance-curve",
    caption: "La courbe de réflectance d'une végétation en bonne santé : le creux dans le rouge, le sursaut dans le proche infrarouge.",
  },

  { type: "heading", text: "2. Capteurs optiques vs radar (SAR)" },
  {
    type: "comparison",
    items: [
      {
        label: "Optique (passif)",
        points: [
          "Mesure la lumière solaire réfléchie",
          "Nécessite un ciel dégagé (bloqué par les nuages)",
          "Résolution spectrale riche (plusieurs bandes fines)",
          "Ex. : Sentinel-2, Landsat, Pléiades",
        ],
      },
      {
        label: "Radar / SAR (actif)",
        points: [
          "Émet sa propre onde radar et mesure le signal retour",
          "Traverse les nuages, fonctionne de nuit",
          "Sensible à la structure/rugosité de surface, pas à la couleur",
          "Ex. : Sentinel-1, TerraSAR-X",
        ],
      },
    ],
  },

  { type: "heading", text: "3. Les quatre résolutions d'une image satellite" },
  {
    type: "list",
    items: [
      "Résolution spatiale : taille au sol d'un pixel (ex. Sentinel-2 : 10 m en visible/NIR, 20 m sur certaines bandes SWIR)",
      "Résolution spectrale : nombre et finesse des bandes mesurées (Sentinel-2 : 13 bandes, du visible au SWIR)",
      "Résolution temporelle : fréquence de revisite du même endroit (Sentinel-2 : ~5 jours avec les deux satellites jumeaux)",
      "Résolution radiométrique : nombre de niveaux d'intensité codés par pixel (Sentinel-2 : 12 bits, soit 4096 niveaux par bande)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un compromis, jamais un gratuit",
    text: "Aucun satellite ne maximise les quatre résolutions à la fois : c'est un compromis physique et budgétaire. Un capteur très haute résolution spatiale (ex. Pléiades, 0.5 m) a une fauchée étroite et une revisite plus rare ; un capteur à revisite quotidienne (ex. MODIS) a une résolution spatiale grossière (250 m à 1 km). Le choix du capteur dépend toujours de l'échelle du phénomène étudié.",
  },

  { type: "heading", text: "4. Les principales plateformes accessibles gratuitement" },
  {
    type: "table",
    headers: ["Mission", "Opérateur", "Résolution", "Revisite", "Accès"],
    rows: [
      ["Sentinel-2", "ESA / Copernicus", "10–20 m", "~5 jours", "Copernicus Data Space Ecosystem (gratuit)"],
      ["Sentinel-1 (radar)", "ESA / Copernicus", "5–20 m", "~6 jours", "Copernicus Data Space Ecosystem (gratuit)"],
      ["Landsat 8/9", "USGS/NASA", "15–30 m", "~16 jours (8 jours combiné)", "USGS EarthExplorer (gratuit)"],
      ["Pléiades", "Airbus (commercial)", "0.5 m", "quotidien (tasking)", "Payant"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Lien avec le module Indices spectraux",
    text: "Sentinel-2 est la référence utilisée dans quasiment tous les cas pratiques de ce cours : gratuite, résolution spatiale suffisante pour du travail à l'échelle d'une parcelle ou d'un massif, et dotée des bandes rouge/NIR/SWIR nécessaires au calcul du NDVI, NDMI et NDBI présentés dans le module suivant.",
  },

  { type: "heading", text: "5. La photo-interprétation", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Avant tout calcul d'indice, la première compétence en télédétection reste la lecture directe de l'image à l'œil — une compétence qui reste précieuse aujourd'hui pour vérifier un résultat automatique, et directement utile en épreuve de commentaire de document. Quatre clés de lecture classiques :",
  },
  {
    type: "list",
    items: [
      "La forme : un rectangle très régulier évoque un bâtiment ou une serre, une ligne sinueuse un cours d'eau ou une route",
      "La texture : lisse pour un plan d'eau ou un toit, grenue pour une forêt vue en résolution fine",
      "La teinte : la coloration en composition naturelle (rouge/vert/bleu) ou fausse couleur (souvent NIR/rouge/vert, qui fait ressortir la végétation en rouge vif)",
      "L'ombre portée : trahit la hauteur d'un objet (bâtiment, arbre) que l'image seule, vue du dessus, ne montre pas directement",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Composition naturelle vs fausse couleur",
    text: "Une composition \"fausse couleur\" affiche le proche infrarouge à la place du rouge visible : la végétation, très réfléchissante en NIR, apparaît alors en rouge vif plutôt qu'en vert. Ce n'est pas une erreur de calibration — c'est un choix délibéré qui rend la végétation immédiatement identifiable à l'œil, sans calculer le moindre indice.",
  },

  { type: "heading", text: "6. Prétraiter une image avant de l'utiliser", level: "superieur" },
  {
    type: "paragraph",
    text: "Une image satellite brute (niveau L1C pour Sentinel-2) n'est pas directement comparable à une autre image, ni même exploitable pour un indice fiable, sans un minimum de correction :",
  },
  {
    type: "list",
    items: [
      "Correction radiométrique : compense les différences de sensibilité entre capteurs et dans le temps",
      "Correction atmosphérique : retire l'effet de la vapeur d'eau, des aérosols et des nuages fins sur la réflectance mesurée (c'est ce qui distingue le niveau L2A du L1C pour Sentinel-2)",
      "Correction géométrique : recale précisément l'image sur un système de coordonnées, pour qu'elle se superpose exactement à d'autres couches",
      "Mosaïquage : assemble plusieurs scènes adjacentes en une seule image continue, en harmonisant leurs teintes aux raccords",
    ],
  },
]
