const SEEN_LEVEL_INTRO_KEY = "geo-in-spectra-seen-level-intro-v1"

/**
 * Marqueur "déjà vu" pour le bandeau qui explique le passage des salles de
 * Cours à un sélecteur de piste exclusif (voir LevelIntroBanner.tsx) — un
 * élève déjà inscrit retrouve un comportement différent de l'ancien filtre
 * cumulable sans y avoir été préparé. Affiché une seule fois, jamais relancé
 * après un clic "Compris".
 */
export function hasSeenLevelIntro(): boolean {
  try {
    return localStorage.getItem(SEEN_LEVEL_INTRO_KEY) === "1"
  } catch {
    return true // stockage indisponible : ne pas insister à chaque rendu faute de pouvoir mémoriser le clic
  }
}

export function markLevelIntroSeen() {
  try {
    localStorage.setItem(SEEN_LEVEL_INTRO_KEY, "1")
  } catch {
    // navigation privée ou stockage désactivé : rien à faire, le bandeau réapparaîtra à la visite suivante
  }
}
