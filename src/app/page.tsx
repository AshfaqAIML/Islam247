"use client";

import { ThemeProvider } from "next-themes";
import { useAppStore } from "@/lib/store";
import { Header } from "@/components/islamic/header";
import { Footer } from "@/components/islamic/footer";
import { BottomNav } from "@/components/islamic/bottom-nav";
import { HomeView } from "@/components/islamic/home-view";
import { LibraryView } from "@/components/islamic/library-view";
import { ReaderView } from "@/components/islamic/reader-view";
import { QuranView } from "@/components/islamic/quran-view";
import { HadithView } from "@/components/islamic/hadith-view";
import { Hadith40View } from "@/components/islamic/hadith40-view";
import { DuasView } from "@/components/islamic/duas-view";
import { PrayerView } from "@/components/islamic/prayer-view";
import { SearchView } from "@/components/islamic/search-view";
import { AiView } from "@/components/islamic/ai-view";
import { TasbeehView } from "@/components/islamic/tasbeeh-view";
import { NamesView } from "@/components/islamic/names-view";
import { ProphetNamesView } from "@/components/islamic/prophet-names-view";
import { FavoritesView } from "@/components/islamic/favorites-view";
import { CalendarView } from "@/components/islamic/calendar-view";
import { BookmarksView } from "@/components/islamic/bookmarks-view";
import { HistoryView } from "@/components/islamic/history-view";
import { FatawaView } from "@/components/islamic/fatawa-view";
import { AudioPlayer } from "@/components/islamic/audio-player";
import { DownloadView } from "@/components/islamic/download-view";
import { SettingsView } from "@/components/islamic/settings-view";

function ViewRouter() {
  const view = useAppStore((s) => s.view);

  switch (view) {
    case "home":
      return <HomeView />;
    case "library":
      return <LibraryView />;
    case "reader":
      return <ReaderView />;
    case "quran":
      return <QuranView />;
    case "hadith":
      return <HadithView />;
    case "hadith40":
      return <Hadith40View />;
    case "duas":
      return <DuasView />;
    case "prayer":
      return <PrayerView />;
    case "search":
      return <SearchView />;
    case "ai":
      return <AiView />;
    case "tasbeeh":
      return <TasbeehView />;
    case "names":
      return <NamesView />;
    case "prophetNames":
      return <ProphetNamesView />;
    case "favorites":
      return <FavoritesView />;
    case "calendar":
      return <CalendarView />;
    case "bookmarks":
      return <BookmarksView />;
    case "history":
      return <HistoryView />;
    case "fatawa":
      return <FatawaView />;
    case "download":
      return <DownloadView />;
    case "settings":
      return <SettingsView />;
    default:
      return <HomeView />;
  }
}

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <ViewRouter />
        </main>
        <Footer />
        <BottomNav />
        <AudioPlayer />
      </div>
    </ThemeProvider>
  );
}
