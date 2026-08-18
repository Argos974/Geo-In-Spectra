import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { artworks } from "@/data/artworks"

/**
 * Frontispice + choix de profil. Les anciennes "sept salles" en scroll plein écran
 * ont déménagé : ce sont maintenant les chapitres de Discipulus → Cours. L'accueil
 * n'a plus qu'un rôle d'aiguillage — élève ou enseignant — pas de contenu propre.
 */
export function Home() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const hero = artworks.hero

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll("[data-profile-card]")
    if (!cards) return
    gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.15, delay: 0.2 })
  }, [])

  return (
    <div className="bg-ink text-parchment">
      {/* Frontispice */}
      <ArtworkBackdrop art={hero} figure="0" className="h-screen w-full">
        <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-24 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gilt mb-6">
            Frontispice · Galerie de géomatique
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.15] mb-6 text-parchment">
            Mesurer le ciel.<br />Lire la terre.
          </h1>
          <p className="font-body text-lg md:text-xl italic text-parchment-dim max-w-xl mb-4 leading-relaxed text-justify">
            Avant les satellites, il y avait déjà des instruments, des cartes et un regard
            patient posé sur le monde. La géomatique moderne poursuit ce même geste,
            avec d'autres outils.
          </p>
          <p className="font-mono text-[12px] text-parchment-dim/70 max-w-xl">
            Cours de géomatique et télédétection, pour réviser ou pour enseigner.
          </p>
        </div>
      </ArtworkBackdrop>

      {/* Choix de profil */}
      <div ref={cardsRef} className="border-t border-gilt/15 bg-ink px-6 md:px-16 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-4 text-center">Vous êtes</p>
          <h2 className="font-heading text-3xl md:text-4xl mb-12 text-center">Deux profils, deux parcours</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              data-profile-card
              to="/discipulus"
              className="block border border-gilt/20 p-8 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-3">Discipulus</p>
              <p className="font-heading text-2xl mb-4">Élève</p>
              <p className="text-parchment-dim leading-relaxed text-justify">
                Cours de géomatique et télédétection, du socle lycée à l'approfondissement, et la méthode pour les
                mobiliser à l'écrit, exercices et quiz en fin de chapitre.
              </p>
              <p className="font-mono text-[12px] uppercase tracking-wider text-gilt mt-6">Entrer →</p>
            </Link>

            <Link
              data-profile-card
              to="/magister"
              className="block border border-gilt/20 p-8 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-3">Magister</p>
              <p className="font-heading text-2xl mb-4">Enseignant</p>
              <p className="text-parchment-dim leading-relaxed text-justify">
                L'Atelier en détail (douze séances autonomes et corrigées, un semestre) et les ressources
                pédagogiques pour préparer un cours.
              </p>
              <p className="font-mono text-[12px] uppercase tracking-wider text-gilt mt-6">Entrer →</p>
            </Link>
          </div>

          <p className="text-center mt-10 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/70">
            Ni l'un ni l'autre ?{" "}
            <Link to="/ressources" className="text-gilt hover:text-gilt-bright transition-colors underline underline-offset-2">
              Glossaire, références, jeux de données →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
