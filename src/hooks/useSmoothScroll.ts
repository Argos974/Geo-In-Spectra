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
