import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ViewId, ReadingProgress } from "./types";

interface ReadingStat {
  date: string; // YYYY-MM-DD
  chaptersRead: number;
  ayahsRead: number;
  minutesRead: number;
}

interface AppState {
  // Navigation
  view: ViewId;
  setView: (view: ViewId) => void;

  // Selected resources
  selectedBookId: string | null;
  selectedSurahId: number | null;
  selectedHadithCollectionId: string | null;
  selectedDuaCategoryId: string | null;
  selectBook: (id: string) => void;
  selectSurah: (id: number) => void;
  selectHadithCollection: (id: string) => void;
  selectDuaCategory: (id: string) => void;

  // Reading progress (persisted)
  readingProgress: Record<string, ReadingProgress>;
  updateReadingProgress: (p: ReadingProgress) => void;

  // Reading stats & streak (persisted)
  readingStats: Record<string, ReadingStat>; // keyed by date
  lastReadDate: string | null;
  recordReading: (opts: { chapters?: number; ayahs?: number; minutes?: number }) => void;
  getStreak: () => number;
  getTotalStats: () => { days: number; chapters: number; ayahs: number; minutes: number };

  // Tasbeeh (persisted)
  tasbeehCount: number;
  tasbeehTotal: number;
  tasbeehTarget: number;
  currentDhikr: string;
  incrementTasbeeh: () => void;
  resetTasbeeh: () => void;
  setTasbeehTarget: (n: number) => void;
  setDhikr: (d: string) => void;

  // Dua counters (persisted)
  duaCounts: Record<string, number>;
  incrementDua: (id: string) => void;
  resetDua: (id: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;

  // Reader settings
  readerFontSize: number;
  readerTheme: "light" | "sepia" | "dark";
  setReaderFontSize: (n: number) => void;
  setReaderTheme: (t: "light" | "sepia" | "dark") => void;

  // Quran audio player (session state — not persisted)
  audioSurahId: number | null;
  audioReciter: string;
  audioIsPlaying: boolean;
  audioCurrentTime: number;
  audioDuration: number;
  setAudioSurah: (id: number | null) => void;
  setAudioReciter: (r: string) => void;
  setAudioPlaying: (p: boolean) => void;
  setAudioTime: (current: number, duration?: number) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string) {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      view: "home",
      setView: (view) => set({ view }),

      selectedBookId: null,
      selectedSurahId: null,
      selectedHadithCollectionId: null,
      selectedDuaCategoryId: null,
      selectBook: (id) => set({ selectedBookId: id, view: "reader" }),
      selectSurah: (id) => set({ selectedSurahId: id }),
      selectHadithCollection: (id) => set({ selectedHadithCollectionId: id }),
      selectDuaCategory: (id) => set({ selectedDuaCategoryId: id }),

      readingProgress: {},
      updateReadingProgress: (p) =>
        set((s) => ({
          readingProgress: { ...s.readingProgress, [p.bookId]: p },
        })),

      readingStats: {},
      lastReadDate: null,
      recordReading: ({ chapters = 0, ayahs = 0, minutes = 0 }) => {
        const today = todayStr();
        set((s) => {
          const existing = s.readingStats[today] || {
            date: today,
            chaptersRead: 0,
            ayahsRead: 0,
            minutesRead: 0,
          };
          return {
            readingStats: {
              ...s.readingStats,
              [today]: {
                date: today,
                chaptersRead: existing.chaptersRead + chapters,
                ayahsRead: existing.ayahsRead + ayahs,
                minutesRead: existing.minutesRead + minutes,
              },
            },
            lastReadDate: today,
          };
        });
      },
      getStreak: () => {
        const { readingStats } = get();
        if (Object.keys(readingStats).length === 0) return 0;
        let streak = 0;
        let cursor = new Date();
        for (;;) {
          const ds = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
          if (readingStats[ds]) {
            streak++;
            cursor.setDate(cursor.getDate() - 1);
          } else {
            // Allow today to be empty without breaking the streak (if yesterday was read)
            if (streak === 0) {
              cursor.setDate(cursor.getDate() - 1);
              const ds2 = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
              if (readingStats[ds2]) {
                streak++;
                cursor.setDate(cursor.getDate() - 1);
                continue;
              }
            }
            break;
          }
        }
        return streak;
      },
      getTotalStats: () => {
        const { readingStats } = get();
        const all = Object.values(readingStats);
        return {
          days: all.length,
          chapters: all.reduce((a, b) => a + b.chaptersRead, 0),
          ayahs: all.reduce((a, b) => a + b.ayahsRead, 0),
          minutes: all.reduce((a, b) => a + b.minutesRead, 0),
        };
      },

      tasbeehCount: 0,
      tasbeehTotal: 0,
      tasbeehTarget: 33,
      currentDhikr: "SubhanAllah",
      incrementTasbeeh: () =>
        set((s) => ({
          tasbeehCount: s.tasbeehCount + 1,
          tasbeehTotal: s.tasbeehTotal + 1,
        })),
      resetTasbeeh: () => set({ tasbeehCount: 0 }),
      setTasbeehTarget: (n) => set({ tasbeehTarget: n }),
      setDhikr: (d) => set({ currentDhikr: d, tasbeehCount: 0 }),

      duaCounts: {},
      incrementDua: (id) =>
        set((s) => ({
          duaCounts: { ...s.duaCounts, [id]: (s.duaCounts[id] || 0) + 1 },
        })),
      resetDua: (id) =>
        set((s) => ({
          duaCounts: { ...s.duaCounts, [id]: 0 },
        })),

      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),

      readerFontSize: 18,
      readerTheme: "light",
      setReaderFontSize: (n) => set({ readerFontSize: n }),
      setReaderTheme: (t) => set({ readerTheme: t }),

      audioSurahId: null,
      audioReciter: "ar.alafasy",
      audioIsPlaying: false,
      audioCurrentTime: 0,
      audioDuration: 0,
      setAudioSurah: (id) =>
        set({ audioSurahId: id, audioIsPlaying: id !== null, audioCurrentTime: 0 }),
      setAudioReciter: (r) => set({ audioReciter: r }),
      setAudioPlaying: (p) => set({ audioIsPlaying: p }),
      setAudioTime: (current, duration) =>
        set((s) => ({
          audioCurrentTime: current,
          audioDuration: duration ?? s.audioDuration,
        })),

      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: "islam24x7-store",
      partialize: (s) => ({
        readingProgress: s.readingProgress,
        readingStats: s.readingStats,
        lastReadDate: s.lastReadDate,
        tasbeehTotal: s.tasbeehTotal,
        tasbeehTarget: s.tasbeehTarget,
        currentDhikr: s.currentDhikr,
        duaCounts: s.duaCounts,
        favorites: s.favorites,
        readerFontSize: s.readerFontSize,
        readerTheme: s.readerTheme,
      }),
    }
  )
);

void daysBetween; // reserved for future streak edge cases

