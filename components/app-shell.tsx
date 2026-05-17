"use client";

import { ReactNode } from "react";
import { AmbientBackground } from "./ambient-background";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="relative min-h-svh flex flex-col items-center overflow-hidden">
      <AmbientBackground />
      
      {/* Subtle top wordmark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-70 transition-opacity duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPTree_Logo_Green-epolkFgxlHY4isyaH6pfK54z9hFP07.png"
          alt="ChatGPTree"
          width={100}
          height={20}
          className="brightness-[1.8] contrast-[0.9] saturate-[0.8]"
        />
      </div>
      
      {/* Main content - centered with room for cinematic framing */}
      <div className="flex-1 w-full flex flex-col items-center justify-center pt-20 pb-16 px-6 safe-area-inset">
        {children}
      </div>
      
      {/* Elegant bottom tagline */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-55 transition-opacity duration-700">
        <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-light">
          Every conversation can grow a forest
        </span>
      </div>
    </main>
  );
}
