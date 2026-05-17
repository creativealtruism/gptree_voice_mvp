"use client";

import { useState, useCallback } from "react";
import { type TreeStage } from "@/lib/use-tree-growth";
import { type VoiceState } from "@/lib/use-voice-interaction";

interface VoiceAcornButtonProps {
  treeStage: TreeStage;
  treeRings: number;
  voiceState: VoiceState;
  onPress: () => void;
}

// SVG paths and visuals for each growth stage - more organic, glowing
function AcornVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        {/* Warm glow gradient for the acorn body */}
        <radialGradient id="acornGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.65 0.14 75)" />
          <stop offset="50%" stopColor="oklch(0.52 0.12 72)" />
          <stop offset="100%" stopColor="oklch(0.42 0.10 68)" />
        </radialGradient>
        {/* Cap gradient */}
        <radialGradient id="capGlow" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="oklch(0.42 0.06 55)" />
          <stop offset="100%" stopColor="oklch(0.30 0.04 50)" />
        </radialGradient>
        {/* Inner light when active */}
        <radialGradient id="innerLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.85 0.15 80 / 0.6)" />
          <stop offset="60%" stopColor="oklch(0.70 0.12 75 / 0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Soft shadow */}
      <ellipse
        cx="50"
        cy="88"
        rx="18"
        ry="4"
        fill="oklch(0.08 0.01 100 / 0.4)"
      />
      
      {/* Acorn cap with texture */}
      <ellipse
        cx="50"
        cy="36"
        rx="26"
        ry="16"
        fill="url(#capGlow)"
      />
      {/* Cap texture - subtle crosshatch */}
      <path
        d="M 28 36 Q 39 30, 50 36 Q 61 30, 72 36"
        fill="none"
        stroke="oklch(0.38 0.05 55 / 0.5)"
        strokeWidth="0.8"
      />
      <path
        d="M 32 33 Q 41 28, 50 33 Q 59 28, 68 33"
        fill="none"
        stroke="oklch(0.35 0.04 55 / 0.3)"
        strokeWidth="0.5"
      />
      
      {/* Stem */}
      <rect x="47" y="18" width="6" height="8" rx="2" fill="oklch(0.35 0.05 50)" />
      
      {/* Acorn body - warm, glowing */}
      <ellipse
        cx="50"
        cy="58"
        rx="22"
        ry="28"
        fill="url(#acornGlow)"
      />
      
      {/* Inner glow when listening/active */}
      {isActive && (
        <ellipse
          cx="50"
          cy="55"
          rx="16"
          ry="22"
          fill="url(#innerLight)"
          className="animate-heartbeat"
        />
      )}
      
      {/* Highlight - organic light reflection */}
      <ellipse
        cx="40"
        cy="50"
        rx="6"
        ry="12"
        fill="oklch(0.75 0.12 80 / 0.35)"
      />
      <ellipse
        cx="42"
        cy="48"
        rx="3"
        ry="6"
        fill="oklch(0.85 0.10 85 / 0.4)"
      />
      
      {/* Tree rings - subtle, integrated */}
      {rings > 0 && (
        <g opacity="0.7">
          <circle cx="50" cy="70" r="8" fill="oklch(0.35 0.06 55 / 0.6)" />
          <text
            x="50"
            y="73"
            textAnchor="middle"
            fontSize="9"
            fill="oklch(0.85 0.04 80)"
            fontWeight="500"
          >
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function SproutVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.55 0.14 145)" />
          <stop offset="100%" stopColor="oklch(0.40 0.10 140)" />
        </linearGradient>
        <radialGradient id="leafGlow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="oklch(0.60 0.16 145)" />
          <stop offset="100%" stopColor="oklch(0.45 0.12 140)" />
        </radialGradient>
        <radialGradient id="sproutInnerLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.70 0.12 145 / 0.5)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="50" cy="88" rx="22" ry="5" fill="oklch(0.08 0.01 100 / 0.4)" />
      
      {/* Soil mound */}
      <ellipse cx="50" cy="85" rx="22" ry="7" fill="oklch(0.28 0.04 55)" />
      <ellipse cx="50" cy="84" rx="18" ry="5" fill="oklch(0.32 0.05 55)" />
      
      {/* Stem - organic curve */}
      <path
        d="M 50 85 Q 48 68, 50 50"
        fill="none"
        stroke="url(#stemGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Left leaf */}
      <path
        d="M 50 58 Q 32 48, 35 32 Q 42 42, 50 52"
        fill="url(#leafGlow)"
      />
      {/* Left leaf vein */}
      <path
        d="M 50 56 Q 40 48, 38 38"
        fill="none"
        stroke="oklch(0.50 0.10 140 / 0.5)"
        strokeWidth="0.5"
      />
      
      {/* Right leaf */}
      <path
        d="M 50 52 Q 68 42, 65 28 Q 58 38, 50 48"
        fill="url(#leafGlow)"
      />
      {/* Right leaf vein */}
      <path
        d="M 50 50 Q 60 42, 63 34"
        fill="none"
        stroke="oklch(0.50 0.10 140 / 0.5)"
        strokeWidth="0.5"
      />
      
      {/* Inner glow when active */}
      {isActive && (
        <circle cx="50" cy="50" r="20" fill="url(#sproutInnerLight)" className="animate-heartbeat" />
      )}
      
      {/* Rings indicator */}
      {rings > 0 && (
        <g opacity="0.7">
          <circle cx="50" cy="92" r="7" fill="oklch(0.30 0.04 55 / 0.8)" />
          <text x="50" y="95" textAnchor="middle" fontSize="8" fill="oklch(0.85 0.03 85)" fontWeight="500">
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function SaplingVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <radialGradient id="foliageGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.58 0.15 145)" />
          <stop offset="70%" stopColor="oklch(0.45 0.12 142)" />
          <stop offset="100%" stopColor="oklch(0.38 0.10 140)" />
        </radialGradient>
        <radialGradient id="saplingInnerLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.65 0.12 145 / 0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="50" cy="92" rx="20" ry="4" fill="oklch(0.08 0.01 100 / 0.4)" />
      
      {/* Soil */}
      <ellipse cx="50" cy="90" rx="18" ry="5" fill="oklch(0.28 0.04 55)" />
      
      {/* Trunk */}
      <rect x="46" y="55" width="8" height="38" rx="3" fill="oklch(0.36 0.06 55)" />
      <rect x="47" y="55" width="3" height="38" rx="1" fill="oklch(0.42 0.06 58 / 0.5)" />
      
      {/* Foliage layers */}
      <ellipse cx="50" cy="42" rx="24" ry="20" fill="url(#foliageGlow)" />
      <ellipse cx="50" cy="34" rx="20" ry="16" fill="oklch(0.52 0.14 145)" />
      <ellipse cx="50" cy="26" rx="14" ry="12" fill="oklch(0.56 0.13 148)" />
      
      {/* Foliage highlights */}
      <ellipse cx="42" cy="32" rx="6" ry="8" fill="oklch(0.62 0.12 150 / 0.4)" />
      
      {/* Inner glow when active */}
      {isActive && (
        <ellipse cx="50" cy="36" rx="18" ry="16" fill="url(#saplingInnerLight)" className="animate-heartbeat" />
      )}
      
      {/* Rings */}
      {rings > 0 && (
        <g opacity="0.7">
          <circle cx="50" cy="75" r="8" fill="oklch(0.28 0.04 55 / 0.8)" />
          <text x="50" y="78" textAnchor="middle" fontSize="9" fill="oklch(0.85 0.03 85)" fontWeight="500">
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function TreeVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <radialGradient id="canopyGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.55 0.14 145)" />
          <stop offset="60%" stopColor="oklch(0.45 0.12 142)" />
          <stop offset="100%" stopColor="oklch(0.35 0.10 138)" />
        </radialGradient>
        <radialGradient id="treeInnerLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.60 0.10 145 / 0.35)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="50" cy="95" rx="28" ry="4" fill="oklch(0.08 0.01 100 / 0.35)" />
      
      {/* Soil */}
      <ellipse cx="50" cy="93" rx="24" ry="5" fill="oklch(0.26 0.04 55)" />
      
      {/* Root hints */}
      <path d="M 42 90 Q 32 92, 26 88" fill="none" stroke="oklch(0.32 0.05 55)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 90 Q 68 92, 74 88" fill="none" stroke="oklch(0.32 0.05 55)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 50 92 Q 50 96, 50 98" fill="none" stroke="oklch(0.30 0.04 55)" strokeWidth="2" strokeLinecap="round" />
      
      {/* Trunk */}
      <rect x="43" y="58" width="14" height="36" rx="4" fill="oklch(0.34 0.06 55)" />
      <rect x="45" y="58" width="5" height="36" rx="2" fill="oklch(0.40 0.06 58 / 0.4)" />
      
      {/* Full canopy */}
      <ellipse cx="50" cy="38" rx="38" ry="32" fill="url(#canopyGlow)" />
      <ellipse cx="50" cy="30" rx="32" ry="26" fill="oklch(0.48 0.13 144)" />
      <ellipse cx="50" cy="24" rx="24" ry="20" fill="oklch(0.52 0.12 146)" />
      <ellipse cx="50" cy="18" rx="16" ry="14" fill="oklch(0.55 0.11 148)" />
      
      {/* Canopy highlights */}
      <ellipse cx="38" cy="28" rx="10" ry="12" fill="oklch(0.58 0.10 150 / 0.35)" />
      <ellipse cx="60" cy="22" rx="8" ry="10" fill="oklch(0.56 0.09 148 / 0.25)" />
      
      {/* Inner glow when active */}
      {isActive && (
        <ellipse cx="50" cy="32" rx="28" ry="24" fill="url(#treeInnerLight)" className="animate-heartbeat" />
      )}
      
      {/* Rings */}
      {rings > 0 && (
        <g opacity="0.7">
          <circle cx="50" cy="75" r="10" fill="oklch(0.26 0.04 55 / 0.85)" />
          <text x="50" y="79" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.03 85)" fontWeight="500">
            {rings}
          </text>
        </g>
      )}
    </svg>
  );
}

function getTreeVisual(stage: TreeStage, rings: number, isActive: boolean) {
  switch (stage) {
    case "acorn":
      return <AcornVisual rings={rings} isActive={isActive} />;
    case "sprout":
      return <SproutVisual rings={rings} isActive={isActive} />;
    case "sapling":
      return <SaplingVisual rings={rings} isActive={isActive} />;
    case "tree":
      return <TreeVisual rings={rings} isActive={isActive} />;
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
      return "animate-breathe animate-wobble";
  }
}

function getGlowClass(voiceState: VoiceState): string {
  switch (voiceState) {
    case "listening":
      return "glow-ember-alive";
    case "thinking":
    case "transcribing":
      return "glow-ember";
    case "speaking":
      return "glow-radiant";
    default:
      return "glow-ember";
  }
}

export function VoiceAcornButton({
  treeStage,
  treeRings,
  voiceState,
  onPress,
}: VoiceAcornButtonProps) {
  const isActive = voiceState !== "idle" && voiceState !== "error";
  const [ripples, setRipples] = useState<number[]>([]);

  const handlePress = useCallback(() => {
    // Add ripple effect
    const id = Date.now();
    setRipples((prev) => [...prev, id]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id));
    }, 1500);
    
    onPress();
  }, [onPress]);

  return (
    <div className="relative">
      {/* Interaction ripples */}
      {ripples.map((id) => (
        <div
          key={id}
          className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ripple pointer-events-none"
        />
      ))}
      
      {/* Ambient glow behind button */}
      <div
        className={`
          absolute inset-[-20%] rounded-full transition-opacity duration-700
          ${isActive ? "opacity-100" : "opacity-50"}
        `}
        style={{
          background: `
            radial-gradient(circle at center, 
              oklch(0.72 0.14 80 / ${isActive ? "0.25" : "0.12"}) 0%, 
              oklch(0.65 0.10 85 / ${isActive ? "0.12" : "0.06"}) 40%,
              transparent 70%)
          `,
        }}
      />
      
      <button
        onClick={handlePress}
        disabled={isActive}
        className={`
          relative w-52 h-52 sm:w-60 sm:h-60 rounded-full
          flex items-center justify-center
          transition-all duration-500
          ${getAnimationClass(voiceState)}
          ${getGlowClass(voiceState)}
          focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
          disabled:cursor-default
          hover:scale-[1.03] active:scale-[0.97]
          touch-manipulation
        `}
        style={{
          background: `
            radial-gradient(circle at 35% 35%, 
              oklch(0.22 0.03 95 / 0.95) 0%, 
              oklch(0.16 0.02 100 / 0.98) 50%, 
              oklch(0.12 0.015 100) 100%)
          `,
        }}
        aria-label={
          isActive ? `${voiceState}...` : "Touch to speak to your tree"
        }
      >
        {/* Inner atmospheric ring */}
        <div
          className={`
            absolute inset-3 rounded-full
            transition-all duration-700
            ${isActive ? "opacity-100" : "opacity-40"}
          `}
          style={{
            background: `
              radial-gradient(circle at center, 
                transparent 40%, 
                oklch(0.72 0.12 80 / ${isActive ? "0.15" : "0.08"}) 70%, 
                oklch(0.72 0.12 80 / ${isActive ? "0.25" : "0.12"}) 100%)
            `,
          }}
        />

        {/* Tree visual */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36">
          {getTreeVisual(treeStage, treeRings, isActive)}
        </div>
      </button>
    </div>
  );
}
