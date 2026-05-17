"use client";

import { ReactNode } from "react";
import { AmbientBackground } from "./ambient-background";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="relative min-h-svh flex flex-col items-center overflow-hidden">
      <AmbientBackground />
      
      {/* Main content - centered with room for cinematic framing */}
      <div className="flex-1 w-full flex flex-col items-center justify-center py-12 px-6 safe-area-inset">
        {children}
      </div>
      
      {/* Elegant footer lockup - like a signature on a painting */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-[0.35] hover:opacity-50 transition-opacity duration-700">
        <span className="text-[9px] text-muted-foreground/70 tracking-[0.25em] uppercase font-light">
          powered by
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPTree_Logo_Green-epolkFgxlHY4isyaH6pfK54z9hFP07.png"
          alt="ChatGPTree"
          width={120}
          height={24}
          className="opacity-90 brightness-[2] contrast-[0.85]"
          style={{ filter: "brightness(2) contrast(0.85) saturate(0.7)" }}
        />
      </div>
    </main>
  );
}
