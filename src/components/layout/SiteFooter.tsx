import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="border-t border-gilt/15 bg-ink py-10 px-6">
      <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-parchment-dim">
        <span>Géomatique &amp; Télédétection — galerie pédagogique</span>
        <div className="flex items-center gap-6">
          <Link to="/mentions-legales" className="hover:text-gilt transition-colors">Mentions légales</Link>
          <span>EPSG:2154 · Lambert-93</span>
        </div>
      </div>
    </footer>
  )
}
