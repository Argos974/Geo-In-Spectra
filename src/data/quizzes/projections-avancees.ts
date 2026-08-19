import type { QuizQuestion } from "./types"

export const projectionsAvanceesQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi aucune projection cartographique n'est parfaite ?",
    choices: [
      "C'est une limite purement technologique : avec une puissance de calcul suffisante, on pourrait un jour éliminer toute déformation",
      "Une surface courbe comme celle de la Terre ne peut pas être mise à plat sans déformer les angles, les surfaces ou les distances",
      "C'est une limite de précision des mesures satellitaires ; une géodésie plus fine réduirait ces déformations à zéro",
      "Ce défaut ne touchait que les projections anciennes ; les projections modernes ont résolu le problème et n'introduisent plus de déformation",
    ],
    correctIndex: 1,
    explanation: "C'est un fait géométrique (Theorema Egregium de Gauss) : une surface courbe n'a pas la même courbure qu'un plan, la mettre à plat déforme nécessairement quelque chose.",
  },
  {
    question: "Une projection conforme préserve en priorité :",
    choices: [
      "Les surfaces exactes, comme le fait une projection équivalente",
      "Les angles locaux, et donc la forme des objets à petite échelle, au détriment des surfaces",
      "Les distances réelles dans toutes les directions à partir d'un point central",
      "Un compromis global entre angles, surfaces et distances, sans privilégier aucun critère",
    ],
    correctIndex: 1,
    explanation: "Conforme = angles préservés localement (Lambert-93, Mercator, UTM), au prix des surfaces qui peuvent être fortement déformées.",
  },
  {
    question: "Lambert-93 est une projection :",
    choices: [
      "Cylindrique équivalente, comme celles utilisées pour les cartes thématiques mondiales",
      "Conique conforme, sécante le long de deux parallèles standards situés à 44°N et 49°N",
      "Azimutale stéréographique, centrée sur un point unique proche de Paris",
      "Une simple projection géographique, qui conserve les coordonnées angulaires sans transformation",
    ],
    correctIndex: 1,
    explanation: "Le cône coupe l'ellipsoïde le long de deux parallèles standards, où la déformation d'échelle est nulle ; elle reste minime sur tout le territoire français entre ces deux lignes.",
  },
  {
    question: "Le facteur d'échelle 0,9996 au méridien central de l'UTM sert à :",
    choices: [
      "Corriger une dérive systématique connue des récepteurs GPS aux latitudes moyennes",
      "Répartir la déformation entre le centre et les bords du fuseau de 6°, plutôt que de la concentrer aux bords",
      "Aligner le découpage des fuseaux UTM sur celui des fuseaux horaires, pour simplifier les conversions",
      "Une valeur conventionnelle historique, conservée par continuité mais sans réel effet sur la précision actuelle",
    ],
    correctIndex: 1,
    explanation: "Un facteur légèrement inférieur à 1 au centre du fuseau permet à l'échelle réelle de rester proche de 1 sur toute la largeur du fuseau, bords compris.",
  },
  {
    question: "Pourquoi ne faut-il pas mesurer une surface directement sur des données en Web Mercator (EPSG:3857) ?",
    choices: [
      "Ce système ne stocke pas de coordonnées métriques exploitables, les calculs de surface y sont donc impossibles",
      "La déformation de surface y croît fortement avec la latitude, jusqu'à diverger près des pôles",
      "Ce système n'est officiellement prévu que pour l'affichage web, les données y sont toujours reprojetées avant tout stockage",
      "En pratique l'erreur reste négligeable aux échelles habituelles de travail, l'avertissement est surtout théorique",
    ],
    correctIndex: 1,
    explanation: "Web Mercator est conforme, pas équivalente : les surfaces y sont d'autant plus exagérées que la latitude est élevée. Une reprojection vers un système adapté est nécessaire avant tout calcul de surface.",
  },
  {
    question: "Un datum géodésique et une projection cartographique sont :",
    choices: [
      "Deux termes désignant le même concept, employés indifféremment selon les logiciels SIG",
      "Deux éléments distincts : le datum est le modèle de référence de la Terre, la projection est la transformation vers un plan",
      "Le datum ne s'applique qu'aux données GPS brutes, la projection ne concerne que la représentation imprimée",
      "Le datum a été remplacé par la projection lors du passage au système RGF93, il n'a plus d'existence propre",
    ],
    correctIndex: 1,
    explanation: "Reprojeter sans transformer le datum sous-jacent laisse un décalage résiduel, souvent de plusieurs centaines de mètres pour un ancien système comme la NTF.",
  },
  {
    question: "Un décalage constant, dans la même direction et de la même ampleur partout entre deux couches, est un symptôme typique de :",
    choices: [
      "Une erreur d'arrondi accumulée lors des calculs, sans cause géodésique particulière",
      "Une confusion de datum géodésique, par exemple des coordonnées NTF non transformées vers RGF93",
      "Un choix de projection différent entre les deux couches, qui produirait ce même type de décalage uniforme",
      "Un simple défaut de rendu du logiciel SIG, qui n'affecte pas les coordonnées réellement stockées"
    ],
    correctIndex: 1,
    explanation: "Contrairement à une déformation de projection (variable selon la position), une confusion de datum produit un décalage systématique et constant.",
  },
  {
    question: "Pour comparer rigoureusement des surfaces de déforestation à l'échelle mondiale, quelle famille de projection choisir ?",
    choices: [
      "Une projection conforme comme Mercator, qui garantit des angles fidèles utiles pour comparer des surfaces",
      "Une projection équivalente, comme Albers ou Mollweide, qui conserve les surfaces réelles sur toute la carte",
      "N'importe quelle projection standard, les écarts de surface restant négligeables à l'échelle mondiale",
      "Uniquement Lambert-93, qui reste fiable pour les surfaces à toutes les latitudes et longitudes",
    ],
    correctIndex: 1,
    explanation: "Seule une projection équivalente garantit qu'un même nombre de km² représente la même surface réelle partout sur la carte, condition nécessaire à une comparaison de surfaces valide.",
  },
  {
    question: "Pourquoi l'UTM plutôt que Lambert-93 pour un projet hors de France ?",
    choices: [
      "L'UTM offre intrinsèquement une précision supérieure à Lambert-93, quelle que soit la zone considérée",
      "Lambert-93 est un système spécifiquement calé sur la France métropolitaine, l'UTM est un standard international par zones de 6°",
      "Lambert-93 n'est compatible qu'avec les logiciels SIG de bureau, pas avec les récepteurs GPS de terrain",
      "Les deux systèmes sont équivalents et interchangeables sur n'importe quelle zone du globe",
    ],
    correctIndex: 1,
    explanation: "Lambert-93 est optimisé pour l'étendue et la latitude du territoire français ; hors de cette zone, il n'offre plus les mêmes garanties de faible déformation.",
  },
  {
    question: "Que faut-il vérifier en priorité avant tout calcul de distance ou de surface dans un SIG ?",
    choices: [
      "Uniquement que le fond de carte de référence s'affiche correctement à l'écran",
      "Que toutes les couches utilisent un système projeté métrique et partagent le même datum géodésique",
      "Que les fichiers de données utilisent bien le format shapefile (.shp) plutôt qu'un autre format",
      "Rien de particulier, les logiciels SIG modernes reprojettent et harmonisent tout automatiquement",
    ],
    correctIndex: 1,
    explanation: "Un système géographique (degrés) ou un datum mal aligné entre couches produit des résultats faux, même si l'affichage semble correct grâce à la reprojection à la volée.",
  },
]
