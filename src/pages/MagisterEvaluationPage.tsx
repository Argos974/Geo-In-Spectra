import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { ChapterAccordion } from "@/components/content/ChapterAccordion"
import { ChapterNav } from "@/components/content/ChapterNav"
import { EvaluationGenerator } from "@/components/evaluation/EvaluationGenerator"
import { openAndScrollTo } from "@/lib/lenisStore"
import { slugify } from "@/lib/slug"
import { usePageMeta } from "@/hooks/usePageMeta"

/**
 * Troisième pilier de Magister (avec Atelier et Programme) — jusqu'ici rien ne
 * couvrait le geste symétrique de Méthodes (Discipulus) : Méthodes explique
 * comment écrire un commentaire/une dissertation/un rapport/un mémoire,
 * Programme explique comment organiser une progression, mais personne
 * n'explique comment noter une copie. Quatre grilles générales (mêmes
 * quatre finalités que le regroupement de Méthodes : Scolaire, Concours,
 * Professionnel, Recherche) — des axes qualitatifs, pas un barème chiffré :
 * un barème réel dépend du sujet, de l'épreuve visée et des consignes du
 * commanditaire, qu'aucune grille générique ne peut fixer à la place de
 * l'enseignant.
 *
 * Compétences, exercice type et sujet blanc de chaque grille s'appuient sur du
 * contenu déjà réel du site (sections de La Méthode, jeu de données Vitrolles,
 * résultats réels de classification RF/MLP…) plutôt que sur des exemples
 * inventés sans ancrage — un sujet blanc reste toutefois un entraînement
 * original du site, pas une épreuve officielle reproduite (voir Annales pour
 * cette distinction).
 */
interface AttenteNiveau {
  niveau: "Insuffisant" | "Satisfaisant" | "Maîtrisé"
  text: string
}

interface ExerciceType {
  titre: string
  text: string
  lienLabel: string
  scrollTo: string
}

interface SujetBlanc {
  titre: string
  duree: string
  documents: string[]
  consigne: string
}

interface Grid {
  title: string
  subtitle: string
  criteria: string[]
  competences: string[]
  attentes: AttenteNiveau[]
  exerciceType: ExerciceType
  sujetBlanc: SujetBlanc
}

const GRIDS: Grid[] = [
  {
    title: "Scolaire",
    subtitle: "Commentaire de document (lycée)",
    criteria: [
      "Compréhension du sujet : la réponse traite bien la question posée, pas un sujet voisin plus confortable",
      "Exploitation précise du ou des documents : ce qui est écrit s'appuie sur ce que le document montre réellement, pas sur une connaissance générale plaquée dessus",
      "Structure argumentée : introduction (contexte, problématique), développement organisé, conclusion qui répond à la problématique",
      "Vocabulaire géographique et technique maîtrisé, employé à bon escient",
      "Qualité de l'expression écrite : syntaxe, orthographe, clarté",
    ],
    competences: ["Identification du document", "Description organisée", "Analyse (expliquer, pas décrire)", "Critique du document", "Vocabulaire technique"],
    attentes: [
      { niveau: "Insuffisant", text: "Décrit sans expliquer ; identification incomplète : capteur, résolution ou composition affichée absents pour un document de télédétection." },
      { niveau: "Satisfaisant", text: "Les quatre étapes (identification, description, analyse, critique) sont présentes, mais l'analyse reste parfois en surface." },
      { niveau: "Maîtrisé", text: "La critique du document questionne réellement la source (échelle, date, limites), avec un vocabulaire technique précis et employé à bon escient." },
    ],
    exerciceType: {
      titre: "Appliquer la grille de lecture à un document au choix",
      text: "Applique la grille de lecture de la section 1 de La Méthode (identification, description organisée, analyse, critique) à un document de ton choix : carte topographique, image satellite ou photographie aérienne.",
      lienLabel: "Voir la grille de lecture (La Méthode, section 1)",
      scrollTo: "1. Le commentaire de carte ou de document géographique",
    },
    sujetBlanc: {
      titre: "Commentaire d'un document de télédétection : la scène Sentinel-2 de Vitrolles",
      duree: "1h (épreuve courte, format lycée)",
      documents: [
        "Composition colorée réelle (rouge/vert/bleu) de la scène S2B_31TFJ_20240806_0_L2A, 6 août 2024, 0.008 % de nuages",
        "NDVI calculé sur la même emprise, palette marron → blanc → vert",
      ],
      consigne: "Rédige un commentaire structuré des deux documents ci-dessus (identification, description organisée, analyse, critique), en précisant pour chacun le capteur, la résolution et la composition affichée. Voir la « Grille de lecture pour un document de télédétection », section 1 de La Méthode. Les deux images et leurs métadonnées réelles sont téléchargeables sur la page Jeux de données.",
    },
  },
  {
    title: "Concours",
    subtitle: "Dissertation, croquis (CAPES / Agrégation)",
    criteria: [
      "Problématisation : le sujet est reformulé en une vraie question, pas recopié tel quel en préambule",
      "Plan cohérent et équilibré, annoncé et suivi jusqu'au bout",
      "Références et exemples précis, datés, localisés ; pas de généralité vague invérifiable",
      "Qualité du croquis associé : légende organisée par thème, figurés pertinents (pas de sur-figuration), titre qui répond au sujet",
      "Gestion du temps imparti : le devoir est complet, pas juste le début soigné d'un plan trop ambitieux",
    ],
    competences: ["Problématisation", "Construction de plan", "Références précises et localisées", "Sémiologie du croquis (Bertin)", "Gestion du temps"],
    attentes: [
      { niveau: "Insuffisant", text: "Le sujet est reformulé mais reste proche d'une paraphrase ; le plan est plaqué, deux parties seraient permutables sans rien perdre à la démonstration." },
      { niveau: "Satisfaisant", text: "Problématique réelle et plan cohérent, mais les références restent parfois vagues, sans date ni localisation précise." },
      { niveau: "Maîtrisé", text: "Plan démonstratif rigoureux, références précises datées et localisées, transitions explicites entre parties." },
    ],
    exerciceType: {
      titre: "Exercice type corrigé : « Le satellite peut-il remplacer le terrain ? »",
      text: "« Le satellite peut-il remplacer le terrain dans la gestion des risques naturels ? » : sujet déjà travaillé et corrigé (plan en trois parties : apports réels du satellite, limites concrètes, complémentarité effective observée dans les dispositifs réels), pour calibrer le niveau attendu avant de s'entraîner à froid sur le sujet blanc ci-dessous.",
      lienLabel: "Voir le sujet travaillé complet (La Méthode, section 2)",
      scrollTo: "2. La dissertation de géographie",
    },
    sujetBlanc: {
      titre: "Le choix d'une projection cartographique est-il un acte neutre ? Le cas Mercator/Peters",
      duree: "3h (format concours, dissertation, sans corrigé fourni)",
      documents: [
        "Mercator (1569), projection conforme : conserve les angles, mais représente le Groenland presque aussi grand que l'Afrique, alors qu'il est environ 14 fois plus petit",
        "Peters (1973), projection équivalente : corrige les surfaces au prix de formes fortement déformées",
      ],
      consigne: "En t'appuyant sur les trois familles de plans de la section 2 de La Méthode (thématique / dialectique / chronologique), traite ce sujet en dissertation structurée. Aucun corrigé n'est fourni : à traiter en temps limité, puis à confronter à la grille ci-dessus, pas à une réponse toute faite.",
    },
  },
  {
    title: "Professionnel",
    subtitle: "Rapport technique SIG",
    criteria: [
      "Méthode décrite avec assez de précision pour être reproduite par un tiers (données utilisées, traitements, paramètres)",
      "Rigueur des données : sources citées, limites de fiabilité mentionnées plutôt que passées sous silence",
      "Sémiologie cartographique correcte : légende complète, échelle, système de projection indiqué, choix de palette justifié",
      "Recommandations opérationnelles réalistes, formulées pour un décideur, pas seulement pour un autre technicien SIG",
      "Synthèse exécutive lisible par un non-spécialiste en début de document",
    ],
    competences: ["Méthode reproductible", "Rigueur et traçabilité des données", "Sémiologie cartographique", "Recommandations opérationnelles", "Synthèse exécutive"],
    attentes: [
      { niveau: "Insuffisant", text: "Résultat et interprétation mélangés dans la même phrase ; aucune indication de source, date ou résolution des données utilisées." },
      { niveau: "Satisfaisant", text: "Les six sections attendues sont présentes, mais l'incertitude du résultat (résolution, nuages, prétraitement) reste implicite plutôt que documentée." },
      { niveau: "Maîtrisé", text: "Chaque résultat est rapporté avec sa source précise et sa marge d'incertitude, résultats et discussion nettement séparés, recommandations directement exploitables par le commanditaire." },
    ],
    exerciceType: {
      titre: "Rédiger une section « Résultats » sans anticiper la discussion",
      text: "Rédige la section « Résultats » d'un rapport technique sur un indice spectral de ton choix, en séparant strictement le résultat mesuré de son interprétation. Voir « Documenter une incertitude, pas seulement un résultat », section 3 de La Méthode.",
      lienLabel: "Voir la structure attendue (La Méthode, section 3)",
      scrollTo: "3. Le rapport technique SIG et télédétection",
    },
    sujetBlanc: {
      titre: "Rapport technique : dynamique de végétation et artificialisation, zone de Vitrolles",
      duree: "À rendre sous une semaine (format rapport de stage)",
      documents: [
        "sentinel2_2024-08-06_vitrolles_bands.tif : 6 bandes réelles en réflectance de surface, EPSG:2154, 10 m",
        "sentinel2_2024-08-06_vitrolles_indices.tif : NDVI, NDMI, NDBI, NDRE, NDWI déjà calculés",
        "grille_100m_indices.geojson et stats.json : moyennes réelles par cellule et statistiques globales (NDVI moyen 0.33, NDBI moyen +0.09)",
      ],
      consigne: "Un commanditaire (collectivité, aménageur) souhaite un rapport sur l'état de la végétation et du bâti de l'emprise de Vitrolles à partir de cette scène Sentinel-2 réelle. Rédige le rapport complet selon les six sections de la section 3 de La Méthode (contexte, données et méthode, résultats, discussion, recommandations, annexes), en citant précisément la source et la résolution des données. Les fichiers sont sur la page Jeux de données ; la séance 9 de l'Atelier propose le même terrain sous forme de mini-projet corrigé.",
    },
  },
  {
    title: "Recherche",
    subtitle: "Mémoire, structure IMRaD",
    criteria: [
      "Revue de littérature qui situe le travail par rapport à l'existant, pas une simple liste de résumés juxtaposés",
      "Cohérence entre la méthode annoncée et les résultats effectivement présentés",
      "Limites documentées honnêtement (taille d'échantillon, biais possibles) plutôt que dissimulées",
      "Rigueur statistique : test choisi adapté aux données, pas de conclusion causale tirée d'une simple corrélation",
      "Bibliographie complète, normée, et effectivement citée dans le corps du texte",
    ],
    competences: ["Revue de littérature organisée", "Cohérence méthode/résultats", "Limites documentées honnêtement", "Rigueur statistique", "Bibliographie normée et citée"],
    attentes: [
      { niveau: "Insuffisant", text: "Revue de littérature chronologique juxtaposée ; une valeur de p présentée comme la probabilité que l'hypothèse soit vraie." },
      { niveau: "Satisfaisant", text: "Méthode et résultats cohérents, mais les limites (échantillon unique, non-indépendance des observations) restent peu ou pas discutées." },
      { niveau: "Maîtrisé", text: "Revue organisée par débat ou par méthode, limites assumées explicitement, test statistique choisi et interprété correctement au regard de ce qu'est réellement « une observation »." },
    ],
    exerciceType: {
      titre: "Rédiger une discussion qui n'ignore pas un résultat gênant",
      text: "Rédige la section « Discussion » (200 mots) d'un mémoire comparant deux méthodes, en évitant l'erreur la plus fréquente de la section : une discussion qui ignore les résultats qui ne vont pas dans le sens attendu.",
      lienLabel: "Voir la structure IMRaD (La Méthode, section 7)",
      scrollTo: "7. Le mémoire de recherche : structure IMRaD et rigueur statistique",
    },
    sujetBlanc: {
      titre: "Le réseau de neurones simple surpasse-t-il la forêt aléatoire ? Cas Vitrolles",
      duree: "Mémoire court (8 à 12 pages), structure IMRaD",
      documents: [
        "classification_reference.json : classification SCL réelle à 3 classes, découpage train/test, matrices de confusion Random Forest et MLP (résultats réels des séances 6 et 7 de l'Atelier)",
      ],
      consigne: "À partir des résultats réels de classification, rédige un mémoire structuré en IMRaD répondant à la question : la différence de performance entre MLP et Random Forest sur ce jeu de données est-elle robuste, et à quelles conditions (taille d'échantillon, indépendance des observations) peut-on la généraliser ? Un unique jeu de test ne suffit pas à trancher. Voir la mise en garde de la séance 12 de l'Atelier.",
    },
  },
]

export function MagisterEvaluationPage() {
  usePageMeta(
    "Évaluation — Magister",
    "Grilles d'évaluation et sujets blancs par finalité (scolaire, concours, professionnel, recherche).",
  )
  const art = artworks["magister-evaluation"]
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) openAndScrollTo(target)
  }, [location.state])

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="XII" className="print:hidden h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/magister" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Magister
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Magister</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Évaluation</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              Quatre grilles de correction, mêmes quatre finalités que Méthodes (Discipulus), des axes qualitatifs
              à adapter au barème réel de l'épreuve visée, pas un barème chiffré générique qui prétendrait s'y
              substituer.
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24 print:px-0 print:py-0">
        <div className="mx-auto max-w-4xl">
          <EvaluationGenerator />

          <div className="print:hidden">
          <p className="text-parchment-dim text-lg mb-10 text-justify">
            Pour chaque finalité : les compétences réellement évaluées, ce qui distingue une copie insuffisante d'une
            copie maîtrisée, un exercice type pour s'entraîner sur un point précis, et un sujet blanc complet à
            traiter en conditions proches du réel, un entraînement original du site, pas une épreuve officielle
            reproduite (voir Annales de concours pour de vrais sujets sourcés).
          </p>

          <ChapterNav titles={GRIDS.map((g) => g.title)} />

          {GRIDS.map((grid, i) => (
            <ChapterAccordion key={grid.title} name="evaluation-grilles" title={grid.title} subtitle={grid.subtitle} defaultOpen={i === 0}>
              <div className="space-y-8">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3">Compétences évaluées</p>
                  <div className="flex flex-wrap gap-2">
                    {grid.competences.map((c) => (
                      <span key={c} className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/20 px-2.5 py-1">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3">Grille de correction</p>
                  <ul className="space-y-2">
                    {grid.criteria.map((c, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-gilt shrink-0 mt-1.5" />
                        <span className="text-parchment-dim text-justify">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3">Attentes par niveau</p>
                  <div className="space-y-2">
                    {grid.attentes.map((a) => (
                      <div
                        key={a.niveau}
                        className={
                          a.niveau === "Insuffisant"
                            ? "border-l-2 border-oxblood/50 bg-oxblood/[0.06] pl-4 py-2"
                            : a.niveau === "Satisfaisant"
                              ? "border-l-2 border-gilt/30 pl-4 py-2"
                              : "border-l-2 border-gilt bg-gilt/[0.06] pl-4 py-2"
                        }
                      >
                        <p className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 mb-1">{a.niveau}</p>
                        <p className="text-parchment-dim text-sm leading-relaxed text-justify">{a.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-lapis/30 bg-lapis/[0.05] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright mb-2">Exercice type</p>
                  <p className="font-heading text-lg mb-2">{grid.exerciceType.titre}</p>
                  <p className="text-parchment-dim text-sm leading-relaxed text-justify mb-3">{grid.exerciceType.text}</p>
                  <Link
                    to="/discipulus/methodes"
                    state={{ scrollTo: slugify(grid.exerciceType.scrollTo) }}
                    className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright hover:underline"
                  >
                    {grid.exerciceType.lienLabel} →
                  </Link>
                </div>

                <div className="border border-gilt/30 bg-canvas p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-heading text-lg">{grid.sujetBlanc.titre}</p>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 shrink-0 border border-gilt/20 px-2 py-1">
                      {grid.sujetBlanc.duree}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">Sujet blanc : documents fournis</p>
                  <ul className="space-y-1.5 mb-4">
                    {grid.sujetBlanc.documents.map((d, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-gilt/60 shrink-0 mt-1.5" />
                        <span className="text-parchment-dim text-justify">{d}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">Consigne</p>
                  <p className="text-parchment-dim text-sm leading-relaxed text-justify">{grid.sujetBlanc.consigne}</p>
                </div>
              </div>
            </ChapterAccordion>
          ))}

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <Link
              to="/pieges-frequents"
              className="block border border-oxblood/40 bg-oxblood/[0.08] p-5 hover:bg-oxblood/[0.12] transition-colors"
            >
              <p className="font-heading text-lg mb-1">Pièges fréquents →</p>
              <p className="text-parchment-dim text-sm leading-relaxed">
                Toutes les mises en garde du cours réunies : les confusions à surveiller en priorité dans une copie.
              </p>
            </Link>
            <Link
              to="/discipulus/methodes"
              className="block border border-gilt/20 p-5 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
            >
              <p className="font-heading text-lg mb-1">Méthodes (référence élève) →</p>
              <p className="text-parchment-dim text-sm leading-relaxed">
                Ce qui est effectivement demandé à l'élève pour chaque format, la même page que Discipulus consulte.
              </p>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
