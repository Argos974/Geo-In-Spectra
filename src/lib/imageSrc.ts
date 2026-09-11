import galleryImageWidths from "@/data/galleryImageWidths.json"

/**
 * Chaque JPEG de public/images/gallery/ a une variante .webp générée à côté
 * (voir scripts/optimize-gallery-images.mjs), ~20% plus légère en moyenne sur
 * l'ensemble des 33 œuvres — jamais de suppression du JPEG d'origine, qui
 * reste le repli natif de <picture> pour les rares navigateurs sans support WebP.
 */
export function toWebpSrc(src: string): string {
  return src.replace(/\.(jpe?g|png)$/i, ".webp")
}

// Paliers réduits générés par scripts/generate-gallery-responsive.mjs
// (`<nom>-640w.<ext>` / `<nom>-1280w.<ext>`, à côté de l'original) — un mobile
// n'a plus à télécharger la même image plein cadre qu'un écran 4K. Un palier
// peut être absent pour une source déjà plus étroite (pas d'agrandissement,
// voir le script) : `toResponsiveSrcSet` s'appuie sur galleryImageWidths.json
// (largeur réelle de chaque original, mesurée à la génération) pour ne
// jamais lister ce palier dans ce cas.
const RESPONSIVE_TIERS = [640, 1280] as const

function basenameNoExt(src: string): string {
  return (src.split("/").pop() ?? src).replace(/\.(jpe?g|png)$/i, "")
}

function tierUrl(src: string, tier: number, ext: "jpg" | "webp"): string {
  return src.replace(/\.(jpe?g|png)$/i, `-${tier}w.${ext}`)
}

function buildSrcSet(src: string, ext: "jpg" | "webp"): string {
  const key = basenameNoExt(src)
  const originalWidth = (galleryImageWidths as Record<string, number>)[key]
  const entries = RESPONSIVE_TIERS.filter((tier) => !originalWidth || tier < originalWidth).map(
    (tier) => `${tierUrl(src, tier, ext)} ${tier}w`,
  )
  const fullSrc = ext === "webp" ? toWebpSrc(src) : src
  entries.push(`${fullSrc} ${originalWidth ?? 1920}w`)
  return entries.join(", ")
}

/** srcset WebP (paliers réduits + original), à poser sur le <source type="image/webp"> de ArtworkBackdrop. */
export function toWebpSrcSet(src: string): string {
  return buildSrcSet(src, "webp")
}

/** srcset JPEG (paliers réduits + original), à poser sur le <source> JPEG — repli sans WebP. */
export function toJpgSrcSet(src: string): string {
  return buildSrcSet(src, "jpg")
}
