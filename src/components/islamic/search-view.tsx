"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search as SearchIcon,
  BookOpen,
  Library,
  Hand,
  Sparkles,
  SearchX,
  Hash,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { quranData } from "@/lib/data/quran";
import { hadithCollections } from "@/lib/data/hadith";
import { libraryBooks } from "@/lib/data/books";
import { duaCategories } from "@/lib/data/duas";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Scope = "all" | "quran" | "hadith" | "books" | "duas";

interface SearchResult {
  type: "quran" | "hadith" | "books" | "duas";
  title: string;
  subtitle: string;
  excerpt: string;
  reference: string;
  arabic?: string;
  action: () => void;
}

export function SearchView() {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const setView = useAppStore((s) => s.setView);
  const selectSurah = useAppStore((s) => s.selectSurah);
  const selectHadithCollection = useAppStore((s) => s.selectHadithCollection);
  const selectBook = useAppStore((s) => s.selectBook);
  const selectDuaCategory = useAppStore((s) => s.selectDuaCategory);

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [scope, setScope] = useState<Scope>("all");

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const navigate = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const results = useMemo<SearchResult[]>(() => {
    const q = localQuery.trim().toLowerCase();
    if (!q) return [];

    const out: SearchResult[] = [];

    // Quran
    if (scope === "all" || scope === "quran") {
      for (const surah of quranData) {
        if (
          surah.name.toLowerCase().includes(q) ||
          surah.englishName.toLowerCase().includes(q) ||
          surah.nameArabic.includes(localQuery.trim())
        ) {
          out.push({
            type: "quran",
            title: `Surah ${surah.name}`,
            subtitle: `${surah.englishName} · ${surah.revelationType} · ${surah.ayahCount} ayahs`,
            excerpt: `The ${surah.translation} — ${surah.ayahCount} verses.`,
            reference: `Quran · Surah ${surah.id}`,
            action: () => {
              selectSurah(surah.id);
              navigate("quran");
            },
          });
        }
        for (const ayah of surah.ayahs) {
          if (
            ayah.translation.toLowerCase().includes(q) ||
            ayah.transliteration.toLowerCase().includes(q) ||
            ayah.arabic.includes(localQuery.trim())
          ) {
            out.push({
              type: "quran",
              title: `Surah ${surah.name}, Ayah ${ayah.number}`,
              subtitle: surah.englishName,
              excerpt:
                ayah.translation.slice(0, 160) +
                (ayah.translation.length > 160 ? "..." : ""),
              reference: `Quran ${surah.id}:${ayah.number}`,
              arabic: ayah.arabic,
              action: () => {
                selectSurah(surah.id);
                navigate("quran");
              },
            });
          }
        }
      }
    }

    // Hadith
    if (scope === "all" || scope === "hadith") {
      for (const col of hadithCollections) {
        if (
          col.name.toLowerCase().includes(q) ||
          col.nameArabic.includes(localQuery.trim())
        ) {
          out.push({
            type: "hadith",
            title: col.name,
            subtitle: `${col.hadithCount} hadiths · ${col.bookCount} books`,
            excerpt: col.description,
            reference: "Hadith Collection",
            action: () => {
              selectHadithCollection(col.id);
              navigate("hadith");
            },
          });
        }
        for (const h of col.hadiths) {
          if (
            h.english.toLowerCase().includes(q) ||
            h.narrator.toLowerCase().includes(q) ||
            h.arabic.includes(localQuery.trim())
          ) {
            out.push({
              type: "hadith",
              title: `${col.name} #${h.number}`,
              subtitle: `Narrated by ${h.narrator} · ${h.grade}`,
              excerpt:
                h.english.slice(0, 160) + (h.english.length > 160 ? "..." : ""),
              reference: `${col.name} · ${h.book || ""} ${h.chapter || ""}`,
              arabic: h.arabic,
              action: () => {
                selectHadithCollection(col.id);
                navigate("hadith");
              },
            });
          }
        }
      }
    }

    // Books
    if (scope === "all" || scope === "books") {
      for (const book of libraryBooks) {
        if (
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.description.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q)
        ) {
          out.push({
            type: "books",
            title: book.title,
            subtitle: `${book.author} · ${book.category}`,
            excerpt:
              book.description.slice(0, 160) +
              (book.description.length > 160 ? "..." : ""),
            reference: `Library · ${book.totalPages} pages`,
            action: () => {
              selectBook(book.id);
            },
          });
        }
        for (const ch of book.chapters) {
          if (
            ch.title.toLowerCase().includes(q) ||
            ch.content.toLowerCase().includes(q)
          ) {
            out.push({
              type: "books",
              title: ch.title,
              subtitle: `${book.title} · ${book.author}`,
              excerpt:
                ch.content.slice(0, 160) +
                (ch.content.length > 160 ? "..." : ""),
              reference: `Library · ${book.category}`,
              action: () => {
                selectBook(book.id);
              },
            });
          }
        }
      }
    }

    // Duas
    if (scope === "all" || scope === "duas") {
      for (const cat of duaCategories) {
        if (
          cat.name.toLowerCase().includes(q) ||
          cat.nameArabic.includes(localQuery.trim())
        ) {
          out.push({
            type: "duas",
            title: cat.name,
            subtitle: `${cat.duas.length} duas`,
            excerpt: `Browse supplications in the ${cat.name} category.`,
            reference: "Duas & Azkar",
            action: () => {
              selectDuaCategory(cat.id);
              navigate("duas");
            },
          });
        }
        for (const d of cat.duas) {
          if (
            d.title.toLowerCase().includes(q) ||
            d.translation.toLowerCase().includes(q) ||
            d.transliteration.toLowerCase().includes(q) ||
            d.arabic.includes(localQuery.trim())
          ) {
            out.push({
              type: "duas",
              title: d.title,
              subtitle: cat.name,
              excerpt:
                d.translation.slice(0, 160) +
                (d.translation.length > 160 ? "..." : ""),
              reference: d.reference,
              arabic: d.arabic,
              action: () => {
                selectDuaCategory(cat.id);
                navigate("duas");
              },
            });
          }
        }
      }
    }

    return out.slice(0, 60);
  }, [localQuery, scope, selectBook, selectDuaCategory, selectHadithCollection, selectSurah]);

  const counts = useMemo(() => {
    return {
      quran: results.filter((r) => r.type === "quran").length,
      hadith: results.filter((r) => r.type === "hadith").length,
      books: results.filter((r) => r.type === "books").length,
      duas: results.filter((r) => r.type === "duas").length,
    };
  }, [results]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  const typeIcon = {
    quran: BookOpen,
    hadith: Library,
    books: Library,
    duas: Hand,
  };

  const typeColor = {
    quran: "bg-emerald-soft text-emerald",
    hadith: "bg-gold-soft text-accent-foreground",
    books: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    duas: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <StarMark className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Global Search
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search across the Quran, Hadith, Library, and Duas
        </p>
      </div>

      {/* Search input */}
      <form onSubmit={handleSearch} className="relative mb-4">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search for verses, hadith, books, or duas..."
          className="h-14 rounded-full border-border/60 bg-card pl-12 pr-4 text-base shadow-sm focus-visible:ring-emerald"
          autoFocus
        />
      </form>

      {/* Scope tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-1.5">
        {[
          { id: "all" as Scope, label: "All", count: results.length },
          { id: "quran" as Scope, label: "Quran", count: counts.quran },
          { id: "hadith" as Scope, label: "Hadith", count: counts.hadith },
          { id: "books" as Scope, label: "Books", count: counts.books },
          { id: "duas" as Scope, label: "Duas", count: counts.duas },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setScope(tab.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              scope === tab.id
                ? "border-emerald bg-emerald-soft text-emerald"
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
        ))}
      </div>

      {/* Results */}
      {!localQuery.trim() ? (
        <Card className="flex flex-col items-center gap-3 border-dashed border-border/60 bg-muted/20 p-12 text-center">
          <SearchIcon className="h-12 w-12 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">Start searching</p>
            <p className="text-sm text-muted-foreground">
              Enter a keyword to search across all Islamic content.
            </p>
          </div>
        </Card>
      ) : results.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 border-dashed border-border/60 bg-muted/20 p-12 text-center">
          <SearchX className="h-12 w-12 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No results found</p>
            <p className="text-sm text-muted-foreground">
              Try different keywords or broaden your search scope.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Found{" "}
            <span className="font-semibold text-foreground">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "result" : "results"} for &ldquo;
            <span className="font-semibold text-emerald">{localQuery}</span>
            &rdquo;
          </p>
          <div className="space-y-3">
            {results.map((r, i) => {
              const Icon = typeIcon[r.type];
              return (
                <motion.button
                  key={`${r.type}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  onClick={r.action}
                  className="group block w-full text-left"
                >
                  <Card className="border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          typeColor[r.type]
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-semibold text-foreground group-hover:text-emerald">
                            {r.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="shrink-0 capitalize"
                          >
                            {r.type}
                          </Badge>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {r.subtitle}
                        </p>
                        {r.arabic && (
                          <p className="mt-2 text-right font-arabic text-lg leading-loose text-foreground">
                            {r.arabic}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {r.excerpt}
                        </p>
                        <p className="mt-2 flex items-center gap-1 text-xs text-gold">
                          <Hash className="h-3 w-3" />
                          {r.reference}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.button>
              );
            })}
          </div>
        </>
      )}

      <StarDivider className="mt-10" />
    </div>
  );
}
