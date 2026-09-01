import type { ContentLevel } from "@/content/types"

/**
 * Piste (Lycée/Licence-BUT/Master-Recherche) mémorisée entre les salles — sans
 * elle, chaque salle de Cours rouvre sur "Licence/BUT" par défaut : un lycéen
 * qui visite les 12 salles doit recliquer "Lycée" 12 fois de suite, la friction
 * exacte qu'introduit un sélecteur exclusif sans mémoire. Même forme que
 * lib/activeParcours.ts (clé localStorage + événement) : un réglage silencieux,
 * jamais prioritaire sur un choix ponctuel (résultat de recherche, parcours actif),
 * qui eux restent gérés séparément dans ModuleChapterBody.
 */
const KEY = "geo-in-spectra-preferred-level-v1"
const EVENT = "preferred-level-changed"

function isContentLevel(v: unknown): v is ContentLevel {
  return v === "lycee" || v === "superieur" || v === "approfondissement"
}

export function getPreferredLevel(): ContentLevel | null {
  try {
    const raw = localStorage.getItem(KEY)
    return isContentLevel(raw) ? raw : null
  } catch {
    return null
  }
}

export function setPreferredLevel(level: ContentLevel) {
  try {
    localStorage.setItem(KEY, level)
  } catch {
    // stockage indisponible (navigation privée…) : le choix reste valable pour la session en cours, non mémorisé
  }
  window.dispatchEvent(new Event(EVENT))
}

export function subscribePreferredLevel(cb: () => void) {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}
