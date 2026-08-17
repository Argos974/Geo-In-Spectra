import { Link, useLocation } from "react-router-dom"
import { modules } from "@/data/modules"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-space/70 border-b border-white/5">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link to="/" className="font-heading text-sm uppercase tracking-[0.28em] text-text-primary">
          Géomatique<span className="text-signal">.</span>Télédétection
        </Link>
        <div className="hidden md:flex items-center gap-6 font-mono text-[12px] uppercase tracking-wider text-text-secondary">
          {modules.map((m) => (
            <Link
              key={m.slug}
              to={`/module/${m.slug}`}
              className={cn(
                "transition-colors hover:text-signal",
                location.pathname === `/module/${m.slug}` && "text-signal",
              )}
            >
              {m.title.split(" ")[0]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
