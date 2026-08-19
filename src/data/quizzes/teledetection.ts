import type { QuizQuestion } from "./types"

export const teledetectionQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi la végétation en bonne santé apparaît-elle très réfléchissante en proche infrarouge (NIR) ?",
    choices: [
      "La chlorophylle, comme dans le visible, absorbe fortement le rayonnement NIR pour la photosynthèse",
      "La structure cellulaire interne des feuilles (mésophylle) diffuse et réfléchit fortement le NIR",
      "L'eau contenue dans les feuilles amplifie et renforce la réflectance mesurée dans le NIR",
      "Les cires cuticulaires en surface réfléchissent de façon spéculaire le rayonnement NIR incident",
    ],
    correctIndex: 1,
    explanation: "La chlorophylle absorbe le rouge (photosynthèse) mais la structure interne des feuilles réfléchit fortement le proche infrarouge. Ce contraste est la base du NDVI.",
  },
  {
    question: "Un capteur radar (SAR) a un avantage majeur sur un capteur optique :",
    choices: [
      "Il offre une résolution spectrale nettement supérieure à celle des capteurs optiques classiques",
      "C'est un capteur actif : il fonctionne de nuit et peut traverser la couverture nuageuse",
      "Il permet une identification directe des espèces végétales sans traitement d'image",
      "Il produit des images en couleurs naturelles comparables à celles d'un capteur optique",
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
      "Il s'agit d'un compromis physique et budgétaire inhérent à la conception d'un capteur",
      "Une réglementation internationale limite volontairement les résolutions accessibles au grand public",
      "Les technologies actuelles n'y parviennent pas encore mais y parviendront dans les prochaines années",
      "C'est inexact : Sentinel-2 atteint déjà le maximum sur les quatre résolutions simultanément",
    ],
    correctIndex: 0,
    explanation: "Un capteur très haute résolution spatiale a une fauchée étroite et une revisite plus rare ; un capteur à revisite quotidienne a une résolution spatiale grossière. Le choix dépend de l'échelle du phénomène étudié.",
  },
  {
    question: "Sentinel-2 est souvent la référence pour ce cours parce qu'elle est :",
    choices: [
      "Payante à l'achat mais offrant une précision radiométrique inégalée par les autres missions",
      "Gratuite, avec une résolution spatiale suffisante et les bandes spectrales nécessaires au NDVI/NDMI/NDBI",
      "La seule mission du programme Copernicus équipée d'un capteur radar embarqué",
      "Réservée aux usages militaires et inaccessible aux programmes de recherche civile",
    ],
    correctIndex: 1,
    explanation: "Sentinel-2 (ESA/Copernicus) est gratuite, avec une résolution spatiale adaptée au travail à l'échelle d'une parcelle et les bandes rouge/NIR/SWIR nécessaires aux indices spectraux du cours.",
  },
  {
    question: "Pourquoi une bande thermique fonctionne-t-elle même de nuit, contrairement à une bande visible ou NIR ?",
    choices: [
      "Elle mesure le rayonnement thermique émis par la Terre elle-même, indépendamment de la lumière solaire réfléchie",
      "Elle utilise une source laser active embarquée qui illumine la scène comme un radar",
      "En réalité elle nécessite aussi un éclairage solaire suffisant pour produire un signal exploitable",
      "Elle capte la lumière réfléchie par la Lune, suffisante pour former une image la nuit",
    ],
    correctIndex: 0,
    explanation: "Selon la loi de Wien, un corps à ~288 K (la Terre) émet un maximum de rayonnement vers 10 µm (thermique), indépendamment de tout éclairage solaire, contrairement au visible/NIR/SWIR, qui mesurent la lumière solaire réfléchie.",
  },
  {
    question: "Le niveau L2A de Sentinel-2, contrairement au L1C, a été :",
    choices: [
      "Corrigé des effets atmosphériques pour fournir une réflectance de surface directement comparable",
      "Recompressé avec un algorithme différent pour réduire la taille des fichiers livrés",
      "Rééchantillonné à partir d'un capteur secondaire embarqué sur le même satellite",
      "Débarrassé de ses métadonnées radiométriques d'origine pour alléger le produit final",
    ],
    correctIndex: 0,
    explanation: "Le processeur Sen2Cor produit le niveau L2A à partir du L1C en appliquant une correction atmosphérique (modèle de transfert radiatif), pour obtenir une réflectance de surface comparable d'une image à l'autre.",
  },
  {
    question: "Qu'est-ce qui distingue fondamentalement un capteur hyperspectral d'un capteur multispectral comme Sentinel-2 ?",
    choices: [
      "Le capteur hyperspectral vole à une altitude orbitale plus élevée que les capteurs multispectraux",
      "Il mesure plusieurs centaines de bandes spectrales contiguës et fines, contre une dizaine de bandes larges",
      "Il fonctionne exclusivement en mode radar actif, sans acquisition dans le domaine optique",
      "Il s'agit en réalité de deux appellations commerciales désignant la même technologie de capteur",
    ],
    correctIndex: 1,
    explanation: "Un capteur hyperspectral (PRISMA, EnMAP, AVIRIS) mesure une courbe de réflectance quasi continue, ce qui permet de détecter des signatures d'absorption fines invisibles à un capteur multispectral qui moyenne sur des bandes trop larges.",
  },
  {
    question: "En polarimétrie SAR, une signature forte en double-rebond (double-bounce) est typique de :",
    choices: [
      "Une surface d'eau calme agissant comme un réflecteur spéculaire qui renvoie l'onde à l'écart du capteur",
      "Une façade verticale au-dessus d'un sol horizontal, comme un bâtiment ou un tronc d'arbre au-dessus d'un sol inondé",
      "Une canopée forestière dense qui diffuse l'onde radar dans toutes les directions (rétrodiffusion de volume)",
      "Un sol nu et plat qui réfléchit l'essentiel de l'onde incidente loin du capteur",
    ],
    correctIndex: 1,
    explanation: "Le double rebond (réflexion en coin) est la signature caractéristique d'une surface verticale posée sur une surface horizontale : c'est ce mécanisme que la décomposition de Freeman-Durden isole pour distinguer, par exemple, une forêt inondée d'une forêt sur sol sec.",
  },
  {
    question: "Une image Sentinel-2 acquise à midi en été et une autre à 9h en hiver, sur le même lieu, ne sont pas directement comparables pixel à pixel parce que :",
    choices: [
      "Sentinel-2 reconfigure ses bandes spectrales actives en fonction de la saison d'acquisition",
      "L'angle d'éclairage solaire diffère entre les deux prises (effets BRDF, longueur des ombres) et la végétation change de phénologie",
      "La résolution spatiale effective du capteur se dégrade aux heures d'acquisition matinales",
      "En réalité, deux images Sentinel-2 quelconques sont toujours directement comparables pixel à pixel sans traitement",
    ],
    correctIndex: 1,
    explanation: "La hauteur et l'azimut du soleil changent la réflectance mesurée d'une même surface (BRDF) et la longueur des ombres ; la saison change aussi l'état de la végétation. Sans correction, ces effets se confondent avec un vrai changement.",
  },
]
