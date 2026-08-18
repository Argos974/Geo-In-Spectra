import { Link } from "react-router-dom"

export function DatasetPage() {
  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Ressources</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Jeux de données</h1>
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
            <p className="font-mono text-[13px] text-parchment-dim">/data/sample-vitrolles-2024/</p>
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
  )
}
