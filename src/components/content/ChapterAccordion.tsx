import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import type { Artwork } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { slugify } from "@/lib/slug"
import { cn } from "@/lib/utils"

interface ChapterAccordionProps {
  title: string
  subtitle?: string
  numeral?: string
  defaultOpen?: boolean
  /** Œuvre liée à ce chapitre (voir data/artworks.ts) — bandeau réduit, pas le plein écran des anciennes salles. */
  artwork?: Artwork
  /**
   * Groupe d'exclusivité natif HTML : les <details> partageant le même `name` se
   * referment automatiquement entre eux à l'ouverture de l'un d'eux (support natif
   * Chrome 120+/Firefox 122+/Safari 17.4+, aucun JS). Sans ça, une page à 5 chapitres
   * peut avoir les 5 ouverts en même temps et devenir interminable à faire défiler —
   * avec un `name` commun, un seul chapitre reste ouvert à la fois, la page ne dépasse
   * jamais "1 chapitre déplié + N titres repliés" de hauteur.
   */
  name?: string
  /** Salle déjà visitée (voir lib/progress.ts) — petit repère dans le résumé, pas juste au fin fond du Bilan. */
  visited?: boolean
  /**
   * Appelé à l'ouverture réelle (événement natif `toggle`, seulement quand `open`
   * devient true — pas à la fermeture). Sert à enregistrer la visite (markVisited)
   * au bon moment : un <details> fermé garde ses enfants montés dans le DOM, donc un
   * effet React classique dans le contenu se déclencherait dès le chargement de la
   * page pour les 5 chapitres à la fois, ouverts ou non.
   */
  onOpen?: () => void
  children: ReactNode
  className?: string
}

/**
 * Chapitre repliable en natif (<details>/<summary>) plutôt qu'un accordéon en state
 * React — comportement clavier/lecteur d'écran gratuit, et le print (PrintCourse)
 * n'a pas besoin de composant séparé : un <details open> s'imprime déplié. L'œuvre,
 * quand elle existe, reste dans le contenu du <details> (pas dans le <summary>) —
 * un chapitre fermé ne charge/affiche pas son image, seulement à l'ouverture.
 */
export function ChapterAccordion({ title, subtitle, numeral, defaultOpen, artwork, name, visited, onOpen, children, className }: ChapterAccordionProps) {
  return (
    <details
      id={slugify(title)}
      name={name}
      open={defaultOpen}
      onToggle={(e) => {
        if (onOpen && e.currentTarget.open) onOpen()
      }}
      className={cn("group border-b border-gilt/15 scroll-mt-24", className)}
    >
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 py-6 select-none">
        <span className="flex items-baseline gap-4 min-w-0">
          {numeral && <span className="font-mono text-[11px] text-gilt/85 shrink-0">{numeral}</span>}
          <span className="font-heading text-lg sm:text-2xl md:text-3xl">{title}</span>
          {visited && (
            <span className="font-mono text-[10px] normal-case tracking-normal text-parchment-dim/80 shrink-0" title="Déjà visité">
              ✓ visité
            </span>
          )}
        </span>
        <ChevronDown size={18} className="shrink-0 text-gilt transition-transform duration-200 group-open:rotate-180" />
      </summary>
      {artwork && (
        <ArtworkBackdrop art={artwork} figure={numeral} eager={false} className="h-48 md:h-64 w-full mb-6">
          <></>
        </ArtworkBackdrop>
      )}
      {subtitle && <p className="text-parchment-dim italic mb-4 -mt-2">{subtitle}</p>}
      <div className="pb-10">{children}</div>
    </details>
  )
}
