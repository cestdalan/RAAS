import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Natural luxury pacing counter
      const increment = Math.floor(Math.random() * 4) + 1;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 350);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="site-preloader"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Subtle radial ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#c5a059]/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Gallery Monogram */}
        <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-full border border-[#c5a059]/30 text-[#c5a059] font-cinzel text-sm tracking-widest">
          L ⊙ A
        </div>

        {/* Minimal Percentage Counter */}
        <div className="flex items-baseline gap-1 font-serif text-6xl md:text-8xl lg:text-9xl text-[#f5f2eb] font-light tracking-tight">
          <span className="tabular-nums font-light">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span className="font-serif italic text-3xl md:text-4xl text-[#c5a059] font-light">
            %
          </span>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#c5a059] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Editorial Subtitle */}
        <div className="mt-5 font-cinzel text-[11px] tracking-[0.3em] uppercase text-[#8a857e]">
          Lumen Artspace &middot; Heritage In Art
        </div>
      </div>
    </div>
  );
}
