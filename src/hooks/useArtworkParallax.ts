import { useLayoutEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Parallax de profondeur : le calque photographique (wrapperRef, plus grand
 * que son cadre pour ne jamais découvrir de bord) se déplace plus lentement
 * que le reste de la page pendant qu'on la parcourt — sensation de couches
 * plutôt que d'un simple à-plat. `triggerRef` est le conteneur visible
 * (overflow-hidden) : c'est sa traversée du viewport qui pilote le scrub,
 * pas la taille du wrapper lui-même.
 */
export function useArtworkParallax(
  wrapperRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  amplitude = 10,
) {
  useLayoutEffect(() => {
    const el = wrapperRef.current
    const trigger = triggerRef.current
    if (!el || !trigger || !enabled) return

    const tween = gsap.fromTo(
      el,
      { yPercent: -amplitude / 2 },
      {
        yPercent: amplitude / 2,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [wrapperRef, triggerRef, enabled, amplitude])
}
