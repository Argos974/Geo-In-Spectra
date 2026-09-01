// Branche réellement @axe-core/playwright, jusque-là une dépendance installée
// mais jamais exécutée (aucun test, aucune config e2e). Pas de runner
// @playwright/test ici — comme les scripts d'export PDF, on pilote directement
// la librairie "playwright" (déjà une dépendance) : AxeBuilder n'a besoin que
// d'une Page, pas du test-runner officiel.
//
// Build le site, sert dist/ en local (production réelle, pas le serveur de
// dev), visite les pages les plus représentatives de chaque zone du site, et
// fait échouer le script (code de sortie 1) si axe-core relève une violation
// d'impact "serious" ou "critical". Les violations "minor"/"moderate" sont
// listées mais ne bloquent pas — évite un gate trop bruyant pour des points
// déjà couverts autrement (ex. contraste sur une variante non par défaut).

import { spawn, execSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"
import AxeBuilder from "@axe-core/playwright"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const PORT = 4323
const BASE_URL = `http://localhost:${PORT}`
const BLOCKING_IMPACT = new Set(["serious", "critical"])

// Un échantillon représentatif plutôt que les ~40 routes du site : une page de
// chaque famille (accueil, profils, hubs transverses, une salle en lien
// profond, une page avec formulaire). Étendre cette liste si une famille de
// page prend un jour une forme structurellement différente des autres.
const ROUTES = [
  "/",
  "/discipulus",
  "/discipulus/cours",
  "/discipulus/methodes",
  "/discipulus/progression",
  "/discipulus/revision",
  "/magister",
  "/magister/cours",
  "/magister/pedagogie",
  "/parcours",
  "/ressources",
  "/glossaire",
  "/recherche",
  "/module/fondamentaux",
  "/module/fondamentaux/quiz",
]

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url)
        if (res.ok || res.status === 404) return resolve()
      } catch {
        // pas encore prêt
      }
      if (Date.now() - start > timeoutMs) return reject(new Error(`Serveur non prêt après ${timeoutMs}ms`))
      setTimeout(tick, 300)
    }
    tick()
  })
}

function killProcessTree(child) {
  if (!child.pid) return
  if (process.platform === "win32") {
    try {
      execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: "ignore" })
    } catch {
      // déjà arrêté
    }
  } else {
    child.kill()
  }
}

async function main() {
  const skipBuild = process.argv.includes("--skip-build")
  if (!skipBuild) {
    console.log("→ build du site (npm run build)…")
    await new Promise((resolve, reject) => {
      const build = spawn("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit", shell: true })
      build.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`build a échoué (code ${code})`))))
    })
  }

  console.log(`→ démarrage du serveur de preview sur le port ${PORT}…`)
  const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  })

  let hasBlockingViolation = false

  try {
    await waitForServer(BASE_URL)
    const browser = await chromium.launch()
    // AxeBuilder ouvre une page à blanc supplémentaire dans le même contexte pour
    // finaliser l'analyse (context.newPage()) — le contexte implicite créé par le
    // raccourci browser.newPage() ne l'autorise pas ("Please use browser.newContext()").
    const context = await browser.newContext()
    const page = await context.newPage()

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}/#${route}`, { waitUntil: "networkidle" })
      await page.waitForSelector("main", { timeout: 10000 })
      // Laisse le temps aux effets post-montage (ouverture du premier chapitre,
      // planches SVG différées) de s'installer avant le scan.
      await page.waitForTimeout(400)

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()

      if (results.violations.length === 0) {
        console.log(`✓ ${route} — aucune violation`)
        continue
      }

      for (const v of results.violations) {
        const blocking = BLOCKING_IMPACT.has(v.impact ?? "")
        if (blocking) hasBlockingViolation = true
        console.log(`${blocking ? "✗" : "·"} ${route} — [${v.impact ?? "?"}] ${v.id} : ${v.help} (${v.nodes.length} nœud${v.nodes.length > 1 ? "s" : ""})`)
        for (const node of v.nodes.slice(0, 3)) {
          console.log(`    ${node.target.join(" ")}`)
        }
      }
    }

    await browser.close()
  } finally {
    killProcessTree(preview)
  }

  if (hasBlockingViolation) {
    console.log("\n✗ Violations d'accessibilité bloquantes (serious/critical) détectées.")
    process.exit(1)
  }
  console.log("\n✓ Aucune violation bloquante (serious/critical).")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
