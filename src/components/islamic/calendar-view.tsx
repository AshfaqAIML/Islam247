"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Moon,
  Star,
  Sparkles,
} from "lucide-react";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Key Islamic dates (approximate — Hijri dates shift ~11 days earlier each Gregorian year).
// We mark notable days by Hijri day + month for display purposes.
interface IslamicEvent {
  hijriDay: number;
  hijriMonth: number; // 1-12
  name: string;
  nameArabic: string;
  description: string;
  type: "major" | "recommended";
}

const islamicEvents: IslamicEvent[] = [
  {
    hijriDay: 1,
    hijriMonth: 1,
    name: "Islamic New Year",
    nameArabic: "رأس السنة الهجرية",
    description: "The beginning of the Hijri year, marking the migration of the Prophet ﷺ to Medina.",
    type: "major",
  },
  {
    hijriDay: 10,
    hijriMonth: 1,
    name: "Day of Ashura",
    nameArabic: "يوم عاشوراء",
    description: "A day of fasting recommended by the Prophet ﷺ, marking the salvation of Musa (Moses) and his people.",
    type: "recommended",
  },
  {
    hijriDay: 12,
    hijriMonth: 3,
    name: "Mawlid an-Nabi",
    nameArabic: "المولد النبوي",
    description: "The birth of the Prophet Muhammad ﷺ.",
    type: "major",
  },
  {
    hijriDay: 27,
    hijriMonth: 7,
    name: "Laylat al-Ragha'ib",
    nameArabic: "ليلة الرغائب",
    description: "The first Thursday night of Rajab, a night of recommended worship.",
    type: "recommended",
  },
  {
    hijriDay: 15,
    hijriMonth: 8,
    name: "Laylat al-Bara'at",
    nameArabic: "ليلة البراءة",
    description: "The Night of Emancipation in Sha'ban, a night of recommended worship and fasting the following day.",
    type: "recommended",
  },
  {
    hijriDay: 1,
    hijriMonth: 9,
    name: "First of Ramadan",
    nameArabic: "أول رمضان",
    description: "The beginning of the holy month of fasting.",
    type: "major",
  },
  {
    hijriDay: 27,
    hijriMonth: 9,
    name: "Laylat al-Qadr (likely)",
    nameArabic: "ليلة القدر",
    description: "The Night of Decree, better than a thousand months. Most likely on the 27th, though it falls in the last ten odd nights of Ramadan.",
    type: "major",
  },
  {
    hijriDay: 1,
    hijriMonth: 10,
    name: "Eid al-Fitr",
    nameArabic: "عيد الفطر",
    description: "The festival marking the end of Ramadan fasting.",
    type: "major",
  },
  {
    hijriDay: 9,
    hijriMonth: 12,
    name: "Day of Arafah",
    nameArabic: "يوم عرفة",
    description: "The day of standing at Arafah during Hajj. Fasting on this day (for non-pilgrims) expiates sins of two years.",
    type: "recommended",
  },
  {
    hijriDay: 10,
    hijriMonth: 12,
    name: "Eid al-Adha",
    nameArabic: "عيد الأضحى",
    description: "The festival of sacrifice, commemorating Prophet Ibrahim's willingness to sacrifice his son.",
    type: "major",
  },
  {
    hijriDay: 8,
    hijriMonth: 12,
    name: "Day of Tarwiyah",
    nameArabic: "يوم التروية",
    description: "The first day of Hajj, when pilgrims begin their journey to Mina.",
    type: "recommended",
  },
];

const hijriMonthNames = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

const hijriMonthNamesArabic = [
  "محرّم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوّال",
  "ذو القعدة",
  "ذو الحجة",
];

const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get Hijri date components using Intl.
function getHijri(date: Date) {
  try {
    const fmt = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const parts = fmt.formatToParts(date);
    const day = Number(parts.find((p) => p.type === "day")?.value || "1");
    const month = Number(parts.find((p) => p.type === "month")?.value || "1");
    const year = Number(parts.find((p) => p.type === "year")?.value || "1446");
    return { day, month, year };
  } catch {
    return { day: 1, month: 1, year: 1446 };
  }
}

// Approximate number of days in a Hijri month (29 or 30).
// We use a simple alternating heuristic; the calendar is illustrative.
function daysInHijriMonth(month: number, _year: number): number {
  // Ramadan and odd months commonly 29/30; we alternate for demo.
  return month % 2 === 0 ? 29 : 30;
}

// Convert a Hijri day in a given month to a Gregorian Date (approximate).
// Uses Intl to find the Gregorian date that corresponds to the 1st of the Hijri month,
// then adds (day - 1) days.
function hijriToGregorian(year: number, month: number, day: number): Date {
  // Find the Gregorian date for the 1st of this Hijri month by scanning.
  // Start from a known reference and search forward.
  const base = new Date();
  // We approximate by finding today's hijri, then adjusting.
  const todayHijri = getHijri(base);
  // Diff in months:
  const monthDiff = (year - todayHijri.year) * 12 + (month - todayHijri.month);
  const approx = new Date(base);
  approx.setDate(approx.getDate() + monthDiff * 29 + (day - todayHijri.day));
  return approx;
}

export function CalendarView() {
  const today = new Date();
  const todayHijri = getHijri(today);

  const [viewYear, setViewYear] = useState(todayHijri.year);
  const [viewMonth, setViewMonth] = useState(todayHijri.month); // 1-12

  const monthName = hijriMonthNames[viewMonth - 1];
  const monthNameArabic = hijriMonthNamesArabic[viewMonth - 1];
  const daysCount = daysInHijriMonth(viewMonth, viewYear);

  // Build calendar grid: find the weekday of the 1st.
  const firstGregorian = hijriToGregorian(viewYear, viewMonth, 1);
  const firstWeekday = firstGregorian.getDay(); // 0=Sun

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysCount; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsThisMonth = useMemo(
    () => islamicEvents.filter((e) => e.hijriMonth === viewMonth),
    [viewMonth]
  );

  const eventForDay = (day: number | null) =>
    day === null ? null : eventsThisMonth.find((e) => e.hijriDay === day) || null;

  const isToday = (day: number | null) =>
    day !== null &&
    day === todayHijri.day &&
    viewMonth === todayHijri.month &&
    viewYear === todayHijri.year;

  const prevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };
  const goToday = () => {
    setViewYear(todayHijri.year);
    setViewMonth(todayHijri.month);
  };

  // Upcoming events (next 4 from today)
  const upcomingEvents = useMemo(() => {
    const out: (IslamicEvent & { gregorian: Date })[] = [];
    // Check this month and next 3 months
    for (let offset = 0; offset < 6; offset++) {
      const m = ((viewMonth - 1 + offset) % 12) + 1;
      const y = viewYear + Math.floor((viewMonth - 1 + offset) / 12);
      for (const e of islamicEvents) {
        if (e.hijriMonth === m) {
          out.push({
            ...e,
            gregorian: hijriToGregorian(y, m, e.hijriDay),
          });
        }
      }
    }
    return out.slice(0, 5);
  }, [viewMonth, viewYear]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <StarMark className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Hijri <span className="text-gradient-emerald">Calendar</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The Islamic lunar calendar with key dates and events
        </p>
      </div>

      {/* Today card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="relative overflow-hidden border-emerald/20 hero-gradient p-6">
          <div className="star-lattice opacity-[0.07]" />
          <div className="relative z-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow-lg">
              <CalendarIcon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Today
              </p>
              <p className="text-2xl font-bold text-foreground">
                {todayHijri.day} {hijriMonthNames[todayHijri.month - 1]}{" "}
                {todayHijri.year} AH
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground font-arabic">
                {todayHijri.day} {hijriMonthNamesArabic[todayHijri.month - 1]}{" "}
                {todayHijri.year}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {today.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {(() => {
              const todayEvent = eventForDay(todayHijri.day);
              if (todayEvent) {
                return (
                  <Badge className="bg-gold-soft text-accent-foreground">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {todayEvent.name}
                  </Badge>
                );
              }
              return null;
            })()}
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
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
                <p className="text-lg font-bold text-foreground">{monthName}</p>
                <p className="text-xs text-muted-foreground">
                  {viewYear} AH · <span className="font-arabic">{monthNameArabic}</span>
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
              Go to today
            </Button>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdayShort.map((d) => (
                <div
                  key={d}
                  className="py-2 text-xs font-semibold text-muted-foreground"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                const event = eventForDay(day);
                const todayCell = isToday(day);
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative aspect-square rounded-lg border p-1 text-center transition-colors sm:p-2",
                      day === null
                        ? "border-transparent"
                        : todayCell
                          ? "border-emerald bg-emerald-soft"
                          : event
                            ? event.type === "major"
                              ? "border-gold/40 bg-gold-soft/40"
                              : "border-emerald/20 bg-emerald-soft/20"
                            : "border-border/40 hover:border-emerald/30 hover:bg-muted/40"
                    )}
                  >
                    {day !== null && (
                      <>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            todayCell
                              ? "text-emerald"
                              : event?.type === "major"
                                ? "text-accent-foreground"
                                : "text-foreground"
                          )}
                        >
                          {day}
                        </span>
                        {event && (
                          <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald" />
                Today
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold" />
                Major event
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald/50" />
                Recommended day
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Events sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* This month's events */}
          <Card className="border-border/60 bg-card p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
              <Moon className="h-4 w-4 text-gold" />
              {monthName} Events
            </h3>
            {eventsThisMonth.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No notable dates this month.
              </p>
            ) : (
              <div className="space-y-2">
                {eventsThisMonth.map((e) => (
                  <div
                    key={e.name}
                    className={cn(
                      "rounded-lg border p-2.5",
                      e.type === "major"
                        ? "border-gold/30 bg-gold-soft/20"
                        : "border-emerald/20 bg-emerald-soft/20"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground">
                        Day {e.hijriDay}
                      </span>
                      {e.type === "major" && (
                        <Star className="h-3 w-3 text-gold" />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {e.name}
                    </p>
                    <p className="text-right font-arabic text-sm text-emerald">
                      {e.nameArabic}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {e.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Upcoming events */}
          <Card className="border-border/60 bg-card p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-gold" />
              Upcoming Events
            </h3>
            <div className="space-y-2">
              {upcomingEvents.map((e, i) => (
                <div
                  key={`${e.name}-${i}`}
                  className="flex items-start gap-2 border-b border-border/40 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-soft text-emerald">
                    <span className="text-[10px] font-medium leading-none">
                      {e.gregorian.toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-xs font-bold leading-none">
                      {e.gregorian.getDate()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {e.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {e.hijriDay} {hijriMonthNames[e.hijriMonth - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <StarDivider className="mt-8" />

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Hijri dates are approximate (lunar calendar). For precise dates, consult
        your local moon-sighting authority. · Demo content
      </p>
    </div>
  );
}
