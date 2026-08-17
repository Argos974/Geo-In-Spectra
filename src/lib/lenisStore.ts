import type Lenis from "lenis"

/**
 * Registre minimal de l'instance Lenis active — évite de faire remonter le scroll
 * fluide par contexte React jusqu'à chaque composant qui doit naviguer vers une ancre
 * (table des matières, CTA du frontispice…). Posé par useSmoothScroll au montage.
 */
let activeLenis: Lenis | null = null

export function setActiveLenis(instance: Lenis | null) {
  activeLenis = instance
}

export function scrollToAnchor(id: string, offset = -96) {
  const el = document.getElementById(id)
  if (!el) return
  if (activeLenis) {
    activeLenis.scrollTo(el, { offset, duration: 1.1 })
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
