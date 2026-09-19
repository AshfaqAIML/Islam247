"use client";

import { motion } from "framer-motion";
import {
  Download,
  Smartphone,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronDown,
  Star,
  Info,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { StarMark, StarDivider } from "./star-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

export function DownloadView() {
  const setView = useAppStore((s) => s.setView);
  const navigate = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    toast.info("The Android APK is coming soon. Please check back later!", {
      description: "In the meantime, enjoy the full web experience.",
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 flex justify-center"
        >
          <div className="relative">
            <StarMark className="h-16 w-16" />
          </div>
        </motion.div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Get Islam24x7 on Android
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Take the Quran, Hadith, library, and your spiritual tools with you,
          everywhere you go.
        </p>
      </div>

      {/* Download card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-emerald/20 bg-gradient-to-br from-emerald-soft/30 via-background to-gold-soft/20 p-6 sm:p-8">
          <div className="star-lattice opacity-[0.06]" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald/80 text-primary-foreground shadow-lg">
              <Smartphone className="h-10 w-10" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="text-xl font-bold text-foreground">
                  Islam24x7 Android App
                </h2>
                <Badge className="bg-gold-soft text-accent-foreground">
                  v1.0.0
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                One codebase, full experience — Quran, Hadith, Library, Duas,
                Prayer Times, and AI Assistant.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start">
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  ~18 MB
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  Android 7.0+
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-gold" />
                  Free
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              onClick={handleDownload}
              className="w-full rounded-full bg-emerald text-primary-foreground hover:bg-emerald/90 sm:w-auto"
            >
              <Download className="mr-2 h-5 w-5" />
              Download APK
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("home")}
              className="w-full rounded-full border-border/60 sm:w-auto"
            >
              Continue on Web
            </Button>
          </div>

          <div className="relative z-10 mt-4 flex items-center justify-center gap-2 rounded-lg bg-muted/40 p-2 text-xs text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-gold" />
            <span>
              The APK is being prepared. The web app has all features available
              now.
            </span>
          </div>
        </Card>
      </motion.div>

      <StarDivider className="my-8" />

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="mb-4 text-lg font-bold text-foreground">
          What you get
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Full Quran with Arabic, transliteration, and translation",
            "Hadith collections from Bukhari, Muslim, Abu Dawud, Tirmidhi",
            "Structured Islamic library across Fiqh, Tafsir, Aqeedah & more",
            "Duas and Azkar with built-in counters",
            "Prayer times and Qibla compass",
            "AI research assistant with source-grounded answers",
            "Tasbeeh counter with vibration feedback",
            "Reading progress synced across your device",
            "Light, dark, and sepia reading themes",
            "Offline-friendly — your reading stays with you",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-2 rounded-xl border border-border/60 bg-card p-3"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Installation instructions */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="mb-4 text-lg font-bold text-foreground">
          How to install
        </h2>
        <Card className="border-border/60 bg-card p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="step1" className="border-border/60">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-soft text-xs font-bold text-emerald">
                    1
                  </span>
                  Download the APK file
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Tap the &ldquo;Download APK&rdquo; button above. The file will
                be saved to your device&rsquo;s Downloads folder.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step2" className="border-border/60">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-soft text-xs font-bold text-emerald">
                    2
                  </span>
                  Enable unknown sources
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Go to Settings → Security → enable &ldquo;Install unknown
                apps&rdquo; for your browser. This allows installation of the
                APK. You can disable this after installation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step3" className="border-border/60">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-soft text-xs font-bold text-emerald">
                    3
                  </span>
                  Install the app
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Open the downloaded APK file and tap &ldquo;Install&rdquo;.
                Once installed, you&rsquo;ll find Islam24x7 in your app drawer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step4" className="border-border/60">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-soft text-xs font-bold text-emerald">
                    4
                  </span>
                  Open and explore
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Launch the app and start reading the Quran, exploring Hadith,
                browsing the library, and using all the spiritual tools.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </motion.section>

      {/* Security note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card className="flex items-start gap-3 border-gold/20 bg-gold-soft/10 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Security & Privacy
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Islam24x7 is free and open. The app requires minimal permissions
              (location for prayer times only) and does not collect personal
              data. Always download from this official page to ensure
              authenticity.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
