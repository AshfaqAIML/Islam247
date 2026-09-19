# Agent Work Record — F1-NAMES

**Task ID:** F1-NAMES
**Agent:** view-99-names
**Task:** Build 99 Names of Allah (Asma ul Husna) view

## Other Agents — Context You Can Reuse

Before starting, prior agents wrote their records under `/agent-ctx/`:
- `3-a-data-hadith-duas.md` — hadith + duas mock data (data layer)
- `10-11-views-duas-prayer.md` — duas + prayer views (design-pattern reference)

All high-level narrative is also mirrored in `/home/z/my-project/worklog.md`.

## Files I Touched

1. **Created** `/home/z/my-project/src/components/islamic/names-view.tsx` — exports `NamesView`.
2. **Edited** `/home/z/my-project/src/app/page.tsx` — added `import { NamesView }` and a `case "names": return <NamesView />;` branch to the existing `ViewRouter` switch so the Home-view button that calls `setView("names")` actually navigates here.

## What Was Built

Single-screen NamesView for the 99 Names of Allah (Asma ul Husna). Sections, top to bottom:

1. **Hero header card** (`motion.header`) — `hero-gradient` bg, `StarLattice` overlay (opacity 0.06), decorative slowly-rotating `StarMark` in the top-right corner (opacity 0.08, `animate-slow-spin`), centered large Arabic title `أَسْمَاءُ اللَّهِ الْحُسْنَى` via `font-arabic-display` in emerald, `StarDivider`, English subtitle "The 99 Most Beautiful Names of Allah", and a small helper line.
2. **Virtue card** — gold-tinted Card (`border-gold/20 bg-gold-soft/10`) with a Sparkles icon tile, "The Virtue" label, and `namesVirtue` rendered as an italic blockquote. Decorative StarMark watermark in the corner.
3. **Search input** — rounded-full Input (h-11) with leading Search icon. Filters by exact number match, or substring on transliteration (lowercased), english (lowercased), or arabic (raw RTL substring). Shows "Showing X of 99 names" count. Empty-state Card with "Clear search" button when nothing matches.
4. **Grid of NameCards** — responsive `grid-cols-2 / sm:grid-cols-3 / lg:grid-cols-4 / xl:grid-cols-5`. Staggered framer-motion fade-in-up entrance (parent variants with `staggerChildren: 0.025`, child `y: 16 → 0` over 0.35s). Grid wrapped in a single `TooltipProvider` (delayDuration 200) so all heart Tooltips share it.
5. **NameCard** — outer is a `motion.div` with `role="button"` + `tabIndex={0}` + `onKeyDown` (Enter / Space) handler. **NOT** a `<button>` — the favorite heart inside IS a real `<button>`, so this avoids the invalid nested-button DOM. Contains:
   - Number badge top-left (circular emerald gradient `from-emerald to-emerald/70`, white number 1-99).
   - Favorite heart button top-right (rounded `bg-background/60` backdrop-blur; `fill-gold text-gold` when favorited; calls `toggleFavorite("name-N")`). Tooltip on the heart shows "In favorites" / "Add to favorites".
   - Arabic name centered, `font-arabic` text-2xl text-emerald leading-loose.
   - Transliteration font-semibold centered.
   - English italic text-sm muted-foreground centered.
   - "Tap to view meaning" hint at bottom (`mt-auto`, Hash icon, hover color → emerald).
   - `card-refined` + hover lift + emerald border highlight + focus-visible ring.
6. **Detail Dialog** — controlled (open when `selectedName !== null`, close handler clears it). `DialogContent` has `showCloseButton={false}` + `p-0` + `gap-0` so the gradient header banner sits flush against the body. Inner `NameDetail` returns a Fragment (so the two divs become direct grid items of DialogContent):
   - **Emerald gradient header banner** (`bg-gradient-to-br from-emerald to-emerald/80`, primary-foreground text) with `star-lattice` opacity-0.12 overlay, corner `StarMark` watermark (opacity 0.15), custom top-right X close button (bg-primary-foreground/15 backdrop-blur), centered "Name N of 99" pill (with Hash icon), and large Arabic via `font-arabic-display` text-5xl/6xl.
   - **Body** — `DialogHeader` centered with transliteration (`DialogTitle`) + italic english (`DialogDescription`), `StarDivider`, "Meaning" label (emerald) + full meaning paragraph, gold-tinted virtue note box (`Sparkles` icon, references the Prophet's ﷺ hadith on enumerating the 99 names), and footer with outline favorite toggle button (gold-tinted when favorited) + emerald Close button.

## Verification

- `bunx eslint src/components/islamic/names-view.tsx src/app/page.tsx` → 0 errors / 0 warnings.
- `bunx tsc --noEmit` → no errors in the new file.
- `bun run lint` over the whole project → exit 0, clean.
- `dev.log` shows clean compiles after the changes.

## Design Tokens Used

- Emerald: `text-emerald`, `bg-emerald`, `bg-emerald-soft`, `from-emerald`, `to-emerald/70`/`/80`, `border-emerald/30`, `ring-emerald/40`, `text-emerald`.
- Gold: `text-gold`, `bg-gold-soft`, `fill-gold`, `border-gold/20`, `bg-gold-soft/10`, `border-gold/40`.
- Arabic typography: `font-arabic` (body, RTL) + `font-arabic-display` (large headers).
- Cards: `rounded-2xl border border-border/60 bg-card card-refined`.
- Hero/CSS utilities: `hero-gradient`, `star-lattice`, `animate-slow-spin`.
- shadcn components used: `Card`, `Button`, `Input`, `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription`, `Tooltip`/`TooltipProvider`/`TooltipTrigger`/`TooltipContent`.
- lucide-react icons: `Sparkles`, `Search`, `Heart`, `X`, `Hash`.

## Notes For Downstream Agents

- The NamesView's favorite id convention is `name-${number}` (e.g. `name-1` … `name-99`). If you build a Favorites aggregation view, you can recognize this prefix and pull the matching `DivineName` from `namesOfAllah` in `src/lib/data/names.ts`.
- The component is a self-contained single screen — no sub-navigation needed.
- If you want to deep-link to a specific name (e.g. from the home page's "name of the day"), you'd add a `selectedNameId` selector + `selectName` action to the Zustand store, mirroring the `selectedSurahId` pattern. Not done here since the task didn't require it.
