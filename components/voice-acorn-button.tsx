"use client";

import { type TreeStage } from "@/lib/use-tree-growth";
import { type VoiceState } from "@/lib/use-voice-interaction";

interface VoiceAcornButtonProps {
  treeStage: TreeStage;
  treeRings: number;
  voiceState: VoiceState;
  onPress: () => void;
}

// SVG paths and visuals for each growth stage
function AcornVisual({ rings }: { rings: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Acorn cap */}
      <ellipse
        cx="50"
        cy="35"
        rx="28"
        ry="18"
        fill="oklch(0.35 0.05 55)"
        stroke="oklch(0.45 0.06 55)"
        strokeWidth="1"
      />
      {/* Cap texture lines */}
      <path
        d="M 25 35 Q 37 28, 50 35 Q 63 28, 75 35"
        fill="none"
        stroke="oklch(0.40 0.05 55)"
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* Acorn body */}
      <ellipse
        cx="50"
        cy="58"
        rx="22"
        ry="28"
        fill="oklch(0.50 0.12 75)"
        stroke="oklch(0.60 0.14 75)"
        strokeWidth="1.5"
      />
      {/* Acorn highlight */}
      <ellipse
        cx="42"
        cy="52"
        rx="6"
        ry="10"
        fill="oklch(0.65 0.14 75)"
        opacity="0.4"
      />
      {/* Tree rings indicator */}
      {rings > 0 && (
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fontSize="12"
          fill="oklch(0.30 0.05 55)"
          fontWeight="bold"
        >
          {rings}
        </text>
      )}
    </svg>
  );
}

function SproutVisual({ rings }: { rings: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Soil */}
      <ellipse
        cx="50"
        cy="85"
        rx="25"
        ry="8"
        fill="oklch(0.30 0.04 55)"
      />
      {/* Stem */}
      <path
        d="M 50 85 Q 48 65, 50 50"
        fill="none"
        stroke="oklch(0.45 0.12 140)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M 50 55 Q 35 45, 38 35 Q 45 40, 50 50"
        fill="oklch(0.50 0.14 140)"
        stroke="oklch(0.55 0.12 140)"
        strokeWidth="0.5"
      />
      {/* Right leaf */}
      <path
        d="M 50 50 Q 65 40, 62 30 Q 55 35, 50 45"
        fill="oklch(0.55 0.14 140)"
        stroke="oklch(0.58 0.12 140)"
        strokeWidth="0.5"
      />
      {/* Tree rings indicator */}
      {rings > 0 && (
        <g>
          <circle cx="50" cy="90" r="8" fill="oklch(0.35 0.05 55)" />
          <text
            x="50"
            y="93"
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.85 0.02 85)"
            fontWeight="bold"
          >
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function SaplingVisual({ rings }: { rings: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Soil */}
      <ellipse
        cx="50"
        cy="88"
        rx="20"
        ry="6"
        fill="oklch(0.30 0.04 55)"
      />
      {/* Trunk */}
      <rect
        x="47"
        y="55"
        width="6"
        height="35"
        fill="oklch(0.38 0.06 55)"
        rx="2"
      />
      {/* Foliage layers */}
      <ellipse
        cx="50"
        cy="45"
        rx="22"
        ry="18"
        fill="oklch(0.48 0.14 140)"
      />
      <ellipse
        cx="50"
        cy="35"
        rx="18"
        ry="15"
        fill="oklch(0.52 0.15 140)"
      />
      <ellipse
        cx="50"
        cy="25"
        rx="12"
        ry="10"
        fill="oklch(0.55 0.14 140)"
      />
      {/* Tree rings indicator */}
      {rings > 0 && (
        <g>
          <circle cx="50" cy="75" r="8" fill="oklch(0.30 0.04 55)" />
          <text
            x="50"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.85 0.02 85)"
            fontWeight="bold"
          >
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function TreeVisual({ rings }: { rings: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Soil */}
      <ellipse
        cx="50"
        cy="92"
        rx="25"
        ry="6"
        fill="oklch(0.30 0.04 55)"
      />
      {/* Trunk */}
      <rect
        x="44"
        y="60"
        width="12"
        height="35"
        fill="oklch(0.38 0.06 55)"
        rx="3"
      />
      {/* Root hints */}
      <path
        d="M 44 90 Q 35 92, 30 88"
        fill="none"
        stroke="oklch(0.35 0.05 55)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 56 90 Q 65 92, 70 88"
        fill="none"
        stroke="oklch(0.35 0.05 55)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Full canopy */}
      <ellipse
        cx="50"
        cy="40"
        rx="35"
        ry="30"
        fill="oklch(0.45 0.14 140)"
      />
      <ellipse
        cx="50"
        cy="32"
        rx="28"
        ry="24"
        fill="oklch(0.50 0.15 140)"
      />
      <ellipse
        cx="50"
        cy="25"
        rx="20"
        ry="18"
        fill="oklch(0.55 0.14 140)"
      />
      {/* Tree rings indicator */}
      {rings > 0 && (
        <g>
          <circle cx="50" cy="75" r="10" fill="oklch(0.30 0.04 55)" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="12"
            fill="oklch(0.85 0.02 85)"
            fontWeight="bold"
          >
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function getTreeVisual(stage: TreeStage, rings: number) {
  switch (stage) {
    case "acorn":
      return <AcornVisual rings={rings} />;
    case "sprout":
      return <SproutVisual rings={rings} />;
    case "sapling":
      return <SaplingVisual rings={rings} />;
    case "tree":
      return <TreeVisual rings={rings} />;
  }
}

function getAnimationClass(voiceState: VoiceState): string {
  switch (voiceState) {
    case "listening":
      return "animate-listening";
    case "thinking":
    case "transcribing":
      return "animate-thinking";
    case "speaking":
      return "animate-speaking";
    default:
      return "animate-breathe";
  }
}

function getGlowClass(voiceState: VoiceState): string {
  switch (voiceState) {
    case "listening":
      return "glow-amber-intense";
    case "thinking":
    case "transcribing":
    case "speaking":
      return "glow-amber";
    default:
      return "glow-amber";
  }
}

export function VoiceAcornButton({
  treeStage,
  treeRings,
  voiceState,
  onPress,
}: VoiceAcornButtonProps) {
  const isActive = voiceState !== "idle" && voiceState !== "error";

  return (
    <button
      onClick={onPress}
      disabled={isActive}
      className={`
        relative w-48 h-48 sm:w-56 sm:h-56 rounded-full
        flex items-center justify-center
        transition-all duration-300
        ${getAnimationClass(voiceState)}
        ${getGlowClass(voiceState)}
        focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50
        disabled:cursor-default
        hover:scale-105 active:scale-95
      `}
      style={{
        background: `
          radial-gradient(circle at 30% 30%, 
            oklch(0.28 0.04 90 / 0.9) 0%, 
            oklch(0.18 0.03 90 / 0.95) 60%, 
            oklch(0.15 0.02 90) 100%)
        `,
      }}
      aria-label={
        isActive ? `${voiceState}...` : `Tap to speak. Current stage: ${treeStage}`
      }
    >
      {/* Inner glow ring */}
      <div
        className={`
          absolute inset-2 rounded-full
          transition-opacity duration-500
          ${isActive ? "opacity-100" : "opacity-60"}
        `}
        style={{
          background: `
            radial-gradient(circle at center, 
              transparent 50%, 
              oklch(0.70 0.15 85 / 0.15) 80%, 
              oklch(0.70 0.15 85 / 0.25) 100%)
          `,
        }}
      />

      {/* Tree visual */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        {getTreeVisual(treeStage, treeRings)}
      </div>

      {/* State indicator ring */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"
          style={{ animationDuration: "2s" }}
        />
      )}
    </button>
  );
}
