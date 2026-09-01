import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sun, Moon, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useTheme"

// Le repère latin seul dans le header (hérité des cartes d'accueil, où il est
// toujours accompagné d'un sous-titre français) reste opaque pour qui arrive sur
// une page interne par un lien direct plutôt que par l'accueil — un `title` suffit
// à lever l'ambiguïté au survol sans alourdir visuellement la nav.
const PROFILE_LINKS = [
  { to: "/discipulus", label: "Discipulus", hint: "Discipulus — profil élève" },
  { to: "/magister", label: "Magister", hint: "Magister — profil enseignant" },
]

const DISCIPULUS_SUBNAV = [
  { to: "/discipulus/cours", label: "Cours" },
  { to: "/discipulus/methodes", label: "Méthodes" },
  { to: "/discipulus/progression", label: "Progression" },
  { to: "/discipulus/revision", label: "Révision" },
]

const MAGISTER_SUBNAV = [
  { to: "/magister/cours", label: "Atelier" },
  { to: "/magister/programme", label: "Programme" },
  { to: "/magister/pedagogie", label: "Pédagogie" },
  { to: "/magister/evaluation", label: "Évaluation" },
  { to: "/magister/classe", label: "Classe" },
]

const MUTUALISE_LINKS = [
  { to: "/ressources", label: "Ressources" },
  { to: "/parcours", label: "Parcours" },
]

export function SiteHeader() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Referme le menu mobile à chaque changement de route (sélection d'un lien,
  // navigation arrière du navigateur…) plutôt que de dépendre uniquement du clic.
  useEffect(() => {
    // Synchronise l'UI avec la navigation du routeur (système externe), pas un état dérivé du rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [location.pathname])

  const navLinkClass = (active: boolean) => cn("transition-colors hover:text-gilt", active && "text-gilt")

  const inDiscipulus = location.pathname.startsWith("/discipulus")
  const inMagister = location.pathname.startsWith("/magister")
  const subnav = inDiscipulus ? DISCIPULUS_SUBNAV : inMagister ? MAGISTER_SUBNAV : null

  return (
    <header className="print:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/80 border-b border-gilt/15">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6 lg:gap-10 lg:px-8">
        <Link to="/" className="font-heading text-xs uppercase tracking-[0.14em] text-parchment shrink-0 sm:text-sm sm:tracking-[0.28em]">
          Geo-In<span className="text-gilt">.</span>Spectra
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-parchment-dim">
          {PROFILE_LINKS.map((p) => (
            <Link key={p.to} to={p.to} title={p.hint} className={navLinkClass(location.pathname === p.to || location.pathname.startsWith(`${p.to}/`))}>
              {p.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-gilt/20" aria-hidden="true" />
          {MUTUALISE_LINKS.map((r) => (
            <Link key={r.to} to={r.to} className={navLinkClass(location.pathname === r.to)}>
              {r.label}
            </Link>
          ))}
        </div>

        <Link
          to="/recherche"
          aria-label="Recherche"
          title="Recherche"
          className={cn("shrink-0 p-2.5 sm:p-1.5 text-parchment-dim hover:text-gilt transition-colors", location.pathname === "/recherche" && "text-gilt")}
        >
          <Search size={18} />
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
          title={theme === "dark" ? "Thème clair (lecture en extérieur)" : "Thème sombre"}
          className="shrink-0 p-2.5 sm:p-1.5 text-parchment-dim hover:text-gilt transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="lg:hidden p-2.5 -mr-1.5 sm:p-2 sm:-mr-2 text-parchment hover:text-gilt transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Sous-navigation du profil actif — Cours/Méthodes (Discipulus) ou Atelier/Programme/Pédagogie/Évaluation/Classe (Magister), visible dès qu'on est dans l'un des deux, pour sauter d'une section à l'autre sans repasser par la page de profil. "Atelier", pas "Cours" : Magister → Cours contient en réalité les 36 séances de l'Atelier, un label distinct de Discipulus → Cours (les 12 chapitres théoriques) évite de nommer deux contenus différents pareil. */}
      {subnav && (
        <div className="hidden lg:flex justify-center gap-8 border-t border-gilt/10 py-2 font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80">
          {subnav.map((s) => (
            <Link key={s.to} to={s.to} className={navLinkClass(location.pathname === s.to)}>
              {s.label}
            </Link>
          ))}
        </div>
      )}

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-gilt/15 bg-ink/95 backdrop-blur-md px-6 py-4 max-h-[calc(100vh-64px)] overflow-y-auto"
        >
          <div className="flex flex-col gap-1 font-mono text-[13px] uppercase tracking-wider text-parchment-dim">
            {PROFILE_LINKS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={cn("py-2.5 border-b border-gilt/10 transition-colors hover:text-gilt", navLinkClass(location.pathname === p.to))}
              >
                {p.label}
              </Link>
            ))}
            {subnav && (
              <div className="pl-4 flex flex-col gap-1 border-b border-gilt/10">
                {subnav.map((s) => (
                  <Link key={s.to} to={s.to} className={cn("py-2 text-[11px] transition-colors hover:text-gilt", navLinkClass(location.pathname === s.to))}>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="pt-2 flex flex-col gap-1">
              {MUTUALISE_LINKS.map((r) => (
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
        </div>
      )}
    </header>
  )
}
