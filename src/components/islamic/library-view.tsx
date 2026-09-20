"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Search,
  Library as LibraryIcon,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { libraryBooks, bookCategories } from "@/lib/data/books";
import type { Book, BookCategory } from "@/lib/types";
import { StarMark } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterId = "All" | BookCategory;

export function LibraryView() {
  const selectBook = useAppStore((s) => s.selectBook);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const [filter, setFilter] = useState<FilterId>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<FilterId, number> = {
      All: libraryBooks.length,
      Fiqh: 0,
      Tafsir: 0,
      Aqeedah: 0,
      Seerah: 0,
      History: 0,
    };
    for (const b of libraryBooks) c[b.category] += 1;
    return c;
  }, []);

  const tabs: { id: FilterId; name: string; description?: string }[] = [
    { id: "All", name: "All" },
    ...bookCategories.map((c) => ({
      id: c.id as BookCategory,
      name: c.name,
      description: c.description,
    })),
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return libraryBooks.filter((b) => {
      if (filter !== "All" && b.category !== filter) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const isFav = (id: string) => favorites.includes(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-emerald/20 bg-gradient-to-br from-emerald-soft via-background to-gold-soft p-6 sm:p-8"
      >
        <div className="star-lattice opacity-[0.06]" />
        <div className="relative z-10 flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft">
              <LibraryIcon className="h-6 w-6 text-emerald" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Islamic Library
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                A curated collection of classical and contemporary works on
                Fiqh, Tafsir, Aqeedah, Seerah, and Islamic history.
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="relative mt-5"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or description…"
          className="h-11 rounded-full border-border/60 bg-card pl-10 pr-4 text-sm shadow-sm focus-visible:ring-emerald/30"
        />
      </motion.div>

      {/* Category filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter books by category"
      >
        {tabs.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                active
                  ? "border-emerald bg-emerald text-primary-foreground shadow-sm"
                  : "border-border/60 bg-card text-foreground hover:border-emerald/40 hover:bg-emerald-soft/40"
              )}
            >
              {t.name}
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold",
                  active
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-gold-soft text-accent-foreground"
                )}
              >
                {counts[t.id]}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Results count */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "book" : "books"}
          {filter !== "All" && (
            <>
              {" "}
              in{" "}
              <span className="font-semibold text-emerald">{filter}</span>
            </>
          )}
        </p>
      </div>

      {/* Books grid */}
      {filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center justify-center gap-3 border-dashed border-border/60 bg-muted/20 p-10 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No books found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-1 rounded-full border-emerald/30 text-emerald"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Reset filters
          </Button>
        </Card>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              favorited={isFav(book.id)}
              onRead={() => selectBook(book.id)}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function BookCard({
  book,
  favorited,
  onRead,
  onToggleFavorite,
}: {
  book: Book;
  favorited: boolean;
  onRead: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/60 bg-card p-4 transition-all hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg">
        {/* Favorite button */}
        <button
          onClick={onToggleFavorite}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorited}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-all hover:scale-110 hover:bg-background"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              favorited
                ? "fill-gold text-gold"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </button>

        {/* Book spine visual */}
        <div
          className={cn(
            "relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br shadow-inner",
            book.coverColor
          )}
        >
          <div className="absolute inset-0 star-lattice opacity-10" />
          <div className="absolute -right-3 -top-3 opacity-15">
            <StarMark className="h-16 w-16" showGold={false} />
          </div>
          <div className="relative z-10 flex flex-col items-center px-3 text-center">
            <StarMark className="h-8 w-8" />
            <p className="mt-2 line-clamp-2 text-xs font-semibold uppercase tracking-wide text-white/90">
              {book.title}
            </p>
          </div>
          {book.isDemo && (
            <Badge
              variant="secondary"
              className="absolute left-2 top-2 gap-1 bg-background/85 text-[10px] text-emerald backdrop-blur"
            >
              <Sparkles className="h-2.5 w-2.5" />
              Demo
            </Badge>
          )}
        </div>

        {/* Body */}
        <div className="mt-3 flex flex-1 flex-col">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-gold-soft text-[11px] text-accent-foreground"
            >
              {book.category}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {book.author}
            </span>
          </div>

          <h3 className="line-clamp-1 font-semibold text-foreground">
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {book.description}
          </p>

          {/* Meta */}
          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {book.totalPages} pages
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {book.chapters.length} chapters
            </span>
          </div>

          {/* Action */}
          <Button
            onClick={onRead}
            className="mt-4 w-full rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
            size="sm"
          >
            <BookOpen className="mr-1.5 h-4 w-4" />
            Read
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
