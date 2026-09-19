"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  Hash,
  Heart,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { quranData } from "@/lib/data/quran";
import type { Ayah, Surah } from "@/lib/types";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BASMALA_ARABIC = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
const BASMALA_TRANSLATION =
  "In the name of Allah, the Entirely Merciful, the Especially Merciful.";

export function QuranView() {
  const selectedSurahId = useAppStore((s) => s.selectedSurahId);

  // Smooth scroll to top whenever the selected surah changes (open or back).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedSurahId]);

  const surah =
    selectedSurahId != null
      ? quranData.find((s) => s.id === selectedSurahId)
      : undefined;

  if (!surah) return <SurahList />;
  return <SurahReading key={surah.id} surah={surah} />;
}

/* ----------------------------- Surah list ----------------------------- */

function SurahList() {
  const selectSurah = useAppStore((s) => s.selectSurah);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return quranData;
    return quranData.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.englishName.toLowerCase().includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        s.nameArabic.includes(query.trim()) ||
        String(s.id) === q
    );
  }, [query]);

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
            <BookOpen className="h-7 w-7 text-emerald" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            The Holy Quran
          </h1>
          <p className="mt-1 font-arabic text-3xl leading-tight text-emerald sm:text-4xl">
            القرآن الكريم
          </p>
          <StarDivider className="my-4 w-full max-w-md" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Read selected surahs with Arabic text, transliteration, and English
            translation. Tap any surah to begin your recitation.
          </p>
          <Badge
            variant="secondary"
            className="mt-3 gap-1 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content — curated surahs
          </Badge>
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
          placeholder="Search surah by name or number…"
          aria-label="Search surahs"
          className="h-11 rounded-full border-border/60 bg-card pl-10 pr-4 text-sm shadow-sm focus-visible:ring-emerald/30"
        />
      </motion.div>

      {/* Count */}
      <p className="mt-4 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {filtered.length}
        </span>{" "}
        {filtered.length === 1 ? "surah" : "surahs"}
      </p>

      {/* Surah grid */}
      {filtered.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center justify-center gap-3 border-dashed border-border/60 bg-muted/20 p-10 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No surahs found</p>
            <p className="text-sm text-muted-foreground">
              Try a different name, number, or translation.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-1 rounded-full border-emerald/30 text-emerald"
            onClick={() => setQuery("")}
          >
            Clear search
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
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((surah) => (
            <SurahCard
              key={surah.id}
              surah={surah}
              onOpen={() => selectSurah(surah.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function SurahCard({ surah, onOpen }: { surah: Surah; onOpen: () => void }) {
  const isMeccan = surah.revelationType === "Meccan";
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="group relative flex w-full items-stretch gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/40"
    >
      {/* Number badge — rounded square with gradient emerald bg + star watermark */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald to-emerald/70 shadow-md">
        <StarMark className="absolute h-12 w-12 opacity-25" />
        <span className="relative z-10 text-lg font-bold text-primary-foreground">
          {surah.id}
        </span>
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">
              {surah.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {surah.translation}
            </p>
          </div>
          <p className="shrink-0 font-arabic text-2xl leading-none text-emerald">
            {surah.nameArabic}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "gap-1 text-[10px]",
              isMeccan
                ? "bg-gold-soft text-accent-foreground"
                : "bg-emerald-soft text-emerald"
            )}
          >
            <MapPin className="h-2.5 w-2.5" />
            {surah.revelationType}
          </Badge>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Hash className="h-3 w-3" />
            {surah.ayahCount} ayahs
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* --------------------------- Surah reading ---------------------------- */

function SurahReading({ surah }: { surah: Surah }) {
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favorites = useAppStore((s) => s.favorites);

  // Back to the surah list by clearing the store selection.
  const goBack = () => useAppStore.setState({ selectedSurahId: null });

  // Show the basmala header for every surah EXCEPT Al-Fatihah (id 1), whose
  // first ayah IS the basmala. (Surah 9 At-Tawbah is not in demo data.)
  const showBasmala = surah.id !== 1;

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
          All Surahs
        </Button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" />
          <span className="font-medium">Surah {surah.id}</span>
          <span className="text-border">·</span>
          <span>{surah.ayahCount} ayahs</span>
        </div>
      </motion.div>

      {/* Surah header card */}
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
              Surah {surah.id} · {surah.revelationType}
            </span>
            <p className="mt-4 font-arabic text-5xl leading-tight text-primary-foreground sm:text-6xl">
              {surah.nameArabic}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{surah.name}</h2>
            <p className="text-sm text-primary-foreground/80">
              {surah.translation}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-primary-foreground/80">
              <span className="inline-flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {surah.ayahCount} ayahs
              </span>
              <span className="text-primary-foreground/40">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {surah.revelationType}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Bismillah */}
      {showBasmala && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6"
        >
          <Card className="rounded-2xl border-gold/30 bg-gradient-to-br from-gold-soft/40 to-card p-5 text-center sm:p-6">
            <p className="font-arabic text-2xl leading-loose text-foreground sm:text-3xl">
              {BASMALA_ARABIC}
            </p>
            <p className="mt-2 text-xs italic text-muted-foreground">
              {BASMALA_TRANSLATION}
            </p>
          </Card>
        </motion.div>
      )}

      {/* Ayahs */}
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
        className="mt-6 space-y-3"
      >
        {surah.ayahs.map((ayah) => {
          const favId = `ayah-${surah.id}-${ayah.number}`;
          const isFav = favorites.includes(favId);
          return (
            <motion.div
              key={ayah.number}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <AyahRow
                ayah={ayah}
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
          Back to all surahs
        </Button>
      </div>
    </div>
  );
}

function AyahRow({
  ayah,
  favorited,
  onToggleFavorite,
}: {
  ayah: Ayah;
  favorited: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Card className="group relative rounded-2xl border-border/60 bg-card p-4 transition-all hover:border-emerald/30 hover:shadow-md sm:p-5">
      {/* Favorite button */}
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={favorited ? "Remove ayah from favorites" : "Add ayah to favorites"}
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

      <div className="flex items-start gap-3 pr-10">
        {/* Circular ayah number badge */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-gold/70 opacity-95 shadow-sm" />
          <span className="relative z-10 text-xs font-bold text-primary-foreground">
            {ayah.number}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Arabic */}
          <p className="text-right font-arabic text-2xl leading-loose text-foreground sm:text-3xl">
            {ayah.arabic}
          </p>

          {/* Transliteration */}
          <p className="mt-2 text-sm italic text-muted-foreground">
            {ayah.transliteration}
          </p>

          {/* Translation */}
          <p className="mt-2 text-base leading-relaxed text-foreground">
            {ayah.translation}
          </p>
        </div>
      </div>
    </Card>
  );
}
