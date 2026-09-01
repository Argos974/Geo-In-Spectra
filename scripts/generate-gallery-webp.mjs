// Génère une variante WebP de chaque JPEG de public/images/gallery/, à côté de
// l'original (jamais de suppression : ArtworkBackdrop charge le WebP via
// <picture> avec repli automatique sur le JPEG existant pour les navigateurs
// sans support WebP). Complémentaire de optimize-gallery-images.mjs (qui
// recompresse le JPEG lui-même, même format) : ceci change de format, gain
// d'environ 20% en moyenne en plus, par simple changement de codec.
//
// Pas de sharp/imagemagick/cwebp disponibles dans cet environnement : on
// détourne Chromium (déjà une dépendance via Playwright, utilisé pour l'export
// PDF) en encodeur — dessiner l'image sur un <canvas> puis canvas.toBlob("image/webp")
// est exactement ce qu'un vrai navigateur fait pour encoder du WebP.
//
// Usage : node scripts/generate-gallery-webp.mjs
import { chromium } from "playwright"
import { readdir, readFile, stat, writeFile } from "node:fs/promises"
import { join, extname, basename } from "node:path"

const GALLERY_DIR = join(import.meta.dirname, "..", "public", "images", "gallery")
const QUALITY = 0.82

async function main() {
  const files = (await readdir(GALLERY_DIR)).filter((f) => /\.jpe?g$/i.test(f))
  console.log(`${files.length} JPEG trouvés dans ${GALLERY_DIR}`)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  let totalBefore = 0
  let totalAfter = 0

  for (const file of files) {
    const srcPath = join(GALLERY_DIR, file)
    const outPath = join(GALLERY_DIR, basename(file, extname(file)) + ".webp")
    const before = (await stat(srcPath)).size

    // Data URL plutôt que file:// — Chromium bloque le chargement cross-origine
    // d'un file:// depuis une page about:blank, une data: URL ne pose pas ce problème.
    const jpegBase64 = (await readFile(srcPath)).toString("base64")
    const url = `data:image/jpeg;base64,${jpegBase64}`
    const base64 = await page.evaluate(async ({ imgUrl, quality }) => {
      const img = new Image()
      img.src = imgUrl
      await img.decode()
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality))
      const buf = await blob.arrayBuffer()
      let binary = ""
      const bytes = new Uint8Array(buf)
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
      return btoa(binary)
    }, { imgUrl: url, quality: QUALITY })

    const buffer = Buffer.from(base64, "base64")
    await writeFile(outPath, buffer)
    const after = buffer.length
    totalBefore += before
    totalAfter += after
    console.log(`${file}: ${(before / 1024).toFixed(0)} Ko -> ${basename(outPath)}: ${(after / 1024).toFixed(0)} Ko (-${(100 - (after / before) * 100).toFixed(0)}%)`)
  }

  await browser.close()
  console.log(`\nTotal : ${(totalBefore / 1024 / 1024).toFixed(2)} Mo -> ${(totalAfter / 1024 / 1024).toFixed(2)} Mo`)
}

main()
