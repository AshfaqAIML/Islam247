"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  BookOpen,
  Moon,
  Sun,
  Type,
  AlignJustify,
  Flame,
  Calendar,
  Target,
  Download,
  Trash2,
  Heart,
  Bookmark,
  Sparkles,
  Info,
  ShieldCheck,
  Beaker,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type ReaderTheme = "light" | "sepia" | "dark";
type ReaderFontFamily = "sans" | "serif";

const themeBg: Record<ReaderTheme, string> = {
  light: "bg-background text-foreground",
  sepia:
    "bg-amber-50 text-stone-800 dark:bg-amber-950/40 dark:text-amber-50",
  dark: "bg-zinc-900 text-zinc-100",
};

const fontFamilies: { id: ReaderFontFamily; label: string }[] = [
  { id: "serif", label: "Serif" },
  { id: "sans", label: "Sans" },
];

const themes: {
  id: ReaderTheme;
  label: string;
  icon: typeof Sun;
}[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "sepia", label: "Sepia", icon: BookOpen },
  { id: "dark", label: "Dark", icon: Moon },
];

const goalOptions = [10, 20, 30, 50, 100];

const tasbeehTargets = [33, 99, 100, 1000];

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function SettingsView() {
  // Reader prefs
  const readerFontSize = useAppStore((s) => s.readerFontSize);
  const readerTheme = useAppStore((s) => s.readerTheme);
  const readerLineSpacing = useAppStore((s) => s.readerLineSpacing);
  const readerFontFamily = useAppStore((s) => s.readerFontFamily);
  const setReaderFontSize = useAppStore((s) => s.setReaderFontSize);
  const setReaderTheme = useAppStore((s) => s.setReaderTheme);
  const setReaderLineSpacing = useAppStore((s) => s.setReaderLineSpacing);
  const setReaderFontFamily = useAppStore((s) => s.setReaderFontFamily);

  // Daily goal
  const dailyGoalAyahs = useAppStore((s) => s.dailyGoalAyahs);
  const setDailyGoalAyahs = useAppStore((s) => s.setDailyGoalAyahs);
  const readingStats = useAppStore((s) => s.readingStats);
  const getStreak = useAppStore((s) => s.getStreak);
  const getTotalStats = useAppStore((s) => s.getTotalStats);

  // Tasbeeh
  const tasbeehTarget = useAppStore((s) => s.tasbeehTarget);
  const setTasbeehTarget = useAppStore((s) => s.setTasbeehTarget);
  const tasbeehTotal = useAppStore((s) => s.tasbeehTotal);

  // Data management
  const favorites = useAppStore((s) => s.favorites);
  const bookmarks = useAppStore((s) => s.bookmarks);

  // Today's progress
  const todayProgress = useMemo(() => {
    const today = todayStr();
    const stat = readingStats[today];
    if (!stat) {
      return { ayahEquivalents: 0, percent: 0 };
    }
    const ayahEquivalents = stat.ayahsRead + stat.chaptersRead * 5;
    const percent = Math.min(
      100,
      Math.round((ayahEquivalents / Math.max(1, dailyGoalAyahs)) * 100)
    );
    return { ayahEquivalents, percent };
  }, [readingStats, dailyGoalAyahs]);

  const streak = getStreak();
  const totals = getTotalStats();

  // Export all persisted data as a JSON file.
  const handleExport = () => {
    const exportData = {
      _meta: {
        app: "Islam24x7",
        version: "1.0.0",
        exportedAt: new Date().toISOString(),
      },
      readingProgress: useAppStore.getState().readingProgress,
      readingStats: useAppStore.getState().readingStats,
      lastReadDate: useAppStore.getState().lastReadDate,
      favorites: useAppStore.getState().favorites,
      bookmarks: useAppStore.getState().bookmarks,
      duaCounts: useAppStore.getState().duaCounts,
      tasbeehTotal: useAppStore.getState().tasbeehTotal,
      tasbeehTarget: useAppStore.getState().tasbeehTarget,
      currentDhikr: useAppStore.getState().currentDhikr,
      dailyGoalAyahs: useAppStore.getState().dailyGoalAyahs,
      readerSettings: {
        readerFontSize: useAppStore.getState().readerFontSize,
        readerTheme: useAppStore.getState().readerTheme,
        readerLineSpacing: useAppStore.getState().readerLineSpacing,
        readerFontFamily: useAppStore.getState().readerFontFamily,
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "islam24x7-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset all data — clears localStorage and reloads the page.
  const handleReset = () => {
    try {
      localStorage.removeItem("islam24x7-store");
    } catch {
      // ignore — storage may be unavailable
    }
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* ---------------------------------------------------------------- */}
      {/* Hero header card                                                 */}
      {/* ---------------------------------------------------------------- */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-emerald/20 hero-gradient p-6 sm:p-10"
      >
        <div className="star-lattice opacity-[0.07]" />
        {/* Decorative rotating star */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 opacity-[0.08]">
          <div className="animate-slow-spin">
            <StarMark className="h-full w-full" />
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-16 right-24 h-32 w-32 opacity-[0.06]">
          <div className="animate-slow-spin-reverse">
            <StarMark className="h-full w-full" showGold={false} />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="animate-float-soft">
            <StarMark className="h-12 w-12 drop-shadow-sm" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="text-gradient-emerald">Settings</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Personalize your reading experience
          </p>
          <StarDivider className="mt-4 w-full max-w-md" />
        </div>
      </motion.header>

      {/* ---------------------------------------------------------------- */}
      {/* Reader Preferences                                               */}
      {/* ---------------------------------------------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <Card className="border-emerald/20 bg-card p-5 card-refined sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft">
              <BookOpen className="h-5 w-5 text-emerald" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Reader Preferences
              </h2>
              <p className="text-xs text-muted-foreground">
                Customize how text appears across the Quran and library.
              </p>
            </div>
          </div>

          {/* Live preview */}
          <div
            className={cn(
              "mb-5 rounded-2xl border border-border/60 p-5 transition-colors",
              themeBg[readerTheme]
            )}
            aria-label="Live reader preview"
          >
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider opacity-60">
              Preview
            </p>
            <p
              style={{
                fontSize: `${readerFontSize}px`,
                lineHeight: readerLineSpacing,
                fontFamily:
                  readerFontFamily === "serif"
                    ? "Georgia, 'Times New Roman', serif"
                    : "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              In the name of Allah, the Most Gracious, the Most Merciful.
            </p>
          </div>

          {/* Font size */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="font-size-slider"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Type className="h-4 w-4 text-emerald" />
                Font size
              </label>
              <Badge
                variant="secondary"
                className="bg-emerald-soft text-emerald tabular-nums"
              >
                {readerFontSize}px
              </Badge>
            </div>
            <Slider
              id="font-size-slider"
              value={[readerFontSize]}
              min={14}
              max={24}
              step={1}
              onValueChange={(v) => setReaderFontSize(v[0])}
              className="[&_[data-slot=slider-range]]:bg-emerald [&_[data-slot=slider-thumb]]:border-emerald"
              aria-label="Font size"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>14</span>
              <span>24</span>
            </div>
          </div>

          {/* Font family */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Font family
            </label>
            <div className="inline-flex w-full overflow-hidden rounded-lg border border-border/60 sm:w-auto">
              {fontFamilies.map((f) => {
                const active = readerFontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setReaderFontFamily(f.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors sm:flex-none",
                      active
                        ? "bg-emerald text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-emerald-soft hover:text-emerald"
                    )}
                  >
                    <Type
                      className="h-3.5 w-3.5"
                      style={{
                        fontFamily:
                          f.id === "serif"
                            ? "Georgia, serif"
                            : "system-ui, sans-serif",
                      }}
                    />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Line spacing */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="line-spacing-slider"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <AlignJustify className="h-4 w-4 text-emerald" />
                Line spacing
              </label>
              <Badge
                variant="secondary"
                className="bg-emerald-soft text-emerald tabular-nums"
              >
                {readerLineSpacing.toFixed(1)}
              </Badge>
            </div>
            <Slider
              id="line-spacing-slider"
              value={[readerLineSpacing]}
              min={1.5}
              max={2.2}
              step={0.1}
              onValueChange={(v) => setReaderLineSpacing(v[0])}
              className="[&_[data-slot=slider-range]]:bg-emerald [&_[data-slot=slider-thumb]]:border-emerald"
              aria-label="Line spacing"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>1.5</span>
              <span>2.2</span>
            </div>
          </div>

          {/* Reading theme */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Reading theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => {
                const active = readerTheme === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setReaderTheme(t.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-all",
                      active
                        ? "border-emerald bg-emerald text-primary-foreground shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-emerald"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.section>

      {/* ---------------------------------------------------------------- */}
      {/* Daily Reading Goal                                               */}
      {/* ---------------------------------------------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6"
      >
        <Card className="border-gold/20 bg-gradient-to-br from-gold-soft/20 to-card p-5 card-refined sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-gold">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Daily Reading Goal
              </h2>
              <p className="text-xs text-muted-foreground">
                Set a daily target for ayahs/readings. Your progress is tracked
                on the home dashboard.
              </p>
            </div>
          </div>

          {/* Goal segmented control */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-medium text-foreground">
              Target —{" "}
              <span className="text-emerald">{dailyGoalAyahs} ayahs/day</span>
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {goalOptions.map((g) => {
                const active = dailyGoalAyahs === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setDailyGoalAyahs(g)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-sm font-semibold transition-all tabular-nums",
                      active
                        ? "border-emerald bg-emerald text-primary-foreground shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-emerald"
                    )}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's progress */}
          <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-emerald" />
                Today&apos;s progress
              </span>
              <Badge
                variant="secondary"
                className="bg-emerald-soft text-emerald tabular-nums"
              >
                {todayProgress.ayahEquivalents}/{dailyGoalAyahs} ayah-equiv.
              </Badge>
            </div>
            <Progress
              value={todayProgress.percent}
              className="h-2 [&>[data-slot=progress-indicator]]:bg-gradient-to-r [&>[data-slot=progress-indicator]]:from-emerald [&>[data-slot=progress-indicator]]:to-gold"
            />
            <p className="mt-2 text-right text-xs font-medium text-emerald tabular-nums">
              {todayProgress.percent}% of daily goal
            </p>
          </div>

          {/* Mini summary: streak + active days */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  streak > 0
                    ? "bg-gradient-to-br from-gold to-amber-600 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none text-foreground tabular-nums">
                  {streak}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  current streak
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-soft text-emerald">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none text-foreground tabular-nums">
                  {totals.days}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  total days active
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* ---------------------------------------------------------------- */}
      {/* Tasbeeh Settings                                                 */}
      {/* ---------------------------------------------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <Card className="border-emerald/20 bg-card p-5 card-refined sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft">
              <Sparkles className="h-5 w-5 text-emerald" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Tasbeeh Settings</h2>
              <p className="text-xs text-muted-foreground">
                Choose the default count for your dhikr rounds.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-foreground">
              Default target —{" "}
              <span className="text-emerald">{tasbeehTarget} per round</span>
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {tasbeehTargets.map((t) => {
                const active = tasbeehTarget === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTasbeehTarget(t)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-sm font-semibold transition-all tabular-nums",
                      active
                        ? "border-emerald bg-emerald text-primary-foreground shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-emerald"
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gold/20 bg-gold-soft/20 p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-gold" />
              Lifetime tasbeeh count
            </div>
            <Badge
              variant="secondary"
              className="bg-gold-soft text-accent-foreground tabular-nums"
            >
              {tasbeehTotal.toLocaleString()}
            </Badge>
          </div>
        </Card>
      </motion.section>

      {/* ---------------------------------------------------------------- */}
      {/* Data Management                                                  */}
      {/* ---------------------------------------------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6"
      >
        <Card className="border-border/60 bg-card p-5 card-refined sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft">
              <ShieldCheck className="h-5 w-5 text-emerald" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Data Management</h2>
              <p className="text-xs text-muted-foreground">
                All your data is stored locally in your browser only — nothing
                is ever sent to a server.
              </p>
            </div>
          </div>

          {/* Counts */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CountChip
              icon={Heart}
              value={favorites.length}
              label="Favorites"
              color="text-rose-500"
            />
            <CountChip
              icon={Bookmark}
              value={bookmarks.length}
              label="Bookmarks"
              color="text-gold"
            />
            <CountChip
              icon={Calendar}
              value={totals.days}
              label="Reading days"
              color="text-emerald"
            />
            <CountChip
              icon={BookOpen}
              value={totals.chapters}
              label="Chapters read"
              color="text-emerald"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex-1 rounded-full border-emerald/30 text-emerald hover:bg-emerald-soft hover:text-emerald"
            >
              <Download className="mr-2 h-4 w-4" />
              Export my data
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex-1 rounded-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset all data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently erase all your reading progress,
                    favorites, bookmarks, tasbeeh counts, and preferences
                    stored in this browser. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Yes, reset everything
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            <span>
              Your data lives only in this browser&apos;s local storage under the
              key <code className="rounded bg-muted px-1 py-0.5 text-[10px] font-mono">islam24x7-store</code>.
              Clearing your browser cache or using a different device will
              start fresh.
            </span>
          </p>
        </Card>
      </motion.section>

      {/* ---------------------------------------------------------------- */}
      {/* About                                                            */}
      {/* ---------------------------------------------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <Card className="relative overflow-hidden border-emerald/20 bg-gradient-to-br from-emerald/5 to-gold/5 p-5 card-refined sm:p-6">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-[0.08]">
            <StarMark className="h-full w-full" />
          </div>
          <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft">
              <StarMark className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Islam24x7</h2>
                <Badge
                  variant="secondary"
                  className="bg-emerald-soft text-emerald"
                >
                  v1.0.0
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                A daily companion for reading the Quran, exploring Hadith,
                learning the 99 Names of Allah, and reflecting on authentic
                supplications — with a source-grounded AI assistant.
              </p>
            </div>
          </div>

          <StarDivider className="my-4" />

          <div className="relative z-10 flex items-start gap-2 rounded-xl border border-gold/20 bg-gold-soft/10 p-3 text-xs text-muted-foreground">
            <Beaker className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            <p>
              <span className="font-semibold text-foreground">
                Demo content notice:
              </span>{" "}
              This build uses curated demonstration text for books, hadith, and
              duas. Always verify religious content against authenticated
              scholarly sources before relying on it.
            </p>
          </div>
        </Card>
      </motion.section>

      {/* Bottom spacer for mobile nav */}
      <div className="h-8 sm:h-12" aria-hidden />
    </div>
  );
}

function CountChip({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: typeof Heart;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border/40 bg-card/60 p-3 text-center">
      <Icon className={cn("h-4 w-4", color)} />
      <span className="mt-1.5 text-base font-bold text-foreground tabular-nums">
        {value.toLocaleString()}
      </span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
