import { modules } from "@/data/modules"
import { moduleContent } from "@/content"
import { glossary } from "@/data/glossary"
import { RESOURCE_LINKS } from "@/data/resourceLinks"
import { games } from "@/data/games"
import { quizzes } from "@/data/quizzes"
import { exercises } from "@/data/exercises"
import { slugify } from "@/lib/slug"
import { COURS_SLUGS, moduleTreeRoute as moduleRoute } from "@/lib/moduleRoute"

export interface SearchEntry {
  label: string
  context?: string
  to: string
  /** id à ouvrir/faire défiler à l'arrivée (voir lib/lenisStore.ts::openAndScrollTo) — omis quand la cible est la page entière, pas une section précise. */
  scrollTo?: string
  group: "Chapitre" | "Section" | "Glossaire" | "Jeu" | "Page" | "Quiz" | "Exercice"
}

/**
 * Index construit à chaque appel à partir des données déjà chargées (pas de
 * fichier séparé à tenir à jour) — recherche texte simple (sous-chaîne,
 * insensible à la casse/accents), pas de bibliothèque de recherche floue :
 * l'index reste petit (~200 entrées), une sous-chaîne suffit.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const m of modules) {
    const route = moduleRoute(m.slug)
    // L'entrée "module entier" ne pointe vers un chapitre ouvrable que pour les 5
    // salles de Cours, où l'id du <details> est justement slugify(module.title).
    // Méthodes/Atelier réorganisent leur contenu sous d'autres titres de chapitre
    // (Scolaire/Concours/… ; séances) — seules leurs sections (ci-dessous) ont un id réel.
    if (COURS_SLUGS.has(m.slug)) {
      entries.push({ label: m.title, to: route, scrollTo: slugify(m.title), group: "Chapitre" })
    }

    const blocks = moduleContent[m.slug] ?? []
    for (const b of blocks) {
      if (b.type === "heading") {
        entries.push({ label: b.text, context: m.title, to: route, scrollTo: slugify(b.text), group: "Section" })
      }
    }

    // Le jeu est désormais intégré directement dans le cours (voir GameBlock),
    // plus de route /jeu/:slug séparée : on scrolle vers son bloc dans la page
    // du module, comme n'importe quelle autre section.
    const game = games[m.slug]
    if (game) entries.push({ label: game.title, context: `Jeu : ${m.title}`, to: route, scrollTo: slugify(game.title), group: "Jeu" })

    // Questions de quiz et prompts d'exercices indexés individuellement — auparavant
    // seuls les titres de chapitre/section étaient cherchables, alors qu'une bonne
    // partie du contenu réellement testable (les questions elles-mêmes) restait
    // invisible à la recherche.
    for (const q of quizzes[m.slug] ?? []) {
      entries.push({ label: q.question, context: `Quiz : ${m.title}`, to: `/module/${m.slug}/quiz`, group: "Quiz" })
    }
    const exerciseSet = exercises[m.slug]
    if (exerciseSet) {
      for (const ex of exerciseSet.exercises) {
        entries.push({ label: ex.prompt, context: `Exercice : ${m.title}`, to: `/module/${m.slug}/exercices`, group: "Exercice" })
      }
    }
  }

  for (const g of glossary) {
    entries.push({ label: g.term, context: g.definition, to: "/glossaire", group: "Glossaire" })
  }

  for (const r of RESOURCE_LINKS) {
    entries.push({ label: r.label, context: r.description, to: r.to, group: "Page" })
  }

  entries.push(
    { label: "Discipulus", context: "Profil élève", to: "/discipulus", group: "Page" },
    { label: "Méthodes", context: "Commentaire, dissertation, rapport, mémoire", to: "/discipulus/methodes", group: "Page" },
    { label: "Magister", context: "Profil enseignant", to: "/magister", group: "Page" },
    { label: "L'Atelier", context: "Douze séances autonomes et corrigées", to: "/magister/cours", group: "Page" },
    { label: "Programme", context: "Progression suggérée pour enseigner", to: "/magister/programme", group: "Page" },
    { label: "Évaluation", context: "Grilles de correction par finalité : scolaire, concours, professionnel, recherche", to: "/magister/evaluation", group: "Page" },
    { label: "Parcours conseillés", context: "Choisir un ordre de lecture selon ton profil", to: "/parcours", group: "Page" },
    { label: "Bilan de progression", context: "Suivi personnel des salles visitées", to: "/discipulus/progression", group: "Page" },
  )

  return entries
}

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

export function searchEntries(entries: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const q = normalize(query.trim())
  if (!q) return []
  return entries.filter((e) => normalize(e.label).includes(q) || (e.context && normalize(e.context).includes(q))).slice(0, limit)
}
