# Islam247 — Read. Search. Learn. Explore.

A modern, fast, and respectful Islamic knowledge platform built with **Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Zustand, and Prisma**.

Read the **Quran** with Arabic + translation + transliteration, explore **Hadith collections** and the **40 Hadith of Imam an-Nawawi**, browse a structured **Islamic library** with a focused reader, make **dua / masnoon duas / awrad**, track **prayer**, use a digital **tasbeeh**, learn the **99 Names of Allah** and **Prophet's names**, browse **fatawa**, and ask a **source-grounded AI research assistant** with citations and follow-ups.

> **Disclaimer:** Islam247 is a learning aid, not a substitute for qualified scholarly guidance. For personal religious rulings (fatwa), please consult a qualified local scholar.

---

## Table of Contents

- [Highlights](#highlights)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Data Layer](#data-layer)
- [State Management](#state-management)
- [API Routes](#api-routes)
- [Reader, Audio & Personalization](#reader-audio--personalization)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Highlights

- **Single-page app shell** with 22 views routed client-side via Zustand (`src/lib/store.ts`, `src/lib/types.ts` → `ViewId`).
- **Quran-first UX:** surah browser, ayah-level Arabic / translation / transliteration, juz data, tafseer data hooks, audio recitation player.
- **Hadith-first UX:** multi-collection browser with Arabic + English, narrator, grade (`Sahih` / `Hasan` / `Daif`), plus dedicated 40-Hadith view.
- **Library + Reader:** categorized books (Fiqh, Tafsir, Aqeedah, Seerah, History), chapter reader with progress, bookmarks + notes, history, favorites.
- **Daily worship tools:** prayer view, tasbeeh counter with targets, dua counters, awrad, masnoon duas, calendar view, reading streaks & stats.
- **AI assistant** (`POST /api/ai`) grounded in Quran / Sunnah / mainstream scholarship, returning structured `{ response, citations[], followups[] }`.
- **Search everywhere:** global search view + voice search button (Web Speech API where supported) + recent searches.
- **Offline-friendly mindset:** download view, persisted Zustand store (`islam24x7-store` in localStorage), standalone Next.js output.
- **Polished UI:** shadcn/ui + Radix, `next-themes` (light/dark/system), Amiri Arabic font + Geist, responsive header / footer / mobile bottom nav, sonner + toast notifications, Framer Motion micro-interactions.

---

## Features

### Home (`home-view.tsx`)
Curated entry point with quick navigation to Quran, Hadith, Library, Duas, Prayer, Tasbeeh, Names, AI, plus reading-stats widget and streak display.

### Library & Reader (`library-view.tsx`, `reader-view.tsx`)
- Filter by category: Fiqh, Tafsir, Aqeedah, Seerah, History.
- Book detail → chapter list → immersive reader.
- Adjustable font size, line spacing, serif/sans, light / sepia / dark reader themes.
- Reading progress persisted per book (`readingProgress`).
- Paragraph-level bookmarks with color (emerald / gold / rose) + personal notes.
- Daily ayah-equivalent goal, minutes/chapters/ayahs tracking.

### Quran (`quran-view.tsx`, `audio-player.tsx`)
- Full surah metadata: Arabic name, English name, revelation type (Meccan/Medinan), ayah count.
- Ayah view: Arabic, translation, transliteration.
- Juz index (`src/lib/data/juz.ts`) and tafseer dataset (`src/lib/data/tafseer.ts`).
- Audio player with reciter selection (default `ar.alafasy`), play/pause, seek, surah queue — session state in Zustand, global `<AudioPlayer />` bar.

### Hadith (`hadith-view.tsx`, `hadith40-view.tsx`)
- Collections with `bookCount`, `hadithCount`, per-hadith Arabic + English, narrator, grade, book/chapter context.
- Dedicated 40-Hadith of Imam an-Nawawi dataset (`forty-hadith.ts`) with focused study UI.

### Duas, Masnoon & Awrad (`duas-view.tsx`, `masnoon-view.tsx`, `awrad-view.tsx`)
- Categorized duas with Arabic, transliteration, translation, reference, recommended count, virtue.
- Per-dua counters (`duaCounts`), reset, tasbeeh-style repeat tracking.
- Daily awrad collections for morning/evening remembrance.

### Prayer, Calendar & Tasbeeh (`prayer-view.tsx`, `calendar-view.tsx`, `tasbeeh-view.tsx`)
- Prayer times list with Arabic names and icons.
- Hijri/Gregorian calendar helpers.
- Digital tasbeeh: count, total lifetime count, configurable target (e.g. 33/100), dhikr switcher (`SubhanAllah`, etc.), persisted.

### Names (`names-view.tsx`, `prophet-names-view.tsx`)
- 99 Names of Allah with Arabic, transliteration, meaning.
- Prophet Muhammad ﷺ names dataset with meanings.

### Fatawa (`fatawa-view.tsx`)
- Browsable Q&A collection (`src/lib/data/fatawa.ts`) for common rulings with sources. Encourages scholar consultation for personal cases.

### AI Research Assistant (`ai-view.tsx`, `src/app/api/ai/route.ts`)
- Chat UI with scoped prompts (e.g. Quran / Hadith / Fiqh scope).
- System prompt enforces: authentic sources, surah:verse and collection-number citations, fair presentation of valid differences, no fabricated references, same-language replies.
- Response parser extracts `[[CITATIONS]]` (`Quran | …`, `Hadith | …`, `Scholar | …`, `Book | …`, `Other | …`) and `[[FOLLOWUPS]]` (3 questions).
- Backed by `z-ai-web-dev-sdk`, Node.js runtime, 60s max duration.

### Search, History, Bookmarks, Favorites
- `search-view.tsx`: cross-dataset search (Quran, Hadith, books, duas, names, fatawa).
- `voice-search-button.tsx`: speech-to-text where supported, graceful fallback.
- `history-view.tsx`: reading history; `bookmarks-view.tsx`: notes manager; `favorites-view.tsx`: `toggleFavorite(id)` list.
- `reading-stats-widget.tsx`: streak, totals (days / chapters / ayahs / minutes).

### Settings & Download (`settings-view.tsx`, `download-view.tsx`)
- Reader defaults, daily goal, tasbeeh target, theme, data reset.
- Download view for offline/export guidance (see also `download/README.md`).

### Shell (`header.tsx`, `footer.tsx`, `bottom-nav.tsx`)
- Sticky header with global search + view switcher, footer with about/links, mobile bottom nav for Home / Quran / Hadith / Library / More.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (`output: standalone`), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, `tailwind-merge`, `tailwindcss-animate`, `tw-animate-css` |
| UI | shadcn/ui + Radix UI, lucide-react, vaul, embla-carousel, cmdk |
| State | Zustand 5 + `persist` (localStorage key `islam24x7-store`) |
| Data fetching | TanStack Query 5, TanStack Table 8 |
| Forms | React Hook Form + Zod + `@hookform/resolvers` |
| Theming | `next-themes` (light / dark / system) |
| Fonts | Geist, Geist Mono, Amiri (Arabic) via `next/font/google` |
| Charts / DnD / Editor | Recharts, dnd-kit, MDXEditor, react-markdown, react-syntax-highlighter |
| Dates / Utils | date-fns, clsx, uuid, reactuses |
| i18n / Auth (ready) | next-intl, next-auth |
| ORM / DB | Prisma 6 + SQLite (`User`, `Post` models — app content itself is local TS datasets) |
| AI | `z-ai-web-dev-sdk` chat completions |
| Runtime / Tooling | Bun, ESLint 9 + `eslint-config-next`, PostCSS |
| Reverse proxy (prod) | Caddy (`Caddyfile`: `:81 → localhost:3000`) |

---

## Project Structure

```
Islam247/
├── src/
│   ├── app/
│   │   ├── page.tsx            # ViewRouter: 22 views (home, quran, hadith, ...)
│   │   ├── layout.tsx          # Metadata, Geist+Amiri fonts, Toaster/Sonner, viewport
│   │   ├── globals.css
│   │   └── api/
│   │       ├── route.ts        # Health: GET → { message: "Hello, world!" }
│   │       └── ai/route.ts     # POST { messages[], scope? } → { response, citations, followups }
│   ├── components/
│   │   ├── islamic/            # Feature views: home, quran, hadith, hadith40, duas,
│   │   │                       # masnoon, awrad, prayer, tasbeeh, names, prophet-names,
│   │   │                       # fatawa, library, reader, search, ai, calendar,
│   │   │                       # bookmarks, history, favorites, download, settings,
│   │   │                       # header, footer, bottom-nav, audio-player, ...
│   │   └── ui/                 # shadcn/ui primitives (50+ components)
│   ├── hooks/                  # use-mobile, use-toast
│   └── lib/
│       ├── store.ts            # Zustand AppState + persist partialize
│       ├── types.ts            # ViewId, Book, Surah/Ayah, Hadith, Dua, Bookmark, ...
│       ├── utils.ts
│       ├── db.ts               # Prisma client helper
│       └── data/               # Local datasets (no external API required)
│           ├── quran.ts  juz.ts  tafseer.ts
│           ├── hadith.ts  forty-hadith.ts
│           ├── books.ts  duas.ts  masnoon-duas.ts  awrad.ts
│           ├── names.ts  prophet-names.ts
│           ├── fatawa.ts  prayer.ts
├── prisma/
│   └── schema.prisma           # sqlite, User + Post
├── public/                     # logo.svg, robots.txt, static assets
├── tests/  examples/  mini-services/  download/  agent-ctx/
├── .zscripts/                  # dev/build/start helpers
├── Caddyfile                   # :81 reverse_proxy → localhost:3000
├── components.json             # shadcn config
├── tailwind.config.ts  postcss.config.mjs  eslint.config.mjs  tsconfig.json
├── next.config.ts              # standalone + typescript.ignoreBuildErrors + strictMode:false
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js 20+** or **Bun 1.3+**
- Git

### 1. Clone

```bash
git clone https://github.com/AshfaqAIML/Islam247.git
cd Islam247
```

### 2. Install

```bash
# Bun (recommended - repo includes bun.lock)
bun install

# or npm
npm install
```

### 3. Configure environment

Create a `.env` file (see [Environment Variables](#environment-variables)):

```bash
DATABASE_URL="file:./dev.db"
# AI SDK key as required by z-ai-web-dev-sdk (see its docs)
# Z_AI_API_KEY="..."
```

### 4. Database (Prisma + SQLite)

```bash
bunx prisma generate
bunx prisma db push
# or: npm run db:generate && npm run db:push
```

### 5. Run dev server

```bash
bun run dev
# or: npm run dev
```

Open http://localhost:3000

### 6. Build & start (production)

```bash
bun run build
bun run start
# build copies .next/static + public into .next/standalone (see package.json)
```

Helper scripts also exist under `.zscripts/` (`dev.sh`, `build.sh`, `start.sh`, `mini-services-*`, `*-runtime-build.sh`).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Prisma SQLite URL, e.g. `file:./dev.db`. Used by `prisma/schema.prisma` and `src/lib/db.ts`. |
| AI SDK credentials | For `/api/ai` | Credentials required by `z-ai-web-dev-sdk` (`ZAI.create()`). Do **not** commit keys — set via hosting env. See SDK docs for exact var name. |

> `.env*` is git-ignored. Never commit secrets. `db/*.db`, `*.log`, `.next/`, `.vercel/` are also ignored / local-only.

---

## Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev -p 3000` | Local development |
| `build` | `next build && cp ... standalone` | Production build (standalone) |
| `start` | `bun .next/standalone/server.js` | Serve production build |
| `lint` | `eslint .` | Lint |
| `db:push` | `prisma db push` | Sync Prisma schema to SQLite |
| `db:generate` | `prisma generate` | Generate Prisma client |
| `db:migrate` | `prisma migrate dev` | Dev migration |
| `db:reset` | `prisma migrate reset` | Reset DB |

---

## Data Layer

All core Islamic content ships as **typed local datasets** — no external API key needed for reading:

- `quran.ts` — surahs + ayahs (`arabic`, `translation`, `transliteration`)
- `juz.ts` — Juz index
- `tafseer.ts` — commentary excerpts
- `hadith.ts` — collections + graded hadiths
- `forty-hadith.ts` — Nawawi 40
- `books.ts` — library books/chapters (`Fiqh | Tafsir | Aqeedah | Seerah | History`)
- `duas.ts`, `masnoon-duas.ts`, `awrad.ts` — supplications with references/counts/virtues
- `names.ts`, `prophet-names.ts` — names + meanings
- `fatawa.ts` — Q&A
- `prayer.ts` — prayer metadata

Types live in `src/lib/types.ts` (`Surah`, `Ayah`, `HadithCollection`, `Hadith`, `DuaCategory`, `Dua`, `Book`, `Bookmark`, `ReadingProgress`, …).

---

## State Management

`src/lib/store.ts` — single Zustand store, partially persisted as `islam24x7-store`:

- **Navigation:** `view`, `setView`, `selectBook/Surah/HadithCollection/DuaCategory`
- **Reading:** `readingProgress`, `readingStats[YYYY-MM-DD]`, `lastReadDate`, `recordReading()`, `getStreak()`, `getTotalStats()`, `dailyGoalAyahs`
- **Worship:** `tasbeehCount/Total/Target`, `currentDhikr`, `duaCounts`
- **Personal:** `favorites[]`, `bookmarks[]` (+ notes, colors), `recentSearches[10]`
- **Reader:** `readerFontSize`, `readerTheme (light|sepia|dark)`, `readerLineSpacing`, `readerFontFamily`
- **Audio (session-only):** `audioSurahId`, `audioReciter`, `audioIsPlaying`, `audioCurrentTime/Duration`
- **Search:** `searchQuery`

Streak logic tolerates an empty *today* if *yesterday* was read.

---

## API Routes

| Method & Path | Input | Output |
|---|---|---|
| `GET /api` | — | `{ message: "Hello, world!" }` health check |
| `POST /api/ai` | `{ messages: [{role, content}][], scope?: string }` | `{ success, response, citations[{type, reference}], followups[3], usage }` |

AI behavior: respectful tone, Quran `Surah Name v:a` + Hadith `Collection #n` citations, fair multi-madhhab presentation, no invented references, same-language reply, explicit scholar-referral for personal fatwa, `runtime=nodejs`, `maxDuration=60`.

---

## Reader, Audio & Personalization

- **Reader:** font size / spacing / serif-vs-sans / light-sepia-dark, scroll-percent progress, chapter navigation.
- **Audio:** global bottom player, reciter switch, seek bar — driven by `audio*` store fields.
- **Personalization:** favorites star (`star-mark.tsx`), share (`share-button.tsx` via Web Share API + clipboard fallback), toasts/sonner feedback, persisted settings.
- **Accessibility & mobile:** responsive layout, bottom nav on small screens, semantic Radix primitives, Amiri font for Arabic legibility, `themeColor` meta for light/dark.

---

## Deployment

Next.js `output: standalone` is enabled for minimal Docker/VM deploys.

**Included `Caddyfile`** reverse-proxies `:81 → localhost:3000` (with `XTransformPort` passthrough support). Typical flow:

1. `bun run build` → `.next/standalone/`
2. Run `bun .next/standalone/server.js` (or `bun run start`) on port 3000
3. Caddy handles TLS + proxy on `:81` (adjust to `:80`/`:443` + your domain in production)

Set `DATABASE_URL` and AI credentials in your host's env. Run `prisma db push` / migrations against the prod DB file or volume.

---

## Roadmap

- [ ] Full Quran audio (every ayah, multiple reciters, offline cache)
- [ ] Prayer-time calculation by geolocation + notifications
- [ ] Hijri calendar widget + Ramadan / Hajj guides
- [ ] Export bookmarks/notes (PDF/Markdown), sync across devices
- [ ] More books, languages (Arabic/Urdu UI via next-intl), and tafseer depth
- [ ] AI conversation history + per-scope memory
- [ ] PWA + service-worker offline packs
- [ ] Tests + CI (see `tests/`)

---

## Contributing

Contributions are welcome — especially dataset corrections **with authentic references**.

1. Fork + `git checkout -b feat/my-change`
2. `bun install && bun run dev`
3. Make focused changes with clear commit messages
4. `bun run lint` and verify `bun run build` passes
5. Open a PR describing the change + sources

For content fixes (ayah text, hadith grading, dua references), please cite the source (mushaf edition, collection + number, scholar/book).

---

## License

No license file is currently included. All rights reserved by default — if you intend this to be open source, add a `LICENSE` (e.g. MIT) and state it here.

---

## Acknowledgements

- The Quran, the Sunnah, and the scholars of Ahl al-Sunnah wal-Jama'ah — the foundation of all content.
- shadcn/ui, Radix UI, Tailwind Labs, Vercel/Next.js, Prisma, Zustand, and the open-source community.
- Amiri font (Arabic typography), Geist family, Lucide icons.

*Built with sincerity — may it benefit its readers. 🤲*
