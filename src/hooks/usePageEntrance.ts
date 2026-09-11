import { useLayoutEffect, type RefObject } from "react"
import gsap from "gsap"

/**
 * Léger recul de zoom à l'arrivée sur une page — pensé pour prolonger
 * visuellement le zoom déclenché par un ArtworkHotspot (voir Home.tsx) plutôt
 * que d'y couper sec, mais reste discret sur une arrivée classique (lien
 * direct, retour navigateur). Uniquement `scale` (jamais `opacity`) : un
 * fondu sur tout le contenu de la page ferait chuter transitoirement le
 * contraste du texte pendant l'animation — relevé par le contrôle
 * d'accessibilité (check-accessibility.mjs), pas seulement théorique.
 * Ignoré si `prefers-reduced-motion` (voir useReducedMotion).
 */
export function usePageEntrance(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const tween = gsap.fromTo(el, { scale: 1.035 }, { scale: 1, duration: 0.6, ease: "power2.out" })

    return () => {
      tween.kill()
    }
  }, [ref, enabled])
}
