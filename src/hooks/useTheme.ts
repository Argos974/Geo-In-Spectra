import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

const STORAGE_KEY = "geo-in-spectra-theme"

/**
 * Thème sombre par défaut (identité du site) — le clair existe pour la lecture
 * en extérieur ou en cas de gêne du fond sombre, pas comme thème principal.
 * Appliqué via [data-theme] sur <html> (voir index.css) ; le script inline
 * dans index.html applique déjà la valeur stockée avant le premier rendu pour
 * éviter un flash, ce hook ne fait que synchroniser l'état React avec elle.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === "light" ? "light" : "dark"))

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.dataset.theme = "light"
    } else {
      delete document.documentElement.dataset.theme
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // stockage indisponible (navigation privée…) : le thème reste actif pour la session
    }
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}
