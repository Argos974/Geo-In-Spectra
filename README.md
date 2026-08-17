# Geo-Ind-Spectra

Site pédagogique de géomatique et télédétection, pensé comme une galerie : chaque
salle (module) est illustrée par une œuvre réelle du domaine public (Vermeer,
Cellarius, Raphaël, Ortelius, Francken) choisie pour son lien avec le sujet
enseigné, pas pour décorer. Le fond de chaque salle est l'œuvre elle-même en plein
cadre ; les planches diagrammatiques (SVG gravées à la main) illustrent les concepts
sans jamais casser l'identité visuelle. Chaque salle propose aussi un quiz noté, un
cours et une fiche mémo téléchargeables en PDF.

## Stack

- React 19 + TypeScript + Vite 7
- React Router 7 (HashRouter, compatible hébergement statique sans config serveur)
- Tailwind CSS (palette et polices propres au site, voir plus bas)
- GSAP + ScrollTrigger + Lenis (smooth scroll, révélation des salles au scroll)
- Playwright (devDependency, sert uniquement à l'export PDF, voir plus bas)

## Identité visuelle

- **Palette** : `ink` / `canvas` (fonds sombres), `parchment` (texte), `gilt` /
  `gilt-bright` (or, accent principal), `lapis`, `oxblood` (accents secondaires,
  aussi utilisés pour les repères de niveau — voir « Niveaux » ci-dessous).
  Définie dans `tailwind.config.js`.
- **Typographie** : Cinzel (titres, façon plaque gravée), EB Garamond (texte
  courant), IBM Plex Mono (cartels, données, libellés).
- **Élément signature** : `GalleryFrame` (double filet doré + cartel façon musée) et
  `ArtworkBackdrop` (l'œuvre en fond plein cadre, avec dégradé et cartel en coin,
  utilisé sur l'accueil et en tête de chaque module).

## Commandes

```bash
npm install
npm run dev                 # serveur de dev
npm run build                # build production (dist/)
npm run test                  # vitest
npm run lint                   # eslint
npm run pdf:generate             # exporte les PDF de cours, voir "Export PDF"
npm run pdf:generate:fiches       # exporte les fiches mémo PDF
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
      *.tsx                     # une planche gravée par concept
    gallery/
      ArtworkBackdrop.tsx     # œuvre en fond plein cadre (accueil, en-tête de module)
      GalleryFrame.tsx          # œuvre encadrée + cartel (page de garde des PDF)
    layout/                     # header, footer, grain de toile
  content/
    *.ts                          # cours complet de chaque salle, un fichier par module
    fiches/*.ts                     # version condensée (fiche mémo) de chaque salle
    types.ts                         # ContentBlock (paragraph, formula, callout, table, diagram…)
                                       # heading accepte un `level` (voir "Niveaux")
  data/
    modules.ts                     # 7 salles : slug, titre, résumé, thèmes, épigraphe
    artworks.ts                     # œuvre associée à chaque salle (+ crédits)
    glossary.ts                      # termes techniques, source universitaire, renvoi vers la salle
    references.ts                     # bibliographie groupée par thème (page /references)
    quizzes/*.ts                       # questions à choix multiple par salle
  pages/
    Home.tsx                         # frontispice + salles en fond plein cadre
    ModulePage.tsx                     # page web d'une salle (cours, PDF, fiche PDF, quiz)
    QuizPage.tsx                        # /module/:slug/quiz
    EpsgGamePage.tsx                     # /jeu/epsg
    PrintCourse.tsx                       # mise en page dédiée à l'export PDF du cours (thème papier clair)
    PrintFiche.tsx                         # idem pour la fiche mémo
    GlossaryPage.tsx                        # /glossaire (recherche incluse)
    ReferencesPage.tsx                       # /references
    LegalPage.tsx                              # /mentions-legales
  RootRouter.tsx                              # routes + masque header/footer/grain sur /print/*
scripts/
  lib/pdfServer.mjs                            # build + serve + kill, partagé par les deux scripts PDF
  generate-course-pdfs.mjs                      # voir "Export PDF"
  generate-fiche-pdfs.mjs                        # idem, pour les fiches mémo
public/
  pdf/<slug>/<NN>-<slug>-<type>.pdf                # PDF générés (regroupés par salle)
  images/gallery/                                   # les 8 œuvres (domaine public, Wikimedia Commons)
```

## Ajouter une salle (module)

1. Ajouter une entrée dans `src/data/modules.ts` (slug, titre, navLabel, résumé, thèmes, épigraphe).
2. Ajouter l'œuvre associée dans `src/data/artworks.ts` (même clé que le slug).
3. Créer `src/content/<slug>.ts` (cours complet) et `src/content/fiches/<slug>.ts` (fiche condensée), référencer les deux dans leurs `index.ts` respectifs.
4. Optionnel : `src/data/quizzes/<slug>.ts` (référencé dans `quizzes/index.ts`) — sans lui, le bouton « Faire le quiz » n'apparaît simplement pas sur la page.
5. `npm run pdf:generate -- <slug>` et `npm run pdf:generate:fiches -- <slug>` pour générer ses PDF.

Nav, page web et export PDF se branchent automatiquement sur ces données.

## Niveaux

Un bloc `heading` peut porter un `level` (`college-lycee`, `superieur`,
`approfondissement`), affiché comme un repère coloré au-dessus du titre
(`ContentBlocks.tsx`). Objectif : une même salle peut mélanger une explication
accessible dès le collège/lycée et un approfondissement de niveau supérieur, sans
dupliquer le contenu en plusieurs pages — le lecteur choisit jusqu'où descendre. Voir
`src/content/traitements-ia.ts` pour un exemple complet (10 sections, 3 niveaux).

## Diagrammes

Chaque planche est un composant SVG dans `src/components/diagrams/`, enregistré
dans `registry.ts`. Pour en ajouter une : créer le composant, l'ajouter au registre,
puis l'insérer où pertinent dans un fichier `src/content/<slug>.ts` via un bloc
`{ type: "diagram", name: "<clé-du-registre>", caption: "…" }`. Les planches ne sont
pas des fichiers image : elles sont dessinées au chargement, rien à stocker dans un dossier.

## Export PDF

Deux scripts, même pipeline partagé (`scripts/lib/pdfServer.mjs`) : build le site,
sert `dist/` en local, imprime via Chromium headless (Playwright) — jamais une
capture de la page web : `PrintCourse.tsx`/`PrintFiche.tsx` sont des mises en page
dédiées (`/print/module/:slug`, `/print/fiche/:slug`), sans aucun élément
d'interface web (`RootRouter.tsx` masque header/footer/grain sur ces routes), **et
sur un thème papier clair délibérément différent du site** (fond sombre) : un
support de cours destiné à être imprimé ou lu comme un document, pas comme une page
web. `ContentBlocks`/`GalleryFrame`/`EngravedFrame` acceptent un prop `variant`
(`"dark"` pour le site, `"print"` pour ces deux pages) qui bascule leurs couleurs en
conséquence — aucun `displayHeaderFooter` Playwright : pas de bandeau ni de
numérotation de page superposés, la page de garde (illustrée) et le sommaire portent
déjà leur propre identité.

```bash
npm run pdf:generate                          # les 7 cours
npm run pdf:generate -- fondamentaux           # un seul cours
npm run pdf:generate:fiches                     # les 7 fiches mémo
npm run pdf:generate:fiches -- fondamentaux      # une seule fiche
```

**Nommage** : `<NN>-<slug>-<type>.pdf` (ex. `01-fondamentaux-cours.pdf`,
`01-fondamentaux-fiche-memo.pdf`) — le numéro d'ordre et le type de document
permettent de s'y retrouver une fois plusieurs PDF téléchargés dans le même dossier
de téléchargements. `<type>` vaut `cours` ou `fiche-memo` aujourd'hui ; `quiz` et
`quiz-corrige` suivront la même convention le jour où ils existeront en PDF.

## Feuille de route

Un état des lieux pédagogique complet (critique du site, programme en sept axes,
bibliographie) a été produit comme document de travail séparé plutôt que versionné
ici. Sept salles en ligne aujourd'hui : Fondements, Le Regard, Les Couleurs, Le
Compas, L'Atelier, L'Intelligence (indices composés/complexes, filtres,
classification, deep learning, IA) et La Méthode (commentaire de document,
dissertation, rapport technique, concours). Fondements intègre aussi l'histoire de
la cartographie, la lecture de carte, le débat Mercator/Peters et les codes
géographiques (EPSG, INSEE/COG, NUTS, cadastre) — regroupés là plutôt qu'en salle
séparée. Glossaire (avec sources et recherche), page Références (bibliographie par
thème), quiz interactif et fiches mémo PDF couvrent les sept salles. Reste : étoffer
encore chaque salle (le programme en sept axes en liste bien plus que ce qui est
déjà écrit).

## Déploiement

Vercel — `vercel.json` à la racine, build Vite standard, pas de config serveur
nécessaire (HashRouter évite les 404 au refresh sur les routes de module).
