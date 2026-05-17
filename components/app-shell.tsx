"use client";

import { ReactNode } from "react";
import { AmbientBackground } from "./ambient-background";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="relative min-h-svh flex flex-col items-center justify-between overflow-hidden">
      <AmbientBackground />
      
      {/* Main content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center py-8 px-4">
        {children}
      </div>
    </main>
  );
}
