import { Link } from "react-router-dom"
import { artworks } from "@/data/artworks"

export function LegalPage() {
  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl mt-8 mb-12">Mentions légales</h1>

        <div className="space-y-10">
          <section>
            <h2 className="font-heading text-2xl mb-3">Éditeur du site</h2>
            <p className="text-parchment-dim leading-relaxed text-justify">
              Ce site est un projet pédagogique personnel, édité à titre non professionnel par
              Thomas D'Amore, sans finalité commerciale, destiné à l'enseignement de la géomatique
              et de la télédétection. Pour toute question relative au site, contact :{" "}
              <a href="mailto:thomas.damore974@gmail.com" className="text-gilt hover:underline">
                thomas.damore974@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Hébergement</h2>
            <p className="text-parchment-dim leading-relaxed text-justify">
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis (<a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-gilt hover:underline">vercel.com</a>).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Données personnelles &amp; cookies</h2>
            <p className="text-parchment-dim leading-relaxed text-justify">
              Ce site ne dépose aucun cookie de suivi, ne collecte aucune donnée personnelle et ne
              propose pas de compte utilisateur. L'hébergeur peut journaliser des données
              techniques de connexion (adresse IP, horodatage) dans le cadre normal de son
              fonctionnement, indépendamment de ce site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Propriété intellectuelle</h2>
            <p className="text-parchment-dim leading-relaxed text-justify">
              Les textes de cours, schémas et planches originales de ce site sont produits pour un
              usage pédagogique. Les œuvres reproduites en illustration (voir crédits ci-dessous)
              appartiennent au domaine public et sont utilisées à ce titre.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Crédits iconographiques</h2>
            <p className="text-parchment-dim leading-relaxed text-justify mb-4">
              Toutes les œuvres reproduites sur ce site sont dans le domaine public et proviennent
              de Wikimedia Commons. Aucune n'est utilisée à des fins commerciales.
            </p>
            <ul className="space-y-2">
              {Object.values(artworks).map((art) => (
                <li key={art.src} className="text-parchment-dim text-sm border-l-2 border-gilt/25 pl-4">
                  {art.artist}, «&nbsp;{art.title}&nbsp;», {art.year} ; domaine public, Wikimedia Commons
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
