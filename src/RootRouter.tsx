import { Suspense, lazy } from "react"
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { CanvasGrain } from "@/components/layout/CanvasGrain"
import { Home } from "@/pages/Home"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"

// Chargées à la demande : Home (page d'accueil, quasi toujours le premier
// écran vu) reste importée directement pour un premier affichage sans flash
// de chargement. Le reste (contenu des salles, diagrammes, jeux, quiz, pages
// d'impression) n'est récupéré qu'à la navigation réelle vers cette route.
const ModulePage = lazy(() => import("@/pages/ModulePage").then((m) => ({ default: m.ModulePage })))
const LegalPage = lazy(() => import("@/pages/LegalPage").then((m) => ({ default: m.LegalPage })))
const GlossaryPage = lazy(() => import("@/pages/GlossaryPage").then((m) => ({ default: m.GlossaryPage })))
const ReferencesPage = lazy(() => import("@/pages/ReferencesPage").then((m) => ({ default: m.ReferencesPage })))
const GamePage = lazy(() => import("@/pages/GamePage").then((m) => ({ default: m.GamePage })))
const QuizPage = lazy(() => import("@/pages/QuizPage").then((m) => ({ default: m.QuizPage })))
const PrintCourse = lazy(() => import("@/pages/PrintCourse").then((m) => ({ default: m.PrintCourse })))
const PrintFiche = lazy(() => import("@/pages/PrintFiche").then((m) => ({ default: m.PrintFiche })))

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt/60">Chargement…</p>
    </div>
  )
}

function AppShell() {
  const location = useLocation()
  const isPrint = location.pathname.startsWith("/print")

  return (
    <>
      {!isPrint && <CanvasGrain />}
      {!isPrint && <SiteHeader />}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module/:slug" element={<ModulePage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/glossaire" element={<GlossaryPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/jeu/epsg" element={<Navigate to="/jeu/fondamentaux" replace />} />
          <Route path="/jeu/:slug" element={<GamePage />} />
          <Route path="/module/:slug/quiz" element={<QuizPage />} />
          <Route path="/print/module/:slug" element={<PrintCourse />} />
          <Route path="/print/fiche/:slug" element={<PrintFiche />} />
        </Routes>
      </Suspense>
      {!isPrint && <SiteFooter />}
    </>
  )
}

export function RootRouter() {
  useSmoothScroll()

  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
