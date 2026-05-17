"use client";

import { type VoiceState } from "@/lib/use-voice-interaction";

type VoiceStatusProps = {
  voiceState: VoiceState;
  transcript: string;
  response: string;
  error: string | null;
};

// Poetic, calm status messages - like meditation prompts
function getStatusText(voiceState: VoiceState): string {
  switch (voiceState) {
    case "idle":
      return "Speak into the grove.";
    case "listening":
      return "listening...";
    case "transcribing":
      return "the forest hears you...";
    case "thinking":
      return "roots are stirring...";
    case "speaking":
      return "";
    case "error":
      return "";
    default:
      return "";
  }
}

// Calm fallback messages for errors - warm, not technical
function getErrorMessage(error: string | null): string | null {
  if (!error) return null;
  
  if (error.toLowerCase().includes("microphone") || error.toLowerCase().includes("permission")) {
    return "The grove waits quietly. You can type below.";
  }
  if (error.toLowerCase().includes("network") || error.toLowerCase().includes("connection")) {
    return "The forest is resting. Try again in a moment.";
  }
  if (error.toLowerCase().includes("not supported")) {
    return "This grove prefers written words.";
  }
  
  return "A gentle pause. Try again.";
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
    <div className="flex flex-col items-center gap-6 text-center px-8 max-w-sm min-h-[110px]">
      {/* Error message - calm, not alarming */}
      {errorMessage && (
        <p className="text-sm text-muted-foreground/80 font-light animate-fade-in tracking-wide">
          {errorMessage}
        </p>
      )}
      
      {/* Status text - editorial serif for idle, sans for active */}
      {!errorMessage && statusText && (
        <p
          className={`
            transition-all duration-700
            ${voiceState === "idle" 
              ? "font-serif text-lg sm:text-xl text-foreground/70 tracking-wide" 
              : "font-sans text-sm text-foreground/60 tracking-widest uppercase"
            }
          `}
        >
          {statusText}
        </p>
      )}

      {/* Transcript display - subtle, italicized */}
      {transcript && voiceState !== "idle" && !errorMessage && (
        <div className="animate-fade-in">
          <p className="text-foreground/50 text-sm font-light italic tracking-wide">
            {`"${transcript}"`}
          </p>
        </div>
      )}

      {/* Response display - warm, prominent */}
      {response && (voiceState === "speaking" || voiceState === "idle") && !errorMessage && (
        <div className="animate-slide-up">
          <p className="text-primary/95 text-lg sm:text-xl font-serif leading-relaxed tracking-wide">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
