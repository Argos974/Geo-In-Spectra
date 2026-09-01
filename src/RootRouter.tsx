import { Suspense, lazy } from "react"
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { CanvasGrain } from "@/components/layout/CanvasGrain"
import { ActiveParcoursBar } from "@/components/layout/ActiveParcoursBar"
import { RoomTransition } from "@/components/layout/RoomTransition"
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
const QuizPage = lazy(() => import("@/pages/QuizPage").then((m) => ({ default: m.QuizPage })))
const PrintCourse = lazy(() => import("@/pages/PrintCourse").then((m) => ({ default: m.PrintCourse })))
const PrintFiche = lazy(() => import("@/pages/PrintFiche").then((m) => ({ default: m.PrintFiche })))
const PrintQuiz = lazy(() => import("@/pages/PrintQuiz").then((m) => ({ default: m.PrintQuiz })))
const PiegesPage = lazy(() => import("@/pages/PiegesPage").then((m) => ({ default: m.PiegesPage })))
const FormulairePage = lazy(() => import("@/pages/FormulairePage").then((m) => ({ default: m.FormulairePage })))
const DatasetPage = lazy(() => import("@/pages/DatasetPage").then((m) => ({ default: m.DatasetPage })))
const ParcoursPage = lazy(() => import("@/pages/ParcoursPage").then((m) => ({ default: m.ParcoursPage })))
const ExercisesPage = lazy(() => import("@/pages/ExercisesPage").then((m) => ({ default: m.ExercisesPage })))
const BilanPage = lazy(() => import("@/pages/BilanPage").then((m) => ({ default: m.BilanPage })))
const RevisionPage = lazy(() => import("@/pages/RevisionPage").then((m) => ({ default: m.RevisionPage })))
const AnnalesPage = lazy(() => import("@/pages/AnnalesPage").then((m) => ({ default: m.AnnalesPage })))
const DiscipulusPage = lazy(() => import("@/pages/DiscipulusPage").then((m) => ({ default: m.DiscipulusPage })))
const DiscipulusCoursPage = lazy(() => import("@/pages/DiscipulusCoursPage").then((m) => ({ default: m.DiscipulusCoursPage })))
const DiscipulusMethodesPage = lazy(() => import("@/pages/DiscipulusMethodesPage").then((m) => ({ default: m.DiscipulusMethodesPage })))
const MagisterPage = lazy(() => import("@/pages/MagisterPage").then((m) => ({ default: m.MagisterPage })))
const MagisterCoursPage = lazy(() => import("@/pages/MagisterCoursPage").then((m) => ({ default: m.MagisterCoursPage })))
const MagisterEvaluationPage = lazy(() => import("@/pages/MagisterEvaluationPage").then((m) => ({ default: m.MagisterEvaluationPage })))
const MagisterPedagogiePage = lazy(() => import("@/pages/MagisterPedagogiePage").then((m) => ({ default: m.MagisterPedagogiePage })))
const MagisterClassePage = lazy(() => import("@/pages/MagisterClassePage").then((m) => ({ default: m.MagisterClassePage })))
const RessourcesPage = lazy(() => import("@/pages/RessourcesPage").then((m) => ({ default: m.RessourcesPage })))
const ProgrammePage = lazy(() => import("@/pages/ProgrammePage").then((m) => ({ default: m.ProgrammePage })))
const RecherchePage = lazy(() => import("@/pages/RecherchePage").then((m) => ({ default: m.RecherchePage })))

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
      {!isPrint && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-ink focus:text-gilt-bright focus:px-4 focus:py-2 focus:border focus:border-gilt focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-wider"
        >
          Aller au contenu
        </a>
      )}
      <RoomTransition />
      {!isPrint && <CanvasGrain />}
      {!isPrint && <SiteHeader />}
      {!isPrint && <ActiveParcoursBar />}
      {/* Le landmark <main> manquait sur tout le site (violation d'accessibilité
          landmark-one-main/region sur chaque route, confirmée par un audit axe-core)
          — chaque page enveloppait son contenu dans un simple <div>. Toutes les
          routes passent déjà par ce même point d'entrée, donc un seul <main> ici
          corrige l'ensemble d'un coup plutôt que route par route. tabIndex={-1}
          permet au lien d'évitement ci-dessus de déplacer réellement le focus
          clavier sur le contenu, pas seulement le défilement visuel. */}
      <main id="main-content" tabIndex={-1}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discipulus" element={<DiscipulusPage />} />
          <Route path="/discipulus/cours" element={<DiscipulusCoursPage />} />
          <Route path="/discipulus/methodes" element={<DiscipulusMethodesPage />} />
          <Route path="/magister" element={<MagisterPage />} />
          <Route path="/magister/cours" element={<MagisterCoursPage />} />
          <Route path="/magister/programme" element={<ProgrammePage />} />
          <Route path="/magister/evaluation" element={<MagisterEvaluationPage />} />
          <Route path="/magister/pedagogie" element={<MagisterPedagogiePage />} />
          <Route path="/magister/classe" element={<MagisterClassePage />} />
          <Route path="/ressources" element={<RessourcesPage />} />
          <Route path="/recherche" element={<RecherchePage />} />
          <Route path="/module/:slug" element={<ModulePage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/glossaire" element={<GlossaryPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/pieges-frequents" element={<PiegesPage />} />
          <Route path="/formulaire" element={<FormulairePage />} />
          <Route path="/jeux-de-donnees" element={<DatasetPage />} />
          <Route path="/parcours" element={<ParcoursPage />} />
          <Route path="/discipulus/progression" element={<BilanPage />} />
          <Route path="/discipulus/revision" element={<RevisionPage />} />
          <Route path="/bilan" element={<Navigate to="/discipulus/progression" replace />} />
          <Route path="/annales" element={<AnnalesPage />} />
          <Route path="/module/:slug/exercices" element={<ExercisesPage />} />
          <Route path="/module/:slug/quiz" element={<QuizPage />} />
          <Route path="/print/module/:slug" element={<PrintCourse />} />
          <Route path="/print/fiche/:slug" element={<PrintFiche />} />
          <Route path="/print/quiz/:slug" element={<PrintQuiz corrige={false} />} />
          <Route path="/print/quiz-corrige/:slug" element={<PrintQuiz corrige={true} />} />
        </Routes>
      </Suspense>
      </main>
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
