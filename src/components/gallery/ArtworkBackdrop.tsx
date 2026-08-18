import type { ReactNode } from "react"
import type { Artwork } from "@/data/artworks"
import { cn } from "@/lib/utils"

interface ArtworkBackdropProps {
  art: Artwork
  /** Numéro de planche (chiffre romain). Omis pour les pages sans numérotation (hubs de section) : le cartel s'affiche alors sans "Fig. N.". */
  figure?: string
  children: ReactNode
  className?: string
  /** Charge l'image en priorité (au-dessus de la ligne de flottaison). Défaut true — à mettre à false pour les sections hors-écran au chargement (ex. salles suivantes sur l'accueil), pour ne pas charger 8 images plein cadre d'un coup. */
  eager?: boolean
}

/**
 * L'œuvre en fond plein cadre plutôt qu'en vignette encadrée avant le texte —
 * même traitement que le frontispice (accueil), reconduit sur chaque salle et
 * chaque page de module : gradient sombre pour la lisibilité, vignette, cartel
 * en coin. Corrige aussi la sensation de fond trop sombre des sections qui,
 * avant, n'avaient qu'un aplat ink derrière le texte.
 */
export function ArtworkBackdrop({ art, figure, children, className, eager = true }: ArtworkBackdropProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img src={art.src} alt={art.alt} loading={eager ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.7)]" />

      <div className="relative z-10 h-full">{children}</div>

      <p className="absolute bottom-5 right-5 md:bottom-6 md:right-6 font-mono text-[10px] uppercase tracking-[0.15em] text-parchment-dim/80">
        {figure && <>Fig. {figure}. </>}
        {art.artist}, «&nbsp;{art.title}&nbsp;», {art.year}
      </p>
    </div>
  )
}
