"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CloudSun,
  Compass,
  MapPin,
  Moon,
  Navigation,
  Sparkles,
  Sun,
  SunMedium,
  Sunrise,
  Sunset,
} from "lucide-react";
import {
  computePrayerTimes,
  getNextPrayer,
  getQiblaBearing,
} from "@/lib/data/prayer";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const prayerIconMap: Record<string, typeof Sun> = {
  sunrise: Sunrise,
  sun: Sun,
  "cloud-sun": CloudSun,
  "sun-medium": SunMedium,
  sunset: Sunset,
  moon: Moon,
};

function getPrayerIcon(icon: string) {
  return prayerIconMap[icon] ?? Sun;
}

const DEFAULT_LOCATION = {
  name: "Mecca, Saudi Arabia",
  lat: 21.4225,
  lng: 39.8262,
};

export function PrayerView() {
  const [lat, setLat] = useState(DEFAULT_LOCATION.lat);
  const [lng, setLng] = useState(DEFAULT_LOCATION.lng);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION.name);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [now, setNow] = useState(() => new Date());

  // Refresh the countdown every minute.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Optional: align the Qibla compass with device orientation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      DeviceOrientationEvent?: typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
    };
    if (!w.DeviceOrientationEvent) return;

    const handler = (e: DeviceOrientationEvent) => {
      const webkitHeading = (
        e as unknown as { webkitCompassHeading?: number }
      ).webkitCompassHeading;
      if (typeof webkitHeading === "number") {
        setDeviceHeading(webkitHeading);
      } else if (typeof e.alpha === "number" && e.alpha !== null) {
        setDeviceHeading((360 - e.alpha) % 360);
      }
    };
    window.addEventListener("deviceorientation", handler, true);
    return () => window.removeEventListener("deviceorientation", handler, true);
  }, []);

  const times = useMemo(
    () => computePrayerTimes(lat, lng, now),
    [lat, lng, now]
  );
  const nextPrayer = useMemo(() => getNextPrayer(times), [times]);
  const qibla = useMemo(() => getQiblaBearing(lat, lng), [lat, lng]);

  const hijriDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        calendar: "islamic",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);
    } catch {
      return "Hijri date unavailable";
    }
  }, [now]);

  const gregorianDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now),
    [now]
  );

  const useMyLocation = () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.geolocation
    ) {
      setLocationError("Geolocation is not supported in this browser.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLocationName("Current Location");
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setLat(DEFAULT_LOCATION.lat);
        setLng(DEFAULT_LOCATION.lng);
        setLocationName(DEFAULT_LOCATION.name);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError(
            "Location permission denied — showing times for Mecca instead."
          );
        } else {
          setLocationError(
            "Unable to determine your location — showing times for Mecca instead."
          );
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  };

  const nextPrayerName = nextPrayer?.name ?? "";

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
            <Compass className="h-7 w-7 text-emerald" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Prayer Times
          </h1>
          <p className="mt-1 font-arabic text-3xl leading-tight text-emerald sm:text-4xl">
            مواقيت الصلاة
          </p>
          <StarDivider className="my-4 w-full max-w-md" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Daily prayer schedule, next-prayer countdown, and Qibla direction
            for your location.
          </p>
          <Badge
            variant="secondary"
            className="mt-3 gap-1 bg-gold-soft text-accent-foreground"
          >
            <Sparkles className="h-3 w-3" />
            Demo content — verify with your local mosque
          </Badge>
        </div>
      </motion.header>

      {/* Location + dates */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6"
      >
        <Card className="border-border/60 bg-card p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-soft">
                <MapPin className="h-5 w-5 text-emerald" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Location
                </p>
                <p className="font-semibold text-foreground">{locationName}</p>
                <p className="text-xs text-muted-foreground">
                  {lat.toFixed(4)}°, {lng.toFixed(4)}°
                </p>
              </div>
            </div>
            <Button
              onClick={useMyLocation}
              disabled={locating}
              variant="outline"
              className="shrink-0 rounded-full border-emerald/30 text-emerald hover:bg-emerald-soft/40"
            >
              <Navigation className="mr-1 h-4 w-4" />
              {locating ? "Locating…" : "Use my location"}
            </Button>
          </div>
          {locationError && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {locationError}
            </p>
          )}
          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border/40 pt-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Gregorian
              </p>
              <p className="font-medium text-foreground">{gregorianDate}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Hijri (approx.)
              </p>
              <p className="font-medium text-emerald">{hijriDate}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Next prayer countdown */}
      {nextPrayer && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald to-emerald/80 p-6 text-primary-foreground shadow-lg sm:p-8">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 opacity-10">
              <StarMark className="h-full w-full" showGold={false} />
            </div>
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                  Next Prayer
                </p>
                <div className="mt-1 flex items-baseline gap-3">
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    {nextPrayer.name}
                  </h2>
                  <span className="font-arabic text-2xl text-primary-foreground/90">
                    {nextPrayer.nameArabic}
                  </span>
                </div>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  at {nextPrayer.time}
                </p>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 px-5 py-3 text-center backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                  Time remaining
                </p>
                <p className="mt-1 text-2xl font-bold sm:text-3xl">
                  {nextPrayer.hoursLeft}h {nextPrayer.minutesLeft}m
                </p>
                <p className="text-xs text-primary-foreground/70">
                  until {nextPrayer.time}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Prayer times grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {times.map((p) => {
          const Icon = getPrayerIcon(p.icon);
          const isNext = p.name === nextPrayerName;
          const isSunrise = p.name === "Sunrise";
          return (
            <motion.div key={p.name} variants={itemVariants}>
              <Card
                className={cn(
                  "relative h-full overflow-hidden border-border/60 bg-card p-4 transition-all",
                  isNext && "border-gold/50 bg-gold-soft/30 shadow-md",
                  isSunrise && !isNext && "border-dashed"
                )}
              >
                {isNext && (
                  <span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Next
                  </span>
                )}
                <div
                  className={cn(
                    "mb-2 flex h-10 w-10 items-center justify-center rounded-xl",
                    isNext
                      ? "bg-gold/20 text-gold"
                      : isSunrise
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
                        : "bg-emerald-soft text-emerald"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-right font-arabic text-base leading-tight text-emerald">
                  {p.nameArabic}
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {p.time}
                </p>
                {isSunrise && (
                  <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                    Time marker — not a prayer
                  </p>
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Qibla compass */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6"
      >
        <Card className="border-border/60 bg-card p-5 sm:p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <QiblaCompass qibla={qibla} deviceHeading={deviceHeading} />

            <div className="flex-1 text-center sm:text-left">
              <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground sm:justify-start">
                <Compass className="h-5 w-5 text-emerald" />
                Qibla Direction
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Face this direction to pray toward the Ka&lsquo;bah in Mecca.
              </p>
              <div className="mt-4 flex flex-wrap items-baseline justify-center gap-2 sm:justify-start">
                <span className="text-4xl font-bold text-emerald">
                  {Math.round(qibla)}°
                </span>
                <span className="text-sm text-muted-foreground">
                  from North
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {deviceHeading != null
                  ? "Compass aligned to your device orientation."
                  : "On a mobile device, the compass aligns to your orientation when available."}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <StarDivider className="mt-8" />
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Prayer times are computed with a simplified astronomical algorithm for
        demonstration. For precise times, please consult your local mosque
        timetable.
      </p>
    </div>
  );
}

/* --------------------------- Qibla compass ---------------------------- */

function QiblaCompass({
  qibla,
  deviceHeading,
}: {
  qibla: number;
  deviceHeading: number | null;
}) {
  // Rotate the dial so the "N" marker points to actual world-North on screen.
  // When deviceHeading is null (no orientation), the dial stays fixed (N at top).
  const dialRotation = deviceHeading != null ? -deviceHeading : 0;
  // The Qibla needle points `qibla` degrees clockwise from world-North.
  // In screen coordinates, world-North is at `dialRotation`, so the needle
  // should be at `qibla + dialRotation` in the screen frame.
  const needleRotation = qibla + dialRotation;
  const transition = "transform 0.25s ease-out";

  return (
    <div className="relative h-48 w-48 shrink-0 sm:h-56 sm:w-56">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-emerald/20 bg-gradient-to-br from-emerald-soft/40 to-gold-soft/30 shadow-inner" />

      {/* Rotating dial with cardinal letters + ticks */}
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${dialRotation}deg)`, transition }}
        aria-hidden
      >
        {/* Cardinal letters */}
        <span className="absolute left-1/2 top-2 -translate-x-1/2 text-sm font-bold text-destructive">
          N
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-foreground">
          E
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground">
          S
        </span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-foreground">
          W
        </span>

        {/* Tick marks every 30° */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-88px)`,
            }}
          >
            <div
              className={cn(
                "w-px",
                i % 3 === 0 ? "h-3 bg-emerald/40" : "h-1.5 bg-border"
              )}
            />
          </div>
        ))}
      </div>

      {/* Qibla needle — vertical bar with Ka'bah marker at the tip */}
      <div
        className="absolute inset-0 flex items-start justify-center"
        style={{ transform: `rotate(${needleRotation}deg)`, transition }}
        aria-hidden
      >
        <div className="mt-2 flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold to-gold/80 text-primary-foreground shadow-md">
            <StarMark className="h-4 w-4" showGold={false} />
          </div>
          <div className="h-12 w-1 rounded-full bg-gradient-to-b from-gold to-gold/30 sm:h-14" />
        </div>
      </div>

      {/* Center pivot */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-emerald shadow-md" />
    </div>
  );
}
