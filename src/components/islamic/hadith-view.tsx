"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookMarked,
  BookOpen,
  ChevronLeft,
  Hash,
  Heart,
  Library,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { hadithCollections } from "@/lib/data/hadith";
import type { Hadith, HadithCollection } from "@/lib/types";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Color styles per grade. Sahih -> emerald, Hasan -> gold, Daif -> red.
const gradeStyles: Record<Hadith["grade"], string> = {
  Sahih: "border-emerald/30 bg-emerald-soft text-emerald",
  Hasan: "border-gold/30 bg-gold-soft text-accent-foreground",
  Daif:
    "border-red-300 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300",
};

export function HadithView() {
  const selectedCollectionId = useAppStore(
    (s) => s.selectedHadithCollectionId
  );

  // Smooth scroll to top whenever the selected collection changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCollectionId]);

  const collection = selectedCollectionId
    ? hadithCollections.find((c) => c.id === selectedCollectionId)
    : undefined;

  if (!collection) return <CollectionsList />;
  return <HadithList key={collection.id} collection={collection} />;
}

/* --------------------------- Collections list -------------------------- */

function CollectionsList() {
  const selectCollection = useAppStore((s) => s.selectHadithCollection);

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
            <Library className="h-7 w-7 text-emerald" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Hadith Collections
          </h1>
          <p className="mt-1 font-arabic text-3xl leading-tight text-emerald sm:text-4xl">
            كتب الحديث
          </p>
          <StarDivider className="my-4 w-full max-w-md" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Prophetic traditions authentically preserved. Explore curated
            selections from the four major Sunni hadith compilations.
          </p>
          <Badge
            variant="secondary"
            className="mt-3 gap-1 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content — curated hadiths
          </Badge>
        </div>
      </motion.header>

      {/* Collections grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {hadithCollections.map((c) => (
          <CollectionCard
            key={c.id}
            collection={c}
            onBrowse={() => selectCollection(c.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function CollectionCard({
  collection,
  onBrowse,
}: {
  collection: HadithCollection;
  onBrowse: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      <Card className="group relative h-full overflow-hidden rounded-2xl border-border/60 bg-card p-5 transition-all hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg sm:p-6">
        {/* Decorative book-spine watermark */}
        <div className="pointer-events-none absolute -right-8 -top-8 opacity-[0.06]">
          <BookMarked className="h-36 w-36 text-emerald" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald/70 text-primary-foreground shadow-sm">
              <BookMarked className="h-6 w-6" />
            </div>
            <p className="font-arabic text-3xl leading-none text-emerald">
              {collection.nameArabic}
            </p>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {collection.name}
          </h3>

          {/* Stats */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="gap-1 bg-emerald-soft text-emerald"
            >
              <BookOpen className="h-3 w-3" />
              {collection.bookCount} books
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-gold-soft text-accent-foreground"
            >
              <Hash className="h-3 w-3" />
              {collection.hadithCount.toLocaleString()} hadiths
            </Badge>
          </div>

          {/* Description */}
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {collection.description}
          </p>

          {/* Sample badge */}
          <Badge
            variant="outline"
            className="mt-3 w-fit gap-1 border-gold/30 text-[10px] text-accent-foreground"
          >
            <Sparkles className="h-2.5 w-2.5" />
            {collection.hadiths.length} sample hadiths
          </Badge>

          {/* Browse button */}
          <Button
            onClick={onBrowse}
            className="mt-5 w-full rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
            size="sm"
          >
            <ScrollText className="mr-1.5 h-4 w-4" />
            Browse {collection.hadiths.length} hadiths
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

/* ----------------------------- Hadith list ---------------------------- */

function HadithList({ collection }: { collection: HadithCollection }) {
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favorites = useAppStore((s) => s.favorites);

  // Back to the collections list by clearing the store selection.
  const goBack = () =>
    useAppStore.setState({ selectedHadithCollectionId: null });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Sticky toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-20 -mx-4 mb-5 flex items-center justify-between border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6"
      >
        <Button
          onClick={goBack}
          variant="ghost"
          size="sm"
          className="rounded-full text-emerald hover:bg-emerald-soft/40 hover:text-emerald"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Collections
        </Button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Library className="h-3.5 w-3.5" />
          <span className="font-medium">{collection.name}</span>
          <span className="text-border">·</span>
          <span>{collection.hadiths.length} hadiths</span>
        </div>
      </motion.div>

      {/* Collection header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden rounded-3xl border-emerald/30 bg-gradient-to-br from-emerald to-emerald/80 p-6 text-primary-foreground shadow-lg sm:p-8">
          <div className="absolute inset-0 star-lattice opacity-[0.12]" />
          <div className="absolute -right-6 -top-6 opacity-15">
            <StarMark className="h-32 w-32" showGold={false} />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium uppercase tracking-wider">
              Hadith Collection
            </span>
            <p className="mt-4 font-arabic text-5xl leading-tight text-primary-foreground sm:text-6xl">
              {collection.nameArabic}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              {collection.name}
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-primary-foreground/80">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {collection.bookCount} books
              </span>
              <span className="text-primary-foreground/40">·</span>
              <span className="inline-flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {collection.hadithCount.toLocaleString()} hadiths
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        {collection.description}
      </motion.p>

      {/* Hadiths */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="mt-6 space-y-4"
      >
        {collection.hadiths.map((hadith) => {
          const favId = `hadith-${collection.id}-${hadith.number}`;
          const isFav = favorites.includes(favId);
          return (
            <motion.div
              key={hadith.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <HadithCard
                hadith={hadith}
                favorited={isFav}
                onToggleFavorite={() => toggleFavorite(favId)}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* End divider + back button */}
      <StarDivider className="my-8" />
      <div className="flex justify-center">
        <Button
          onClick={goBack}
          variant="outline"
          className="rounded-full border-emerald/30 text-emerald hover:bg-emerald-soft/40"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all collections
        </Button>
      </div>
    </div>
  );
}

function HadithCard({
  hadith,
  favorited,
  onToggleFavorite,
}: {
  hadith: Hadith;
  favorited: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/60 bg-card p-4 transition-all hover:border-emerald/30 hover:shadow-md sm:p-6">
      {/* Favorite button */}
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={
          favorited ? "Remove hadith from favorites" : "Add hadith to favorites"
        }
        aria-pressed={favorited}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur transition-all hover:scale-110 hover:bg-background"
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

      {/* Top row: number + grade */}
      <div className="mb-3 flex items-center gap-3 pr-10">
        {/* Hadith number badge — emerald circle */}
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald to-emerald/70 opacity-95 shadow-sm" />
          <span className="relative z-10 text-[11px] font-bold text-primary-foreground">
            {hadith.number}
          </span>
        </div>
        <Badge
          variant="outline"
          className={cn("gap-1 text-[11px]", gradeStyles[hadith.grade])}
        >
          <Sparkles className="h-2.5 w-2.5" />
          {hadith.grade}
        </Badge>
      </div>

      {/* Arabic */}
      <p className="text-right font-arabic text-xl leading-loose text-foreground sm:text-2xl">
        {hadith.arabic}
      </p>

      <StarDivider className="my-3" />

      {/* English translation */}
      <p className="text-base leading-relaxed text-foreground">
        {hadith.english}
      </p>

      {/* Narrator */}
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground/80">Narrated by:</span>{" "}
        <span className="italic">{hadith.narrator}</span>
      </p>

      {/* Reference */}
      {(hadith.book || hadith.chapter) && (
        <div className="mt-3 flex flex-col gap-1.5 border-t border-border/40 pt-3 text-xs text-muted-foreground">
          {hadith.book && (
            <p className="inline-flex items-start gap-1.5">
              <BookOpen className="mt-0.5 h-3 w-3 shrink-0 text-emerald/70" />
              <span>{hadith.book}</span>
            </p>
          )}
          {hadith.chapter && (
            <p className="inline-flex items-start gap-1.5">
              <ScrollText className="mt-0.5 h-3 w-3 shrink-0 text-emerald/70" />
              <span>{hadith.chapter}</span>
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
