import { Link } from "react-router-dom"
import { RESOURCE_LINKS } from "@/data/resourceLinks"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"

/** Onglet mutualisé — même contenu, même route, accessible depuis Discipulus et Magister. */
export function RessourcesPage() {
  const art = artworks.ressources

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} className="h-64 md:h-80 w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-10 max-w-3xl">
            <p className="font-mono text-[12px] text-gilt mb-3">Discipulus · Magister</p>
            <h1 className="font-heading text-4xl md:text-5xl">Ressources pédagogiques</h1>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-parchment-dim text-lg mb-10 text-justify">
            Communes aux deux profils : aussi utiles pour réviser que pour préparer un cours.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {RESOURCE_LINKS.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="block border border-gilt/15 p-5 hover:border-gilt/40 hover:bg-gilt/[0.04] transition-colors"
              >
                <p className="font-mono text-[12px] uppercase tracking-wider text-gilt mb-2">{r.label}</p>
                <p className="text-parchment-dim text-sm leading-relaxed">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
