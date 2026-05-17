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
      
      {/* Subtle brand mark at bottom - barely visible */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-20">
        <span className="text-[8px] text-muted-foreground tracking-[0.3em] uppercase">
          chatgptree
        </span>
      </div>
    </main>
  );
}
