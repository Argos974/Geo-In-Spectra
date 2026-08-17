import { Link } from "react-router-dom"
import { referenceGroups } from "@/data/references"
import { cn } from "@/lib/utils"

const typeLabel: Record<string, string> = {
  manuel: "Manuel",
  revue: "Revue",
  site: "Site",
  video: "Vidéo",
  officiel: "Officiel",
}

const typeStyle: Record<string, string> = {
  manuel: "text-gilt border-gilt/40",
  revue: "text-lapis border-lapis/40",
  site: "text-gilt-bright border-gilt/40",
  video: "text-oxblood border-oxblood/40",
  officiel: "text-parchment border-parchment-dim/40",
}

export function ReferencesPage() {
  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Annexe</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Références</h1>
        <p className="text-parchment-dim text-lg mb-12">
          Manuels, revues, sites spécialisés et ressources officielles consultables pour aller au-delà du site,
          groupés par thème du cours.
        </p>

        <div className="space-y-12">
          {referenceGroups.map((group) => (
            <div key={group.theme}>
              <h2 className="font-heading text-2xl mb-5">{group.theme}</h2>
              <ul className="space-y-4">
                {group.refs.map((ref) => (
                  <li key={ref.label} className="border-l-2 border-gilt/20 pl-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={cn("font-mono text-[9.5px] uppercase tracking-wider border px-1.5 py-0.5", typeStyle[ref.type])}>
                        {typeLabel[ref.type]}
                      </span>
                      {ref.url ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-heading text-lg hover:text-gilt transition-colors"
                        >
                          {ref.label}
                        </a>
                      ) : (
                        <span className="font-heading text-lg">{ref.label}</span>
                      )}
                    </div>
                    <p className="text-parchment-dim mt-1">{ref.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
