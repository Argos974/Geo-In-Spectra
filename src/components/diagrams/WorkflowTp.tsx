/**
 * Planche VII — remplace un stepper générique ("Charger/Styliser/Analyser/
 * Exporter", vocabulaire de menu QGIS) qui ne montrait pas ce que la légende
 * de la section annonce : "de la donnée brute géoréférencée jusqu'à la carte
 * de synthèse ET son rapport" — deux livrables distincts, pas un seul. Cette
 * version dessine la vraie forme du fil directeur : une source non numérotée
 * (grille de pixels bruts, non classée), trois étapes de traitement réellement
 * partagées par les séances (charger/géoréférencer, calculer/agréger — indices,
 * stats zonales, ΔNDVI, buffer —, classer/synthétiser), puis une bifurcation
 * explicite vers deux destinations non numérotées : une grille classée (la
 * carte) et une page de texte (le rapport). Le grillage source volontairement
 * uniforme vs. la grille d'arrivée à cellules distinctes code visuellement la
 * transformation "brut -> classé", sans icône figurative.
 */
const steps = [
  { numeral: "I", label: "Charger & géoréférencer" },
  { numeral: "II", label: "Calculer & agréger" },
  { numeral: "III", label: "Classer & synthétiser" },
]

const spacing = 175
const startX = 150
const y = 95

function RawGrid({ cx, cy }: { cx: number; cy: number }) {
  const s = 7
  const cells = [0, 1, 2]
  return (
    <g stroke="currentColor" strokeWidth="1" fill="none">
      {cells.map((row) =>
        cells.map((col) => (
          <rect key={`${row}-${col}`} x={cx - 1.5 * s + col * s} y={cy - 1.5 * s + row * s} width={s} height={s} />
        )),
      )}
    </g>
  )
}

function ClassedGrid({ cx, cy }: { cx: number; cy: number }) {
  const s = 8
  // Motif volontairement irrégulier (pas un damier) : évoque une classification
  // réelle plutôt qu'un simple négatif du grillage source.
  const filled = new Set(["0-0", "0-2", "1-1", "2-0", "2-1"])
  const cells = [0, 1, 2]
  return (
    <g stroke="currentColor" strokeWidth="1">
      {cells.map((row) =>
        cells.map((col) => (
          <rect
            key={`${row}-${col}`}
            x={cx - 1.5 * s + col * s}
            y={cy - 1.5 * s + row * s}
            width={s}
            height={s}
            fill={filled.has(`${row}-${col}`) ? "currentColor" : "none"}
            fillOpacity={filled.has(`${row}-${col}`) ? 0.55 : 1}
          />
        )),
      )}
    </g>
  )
}

function ReportGlyph({ cx, cy }: { cx: number; cy: number }) {
  const w = 20
  const h = 26
  const x = cx - w / 2
  const yTop = cy - h / 2
  const fold = 7
  return (
    <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round">
      <path d={`M ${x} ${yTop} H ${x + w - fold} L ${x + w} ${yTop + fold} V ${yTop + h} H ${x} Z`} />
      <path d={`M ${x + w - fold} ${yTop} V ${yTop + fold} H ${x + w}`} />
      <line x1={x + 4} y1={yTop + fold + 5} x2={x + w - 4} y2={yTop + fold + 5} strokeWidth="0.9" />
      <line x1={x + 4} y1={yTop + fold + 10} x2={x + w - 4} y2={yTop + fold + 10} strokeWidth="0.9" />
      <line x1={x + 4} y1={yTop + fold + 15} x2={x + w - 6} y2={yTop + fold + 15} strokeWidth="0.9" />
    </g>
  )
}

export function WorkflowTp() {
  const sourceX = 42
  const forkX = startX + (steps.length - 1) * spacing + 22
  const endX = forkX + 90
  const mapY = y - 38
  const reportY = y + 38

  return (
    <svg
      viewBox="0 0 720 190"
      className="w-full h-auto"
      role="img"
      aria-label="De la donnée brute géoréférencée (grille non classée) aux trois étapes de traitement communes aux séances (charger/géoréférencer, calculer/agréger, classer/synthétiser), jusqu'à deux livrables distincts : la carte de synthèse et le rapport"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {/* Spine source -> III, en pointillés (donnée qui circule) */}
        <path
          d={`M ${sourceX + 14} ${y} L ${startX - 22} ${y} ${steps.map((_, i) => `M ${startX + i * spacing - 22} ${y} L ${startX + i * spacing + 22} ${y}`).join(" ")}`}
          strokeDasharray="1 6"
          strokeLinecap="round"
          strokeWidth="1.4"
        />
        {/* Bifurcation finale : deux livrables, pas un */}
        <path d={`M ${forkX} ${y} Q ${forkX + 46} ${mapY} ${endX - 16} ${mapY}`} strokeDasharray="1 6" strokeLinecap="round" strokeWidth="1.4" />
        <path d={`M ${forkX} ${y} Q ${forkX + 46} ${reportY} ${endX - 16} ${reportY}`} strokeDasharray="1 6" strokeLinecap="round" strokeWidth="1.4" />

        {steps.map((_, i) => (
          <circle key={i} cx={startX + i * spacing} cy={y} r="22" strokeWidth="1.3" fill="rgb(var(--color-ink))" />
        ))}
        <rect x={endX - 16} y={mapY - 16} width="32" height="32" strokeWidth="1.3" fill="rgb(var(--color-ink))" />
        <rect x={endX - 16} y={reportY - 16} width="32" height="32" strokeWidth="1.3" fill="rgb(var(--color-ink))" />
      </g>

      <RawGrid cx={sourceX} cy={y} />
      <ClassedGrid cx={endX} cy={mapY} />
      <ReportGlyph cx={endX} cy={reportY} />

      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        <text x={sourceX} y={y + 42} fontSize="9.5" textAnchor="middle" letterSpacing="0.3">Donnée brute</text>

        {steps.map((step, i) => (
          <g key={step.numeral}>
            <text x={startX + i * spacing} y={y + 5} fontSize="13" textAnchor="middle" fontFamily="Cinzel, serif">
              {step.numeral}
            </text>
            <text x={startX + i * spacing} y={y + 45} fontSize="10.5" textAnchor="middle" letterSpacing="0.3">
              {step.label}
            </text>
          </g>
        ))}

        <text x={endX} y={mapY - 26} fontSize="9.5" textAnchor="middle" letterSpacing="0.3">Carte de synthèse</text>
        <text x={endX} y={reportY + 30} fontSize="9.5" textAnchor="middle" letterSpacing="0.3">Rapport</text>
      </g>
    </svg>
  )
}
