"use client";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base forest gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 120%, 
              oklch(0.25 0.06 140 / 0.6) 0%, 
              transparent 70%),
            radial-gradient(ellipse 60% 40% at 30% 80%, 
              oklch(0.20 0.04 90 / 0.4) 0%, 
              transparent 60%),
            radial-gradient(ellipse 50% 30% at 70% 90%, 
              oklch(0.22 0.05 55 / 0.3) 0%, 
              transparent 50%),
            linear-gradient(180deg, 
              oklch(0.12 0.02 90) 0%, 
              oklch(0.15 0.025 100) 50%, 
              oklch(0.18 0.03 110) 100%)
          `,
        }}
      />

      {/* Subtle animated glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-30 animate-breathe"
        style={{
          background: `
            radial-gradient(ellipse at center bottom, 
              oklch(0.45 0.10 145 / 0.4) 0%, 
              transparent 70%)
          `,
        }}
      />

      {/* Top subtle gradient */}
      <div
        className="absolute top-0 inset-x-0 h-32"
        style={{
          background: `linear-gradient(180deg, 
            oklch(0.10 0.02 90 / 0.8) 0%, 
            transparent 100%)`,
        }}
      />
    </div>
  );
}
