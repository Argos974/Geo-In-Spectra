// Partagé par generate-course-pdfs.mjs et generate-fiche-pdfs.mjs : build le site,
// sert dist/ en local, expose un helper pour arrêter proprement le serveur (le
// child.kill() de Node ne tue pas l'arborescence de processus sous Windows quand
// le process est lancé avec shell:true — taskkill /T le fait).

import { spawn, execSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..")
export const PORT = 4321
export const BASE_URL = `http://localhost:${PORT}`

// Ordre fixe des salles — détermine le numéro utilisé dans les noms de fichiers
// (01, 02…). Gardé en dur (pas importé depuis src/data/modules.ts) pour ne pas
// dépendre d'un loader TypeScript dans ces scripts Node autonomes.
export const ALL_SLUGS = [
  "fondamentaux",
  "teledetection",
  "indices-spectraux",
  "outils-sig",
  "traitements-ia",
  "methodologie",
  "travaux-pratiques",
  "projections-avancees",
  "cartographie-web",
  "statistiques-spatiales",
  "photogrammetrie-drones",
  "lidar",
  "bases-donnees-spatiales",
  "etudes-de-cas-sectorielles",
]

// Même numérotation romaine que ROOT_NUMERALS côté React (Home.tsx, ModulePage.tsx) —
// dupliquée ici pour la même raison que ALL_SLUGS : ces scripts sont du Node autonome,
// pas de loader TypeScript pour importer depuis src/.
export const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]

export function resolveRequestedSlugs() {
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

/** Build le site puis lance `fn(page)` avec un navigateur et un serveur de preview prêts, en garantissant l'arrêt du serveur ensuite (succès ou échec). */
export async function withPdfServer(fn) {
  const { chromium } = await import("playwright")

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

    await fn(page)

    await browser.close()
  } finally {
    killProcessTree(preview)
  }
}

// Pas d'en-tête généré par Playwright (le défaut Chromium affiche titre/URL/date,
// hors sujet pour un document de cours) : on le remplace par un gabarit vide plutôt
// que de laisser le défaut, sans quoi il réapparaît dès que displayHeaderFooter est
// activé pour le pied de page ci-dessous.
export const PDF_MARGIN = { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" }
export const PDF_HEADER_TEMPLATE = "<span></span>"

/**
 * Pied de page minimal, sur toutes les pages : le repère de salle (cohérent
 * avec les "Salle I/II/III…" déjà utilisés partout ailleurs sur le site) et
 * le numéro de page — utile pour se repérer une fois le document imprimé ou
 * mélangé à d'autres, sans ajouter de bandeau visuel lourd.
 */
export function footerTemplateForSlug(slug) {
  const numeral = ROOM_NUMERALS[ALL_SLUGS.indexOf(slug)] ?? ""
  return `
    <div style="width:100%; font-family:'IBM Plex Mono', monospace; font-size:8px; color:#8a6a2f; padding:0 14mm; display:flex; justify-content:space-between;">
      <span>GEO-IN-SPECTRA &middot; SALLE ${numeral}</span>
      <span class="pageNumber"></span>
    </div>
  `
}
