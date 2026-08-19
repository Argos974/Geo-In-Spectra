import { useLayoutEffect, type RefObject } from "react"
import gsap from "gsap"

/**
 * Fait "apparaître" une toile/un cadre une seule fois à son entrée dans le
 * viewport (léger fondu + dézoom → position finale) plutôt que de la montrer
 * figée dès le chargement — sensation de découverte au fil du défilement.
 *
 * IntersectionObserver plutôt que ScrollTrigger ici : les bandeaux d'œuvre
 * dans ChapterAccordion restent montés (display:none) sous un chapitre
 * fermé, et ScrollTrigger mettrait en cache des bornes à hauteur nulle tant
 * qu'aucun refresh explicite n'est déclenché à l'ouverture. IntersectionObserver
 * réévalue nativement dès que l'élément redevient visible (accordéon ouvert),
 * sans plomberie supplémentaire.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    gsap.set(el, { opacity: 0, scale: 1.05 })

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        gsap.to(el, { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" })
        observer.disconnect()
      },
      { threshold: 0.15 },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [ref, enabled])
}
