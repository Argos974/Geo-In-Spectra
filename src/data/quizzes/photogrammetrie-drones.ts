import type { QuizQuestion } from "./types"

export const photogrammetrieDronesQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi un recouvrement entre photos est-il indispensable en photogrammétrie ?",
    choices: [
      "Il permet surtout de corriger la distorsion optique de l'objectif, indépendamment du nombre de prises de vue utilisées",
      "Un point du terrain ne peut être positionné en 3D que s'il est visible sur au moins deux photos sous des angles différents",
      "Il sert principalement à homogénéiser l'exposition et la balance des couleurs entre les clichés successifs",
      "Il garantit surtout que le récepteur GNSS embarqué capte un nombre suffisant de satellites à chaque déclenchement",
    ],
    correctIndex: 1,
    explanation: "Comme la vision stéréoscopique humaine, la reconstruction 3D exige de voir un même point sous au moins deux angles différents.",
  },
  {
    question: "Ce que l'algorithme Structure from Motion (SfM) résout simultanément :",
    choices: [
      "Seulement la position 3D des points caractéristiques, l'orientation de chaque photo étant supposée connue via le GPS embarqué",
      "La position/orientation de chaque photo ET la position 3D des points caractéristiques, sans connaître l'une des deux au départ",
      "Seulement la position et l'orientation de chaque photo, la géométrie 3D étant ensuite calculée séparément par le MVS",
      "Seulement les paramètres de calibration interne de la caméra, indépendamment de la position des points au sol observés",
    ],
    correctIndex: 1,
    explanation: "La SfM résout les deux inconnues ensemble à partir des correspondances de points entre photos, sans calibration préalable de la caméra.",
  },
  {
    question: "La différence entre MNS et MNT :",
    choices: [
      "Le MNT inclut tout ce qui est visible d'en haut (bâti, végétation), tandis que le MNS ne décrit que le sol nu, après filtrage",
      "Le MNS inclut tout ce qui est visible d'en haut (bâti, végétation) ; le MNT ne décrit que le sol nu, après filtrage",
      "Le MNS s'obtient en filtrant le MNT pour en retirer le bâti et la végétation qui y subsistent encore",
      "Le MNS et le MNT décrivent en réalité tous deux uniquement le sol nu, mais à des résolutions spatiales différentes",
    ],
    correctIndex: 1,
    explanation: "Le MNT s'obtient en filtrant le MNS pour retirer bâti et végétation — jamais un sous-produit automatique de la prise de vue.",
  },
  {
    question: "Pourquoi des points d'appui au sol (GCP) sont-ils nécessaires en plus de la SfM ?",
    choices: [
      "La SfM seule positionne déjà correctement le modèle dans un référentiel géographique réel, les GCP ne servant qu'à une vérification a posteriori facultative",
      "La SfM seule produit une géométrie relative cohérente, mais pas nécessairement bien calée en position/échelle absolue dans un référentiel géographique réel",
      "Les GCP permettent surtout d'améliorer la résolution spatiale des photos, indépendamment du calage géographique du modèle final",
      "Les GCP permettent de réduire fortement le recouvrement nécessaire entre les photos lors de la planification du vol",
    ],
    correctIndex: 1,
    explanation: "Les GCP calent le modèle SfM sur un référentiel géographique réel (ex. Lambert-93), le même principe que le géoréférencement du module Fondements.",
  },
  {
    question: "Doubler l'altitude de vol d'un drone, à capteur identique, a pour effet approximatif :",
    choices: [
      "De ne quasiment pas modifier le GSD, celui-ci dépendant surtout de la focale du capteur et non de l'altitude de vol",
      "De doubler le GSD (résolution deux fois plus grossière), mais de couvrir une surface plus grande par vol",
      "De diviser le GSD par deux (résolution deux fois plus fine), mais de réduire d'autant la surface couverte par vol",
      "De multiplier le GSD par quatre, la relation entre altitude de vol et résolution au sol n'étant pas linéaire",
    ],
    correctIndex: 1,
    explanation: "Le GSD croît approximativement avec l'altitude de vol — un compromis direct entre précision et surface couverte.",
  },
  {
    question: "Un GPS RTK/PPK embarqué sur un drone :",
    choices: [
      "Élimine totalement et systématiquement le besoin de tout contrôle terrain indépendant, quelle que soit l'application visée",
      "Ramène la précision de position de chaque photo à quelques centimètres, réduisant fortement (sans toujours l'éliminer) le besoin en GCP",
      "Améliore surtout la synchronisation entre le déclenchement de l'appareil photo et l'enregistrement GPS, sans gain réel de précision",
      "Remplace le calcul SfM lui-même en fournissant directement la géométrie 3D du nuage de points par triangulation GPS",
    ],
    correctIndex: 1,
    explanation: "RTK/PPK améliore fortement la précision de géolocalisation embarquée, mais un contrôle terrain indépendant reste souvent recommandé.",
  },
  {
    question: "Le nuage de points épars produit directement par la SfM est ensuite densifié par :",
    choices: [
      "Une nouvelle passe de l'algorithme Structure from Motion appliquée au même jeu de photos",
      "Un algorithme de correspondance dense entre les photos sources, appelé Multi-View Stereo (MVS)",
      "Une simple interpolation géométrique entre les points épars existants, sans réutiliser les photos sources",
      "Le même récepteur GPS RTK utilisé pendant le vol, appliqué directement au nuage de points"
    ],
    correctIndex: 1,
    explanation: "Le MVS densifie le nuage épars initial en plusieurs millions à milliards de points, avant maillage éventuel.",
  },
  {
    question: "La limite structurelle la plus citée de la photogrammétrie face au LiDAR est :",
    choices: [
      "La photogrammétrie nécessite toujours un recouvrement supérieur à 90 % pour espérer percer une canopée forestière dense",
      "La photogrammétrie ne voit que la première surface opaque, donc pas le sol sous une canopée forestière dense",
      "La photogrammétrie perd toute précision de géoréférencement dès que la végétation dépasse quelques mètres de hauteur",
      "La photogrammétrie ne peut pas produire de modèle numérique de surface (MNS) en milieu forestier dense",
    ],
    correctIndex: 1,
    explanation: "Un capteur passif ne peut pas voir à travers un couvert végétal dense, contrairement à une partie du signal LiDAR (retours multiples).",
  },
  {
    question: "Une zone d'eau calme et une surface bétonnée uniforme posent problème à la SfM parce que :",
    choices: [
      "Elles nécessitent un recouvrement bien supérieur à la normale pour que la SfM parvienne à s'y raccrocher correctement",
      "Elles n'offrent aucun point caractéristique fiable à mettre en correspondance entre photos, quel que soit le recouvrement",
      "Elles provoquent surtout une distorsion géométrique du modèle final, sans affecter la détection de points",
      "Elles imposent l'usage d'un GPS RTK pour compenser l'absence de points d'appui au sol dans ces zones",
    ],
    correctIndex: 1,
    explanation: "Sans texture visuelle contrastée, l'algorithme ne trouve aucun point à apparier d'une photo à l'autre, laissant des trous indépendamment du recouvrement.",
  },
  {
    question: "Une lumière changeante (nuages qui passent) pendant un vol de drone est problématique car :",
    choices: [
      "Elle affecte surtout la précision du géoréférencement GPS des photos, sans effet sur la détection de points",
      "Elle dégrade la cohérence photométrique entre photos, compliquant la mise en correspondance SfM",
      "Elle complique uniquement le calcul du GSD, la mise en correspondance SfM restant par ailleurs inchangée",
      "Elle n'affecte que la qualité colorimétrique de l'orthomosaïque finale, pas la reconstruction 3D elle-même",
    ],
    correctIndex: 1,
    explanation: "Des conditions d'éclairage qui varient d'une photo à l'autre rendent plus difficile la détection de points caractéristiques cohérents entre elles.",
  },
]
