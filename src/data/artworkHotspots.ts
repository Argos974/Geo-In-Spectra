export interface ArtworkHotspot {
  id: string
  /**
   * Position et taille RÉELLES de la figure dans l'image source (px, coin
   * haut-gauche + coin bas-droit) — voir scripts/generate-hotspot-cutouts.py,
   * qui l'imprime après détourage. Sert à superposer le médaillon exactement
   * à sa place dans le tableau (ArtworkHotspot.tsx::useObjectCoverBox), pas à
   * côté : l'effet recherché est "ce personnage du tableau prend vie", pas un
   * portrait flottant séparé.
   */
  sourceBox: { left: number; top: number; right: number; bottom: number }
  /** Court texte affiché près du repère au survol/focus. */
  hint: string
  /** Phrase complète annoncée aux lecteurs d'écran (le repère n'a pas d'autre libellé visible en permanence). */
  ariaLabel: string
  to: string
  /** Échelle atteinte par le zoom juste avant la navigation (voir hooks/useHotspotZoomNav.ts). */
  zoomScale: number
  /** Médaillon détouré (PNG à canal alpha, voir scripts/generate-hotspot-cutouts.py) — chemin sous /public. */
  cutoutSrc: string
}

/**
 * Repères posés sur une œuvre en fond plein cadre (ArtworkBackdrop), clé = même
 * clé que src/data/artworks.ts. Chaque médaillon est un vrai détourage
 * (segmentation par le modèle U^2-Net, Apache 2.0, via rembg — MIT,
 * local/hors-ligne — voir scripts/generate-hotspot-cutouts.py), superposé
 * PIXEL POUR PIXEL à sa position réelle dans l'œuvre plutôt que flottant à
 * côté : au repos, invisible — se distingue seulement au survol/focus.
 */
export const artworkHotspots: Record<string, ArtworkHotspot[]> = {
  // L'École d'Athènes (Raphaël) — Platon à gauche, le vieux sage désignant le
  // ciel ; Aristote à droite, plus jeune, tenant l'Éthique.
  hero: [
    {
      id: "hero-plato",
      sourceBox: { left: 900, top: 663, right: 976, bottom: 920 },
      hint: "Magister →",
      ariaLabel: "Entrer côté Magister — espace enseignant",
      to: "/magister",
      zoomScale: 2.6,
      cutoutSrc: "/images/gallery/cutouts/hero-plato.png",
    },
    {
      id: "hero-aristotle",
      sourceBox: { left: 976, top: 660, right: 1068, bottom: 920 },
      hint: "Discipulus →",
      ariaLabel: "Entrer côté Discipulus — espace élève",
      to: "/discipulus",
      zoomScale: 2.6,
      cutoutSrc: "/images/gallery/cutouts/hero-aristotle.png",
    },
  ],
  // Vanité (Edwaert Collier, 1662) — des objets de decor plutot que des
  // personnages reperes par posture (voir git history pour l'ancienne version
  // sur l'Orrery de Wright, dont la correspondance forcait trop la lecture) :
  // l'atlas ouvert (Cours, une vraie carte du monde), la plume dans son
  // encrier (Methodes, la technique d'ecriture), le medaillon a gousset
  // (Progression, on l'ouvre pour voir ou on en est), le sablier (Revision,
  // le temps qui repasse en boucle). Le globe et le sceau de cire, pourtant
  // plus parlants sur le papier, sortent de la bande visible en object-cover
  // -- verifie a l'ecran -- d'ou ce choix a l'objet le mieux place plutot que
  // le plus evident. Bandeau relleve a 90vh (voir DiscipulusPage/MagisterPage)
  // justement pour elargir cette bande et limiter ce genre de compromis.
  "discipulus-hub": [
    {
      id: "discipulus-hub-cours",
      sourceBox: { left: 431, top: 518, right: 950, bottom: 1130 },
      hint: "Cours →",
      ariaLabel: "Découvrir les Cours",
      to: "/discipulus/cours",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/discipulus-hub-cours.png",
    },
    {
      id: "discipulus-hub-methodes",
      sourceBox: { left: 1088, top: 600, right: 1143, bottom: 1103 },
      hint: "Méthodes →",
      ariaLabel: "Découvrir les Méthodes",
      to: "/discipulus/methodes",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/discipulus-hub-methodes.png",
    },
    {
      id: "discipulus-hub-progression",
      sourceBox: { left: 854, top: 969, right: 977, bottom: 1090 },
      hint: "Progression →",
      ariaLabel: "Découvrir la Progression",
      to: "/discipulus/progression",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/discipulus-hub-progression.png",
    },
    {
      id: "discipulus-hub-revision",
      sourceBox: { left: 1715, top: 425, right: 1888, bottom: 633 },
      hint: "Révision →",
      ariaLabel: "Découvrir la Révision",
      to: "/discipulus/revision",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/discipulus-hub-revision.png",
    },
  ],
  // Le vieux maître d'école (d'après Gerrit Dou, copie XIXe s. — voir
  // artworks.ts) — des objets de décor plutôt que des personnages repérés
  // par posture (remplace L'École de village de Steen, dont le seul Atelier
  // tombait dans une zone trop sombre pour la segmentation, voir git
  // history) : les mains qui taillent la plume (Atelier, le geste
  // technique), le visage au regard scrutateur (Pédagogie), le groupe
  // d'élèves au fond (Classe), le livre de référence près de la main
  // (Évaluation — on corrige par rapport à un texte), le sablier
  // (Programme, le temps de la séance). PORTRAIT (754×1000) comme l'ancienne
  // œuvre : bande verticale sûre vérifiée ~y 300-700 sur 1000 (bandeau à 90vh,
  // voir MagisterPage) — Programme (sablier, y 629-740) déborde encore un peu
  // en dessous, choix le moins bien placé du lot faute d'un meilleur objet
  // "Programme" dans la zone visible.
  "magister-hub-dou": [
    {
      id: "magister-hub-atelier",
      sourceBox: { left: 239, top: 490, right: 360, bottom: 615 },
      hint: "Atelier →",
      ariaLabel: "Découvrir l'Atelier",
      to: "/magister/cours",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/magister-hub-atelier.png",
    },
    {
      id: "magister-hub-pedagogie",
      sourceBox: { left: 321, top: 407, right: 480, bottom: 560 },
      hint: "Pédagogie →",
      ariaLabel: "Découvrir la Pédagogie",
      to: "/magister/pedagogie",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/magister-hub-pedagogie.png",
    },
    {
      id: "magister-hub-classe",
      sourceBox: { left: 80, top: 456, right: 194, bottom: 544 },
      hint: "Classe →",
      ariaLabel: "Découvrir la Classe",
      to: "/magister/classe",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/magister-hub-classe.png",
    },
    {
      id: "magister-hub-evaluation",
      sourceBox: { left: 162, top: 571, right: 280, bottom: 618 },
      hint: "Évaluation →",
      ariaLabel: "Découvrir l'Évaluation",
      to: "/magister/evaluation",
      zoomScale: 2.4,
      cutoutSrc: "/images/gallery/cutouts/magister-hub-evaluation.png",
    },
    // "Programme" (le sablier) n'a pas de repère : son sourceBox (y 629-740) recouvre
    // en pratique la zone du titre/sous-titre une fois affiché (mesuré à l'écran —
    // même rogné à sa portion la plus haute, il resterait sous le texte). Aucun autre
    // objet de la zone visible ne porte mieux "Programme" (voir generate-hotspot-cutouts.py) :
    // plutôt qu'un repère qui masque le texte ou réduit à un fragment méconnaissable, ce
    // lien reste accessible uniquement via la grille de cartes plus bas — cohérent avec le
    // principe déjà énoncé ailleurs (Home.tsx) : un repère est un raccourci en plus, jamais
    // le seul chemin vers une page.
  ],
}
