"use client";

import { useState, useEffect, useCallback } from "react";
import { trackEvent } from "./analytics";

export type TreeStage = "acorn" | "sprout" | "sapling" | "tree";

export interface TreeGrowthState {
  conversationCount: number;
  plantedTrees: number;
  treeStage: TreeStage;
  treeRings: number;
  lastInteractionAt: string | null;
  shareCount: number;
}

const STORAGE_KEY = "chatgptree_growth";

const DEFAULT_STATE: TreeGrowthState = {
  conversationCount: 0,
  plantedTrees: 0,
  treeStage: "acorn",
  treeRings: 0,
  lastInteractionAt: null,
  shareCount: 0,
};

// Growth thresholds
const STAGE_THRESHOLDS: Record<TreeStage, number> = {
  acorn: 0,
  sprout: 3,
  sapling: 10,
  tree: 25,
};

function calculateStage(conversationCount: number): TreeStage {
  if (conversationCount >= STAGE_THRESHOLDS.tree) return "tree";
  if (conversationCount >= STAGE_THRESHOLDS.sapling) return "sapling";
  if (conversationCount >= STAGE_THRESHOLDS.sprout) return "sprout";
  return "acorn";
}

export function useTreeGrowth() {
  const [state, setState] = useState<TreeGrowthState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TreeGrowthState;
        setState(parsed);
      }
    } catch (e) {
      console.error("Failed to load tree growth state:", e);
    }
    setIsLoaded(true);
    trackEvent("app_opened");
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save tree growth state:", e);
      }
    }
  }, [state, isLoaded]);

  const recordConversation = useCallback(() => {
    setState((prev) => {
      const newCount = prev.conversationCount + 1;
      const newStage = calculateStage(newCount);
      const stageChanged = newStage !== prev.treeStage;

      if (stageChanged) {
        trackEvent("growth_stage_changed", {
          from: prev.treeStage,
          to: newStage,
          conversationCount: newCount,
        });
      }

      return {
        ...prev,
        conversationCount: newCount,
        treeStage: newStage,
        lastInteractionAt: new Date().toISOString(),
      };
    });
  }, []);

  const plantTree = useCallback(() => {
    // TODO: This is where Stripe webhook verification should go
    // For MVP, we simulate success after user returns from Stripe
    setState((prev) => {
      trackEvent("tree_planted_simulated", {
        plantedTrees: prev.plantedTrees + 1,
        treeRings: prev.treeRings + 1,
      });

      return {
        ...prev,
        plantedTrees: prev.plantedTrees + 1,
        treeRings: prev.treeRings + 1,
      };
    });
  }, []);

  const recordShare = useCallback(() => {
    setState((prev) => ({
      ...prev,
      shareCount: prev.shareCount + 1,
    }));
    trackEvent("share_completed");
  }, []);

  const getProgressToNextStage = useCallback(() => {
    const currentThreshold = STAGE_THRESHOLDS[state.treeStage];
    const stages: TreeStage[] = ["acorn", "sprout", "sapling", "tree"];
    const currentIndex = stages.indexOf(state.treeStage);
    const nextStage = stages[currentIndex + 1];

    if (!nextStage) return 100; // Already at max stage

    const nextThreshold = STAGE_THRESHOLDS[nextStage];
    const progress =
      ((state.conversationCount - currentThreshold) /
        (nextThreshold - currentThreshold)) *
      100;

    return Math.min(100, Math.max(0, progress));
  }, [state.conversationCount, state.treeStage]);

  return {
    ...state,
    isLoaded,
    recordConversation,
    plantTree,
    recordShare,
    getProgressToNextStage,
  };
}
