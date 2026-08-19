import { Link } from "react-router-dom"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"

export function MagisterPage() {
  const art = artworks["methodologie-scolaire"]

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} className="h-64 md:h-80 w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-10 max-w-3xl">
            <p className="font-mono text-[12px] text-gilt mb-3">Profil</p>
            <h1 className="font-heading text-4xl md:text-5xl">Magister</h1>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-parchment-dim text-lg mb-10 text-justify max-w-2xl">
            Pour vous qui enseignez : <strong className="text-parchment">s'organiser</strong> (une progression qui
            relie théorie, méthode et Atelier) et <strong className="text-parchment">préparer</strong> (séances
            autonomes et corrigées, ressources prêtes à l'emploi), pas pour réviser soi-même.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/magister/cours" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Cours</p>
              <p className="text-parchment-dim text-sm leading-relaxed">L'Atelier en détail : objectifs, matériel, déroulé, corrigé et note d'animation de chaque séance.</p>
            </Link>
            <Link to="/magister/programme" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Programme</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Une progression suggérée reliant Cours, Méthodes et Atelier en séquence enseignable.</p>
            </Link>
            <Link to="/magister/pedagogie" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Pédagogie</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Comment guider l'écriture pendant la séance : séquences d'animation et blocages fréquents, par finalité.</p>
            </Link>
            <Link to="/magister/evaluation" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Évaluation</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Grilles de correction par finalité : scolaire, concours, professionnel, recherche.</p>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80">
            <Link to="/discipulus/cours" className="hover:text-gilt transition-colors">Contenu de cours (référence) →</Link>
            <Link to="/ressources" className="hover:text-gilt transition-colors">Ressources pédagogiques →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
