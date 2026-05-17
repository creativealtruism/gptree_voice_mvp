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

  const handleSimulatePlant = () => {
    // TODO: In production, this should be triggered by Stripe webhook
    // after successful payment verification
    onPlantSimulated();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Plant tree button */}
      <button
        onClick={handlePlantClick}
        className="
          group relative px-6 py-3 rounded-full
          bg-grove/20 border border-grove/30
          text-grove-foreground
          hover:bg-grove/30 hover:border-grove/50
          focus:outline-none focus:ring-2 focus:ring-grove/30
          transition-all duration-300
        "
      >
        <span className="text-sm font-medium">plant 1 tree monthly</span>
        <span className="block text-xs text-muted-foreground/70 mt-0.5">
          $3.33/month
        </span>
      </button>

      {/* Simulate success button (for MVP testing) */}
      <button
        onClick={handleSimulatePlant}
        className="
          text-xs text-muted-foreground/50 
          hover:text-muted-foreground/70
          underline underline-offset-2
          transition-colors
        "
      >
        I planted a tree
      </button>

      {/* Planted count */}
      {plantedTrees > 0 && (
        <p className="text-xs text-moss animate-fade-in">
          {plantedTrees} {plantedTrees === 1 ? "tree" : "trees"} planted. a real tree was planted.
        </p>
      )}
    </div>
  );
}
