import { useRef } from "react"
import type { Artwork } from "@/data/artworks"
import { artworkHotspots } from "@/data/artworkHotspots"
import type { ArtworkHotspot as ArtworkHotspotData } from "@/data/artworkHotspots"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { ArtworkHotspot } from "@/components/gallery/ArtworkHotspot"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useObjectCoverBox } from "@/hooks/useObjectCoverBox"
import { useHotspotZoomNav } from "@/hooks/useHotspotZoomNav"

interface ProfileHeroProps {
  art: Artwork | undefined
  /** Titre affiché (Discipulus/Magister) — sert aussi de nom pour le cartel via `art`. */
  title: string
  /** Phrase d'indice sous le titre (nombre de repères, ou message équivalent). */
  hint: string
  /** Clé dans `artworkHotspots` pour les repères "tableau vivant" de cette page. */
  hotspotsKey: string
  /** Un import() par route cible, préchargé au survol/focus d'un repère (voir ArtworkHotspot). */
  prefetch: Record<string, () => Promise<unknown>>
}

/**
 * Bandeau plein cadre partagé par Discipulus et Magister — extrait après que les
 * deux pages ont dérivé silencieusement de l'accueil (hauteur, échelle du titre,
 * repère qui chevauchait le texte) sans qu'aucun des trois ne soit visiblement
 * "la référence" à copier : un seul composant, une seule dérive possible.
 * Home.tsx reste séparé : ce n'est pas une page de "profil" (pas d'eyebrow
 * "Profil", contenu de frontispice différent), pas la même fonction.
 */
export function ProfileHero({ art, title, hint, hotspotsKey, prefetch }: ProfileHeroProps) {
  const reducedMotion = useReducedMotion()
  const zoomRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const coverBox = useObjectCoverBox(zoomRef, imgRef)
  const activateHotspot = useHotspotZoomNav(zoomRef, overlayRef, coverBox, reducedMotion)

  if (!art) return null

  return (
    <ArtworkBackdrop
      art={art}
      className="h-screen min-h-[640px] w-full pt-24"
      zoomRef={zoomRef}
      imgRef={imgRef}
      motion={false}
      hotspots={
        !reducedMotion &&
        artworkHotspots[hotspotsKey]?.map((hotspot: ArtworkHotspotData) => (
          <ArtworkHotspot
            key={hotspot.id}
            hotspot={hotspot}
            coverBox={coverBox}
            onActivate={activateHotspot}
            onPrefetch={(h) => prefetch[h.to]?.()}
          />
        ))
      }
    >
      {/* `pointer-events-none` : ce calque (z-10, voir ArtworkBackdrop) est
          plein cadre et passerait sinon devant les repères (ArtworkBackdrop::hotspots,
          calque distinct en dessous du voile) sans rien de cliquable ici lui-même —
          seul le texte, jamais interactif. */}
      <div className="relative h-full pointer-events-none">
        <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-10 max-w-3xl transition-opacity duration-500 group-has-[button:hover]:opacity-25 group-has-[button:focus-visible]:opacity-25">
          <p className="font-mono text-[12px] text-gilt mb-3">Profil</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-4">{title}</h1>
          <p className="hidden md:block font-mono text-[11px] text-parchment-dim/80">{hint}</p>
        </div>

        <div ref={overlayRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
      </div>
    </ArtworkBackdrop>
  )
}
