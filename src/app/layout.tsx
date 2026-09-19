import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Islam24x7 — Read. Search. Learn. Explore.",
  description:
    "A modern Islamic knowledge platform for reading the Quran, exploring Hadith, browsing a structured Islamic library, and asking a source-grounded AI research assistant.",
  keywords: [
    "Islam",
    "Quran",
    "Hadith",
    "Islamic Library",
    "Prayer Times",
    "Tasbeeh",
    "Duas",
    "Azkar",
  ],
  authors: [{ name: "Islam24x7" }],
  openGraph: {
    title: "Islam24x7 — Read. Search. Learn. Explore.",
    description:
      "Read the Quran, explore Hadith, browse an Islamic library, and ask a source-grounded AI assistant.",
    siteName: "Islam24x7",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam24x7",
    description:
      "Read the Quran, explore Hadith, browse an Islamic library, and ask a source-grounded AI assistant.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f5e4e" },
    { media: "(prefers-color-scheme: dark)", color: "#0a3d33" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
