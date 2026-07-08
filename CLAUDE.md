# OpenWolf

@.wolf/OPENWOLF.md

This project uses OpenWolf for context management. Read and follow .wolf/OPENWOLF.md every session. Check .wolf/cerebrum.md before generating code. Check .wolf/anatomy.md before reading files.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**MERTMAKS EOOD** website (`mertmaks-v6`) — Next.js 15 App Router + React 19 marketing/storefront site for a Bulgarian company with three store divisions (supermarket, construction, industrial) plus a "Samuil Hub" page. UI copy is primarily in Bulgarian (Cyrillic).

## Commands

| Task | Command |
| --- | --- |
| Dev server (webpack) | `npm run dev` — runs `compile:scss` first, then `next dev --webpack` on port 3000. Do NOT switch back to `--turbo`: Turbopack's PostCSS worker pool fork-bombs on this machine (hundreds of node.exe → OOM crash). Build uses `--webpack` for the same reason. |
| Production build | `npm run build` — runs `compile:scss` first, then `next build` (output: `standalone`) |
| Start production | `npm run start` |
| Lint | `npm run lint` (note: `eslint.ignoreDuringBuilds: true` in `next.config.ts`, so lint is NOT enforced at build) |
| Type check | `npm run typecheck` (`tsc --noEmit`) |
| Format | `npm run format` (Prettier with `prettier-plugin-tailwindcss`) |
| Compile SCSS utilities only | `npm run compile:scss` |
| E2E tests (all) | `npx playwright test` |
| E2E tests (single file) | `npx playwright test tests/home.spec.ts` |
| E2E tests (one project) | `npx playwright test --project=chromium` |
| Playwright report | `npx playwright show-report` |

Note: `npm test` is currently a no-op placeholder (`echo "No tests yet" && exit 0`). Real tests live under `tests/` and run via Playwright directly. Playwright `baseURL` is `http://localhost:3000`, so the dev server must be running.

Node >= 20, npm >= 10.

## Architecture

### Next.js App Router layout (`src/app/`)
- Route groups: `(stores)/` contains `supermarket/`, `construction/`, `industrial/` pages (grouped without affecting URL).
- Top-level pages: `about`, `contact`, `restaurant`, `samuil-hub`, plus root `page.tsx`, `loading.tsx`, `not-found.tsx`.
- API routes live in `src/app/api/` (e.g. `feedback`). There is also a parallel `src/api/contact/` folder — be aware both exist; only `src/app/api/**` is served by Next.
- Global styles: `src/app/global.css` (Tailwind entry), `src/app/common.scss`.
- Path alias: `@/*` → `src/*` (from `tsconfig.json`).

### Component organization (`src/components/`)
Components are grouped by **function**, not by page. When adding a component, pick the folder that matches its role:
- `layout/` — Header, Footer, PageTransition, MobileNavIndicator (used on every page)
- `features/` — self-contained features: `ContactForm`, `SmartSearch`, `PromotionsSection`, `LeafletMap`, `StoreMap`, `StoreInfo`
- `interactive/` — animated/gesture UI: `DivisionCard`, `PrismCard`, `WebARButton`, `GestureWrapper`, `AnimatedIcon`, etc.
- `three-d/` — Three.js / R3F: `ThreeDShowcase`, `ThreeDShowcaseWrapper`, `PerformanceDetector`
- `ui/` — shadcn/ui primitives (Button, Card, Dialog, …). Treat as vendored; cross-folder imports usually look like `import { Button } from "../ui/button"` from within a sibling folder, or `@/components/ui/button` from elsewhere.
- `figma/` — Figma helpers (`ImageWithFallback`)
- `theme/` — theme/dark-mode plumbing

There is also a `src/components/pages/` group described in `COMPONENT_STRUCTURE.md`, but those files are rarely imported — the App Router `page.tsx` files are the canonical entrypoints.

### Data layer (`src/data/`)
**Single source of truth pattern** — all user-facing text, navigation, store info, and content is centralized in typed TS modules and imported by components. Do not hardcode Bulgarian strings in JSX; add/extend a data module instead.

Key modules (see `DATA_ARCHITECTURE.md` for the full component→data mapping):
- `company-data.ts` — `companyInfo`, `contactInfo`
- `navigation-data.ts` — `mainNavLinks`, `footerQuickLinks`
- `ui-texts.ts` — all UI labels, a11y strings, form copy, section headings
- `home-content.ts` — `heroContent`, `divisions`, `promotions`, `ctaContent`
- `timeline-data.ts` — company history
- `store-contacts.ts`, `stores.json` — store details and coordinates (used by Leaflet maps)
- `supermarket.ts`, `construction.ts`, `industrial.ts`, `samuil-hub.ts` — per-division page content
- `search-data.ts` — index for `SmartSearch` (Fuse.js)
- `promotions.jsonl` — promotions in JSONL form (separate from the typed `home-content.ts` promotions)

`src/lib/` holds shared utilities: `utils.ts` (`cn()` etc.), `location.ts`, `promotions.ts`, `stores.ts`.

### Styling — hybrid system
Three layers, in order of preference:
1. **Tailwind CSS v4** (`@tailwindcss/postcss`, configured in `tailwind.config.ts`) — primary.
2. **Hand-authored SCSS utility classes** under `src/styles/utilities/` (spacing, layout, typography, colors, borders, effects, responsive, interactivity). These are compiled to `src/styles/utilities/compiled.css` by the `compile:scss` prebuild step. See `TAILWIND_UTILITIES.md`. This compiled CSS is what ships — editing it directly will be overwritten; edit the `.scss` sources.
3. **SCSS Modules** for component-scoped styles (e.g. `src/styles/PrismCard.module.scss`).

`next.config.ts` sets `sassOptions.includePaths: ['./styles']`. SCSS is compiled by Next for modules, but the utility bundle is precompiled by the `compile:scss` script — both `predev` and `prebuild` hooks invoke it, so you usually don't need to run it manually.

### 3D and maps
- Three.js components live in `components/three-d/`. `PerformanceDetector` gates heavy 3D on capable devices.
- Leaflet maps (`react-leaflet`) are client-only; `LeafletMap` / `StoreMap` should be dynamically imported with `ssr: false` when used inside a Server Component page.

### Forms and validation
React Hook Form + `@hookform/resolvers` + Zod. Contact form sends via Resend (`resend` package). Env vars in `.env.local` (see `.env.example`).

## Conventions and gotchas

- **Don't hardcode user-facing strings** — extend `src/data/ui-texts.ts` or the relevant data module. The codebase deliberately centralizes copy for i18n-readiness.
- **Build ignores ESLint errors** (`eslint.ignoreDuringBuilds: true`). Run `npm run lint` and `npm run typecheck` explicitly before considering work done.
- **Two API folders exist**: `src/app/api/` (real, served by Next) and `src/api/` (legacy/parallel). Add new routes to `src/app/api/`.
- **Stale artifacts in repo root** (`.index.html.old`, `.src.old`, `.vite.config.ts.old`, `lint_error.log`, `lint_output.txt`, `phase_05.md`, `phase06.md`, `PHASE_*_COMPLETE.md`, `MIGRATION_NOTES.md`, `DATA_ORGANIZATION_COMPLETE.md`) are migration history from a Vite→Next.js conversion. Don't treat them as current architecture; `README.md`, `COMPONENT_STRUCTURE.md`, `DATA_ARCHITECTURE.md`, and `TAILWIND_UTILITIES.md` are the live docs.
- **Cyrillic content is intentional** — most copy is Bulgarian. Don't "fix" it to English.
- Images from `images.unsplash.com` are allowlisted in `next.config.ts`; add new remote hosts there before using `next/image` with them.
