"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  Library as LibraryIcon,
  Minus,
  Plus,
  Moon,
  RotateCcw,
  StickyNote,
  Sun,
  Type,
  X,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getBookById } from "@/lib/data/books";
import type { Book } from "@/lib/types";
import { StarDivider, StarMark } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MIN_FONT = 14;
const MAX_FONT = 24;

type ReaderTheme = "light" | "sepia" | "dark";

const themeBg: Record<ReaderTheme, string> = {
  light: "bg-background text-foreground",
  sepia: "bg-amber-50 text-stone-800 dark:bg-amber-950/40 dark:text-amber-50",
  dark: "bg-zinc-900 text-zinc-100",
};

const themeToolbar: Record<ReaderTheme, string> = {
  light: "bg-card/95 border-border/60 text-foreground",
  sepia:
    "bg-amber-100/95 border-amber-200 text-stone-800 dark:bg-amber-900/40 dark:border-amber-800/60 dark:text-amber-50",
  dark: "bg-zinc-800/95 border-zinc-700 text-zinc-100",
};

export function ReaderView() {
  const selectedBookId = useAppStore((s) => s.selectedBookId);
  const setView = useAppStore((s) => s.setView);
  const book = selectedBookId ? getBookById(selectedBookId) : undefined;

  if (!book) {
    return <ReaderEmptyState onBrowse={() => setView("library")} />;
  }

  // Keyed remount on book change so chapter index re-initializes cleanly.
  return <ReaderContent key={book.id} book={book} />;
}

function ReaderContent({ book }: { book: Book }) {
  const setView = useAppStore((s) => s.setView);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const readerFontSize = useAppStore((s) => s.readerFontSize);
  const readerTheme = useAppStore((s) => s.readerTheme);
  const readerLineSpacing = useAppStore((s) => s.readerLineSpacing);
  const readerFontFamily = useAppStore((s) => s.readerFontFamily);
  const setReaderFontSize = useAppStore((s) => s.setReaderFontSize);
  const setReaderTheme = useAppStore((s) => s.setReaderTheme);
  const setReaderLineSpacing = useAppStore((s) => s.setReaderLineSpacing);
  const setReaderFontFamily = useAppStore((s) => s.setReaderFontFamily);
  const readingProgress = useAppStore((s) => s.readingProgress);
  const updateReadingProgress = useAppStore((s) => s.updateReadingProgress);
  const recordReading = useAppStore((s) => s.recordReading);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const addBookmark = useAppStore((s) => s.addBookmark);
  const removeBookmark = useAppStore((s) => s.removeBookmark);
  const updateBookmarkNote = useAppStore((s) => s.updateBookmarkNote);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Initialize chapter index from persisted progress on mount.
  const [chapterIndex, setChapterIndex] = useState<number>(() => {
    const p = readingProgress[book.id];
    if (p && p.chapterIndex >= 0 && p.chapterIndex < book.chapters.length) {
      return p.chapterIndex;
    }
    return 0;
  });

  const total = book.chapters.length;
  const chapter = book.chapters[chapterIndex];
  const favorited = favorites.includes(book.id);
  const progressPercent = ((chapterIndex + 1) / total) * 100;

  const goToChapter = (i: number) => {
    const wrapped = ((i % total) + total) % total;
    setChapterIndex(wrapped);
  };

  // Persist reading progress (Zustand setter — external sync) + scroll to top.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chapter) return;
    updateReadingProgress({
      bookId: book.id,
      chapterId: chapter.id,
      chapterIndex,
      scrollPercent: ((chapterIndex + 1) / total) * 100,
      lastRead: Date.now(),
    });
    // Record reading stats: 1 chapter + approximate minutes from page count.
    recordReading({ chapters: 1, minutes: Math.max(1, Math.round(chapter.pages / 2)) });
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [book.id, book.chapters, chapter, chapterIndex, total, updateReadingProgress, recordReading]);

  if (!chapter) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">This book has no chapters.</p>
        <Button
          onClick={() => setView("library")}
          className="mt-4 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
        >
          Back to Library
        </Button>
      </div>
    );
  }

  const paragraphs = chapter.content.split(/\n\n+/);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top toolbar */}
      <header
        className={cn(
          "sticky top-0 z-30 border-b backdrop-blur",
          themeToolbar[readerTheme]
        )}
      >
        {/* Progress strip */}
        <Progress
          value={progressPercent}
          className="h-1 rounded-none bg-transparent [&>[data-slot=progress-indicator]]:bg-emerald"
        />

        <div className="mx-auto flex max-w-4xl items-center gap-2 px-3 py-2.5 sm:px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView("library")}
            className="shrink-0 gap-1.5 rounded-full text-foreground hover:bg-emerald-soft/50"
            aria-label="Back to library"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </Button>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <StarMark className="hidden h-5 w-5 shrink-0 sm:block" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">
                {book.title}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {book.author}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(book.id)}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={favorited}
            className="shrink-0 rounded-full hover:bg-gold-soft/50"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                favorited ? "fill-gold text-gold" : "text-muted-foreground"
              )}
            />
          </Button>

          {/* Chapter selector */}
          <Select
            value={String(chapterIndex)}
            onValueChange={(v) => goToChapter(parseInt(v, 10))}
          >
            <SelectTrigger
              size="sm"
              className="h-8 w-[180px] shrink-0 rounded-full text-xs sm:w-[220px]"
              aria-label="Select chapter"
            >
              <span className="mr-1 text-muted-foreground">
                Ch {chapterIndex + 1}/{total}:
              </span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {book.chapters.map((c, i) => (
                <SelectItem key={c.id} value={String(i)}>
                  <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Reading area */}
      <div
        ref={scrollRef}
        className={cn("flex-1 overflow-y-auto transition-colors", themeBg[readerTheme])}
      >
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
          {/* Chapter heading */}
          <div className="mb-2 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-emerald-soft text-emerald">
              {book.category}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gold-soft text-[11px] text-accent-foreground"
            >
              Chapter {chapterIndex + 1} of {total}
            </Badge>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="text-center font-serif text-3xl font-bold leading-tight sm:text-4xl">
                {chapter.title}
              </h1>

              <StarDivider className="my-6" />

              <div
                className="space-y-5"
                style={{
                  fontSize: `${readerFontSize}px`,
                  lineHeight: readerLineSpacing,
                  fontFamily:
                    readerFontFamily === "serif"
                      ? "Georgia, 'Times New Roman', serif"
                      : "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {paragraphs.map((p, i) => {
                  const bmId = `${book.id}-${chapterIndex}-${i}`;
                  const bm = bookmarks.find((b) => b.id === bmId);
                  return (
                    <ParagraphBlock
                      key={i}
                      text={p}
                      index={i}
                      theme={readerTheme}
                      bookmark={bm}
                      onToggleBookmark={(color) => {
                        if (bm) {
                          if (color && color !== bm.color) {
                            // Change color by re-adding (addBookmark updates existing)
                            addBookmark({
                              bookId: book.id,
                              chapterIndex,
                              paragraphIndex: i,
                              excerpt: p.slice(0, 120) + (p.length > 120 ? "…" : ""),
                              color,
                            });
                          } else if (!color) {
                            removeBookmark(bmId);
                          }
                        } else if (color) {
                          addBookmark({
                            bookId: book.id,
                            chapterIndex,
                            paragraphIndex: i,
                            excerpt: p.slice(0, 120) + (p.length > 120 ? "…" : ""),
                            color,
                          });
                        }
                      }}
                      onOpenNote={() =>
                        setActiveNoteId(bm ? bmId : null)
                      }
                      isActiveNote={activeNoteId === bmId}
                      note={bm?.note}
                      onNoteChange={(text) => updateBookmarkNote(bmId, text)}
                      onCloseNote={() => setActiveNoteId(null)}
                    />
                  );
                })}
              </div>

              {/* End-of-chapter navigation */}
              <StarDivider className="mt-10" />
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => goToChapter(chapterIndex - 1)}
                  className="gap-1.5 rounded-full border-emerald/30 text-emerald hover:bg-emerald-soft/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-xs text-muted-foreground">
                  {chapterIndex + 1} / {total}
                </span>
                <Button
                  onClick={() => goToChapter(chapterIndex + 1)}
                  className="gap-1.5 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating reader controls */}
      <div
        className={cn(
          "sticky bottom-0 z-30 border-t backdrop-blur",
          themeToolbar[readerTheme]
        )}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-4">
          {/* Font size */}
          <div className="flex items-center gap-1.5">
            <span className="hidden text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:inline">
              <Type className="mr-1 inline h-3 w-3" />
              Text
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() =>
                setReaderFontSize(Math.max(MIN_FONT, readerFontSize - 2))
              }
              disabled={readerFontSize <= MIN_FONT}
              aria-label="Decrease font size"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-8 text-center text-xs font-semibold tabular-nums">
              {readerFontSize}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() =>
                setReaderFontSize(Math.min(MAX_FONT, readerFontSize + 2))
              }
              disabled={readerFontSize >= MAX_FONT}
              aria-label="Increase font size"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            {/* Font family toggle */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-full px-2 text-[11px] font-medium"
              onClick={() =>
                setReaderFontFamily(readerFontFamily === "serif" ? "sans" : "serif")
              }
              aria-label="Toggle font family"
              title="Toggle font family"
            >
              <Type className="h-3 w-3" />
              <span className="hidden sm:inline">
                {readerFontFamily === "serif" ? "Serif" : "Sans"}
              </span>
            </Button>
            {/* Line spacing */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-full px-2 text-[11px] font-medium"
              onClick={() =>
                setReaderLineSpacing(
                  readerLineSpacing >= 2.0 ? 1.6 : readerLineSpacing + 0.2
                )
              }
              aria-label="Adjust line spacing"
              title="Line spacing"
            >
              <span className="tabular-nums">{readerLineSpacing.toFixed(1)}</span>
            </Button>
          </div>

          {/* Chapter navigation */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToChapter(chapterIndex - 1)}
              className="gap-1 rounded-full"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToChapter(chapterIndex + 1)}
              className="gap-1 rounded-full"
              aria-label="Next chapter"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center gap-1.5">
            <span className="hidden text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:inline">
              Theme
            </span>
            <div className="flex items-center gap-1 rounded-full border border-border/60 p-0.5">
              <ThemeButton
                active={readerTheme === "light"}
                onClick={() => setReaderTheme("light")}
                label="Light"
              >
                <Sun className="h-3.5 w-3.5" />
              </ThemeButton>
              <ThemeButton
                active={readerTheme === "sepia"}
                onClick={() => setReaderTheme("sepia")}
                label="Sepia"
              >
                <BookOpen className="h-3.5 w-3.5" />
              </ThemeButton>
              <ThemeButton
                active={readerTheme === "dark"}
                onClick={() => setReaderTheme("dark")}
                label="Dark"
              >
                <Moon className="h-3.5 w-3.5" />
              </ThemeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${label} theme`}
      aria-pressed={active}
      title={`${label} theme`}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full transition-all",
        active
          ? "bg-emerald text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-emerald-soft/50 hover:text-emerald"
      )}
    >
      {children}
    </button>
  );
}

function ReaderEmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="flex flex-col items-center justify-center gap-4 border-dashed border-border/60 bg-muted/20 p-8 text-center sm:p-12">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-soft">
              <BookOpen className="h-8 w-8 text-emerald" />
            </div>
            <div className="absolute -right-2 -top-2">
              <StarMark className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Select a book to start reading
            </h2>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              Browse the Islamic Library to choose from Fiqh, Tafsir, Aqeedah,
              Seerah, and History collections.
            </p>
          </div>
          <Button
            onClick={onBrowse}
            className="mt-2 gap-2 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
          >
            <LibraryIcon className="h-4 w-4" />
            Browse Library
          </Button>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <RotateCcw className="h-3 w-3" />
            Your reading progress is saved automatically.
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

interface ParagraphBlockProps {
  text: string;
  index: number;
  theme: ReaderTheme;
  bookmark?: import("@/lib/types").Bookmark;
  onToggleBookmark: (color?: "emerald" | "gold" | "rose") => void;
  onOpenNote: () => void;
  isActiveNote: boolean;
  note?: string;
  onNoteChange: (text: string) => void;
  onCloseNote: () => void;
}

function ParagraphBlock({
  text,
  index,
  theme,
  bookmark,
  onToggleBookmark,
  onOpenNote,
  isActiveNote,
  note,
  onNoteChange,
  onCloseNote,
}: ParagraphBlockProps) {
  const [showColors, setShowColors] = useState(false);
  const textColor =
    theme === "dark"
      ? "text-zinc-200"
      : theme === "sepia"
        ? "text-stone-700 dark:text-amber-50/90"
        : "text-foreground/90";

  const highlightBg = bookmark
    ? bookmark.color === "emerald"
      ? "bg-emerald-500/10 dark:bg-emerald-400/10"
      : bookmark.color === "gold"
        ? "bg-gold-soft/30 dark:bg-gold/15"
        : "bg-rose-500/10 dark:bg-rose-400/10"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 * Math.min(index, 4) }}
      className={cn(
        "group relative -mx-2 rounded-lg px-2 py-1 transition-colors",
        highlightBg
      )}
    >
      <p className={cn("text-justify", textColor)}>{text}</p>

      {/* Bookmark toggle + color picker — appears on hover or when bookmarked */}
      <div
        className={cn(
          "absolute -right-1 top-1 flex flex-col gap-1 transition-opacity",
          bookmark
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 focus-within:opacity-100"
        )}
      >
        <button
          onClick={() => {
            if (bookmark) {
              onToggleBookmark();
            } else {
              setShowColors((v) => !v);
            }
          }}
          aria-label={bookmark ? "Remove bookmark" : "Add bookmark"}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors",
            bookmark
              ? bookmark.color === "emerald"
                ? "bg-emerald text-primary-foreground"
                : bookmark.color === "gold"
                  ? "bg-gold text-primary-foreground"
                  : "bg-rose-500 text-primary-foreground"
              : "bg-background/80 text-muted-foreground hover:bg-emerald hover:text-primary-foreground"
          )}
        >
          <Bookmark className={cn("h-3.5 w-3.5", bookmark && "fill-current")} />
        </button>

        {/* Color picker — shown when not yet bookmarked and toggled */}
        {!bookmark && showColors && (
          <div className="flex flex-col gap-1 rounded-full bg-background/95 p-1 shadow-md backdrop-blur">
            {(["emerald", "gold", "rose"] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  onToggleBookmark(c);
                  setShowColors(false);
                }}
                aria-label={`Bookmark as ${c}`}
                className={cn(
                  "h-5 w-5 rounded-full border-2 border-background shadow-sm transition-transform hover:scale-110",
                  c === "emerald" && "bg-emerald",
                  c === "gold" && "bg-gold",
                  c === "rose" && "bg-rose-500"
                )}
              />
            ))}
          </div>
        )}

        {/* Change color — shown when already bookmarked */}
        {bookmark && (
          <div className="flex gap-0.5 rounded-full bg-background/95 p-0.5 shadow-sm backdrop-blur">
            {(["emerald", "gold", "rose"] as const).map((c) => (
              <button
                key={c}
                onClick={() => onToggleBookmark(c)}
                aria-label={`Change to ${c}`}
                className={cn(
                  "h-4 w-4 rounded-full border transition-transform hover:scale-110",
                  bookmark.color === c
                    ? "border-foreground/40 ring-1 ring-foreground/30"
                    : "border-background",
                  c === "emerald" && "bg-emerald",
                  c === "gold" && "bg-gold",
                  c === "rose" && "bg-rose-500"
                )}
              />
            ))}
          </div>
        )}

        {bookmark && (
          <button
            onClick={onOpenNote}
            aria-label="Edit note"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors",
              note
                ? "bg-gold text-primary-foreground"
                : "bg-background/80 text-muted-foreground hover:bg-gold hover:text-primary-foreground"
            )}
          >
            <StickyNote className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Inline note editor */}
      {bookmark && isActiveNote && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 overflow-hidden"
        >
          <div className="rounded-lg border border-gold/30 bg-gold-soft/20 p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-accent-foreground">
                <StickyNote className="h-3 w-3" />
                Personal note
              </span>
              <button
                onClick={onCloseNote}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close note"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <textarea
              value={note || ""}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Add your reflection…"
              className="min-h-[60px] w-full resize-y rounded-md border border-border/40 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-emerald/40"
              autoFocus
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
