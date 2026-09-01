const KEY = "geo-in-spectra-active-parcours-v1"
const EVENT = "active-parcours-changed"

export interface ParcoursStop {
  label: string
  /**
   * Route réelle vers ce contenu (voir lib/moduleRoute.ts::moduleTreeRoute) —
   * la maison canonique actuelle du chapitre (ex. /discipulus/cours), pas la
   * page de lien profond /module/:slug, qui n'est plus le chemin de navigation
   * normal.
   */
  to: string
  /** State de navigation pour rouvrir/faire défiler jusqu'au bon chapitre à l'arrivée (voir lib/moduleRoute.ts::moduleTreeState). */
  state?: { scrollTo?: string }
  /**
   * Slug de module associé à ce stop, si applicable. Indépendant de `to`, qui
   * peut pointer vers une page mutualisée (ex. /discipulus/cours) où plusieurs
   * stops de plusieurs slugs différents partagent la même route — sert à
   * data/parcours.ts::getParcoursModuleSlugs (mode express de RevisionPage),
   * qui ne peut plus retrouver le slug en parsant l'URL comme avant.
   */
  moduleSlug?: string
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
