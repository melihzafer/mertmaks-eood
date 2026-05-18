# Copilot instructions for MERTMAKS EOOD

## Build, test, and lint

| Task | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Production build | `npm run build` |
| Start production server | `npm run start` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Format | `npm run format` |
| Compile SCSS utilities | `npm run compile:scss` |
| Run all E2E tests | `npx playwright test` |
| Run one E2E file | `npx playwright test tests/home.spec.ts` |
| Run one E2E test by title | `npx playwright test -g "should load homepage"` |
| Run one browser project | `npx playwright test --project=chromium` |
| Open Playwright report | `npx playwright show-report` |

`npm run dev` and `npm run build` run `compile:scss` first through npm pre-scripts. `npm test` is a placeholder (`echo "No tests yet" && exit 0`); real tests are Playwright specs in `tests/`. Playwright uses `http://localhost:3000` as `baseURL`, so run the dev server before E2E tests.

Node >= 20 and npm >= 10 are required.

## Architecture

This is a Next.js 15 App Router + React 19 marketing/storefront site for MERTMAKS EOOD. The site is primarily Bulgarian (`bg`, Cyrillic copy) and covers the homepage, about/contact/restaurant/Samuil Hub pages, and three store divisions.

Routes live under `src/app/`. The `(stores)` route group contains `/supermarket`, `/construction`, and `/industrial` without changing the URL path. `src/app/page.tsx` and route `page.tsx` files are the canonical page entrypoints; the older `src/components/pages/` pattern is not the main routing mechanism.

Components are grouped by function in `src/components/`: `layout/` for global chrome, `features/` for forms/maps/search/promotions, `interactive/` for gesture/animated UI, `three-d/` for Three.js/R3F, `theme/` for app-level theme/service worker plumbing, `figma/` for Figma helpers, and `ui/` for shadcn/Radix primitives.

Most content is centralized in `src/data/` rather than embedded in JSX. Important modules include `company-data.ts`, `navigation-data.ts`, `ui-texts.ts`, `home-content.ts`, `timeline-data.ts`, `store-contacts.ts`, `stores.json`, division-specific files, `search-data.ts`, and `promotions.jsonl`. Shared data helpers live in `src/lib/`.

Styling is hybrid: Tailwind CSS v4 is primary, custom SCSS utility classes live in `src/styles/utilities/*.scss`, and component-specific SCSS modules are used where needed. The generated `src/styles/utilities/compiled.css` is build output; edit the SCSS sources instead.

Interactive maps use Leaflet/react-leaflet and must stay client-only. Import map components with `next/dynamic` and `ssr: false` from Server Component pages. Three.js/R3F code lives in `src/components/three-d/`, with `PerformanceDetector` used to gate heavier 3D experiences.

API routes served by Next belong under `src/app/api/`. There is also a legacy/parallel `src/api/` folder; do not add new served routes there.

## Codebase conventions

- Use the `@/*` path alias for imports from `src/*`; sibling component folders often use relative imports for nearby `ui` primitives.
- Do not hardcode new user-facing copy in JSX when a matching data module exists. Add or extend the appropriate `src/data/` module, especially for Bulgarian UI labels, navigation, store data, and a11y text.
- Keep Bulgarian/Cyrillic copy intact unless the task explicitly asks for translation or copy changes.
- Treat `src/components/ui/` as shadcn/Radix-style base primitives; prefer composing them from feature/layout/interactive components instead of adding app-specific behavior directly there.
- Build output ignores ESLint errors via `next.config.ts`; run `npm run lint` and `npm run typecheck` explicitly when validating code changes.
- `next.config.ts` outputs `standalone`, enables SCSS include paths, and allowlists `images.unsplash.com` for `next/image`; add new remote image hosts there before using them.
- Root migration artifacts such as `.index.html.old`, `.src.old`, `.vite.config.ts.old`, `phase_05.md`, `phase06.md`, and `PHASE_*` documents are historical. Prefer `README.md`, `COMPONENT_STRUCTURE.md`, `DATA_ARCHITECTURE.md`, `TAILWIND_UTILITIES.md`, and this file for current guidance.
