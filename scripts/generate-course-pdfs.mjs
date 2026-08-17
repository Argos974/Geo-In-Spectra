// Génère le PDF d'une salle (ou de toutes) depuis la mise en page d'impression
// dédiée (/print/module/:slug — voir src/pages/PrintCourse.tsx), pas depuis la
// page web. Regroupe la sortie par thème : pour l'instant un thème = un module ;
// fiche mémo et quiz viendront s'y ajouter au même endroit, sous le même
// numéro d'ordre, une fois construits.
//
// Usage :
//   npm run pdf:generate                    → régénère les 5 salles
//   npm run pdf:generate -- fondamentaux     → régénère uniquement celle-ci
//   npm run pdf:generate -- fondamentaux teledetection

import { chromium } from "playwright"
import { spawn, execSync } from "node:child_process"
import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PORT = 4321
const BASE_URL = `http://localhost:${PORT}`

// Gardé en dur plutôt qu'importé depuis src/data/modules.ts pour ne pas dépendre
// d'un loader TypeScript dans ce script Node autonome — à tenir synchronisé si un
// module est ajouté/renommé (son slug, pas son titre). L'ordre fixe le numéro
// utilisé dans le nom de fichier (01, 02…).
const ALL_SLUGS = ["fondamentaux", "teledetection", "indices-spectraux", "outils-sig", "travaux-pratiques"]

function resolveRequestedSlugs() {
  const args = process.argv.slice(2)
  if (args.length === 0) return ALL_SLUGS
  const unknown = args.filter((s) => !ALL_SLUGS.includes(s))
  if (unknown.length > 0) {
    throw new Error(`Slug(s) inconnu(s) : ${unknown.join(", ")}\nSlugs valides : ${ALL_SLUGS.join(", ")}`)
  }
  return args
}

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
  const slugs = resolveRequestedSlugs()

  console.log("→ build du site (npm run build)…")
  await new Promise((resolve, reject) => {
    const build = spawn("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit", shell: true })
    build.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`build a échoué (code ${code})`))))
  })

  console.log(`→ démarrage du serveur de preview sur le port ${PORT}…`)
  const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  })

  try {
    await waitForServer(BASE_URL)

    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.emulateMedia({ media: "print" })

    for (const slug of slugs) {
      const order = String(ALL_SLUGS.indexOf(slug) + 1).padStart(2, "0")
      const fileName = `${order}-${slug}-cours.pdf`
      const url = `${BASE_URL}/#/print/module/${slug}`
      console.log(`→ ${fileName}`)

      await page.goto(url, { waitUntil: "networkidle" })
      await page.waitForTimeout(300) // laisse les polices se stabiliser

      const outDir = path.join(ROOT, "public", "pdf", slug)
      await mkdir(outDir, { recursive: true })
      await page.pdf({
        path: path.join(outDir, fileName),
        format: "A4",
        printBackground: true,
        margin: { top: "20mm", bottom: "18mm", left: "14mm", right: "14mm" },
        displayHeaderFooter: true,
        headerTemplate: `<div style="font-size:8px; width:100%; text-align:center; color:#8a7a5a; font-family: Georgia, serif; padding-top:6px; letter-spacing:1px;">GEO-IND-SPECTRA</div>`,
        footerTemplate: `<div style="font-size:8px; width:100%; text-align:center; color:#8a7a5a; font-family: Georgia, serif;">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
      })
    }

    await browser.close()
    console.log(`✓ ${slugs.length} PDF généré(s) dans public/pdf/`)
  } finally {
    killProcessTree(preview)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
