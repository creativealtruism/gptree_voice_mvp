"use client";

import { useState, FormEvent } from "react";

interface TextFallbackProps {
  isVoiceSupported: boolean;
  permissionDenied?: boolean;
  onSubmit: (text: string) => void;
  disabled: boolean;
}

export function TextFallback({
  isVoiceSupported,
  permissionDenied = false,
  onSubmit,
  disabled,
}: TextFallbackProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText("");
    }
  };

  // Show prominently if voice is not supported OR permission was denied
  const showProminent = !isVoiceSupported || permissionDenied;
  const isMinimal = !showProminent;

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        w-full max-w-xs transition-all duration-500
        ${isMinimal && !isFocused ? "opacity-30 hover:opacity-60" : "opacity-100"}
      `}
    >
      {/* Show gentle prompt when voice is unavailable */}
      {showProminent && (
        <p className="text-xs text-muted-foreground/60 text-center mb-3 animate-fade-in">
          {permissionDenied 
            ? "speak through words instead..." 
            : "voice not available here, but words grow forests too..."
          }
        </p>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={showProminent ? "share your thoughts..." : "or whisper here..."}
          disabled={disabled}
          className={`
            w-full bg-transparent border-b
            px-2 py-2 text-sm text-foreground/80 
            placeholder:text-muted-foreground/30
            focus:outline-none focus:placeholder:text-muted-foreground/50
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-300
            ${isFocused || showProminent ? "border-primary/40" : "border-border/20"}
          `}
        />
        {/* Subtle send indicator */}
        {text.trim() && (
          <button
            type="submit"
            disabled={disabled}
            className="
              absolute right-0 top-1/2 -translate-y-1/2
              text-xs text-primary/60 hover:text-primary/80
              transition-colors
              disabled:opacity-40
            "
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
