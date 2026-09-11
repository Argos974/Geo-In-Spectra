import type { ContentBlock } from "../types"

export const vscodeFiche: ContentBlock[] = [
  {
    type: "list",
    items: [
      "File > Open Folder : toujours ouvrir un dossier de projet, pas un fichier isolé",
      "Ctrl+` : ouvrir/fermer le terminal intégré, déjà positionné dans le projet",
      "Ctrl+Shift+X : panneau Extensions (Marketplace)",
      "Ctrl+Shift+P : palette de commandes, point d'entrée universel",
      "Ctrl+Shift+G : panneau Source Control (Git)",
    ],
  },
  {
    type: "table",
    headers: ["Extension", "Rôle"],
    rows: [
      ["Python (Microsoft)", "Coloration, autocomplétion, exécution, linting/formatage (Ruff/Black)"],
      ["Jupyter (Microsoft)", "Notebooks .ipynb, exécution cellule par cellule, explorateur de variables"],
      ["Remote-SSH", "Éditer/exécuter sur un serveur distant"],
      ["Dev Containers", "Environnement Docker reproductible"],
      ["R (REditorSupport)", "Coloration/exécution R ; Quarto pour mixer Python et R"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Python: Select Interpreter",
    text: "Palette de commandes > Python: Select Interpreter — choisit l'environnement virtuel actif. Une erreur ModuleNotFoundError malgré un module installé vient presque toujours d'un interpréteur mal sélectionné, pas d'un module manquant.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Un point d'arrêt vaut mieux qu'un print()",
    text: "Clic dans la marge à gauche d'une ligne pour poser un point d'arrêt, F5 pour lancer en mode débogage, F10/F11/Shift+F11 pour Step Over/Into/Out. Le panneau Variables inspecte le contenu réel à cet instant précis.",
  },
  {
    type: "formula",
    label: ".vscode/tasks.json : automatiser une chaîne de commandes",
    formula: "{ \"label\": \"Exporter\", \"type\": \"shell\", \"command\": \"python export.py\" }",
    note: "Déclenché par Ctrl+Shift+B (tâche par défaut) ou Tasks: Run Task.",
  },
  {
    type: "formula",
    label: "Reproduire un environnement de zéro",
    formula: "python -m venv .venv && pip install -r requirements.txt",
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: ".vscode/settings.json (paramètres d'un projet, versionnés) ≠ paramètres utilisateur globaux. .gitignore géomatique : exclure *.tif et /data/raw/, Git LFS pour les rasters de référence à versionner malgré leur poids.",
  },
]
