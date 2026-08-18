import { Link } from "react-router-dom"

interface AnnaleLink {
  label: string
  url: string
  detail: string
}

interface AnnaleGroup {
  title: string
  audience: string
  note: string
  links: AnnaleLink[]
}

/**
 * Volontairement une page de liens sourcés vers de vraies épreuves
 * officielles, pas des sujets reconstitués par le site : reproduire un texte
 * d'épreuve sans certitude sur sa licence, ou pire l'attribuer à un concours
 * réel sans en être l'auteur, serait un risque de désinformation — pas
 * quelque chose que ce site prend. Chaque lien pointe vers la source
 * officielle qui publie elle-même le sujet.
 */
const GROUPS: AnnaleGroup[] = [
  {
    title: "CAPES / Agrégation Histoire-Géographie",
    audience: "Niveau Approfondissement : préparation aux concours d'enseignement",
    note: "Le portail officiel du ministère publie chaque année les sujets réels d'admissibilité, les rapports de jury (la ressource la plus utile pour calibrer le niveau attendu, voir module La Méthode, section 6) et des sujets zéro pour les concours bac+3.",
    links: [
      {
        label: "Sujets et rapports de jury du CAPES externe histoire-géographie (session 2025)",
        url: "https://www.devenirenseignant.gouv.fr/sujets-et-rapports-des-jurys-concours-du-capes-de-2025-1439",
        detail: "Sujets réels d'admissibilité de la session la plus récente, avec les rapports de jury correspondants.",
      },
      {
        label: "Structure des épreuves du CAPES externe et du CAFEP-CAPES histoire-géographie",
        url: "https://www.devenirenseignant.gouv.fr/les-epreuves-du-capes-externe-et-du-cafep-capes-section-histoire-et-geographie-517",
        detail: "Nature et coefficients de chaque épreuve écrite et orale, à lire avant de s'entraîner sur un sujet.",
      },
      {
        label: "Épreuves de l'agrégation interne et du CAERPA histoire-géographie",
        url: "https://www.devenirenseignant.gouv.fr/les-epreuves-de-l-agregation-interne-et-du-caerpa-section-histoire-et-geographie-970",
        detail: "Format spécifique à l'agrégation interne, distinct du CAPES externe.",
      },
      {
        label: "Sujets zéro des concours externes bac+3 de recrutement d'enseignants",
        url: "https://www.devenirenseignant.gouv.fr/exemples-de-sujets-des-concours-externes-bac3-de-recrutement-d-enseignants-1405",
        detail: "Exemples de sujets publiés par le ministère pour découvrir le format avant la session réelle.",
      },
    ],
  },
  {
    title: "BTS Métiers du Géomètre-Topographe et de la Modélisation Numérique",
    audience: "Niveau Lycée / Supérieur : proche des bases SIG et télédétection du site",
    note: "Le portail éduscol STI (ministère de l'Éducation nationale) publie chaque session les sujets réels de ce BTS, dont l'épreuve E4 mobilise directement des compétences SIG proches de celles du module Le Compas.",
    links: [
      {
        label: "Sujets BTS MGTMN, session 2025 (éduscol STI)",
        url: "https://sti.eduscol.education.fr/concours_examens/bts-metiers-du-geometre-topographe-et-de-la-modelisation-numerique-2025",
        detail: "Page officielle du ministère regroupant les sujets de la session la plus récente.",
      },
      {
        label: "Sujets BTS MGTMN, session 2019 (éduscol STI)",
        url: "https://sti.eduscol.education.fr/concours_examens/bts-metiers-du-geometre-topographe-et-de-la-modelisation-numerique-2019",
        detail: "Archive d'une session antérieure, utile pour s'entraîner sur plusieurs formats différents.",
      },
      {
        label: "Annales filière BTS : ESGT (école d'ingénieurs géomètres, CNAM)",
        url: "https://www.esgt.cnam.fr/admissions/cycle-d-ingenieur/annales-des-epreuves-de-la-filiere-bts-435102.kjsp",
        detail: "Annales maintenues par l'école d'ingénieurs géomètres-topographes qui recrute sur ce BTS, perspective admission plutôt que seulement diplôme.",
      },
    ],
  },
  {
    title: "Concours administratifs à dimension géomatique (technicien territorial, ingénieur territorial)",
    audience: "Niveau Supérieur / Approfondissement : filière fonction publique territoriale",
    note: "Moins centralisé que les deux catégories ci-dessus : les concours de la fonction publique territoriale sont organisés par des centres de gestion (CDG) régionaux, pas par un portail national unique. Les liens ci-dessous sont un point de départ, pas une liste exhaustive, le CDG de la région visée reste la source la plus à jour.",
    links: [
      {
        label: "CNFPT : sujets et meilleures copies (concours d'ingénieur territorial)",
        url: "https://www.cnfpt.fr/evoluer/preparation-aux-concours-concours-examens-professionnels/decouvrir-differents-types-concours-examens-professionnels/concours-dingenieur-ou-ingenieure-chef-territorial/sujets-meilleures-copies-concours-ingenieur-territorial-chef/national",
        detail: "Publié par le CNFPT, l'organisme national de formation de la fonction publique territoriale.",
      },
      {
        label: "CDG31 : annales du concours de technicien territorial",
        url: "https://www.cdg31.fr/content/concours-de-technicien-territorial-annales",
        detail: "Exemple d'archive tenue par un centre de gestion départemental (Haute-Garonne), la spécialité SIG figure parmi les options du concours technicien.",
      },
    ],
  },
]

export function AnnalesPage() {
  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Ressources</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Annales de concours</h1>
        <p className="text-parchment-dim text-lg mb-4 text-justify">
          De vrais sujets, publiés par les organismes officiels qui les produisent, pas des épreuves reconstituées par
          ce site. Chaque lien pointe directement vers la source qui fait autorité sur ce concours.
        </p>
        <p className="text-parchment-dim/80 text-sm mb-12 text-justify border-l-2 border-gilt/20 pl-4">
          Ce site ne republie aucun texte d'épreuve : reproduire un sujet sans certitude sur sa licence, ou l'attribuer
          à tort à un concours réel, serait un risque de désinformation. Les liens ci-dessous mènent vers les portails
          officiels eux-mêmes.
        </p>

        <div className="space-y-12">
          {GROUPS.map((g) => (
            <section key={g.title} className="border border-gilt/20 p-6">
              <h2 className="font-heading text-2xl text-gilt mb-1">{g.title}</h2>
              <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-4">{g.audience}</p>
              <p className="text-parchment-dim leading-relaxed text-justify mb-5">{g.note}</p>
              <ul className="space-y-4">
                {g.links.map((l) => (
                  <li key={l.url} className="border-l-2 border-gilt/20 pl-4">
                    <a href={l.url} target="_blank" rel="noreferrer" className="font-heading text-lg hover:text-gilt transition-colors">
                      {l.label} ↗
                    </a>
                    <p className="text-parchment-dim mt-1 text-justify">{l.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
