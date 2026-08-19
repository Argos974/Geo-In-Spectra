const KEY = "geo-in-spectra-progress-v1"

export interface QuizAttempt {
  score: number
  total: number
  date: string
}

export interface ModuleProgress {
  visited?: boolean
  /** ISO de la visite la plus récente — alimente le radar/heatmap, absent sur les anciennes entrées (rétrocompatible). */
  visitedAt?: string
  quizScore?: { score: number; total: number }
  /** Historique complet des tentatives (contrairement à quizScore qui ne garde que le meilleur) — sert au radar/heatmap et n'écrase jamais rien. */
  quizHistory?: QuizAttempt[]
  /** Index (dans le tableau de questions du module) des questions ratées au moins une fois — file de révision espacée (voir RevisionPage). */
  wrongQuestions?: number[]
  exercisesVisited?: boolean
  exercisesVisitedAt?: string
}

type ProgressState = Record<string, ModuleProgress>

function read(): ProgressState {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}")
  } catch {
    return {}
  }
}

function write(state: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // stockage indisponible (navigation privée…) : le suivi reste actif pour la session, non persisté
  }
}

export function markVisited(slug: string) {
  const s = read()
  s[slug] = { ...s[slug], visited: true, visitedAt: new Date().toISOString() }
  write(s)
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

/** Marque une question comme ratée (dédoublonné) — alimente le mode "Réviser mes erreurs". */
export function recordWrongQuestion(slug: string, questionIndex: number) {
  const s = read()
  const prev = s[slug]?.wrongQuestions ?? []
  if (prev.includes(questionIndex)) return
  s[slug] = { ...s[slug], wrongQuestions: [...prev, questionIndex] }
  write(s)
}

/** Retire une question de la file de révision (répondue correctement en mode révision) — la question reste éligible à y revenir si ratée à nouveau plus tard. */
export function clearWrongQuestion(slug: string, questionIndex: number) {
  const s = read()
  const prev = s[slug]?.wrongQuestions
  if (!prev) return
  s[slug] = { ...s[slug], wrongQuestions: prev.filter((i) => i !== questionIndex) }
  write(s)
}

/** Toutes les questions ratées, par module — source de la file de révision espacée. */
export function getAllWrongQuestions(): Record<string, number[]> {
  const s = read()
  const out: Record<string, number[]> = {}
  for (const [slug, p] of Object.entries(s)) {
    if (p.wrongQuestions && p.wrongQuestions.length > 0) out[slug] = p.wrongQuestions
  }
  return out
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
