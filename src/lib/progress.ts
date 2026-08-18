const KEY = "geo-in-spectra-progress-v1"

export interface ModuleProgress {
  visited?: boolean
  quizScore?: { score: number; total: number }
  exercisesVisited?: boolean
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
  s[slug] = { ...s[slug], visited: true }
  write(s)
}

/** Ne garde que le meilleur score obtenu, pas la dernière tentative — évite qu'un essai raté écrase un bon résultat antérieur. */
export function recordQuizScore(slug: string, score: number, total: number) {
  const s = read()
  const prev = s[slug]?.quizScore
  if (!prev || score > prev.score) {
    s[slug] = { ...s[slug], quizScore: { score, total } }
    write(s)
  }
}

export function markExercisesVisited(slug: string) {
  const s = read()
  s[slug] = { ...s[slug], exercisesVisited: true }
  write(s)
}

export function getProgress(): ProgressState {
  return read()
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // idem
  }
}
