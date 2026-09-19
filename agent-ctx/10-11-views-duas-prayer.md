# Task 10-11 — views-duas-prayer

## Task
Build Duas & Azkar view (`DuasView`) and Prayer Times view (`PrayerView`) components for the Islam24x7 single-page Islamic knowledge app.

## Files Created
- `src/components/islamic/duas-view.tsx` — `DuasView`
- `src/components/islamic/prayer-view.tsx` — `PrayerView`

## Summary
- **DuasView**: Two states (category list / dua list). Category grid with emerald-gradient icon tiles, Arabic + English names, dua counts, framer-motion staggered entrance. Dua list with back toolbar, gradient header card, dua cards featuring highlighted Arabic block, transliteration, translation, BookOpen reference, Sparkles virtue box, and a full counter (SVG progress ring + tappable increment button + target/remaining + reset) plus per-dua favorites. Reads `duaCounts`/`incrementDua`/`resetDua`/`favorites`/`toggleFavorite` from the Zustand store; back navigation clears `selectedDuaCategoryId`.
- **PrayerView**: Location card with "Use my location" geolocation (graceful fallback to Mecca), Gregorian + Hijri (Intl islamic calendar) dates, prominent next-prayer countdown card (refreshed every minute via setInterval), 6-prayer grid with next-prayer gold highlight and Sunrise distinguished as a time marker, and a Qibla compass (cardinal letters + tick marks + gold needle pointing to Mecca, optionally aligned to DeviceOrientationEvent/webkitCompassHeading). "Demo content — verify with local mosque" notices included.

## Key Decisions
- Module-scope icon resolution (`categoriesWithIcons` + `categoryById`) to avoid the `react-hooks/static-components` ESLint rule that fires when calling a function returning a component during render. Property reads (`<cat.Icon />`) satisfy the rule.
- 60-second `setInterval` timer updates `now` state so `getNextPrayer` recomputes the countdown.
- DeviceOrientationEvent listener reads `webkitCompassHeading` (iOS) or falls back to `(360 - alpha)`; compass dial rotates by `-deviceHeading` so N points to actual world-North, needle rotates by `qibla + dialRotation`.
- Hijri date via `Intl.DateTimeFormat('en-US', { calendar: 'islamic', ... })` with try/catch fallback.

## Verification
- `bunx eslint src/components/islamic/duas-view.tsx src/components/islamic/prayer-view.tsx` → 0 errors / 0 warnings.
- `bunx tsc --noEmit` → no errors in new files (only pre-existing errors in `examples/` and `skills/`).
- `bun run lint` → only the 2 pre-existing errors in `home-view.tsx` (owned by another agent).
- Dev server log shows clean compiles.
