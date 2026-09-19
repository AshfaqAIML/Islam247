"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { quranData } from "@/lib/data/quran";
import type { Surah } from "@/lib/types";
import { StarMark } from "./star-mark";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Reciters available on the everyayah.com CDN.
// Format: https://everyayah.com/data/{reciter}/{:03d}{:03d}.mp3  (surah + ayah, zero-padded to 3)
const RECITERS = [
  { id: "ar.alafasy", label: "Mishary Alafasy" },
  { id: "ar.abdulbasit_murattal", label: "Abdul Basit (Murattal)" },
  { id: "ar.husary", label: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", label: "Al-Minshawi" },
  { id: "ar.abdulrahmaansudais", label: "Abdurrahman As-Sudais" },
  { id: "ar.shaatree_Abdul_Basit", label: "Abdul Basit (Shatri)" },
];

function ayahUrl(reciter: string, surah: number, ayah: number) {
  const s = String(surah).padStart(3, "0");
  const a = String(ayah).padStart(3, "0");
  return `https://everyayah.com/data/${reciter}/${s}${a}.mp3`;
}

function fmtTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const audioSurahId = useAppStore((s) => s.audioSurahId);
  const surah = quranData.find((s) => s.id === audioSurahId) || null;

  return (
    <AnimatePresence>
      {surah && <PlayerBar key={surah.id} surah={surah} />}
    </AnimatePresence>
  );
}

function PlayerBar({ surah }: { surah: Surah }) {
  const reciter = useAppStore((s) => s.audioReciter);
  const isPlaying = useAppStore((s) => s.audioIsPlaying);
  const currentTime = useAppStore((s) => s.audioCurrentTime);
  const duration = useAppStore((s) => s.audioDuration);
  const setAudioSurah = useAppStore((s) => s.setAudioSurah);
  const setAudioReciter = useAppStore((s) => s.setAudioReciter);
  const setAudioPlaying = useAppStore((s) => s.setAudioPlaying);
  const setAudioTime = useAppStore((s) => s.setAudioTime);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  // currentAyah starts at 1; remounts when surah changes (keyed parent).
  const [currentAyah, setCurrentAyah] = useState(1);

  const ayahCount = surah.ayahs.length;
  const currentAyahObj = surah.ayahs.find((a) => a.number === currentAyah);

  // Create audio element once.
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
    }
    const audio = audioRef.current;
    const onTime = () => setAudioTime(audio.currentTime, audio.duration);
    const onLoaded = () => {
      setLoading(false);
      setAudioTime(0, audio.duration);
    };
    const onWaiting = () => setLoading(true);
    const onPlaying = () => {
      setLoading(false);
      setAudioPlaying(true);
    };
    const onPause = () => setAudioPlaying(false);
    const onEnded = () => {
      setCurrentAyah((prev) => {
        const next = prev + 1;
        if (next > ayahCount) {
          setAudioPlaying(false);
          return prev;
        }
        return next;
      });
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [ayahCount, setAudioPlaying, setAudioTime]);

  // Load + play when ayah/reciter changes (surah change remounts via key).
  useEffect(() => {
    if (!audioRef.current) return;
    const url = ayahUrl(reciter, surah.id, currentAyah);
    audioRef.current.src = url;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => {
        setLoading(false);
        setAudioPlaying(true);
      })
      .catch(() => setAudioPlaying(false));
  }, [reciter, surah.id, currentAyah, setAudioPlaying]);

  // Cleanup audio on unmount (surah switch / close).
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    } else {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  }, [setAudioPlaying]);

  const seek = (val: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val[0];
    setAudioTime(val[0]);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  const prevAyah = () => setCurrentAyah((p) => Math.max(1, p - 1));
  const nextAyah = () => {
    if (currentAyah < ayahCount) setCurrentAyah((p) => p + 1);
  };

  const close = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setAudioSurah(null);
    setAudioPlaying(false);
  };

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-16 left-1/2 z-40 w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 lg:bottom-4"
    >
      <div className="overflow-hidden rounded-2xl border border-emerald/30 bg-background/95 shadow-2xl backdrop-blur-lg">
        {/* Progress bar (top) */}
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-emerald to-gold transition-[width] duration-200"
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>

        <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
          {/* Surah icon */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow">
            <StarMark className="h-6 w-6" showGold={false} />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald/80">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {surah.name}
              </p>
              <span className="shrink-0 rounded-full bg-emerald-soft px-2 py-0.5 text-[10px] font-medium text-emerald">
                Ayah {currentAyah}/{ayahCount}
              </span>
            </div>
            {currentAyahObj && (
              <p className="truncate text-right font-arabic text-sm leading-tight text-muted-foreground">
                {currentAyahObj.arabic}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevAyah}
              disabled={currentAyah <= 1}
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-emerald"
              aria-label="Previous ayah"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              onClick={togglePlay}
              size="icon"
              className="h-11 w-11 rounded-full bg-emerald text-primary-foreground shadow-md hover:bg-emerald/90"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="ml-0.5 h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextAyah}
              disabled={currentAyah >= ayahCount}
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-emerald"
              aria-label="Next ayah"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className={cn(
                "hidden h-9 w-9 rounded-full sm:inline-flex",
                muted
                  ? "text-emerald"
                  : "text-muted-foreground hover:text-emerald"
              )}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive"
              aria-label="Close player"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Seek bar + reciter (expanded on sm+) */}
        <div className="flex items-center gap-3 border-t border-border/40 px-3 pb-3 sm:px-4">
          <span className="w-10 text-right text-[10px] font-medium tabular-nums text-muted-foreground">
            {fmtTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 1}
            step={1}
            onValueChange={seek}
            className="flex-1"
            aria-label="Seek"
          />
          <span className="w-10 text-[10px] font-medium tabular-nums text-muted-foreground">
            {fmtTime(duration)}
          </span>
          <Select value={reciter} onValueChange={setAudioReciter}>
            <SelectTrigger
              className="hidden h-8 w-44 rounded-full border-border/60 bg-muted/40 text-xs sm:flex"
              aria-label="Select reciter"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RECITERS.map((r) => (
                <SelectItem key={r.id} value={r.id} className="text-xs">
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
