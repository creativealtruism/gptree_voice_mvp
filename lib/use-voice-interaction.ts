"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { trackEvent } from "./analytics";

export type VoiceState =
  | "idle"
  | "listening"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "error";

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

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
function getSpeechRecognition(): typeof SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  
  // @ts-expect-error - webkit prefix for Safari
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
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech APIs
  useEffect(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    if (SpeechRecognitionClass) {
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
    } else {
      setIsVoiceSupported(false);
    }

    synthRef.current = getSpeechSynthesis();

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
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onend = () => {
      setVoiceState("idle");
    };

    utterance.onerror = () => {
      setVoiceState("idle");
    };

    setVoiceState("speaking");
    synthRef.current.speak(utterance);
  }, []);

  const processResponse = useCallback(
    async (userInput: string): Promise<string> => {
      setVoiceState("thinking");
      trackEvent("voice_transcript_completed", { transcript: userInput });

      // Simulate thinking time
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

      // TODO: Add real AI integration here
      // For now, use placeholder responses
      const aiResponse = getPlaceholderResponse();

      trackEvent("ai_response_completed");
      setResponse(aiResponse);

      return aiResponse;
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
    trackEvent("voice_button_tapped");

    const recognition = recognitionRef.current;

    recognition.onstart = () => {
      setVoiceState("listening");
      trackEvent("voice_listening_started");
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0] as SpeechRecognitionResult;
      const userTranscript = result.transcript;
      setTranscript(userTranscript);
      setVoiceState("transcribing");

      const aiResponse = await processResponse(userTranscript);
      speak(aiResponse);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone access.");
      } else if (event.error === "no-speech") {
        setError("No speech detected. Try again.");
        setVoiceState("idle");
        return;
      } else {
        setError(`Voice error: ${event.error}`);
      }
      setVoiceState("error");
    };

    recognition.onend = () => {
      // Only set to idle if not processing
      if (voiceState === "listening") {
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
    startListening,
    stopListening,
    submitText,
    clearError,
  };
}
