"use client";

import { useState, useCallback } from "react";
import { type TreeStage } from "@/lib/use-tree-growth";
import { trackEvent } from "@/lib/analytics";

interface ShareCardProps {
  treeStage: TreeStage;
  plantedTrees: number;
  treeRings: number;
  conversationCount: number;
  onShare: () => void;
}

const STAGE_EMOJI: Record<TreeStage, string> = {
  acorn: "🌰",
  sprout: "🌱",
  sapling: "🌿",
  tree: "🌳",
};

export function ShareCard({
  treeStage,
  plantedTrees,
  treeRings,
  conversationCount,
  onShare,
}: ShareCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `my conversations are growing a forest. ${STAGE_EMOJI[treeStage]}

${conversationCount} conversations
${plantedTrees} real trees planted
${treeRings} rings grown

talk. grow. plant. share.

chatgptree.ai`;

  const handleShare = useCallback(async () => {
    trackEvent("share_clicked");

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ChatGPTree Voice",
          text: shareText,
          url: "https://chatgptree.ai",
        });
        onShare();
        setIsOpen(false);
        return;
      } catch (e) {
        // User cancelled or share failed, fall back to copy
        if ((e as Error).name === "AbortError") return;
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      onShare();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy to clipboard");
    }
  }, [shareText, onShare]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="
          text-xs text-muted-foreground/60
          hover:text-muted-foreground/80
          transition-colors
        "
      >
        share my tree
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div
        className="
          relative w-full max-w-sm p-6 rounded-2xl
          bg-card border border-border/50
          animate-slide-up
        "
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="
            absolute top-4 right-4 p-2
            text-muted-foreground/50 hover:text-muted-foreground
            transition-colors
          "
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>

        {/* Card content */}
        <div className="text-center space-y-4">
          {/* Tree emoji */}
          <div className="text-5xl">{STAGE_EMOJI[treeStage]}</div>

          {/* Stats */}
          <div className="space-y-1">
            <p className="text-lg text-foreground font-light">
              {conversationCount} conversations
            </p>
            <p className="text-sm text-muted-foreground">
              {plantedTrees} trees planted
            </p>
            <p className="text-sm text-muted-foreground">{treeRings} rings grown</p>
          </div>

          {/* Poetic line */}
          <p className="text-primary text-sm italic pt-2">
            my conversations are growing a forest.
          </p>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="
              w-full py-3 rounded-full
              bg-primary text-primary-foreground
              hover:bg-primary/90
              focus:outline-none focus:ring-2 focus:ring-primary/30
              transition-colors font-medium
            "
          >
            {copied ? "copied!" : "share my tree"}
          </button>

          {/* Tagline */}
          <p className="text-xs text-muted-foreground/50">
            talk. grow. plant. share.
          </p>
        </div>
      </div>
    </div>
  );
}
