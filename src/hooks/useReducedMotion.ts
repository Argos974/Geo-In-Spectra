import { useEffect, useState } from "react"

/**
 * Reflète `prefers-reduced-motion` en direct (même patron que useTheme.ts) —
 * les effets JS (spotlight, apparition au scroll) le consultent pour ne pas
 * s'attacher du tout ; les effets CSS purs (respiration, grain) ont leur
 * propre garde `@media (prefers-reduced-motion: reduce)` dans index.css.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}
