import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GalleryFrame } from "@/components/gallery/GalleryFrame"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V"]

export function Home() {
  const roomsRef = useRef<HTMLDivElement>(null)
  const hero = artworks.hero

  useEffect(() => {
    const rooms = roomsRef.current?.querySelectorAll("[data-room]")
    if (!rooms) return
    rooms.forEach((room) => {
      const frame = room.querySelector("[data-room-frame]")
      const text = room.querySelector("[data-room-text]")
      const tl = gsap.timeline({
        scrollTrigger: { trigger: room, start: "top 78%" },
      })
      if (frame) tl.fromTo(frame, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" })
      if (text) tl.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.6")
    })
  }, [])

  return (
    <div className="bg-ink text-parchment">
      {/* Frontispice */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={hero.src}
          alt={hero.alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.7)]" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-24 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gilt mb-6">
            Frontispice — Galerie de géomatique
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.15] mb-6 text-parchment">
            Mesurer le ciel.<br />Lire la terre.
          </h1>
          <p className="font-body text-lg md:text-xl italic text-parchment-dim max-w-xl mb-10 leading-relaxed">
            Avant les satellites, il y avait déjà des instruments, des cartes et un regard
            patient posé sur le monde. La géomatique moderne poursuit ce même geste —
            avec d'autres outils.
          </p>
          <a
            href="#rooms"
            className="font-mono text-[12px] uppercase tracking-[0.25em] text-gilt hover:text-gilt-bright transition-colors w-fit border-b border-gilt/40 hover:border-gilt-bright pb-1"
          >
            Entrer dans la galerie ↓
          </a>
        </div>

        <p className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.15em] text-parchment-dim/70">
          Fig. 0 — {hero.artist}, «&nbsp;{hero.title}&nbsp;», {hero.year}
        </p>
      </section>

      {/* Salles */}
      <div id="rooms" ref={roomsRef}>
        {modules.map((m, i) => {
          const art = artworks[m.slug]
          const reversed = i % 2 === 1
          return (
            <section
              key={m.slug}
              data-room
              className={cn(
                "relative border-t border-gilt/15 px-6 md:px-16 py-24 md:py-32",
                i % 2 === 0 ? "bg-ink" : "bg-canvas",
              )}
            >
              <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div data-room-frame className={cn(reversed && "md:order-2")}>
                  <GalleryFrame
                    src={art.src}
                    alt={art.alt}
                    artist={art.artist}
                    title={art.title}
                    year={art.year}
                    figure={ROOM_NUMERALS[i]}
                  />
                </div>

                <div data-room-text className={cn(reversed && "md:order-1")}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-4">
                    Salle {ROOM_NUMERALS[i]}
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl mb-5 leading-snug">{m.title}</h2>
                  <p className="font-body italic text-parchment-dim mb-6 leading-relaxed border-l-2 border-gilt/30 pl-4">
                    {m.epigraph}
                  </p>
                  <p className="text-parchment-dim mb-6 leading-relaxed">{m.summary}</p>
                  <ul className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 space-y-1.5 mb-8">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="h-[3px] w-[3px] rounded-full bg-gilt shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/module/${m.slug}`}
                    className="font-mono text-[12px] uppercase tracking-[0.2em] text-gilt hover:text-gilt-bright transition-colors border-b border-gilt/40 hover:border-gilt-bright pb-1"
                  >
                    Entrer →
                  </Link>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
