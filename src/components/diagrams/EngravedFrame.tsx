import type { ReactNode } from "react"

interface EngravedFrameProps {
  children: ReactNode
  caption?: string
  plate: string
}

/**
 * Cadre commun à toutes les planches diagrammatiques — même filet doré que GalleryFrame,
 * mais pensé pour un schéma vectoriel (fond de la page, pas de photo à recadrer).
 */
export function EngravedFrame({ children, caption, plate }: EngravedFrameProps) {
  return (
    <figure className="my-2">
      <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
        <div className="text-gilt/80">{children}</div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-parchment-dim">
        <span className="text-gilt">Planche {plate}</span>
        {caption ? <> — {caption}</> : null}
      </figcaption>
    </figure>
  )
}
