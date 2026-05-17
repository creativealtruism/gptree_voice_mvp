"use client";

import { useEffect, useState } from "react";

// Generate deterministic particles for SSR compatibility
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23 + 40) % 60 + 30}%`,
      size: 2 + (i % 3),
      delay: (i * 0.8) % 8,
      duration: 6 + (i % 4) * 2,
    });
  }
  return particles;
}

const PARTICLES = generateParticles(12);

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep base layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              oklch(0.08 0.01 100) 0%, 
              oklch(0.11 0.015 105) 30%,
              oklch(0.13 0.02 110) 60%, 
              oklch(0.15 0.025 115) 100%)
          `,
        }}
      />

      {/* Forest floor glow - ground mist */}
      <div
        className="absolute bottom-0 inset-x-0 h-[60%] animate-haze"
        style={{
          background: `
            radial-gradient(ellipse 120% 50% at 50% 100%, 
              oklch(0.20 0.04 145 / 0.25) 0%, 
              oklch(0.16 0.03 140 / 0.15) 40%,
              transparent 70%)
          `,
        }}
      />

      {/* Ambient haze layers */}
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 70%, 
              oklch(0.18 0.03 150 / 0.2) 0%, 
              transparent 60%),
            radial-gradient(ellipse 50% 35% at 80% 60%, 
              oklch(0.16 0.025 90 / 0.15) 0%, 
              transparent 50%)
          `,
        }}
      />

      {/* Central warm glow - where the acorn lives */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] animate-breathe"
        style={{
          background: `
            radial-gradient(circle at center, 
              oklch(0.25 0.06 80 / 0.12) 0%, 
              oklch(0.20 0.04 85 / 0.08) 30%,
              oklch(0.15 0.02 90 / 0.04) 60%,
              transparent 80%)
          `,
        }}
      />

      {/* Subtle root system hint at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 30% 100% at 35% 100%, 
              oklch(0.25 0.04 55 / 0.4) 0%, 
              transparent 70%),
            radial-gradient(ellipse 25% 100% at 65% 100%, 
              oklch(0.22 0.03 50 / 0.3) 0%, 
              transparent 60%),
            radial-gradient(ellipse 20% 100% at 50% 100%, 
              oklch(0.28 0.05 60 / 0.35) 0%, 
              transparent 80%)
          `,
        }}
      />

      {/* Top darkness gradient - canopy shadow */}
      <div
        className="absolute top-0 inset-x-0 h-40"
        style={{
          background: `linear-gradient(180deg, 
            oklch(0.06 0.01 100 / 0.9) 0%, 
            oklch(0.08 0.01 100 / 0.5) 40%,
            transparent 100%)`,
        }}
      />

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                backgroundColor: `oklch(0.65 0.10 ${75 + (particle.id % 3) * 25} / 0.4)`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, 
              transparent 30%, 
              oklch(0.05 0.01 100 / 0.4) 100%)
          `,
        }}
      />
    </div>
  );
}
