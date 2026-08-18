import type { QuizQuestion } from "./types"

export const teledetectionQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi la végétation en bonne santé apparaît-elle très réfléchissante en proche infrarouge (NIR) ?",
    choices: [
      "La chlorophylle absorbe fortement le NIR",
      "La structure interne des feuilles réfléchit fortement le NIR",
      "L'eau des feuilles amplifie le signal NIR",
      "C'est un artefact des capteurs, pas un phénomène physique",
    ],
    correctIndex: 1,
    explanation: "La chlorophylle absorbe le rouge (photosynthèse) mais la structure interne des feuilles réfléchit fortement le proche infrarouge. Ce contraste est la base du NDVI.",
  },
  {
    question: "Un capteur radar (SAR) a un avantage majeur sur un capteur optique :",
    choices: [
      "Une meilleure résolution spectrale",
      "Il fonctionne de nuit et à travers les nuages",
      "Il coûte toujours moins cher",
      "Il ne nécessite aucun satellite",
    ],
    correctIndex: 1,
    explanation: "Le SAR est un capteur actif : il émet sa propre onde radar, ce qui le rend indépendant de l'éclairage solaire et capable de traverser la couverture nuageuse.",
  },
  {
    question: "Laquelle de ces résolutions décrit la taille au sol représentée par un pixel ?",
    choices: ["Résolution spectrale", "Résolution temporelle", "Résolution spatiale", "Résolution radiométrique"],
    correctIndex: 2,
    explanation: "La résolution spatiale est la taille au sol d'un pixel (10 m pour Sentinel-2 en visible/NIR). La spectrale concerne les bandes, la temporelle la fréquence de revisite, la radiométrique le nombre de niveaux d'intensité.",
  },
  {
    question: "Pourquoi aucun satellite ne maximise-t-il les quatre résolutions à la fois ?",
    choices: [
      "C'est un compromis physique et budgétaire",
      "La réglementation internationale l'interdit",
      "Les capteurs actuels n'y sont pas encore parvenus mais y arriveront bientôt",
      "Ce n'est pas vrai, Sentinel-2 les maximise toutes",
    ],
    correctIndex: 0,
    explanation: "Un capteur très haute résolution spatiale a une fauchée étroite et une revisite plus rare ; un capteur à revisite quotidienne a une résolution spatiale grossière. Le choix dépend de l'échelle du phénomène étudié.",
  },
  {
    question: "Sentinel-2 est souvent la référence pour ce cours parce qu'elle est :",
    choices: [
      "Payante mais très précise",
      "Gratuite, avec une résolution suffisante et les bandes nécessaires au NDVI/NDMI/NDBI",
      "La seule mission équipée d'un capteur radar",
      "Réservée aux usages militaires",
    ],
    correctIndex: 1,
    explanation: "Sentinel-2 (ESA/Copernicus) est gratuite, avec une résolution spatiale adaptée au travail à l'échelle d'une parcelle et les bandes rouge/NIR/SWIR nécessaires aux indices spectraux du cours.",
  },
  {
    question: "Pourquoi une bande thermique fonctionne-t-elle même de nuit, contrairement à une bande visible ou NIR ?",
    choices: [
      "Elle mesure un rayonnement émis par la Terre elle-même, pas la lumière solaire réfléchie",
      "Elle utilise une source laser embarquée sur le satellite",
      "Ce n'est pas vrai, elle nécessite aussi l'éclairage solaire",
      "Elle capte la lumière de la Lune",
    ],
    correctIndex: 0,
    explanation: "Selon la loi de Wien, un corps à ~288 K (la Terre) émet un maximum de rayonnement vers 10 µm (thermique), indépendamment de tout éclairage solaire, contrairement au visible/NIR/SWIR, qui mesurent la lumière solaire réfléchie.",
  },
  {
    question: "Le niveau L2A de Sentinel-2, contrairement au L1C, a été :",
    choices: [
      "Corrigé des effets atmosphériques (réflectance de surface)",
      "Compressé pour réduire sa taille de fichier",
      "Acquis avec un capteur différent",
      "Débarrassé de toute donnée radiométrique",
    ],
    correctIndex: 0,
    explanation: "Le processeur Sen2Cor produit le niveau L2A à partir du L1C en appliquant une correction atmosphérique (modèle de transfert radiatif), pour obtenir une réflectance de surface comparable d'une image à l'autre.",
  },
  {
    question: "Qu'est-ce qui distingue fondamentalement un capteur hyperspectral d'un capteur multispectral comme Sentinel-2 ?",
    choices: [
      "Le hyperspectral vole plus haut",
      "Il mesure plusieurs centaines de bandes contiguës très fines plutôt qu'une dizaine de bandes larges",
      "Il ne fonctionne qu'en radar",
      "Il n'existe aucune différence, ce sont deux noms pour la même chose",
    ],
    correctIndex: 1,
    explanation: "Un capteur hyperspectral (PRISMA, EnMAP, AVIRIS) mesure une courbe de réflectance quasi continue, ce qui permet de détecter des signatures d'absorption fines invisibles à un capteur multispectral qui moyenne sur des bandes trop larges.",
  },
  {
    question: "En polarimétrie SAR, une signature forte en double-rebond (double-bounce) est typique de :",
    choices: [
      "Une surface d'eau parfaitement calme",
      "Une façade de bâtiment au-dessus d'un sol horizontal, ou un tronc d'arbre au-dessus d'un sol inondé",
      "Un nuage",
      "Un sol nu totalement plat",
    ],
    correctIndex: 1,
    explanation: "Le double rebond (réflexion en coin) est la signature caractéristique d'une surface verticale posée sur une surface horizontale : c'est ce mécanisme que la décomposition de Freeman-Durden isole pour distinguer, par exemple, une forêt inondée d'une forêt sur sol sec.",
  },
  {
    question: "Une image Sentinel-2 acquise à midi en été et une autre à 9h en hiver, sur le même lieu, ne sont pas directement comparables pixel à pixel parce que :",
    choices: [
      "Sentinel-2 change de bandes spectrales selon la saison",
      "L'angle d'éclairage solaire diffère (effets BRDF, ombres portées) et la végétation change de phénologie",
      "La résolution spatiale du capteur varie avec l'heure d'acquisition",
      "Ce n'est pas vrai, deux images Sentinel-2 sont toujours directement comparables",
    ],
    correctIndex: 1,
    explanation: "La hauteur et l'azimut du soleil changent la réflectance mesurée d'une même surface (BRDF) et la longueur des ombres ; la saison change aussi l'état de la végétation. Sans correction, ces effets se confondent avec un vrai changement.",
  },
]
