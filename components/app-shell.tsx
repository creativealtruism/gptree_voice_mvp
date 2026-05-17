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
      
      {/* Cinematic title treatment - like a film title */}
      <header className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
        {/* Primary title - editorial, elegant, poetic */}
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground/85 tracking-[0.08em] font-normal">
          Talking to Trees
        </h1>
        {/* Secondary brand attribution - understated, minimal */}
        <span className="text-[10px] text-muted-foreground/50 tracking-[0.35em] uppercase font-sans font-light">
          by ChatGPTree
        </span>
      </header>
      
      {/* Main content - centered with room for cinematic framing */}
      <div className="flex-1 w-full flex flex-col items-center justify-center pt-28 pb-20 px-6 safe-area-inset">
        {children}
      </div>
      
      {/* Elegant bottom tagline - poetic, memorable */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-35 hover:opacity-50 transition-opacity duration-700">
        <span className="text-[9px] text-muted-foreground tracking-[0.25em] uppercase font-light text-center max-w-[200px]">
          Your voice becomes growth
        </span>
      </footer>
    </main>
  );
}
