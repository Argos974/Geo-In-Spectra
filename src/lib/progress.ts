import type { ContentLevel } from "@/content/types"

const KEY = "geo-in-spectra-progress-v1"

export interface QuizAttempt {
  score: number
  total: number
  date: string
}

/** Une carte Leitner : boîte 1 (revoir tout de suite) à 5 (revoir dans 14j, quasi maîtrisé). */
export interface LeitnerCard {
  box: number
  dueAt: string
}

/** Intervalle avant la prochaine échéance selon la boîte atteinte (Leitner classique à 5 boîtes). */
const LEITNER_INTERVAL_DAYS: Record<number, number> = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 }
const LEITNER_MAX_BOX = 5

export interface ModuleProgress {
  visited?: boolean
  /** ISO de la visite la plus récente — alimente le radar/heatmap, absent sur les anciennes entrées (rétrocompatible). */
  visitedAt?: string
  /**
   * Pistes (Lycée/Licence-BUT/Master-Recherche) réellement ouvertes dans cette
   * salle — `visited` seul ne dit qu'"au moins une piste vue", une salle à 3
   * pistes indépendantes peut rester aux deux tiers non lue sans que rien ne
   * le signale. Absent sur les entrées d'avant le passage à 3 pistes
   * (rétrocompatible, traité comme un ensemble vide) et sur les salles qui
   * n'ont pas ce modèle (Méthodologie).
   */
  visitedLevels?: ContentLevel[]
  quizScore?: { score: number; total: number }
  /** Historique complet des tentatives (contrairement à quizScore qui ne garde que le meilleur) — sert au radar/heatmap et n'écrase jamais rien. */
  quizHistory?: QuizAttempt[]
  /** @deprecated remplacé par reviewQueue — encore lu pour migrer les données existantes, jamais réécrit. */
  wrongQuestions?: number[]
  /** File de révision espacée (Leitner) par index de question — voir RevisionPage. */
  reviewQueue?: Record<number, LeitnerCard>
  exercisesVisited?: boolean
  exercisesVisitedAt?: string
}

type ProgressState = Record<string, ModuleProgress>

/** Convertit une ancienne entrée wrongQuestions (simple liste) en reviewQueue boîte 1, due immédiatement — appliqué une fois, à la lecture, jamais persisté tant que rien d'autre n'écrit l'entrée. */
function migrateLegacy(p: ModuleProgress): ModuleProgress {
  if (!p.wrongQuestions || p.wrongQuestions.length === 0 || p.reviewQueue) return p
  const now = new Date().toISOString()
  const reviewQueue: Record<number, LeitnerCard> = {}
  for (const i of p.wrongQuestions) if (!reviewQueue[i]) reviewQueue[i] = { box: 1, dueAt: now }
  return { ...p, reviewQueue }
}

function read(): ProgressState {
  let state: ProgressState
  try {
    state = JSON.parse(localStorage.getItem(KEY) || "{}")
  } catch {
    return {}
  }
  for (const slug of Object.keys(state)) state[slug] = migrateLegacy(state[slug])
  return state
}

function write(state: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // stockage indisponible (navigation privée…) : le suivi reste actif pour la session, non persisté
  }
}

export function markVisited(slug: string, level?: ContentLevel) {
  const s = read()
  const prevLevels = s[slug]?.visitedLevels ?? []
  s[slug] = {
    ...s[slug],
    visited: true,
    visitedAt: new Date().toISOString(),
    visitedLevels: level && !prevLevels.includes(level) ? [...prevLevels, level] : prevLevels,
  }
  write(s)
}

/** Pistes déjà ouvertes dans cette salle (voir ModuleProgress.visitedLevels), jamais undefined pour rester simple à consommer côté badges/UI. */
export function getVisitedLevels(slug: string): ContentLevel[] {
  return read()[slug]?.visitedLevels ?? []
}

/** Ne garde que le meilleur score obtenu comme quizScore, mais pousse chaque tentative dans quizHistory — un essai raté n'écrase jamais un bon résultat antérieur, mais n'est plus perdu non plus. */
export function recordQuizScore(slug: string, score: number, total: number) {
  const s = read()
  const prev = s[slug]?.quizScore
  const history = s[slug]?.quizHistory ?? []
  const attempt: QuizAttempt = { score, total, date: new Date().toISOString() }
  s[slug] = {
    ...s[slug],
    quizScore: !prev || score > prev.score ? { score, total } : prev,
    quizHistory: [...history, attempt],
  }
  write(s)
}

/** Question ratée en quiz normal (QuizPage) : entre (ou retombe) en boîte 1, due immédiatement. */
export function recordWrongQuestion(slug: string, questionIndex: number) {
  const s = read()
  const queue = { ...s[slug]?.reviewQueue }
  queue[questionIndex] = { box: 1, dueAt: new Date().toISOString() }
  s[slug] = { ...s[slug], reviewQueue: queue }
  write(s)
}

/** Retire une question de la file de révision (répondue correctement en quiz normal avant même d'y être entrée, ou plus jamais due) — pas d'usage en mode Révision, voir advanceReviewBox. */
export function clearWrongQuestion(slug: string, questionIndex: number) {
  const s = read()
  const queue = s[slug]?.reviewQueue
  if (!queue || !(questionIndex in queue)) return
  const next = { ...queue }
  delete next[questionIndex]
  s[slug] = { ...s[slug], reviewQueue: next }
  write(s)
}

/**
 * Réponse correcte en mode Révision (RevisionPage) : monte d'une boîte Leitner,
 * échéance repoussée d'autant (LEITNER_INTERVAL_DAYS). Au-delà de la boîte 5,
 * la carte est retirée de la file — considérée maîtrisée plutôt que d'y tourner
 * indéfiniment.
 */
export function advanceReviewBox(slug: string, questionIndex: number) {
  const s = read()
  const queue = s[slug]?.reviewQueue
  const current = queue?.[questionIndex]?.box ?? 0
  const nextBox = current + 1
  if (nextBox > LEITNER_MAX_BOX) {
    clearWrongQuestion(slug, questionIndex)
    return
  }
  const dueAt = new Date(Date.now() + LEITNER_INTERVAL_DAYS[nextBox] * 86400000).toISOString()
  const nextQueue = { ...queue, [questionIndex]: { box: nextBox, dueAt } }
  s[slug] = { ...s[slug], reviewQueue: nextQueue }
  write(s)
}

/** Réponse ratée en mode Révision : retombe en boîte 1, due immédiatement (comme un premier échec). */
export function resetReviewBox(slug: string, questionIndex: number) {
  recordWrongQuestion(slug, questionIndex)
}

/** Cartes de révision dues maintenant (dueAt <= now), par module — source de RevisionPage. Une carte en boîte 3+ pas encore due n'apparaît pas : c'est le principe de la répétition espacée, pas une simple liste de questions ratées. */
export function getDueReviewQuestions(): Record<string, number[]> {
  const s = read()
  const now = Date.now()
  const out: Record<string, number[]> = {}
  for (const [slug, p] of Object.entries(s)) {
    if (!p.reviewQueue) continue
    const due = Object.entries(p.reviewQueue)
      .filter(([, card]) => new Date(card.dueAt).getTime() <= now)
      .map(([i]) => Number(i))
    if (due.length > 0) out[slug] = due
  }
  return out
}

/** Total de cartes en file (dues ou pas) — pour afficher "3 dues, 7 à venir" plutôt qu'un simple compte muet. */
export function getReviewQueueSize(): number {
  const s = read()
  return Object.values(s).reduce((n, p) => n + Object.keys(p.reviewQueue ?? {}).length, 0)
}

export function markExercisesVisited(slug: string) {
  const s = read()
  s[slug] = { ...s[slug], exercisesVisited: true, exercisesVisitedAt: new Date().toISOString() }
  write(s)
}

export function getProgress(): ProgressState {
  return read()
}

/** Jours (YYYY-MM-DD) où une activité a été enregistrée — visite, tentative de quiz ou exercice — pour la frise d'activité. Dérivé, pas stocké séparément. */
export function getActivityDates(): string[] {
  const s = read()
  const days = new Set<string>()
  for (const p of Object.values(s)) {
    if (p.visitedAt) days.add(p.visitedAt.slice(0, 10))
    if (p.exercisesVisitedAt) days.add(p.exercisesVisitedAt.slice(0, 10))
    for (const attempt of p.quizHistory ?? []) days.add(attempt.date.slice(0, 10))
  }
  return Array.from(days).sort()
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // idem
  }
}

/** Sérialise le bilan complet (localStorage) — pour changer de navigateur/appareil sans tout reperdre, seul moyen puisque le site n'a pas de compte. */
export function exportProgress(): string {
  return JSON.stringify(read(), null, 2)
}

/**
 * Réimporte un JSON produit par exportProgress. Validation minimale (objet, chaque
 * entrée un objet) plutôt qu'un schéma complet : un JSON malformé ou d'une origine
 * différente ne doit pas planter l'appli ni écraser silencieusement le bilan actuel
 * par un déchet — au premier signe de forme invalide, on rejette tout l'import.
 */
export function importProgress(json: string): boolean {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return false
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return false
  for (const v of Object.values(parsed as Record<string, unknown>)) {
    if (typeof v !== "object" || v === null || Array.isArray(v)) return false
  }
  write(parsed as ProgressState)
  return true
}
