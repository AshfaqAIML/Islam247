"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  Hash,
  Heart,
  RotateCcw,
  ScrollText,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  awradSections,
  awradVirtue,
  type AwradItem,
  type AwradSection,
} from "@/lib/data/awrad";
import { StarMark, StarDivider, StarLattice } from "./star-mark";
import { ShareButton } from "./share-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type AwradItemType = AwradItem["type"];

// Color-coded type styling. Each type gets distinct emerald/gold tonal pairing.
const typeConfig: Record<
  AwradItemType,
  {
    label: string;
    badge: string;
    icon: typeof Hash;
  }
> = {
  quran: {
    label: "Quran",
    badge: "bg-emerald-soft text-emerald",
    icon: BookOpen,
  },
  dhikr: {
    label: "Dhikr",
    badge: "bg-gold-soft text-gold",
    icon: Hash,
  },
  dua: {
    label: "Du'a",
    badge: "bg-emerald-soft/70 text-emerald",
    icon: ScrollText,
  },
  salawat: {
    label: "Salawat",
    badge: "bg-gold-soft/70 text-gold",
    icon: Star,
  },
  name: {
    label: "Name",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    icon: Sparkles,
  },
};

export function AwradView() {
  const [query, setQuery] = useState("");

  const totalItems = useMemo(
    () => awradSections.reduce((sum, s) => sum + s.items.length, 0),
    []
  );

  // Filter sections based on the search query.
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return awradSections;
    return awradSections
      .map((section) => {
        const matchesSectionTitle =
          section.title.toLowerCase().includes(q) ||
          section.titleArabic.includes(q);
        const items = section.items.filter((item) => {
          return (
            item.arabic.includes(q) ||
            item.transliteration.toLowerCase().includes(q) ||
            item.translation.toLowerCase().includes(q) ||
            item.reference.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
          );
        });
        if (matchesSectionTitle && items.length === 0) {
          // Keep all items when only the section title matches.
          return { ...section, items: section.items };
        }
        if (items.length === 0) return null;
        return { ...section, items };
      })
      .filter((s): s is AwradSection => s !== null);
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const isEmpty = filteredSections.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* ----------------------------- Hero header ----------------------------- */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-gradient relative overflow-hidden rounded-3xl border border-emerald/20 p-6 text-center sm:p-10"
      >
        <StarLattice className="opacity-[0.07]" />
        {/* Slowly rotating star in corner */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-[0.08] sm:right-4 sm:top-4 sm:h-44 sm:w-44">
          <StarMark className="h-full w-full animate-slow-spin" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Badge
            variant="secondary"
            className="mb-3 gap-1 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content
          </Badge>

          <h1 className="font-arabic-display text-5xl leading-tight text-emerald sm:text-6xl">
            أورد الفتح
          </h1>

          <StarDivider className="my-4 w-full max-w-md" />

          <p className="text-lg font-semibold text-foreground sm:text-xl">
            Awrad al-Fatiha — The Litany of Ameer Kabir
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The daily wird of <strong>Ameer Kabir Mir Syed Ali Hamadani</strong>{" "}
            (RA) (1314–1384 CE), the great Kubrawi Sufi master who spread Islam
            in Kashmir. Recited daily in mosques across Kashmir after the Fajr
            and Maghrib prayers — a treasure of the people of Kashmir passed
            down through generations.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ScrollText className="h-3.5 w-3.5 text-emerald" />
              {awradSections.length} sections
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-gold" />
              {totalItems} litanies
            </span>
          </div>
        </div>
      </motion.header>

      {/* ------------------------------ Virtue card ------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mt-6 rounded-2xl border border-gold/20 bg-gold-soft/10 p-5 sm:p-6"
      >
        <div className="flex items-center gap-2 text-gold">
          <Sparkles className="h-4 w-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            The Virtue of the Awrad
          </h2>
        </div>
        <div className="mt-3 space-y-3">
          {awradVirtue.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-accent-foreground/90 sm:text-[0.95rem]"
            >
              {para}
            </p>
          ))}
        </div>
      </motion.div>

      {/* ------------------------------ Search bar ------------------------------ */}
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the Awrad by Arabic, transliteration, meaning, or reference…"
          className="h-12 rounded-full border-border/60 bg-card pl-11 pr-11 text-sm shadow-sm focus-visible:border-emerald/40 focus-visible:ring-emerald/20"
          aria-label="Search Awrad al-Fatiha"
        />
        {hasQuery && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ------------------------------ Empty state ------------------------------ */}
      {isEmpty && (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60">
            <Search className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            No litanies found
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            We couldn&apos;t find any item matching &ldquo;{query}&rdquo;. Try a
            different keyword or clear the search.
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-4 inline-flex items-center gap-1 rounded-full border border-emerald/30 px-4 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald-soft/40"
          >
            <X className="h-3.5 w-3.5" />
            Clear search
          </button>
        </div>
      )}

      {/* ------------------------------ Sections ------------------------------ */}
      {!isEmpty && (
        <div className="mt-8 flex flex-col gap-10">
          {filteredSections.map((section, sIdx) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <SectionHeader
                section={section}
                index={sIdx}
                totalSections={awradSections.length}
              />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-5 flex flex-col gap-5"
              >
                {section.items.map((item, i) => (
                  <AwradItemCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>

              {sIdx < filteredSections.length - 1 && (
                <StarDivider className="mt-10" />
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Section header ------------------------------ */

function SectionHeader({
  section,
  index,
  totalSections,
}: {
  section: AwradSection;
  index: number;
  totalSections: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-emerald/20 bg-gradient-to-br from-emerald-soft/40 to-gold-soft/30 p-5 sm:p-6"
    >
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 opacity-[0.08]">
        <StarMark className="h-full w-full" />
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald/80 text-sm font-bold text-primary-foreground shadow-sm">
            {section.order}
          </div>
          <div>
            <p className="text-right font-arabic text-2xl leading-tight text-emerald">
              {section.titleArabic}
            </p>
            <h2 className="mt-0.5 text-base font-bold text-foreground sm:text-lg">
              {section.title}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Section {index + 1} of {totalSections}
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="gap-1 bg-card text-foreground shadow-sm"
        >
          <ScrollText className="h-3 w-3 text-gold" />
          {section.items.length} {section.items.length === 1 ? "item" : "items"}
        </Badge>
      </div>
    </motion.div>
  );
}

/* ------------------------------ Awrad item card ------------------------------ */

function AwradItemCard({
  item,
  index,
}: {
  item: AwradItem;
  index: number;
}) {
  const duaCounts = useAppStore((s) => s.duaCounts);
  const incrementDua = useAppStore((s) => s.incrementDua);
  const resetDua = useAppStore((s) => s.resetDua);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const favId = `awrad-${item.id}`;
  const current = duaCounts[favId] || 0;
  const target = item.count;
  const isComplete = target > 0 && current >= target;
  const isFav = favorites.includes(favId);
  const progress = target > 0 ? Math.min(100, (current / target) * 100) : 100;
  const remaining = Math.max(0, target - current);

  const cfg = typeConfig[item.type];
  const TypeIcon = cfg.icon;

  // Progress-ring geometry (matches the masnoon-view ring for visual parity).
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div variants={itemVariants}>
      <Card className="card-refined overflow-hidden border-border/60 bg-card p-0">
        {/* Top bar: type + count + favorite + share */}
        <div className="flex items-start justify-between gap-3 border-b border-border/40 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className={cn("gap-1", cfg.badge)}>
              <TypeIcon className="h-3 w-3" />
              {cfg.label}
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-foreground/5 text-foreground"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-wide opacity-70">
                #
              </span>
              <span className="text-xs text-muted-foreground">{index + 1}</span>
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "gap-1 px-2.5 py-1 text-sm font-bold shadow-sm",
                isComplete
                  ? "bg-gold-soft text-gold"
                  : "bg-emerald-soft text-emerald"
              )}
              aria-label={`Recite ${target} times`}
            >
              <Hash className="h-3 w-3" />
              ×{target}
            </Badge>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => toggleFavorite(favId)}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gold-soft/40 hover:text-gold"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all",
                  isFav && "fill-gold text-gold"
                )}
              />
            </button>
            <ShareButton
              data={{
                title: `Awrad al-Fatiha — ${cfg.label}`,
                text: item.translation,
                arabic: item.arabic,
                reference: item.reference,
              }}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-muted-foreground hover:bg-emerald-soft/40 hover:text-emerald"
            />
          </div>
        </div>

        {/* Arabic highlighted block */}
        <div className="px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="rounded-xl bg-gradient-to-br from-emerald-soft/60 to-gold-soft/40 p-4 sm:p-5">
            <p
              dir="rtl"
              lang="ar"
              className="text-right font-arabic text-2xl leading-loose text-foreground sm:text-[1.75rem] sm:leading-[2.4]"
            >
              {item.arabic}
            </p>
          </div>
        </div>

        {/* Transliteration + translation + reference + note */}
        <div className="space-y-3 p-4 sm:p-5">
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            {item.transliteration}
          </p>
          <p className="text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
            {item.translation}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-gold">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span className="font-medium">{item.reference}</span>
          </p>

          {item.note && (
            <div className="flex gap-2 rounded-lg border border-gold/20 bg-gold-soft/30 p-3">
              <Sparkles className="h-4 w-4 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed text-accent-foreground/90">
                {item.note}
              </p>
            </div>
          )}

          {/* Counter */}
          <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-border/60 bg-muted/20 p-4 sm:flex-row sm:gap-6">
            {/* Progress ring + tap button */}
            <div className="relative h-24 w-24 shrink-0">
              <svg
                viewBox="0 0 96 96"
                className="h-full w-full -rotate-90"
                aria-hidden
              >
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  className="fill-none stroke-border"
                  strokeWidth="6"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  className={cn(
                    "fill-none transition-all duration-300",
                    isComplete ? "stroke-gold" : "stroke-emerald"
                  )}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <button
                onClick={() => incrementDua(favId)}
                aria-label={`Increment counter — ${remaining} of ${target} remaining`}
                className={cn(
                  "absolute inset-[10px] flex flex-col items-center justify-center rounded-full text-primary-foreground shadow-md transition-all active:scale-95",
                  isComplete
                    ? "bg-gradient-to-br from-gold to-gold/80"
                    : "bg-gradient-to-br from-emerald to-emerald/80"
                )}
              >
                {isComplete ? (
                  <Check className="h-7 w-7" strokeWidth={3} />
                ) : (
                  <>
                    <span className="text-2xl font-bold leading-none">
                      {current}
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide opacity-80">
                      tap
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Counter info */}
            <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
              <div className="flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "text-2xl font-bold",
                    isComplete ? "text-gold" : "text-foreground"
                  )}
                >
                  {current}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  / {target}
                </span>
              </div>
              {isComplete ? (
                <p className="flex items-center gap-1 text-sm font-semibold text-gold">
                  <Check className="h-4 w-4" />
                  Complete! May Allah accept.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {remaining} {remaining === 1 ? "recitation" : "recitations"}{" "}
                  remaining
                </p>
              )}
              <div className="flex w-full items-center gap-2">
                <Progress value={progress} className="h-1.5 flex-1" />
                <button
                  onClick={() => resetDua(favId)}
                  aria-label="Reset counter"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
