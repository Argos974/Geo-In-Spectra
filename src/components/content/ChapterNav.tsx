import { openAndScrollTo } from "@/lib/lenisStore"
import { slugify } from "@/lib/slug"

interface ChapterNavProps {
  titles: string[]
  /**
   * Titres complets à utiliser pour calculer l'ancre de défilement (voir
   * ChapterAccordion, `id={slugify(title)}`), quand `titles` porte un libellé
   * court (ex. `navLabel`) plutôt que le titre réel du chapitre — sinon
   * `slugify` sur le libellé court ne correspondrait à aucune ancre existante.
   * Même longueur que `titles`, même ordre. Omis : `titles` sert aussi de cible.
   */
  targets?: string[]
}

/**
 * Liste de titres de chapitre — saut direct vers n'importe lequel sans défiler
 * devant les autres. Complète l'accordéon exclusif (ChapterAccordion, `name`
 * partagé) : cliquer ici ouvre le chapitre visé et referme les autres au passage
 * (même mécanisme natif que cliquer son résumé), pas juste un ancrage silencieux
 * vers un panneau resté fermé.
 *
 * En dessous de xl (1280px) : bande horizontale collante (`sticky`, `flex-nowrap`
 * + `overflow-x-auto`, même motif que la rangée de boutons PDF/exercices/quiz
 * juste au-dessus dans ModuleChapterBody), pas un enroulement en plusieurs
 * lignes (`flex-wrap`) — un module à beaucoup de chapitres (ex. les 36 séances
 * de l'Atelier) faisait grimper la hauteur de cette barre collée en haut jusqu'à
 * masquer le corps du texte sur mobile ; en une seule ligne fixe (~44px), la
 * hauteur ne dépend plus du nombre de titres.
 *
 * À partir de xl : colonne verticale dans la marge gauche, en `absolute` (pas
 * `sticky`) — elle défile normalement avec la page plutôt que de rester rivée
 * en haut de l'écran. Deux raisons : (1) avec beaucoup de titres (Cours, 19
 * salles ; Atelier, 36 séances) la colonne dépasse largement un écran, donc la
 * clouer en haut n'aide pas à voir les derniers titres et (2) un élément
 * `absolute` sort du flux normal — son parent (le conteneur `relative` que
 * chaque appelant place autour d'elle et du contenu qui suit) n'est donc pas
 * poussé vers le bas par sa hauteur, `top-0` l'aligne pile avec le premier
 * chapitre plutôt que de laisser un vide au-dessus de lui.
 */
export function ChapterNav({ titles, targets }: ChapterNavProps) {
  return (
    <nav
      aria-label="Chapitres"
      className="sticky top-32 z-10 mb-8 flex flex-row flex-nowrap items-center gap-1 overflow-x-auto bg-ink/90 backdrop-blur-sm border border-gilt/15 py-2 font-mono text-[12px] uppercase tracking-wider text-parchment-dim/80 xl:absolute xl:top-0 xl:z-0 xl:mb-0 xl:w-48 xl:flex-col xl:flex-nowrap xl:items-stretch xl:gap-0.5 xl:bg-transparent xl:border-0 xl:py-0 xl:-translate-x-[13rem] print:hidden"
    >
      {titles.map((t, i) => {
        const target = targets?.[i] ?? t
        return (
          <button
            key={target}
            type="button"
            onClick={() => openAndScrollTo(slugify(target))}
            title={target}
            className="shrink-0 whitespace-nowrap px-3 py-1.5 xl:text-left xl:truncate xl:border-l-2 xl:border-transparent hover:text-gilt xl:hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
          >
            {t}
          </button>
        )
      })}
    </nav>
  )
}
