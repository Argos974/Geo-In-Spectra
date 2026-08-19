import type { QuizQuestion } from "./types"

export const indicesSpectrauxQuiz: QuizQuestion[] = [
  {
    question: "Un pixel avec NDVI = 0.65 correspond le plus probablement à :",
    choices: ["De l'eau libre ou une surface humide en eaux calmes", "Un sol nu asséché ou une zone urbaine dense", "Une végétation dense et vigoureuse en pleine croissance", "Une végétation clairsemée en début de stress hydrique"],
    correctIndex: 2,
    explanation: "0.4 à 0.8 correspond à une végétation dense et vigoureuse. En dessous de 0, c'est de l'eau ; entre 0 et 0.2, un sol nu ou du bâti.",
  },
  {
    question: "Le NDMI utilise quelles bandes ?",
    choices: ["Rouge et NIR", "NIR et SWIR", "Vert et NIR", "Rouge et SWIR"],
    correctIndex: 1,
    explanation: "NDMI = (NIR − SWIR) / (NIR + SWIR). L'eau des tissus végétaux absorbe le SWIR, d'où la sensibilité à l'humidité.",
  },
  {
    question: "Que signifie la saturation du NDVI ?",
    choices: [
      "Passé un certain seuil de réflectance, l'indice devient négatif alors que la végétation reste bien présente sur le terrain",
      "Au-delà d'une certaine densité de canopée, l'indice cesse de progresser bien que la biomasse continue réellement d'augmenter",
      "Passé un certain niveau d'ensoleillement, les pixels de l'image deviennent surexposés et illisibles pour le capteur",
      "Au-delà d'une certaine température de surface, le capteur cesse de fonctionner correctement pendant l'acquisition",
    ],
    correctIndex: 1,
    explanation: "Sur une forêt dense ou une culture en pleine croissance, le NDVI plafonne. Des indices dérivés comme le SAVI ou l'EVI corrigent partiellement cet effet.",
  },
  {
    question: "Le NDBI est utile pour distinguer une zone bâtie d'un sol nu parce que :",
    choices: [
      "Les deux affichent un NDVI élevé, mais leurs valeurs de NDBI diffèrent nettement",
      "Les deux affichent un NDVI faible, mais leurs valeurs de NDBI diffèrent nettement",
      "Les deux affichent un NDBI similaire, c'est plutôt leur NDVI qui les distingue",
      "Aucun indice spectral usuel ne permet réellement de distinguer les deux surfaces",
    ],
    correctIndex: 1,
    explanation: "Sol nu et zone bâtie ont tous deux un NDVI faible (peu de végétation), mais le NDBI les différencie car les surfaces bâties réfléchissent davantage le SWIR que le NIR.",
  },
  {
    question: "Quelle limite s'applique à TOUS les indices spectraux, pas seulement au NDVI ?",
    choices: [
      "Ils dépendent tous fortement de la bande thermique, rarement disponible sur les capteurs optiques",
      "Les effets atmosphériques (nuages, brume, aérosols) et le mélange spectral à basse résolution",
      "Ils nécessitent tous un capteur radar pour s'affranchir de la couverture nuageuse",
      "Ils ne peuvent être calculés que dans un logiciel SIG comme QGIS, jamais en Python",
    ],
    correctIndex: 1,
    explanation: "Nuages/brume/aérosols faussent la réflectance mesurée, et un pixel à résolution grossière peut mélanger plusieurs types de couverture : deux limites générales à tout indice spectral.",
  },
  {
    question: "Un indice composé se distingue d'un indice simple parce qu'il :",
    choices: [
      "Combine simultanément trois bandes brutes ou plus du capteur, plutôt que deux comme un indice simple",
      "Combine entre eux plusieurs indices déjà calculés, plutôt que directement des bandes brutes du capteur",
      "Nécessite un modèle de machine learning entraîné, contrairement à un indice simple basé sur une formule fixe",
      "Ne s'applique qu'à des séries d'images multi-dates, jamais à une acquisition unique",
    ],
    correctIndex: 1,
    explanation: "Un indice composé repart d'indices déjà calculés (ex. NDMI + pente + vent) plutôt que des bandes brutes du capteur, pour produire un indicateur qu'aucun indice seul ne capture.",
  },
  {
    question: "Le SAVI corrige un défaut précis du NDVI, lequel ?",
    choices: [
      "Sa sensibilité à la réflectance du sol nu visible à travers un couvert clairsemé",
      "Sa forte dépendance à la résolution spatiale du capteur utilisé pour l'acquisition",
      "Son incapacité à distinguer une végétation saine d'une végétation en stress hydrique",
      "Sa forte sensibilité aux variations d'humidité atmosphérique entre deux prises de vue",
    ],
    correctIndex: 0,
    explanation: "Le SAVI (Huete, 1988) ajoute une constante L à la formule du NDVI pour atténuer l'influence de la réflectance du sol nu quand la végétation est clairsemée.",
  },
  {
    question: "Pourquoi le NDRE (red-edge) est-il particulièrement utile en agriculture de précision ?",
    choices: [
      "Il exploite la bande thermique pour repérer la chaleur dégagée par une plante stressée avant l'apparition de symptômes visibles",
      "Il reste sensible à la chlorophylle et sature plus tard que le NDVI, révélant un stress nutritionnel avant qu'il soit visible sur ce dernier",
      "Il remplace entièrement le NDVI dans tous les cas, car il capture rigoureusement la même information avec une bande de plus",
      "Il ne fonctionne que sur les capteurs Landsat, qui disposent de bandes red-edge dédiées à cet usage",
    ],
    correctIndex: 1,
    explanation: "Le NDRE exploite les bandes red-edge (uniques à des capteurs comme Sentinel-2, absentes de Landsat) : sensible à la teneur en chlorophylle, il sature beaucoup plus tard que le NDVI en forte biomasse.",
  },
  {
    question: "Pourquoi faut-il toujours préciser quelle bande red-edge (B5 ou B6) a servi à calculer un NDRE ?",
    choices: [
      "Ce n'est pas nécessaire, les deux bandes donnent rigoureusement le même résultat une fois l'indice normalisé",
      "La publication d'origine teste les deux (705 et 750 nm), et un NDRE \"B5\" n'est pas strictement le même indice qu'un NDRE \"B6\"",
      "B6 n'existe pas sur Sentinel-2, seule la bande B5 permet un calcul red-edge sur ce capteur",
      "Seul B5 (705 nm) est autorisé par la définition officielle publiée par Gitelson & Merzlyak en 1994",
    ],
    correctIndex: 1,
    explanation: "Gitelson & Merzlyak (1994) testent 705 nm et 750 nm sans trancher définitivement. En pratique B5 (705 nm) ou B6 (740 nm) sont tous deux utilisés selon les études, un rapport ou une publication doit toujours préciser laquelle des deux a été utilisée.",
  },
  {
    question: "Un capteur radar (SAR) ne mesure pas de réflectance : pourquoi ne peut-on pas y calculer un NDVI au sens strict ?",
    choices: [
      "Le radar mesure un coefficient de rétrodiffusion (σ°), pas une réflectance optique — des indicateurs équivalents comme le ratio de polarisation ou le RVI jouent un rôle comparable",
      "Le NDVI se calcule de façon strictement identique, il suffit de remplacer les bandes NIR et Rouge par les polarisations VH et VV du radar",
      "C'est inexact : une fois converti en décibels, le coefficient de rétrodiffusion radar redevient rigoureusement identique au NDVI optique",
      "Le radar ne peut mesurer aucune information exploitable sur la végétation, contrairement à un capteur optique classique",
    ],
    correctIndex: 0,
    explanation: "Une chute marquée du ratio de polarisation VH/VV signale souvent une surface en eau libre (réflexion spéculaire) ; le RVI (Radar Vegetation Index) combine les polarisations pour approcher une structure de végétation, mais ce sont des indicateurs distincts du NDVI optique, pas une simple substitution de bandes.",
  },
]
