"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  BookOpenCheck,
  Coins,
  Droplet,
  Hand,
  Hash,
  Heart,
  Map as MapIcon,
  Moon,
  Scale,
  Search,
  Sparkles,
  Stethoscope,
  User,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  fatwaCategories,
  fatawaData,
  type Fatwa,
  type FatwaCategory,
} from "@/lib/data/fatawa";
import { StarMark, StarDivider, StarLattice } from "./star-mark";
import { ShareButton } from "./share-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* Map category icon string -> lucide icon component. */
const categoryIconMap: Record<string, LucideIcon> = {
  droplet: Droplet,
  hand: Hand,
  moon: Moon,
  coins: Coins,
  map: MapIcon,
  scale: Scale,
  heart: Heart,
  utensils: Utensils,
  stethoscope: Stethoscope,
  "book-open": BookOpen,
  users: Users,
};

// Resolve icon components once at module scope so they remain stable references
// (avoids the react-hooks/static-components rule firing during render).
const categoriesWithIcons = fatwaCategories.map((c) => ({
  ...c,
  Icon: categoryIconMap[c.icon] ?? BookOpen,
}));

const categoryMetaById = new Map(
  categoriesWithIcons.map((c) => [c.id, c] as const)
);

export function FatawaView() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FatwaCategory | "all">(
    "all"
  );

  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  /* Per-category counts for the filter pills. */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: fatawaData.length };
    for (const cat of fatwaCategories) {
      counts[cat.id] = fatawaData.filter((f) => f.category === cat.id).length;
    }
    return counts;
  }, []);

  /* Filter the fatawa by query + active category. */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fatawaData.filter((f) => {
      if (activeCategory !== "all" && f.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.scholar.toLowerCase().includes(q) ||
        f.topic.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.source.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* ---------------------------- Hero header --------------------------- */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-gradient relative overflow-hidden rounded-3xl border border-emerald/20 p-6 sm:p-10"
      >
        <StarLattice className="opacity-[0.06]" />
        {/* Slowly-rotating star mark in the corner */}
        <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.08] sm:right-6 sm:top-6">
          <StarMark className="h-32 w-32 animate-slow-spin sm:h-44 sm:w-44" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="font-arabic-display text-gradient-emerald text-5xl leading-tight sm:text-6xl">
            الفتاوى
          </p>
          <StarDivider className="my-4 w-full max-w-md" />
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Islamic Rulings &amp; Scholarly Answers
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Browse authentic rulings from qualified scholars, organized by
            topic.
          </p>
          <Badge
            variant="secondary"
            className="mt-4 gap-1 border-gold/30 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content
          </Badge>
        </div>
      </motion.header>

      {/* ------------------------------- Search ----------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mt-6"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rulings, scholars, topics…"
          aria-label="Search fatawa"
          className="h-11 rounded-full border-border/60 bg-card pl-11 pr-4 text-sm shadow-sm focus-visible:ring-emerald/40"
        />
      </motion.div>

      {/* --------------------------- Category pills ------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        <CategoryPill
          label="All"
          count={categoryCounts.all}
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        {categoriesWithIcons.map((cat) => (
          <CategoryPill
            key={cat.id}
            label={cat.name}
            icon={cat.Icon}
            count={categoryCounts[cat.id] ?? 0}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </motion.div>

      {/* ------------------------------ Fatawa list ------------------------- */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07 },
            },
          }}
          className="mx-auto mt-6 flex max-w-3xl flex-col gap-4"
        >
          {filtered.map((fatwa) => {
            const favId = fatwa.id; // already in "fatwa-N" format
            const isFav = favorites.includes(favId);
            return (
              <motion.div
                key={fatwa.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
              >
                <FatwaCard
                  fatwa={fatwa}
                  favorited={isFav}
                  onToggleFavorite={() => toggleFavorite(favId)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Footer note */}
      <StarDivider className="mx-auto mt-10 max-w-md" />
      <p className="mx-auto mt-2 max-w-xl text-center text-xs italic text-muted-foreground">
        The rulings above are curated demo content for educational purposes.
        For personal rulings, consult a qualified local scholar.
      </p>
    </div>
  );
}

/* --------------------------- Category pill ---------------------------- */

function CategoryPill({
  label,
  icon: Icon,
  count,
  active,
  onClick,
}: {
  label: string;
  icon?: LucideIcon;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-emerald bg-emerald text-primary-foreground shadow-sm"
          : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:bg-emerald-soft/40 hover:text-emerald"
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
      <span
        className={cn(
          "ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold",
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ----------------------------- Fatwa card ----------------------------- */

function FatwaCard({
  fatwa,
  favorited,
  onToggleFavorite,
}: {
  fatwa: Fatwa;
  favorited: boolean;
  onToggleFavorite: () => void;
}) {
  const categoryMeta = categoryMetaById.get(fatwa.category);
  const Icon = categoryMeta?.Icon ?? BookOpen;

  return (
    <Card
      className={cn(
        "card-refined group relative overflow-hidden rounded-2xl border-border/60 bg-card p-4 sm:p-6"
      )}
    >
      {/* Action buttons: favorite + share (top-right) */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={
            favorited ? "Remove fatwa from favorites" : "Add fatwa to favorites"
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
            title: `Fatwa — ${fatwa.topic}`,
            text: fatwa.answer,
            arabic: fatwa.scholarArabic,
            reference: `${fatwa.scholar} — ${fatwa.source}, ${fatwa.reference}`,
          }}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/60 text-muted-foreground/60 backdrop-blur hover:bg-background hover:text-foreground"
        />
      </div>

      {/* Top row: icon tile + topic + category badge */}
      <div className="mb-4 flex items-center gap-3 pr-20">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald to-emerald/70 opacity-95 shadow-sm" />
          <Icon className="relative z-10 h-5 w-5 text-primary-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {fatwa.topic}
          </h3>
        </div>
        <Badge
          variant="outline"
          className="shrink-0 gap-1 border-emerald/30 bg-emerald-soft/50 text-[11px] text-emerald"
        >
          {fatwa.category}
        </Badge>
      </div>

      {/* Question block */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          Question
        </p>
        <p className="mt-1 font-medium leading-relaxed text-foreground">
          {fatwa.question}
        </p>
      </div>

      {/* Divider */}
      <StarDivider className="my-3" />

      {/* Answer / Ruling block — primary content */}
      <div>
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald">
          <BookOpenCheck className="h-3.5 w-3.5" />
          Ruling
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground sm:text-base">
          {fatwa.answer}
        </p>
      </div>

      {/* Source attribution section */}
      <div className="mt-4 border-t border-border/40 pt-3">
        {/* Scholar row */}
        <div className="flex items-start justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <User className="h-3.5 w-3.5 text-emerald/70" />
            {fatwa.scholar}
          </p>
          {fatwa.scholarArabic && (
            <p className="text-right font-arabic text-lg leading-tight text-emerald">
              {fatwa.scholarArabic}
            </p>
          )}
        </div>

        {/* Source + Reference */}
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-emerald/70" />
            {fatwa.source}
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-gold">
            <Hash className="h-3 w-3 shrink-0" />
            {fatwa.reference}
          </p>
        </div>
      </div>

      {/* Disclaimer note */}
      <p className="mt-3 text-xs italic text-muted-foreground">
        For personal rulings, consult a qualified local scholar.
      </p>
    </Card>
  );
}

/* ----------------------------- Empty state ---------------------------- */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border-dashed border-border/70 bg-card/50 p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-soft/60">
          <Search className="h-6 w-6 text-emerald" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          No rulings found
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Try a different search term or category. The fatawa library covers
          purification, prayer, fasting, zakat, hajj, transactions, and more.
        </p>
      </Card>
    </motion.div>
  );
}

export default FatawaView;
