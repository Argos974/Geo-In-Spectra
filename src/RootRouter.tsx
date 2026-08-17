import { HashRouter, Routes, Route } from "react-router-dom"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { CanvasGrain } from "@/components/layout/CanvasGrain"
import { Home } from "@/pages/Home"
import { ModulePage } from "@/pages/ModulePage"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"

export function RootRouter() {
  useSmoothScroll()

  return (
    <HashRouter>
      <CanvasGrain />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/:slug" element={<ModulePage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  )
}
