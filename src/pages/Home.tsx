import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { ArtworkHotspot } from "@/components/gallery/ArtworkHotspot"
import { artworks } from "@/data/artworks"
import { artworkHotspots } from "@/data/artworkHotspots"
import type { ArtworkHotspot as ArtworkHotspotData } from "@/data/artworkHotspots"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { usePageMeta } from "@/hooks/usePageMeta"
import { useObjectCoverBox } from "@/hooks/useObjectCoverBox"
import { useHotspotZoomNav } from "@/hooks/useHotspotZoomNav"

const PAGE_PREFETCH: Record<string, () => Promise<unknown>> = {
  "/discipulus": () => import("@/pages/DiscipulusPage"),
  "/magister": () => import("@/pages/MagisterPage"),
}

/**
 * Frontispice + choix de profil. Les anciennes "sept salles" en scroll plein écran
 * ont déménagé : ce sont maintenant les chapitres de Discipulus → Cours. L'accueil
 * n'a plus qu'un rôle d'aiguillage — élève ou enseignant — pas de contenu propre.
 *
 * Prototype de navigation "zoom dans le tableau" (ArtworkHotspot) : au clic sur
 * un repère, on zoome vers lui puis on navigue, plutôt que de sauter directement
 * — desktop/tablette seulement (repères masqués sous `md`, voir ArtworkHotspot).
 * Les deux cartes de profil plus bas restent le chemin permanent (clavier,
 * lecteur d'écran, mobile, prefers-reduced-motion) : ce repère est un raccourci
 * en plus, jamais le seul moyen d'atteindre Discipulus/Magister.
 */
export function Home() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const heroZoomRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const zoomOverlayRef = useRef<HTMLDivElement>(null)
  const hero = artworks.hero
  const reducedMotion = useReducedMotion()
  const coverBox = useObjectCoverBox(heroZoomRef, heroImgRef)
  const activateHotspot = useHotspotZoomNav(heroZoomRef, zoomOverlayRef, coverBox, reducedMotion)
  usePageMeta("")

  useEffect(() => {
    if (reducedMotion) return
    const cards = cardsRef.current?.querySelectorAll("[data-profile-card]")
    if (!cards) return
    gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.15, delay: 0.2 })
  }, [reducedMotion])

  function prefetchHotspot(hotspot: ArtworkHotspotData) {
    PAGE_PREFETCH[hotspot.to]?.()
  }

  return (
    <div className="bg-ink text-parchment">
      {/* Frontispice */}
      <ArtworkBackdrop
        art={hero}
        figure="0"
        className="h-screen w-full"
        zoomRef={heroZoomRef}
        imgRef={heroImgRef}
        motion={false}
        hotspots={
          !reducedMotion &&
          artworkHotspots.hero?.map((hotspot) => (
            <ArtworkHotspot key={hotspot.id} hotspot={hotspot} coverBox={coverBox} onActivate={activateHotspot} onPrefetch={prefetchHotspot} />
          ))
        }
      >
        {/* `group` (posé sur le conteneur racine par ArtworkBackdrop, pas ici) porte le
            survol/focus d'un repère — pourtant rendu dans un tout autre calque, voir
            ArtworkBackdrop::hotspots — jusqu'au texte, pour l'atténuer pendant qu'on
            explore la fresque : sans état React à lever, juste :has() (Tailwind
            `group-has-*`), qui ne regarde que l'ascendance DOM, pas l'empilement visuel.
            `pointer-events-none` : ce calque plein cadre passerait sinon devant les
            repères (calque distinct, sous le voile) sans rien de cliquable ici lui-même. */}
        <div className="relative h-full pointer-events-none">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-24 max-w-4xl transition-opacity duration-500 group-has-[button:hover]:opacity-25 group-has-[button:focus-visible]:opacity-25">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gilt mb-6">
              Frontispice · Galerie de géomatique
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.15] mb-6 text-parchment">
              Mesurer le ciel.<br />Lire la terre.
            </h1>
            <p className="font-mono text-[12px] text-parchment-dim/80 max-w-xl">
              Cours de géomatique et télédétection, pour réviser ou pour enseigner.
            </p>
            <p className="hidden md:block font-mono text-[11px] text-parchment-dim/80 mt-8">
              Entrez dans la fresque, deux personnages vous attendent — ou choisissez plus bas.
            </p>
          </div>

          {/* Masque le raccord au moment où la navigation remplace cette page — sans lui, le zoom s'arrêterait net sur une image figée pendant le chargement de la page suivante. */}
          <div ref={zoomOverlayRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
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
                L'Atelier en détail (trente-six séances autonomes et corrigées, un semestre) et les ressources
                pédagogiques pour préparer un cours.
              </p>
              <p className="font-mono text-[12px] uppercase tracking-wider text-gilt mt-6">Entrer →</p>
            </Link>
          </div>

          <p className="text-center mt-10 font-mono text-[11px] uppercase tracking-wider text-gilt">
            Pas sûr par où commencer ?{" "}
            <Link to="/parcours" className="text-gilt hover:text-gilt-bright transition-colors underline underline-offset-2">
              Voir les parcours conseillés (du premier contact à l'approfondissement) →
            </Link>
          </p>

          <p className="text-center mt-4 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80">
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
