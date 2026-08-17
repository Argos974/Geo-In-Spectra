# Geo-Ind-Spectra

Site pédagogique de géomatique et télédétection, pensé comme une galerie : chaque
salle (module) est illustrée par une œuvre réelle du domaine public (Vermeer,
Cellarius, Raphaël, Ortelius) choisie pour son lien avec le sujet enseigné, pas pour
décorer. Le fond de chaque salle est l'œuvre elle-même en plein cadre ; les planches
diagrammatiques (SVG gravées à la main) illustrent les concepts sans jamais casser
l'identité visuelle.

## Stack

- React 19 + TypeScript + Vite 7
- React Router 7 (HashRouter, compatible hébergement statique sans config serveur)
- Tailwind CSS (palette et polices propres au site, voir plus bas)
- GSAP + ScrollTrigger + Lenis (smooth scroll, révélation des salles au scroll)
- Playwright (devDependency, sert uniquement à l'export PDF, voir plus bas)

## Identité visuelle

- **Palette** : `ink` / `canvas` (fonds sombres), `parchment` (texte), `gilt` /
  `gilt-bright` (or, accent principal), `lapis`, `oxblood` (accents secondaires).
  Définie dans `tailwind.config.js`.
- **Typographie** : Cinzel (titres, façon plaque gravée), EB Garamond (texte
  courant), IBM Plex Mono (cartels, données, libellés).
- **Élément signature** : `GalleryFrame` (double filet doré + cartel façon musée) et
  `ArtworkBackdrop` (l'œuvre en fond plein cadre, avec dégradé et cartel en coin,
  utilisé sur l'accueil et en tête de chaque module).

## Commandes

```bash
npm install
npm run dev           # serveur de dev
npm run build          # build production (dist/)
npm run test            # vitest
npm run lint             # eslint
npm run pdf:generate      # exporte les PDF de cours, voir ci-dessous
```

## Structure

```
src/
  components/
    content/
      ContentBlocks.tsx    # rend un tableau de ContentBlock (voir content/types.ts)
      RoomIndex.tsx          # "Plan de la salle" : table cliquable, scroll fluide vers la partie
    diagrams/
      registry.ts             # nom -> composant SVG + numéro de planche
      *.tsx                     # une planche gravée par concept (spectre EM, NDVI, opérations spatiales…)
    gallery/
      ArtworkBackdrop.tsx     # œuvre en fond plein cadre (accueil, en-tête de module)
      GalleryFrame.tsx          # œuvre encadrée + cartel (page de garde des PDF)
    layout/                     # header, footer, grain de toile
  content/
    *.ts                          # contenu réel de chaque salle, un fichier par module
    types.ts                       # ContentBlock (paragraph, formula, callout, table, diagram…)
  data/
    modules.ts                     # 5 salles : slug, titre, résumé, thèmes, épigraphe
    artworks.ts                     # œuvre associée à chaque salle (+ crédits)
    glossary.ts                      # termes techniques, un renvoi vers la salle qui les introduit
  pages/
    Home.tsx                         # frontispice + salles en fond plein cadre
    ModulePage.tsx                     # page web d'une salle
    PrintCourse.tsx                     # mise en page dédiée à l'export PDF (route /print/module/:slug)
    GlossaryPage.tsx                     # /glossaire
    LegalPage.tsx                          # /mentions-legales
  RootRouter.tsx                            # routes + masque header/footer/grain sur /print/*
scripts/
  generate-course-pdfs.mjs                   # voir "Export PDF" ci-dessous
public/
  pdf/<slug>/<NN>-<slug>-cours.pdf              # PDF générés (regroupés par salle)
  images/gallery/                                # les 6 œuvres (domaine public, Wikimedia Commons)
```

## Ajouter une salle (module)

1. Ajouter une entrée dans `src/data/modules.ts` (slug, titre, navLabel, résumé, thèmes, épigraphe).
2. Ajouter l'œuvre associée dans `src/data/artworks.ts` (même clé que le slug).
3. Créer `src/content/<slug>.ts` (tableau de `ContentBlock`) et le référencer dans `src/content/index.ts`.
4. `npm run pdf:generate -- <slug>` pour générer son PDF.

Nav, page web et export PDF se branchent automatiquement sur ces données ; aucun
autre fichier à modifier pour une salle qui suit le même schéma que les cinq déjà en ligne.

## Diagrammes

Chaque planche est un composant SVG dans `src/components/diagrams/`, enregistré
dans `registry.ts`. Pour en ajouter une : créer le composant, l'ajouter au registre,
puis l'insérer où pertinent dans un fichier `src/content/<slug>.ts` via un bloc
`{ type: "diagram", name: "<clé-du-registre>", caption: "…" }`. Les planches ne sont
pas des fichiers image : elles sont dessinées au chargement, rien à stocker dans un dossier.

## Export PDF

`npm run pdf:generate` régénère les 5 salles ; `npm run pdf:generate -- fondamentaux`
n'en régénère qu'une (ou plusieurs, séparées par des espaces) — utile pour ne pas
tout reconstruire après une petite modification d'une seule salle.

Le PDF **n'est pas** une capture de la page web : `src/pages/PrintCourse.tsx` est une
mise en page dédiée (page de garde, sommaire, contenu), rendue sur la route
`/print/module/:slug` sans aucun élément d'interface web (`RootRouter.tsx` masque
header/footer/grain sur ces routes). Le script build le site, sert `dist/`, imprime
chaque salle via Chromium headless (Playwright) avec en-tête/pied de page générés
par Playwright lui-même (`displayHeaderFooter`, numérotation des pages), puis dépose
le résultat dans `public/pdf/<slug>/`.

**Nommage** : `<NN>-<slug>-cours.pdf` (ex. `01-fondamentaux-cours.pdf`) — le numéro
d'ordre et le type de document (`cours` pour l'instant) permettent de s'y retrouver
une fois que fiches mémo et quiz PDF viendront s'ajouter au même endroit, avec la
même convention (`01-fondamentaux-fiche-memo.pdf`, `01-fondamentaux-quiz.pdf`, `01-fondamentaux-quiz-corrige.pdf`).

## Feuille de route

Un état des lieux pédagogique complet (critique du site, programme en sept axes,
exemples d'exercices, quiz, jeux, bibliographie, ordre de priorité proposé) a été
produit comme document de travail séparé plutôt que versionné ici. Premier chantier
déjà en ligne : le glossaire transversal (`/glossaire`). Restent, dans l'ordre
proposé : quiz interactif par salle, fiches mémo PDF, méthodologie académique
(commentaire de carte, dissertation, concours), histoire et fondements de la
géographie, un premier jeu pédagogique, puis l'étoffement des salles existantes.

## Déploiement

Vercel — `vercel.json` à la racine, build Vite standard, pas de config serveur
nécessaire (HashRouter évite les 404 au refresh sur les routes de module).
