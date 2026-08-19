import { useLayoutEffect, type RefObject } from "react"
import gsap from "gsap"

/**
 * Bascule de perspective légère qui suit la souris — effet vitrine (la toile
 * encadrée semble posée derrière une vitre qu'on regarde sous un angle qui
 * change). `transformPerspective` est posé directement sur l'élément (gsap)
 * plutôt que sur un parent : pas besoin de toucher la mise en page autour.
 */
export function useTiltHover(ref: RefObject<HTMLElement | null>, enabled: boolean, maxTilt = 6) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    gsap.set(el, { transformPerspective: 700, transformStyle: "preserve-3d" })

    const setRotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" })
    const setRotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" })

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setRotY(px * maxTilt * 2)
      setRotX(-py * maxTilt * 2)
    }

    function onLeave() {
      setRotX(0)
      setRotY(0)
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)

    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      gsap.killTweensOf(el, "rotationX,rotationY")
    }
  }, [ref, enabled, maxTilt])
}
