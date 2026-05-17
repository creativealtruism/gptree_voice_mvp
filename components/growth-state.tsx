"use client";

import { type TreeStage } from "@/lib/use-tree-growth";

type GrowthStateProps = {
  treeStage: TreeStage;
  conversationCount: number;
  progressToNext: number;
};

// Elegant, organic progress visualization - not a dashboard element
export function GrowthState({
  treeStage,
  conversationCount,
  progressToNext,
}: GrowthStateProps) {
  const isMaxStage = treeStage === "tree";

  // Only show after first conversation
  if (conversationCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      {/* Organic progress visualization - concentric ring feel */}
      {!isMaxStage && (
        <div className="relative w-24 h-1.5">
          {/* Background track */}
          <div className="absolute inset-0 rounded-full bg-border/25" />
          {/* Progress - warm, alive */}
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
            style={{ 
              width: `${progressToNext}%`,
              background: `linear-gradient(90deg, oklch(0.74 0.12 85 / 0.5) 0%, oklch(0.74 0.12 85 / 0.75) 100%)`
            }}
          />
          {/* Soft glow at the leading edge */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/70 blur-sm transition-all duration-1000"
            style={{ left: `calc(${Math.max(progressToNext, 5)}% - 5px)` }}
          />
        </div>
      )}

      {/* Poetic growth message */}
      <p className="text-xs text-primary/55 font-light tracking-[0.15em]">
        your words became growth
      </p>
    </div>
  );
}
