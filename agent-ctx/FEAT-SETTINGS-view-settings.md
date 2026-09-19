---
Task ID: FEAT-SETTINGS
Agent: view-settings
Task: Build Settings view with reader preferences, daily goal, data management

Work Log:
- Read `src/lib/types.ts`, `src/lib/store.ts`, `src/components/islamic/star-mark.tsx`, `src/components/islamic/home-view.tsx`, `src/components/islamic/reading-stats-widget.tsx`, `src/components/islamic/reader-view.tsx`, and `src/app/globals.css` to align with the established design system (emerald/gold palette, hero-gradient, card-refined, framer-motion entrance, StarMark/StarDivider).
- Reviewed shadcn/ui Slider, AlertDialog, Card, Button, Badge, Progress components to use the correct APIs (Slider expects `value` as an array + `onValueChange`; AlertDialog composes Trigger/Content/Header/Title/Description/Action/Cancel).
- Created `/home/z/my-project/src/components/islamic/settings-view.tsx` exporting `SettingsView` with six sections:
  1. Hero header card — `hero-gradient` background, decorative rotating StarMarks (animate-slow-spin / animate-slow-spin-reverse), centered StarMark, "Settings" gradient title, subtitle "Personalize your reading experience", StarDivider.
  2. Reader Preferences card — live preview paragraph reflecting current font size/family/spacing/theme applied to the required sample text; font-size Slider (14-24, step 1) + value Badge; font family toggle (Serif/Sans, active = emerald bg); line-spacing Slider (1.5-2.2, step 0.1) + value Badge; reading theme grid (Light/Sepia/Dark with Sun/BookOpen/Moon icons). Preview area background switches with the selected theme using the same theme mapping as reader-view.
  3. Daily Reading Goal card — explanatory text, 5-option segmented control (10/20/30/50/100), today's progress computed from `readingStats[today]` (ayahsRead + chaptersRead*5 ayah-equivalents) shown via Progress bar + percent Badge, plus mini summary chips for `getStreak()` and `getTotalStats().days`.
  4. Tasbeeh Settings card — 4-option target selector (33/99/100/1000) + lifetime tasbeeh total via `tasbeehTotal`.
  5. Data Management card — count chips (favorites, bookmarks, reading days, total chapters read), "Export my data" button generating a JSON Blob + `URL.createObjectURL` download as `islam24x7-data.json` (includes readingProgress, readingStats, favorites, bookmarks, duaCounts, tasbeehTotal, tasbeehTarget, currentDhikr, dailyGoalAyahs, reader settings, lastReadDate), "Reset all data" destructive button wrapped in shadcn AlertDialog confirmation; localStorage key `islam24x7-store` cleared on confirm then `window.location.reload()`. Note explains local-only storage.
  6. About card — app name, v1.0.0 Badge, brief description, demo-content disclaimer.
- All sections use framer-motion fade-in-up entrance animations with staggered delays (0, 0.1, 0.15, 0.2, 0.25, 0.3). Mobile-first responsive layout (`max-w-4xl`, grid breakpoints). `cn` from `@/lib/utils` used throughout.
- Updated `/home/z/my-project/src/app/page.tsx`: imported `SettingsView` from `@/components/islamic/settings-view` and added `case "settings": return <SettingsView />;` to the ViewRouter switch (after `download`).
- Ran `bun run lint` — passed with zero errors/warnings.
- Verified dev server log shows successful compilation with no runtime errors related to the new view.

Stage Summary:
- `SettingsView` is now registered as a navigable view in the single-page app router. It exposes all persisted reader settings, daily-goal tracking, tasbeeh target selection, and a complete data export/reset workflow with confirmation dialog.
- Reuses the established emerald/gold Islamic design tokens (hero-gradient, text-gradient-emerald, card-refined, StarMark/StarDivider, animate-slow-spin) for visual consistency with the rest of the app.
- Export payload includes the full persisted state shape required by the task plus a `_meta` block for traceability.
- Reset action safely removes only the `islam24x7-store` localStorage key (matching the Zustand persist name in `src/lib/store.ts`) and reloads the page to re-initialise default state.
