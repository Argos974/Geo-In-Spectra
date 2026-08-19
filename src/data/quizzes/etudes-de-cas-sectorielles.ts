import type { QuizQuestion } from "./types"

export const etudesDeCasSectoriellesQuiz: QuizQuestion[] = [
  {
    question: "Une carte de préconisation à taux variable en agriculture de précision associe typiquement :",
    choices: [
      "Une dose d'intrant uniforme, calculée à partir de la moyenne NDVI de l'ensemble de la parcelle et appliquée ensuite partout",
      "Chaque classe de vigueur, issue du NDVI classifié, à une dose d'intrant différenciée selon son niveau de vigueur",
      "Les prévisions météo des jours suivants, combinées au calendrier cultural, sans recours à l'imagerie satellite",
      "Le cours du marché de l'intrant au moment de l'achat, ajusté selon le budget disponible pour la campagne",
    ],
    correctIndex: 1,
    explanation: "L'objectif est de moduler l'intrant selon la variabilité réelle intra-parcellaire, plutôt qu'une dose uniforme sur toute la parcelle.",
  },
  {
    question: "Pourquoi un NDVI faible isolé ne suffit-il jamais à une vraie préconisation agronomique ?",
    choices: [
      "Le NDVI nécessite toujours une correction atmosphérique poussée, sans laquelle la valeur mesurée resterait entièrement inexploitable",
      "Un NDVI faible peut avoir plusieurs causes (stress hydrique, carence, maladie, sol naturellement moins profond) que le NDVI seul ne distingue pas",
      "Le NDVI reflète uniquement la chlorophylle instantanée et perd toute validité dès que la plante entre en sénescence naturelle",
      "Il faudrait systématiquement lui substituer le NDBI, jugé plus adapté au suivi de la vigueur des cultures en végétation",
    ],
    correctIndex: 1,
    explanation: "Une préconisation fiable croise le NDVI avec un historique de rendement, une analyse de sol, ou une série temporelle, jamais une seule image isolée.",
  },
  {
    question: "Le ΔNDBI (différence de NDBI entre deux dates) sert principalement à :",
    choices: [
      "Estimer indirectement la température de surface à partir de l'écart d'albédo entre les deux acquisitions",
      "Détecter une artificialisation récente et localisée survenue entre les deux dates comparées",
      "Quantifier directement la surface agricole cultivée présente sur chacune des deux dates comparées",
      "Se substituer au calcul du NDVI lorsque les deux dates sont trop rapprochées pour observer la végétation",
    ],
    correctIndex: 1,
    explanation: "Une hausse marquée et localisée du NDBI entre deux dates signale une artificialisation récente à cet endroit précis.",
  },
  {
    question: "Pourquoi le seuil de ΔNDBI retenu comme \"changement significatif\" doit-il être calibré sur une vérité terrain ?",
    choices: [
      "Non, un seuil universel autour de 0,1 est reconnu comme valable pour tous les capteurs et toutes les régions du monde",
      "Un seuil trop bas confond bruit radiométrique et vrai changement ; trop haut, il manque des changements réels",
      "Le choix du seuil n'affecte que la vitesse de traitement de l'image, jamais le résultat cartographié final",
      "Le seuil doit toujours être fixé à la valeur médiane de l'histogramme, indépendamment du terrain observé",
    ],
    correctIndex: 1,
    explanation: "Un seuil mal calibré produit soit trop de faux positifs, soit manque de vrais changements — la calibration sur zones connues est indispensable.",
  },
  {
    question: "Un îlot de chaleur urbain est spatialement corrélé à :",
    choices: [
      "Une baisse du NDBI accompagnée d'une hausse du NDVI, signe d'une couverture végétale plus dense et rafraîchissante",
      "Une hausse du NDBI (artificialisation) et généralement l'inverse pour le NDVI sur ce même secteur",
      "Une hausse simultanée du NDBI et du NDVI, les deux indices évoluant généralement dans le même sens en zone urbaine",
      "Uniquement l'altitude et la pente du terrain, les indices spectraux n'apportant ici aucune information exploitable",
    ],
    correctIndex: 1,
    explanation: "Les surfaces artificialisées (NDBI élevé, NDVI faible) stockent et restituent la chaleur différemment d'un sol végétalisé, créant des écarts de température locaux mesurables.",
  },
  {
    question: "Dans la structure Risque = Aléa × Enjeux × Vulnérabilité appliquée à un risque incendie, la \"vulnérabilité\" correspond à :",
    choices: [
      "La probabilité annuelle de départ de feu sur le secteur, déduite de l'historique des interventions des pompiers",
      "Le matériau de construction et l'âge du bâti exposé, c'est-à-dire sa sensibilité propre au phénomène",
      "La densité de population résidente dans la zone exposée, sans considération du type de bâti concerné",
      "La pente et l'orientation du terrain, qui déterminent la vitesse de propagation potentielle du feu",
    ],
    correctIndex: 1,
    explanation: "L'aléa concerne le phénomène (pente, végétation, historique), les enjeux ce qui est exposé (bâti), la vulnérabilité la sensibilité de cet enjeu au phénomène.",
  },
  {
    question: "Pourquoi documenter explicitement la pondération d'une analyse multicritère (AHP) de risque, pas seulement livrer la carte finale ?",
    choices: [
      "Ce n'est pas nécessaire dès lors que la carte finale paraît visuellement cohérente avec la connaissance de terrain qu'ont déjà les experts locaux du secteur",
      "Deux territoires peuvent légitimement pondérer différemment selon leurs priorités locales, et une carte sans pondération documentée ne peut ni être auditée ni comparée honnêtement",
      "La pondération relève d'une norme nationale fixée une fois pour toutes, censée s'appliquer à l'identique quel que soit le territoire étudié",
      "Seule la couche \"enjeux\" nécessiterait d'être documentée en détail, les autres couches pouvant rester de simples paramètres internes non communiqués",
    ],
    correctIndex: 1,
    explanation: "Sans la pondération documentée, ni l'audit ni la comparaison entre territoires n'est possible de façon rigoureuse.",
  },
  {
    question: "En gestion forestière, un modèle de hauteur de canopée LiDAR sert notamment à :",
    choices: [
      "Mesurer la teneur en eau du sol forestier, en complément des relevés pédologiques de terrain",
      "Estimer un volume de bois sur pied, afin de planifier une exploitation durable de la parcelle",
      "Remplacer entièrement la classification d'essence par imagerie multispectrale, la rendant obsolète",
      "Calculer directement un indice NDVI de la canopée, sans nécessiter d'image satellite complémentaire",
    ],
    correctIndex: 1,
    explanation: "Le CHM (module LiDAR) croisé avec une classification d'essence permet une planification forestière proactive plutôt qu'une réaction après une coupe déjà réalisée.",
  },
  {
    question: "Ce que les études de cas sectorielles de cette salle partagent méthodologiquement :",
    choices: [
      "Chaque secteur applique une méthode entièrement indépendante, développée sans référence aux autres, sans qu'aucune étape ne soit jamais partagée entre eux",
      "Une acquisition datée et documentée, un indice/classification intermédiaire, une détection de changement si pertinente, une combinaison multicritère pondérée si décision finale",
      "L'usage systématique d'un levé LiDAR aéroporté, requis en préalable à toute analyse quel que soit le secteur ou la décision recherchée",
      "L'absence de toute vérité terrain à chaque étape, la carte finale reposant uniquement sur l'indice spectral brut, sans classification ni pondération"
    ],
    correctIndex: 1,
    explanation: "Ce cadre méthodologique commun (acquisition documentée, indice intermédiaire, changement si pertinent, pondération documentée) traverse les trois secteurs vus.",
  },
  {
    question: "Pourquoi un seuil ou une pondération validés en urbanisme ne se transposent-ils pas automatiquement à l'agriculture ?",
    choices: [
      "Les deux secteurs partagent très exactement la même dynamique temporelle et les mêmes faux positifs typiques, seule la résolution spatiale change",
      "Chaque secteur a sa propre dynamique temporelle et ses propres faux positifs typiques (ex. rotation de cultures normale vs vrai changement d'occupation du sol)",
      "Le calcul du ΔNDBI n'est techniquement pas réalisable sur des parcelles agricoles cultivées, contrairement au tissu urbain où il reste pertinent",
      "Aucun des deux secteurs ne repose réellement sur la télédétection, tous deux s'appuyant exclusivement sur des relevés de terrain traditionnels",
    ],
    correctIndex: 1,
    explanation: "Réutiliser une méthode d'un secteur à l'autre exige de re-calibrer sur une vérité terrain propre au nouveau secteur, jamais de transposer directement un seuil validé ailleurs.",
  },
]
