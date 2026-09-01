import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { setActiveLenis } from "@/lib/lenisStore"

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth momentum scroll (Lenis) synchronisé avec GSAP ScrollTrigger.
 * Même combo que la référence kryntixstudio.vercel.app (vérifié via son bundle JS).
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Le scroll par inertie de Lenis est un mouvement continu, plus perturbant
    // pour un trouble vestibulaire qu'une transition ponctuelle — on ne l'attache
    // pas du tout si prefers-reduced-motion est actif ; le scroll natif du
    // navigateur prend le relais (lenisStore.ts retombe déjà sur window.scrollTo/
    // scrollIntoView quand activeLenis est null).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    setActiveLenis(lenis)

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      setActiveLenis(null)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}
