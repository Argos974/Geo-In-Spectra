import { Link } from "react-router-dom"
import { useRef } from "react"
import { artworks } from "@/data/artworks"
import { ProfileHero } from "@/components/gallery/ProfileHero"
import { usePageMeta } from "@/hooks/usePageMeta"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { usePageEntrance } from "@/hooks/usePageEntrance"

const HUB_PREFETCH: Record<string, () => Promise<unknown>> = {
  "/magister/cours": () => import("@/pages/MagisterCoursPage"),
  "/magister/programme": () => import("@/pages/ProgrammePage"),
  "/magister/pedagogie": () => import("@/pages/MagisterPedagogiePage"),
  "/magister/evaluation": () => import("@/pages/MagisterEvaluationPage"),
  "/magister/classe": () => import("@/pages/MagisterClassePage"),
}

export function MagisterPage() {
  usePageMeta(
    "Magister",
    "Ressources pour préparer un cours de géomatique : Atelier, programme, évaluation, pédagogie et gestion de classe.",
  )
  const art = artworks["magister-hub-dou"]
  const reducedMotion = useReducedMotion()
  const pageRef = useRef<HTMLDivElement>(null)
  // Prolonge le zoom déclenché depuis le repère "Magister" de l'accueil (voir
  // Home.tsx/ArtworkHotspot) plutôt que d'y couper sec ; discret sur une
  // arrivée classique (lien direct, retour navigateur).
  usePageEntrance(pageRef, !reducedMotion)

  return (
    <div ref={pageRef} className="min-h-screen bg-ink text-parchment">
      <ProfileHero
        art={art}
        title="Magister"
        hint="Quatre repères dans le tableau — ou choisissez directement plus bas."
        hotspotsKey="magister-hub-dou"
        prefetch={HUB_PREFETCH}
      />

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-parchment-dim text-lg mb-10 text-justify max-w-2xl">
            Pour vous qui enseignez : <strong className="text-parchment">s'organiser</strong> (une progression qui
            relie théorie, méthode et Atelier) et <strong className="text-parchment">préparer</strong> (séances
            autonomes et corrigées, ressources prêtes à l'emploi), pas pour réviser soi-même.
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-3">Sommaire</p>
          <h2 className="font-heading text-3xl mb-8">Cinq outils pour préparer un cours</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/magister/cours" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Atelier</p>
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
              <p className="text-parchment-dim text-sm leading-relaxed">Grilles de correction par finalité, et un générateur de sujet QCM imprimable à partir des banques de quiz.</p>
            </Link>
            <Link to="/magister/classe" className="block border border-gilt/20 p-6 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors">
              <p className="font-heading text-2xl mb-2">Suivi de classe</p>
              <p className="text-parchment-dim text-sm leading-relaxed">Déposer les exports de progression de plusieurs élèves pour une vue d'ensemble, sans compte ni serveur.</p>
            </Link>
          </div>

          <div className="border-t border-gilt/15 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gilt mb-2">Par où commencer ?</p>
              <p className="text-parchment-dim text-sm max-w-md">
                Le Programme relie Cours, Méthodes et Atelier en une séquence enseignable, plutôt que cinq ressources isolées.
              </p>
            </div>
            <Link to="/magister/programme" className="font-mono text-[12px] uppercase tracking-[0.2em] text-gilt hover:text-gilt-bright transition-colors border-b border-gilt/40 hover:border-gilt-bright pb-1 shrink-0">
              Voir le programme →
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
