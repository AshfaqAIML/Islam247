"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Check,
  ChevronLeft,
  Vibrate,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const DHIKR_OPTIONS = [
  { name: "SubhanAllah", arabic: "سُبْحَانَ اللَّه", meaning: "Glory to Allah", target: 33 },
  { name: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّه", meaning: "All praise is for Allah", target: 33 },
  { name: "Allahu Akbar", arabic: "اللَّهُ أَكْبَر", meaning: "Allah is the Greatest", target: 34 },
  { name: "La ilaha illa Allah", arabic: "لَا إِلَهَ إِلَّا اللَّه", meaning: "There is no god but Allah", target: 100 },
  { name: "Astaghfirullah", arabic: "أَسْتَغْفِرُ اللَّه", meaning: "I seek Allah's forgiveness", target: 100 },
  { name: "La hawla wa la quwwata illa billah", arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّه", meaning: "There is no power except with Allah", target: 100 },
  { name: "SubhanAllahi wa bihamdihi", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", meaning: "Glory and praise be to Allah", target: 100 },
];

export function TasbeehView() {
  const setView = useAppStore((s) => s.setView);
  const tasbeehCount = useAppStore((s) => s.tasbeehCount);
  const tasbeehTotal = useAppStore((s) => s.tasbeehTotal);
  const tasbeehTarget = useAppStore((s) => s.tasbeehTarget);
  const currentDhikr = useAppStore((s) => s.currentDhikr);
  const incrementTasbeeh = useAppStore((s) => s.incrementTasbeeh);
  const resetTasbeeh = useAppStore((s) => s.resetTasbeeh);
  const setTasbeehTarget = useAppStore((s) => s.setTasbeehTarget);
  const setDhikr = useAppStore((s) => s.setDhikr);

  const [pressed, setPressed] = useState(false);
  const [vibrate, setVibrate] = useState(true);

  const currentOption =
    DHIKR_OPTIONS.find((d) => d.name === currentDhikr) || DHIKR_OPTIONS[0];

  useEffect(() => {
    setTasbeehTarget(currentOption.target);
  }, [currentOption, setTasbeehTarget]);

  const completed = tasbeehTarget > 0 && tasbeehCount >= tasbeehTarget;

  // Vibrate when a cycle is completed
  useEffect(() => {
    if (completed && vibrate && "navigator" in window && "vibrate" in navigator) {
      navigator.vibrate(200);
    }
  }, [completed, vibrate]);

  const handleTap = () => {
    incrementTasbeeh();
    setPressed(true);
    if (vibrate && "navigator" in window && "vibrate" in navigator) {
      navigator.vibrate(15);
    }
    setTimeout(() => setPressed(false), 150);
  };

  const handleDhikrChange = (name: string) => {
    const opt = DHIKR_OPTIONS.find((d) => d.name === name);
    if (opt) {
      setDhikr(opt.name);
    }
  };

  const progress = tasbeehTarget > 0 ? (tasbeehCount / tasbeehTarget) * 100 : 0;
  const cycles = Math.floor(tasbeehCount / tasbeehTarget);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView("home")}
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <StarMark className="h-8 w-8" />
          <h1 className="text-xl font-bold text-foreground">Tasbeeh Counter</h1>
        </div>
      </div>

      {/* Dhikr selector */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {DHIKR_OPTIONS.map((opt) => (
          <button
            key={opt.name}
            onClick={() => handleDhikrChange(opt.name)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              currentDhikr === opt.name
                ? "border-emerald bg-emerald-soft text-emerald"
                : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-foreground"
            )}
          >
            {opt.name}
          </button>
        ))}
      </div>

      {/* Main counter card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className={cn(
            "relative overflow-hidden border-2 p-6 transition-colors sm:p-8",
            completed
              ? "border-gold bg-gradient-to-br from-gold-soft/40 to-card"
              : "border-emerald/20 bg-gradient-to-br from-emerald-soft/20 to-card"
          )}
        >
          {/* Decorative star */}
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-16 -translate-y-16 opacity-[0.06]">
            <StarMark className="h-full w-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Dhikr display */}
            <div className="text-center">
              <p className="font-arabic text-3xl leading-loose text-foreground sm:text-4xl">
                {currentOption.arabic}
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald">
                {currentOption.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentOption.meaning}
              </p>
            </div>

            <StarDivider className="my-6 w-full" />

            {/* Counter circle */}
            <button
              onClick={handleTap}
              disabled={completed}
              className={cn(
                "relative flex h-48 w-48 items-center justify-center rounded-full transition-all active:scale-95 sm:h-56 sm:w-56",
                pressed && "tasbeeh-press",
                completed
                  ? "bg-gradient-to-br from-gold to-amber-600"
                  : "bg-gradient-to-br from-emerald to-emerald/80"
              )}
              aria-label="Increment tasbeeh counter"
            >
              {/* Progress ring */}
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary-foreground/20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 92}`}
                  strokeDashoffset={`${2 * Math.PI * 92 * (1 - progress / 100)}`}
                  className="text-primary-foreground transition-all duration-200"
                />
              </svg>
              <div className="relative z-10 flex flex-col items-center text-primary-foreground">
                {completed ? (
                  <>
                    <Check className="h-12 w-12" />
                    <span className="mt-1 text-sm font-semibold">Complete!</span>
                  </>
                ) : (
                  <>
                    <span className="text-5xl font-bold sm:text-6xl">
                      {tasbeehCount}
                    </span>
                    <span className="mt-1 text-sm opacity-80">
                      of {tasbeehTarget}
                    </span>
                  </>
                )}
              </div>
            </button>

            {/* Progress bar */}
            <div className="mt-6 w-full max-w-xs">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>
                  {tasbeehCount} / {tasbeehTarget}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Stats */}
            <div className="mt-6 grid w-full grid-cols-3 gap-3">
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">Cycles</p>
                <p className="text-lg font-bold text-foreground">{cycles}</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-foreground">
                  {tasbeehTotal}
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="text-lg font-bold text-foreground">
                  {Math.max(0, tasbeehTarget - tasbeehCount)}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetTasbeeh}
                className="rounded-full border-border/60"
              >
                <RotateCcw className="mr-1.5 h-4 w-4" />
                Reset count
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVibrate((v) => !v)}
                className={cn(
                  "rounded-full border-border/60",
                  vibrate && "border-emerald/40 text-emerald"
                )}
              >
                <Vibrate className="mr-1.5 h-4 w-4" />
                {vibrate ? "Vibration on" : "Vibration off"}
              </Button>
            </div>

            {completed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 flex items-center gap-2 rounded-full bg-gold-soft px-4 py-2 text-sm font-medium text-accent-foreground"
              >
                <Sparkles className="h-4 w-4" />
                Masha&rsquo;Allah! You completed this dhikr.
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Virtue note */}
      <Card className="mt-6 border-gold/20 bg-gold-soft/10 p-5">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-gold" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              The Virtue of Dhikr
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The Prophet ﷺ said: &ldquo;Whoever says SubhanAllahi wa
              bihamdihi one hundred times a day, his sins will be forgiven even
              if they are like the foam of the sea.&rdquo;
              <span className="mt-1 block text-xs text-gold">
                — Sahih al-Bukhari #6405
              </span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
