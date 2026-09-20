"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  StickyNote,
  Trash2,
  ChevronRight,
  SearchX,
  BookOpen,
  Library,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { getBookById } from "@/lib/data/books";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BookmarksView() {
  const bookmarks = useAppStore((s) => s.bookmarks);
  const removeBookmark = useAppStore((s) => s.removeBookmark);
  const selectBook = useAppStore((s) => s.selectBook);
  const setView = useAppStore((s) => s.setView);
  const [filter, setFilter] = useState<string>("all");

  const navigate = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Enrich bookmarks with book info and group by book.
  const enriched = useMemo(() => {
    return bookmarks
      .map((b) => {
        const book = getBookById(b.bookId);
        return { ...b, book };
      })
      .filter((b) => b.book)
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [bookmarks]);

  // Unique book ids for filter tabs
  const bookTabs = useMemo(() => {
    const seen = new Map<string, { id: string; title: string }>();
    for (const b of enriched) {
      if (!seen.has(b.bookId) && b.book) {
        seen.set(b.bookId, { id: b.bookId, title: b.book.title });
      }
    }
    return Array.from(seen.values());
  }, [enriched]);

  const filtered =
    filter === "all"
      ? enriched
      : enriched.filter((b) => b.bookId === filter);

  const notesCount = bookmarks.filter((b) => b.note && b.note.trim()).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow-lg">
              <Bookmark className="h-7 w-7" />
            </div>
            {bookmarks.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-primary-foreground">
                {bookmarks.length}
              </span>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Bookmarks &amp; <span className="text-gradient-gold">Notes</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Highlighted passages and your personal reflections
        </p>
        {notesCount > 0 && (
          <Badge className="mt-2 bg-gold-soft text-accent-foreground">
            <StickyNote className="mr-1 h-3 w-3" />
            {notesCount} with notes
          </Badge>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 border-dashed border-border/60 bg-muted/20 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft">
            <Bookmark className="h-8 w-8 text-emerald" />
          </div>
          <div>
            <p className="font-semibold text-foreground">No bookmarks yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Open a book in the Library and tap the bookmark icon on any
              paragraph to save it here with optional personal notes.
            </p>
          </div>
          <Button
            onClick={() => navigate("library")}
            className="mt-2 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
          >
            <Library className="mr-2 h-4 w-4" />
            Browse Library
          </Button>
        </Card>
      ) : (
        <>
          {/* Filter tabs by book */}
          {bookTabs.length > 1 && (
            <div className="mb-5 flex flex-wrap justify-center gap-1.5">
              <FilterChip
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="All"
                count={enriched.length}
              />
              {bookTabs.map((t) => (
                <FilterChip
                  key={t.id}
                  active={filter === t.id}
                  onClick={() => setFilter(t.id)}
                  label={t.title}
                  count={enriched.filter((b) => b.bookId === t.id).length}
                />
              ))}
            </div>
          )}

          <StarDivider className="mb-6" />

          {/* Bookmark cards */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-3">
              {filtered.map((bm, i) => {
                const colorClasses =
                  bm.color === "emerald"
                    ? "border-l-emerald"
                    : bm.color === "gold"
                      ? "border-l-gold"
                      : "border-l-rose-500";
                return (
                  <motion.div
                    key={bm.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: Math.min(i * 0.03, 0.4) }}
                  >
                    <Card
                      className={cn(
                        "card-refined border-l-4 bg-card p-4",
                        colorClasses
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          {/* Meta */}
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-emerald-soft text-emerald"
                            >
                              <BookOpen className="mr-1 h-2.5 w-2.5" />
                              {bm.book?.title}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Ch {bm.chapterIndex + 1}
                              {bm.book?.chapters[bm.chapterIndex]
                                ? ` · ${bm.book.chapters[bm.chapterIndex].title}`
                                : ""}
                            </span>
                          </div>
                          {/* Excerpt */}
                          <p className="text-sm italic leading-relaxed text-foreground/80">
                            &ldquo;{bm.excerpt}&rdquo;
                          </p>
                          {/* Note */}
                          {bm.note && bm.note.trim() && (
                            <div className="mt-2 rounded-lg border border-gold/30 bg-gold-soft/20 p-2.5">
                              <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">
                                <StickyNote className="h-2.5 w-2.5" />
                                Your note
                              </p>
                              <p className="text-sm text-foreground">
                                {bm.note}
                              </p>
                            </div>
                          )}
                          {/* Footer */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(bm.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => selectBook(bm.bookId)}
                                className="flex items-center gap-0.5 text-xs font-medium text-emerald hover:underline"
                              >
                                Open
                                <ChevronRight className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => removeBookmark(bm.id)}
                                className="flex items-center gap-1 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                aria-label="Remove bookmark"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <Card className="flex flex-col items-center gap-2 border-dashed border-border/60 bg-muted/20 p-8 text-center">
              <SearchX className="h-6 w-6 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No bookmarks in this book.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-emerald bg-emerald-soft text-emerald"
          : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-foreground"
      )}
    >
      <span className="max-w-[160px] truncate">{label}</span>
      <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-[10px]">
        {count}
      </Badge>
    </button>
  );
}
