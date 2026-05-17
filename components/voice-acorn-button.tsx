"use client";

import { useState, useCallback } from "react";
import { type TreeStage } from "@/lib/use-tree-growth";
import { type VoiceState } from "@/lib/use-voice-interaction";

type VoiceAcornButtonProps = {
  treeStage: TreeStage;
  treeRings: number;
  voiceState: VoiceState;
  onPress: () => void;
};

// More organic, tactile acorn with soft shading and warm glow
function AcornVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        {/* Warm organic gradient for acorn body */}
        <radialGradient id="acornBody" cx="38%" cy="38%" r="65%">
          <stop offset="0%" stopColor="oklch(0.68 0.13 78)" />
          <stop offset="45%" stopColor="oklch(0.55 0.12 75)" />
          <stop offset="85%" stopColor="oklch(0.45 0.10 70)" />
          <stop offset="100%" stopColor="oklch(0.38 0.08 68)" />
        </radialGradient>
        {/* Cap with texture feel */}
        <radialGradient id="acornCap" cx="38%" cy="38%" r="75%">
          <stop offset="0%" stopColor="oklch(0.45 0.06 55)" />
          <stop offset="60%" stopColor="oklch(0.35 0.05 52)" />
          <stop offset="100%" stopColor="oklch(0.28 0.04 50)" />
        </radialGradient>
        {/* Inner glow when active */}
        <radialGradient id="innerGlow" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="oklch(0.88 0.14 82 / 0.65)" />
          <stop offset="50%" stopColor="oklch(0.75 0.12 80 / 0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Soft highlight */}
        <radialGradient id="highlight" cx="30%" cy="25%" r="50%">
          <stop offset="0%" stopColor="oklch(0.90 0.08 85 / 0.5)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Soft shadow on ground */}
      <ellipse cx="50" cy="89" rx="20" ry="5" fill="oklch(0.10 0.02 145 / 0.4)" />
      
      {/* Subtle root hints */}
      <path 
        d="M 42 85 Q 35 90, 30 88" 
        fill="none" 
        stroke="oklch(0.30 0.04 55 / 0.35)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M 58 85 Q 65 90, 70 88" 
        fill="none" 
        stroke="oklch(0.30 0.04 55 / 0.35)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Cap with organic texture */}
      <ellipse cx="50" cy="36" rx="27" ry="17" fill="url(#acornCap)" />
      {/* Cap texture lines - crosshatch pattern */}
      <path
        d="M 26 36 Q 38 29, 50 36 Q 62 29, 74 36"
        fill="none"
        stroke="oklch(0.40 0.05 55 / 0.4)"
        strokeWidth="0.7"
      />
      <path
        d="M 30 33 Q 40 27, 50 33 Q 60 27, 70 33"
        fill="none"
        stroke="oklch(0.38 0.04 55 / 0.3)"
        strokeWidth="0.5"
      />
      <path
        d="M 35 30 Q 42 25, 50 30 Q 58 25, 65 30"
        fill="none"
        stroke="oklch(0.36 0.04 55 / 0.25)"
        strokeWidth="0.4"
      />
      
      {/* Stem */}
      <rect x="47" y="17" width="6" height="9" rx="2.5" fill="oklch(0.38 0.05 52)" />
      <rect x="48" y="18" width="2.5" height="7" rx="1" fill="oklch(0.44 0.05 55 / 0.5)" />
      
      {/* Acorn body - warm, organic shape */}
      <ellipse cx="50" cy="59" rx="23" ry="30" fill="url(#acornBody)" />
      
      {/* Inner glow when listening/active */}
      {isActive && (
        <ellipse
          cx="50"
          cy="56"
          rx="17"
          ry="24"
          fill="url(#innerGlow)"
          className="animate-heartbeat"
        />
      )}
      
      {/* Organic highlights */}
      <ellipse cx="40" cy="50" rx="7" ry="14" fill="oklch(0.78 0.11 82 / 0.3)" />
      <ellipse cx="42" cy="47" rx="3.5" ry="7" fill="oklch(0.88 0.09 85 / 0.35)" />
      <ellipse cx="58" cy="65" rx="4" ry="8" fill="oklch(0.72 0.10 78 / 0.15)" />
      
      {/* Tree rings badge - subtle, integrated */}
      {rings > 0 && (
        <g opacity="0.75">
          <circle cx="50" cy="72" r="9" fill="oklch(0.32 0.05 55 / 0.7)" />
          <circle cx="50" cy="72" r="7" fill="none" stroke="oklch(0.40 0.04 58 / 0.4)" strokeWidth="0.5" />
          <text
            x="50"
            y="75.5"
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.90 0.03 85)"
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
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.58 0.14 148)" />
          <stop offset="100%" stopColor="oklch(0.42 0.10 145)" />
        </linearGradient>
        <radialGradient id="leafGrad" cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor="oklch(0.62 0.15 148)" />
          <stop offset="70%" stopColor="oklch(0.48 0.12 145)" />
          <stop offset="100%" stopColor="oklch(0.40 0.10 142)" />
        </radialGradient>
        <radialGradient id="sproutGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.72 0.12 148 / 0.55)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      <ellipse cx="50" cy="89" rx="24" ry="6" fill="oklch(0.10 0.02 145 / 0.35)" />
      <ellipse cx="50" cy="86" rx="24" ry="8" fill="oklch(0.30 0.04 55)" />
      <ellipse cx="50" cy="85" rx="20" ry="6" fill="oklch(0.34 0.05 55)" />
      
      <path d="M 50 86 Q 48 68, 50 48" fill="none" stroke="url(#stemGrad)" strokeWidth="4.5" strokeLinecap="round" />
      
      <path d="M 50 56 Q 30 46, 34 28 Q 42 40, 50 50" fill="url(#leafGrad)" />
      <path d="M 50 54 Q 38 46, 37 34" fill="none" stroke="oklch(0.52 0.10 145 / 0.45)" strokeWidth="0.6" />
      
      <path d="M 50 50 Q 70 40, 66 24 Q 58 36, 50 46" fill="url(#leafGrad)" />
      <path d="M 50 48 Q 62 40, 64 30" fill="none" stroke="oklch(0.52 0.10 145 / 0.45)" strokeWidth="0.6" />
      
      {isActive && <circle cx="50" cy="48" r="22" fill="url(#sproutGlow)" className="animate-heartbeat" />}
      
      {rings > 0 && (
        <g opacity="0.75">
          <circle cx="50" cy="93" r="8" fill="oklch(0.28 0.04 55 / 0.85)" />
          <text x="50" y="96.5" textAnchor="middle" fontSize="9" fill="oklch(0.90 0.03 85)" fontWeight="500">{rings}</text>
        </g>
      )}
    </svg>
  );
}

function SaplingVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="foliageGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="oklch(0.60 0.14 148)" />
          <stop offset="65%" stopColor="oklch(0.48 0.12 145)" />
          <stop offset="100%" stopColor="oklch(0.38 0.10 142)" />
        </radialGradient>
        <radialGradient id="saplingGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.68 0.11 148 / 0.45)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      <ellipse cx="50" cy="93" rx="22" ry="5" fill="oklch(0.10 0.02 145 / 0.35)" />
      <ellipse cx="50" cy="91" rx="20" ry="6" fill="oklch(0.30 0.04 55)" />
      
      <rect x="45" y="54" width="10" height="40" rx="4" fill="oklch(0.38 0.06 55)" />
      <rect x="46.5" y="54" width="4" height="40" rx="2" fill="oklch(0.44 0.06 58 / 0.45)" />
      
      <ellipse cx="50" cy="42" rx="26" ry="22" fill="url(#foliageGrad)" />
      <ellipse cx="50" cy="34" rx="22" ry="18" fill="oklch(0.54 0.13 146)" />
      <ellipse cx="50" cy="26" rx="16" ry="14" fill="oklch(0.58 0.12 148)" />
      <ellipse cx="42" cy="32" rx="7" ry="10" fill="oklch(0.64 0.11 150 / 0.35)" />
      
      {isActive && <ellipse cx="50" cy="36" rx="20" ry="18" fill="url(#saplingGlow)" className="animate-heartbeat" />}
      
      {rings > 0 && (
        <g opacity="0.75">
          <circle cx="50" cy="76" r="9" fill="oklch(0.30 0.04 55 / 0.85)" />
          <text x="50" y="79.5" textAnchor="middle" fontSize="10" fill="oklch(0.90 0.03 85)" fontWeight="500">{rings}</text>
        </g>
      )}
    </svg>
  );
}

function TreeVisual({ rings, isActive }: { rings: number; isActive: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="canopyGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="oklch(0.58 0.14 148)" />
          <stop offset="55%" stopColor="oklch(0.48 0.12 145)" />
          <stop offset="100%" stopColor="oklch(0.36 0.10 140)" />
        </radialGradient>
        <radialGradient id="treeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.62 0.10 148 / 0.38)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      <ellipse cx="50" cy="96" rx="30" ry="5" fill="oklch(0.10 0.02 145 / 0.3)" />
      <ellipse cx="50" cy="94" rx="26" ry="6" fill="oklch(0.28 0.04 55)" />
      
      <path d="M 40 91 Q 28 94, 22 90" fill="none" stroke="oklch(0.34 0.05 55)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 60 91 Q 72 94, 78 90" fill="none" stroke="oklch(0.34 0.05 55)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 50 93 Q 50 98, 50 100" fill="none" stroke="oklch(0.32 0.04 55)" strokeWidth="2.5" strokeLinecap="round" />
      
      <rect x="42" y="56" width="16" height="40" rx="5" fill="oklch(0.36 0.06 55)" />
      <rect x="44" y="56" width="6" height="40" rx="3" fill="oklch(0.42 0.06 58 / 0.4)" />
      
      <ellipse cx="50" cy="38" rx="40" ry="34" fill="url(#canopyGrad)" />
      <ellipse cx="50" cy="30" rx="34" ry="28" fill="oklch(0.50 0.13 146)" />
      <ellipse cx="50" cy="24" rx="26" ry="22" fill="oklch(0.54 0.12 148)" />
      <ellipse cx="50" cy="18" rx="18" ry="16" fill="oklch(0.57 0.11 150)" />
      
      <ellipse cx="36" cy="28" rx="12" ry="14" fill="oklch(0.60 0.10 152 / 0.3)" />
      <ellipse cx="62" cy="22" rx="10" ry="12" fill="oklch(0.58 0.09 150 / 0.22)" />
      
      {isActive && <ellipse cx="50" cy="32" rx="30" ry="26" fill="url(#treeGlow)" className="animate-heartbeat" />}
      
      {rings > 0 && (
        <g opacity="0.75">
          <circle cx="50" cy="76" r="11" fill="oklch(0.28 0.04 55 / 0.88)" />
          <text x="50" y="80" textAnchor="middle" fontSize="12" fill="oklch(0.90 0.03 85)" fontWeight="500">{rings}</text>
        </g>
      )}
    </svg>
  );
}

function getTreeVisual(stage: TreeStage, rings: number, isActive: boolean) {
  switch (stage) {
    case "acorn": return <AcornVisual rings={rings} isActive={isActive} />;
    case "sprout": return <SproutVisual rings={rings} isActive={isActive} />;
    case "sapling": return <SaplingVisual rings={rings} isActive={isActive} />;
    case "tree": return <TreeVisual rings={rings} isActive={isActive} />;
  }
}

function getAnimationClass(voiceState: VoiceState): string {
  switch (voiceState) {
    case "listening": return "animate-listening";
    case "thinking":
    case "transcribing": return "animate-thinking";
    case "speaking": return "animate-speaking";
    default: return "animate-breathe animate-wobble";
  }
}

function getGlowClass(voiceState: VoiceState): string {
  switch (voiceState) {
    case "listening": return "glow-ember-alive";
    case "thinking":
    case "transcribing": return "glow-ember";
    case "speaking": return "glow-radiant";
    default: return "glow-ember";
  }
}

export function VoiceAcornButton({
  treeStage,
  treeRings,
  voiceState,
  onPress,
}: VoiceAcornButtonProps) {
  const isActive = voiceState !== "idle" && voiceState !== "error";
  const isListening = voiceState === "listening";
  const [ripples, setRipples] = useState<number[]>([]);

  const handlePress = useCallback(() => {
    const id = Date.now();
    setRipples((prev) => [...prev, id]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id));
    }, 1500);
    onPress();
  }, [onPress]);

  return (
    <div className="relative">
      {/* Listening state: expanding pulse rings */}
      {isListening && (
        <>
          <div
            className="absolute inset-[-12%] rounded-full border border-primary/35 animate-listening-ring pointer-events-none"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="absolute inset-[-12%] rounded-full border border-primary/25 animate-listening-ring pointer-events-none"
            style={{ animationDelay: "700ms" }}
          />
          <div
            className="absolute inset-[-12%] rounded-full border border-primary/15 animate-listening-ring pointer-events-none"
            style={{ animationDelay: "1400ms" }}
          />
        </>
      )}
      
      {/* Interaction ripples */}
      {ripples.map((id) => (
        <div
          key={id}
          className="absolute inset-0 rounded-full border-2 border-primary/45 animate-ripple pointer-events-none"
        />
      ))}
      
      {/* Ambient glow behind button */}
      <div
        className={`
          absolute inset-[-25%] rounded-full transition-opacity duration-700
          ${isActive ? "opacity-100" : "opacity-55"}
        `}
        style={{
          background: `
            radial-gradient(circle at center, 
              oklch(0.74 0.12 85 / ${isActive ? "0.22" : "0.10"}) 0%, 
              oklch(0.68 0.10 88 / ${isActive ? "0.10" : "0.05"}) 45%,
              transparent 75%)
          `,
        }}
      />
      
      <button
        onClick={handlePress}
        disabled={isActive}
        className={`
          relative w-56 h-56 sm:w-64 sm:h-64 rounded-full
          flex items-center justify-center
          transition-all duration-500
          ${getAnimationClass(voiceState)}
          ${getGlowClass(voiceState)}
          focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/45
          disabled:cursor-default
          hover:scale-[1.025] active:scale-[0.975]
          touch-manipulation
        `}
        style={{
          background: `
            radial-gradient(circle at 38% 38%, 
              oklch(0.26 0.04 145 / 0.96) 0%, 
              oklch(0.20 0.035 148 / 0.98) 50%, 
              oklch(0.16 0.03 150) 100%)
          `,
        }}
        aria-label={
          isActive ? `${voiceState}...` : "Touch to speak to your tree"
        }
      >
        {/* Inner atmospheric ring */}
        <div
          className={`
            absolute inset-4 rounded-full
            transition-all duration-700
            ${isActive ? "opacity-100" : "opacity-45"}
          `}
          style={{
            background: `
              radial-gradient(circle at center, 
                transparent 45%, 
                oklch(0.74 0.10 85 / ${isActive ? "0.12" : "0.06"}) 75%, 
                oklch(0.74 0.10 85 / ${isActive ? "0.20" : "0.10"}) 100%)
            `,
          }}
        />

        {/* Tree visual */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40">
          {getTreeVisual(treeStage, treeRings, isActive)}
        </div>
      </button>
    </div>
  );
}
