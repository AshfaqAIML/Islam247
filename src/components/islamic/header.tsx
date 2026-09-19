"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Search, Menu, X, ChevronDown, Star, ScrollText, Calendar, Bookmark, Heart, Download, Settings, TrendingUp, Scale } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
          {/* More dropdown for discover views */}
          <MoreDropdown
            currentView={view}
            onNavigate={navigate}
            activeDiscover={
              view === "names" ||
              view === "hadith40" ||
              view === "fatawa" ||
              view === "calendar" ||
              view === "favorites" ||
              view === "bookmarks" ||
              view === "history" ||
              view === "tasbeeh" ||
              view === "settings" ||
              view === "download"
            }
          />
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
              <div className="my-2 border-t border-border/40" />
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Discover
              </p>
              {[
                { id: "names" as ViewId, label: "99 Names of Allah" },
                { id: "hadith40" as ViewId, label: "40 Hadith Nawawi" },
                { id: "fatawa" as ViewId, label: "Fatawa" },
                { id: "calendar" as ViewId, label: "Hijri Calendar" },
                { id: "history" as ViewId, label: "Reading History" },
                { id: "favorites" as ViewId, label: "Favorites" },
                { id: "bookmarks" as ViewId, label: "Bookmarks & Notes" },
                { id: "tasbeeh" as ViewId, label: "Tasbeeh Counter" },
                { id: "settings" as ViewId, label: "Settings" },
                { id: "download" as ViewId, label: "Download App" },
              ].map((item) => (
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

const moreItems: {
  id: ViewId;
  label: string;
  desc: string;
  icon: typeof Star;
}[] = [
  { id: "names", label: "99 Names of Allah", desc: "Asma ul Husna", icon: Star },
  { id: "hadith40", label: "40 Hadith Nawawi", desc: "Foundational hadiths", icon: ScrollText },
  { id: "fatawa", label: "Fatawa", desc: "Islamic rulings", icon: Scale },
  { id: "calendar", label: "Hijri Calendar", desc: "Islamic dates & events", icon: Calendar },
  { id: "history", label: "Reading History", desc: "Activity heatmap", icon: TrendingUp },
  { id: "favorites", label: "Favorites", desc: "Your saved items", icon: Bookmark },
  { id: "bookmarks", label: "Bookmarks & Notes", desc: "Highlighted passages", icon: Bookmark },
  { id: "tasbeeh", label: "Tasbeeh Counter", desc: "Dhikr counter", icon: Heart },
  { id: "settings", label: "Settings", desc: "Reader & goals", icon: Settings },
  { id: "download", label: "Download App", desc: "Android APK", icon: Download },
];

function MoreDropdown({
  currentView,
  onNavigate,
  activeDiscover,
}: {
  currentView: ViewId;
  onNavigate: (v: ViewId) => void;
  activeDiscover: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            activeDiscover
              ? "text-emerald"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          More
          <ChevronDown className="h-3.5 w-3.5" />
          {activeDiscover && (
            <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-emerald to-gold" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 border-border/60 bg-popover"
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Discover
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {moreItems.map((item) => {
          const active = currentView === item.id;
          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2",
                active && "bg-emerald-soft"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                  active ? "bg-emerald text-primary-foreground" : "bg-emerald-soft text-emerald"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
              </span>
              <span className="flex flex-col">
                <span className={cn("text-sm font-medium", active ? "text-emerald" : "text-foreground")}>
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
