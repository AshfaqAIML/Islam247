"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { StarMark } from "./star-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems: { id: ViewId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "quran", label: "Quran" },
  { id: "hadith", label: "Hadith" },
  { id: "library", label: "Library" },
  { id: "duas", label: "Duas" },
  { id: "prayer", label: "Prayer" },
  { id: "ai", label: "AI Assistant" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);

  useState(() => setMounted(true));

  const navigate = (v: ViewId) => {
    setView(v);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    if (q.trim()) {
      setSearchQuery(q.trim());
      setView("search");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="ornamental-border" />
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Islam24x7 home"
        >
          <StarMark className="h-9 w-9 drop-shadow-sm" />
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Islam<span className="text-emerald">24</span>
              <span className="text-gold">x</span>7
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Read · Search · Learn
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                view === item.id
                  ? "text-emerald"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {view === item.id && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-emerald to-gold" />
              )}
            </button>
          ))}
        </nav>

        {/* Search (desktop) */}
        <form
          onSubmit={handleSearch}
          className="ml-auto hidden max-w-xs flex-1 items-center md:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Search Quran, Hadith, Duas..."
              className="h-9 rounded-full border-border/60 bg-muted/50 pl-9 pr-4 text-sm focus-visible:ring-emerald"
            />
          </div>
        </form>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="shrink-0 rounded-full"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5 text-gold" />
          ) : (
            <Moon className="h-5 w-5 text-emerald" />
          )}
        </Button>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] border-l-border/60 bg-background"
          >
            <SheetTitle className="flex items-center gap-2">
              <StarMark className="h-7 w-7" />
              <span className="font-bold">
                Islam<span className="text-emerald">24</span>
                <span className="text-gold">x</span>7
              </span>
            </SheetTitle>
            <div className="mt-6 space-y-1">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="q"
                    placeholder="Search..."
                    className="h-10 rounded-full border-border/60 bg-muted/50 pl-9 pr-4"
                  />
                </div>
              </form>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    view === item.id
                      ? "bg-emerald-soft text-emerald"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigate("tasbeeh")}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  view === "tasbeeh"
                    ? "bg-emerald-soft text-emerald"
                    : "text-foreground hover:bg-muted"
                )}
              >
                Tasbeeh Counter
              </button>
              <button
                onClick={() => navigate("download")}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  view === "download"
                    ? "bg-emerald-soft text-emerald"
                    : "text-foreground hover:bg-muted"
                )}
              >
                Download App
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
