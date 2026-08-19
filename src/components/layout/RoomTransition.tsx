import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"
import { resetScroll } from "@/lib/lenisStore"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/**
 * Rideau doré bref à chaque changement de route ("changement de salle") —
 * remplace l'ancien resetScroll() silencieux de AppShell : le saut de scroll
 * a maintenant lieu au moment précis où le rideau masque l'écran (via le
 * `.call()` dans la timeline), donc il ne se voit jamais. Ne joue pas au
 * premier montage (pas de "salle précédente" à quitter), ni sur /print/*
 * (pas de chrome là-bas), ni sous prefers-reduced-motion.
 */
export function RoomTransition() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const isPrint = location.pathname.startsWith("/print")

  useEffect(() => {
    // Un lien qui porte state.scrollTo (voir ChapterNav/openAndScrollTo) gère
    // déjà son propre positionnement précis sur la page d'arrivée — remettre
    // le scroll en haut ici en plus produirait un double saut visible (haut
    // de page puis ancre) au lieu d'un seul mouvement direct vers l'ancre.
    const hasScrollToState = Boolean((location.state as { scrollTo?: string } | null)?.scrollTo)
    const overlay = overlayRef.current
    const line = lineRef.current
    const shouldAnimate = !isFirstRender.current && !isPrint && !reducedMotion && overlay && line
    isFirstRender.current = false

    if (!shouldAnimate || !overlay || !line) {
      if (!hasScrollToState) resetScroll()
      return
    }

    gsap.set(line, { scaleX: 0 })
    const tl = gsap.timeline()
    tl.to(overlay, { opacity: 1, duration: 0.22, ease: "power2.in" })
      .to(line, { scaleX: 1, duration: 0.2, ease: "power2.out" }, "<")
      .call(() => {
        if (!hasScrollToState) resetScroll()
      })
      .to(line, { scaleX: 0, duration: 0.18, ease: "power2.in" }, "+=0.05")
      .to(overlay, { opacity: 0, duration: 0.35, ease: "power2.out" }, "<")

    return () => {
      tl.kill()
    }
  }, [location.pathname, location.state, isPrint, reducedMotion])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink opacity-0 print:hidden"
    >
      <div ref={lineRef} className="h-px w-40 origin-center bg-gilt/70" />
    </div>
  )
}
