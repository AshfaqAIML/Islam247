"use client";

import { Heart, BookOpen, Compass } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { StarMark } from "./star-mark";

export function Footer() {
  const setView = useAppStore((s) => s.setView);
  const navigate = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-border/60 bg-gradient-to-b from-background to-muted/30 pb-20 lg:pb-0">
      <div className="ornamental-border opacity-60" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <StarMark className="h-8 w-8" />
              <span className="text-lg font-bold">
                Islam<span className="text-emerald">24</span>
                <span className="text-gold">x</span>7
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A modern Islamic knowledge platform for reading the Quran,
              exploring Hadith, browsing a structured library, and asking a
              source-grounded AI research assistant.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Read. Search. Learn. Explore.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { label: "Quran", view: "quran" as ViewId },
                { label: "Hadith Collections", view: "hadith" as ViewId },
                { label: "Islamic Library", view: "library" as ViewId },
                { label: "Duas & Azkar", view: "duas" as ViewId },
              ].map((l) => (
                <li key={l.view}>
                  <button
                    onClick={() => navigate(l.view)}
                    className="text-muted-foreground transition-colors hover:text-emerald"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Tools</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { label: "Prayer Times", view: "prayer" as ViewId, icon: Compass },
                { label: "Tasbeeh Counter", view: "tasbeeh" as ViewId, icon: Heart },
                { label: "Hijri Calendar", view: "calendar" as ViewId, icon: BookOpen },
                { label: "Favorites", view: "favorites" as ViewId, icon: BookOpen },
              ].map((l) => (
                <li key={l.view}>
                  <button
                    onClick={() => navigate(l.view)}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-emerald"
                  >
                    <l.icon className="h-3.5 w-3.5" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Discover row */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-border/40 pt-4">
          {([
            { id: "names" as ViewId, label: "99 Names" },
            { id: "hadith40" as ViewId, label: "40 Hadith" },
            { id: "bookmarks" as ViewId, label: "Bookmarks" },
            { id: "ai" as ViewId, label: "AI Assistant" },
            { id: "search" as ViewId, label: "Search" },
            { id: "settings" as ViewId, label: "Settings" },
            { id: "download" as ViewId, label: "Download" },
          ]).map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className="rounded-full border border-border/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-emerald/30 hover:text-emerald"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Islam24x7. Built for learning and
            reflection.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Demo content — always verify with authenticated sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
