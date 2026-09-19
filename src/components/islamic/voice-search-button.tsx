"use client";

import { Mic, MicOff } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Web Speech API type declarations (minimal)
interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: { length: number; [i: number]: SpeechRecognitionResultLike };
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

function getSpeechRecognition():
  | (new () => SpeechRecognitionLike)
  | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
  lang?: string;
  className?: string;
}

export function VoiceSearchButton({
  onTranscript,
  lang = "en-US",
  className,
}: VoiceSearchButtonProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Compute support once (lazy — safe for SSR as it returns false on server).
  const [supported] = useState(() => getSpeechRecognition() !== null);

  const handleStart = () => {
    const SR = getSpeechRecognition();
    if (!SR) {
      toast.error("Voice search is not supported in this browser");
      return;
    }
    const recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e: SpeechRecognitionEventLike) => {
      const transcript = e.results[0][0].transcript;
      onTranscript(transcript);
      toast.success(`Heard: "${transcript}"`);
    };
    recognition.onerror = () => {
      toast.error("Could not capture voice. Please try again.");
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const handleStop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  if (!supported) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={listening ? handleStop : handleStart}
      className={cn(
        "shrink-0 rounded-full",
        listening && "bg-red-500/10 text-red-500",
        className
      )}
      aria-label={listening ? "Stop voice search" : "Start voice search"}
      title="Voice search"
    >
      {listening ? (
        <MicOff className="h-4 w-4 animate-pulse" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
