import type { QuizQuestion } from "./types"

export const vscodeQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi VS Code recommande-t-il d'ouvrir un dossier entier (File > Open Folder) plutôt qu'un seul fichier ?",
    choices: [
      "Parce qu'un fichier isolé ne peut techniquement pas être enregistré dans VS Code",
      "Parce que VS Code est conçu pour travailler sur un projet entier : explorateur, recherche dans tous les fichiers et terminal positionné au bon endroit",
      "Parce qu'un fichier seul ouvre automatiquement une fenêtre en lecture seule",
      "Parce que les extensions ne s'activent que si un dossier complet est ouvert",
    ],
    correctIndex: 1,
    explanation: "Ouvrir le dossier racine du projet donne accès à l'explorateur de fichiers, à la recherche dans tous les fichiers et à un terminal intégré déjà positionné au bon endroit — un simple fichier isolé n'offre aucun de ces bénéfices.",
  },
  {
    question: "Que se passe-t-il si l'on exécute un script alors que son onglet affiche encore un point (modifications non enregistrées) ?",
    choices: [
      "VS Code enregistre automatiquement le fichier juste avant l'exécution",
      "Le script s'exécute dans sa dernière version enregistrée sur le disque, pas dans la version affichée à l'écran",
      "L'exécution est bloquée tant que le fichier n'est pas enregistré manuellement",
      "VS Code affiche un message d'erreur et refuse toute exécution",
    ],
    correctIndex: 1,
    explanation: "Un script est toujours exécuté à partir de sa dernière version enregistrée sur le disque : un onglet marqué par un point (modification non enregistrée) signifie que l'écran et le fichier réellement exécuté peuvent diverger.",
  },
  {
    question: "Pourquoi une erreur `ModuleNotFoundError` peut-elle survenir alors que `pip install geopandas` a réussi sans erreur ?",
    choices: [
      "Parce que geopandas doit systématiquement être réinstallé après chaque redémarrage de VS Code",
      "Parce que l'interpréteur Python actif (barre d'état, Python: Select Interpreter) n'est pas celui dans lequel le module a été installé",
      "Parce que VS Code bloque par défaut l'import de tout module tiers",
      "Parce que geopandas n'est compatible qu'avec l'extension Jupyter, jamais avec un script .py",
    ],
    correctIndex: 1,
    explanation: "Le module est presque toujours bien installé, mais dans un environnement différent de celui sélectionné dans VS Code : vérifier l'interpréteur actif (Python: Select Interpreter) est le premier réflexe avant de réinstaller quoi que ce soit.",
  },
  {
    question: "Dans un notebook Jupyter ouvert dans VS Code, à quoi sert le panneau Variables ?",
    choices: [
      "À afficher la liste des extensions actuellement installées",
      "À lister toutes les variables actives en mémoire (type, valeur), utile pour inspecter un GeoDataFrame intermédiaire sans retaper gdf.head()",
      "À configurer les raccourcis clavier propres à l'extension Jupyter",
      "À afficher l'historique complet des commits Git du projet",
    ],
    correctIndex: 1,
    explanation: "Le panneau Variables liste, cellule après cellule, le contenu réel des variables en mémoire — pratique pour inspecter un résultat intermédiaire sans ajouter une instruction d'affichage à chaque fois.",
  },
  {
    question: "Que permet de faire un point d'arrêt posé dans l'éditeur, une fois le script lancé en mode débogage (F5) ?",
    choices: [
      "Il arrête définitivement le script à cet endroit, sans possibilité de reprendre l'exécution",
      "Il suspend l'exécution à cette ligne précise et permet d'inspecter le contenu réel de chaque variable à cet instant",
      "Il insère automatiquement un print() à l'endroit indiqué avant de continuer l'exécution",
      "Il ne fonctionne que sur des scripts qui ne contiennent aucune fonction",
    ],
    correctIndex: 1,
    explanation: "Un point d'arrêt suspend l'exécution exactement à l'endroit voulu, avec le panneau Variables pour inspecter le contenu réel de chaque variable — une inspection plus précise que de deviner où ça casse avec des print() à retirer ensuite.",
  },
  {
    question: "Quelle différence sépare Step Over (F10) de Step Into (F11) en mode débogage ?",
    choices: [
      "Step Over quitte le débogueur, Step Into le relance depuis le début du script",
      "Step Over exécute la ligne sans entrer dans une fonction appelée, Step Into entre dans cette fonction pour l'inspecter ligne par ligne",
      "Step Over ne fonctionne que sur des scripts Python, Step Into sur tous les langages",
      "Il n'existe aucune différence, les deux touches sont strictement équivalentes",
    ],
    correctIndex: 1,
    explanation: "Step Over avance sans détailler l'intérieur d'une fonction appelée ; Step Into y entre pour l'exécuter pas à pas — deux granularités différentes d'inspection, complétées par Step Out (Shift+F11) pour ressortir d'une fonction.",
  },
  {
    question: "Dans le panneau Source Control (Ctrl+Shift+G), que fait le fait de cliquer sur le « + » à côté d'un fichier modifié ?",
    choices: [
      "Il supprime définitivement le fichier du projet",
      "Il met le fichier en zone de préparation (stage), une étape avant de le committer",
      "Il envoie directement le fichier vers le dépôt distant, sans commit local",
      "Il ouvre le fichier dans un nouvel onglet en lecture seule",
    ],
    correctIndex: 1,
    explanation: "Le bouton + stage le fichier (zone de préparation) avant le commit ; le message de commit se tape ensuite dans le champ dédié, validé par Ctrl+Entrée ou le bouton Commit.",
  },
  {
    question: "À quoi sert un fichier `.vscode/tasks.json` ?",
    choices: [
      "À lister les extensions à installer automatiquement à l'ouverture du projet",
      "À déclarer une ou plusieurs tâches qui exécutent une chaîne de commandes en une seule action (ex. Ctrl+Shift+B)",
      "À définir les raccourcis clavier personnalisés de l'utilisateur",
      "À stocker l'historique des fichiers récemment ouverts",
    ],
    correctIndex: 1,
    explanation: "tasks.json déclare des tâches (commandes shell) déclenchables en une seule action, potentiellement enchaînées via dependsOn — l'équivalent VS Code d'un traitement par lot, appliqué à des commandes plutôt qu'à des fichiers de données.",
  },
  {
    question: "Quelle est la différence essentielle entre Remote-SSH et Dev Containers ?",
    choices: [
      "Remote-SSH exécute l'éditeur sur un serveur distant réel, Dev Containers ouvre le projet dans un conteneur Docker défini par le projet lui-même",
      "Remote-SSH ne fonctionne que sous Windows, Dev Containers uniquement sous Linux",
      "Dev Containers ne permet aucune exécution de code, seulement l'édition de texte",
      "Les deux extensions font exactement la même chose, sous des noms différents",
    ],
    correctIndex: 0,
    explanation: "Remote-SSH connecte VS Code à un vrai serveur distant (calcul lourd, cluster) ; Dev Containers garantit un environnement Docker identique pour tous les contributeurs, local ou distant, décrit par devcontainer.json.",
  },
  {
    question: "Pourquoi exclure typiquement `*.tif` et `/data/raw/` dans le `.gitignore` d'un projet géomatique ?",
    choices: [
      "Parce que Git refuse techniquement de suivre tout fichier raster, quelle que soit sa taille",
      "Parce qu'un dépôt Git gère mal de gros fichiers binaires répétés, régénérables ou téléchargeables séparément plutôt qu'à versionner",
      "Parce que ces fichiers contiennent systématiquement des informations personnelles sensibles",
      "Parce que VS Code ne peut pas afficher l'aperçu d'un fichier .tif dans l'éditeur",
    ],
    correctIndex: 1,
    explanation: "Un dépôt Git classique gère mal des rasters volumineux répétés à chaque version ; les exclure (et les stocker à part, ou via Git LFS si un raster de référence doit malgré tout être suivi) évite qu'un dépôt ne gonfle démesurément.",
  },
]
