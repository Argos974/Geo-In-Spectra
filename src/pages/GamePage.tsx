import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { games } from "@/data/games"
import { MatchingGame } from "@/components/games/MatchingGame"
import { SequenceGame } from "@/components/games/SequenceGame"
import { CategoryGame } from "@/components/games/CategoryGame"
import { FormulaBuilderGame } from "@/components/games/FormulaBuilderGame"
import { SpatialOperationGame } from "@/components/games/SpatialOperationGame"
import { CoordinateMapGame } from "@/components/games/CoordinateMapGame"

export function GamePage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  const game = slug ? games[slug] : undefined

  if (!module || !game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Jeu introuvable.</p>
        <Link to="/" className="text-gilt underline">Retour à la galerie</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to={`/module/${module.slug}`} className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← {module.title}
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Jeu</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">{game.title}</h1>
        <p className="text-parchment-dim text-lg mb-4 text-justify">{game.instructions}</p>

        {game.type === "matching" && <MatchingGame pairs={game.pairs} />}
        {game.type === "sequence" && <SequenceGame items={game.items} />}
        {game.type === "category" && <CategoryGame categories={game.categories} items={game.items} />}
        {game.type === "formula-builder" && <FormulaBuilderGame challenges={game.challenges} />}
        {game.type === "spatial-operation" && <SpatialOperationGame />}
        {game.type === "coordinate-map" && <CoordinateMapGame cities={game.cities} />}
      </div>
    </div>
  )
}
