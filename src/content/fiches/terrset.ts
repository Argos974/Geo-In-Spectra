import type { ContentBlock } from "../types"

export const terrsetFiche: ContentBlock[] = [
  {
    type: "paragraph",
    text: "TerrSet (Clark Labs, ex-IDRISI) : logiciel raster propriétaire spécialisé en classification et modélisation prédictive du changement d'occupation du sol. Format propre .rst (données) + .rdc (métadonnées), toujours par paire ; vecteur .vct.",
  },
  {
    type: "table",
    headers: ["Module", "Rôle"],
    rows: [
      ["RECLASS", "Regroupe/isole des classes d'une image catégorielle"],
      ["OVERLAY", "Combine plusieurs rasters (ex. masque de contraintes multiplicatif)"],
      ["CROSSTAB", "Matrice de changement entre deux dates : diagonale = stable, reste = transitions"],
      ["MAKESIG + MAXLIKE", "Classification supervisée : signatures d'entraînement puis maximum de vraisemblance"],
      ["CLUSTER", "Classification non supervisée (regroupement spectral sans exemple)"],
      ["ERRMAT", "Matrice de confusion et kappa d'une classification"],
      ["FUZZY", "Normalise un critère brut en score continu 0-1"],
      ["WEIGHT", "Pondère des critères par comparaison par paires (AHP)"],
      ["MCE / WLC", "Combinaison linéaire pondérée de critères normalisés"],
      ["DISTANCE / COST", "Distance euclidienne / distance de coût sur surface de friction"],
      ["MARKOV", "Matrice de probabilités de transition, proportions futures de classes"],
      ["LCM", "Land Change Modeler : sous-modèles de transition (logit ou MLP) + prédiction"],
      ["CA_MARKOV", "Automate cellulaire + Markov : localise spatialement le changement prédit"],
      ["MOLA", "Arbitrage multi-objectifs sur des affectations de sol concurrentes"],
      ["ETM", "Earth Trends Modeler : tendance/anomalie/décomposition sur séries temporelles longues"],
    ],
  },
  {
    type: "formula",
    label: "Surface à partir d'un nombre de pixels",
    formula: "Surface (ha) = Nombre de pixels × (taille du pixel en m)² / 10 000",
  },
  {
    type: "formula",
    label: "Matrice de transition markovienne",
    formula: "P(classe j en t+1 | classe i en t) = pᵢⱼ, avec Σⱼ pᵢⱼ = 1",
  },
  {
    type: "formula",
    label: "Combinaison linéaire pondérée (MCE)",
    formula: "Aptitude(x) = Σᵢ wᵢ · critère_i(x), avec Σᵢ wᵢ = 1",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Points de vigilance",
    text: "Ne jamais séparer .rst de son .rdc. Zones d'entraînement MAKESIG strictement pures, jamais mélangées entre classes. Une contrainte absolue se traite en masque booléen multiplicatif, jamais comme un critère pondéré parmi d'autres dans la MCE. MARKOV prédit des quantités, pas des emplacements — c'est CA_MARKOV qui les localise.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Valider une simulation (Pontius)",
    text: "Comparer 3 cartes (référence t1, référence t2, simulée t2), pas 2. Décomposer le désaccord en quantité vs. localisation (kappa spatialisé). Se comparer d'abord au modèle nul (« rien ne change ») avant de conclure à un apport réel.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Chaîne type d'une carte d'aptitude",
    text: "DISTANCE/COST → FUZZY (normalisation) → WEIGHT (poids AHP) → MCE (combinaison) → OVERLAY multiplicatif avec le masque de contraintes booléennes.",
  },
]
