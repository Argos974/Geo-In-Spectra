// Génère, à partir de public/images/gallery/, une copie réduite de chaque planche
// dans public/images/gallery-print/ — utilisée uniquement par la page de garde du PDF
// de cours (PrintCourse.tsx, via GalleryFrame variant="print", affichée à `max-w-sm`,
// ~380px). Les fichiers sources sont calibrés pour un fond plein cadre sur grand écran
// (1920 px de large, cf. ArtworkBackdrop côté web) : recompresser sans redimensionner
// (voir optimize-gallery-images.mjs) ne gagne quasi rien sur ces scans de peinture très
// texturés, tout le poids vient de la résolution elle-même, inutile à cette taille
// d'affichage. Comme optimize-gallery-images.mjs, réencode via un <canvas> Chromium
// (Playwright déjà présent pour l'export PDF) plutôt que d'ajouter une dépendance
// d'image supplémentaire.
//
// Usage : node scripts/generate-print-covers.mjs

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const SRC_DIR = path.join(ROOT, "public", "images", "gallery")
const OUT_DIR = path.join(ROOT, "public", "images", "gallery-print")
const TARGET_WIDTH = 960
const QUALITY = 0.82

async function main() {
  const { chromium } = await import("playwright")
  const files = (await readdir(SRC_DIR)).filter((f) => /\.jpe?g$/i.test(f))

  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage()

  let totalBefore = 0
  let totalAfter = 0

  for (const file of files) {
    const before = await readFile(path.join(SRC_DIR, file))
    const base64 = before.toString("base64")

    const resized = await page.evaluate(
      ({ base64, targetWidth, quality }) =>
        new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            const scale = Math.min(1, targetWidth / img.naturalWidth)
            const canvas = document.createElement("canvas")
            canvas.width = Math.round(img.naturalWidth * scale)
            canvas.height = Math.round(img.naturalHeight * scale)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL("image/jpeg", quality)
            resolve(dataUrl.slice(dataUrl.indexOf(",") + 1))
          }
          img.onerror = reject
          img.src = `data:image/jpeg;base64,${base64}`
        }),
      { base64, targetWidth: TARGET_WIDTH, quality: QUALITY },
    )

    const after = Buffer.from(resized, "base64")
    await writeFile(path.join(OUT_DIR, file), after)
    totalBefore += before.length
    totalAfter += after.length
    console.log(`✓ ${file}: ${(before.length / 1024).toFixed(0)} Ko → ${(after.length / 1024).toFixed(0)} Ko`)
  }

  await browser.close()
  console.log(`\n${files.length} couverture(s) générée(s) — ${(totalBefore / 1024 / 1024).toFixed(1)} Mo → ${(totalAfter / 1024 / 1024).toFixed(1)} Mo`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
