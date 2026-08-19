import { useLayoutEffect, type RefObject } from "react"
import gsap from "gsap"

interface KenBurnsOptions {
  /** Zoom de repos (marge nécessaire pour pouvoir déplacer le cadrage sans jamais découvrir de bord). */
  baseScale?: number
  /** Amplitude du zoom autour de baseScale. */
  ampScale?: number
  /** Amplitude du déplacement horizontal/vertical, en % de la taille de l'image. */
  ampX?: number
  ampY?: number
  /** Durée d'une étape (il y en a 3, jouées puis rejouées à l'envers — yoyo). */
  legDuration?: number
}

/**
 * Fait vivre l'image elle-même — un vrai travelling façon documentaire
 * (zoom + déplacement lents à travers le cadrage), pas une superposition
 * lumineuse : l'image "avance" et "recule" dans son cadre comme une caméra
 * qui explore le tableau. `baseScale` donne la marge de manœuvre (l'image
 * dépasse toujours son conteneur `overflow-hidden`, donc jamais de bord
 * visible). Timeline gsap en boucle (yoyo, pas de coupure au bouclage) avec
 * play/pause via IntersectionObserver — évite de faire tourner des dizaines
 * de tickers pour les bandeaux de chapitre repliés (toujours montés dans le
 * DOM, cf. ChapterAccordion) qui, une fois masqués, sortent naturellement du
 * viewport et n'ont donc plus besoin d'être animés.
 */
export function useArtworkKenBurns(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  { baseScale = 1.14, ampScale = 0.06, ampX = 4, ampY = 3, legDuration = 11 }: KenBurnsOptions = {},
) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    gsap.set(el, { transformOrigin: "center center", scale: baseScale, xPercent: 0, yPercent: 0 })

    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: legDuration, ease: "sine.inOut" } })
    tl.to(el, { scale: baseScale + ampScale, xPercent: ampX, yPercent: -ampY })
      .to(el, { scale: baseScale - ampScale * 0.5, xPercent: -ampX * 0.6, yPercent: ampY * 0.8 })
      .to(el, { scale: baseScale + ampScale * 0.7, xPercent: ampX * 0.3, yPercent: ampY })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tl.play()
        else tl.pause()
      },
      { threshold: 0 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      tl.kill()
    }
  }, [ref, enabled, baseScale, ampScale, ampX, ampY, legDuration])
}
