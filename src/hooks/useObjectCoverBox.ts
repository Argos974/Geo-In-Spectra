import { useLayoutEffect, useRef, useState, type RefObject } from "react"

export interface ObjectCoverBox {
  /** Facteur d'échelle appliqué à l'image source par `object-fit: cover`. */
  scale: number
  /** Décalage de l'image affichée par rapport au conteneur (px, coin haut-gauche). */
  offsetX: number
  offsetY: number
  containerWidth: number
  containerHeight: number
  /**
   * Padding du conteneur (ex. `pt-24` sur ArtworkBackdrop pour dégager le
   * header fixe, voir Magister/DiscipulusPage) — nécessaire pour repositionner
   * un repère (ArtworkHotspot), dont l'ancêtre positionné réel est un enfant en
   * flux normal *à l'intérieur* de ce padding, donc décalé d'autant par rapport
   * au conteneur mesuré ici. Le zoom GSAP (useHotspotZoomNav), qui anime ce
   * conteneur lui-même, continue d'utiliser offsetX/offsetY tels quels (sa
   * boîte de transform-origin est bien la boîte pleine, padding compris).
   */
  paddingLeft: number
  paddingTop: number
}

/**
 * Mesure la position/échelle RÉELLE d'une image en `object-fit: cover` dans
 * son conteneur — sert à superposer un médaillon détouré (voir ArtworkHotspot)
 * exactement à sa place dans l'œuvre, quel que soit le ratio d'écran.
 *
 * `getBoundingClientRect()` sur l'<img> ne donne PAS la zone réellement
 * visible de l'image : `object-fit: cover` ne change pas la boîte de
 * l'élément (toujours `w-full h-full` de son wrapper — ici surdimensionné de
 * 10% par ArtworkBackdrop pour le parallax de scroll, coupé via
 * `motion={false}` mais la marge reste dans le DOM), c'est l'intérieur qui
 * est mis à l'échelle puis rogné pour couvrir cette boîte. Il faut donc
 * refaire ce calcul ici (`imgRect` = la boîte de rognage, pas le résultat) —
 * une première version réutilisait `imgRect` tel quel, ce qui décalait tout
 * repère verticalement dès que le ratio hauteur/largeur du wrapper différait
 * de celui de l'image source.
 */
export function useObjectCoverBox(
  containerRef: RefObject<HTMLElement | null>,
  imgRef: RefObject<HTMLImageElement | null>,
): ObjectCoverBox | null {
  const [box, setBox] = useState<ObjectCoverBox | null>(null)
  // Taille de mise en page (immuable par un `transform` CSS, contrairement à
  // `getBoundingClientRect()`) -- sert à ignorer un appel de `update()`
  // déclenché pendant qu'un ancêtre est transitoirement mis à l'échelle (ex.
  // usePageEntrance, le zoom d'entrée de page sur `pageRef`) : sans ce
  // garde-fou, un `ResizeObserver` qui se déclenche à ce moment-là (constaté
  // en particulier au double-montage des effets par React.StrictMode en dev)
  // fige `coverBox` sur une mesure faussée par ce zoom transitoire, jamais
  // corrigée ensuite puisque `usePageEntrance` ne redéclenche rien à la fin de
  // son animation -- un repère reste alors décalé en permanence. En `useRef`
  // (pas une variable locale à l'effet) pour survivre au cycle
  // montage->nettoyage->remontage de StrictMode, sous peine de repartir de
  // zéro à chaque remontage et de ne jamais filtrer le second appel corrompu.
  const lastLayoutSize = useRef({ width: -1, height: -1 })

  useLayoutEffect(() => {
    const containerEl = containerRef.current
    const imgEl = imgRef.current
    if (!containerEl || !imgEl) return

    const update = () => {
      if (!imgEl.naturalWidth || !imgEl.naturalHeight) return
      if (
        containerEl.offsetWidth === lastLayoutSize.current.width &&
        containerEl.offsetHeight === lastLayoutSize.current.height
      ) {
        return
      }
      lastLayoutSize.current = { width: containerEl.offsetWidth, height: containerEl.offsetHeight }

      const containerRect = containerEl.getBoundingClientRect()
      const imgRect = imgEl.getBoundingClientRect()
      if (!containerRect.width || !imgRect.width || !imgRect.height) return

      // imgRect = la boîte dans laquelle `object-fit: cover` met l'image à
      // l'échelle puis la rogne — pas la zone visible elle-même (voir
      // commentaire au-dessus du hook).
      const scale = Math.max(imgRect.width / imgEl.naturalWidth, imgRect.height / imgEl.naturalHeight)
      const visibleWidth = imgEl.naturalWidth * scale
      const visibleHeight = imgEl.naturalHeight * scale
      // object-position par défaut (50% 50%) : l'excédent rogné est centré
      // à parts égales de chaque côté.
      const imgOriginX = imgRect.left + (imgRect.width - visibleWidth) / 2
      const imgOriginY = imgRect.top + (imgRect.height - visibleHeight) / 2
      const containerStyle = getComputedStyle(containerEl)

      setBox({
        scale,
        offsetX: imgOriginX - containerRect.left,
        offsetY: imgOriginY - containerRect.top,
        containerWidth: containerRect.width,
        containerHeight: containerRect.height,
        paddingLeft: parseFloat(containerStyle.paddingLeft) || 0,
        paddingTop: parseFloat(containerStyle.paddingTop) || 0,
      })
    }

    update()
    if (!imgEl.complete) imgEl.addEventListener("load", update)
    const observer = new ResizeObserver(update)
    observer.observe(containerEl)

    return () => {
      imgEl.removeEventListener("load", update)
      observer.disconnect()
    }
  }, [containerRef, imgRef])

  return box
}
