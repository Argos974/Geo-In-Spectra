const KEY = "geo-in-spectra-goals-v1"

export interface Goal {
  id: string
  label: string
  moduleSlug?: string
  dueDate: string // YYYY-MM-DD
  done?: boolean
}

function read(): Goal[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]")
  } catch {
    return []
  }
}

function write(goals: Goal[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(goals))
  } catch {
    // stockage indisponible (navigation privée…) : les objectifs restent actifs pour la session, non persistés
  }
}

export function getGoals(): Goal[] {
  return read()
}

export function addGoal(label: string, dueDate: string, moduleSlug?: string) {
  const goals = read()
  goals.push({ id: crypto.randomUUID(), label, dueDate, moduleSlug, done: false })
  write(goals)
  return goals
}

export function toggleGoal(id: string) {
  const goals = read().map((g) => (g.id === id ? { ...g, done: !g.done } : g))
  write(goals)
  return goals
}

export function removeGoal(id: string) {
  const goals = read().filter((g) => g.id !== id)
  write(goals)
  return goals
}
