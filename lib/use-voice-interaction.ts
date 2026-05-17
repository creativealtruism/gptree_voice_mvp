"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { trackEvent } from "./analytics";

// Web Speech API type declarations
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export type VoiceState =
  | "idle"
  | "listening"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "error";

// Graceful placeholder responses when no AI API is configured
const PLACEHOLDER_RESPONSES = [
  "the grove heard you. keep growing.",
  "your question became a little more forest.",
  "growth begins with attention.",
  "the roots remember your words.",
  "every voice adds to the canopy.",
  "the forest holds your thought gently.",
  "patience grows the tallest trees.",
  "your words are becoming leaves.",
];

function getPlaceholderResponse(): string {
  return PLACEHOLDER_RESPONSES[
    Math.floor(Math.random() * PLACEHOLDER_RESPONSES.length)
  ];
}

// Check if speech recognition is available
function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// Check if speech synthesis is available
function getSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis || null;
}

export function useVoiceInteraction() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isProcessingRef = useRef(false);

  // Initialize speech APIs
  useEffect(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    if (SpeechRecognitionClass) {
      console.log("[v0] voice_supported: true");
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
    } else {
      console.log("[v0] voice_supported: false");
      setIsVoiceSupported(false);
    }

    synthRef.current = getSpeechSynthesis();
    console.log("[v0] speech_synthesis_supported:", !!synthRef.current);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) {
      console.log("[v0] speech_synthesis_unavailable");
      setVoiceState("idle");
      return;
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      console.log("[v0] speech_started");
    };

    utterance.onend = () => {
      console.log("[v0] speech_finished");
      setVoiceState("idle");
    };

    utterance.onerror = (e) => {
      console.error("[v0] speech_error:", e.error);
      setVoiceState("idle");
    };

    setVoiceState("speaking");
    synthRef.current.speak(utterance);
  }, []);

  const processResponse = useCallback(
    async (userInput: string): Promise<string> => {
      setVoiceState("thinking");
      trackEvent("voice_transcript_completed", { transcript: userInput });
      console.log("[v0] transcript_received:", userInput);

      try {
        console.log("[v0] api_request_started");
        
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await res.json();
        
        if (data.fallback) {
          console.log("[v0] api_response_fallback_used");
        } else {
          console.log("[v0] api_response_received:", data.reply?.substring(0, 50));
        }

        const aiResponse = data.reply || getPlaceholderResponse();
        trackEvent("ai_response_completed", { fallback: !!data.fallback });
        setResponse(aiResponse);

        return aiResponse;
      } catch (error) {
        console.error("[v0] api_request_failed:", error);
        
        // Graceful fallback - never crash the experience
        const fallbackResponse = getPlaceholderResponse();
        setResponse(fallbackResponse);
        trackEvent("ai_response_fallback");
        
        return fallbackResponse;
      }
    },
    []
  );

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      setError("Voice recognition not supported in this browser");
      setVoiceState("error");
      return;
    }

    setError(null);
    setTranscript("");
    setResponse("");
    console.log("[v0] voice_button_tapped, mic_permission_requested");
    trackEvent("voice_button_tapped");

    const recognition = recognitionRef.current;

    recognition.onstart = () => {
      setVoiceState("listening");
      isProcessingRef.current = false;
      console.log("[v0] mic_permission_granted, listening_started");
      trackEvent("voice_listening_started");
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      // Guard against duplicate processing
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;
      
      const result = event.results[0][0];
      const userTranscript = result.transcript;
      
      // Ignore empty or very short transcripts (likely noise)
      if (!userTranscript || userTranscript.trim().length < 2) {
        isProcessingRef.current = false;
        setVoiceState("idle");
        return;
      }
      
      setTranscript(userTranscript);
      setVoiceState("transcribing");

      const aiResponse = await processResponse(userTranscript);
      speak(aiResponse);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("[v0] voice_error:", event.error);
      isProcessingRef.current = false;
      
      // Handle specific error types gracefully
      if (event.error === "not-allowed") {
        setPermissionDenied(true);
        setError("voice feels shy right now. try typing instead.");
        setVoiceState("error");
      } else if (event.error === "no-speech") {
        // Silent pause - just reset quietly, no error shown
        setVoiceState("idle");
        return;
      } else if (event.error === "aborted") {
        // User or system aborted - reset quietly
        setVoiceState("idle");
        return;
      } else if (event.error === "network") {
        setError("the grove needs a connection. try again.");
        setVoiceState("error");
      } else if (event.error === "audio-capture") {
        setError("couldn't hear you. check your microphone.");
        setVoiceState("error");
      } else {
        // Unknown error - show gently
        setError("something rustled unexpectedly. try again.");
        setVoiceState("error");
      }
    };

    recognition.onend = () => {
      // Only reset to idle if not actively processing a result
      if (!isProcessingRef.current && voiceState === "listening") {
        setVoiceState("idle");
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start recognition:", e);
      setError("Failed to start voice recognition");
      setVoiceState("error");
    }
  }, [processResponse, speak, voiceState]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setVoiceState("idle");
  }, []);

  const submitText = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      trackEvent("text_fallback_used");
      setTranscript(text);

      const aiResponse = await processResponse(text);
      speak(aiResponse);
    },
    [processResponse, speak]
  );

  const clearError = useCallback(() => {
    setError(null);
    setVoiceState("idle");
  }, []);

  return {
    voiceState,
    transcript,
    response,
    error,
    isVoiceSupported,
    permissionDenied,
    startListening,
    stopListening,
    submitText,
    clearError,
  };
}
