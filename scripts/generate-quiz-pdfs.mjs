// Génère les PDF de quiz d'une salle (ou de toutes) depuis les mises en page
// d'impression dédiées (/print/quiz/:slug et /print/quiz-corrige/:slug — voir
// src/pages/PrintQuiz.tsx). Même pipeline que generate-course-pdfs.mjs, sortie
// dans le même dossier public/pdf/<slug>/. Deux fichiers par salle : l'énoncé
// seul (…-quiz.pdf) et le corrigé avec explications (…-quiz-corrige.pdf).
//
// Usage :
//   npm run pdf:generate:quiz                    → régénère les 14 salles
//   npm run pdf:generate:quiz -- fondamentaux     → régénère uniquement celle-ci

import { mkdir } from "node:fs/promises"
import path from "node:path"
import { ROOT, BASE_URL, ALL_SLUGS, resolveRequestedSlugs, withPdfServer, PDF_MARGIN, PDF_HEADER_TEMPLATE, footerTemplateForSlug } from "./lib/pdfServer.mjs"

const VARIANTS = [
  { route: "quiz", suffix: "quiz" },
  { route: "quiz-corrige", suffix: "quiz-corrige" },
]

async function main() {
  const slugs = resolveRequestedSlugs()

  await withPdfServer(async (page) => {
    for (const slug of slugs) {
      const order = String(ALL_SLUGS.indexOf(slug) + 1).padStart(2, "0")
      const outDir = path.join(ROOT, "public", "pdf", slug)
      await mkdir(outDir, { recursive: true })

      for (const { route, suffix } of VARIANTS) {
        const fileName = `${order}-${slug}-${suffix}.pdf`
        const url = `${BASE_URL}/#/print/${route}/${slug}`
        console.log(`→ ${fileName}`)

        await page.goto(url, { waitUntil: "networkidle" })
        await page.waitForTimeout(300)

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
    }
  })

  console.log(`✓ ${slugs.length * VARIANTS.length} PDF de quiz généré(s) dans public/pdf/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
