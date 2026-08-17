import { useEffect, useRef } from "react"

interface GeoGridFieldProps {
  className?: string
}

/**
 * Fond animé procédural — grille de coordonnées + balayage façon capteur satellite.
 * Aucun asset requis (contrairement à ScrollFrameCanvas) : tourne dès le premier chargement.
 * Thème géomatique assumé plutôt que décoratif générique : grille = maillage cartographique,
 * balayage = passage de capteur, points = stations/observations.
 */
export function GeoGridField({ className }: GeoGridFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cell = 46

    const points: { x: number; y: number; phase: number }[] = []

    function resize() {
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      points.length = 0
      const cols = Math.ceil(w / cell) + 1
      const rows = Math.ceil(h / cell) + 1
      for (let i = 0; i < 46; i++) {
        points.push({
          x: Math.random() * cols * cell,
          y: Math.random() * rows * cell,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw() {
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      ctx!.clearRect(0, 0, w, h)

      const offset = (t * 6) % cell

      // grille de coordonnées, dérive lente
      ctx!.strokeStyle = "rgba(34, 211, 238, 0.08)"
      ctx!.lineWidth = 1
      for (let x = -offset; x < w + cell; x += cell) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
        ctx!.stroke()
      }
      for (let y = -offset * 0.6; y < h + cell; y += cell) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
        ctx!.stroke()
      }

      // points d'observation, pulsation douce
      for (const p of points) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + p.phase)
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.4 + pulse * 1.2, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(246, 184, 76, ${0.15 + pulse * 0.35})`
        ctx!.fill()
      }

      // balayage capteur, bande diagonale qui traverse lentement
      const sweepX = ((t * 40) % (w + 400)) - 200
      const gradient = ctx!.createLinearGradient(sweepX - 120, 0, sweepX + 120, 0)
      gradient.addColorStop(0, "rgba(34, 211, 238, 0)")
      gradient.addColorStop(0.5, "rgba(34, 211, 238, 0.06)")
      gradient.addColorStop(1, "rgba(34, 211, 238, 0)")
      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, w, h)

      t += 0.016
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
