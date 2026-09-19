"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  BookOpen,
  Library,
  Hand,
  Sparkles,
  Star,
  Trash2,
  ChevronRight,
  SearchX,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { quranData } from "@/lib/data/quran";
import { hadithCollections } from "@/lib/data/hadith";
import { fortyHadith } from "@/lib/data/forty-hadith";
import { libraryBooks, getBookById } from "@/lib/data/books";
import { duaCategories } from "@/lib/data/duas";
import { namesOfAllah } from "@/lib/data/names";
import { getFatwaById } from "@/lib/data/fatawa";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FavType = "quran" | "hadith" | "hadith40" | "fatawa" | "book" | "dua" | "name";

interface FavItem {
  id: string;
  type: FavType;
  title: string;
  subtitle: string;
  excerpt: string;
  arabic?: string;
  reference: string;
  action: () => void;
}

const typeMeta: Record<
  FavType,
  { label: string; icon: typeof BookOpen; color: string }
> = {
  quran: {
    label: "Quran",
    icon: BookOpen,
    color: "bg-emerald-soft text-emerald",
  },
  hadith: {
    label: "Hadith",
    icon: Library,
    color: "bg-gold-soft text-accent-foreground",
  },
  hadith40: {
    label: "40 Hadith",
    icon: Library,
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  },
  fatawa: {
    label: "Fatawa",
    icon: Library,
    color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  },
  book: {
    label: "Library",
    icon: Library,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  dua: {
    label: "Dua",
    icon: Hand,
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  name: {
    label: "Name of Allah",
    icon: Sparkles,
    color: "bg-gold-soft text-gold",
  },
};

export function FavoritesView() {
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const setView = useAppStore((s) => s.setView);
  const selectBook = useAppStore((s) => s.selectBook);
  const selectSurah = useAppStore((s) => s.selectSurah);
  const selectHadithCollection = useAppStore((s) => s.selectHadithCollection);
  const selectDuaCategory = useAppStore((s) => s.selectDuaCategory);
  const [filter, setFilter] = useState<FavType | "all">("all");

  const navigate = useCallback(
    (v: ViewId) => {
      setView(v);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setView]
  );

  // Build the full list of favorited items by resolving each favorite id.
  const items = useMemo<FavItem[]>(() => {
    const out: FavItem[] = [];

    for (const favId of favorites) {
      // ayah-${surahId}-${ayahNumber}
      if (favId.startsWith("ayah-")) {
        const parts = favId.split("-");
        const surahId = Number(parts[1]);
        const ayahNum = Number(parts[2]);
        const surah = quranData.find((s) => s.id === surahId);
        const ayah = surah?.ayahs.find((a) => a.number === ayahNum);
        if (surah && ayah) {
          out.push({
            id: favId,
            type: "quran",
            title: `Surah ${surah.name}, Ayah ${ayah.number}`,
            subtitle: surah.englishName,
            excerpt:
              ayah.translation.slice(0, 140) +
              (ayah.translation.length > 140 ? "…" : ""),
            reference: `Quran ${surah.id}:${ayah.number}`,
            arabic: ayah.arabic,
            action: () => {
              selectSurah(surah.id);
              navigate("quran");
            },
          });
        }
        continue;
      }
      // hadith-${collectionId}-${number}
      if (favId.startsWith("hadith-")) {
        const parts = favId.split("-");
        const colId = parts[1];
        const num = Number(parts[2]);
        const col = hadithCollections.find((c) => c.id === colId);
        const h = col?.hadiths.find((x) => x.number === num);
        if (col && h) {
          out.push({
            id: favId,
            type: "hadith",
            title: `${col.name} #${h.number}`,
            subtitle: `Narrated by ${h.narrator} · ${h.grade}`,
            excerpt:
              h.english.slice(0, 140) + (h.english.length > 140 ? "…" : ""),
            reference: col.name,
            arabic: h.arabic,
            action: () => {
              selectHadithCollection(col.id);
              navigate("hadith");
            },
          });
        }
        continue;
      }
      // nawawi-N
      if (favId.startsWith("nawawi-")) {
        const num = Number(favId.split("-")[1]);
        const h = fortyHadith.find((x) => x.number === num);
        if (h) {
          out.push({
            id: favId,
            type: "hadith40",
            title: `Hadith ${h.number}: ${h.title}`,
            subtitle: `Narrated by ${h.narrator}`,
            excerpt:
              h.english.slice(0, 140) + (h.english.length > 140 ? "…" : ""),
            reference: h.reference,
            arabic: h.arabic,
            action: () => navigate("hadith40"),
          });
        }
        continue;
      }
      // name-N
      if (favId.startsWith("name-")) {
        const num = Number(favId.split("-")[1]);
        const n = namesOfAllah.find((x) => x.number === num);
        if (n) {
          out.push({
            id: favId,
            type: "name",
            title: n.transliteration,
            subtitle: n.english,
            excerpt: n.meaning,
            reference: `Name ${n.number} of 99`,
            arabic: n.arabic,
            action: () => navigate("names"),
          });
        }
        continue;
      }
      // dua-${duaId}
      if (favId.startsWith("dua-")) {
        const duaId = favId.slice(4);
        for (const cat of duaCategories) {
          const d = cat.duas.find((x) => x.id === duaId);
          if (d) {
            out.push({
              id: favId,
              type: "dua",
              title: d.title,
              subtitle: cat.name,
              excerpt:
                d.translation.slice(0, 140) +
                (d.translation.length > 140 ? "…" : ""),
              reference: d.reference,
              arabic: d.arabic,
              action: () => {
                selectDuaCategory(cat.id);
                navigate("duas");
              },
            });
            break;
          }
        }
        continue;
      }
      // fatwa-${fatwaId}
      if (favId.startsWith("fatwa-")) {
        const f = getFatwaById(favId);
        if (f) {
          out.push({
            id: favId,
            type: "fatawa",
            title: f.topic,
            subtitle: `${f.scholar} · ${f.category}`,
            excerpt:
              f.answer.slice(0, 140) + (f.answer.length > 140 ? "…" : ""),
            reference: `${f.source} · ${f.reference}`,
            action: () => navigate("fatawa"),
          });
        }
        continue;
      }
      // otherwise — a book id (raw, e.g. "fiqh-1")
      const book = getBookById(favId);
      if (book) {
        out.push({
          id: favId,
          type: "book",
          title: book.title,
          subtitle: `${book.author} · ${book.category}`,
          excerpt:
            book.description.slice(0, 140) +
            (book.description.length > 140 ? "…" : ""),
          reference: `Library · ${book.totalPages} pages`,
          action: () => selectBook(book.id),
        });
        continue;
      }
    }

    return out;
  }, [favorites, selectBook, selectDuaCategory, selectHadithCollection, selectSurah, navigate]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const it of items) c[it.type] = (c[it.type] || 0) + 1;
    return c;
  }, [items]);

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  const filterTabs: { id: FavType | "all"; label: string; count: number }[] = [
    { id: "all", label: "All", count: items.length },
    { id: "quran", label: "Quran", count: counts.quran || 0 },
    { id: "hadith", label: "Hadith", count: counts.hadith || 0 },
    { id: "hadith40", label: "40 Hadith", count: counts.hadith40 || 0 },
    { id: "fatawa", label: "Fatawa", count: counts.fatawa || 0 },
    { id: "book", label: "Books", count: counts.book || 0 },
    { id: "dua", label: "Duas", count: counts.dua || 0 },
    { id: "name", label: "Names", count: counts.name || 0 },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="relative">
            <StarMark className="h-12 w-12" />
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary-foreground">
              {favorites.length}
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Your <span className="text-gradient-gold">Favorites</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Saved ayahs, hadith, duas, and books — all in one place.
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 border-dashed border-border/60 bg-muted/20 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft">
            <Heart className="h-8 w-8 text-emerald" />
          </div>
          <div>
            <p className="font-semibold text-foreground">No favorites yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tap the heart icon on any ayah, hadith, dua, or book to save it
              here for quick access.
            </p>
          </div>
          <Button
            onClick={() => navigate("quran")}
            className="mt-2 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
          >
            <BookOpen className="mr-2 h-4 w-4" />
              Browse Quran
          </Button>
        </Card>
      ) : (
        <>
          {/* Filter tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-1.5">
            {filterTabs.map((tab) => {
              const active = filter === tab.id;
              const disabled = tab.id !== "all" && tab.count === 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => !disabled && setFilter(tab.id)}
                  disabled={disabled}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-emerald bg-emerald-soft text-emerald"
                      : disabled
                        ? "border-border/40 bg-transparent text-muted-foreground/40"
                        : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-foreground"
                  )}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge
                      variant="secondary"
                      className="h-5 min-w-5 px-1.5 text-[10px]"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>

          <StarDivider className="mb-6" />

          {/* Items */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-3">
              {filtered.map((item, i) => {
                const meta = typeMeta[item.type];
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: Math.min(i * 0.03, 0.4) }}
                  >
                    <Card className="group card-refined border-border/60 bg-card p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                            meta.color
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={item.action}
                              className="min-w-0 flex-1 text-left"
                            >
                              <h3 className="truncate font-semibold text-foreground group-hover:text-emerald">
                                {item.title}
                              </h3>
                            </button>
                            <button
                              onClick={() => toggleFavorite(item.id)}
                              className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                              aria-label="Remove from favorites"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </p>
                          {item.arabic && (
                            <p className="mt-2 text-right font-arabic text-lg leading-loose text-foreground">
                              {item.arabic}
                            </p>
                          )}
                          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                            {item.excerpt}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-gold">{item.reference}</span>
                            <button
                              onClick={item.action}
                              className="flex items-center gap-1 text-xs font-medium text-emerald opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              Open
                              <ChevronRight className="h-3 w-3" />
                            </button>
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
            <Card className="flex flex-col items-center gap-3 border-dashed border-border/60 bg-muted/20 p-8 text-center">
              <SearchX className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No favorites in this category yet.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
