import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"

gsap.registerPlugin(ScrollTrigger)

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"]

export function Home() {
  const roomsRef = useRef<HTMLDivElement>(null)
  const hero = artworks.hero

  useEffect(() => {
    const rooms = roomsRef.current?.querySelectorAll("[data-room-text]")
    if (!rooms) return
    rooms.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } },
      )
    })
  }, [])

  return (
    <div className="bg-ink text-parchment">
      {/* Frontispice */}
      <ArtworkBackdrop art={hero} figure="0" className="h-screen w-full">
        <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-24 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gilt mb-6">
            Frontispice · Galerie de géomatique
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.15] mb-6 text-parchment">
            Mesurer le ciel.<br />Lire la terre.
          </h1>
          <p className="font-body text-lg md:text-xl italic text-parchment-dim max-w-xl mb-10 leading-relaxed">
            Avant les satellites, il y avait déjà des instruments, des cartes et un regard
            patient posé sur le monde. La géomatique moderne poursuit ce même geste,
            avec d'autres outils.
          </p>
          <a
            href="#rooms"
            className="font-mono text-[12px] uppercase tracking-[0.25em] text-gilt hover:text-gilt-bright transition-colors w-fit border-b border-gilt/40 hover:border-gilt-bright pb-1"
          >
            Entrer dans la galerie ↓
          </a>
        </div>
      </ArtworkBackdrop>

      {/* Salles */}
      <div id="rooms" ref={roomsRef}>
        {modules.map((m, i) => {
          const art = artworks[m.slug]
          return (
            <ArtworkBackdrop key={m.slug} art={art} figure={ROOM_NUMERALS[i]} className="min-h-screen w-full border-t border-gilt/15">
              <div data-room-text className="h-full flex flex-col justify-end px-6 md:px-16 py-20 md:py-24 max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-4">
                  Salle {ROOM_NUMERALS[i]}
                </p>
                <h2 className="font-heading text-3xl md:text-5xl mb-5 leading-snug">{m.title}</h2>
                <p className="font-body italic text-parchment-dim mb-6 leading-relaxed border-l-2 border-gilt/30 pl-4">
                  {m.epigraph}
                </p>
                <p className="text-parchment-dim mb-6 leading-relaxed max-w-xl">{m.summary}</p>
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
                  className="font-mono text-[12px] uppercase tracking-[0.2em] text-gilt hover:text-gilt-bright transition-colors border-b border-gilt/40 hover:border-gilt-bright pb-1 w-fit"
                >
                  Entrer →
                </Link>
              </div>
            </ArtworkBackdrop>
          )
        })}
      </div>
    </div>
  )
}
