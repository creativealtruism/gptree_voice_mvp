"use client";

import { type VoiceState } from "@/lib/use-voice-interaction";

interface VoiceStatusProps {
  voiceState: VoiceState;
  transcript: string;
  response: string;
  error: string | null;
}

function getStatusText(voiceState: VoiceState): string {
  switch (voiceState) {
    case "idle":
      return "tap the acorn. ask anything.";
    case "listening":
      return "listening...";
    case "transcribing":
      return "hearing your words...";
    case "thinking":
      return "the grove is thinking...";
    case "speaking":
      return "the tree is answering...";
    case "error":
      return "something went wrong.";
    default:
      return "";
  }
}

export function VoiceStatus({
  voiceState,
  transcript,
  response,
  error,
}: VoiceStatusProps) {
  const statusText = getStatusText(voiceState);

  return (
    <div className="flex flex-col items-center gap-4 text-center px-6 max-w-sm">
      {/* Status text */}
      <p
        className={`
          text-sm sm:text-base font-light tracking-wide
          transition-all duration-500
          ${voiceState === "idle" ? "text-muted-foreground" : "text-foreground"}
        `}
      >
        {error || statusText}
      </p>

      {/* Transcript display */}
      {transcript && voiceState !== "idle" && (
        <div className="animate-fade-in">
          <p className="text-xs text-muted-foreground/70 mb-1">you said:</p>
          <p className="text-foreground/90 text-sm italic">{`"${transcript}"`}</p>
        </div>
      )}

      {/* Response display */}
      {response && (voiceState === "speaking" || voiceState === "idle") && (
        <div className="animate-slide-up mt-2">
          <p className="text-primary text-base sm:text-lg font-light leading-relaxed">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
