import type { ContentBlock } from "./types"

export const vscodeContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Visual Studio Code (VS Code) est un éditeur de code gratuit, open-source et multiplateforme, développé par Microsoft. Il n'est pas un logiciel de géomatique en soi — contrairement à QGIS ou TerrSet — mais il est devenu l'environnement de travail standard pour écrire, déboguer et versionner les scripts Python (GeoPandas, PyQGIS, rasterio…) et R qui automatisent les traitements présentés dans les modules Le Compas et travaux pratiques. Ce module en fait un tutoriel complet, en trois pistes (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Installer VS Code et ouvrir un dossier de travail", level: "lycee" },
  {
    type: "list",
    items: [
      "Télécharger VS Code depuis code.visualstudio.com (Windows, macOS ou Linux) : le téléchargement propose automatiquement la bonne version pour le système utilisé",
      "Installer en acceptant les options par défaut (cocher « Ajouter au PATH » sous Windows facilite l'usage en ligne de commande plus tard)",
      "Au premier lancement, VS Code affiche un écran d'accueil (Welcome) avec des raccourcis vers les tutoriels, les paramètres et les thèmes",
      "File > Open Folder… (ou Ctrl+K puis Ctrl+O) : ouvrir un dossier, pas un fichier isolé — VS Code raisonne en « espace de travail » et affiche tout le dossier dans l'explorateur latéral",
    ],
  },
  {
    type: "table",
    headers: ["Système", "Remarque à l'installation"],
    rows: [
      ["Windows", "Cocher « Ajouter au PATH » et « Ouvrir avec Code » (menu clic droit) pendant l'installation"],
      ["macOS", "Glisser l'application dans Dossier Applications, puis Cmd+Shift+P > Shell Command: Install 'code' command in PATH"],
      ["Linux", "Paquet .deb/.rpm officiel, ou dépôt du gestionnaire de paquets de la distribution"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Ouvrir un dossier, pas seulement un fichier",
    text: "Contrairement au Bloc-notes, VS Code est conçu pour travailler sur un projet entier : un dossier contenant un ou plusieurs scripts, des données, un fichier de résultats. Toujours ouvrir le dossier racine du projet (File > Open Folder) plutôt qu'un fichier seul, pour profiter de l'explorateur, de la recherche dans tous les fichiers et du terminal positionné au bon endroit.",
  },

  { type: "heading", text: "2. Anatomie de l'interface", level: "lycee" },
  {
    type: "list",
    items: [
      "Barre d'activité (Activity Bar) : colonne d'icônes tout à gauche — Explorateur (fichiers du dossier ouvert), Recherche (chercher/remplacer dans tous les fichiers), Contrôle de source (Git), Exécution et débogage, Extensions",
      "Explorateur de fichiers : arborescence du dossier ouvert, un clic sur un fichier l'ouvre dans l'éditeur",
      "Éditeur : zone centrale, peut afficher plusieurs fichiers en onglets, ou plusieurs éditeurs côte à côte",
      "Terminal intégré : panneau en bas, un vrai terminal système (PowerShell, bash…) ouvert directement dans le dossier du projet",
      "Barre d'état : tout en bas — langage du fichier actif, encodage, branche Git en cours, erreurs/avertissements",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Retrouver un panneau perdu",
    text: "Si un panneau (explorateur, terminal…) disparaît par erreur, le menu View (Affichage) permet de le rouvrir : View > Explorer, View > Terminal, etc. Rien n'est jamais perdu, seulement masqué.",
  },
  {
    type: "table",
    headers: ["Icône de la barre d'activité", "Panneau ouvert", "Raccourci"],
    rows: [
      ["Explorer (feuilles empilées)", "Arborescence du dossier ouvert", "Ctrl+Shift+E"],
      ["Search (loupe)", "Recherche/remplacement dans tous les fichiers du projet", "Ctrl+Shift+F"],
      ["Source Control (branche)", "Suivi Git : fichiers modifiés, commit, push", "Ctrl+Shift+G"],
      ["Run and Debug (triangle + insecte)", "Lancement et débogage du programme actif", "Ctrl+Shift+D"],
      ["Extensions (carrés empilés)", "Marketplace des extensions", "Ctrl+Shift+X"],
    ],
  },

  { type: "heading", text: "3. Ouvrir, éditer et enregistrer un fichier", level: "lycee" },
  {
    type: "list",
    items: [
      "Cliquer sur un fichier dans l'explorateur pour l'ouvrir dans l'éditeur (un clic simple l'ouvre en aperçu, un double-clic l'épingle dans un onglet permanent)",
      "Taper du texte comme dans n'importe quel éditeur ; un point dans l'onglet du fichier signale des modifications non enregistrées",
      "Ctrl+S (Cmd+S sur macOS) enregistre le fichier actif",
      "La coloration syntaxique (mots-clés, chaînes de caractères, commentaires dans des couleurs différentes) s'applique automatiquement selon l'extension du fichier (.py, .r, .md…) et facilite la relecture",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un fichier non enregistré n'est pas exécuté à jour",
    text: "Lancer un script pendant que son onglet affiche encore un point (modification non enregistrée) exécute la dernière version enregistrée sur le disque, pas ce qui est affiché à l'écran. Toujours enregistrer (Ctrl+S) avant d'exécuter.",
  },

  { type: "heading", text: "4. Le terminal intégré", level: "lycee" },
  {
    type: "list",
    items: [
      "Ctrl+` (accent grave, sous la touche Échap) ouvre ou referme le terminal intégré",
      "Le terminal s'ouvre déjà positionné dans le dossier du projet : pas besoin de naviguer avec cd",
      "Taper une commande et valider avec Entrée, par exemple : python mon_script.py",
      "Le terminal affiche directement la sortie du script (print(), erreurs) dans le même panneau",
    ],
  },
  {
    type: "formula",
    label: "Lancer un script Python depuis le terminal intégré",
    formula: "python mon_script.py",
    note: "Sous Windows, la commande peut être python ou py selon l'installation ; sous macOS/Linux, souvent python3. Le script doit se trouver dans le dossier ouvert (ou son chemin complet doit être précisé).",
  },
  {
    type: "table",
    headers: ["Commande", "Effet"],
    rows: [
      ["python --version", "Affiche la version de Python active dans ce terminal"],
      ["cd nom_dossier", "Change de dossier courant (rarement nécessaire : le terminal s'ouvre déjà au bon endroit)"],
      ["dir (Windows) / ls (macOS-Linux)", "Liste les fichiers du dossier courant"],
      ["pip install nom_module", "Installe une bibliothèque Python (ex. pip install geopandas)"],
      ["python mon_script.py", "Exécute le script indiqué"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un terminal intégré ouvert n'est pas toujours le bon",
    text: "Plusieurs terminaux peuvent être ouverts en même temps (menu déroulant en haut à droite du panneau Terminal). Vérifier lequel est actif avant de taper une commande évite de lancer un script dans le mauvais dossier ou avec le mauvais interpréteur.",
  },

  { type: "heading", text: "5. Les extensions et le Marketplace", level: "lycee" },
  {
    type: "paragraph",
    text: "VS Code, seul, est un éditeur de texte généraliste. Ce sont les extensions qui lui ajoutent la compréhension d'un langage précis : autocomplétion, détection d'erreurs, exécution en un clic. Le Marketplace est la boutique en ligne, gratuite, où ces extensions se téléchargent.",
  },
  {
    type: "list",
    items: [
      "Cliquer sur l'icône Extensions dans la barre d'activité (ou Ctrl+Shift+X)",
      "Taper « Python » dans la barre de recherche",
      "Installer l'extension officielle Python, éditée par Microsoft (icône bleu/jaune, très grand nombre d'installations) : ne pas confondre avec d'autres extensions au nom proche",
      "Une fois installée, un fichier .py ouvert affiche automatiquement la coloration syntaxique Python et un bouton d'exécution en haut à droite de l'éditeur",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Vérifier l'éditeur de l'extension avant d'installer",
    text: "Le Marketplace contient des milliers d'extensions ; plusieurs peuvent porter un nom proche pour un même langage. Vérifier la mention « Microsoft » (ou un éditeur reconnu) et le nombre d'installations avant d'installer une extension, comme on vérifierait la source d'une donnée téléchargée.",
  },

  { type: "heading", text: "6. Exécuter un script Python depuis VS Code", level: "lycee" },
  {
    type: "list",
    items: [
      "Ouvrir un fichier .py dans l'éditeur",
      "Cliquer sur le bouton triangle « Run Python File » en haut à droite de l'éditeur (ou clic droit dans l'éditeur > Run Python File in Terminal)",
      "VS Code ouvre automatiquement un terminal et y lance la commande python correspondante",
      "Le résultat (print(), erreurs éventuelles) s'affiche directement dans ce terminal",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "Un script mon_script.py qui contient print(\"Bonjour\") affiche Bonjour dans le terminal intégré dès qu'on clique sur Run Python File — exactement le même résultat qu'en tapant python mon_script.py à la main, mais en un clic plutôt qu'une commande à retenir.",
  },
  {
    type: "devoir",
    format: "Prise en main",
    title: "Installer VS Code et exécuter un premier script",
    prompt: "Installe VS Code, installe l'extension Python (Microsoft), puis crée un dossier de travail contenant un fichier mon_script.py avec une ligne print(\"Bonjour\"). Exécute-le avec le bouton Run Python File, vérifie le résultat dans le terminal intégré, puis modifie le texte affiché (par exemple print(\"Bonjour, VS Code\")) et exécute à nouveau pour vérifier que le nouveau résultat s'affiche.",
    criteria: [
      "L'extension Python (Microsoft) est installée et active",
      "Le script s'exécute sans erreur via le bouton Run Python File",
      "Le résultat affiché dans le terminal change après la modification de la ligne print()",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : VS Code s'ouvre sur un dossier (File > Open Folder), pas un fichier isolé ; la barre d'activité donne accès à l'explorateur, la recherche, Git, le débogueur et les extensions ; Ctrl+S enregistre, Ctrl+` ouvre le terminal intégré déjà positionné dans le projet ; les extensions (Marketplace, Ctrl+Shift+X) ajoutent la prise en charge d'un langage — l'extension Python de Microsoft est la référence ; un script s'exécute en un clic via le bouton Run Python File.",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Continuer : automatiser un traitement SIG avec Python",
    description: "Le module Le Compas (section 6) présente PyQGIS et GeoPandas, les bibliothèques Python que VS Code sert justement à écrire et exécuter.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. L'extension Python en profondeur", level: "superieur" },
  {
    type: "paragraph",
    text: "Un script géomatique dépend presque toujours de bibliothèques externes (GeoPandas, rasterio, PyQGIS) installées dans un environnement Python précis — souvent un environnement virtuel dédié au projet, distinct de l'installation Python du système. VS Code doit savoir lequel utiliser.",
  },
  {
    type: "list",
    items: [
      "Palette de commandes (Ctrl+Shift+P) > taper « Python: Select Interpreter » : liste tous les environnements Python détectés sur la machine (installation système, environnements virtuels venv, environnements conda)",
      "L'interpréteur sélectionné s'affiche dans la barre d'état en bas ; c'est lui qui est utilisé par le bouton Run, le terminal intégré ouvert ensuite, et l'autocomplétion",
      "Un environnement virtuel mal sélectionné explique la majorité des erreurs « ModuleNotFoundError » alors que le module est pourtant installé — installé, mais dans un autre environnement que celui actif",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une erreur ModuleNotFoundError n'est pas toujours un module manquant",
    text: "import geopandas qui échoue alors que pip install geopandas a réussi vient presque toujours d'un interpréteur mal sélectionné : le module est installé dans un environnement, VS Code exécute avec un autre. Vérifier l'interpréteur actif (barre d'état, ou Python: Select Interpreter) est le premier réflexe avant de réinstaller quoi que ce soit.",
  },
  {
    type: "list",
    items: [
      "Linting : détection d'erreurs et de style avant même l'exécution, soulignées directement dans l'éditeur (extension Ruff ou Pylance, incluse avec l'extension Python)",
      "Formatage automatique : réécrit le code selon une convention de style cohérente (espaces, longueur de ligne) sans en changer le comportement — Black ou Ruff formatter, déclenché manuellement (Shift+Alt+F) ou automatiquement à l'enregistrement",
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "Pylance",
        points: [
          "Moteur d'analyse installé avec l'extension Python (Microsoft)",
          "Autocomplétion, vérification de types, navigation (aller à la définition)",
          "Souligne les erreurs probables avant toute exécution",
        ],
      },
      {
        label: "Ruff",
        points: [
          "Linter et formateur très rapide (écrit en Rust), remplace souvent Flake8 + Black à lui seul",
          "Signale les imports inutilisés, variables non utilisées, style non conforme (PEP 8)",
          "Peut reformater tout le fichier en un raccourci ou à chaque enregistrement",
        ],
      },
    ],
  },
  {
    type: "formula",
    label: "Activer le formatage automatique à l'enregistrement pour Python",
    formula: "\"[python]\": { \"editor.formatOnSave\": true, \"editor.defaultFormatter\": \"charliermarsh.ruff\" }",
    note: "À ajouter dans settings.json (Ctrl+Shift+P > Preferences: Open User Settings (JSON)) : reformate automatiquement le fichier Python à chaque Ctrl+S, avec Ruff comme formateur.",
  },

  { type: "heading", text: "2. L'extension Jupyter : notebooks dans VS Code", level: "superieur" },
  {
    type: "paragraph",
    text: "Un notebook Jupyter (fichier .ipynb) mélange cellules de code exécutables et cellules de texte, avec un résultat affiché immédiatement sous chaque cellule — pratique pour explorer un jeu de données pas à pas, sans tout relancer depuis le début à chaque modification.",
  },
  {
    type: "list",
    items: [
      "Installer l'extension Jupyter (Microsoft) depuis le Marketplace, en complément de l'extension Python",
      "Créer un fichier .ipynb (ou Ctrl+Shift+P > Jupyter: Create New Jupyter Notebook) : chaque cellule s'exécute indépendamment avec Shift+Entrée",
      "Le résultat d'une cellule (texte, tableau, graphique matplotlib) s'affiche directement sous elle, sans quitter l'éditeur",
      "Le panneau Variables (bouton en haut du notebook) liste toutes les variables actives en mémoire — leur type, leur valeur, très utile pour inspecter un GeoDataFrame intermédiaire sans taper gdf.head() à chaque fois",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret : inspecter un GeoDataFrame cellule par cellule",
    text: "Une première cellule charge gdf = gpd.read_file(\"parcelles.gpkg\") et l'exécute (Shift+Entrée) ; une deuxième cellule, exécutée seule sans relancer la première, affiche gdf.plot() ou gdf.head() pour vérifier le résultat immédiatement — puis, si une colonne manque, on modifie uniquement la cellule concernée et on la relance, sans recharger tout le fichier depuis le début.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Notebook ou script : quand choisir lequel",
    text: "Un notebook convient à l'exploration (tester une transformation, visualiser un résultat intermédiaire, comparer plusieurs approches côte à côte). Un script .py classique convient à un traitement destiné à être réexécuté tel quel, automatisé ou intégré à une chaîne de production — un notebook exécuté dans le désordre (cellule 5 avant cellule 3) peut donner un résultat qui dépend de l'ordre d'exécution réel, pas de l'ordre affiché à l'écran.",
  },

  { type: "heading", text: "3. Le débogueur : points d'arrêt et exécution pas à pas", level: "superieur" },
  {
    type: "paragraph",
    text: "Multiplier les print() pour comprendre pourquoi un script échoue devient vite ingérable dès que le script dépasse quelques dizaines de lignes : il faut deviner où insérer chaque print(), puis les retirer un par un une fois le problème résolu. Le débogueur intégré remplace cette méthode par une inspection directe, à l'endroit exact où le calcul dérape.",
  },
  {
    type: "list",
    items: [
      "Cliquer dans la marge à gauche d'une ligne (juste à gauche du numéro de ligne) pour poser un point d'arrêt (un point rouge apparaît)",
      "F5 (ou l'icône Exécution et débogage dans la barre d'activité) lance le script en mode débogage : l'exécution se suspend automatiquement au premier point d'arrêt rencontré",
      "Une fois suspendu : le panneau Variables affiche le contenu exact de chaque variable à cet instant précis (un GeoDataFrame, sa géométrie, son CRS)",
      "F10 (Step Over) exécute la ligne courante sans entrer dans une fonction appelée ; F11 (Step Into) entre dans la fonction appelée pour l'inspecter ligne par ligne ; Shift+F11 (Step Out) ressort de la fonction en cours jusqu'à l'appelant",
      "F5 depuis un point d'arrêt reprend l'exécution normale jusqu'au point d'arrêt suivant (ou la fin du script)",
    ],
  },
  {
    type: "table",
    headers: ["Touche", "Action en mode débogage"],
    rows: [
      ["F5", "Lancer le débogage, ou reprendre jusqu'au point d'arrêt suivant"],
      ["F9", "Basculer un point d'arrêt sur la ligne courante (équivalent au clic dans la marge)"],
      ["F10", "Step Over : exécuter la ligne sans entrer dans une fonction appelée"],
      ["F11", "Step Into : entrer dans la fonction appelée"],
      ["Shift+F11", "Step Out : ressortir de la fonction courante"],
      ["Shift+F5", "Arrêter le débogage"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Un point d'arrêt vaut mieux qu'un print()",
    text: "Poser un point d'arrêt suspend le script à l'endroit exact où quelque chose se passe mal et permet d'inspecter le contenu réel de chaque variable — au lieu de deviner où ça casse en semant des print() qu'il faut ensuite retirer un par un. C'est la différence entre chercher une fuite en démontant tout le mur et poser un capteur précisément là où l'humidité apparaît.",
  },
  {
    type: "paragraph",
    text: "Le fichier .vscode/launch.json (créé automatiquement au premier F5, ou via Ctrl+Shift+P > Debug: Add Configuration) définit comment le débogueur doit lancer le script : quel interpréteur, quels arguments, quel dossier de travail.",
  },
  {
    type: "formula",
    label: "Extrait de launch.json pour un script Python",
    formula: "{ \"name\": \"Python: Fichier actuel\", \"type\": \"debugpy\", \"request\": \"launch\", \"program\": \"${file}\", \"console\": \"integratedTerminal\" }",
    note: "${file} désigne le fichier actuellement ouvert dans l'éditeur : cette configuration permet de déboguer n'importe quel script Python ouvert, sans en fixer le nom à l'avance.",
  },

  { type: "heading", text: "4. Git intégré : suivre l'évolution d'un projet", level: "superieur" },
  {
    type: "paragraph",
    text: "Git suit l'historique des modifications d'un projet, fichier par fichier, comme un plan de carte qu'on versionnerait à chaque étape plutôt que d'écraser la version précédente. VS Code intègre Git nativement, sans extension supplémentaire.",
  },
  {
    type: "list",
    items: [
      "Ctrl+Shift+G ouvre le panneau Source Control (Contrôle de source), qui liste tous les fichiers modifiés depuis le dernier commit",
      "Cliquer sur le + à côté d'un fichier pour le mettre en zone de préparation (stage) — ou stage tout d'un coup",
      "Taper un message de commit dans le champ en haut du panneau, puis Ctrl+Entrée (ou le bouton Commit) pour valider ces modifications dans l'historique",
      "Le bouton Sync / Push envoie les commits locaux vers un dépôt distant (GitHub, GitLab…)",
      "Cliquer sur un fichier modifié dans le panneau ouvre une vue de comparaison (diff) côte à côte ou en ligne, avec les suppressions en rouge et les ajouts en vert",
    ],
  },
  {
    type: "table",
    headers: ["Action", "Où, dans VS Code"],
    rows: [
      ["Voir les fichiers modifiés", "Panneau Source Control (Ctrl+Shift+G)"],
      ["Stage un fichier", "Icône + à côté du fichier, dans le panneau Source Control"],
      ["Commit", "Champ de message en haut du panneau, puis Ctrl+Entrée"],
      ["Push / Pull", "Bouton Sync (flèches circulaires) en bas de la fenêtre, ou menu ... du panneau"],
      ["Comparer une version antérieure", "Clic droit sur un fichier > Open Timeline, ou l'extension GitLens"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Résoudre un conflit de fusion directement dans l'éditeur",
    text: "Lors d'un conflit (deux modifications incompatibles sur la même ligne d'un fichier), VS Code affiche directement dans l'éditeur les deux versions en conflit, encadrées de marqueurs <<<<<<<, ======= et >>>>>>>, avec des boutons cliquables « Accept Current Change », « Accept Incoming Change » ou « Accept Both Changes » au-dessus de chaque bloc — pas besoin de retourner en ligne de commande pour éditer les marqueurs à la main.",
  },

  { type: "heading", text: "5. Snippets, raccourcis et palette de commandes", level: "superieur" },
  {
    type: "list",
    items: [
      "Ctrl+Shift+P (Cmd+Shift+P sur macOS) ouvre la palette de commandes : point d'entrée universel pour toute action de VS Code, accessible en tapant son nom plutôt qu'en cherchant un menu",
      "Ctrl+P ouvre rapidement un fichier par son nom, sans passer par l'explorateur",
      "Un snippet est un raccourci qui insère un bloc de code type (ex. taper for puis Tab insère automatiquement une boucle for avec le curseur positionné au bon endroit) ; Ctrl+Shift+P > Snippets: Configure Snippets permet d'en créer des personnalisés",
      "Ctrl+/ commente/décommente la ligne ou la sélection courante ; Alt+↑/↓ déplace la ligne courante vers le haut ou le bas",
    ],
  },
  {
    type: "table",
    headers: ["Raccourci", "Action"],
    rows: [
      ["Ctrl+P", "Ouvrir rapidement un fichier par son nom"],
      ["Ctrl+Shift+P", "Palette de commandes"],
      ["Ctrl+/", "Commenter / décommenter la sélection"],
      ["Alt+↑ / Alt+↓", "Déplacer la ligne courante vers le haut / le bas"],
      ["Ctrl+D", "Sélectionner la prochaine occurrence du mot courant (édition multi-curseur)"],
      ["F2", "Renommer le symbole sous le curseur dans tout le fichier (voire tout le projet, selon le langage)"],
      ["Ctrl+Espace", "Déclencher manuellement l'autocomplétion"],
    ],
  },
  {
    type: "formula",
    label: "Exemple de snippet personnalisé pour GeoPandas",
    formula: "\"Charger un GeoDataFrame\": { \"prefix\": \"gdfread\", \"body\": [\"gdf = gpd.read_file($1)\", \"gdf = gdf.to_crs(epsg=2154)\"] }",
    note: "Défini dans un fichier de snippets Python (Ctrl+Shift+P > Snippets: Configure Snippets > python.json) : taper gdfread puis Tab insère les deux lignes, avec le curseur positionné sur $1 (le chemin du fichier) prêt à être complété.",
  },

  { type: "heading", text: "6. Plusieurs langages dans un même projet", level: "superieur" },
  {
    type: "paragraph",
    text: "Un projet géomatique mélange rarement un seul langage : un script Python de traitement, des requêtes SQL vers une base PostGIS, un fichier README en Markdown pour documenter la démarche. VS Code gère cette diversité par une extension dédiée à chaque langage, toutes actives simultanément dans le même projet.",
  },
  {
    type: "list",
    items: [
      "Extension Python (Microsoft) pour les scripts .py",
      "Extension SQLTools ou PostgreSQL pour écrire et exécuter des requêtes SQL directement dans l'éditeur, avec autocomplétion sur les noms de tables/colonnes",
      "Aperçu Markdown intégré nativement (Ctrl+Shift+V) pour prévisualiser un README.md tel qu'il s'affichera sur GitHub",
      "Chaque extension reste indépendante : ouvrir un fichier .sql ou .md n'active que l'extension correspondante, sans interférer avec celle utilisée pour les fichiers .py",
    ],
  },
  {
    type: "table",
    headers: ["Type de fichier", "Extension recommandée", "Ce qu'elle apporte"],
    rows: [
      [".py", "Python (Microsoft)", "Coloration, autocomplétion, exécution, linting"],
      [".sql", "SQLTools ou PostgreSQL", "Autocomplétion sur les tables/colonnes, exécution de requêtes"],
      [".md", "Aperçu natif (Ctrl+Shift+V)", "Aucune extension requise, l'aperçu Markdown est intégré"],
      [".json / .yml", "Prise en charge native", "Validation de syntaxe, pliage des sections"],
      [".R", "R (REditorSupport)", "Coloration, exécution, intégration avec radian"],
    ],
  },

  { type: "heading", text: "7. Espaces de travail multi-dossiers et paramètres par projet", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà d'un simple dossier, un espace de travail (workspace) VS Code peut regrouper plusieurs dossiers distincts (par exemple un dossier de scripts et un dossier de données séparé) dans une même fenêtre, sauvegardé dans un fichier .code-workspace.",
  },
  {
    type: "list",
    items: [
      "File > Add Folder to Workspace… ajoute un second dossier à l'espace de travail courant",
      "File > Save Workspace As… enregistre cette configuration dans un fichier .code-workspace, réouvrable en un double-clic",
      "Le dossier .vscode/ à la racine d'un projet contient des paramètres propres à ce projet uniquement (settings.json), qui s'appliquent seulement quand ce dossier est ouvert — sans modifier la configuration globale de VS Code",
    ],
  },
  {
    type: "formula",
    label: "Extrait de .vscode/settings.json : paramètres propres à un projet",
    formula: "{ \"python.defaultInterpreterPath\": \"./venv/bin/python\", \"editor.rulers\": [88] }",
    note: "Ce fichier, versionné avec le projet (contrairement aux paramètres utilisateur globaux), fixe l'environnement virtuel à utiliser et une règle visuelle à 88 caractères : partagé avec toute personne qui clone le projet, la configuration reste identique pour tout le monde.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : Python: Select Interpreter choisit l'environnement virtuel actif, source la plus fréquente d'un ModuleNotFoundError trompeur ; l'extension Jupyter exécute un notebook .ipynb cellule par cellule avec un explorateur de variables ; le débogueur (point d'arrêt, F10/F11, launch.json) inspecte une variable précisément là où ça casse, plutôt que par des print() ; le panneau Source Control (Ctrl+Shift+G) gère stage/commit/push et affiche les conflits de fusion directement dans l'éditeur ; la palette de commandes (Ctrl+Shift+P) est le point d'entrée universel ; .vscode/settings.json fixe des paramètres propres à un projet, versionnés avec lui.",
    ],
  },
  {
    type: "link",
    to: "/module/outils-sig",
    label: "Pratiquer : les scripts GeoPandas et PyQGIS édités dans VS Code",
    description: "Le module Le Compas (section 6) détaille PyQGIS et GeoPandas : les bibliothèques que cet environnement sert précisément à écrire, déboguer et versionner.",
  },
  {
    type: "link",
    to: "/module/programmation-r",
    label: "Voir aussi : R dans VS Code",
    description: "Le module De l'Instrument et du Nombre présente R ; la piste Master de ce module montre comment l'exécuter directement dans VS Code, aux côtés de Python.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Automatiser une chaîne de commandes avec tasks.json", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un traitement complet enchaîne souvent plusieurs commandes distinctes : lancer un script de prétraitement, exécuter les tests, générer un export final. Retaper cette suite à chaque fois est aussi risqué que refaire une chaîne de clics QGIS à la main. Le fichier .vscode/tasks.json déclare une tâche (task) qui exécute cette suite en une seule action.",
  },
  {
    type: "formula",
    label: "Extrait de .vscode/tasks.json : une tâche personnalisée",
    formula: "{ \"label\": \"Exporter les résultats\", \"type\": \"shell\", \"command\": \"python export.py --format geojson\", \"group\": { \"kind\": \"build\", \"isDefault\": true } }",
    note: "Créée via Ctrl+Shift+P > Tasks: Configure Task, puis déclenchée ensuite par Ctrl+Shift+B (tâche de build par défaut) ou Ctrl+Shift+P > Tasks: Run Task pour choisir parmi plusieurs tâches déclarées.",
  },
  {
    type: "list",
    items: [
      "Une tâche peut enchaîner plusieurs commandes (dependsOn) : par exemple lancer les tests avant l'export, et annuler l'export si les tests échouent",
      "Une tâche peut aussi surveiller un fichier de sortie et se relancer automatiquement (problemMatcher, isBackground) — utile pour un serveur de développement local ou un export qui s'actualise en continu",
    ],
  },
  {
    type: "table",
    headers: ["Champ de tasks.json", "Rôle"],
    rows: [
      ["label", "Nom affiché de la tâche dans la liste (Tasks: Run Task)"],
      ["type", "\"shell\" (commande système) ou \"process\" (exécutable lancé directement)"],
      ["command", "La commande exécutée, identique à ce qu'on taperait dans le terminal"],
      ["group", "Catégorie (\"build\", \"test\") ; isDefault: true la lie à Ctrl+Shift+B"],
      ["dependsOn", "Liste d'autres tâches à exécuter avant celle-ci"],
      ["problemMatcher", "Motif qui relie la sortie de la commande aux erreurs affichées dans l'éditeur"],
    ],
  },

  { type: "heading", text: "2. Environnements distants : Remote-SSH et Dev Containers", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un traitement lourd (classification sur une image satellite de plusieurs Go, entraînement d'un modèle) dépasse souvent les capacités d'un poste personnel et doit s'exécuter sur un serveur de calcul distant ou un cluster. VS Code peut piloter ce calcul distant sans jamais quitter l'interface locale.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Remote-SSH",
        points: [
          "Extension Microsoft qui connecte VS Code à un serveur distant via SSH",
          "L'éditeur, le terminal et le débogueur s'exécutent réellement sur le serveur distant — seule l'interface reste locale",
          "Adapté à un cluster de calcul universitaire ou un serveur cloud où les données volumineuses résident déjà",
        ],
      },
      {
        label: "Dev Containers",
        points: [
          "Extension Microsoft qui ouvre le projet à l'intérieur d'un conteneur Docker défini par le projet lui-même",
          "Garantit un environnement strictement identique (versions de Python, de GDAL, de bibliothèques) pour tous les contributeurs, indépendamment de leur machine",
          "Le fichier .devcontainer/devcontainer.json décrit l'image Docker et les extensions à installer automatiquement à l'ouverture",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Remote-SSH n'est pas un simple transfert de fichiers",
    text: "À la différence d'un client FTP qui copierait des fichiers, Remote-SSH exécute réellement l'éditeur et ses extensions côté serveur : ouvrir un notebook Jupyter en Remote-SSH lance le noyau Python sur le serveur distant, pas sur le poste local — c'est cette exécution distante, pas seulement l'affichage, qui permet de traiter des données trop volumineuses pour un poste personnel.",
  },
  {
    type: "paragraph",
    text: "Sous Windows, une troisième option locale existe : WSL (Windows Subsystem for Linux), un vrai environnement Linux intégré au système. L'extension WSL de VS Code ouvre un projet directement à l'intérieur de cette distribution Linux, utile quand une bibliothèque géomatique (GDAL, certaines dépendances compilées) s'installe plus simplement sous Linux que nativement sous Windows.",
  },
  {
    type: "table",
    headers: ["Solution", "Où s'exécute le code", "Cas d'usage typique"],
    rows: [
      ["Remote-SSH", "Sur un serveur ou cluster distant", "Calcul lourd, données déjà présentes sur le serveur"],
      ["Dev Containers", "Dans un conteneur Docker local ou distant", "Environnement identique garanti pour toute l'équipe"],
      ["WSL", "Dans une distribution Linux locale (Windows uniquement)", "Bibliothèques géomatiques plus simples à installer sous Linux"],
    ],
  },

  { type: "heading", text: "3. R, Quarto et l'exécution mixte Python/R", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un projet de recherche géomatique combine parfois Python (traitement, GeoPandas) et R (statistique, cartographie avec sf/tmap, voir le module dédié). VS Code prend en charge les deux dans le même éditeur, sans obliger à changer d'application.",
  },
  {
    type: "list",
    items: [
      "Extension R (REditorSupport) : coloration syntaxique, autocomplétion et exécution de scripts .R",
      "radian, une console R alternative plus riche (coloration, historique multi-lignes) que la console R par défaut, utilisable comme terminal intégré de VS Code à la place de Rterm",
      "Quarto (extension officielle) : successeur de R Markdown, exécute des blocs de code Python et R dans un même document .qmd, produisant un rapport ou une page web unique à partir des deux langages combinés",
      "Un même projet de recherche peut ainsi documenter un prétraitement GeoPandas en Python et une analyse spatiale (autocorrélation, régression) en R, dans deux blocs d'un même document Quarto, sans jongler entre deux éditeurs",
    ],
  },
  {
    type: "formula",
    label: "Extrait d'un document Quarto (.qmd) mêlant Python et R",
    formula: "```{python}\ngdf = gpd.read_file(\"parcelles.gpkg\")\n```\n\n```{r}\nlibrary(sf)\nplot(st_read(\"parcelles.gpkg\"))\n```",
    note: "Deux blocs de code, l'un Python l'autre R, dans le même fichier .qmd : Quarto exécute chacun avec son propre moteur puis assemble un document final unique (HTML, PDF) qui mélange les deux résultats.",
  },
  {
    type: "link",
    to: "/module/programmation-r",
    label: "Approfondir : R, ggplot2 et la cartographie avec sf/tmap",
    description: "Le module De l'Instrument et du Nombre détaille la syntaxe R et son usage géomatique ; ce module montre comment l'exécuter concrètement aux côtés de Python dans VS Code.",
  },

  { type: "heading", text: "4. Git avancé dans VS Code", level: "approfondissement" },
  {
    type: "list",
    items: [
      "Rebase interactif (via l'extension GitLens, ou Ctrl+Shift+P > Git: Rebase) : réécrit l'historique local avant de le publier — fusionner plusieurs commits de correction mineurs en un seul, réordonner des commits — jamais sur une branche déjà partagée avec d'autres",
      "Gestion de branches directement depuis le panneau Source Control : créer, basculer (checkout), fusionner (merge) une branche sans quitter l'éditeur ni retourner en ligne de commande",
      "GitLens (extension tierce très utilisée) ajoute une annotation en marge de chaque ligne (blame) indiquant qui l'a modifiée en dernier et quand, et un explorateur d'historique par fichier",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Rebase réécrit l'historique : jamais sur une branche partagée",
    text: "Un rebase interactif modifie les identifiants (hash) des commits concernés. Sur une branche déjà poussée et utilisée par d'autres, cela force chacun à resynchroniser son propre historique — source fréquente de confusion. Réserver le rebase interactif à des commits encore purement locaux, jamais publiés.",
  },
  {
    type: "formula",
    label: "Extrait de .gitignore adapté à un projet géomatique",
    formula: "*.tif\n*.tiff\n/data/raw/\n__pycache__/\n.venv/",
    note: "Exclut les rasters volumineux du suivi Git (un dépôt Git gère mal des fichiers binaires de plusieurs centaines de Mo), le dossier de données brutes, et l'environnement virtuel local — chacun régénérable ou téléchargeable séparément, donc inutile à versionner.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Git LFS pour les fichiers volumineux qu'il faut tout de même versionner",
    text: "Quand un raster ou un jeu de données volumineux doit malgré tout être suivi (par exemple une donnée de référence qui ne change presque jamais), Git LFS (Large File Storage) remplace le fichier dans l'historique Git par un simple pointeur léger, et stocke le contenu réel séparément — évitant qu'un dépôt Git classique ne gonfle démesurément à chaque nouvelle version d'un raster de plusieurs centaines de Mo.",
  },

  { type: "heading", text: "5. Qualité de code : formatage à la sauvegarde et tests intégrés", level: "approfondissement" },
  {
    type: "list",
    items: [
      "editor.formatOnSave: true (dans settings.json, globalement ou par langage) reformate automatiquement chaque fichier à chaque Ctrl+S, garantissant un style cohérent sans discipline manuelle",
      "Test Explorer (panneau dédié, icône fiole dans la barre d'activité une fois un framework de test détecté) : détecte automatiquement les tests pytest ou unittest d'un projet, les affiche en arborescence, et permet de lancer ou déboguer un test individuel d'un clic",
      "Un test qui échoue peut être débogué exactement comme un script normal : point d'arrêt posé dans le test ou dans le code testé, puis lancement en mode débogage depuis le Test Explorer",
    ],
  },
  {
    type: "formula",
    label: "Extrait de settings.json : formatage et linting automatiques",
    formula: "{ \"editor.formatOnSave\": true, \"editor.codeActionsOnSave\": { \"source.fixAll\": \"explicit\" } }",
    note: "formatOnSave reformate le fichier à chaque enregistrement ; codeActionsOnSave avec source.fixAll applique aussi les corrections automatiques du linter (imports inutilisés retirés, etc.) au même moment, sans action manuelle.",
  },
  {
    type: "brique",
    id: "debug-geopandas",
    title: "Déboguer un script GeoPandas avec point d'arrêt",
    blocks: [
      {
        type: "devoir",
        format: "Débogage",
        title: "Trouver et corriger un bug dans un script GeoPandas",
        prompt: "Un script fourni charge un GeoPackage de parcelles, calcule leur surface en hectares, puis filtre celles de plus de 5 ha — mais le résultat retourne une liste vide alors que le jeu de données contient des parcelles bien plus grandes que 5 ha. Le bug vient d'un oubli de reprojection avant le calcul de surface (gdf.area calculé directement sur des coordonnées géographiques en degrés, jamais reprojetées en Lambert-93). Pose un point d'arrêt juste après la ligne de calcul de surface, lance le script en mode débogage (F5), inspecte la colonne surface_ha dans le panneau Variables pour repérer des valeurs aberrantes (de l'ordre de 10⁻⁹, cohérent avec un calcul en degrés carrés plutôt qu'en hectares), puis corrige en ajoutant la reprojection manquante (gdf.to_crs(epsg=2154)) avant le calcul.",
        criteria: [
          "Un point d'arrêt est posé juste après le calcul de surface, avant le filtre",
          "Le panneau Variables est utilisé pour repérer la valeur aberrante de surface_ha, sans ajouter le moindre print()",
          "La correction ajoute la reprojection en CRS métrique avant le calcul de surface, comme le rappelle la mise en garde du module Le Compas",
        ],
      },
    ],
  },

  { type: "heading", text: "6. Documenter et publier un projet reproductible", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un script qui fonctionne sur une seule machine, celle de son auteur, n'est pas encore un projet reproductible : n'importe qui doit pouvoir recréer exactement le même environnement de zéro, sur une autre machine, des mois plus tard.",
  },
  {
    type: "list",
    items: [
      "README.md à la racine du projet : objectif, instructions d'installation, exemple d'exécution — le premier fichier lu par quiconque découvre le dépôt, prévisualisable directement dans VS Code (Ctrl+Shift+V)",
      "requirements.txt (pip) ou environment.yml (conda) : liste exacte des bibliothèques et de leurs versions, générée automatiquement (pip freeze > requirements.txt) plutôt que retapée à la main",
      "Une fois ces fichiers présents, reproduire l'environnement complet tient en quelques commandes dans le terminal intégré : création d'un environnement virtuel, puis installation depuis requirements.txt ou environment.yml",
    ],
  },
  {
    type: "table",
    headers: ["Fichier", "Rôle"],
    rows: [
      ["README.md", "Objectif du projet, installation, exemple d'exécution"],
      ["requirements.txt", "Liste des bibliothèques et versions exactes (pip)"],
      ["environment.yml", "Équivalent pour un environnement conda"],
      [".gitignore", "Fichiers volontairement exclus du suivi Git (rasters, .venv, __pycache__)"],
      [".vscode/settings.json", "Paramètres du projet (interpréteur, formatage) partagés avec l'équipe"],
      [".devcontainer/devcontainer.json", "Description de l'environnement Docker reproductible (si utilisé)"],
    ],
  },
  {
    type: "formula",
    label: "Reproduire un environnement Python de zéro",
    formula: "python -m venv .venv\n.venv\\Scripts\\activate\npip install -r requirements.txt",
    note: "Trois commandes dans le terminal intégré (activation légèrement différente sous macOS/Linux : source .venv/bin/activate) : créer l'environnement virtuel, l'activer, puis installer exactement les mêmes versions de bibliothèques que celles utilisées par l'auteur du projet.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un projet reproductible, du dépôt Git à l'exécution",
    text: "Cloner un dépôt Git (git clone), ouvrir le dossier dans VS Code, laisser Dev Containers reconstruire l'environnement exact décrit par devcontainer.json (ou recréer un environnement virtuel depuis requirements.txt), sélectionner l'interpréteur correspondant, puis relancer le script : c'est cette chaîne complète, de zéro à un résultat identique, que documente un bon README.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : tasks.json déclenche une chaîne de commandes en une seule action (Ctrl+Shift+B) ; Remote-SSH exécute réellement l'éditeur sur un serveur distant, Dev Containers garantit un environnement Docker identique pour tous ; l'extension R et Quarto permettent d'exécuter Python et R dans un même document ; un .gitignore géomatique exclut les rasters volumineux, Git LFS les versionne malgré tout sous forme de pointeurs légers ; editor.formatOnSave et le Test Explorer automatisent la qualité de code ; requirements.txt/environment.yml et un README documentent un environnement intégralement reproductible.",
    ],
  },
  {
    type: "link",
    to: "/module/qgis",
    label: "Voir aussi : PyQGIS en profondeur",
    description: "Le module De la Géométrie Pensive détaille la console Python de QGIS et l'automatisation par lot — l'autre moitié de la chaîne d'outils dont VS Code est l'éditeur.",
  },
]
