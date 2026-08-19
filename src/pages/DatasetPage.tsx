import { Link } from "react-router-dom"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"

/**
 * Avant ce correctif, la seule mention du jeu de données réel ("/data/sample-
 * vitrolles-2024/") était du texte brut, ni lien ni bouton : rien n'était
 * réellement téléchargeable nulle part sur le site (bug signalé), il fallait
 * reconstituer l'URL à la main. `download` force l'enregistrement plutôt que
 * la navigation (utile pour les .tif, qu'un navigateur ne sait pas afficher).
 */
const DATASET_FILES = [
  { name: "sentinel2_2024-08-06_vitrolles_bands.tif", size: "1,9 Mo", desc: "6 bandes réelles en réflectance de surface (0–1) : bleu, vert, rouge, red-edge (B5), NIR, SWIR (B11), EPSG:2154, 10 m" },
  { name: "sentinel2_2024-08-06_vitrolles_indices.tif", size: "1,7 Mo", desc: "NDVI, NDMI, NDBI, NDRE, NDWI déjà calculés, en 5 bandes, pour vérifier un calcul plutôt que le refaire" },
  { name: "emprise.geojson", size: "< 1 Ko", desc: "Polygone exact de l'emprise, pour un découpage (clip) propre" },
  { name: "grille_100m_indices.geojson", size: "412 Ko", desc: "1122 cellules de 100 m avec la moyenne réelle de NDVI/NDMI/NDBI par cellule, résultat de référence pour la séance 3" },
  { name: "stats.json", size: "< 1 Ko", desc: "Statistiques réelles (min/max/moyenne/écart-type) de chaque indice sur toute l'emprise" },
  { name: "classification_reference.json", size: "< 2 Ko", desc: "Classification SCL réelle à 3 classes (végétation, sol nu/bâti, eau), découpage train/test et matrices de confusion Random Forest/MLP, référence pour la séance 6" },
]

export function DatasetPage() {
  const art = artworks["ressources-dataset"]

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} className="h-64 md:h-80 w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-10 max-w-3xl">
            <Link to="/ressources" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-4">
              ← Ressources
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Ressources</p>
            <h1 className="font-heading text-4xl md:text-5xl">Jeux de données</h1>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
        <p className="text-parchment-dim text-lg mb-12 text-justify">
          Le jeu de données canonique fourni avec le site, et les portails externes déjà cités dans le cours pour
          aller plus loin, réunis ici plutôt qu'éparpillés séance par séance.
        </p>

        <section className="mb-16">
          <h2 className="font-heading text-2xl text-gilt mb-6 pb-3 border-b border-gilt/15">Le jeu de données du site</h2>
          <div className="border border-gilt/25 bg-gilt/[0.04] p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">Sentinel-2 réel : Vitrolles, 6 août 2024</p>
            <p className="text-parchment-dim leading-relaxed text-justify mb-4">
              Scène S2B_31TFJ_20240806_0_L2A, 0.008 % de nuages, extraite du catalogue public Element84/AWS
              (Copernicus Sentinel data, ESA/UE). Emprise réelle de 3,2 × 3,3 km mélangeant bâti dense, aéroport,
              garrigue et étang de Berre, bandes en réflectance, indices précalculés, grille agrégée et statistiques
              réelles.
            </p>
          </div>

          <div className="mt-4 border border-gilt/15 divide-y divide-gilt/10">
            {DATASET_FILES.map((f) => (
              <a
                key={f.name}
                href={`/data/sample-vitrolles-2024/${f.name}`}
                download
                className="flex items-center justify-between gap-4 p-4 hover:bg-gilt/[0.04] transition-colors group"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[12.5px] text-parchment group-hover:text-gilt transition-colors break-all">{f.name}</p>
                  <p className="text-parchment-dim text-xs mt-1 leading-relaxed">{f.desc}</p>
                </div>
                <span className="shrink-0 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-parchment-dim/70 whitespace-nowrap">{f.size}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gilt whitespace-nowrap">Télécharger ↓</span>
                </span>
              </a>
            ))}
          </div>

          <Link
            to="/module/travaux-pratiques"
            className="block mt-4 border border-gilt/15 p-4 hover:border-gilt/40 hover:text-gilt transition-colors font-mono text-[11px] uppercase tracking-wider"
          >
            Voir le détail des fichiers et leur usage → module L'Atelier
          </Link>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-gilt mb-6 pb-3 border-b border-gilt/15">Portails de données ouvertes</h2>
          <div className="space-y-4">
            {[
              { name: "Copernicus Data Space Ecosystem", detail: "Téléchargement gratuit des images Sentinel (ESA/UE), sans limite de volume pour un usage non commercial.", url: "https://dataspace.copernicus.eu" },
              { name: "USGS EarthExplorer", detail: "Téléchargement gratuit des images Landsat et de nombreux autres produits USGS/NASA.", url: "https://earthexplorer.usgs.gov" },
              { name: "Element84 Earth Search (STAC)", detail: "Catalogue Sentinel-2 L2A public sur AWS, interrogeable par API, sans authentification, utilisé pour extraire le jeu de données du site.", url: "https://earth-search.aws.element84.com/v1" },
              { name: "data.gouv.fr", detail: "Portail français des données publiques ouvertes, dont de nombreuses couches géographiques (communes, cadastre, réseaux).", url: "https://www.data.gouv.fr" },
              { name: "cartes.gouv.fr", detail: "Plateforme cartographique officielle française (IGN), référentiels géodésiques et fonds de carte.", url: "https://www.cartes.gouv.fr" },
            ].map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gilt/15 p-5 hover:border-gilt/40 hover:bg-gilt/[0.04] transition-colors"
              >
                <p className="font-heading text-lg text-parchment mb-1">{r.name} ↗</p>
                <p className="text-parchment-dim text-sm text-justify">{r.detail}</p>
              </a>
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  )
}
