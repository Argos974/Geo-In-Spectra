// Génère la fiche mémo d'une salle (ou de toutes) depuis /print/fiche/:slug
// (src/pages/PrintFiche.tsx). Même pipeline que generate-course-pdfs.mjs, sortie
// dans le même dossier public/pdf/<slug>/, distinguée par son nom de fichier
// (…-fiche-memo.pdf vs …-cours.pdf) plutôt que par un sous-dossier séparé.
//
// Usage :
//   npm run pdf:generate:fiches                    → régénère les 14 fiches
//   npm run pdf:generate:fiches -- fondamentaux     → régénère uniquement celle-ci

import { mkdir } from "node:fs/promises"
import path from "node:path"
import { ROOT, BASE_URL, ALL_SLUGS, resolveRequestedSlugs, withPdfServer, PDF_MARGIN, PDF_HEADER_TEMPLATE, footerTemplateForSlug } from "./lib/pdfServer.mjs"

async function main() {
  const slugs = resolveRequestedSlugs()

  await withPdfServer(async (page) => {
    for (const slug of slugs) {
      const order = String(ALL_SLUGS.indexOf(slug) + 1).padStart(2, "0")
      const fileName = `${order}-${slug}-fiche-memo.pdf`
      const url = `${BASE_URL}/#/print/fiche/${slug}`
      console.log(`→ ${fileName}`)

      await page.goto(url, { waitUntil: "networkidle" })
      await page.waitForTimeout(300)

      const outDir = path.join(ROOT, "public", "pdf", slug)
      await mkdir(outDir, { recursive: true })
      await page.pdf({
        path: path.join(outDir, fileName),
        format: "A4",
        printBackground: true,
        margin: PDF_MARGIN,
        displayHeaderFooter: true,
        headerTemplate: PDF_HEADER_TEMPLATE,
        footerTemplate: footerTemplateForSlug(slug),
      })
    }
  })

  console.log(`✓ ${slugs.length} fiche(s) mémo générée(s) dans public/pdf/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
