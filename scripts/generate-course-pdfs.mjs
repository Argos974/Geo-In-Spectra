// Génère le PDF de cours d'une salle (ou de toutes) depuis la mise en page
// d'impression dédiée (/print/module/:slug — voir src/pages/PrintCourse.tsx), pas
// depuis la page web. Sortie regroupée par salle dans public/pdf/<slug>/.
//
// Usage :
//   npm run pdf:generate                    → régénère les 6 salles
//   npm run pdf:generate -- fondamentaux     → régénère uniquement celle-ci
//   npm run pdf:generate -- fondamentaux teledetection

import { mkdir } from "node:fs/promises"
import path from "node:path"
import { ROOT, BASE_URL, ALL_SLUGS, resolveRequestedSlugs, withPdfServer, PDF_MARGIN } from "./lib/pdfServer.mjs"

async function main() {
  const slugs = resolveRequestedSlugs()

  await withPdfServer(async (page) => {
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
        margin: PDF_MARGIN,
      })
    }
  })

  console.log(`✓ ${slugs.length} PDF de cours généré(s) dans public/pdf/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
