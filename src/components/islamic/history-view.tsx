"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Flame,
  TrendingUp,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DayCell {
  date: string;
  day: number;
  inMonth: boolean;
  intensity: number; // 0-4
  value: number; // ayah-equivalents
  isToday: boolean;
  stat?: {
    chaptersRead: number;
    ayahsRead: number;
    minutesRead: number;
  };
}

// Build a 6-week grid (42 cells) for a given month.
function buildMonthGrid(
  year: number,
  month: number, // 0-indexed
  readingStats: Record<string, { chaptersRead: number; ayahsRead: number; minutesRead: number }>
): DayCell[] {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const cells: DayCell[] = [];

  // Previous month padding
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const date = new Date(year, month - 1, d);
    const ds = dateStr(date);
    const stat = readingStats[ds];
    const value = stat ? stat.ayahsRead + stat.chaptersRead * 5 : 0;
    cells.push({
      date: ds,
      day: d,
      inMonth: false,
      intensity: intensityFor(value),
      value,
      isToday: ds === todayStr,
      stat,
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const ds = dateStr(date);
    const stat = readingStats[ds];
    const value = stat ? stat.ayahsRead + stat.chaptersRead * 5 : 0;
    cells.push({
      date: ds,
      day: d,
      inMonth: true,
      intensity: intensityFor(value),
      value,
      isToday: ds === todayStr,
      stat,
    });
  }

  // Next month padding to fill 42 cells
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d);
    const ds = dateStr(date);
    const stat = readingStats[ds];
    const value = stat ? stat.ayahsRead + stat.chaptersRead * 5 : 0;
    cells.push({
      date: ds,
      day: d,
      inMonth: false,
      intensity: intensityFor(value),
      value,
      isToday: ds === todayStr,
      stat,
    });
  }

  return cells;
}

function dateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function intensityFor(value: number): number {
  if (value === 0) return 0;
  if (value < 5) return 1;
  if (value < 15) return 2;
  if (value < 30) return 3;
  return 4;
}

const intensityColors = [
  "bg-muted/40",
  "bg-emerald/20",
  "bg-emerald/40",
  "bg-emerald/60",
  "bg-emerald/90",
];

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function HistoryView() {
  const readingStats = useAppStore((s) => s.readingStats);
  const getStreak = useAppStore((s) => s.getStreak);
  const getTotalStats = useAppStore((s) => s.getTotalStats);
  const setView = useAppStore((s) => s.setView);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const cells = useMemo(
    () => buildMonthGrid(year, month, readingStats),
    [year, month, readingStats]
  );

  const streak = getStreak();
  const totals = getTotalStats();

  // Best day this month
  const monthBest = useMemo(() => {
    let best: { date: string; value: number; stat?: { chaptersRead: number; ayahsRead: number; minutesRead: number } } | null = null;
    for (const cell of cells) {
      if (cell.inMonth && cell.value > 0) {
        if (!best || cell.value > best.value) {
          best = { date: cell.date, value: cell.value, stat: cell.stat };
        }
      }
    }
    return best;
  }, [cells]);

  // Active days this month
  const activeThisMonth = cells.filter((c) => c.inMonth && c.value > 0).length;
  const totalThisMonth = cells
    .filter((c) => c.inMonth && c.value > 0)
    .reduce((sum, c) => sum + c.value, 0);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };
  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  const navigate = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatMinutes = (m: number) => {
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    const rem = m % 60;
    return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow-lg">
            <TrendingUp className="h-7 w-7" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Reading <span className="text-gradient-emerald">History</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your reading activity over time — every chapter and ayah counts.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard
          icon={Flame}
          value={streak}
          label="Current streak"
          sub="days"
          color="from-gold to-amber-600"
        />
        <SummaryCard
          icon={Calendar}
          value={totals.days}
          label="Total active days"
          sub="all-time"
          color="from-emerald to-emerald/80"
        />
        <SummaryCard
          icon={BookOpen}
          value={totals.chapters + totals.ayahs}
          label="Items read"
          sub="chapters + ayahs"
          color="from-teal-500 to-teal-700"
        />
        <SummaryCard
          icon={Clock}
          value={formatMinutes(totals.minutes)}
          label="Reading time"
          sub="all-time"
          color="from-cyan-500 to-cyan-700"
        />
      </div>

      {/* Calendar heatmap */}
      <Card className="border-border/60 bg-card p-4 sm:p-6">
        {/* Month navigation */}
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            className="rounded-full"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {monthLabels[month]} {year}
            </p>
            <p className="text-xs text-muted-foreground">
              {activeThisMonth} active day{activeThisMonth === 1 ? "" : "s"} ·{" "}
              {totalThisMonth} items read
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="rounded-full"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={goToday}
          className="mb-4 w-full rounded-full border-emerald/30 text-emerald"
        >
          Jump to today
        </Button>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center sm:gap-2">
          {weekdayLabels.map((d) => (
            <div
              key={d}
              className="py-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs"
            >
              {d.slice(0, 1)}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {cells.map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.01, 0.4) }}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg border text-xs font-medium transition-all sm:rounded-xl sm:text-sm",
                cell.inMonth ? "border-border/40" : "border-transparent opacity-30",
                cell.isToday && "ring-2 ring-emerald ring-offset-1 ring-offset-background",
                intensityColors[cell.intensity],
                cell.value > 0 && cell.inMonth
                  ? "text-foreground"
                  : cell.inMonth
                    ? "text-muted-foreground"
                    : "text-muted-foreground/40"
              )}
              title={
                cell.stat
                  ? `${cell.date}: ${cell.stat.ayahsRead} ayahs, ${cell.stat.chaptersRead} chapters, ${cell.stat.minutesRead} min`
                  : cell.date
              }
            >
              {cell.day}
              {cell.value > 0 && cell.inMonth && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] text-muted-foreground">
          <span>Less</span>
          {intensityColors.map((c, i) => (
            <span
              key={i}
              className={cn("h-3 w-3 rounded-sm", c)}
            />
          ))}
          <span>More</span>
        </div>
      </Card>

      {/* Best day + all-time achievements */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Best day this month */}
        <Card className="border-gold/20 bg-gradient-to-br from-gold-soft/20 to-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber-600 text-primary-foreground shadow">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Best day this month
              </p>
              {monthBest ? (
                <>
                  <p className="text-lg font-bold text-foreground">
                    {monthBest.value} items
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(monthBest.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" }
                    )}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No reading this month yet.
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Reading milestones */}
        <Card className="border-emerald/20 bg-gradient-to-br from-emerald-soft/20 to-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow">
              <Flame className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Milestones
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Badge
                  variant={totals.days >= 1 ? "default" : "outline"}
                  className={totals.days >= 1 ? "bg-emerald text-primary-foreground" : ""}
                >
                  First day
                </Badge>
                <Badge
                  variant={streak >= 3 ? "default" : "outline"}
                  className={streak >= 3 ? "bg-emerald text-primary-foreground" : ""}
                >
                  3-day streak
                </Badge>
                <Badge
                  variant={streak >= 7 ? "default" : "outline"}
                  className={streak >= 7 ? "bg-gold text-primary-foreground" : ""}
                >
                  Week streak
                </Badge>
                <Badge
                  variant={totals.ayahs >= 100 ? "default" : "outline"}
                  className={totals.ayahs >= 100 ? "bg-gold text-primary-foreground" : ""}
                >
                  100 ayahs
                </Badge>
                <Badge
                  variant={totals.chapters >= 10 ? "default" : "outline"}
                  className={totals.chapters >= 10 ? "bg-gold text-primary-foreground" : ""}
                >
                  10 chapters
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <StarDivider className="mt-8" />

      <div className="mt-4 flex flex-col items-center gap-3 text-center">
        <p className="text-xs text-muted-foreground">
          Reading activity is tracked automatically when you read books or open
          surahs. Data is stored locally in your browser.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("quran")}
            variant="outline"
            size="sm"
            className="rounded-full border-emerald/30 text-emerald"
          >
            <BookOpen className="mr-1.5 h-4 w-4" />
            Read Quran
          </Button>
          <Button
            onClick={() => navigate("settings")}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            Export data
          </Button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  value,
  label,
  sub,
  color,
}: {
  icon: typeof Flame;
  value: number | string;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <Card className="border-border/60 bg-card p-3 text-center sm:p-4">
      <div
        className={cn(
          "mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-primary-foreground shadow-sm sm:h-10 sm:w-10",
          color
        )}
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <p className="text-lg font-bold text-foreground tabular-nums sm:text-xl">
        {value}
      </p>
      <p className="text-[10px] font-medium text-foreground sm:text-xs">{label}</p>
      <p className="text-[9px] text-muted-foreground sm:text-[10px]">{sub}</p>
    </Card>
  );
}
