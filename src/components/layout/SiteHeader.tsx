import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { modules } from "@/data/modules"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Referme le menu mobile à chaque changement de route (sélection d'un lien,
  // navigation arrière du navigateur…) plutôt que de dépendre uniquement du clic.
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navLinkClass = (active: boolean) => cn("transition-colors hover:text-gilt", active && "text-gilt")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/80 border-b border-gilt/15">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link to="/" className="font-heading text-sm uppercase tracking-[0.28em] text-parchment">
          Geo-In<span className="text-gilt">.</span>Spectra
        </Link>

        <div className="hidden lg:flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-parchment-dim">
          {modules.map((m) => (
            <Link key={m.slug} to={`/module/${m.slug}`} className={navLinkClass(location.pathname === `/module/${m.slug}`)}>
              {m.navLabel}
            </Link>
          ))}
          <Link to="/glossaire" className={cn("pl-4 border-l border-gilt/20", navLinkClass(location.pathname === "/glossaire"))}>
            Glossaire
          </Link>
          <Link to="/references" className={navLinkClass(location.pathname === "/references")}>
            Références
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="lg:hidden p-2 -mr-2 text-parchment hover:text-gilt transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-gilt/15 bg-ink/95 backdrop-blur-md px-6 py-4 max-h-[calc(100vh-64px)] overflow-y-auto"
        >
          <div className="flex flex-col gap-1 font-mono text-[13px] uppercase tracking-wider text-parchment-dim">
            {modules.map((m) => (
              <Link
                key={m.slug}
                to={`/module/${m.slug}`}
                className={cn("py-2.5 border-b border-gilt/10 transition-colors hover:text-gilt", navLinkClass(location.pathname === `/module/${m.slug}`))}
              >
                {m.navLabel}
              </Link>
            ))}
            <Link
              to="/glossaire"
              className={cn("py-2.5 border-b border-gilt/10 transition-colors hover:text-gilt", navLinkClass(location.pathname === "/glossaire"))}
            >
              Glossaire
            </Link>
            <Link
              to="/references"
              className={cn("py-2.5 transition-colors hover:text-gilt", navLinkClass(location.pathname === "/references"))}
            >
              Références
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
