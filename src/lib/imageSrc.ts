/**
 * Chaque JPEG de public/images/gallery/ a une variante .webp générée à côté
 * (voir scripts/optimize-gallery-images.mjs), ~20% plus légère en moyenne sur
 * l'ensemble des 33 œuvres — jamais de suppression du JPEG d'origine, qui
 * reste le repli natif de <picture> pour les rares navigateurs sans support WebP.
 */
export function toWebpSrc(src: string): string {
  return src.replace(/\.(jpe?g|png)$/i, ".webp")
}
