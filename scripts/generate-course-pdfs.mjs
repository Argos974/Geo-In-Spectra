// Génère un PDF par salle (module) à partir du site build, avec le CSS d'impression
// défini dans src/index.css (@media print). Regroupe la sortie par thème — pour
// l'instant un thème = un module ; d'autres documents (fiche mémo, quiz, corrigé)
// viendront s'ajouter dans le même dossier par la suite.
//
// Usage : npm run pdf:generate   (build le site, sert dist/, imprime, arrête le serveur)

import { chromium } from "playwright"
import { spawn } from "node:child_process"
import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PORT = 4321
const BASE_URL = `http://localhost:${PORT}`

// Gardé en dur plutôt qu'importé depuis src/data/modules.ts pour ne pas dépendre
// d'un loader TypeScript dans ce script Node autonome — à tenir synchronisé si un
// module est ajouté/renommé (son slug, pas son titre).
const SLUGS = ["fondamentaux", "teledetection", "indices-spectraux", "outils-sig", "travaux-pratiques"]

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

async function main() {
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

    for (const slug of SLUGS) {
      const url = `${BASE_URL}/#/module/${slug}`
      console.log(`→ ${slug}`)
      await page.goto(url, { waitUntil: "networkidle" })
      await page.waitForTimeout(300) // laisse les polices/animations d'entrée se stabiliser

      const outDir = path.join(ROOT, "public", "pdf", slug)
      await mkdir(outDir, { recursive: true })
      await page.pdf({
        path: path.join(outDir, "cours.pdf"),
        format: "A4",
        printBackground: true,
        margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" },
      })
    }

    await browser.close()
    console.log(`✓ ${SLUGS.length} PDF générés dans public/pdf/`)
  } finally {
    preview.kill()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
