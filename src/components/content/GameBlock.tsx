import type { GameDef } from "@/data/games"
import { slugify } from "@/lib/slug"
import { MatchingGame } from "@/components/games/MatchingGame"
import { SequenceGame } from "@/components/games/SequenceGame"
import { CategoryGame } from "@/components/games/CategoryGame"
import { FormulaBuilderGame } from "@/components/games/FormulaBuilderGame"
import { SpatialOperationGame } from "@/components/games/SpatialOperationGame"
import { CoordinateMapGame } from "@/components/games/CoordinateMapGame"
import { cn } from "@/lib/utils"

/**
 * Le jeu d'un module rendu à l'endroit même du cours qui l'a préparé, pas
 * relégué dans une section "Jouer" à part : un exercice de récupération active
 * se fait mieux tant que la notion vient d'être lue que comme une destination
 * séparée à laquelle il faut penser à revenir. Remplace l'ancien lien "Jouer →"
 * qui renvoyait vers /jeu/:slug, une page maintenant hors navigation.
 */
export function GameBlock({ game, isPrint }: { game: GameDef; isPrint?: boolean }) {
  const border = isPrint ? "border-[#7a2f24]/50" : "border-oxblood/40"
  const bg = isPrint ? "bg-[#7a2f24]/[0.04]" : "bg-oxblood/[0.06]"
  const accent = isPrint ? "text-[#7a2f24]" : "text-oxblood-bright"
  const text = isPrint ? "text-[#2b2116]" : "text-parchment"
  const textDim = isPrint ? "text-[#5c5140]" : "text-parchment-dim"

  return (
    <div id={slugify(game.title)} className={cn("border-2 p-5 md:p-6 scroll-mt-24", border, bg)}>
      <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-3", accent)}>À toi de jouer</p>
      <p className={cn("font-heading text-xl mb-2", text)}>{game.title}</p>
      <p className={cn("leading-relaxed text-justify mb-4", textDim)}>{game.instructions}</p>

      {isPrint ? (
        <p className={cn("text-sm italic", textDim)}>Exercice interactif, à faire sur la version web du site.</p>
      ) : (
        <>
          {game.type === "matching" && <MatchingGame pairs={game.pairs} />}
          {game.type === "sequence" && <SequenceGame items={game.items} />}
          {game.type === "category" && <CategoryGame categories={game.categories} items={game.items} />}
          {game.type === "formula-builder" && <FormulaBuilderGame challenges={game.challenges} />}
          {game.type === "spatial-operation" && <SpatialOperationGame />}
          {game.type === "coordinate-map" && <CoordinateMapGame cities={game.cities} />}
        </>
      )}
    </div>
  )
}
