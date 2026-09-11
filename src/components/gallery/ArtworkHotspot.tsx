import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import type { ArtworkHotspot as ArtworkHotspotData } from "@/data/artworkHotspots"
import type { ObjectCoverBox } from "@/hooks/useObjectCoverBox"

interface ArtworkHotspotProps {
  hotspot: ArtworkHotspotData
  /** Mesure réelle du cadrage `object-cover` du fond (voir useObjectCoverBox) — le repère reste null tant qu'elle n'est pas prête, pour ne jamais s'afficher mal placé le temps d'un rendu. */
  coverBox: ObjectCoverBox | null
  onActivate: (hotspot: ArtworkHotspotData) => void
  onPrefetch?: (hotspot: ArtworkHotspotData) => void
}

/**
 * Repère "tableau vivant" — le médaillon détouré (PNG à canal alpha, voir
 * scripts/generate-hotspot-cutouts.py) est superposé PIXEL POUR PIXEL à la
 * position réelle du personnage dans l'œuvre (coverBox + hotspot.sourceBox),
 * pas flottant à côté (tentative précédente) : au repos, quasi invisible —
 * seul un très léger halo respirant signale qu'il y a quelque chose à
 * découvrir ; au survol/focus, le personnage se détache du tableau (échelle,
 * lumière, ombre portée).
 *
 * Un vrai <button>, jamais une image-map : zone cliquable = la silhouette
 * elle-même (déjà la bonne taille, pas besoin d'agrandir comme sur un simple
 * point). Libellé explicite pour les lecteurs d'écran (aria-label, pas
 * seulement le texte visible au survol), anneau de focus visible au clavier
 * comme à la souris. Masqué sous `md` (voir le composant appelant) : le
 * mapping sur une image `object-cover` dérive trop sur un cadrage portrait
 * étroit.
 */
export function ArtworkHotspot({ hotspot, coverBox, onActivate, onPrefetch }: ArtworkHotspotProps) {
  const [active, setActive] = useState(false)
  const cutoutRef = useRef<HTMLImageElement>(null)
  const quickX = useRef<gsap.QuickToFunc | null>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!cutoutRef.current) return
    quickX.current = gsap.quickTo(cutoutRef.current, "x", { duration: 0.5, ease: "power3" })
    quickY.current = gsap.quickTo(cutoutRef.current, "y", { duration: 0.5, ease: "power3" })
  }, [])

  const rect = useMemo(() => {
    if (!coverBox) return null
    const { sourceBox } = hotspot
    const { scale, offsetX, offsetY, paddingLeft, paddingTop } = coverBox
    // Le bouton est positionné (absolute) contre un ancêtre en flux normal
    // *à l'intérieur* du padding du conteneur mesuré par coverBox (ex.
    // `pt-24` pour dégager le header fixe, voir Magister/DiscipulusPage) —
    // il faut donc retrancher ce padding, sous peine d'un repère décalé vers
    // le bas/la droite d'autant (voir useObjectCoverBox::ObjectCoverBox).
    return {
      left: offsetX - paddingLeft + sourceBox.left * scale,
      top: offsetY - paddingTop + sourceBox.top * scale,
      width: (sourceBox.right - sourceBox.left) * scale,
      height: (sourceBox.bottom - sourceBox.top) * scale,
    }
  }, [coverBox, hotspot])

  function handlePointerMove(event: MouseEvent<HTMLButtonElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    const relX = (event.clientX - box.left) / box.width - 0.5
    const relY = (event.clientY - box.top) / box.height - 0.5
    // Amplitude volontairement faible (le personnage "se détache" à peine du
    // tableau, ne suit pas franchement le curseur) — le point de zoom au clic
    // reste calculé depuis sourceBox, ce déplacement est purement visuel.
    quickX.current?.(relX * 6)
    quickY.current?.(relY * 6)
  }

  function resetPointer() {
    setActive(false)
    quickX.current?.(0)
    quickY.current?.(0)
  }

  if (!rect) return null

  const style: CSSProperties = { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` }

  return (
    <button
      type="button"
      aria-label={hotspot.ariaLabel}
      onClick={() => onActivate(hotspot)}
      onMouseEnter={() => {
        setActive(true)
        onPrefetch?.(hotspot)
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      onFocus={() => {
        setActive(true)
        onPrefetch?.(hotspot)
      }}
      onBlur={resetPointer}
      style={style}
      className="absolute hidden md:block focus:outline-none"
    >
      {/* Halo quasi imperceptible au repos (pas d'animation ici : le pulse
          Tailwind par défaut oscille entre 1 et .5, bien trop marqué à cette
          opacité — une valeur statique basse suffit comme indice discret),
          qui s'intensifie franchement au survol/focus. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-[999px] bg-gilt-bright/40 blur-md transition-opacity duration-500",
          active ? "opacity-60" : "opacity-[0.08]",
        )}
      />
      <img
        ref={cutoutRef}
        src={hotspot.cutoutSrc}
        alt=""
        aria-hidden
        style={{ width: "100%", height: "100%" }}
        className={cn(
          "relative block rounded-sm outline outline-2 -outline-offset-1 transition-[filter,transform,outline-color] duration-500 ease-out",
          active
            ? "scale-[1.08] drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)] brightness-125 outline-gilt-bright/80"
            : "scale-100 drop-shadow-none brightness-100 outline-transparent",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-gilt-bright transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        {hotspot.hint}
      </span>
    </button>
  )
}
