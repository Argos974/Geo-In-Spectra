import { useCallback, type RefObject } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import type { ArtworkHotspot } from "@/data/artworkHotspots"
import type { ObjectCoverBox } from "@/hooks/useObjectCoverBox"

/**
 * Séquence "zoom dans le tableau puis navigue" partagée par toutes les pages
 * à repères (Home, DiscipulusPage, MagisterPage) — extrait de Home.tsx pour
 * ne pas retripliquer le calcul du point de zoom (centre réel du personnage
 * dans le cadre affiché, pas un point fixe : reste juste quel que soit le
 * ratio d'écran, voir useObjectCoverBox).
 */
export function useHotspotZoomNav(
  zoomRef: RefObject<HTMLDivElement | null>,
  overlayRef: RefObject<HTMLDivElement | null>,
  coverBox: ObjectCoverBox | null,
  reducedMotion: boolean,
) {
  const navigate = useNavigate()

  return useCallback(
    (hotspot: ArtworkHotspot) => {
      if (reducedMotion || !zoomRef.current || !coverBox) {
        navigate(hotspot.to)
        return
      }
      const { sourceBox } = hotspot
      const { scale, offsetX, offsetY, containerWidth, containerHeight } = coverBox
      const centerX = offsetX + ((sourceBox.left + sourceBox.right) / 2) * scale
      const centerY = offsetY + ((sourceBox.top + sourceBox.bottom) / 2) * scale
      const originXPercent = (centerX / containerWidth) * 100
      const originYPercent = (centerY / containerHeight) * 100

      const tl = gsap.timeline({ onComplete: () => navigate(hotspot.to) })
      tl.set(zoomRef.current, { transformOrigin: `${originXPercent}% ${originYPercent}%` })
        .to(zoomRef.current, { scale: hotspot.zoomScale, duration: 0.7, ease: "power2.in" }, 0)
        .to(overlayRef.current, { opacity: 1, duration: 0.55, ease: "power1.in" }, 0.15)
    },
    [zoomRef, overlayRef, coverBox, reducedMotion, navigate],
  )
}
