"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Hash, Heart, Search, Sparkles, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  namesOfProphet,
  prophetNamesVirtue,
} from "@/lib/data/prophet-names";
import type { ProphetName } from "@/lib/data/prophet-names";
import { StarMark, StarDivider, StarLattice } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ProphetNamesView() {
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState<ProphetName | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return namesOfProphet;
    const arabicQuery = query.trim();
    return namesOfProphet.filter(
      (n) =>
        String(n.number) === q ||
        n.transliteration.toLowerCase().includes(q) ||
        n.english.toLowerCase().includes(q) ||
        n.arabic.includes(arabicQuery)
    );
  }, [query]);

  // Split virtue text on double-newlines into paragraphs.
  const virtueParagraphs = useMemo(
    () =>
      prophetNamesVirtue
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean),
    []
  );

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
            <Sparkles className="h-7 w-7 text-emerald" />
          </div>
          <h1 className="mt-4 font-arabic-display text-4xl leading-tight text-emerald sm:text-5xl md:text-6xl">
            أَسْمَاءُ النَّبِيّ ﷺ
          </h1>
          <StarDivider className="my-4 w-full max-w-md" />
          <p className="text-base font-semibold text-foreground sm:text-lg">
            The 99 Names of Prophet Muhammad ﷺ
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Reflect upon the blessed names of the Messenger of Allah — each name
            a window into his noble character, his lofty station, and his
            mission of mercy to the worlds.
          </p>
        </div>
      </motion.header>

      {/* ----------------------------------------------------------------- */}
      {/* Virtue card                                                       */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <Card className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gold-soft/10 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-[0.08]">
            <StarMark className="h-full w-full" />
          </div>
          <div className="relative z-10 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gold">
                The Virtue of Salawat
              </p>
              <div className="mt-1 space-y-2">
                {virtueParagraphs.map((para, i) => (
                  <blockquote
                    key={i}
                    className="text-sm italic leading-relaxed text-foreground sm:text-base"
                  >
                    &ldquo;{para}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

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
          placeholder="Search by name, meaning, transliteration or number…"
          aria-label="Search the 99 Names of Prophet Muhammad"
          className="h-11 rounded-full border-border/60 bg-card pl-10 pr-4 text-sm shadow-sm focus-visible:ring-emerald/30"
        />
      </motion.div>

      {/* Count */}
      <p className="mt-4 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {filtered.length}
        </span>{" "}
        of <span className="font-semibold text-foreground">99</span> names
      </p>

      {/* ----------------------------------------------------------------- */}
      {/* Grid                                                              */}
      {/* ----------------------------------------------------------------- */}
      {filtered.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center justify-center gap-3 border-dashed border-border/60 bg-muted/20 p-10 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No names found</p>
            <p className="text-sm text-muted-foreground">
              Try a different transliteration, meaning, or number.
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
        <TooltipProvider delayDuration={200}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.025 },
              },
            }}
            className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          >
            {filtered.map((name) => (
              <ProphetNameCard
                key={name.number}
                name={name}
                onOpen={() => setSelectedName(name)}
              />
            ))}
          </motion.div>
        </TooltipProvider>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Detail dialog                                                     */}
      {/* ----------------------------------------------------------------- */}
      <Dialog
        open={!!selectedName}
        onOpenChange={(o) => {
          if (!o) setSelectedName(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="gap-0 overflow-hidden rounded-2xl border-emerald/30 p-0 sm:max-w-md"
        >
          {selectedName && (
            <ProphetNameDetail
              name={selectedName}
              onClose={() => setSelectedName(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Name card                                                                   */
/* -------------------------------------------------------------------------- */

function ProphetNameCard({
  name,
  onOpen,
}: {
  name: ProphetName;
  onOpen: () => void;
}) {
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favId = `prophetName-${name.number}`;
  const isFav = favorites.includes(favId);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      }}
      className="group relative flex h-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 text-center card-refined cursor-pointer hover:-translate-y-1 hover:border-emerald/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/40"
      aria-label={`${name.transliteration} — ${name.english}. Open details.`}
    >
      {/* Number badge — top-left, circular emerald gradient */}
      <div className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald/70 shadow-sm">
        <span className="text-xs font-bold text-primary-foreground">
          {name.number}
        </span>
      </div>

      {/* Favorite heart button — top-right */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(favId);
            }}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFav}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur transition-all hover:scale-110 hover:bg-background"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFav
                  ? "fill-gold text-gold"
                  : "text-muted-foreground/60 group-hover:text-foreground"
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isFav ? "In favorites" : "Add to favorites"}
        </TooltipContent>
      </Tooltip>

      {/* Arabic name */}
      <p className="mt-6 font-arabic text-2xl leading-loose text-emerald">
        {name.arabic}
      </p>

      {/* Transliteration */}
      <p className="font-semibold leading-tight text-foreground">
        {name.transliteration}
      </p>

      {/* English */}
      <p className="text-sm italic leading-snug text-muted-foreground">
        {name.english}
      </p>

      {/* Hint */}
      <div className="mt-auto flex items-center gap-1 pt-1 text-[10px] text-muted-foreground/70 transition-colors group-hover:text-emerald">
        <Hash className="h-3 w-3" />
        Tap to view meaning
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Name detail dialog body                                                     */
/* -------------------------------------------------------------------------- */

function ProphetNameDetail({
  name,
  onClose,
}: {
  name: ProphetName;
  onClose: () => void;
}) {
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favId = `prophetName-${name.number}`;
  const isFav = favorites.includes(favId);

  return (
    <>
      {/* Emerald gradient header banner with large Arabic */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald to-emerald/80 px-6 pb-7 pt-6 text-center text-primary-foreground">
        <div className="absolute inset-0 star-lattice opacity-[0.12]" />
        <div className="pointer-events-none absolute -right-6 -top-6 opacity-15">
          <StarMark className="h-32 w-32" showGold={false} />
        </div>
        {/* Custom close button (top-right) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur transition-all hover:bg-primary-foreground/25 hover:scale-105"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
            <Hash className="h-3 w-3" />
            Name {name.number} of 99
          </span>
          <p className="mt-4 font-arabic-display text-5xl leading-tight text-primary-foreground sm:text-6xl">
            {name.arabic}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6 pt-5">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-xl font-bold text-foreground">
            {name.transliteration}
          </DialogTitle>
          <DialogDescription className="text-sm italic">
            {name.english}
          </DialogDescription>
        </DialogHeader>

        <StarDivider className="my-5" />

        {/* Meaning */}
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-emerald">
            Meaning
          </p>
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            {name.meaning}
          </p>
        </div>

        {/* Salawat note */}
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-gold/20 bg-gold-soft/10 p-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="text-xs italic leading-relaxed text-muted-foreground">
            Send blessings upon the Prophet ﷺ by saying:{" "}
            <span className="font-arabic text-foreground">
              اللَّهُمَّ صَلِّ عَلَى مُحَمَّد
            </span>{" "}
            — Allahumma salli &lsquo;ala Muhammad. Whoever sends blessings upon
            him once, Allah sends ten upon him.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toggleFavorite(favId)}
            className={cn(
              "rounded-full",
              isFav
                ? "border-gold/40 text-gold hover:bg-gold-soft/30 hover:text-gold"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart
              className={cn(
                "mr-1 h-4 w-4",
                isFav && "fill-gold text-gold"
              )}
            />
            {isFav ? "Favorited" : "Add to favorites"}
          </Button>
          <Button
            type="button"
            onClick={onClose}
            size="sm"
            className="rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
}
