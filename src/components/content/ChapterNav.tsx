import { openAndScrollTo } from "@/lib/lenisStore"
import { slugify } from "@/lib/slug"

interface ChapterNavProps {
  titles: string[]
}

/**
 * Liste de titres de chapitre — saut direct vers n'importe lequel sans défiler
 * devant les autres. Complète l'accordéon exclusif (ChapterAccordion, `name`
 * partagé) : cliquer ici ouvre le chapitre visé et referme les autres au passage
 * (même mécanisme natif que cliquer son résumé), pas juste un ancrage silencieux
 * vers un panneau resté fermé.
 *
 * Un seul élément `sticky` (pas `fixed`) pour les deux présentations — c'est ce
 * qui évite tout chevauchement avec le haut de page (bandeau œuvre plein écran
 * sur Méthodes, titre/résumé sur Cours) : un `sticky` ne peut jamais s'afficher
 * avant sa position naturelle dans le flux, où qu'il soit placé dans la page. En
 * dessous de xl (1280px) : bande horizontale à défilement (`flex-nowrap` +
 * `overflow-x-auto`, même motif que la rangée de boutons PDF/exercices/quiz
 * juste au-dessus dans ModuleChapterBody), pas un enroulement en plusieurs
 * lignes (`flex-wrap`) — un module à beaucoup de chapitres (ex. les 36 séances
 * de l'Atelier) faisait grimper la hauteur de cette barre collée en haut jusqu'à
 * masquer le corps du texte sur mobile ; en une seule ligne fixe (~44px), la
 * hauteur ne dépend plus du nombre de titres. À partir de xl : `translate-x` la
 * décale visuellement dans la marge gauche (espace vide à côté du corps de
 * texte en max-w-4xl) — un transform ne change pas la position de collage ni la
 * largeur du contenu, seulement le rendu visuel, donc ni chevauchement ni
 * recalcul de mise en page selon la largeur d'écran.
 */
export function ChapterNav({ titles }: ChapterNavProps) {
  return (
    <nav
      aria-label="Chapitres"
      className="sticky top-32 z-10 mb-8 flex flex-row flex-nowrap items-center gap-1 overflow-x-auto bg-ink/90 backdrop-blur-sm border border-gilt/15 py-2 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 xl:z-0 xl:w-48 xl:overflow-visible xl:flex-col xl:flex-nowrap xl:items-stretch xl:gap-0.5 xl:bg-transparent xl:border-0 xl:py-0 xl:-translate-x-[13rem] print:hidden"
    >
      {titles.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => openAndScrollTo(slugify(t))}
          title={t}
          className="shrink-0 whitespace-nowrap px-3 py-1.5 xl:text-left xl:truncate xl:border-l-2 xl:border-transparent hover:text-gilt xl:hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
        >
          {t}
        </button>
      ))}
    </nav>
  )
}
