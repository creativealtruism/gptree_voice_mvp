"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

interface ShareCardProps {
  plantedTrees: number;
  treeRings: number;
  conversationCount: number;
  onShare: () => void;
}

export function ShareCard({
  plantedTrees,
  treeRings,
  conversationCount,
  onShare,
}: ShareCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `my conversations are growing a forest.

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

  // Only show after there's something to share
  if (conversationCount === 0 && plantedTrees === 0) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="
          text-xs text-muted-foreground/40
          hover:text-muted-foreground/60
          transition-colors duration-300
        "
      >
        share your grove
      </button>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      
      <div
        className="
          relative w-full max-w-xs p-8 rounded-3xl
          bg-card/80 border border-border/30
          animate-slide-up backdrop-blur-sm
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - subtle */}
        <button
          onClick={() => setIsOpen(false)}
          className="
            absolute top-4 right-4 p-2
            text-muted-foreground/30 hover:text-muted-foreground/60
            transition-colors duration-300
          "
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>

        {/* Card content */}
        <div className="text-center space-y-6">
          {/* Logo mark at top */}
          <div className="flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPTree_Icon_WhiteBox%20%282%29-zOGS7E936PU926nk3fV8fIXXzeocRM.png"
              alt="ChatGPTree"
              width={48}
              height={48}
              className="rounded-xl opacity-80"
            />
          </div>

          {/* Poetic header */}
          <p className="text-foreground/80 text-lg font-light leading-relaxed">
            my conversations are
            <br />
            <span className="text-primary">growing a forest</span>
          </p>

          {/* Stats - subtle, not dashboard-like */}
          <div className="flex justify-center gap-8 py-4">
            <div className="text-center">
              <p className="text-2xl text-foreground/90 font-light">{conversationCount}</p>
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">voices</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-foreground/90 font-light">{treeRings}</p>
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">rings</p>
            </div>
            {plantedTrees > 0 && (
              <div className="text-center">
                <p className="text-2xl text-moss/80 font-light">{plantedTrees}</p>
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">planted</p>
              </div>
            )}
          </div>

          {/* Share button - elegant */}
          <button
            onClick={handleShare}
            className="
              w-full py-3 rounded-full
              bg-primary/20 text-primary border border-primary/30
              hover:bg-primary/30 hover:border-primary/50
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
              transition-all duration-300 font-light tracking-wide
            "
          >
            {copied ? "copied" : "share"}
          </button>

          {/* Tagline */}
          <p className="text-[10px] text-muted-foreground/30 tracking-widest uppercase">
            talk. grow. plant. share.
          </p>
        </div>
      </div>
    </div>
  );
}
