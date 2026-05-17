"use client";

import { trackEvent } from "@/lib/analytics";

const STRIPE_LINK = "https://buy.stripe.com/4gM14o02149u0Apeso9EI05";

interface PlantTreeCTAProps {
  plantedTrees: number;
  onPlantSimulated: () => void;
}

export function PlantTreeCTA({ plantedTrees, onPlantSimulated }: PlantTreeCTAProps) {
  const handlePlantClick = () => {
    trackEvent("plant_tree_clicked");
    window.open(STRIPE_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ambient stewardship message */}
      <button
        onClick={handlePlantClick}
        className="
          group relative
          text-sm text-muted-foreground/50 font-light tracking-wide
          hover:text-muted-foreground/70
          focus:outline-none focus-visible:text-muted-foreground/70
          transition-all duration-500
        "
      >
        <span className="border-b border-transparent group-hover:border-muted-foreground/30 transition-all duration-300">
          become a grove steward
        </span>
        <span className="block text-xs text-muted-foreground/30 mt-1 group-hover:text-muted-foreground/50 transition-colors">
          plant a real tree each month
        </span>
      </button>

      {/* Simulated plant (for MVP testing) - very subtle */}
      <button
        onClick={onPlantSimulated}
        className="
          text-[10px] text-muted-foreground/20 
          hover:text-muted-foreground/40
          transition-colors
        "
      >
        i planted
      </button>

      {/* Planted trees - celebratory but not loud */}
      {plantedTrees > 0 && (
        <p className="text-xs text-moss/60 font-light animate-fade-in">
          {plantedTrees} {plantedTrees === 1 ? "tree" : "trees"} planted in the world
        </p>
      )}
    </div>
  );
}
