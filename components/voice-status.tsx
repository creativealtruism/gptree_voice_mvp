"use client";

import { type VoiceState } from "@/lib/use-voice-interaction";

interface VoiceStatusProps {
  voiceState: VoiceState;
  transcript: string;
  response: string;
  error: string | null;
}

// Poetic, calm status messages
function getStatusText(voiceState: VoiceState): string {
  switch (voiceState) {
    case "idle":
      return "touch the acorn to speak";
    case "listening":
      return "listening...";
    case "transcribing":
      return "hearing you...";
    case "thinking":
      return "the grove stirs...";
    case "speaking":
      return "";
    case "error":
      return "";
    default:
      return "";
  }
}

// Calm fallback messages for errors
function getErrorMessage(error: string | null): string | null {
  if (!error) return null;
  
  // Transform technical errors into poetic fallbacks
  if (error.toLowerCase().includes("microphone") || error.toLowerCase().includes("permission")) {
    return "voice feels shy right now. you can type below.";
  }
  if (error.toLowerCase().includes("network") || error.toLowerCase().includes("connection")) {
    return "the forest is quiet. try again in a moment.";
  }
  if (error.toLowerCase().includes("not supported")) {
    return "this grove prefers typing. speak through words below.";
  }
  
  return "a gentle pause. try again.";
}

export function VoiceStatus({
  voiceState,
  transcript,
  response,
  error,
}: VoiceStatusProps) {
  const statusText = getStatusText(voiceState);
  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex flex-col items-center gap-5 text-center px-8 max-w-sm min-h-[100px]">
      {/* Error message - calm, not alarming */}
      {errorMessage && (
        <p className="text-sm text-muted-foreground/70 font-light animate-fade-in">
          {errorMessage}
        </p>
      )}
      
      {/* Status text - only when no error and not speaking */}
      {!errorMessage && statusText && (
        <p
          className={`
            text-sm sm:text-base font-light tracking-wide
            transition-all duration-700
            ${voiceState === "idle" ? "text-muted-foreground/60" : "text-foreground/80"}
          `}
        >
          {statusText}
        </p>
      )}

      {/* Transcript display - subtle */}
      {transcript && voiceState !== "idle" && !errorMessage && (
        <div className="animate-fade-in">
          <p className="text-foreground/60 text-sm font-light italic">
            {`"${transcript}"`}
          </p>
        </div>
      )}

      {/* Response display - the main focus */}
      {response && (voiceState === "speaking" || voiceState === "idle") && !errorMessage && (
        <div className="animate-slide-up">
          <p className="text-primary/90 text-lg sm:text-xl font-light leading-relaxed tracking-wide">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
