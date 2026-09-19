"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  User,
  Bot,
  Loader2,
  Trash2,
  BookOpen,
  Library,
  Compass,
  Hand,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { quranData } from "@/lib/data/quran";
import { hadithCollections } from "@/lib/data/hadith";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Citation {
  type: string;
  reference: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  followups?: string[];
}

const SCOPE_OPTIONS = [
  { id: "all", label: "All Topics", icon: Sparkles },
  { id: "Quran", label: "Quran", icon: BookOpen },
  { id: "Hadith", label: "Hadith", icon: Library },
  { id: "Fiqh", label: "Fiqh", icon: Library },
  { id: "Aqeedah", label: "Aqeedah", icon: Library },
  { id: "Seerah", label: "Seerah", icon: Library },
  { id: "Duas", label: "Duas", icon: Hand },
  { id: "Prayer", label: "Prayer", icon: Compass },
];

const SUGGESTED_QUESTIONS = [
  "What are the five pillars of Islam?",
  "Explain the concept of Tawhid (Oneness of Allah).",
  "What is the significance of Surah Al-Fatihah?",
  "How did the compilation of the Quran take place?",
  "What are the etiquettes of making dua?",
  "Tell me about the migration (Hijrah) to Medina.",
];

export function AiView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [scope, setScope] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const sendQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          scope,
        }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response || "I apologize, but I could not generate a response.",
        citations: Array.isArray(data.citations) ? data.citations : [],
        followups: Array.isArray(data.followups) ? data.followups : [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered a connection error. Please check your network and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
  };

  const selectSurah = useAppStore((s) => s.selectSurah);
  const selectHadithCollection = useAppStore((s) => s.selectHadithCollection);
  const setView = useAppStore((s) => s.setView);

  const handleCitationClick = (c: Citation) => {
    const type = c.type.toLowerCase();
    const ref = c.reference.toLowerCase();
    if (type === "quran") {
      // Try to find a matching surah in our dataset by name keyword.
      const surahMatch = quranData.find(
        (s) =>
          ref.includes(s.name.toLowerCase()) ||
          ref.includes(s.englishName.toLowerCase())
      );
      if (surahMatch) {
        selectSurah(surahMatch.id);
        setView("quran");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setView("quran");
    } else if (type === "hadith") {
      // Try to find a matching hadith collection.
      const colMatch = hadithCollections.find(
        (col) =>
          ref.includes(col.name.toLowerCase()) ||
          ref.includes(col.id.toLowerCase())
      );
      if (colMatch) {
        selectHadithCollection(colMatch.id);
      }
      setView("hadith");
    } else if (type === "scholar" || type === "book") {
      setView("library");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">
              Source-grounded Islamic research companion
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Scope selector */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {SCOPE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setScope(opt.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              scope === opt.id
                ? "border-emerald bg-emerald-soft text-emerald"
                : "border-border/60 bg-card text-muted-foreground hover:border-emerald/30 hover:text-foreground"
            )}
          >
            <opt.icon className="h-3 w-3" />
            {opt.label}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="custom-scroll flex-1 overflow-y-auto rounded-2xl border border-border/60 bg-card/50 p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <StarMark className="h-16 w-16" />
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Ask the AI Assistant
                </h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Ask any question about Islam — the Quran, Hadith, Fiqh,
                  Aqeedah, Seerah, and more. Answers are grounded in authentic
                  sources with citations.
                </p>
              </div>
            </motion.div>

            <StarDivider className="w-full max-w-md" />

            <div className="w-full max-w-2xl">
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Suggested Questions
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <motion.button
                    key={q}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => sendQuestion(q)}
                    className="group flex items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-sm"
                  >
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-foreground group-hover:text-emerald">
                      {q}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      msg.role === "user"
                        ? "bg-muted text-muted-foreground"
                        : "bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3",
                      msg.role === "user"
                        ? "bg-emerald text-primary-foreground"
                        : "bg-muted/50 text-foreground"
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.content}
                    </div>
                    {/* Citations */}
                    {msg.role === "assistant" &&
                      msg.citations &&
                      msg.citations.length > 0 && (
                        <div className="mt-3 border-t border-border/40 pt-3">
                          <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            <BookOpen className="h-3 w-3" />
                            Sources
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.citations.map((c, ci) => {
                              const isQuran = c.type.toLowerCase() === "quran";
                              const isHadith = c.type.toLowerCase() === "hadith";
                              return (
                                <button
                                  key={ci}
                                  onClick={() => handleCitationClick(c)}
                                  className={cn(
                                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                                    isQuran
                                      ? "border-emerald/30 bg-emerald-soft/50 text-emerald hover:bg-emerald-soft"
                                      : isHadith
                                        ? "border-gold/30 bg-gold-soft/50 text-accent-foreground hover:bg-gold-soft"
                                        : "border-border/60 bg-card text-muted-foreground hover:text-foreground"
                                  )}
                                  title={isQuran ? "Open in Quran" : isHadith ? "Open in Hadith" : undefined}
                                >
                                  {isQuran && <BookOpen className="h-2.5 w-2.5" />}
                                  {isHadith && <Library className="h-2.5 w-2.5" />}
                                  {c.reference}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    {/* Follow-up suggestions */}
                    {msg.role === "assistant" &&
                      msg.followups &&
                      msg.followups.length > 0 && (
                        <div className="mt-3 border-t border-border/40 pt-3">
                          <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            <Sparkles className="h-3 w-3" />
                            Ask follow-up
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.followups.map((f, fi) => (
                              <button
                                key={fi}
                                onClick={() => sendQuestion(f)}
                                disabled={loading}
                                className="rounded-full border border-emerald/20 bg-background/50 px-3 py-1 text-[11px] text-foreground transition-colors hover:border-emerald/40 hover:bg-emerald-soft/40 disabled:opacity-50"
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-muted/50 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald" />
                  <span className="text-sm text-muted-foreground">
                    Researching authentic sources...
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative flex items-end gap-2 rounded-2xl border border-border/60 bg-card p-2 focus-within:border-emerald/40 focus-within:ring-2 focus-within:ring-emerald/10">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the Quran, Hadith, Fiqh, or any Islamic topic..."
            className="min-h-[44px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            rows={1}
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="h-10 w-10 shrink-0 rounded-xl bg-emerald text-primary-foreground hover:bg-emerald/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI responses are for learning and reflection. For personal rulings,
          consult a qualified scholar.
        </p>
      </form>
    </div>
  );
}
