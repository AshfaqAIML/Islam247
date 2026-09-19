import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ViewId, ReadingProgress } from "./types";

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

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
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

      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: "islam24x7-store",
      partialize: (s) => ({
        readingProgress: s.readingProgress,
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
