"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
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

  // Show a gentle loading state with the ChatGPTree icon
  if (!isLoaded) {
    return (
      <AppShell>
        <div className="flex items-center justify-center">
          <div className="relative w-20 h-20 animate-breathe">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPTree_Icon_GreenBox%20%283%29-9PC5q624T18kiddnKEC8yOPPPBnfIo.png"
              alt="Loading"
              width={80}
              height={80}
              className="rounded-2xl opacity-60"
              priority
            />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Top section - voice status, positioned above acorn */}
        <div className="mb-6">
          <VoiceStatus
            voiceState={voiceState}
            transcript={transcript}
            response={response}
            error={error}
          />
        </div>

        {/* Central focus - the living acorn */}
        <div className="my-4">
          <VoiceAcornButton
            treeStage={treeStage}
            treeRings={treeRings}
            voiceState={voiceState}
            onPress={handleAcornPress}
          />
        </div>

        {/* Subtle growth indicator - only visible after first conversation */}
        <div className="mt-8 mb-4">
          <GrowthState
            treeStage={treeStage}
            conversationCount={conversationCount}
            progressToNext={getProgressToNextStage()}
          />
        </div>

        {/* Text fallback - minimal, graceful */}
        <div className="my-4">
          <TextFallback
            isVoiceSupported={isVoiceSupported}
            onSubmit={handleTextSubmit}
            disabled={voiceState !== "idle"}
          />
        </div>

        {/* Bottom section - ambient CTAs, very soft */}
        <div className="mt-auto pt-12 pb-8 flex flex-col items-center gap-8">
          {/* Plant tree - stewardship-oriented */}
          <PlantTreeCTA plantedTrees={plantedTrees} onPlantSimulated={plantTree} />

          {/* Share - subtle */}
          <ShareCard
            plantedTrees={plantedTrees}
            treeRings={treeRings}
            conversationCount={conversationCount}
            onShare={recordShare}
          />

          {/* Community - very subtle */}
          <CommunityLink />
        </div>
      </div>
    </AppShell>
  );
}
