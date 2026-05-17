import { useCallback } from "react";

// Analytics events
export type AnalyticsEvent =
  | "app_opened"
  | "voice_button_tapped"
  | "voice_listening_started"
  | "voice_transcript_completed"
  | "ai_response_completed"
  | "ai_response_fallback"
  | "growth_stage_changed"
  | "plant_tree_clicked"
  | "tree_planted_simulated"
  | "share_clicked"
  | "share_completed"
  | "linktree_clicked"
  | "text_fallback_used";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  // Console-based tracking for MVP
  // TODO: Replace with real analytics (PostHog, Mixpanel, etc.)
  console.log(`[ChatGPTree Analytics] ${event}`, data ?? {});
}

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent, data?: Record<string, unknown>) => {
    trackEvent(event, data);
  }, []);

  return { track };
}
