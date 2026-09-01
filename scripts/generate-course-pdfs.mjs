// Génère le PDF de cours d'une salle (ou de toutes) depuis la mise en page
// d'impression dédiée (/print/module/:slug — voir src/pages/PrintCourse.tsx), pas
// depuis la page web. Sortie regroupée par salle dans public/pdf/<slug>/.
//
// Usage :
//   npm run pdf:generate                    → régénère les 14 salles
//   npm run pdf:generate -- fondamentaux     → régénère uniquement celle-ci
//   npm run pdf:generate -- fondamentaux teledetection

import { mkdir } from "node:fs/promises"
import path from "node:path"
import { ROOT, BASE_URL, ALL_SLUGS, resolveRequestedSlugs, withPdfServer, PDF_MARGIN, PDF_HEADER_TEMPLATE, PDF_ACCESSIBILITY_OPTIONS, footerTemplateForSlug } from "./lib/pdfServer.mjs"

// Chaque salle de Cours (et l'Atelier) est trois pistes indépendantes (Lycée /
// Licence-BUT / Master-Recherche, voir ModuleChapterBody.tsx côté React), pas un
// même contenu simplement enrichi par niveau. Sans ce traitement, le PDF "Cours"
// empilait les trois pistes à la suite — un lycéen qui télécharge le PDF
// récupérait aussi les sections Master/Recherche, corrigés d'exercice compris
// (toujours dépliés à l'impression, voir ContentBlocks.tsx). On génère donc un
// PDF par piste, filtré côté route d'impression via ?level=<niveau> (voir
// PrintCourse.tsx). Dupliqué depuis content/types.ts::ContentLevel pour la même
// raison que ALL_SLUGS ci-dessus (ce script Node autonome n'importe pas de
// TypeScript).
//
// Méthodologie fait exception : ce n'est pas un "Cours" à 3 pistes de niveau
// mais un contenu regroupé par finalité (Scolaire/Concours/Professionnel/
// Recherche, voir DiscipulusMethodesPage.tsx) rendu sur sa propre page, jamais
// via le sélecteur de piste de ModuleChapterBody. Son bouton "Cours (PDF)" actif
// (MethodesActionBar.tsx) télécharge encore le nom de fichier non suffixé
// `<NN>-methodologie-cours.pdf` : générer 3 fichiers suffixés à la place
// casserait ce lien réel sans qu'aucune page ne les propose jamais.
const LEVEL_TRACKS = [
  { level: "lycee", suffix: "lycee" },
  { level: "superieur", suffix: "licence-but" },
  { level: "approfondissement", suffix: "master-recherche" },
]

async function main() {
  const slugs = resolveRequestedSlugs()

  await withPdfServer(async (page) => {
    for (const slug of slugs) {
      const order = String(ALL_SLUGS.indexOf(slug) + 1).padStart(2, "0")
      const outDir = path.join(ROOT, "public", "pdf", slug)
      await mkdir(outDir, { recursive: true })

      const tracks = slug === "methodologie" ? [{ level: undefined, suffix: undefined }] : LEVEL_TRACKS

      for (const { level, suffix } of tracks) {
        const fileName = suffix ? `${order}-${slug}-cours-${suffix}.pdf` : `${order}-${slug}-cours.pdf`
        const url = level ? `${BASE_URL}/#/print/module/${slug}?level=${level}` : `${BASE_URL}/#/print/module/${slug}`
        console.log(`→ ${fileName}`)

        await page.goto(url, { waitUntil: "networkidle" })
        await page.waitForTimeout(300) // laisse les polices se stabiliser

        await page.pdf({
          path: path.join(outDir, fileName),
          format: "A4",
          printBackground: true,
          margin: PDF_MARGIN,
          displayHeaderFooter: true,
          headerTemplate: PDF_HEADER_TEMPLATE,
          footerTemplate: footerTemplateForSlug(slug),
          ...PDF_ACCESSIBILITY_OPTIONS,
        })
      }
    }
  })

  console.log(`✓ PDF de cours généré(s) dans public/pdf/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
