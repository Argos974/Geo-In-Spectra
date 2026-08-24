// Recompresse les JPEG de public/images/gallery/ (fonds ArtworkBackdrop/GalleryFrame,
// repris tels quels dans les PDF de cours — planche de couverture) : plusieurs sources
// ont été déposées à une qualité JPEG bien supérieure à ce qu'un affichage web/print en
// tire (jusqu'à 2,7 Mo pour une image jamais montrée à plus de 1920 px de large), ce qui
// gonfle inutilement le poids des PDF générés (voir generate-course-pdfs.mjs). Ne
// dépend d'aucune lib d'image supplémentaire : Chromium (déjà une dépendance via
// Playwright pour l'export PDF) fait le réencodage via un <canvas>, mêmes dimensions,
// qualité 80 — jamais de redimensionnement, pour ne pas dégrader les affichages plein
// cadre sur grand écran.
//
// Usage : node scripts/optimize-gallery-images.mjs

import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const GALLERY_DIR = path.join(ROOT, "public", "images", "gallery")
const QUALITY = 0.8
// En dessous de ce gain, le fichier est déjà correctement compressé (ex. sources déjà
// ré-exportées à qualité 80) : on ne le réécrit pas pour rien.
const MIN_SAVINGS_RATIO = 0.15

async function main() {
  const { chromium } = await import("playwright")
  const files = (await readdir(GALLERY_DIR)).filter((f) => /\.jpe?g$/i.test(f))

  const browser = await chromium.launch()
  const page = await browser.newPage()

  let totalBefore = 0
  let totalAfter = 0
  let changed = 0

  for (const file of files) {
    const filePath = path.join(GALLERY_DIR, file)
    const before = await readFile(filePath)
    const base64 = before.toString("base64")

    const recompressed = await page.evaluate(
      ({ base64, quality }) =>
        new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL("image/jpeg", quality)
            resolve(dataUrl.slice(dataUrl.indexOf(",") + 1))
          }
          img.onerror = reject
          img.src = `data:image/jpeg;base64,${base64}`
        }),
      { base64, quality: QUALITY },
    )

    const after = Buffer.from(recompressed, "base64")
    totalBefore += before.length
    const savings = 1 - after.length / before.length

    if (savings >= MIN_SAVINGS_RATIO) {
      await writeFile(filePath, after)
      totalAfter += after.length
      changed++
      console.log(`✓ ${file}: ${(before.length / 1024).toFixed(0)} Ko → ${(after.length / 1024).toFixed(0)} Ko (-${(savings * 100).toFixed(0)}%)`)
    } else {
      totalAfter += before.length
      console.log(`· ${file}: déjà optimisé (${(before.length / 1024).toFixed(0)} Ko, gain < ${MIN_SAVINGS_RATIO * 100}%)`)
    }
  }

  await browser.close()

  console.log(
    `\n${changed}/${files.length} image(s) recompressée(s) — ${(totalBefore / 1024 / 1024).toFixed(1)} Mo → ${(totalAfter / 1024 / 1024).toFixed(1)} Mo`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
