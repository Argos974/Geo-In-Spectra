const KEY = "geo-in-spectra-active-parcours-v1"
const EVENT = "active-parcours-changed"

export interface ParcoursStop {
  label: string
  to: string
}

export interface ActiveParcoursState {
  id: string
  stepIndex: number
}

function read(): ActiveParcoursState | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ActiveParcoursState) : null
  } catch {
    return null
  }
}

function write(state: ActiveParcoursState | null) {
  try {
    if (state) localStorage.setItem(KEY, JSON.stringify(state))
    else localStorage.removeItem(KEY)
  } catch {
    // stockage indisponible (navigation privée…) : le parcours actif reste en mémoire pour la session, non persisté
  }
  window.dispatchEvent(new Event(EVENT))
}

export function getActiveParcours(): ActiveParcoursState | null {
  return read()
}

export function startParcours(id: string) {
  write({ id, stepIndex: 0 })
}

export function setParcoursStep(index: number) {
  const s = read()
  if (!s) return
  write({ ...s, stepIndex: index })
}

export function clearActiveParcours() {
  write(null)
}

export function subscribeActiveParcours(cb: () => void) {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}
