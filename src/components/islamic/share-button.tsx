"use client";

import { Share2, Copy, Check, Link2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareData {
  title: string;
  text: string;
  arabic?: string;
  reference: string;
  url?: string;
}

export function ShareButton({
  data,
  variant = "ghost",
  size = "icon",
  className,
}: {
  data: ShareData;
  variant?: "ghost" | "outline";
  size?: "icon" | "sm";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const buildShareText = () => {
    let text = "";
    if (data.arabic) {
      text += `${data.arabic}\n\n`;
    }
    text += `"${data.text}"\n\n— ${data.reference}`;
    if (data.url) {
      text += `\n${data.url}`;
    }
    return text;
  };

  const buildShareTitle = () => `${data.title} — Islam24x7`;

  const handleNativeShare = async () => {
    const shareText = buildShareText();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: buildShareTitle(),
          text: shareText,
          url: data.url,
        });
        toast.success("Shared successfully");
      } catch (e) {
        // User cancelled — no toast needed
      }
    } else {
      // Fallback: copy to clipboard
      await copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const copyLink = async () => {
    const url = data.url || (typeof window !== "undefined" ? window.location.href : "");
    await copyToClipboard(url);
  };

  const hasNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          aria-label="Share"
        >
          <Share2 className={size === "icon" ? "h-4 w-4" : "h-3.5 w-3.5"} />
          {size === "sm" && <span className="ml-1">Share</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {hasNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            Share via…
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => copyToClipboard(buildShareText())}
          className="cursor-pointer"
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-emerald" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy text"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyLink} className="cursor-pointer">
          <Link2 className="mr-2 h-4 w-4" />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
