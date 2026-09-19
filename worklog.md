# Islam24x7 — Work Log

---
Task ID: 3-a
Agent: data-hadith-duas
Task: Create Hadith collections and Duas/Azkar mock data files

Work Log:
- Read existing `src/lib/types.ts` to confirm `HadithCollection`, `Hadith`, `DuaCategory`, and `Dua` interface definitions.
- Read existing `src/lib/data/quran.ts` for style/format reference (Arabic text conventions, demo content flag, helper functions).
- Created `src/lib/data/hadith.ts`:
  - `hadithCollections` array of 4 `HadithCollection` objects (Bukhari, Muslim, Abu Dawud, Tirmidhi).
  - Realistic `bookCount` and `hadithCount` figures (Bukhari 7563, Muslim 7470, Abu Dawud 5274, Tirmidhi 3956).
  - 4–5 authentic, well-known hadiths per collection, each with authentic Arabic text, scholarly English translations, narrator, grade (Sahih/Hasan), book, and chapter labels.
  - Includes the user-requested famous hadiths: "Actions are by intentions" (Bukhari #1), "None of you truly believes…", "Seeking knowledge is obligatory…", "Speak good or remain silent", "Muslim is the one from whose tongue & hand…", "Paradise lies at the feet of your mother", "Best of you learn Quran and teach it".
  - Exported helper `getHadithById(id)` that scans all collections.
- Created `src/lib/data/duas.ts`:
  - `duaCategories` array of 6 `DuaCategory` objects: Morning & Evening Azkar (sunrise), After Prayer (heart), Sleep (moon), Eating (utensils), Travel (plane), Protection (shield).
  - 3–4 authentic duas per category with authentic Arabic, transliteration, English translation, reference (Bukhari/Muslim/Abu Dawud/Tirmidhi/Nasa'i), recommended count (1/3/100 etc.), and virtue/benefit text.
  - Includes user-requested well-known duas: Sayyid al-Istighfar, A'udhu bikalimatillah, three Quls, Astaghfirullah x3, Allahumma anta as-Salam, Tasbih Fatimah (33/33/33 + 100th), Ayat al-Kursi, Bismika Allahumma amutu wa ahya, Allahumma aslamtu nafsi…, Bismillah (eating), Alhamdulillahilladhi at'amana…, Subhanalladhi sakhkhara lana…, Ayibuna ta'ibun…, Bismillahilladhi la yadurru…, Raditu billahi Rabba…, last 3 surahs, refuge from grief & debt dua.
  - Exported helper `getDuaById(id)` that scans all categories.
- Ran `bun run lint` (clean, no errors) and `bunx tsc --noEmit` on both files (clean, no type errors).

Stage Summary:
- Two data files delivered: `src/lib/data/hadith.ts` (4 collections, 17 hadiths) and `src/lib/data/duas.ts` (6 categories, 20 duas).
- All TypeScript types align with the existing interfaces in `src/lib/types.ts`.
- Arabic text uses authentic riwayah wording from canonical Sunni hadith literature and the Quran.
- Both files export a named array plus a `getXxxById(id)` lookup helper for the UI layer (Tasks 3-b+ and beyond).
- Lint and type-check both pass; no test files written per instructions.

---
Task ID: 6-7
Agent: views-library-reader
Task: Build Library view and Reader view components

Work Log:
- Read prior worklog and source files: `src/lib/store.ts`, `src/lib/types.ts`, `src/lib/data/books.ts`, `src/components/islamic/home-view.tsx`, `src/components/islamic/star-mark.tsx` to align with established design patterns (deep emerald + warm gold palette, StarMark/StarDivider motifs, framer-motion fade-in-up, shadcn/ui Card/Button/Badge/Input, `useAppStore` selectors).
- Verified shadcn/ui component APIs (Button variants, Badge variants, Progress, Select primitives) and Tailwind 4 setup (auto-JIT, custom `--emerald/--gold/--emerald-soft/--gold-soft` theme tokens in `globals.css`).
- Created `src/components/islamic/library-view.tsx` (`LibraryView`):
  - Hero header with emerald→gold gradient + star-lattice watermark, "Islamic Library" title, subtitle, and `LibraryIcon`.
  - Sticky-feel search input (rounded-full, leading Search icon) filtering by title/author/description.
  - Category filter pills (All, Fiqh, Tafsir, Aqeedah, Seerah, History) with count badges (gold-soft when inactive, primary-foreground/20 when active), accessible `role="tab"` + `aria-selected`.
  - Empty-state card with reset-filters button when no books match.
  - Responsive grid (1 / sm:2 / lg:3 / xl:4 cols) of `BookCard` subcomponents.
  - Each `BookCard`: book-spine gradient banner (`book.coverColor`) with star-lattice overlay + corner `StarMark` watermark, "Demo" badge (top-left) when `isDemo`, category gold-soft badge, truncated title, author, 2-line description, pages+chapters meta row, full-width emerald "Read" button calling `selectBook(book.id)`, and a top-right favorite `Heart` button (filled gold when favorited, calls `toggleFavorite`).
  - framer-motion staggered entrance via parent `variants` + per-card `hidden/visible`.
- Created `src/components/islamic/reader-view.tsx` (`ReaderView`):
  - Top-level component handles the empty state (no `selectedBookId`): centered card with `BookOpen` + `StarMark`, "Select a book to start reading", and a "Browse Library" button calling `setView("library")`.
  - When a book is selected, renders `<ReaderContent key={book.id} book={book} />` — keyed remount on book change so chapter index re-initializes cleanly via `useState` lazy initializer (avoids the `react-hooks/set-state-in-effect` rule).
  - `ReaderContent`:
    - Sticky top toolbar (theme-aware bg) with back-to-library button (`ArrowLeft`), book title+author, favorite `Heart` toggle, and a shadcn `Select` chapter dropdown.
    - Top progress `Progress` strip = `(chapterIndex + 1) / total * 100`.
    - Reading area (`max-w-2xl mx-auto`): centered chapter heading, `StarDivider`, then paragraphs split by `\n\n+`. Inline `style={{ fontSize }}` driven by `readerFontSize`. Theme-driven text color (light/sepia/dark) via `themeBg` + paragraph color classes.
    - End-of-chapter nav (Previous / Next) with StarDivider above.
    - Sticky bottom control bar: font size −/+ (clamp 14–24), prev/next chapter, and Light/Sepia/Dark theme toggle pills (active = emerald bg).
    - framer-motion `AnimatePresence mode="wait"` page transition between chapters (key = chapter.id), with staggered paragraph fade-ins.
    - Single effect on chapter change calls `updateReadingProgress({ bookId, chapterId, chapterIndex, scrollPercent, lastRead: Date.now() })` (Zustand setter — legitimate external sync, not React setState) and smooth-scrolls the reading container to top.
    - `goToChapter(i)` wraps modulo `total` so prev on chapter 0 → last chapter, next on last → chapter 0.
- Lint iteration: first pass flagged unused `eslint-disable` directives + a `setState`-in-effect. Refactored to the keyed-child-component pattern + lazy `useState` initializer → only the persist-progress effect remains (which calls a Zustand setter, not React setState). Final `bun run lint` reports 0 errors/warnings in the two new files (the 2 remaining errors are pre-existing in `home-view.tsx`, owned by another agent).
- `bunx tsc --noEmit` reports no errors in the new files (only pre-existing errors in `examples/` and `skills/` folders).

Stage Summary:
- Two components delivered: `src/components/islamic/library-view.tsx` (`LibraryView`) and `src/components/islamic/reader-view.tsx` (`ReaderView`).
- Library view: search + 6-way category filter + responsive card grid with book-spine visuals, Demo badges, favorites, and `selectBook` integration.
- Reader view: empty state, theme-aware reading column (light/sepia/dark) with adjustable font size (14–24), chapter Select dropdown + prev/next wrap-around nav, sticky toolbar + bottom control bar, top progress strip, framer-motion chapter transitions, and automatic progress persistence via `updateReadingProgress`.
- Both components are `"use client"`, use the existing Zustand store, align with the established emerald/gold + StarMark design language, and pass ESLint + TypeScript checks with no new issues.
- No test files written; no new routes created; no external libraries added.

---
Task ID: 8-9
Agent: views-quran-hadith
Task: Build Quran view and Hadith view components

Work Log:
- Read prior worklog and reference files: `src/lib/store.ts`, `src/lib/types.ts`, `src/lib/data/quran.ts`, `src/lib/data/hadith.ts`, `src/components/islamic/home-view.tsx`, `src/components/islamic/library-view.tsx`, `src/components/islamic/star-mark.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/scroll-area.tsx`, and `globals.css` to align with the established emerald/gold + StarMark design language, the `font-arabic` RTL convention, and the Zustand store selectors (`selectSurah`, `selectHadithCollection`, `toggleFavorite`, `favorites`).
- Created `src/components/islamic/quran-view.tsx` (`QuranView`):
  - Top-level component subscribes to `selectedSurahId`; runs a `useEffect` that smooth-scrolls to top whenever the selection changes (open or back). Falls back to `<SurahList />` when no surah is selected; otherwise renders `<SurahReading key={surah.id} />` so each surah remounts cleanly.
  - `SurahList`: hero header card (emerald→gold gradient + star-lattice + Arabic title القرآن الكريم + StarDivider + "Demo content" badge), rounded-full search Input filtering by name / englishName / translation / nameArabic / id, results-count line, and a responsive 1 / sm:2 / lg:3 grid of `SurahCard` items with framer-motion staggered entrance. Empty-state card with "Clear search" button when nothing matches.
  - `SurahCard`: rounded-2xl button. Left = number in a rounded-square gradient-emerald badge with a `StarMark` watermark + the surah id in `text-primary-foreground`. Right = arabic name (`font-arabic`, `text-emerald`, right-aligned). Below: english name, translation, revelation-type Badge (Meccan = gold-soft, Medinan = emerald-soft) with `MapPin` icon, and ayah-count meta with `Hash` icon. Hover lift + emerald border highlight.
  - `SurahReading`: sticky toolbar (back "All Surahs" button + surah id/ayah-count meta), gradient emerald→emerald/80 surah header Card with star-lattice + corner StarMark watermark, large Arabic name, English name + translation, and ayah-count + revelation meta. Basmala header (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحَيمِ` + English gloss) shown for every surah EXCEPT Al-Fatihah (id 1) whose first ayah already IS the basmala. Ayah list with framer-motion staggered entrance; each ayah is an `AyahRow` Card with a circular gold gradient number badge (top-left), Arabic text (`font-arabic`, right-aligned, text-2xl/3xl, leading-loose), italic transliteration, English translation, and a per-ayah favorite `Heart` button (filled gold when favorited) keyed by `ayah-${surah.id}-${ayah.number}`. End StarDivider + "Back to all surahs" button. Back navigation uses `useAppStore.setState({ selectedSurahId: null })`.
- Created `src/components/islamic/hadith-view.tsx` (`HadithView`):
  - Top-level component subscribes to `selectedHadithCollectionId`; smooth-scrolls to top on selection change. Falls back to `<CollectionsList />` when nothing selected, otherwise `<HadithList key={collection.id} />`.
  - `CollectionsList`: hero header with `Library` icon, "Hadith Collections" title, Arabic كتب الحديث, subtitle "Prophetic traditions authentically preserved", StarDivider, and "Demo content" badge. Responsive 1 / sm:2 grid of `CollectionCard`s with framer-motion staggered entrance.
  - `CollectionCard`: rounded-2xl Card with a decorative `BookMarked` watermark in the corner. Top row = emerald-gradient BookMarked icon-tile + large Arabic name. Body = English name, two stat Badges (bookCount in emerald-soft, hadithCount in gold-soft, both with icons), 3-line description, "X sample hadiths" outline badge, and a full-width emerald "Browse" button calling `selectHadithCollection(collection.id)`.
  - `HadithList`: sticky toolbar (back "Collections" button + collection name/hadith-count meta), gradient emerald header Card (Arabic name + English name + book/hadith stats), description paragraph, then framer-motion staggered list of `HadithCard`s. End StarDivider + "Back to all collections" button. Back navigation uses `useAppStore.setState({ selectedHadithCollectionId: null })`.
  - `HadithCard`: rounded-2xl Card with favorite `Heart` button (top-right). Top row = emerald circular number badge (h-11 w-11, accommodates 4-digit hadith numbers like 5027) + grade Badge. Grade styles: Sahih = emerald-soft/emerald, Hasan = gold-soft/accent-foreground, Daif = red (light + dark variants). Below: Arabic text (`font-arabic`, right-aligned, text-xl/2xl, leading-loose) → small StarDivider → English translation → "Narrated by:" narrator line → bordered reference section with `BookOpen` (book) and `ScrollText` (chapter) rows. Favorite id = `hadith-${collection.id}-${hadith.number}`.
- Both components are `"use client"`, use only shadcn/ui `Card`/`Button`/`Badge`/`Input` + lucide-react icons + framer-motion, and respect the established design tokens (`bg-emerald`, `bg-emerald-soft`, `text-gold`, `bg-gold-soft`, `bg-card`, `text-muted-foreground`, `font-arabic`, `star-lattice`). Responsive mobile-first layout throughout.
- Lint: `bunx eslint src/components/islamic/quran-view.tsx src/components/islamic/hadith-view.tsx` → clean (0 errors, 0 warnings). `bunx tsc --noEmit` → no errors in the new files. (`bun run lint` reports only the 2 pre-existing errors in `home-view.tsx` owned by another agent.)
- Verified dev server log shows successful compiles after the file changes.

Stage Summary:
- Two components delivered: `src/components/islamic/quran-view.tsx` (`QuranView`) and `src/components/islamic/hadith-view.tsx` (`HadithView`).
- Quran view: surah list with search + staggered card grid (number badge, Arabic name, English/translation, revelation badge, ayah count), and surah reading view with sticky toolbar, gradient header card, conditional Basmala (skipped for Al-Fatihah), staggered ayah rows with circular gold number badges, transliteration + translation, and per-ayah favorites.
- Hadith view: collections grid with book-spine watermark, stats, description, Browse button; and hadith list view with sticky toolbar, gradient header card, staggered hadith cards (emerald number circle, grade-colored badge, Arabic + StarDivider + English, narrator, book/chapter reference, favorite button).
- Both components use the Zustand store for selection + favorites, smooth-scroll to top on selection change, framer-motion staggered entrances, and the established emerald/gold + StarMark design language. Back navigation clears store selection via `useAppStore.setState(...)`.
- No test files written; no new routes created; no external libraries added.

---
Task ID: 10-11
Agent: views-duas-prayer
Task: Build Duas & Azkar view and Prayer Times view components

Work Log:
- Read prior worklog and reference files: `src/lib/store.ts`, `src/lib/types.ts`, `src/lib/data/duas.ts`, `src/lib/data/prayer.ts`, `src/components/islamic/home-view.tsx`, `src/components/islamic/quran-view.tsx`, `src/components/islamic/star-mark.tsx`, plus shadcn `card.tsx`/`button.tsx`/`badge.tsx`/`progress.tsx` and `globals.css` to align with the established emerald/gold + StarMark design language, `font-arabic` RTL convention, framer-motion staggered entrance pattern, and the Zustand store selectors (`selectedDuaCategoryId`, `selectDuaCategory`, `duaCounts`, `incrementDua`, `resetDua`, `favorites`, `toggleFavorite`).
- Created `src/components/islamic/duas-view.tsx` (`DuasView`):
  - Top-level component subscribes to `selectedDuaCategoryId`; smooth-scrolls to top on selection change. Falls back to `<CategoryList />` when nothing selected, otherwise renders `<DuaList key={category.id} />` so each category remounts cleanly.
  - Module-scope icon resolution: built `categoriesWithIcons` (enriches `duaCategories` with a stable `Icon` component reference) + `categoryById` Map. This avoids the `react-hooks/static-components` rule that fires when calling a function returning a component during render. Icons mapped from category.icon string: sunrise→Sunrise, heart→Heart, moon→Moon, utensils→Utensils, plane→Plane, shield→Shield.
  - `CategoryList`: hero header card (emerald→gold gradient + star-lattice + Arabic title الأذكار والأدعية + StarDivider + "Demo content" badge), then a responsive 1 / sm:2 / lg:3 grid of category cards with framer-motion staggered entrance. Each card: emerald-gradient icon tile, Arabic name (`font-arabic`, right-aligned, text-emerald), English name (font-semibold), dua count, corner StarMark watermark, hover lift + emerald border highlight, click calls `selectDuaCategory(cat.id)`.
  - `DuaList`: back toolbar ("All categories" ghost button + dua-count Badge), gradient emerald→emerald/80 category header card with icon tile + Arabic name + English name + subtitle. Then framer-motion staggered list of `DuaCard`s. End StarDivider + "Back to all categories" outline button. Back navigation uses `useAppStore.setState({ selectedDuaCategoryId: null })`.
  - `DuaCard`: rounded-2xl Card with border-b title row (emerald number badge + font-semibold title + "Recite N×" gold-soft Badge) and a favorite `Heart` button (top-right, filled gold when favorited, keyed by `dua-${dua.id}`). Highlighted Arabic block (emerald-soft→gold-soft gradient, `font-arabic`, text-xl/2xl, right-aligned, leading-loose). Then italic transliteration, translation, reference row (BookOpen icon, text-xs muted), and an optional virtue box (gold-tinted border + Sparkles icon). Counter section: SVG progress ring (stroke-emerald normally, stroke-gold when complete) with a large tappable circular increment button (emerald gradient → gold gradient when complete, shows current count + "tap" label or a Check icon when complete), "/ target" display, "X recitations remaining" or "Complete! May Allah accept." message, linear Progress bar, and a RotateCcw reset button (hover destructive). Reads/writes `duaCounts[dua.id]` via `incrementDua`/`resetDua`.
- Created `src/components/islamic/prayer-view.tsx` (`PrayerView`):
  - State: `lat`/`lng`/`locationName` (default to Mecca 21.4225, 39.8262), `locating`/`locationError` for geolocation, `deviceHeading` (nullable, from DeviceOrientationEvent), `now` (refreshed every 60s via setInterval for the countdown).
  - Effects: 60-second timer to update `now`; device-orientation listener that reads `webkitCompassHeading` (iOS) or falls back to `(360 - alpha)` for the Qibla compass. Both cleaned up on unmount.
  - Memoized: `times` (computePrayerTimes), `nextPrayer` (getNextPrayer), `qibla` (getQiblaBearing), `hijriDate` (Intl.DateTimeFormat with `calendar: 'islamic'`), `gregorianDate`.
  - `useMyLocation()`: calls `navigator.geolocation.getCurrentPosition`, updates lat/lng/name on success; on error (permission denied or other) resets to Mecca defaults and shows a destructive-colored AlertCircle message.
  - Header: hero card with Compass icon, "Prayer Times" title, Arabic مواقيت الصلاة, StarDivider, subtitle, "Demo content — verify with your local mosque" badge.
  - Location + dates Card: MapPin icon tile + location name + coordinates, "Use my location" outline button (Navigation icon, shows "Locating…" while pending), error message if any, and a 2-col grid showing Gregorian date (foreground) and Hijri date (emerald).
  - Next-prayer countdown card: prominent emerald→emerald/80 gradient card with "Next Prayer" label, large prayer name + Arabic name, "at TIME", and a right-side glass panel showing "Xh Ym" time remaining until the next prayer. Driven by `getNextPrayer(times)` which recomputes every minute.
  - Prayer times grid: 2 cols mobile / 3 cols desktop. Each card: icon tile (emerald-soft for prayers, amber for Sunrise; gold-tinted + gold icon for the next prayer), prayer name, Arabic name, large time. The next prayer card gets a gold ring/gold-soft bg + a "Next" pill badge. Sunrise is rendered with a dashed border + "Time marker — not a prayer" caption to distinguish it.
  - Qibla compass: `QiblaCompass` subcomponent renders a circular dial (emerald-soft→gold-soft gradient) with N/E/S/W cardinal letters (N in destructive red, others foreground) and 12 tick marks every 30°. The dial rotates by `-deviceHeading` so N points to actual world-North when device orientation is available. A gold needle (vertical bar + Ka'bah-style StarMark marker at the tip) rotates by `qibla + dialRotation` to point toward Mecca in the screen frame. Center emerald pivot dot. Smooth CSS transitions on both rotations. Beside the dial: "Qibla Direction" heading (Compass icon), description, large emerald bearing in degrees "from North", and a contextual hint about device alignment.
  - Footer: StarDivider + disclaimer that times are approximate and to consult the local mosque timetable.
- Lint iteration: first ESLint pass flagged `react-hooks/static-components` on `const Icon = getCategoryIcon(category.icon)` in `DuaList` (top-level component variable assigned from a function call returning a component). Refactored to resolve icons once at module scope (`categoriesWithIcons` + `categoryById`), then access via stable property reads (`<cat.Icon />`, `<category.Icon />`). Final `bunx eslint` on both files → 0 errors / 0 warnings. `bunx tsc --noEmit` → no errors in the new files (only pre-existing errors in `examples/` and `skills/` folders). `bun run lint` → only the 2 pre-existing errors in `home-view.tsx` owned by another agent.
- Dev server log shows clean compiles after the file changes.

Stage Summary:
- Two components delivered: `src/components/islamic/duas-view.tsx` (`DuasView`) and `src/components/islamic/prayer-view.tsx` (`PrayerView`).
- Duas view: category list (6 cards with emerald-gradient icon tiles, Arabic + English names, dua counts, staggered entrance) and dua list view (back toolbar, gradient header card, staggered dua cards with highlighted Arabic block, transliteration, translation, BookOpen reference, Sparkles virtue box, and a full counter — SVG progress ring + tappable increment button + target/remaining display + reset — plus per-dua favorites). Reads/writes `duaCounts`/`incrementDua`/`resetDua` and `favorites`/`toggleFavorite` from the store; back navigation clears `selectedDuaCategoryId`.
- Prayer view: location card with "Use my location" geolocation button (graceful fallback to Mecca on denial), Gregorian + Hijri (Intl islamic calendar) date display, prominent next-prayer countdown card (refreshed every minute), 6-prayer grid (2/3 cols) with next-prayer gold highlight and Sunrise distinguished as a time marker, and a Qibla compass with cardinal letters, tick marks, and a gold needle that points to Mecca — optionally aligned to device orientation via DeviceOrientationEvent/webkitCompassHeading. Includes "Demo content — verify with local mosque" notices.
- Both components are `"use client"`, use only shadcn/ui `Card`/`Button`/`Badge`/`Progress` + lucide-react icons + framer-motion, respect the established design tokens (`bg-emerald`, `bg-emerald-soft`, `text-gold`, `bg-gold-soft`, `bg-card`, `text-muted-foreground`, `font-arabic`, `star-lattice`), and are mobile-first responsive throughout.
- No test files written; no new routes created; no external libraries added.

---
Task ID: MAIN
Agent: orchestrator (main)
Task: Build complete Islam24x7 Islamic knowledge platform — copy website concept from github.com/AshfaqAIML/Islam24X7

Work Log:
- Analyzed the source repository's README to understand the concept: an Islamic knowledge platform with Quran, Hadith, library, reader, search, AI assistant, prayer times, and tasbeeh features using a deep emerald + warm gold design system with Islamic geometric patterns.
- Built an original implementation (not copied code) on Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui.
- Set up the design system in globals.css: deep emerald + warm gold OKLCH color palette, light/dark themes, Amiri Arabic font, eight-pointed star lattice patterns, ornamental borders, custom scrollbar, tasbeeh pulse animation, fade-in-up animation.
- Created TypeScript types (src/lib/types.ts) and Zustand store (src/lib/store.ts) with persisted state for reading progress, tasbeeh counts, dua counters, favorites, and reader settings.
- Created mock data files: quran.ts (8 surahs with ayahs + daily ayah rotation), books.ts (7 library books across 5 categories with chapters), prayer.ts (prayer time computation + Qibla bearing). Hadith and Duas data created by subagent.
- Built the brand mark component (star-mark.tsx): eight-pointed SVG star (Khatim Sulayman), StarDivider, StarLattice.
- Built the layout shell: header (logo, desktop nav, search, theme toggle, mobile sheet menu), footer (sticky, brand + quick links + tools), bottom-nav (mobile tab bar with 5 tabs).
- Built the Home view: hero greeting, daily ayah card, quick access grid (6 destinations), continue-reading card, tasbeeh counter widget, feature highlights.
- Delegated Library+Reader, Quran+Hadith, Duas+Prayer views to 3 parallel subagents — all completed successfully.
- Built the AI Assistant: backend API route (src/app/api/ai/route.ts) using z-ai-web-dev-sdk LLM with a detailed Islamic-research-assistant system prompt; frontend view with scope selector, suggested questions, chat interface with streaming-style loading, message history.
- Built the Search view: global search across Quran/Hadith/Books/Duas with scope tabs, result counts, highlighted excerpts, Arabic text display.
- Built the Tasbeeh view: 7 dhikr options, large tappable counter with SVG progress ring, cycle/total/remaining stats, vibration feedback, completion celebration, virtue note.
- Built the Download view: APK download card, feature list, accordion installation guide, security note.
- Wired all views in page.tsx with ThemeProvider and a ViewRouter based on Zustand view state.
- Fixed 3 lint errors: replaced useEffect+setState with useMemo for greeting, replaced require() with ES import, derived completed state directly instead of useEffect.
- Verified with agent-browser: Home, Quran (list + reading), Library, Duas (categories + counters), Prayer (times + Qibla + Hijri date), AI Assistant (real LLM response received), theme toggle, mobile viewport — all working with no console errors.

Stage Summary:
- Complete Islam24x7 platform delivered as a single-page app with 11 views: Home, Library, Reader, Quran, Hadith, Duas, Prayer, Search, AI Assistant, Tasbeeh, Download.
- All views use the emerald/gold Islamic design system with StarMark motifs, Arabic typography, and responsive layouts.
- AI Assistant is fully functional with real LLM responses via z-ai-web-dev-sdk (tested: received a comprehensive, well-cited answer about the Five Pillars).
- Persisted state: reading progress, tasbeeh totals, dua counters, favorites, reader settings all survive page reloads via Zustand persist middleware.
- Lint passes clean (0 errors). Dev server runs on port 3000. All API routes working.
- Content integrity: all Quran verses, hadith, and duas use authentic public religious text with proper references; demo badges shown where applicable.

---
Task ID: F1-NAMES
Agent: view-99-names
Task: Build 99 Names of Allah (Asma ul Husna) view

Work Log:
- Read prior worklog and reference files: src/lib/types.ts (ViewId includes "names"), src/lib/store.ts (Zustand store with view/setView, favorites/toggleFavorite), src/lib/data/names.ts (namesOfAllah + namesVirtue + DivineName), src/components/islamic/star-mark.tsx (StarMark/StarDivider/StarLattice), src/components/islamic/home-view.tsx + quran-view.tsx (design pattern references), globals.css (emerald/gold tokens, hero-gradient, card-refined, font-arabic, font-arabic-display, animate-slow-spin, star-lattice), and shadcn ui/dialog.tsx, ui/tooltip.tsx, ui/badge.tsx, ui/input.tsx, ui/card.tsx to confirm APIs.
- Created src/components/islamic/names-view.tsx (NamesView):
  - Hero header card with hero-gradient bg, StarLattice overlay (opacity 0.06), decorative slowly-rotating StarMark in the top-right corner (opacity 0.08, animate-slow-spin), centered large Arabic title "أَسْمَاءُ اللَّهِ الْحُسْنَى" via font-arabic-display in emerald, StarDivider, English subtitle "The 99 Most Beautiful Names of Allah" + helper subtitle.
  - Virtue card below hero: gold-tinted card (border-gold/20 + bg-gold-soft/10) with Sparkles icon tile, "The Virtue" label, and namesVirtue text styled as an italic blockquote. Decorative StarMark watermark in the corner.
  - Rounded-full search Input (h-11) with leading Search icon filtering names by exact number, or substring match on transliteration (lowercased), english (lowercased), or arabic (raw, RTL). Shows "Showing X of 99 names" count.
  - Empty-state Card (dashed) with Search icon + "Clear search" button when nothing matches.
  - Responsive grid of NameCard components: grid-cols-2 / sm:grid-cols-3 / lg:grid-cols-4 / xl:grid-cols-5. Staggered framer-motion fade-in-up entrance (parent variants with staggerChildren 0.025, child variants y:16→0 duration 0.35).
  - Wrapped grid in TooltipProvider (delayDuration 200) so each card's favorite Tooltip shares one provider.
  - NameCard: outer is motion.div with role="button" + tabIndex={0} + onKeyDown(Enter/Space) handler (NOT a <button> — avoids nested-button invalid HTML, since the favorite heart inside IS a real button). Number badge top-left = circular emerald-gradient (from-emerald to-emerald/70) with the number in primary-foreground. Favorite heart button top-right = rounded bg-background/60 backdrop-blur, fill-gold when favorited, calls toggleFavorite(`name-${number}`). Arabic name centered via font-arabic text-2xl text-emerald leading-loose. Transliteration font-semibold. English italic text-sm muted-foreground. "Tap to view meaning" hint at bottom (mt-auto) with Hash icon, hover color → emerald. Uses card-refined + hover lift + emerald border highlight + focus-visible ring.
  - Tooltip on the heart button shows "In favorites" / "Add to favorites".
  - Detail Dialog (controlled: open when selectedName !== null, onClose clears it). DialogContent has showCloseButton={false}, p-0, gap-0, rounded-2xl, border-emerald/30, sm:max-w-md. Inner NameDetail returns a Fragment containing two grid items:
    - Emerald gradient header banner (bg-gradient-to-br from-emerald to-emerald/80, primary-foreground text) with star-lattice opacity-0.12 overlay, corner StarMark watermark (opacity 0.15), custom top-right X close button (bg-primary-foreground/15 backdrop-blur), centered "Name N of 99" pill (with Hash icon), and large Arabic via font-arabic-display text-5xl/6xl.
    - Body section: DialogHeader centered with transliteration (DialogTitle) + italic english (DialogDescription), StarDivider, "Meaning" label (emerald) + full meaning paragraph, gold-tinted virtue note box (Sparkles icon, references the Prophet's ﷺ hadith on enumerating the 99 names), and footer with outline favorite toggle button (gold-tinted when favorited) + emerald Close button.
  - Also wired NamesView into src/app/page.tsx ViewRouter (imported NamesView, added `case "names": return <NamesView />;` so the home-view button actually navigates here).
- Lint iteration: first pass — bunx eslint on the new file → 0 errors / 0 warnings. First pass on src/app/page.tsx → 0 errors. `bun run lint` over the entire project → exit 0, clean. `bunx tsc --noEmit` → no errors in new files. Dev server log shows clean compiles after the changes.

Stage Summary:
- One component delivered: src/components/islamic/names-view.tsx (NamesView) + 2-line wiring addition to src/app/page.tsx (ViewRouter case "names" + import).
- Single-screen experience for the 99 Names of Allah: hero header (hero-gradient + StarLattice + slowly-rotating StarMark + large font-arabic-display Arabic title + StarDivider), gold-tinted virtue quote card (namesVirtue), rounded-full search filter (number/transliteration/english/arabic), responsive 2/3/4/5-col grid of staggered NameCards with circular emerald number badge + favorite heart Tooltip + tap-to-view-meaning hint + card-refined hover, and a controlled shadcn Dialog detail view (custom-close emerald gradient banner with font-arabic-display Arabic, transliteration + English titles, full meaning, gold virtue note, and footer favorite toggle + Close button).
- Component is "use client", uses the existing Zustand store favorites/toggleFavorite (ids `name-1` … `name-99`), and aligns with the established emerald/gold + StarMark design language. Mobile-first responsive, accessible (role/tabindex/onKeyDown on card, aria-labels, Tooltip, Dialog focus management).
- ESLint and TypeScript clean; no test files written; no new routes created; no external libraries added.

---
Task ID: F3-HADITH40
Agent: view-40-hadith
Task: Build 40 Hadith Nawawi view

Work Log:
- Read worklog.md, types.ts (ViewId includes "hadith40"), store.ts (favorites/toggleFavorite), data/forty-hadith.ts (42 NawawiHadith items), star-mark.tsx (StarMark/StarDivider/StarLattice), hadith-view.tsx + names-view.tsx (design references), globals.css (tokens/utilities), and the F1-NAMES agent record under /agent-ctx.
- Created src/components/islamic/hadith40-view.tsx exporting Hadith40View ("use client").
- Hero header: motion.header with hero-gradient bg, StarLattice overlay (opacity 0.06), decorative slowly-rotating StarMark in top-right corner (opacity 0.08 via animate-slow-spin), centered ScrollText emerald tile, large Arabic title "الأربعون النووية" via font-arabic-display in emerald, StarDivider, English subtitle "The Forty Hadith of Imam An-Nawawi", brief an-Nawawi description, and a gold "Demo content" Badge with Sparkles.
- Search input: rounded-full Input (h-11) with leading Search icon. useMemo filter matches exact number, or substring on title/english/narrator (lowercased) or arabic (raw RTL substring).
- Sticky-ish filter/sort bar: sticky top-0 z-20, bg-background/85 backdrop-blur, shows live count "N Hadiths of 42" with Library icon, and a favorites toggle button (heart icon; gold-tinted when active). When favoritesOnly is on, the list filters to hadiths whose "nawawi-N" id is in the persisted favorites array.
- Empty-state Card (dashed border) with Search icon and helpful copy for no-match (different message for favorites-only vs regular search).
- List of NawawiCard (max-w-3xl mx-auto, vertical stack, gap-4). Staggered framer-motion fade-in-up entrance (parent variants staggerChildren 0.06, child y:16->0 over 0.4s).
- NawawiCard: card-refined Card with hover:border-emerald/30; top row has emerald circular number badge (h-12 w-12, gradient from-emerald to-emerald/70) + title (font-semibold text-lg truncate) + "Hadith N of 42" muted subtitle + favorite Heart button (absolute top-right, fill-gold text-gold when favorited, calls toggleFavorite("nawawi-N")).
- Grade badge color-coded via gradeStyles map: "Sahih (Agreed Upon)" -> emerald + Check icon; "Sahih" -> emerald + Sparkles icon; "Hasan Sahih" & "Hasan" -> gold + Sparkles icon. Falls back to Sahih style.
- Arabic block: bg-emerald-soft/30 rounded-xl p-4 with font-arabic text-xl sm:text-2xl leading-loose right-aligned.
- Small StarDivider (my-3) between Arabic and English.
- English translation text-base leading-relaxed text-foreground.
- Narrator line: inline-flex with User icon (emerald/70), "Narrated by:" font-medium foreground/80 + italic narrator, text-sm text-muted-foreground.
- Reference line: border-t border-border/40 pt-3, BookOpen icon + reference text in text-xs text-gold.
- Edited src/app/page.tsx: added import { Hadith40View } and `case "hadith40": return <Hadith40View />;` branch in the ViewRouter switch.

Stage Summary:
- Two-file change: created src/components/islamic/hadith40-view.tsx (Hadith40View) + 2-line wiring addition to src/app/page.tsx (import + case "hadith40").
- Single-screen experience for Imam An-Nawawi's 42 Hadith collection: hero header (hero-gradient + StarLattice + slowly-rotating StarMark + font-arabic-display "الأربعون النووية" + StarDivider + gold Demo content badge), rounded-full search filter (number/title/english/narrator/arabic), sticky filter bar with live count + favorites-only heart toggle, and a max-w-3xl vertical stack of staggered NawawiCards.
- Each card: emerald circular number badge (h-12 w-12), truncated title, favorite Heart button (keyed "nawawi-N"), color-coded grade badge (Sahih/Agreed-Upon emerald with Check, Sahih emerald, Hasan Sahih / Hasan gold), Arabic block in bg-emerald-soft/30 with font-arabic, StarDivider, English translation, narrator line with User icon, reference line with BookOpen icon in gold, card-refined hover.
- Component is "use client", uses existing Zustand store favorites/toggleFavorite (ids `nawawi-1` ... `nawawi-42`), aligns with established emerald/gold + StarMark design language. Mobile-first responsive, accessible (aria-labels / aria-pressed on favorite + favorites toggle, sticky bar backdrop blur, semantic structure).
- ESLint clean (exit 0); dev.log shows clean compiles; no test files written; no new routes created beyond the existing single-page switch; no external libraries added.

---
Task ID: CRON-1
Agent: cron-review-agent
Task: QA testing + bug fixes + styling polish + 4 new feature views (99 Names, 40 Hadith, Favorites, Hijri Calendar)

## Current project status description/assessment
The Islam24x7 platform was previously complete with 11 views (Home, Library, Reader, Quran, Hadith, Duas, Prayer, Search, AI Assistant, Tasbeeh, Download), all functional and lint-clean. A cron-triggered review was performed: thorough agent-browser QA across all views plus VLM-based visual analysis of the Home and Search views in both light/dark modes. The platform was stable (no runtime errors, lint clean) but had visual polish gaps and untapped feature potential.

## Current goals/completed modifications/verification results

### Bug found & fixed
- **BUG**: The `.ornamental-border` div (3px decorative top strip in header) was intercepting pointer events, covering the row of nav buttons just below it. agent-browser reported "Element is covered by <div.ornamental-border>". **Fix**: Added `pointer-events: none` to the `.ornamental-border` CSS rule in globals.css. Verified the nav buttons are now clickable.

### Styling polish improvements (per VLM feedback)
- **Arabic typography**: Improved `font-arabic` line-height from 2.1 → 2.4 with letter/word-spacing tuning for better readability of Quranic/Hadith text. Added new `font-arabic-display` class (line-height 2.2, bold) for large display Arabic in heroes.
- **Card depth**: Added `.card-refined` utility with layered emerald-tinted box-shadows and smooth hover transitions (subtle lift + shadow on hover) — addresses VLM feedback that cards "blend too much into the background".
- **Gold gradient text**: Added `.text-gradient-gold` and `.text-gradient-emerald` utilities (background-clip: text) for emphasis on key headings.
- **Animated hero**: Added `.hero-gradient` (multi-stop emerald/gold/background with 12s shimmer animation), `.animate-slow-spin` / `.animate-slow-spin-reverse` (60s/90s rotating stars), `.animate-float-soft` (4s float).
- **Home hero upgrade**: Replaced static gradient with animated `hero-gradient`, added two decorative slowly-rotating StarMark elements in the corners (opacity 0.06-0.08), floating animation on the main star, emerald gradient on "Islam24x7" wordmark, added a "99 Names of Allah" ghost button, and changed the greeting to emerald color.

### New features added (4 new views → 15 total views)
1. **99 Names of Allah (Asma ul Husna)** — `names-view.tsx` + `names.ts` data (all 99 names with Arabic, transliteration, English, meaning). Hero with Arabic title, virtue quote card, search, responsive 2-5 col grid of name cards with favorite hearts, and a detail Dialog showing full meaning. Favorited via `toggleFavorite("name-N")`.
2. **40 Hadith Nawawi** — `hadith40-view.tsx` + `forty-hadith.ts` data (42 foundational hadiths). Hero with Arabic title, search, favorites-only filter toggle, color-coded grade badges (Sahih/Hasan), Arabic block + StarDivider + English + narrator + reference. Favorited via `toggleFavorite("nawawi-N")`.
3. **Favorites/Collections** — `favorites-view.tsx`. Aggregates ALL favorited items across every view (ayahs, hadith, 40-hadith, books, duas, 99-names) by resolving each favorite ID prefix. Filter tabs per type with counts, empty states, remove buttons, and "Open" actions that jump to the source view.
4. **Hijri Calendar** — `calendar-view.tsx`. Today card (Hijri + Gregorian), month grid with prev/next navigation, day cells highlighted for major events (gold) and recommended days (emerald), today highlighted, sidebar with this month's events + upcoming events list. Uses `Intl.DateTimeFormat` with `calendar: 'islamic'` for accurate Hijri dates, and a custom `hijriToGregorian` mapper for the calendar grid.

### Navigation enhancements
- Added `"names"`, `"favorites"`, `"calendar"`, `"hadith40"` to `ViewId` union type.
- Updated `ViewRouter` in `page.tsx` to handle all 15 views.
- Added a **"More" dropdown** in the desktop header nav (using shadcn DropdownMenu) containing the 6 discover views with icons + descriptions.
- Added the new views to the mobile Sheet menu under a "Discover" section.
- Expanded the Home quick-access grid from 6 → 11 tiles (added 99 Names, 40 Hadith, Hijri Calendar, Favorites).
- Updated the footer: Tools column now lists Prayer Times, Tasbeeh Counter, Hijri Calendar, Favorites; added a "Discover" pill row (99 Names, 40 Hadith, AI Assistant, Search, Download).

### Verification results
- **Lint**: `bun run lint` → 0 errors, 0 warnings (clean).
- **agent-browser QA**: All 15 views render correctly, no console errors. Tested: Home hero with new gradient + floating star, 99 Names view (hero + grid + detail dialog), 40 Hadith view (list + grade badges), Favorites view (shows 2 favorited names with correct filter counts + disabled empty tabs), Hijri Calendar (month grid + today highlight + events sidebar), More dropdown (all 6 items), theme toggle, mobile bottom nav.
- **VLM assessment**: 99 Names view rated 8/10 polish ("exceptionally clear Arabic typography, precise grid alignment"). Improved Home hero rated 8/10 ("significantly more impactful... serene spiritual atmosphere"). The "1 Issue" badge the VLM noted is the Next.js dev-tools indicator (browser-only dev artifact, not part of the production app).

## Unresolved issues or risks, and priority recommendations for the next phase
- **Calendar accuracy**: The Hijri calendar grid uses an approximate day-count heuristic (alternating 29/30) and a `hijriToGregorian` mapper that estimates the Gregorian date of each Hijri day by month-offset arithmetic. For production, integrate a proper Umm al-Qura API or a tabulated Hijri→Gregorian conversion library so the weekday alignment is exact. Today's date (via Intl) is always accurate.
- **Prayer/Qibla computation**: The prayer times use a simplified solar-position algorithm — adequate for demo but should be replaced with a certified library (e.g. adhan-js) for accurate local times.
- **Favorites IDs**: The Favorites view resolves favorite IDs by string-prefix matching (`ayah-`, `hadith-`, `nawawi-`, `name-`, `dua-`, else raw book id). If future features add new favorite ID schemes, they must be added to the resolver in `favorites-view.tsx`.
- **Performance**: 99 Names renders 99 cards + 42 hadith cards on one page. Currently fine, but for very large content sets consider virtualization (e.g. `@tanstack/react-virtual`).
- **Recommended next priorities**: (1) Integrate a real Hijri calendar API for exact dates. (2) Add a "Quran audio player" feature (per-surah recitation) — high user value. (3) Add reading-goal / streak tracking in the Reader. (4) Improve the AI Assistant to support follow-up questions with citation chips that jump to the cited surah/hadith. (5) Add PWA service worker for offline reading.

---
Task ID: CRON-2
Agent: cron-review-agent
Task: QA testing + 3 new features (Quran Audio Player, Reading Streak & Stats, AI Citations) + styling polish

## Current project status description/assessment
The Islam24x7 platform had 15 views (Home, Library, Reader, Quran, Hadith, Hadith40, Duas, Prayer, Search, AI, Tasbeeh, Names, Favorites, Calendar, Download), all functional and lint-clean. This cron round focused on the highest-value next-phase features recommended in the previous worklog: (1) Quran audio recitation, (2) reading streak/stats tracking, (3) AI assistant with clickable citations and follow-up questions. QA confirmed the platform was stable with no runtime errors before starting.

## Current goals/completed modifications/verification results

### 1. Quran Audio Player (new feature)
- **Store**: Added audio player session state to `store.ts` — `audioSurahId`, `audioReciter` (default "ar.alafasy"), `audioIsPlaying`, `audioCurrentTime`, `audioDuration`, plus setters `setAudioSurah`, `setAudioReciter`, `setAudioPlaying`, `setAudioTime`. Not persisted (session-only).
- **Component**: Created `src/components/islamic/audio-player.tsx` — a fixed-bottom floating player bar (`AudioPlayer` → keyed `PlayerBar` inner component that remounts on surah change, cleanly resetting `currentAyah` to 1 via lazy initializer). Uses the everyayah.com CDN (`https://everyayah.com/data/{reciter}/{:03d}{:03d}.mp3`) for per-ayah MP3s. Features: play/pause, previous/next ayah (auto-advances on ayah end), seek slider, time display, mute toggle, reciter selector (6 reciters: Alafasy, Abdul Basit Murattal, Husary, Minshawi, Sudais, Shatri), loading spinner, close button. Spring-animated entrance/exit via framer-motion. Positioned above the mobile bottom nav (`bottom-16` on mobile, `bottom-4` on desktop).
- **Integration**: Added play buttons to (a) each `SurahCard` in the Quran list (hover-reveal emerald circle, turns gold when playing), (b) the `SurahReading` header card (a "Listen to recitation" / "Stop recitation" pill button), and (c) each `AyahRow` (a "Recite"/"Playing" pill). All use `setAudioSurah(id)` to open the player.
- **Wiring**: Added `<AudioPlayer />` to `page.tsx` after `<BottomNav />`.
- **Lint refactor**: Had to refactor the audio player 3 times to satisfy the `react-hooks/set-state-in-effect` and `react-hooks/refs` rules — final solution uses a keyed inner component for surah-change resets and event-handler-driven `loading` state (no setState in effect bodies).

### 2. Reading Streak & Stats Tracking (new feature)
- **Store**: Added `readingStats: Record<string, ReadingStat>` (keyed by YYYY-MM-DD, each with `chaptersRead`, `ayahsRead`, `minutesRead`), `lastReadDate`, `recordReading({chapters, ayahs, minutes})` action, `getStreak()` (counts consecutive days backward from today, tolerating an empty today), `getTotalStats()` (aggregates all-time totals). All persisted via the existing Zustand persist middleware.
- **Tracking**: Wired `recordReading` into (a) the Reader view's chapter-change effect (records 1 chapter + estimated minutes from page count), and (b) the Quran `SurahReading` mount effect (records ayahCount ayahs + estimated minutes).
- **Widget**: Created `src/components/islamic/reading-stats-widget.tsx` (`ReadingStatsWidget`) — added to the Home view. Shows: a large streak flame (gold gradient when streak > 0, muted when 0) with day count, 3 stat chips (chapters/ayahs/reading-minutes), a 7-day animated bar chart (emerald for past days, gold for today, animated height on mount), active-days count, and a contextual CTA ("Browse Library" when no reading yet, "Read Quran" when active). VLM rated it 8/10.

### 3. AI Assistant Citations + Follow-ups (new feature)
- **Backend**: Updated `src/app/api/ai/route.ts` — enhanced the system prompt to require a structured output format with `[[CITATIONS]]` (Type | Reference per line) and `[[FOLLOWUPS]]` (3 follow-up questions) sections. Added a `parseResponse()` function that extracts citations (typed: Quran/Hadith/Scholar/Book/Other) and follow-ups, strips the sections from the displayed answer, and returns `{ answer, citations, followups }` in the API response.
- **Frontend**: Updated `src/components/islamic/ai-view.tsx` — extended the `Message` interface with optional `citations` and `followups`. After each assistant answer, renders a "Sources" section with clickable citation chips (emerald for Quran, gold for Hadith, neutral for others) and an "Ask follow-up" section with clickable question chips that call `sendQuestion(f)`. Added `handleCitationClick()` that navigates to the relevant view: Quran citations open the matching surah (matched by name), Hadith citations open the matching collection, Scholar/Book citations go to the Library.
- **Verified live**: Asked "What are the five pillars of Islam?" — received answer + 6 citation chips (Surah Al-Ma'idah 5:1, Sahih al-Bukhari #8, Sahih Muslim #16, Sahih al-Bukhari #45, Sahih al-Bukhari #1866, Imam an-Nawawi Forty Hadith) + 3 follow-up question chips. Clicking the "Sahih al-Bukhari #8" chip navigated to the Hadith view and opened the Bukhari collection.

### 4. Styling polish — enhanced Quran ayah view
- Upgraded the `AyahRow` component: replaced the plain circular number badge with an **octagonal star medallion** (two rotated SVG rects — gold + emerald, matching the brand StarMark), added a **verse-end ornament** (small gold-bordered circle with the ayah number after the Arabic text, mimicking traditional mushaf formatting), added a per-ayah **"Recite"/"Playing" pill button** that toggles the audio player, and applied the `card-refined` class for hover depth. VLM rated the enhanced ayah view **9/10** ("elegant dark theme, thoughtful contrast, professional layout hierarchy, polished UI elements... no significant issues").

### Verification results
- **Lint**: `bun run lint` → 0 errors, 0 warnings (clean) throughout all changes.
- **agent-browser QA**: All features tested working — Home reading-stats widget (empty + active states), Quran audio player (play button on surah cards, surah header, and per-ayah; player bar with all controls; reciter selector), AI assistant (real LLM response with parsed citations + follow-ups; citation chip click navigates correctly), enhanced ayah view (octagonal medallions + recite pills render). No console errors after fresh reload.
- **VLM assessments**: Reading stats widget 8/10, enhanced ayah view 9/10.
- **Dev log**: Clean compiles, `POST /api/ai 200` responses, no runtime errors.

## Unresolved issues or risks, and priority recommendations for the next phase
- **Audio CDN dependency**: The audio player relies on everyayah.com being reachable. If the CDN is down or blocked, audio won't play (graceful: the play promise rejects and the player shows paused state). Consider bundling fallback audio or proxying.
- **Streak edge cases**: The `getStreak()` implementation tolerates an empty "today" (counts from yesterday), but doesn't handle timezone-adjacent date-line edge cases. Adequate for typical use.
- **AI citation parsing**: The parser relies on the LLM following the `[[CITATIONS]]` / `[[FOLLOWUPS]]` format exactly. If the LLM deviates, citations may be missing — the UI degrades gracefully (no Sources section shown). Could add a fallback regex to extract "Surah X N:M" and "Sahih X #N" patterns from the raw answer.
- **Citation matching**: `handleCitationClick` matches surahs/collections by name substring. Works for the 8 surahs + 4 collections in our demo data, but won't match surahs not in our dataset (e.g., "Surah Al-Ma'idah" isn't in our 8-surah demo set, so that chip just navigates to the Quran list view). Adding the full 114 surahs would make citation navigation precise.
- **Recommended next priorities**: (1) Expand the Quran dataset to all 114 surahs (or at least the last 30 short surahs) so audio + citation navigation is complete. (2) Add a "Qibla finder" with device-orientation compass (already in Prayer view, could be enhanced). (3) Add bookmark/note-taking in the Reader. (4) Add a "daily goal" setting (e.g., read N ayahs/day) with progress in the stats widget. (5) PWA service worker for offline reading + cached audio.
