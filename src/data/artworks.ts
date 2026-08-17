export interface Artwork {
  src: string
  alt: string
  artist: string
  title: string
  year: string
}

/**
 * Œuvres du domaine public (Wikimedia Commons), choisies pour leur sujet réel —
 * astronomie et cartographie — et non comme simple décor : chaque toile a un lien
 * thématique direct avec le module qu'elle illustre.
 */
export const artworks: Record<string, Artwork> = {
  hero: {
    src: "/images/gallery/hero-school-of-athens.jpg",
    alt: "L'École d'Athènes, fresque de Raphaël, montrant des philosophes antiques dont Ptolémée tenant un globe terrestre",
    artist: "Raphaël",
    title: "L'École d'Athènes",
    year: "1509–1511",
  },
  fondamentaux: {
    src: "/images/gallery/fondamentaux-cellarius-copernicanum.jpg",
    alt: "Planche du système copernicien tirée de l'Harmonia Macrocosmica d'Andreas Cellarius, montrant les orbites planétaires",
    artist: "Andreas Cellarius",
    title: "Planisphaerium Copernicanum",
    year: "1660",
  },
  teledetection: {
    src: "/images/gallery/teledetection-vermeer-astronomer.jpg",
    alt: "L'Astronome de Johannes Vermeer, un homme observant un globe céleste à la lumière d'une fenêtre",
    artist: "Johannes Vermeer",
    title: "L'Astronome",
    year: "1668",
  },
  "indices-spectraux": {
    src: "/images/gallery/indices-cellarius-coeli-stellati.jpg",
    alt: "Carte céleste de l'hémisphère chrétien tirée de l'Harmonia Macrocosmica, constellations figurées en couleurs",
    artist: "Andreas Cellarius",
    title: "Coeli Stellati Christiani Haemisphaerium Prius",
    year: "1660",
  },
  "outils-sig": {
    src: "/images/gallery/outils-vermeer-geographer.jpg",
    alt: "Le Géographe de Johannes Vermeer, un homme mesurant une carte au compas devant une fenêtre",
    artist: "Johannes Vermeer",
    title: "Le Géographe",
    year: "1669",
  },
  "travaux-pratiques": {
    src: "/images/gallery/tp-ortelius-world-map.jpg",
    alt: "Carte du monde d'Abraham Ortelius tirée du Theatrum Orbis Terrarum, premier atlas moderne",
    artist: "Abraham Ortelius",
    title: "Typus Orbis Terrarum",
    year: "1570",
  },
}
