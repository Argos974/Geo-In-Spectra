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

/**
 * Remet le scroll en haut de page à chaque changement de route — sans ça,
 * une navigation depuis le bas d'une longue page (ex. Progression → "Voir
 * les parcours conseillés") arrive sur la nouvelle page toujours défilée à
 * l'ancien offset en pixels, potentiellement au-delà de son propre contenu.
 * `activeLenis.scrollTo` plutôt que `window.scrollTo` : Lenis pilote le
 * scroll réel via requestAnimationFrame, un `window.scrollTo` seul serait
 * aussitôt écrasé par la prochaine frame de Lenis.
 */
export function resetScroll() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
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

/**
 * Comme scrollToAnchor, mais ouvre d'abord le <details> ancêtre le plus proche
 * (lui-même si `id` cible un chapitre, ou son parent si `id` cible un titre à
 * l'intérieur) — nécessaire quand la cible peut être repliée : un simple scroll
 * vers un élément caché dans un <details> fermé ne l'affiche pas tout seul.
 */
export function openAndScrollTo(id: string) {
  const el = document.getElementById(id)
  const details = el?.closest("details")
  if (details) details.open = true
  scrollToAnchor(id)
}
