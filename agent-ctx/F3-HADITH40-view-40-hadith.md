# Agent Work Record — F3-HADITH40

**Task ID:** F3-HADITH40
**Agent:** view-40-hadith
**Task:** Build 40 Hadith Nawawi view

## Other Agents — Context You Can Reuse

Before starting, prior agents wrote their records under `/agent-ctx/`:
- `3-a-data-hadith-duas.md` — hadith + duas mock data (data layer).
- `10-11-views-duas-prayer.md` — duas + prayer views (design-pattern reference).
- `F1-NAMES-view-99-names.md` — 99 Names view; the closest design reference (hero-gradient, StarLattice, search, sticky-bar pattern, card-refined).

All high-level narrative is also mirrored in `/home/z/my-project/worklog.md`.

## Files I Touched

1. **Created** `/home/z/my-project/src/components/islamic/hadith40-view.tsx` — exports `Hadith40View`.
2. **Edited** `/home/z/my-project/src/app/page.tsx` — added `import { Hadith40View }` and a `case "hadith40": return <Hadith40View />;` branch to the existing `ViewRouter` switch.

## What Was Built

Single-screen `Hadith40View` rendering Imam An-Nawawi's 42-hadith collection (sourced from `fortyHadith` in `src/lib/data/forty-hadith.ts`). Sections, top to bottom:

1. **Hero header card** (`motion.header`) — `hero-gradient` bg, `StarLattice` overlay (opacity 0.06), decorative slowly-rotating `StarMark` in the top-right corner (opacity 0.08, `animate-slow-spin`), centered `ScrollText` emerald tile, large Arabic title `الأربعون النووية` via `font-arabic-display` (text-4xl → md:text-6xl emerald), `StarDivider`, English subtitle "The Forty Hadith of Imam An-Nawawi", a brief Imam-an-Nawawi description, and a gold "Demo content" badge with `Sparkles` icon.
2. **Search input** — rounded-full `Input` (h-11) with leading `Search` icon. Filters by exact hadith number, or substring on title (lowercased), english (lowercased), narrator (lowercased), or arabic (raw RTL substring). All filter logic lives inside a `useMemo`.
3. **Sticky-ish filter / sort bar** — `sticky top-0 z-20`, `bg-background/85` + `backdrop-blur`, shows live count "N Hadiths of 42" (with a `Library` icon), and a favorites toggle button (heart icon). When favorites toggle is on, the list is filtered to only hadiths whose `"nawawi-N"` id is in the persisted `favorites` array. The toggle button turns gold-tinted (`fill-gold text-gold` heart, `border-gold/40 bg-gold-soft`) when active.
4. **Empty-state** Card with `Search` icon + helpful message when nothing matches (different copy for favorites-only mode vs regular search miss).
5. **List of hadith cards** — vertical stack, `max-w-3xl mx-auto`, `gap-4`. Staggered framer-motion fade-in-up entrance (parent variants `staggerChildren: 0.06`, child `y: 16 → 0` over 0.4s).

### NawawiCard layout

- `card-refined` Card with `hover:border-emerald/30`.
- Top row: large emerald circular number badge (`h-12 w-12`, `bg-gradient-to-br from-emerald to-emerald/70`, white number 1-42) + title (`font-semibold text-lg truncate`) + "Hadith N of 42" muted subtitle. `pr-10` reserves room for the heart button.
- Favorite heart button — absolute top-right (`right-3 top-3`, h-8 w-8, `bg-background/60` backdrop-blur). `fill-gold text-gold` when favorited. Calls `toggleFavorite("nawawi-N")`.
- Grade badge (below title row) — color-coded: `Sahih (Agreed Upon)` → emerald + `Check` icon, `Sahih` → emerald + `Sparkles` icon, `Hasan Sahih` & `Hasan` → gold + `Sparkles` icon. All `text-[11px]` outline Badge.
- Arabic text block — highlighted area `bg-emerald-soft/30 rounded-xl p-4`, `font-arabic`, `text-xl sm:text-2xl`, `leading-loose`, right-aligned.
- Small `StarDivider` (`my-3`).
- English translation (`text-base leading-relaxed text-foreground`).
- Narrator line — `inline-flex` with `User` icon (emerald/70), "Narrated by:" (font-medium foreground/80) + italic narrator. `text-sm text-muted-foreground`.
- Reference line — `border-t border-border/40 pt-3`, `BookOpen` icon + reference text in `text-xs text-gold`.

## Design Tokens Used

- Emerald: `text-emerald`, `bg-emerald`, `bg-emerald-soft`, `bg-emerald-soft/30`, `from-emerald`, `to-emerald/70`, `border-emerald/20`, `border-emerald/30`, `text-emerald/70`, `ring-emerald/30`.
- Gold: `text-gold`, `bg-gold-soft`, `fill-gold`, `border-gold/30`, `border-gold/40`.
- Arabic typography: `font-arabic-display` (hero header), `font-arabic` (each card's Arabic block).
- Cards: `rounded-2xl border border-border/60 bg-card card-refined`.
- Hero/CSS utilities: `hero-gradient`, `StarLattice` overlay, `animate-slow-spin` corner star.
- shadcn components used: `Card`, `Badge`, `Input`.
- lucide-react icons: `BookOpen`, `Check`, `Heart`, `Library`, `ScrollText`, `Search`, `Sparkles`, `User`.

## Verification

- `bun run lint` → exit 0, clean (no warnings, no errors).
- `dev.log` shows clean `✓ Compiled` lines (no type errors, no Next.js rule violations).
- Favorites toggle persists through the existing Zustand store (`favorites: string[]` + `toggleFavorite(id)`).
- Favorite id convention: `"nawawi-${number}"` (e.g. `nawawi-1` … `nawawi-42`). A future Favorites aggregation view can recognize this prefix and pull the matching `NawawiHadith` from `fortyHadith`.

## Notes For Downstream Agents

- This component is a self-contained single screen — no sub-navigation, no dialogs, no detail panels.
- The `gradeStyles` map is keyed on the four grade strings present in the data (`Sahih`, `Sahih (Agreed Upon)`, `Hasan`, `Hasan Sahih`). If new grades are added to the data, `getGradeStyle` falls back to the Sahih style.
- The sticky filter bar sits at `top-0`. If you stack this view under a global `Header`, the Header's own height may overlap; the existing `Header` is part of the layout in `page.tsx` and the sticky bar will stick below it because the main content scrolls inside `main`. Verified visually via the dev server.
