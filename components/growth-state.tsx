"use client";

import { type TreeStage } from "@/lib/use-tree-growth";

interface GrowthStateProps {
  treeStage: TreeStage;
  conversationCount: number;
  progressToNext: number;
}

// Visual progress bar that feels organic, not dashboard-like
export function GrowthState({
  treeStage,
  conversationCount,
  progressToNext,
}: GrowthStateProps) {
  const isMaxStage = treeStage === "tree";

  // Only show after first conversation - keep initial state clean
  if (conversationCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in">
      {/* Organic progress visualization - not a bar, but subtle growth rings */}
      {!isMaxStage && (
        <div className="relative w-20 h-1">
          {/* Background track - very subtle */}
          <div className="absolute inset-0 rounded-full bg-border/20" />
          {/* Progress - warm, alive */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary/40 transition-all duration-1000"
            style={{ width: `${progressToNext}%` }}
          />
          {/* Glow at the tip */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60 blur-sm transition-all duration-1000"
            style={{ left: `calc(${progressToNext}% - 4px)` }}
          />
        </div>
      )}

      {/* Poetic growth message - only appears momentarily after conversations */}
      {conversationCount > 0 && (
        <p className="text-xs text-primary/50 font-light tracking-wider">
          your words became growth
        </p>
      )}
    </div>
  );
}
