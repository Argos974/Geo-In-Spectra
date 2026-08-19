import type { QuizQuestion } from "./types"

export const methodologieQuiz: QuizQuestion[] = [
  {
    question: "Quelle est la différence entre décrire et analyser un document géographique ?",
    choices: [
      "Décrire consiste à énumérer les éléments observés dans un ordre précis ; analyser consiste à les classer par importance",
      "Décrire énumère ce qui est visible sur le document ; analyser explique pourquoi, en reliant les éléments entre eux",
      "Décrire reste factuel et neutre ; analyser consiste surtout à exprimer une opinion personnelle sur le document",
      "Décrire porte sur les données chiffrées ; analyser porte uniquement sur le commentaire des sources bibliographiques",
    ],
    correctIndex: 1,
    explanation: "\"On observe une zone urbanisée\" décrit. \"Cette urbanisation s'explique par la proximité de l'axe routier\" analyse. C'est ce second niveau qui est évalué comme une vraie compétence.",
  },
  {
    question: "Une bonne problématique de dissertation doit surtout :",
    choices: [
      "Reformuler fidèlement les termes du sujet sous forme de question, sans chercher à les interpréter",
      "Mettre en tension deux idées ou logiques opposées, sans qu'une réponse s'impose d'emblée",
      "Annoncer clairement dès l'introduction la thèse que l'on compte défendre en conclusion",
      "Suivre la formulation type imposée par le jury, identique pour tous les sujets du concours",
    ],
    correctIndex: 1,
    explanation: "Une problématique reformulée à l'identique du sujet ne permet pas de construire un plan démonstratif : il faut une tension réelle entre deux idées à trancher.",
  },
  {
    question: "Dans un rapport technique SIG, pourquoi séparer strictement résultats et discussion ?",
    choices: [
      "Les regrouper facilite la lecture, à condition de bien signaler quand on passe de l'un à l'autre",
      "Pour éviter que le lecteur confonde ce qui a été mesuré objectivement et ce que l'auteur en interprète",
      "Parce que les normes de présentation des rapports techniques SIG l'imposent de façon formelle",
      "Pour respecter le nombre de pages minimal généralement exigé dans un rapport technique universitaire",
    ],
    correctIndex: 1,
    explanation: "Séparer nettement les faits mesurés (résultats) de leur interprétation (discussion) est une exigence de rigueur scientifique, pas une convention arbitraire de mise en page.",
  },
  {
    question: "En épreuve de cartographie thématique de concours, une carte est sanctionnée si :",
    choices: [
      "Le fond de carte choisi manque d'harmonie esthétique par rapport au sujet traité, même si le figuré est correct",
      "La sémiologie graphique retenue n'est pas adaptée au type de donnée représentée (quantité, catégorie, etc.)",
      "La palette de couleurs utilisée s'écarte des conventions habituelles du domaine cartographié",
      "La carte a été réalisée à la main plutôt qu'à l'aide d'un logiciel de cartographie numérique",
    ],
    correctIndex: 1,
    explanation: "Le choix sémiologique (ronds proportionnels pour une donnée absolue, dégradé de couleur pour une donnée relative, par exemple) fait partie de la réponse évaluée, pas seulement de sa présentation.",
  },
  {
    question: "Selon la sémiologie graphique de Bertin, quelle variable visuelle convient à une donnée quantitative continue (ex. un taux) ?",
    choices: [
      "La couleur (teinte), qui permet de distinguer des catégories sans hiérarchie entre elles",
      "La valeur (un dégradé clair à foncé d'une même teinte) ou la taille des symboles",
      "La forme du symbole, avec un pictogramme distinct choisi pour chaque classe de valeurs",
      "L'orientation du figuré (hachures ou trames orientées selon la direction du phénomène)",
    ],
    correctIndex: 1,
    explanation: "Une donnée ordonnée doit être portée par une variable qui a elle-même un ordre perceptif (valeur, taille) : une succession de teintes qualitatives sans ordre naturel brouille la lecture d'une quantité.",
  },
  {
    question: "Un plan dialectique (thèse / antithèse / synthèse) convient particulièrement à un sujet :",
    choices: [
      "Un sujet qui invite à explorer plusieurs dimensions indépendantes d'un même phénomène",
      "Un sujet formulé comme une question fermée ou portant un débat explicite à trancher",
      "Un sujet purement chronologique, à traiter période par période sans tension entre les idées",
      "Un sujet régional, où la description du territoire prime sur toute mise en perspective",
    ],
    correctIndex: 1,
    explanation: "Le plan dialectique répond à un sujet qui pose un débat (\"le satellite peut-il remplacer le terrain ?\") ; un plan thématique convient mieux à l'exploration de plusieurs aspects d'un même phénomène.",
  },
  {
    question: "Selon la sémiologie de Bertin, quelle variable visuelle convient à une donnée qualitative SANS ordre (ex. type d'occupation du sol) ?",
    choices: [
      "La taille, exprimée par des ronds proportionnels dont la surface varie selon la catégorie",
      "La valeur, obtenue par un dégradé du clair vers le foncé au sein d'une même teinte de base",
      "La couleur, c'est-à-dire une teinte différente pour chaque catégorie sans hiérarchie entre elles",
      "L'orientation du figuré, avec des hachures dont l'angle change selon la catégorie",
    ],
    correctIndex: 2,
    explanation: "La couleur (teinte) n'a pas d'ordre perceptif naturel, adaptée à une catégorie sans hiérarchie (forêt, culture, bâti). Taille et valeur, elles, portent une notion d'ordre ou de quantité.",
  },
  {
    question: "Pour calibrer précisément le niveau d'exigence attendu à un concours d'enseignement (CAPES/Agrégation), la ressource la plus utile est :",
    choices: [
      "Un manuel scolaire généraliste couvrant l'ensemble du programme officiel du concours",
      "Les rapports de jury publiés après chaque session, qui détaillent précisément les attentes",
      "Un forum d'entraide en ligne où d'anciens candidats partagent leurs impressions sur l'épreuve",
      "Les annales corrigées vendues dans le commerce, reprenant les sujets des sessions précédentes",
    ],
    correctIndex: 1,
    explanation: "Les rapports de jury détaillent précisément ce qui a été valorisé et sanctionné lors de la session, une information bien plus calibrée qu'un manuel générique.",
  },
  {
    question: "Dans la structure IMRaD d'un mémoire de recherche, la section Discussion doit :",
    choices: [
      "Présenter à nouveau les données obtenues, sans y ajouter d'interprétation supplémentaire",
      "Interpréter les résultats obtenus, les comparer à la littérature existante, et en discuter les limites",
      "Reprendre et développer plus longuement le contenu déjà présenté dans l'introduction du mémoire",
      "Se concentrer uniquement sur l'analyse statistique des données, sans convoquer la littérature existante",
    ],
    correctIndex: 1,
    explanation: "La Discussion interprète et met en perspective (littérature, limites) ; c'est la section Résultats, séparée, qui présente les données sans interprétation.",
  },
  {
    question: "Une valeur de p (p-value) mesure :",
    choices: [
      "La probabilité que l'hypothèse étudiée (l'effet recherché) soit réellement vraie compte tenu des données",
      "La probabilité d'observer un résultat au moins aussi extrême que celui obtenu, si l'hypothèse nulle était vraie",
      "Le pourcentage de la variance totale de la variable dépendante expliqué par le modèle statistique retenu",
      "La taille minimale d'échantillon requise pour que des résultats soient jugés dignes d'être publiés",
    ],
    correctIndex: 1,
    explanation: "Erreur d'interprétation très fréquente : p < 0.05 ne prouve pas que l'effet étudié est réel, seulement qu'un résultat aussi extrême serait rare sous l'hypothèse \"aucun effet\".",
  },
]
