import { Link } from "react-router-dom"
import { useRef } from "react"
import { PARCOURS } from "@/data/parcours"
import { useActiveParcours } from "@/hooks/useActiveParcours"
import { artworks } from "@/data/artworks"
import { ProfileHero } from "@/components/gallery/ProfileHero"
import { usePageMeta } from "@/hooks/usePageMeta"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { usePageEntrance } from "@/hooks/usePageEntrance"
import { COURS_SLUGS } from "@/lib/moduleRoute"

const HUB_PREFETCH: Record<string, () => Promise<unknown>> = {
  "/discipulus/cours": () => import("@/pages/DiscipulusCoursPage"),
  "/discipulus/methodes": () => import("@/pages/DiscipulusMethodesPage"),
  "/discipulus/progression": () => import("@/pages/BilanPage"),
  "/discipulus/revision": () => import("@/pages/RevisionPage"),
}

export function DiscipulusPage() {
  usePageMeta(
    "Discipulus",
    `Cours de géomatique et télédétection pour l'élève : ${COURS_SLUGS.size} salles du lycée à l'approfondissement, méthode, parcours conseillés, bilan et révision espacée.`,
  )
  const active = useActiveParcours()
  const activeParcours = active ? PARCOURS.find((p) => p.id === active.id) : undefined
  const art = artworks["discipulus-hub"]
  const reducedMotion = useReducedMotion()
  const pageRef = useRef<HTMLDivElement>(null)
  // Prolonge le zoom déclenché depuis le repère "Discipulus" de l'accueil
  // (voir Home.tsx/ArtworkHotspot) plutôt que d'y couper sec ; discret sur une
  // arrivée classique (lien direct, retour navigateur).
  usePageEntrance(pageRef, !reducedMotion)

  return (
    <div ref={pageRef} className="min-h-screen bg-ink text-parchment">
      <ProfileHero
        art={art}
        title="Discipulus"
        hint="Quatre repères dans le tableau — ou choisissez directement plus bas."
        hotspotsKey="discipulus-hub"
        prefetch={HUB_PREFETCH}
      />

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-parchment-dim text-lg mb-10 text-justify max-w-2xl">
            Trois façons de venir ici : <strong className="text-parchment">étudier</strong> (préparer un contrôle ou
            un examen sur un point précis), <strong className="text-parchment">découvrir</strong> (premier contact,
            sans prérequis) ou <strong className="text-parchment">approfondir</strong> (aller au-delà du programme).
            Le filtre de niveau dans chaque chapitre et les parcours conseillés ci-dessous couvrent les trois.
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-3">Sommaire</p>
          <h2 className="font-heading text-3xl mb-8">Quatre entrées, un même cours</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Link to="/discipulus/cours" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Cours</p>
              <p className="text-parchment-dim text-sm leading-relaxed">{COURS_SLUGS.size} chapitres de savoir, du socle lycée à l'approfondissement — avec le plan général en tête de page.</p>
            </Link>
            <Link to="/discipulus/methodes" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Méthodes</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Commentaire, dissertation, rapport technique, mémoire : mobiliser le cours à l'écrit.</p>
            </Link>
            <Link to="/discipulus/progression" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Progression</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Ton bilan personnel : salles visitées, scores de quiz, exercices faits.</p>
            </Link>
            <Link to="/discipulus/revision" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Révision</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Répétition espacée : les notions à revoir, classées par boîte de rappel.</p>
            </Link>
          </div>

          <div className="border-t border-gilt/15 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gilt mb-2">Par où commencer ?</p>
              <p className="text-parchment-dim text-sm max-w-md">
                {activeParcours
                  ? <>Parcours en cours : <strong className="text-parchment">{activeParcours.title}</strong>.</>
                  : "Pas sûr par où commencer ? Quatre parcours conseillés existent selon ton profil."}
              </p>
            </div>
            <Link to="/parcours" className="font-mono text-[12px] uppercase tracking-[0.2em] text-gilt hover:text-gilt-bright transition-colors border-b border-gilt/40 hover:border-gilt-bright pb-1 shrink-0">
              Voir les parcours →
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80">
            <Link to="/ressources" className="hover:text-gilt transition-colors">Ressources pédagogiques →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
