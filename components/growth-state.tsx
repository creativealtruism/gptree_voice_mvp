"use client";

import { type TreeStage } from "@/lib/use-tree-growth";

interface GrowthStateProps {
  treeStage: TreeStage;
  conversationCount: number;
  progressToNext: number;
}

const STAGE_LABELS: Record<TreeStage, string> = {
  acorn: "acorn",
  sprout: "sprout",
  sapling: "sapling",
  tree: "tree",
};

export function GrowthState({
  treeStage,
  conversationCount,
  progressToNext,
}: GrowthStateProps) {
  const isMaxStage = treeStage === "tree";

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {/* Stage label */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground/70">stage:</span>
        <span className="text-sm text-foreground/90 font-medium">
          {STAGE_LABELS[treeStage]}
        </span>
      </div>

      {/* Progress bar */}
      {!isMaxStage && (
        <div className="w-32 h-1 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/60 rounded-full transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
      )}

      {/* Conversation count */}
      <p className="text-xs text-muted-foreground/50">
        {conversationCount} {conversationCount === 1 ? "conversation" : "conversations"}
      </p>

      {/* Growth message after conversation */}
      {conversationCount > 0 && (
        <p className="text-xs text-primary/70 animate-fade-in">
          your voice became growth.
        </p>
      )}
    </div>
  );
}
