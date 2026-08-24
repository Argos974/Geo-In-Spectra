# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Geo-In-Spectra: a geomatics/remote-sensing teaching site framed as a museum gallery — each
"room" (module) is a full-bleed backdrop of a real public-domain artwork chosen for its link to
the subject, illustrated with hand-drawn SVG plates rather than photos, so the visual identity
stays consistent throughout. See `README.md` for the design language (palette, typography,
`GalleryFrame`/`ArtworkBackdrop`) and the "Ajouter une salle" module-authoring checklist — both
still accurate. `README.md`'s file-structure/route list is stale (predates the Discipulus/Magister
split below); trust this file and `src/RootRouter.tsx` over it for routing/architecture.

## Commands

```bash
npm run dev                     # Vite dev server
npm run build                   # tsc -b && vite build
npm run lint                    # eslint .
npm run test                    # vitest run
npm run test:watch              # vitest (watch)
npx vitest run src/lib/levelFilter.test.ts   # single test file
npm run pdf:generate            # export all course PDFs (Playwright, see below)
npm run pdf:generate -- fondamentaux          # export one course's PDF
npm run pdf:generate:fiches -- fondamentaux   # export one fiche-mémo PDF
```

Path alias `@` → `src/` (set in both `vite.config.ts` and `tsconfig.json`).

## Architecture

### Two profiles, one content pool

`RootRouter.tsx` (`HashRouter`, static-hosting friendly) forks at `Home.tsx` into two
audiences that share the same underlying module content:
- **Discipulus** (`/discipulus`, student) — `Cours` (`/discipulus/cours`), `Méthodes`
  (`/discipulus/methodes`), `Progression` (`/discipulus/progression`, bilan), `Révision`
  (`/discipulus/revision`, spaced repetition).
- **Magister** (`/magister`, teacher) — `Cours` (`/magister/cours`, = l'Atelier/TP detail),
  `Programme`, `Évaluation`.

`Home.tsx` itself carries no course content — it's pure routing (profile choice + a link to the
"Parcours conseillés" guided paths, see below).

### Content pipeline

Course content lives as arrays of typed `ContentBlock` (`src/content/types.ts`) — one file per
module in `src/content/<slug>.ts`, aggregated in `src/content/index.ts` as `moduleContent`. The
same blocks feed three different renderers depending on context: `ContentBlocks.tsx` (raw
render), `ModuleChapterBody` (wraps it with per-module chrome, shared by every page below).

- **`DiscipulusCoursPage.tsx`** renders the "Cours" modules as collapsible `ChapterAccordion`
  sections on one page (not one route per module) — this is the current primary navigation path.
  Its display order comes from `[...COURS_SLUGS]` (`lib/moduleRoute.ts`, the single source —
  Set iteration order is insertion order), not a locally duplicated list.
- **`MagisterCoursPage.tsx`** renders the single `travaux-pratiques` module (l'Atelier) the same
  way, with `showTeacherMeta`.
- **`ModulePage.tsx`** (`/module/:slug`) is a legacy standalone per-module route, kept alive only
  for deep links (parcours stops, PDF export, cross-references) that predate the accordion pages
  — not the normal way a user navigates anymore. Its "back" link and any deep-link into a Cours
  chapter resolve through `lib/moduleRoute.ts::moduleTreeRoute`/`moduleTreeState`, which knows
  which accordion page (if any) actually owns a given slug today.

`ContentBlock.heading` can carry a `level` (`lycee` | `superieur` | `approfondissement`,
`src/content/types.ts`); `lib/levelFilter.ts::filterBlocksByLevel` hides/shows blocks by the
level active on a per-room filter, so one room can serve multiple audiences without duplicating
content. `lib/chapters.ts` splits a block array into chapters at each heading (used to build the
accordion sections and `Méthodes`'s super-chapter grouping).

### Parcours (guided paths)

`src/data/parcours.ts` defines a fixed list of guided paths (audience, ordered `steps`
description, and real `stops` — actual page routes to click "Suivant →" through). State is
localStorage-only (`lib/activeParcours.ts`, no backend/account system anywhere on this site):
`startParcours`/`setParcoursStep`/`clearActiveParcours`, broadcast via a custom
`active-parcours-changed` window event so `ActiveParcoursBar` (shown site-wide once a parcours is
active) and any page reading `useActiveParcours()` stay in sync without prop-drilling. `/parcours`
(`ParcoursPage.tsx`) is a standalone entry point — no dependency on having visited
Discipulus/Magister first — and is linked directly from `Home.tsx`.

### Progress, badges, goals — all localStorage, no backend

`lib/progress.ts` is the single source of truth other modules derive from: visited modules,
quiz scores/history, and a 5-box Leitner spaced-repetition queue (`reviewQueue`, consumed by
`RevisionPage`, distinct from a normal `QuizPage` attempt). `lib/badges.ts` (`computeBadges`) and
presumably `lib/goals.ts` are pure derivations recomputed from `getProgress()` on every render —
no separate persisted "earned" flag. `exportProgress`/`importProgress` (JSON round-trip) are the
only mechanism to carry a bilan across browsers/devices, since there's no account system.

### Diagrams

Each SVG "plate" is a component in `src/components/diagrams/`, registered by name + Roman-numeral
plate number in `registry.ts`. A content block references one by name
(`{ type: "diagram", name: "<registry-key>", caption }`) — nothing is a static image file, plates
draw themselves on load.

### Interactive content blocks

Beyond static prose blocks, `ContentBlock` also covers `game` (rendered via `GameBlock.tsx`,
backed by `src/data/games.ts`), and `live` (`src/components/live/*` — e.g.
`OsmBufferVitrolles`, `RasterExplorer`, `SentinelSwipe`, `GridChoropleth` — real interactive
geo demos, not illustrations) and `live-game` (`draw-operation`). Games/quizzes are per-module
data files under `src/data/quizzes/` and `src/data/games.ts`; `Annales` (`AnnalesPage`,
`annalesQuiz.ts`) is a separate past-exam practice bank, not tied to a single module.

### Search

`lib/searchIndex.ts::buildSearchIndex()` rebuilds a flat search index on every call from data
already in memory (modules, content blocks, glossary, resource links, games, quizzes,
exercises) — no separate index file to keep in sync, no fuzzy-search dependency (plain
case/accent-insensitive substring match, index stays small, ~200 entries). Powers
`RecherchePage.tsx`; a result's `scrollTo` (when present) opens the right accordion chapter and
scrolls to it via `lib/lenisStore.ts::openAndScrollTo`, passed as router `state` rather than a URL
fragment (HashRouter already owns the `#`, so there's no second fragment slot available for an
anchor).

### PDF export

`scripts/generate-course-pdfs.mjs` / `generate-fiche-pdfs.mjs` share `scripts/lib/pdfServer.mjs`
(build → serve `dist/` locally → print via headless Chromium/Playwright). They print dedicated
routes (`/print/module/:slug`, `/print/fiche/:slug` — `PrintCourse.tsx`/`PrintFiche.tsx`), never a
screenshot of the live site: `RootRouter.tsx` hides header/footer/grain on `/print/*`, and
`ContentBlocks`/`GalleryFrame`/`EngravedFrame` all take a `variant` prop (`"dark"` site vs.
`"print"` light-paper theme) so the exported document reads as a document, not a captured web
page. Output naming: `<NN>-<slug>-<type>.pdf` under `public/pdf/<slug>/`.
