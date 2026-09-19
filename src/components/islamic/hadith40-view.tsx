"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  Heart,
  Library,
  ScrollText,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { fortyHadith } from "@/lib/data/forty-hadith";
import type { NawawiHadith } from "@/lib/data/forty-hadith";
import { StarMark, StarDivider, StarLattice } from "./star-mark";
import { ShareButton } from "./share-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Grade visual styles. Sahih family -> emerald, Hasan family -> gold.
 * "Sahih (Agreed Upon)" gets a Check icon to highlight its highest rank.
 */
type GradeStyle = {
  className: string;
  icon?: typeof Check;
};

const gradeStyles: Record<string, GradeStyle> = {
  "Sahih (Agreed Upon)": {
    className: "border-emerald/30 bg-emerald-soft text-emerald",
    icon: Check,
  },
  Sahih: {
    className: "border-emerald/30 bg-emerald-soft text-emerald",
  },
  "Hasan Sahih": {
    className: "border-gold/30 bg-gold-soft text-accent-foreground",
  },
  Hasan: {
    className: "border-gold/30 bg-gold-soft text-accent-foreground",
  },
};

function getGradeStyle(grade: string): GradeStyle {
  return gradeStyles[grade] ?? gradeStyles.Sahih;
}

export function Hadith40View() {
  const favorites = useAppStore((s) => s.favorites);

  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const arabicQ = query.trim();
    return fortyHadith.filter((h) => {
      if (favoritesOnly && !favorites.includes(`nawawi-${h.number}`)) {
        return false;
      }
      if (!q) return true;
      return (
        String(h.number) === q ||
        h.title.toLowerCase().includes(q) ||
        h.english.toLowerCase().includes(q) ||
        h.narrator.toLowerCase().includes(q) ||
        h.arabic.includes(arabicQ)
      );
    });
  }, [query, favoritesOnly, favorites]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* ----------------------------------------------------------------- */}
      {/* Hero header                                                       */}
      {/* ----------------------------------------------------------------- */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-emerald/20 hero-gradient p-6 sm:p-10"
      >
        <StarLattice className="opacity-[0.06]" />

        {/* Decorative slowly-rotating StarMark in the corner */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 opacity-[0.08]">
          <div className="animate-slow-spin">
            <StarMark className="h-full w-full" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft">
            <ScrollText className="h-7 w-7 text-emerald" />
          </div>
          <h1 className="mt-4 font-arabic-display text-4xl leading-tight text-emerald sm:text-5xl md:text-6xl">
            الأربعون النووية
          </h1>
          <StarDivider className="my-4 w-full max-w-md" />
          <p className="text-base font-semibold text-foreground sm:text-lg">
            The Forty Hadith of Imam An-Nawawi
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A celebrated compilation of foundational hadiths covering the
            essentials of Islam, compiled by Imam Yahya ibn Sharaf an-Nawawi.
          </p>
          <Badge
            variant="secondary"
            className="mt-4 gap-1 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content
          </Badge>
        </div>
      </motion.header>

      {/* ----------------------------------------------------------------- */}
      {/* Search                                                            */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="relative mt-6"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by number, title, narrator, Arabic or English…"
          aria-label="Search the Forty Hadith of Imam An-Nawawi"
          className="h-11 rounded-full border-border/60 bg-card pl-10 pr-4 text-sm shadow-sm focus-visible:ring-emerald/30"
        />
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* Sticky-ish filter / sort bar                                     */}
      {/* ----------------------------------------------------------------- */}
      <div className="sticky top-0 z-20 mt-4 -mx-4 flex items-center justify-between gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <Library className="h-4 w-4 text-emerald/80" />
          <span className="font-medium text-foreground">
            {filtered.length}
          </span>
          <span>
            {filtered.length === 1 ? "Hadith" : "Hadiths"}
            {!favoritesOnly && " of 42"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setFavoritesOnly((v) => !v)}
          aria-pressed={favoritesOnly}
          aria-label={
            favoritesOnly ? "Show all hadiths" : "Show only favorited hadiths"
          }
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
            favoritesOnly
              ? "border-gold/40 bg-gold-soft text-gold"
              : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-foreground"
          )}
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5",
              favoritesOnly && "fill-gold text-gold"
            )}
          />
          <span className="hidden sm:inline">
            {favoritesOnly ? "Favorites only" : "Favorites"}
          </span>
          <span className="sm:hidden">Favs</span>
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Hadith list                                                       */}
      {/* ----------------------------------------------------------------- */}
      {filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center justify-center gap-3 border-dashed border-border/60 bg-muted/20 p-10 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No hadiths found</p>
            <p className="text-sm text-muted-foreground">
              {favoritesOnly
                ? "You haven't favorited any hadith matching this search yet."
                : "Try a different keyword, number, or narrator."}
            </p>
          </div>
        </Card>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="mx-auto mt-6 flex max-w-3xl flex-col gap-4"
        >
          {filtered.map((hadith) => {
            const favId = `nawawi-${hadith.number}`;
            const isFav = favorites.includes(favId);
            return (
              <motion.div
                key={hadith.number}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
              >
                <NawawiCard hadith={hadith} favorited={isFav} favId={favId} />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <StarDivider className="mt-10" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Single hadith card                                                          */
/* -------------------------------------------------------------------------- */

function NawawiCard({
  hadith,
  favorited,
  favId,
}: {
  hadith: NawawiHadith;
  favorited: boolean;
  favId: string;
}) {
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const grade = getGradeStyle(hadith.grade);
  const GradeIcon = grade.icon;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 card-refined hover:border-emerald/30 sm:p-6">
      {/* Top row: number badge + title + favorite heart */}
      <div className="flex items-center gap-3 pr-10">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald to-emerald/70 shadow-sm" />
          <span className="relative z-10 text-sm font-bold text-primary-foreground">
            {hadith.number}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {hadith.title}
          </h3>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Hadith {hadith.number} of 42
          </p>
        </div>
      </div>

      {/* Action buttons — top right: favorite + share */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
        <button
          type="button"
          onClick={() => toggleFavorite(favId)}
          aria-label={
            favorited ? "Remove hadith from favorites" : "Add hadith to favorites"
          }
          aria-pressed={favorited}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur transition-all hover:scale-110 hover:bg-background"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              favorited
                ? "fill-gold text-gold"
                : "text-muted-foreground/60 group-hover:text-foreground"
            )}
          />
        </button>
        <ShareButton
          data={{
            title: `40 Hadith Nawawi #${hadith.number}: ${hadith.title}`,
            text: hadith.english,
            arabic: hadith.arabic,
            reference: `${hadith.reference} — Narrated by ${hadith.narrator}`,
          }}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/60 backdrop-blur text-muted-foreground/60 hover:bg-background hover:text-foreground"
        />
      </div>

      {/* Grade badge */}
      <div className="mt-3">
        <Badge
          variant="outline"
          className={cn("gap-1 text-[11px]", grade.className)}
        >
          {GradeIcon ? (
            <GradeIcon className="h-3 w-3" />
          ) : (
            <Sparkles className="h-2.5 w-2.5" />
          )}
          {hadith.grade}
        </Badge>
      </div>

      {/* Arabic block */}
      <div className="mt-4 rounded-xl bg-emerald-soft/30 p-4">
        <p className="text-right font-arabic text-xl leading-loose text-foreground sm:text-2xl">
          {hadith.arabic}
        </p>
      </div>

      <StarDivider className="my-3" />

      {/* English translation */}
      <p className="text-base leading-relaxed text-foreground">
        {hadith.english}
      </p>

      {/* Narrator */}
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <User className="h-3.5 w-3.5 shrink-0 text-emerald/70" />
        <span className="font-medium text-foreground/80">Narrated by:</span>
        <span className="italic">{hadith.narrator}</span>
      </p>

      {/* Reference */}
      <div className="mt-3 flex flex-col gap-1.5 border-t border-border/40 pt-3">
        <p className="inline-flex items-start gap-1.5 text-xs text-gold">
          <BookOpen className="mt-0.5 h-3 w-3 shrink-0" />
          <span>{hadith.reference}</span>
        </p>
      </div>
    </Card>
  );
}
