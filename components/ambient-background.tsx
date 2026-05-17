"use client";

import { useEffect, useState } from "react";

// Generate deterministic particles for SSR compatibility
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: `${(i * 17 + 5) % 95}%`,
      top: `${(i * 23 + 35) % 55 + 35}%`,
      size: 2 + (i % 4),
      delay: (i * 0.9) % 10,
      duration: 8 + (i % 5) * 2,
      hue: 75 + (i % 4) * 20, // warm amber to soft green range
    });
  }
  return particles;
}

const PARTICLES = generateParticles(16);

// 4-leaf motif SVG (ChatGPTree logo shape)
const LeafMotif = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    {/* Top left leaf */}
    <path d="M20 45 C20 25, 35 10, 45 10 L45 45 Z" />
    {/* Top right leaf */}
    <path d="M55 10 C65 10, 80 25, 80 45 L55 45 Z" />
    {/* Bottom left leaf */}
    <path d="M20 55 C20 75, 35 90, 45 90 L45 55 Z" />
    {/* Bottom right leaf */}
    <path d="M55 90 C65 90, 80 75, 80 55 L55 55 Z" />
  </svg>
);

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Rich forest gradient base - warm greens, not black */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(175deg, 
              oklch(0.12 0.03 148) 0%, 
              oklch(0.15 0.035 145) 25%,
              oklch(0.17 0.04 143) 50%, 
              oklch(0.19 0.045 140) 75%,
              oklch(0.16 0.035 145) 100%)
          `,
        }}
      />

      {/* Atmospheric fog layers - Ghibli-inspired softness */}
      <div
        className="absolute inset-0 animate-haze"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 30% 80%, 
              oklch(0.24 0.05 145 / 0.35) 0%, 
              transparent 60%),
            radial-gradient(ellipse 80% 50% at 70% 70%, 
              oklch(0.22 0.04 150 / 0.28) 0%, 
              transparent 55%)
          `,
        }}
      />

      {/* Secondary atmospheric layer with drift */}
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 20% 65%, 
              oklch(0.20 0.035 148 / 0.22) 0%, 
              transparent 55%),
            radial-gradient(ellipse 60% 40% at 85% 55%, 
              oklch(0.18 0.03 95 / 0.15) 0%, 
              transparent 50%)
          `,
        }}
      />

      {/* Subtle 4-leaf motif watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <LeafMotif className="w-[700px] h-[700px] text-foreground/[0.008] animate-breathe" />
      </div>

      {/* Central warm glow - the grove's heart */}
      <div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] animate-breathe"
        style={{
          background: `
            radial-gradient(circle at center, 
              oklch(0.30 0.06 85 / 0.14) 0%, 
              oklch(0.25 0.05 90 / 0.10) 25%,
              oklch(0.20 0.04 95 / 0.06) 50%,
              transparent 75%)
          `,
        }}
      />

      {/* Subtle root textures at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 35% 120% at 30% 100%, 
              oklch(0.28 0.04 55 / 0.45) 0%, 
              transparent 65%),
            radial-gradient(ellipse 30% 120% at 70% 100%, 
              oklch(0.26 0.035 52 / 0.38) 0%, 
              transparent 60%),
            radial-gradient(ellipse 25% 120% at 50% 100%, 
              oklch(0.30 0.05 58 / 0.42) 0%, 
              transparent 75%)
          `,
        }}
      />

      {/* Forest floor mist - warm and organic */}
      <div
        className="absolute bottom-0 inset-x-0 h-[50%] animate-haze"
        style={{
          animationDelay: "-5s",
          background: `
            radial-gradient(ellipse 130% 50% at 50% 100%, 
              oklch(0.22 0.045 145 / 0.3) 0%, 
              oklch(0.18 0.035 148 / 0.18) 35%,
              transparent 65%)
          `,
        }}
      />

      {/* Top canopy shadow - soft, not harsh */}
      <div
        className="absolute top-0 inset-x-0 h-48"
        style={{
          background: `linear-gradient(180deg, 
            oklch(0.10 0.02 148 / 0.7) 0%, 
            oklch(0.12 0.025 145 / 0.4) 40%,
            transparent 100%)`,
        }}
      />

      {/* Floating light particles */}
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
                backgroundColor: `oklch(0.68 0.10 ${particle.hue} / 0.45)`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                boxShadow: `0 0 ${particle.size * 3}px oklch(0.68 0.10 ${particle.hue} / 0.25)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cinematic vignette - softer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 65% at 50% 50%, 
              transparent 35%, 
              oklch(0.08 0.02 148 / 0.35) 100%)
          `,
        }}
      />
    </div>
  );
}
