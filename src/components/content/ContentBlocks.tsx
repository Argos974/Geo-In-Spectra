import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import type { ContentBlock } from "@/content/types"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/slug"
import { Diagram } from "@/components/diagrams"
import { OsmBufferVitrolles } from "@/components/live/OsmBufferVitrolles"
import { GameBlock } from "@/components/content/GameBlock"
import type { GameDef } from "@/data/games"
import { linkifyGlossaryTerms } from "@/lib/linkifyGlossaryTerms"

// Chargés à la demande : ces quatre planches embarquent chacune des
// dépendances lourdes (geotiff.js + ses codecs LERC/ZSTD, turf, proj4 — ~150
// à 250 ko à elles seules) qui n'ont aucune raison de peser sur CHAQUE page
// de module (ContentBlocks est le point de rendu commun à toutes les salles)
// alors qu'une seule salle sur toutes n'en a besoin par planche. OsmBufferVitrolles
// reste en import direct : pas de dépendance lourde, juste fetch().
const RasterExplorer = lazy(() => import("@/components/live/RasterExplorer").then((m) => ({ default: m.RasterExplorer })))
const GridChoropleth = lazy(() => import("@/components/live/GridChoropleth").then((m) => ({ default: m.GridChoropleth })))
const SentinelSwipe = lazy(() => import("@/components/live/SentinelSwipe").then((m) => ({ default: m.SentinelSwipe })))
const RtkNetworkMap = lazy(() => import("@/components/live/RtkNetworkMap").then((m) => ({ default: m.RtkNetworkMap })))
const GpsLiveDemo = lazy(() => import("@/components/live/GpsLiveDemo").then((m) => ({ default: m.GpsLiveDemo })))
const WildfireKdeMap = lazy(() => import("@/components/live/WildfireKdeMap").then((m) => ({ default: m.WildfireKdeMap })))
const TilePyramidExplorer = lazy(() => import("@/components/live/TilePyramidExplorer").then((m) => ({ default: m.TilePyramidExplorer })))
const DrawOperationGame = lazy(() => import("@/components/games/DrawOperationGame").then((m) => ({ default: m.DrawOperationGame })))

function LivePlaceholder({ textDim }: { textDim: string }) {
  return <p className={cn("font-mono text-sm", textDim)}>Chargement de la planche…</p>
}

type Variant = "dark" | "print"

const calloutStylesDark: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/40 bg-lapis/[0.08]",
  warning: "border-oxblood/40 bg-oxblood/[0.08]",
  example: "border-gilt/40 bg-gilt/[0.07]",
  question: "border-parchment/35 bg-parchment/[0.06]",
  rappel: "border-dashed border-lapis-bright/45 bg-lapis-bright/[0.05]",
}
const calloutStylesPrint: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/50 bg-lapis/[0.05]",
  warning: "border-oxblood/50 bg-oxblood/[0.05]",
  example: "border-[#8a6a2f]/50 bg-[#8a6a2f]/[0.05]",
  question: "border-[#2b2116]/35 bg-[#2b2116]/[0.04]",
  rappel: "border-dashed border-[#2f5a8a]/50 bg-[#2f5a8a]/[0.05]",
}

const calloutLabel: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "Remarque",
  warning: "Attention",
  example: "Exemple",
  question: "À toi de voir",
  rappel: "↺ Rappel",
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

type ActiveMarginNote = { id: number; title: string; text: string }

/**
 * Contenu d'une anecdote en cours d'affichage dans une colonne de marge (voir
 * MarginSlot) — juste le texte, l'identité du bloc qui l'a activée sert à savoir
 * qui a le droit de la faire disparaître (voir activateMarginNote plus bas).
 */

/**
 * Point d'ancrage invisible (pas de <aside> : rôle ARIA "complementary" implicite,
 * et un lecteur d'écran signale une violation dès que plusieurs landmarks du même
 * type coexistent sans nom distinct — audit axe-core, landmark-unique — sur une
 * page à 5 anecdotes ça en ferait 5 non nommées ; une anecdote n'est de toute façon
 * pas une vraie région "complémentaire" au sens de la page) posé à la place exacte
 * de l'anecdote dans le texte. Il ne montre rien lui-même à partir de `xl` : il
 * prévient juste ContentBlocks (via `onActivate`) quand cette portion du texte
 * traverse le viewport, pour que le contenu apparaisse dans la colonne de marge
 * fixe correspondante (MarginSlot) au lieu de rester collé ici. En dessous de
 * `xl` (pas assez de gouttière pour une colonne, comme le mini-nav ChapterNav)
 * et à l'impression (rendu statique hors défilement), il affiche directement son
 * contenu en ligne, sans observateur — traitement délibérément discret (pas de
 * fond, pas de gras, italique fin) : une digression, pas une information au même
 * rang qu'un callout ou une formule.
 */
function MarginNoteAnchor({
  id,
  block,
  isPrint,
  textDim,
  onActivate,
}: {
  id: number
  block: Extract<ContentBlock, { type: "marginnote" }>
  isPrint: boolean
  textDim: string
  onActivate: (id: number, note: { title: string; text: string } | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPrint) return
    const el = ref.current
    if (!el) return
    // Bande de déclenchement volontairement large (le point d'ancrage entier, pas
    // une fraction resserrée) : un retrait en pourcentage de la hauteur du viewport
    // avait déjà, une fois, réduit cette bande à une fenêtre minuscule voire négative
    // sur une fenêtre de hauteur modeste — rendant l'anecdote invisible en permanence.
    // Ici, l'anecdote reste affichée tant que son point d'ancrage touche l'écran, du
    // moment où il entre par le bas jusqu'à sa sortie par le haut.
    const observer = new IntersectionObserver(
      ([entry]) => onActivate(id, entry.isIntersecting ? { title: block.title, text: block.text } : null),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id, isPrint, block.title, block.text, onActivate])

  // Le point de mesure (`ref`) reste toujours un élément réel du flux — jamais
  // `display:none` — même quand son contenu visuel est masqué à `xl`+ : un élément cd
  // `display:none` sort du rendu et n'a plus de position, `IntersectionObserver` ne
  // peut alors plus jamais le voir traverser le viewport. Seul l'enfant (le contenu
  // visible de secours en dessous de `xl`) porte `xl:hidden`, jamais le conteneur mesuré.
  return (
    <div ref={ref}>
      <div className={cn(!isPrint && "xl:hidden", "mb-2 py-0.5 border-l-2 pl-3", isPrint ? "border-[#8a6a2f]/25" : "border-gilt/20")}>
        <p className={cn("font-mono text-[9px] uppercase tracking-wider mb-1 opacity-80", textDim)}>{block.title}</p>
        <p className={cn("text-[12.5px] leading-relaxed italic opacity-80", textDim)}>{block.text}</p>
      </div>
    </div>
  )
}

/**
 * Colonne de marge, positionnée dans la marge exactement comme ChapterNav (même
 * distance depuis le bord de la colonne de lecture centrée) — mais affichant
 * l'anecdote actuellement "active" (voir MarginNoteAnchor) au lieu d'une liste de
 * chapitres. Rendue une seule fois par page/chapitre ouvert, pas une par anecdote :
 * le contenu qu'elle affiche change (fondu) au fil du défilement, sa position ne
 * bouge pas.
 *
 * `fixed`, pas `sticky` comme ChapterNav : cette colonne apparaît/disparaît (donc
 * change de hauteur) à chaque anecdote, alors que ChapterNav a une hauteur stable
 * du début à la fin. Un élément `sticky` reste dans le flux normal — le moindre
 * changement de sa propre hauteur repousse tout ce qui suit, y compris les points
 * d'ancrage plus bas dans le texte (voir MarginNoteAnchor) ; si l'un de ces points
 * est juste à la limite du viewport au même instant, ce déplacement suffit à
 * inverser son intersection, ce qui déclenche un nouveau changement de hauteur, qui
 * le repousse à nouveau dans l'autre sens : c'était le tremblement observé au
 * moment précis où une anecdote apparaît/disparaît. `fixed` sort complètement du
 * flux du document : son affichage ne peut plus ni pousser ni être poussé par le
 * reste de la page, la boucle est cassée à la racine.
 *
 * Position calculée depuis `50vw` (le centre du viewport) plutôt que depuis le
 * conteneur `max-w-4xl` centré : un élément `fixed` ne connaît que le viewport, pas
 * la mise en page de son ancêtre. La constante à gauche (656px) reproduit
 * exactement l'offset de ChapterNav (moitié de 896px + distance de décalage hors
 * colonne), vérifiée pixel pour pixel par mesure directe du DOM — d'où une boîte
 * de même largeur (`w-48`) que lui, cohérent avec "la même colonne".
 *
 * Une boîte à la largeur de ChapterNav (`w-48`) déborderait sur le texte à la
 * largeur `xl` minimale (1280px) : ChapterNav absorbe ce même manque de place en
 * tronquant ses titres sur une ligne (`truncate`), ce qu'un paragraphe d'anecdote
 * ne peut pas faire proprement. La colonne est donc plus étroite (`w-40`) avec un
 * espacement fixe (24px, indépendant de la largeur du viewport) entre son bord
 * gauche et le bord droit du texte — jamais de chevauchement, à aucune largeur
 * `xl` et au-delà. Toutes les anecdotes sortent systématiquement à droite (jamais
 * en alternance avec une colonne gauche) : c'est là que l'œil du lecteur les
 * retrouve toujours, sans devoir balayer les deux côtés de la page.
 */
function MarginSlot({ note, isPrint, textDim }: { note: ActiveMarginNote | null; isPrint: boolean; textDim: string }) {
  if (isPrint) return null
  return (
    <div
      aria-hidden={!note}
      className={cn(
        "hidden xl:block xl:fixed xl:w-40 xl:top-32 xl:right-[calc(50vw-632px)] xl:transition-opacity xl:duration-700 xl:ease-out",
        note ? "xl:opacity-100" : "xl:opacity-0",
      )}
    >
      {note && (
        <div className="border-l-2 border-gilt/20 pl-3 py-0.5">
          <p className={cn("font-mono text-[9px] uppercase tracking-wider mb-1 opacity-80", textDim)}>{note.title}</p>
          <p className={cn("text-[12.5px] leading-relaxed italic opacity-80", textDim)}>{note.text}</p>
        </div>
      )}
    </div>
  )
}

export function ContentBlocks({ blocks, variant = "dark", game, moduleSlug }: { blocks: ContentBlock[]; variant?: Variant; game?: GameDef; moduleSlug?: string }) {
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

  // Anecdote actuellement affichée dans la colonne de marge (voir MarginSlot) —
  // `id` (index du bloc) sert à arbitrer les activations concurrentes : un ancrage
  // ne peut effacer la colonne que s'il en est bien l'auteur actuel, sinon un
  // ancrage qui sort du viewport après qu'un autre y soit déjà entré écraserait le
  // nouveau contenu avec `null`.
  const [activeRight, setActiveRight] = useState<ActiveMarginNote | null>(null)
  const activateRight = useCallback((id: number, note: { title: string; text: string } | null) => {
    setActiveRight((prev) => (note ? { id, ...note } : prev?.id === id ? null : prev))
  }, [])

  // Extrait en fonction nommée (plutôt qu'une closure inline dans blocks.map)
  // pour être réutilisable récursivement par le case "brique" ci-dessous, qui
  // doit rendre son propre sous-tableau de blocs avec exactement la même
  // logique que le niveau racine.
  function renderBlock(block: ContentBlock, i: number) {
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

          case "live": {
            // Interrogation réseau réelle (API Overpass, GeoTIFF décodé côté client,
            // catalogue STAC…) : n'a de sens que sur le site vivant. En export PDF,
            // Playwright génère une page statique hors-ligne — afficher un état de
            // chargement figé serait trompeur, donc on affiche à la place un renvoi
            // explicite vers la version web plutôt que de tenter le fetch/décodage.
            const LIVE_PRINT_LABEL: Record<typeof block.name, string> = {
              "osm-buffer-vitrolles": "Cette section interroge l'API OpenStreetMap en temps réel, consulter la version web du module pour l'exécuter et voir les nombres actuels.",
              "raster-explorer": "Cette planche décode le GeoTIFF réel du jeu de données dans le navigateur, consulter la version web du module pour l'explorer pixel par pixel.",
              "grid-choropleth": "Cette planche affiche la grille 100 m interactive, consulter la version web du module pour cliquer une cellule.",
              "sentinel-swipe": "Cette planche interroge en direct le catalogue Sentinel-2 (Element84/AWS) pour deux dates réelles, consulter la version web du module pour la voir.",
              "rtk-network-map": "Cette planche affiche une carte interactive du réseau GNSS permanent français par région, consulter la version web du module pour l'explorer région par région.",
              "gps-live-demo": "Cette planche interroge la géolocalisation réelle de l'appareil du lecteur, consulter la version web du module pour te localiser toi-même.",
              "wildfire-kde-map": "Cette planche affiche une carte de densité par noyau interactive sur six mégafeux français réels, consulter la version web du module pour faire varier la bande passante h.",
              "tile-pyramid-explorer": "Cette planche calcule en direct les indices de tuile z/x/y et la résolution au sol pour un point choisi, consulter la version web du module pour l'utiliser.",
            }
            if (isPrint) {
              return (
                <div key={i} className={cn("border p-5 md:p-8 text-sm", border, panelBg)}>
                  <p className={cn("font-mono text-[10px] uppercase tracking-wider mb-2", accent)}>Donnée interrogée en direct</p>
                  <p className={textDim}>{LIVE_PRINT_LABEL[block.name]}</p>
                  {block.caption && <p className={cn("mt-2", textDim)}>{block.caption}</p>}
                </div>
              )
            }
            return (
              <div key={i}>
                {block.name === "osm-buffer-vitrolles" && <OsmBufferVitrolles />}
                <Suspense fallback={<LivePlaceholder textDim={textDim} />}>
                  {block.name === "raster-explorer" && <RasterExplorer />}
                  {block.name === "grid-choropleth" && <GridChoropleth />}
                  {block.name === "sentinel-swipe" && <SentinelSwipe />}
                  {block.name === "rtk-network-map" && <RtkNetworkMap />}
                  {block.name === "gps-live-demo" && <GpsLiveDemo />}
                  {block.name === "wildfire-kde-map" && <WildfireKdeMap />}
                  {block.name === "tile-pyramid-explorer" && <TilePyramidExplorer />}
                </Suspense>
                {block.caption && <p className={cn("mt-3 text-sm", textDim)}>{block.caption}</p>}
              </div>
            )
          }

          case "live-game":
            return isPrint ? (
              <div key={i} className={cn("border-2 p-5 md:p-6", isPrint ? "border-[#7a2f24]/60" : "border-oxblood/60")}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", isPrint ? "text-[#7a2f24]" : "text-oxblood-bright")}>À toi de jouer</p>
                <p className={textDim}>Exercice interactif de dessin, à faire sur la version web du site.</p>
              </div>
            ) : (
              <div key={i} className="border-2 border-oxblood/40 bg-oxblood/[0.06] p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider mb-3 text-oxblood-bright">À toi de jouer</p>
                <Suspense fallback={<LivePlaceholder textDim={textDim} />}>
                  {block.name === "draw-operation" && <DrawOperationGame />}
                </Suspense>
              </div>
            )

          case "devoir":
            // Un devoir à rendre est un engagement, pas une digression : contrairement
            // à "solution" (repliée par défaut, une réponse à consulter après coup),
            // ce bloc reste toujours visible et porte un accent oxblood — le même
            // registre visuel que "warning", volontairement, pour qu'il se distingue
            // au premier coup d'œil de tout le reste du contenu de la séance.
            return (
              <div key={i} className={cn("border-2 p-5 md:p-6 avoid-break", isPrint ? "border-[#7a2f24]/60" : "border-oxblood/60")}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <p className={cn("font-mono text-[11px] uppercase tracking-wider", isPrint ? "text-[#7a2f24]" : "text-oxblood-bright")}>
                    Devoir à rendre : {block.format}
                  </p>
                </div>
                <h3 className={cn("font-heading text-lg mb-2", text)}>{block.title}</h3>
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

          case "marginnote":
            return (
              <MarginNoteAnchor key={i} id={i} block={block} isPrint={isPrint} textDim={textDim} onActivate={activateRight} />
            )

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
              // max-w-[70ch] : sans ça, la prose court sur toute la largeur du
              // conteneur (max-w-4xl, ~896px), partagée avec tableaux/diagrammes —
              // soit 100+ signes par ligne en EB Garamond, bien au-delà des ~65-75
              // recommandés pour une lecture confortable. Les tableaux/diagrammes/
              // formules, eux, restent en pleine largeur : ils en profitent.
              <p key={i} className={cn("max-w-[70ch] leading-relaxed text-justify", textDim)}>
                {isPrint ? block.text : linkifyGlossaryTerms(block.text, moduleSlug)}
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
              <Tag key={i} className={cn("max-w-[70ch] space-y-2", textDim, block.ordered ? "list-decimal pl-5" : "pl-0")}>
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
              <div key={i} className={cn("border p-5 avoid-break", border, panelBg)}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", accent)}>{block.label}</p>
                <p className={cn("font-mono text-sm md:text-base break-words", text)}>{block.formula}</p>
                {block.note && <p className={cn("text-sm mt-3 text-justify", textDim)}>{block.note}</p>}
              </div>
            )

          case "callout":
            return (
              <div key={i} className={cn("border p-5 avoid-break", calloutStyles[block.tone ?? "info"])}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", textDim)}>
                  {calloutLabel[block.tone ?? "info"]}
                </p>
                <h3 className={cn("font-heading text-lg mb-1", text)}>{block.title}</h3>
                <p className={cn("leading-relaxed text-justify", textDim)}>{block.text}</p>
              </div>
            )

          case "comparison":
            return (
              <div key={i} className="grid gap-4 md:grid-cols-2">
                {block.items.map((col) => (
                  <div key={col.label} className={cn("border p-5", borderSoft, isPrint ? "bg-black/[0.015]" : "bg-white/[0.02]")}>
                    <h3 className={cn("font-heading mb-3", text)}>{col.label}</h3>
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
              <div key={i} className={cn("overflow-x-auto border bg-canvas scroll-shadow-x", borderSoft)}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={panelBg}>
                      {block.headers.map((h) => (
                        <th key={h} className={cn("text-left font-mono text-[11px] uppercase tracking-wider px-3 py-3 sm:px-4 sm:whitespace-nowrap", accent)}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={cn("border-t", borderSoft)}>
                        {row.map((cell, k) => (
                          <td key={k} className={cn("px-3 py-3 sm:px-4 align-top", textDim)}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case "brique":
            // Sous-groupe adressable (voir lib/briques.ts::getBrique) — encart
            // visuellement distinct pour signaler "ce fragment est réutilisé
            // ailleurs" quand il apparaît dans une séance de l'Atelier, et
            // reste lisible tel quel dans sa salle d'origine.
            return (
              <div key={i} className={cn("border-2 p-5 md:p-6 space-y-4 avoid-break", isPrint ? "border-[#8a6a2f]/45" : "border-gilt/35")}>
                <p className={cn("font-mono text-[10px] uppercase tracking-wider", accent)}>Brique — {block.title}</p>
                {block.blocks.map(renderBlock)}
              </div>
            )

          default:
            return null
    }
  }

  return (
    <div className="space-y-6">
      <MarginSlot note={activeRight} isPrint={isPrint} textDim={textDim} />
      {blocks.map(renderBlock)}
    </div>
  )
}
