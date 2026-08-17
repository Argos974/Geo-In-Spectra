import { cn } from "@/lib/utils"

interface GalleryFrameProps {
  src: string
  alt: string
  artist: string
  title: string
  year: string
  figure: string
  className?: string
  priority?: boolean
  /** "dark" = site web (fond ink), "print" = PDF (fond papier clair). */
  variant?: "dark" | "print"
}

/**
 * Élément signature du site : une toile encadrée d'un double filet doré,
 * surmontée d'un cartel façon salle de musée (artiste, titre, date).
 * Même motif répété devant chaque œuvre — c'est ce qui fait "galerie".
 */
export function GalleryFrame({ src, alt, artist, title, year, figure, className, priority, variant = "dark" }: GalleryFrameProps) {
  const isPrint = variant === "print"

  return (
    <figure className={cn("group", className)}>
      <div className={cn("border p-[5px] md:p-[7px]", isPrint ? "border-[#8a6a2f]/50" : "border-gilt/30")}>
        <div className={cn("relative border overflow-hidden", isPrint ? "border-[#8a6a2f]" : "border-gilt/60")}>
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {!isPrint && <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.45)]" />}
        </div>
      </div>
      <figcaption className={cn("mt-4 font-mono text-[11px] uppercase tracking-[0.18em]", isPrint ? "text-[#5c5140]" : "text-parchment-dim")}>
        <span className={isPrint ? "text-[#8a6a2f]" : "text-gilt"}>Fig. {figure}.</span> {artist}, «&nbsp;{title}&nbsp;», {year}
      </figcaption>
    </figure>
  )
}
