const layers = [4, 5, 5, 3]
const layerX = [40, 200, 360, 520]
const layerLabels = ["Entrée", "Couche cachée", "Couche cachée", "Sortie"]

function nodesY(count: number, height: number) {
  const gap = height / (count + 1)
  return Array.from({ length: count }, (_, i) => gap * (i + 1))
}

export function NeuralNetwork() {
  const height = 200
  const positions = layers.map((n) => nodesY(n, height))

  return (
    <svg viewBox="0 0 560 240" className="w-full h-auto" role="img" aria-label="Schéma d'un réseau de neurones à plusieurs couches, entrée, deux couches cachées, sortie">
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.35">
        {layers.slice(0, -1).map((_, li) =>
          positions[li].map((y1, i) =>
            positions[li + 1].map((y2, j) => (
              <line key={`${li}-${i}-${j}`} x1={layerX[li]} y1={y1 + 10} x2={layerX[li + 1]} y2={y2 + 10} />
            )),
          ),
        )}
      </g>
      {layers.map((_, li) => (
        <g key={li}>
          {positions[li].map((y, i) => (
            <circle key={i} cx={layerX[li]} cy={y + 10} r="6" fill="rgb(var(--color-ink))" stroke="currentColor" strokeWidth="1.3" />
          ))}
        </g>
      ))}
      <g fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none">
        {layerLabels.map((label, li) => (
          <text key={li} x={layerX[li]} y={230} fontSize="10" textAnchor="middle" letterSpacing="0.3">
            {label}
          </text>
        ))}
      </g>
    </svg>
  )
}
