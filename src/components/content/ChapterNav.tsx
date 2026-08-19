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
 * dessous de xl (1280px) : barre horizontale qui s'enroule (`flex-wrap`), dans le
 * flux normal, sous le titre/résumé — pas de défilement latéral caché, tous les
 * chapitres restent visibles sans interaction (repro-able aussi sur desktop dès
 * que la fenêtre passe sous 1280px, ex. DevTools ouvert en panneau ancré). À
 * partir de xl : `translate-x` la décale visuellement dans la marge gauche
 * (espace vide à côté du corps de texte en max-w-4xl) — un transform ne change
 * pas la position de collage ni la largeur du contenu, seulement le rendu
 * visuel, donc ni chevauchement ni recalcul de mise en page selon la largeur d'écran.
 */
export function ChapterNav({ titles }: ChapterNavProps) {
  return (
    <nav
      aria-label="Chapitres"
      className="sticky top-32 z-10 mb-8 flex flex-row flex-wrap items-center gap-1 bg-ink/90 backdrop-blur-sm border border-gilt/15 py-2 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 xl:z-0 xl:w-48 xl:flex-col xl:flex-nowrap xl:items-stretch xl:gap-0.5 xl:bg-transparent xl:border-0 xl:py-0 xl:-translate-x-[13rem] print:hidden"
    >
      {titles.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => openAndScrollTo(slugify(t))}
          title={t}
          className="shrink-0 px-3 py-1.5 xl:text-left xl:truncate xl:border-l-2 xl:border-transparent hover:text-gilt xl:hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
        >
          {t}
        </button>
      ))}
    </nav>
  )
}
