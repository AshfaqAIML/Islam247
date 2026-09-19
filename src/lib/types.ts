// Core view identifiers for the single-page navigation
export type ViewId =
  | "home"
  | "library"
  | "reader"
  | "quran"
  | "hadith"
  | "hadith40"
  | "duas"
  | "masnoon"
  | "prayer"
  | "search"
  | "ai"
  | "tasbeeh"
  | "names"
  | "prophetNames"
  | "favorites"
  | "calendar"
  | "bookmarks"
  | "history"
  | "fatawa"
  | "settings"
  | "download";

export type BookCategory = "Fiqh" | "Tafsir" | "Aqeedah" | "Seerah" | "History";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  description: string;
  coverColor: string;
  chapters: BookChapter[];
  totalPages: number;
  isDemo?: boolean;
}

export interface BookChapter {
  id: string;
  title: string;
  content: string;
  pages: number;
}

export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  englishName: string;
  translation: string;
  revelationType: "Meccan" | "Medinan";
  ayahCount: number;
  ayahs: Ayah[];
}

export interface Ayah {
  number: number;
  arabic: string;
  translation: string;
  transliteration: string;
}

export interface HadithCollection {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  bookCount: number;
  hadithCount: number;
  hadiths: Hadith[];
}

export interface Hadith {
  id: string;
  number: number;
  arabic: string;
  english: string;
  narrator: string;
  grade: "Sahih" | "Hasan" | "Daif";
  book?: string;
  chapter?: string;
}

export interface DuaCategory {
  id: string;
  name: string;
  nameArabic: string;
  icon: string;
  duas: Dua[];
}

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  count: number;
  virtue?: string;
}

export interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
  icon: string;
}

export interface ReadingProgress {
  bookId: string;
  chapterId: string;
  chapterIndex: number;
  scrollPercent: number;
  lastRead: number; // timestamp
}

// A bookmark highlights a specific passage in a book chapter
export interface Bookmark {
  id: string; // `${bookId}-${chapterIndex}-${paragraphIndex}`
  bookId: string;
  chapterIndex: number;
  paragraphIndex: number;
  excerpt: string; // the highlighted text snippet
  note?: string; // optional personal note
  color: "emerald" | "gold" | "rose";
  createdAt: number;
}
