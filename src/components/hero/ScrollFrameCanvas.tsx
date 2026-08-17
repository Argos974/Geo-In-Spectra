import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollFrameCanvasProps {
  /** URLs des frames, dans l'ordre de lecture (ex: séquence flyover satellite → sol). */
  frameUrls: string[]
  /** Hauteur de la zone de scroll qui pilote la séquence, en multiples de 100vh. */
  scrollLengthVh?: number
  className?: string
}

/**
 * Séquence d'images scrubbée au scroll (technique "Apple product page" / kryntixstudio.vercel.app,
 * vérifiée via reverse-engineering de leur bundle : canvas 2D drawImage(), pas de WebGL).
 *
 * Fournir une vraie séquence de frames (rendu Blender, capture MapLibre GL flyover, etc.)
 * pour remplacer l'écran vide — voir CLAUDE.md / conversation d'origine pour la démarche.
 */
export function ScrollFrameCanvas({ frameUrls, scrollLengthVh = 500, className }: ScrollFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    if (frameUrls.length === 0) return
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let cancelled = false
    imagesRef.current = frameUrls.map((src) => {
      const img = new Image()
      img.src = src
      return img
    })

    const state = { frame: 0 }

    function draw(index: number) {
      const img = imagesRef.current[Math.max(0, Math.min(index, imagesRef.current.length - 1))]
      if (!img || !img.complete || !ctx || !canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = wrapper!.clientWidth
      const h = wrapper!.clientHeight
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      ctx.clearRect(0, 0, w, h)
      const scale = Math.max(w / img.width, h / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }

    imagesRef.current[0].onload = () => draw(0)

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${scrollLengthVh}%`,
      scrub: true,
      onUpdate: (self) => {
        if (cancelled) return
        state.frame = Math.round(self.progress * (frameUrls.length - 1))
        draw(state.frame)
      },
    })

    const onResize = () => draw(state.frame)
    window.addEventListener("resize", onResize)

    return () => {
      cancelled = true
      trigger.kill()
      window.removeEventListener("resize", onResize)
    }
  }, [frameUrls, scrollLengthVh])

  return (
    <div ref={wrapperRef} className={className} style={{ height: `${scrollLengthVh}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", background: "#04070d" }} />
      </div>
    </div>
  )
}
