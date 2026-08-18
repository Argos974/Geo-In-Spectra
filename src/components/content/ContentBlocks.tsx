import { useState } from "react"
import { Link } from "react-router-dom"
import type { ContentBlock } from "@/content/types"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/slug"
import { Diagram } from "@/components/diagrams"
import { OsmBufferVitrolles } from "@/components/live/OsmBufferVitrolles"
import { GameBlock } from "@/components/content/GameBlock"
import type { GameDef } from "@/data/games"

type Variant = "dark" | "print"

const calloutStylesDark: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/40 bg-lapis/[0.08]",
  warning: "border-oxblood/40 bg-oxblood/[0.08]",
  example: "border-gilt/40 bg-gilt/[0.07]",
}
const calloutStylesPrint: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/50 bg-lapis/[0.05]",
  warning: "border-oxblood/50 bg-oxblood/[0.05]",
  example: "border-[#8a6a2f]/50 bg-[#8a6a2f]/[0.05]",
}

const calloutLabel: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "Remarque",
  warning: "Attention",
  example: "Exemple",
}

const levelLabel: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "lycee": "Lycée",
  superieur: "Supérieur",
  approfondissement: "Approfondissement",
}

const levelStyleDark: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "lycee": "border-lapis/50 text-lapis-bright",
  superieur: "border-gilt/50 text-gilt",
  approfondissement: "border-oxblood/50 text-oxblood-bright",
}
const levelStylePrint: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "lycee": "border-lapis/60 text-lapis",
  superieur: "border-[#8a6a2f]/60 text-[#8a6a2f]",
  approfondissement: "border-oxblood/60 text-oxblood",
}

function SolutionBlock({
  block,
  isPrint,
  textDim,
  accent,
  accentBg,
  border,
  panelBg,
}: {
  block: Extract<ContentBlock, { type: "solution" }>
  isPrint: boolean
  textDim: string
  accent: string
  accentBg: string
  border: string
  panelBg: string
}) {
  const [revealed, setRevealed] = useState(isPrint)
  const panelId = `solution-${slugify(block.title)}`

  return (
    <div className={cn("border", border, panelBg)}>
      {!isPrint && (
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          aria-expanded={revealed}
          aria-controls={panelId}
          className={cn("w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors", !revealed && "hover:bg-white/[0.02]")}
        >
          <span className={cn("font-mono text-[11px] uppercase tracking-wider", accent)}>
            {revealed ? "Corrigé" : "Voir le corrigé"} : {block.title}
          </span>
          <span className={cn("font-mono text-xs", accent)} aria-hidden="true">{revealed ? "▲" : "▼"}</span>
        </button>
      )}
      {revealed && (
        <div id={panelId} className={cn(isPrint ? "p-5" : "px-5 pb-5", isPrint && "border-t", isPrint && border)}>
          {isPrint && <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", accent)}>Corrigé : {block.title}</p>}
          {block.text && <p className={cn("leading-relaxed text-justify mb-3 last:mb-0", textDim)}>{block.text}</p>}
          {block.items && (
            <ul className={cn("space-y-2", textDim)}>
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-2", accentBg)} />
                  <span className="text-justify">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export function ContentBlocks({ blocks, variant = "dark", game }: { blocks: ContentBlock[]; variant?: Variant; game?: GameDef }) {
  const isPrint = variant === "print"

  const text = isPrint ? "text-[#2b2116]" : "text-parchment"
  const textDim = isPrint ? "text-[#5c5140]" : "text-parchment-dim"
  const accent = isPrint ? "text-[#8a6a2f]" : "text-gilt"
  const accentBg = isPrint ? "bg-[#8a6a2f]" : "bg-gilt"
  const border = isPrint ? "border-[#8a6a2f]/35" : "border-gilt/25"
  const borderSoft = isPrint ? "border-[#8a6a2f]/20" : "border-gilt/15"
  const panelBg = isPrint ? "bg-[#8a6a2f]/[0.04]" : "bg-gilt/[0.04]"
  const calloutStyles = isPrint ? calloutStylesPrint : calloutStylesDark
  const levelStyle = isPrint ? levelStylePrint : levelStyleDark

  // Alterne le côté des anecdotes en marge (gauche/droite) selon leur ordre
  // d'apparition — pas un choix par bloc dans les données, juste un compteur
  // incrémenté ici, dans l'ordre de rendu (le .map ci-dessous est synchrone).
  let marginnoteSeq = 0

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <div key={i} id={slugify(block.text)} className="pt-8 first:pt-0 scroll-mt-28">
                {block.level && (
                  <span className={cn("inline-block mb-2 font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5", levelStyle[block.level])}>
                    {levelLabel[block.level]}
                  </span>
                )}
                <h2 className={cn("font-heading text-2xl md:text-3xl", text)}>{block.text}</h2>
              </div>
            )

          case "diagram":
            return <Diagram key={i} name={block.name} caption={block.caption} variant={variant} />

          case "game":
            return game ? <GameBlock key={i} game={game} isPrint={isPrint} /> : null

          case "live":
            // Interrogation réseau réelle (API Overpass) : n'a de sens que sur le site
            // vivant. En export PDF, Playwright génère une page statique hors-ligne —
            // afficher un état de chargement figé serait trompeur, donc on affiche à la
            // place un renvoi explicite vers la version web plutôt que de tenter le fetch.
            return isPrint ? (
              <div key={i} className={cn("border p-5 md:p-8 text-sm", border, panelBg)}>
                <p className={cn("font-mono text-[10px] uppercase tracking-wider mb-2", accent)}>Donnée interrogée en direct</p>
                <p className={textDim}>Cette section interroge l'API OpenStreetMap en temps réel, consulter la version web du module pour l'exécuter et voir les nombres actuels.</p>
                {block.caption && <p className={cn("mt-2", textDim)}>{block.caption}</p>}
              </div>
            ) : (
              <div key={i}>
                <OsmBufferVitrolles />
                {block.caption && <p className={cn("mt-3 text-sm", textDim)}>{block.caption}</p>}
              </div>
            )

          case "devoir":
            // Un devoir à rendre est un engagement, pas une digression : contrairement
            // à "solution" (repliée par défaut, une réponse à consulter après coup),
            // ce bloc reste toujours visible et porte un accent oxblood — le même
            // registre visuel que "warning", volontairement, pour qu'il se distingue
            // au premier coup d'œil de tout le reste du contenu de la séance.
            return (
              <div key={i} className={cn("border-2 p-5 md:p-6", isPrint ? "border-[#7a2f24]/60" : "border-oxblood/60")}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <p className={cn("font-mono text-[11px] uppercase tracking-wider", isPrint ? "text-[#7a2f24]" : "text-oxblood-bright")}>
                    Devoir à rendre : {block.format}
                  </p>
                </div>
                <p className={cn("font-heading text-lg mb-2", text)}>{block.title}</p>
                <p className={cn("leading-relaxed text-justify mb-4", textDim)}>{block.prompt}</p>
                <ul className="space-y-1.5">
                  {block.criteria.map((c, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-justify">
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-2", isPrint ? "bg-[#7a2f24]" : "bg-oxblood")} />
                      <span className={textDim}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )

          case "image":
            return (
              <figure key={i} className={cn("border", borderSoft)}>
                <img src={block.src} alt={block.alt} className="w-full h-auto block" loading="lazy" />
                {block.caption && (
                  <figcaption className={cn("px-4 py-3 text-sm border-t", borderSoft, textDim)}>{block.caption}</figcaption>
                )}
              </figure>
            )

          case "imagepair":
            // Deux prises de vue de la même emprise (ex. RVB réel vs NDVI calculé) à
            // comparer d'un coup d'œil : côte à côte et plafonnées en hauteur plutôt
            // qu'empilées pleine largeur, qui les faisait chacune occuper un écran
            // entier pour un résultat à comparer, pas à contempler séparément.
            return (
              <div key={i} className="grid sm:grid-cols-2 gap-3">
                {block.images.map((img, j) => (
                  <figure key={j} className={cn("border", borderSoft)}>
                    <div className={cn("flex items-center justify-center overflow-hidden", isPrint ? "bg-black/[0.03]" : "bg-canvas")}>
                      <img src={img.src} alt={img.alt} className="w-full max-h-64 object-contain" loading="lazy" />
                    </div>
                    <figcaption className={cn("px-3 py-2.5 border-t", borderSoft)}>
                      <p className={cn("font-mono text-[10px] uppercase tracking-wider mb-1", accent)}>{img.label}</p>
                      <p className={cn("text-xs leading-relaxed text-justify", textDim)}>{img.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )

          case "marginnote": {
            // Note historique/anecdotique : rejetée dans la marge sur les très grands
            // écrans (technique classique "sidenote", float + marge négative — la
            // colonne de lecture ne bouge pas, la note vient occuper le vide qui existe
            // déjà à côté d'elle). En dessous de ce seuil, pas assez de gouttière pour
            // l'accueillir sans chevaucher : elle redevient un simple encart en ligne.
            // Traitement délibérément discret (pas de fond, pas de gras, italique fin) :
            // une digression, pas une information au même rang qu'un callout ou une formule.
            // Alterne gauche/droite (voir marginnoteSeq plus haut) : le but n'est pas
            // seulement de désencombrer le texte, mais de faire bouger le regard du
            // lecteur d'un côté puis de l'autre entre deux paragraphes techniques denses.
            const onLeft = marginnoteSeq % 2 === 1
            marginnoteSeq++
            // <div>, pas <aside> : <aside> porte un rôle ARIA "complementary" implicite,
            // et un lecteur d'écran signale une violation dès que plusieurs landmarks du
            // même type coexistent sans nom distinct (audit axe-core, landmark-unique) —
            // sur une page à 5 anecdotes, ça en ferait 5 non nommées. Une anecdote lue au
            // fil du texte n'est de toute façon pas une vraie région "complémentaire" au
            // sens de la page (pas un widget de barre latérale autonome), donc pas de perte
            // sémantique à ne pas en faire un landmark.
            return (
              <div
                key={i}
                className={cn(
                  "2xl:w-[220px] 2xl:mt-1 mb-2 py-0.5",
                  onLeft
                    ? "2xl:float-left 2xl:clear-left 2xl:ml-[-256px] border-r pr-3"
                    : "2xl:float-right 2xl:clear-right 2xl:mr-[-256px] border-l pl-3",
                  isPrint ? "border-[#8a6a2f]/25" : "border-gilt/20",
                )}
              >
                <p className={cn("font-mono text-[9px] uppercase tracking-wider mb-1 opacity-80", textDim)}>{block.title}</p>
                <p className={cn("text-[12.5px] leading-relaxed italic opacity-80", textDim)}>{block.text}</p>
              </div>
            )
          }

          case "link":
            // En impression/PDF, un renvoi vers une autre salle n'est pas cliquable (document
            // statique) : on l'affiche comme une simple note de renvoi, sans l'habillage bouton
            // ni la flèche qui suggèrent à tort une interaction possible sur papier.
            return isPrint ? (
              <div key={i} className={cn("border-l-2 pl-4 py-1", border)}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-1", accent)}>Voir aussi : {block.label}</p>
                {block.description && <p className={cn("text-sm text-justify", textDim)}>{block.description}</p>}
              </div>
            ) : (
              <Link
                key={i}
                to={block.to}
                className={cn("block border p-5 transition-colors hover:bg-gilt/10", border, panelBg)}
              >
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-1", accent)}>{block.label} →</p>
                {block.description && <p className={cn("text-sm", textDim)}>{block.description}</p>}
              </Link>
            )

          case "paragraph":
            return (
              <p key={i} className={cn("leading-relaxed text-justify", textDim)}>
                {block.text}
              </p>
            )

          case "list": {
            // text-align n'a d'effet que posé sur un conteneur de bloc — le poser
            // directement sur le <span> inline du texte (comme avant) est un no-op
            // silencieux pour les listes ordonnées (pas de wrapper flex autour du
            // texte dans ce cas) : c'est pourquoi les étapes numérotées de l'Atelier
            // ne semblaient jamais justifiées. Posé sur le <li> (bloc), il s'hérite
            // correctement dans les deux cas, avec ou sans puce flex.
            const Tag = block.ordered ? "ol" : "ul"
            return (
              <Tag key={i} className={cn("space-y-2", textDim, block.ordered ? "list-decimal pl-5" : "pl-0")}>
                {block.items.map((item, j) => (
                  <li key={j} className={cn("text-justify", !block.ordered && "flex items-start gap-3")}>
                    {!block.ordered && <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-2", accentBg)} />}
                    <span>{item}</span>
                  </li>
                ))}
              </Tag>
            )
          }

          case "formula":
            return (
              <div key={i} className={cn("border p-5", border, panelBg)}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", accent)}>{block.label}</p>
                <p className={cn("font-mono text-sm md:text-base break-words", text)}>{block.formula}</p>
                {block.note && <p className={cn("text-sm mt-3 text-justify", textDim)}>{block.note}</p>}
              </div>
            )

          case "callout":
            return (
              <div key={i} className={cn("border p-5", calloutStyles[block.tone ?? "info"])}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", textDim)}>
                  {calloutLabel[block.tone ?? "info"]}
                </p>
                <p className={cn("font-heading text-lg mb-1", text)}>{block.title}</p>
                <p className={cn("leading-relaxed text-justify", textDim)}>{block.text}</p>
              </div>
            )

          case "comparison":
            return (
              <div key={i} className="grid gap-4 md:grid-cols-2">
                {block.items.map((col) => (
                  <div key={col.label} className={cn("border p-5", borderSoft, isPrint ? "bg-black/[0.015]" : "bg-white/[0.02]")}>
                    <p className={cn("font-heading mb-3", text)}>{col.label}</p>
                    <ul className="space-y-2">
                      {col.points.map((p, j) => (
                        <li key={j} className={cn("flex items-start gap-2 text-sm", textDim)}>
                          <span className="h-1.5 w-1.5 rounded-full bg-lapis shrink-0 mt-1.5" />
                          <span className="text-justify">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )

          case "solution":
            return (
              <SolutionBlock
                key={i}
                block={block}
                isPrint={isPrint}
                textDim={textDim}
                accent={accent}
                accentBg={accentBg}
                border={border}
                panelBg={panelBg}
              />
            )

          case "table":
            return (
              <div key={i} className={cn("overflow-x-auto border bg-canvas", borderSoft)}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={panelBg}>
                      {block.headers.map((h) => (
                        <th key={h} className={cn("text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 whitespace-nowrap", accent)}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={cn("border-t", borderSoft)}>
                        {row.map((cell, k) => (
                          <td key={k} className={cn("px-4 py-3 align-top", textDim)}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
