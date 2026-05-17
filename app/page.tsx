"use client";

import { useEffect, useCallback } from "react";
import { AppShell } from "@/components/app-shell";
import { VoiceAcornButton } from "@/components/voice-acorn-button";
import { VoiceStatus } from "@/components/voice-status";
import { TextFallback } from "@/components/text-fallback";
import { GrowthState } from "@/components/growth-state";
import { PlantTreeCTA } from "@/components/plant-tree-cta";
import { ShareCard } from "@/components/share-card";
import { CommunityLink } from "@/components/community-link";
import { useTreeGrowth } from "@/lib/use-tree-growth";
import { useVoiceInteraction } from "@/lib/use-voice-interaction";

export default function ChatGPTreeVoice() {
  const {
    treeStage,
    treeRings,
    conversationCount,
    plantedTrees,
    isLoaded,
    recordConversation,
    plantTree,
    recordShare,
    getProgressToNextStage,
  } = useTreeGrowth();

  const {
    voiceState,
    transcript,
    response,
    error,
    isVoiceSupported,
    startListening,
    submitText,
    clearError,
  } = useVoiceInteraction();

  // Record conversation when AI finishes speaking
  useEffect(() => {
    if (voiceState === "idle" && response && transcript) {
      recordConversation();
    }
  }, [voiceState, response, transcript, recordConversation]);

  const handleAcornPress = useCallback(() => {
    if (error) {
      clearError();
      return;
    }
    startListening();
  }, [error, clearError, startListening]);

  const handleTextSubmit = useCallback(
    (text: string) => {
      submitText(text);
    },
    [submitText]
  );

  // Show loading state
  if (!isLoaded) {
    return (
      <AppShell>
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        {/* Voice status and response */}
        <VoiceStatus
          voiceState={voiceState}
          transcript={transcript}
          response={response}
          error={error}
        />

        {/* Central acorn/tree button */}
        <VoiceAcornButton
          treeStage={treeStage}
          treeRings={treeRings}
          voiceState={voiceState}
          onPress={handleAcornPress}
        />

        {/* Text fallback input */}
        <TextFallback
          isVoiceSupported={isVoiceSupported}
          onSubmit={handleTextSubmit}
          disabled={voiceState !== "idle"}
        />

        {/* Growth state indicator */}
        <GrowthState
          treeStage={treeStage}
          conversationCount={conversationCount}
          progressToNext={getProgressToNextStage()}
        />

        {/* Plant tree CTA */}
        <PlantTreeCTA plantedTrees={plantedTrees} onPlantSimulated={plantTree} />

        {/* Share card */}
        <ShareCard
          treeStage={treeStage}
          plantedTrees={plantedTrees}
          treeRings={treeRings}
          conversationCount={conversationCount}
          onShare={recordShare}
        />

        {/* Community link */}
        <CommunityLink />
      </div>
    </AppShell>
  );
}
