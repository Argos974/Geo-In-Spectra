import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { modules } from "@/data/modules"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useTheme"

const RESOURCE_LINKS = [
  { to: "/glossaire", label: "Glossaire" },
  { to: "/references", label: "Références" },
  { to: "/pieges-frequents", label: "Pièges fréquents" },
  { to: "/formulaire", label: "Formulaire" },
  { to: "/jeux-de-donnees", label: "Jeux de données" },
  { to: "/parcours", label: "Parcours conseillés" },
  { to: "/annales", label: "Annales de concours" },
  { to: "/bilan", label: "Bilan de progression" },
]

export function SiteHeader() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = useRef<HTMLDivElement>(null)

  const onResourcesPage = RESOURCE_LINKS.some((r) => r.to === location.pathname)

  // Referme le menu mobile et le menu Ressources à chaque changement de route
  // (sélection d'un lien, navigation arrière du navigateur…) plutôt que de
  // dépendre uniquement du clic.
  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [location.pathname])

  // Ferme le menu Ressources au clic en dehors, ou à l'échappement — comportement
  // standard attendu d'un menu déroulant, sinon il reste ouvert indéfiniment.
  useEffect(() => {
    if (!resourcesOpen) return
    function onPointerDown(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) setResourcesOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setResourcesOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [resourcesOpen])

  const navLinkClass = (active: boolean) => cn("transition-colors hover:text-gilt", active && "text-gilt")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/80 border-b border-gilt/15">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between gap-10 px-8 py-4">
        <Link to="/" className="font-heading text-sm uppercase tracking-[0.28em] text-parchment shrink-0">
          Geo-In<span className="text-gilt">.</span>Spectra
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-evenly font-mono text-[11px] uppercase tracking-wider text-parchment-dim">
          {modules.map((m) => (
            <Link key={m.slug} to={`/module/${m.slug}`} className={navLinkClass(location.pathname === `/module/${m.slug}`)}>
              {m.navLabel}
            </Link>
          ))}
          <span className="h-4 w-px bg-gilt/20" aria-hidden="true" />

          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              className={cn("flex items-center gap-1", navLinkClass(onResourcesPage))}
            >
              Ressources
              <ChevronDown size={12} className={cn("transition-transform", resourcesOpen && "rotate-180")} />
            </button>
            {resourcesOpen && (
              <div className="absolute right-0 top-full mt-3 w-52 border border-gilt/20 bg-ink/95 backdrop-blur-md shadow-lg">
                {RESOURCE_LINKS.map((r, i) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className={cn(
                      "block px-4 py-3 transition-colors hover:bg-gilt/10 hover:text-gilt",
                      i < RESOURCE_LINKS.length - 1 && "border-b border-gilt/10",
                      navLinkClass(location.pathname === r.to),
                    )}
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
          title={theme === "dark" ? "Thème clair (lecture en extérieur)" : "Thème sombre"}
          className="shrink-0 p-1.5 text-parchment-dim hover:text-gilt transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

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
            <p className="font-mono text-[10px] tracking-[0.2em] text-parchment-dim/80 pt-4 pb-1">Ressources</p>
            {RESOURCE_LINKS.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className={cn("py-2.5 border-b border-gilt/10 last:border-b-0 transition-colors hover:text-gilt", navLinkClass(location.pathname === r.to))}
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
