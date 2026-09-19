"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronLeft,
  Hand,
  Heart,
  Moon,
  Plane,
  RotateCcw,
  Shield,
  Sparkles,
  Sunrise,
  Utensils,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { duaCategories } from "@/lib/data/duas";
import type { Dua, DuaCategory } from "@/lib/types";
import { StarMark, StarDivider } from "./star-mark";
import { ShareButton } from "./share-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const categoryIconMap: Record<string, typeof Hand> = {
  sunrise: Sunrise,
  heart: Heart,
  moon: Moon,
  utensils: Utensils,
  plane: Plane,
  shield: Shield,
};

// Resolve icon components once at module scope so they remain stable references
// (avoids the react-hooks/static-components rule firing during render).
const categoriesWithIcons = duaCategories.map((c) => ({
  ...c,
  Icon: categoryIconMap[c.icon] ?? Hand,
}));

const categoryById = new Map(categoriesWithIcons.map((c) => [c.id, c]));

export function DuasView() {
  const selectedDuaCategoryId = useAppStore((s) => s.selectedDuaCategoryId);

  // Smooth scroll to top whenever the selection changes (open or back).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedDuaCategoryId]);

  const category =
    selectedDuaCategoryId != null
      ? categoryById.get(selectedDuaCategoryId)
      : undefined;

  if (!category) return <CategoryList />;
  return <DuaList key={category.id} category={category} />;
}

/* --------------------------- Category list ---------------------------- */

function CategoryList() {
  const selectDuaCategory = useAppStore((s) => s.selectDuaCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-emerald/20 bg-gradient-to-br from-emerald-soft via-background to-gold-soft p-6 sm:p-10"
      >
        <div className="star-lattice opacity-[0.06]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft">
            <Hand className="h-7 w-7 text-emerald" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Duas &amp; Azkar
          </h1>
          <p className="mt-1 font-arabic text-3xl leading-tight text-emerald sm:text-4xl">
            الأذكار والأدعية
          </p>
          <StarDivider className="my-4 w-full max-w-md" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Supplications and remembrances for every occasion — authentic
            adhkar from the Quran and Sunnah with transliteration, translation,
            and a built-in counter for the recommended number of repetitions.
          </p>
          <Badge
            variant="secondary"
            className="mt-3 gap-1 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content — authentic adhkar
          </Badge>
        </div>
      </motion.header>

      {/* Category grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categoriesWithIcons.map((cat) => {
          return (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              onClick={() => selectDuaCategory(cat.id)}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-left transition-all hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg"
            >
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 opacity-5 transition-opacity group-hover:opacity-10">
                <StarMark className="h-full w-full" />
              </div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald/70 text-primary-foreground shadow-sm">
                  <cat.Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-right font-arabic text-xl leading-tight text-emerald">
                    {cat.nameArabic}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cat.duas.length}{" "}
                    {cat.duas.length === 1 ? "dua" : "duas"}
                  </p>
                </div>
                <ChevronLeft className="mt-1 h-4 w-4 shrink-0 rotate-180 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald" />
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ----------------------------- Dua list ------------------------------- */

function DuaList({
  category,
}: {
  category: DuaCategory & { Icon: typeof Hand };
}) {
  const goBack = () =>
    useAppStore.setState({ selectedDuaCategoryId: null });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Toolbar */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          className="gap-1 rounded-full text-emerald hover:bg-emerald-soft/40"
        >
          <ChevronLeft className="h-4 w-4" />
          All categories
        </Button>
        <Badge variant="secondary" className="bg-emerald-soft text-emerald">
          {category.duas.length}{" "}
          {category.duas.length === 1 ? "dua" : "duas"}
        </Badge>
      </div>

      {/* Category header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-emerald/20 bg-gradient-to-br from-emerald to-emerald/80 p-6 text-primary-foreground shadow-md"
      >
        <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 opacity-10">
          <StarMark className="h-full w-full" showGold={false} />
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur">
            <category.Icon className="h-7 w-7" />
          </div>
          <div>
            <p className="text-right font-arabic text-2xl leading-tight">
              {category.nameArabic}
            </p>
            <h2 className="text-lg font-semibold sm:text-xl">{category.name}</h2>
            <p className="mt-0.5 text-xs text-primary-foreground/70">
              Authentic supplications from the Quran and Sunnah
            </p>
          </div>
        </div>
      </motion.div>

      {/* Dua cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 flex flex-col gap-5"
      >
        {category.duas.map((dua, i) => (
          <DuaCard key={dua.id} dua={dua} index={i} />
        ))}
      </motion.div>

      <StarDivider className="mt-8" />
      <div className="text-center">
        <Button
          variant="outline"
          onClick={goBack}
          className="rounded-full border-emerald/30 text-emerald hover:bg-emerald-soft/40"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all categories
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------ Dua card ------------------------------ */

function DuaCard({ dua, index }: { dua: Dua; index: number }) {
  const duaCounts = useAppStore((s) => s.duaCounts);
  const incrementDua = useAppStore((s) => s.incrementDua);
  const resetDua = useAppStore((s) => s.resetDua);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const current = duaCounts[dua.id] || 0;
  const target = dua.count;
  const isComplete = current >= target && target > 0;
  const isFav = favorites.includes(`dua-${dua.id}`);
  const progress = target > 0 ? Math.min(100, (current / target) * 100) : 100;

  const favId = `dua-${dua.id}`;

  // Progress-ring geometry
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-border/60 bg-card p-0">
        {/* Title row + favorite */}
        <div className="flex items-start justify-between gap-3 border-b border-border/40 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-soft text-sm font-semibold text-emerald">
              {index + 1}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold leading-tight text-foreground">
                {dua.title}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="gap-1 bg-emerald-soft text-emerald"
                >
                  <Sparkles className="h-3 w-3" />
                  Recite {target}×
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(favId)}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gold-soft/40 hover:text-gold"
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
              title: dua.title,
              text: dua.translation,
              arabic: dua.arabic,
              reference: dua.reference,
            }}
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-emerald-soft/40 hover:text-emerald"
          />
        </div>

        {/* Arabic text — highlighted */}
        <div className="px-5 pt-5">
          <div className="rounded-xl bg-gradient-to-br from-emerald-soft/60 to-gold-soft/40 p-4">
            <p className="text-right font-arabic text-xl leading-loose text-foreground sm:text-2xl">
              {dua.arabic}
            </p>
          </div>
        </div>

        <div className="space-y-3 p-5">
          {/* Transliteration */}
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            {dua.transliteration}
          </p>

          {/* Translation */}
          <p className="text-sm leading-relaxed text-foreground">
            {dua.translation}
          </p>

          {/* Reference */}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 text-emerald" />
            {dua.reference}
          </p>

          {/* Virtue */}
          {dua.virtue && (
            <div className="flex gap-2 rounded-lg border border-gold/20 bg-gold-soft/30 p-3">
              <Sparkles className="h-4 w-4 shrink-0 text-gold" />
              <p className="text-xs leading-relaxed text-accent-foreground">
                {dua.virtue}
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
                onClick={() => incrementDua(dua.id)}
                aria-label={`Increment counter for ${dua.title}`}
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
                  {target - current}{" "}
                  {target - current === 1 ? "recitation" : "recitations"}{" "}
                  remaining
                </p>
              )}
              <div className="flex w-full items-center gap-2">
                <Progress value={progress} className="h-1.5 flex-1" />
                <button
                  onClick={() => resetDua(dua.id)}
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
