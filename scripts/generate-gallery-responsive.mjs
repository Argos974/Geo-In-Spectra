// Génère, pour chaque JPEG de public/images/gallery/, deux paliers réduits
// (640 et 1280px de large, JPEG + WebP) à côté de l'original — ArtworkBackdrop
// affiche ces œuvres en fond plein cadre (`object-cover`, jusqu'à h-screen),
// mais un mobile a toujours téléchargé le même fichier qu'un écran 4K, jamais
// redimensionné (voir optimize-gallery-images.mjs, qui recompresse sans
// jamais changer les dimensions). Complémentaire, pas un remplacement.
//
// Un palier n'est généré que s'il est strictement plus petit que l'image
// source (jamais d'agrandissement). La largeur réelle de chaque original est
// aussi enregistrée dans src/data/galleryImageWidths.json — src/lib/imageSrc.ts
// s'en sert pour donner un descripteur de largeur exact au fallback pleine
// résolution dans le srcset, plutôt qu'une valeur approximative.
//
// Même approche que generate-gallery-webp.mjs : pas de sharp/imagemagick
// disponibles ici, Chromium (déjà une dépendance Playwright pour l'export PDF)
// sert d'encodeur via <canvas>.
//
// Usage : node scripts/generate-gallery-responsive.mjs

import { chromium } from "playwright"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join, extname, basename } from "node:path"

const GALLERY_DIR = join(import.meta.dirname, "..", "public", "images", "gallery")
const MANIFEST_PATH = join(import.meta.dirname, "..", "src", "data", "galleryImageWidths.json")
const TIERS = [640, 1280]
const JPEG_QUALITY = 0.8
const WEBP_QUALITY = 0.82

async function main() {
  // Uniquement les sources originales : exclut les paliers déjà générés
  // (fichiers -640w./-1280w.) pour qu'un second passage ne les redimensionne
  // pas à nouveau à partir d'un fichier déjà réduit.
  const files = (await readdir(GALLERY_DIR)).filter((f) => /\.jpe?g$/i.test(f) && !/-\d+w\.jpe?g$/i.test(f))
  console.log(`${files.length} JPEG source trouvés dans ${GALLERY_DIR}`)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  const widths = {}
  let generated = 0

  for (const file of files) {
    const srcPath = join(GALLERY_DIR, file)
    const key = basename(file, extname(file))
    const jpegBase64 = (await readFile(srcPath)).toString("base64")
    const url = `data:image/jpeg;base64,${jpegBase64}`

    const naturalWidth = await page.evaluate(async (imgUrl) => {
      const img = new Image()
      img.src = imgUrl
      await img.decode()
      return img.naturalWidth
    }, url)
    widths[key] = naturalWidth

    for (const tier of TIERS) {
      if (tier >= naturalWidth) continue

      const { jpeg, webp } = await page.evaluate(
        async ({ imgUrl, tier, jpegQuality, webpQuality }) => {
          const img = new Image()
          img.src = imgUrl
          await img.decode()
          const scale = tier / img.naturalWidth
          const canvas = document.createElement("canvas")
          canvas.width = tier
          canvas.height = Math.round(img.naturalHeight * scale)
          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          const toBase64 = (blob) =>
            new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result.slice(reader.result.indexOf(",") + 1))
              reader.readAsDataURL(blob)
            })

          const jpegBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", jpegQuality))
          const webpBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", webpQuality))
          return { jpeg: await toBase64(jpegBlob), webp: await toBase64(webpBlob) }
        },
        { imgUrl: url, tier, jpegQuality: JPEG_QUALITY, webpQuality: WEBP_QUALITY },
      )

      const jpegOut = join(GALLERY_DIR, `${key}-${tier}w.jpg`)
      const webpOut = join(GALLERY_DIR, `${key}-${tier}w.webp`)
      await writeFile(jpegOut, Buffer.from(jpeg, "base64"))
      await writeFile(webpOut, Buffer.from(webp, "base64"))
      generated += 2
      console.log(`${file} (${naturalWidth}px) -> ${basename(jpegOut)} + ${basename(webpOut)}`)
    }
  }

  await browser.close()
  await writeFile(MANIFEST_PATH, JSON.stringify(widths, null, 2) + "\n")
  console.log(`\n${generated} fichier(s) de palier généré(s). Largeurs écrites dans ${MANIFEST_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
