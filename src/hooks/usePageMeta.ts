import { useEffect } from "react"

const SITE_TITLE = "Geo-In-Spectra"
export const DEFAULT_DESCRIPTION =
  "Ressources pédagogiques de géomatique et télédétection : fondamentaux SIG, imagerie satellite, indices spectraux, travaux pratiques."

function setMetaDescription(content: string) {
  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("name", "description")
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", content)
}

/**
 * Titre d'onglet et méta-description par page. index.html ne porte qu'un
 * <title>/<meta description> statiques (unique pour toute la SPA) — insuffisant
 * dès qu'on a plusieurs onglets ouverts ou qu'on partage/indexe une page précise.
 */
export function usePageMeta(title: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_TITLE}` : SITE_TITLE
    setMetaDescription(description)
  }, [title, description])
}
