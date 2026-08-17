import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GeoGridField } from "@/components/hero/GeoGridField"
import { modules } from "@/data/modules"

gsap.registerPlugin(ScrollTrigger)

export function Home() {
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = sectionsRef.current?.querySelectorAll("[data-module-card]")
    if (!cards) return
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        },
      )
    })
  }, [])

  return (
    <div className="bg-space text-text-primary">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        <GeoGridField className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 w-full">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-signal mb-6">
            Géomatique · SIG · Télédétection
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-semibold leading-[1.05] max-w-3xl">
            Comprendre le territoire par l&apos;image et la donnée.
          </h1>
          <p className="mt-6 max-w-xl text-text-secondary text-lg">
            Cours et travaux pratiques de géomatique et télédétection —
            des systèmes de coordonnées à l&apos;analyse d&apos;images satellite.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#modules"
              className="rounded-md bg-signal text-space font-mono text-sm uppercase tracking-wider px-6 py-3 hover:bg-signal/90 transition-colors"
            >
              Voir les modules
            </a>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" ref={sectionsRef} className="relative py-32 px-6">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Modules du cours</h2>
          <p className="text-text-secondary max-w-xl mb-16">
            Cinq modules, du fondamental à la pratique. Chaque module est consultable
            en ligne et téléchargeable en PDF pour révision hors-ligne.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((m, i) => (
              <Link
                key={m.slug}
                to={`/module/${m.slug}`}
                data-module-card
                className="group relative rounded-lg border border-white/10 bg-white/[0.02] p-8 hover:border-signal/40 hover:bg-white/[0.04] transition-colors"
              >
                <span className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-2xl font-semibold mt-3 mb-2 group-hover:text-signal transition-colors">
                  {m.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{m.summary}</p>
                <ul className="font-mono text-[11px] uppercase tracking-wider text-text-secondary/70 space-y-1">
                  {m.topics.slice(0, 2).map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
