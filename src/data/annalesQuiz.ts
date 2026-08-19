import type { QuizQuestion } from "@/data/quizzes/types"

/**
 * QCM d'entraînement au FORMAT de chaque famille de concours — jamais des
 * sujets réels reproduits (voir la note de AnnalesPage.tsx sur ce choix
 * délibéré). Questions originales, écrites pour ce site, qui testent la
 * posture méthodologique attendue par chaque type d'épreuve plutôt que du
 * contenu factuel daté (durées, coefficients…) qui changerait d'une session
 * à l'autre et que ce site n'a aucun moyen de garantir à jour.
 */
export const annalesQuiz: Record<string, QuizQuestion[]> = {
  "capes-agregation": [
    {
      question: "À l'épreuve de cartographie thématique d'un concours d'enseignement, un jury sanctionne en priorité :",
      choices: [
        "Une carte esthétiquement soignée mais à la sémiologie inadaptée à la donnée",
        "Une carte au trait légèrement irrégulier mais sémiologiquement correcte",
        "Les deux sont sanctionnées à parts strictement égales dans tous les cas",
        "Aucune des deux, seule l'exhaustivité de la légende compte",
      ],
      correctIndex: 0,
      explanation: "Le choix sémiologique (variable visuelle adaptée au type de donnée) fait partie de la réponse évaluée, pas seulement de sa mise en forme — voir Méthodes, section 4.",
    },
    {
      question: "Une dissertation de concours qui reformule le sujet à l'identique en guise de problématique risque surtout :",
      choices: [
        "De perdre des points pour longueur insuffisante",
        "De ne pas démontrer de tension réelle, donc de ne pas justifier un plan progressif",
        "Rien, la reformulation est la méthode attendue",
        "D'être jugée hors sujet automatiquement",
      ],
      correctIndex: 1,
      explanation: "Une problématique qui ne fait que reformuler le sujet ne met rien en tension, ce qui rend impossible un plan réellement démonstratif — voir Méthodes, section 2.",
    },
    {
      question: "À l'oral d'un concours, face à une question précise du jury, le réflexe le plus utile est :",
      choices: [
        "Enchaîner directement sur l'exposé préparé sans en tenir compte",
        "Reformuler brièvement la question avant d'y répondre",
        "Demander systématiquement à en changer",
        "Répondre uniquement par oui ou par non",
      ],
      correctIndex: 1,
      explanation: "Reformuler vérifie la bonne compréhension et laisse au jury l'occasion de préciser — un geste simple souvent négligé sous la pression du temps (Méthodes, section 6).",
    },
    {
      question: "Pour calibrer le niveau d'exigence réellement attendu à un concours donné, la ressource la plus fiable est :",
      choices: [
        "Un manuel scolaire générique, non spécifique au concours",
        "Les rapports de jury de sessions précédentes du concours visé",
        "Des impressions glanées sur un forum, sans source",
        "Aucune préparation ciblée n'est utile, seul l'entraînement généraliste compte",
      ],
      correctIndex: 1,
      explanation: "Les rapports de jury détaillent précisément ce qui a été valorisé et sanctionné à la session réelle — plus calibré qu'une ressource générique.",
    },
    {
      question: "Un plan de dissertation où l'on pourrait permuter deux parties sans rien perdre à la démonstration révèle :",
      choices: [
        "Un plan équilibré, c'est un signe de qualité",
        "Un plan qui n'est en réalité pas progressif : il illustre plutôt qu'il ne démontre",
        "Une dissertation trop courte",
        "Rien de particulier, ce test n'a pas de valeur diagnostique",
      ],
      correctIndex: 1,
      explanation: "Un plan réellement démonstratif construit une progression : si l'ordre des parties est interchangeable sans perte de sens, il n'y a pas de vraie progression argumentative.",
    },
  ],
  "bts-mgtmn": [
    {
      question: "Dans un rendu SIG de type BTS, avant tout calcul de surface sur une couche fournie, la première vérification à faire est :",
      choices: [
        "Le nom du fichier",
        "Le système de coordonnées de la couche (projeté métrique, pas géographique)",
        "La couleur de style appliquée à la couche",
        "Le nombre total d'entités, sans plus de détail",
      ],
      correctIndex: 1,
      explanation: "Un calcul de surface sur un système géographique (degrés) ou mal projeté donne un résultat faux, sans message d'erreur explicite — voir module Fondements.",
    },
    {
      question: "Un exercice de calcul topographique qui affiche un résidu très faible sur seulement 3 points de contrôle groupés dans un coin de l'image doit être considéré comme :",
      choices: [
        "Fiable partout sur l'image, un résidu faible suffit à le garantir",
        "Fiable seulement au voisinage des points de contrôle, risqué ailleurs par extrapolation",
        "Automatiquement invalide, à refaire entièrement",
        "Sans rapport avec la répartition des points de contrôle",
      ],
      correctIndex: 1,
      explanation: "Des points de contrôle mal répartis biaisent la confiance qu'on peut accorder au résidu affiché loin d'eux — voir l'exercice équivalent du module Fondements.",
    },
    {
      question: "Un rendu technique qui mélange dans le même paragraphe une donnée mesurée et son interprétation est jugé :",
      choices: [
        "Plus fluide à lire, donc préférable",
        "Moins rigoureux : résultats et discussion doivent être clairement séparés",
        "Sans incidence sur la notation",
        "Le format attendu par défaut en topographie",
      ],
      correctIndex: 1,
      explanation: "Séparer nettement les faits mesurés de leur interprétation est une exigence de rigueur, en topographie comme dans tout rapport technique — voir Méthodes, section 3.",
    },
    {
      question: "Pour un même jeu de points de mesure d'altitude, le krigeage se distingue d'une simple pondération inverse à la distance (IDW) car il fournit en plus :",
      choices: [
        "Un résultat toujours identique à l'IDW",
        "Une carte d'incertitude d'estimation, pas seulement une carte de valeurs",
        "Un gain de vitesse de calcul systématique",
        "Aucune différence pratique",
      ],
      correctIndex: 1,
      explanation: "Le krigeage repose sur un modèle statistique explicite (le variogramme), qui permet de calculer une variance d'estimation en tout point — pas seulement d'interpoler.",
    },
    {
      question: "Deux couches topographiques semblent décalées de plusieurs centaines de mètres, de façon constante dans la même direction partout. La cause la plus probable est :",
      choices: [
        "Une simple différence de style d'affichage",
        "Une confusion de datum géodésique, pas un problème de projection",
        "Un excès de sommets dans l'une des deux géométries",
        "Une erreur d'unité de surface (m² vs ha)",
      ],
      correctIndex: 1,
      explanation: "Un décalage systématique et constant dans une direction unique est la signature typique d'une confusion de datum, à distinguer d'une déformation de projection qui varie selon la position.",
    },
  ],
  "concours-territoriaux": [
    {
      question: "Sur une note de synthèse territoriale mobilisant une carte, la légende doit être organisée :",
      choices: [
        "Dans l'ordre où les figurés viennent à l'esprit",
        "En rubriques thématiques logiques, jamais en vrac",
        "Par ordre alphabétique strict des termes",
        "La légende n'a pas besoin d'organisation particulière",
      ],
      correctIndex: 1,
      explanation: "Une légende organisée en rubriques thématiques appuie une démonstration ; une légende en vrac ne fait qu'énumérer — voir Méthodes, section 5.",
    },
    {
      question: "Une note technique destinée à un décideur pressé doit avant tout permettre :",
      choices: [
        "Une lecture linéaire complète obligatoire, sans consultation partielle possible",
        "Une consultation par sections isolément (résumé et recommandations en priorité)",
        "De ne présenter que des résultats bruts sans aucune synthèse",
        "D'éviter toute mention des limites ou incertitudes de l'étude",
      ],
      correctIndex: 1,
      explanation: "Un rapport technique bien construit se lit dans l'ordre, mais reste consultable par sections : un décideur pressé lira le résumé et les recommandations en priorité.",
    },
    {
      question: "Documenter une incertitude ou une limite méthodologique dans une étude territoriale est perçu comme :",
      choices: [
        "Un aveu de faiblesse à éviter à tout prix",
        "Un signe de rigueur, qui renforce la crédibilité du document",
        "Une information réservée aux annexes, jamais au corps du texte",
        "Superflu si le résultat final semble cohérent",
      ],
      correctIndex: 1,
      explanation: "Un résultat présenté sans ses limites est moins crédible, pas plus, aux yeux d'un lecteur averti — voir Méthodes, section 7.",
    },
    {
      question: "Un indice de Moran calculé sur un taux communal (ex. vacance de logements) proche de 0 signale :",
      choices: [
        "Un fort regroupement spatial de valeurs similaires",
        "Une répartition spatiale proche de l'aléatoire, sans structure marquée",
        "Une erreur de calcul systématique",
        "Une alternance stricte de valeurs opposées entre voisins",
      ],
      correctIndex: 1,
      explanation: "Un Moran proche de 0 indique l'absence de structure spatiale détectable ; proche de +1, un regroupement ; proche de -1, une alternance — voir Le Compas, section 4.",
    },
    {
      question: "Avant de combiner plusieurs couches statistiques en un indice de priorisation territoriale (ex. un indice de risque), une démarche rigoureuse doit surtout :",
      choices: [
        "Les moyenner arithmétiquement sans plus de justification",
        "Documenter explicitement la pondération choisie et sa justification",
        "Ne garder que la couche la plus récente",
        "Convertir toutes les couches en une seule palette de couleurs identique",
      ],
      correctIndex: 1,
      explanation: "Une combinaison non pondérée traite implicitement chaque composante comme d'égale importance, une hypothèse rarement justifiée sans analyse multicritère explicite.",
    },
  ],
}
