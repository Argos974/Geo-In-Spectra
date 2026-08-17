import { Link, useLocation } from "react-router-dom"
import { modules } from "@/data/modules"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/80 border-b border-gilt/15">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link to="/" className="font-heading text-sm uppercase tracking-[0.28em] text-parchment">
          Geo-In<span className="text-gilt">.</span>Spectra
        </Link>
        <div className="hidden lg:flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-parchment-dim">
          {modules.map((m) => (
            <Link
              key={m.slug}
              to={`/module/${m.slug}`}
              className={cn(
                "transition-colors hover:text-gilt",
                location.pathname === `/module/${m.slug}` && "text-gilt",
              )}
            >
              {m.navLabel}
            </Link>
          ))}
          <Link
            to="/glossaire"
            className={cn(
              "pl-4 border-l border-gilt/20 transition-colors hover:text-gilt",
              location.pathname === "/glossaire" && "text-gilt",
            )}
          >
            Glossaire
          </Link>
          <Link
            to="/references"
            className={cn(
              "transition-colors hover:text-gilt",
              location.pathname === "/references" && "text-gilt",
            )}
          >
            Références
          </Link>
        </div>
      </nav>
    </header>
  )
}
