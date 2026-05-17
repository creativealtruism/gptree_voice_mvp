"use client";

import { useState, FormEvent } from "react";

interface TextFallbackProps {
  isVoiceSupported: boolean;
  onSubmit: (text: string) => void;
  disabled: boolean;
}

export function TextFallback({
  isVoiceSupported,
  onSubmit,
  disabled,
}: TextFallbackProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs">
      {!isVoiceSupported && (
        <p className="text-xs text-muted-foreground/70 text-center mb-2">
          voice not available in this browser
        </p>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="or type here..."
          disabled={disabled}
          className="
            flex-1 bg-input/50 border border-border/50 rounded-full
            px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50
            focus:outline-none focus:ring-2 focus:ring-primary/30
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="
            bg-primary/20 text-primary rounded-full px-4 py-2
            text-sm font-medium
            hover:bg-primary/30 
            focus:outline-none focus:ring-2 focus:ring-primary/30
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          "
        >
          send
        </button>
      </div>
    </form>
  );
}
