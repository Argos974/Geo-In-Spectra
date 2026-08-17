import { HashRouter, Routes, Route, useLocation } from "react-router-dom"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { CanvasGrain } from "@/components/layout/CanvasGrain"
import { Home } from "@/pages/Home"
import { ModulePage } from "@/pages/ModulePage"
import { LegalPage } from "@/pages/LegalPage"
import { GlossaryPage } from "@/pages/GlossaryPage"
import { PrintCourse } from "@/pages/PrintCourse"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"

function AppShell() {
  const location = useLocation()
  const isPrint = location.pathname.startsWith("/print")

  return (
    <>
      {!isPrint && <CanvasGrain />}
      {!isPrint && <SiteHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/:slug" element={<ModulePage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
        <Route path="/glossaire" element={<GlossaryPage />} />
        <Route path="/print/module/:slug" element={<PrintCourse />} />
      </Routes>
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
