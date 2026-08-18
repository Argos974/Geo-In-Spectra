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
  "traitements-ia": {
    src: "/images/gallery/traitements-ia-francken-kunstkammer.jpg",
    alt: "Cabinet de curiosités de Frans Francken le Jeune, un mur et une table couverts de tableaux, coquillages, sculptures et médailles classés et rangés",
    artist: "Frans Francken le Jeune",
    title: "Kunst- und Raritätenkammer",
    year: "1636",
  },
  methodologie: {
    src: "/images/gallery/methodologie-rembrandt-philosophe.jpg",
    alt: "Le Philosophe en méditation de Rembrandt, un vieil homme assis près d'une fenêtre à côté d'un escalier en colimaçon",
    artist: "Rembrandt",
    title: "Philosophe en méditation",
    year: "1632",
  },
  // Les quatre chapitres de Méthodes (Discipulus) sont des subdivisions nouvelles de
  // l'ancienne salle "La Méthode" — chacune a désormais sa propre œuvre, choisie pour
  // son lien thématique avec la finalité du chapitre plutôt que reconduire "methodologie"
  // (Rembrandt, ci-dessus) sur les quatre à la fois.
  "methodologie-scolaire": {
    src: "/images/gallery/methodologie-scolaire-steen-village-school.jpg",
    alt: "L'École de village de Jan Steen, une salle de classe désordonnée avec un maître d'école et ses élèves",
    artist: "Jan Steen",
    title: "L'École de village",
    year: "1665",
  },
  "methodologie-concours": {
    src: "/images/gallery/methodologie-concours-rembrandt-anatomy-lesson.jpg",
    alt: "La Leçon d'anatomie du Dr Nicolaes Tulp de Rembrandt, un groupe de chirurgiens assistant à une démonstration publique",
    artist: "Rembrandt",
    title: "La Leçon d'anatomie du Dr Nicolaes Tulp",
    year: "1632",
  },
  "methodologie-professionnel": {
    src: "/images/gallery/methodologie-professionnel-rembrandt-syndics.jpg",
    alt: "Les Syndics des drapiers de Rembrandt, cinq responsables de guilde examinant la qualité d'un tissu",
    artist: "Rembrandt",
    title: "Les Syndics des drapiers",
    year: "1662",
  },
  "methodologie-recherche": {
    src: "/images/gallery/methodologie-recherche-wright-air-pump.jpg",
    alt: "Expérience sur un oiseau dans la pompe à air de Joseph Wright of Derby, une démonstration scientifique éclairée à la bougie",
    artist: "Joseph Wright of Derby",
    title: "Expérience sur un oiseau dans la pompe à air",
    year: "1768",
  },
  // Ajoutées pour que chaque page de profil (Discipulus/Magister) ait sa propre
  // œuvre plutôt que de reconduire "hero"/"travaux-pratiques" déjà utilisées
  // ailleurs (Home, module travaux-pratiques, MagisterCoursPage) — la
  // répétition d'une même toile en fond appauvrit la diversité visuelle du
  // site, pas seulement une question de lien thématique.
  "discipulus-hub": {
    src: "/images/gallery/discipulus-wright-orrery.jpg",
    alt: "Un philosophe donnant une conférence sur l'orrery de Joseph Wright of Derby, un maître entouré d'un groupe attentif dont un enfant, éclairés par le modèle mécanique du système solaire",
    artist: "Joseph Wright of Derby",
    title: "A Philosopher Lecturing on the Orrery",
    year: "1766",
  },
  "discipulus-cours": {
    src: "/images/gallery/discipulus-cours-rembrandt-faust.jpg",
    alt: "Un érudit dans son cabinet d'étude, saisi par l'apparition d'un disque lumineux, gravure de Rembrandt",
    artist: "Rembrandt",
    title: "Un érudit dans son cabinet (« Faust »)",
    year: "1652",
  },
  "discipulus-progression": {
    src: "/images/gallery/discipulus-progression-vermeer-balance.jpg",
    alt: "Une femme tenant une balance vide de Johannes Vermeer, pesant en pleine lumière devant un tableau du Jugement dernier",
    artist: "Johannes Vermeer",
    title: "Femme tenant une balance",
    year: "1662–1663",
  },
  "magister-cours": {
    src: "/images/gallery/magister-cours-teniers-alchemist.jpg",
    alt: "Un alchimiste dans son atelier de David Teniers le Jeune, entouré d'instruments, de fourneaux et de matériel de laboratoire",
    artist: "David Teniers le Jeune",
    title: "L'Alchimiste",
    year: "vers 1643–1645",
  },
  "magister-programme": {
    src: "/images/gallery/magister-programme-cellarius-scenographia.jpg",
    alt: "Planche de l'Harmonia Macrocosmica d'Andreas Cellarius, schéma scénographique du système copernicien",
    artist: "Andreas Cellarius",
    title: "Scenographia Systematis Copernicani",
    year: "1660",
  },
  "magister-evaluation": {
    src: "/images/gallery/magister-evaluation-van-ostade-schoolmaster.jpg",
    alt: "Le Maître d'école d'Adriaen van Ostade, un instituteur penché sur le travail d'un élève au milieu d'une salle de classe",
    artist: "Adriaen van Ostade",
    title: "Le Maître d'école",
    year: "1662",
  },
  ressources: {
    src: "/images/gallery/ressources-francken-cabinet.jpg",
    alt: "Cabinet d'un collectionneur de Frans Francken le Jeune, une pièce couverte de tableaux, coquillages, pièces, fossiles et fleurs classés",
    artist: "Frans Francken le Jeune",
    title: "Le cabinet d'un collectionneur",
    year: "1619",
  },
  // Une œuvre par page de l'onglet Ressources (Glossaire, Références, Formulaire,
  // Jeux de données, Pièges fréquents, Annales) — pas par sous-thème de Références,
  // qui n'en a pas besoin (déplacé ici sur demande, chacune distincte du reste du site).
  "ressources-glossaire": {
    src: "/images/gallery/ressources-glossaire-longhi-geographie.jpg",
    alt: "La Leçon de géographie de Pietro Longhi, un précepteur nommant les lieux du monde à de jeunes élèves devant un globe",
    artist: "Pietro Longhi",
    title: "La Leçon de géographie",
    year: "vers 1750–1752",
  },
  "ressources-references": {
    src: "/images/gallery/ressources-references-vermeer-art-of-painting.jpg",
    alt: "L'Art de la peinture de Johannes Vermeer, un peintre au chevalet devant un modèle drapé, une grande carte des Pays-Bas couvrant le mur du fond",
    artist: "Johannes Vermeer",
    title: "L'Art de la peinture",
    year: "vers 1666–1668",
  },
  "ressources-formulaire": {
    src: "/images/gallery/ressources-formulaire-de-keyser-blaeu.jpg",
    alt: "Portrait du cartographe et fabricant de globes Willem Jansz. Blaeu, attribué à Thomas de Keyser",
    artist: "Thomas de Keyser (attribué)",
    title: "Portrait de Willem Jansz. Blaeu",
    year: "XVIIe siècle",
  },
  "ressources-dataset": {
    src: "/images/gallery/ressources-dataset-creti-moon.jpg",
    alt: "Observations astronomiques : la Lune, de Donato Creti, une petite scène nocturne où des observateurs pointent un télescope vers la Lune",
    artist: "Donato Creti",
    title: "Observations astronomiques : la Lune",
    year: "1711",
  },
  "ressources-pieges": {
    src: "/images/gallery/ressources-pieges-racknitz-turk.jpg",
    alt: "Gravure du Turc mécanique de Kempelen, automate joueur d'échecs qui trompa le public pendant des décennies : le piège le plus célèbre de l'histoire des sciences",
    artist: "Joseph Racknitz",
    title: "Le Turc mécanique de Kempelen",
    year: "1789",
  },
  "ressources-annales": {
    src: "/images/gallery/ressources-annales-leiden-theatre.jpg",
    alt: "Gravure du théâtre anatomique de l'université de Leyde, amphithéâtre où se tenaient les épreuves et démonstrations savantes publiques",
    artist: "Willem van Swanenburg (d'après Woudanus)",
    title: "Le théâtre anatomique de Leyde",
    year: "1610",
  },
}
