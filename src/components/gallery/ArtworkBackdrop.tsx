import { useRef, type ReactNode, type RefObject } from "react"
import type { Artwork } from "@/data/artworks"
import { cn } from "@/lib/utils"
import { toJpgSrcSet, toWebpSrcSet } from "@/lib/imageSrc"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useArtworkKenBurns } from "@/hooks/useArtworkKenBurns"
import { useArtworkParallax } from "@/hooks/useArtworkParallax"

interface ArtworkBackdropProps {
  art: Artwork
  /** Numéro de planche (chiffre romain). Omis pour les pages sans numérotation (hubs de section) : le cartel s'affiche alors sans "Fig. N.". */
  figure?: string
  children: ReactNode
  className?: string
  /** Charge l'image en priorité (au-dessus de la ligne de flottaison). Défaut true — à mettre à false pour les sections hors-écran au chargement (ex. salles suivantes sur l'accueil), pour ne pas charger 8 images plein cadre d'un coup. */
  eager?: boolean
  /**
   * Ref externe vers le conteneur racine (overflow-hidden) — utilisée pour piloter
   * un zoom déclaré par l'appelant (ex. Home.tsx, zoom vers un repère au clic avant
   * de naviguer, voir ArtworkHotspot) sans dupliquer le calque photographique ici.
   */
  zoomRef?: RefObject<HTMLDivElement | null>
  /**
   * Coupe le travelling ambiant (Ken Burns + parallax de scroll) — nécessaire
   * quand l'appelant pose des repères (ArtworkHotspot) en % fixes sur l'œuvre :
   * un cadrage qui dérive tout seul désynchronise visuellement le repère de son
   * personnage. Défaut true (comportement inchangé partout ailleurs).
   */
  motion?: boolean
  /**
   * Ref externe vers l'élément <img> lui-même — utilisée pour superposer un
   * médaillon détouré exactement à sa position dans l'image (voir
   * ArtworkHotspot.tsx::useObjectCoverBox, qui mesure sa position/échelle
   * `object-cover` réelle plutôt que de deviner le cadrage).
   */
  imgRef?: RefObject<HTMLImageElement | null>
  /**
   * Repères "tableau vivant" (ArtworkHotspot) — rendus ici, entre le calque
   * photographique et le voile de lisibilité, PAS dans `children` (au-dessus
   * du voile, en z-10) : un médaillon détouré à pleine luminosité posé
   * au-dessus d'un fond assombri par le voile se voyait comme un autocollant
   * plaqué, decorrele de la toile en dessous (constaté à l'écran, le voile
   * assombrit jusqu'à 75% en bas d'image). En passant par ce voile comme le
   * reste du calque photo, le médaillon en hérite et reste indiscernable au
   * repos. `group` est donc posé sur le conteneur racine (pas dans chaque
   * appelant) : les repères d'ici et le texte de `children` doivent rester
   * descendants d'un même `.group` pour que `group-has-[button:hover]`
   * (atténuation du texte au survol d'un repère, voir Home.tsx/ProfileHero)
   * continue de fonctionner malgré la séparation en deux calques.
   */
  hotspots?: ReactNode
}

/**
 * L'œuvre en fond plein cadre plutôt qu'en vignette encadrée avant le texte —
 * même traitement que le frontispice (accueil), reconduit sur chaque salle et
 * chaque page de module : gradient sombre pour la lisibilité, vignette, cartel
 * en coin. Corrige aussi la sensation de fond trop sombre des sections qui,
 * avant, n'avaient qu'un aplat ink derrière le texte.
 */
export function ArtworkBackdrop({ art, figure, children, className, eager = true, zoomRef, motion = true, imgRef: externalImgRef, hotspots }: ArtworkBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()

  useArtworkKenBurns(imgRef, motion && !reducedMotion)
  useArtworkParallax(parallaxRef, containerRef, motion && !reducedMotion)

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (zoomRef) zoomRef.current = node
      }}
      className={cn("group relative overflow-hidden", className)}
    >
      {/* Calque photographique surdimensionné (10% de marge verticale) : le
          parallax de useArtworkParallax le déplace un peu plus lentement que
          le reste de la page pendant le défilement, sans jamais découvrir de
          bord — l'image elle-même (Ken Burns) continue de zoomer/panner à
          l'intérieur, les deux mouvements se composent sans se gêner. */}
      <div ref={parallaxRef} className="absolute -inset-y-[10%] inset-x-0">
        <picture>
          {/* Paliers réduits (640/1280px, voir scripts/generate-gallery-responsive.mjs)
              + l'original en repli — sizes="100vw" : le calque photographique occupe
              toujours toute la largeur de la fenêtre (object-cover), quel que soit
              l'écran. Sans ça, un mobile téléchargeait la même image que 1920px de large. */}
          <source srcSet={toWebpSrcSet(art.src)} sizes="100vw" type="image/webp" />
          <source srcSet={toJpgSrcSet(art.src)} sizes="100vw" type="image/jpeg" />
          <img
            ref={(node) => {
              imgRef.current = node
              if (externalImgRef) externalImgRef.current = node
            }}
            src={art.src}
            alt={art.alt}
            loading={eager ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      </div>
      {hotspots}
      {/* Voile de lisibilité volontairement fixé au noir (pas à `ink`, qui suit le
          thème) : son rôle est d'assombrir la toile photographiée pour que le texte
          reste lisible dessus, pas de suivre le confort jour/nuit du site — en
          thème clair, `ink` devient crème et un lavis crème à 25-60% n'assombrit
          quasiment pas une zone déjà claire de l'œuvre (Cellarius, ciels de
          Vermeer…), contrairement à un lavis sombre. Imperceptible en thème
          sombre : `ink` y vaut déjà rgb(13 14 18), presque noir. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.7)]" />

      {/* `pointer-events-none` uniquement quand un calque `hotspots` existe en dessous
          (sinon rien à laisser passer, et d'autres pages posent de vrais liens/boutons
          directement dans `children`) : une boîte pleine hauteur/largeur, même sans
          fond visible, intercepte les clics par défaut (pointer-events: auto) et
          empêcherait sinon tout repère du calque `hotspots` d'être cliquable/survolable. */}
      <div className={cn("relative z-10 h-full", hotspots && "pointer-events-none")}>{children}</div>

      <p className="absolute bottom-5 right-5 md:bottom-6 md:right-6 font-mono text-[10px] uppercase tracking-[0.15em] text-parchment-dim/80">
        {figure && <>Fig. {figure}. </>}
        {art.artist}, «&nbsp;{art.title}&nbsp;», {art.year}
      </p>
    </div>
  )
}
