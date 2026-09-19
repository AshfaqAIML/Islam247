"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, BookOpen, Clock, Calendar, TrendingUp, Target } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { StarMark } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Static weekday labels — deterministic, no Date() needed for initial render.
const STATIC_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// Generate last-7-days activity sparkline data.
function getLast7Days(
  readingStats: Record<string, { chaptersRead: number; ayahsRead: number; minutesRead: number }>
) {
  const days: { date: string; label: string; value: number; isToday: boolean }[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const stat = readingStats[ds];
    days.push({
      date: ds,
      label: d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1),
      value: stat ? stat.chaptersRead + stat.ayahsRead : 0,
      isToday: i === 0,
    });
  }
  return days;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function ReadingStatsWidget() {
  const readingStats = useAppStore((s) => s.readingStats);
  const getStreak = useAppStore((s) => s.getStreak);
  const getTotalStats = useAppStore((s) => s.getTotalStats);
  const dailyGoalAyahs = useAppStore((s) => s.dailyGoalAyahs);
  const setView = useAppStore((s) => s.setView);

  // Compute date-dependent values only on the client to avoid hydration mismatches.
  // Initial state uses deterministic defaults (empty 7-day chart, zero today's progress).
  const [last7, setLast7] = useState<
    { date: string; label: string; value: number; isToday: boolean }[]
  >(() =>
    STATIC_LABELS.map((label) => ({
      date: "",
      label,
      value: 0,
      isToday: false,
    }))
  );
  const [todayProgress, setTodayProgress] = useState(0);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const days = getLast7Days(readingStats);
    setLast7(days);
    const ts = readingStats[todayStr()];
    setTodayProgress(
      ts ? ts.ayahsRead + ts.chaptersRead * 5 : 0
    );
  }, [readingStats]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const streak = getStreak();
  const totals = getTotalStats();
  const maxValue = Math.max(1, ...last7.map((d) => d.value));
  const activeDays = last7.filter((d) => d.value > 0).length;

  // Today's goal progress (chapters count as ~5 ayah-equivalents).
  const goalPct = Math.min(100, (todayProgress / Math.max(1, dailyGoalAyahs)) * 100);
  const goalMet = todayProgress >= dailyGoalAyahs;

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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
        <TrendingUp className="h-5 w-5 text-emerald" />
        Your Reading Journey
      </h2>
      <Card className="relative overflow-hidden border-emerald/20 bg-gradient-to-br from-card via-background to-emerald-soft/20 p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.05]">
          <StarMark className="h-32 w-32" />
        </div>

        <div className="relative z-10 grid gap-5 sm:grid-cols-[auto_1fr]">
          {/* Streak flame */}
          <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-2">
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-2xl shadow-md",
                streak > 0
                  ? "bg-gradient-to-br from-gold to-amber-600 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Flame
                className={cn("h-10 w-10", streak > 0 && "drop-shadow")}
              />
            </div>
            <div className="text-center sm:mt-1">
              <p className="text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-xs font-medium text-muted-foreground">
                day{streak === 1 ? "" : "s"} streak
              </p>
            </div>
          </div>

          {/* Stats grid + sparkline */}
          <div className="flex flex-col gap-4">
            {/* Stat chips */}
            <div className="grid grid-cols-3 gap-2">
              <StatChip
                icon={BookOpen}
                value={totals.chapters}
                label="Chapters"
                color="text-emerald"
              />
              <StatChip
                icon={BookOpen}
                value={totals.ayahs}
                label="Ayahs"
                color="text-gold"
              />
              <StatChip
                icon={Clock}
                value={formatMinutes(totals.minutes)}
                label="Reading"
                color="text-emerald"
              />
            </div>

            {/* 7-day activity bar chart */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last 7 days
                </span>
                <span>{activeDays} active day{activeDays === 1 ? "" : "s"}</span>
              </div>
              <div className="flex h-20 items-end justify-between gap-1.5">
                {last7.map((d, i) => {
                  const heightPct = (d.value / maxValue) * 100;
                  return (
                    <div
                      key={d.date}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div className="flex h-16 w-full items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(heightPct, d.value > 0 ? 8 : 2)}%` }}
                          transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                          className={cn(
                            "w-full max-w-[18px] rounded-t-md transition-colors",
                            d.value > 0
                              ? d.isToday
                                ? "bg-gradient-to-t from-gold to-amber-400"
                                : "bg-gradient-to-t from-emerald to-emerald/60"
                              : "bg-muted"
                          )}
                          title={`${d.value} items read`}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-medium",
                          d.isToday ? "text-emerald" : "text-muted-foreground"
                        )}
                      >
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily goal progress */}
            <button
              onClick={() => navigate("settings")}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                goalMet
                  ? "border-gold/40 bg-gold-soft/20"
                  : "border-border/40 bg-card/40 hover:border-emerald/30"
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  goalMet
                    ? "bg-gold text-primary-foreground"
                    : "bg-emerald-soft text-emerald"
                )}
              >
                <Target className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {goalMet ? "Daily goal achieved!" : "Today's goal"}
                  </span>
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    {todayProgress}/{dailyGoalAyahs}
                  </span>
                </div>
                <Progress
                  value={goalPct}
                  className={cn("h-1.5", goalMet && "[&>div]:bg-gold")}
                />
              </div>
            </button>

            {/* CTA */}
            {totals.days === 0 ? (
              <div className="flex items-center justify-between rounded-xl border border-dashed border-border/60 bg-muted/20 p-3">
                <p className="text-xs text-muted-foreground">
                  Start reading to build your streak!
                </p>
                <Button
                  size="sm"
                  onClick={() => navigate("library")}
                  className="h-8 rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90"
                >
                  Browse Library
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-xl bg-emerald-soft/40 p-3">
                <p className="text-xs font-medium text-emerald">
                  {totals.days} day{totals.days === 1 ? "" : "s"} of reading — keep it up!
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate("quran")}
                  className="h-8 rounded-full text-emerald hover:bg-emerald-soft"
                >
                  Read Quran
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function StatChip({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: typeof BookOpen;
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border/40 bg-card/60 p-2 text-center">
      <Icon className={cn("h-3.5 w-3.5", color)} />
      <span className="mt-1 text-sm font-bold text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
