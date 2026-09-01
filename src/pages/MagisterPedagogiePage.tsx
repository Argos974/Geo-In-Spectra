import { Link } from "react-router-dom"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { ChapterAccordion } from "@/components/content/ChapterAccordion"
import { ChapterNav } from "@/components/content/ChapterNav"
import { slugify } from "@/lib/slug"
import { usePageMeta } from "@/hooks/usePageMeta"

/**
 * Quatrième pilier de Magister (avec Atelier, Programme et Évaluation) — comble
 * l'asymétrie avec Discipulus (4 onglets : Cours/Méthodes/Progression/Révision
 * contre 3 jusqu'ici côté Magister). Symétrique de Méthodes (Discipulus,
 * "qu'est-ce qu'on attend dans la copie") et d'Évaluation ("comment noter la
 * copie une fois rendue") : celle-ci porte sur ce qu'aucune des deux ne couvre,
 * la conduite de séance qui mène à la copie — comment guider l'écriture,
 * pas seulement en poser l'attendu ni en corriger le résultat.
 *
 * Mêmes quatre finalités que Méthodes/Évaluation (Scolaire/Concours/
 * Professionnel/Recherche) pour rester cohérent avec le reste de Magister,
 * mais chaque séquence de guidage et chaque blocage listé est dérivé d'un
 * point de friction réel déjà identifié dans le déroulé des séances Atelier
 * correspondantes (voir atelierSeances.ts, champ `animation`) ou dans les
 * critères déjà écrits pour la grille d'Évaluation correspondante — jamais une
 * généralité de didactique importée sans ancrage dans le contenu du site.
 */
interface Blocage {
  symptome: string
  deblocage: string
}

interface PedagogieGroup {
  title: string
  subtitle: string
  sequence: string[]
  blocages: Blocage[]
  methodeScrollTo: string
  methodeLabel: string
  evaluationScrollTo: string
}

const GROUPS: PedagogieGroup[] = [
  {
    title: "Scolaire",
    subtitle: "Guider un commentaire de document (lycée)",
    sequence: [
      "Lecture collective du document au vidéoprojecteur, identification à l'oral des grands ensembles avant toute écriture individuelle — le déblocage se joue avant la plume, pas pendant (même logique que l'Atelier Lycée 5, la photo-interprétation précède toujours le calcul).",
      "Formulation collective d'une problématique-modèle sur un document différent de celui de l'exercice noté, affichée au tableau comme gabarit — jamais sur le document réel de l'évaluation, pour ne pas en donner la réponse.",
      "Temps d'écriture individuel chronométré avec un signal de mi-parcours (pas seulement une limite finale) : réduit concrètement le blocage de la page blanche sur l'introduction, le moment le plus souvent figé.",
      "Relecture croisée en binôme sur un seul critère à la fois, dans l'ordre : d'abord « la problématique répond-elle au sujet ? », puis seulement « chaque affirmation est-elle renvoyée à un endroit précis du document ? ».",
    ],
    blocages: [
      {
        symptome: "L'élève décrit le document sans jamais formuler de vraie problématique.",
        deblocage: "Lui faire reformuler oralement le sujet en question fermée avant d'écrire la moindre ligne — s'il ne peut pas la poser à l'oral, il ne la posera pas mieux à l'écrit.",
      },
      {
        symptome: "L'élève récite une connaissance générale sur le NDVI ou l'image, sans jamais revenir au document précis (le piège le plus fréquent de l'exercice, voir Atelier Lycée 9).",
        deblocage: "Poser systématiquement la même question de relance : « à quel endroit précis du document vois-tu ça ? » — si la réponse est « nulle part », la phrase n'a rien à faire dans la copie.",
      },
    ],
    methodeScrollTo: "1. Le commentaire de carte ou de document géographique",
    methodeLabel: "Voir la grille de lecture (La Méthode, section 1)",
    evaluationScrollTo: "Scolaire",
  },
  {
    title: "Concours",
    subtitle: "Guider une dissertation (CAPES / Agrégation)",
    sequence: [
      "Décomposition du sujet au tableau, mot-clé par mot-clé, avant toute tentative de plan — un plan plaqué naît presque toujours d'un sujet non décomposé.",
      "Brainstorm collectif des idées en vrac d'abord, tri en deux ou trois axes ensuite seulement — jamais l'inverse : partir d'un plan en trois parties avant l'idée fige artificiellement la réflexion autour de la première structure trouvée.",
      "Test de permutabilité en classe entière sur un plan volontairement mauvais fourni par l'enseignant (peut-on permuter deux parties sans rien perdre à la démonstration ?) avant de faire tester aux élèves leur propre plan — l'erreur se repère mieux sur l'exemple de quelqu'un d'autre en premier essai.",
      "Simulation chronométrée d'une épreuve complète au moins une fois avant l'échéance réelle : un devoir « complet mais pas fini » (grille Évaluation, Concours) vient presque toujours d'un temps mal géré, pas d'un manque de contenu.",
    ],
    blocages: [
      {
        symptome: "L'élève reste bloqué devant la reformulation du sujet en problématique.",
        deblocage: "Fournir deux ou trois amorces de tension (« dans quelle mesure », « au prix de quelles limites », « jusqu'où ») comme déclencheurs — jamais un plan tout fait, seulement un verbe qui force la mise en tension.",
      },
      {
        symptome: "Références vagues, sans date ni localisation précise (critère explicite de la grille Évaluation, Concours).",
        deblocage: "Exiger un exemple daté et localisé avant même que l'élève n'écrive le paragraphe censé l'utiliser — vérifier la référence en amont coûte moins cher qu'une réécriture après coup.",
      },
    ],
    methodeScrollTo: "2. La dissertation de géographie",
    methodeLabel: "Voir le sujet travaillé (La Méthode, section 2)",
    evaluationScrollTo: "Concours",
  },
  {
    title: "Professionnel",
    subtitle: "Guider un rapport technique SIG",
    sequence: [
      "Faire rédiger la synthèse exécutive en dernier dans l'ordre d'écriture, même si elle apparaît en premier dans le document final — un résumé écrit avant d'avoir les résultats reste vide de contenu réel.",
      "Rédaction de la section « Résultats » isolée, sans le brouillon de la discussion sous les yeux — empêche mécaniquement le mélange fait/interprétation, l'erreur la plus citée dans les séances Atelier de rapport technique (Licence/BUT 11, Master/Recherche 12).",
      "Relecture croisée ciblée sur une seule question par binôme : « cette phrase précise est-elle un fait mesuré ou une interprétation, sans ambiguïté possible ? »",
      "Confrontation finale à la grille Professionnel (page Évaluation) par l'élève lui-même avant remise, pas seulement par l'enseignant après correction — en faire une étape de la séance, pas une surprise de la notation.",
    ],
    blocages: [
      {
        symptome: "Résultats et discussion rédigés dans le même paragraphe, sans séparation nette.",
        deblocage: "Faire écrire les deux sections dans deux documents (ou deux couleurs) distincts pendant la rédaction, fusion seulement à la fin — la séparation physique pendant l'écriture évite le mélange mieux qu'une consigne seule.",
      },
      {
        symptome: "Sources citées sans jamais mentionner leur limite de fiabilité.",
        deblocage: "Check-list explicite par source utilisée (nom, date, résolution, limite connue) à cocher avant de considérer le rapport terminé, pas après la remise.",
      },
    ],
    methodeScrollTo: "3. Le rapport technique SIG et télédétection",
    methodeLabel: "Voir la structure attendue (La Méthode, section 3)",
    evaluationScrollTo: "Professionnel",
  },
  {
    title: "Recherche",
    subtitle: "Guider un mémoire, structure IMRaD",
    sequence: [
      "Cadrage de la question de recherche validé par un pair avant tout traitement (repris de l'Atelier Master/Recherche 1) — le traiter comme un jalon noté à part entière plutôt qu'une formalité de début de semestre.",
      "Revue de littérature rédigée en dernier dans l'ordre d'écriture, bien qu'elle apparaisse en premier dans le mémoire — même logique que la synthèse exécutive côté Professionnel : situer un travail par rapport à l'existant se fait mieux une fois le travail terminé.",
      "Rédaction de la section « Résultats » isolée du brouillon de discussion, même geste que côté Professionnel, avec un risque plus élevé ici : une valeur de p mal interprétée qui s'y glisse est plus difficile à repérer qu'une simple opinion.",
      "Relecture par un pair extérieur de la seule section « Résultats » (repris de l'Atelier Master/Recherche 12) — une interprétation glissée dans les résultats se voit mieux de l'extérieur que par l'auteur lui-même.",
    ],
    blocages: [
      {
        symptome: "Une valeur de p présentée comme « la probabilité que l'hypothèse soit vraie » (erreur citée dans la grille Évaluation, Recherche).",
        deblocage: "Clarifier systématiquement ce qu'une valeur de p mesure réellement avant toute analyse statistique, pas en correction après coup — l'erreur d'interprétation se prévient en amont, elle ne se corrige pas bien après rédaction.",
      },
      {
        symptome: "Une discussion qui ignore silencieusement un résultat gênant, contraire à l'hypothèse de départ.",
        deblocage: "Poser explicitement la question en relecture : « quel résultat de ton étude ne va pas dans le sens attendu, et en as-tu parlé ? » — si la réponse est un silence, la discussion n'est pas terminée.",
      },
    ],
    methodeScrollTo: "7. Le mémoire de recherche : structure IMRaD et rigueur statistique",
    methodeLabel: "Voir la structure IMRaD (La Méthode, section 7)",
    evaluationScrollTo: "Recherche",
  },
]

export function MagisterPedagogiePage() {
  usePageMeta(
    "Pédagogie — Magister",
    "Séquence de guidage et blocages d'écriture fréquents par finalité, pour animer une séance de géomatique.",
  )
  const art = artworks["magister-pedagogie"]

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="XIII" className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/magister" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Magister
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Magister</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Pédagogie</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              Mêmes quatre finalités que Méthodes et Évaluation, mais un objet différent : comment guider l'écriture
              pendant la séance, pas ce qui est attendu dans la copie (Méthodes) ni comment la noter une fois rendue
              (Évaluation).
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-parchment-dim text-lg mb-10 text-justify">
            Pour chaque finalité : une séquence de guidage concrète (l'ordre des étapes d'animation, pas le contenu à
            enseigner) et les blocages d'écriture les plus fréquents avec leur déblocage — dérivés des points de
            friction déjà identifiés dans les séances Atelier correspondantes et des critères déjà écrits pour la
            grille d'Évaluation, jamais une généralité de didactique importée sans ancrage réel dans le site.
          </p>

          <ChapterNav titles={GROUPS.map((g) => g.title)} />

          {GROUPS.map((grid, i) => (
            <ChapterAccordion key={grid.title} name="pedagogie-groupes" title={grid.title} subtitle={grid.subtitle} defaultOpen={i === 0}>
              <div className="space-y-8">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3">Séquence de guidage suggérée</p>
                  <ol className="space-y-3">
                    {grid.sequence.map((step, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="font-mono text-xs text-gilt shrink-0 mt-1">{String(j + 1).padStart(2, "0")}</span>
                        <span className="text-parchment-dim text-sm leading-relaxed text-justify">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3">Blocages fréquents et déblocage</p>
                  <div className="space-y-3">
                    {grid.blocages.map((b, j) => (
                      <div key={j} className="border-l-2 border-oxblood/40 bg-oxblood/[0.04] pl-4 py-2.5">
                        <p className="text-parchment text-sm leading-relaxed text-justify mb-1.5">{b.symptome}</p>
                        <p className="text-parchment-dim text-sm leading-relaxed text-justify">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-lapis-bright mr-1.5">Déblocage ·</span>
                          {b.deblocage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <Link
                    to="/discipulus/methodes"
                    state={{ scrollTo: slugify(grid.methodeScrollTo) }}
                    className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright hover:underline"
                  >
                    {grid.methodeLabel} →
                  </Link>
                  <Link
                    to="/magister/evaluation"
                    state={{ scrollTo: slugify(grid.evaluationScrollTo) }}
                    className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline"
                  >
                    Voir la grille de correction {grid.title} →
                  </Link>
                </div>
              </div>
            </ChapterAccordion>
          ))}

          <div className="mt-10">
            <Link
              to="/magister/cours"
              className="block border border-gilt/20 p-5 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
            >
              <p className="font-heading text-lg mb-1">Notes d'animation par séance →</p>
              <p className="text-parchment-dim text-sm leading-relaxed">
                Chacune des 36 séances de l'Atelier a sa propre note d'animation (piège de conduite, dépendance à une
                séance précédente, répartition du temps), visible sous son titre dans le plan de l'atelier.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
