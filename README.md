# Géomatique & Télédétection — Cours

Site pédagogique : géomatique, télédétection, SIG. Base de projet, contenu des modules à remplir.

## Stack

- React 19 + TypeScript + Vite 7
- React Router 7 (HashRouter — compatible hébergement statique sans config serveur)
- Tailwind CSS + shadcn/ui (config prête, `npx shadcn add <composant>` pour ajouter des composants)
- GSAP + ScrollTrigger + Lenis (smooth scroll, animations au scroll)

## Commandes

```bash
npm install
npm run dev      # serveur de dev
npm run build    # build production (dist/)
npm run test     # vitest
npm run lint      # eslint
```

## Structure

```
src/
  components/
    hero/
      GeoGridField.tsx       # fond animé procédural (grille + points d'observation), actif dès le chargement
      ScrollFrameCanvas.tsx  # primitif générique séquence d'images scrubbée au scroll — à brancher
                              # sur une vraie séquence de frames (flyover satellite, etc.) quand prête
    layout/                  # header, footer
    ui/                      # composants shadcn (à peupler au besoin)
  data/
    modules.ts                # liste des modules du cours — source unique pour nav + pages
  pages/
    Home.tsx                  # landing + grille de modules
    ModulePage.tsx             # page générique par module (contenu à remplir)
  RootRouter.tsx
  main.tsx
```

## Ajouter un module

Ajouter une entrée dans `src/data/modules.ts` — nav et page se génèrent automatiquement.
Le contenu réel (texte, schémas, démos, PDF téléchargeable) reste à écrire dans `ModulePage.tsx`
(ou une page dédiée par module si le contenu devient trop spécifique pour rester générique).

## Déploiement

Vercel — `vercel.json` à la racine, build Vite standard, pas de config serveur nécessaire
(HashRouter évite les 404 au refresh sur les routes de module).
