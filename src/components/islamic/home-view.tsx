"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  Heart,
  Search,
  Sparkles,
  Moon,
  Sun,
  Library,
  Hand,
  ChevronRight,
  RotateCcw,
  ScrollText,
  Star,
  Calendar,
  Bookmark,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { getDailyAyah } from "@/lib/data/quran";
import { getBookById } from "@/lib/data/books";
import { StarMark, StarDivider } from "./star-mark";
import { ReadingStatsWidget } from "./reading-stats-widget";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const quickAccess: {
  id: ViewId;
  label: string;
  desc: string;
  icon: typeof BookOpen;
  color: string;
}[] = [
  {
    id: "quran",
    label: "Holy Quran",
    desc: "Read & reflect",
    icon: BookOpen,
    color: "from-emerald-500 to-emerald-700",
  },
  {
    id: "hadith",
    label: "Hadith",
    desc: "Prophetic traditions",
    icon: Library,
    color: "from-amber-500 to-amber-700",
  },
  {
    id: "library",
    label: "Library",
    desc: "Islamic books",
    icon: Library,
    color: "from-teal-500 to-teal-700",
  },
  {
    id: "duas",
    label: "Duas & Azkar",
    desc: "Supplications",
    icon: Hand,
    color: "from-green-500 to-green-700",
  },
  {
    id: "prayer",
    label: "Prayer Times",
    desc: "Daily schedule",
    icon: Compass,
    color: "from-cyan-500 to-cyan-700",
  },
  {
    id: "ai",
    label: "AI Assistant",
    desc: "Ask & learn",
    icon: Sparkles,
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "names",
    label: "99 Names",
    desc: "Asma ul Husna",
    icon: Star,
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "hadith40",
    label: "40 Hadith",
    desc: "Imam an-Nawawi",
    icon: ScrollText,
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "calendar",
    label: "Hijri Calendar",
    desc: "Islamic dates",
    icon: Calendar,
    color: "from-teal-500 to-cyan-700",
  },
  {
    id: "favorites",
    label: "Favorites",
    desc: "Saved items",
    icon: Bookmark,
    color: "from-rose-500 to-pink-600",
  },
];

export function HomeView() {
  const setView = useAppStore((s) => s.setView);
  const readingProgress = useAppStore((s) => s.readingProgress);
  const selectBook = useAppStore((s) => s.selectBook);
  const tasbeehCount = useAppStore((s) => s.tasbeehCount);
  const tasbeehTarget = useAppStore((s) => s.tasbeehTarget);
  const tasbeehTotal = useAppStore((s) => s.tasbeehTotal);
  const incrementTasbeeh = useAppStore((s) => s.incrementTasbeeh);
  const resetTasbeeh = useAppStore((s) => s.resetTasbeeh);
  const [pressed, setPressed] = useState(false);
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Assalamu Alaikum · Good morning";
    if (hour >= 12 && hour < 17) return "Assalamu Alaikum · Good afternoon";
    if (hour >= 17 && hour < 21) return "Assalamu Alaikum · Good evening";
    return "Assalamu Alaikum · Good night";
  }, []);
  const dailyAyah = getDailyAyah();

  const continueReading = Object.values(readingProgress).sort(
    (a, b) => b.lastRead - a.lastRead
  )[0];

  const navigate = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTasbeeh = () => {
    incrementTasbeeh();
    setPressed(true);
    setTimeout(() => setPressed(false), 180);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-emerald/20 hero-gradient p-6 sm:p-10"
      >
        <div className="star-lattice opacity-[0.07]" />
        {/* Decorative rotating star composition */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.08]">
          <div className="animate-slow-spin">
            <StarMark className="h-full w-full" />
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 opacity-[0.06]">
          <div className="animate-slow-spin-reverse">
            <StarMark className="h-full w-full" showGold={false} />
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="animate-float-soft">
              <StarMark className="h-12 w-12 drop-shadow-sm" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald">
                {greeting}
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Welcome to{" "}
                <span className="text-gradient-emerald">Islam24x7</span>
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Read the Quran, explore Hadith, browse a structured Islamic library,
            and ask a source-grounded AI assistant — your daily companion for
            knowledge and reflection.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => navigate("quran")}
              className="rounded-full bg-emerald text-primary-foreground shadow-md hover:bg-emerald/90"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Read Quran
            </Button>
            <Button
              onClick={() => navigate("ai")}
              variant="outline"
              className="rounded-full border-gold/40 text-emerald hover:bg-gold-soft hover:text-accent-foreground"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI Assistant
            </Button>
            <Button
              onClick={() => navigate("names")}
              variant="ghost"
              className="rounded-full text-muted-foreground hover:bg-emerald-soft hover:text-emerald"
            >
              <Sparkles className="mr-2 h-4 w-4 text-gold" />
              99 Names of Allah
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Daily Ayah */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <Card className="relative overflow-hidden border-emerald/20 bg-gradient-to-br from-emerald/5 to-gold/5 p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 opacity-5">
            <StarMark className="h-full w-full" showGold={false} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="bg-gold-soft text-accent-foreground"
              >
                <Sun className="mr-1 h-3 w-3" />
                Ayah of the Day
              </Badge>
              <span className="text-xs font-medium text-muted-foreground">
                {dailyAyah.reference}
              </span>
            </div>
            <p className="mt-4 text-right font-arabic text-2xl leading-loose text-foreground sm:text-3xl">
              {dailyAyah.arabic}
            </p>
            <StarDivider className="my-4" />
            <p className="text-center text-base italic leading-relaxed text-muted-foreground sm:text-lg">
              &ldquo;{dailyAyah.translation}&rdquo;
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Quick Access</h2>
          <button
            onClick={() => navigate("search")}
            className="flex items-center gap-1 text-sm font-medium text-emerald hover:underline"
          >
            <Search className="h-4 w-4" />
            Search all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {quickAccess.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg"
            >
              <div
                className={cn(
                  "mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                  item.color
                )}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              <ChevronRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* Continue Reading + Tasbeeh */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Continue Reading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Continue Reading
          </h2>
          {continueReading ? (
            <ContinueReadingCard progress={continueReading} onOpen={selectBook} />
          ) : (
            <Card className="flex flex-col items-center justify-center gap-3 border-dashed border-border/60 bg-muted/20 p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground/40" />
              <div>
                <p className="font-medium text-foreground">No reading yet</p>
                <p className="text-sm text-muted-foreground">
                  Open a book from the library to start your journey.
                </p>
              </div>
              <Button
                onClick={() => navigate("library")}
                variant="outline"
                className="mt-2 rounded-full border-emerald/30 text-emerald"
              >
                Browse Library
              </Button>
            </Card>
          )}
        </motion.div>

        {/* Tasbeeh Counter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Tasbeeh Counter
          </h2>
          <Card className="relative flex flex-col items-center gap-3 overflow-hidden border-gold/20 bg-gradient-to-b from-gold-soft/30 to-card p-6">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 opacity-5">
              <StarMark className="h-full w-full" />
            </div>
            <div className="relative z-10 flex w-full flex-col items-center">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                SubhanAllah
              </span>
              <button
                onClick={handleTasbeeh}
                className={cn(
                  "mt-2 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow-lg transition-all active:scale-95 sm:h-32 sm:w-32",
                  pressed && "tasbeeh-press"
                )}
                aria-label="Increment tasbeeh counter"
              >
                <span className="text-3xl font-bold sm:text-4xl">
                  {tasbeehCount}
                </span>
              </button>
              <div className="mt-3 flex w-full items-center gap-2">
                <Progress
                  value={(tasbeehCount / tasbeehTarget) * 100}
                  className="h-1.5 flex-1"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {tasbeehCount}/{tasbeehTarget}
                </span>
              </div>
              <div className="mt-3 flex w-full items-center justify-between text-xs text-muted-foreground">
                <span>Total: {tasbeehTotal}</span>
                <button
                  onClick={resetTasbeeh}
                  className="flex items-center gap-1 hover:text-emerald"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>
              <Button
                onClick={() => navigate("tasbeeh")}
                variant="ghost"
                size="sm"
                className="mt-2 text-xs text-emerald"
              >
                Full counter
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Reading stats widget */}
      <div className="mt-8">
        <ReadingStatsWidget />
      </div>

      {/* Feature highlights */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10"
      >
        <StarDivider className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Authentic Sources",
              desc: "Quran, Hadith, and a curated library grounded in verified references.",
            },
            {
              icon: Sparkles,
              title: "AI Research Assistant",
              desc: "Ask questions and receive answers with clickable, citable sources.",
            },
            {
              icon: Moon,
              title: "Daily Spiritual Tools",
              desc: "Prayer times, Qibla, tasbeeh counter, and morning/evening azkar.",
            },
          ].map((f) => (
            <Card
              key={f.title}
              className="border-border/60 bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-soft">
                <f.icon className="h-5 w-5 text-emerald" />
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function ContinueReadingCard({
  progress,
  onOpen,
}: {
  progress: {
    bookId: string;
    chapterId: string;
    chapterIndex: number;
    scrollPercent: number;
    lastRead: number;
  };
  onOpen: (id: string) => void;
}) {
  const book = getBookById(progress.bookId);
  if (!book) return null;
  const chapter = book.chapters[progress.chapterIndex];

  return (
    <Card className="flex items-center gap-4 border-border/60 bg-card p-5">
      <div
        className={cn(
          "flex h-20 w-16 shrink-0 items-end rounded-lg bg-gradient-to-br p-2 text-white shadow-md",
          book.coverColor
        )}
      >
        <StarMark className="h-5 w-5 opacity-70" showGold={false} />
      </div>
      <div className="min-w-0 flex-1">
        <Badge variant="secondary" className="mb-1 bg-emerald-soft text-emerald">
          {book.category}
        </Badge>
        <h3 className="truncate font-semibold text-foreground">{book.title}</h3>
        <p className="truncate text-sm text-muted-foreground">
          {chapter?.title || `Chapter ${progress.chapterIndex + 1}`}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Progress value={progress.scrollPercent} className="h-1.5 flex-1" />
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(progress.scrollPercent)}%
          </span>
        </div>
      </div>
      <Button
        onClick={() => onOpen(progress.bookId)}
        className="shrink-0 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
      >
        Resume
      </Button>
    </Card>
  );
}
