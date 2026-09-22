import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, ArrowDown } from 'lucide-react';
import { artworks } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

export default function ScatterToGridMosaic() {
  const containerRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const gridContainerRef = useRef(null);
  const tileRefs = useRef([]);
  const pinnedRowRef = useRef(null);
  const oversizedTextRef = useRef(null);
  const subheadRef = useRef(null);

  tileRefs.current = [];
  const addToTileRefs = (el) => {
    if (el && !tileRefs.current.includes(el)) {
      tileRefs.current.push(el);
    }
  };

  // Initial random scatter offsets & rotations for 8 tiles
  const initialScatter = [
    { x: -140, y: -90, rot: -18, scale: 0.9 },
    { x: 160, y: -120, rot: 15, scale: 1.05 },
    { x: -210, y: 50, rot: 12, scale: 0.85 },
    { x: 230, y: 70, rot: -14, scale: 0.95 },
    { x: -120, y: 200, rot: -10, scale: 1.0 },
    { x: 150, y: 220, rot: 20, scale: 0.88 },
    { x: -280, y: -60, rot: 16, scale: 0.92 },
    { x: 270, y: -40, rot: -12, scale: 1.02 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER SCROLLTRIGGER TIMELINE
      // Pins the entire section while orchestrating:
      // 1. Scatter to Grid
      // 2. Grid to Pinned Row
      // 3. Oversized Typography Fade & Brightness
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // --- PHASE 1: Scattered collage aligns into full-bleed grid ---
      tileRefs.current.forEach((tile, i) => {
        const scatter = initialScatter[i % initialScatter.length];
        gsap.set(tile, {
          x: scatter.x,
          y: scatter.y,
          rotation: scatter.rot,
          scale: scatter.scale,
          transformOrigin: 'center center',
        });
      });

      // Animate tiles: lose rotation & translation, snap into tight grid
      masterTl.to(
        tileRefs.current,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          ease: 'power2.inOut',
          stagger: {
            amount: 0.25,
            from: 'random',
          },
        },
        0
      );

      // Title shrinks slightly as grid takes over viewport
      masterTl.to(
        headingWrapperRef.current,
        {
          y: -40,
          opacity: 0.9,
          scale: 0.92,
          ease: 'power1.out',
        },
        0
      );

      // --- PHASE 2: Grid collapses into a single pinned row of thumbnails at the top ---
      masterTl.to(
        gridContainerRef.current,
        {
          scale: 0.75,
          y: -180,
          opacity: 0,
          ease: 'power2.in',
        },
        0.5
      );

      // Pinned single row reveals at the top
      masterTl.fromTo(
        pinnedRowRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.55
      );

      // Heading fades out to make space for oversized typography
      masterTl.to(
        headingWrapperRef.current,
        {
          y: -80,
          opacity: 0,
          ease: 'power1.in',
        },
        0.5
      );

      // --- PHASE 3: Massive tracked-out uppercase heading fades in from dark to full brightness ---
      masterTl.fromTo(
        oversizedTextRef.current,
        {
          opacity: 0.05,
          filter: 'brightness(0.3) blur(6px)',
          scale: 0.95,
          y: 40,
        },
        {
          opacity: 1,
          filter: 'brightness(1.1) blur(0px)',
          scale: 1,
          y: 0,
          ease: 'power2.out',
        },
        0.65
      );

      // Subhead copy + scroll cue appear beneath
      masterTl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery-mosaic"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0a] text-[#f5f2eb] overflow-hidden flex flex-col items-center justify-center px-4 md:px-12 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[150px]" />
      </div>

      {/* PHASE 2 Pinned Row of thumbnails at the top (Collapses here) */}
      <div
        ref={pinnedRowRef}
        className="absolute top-20 left-0 right-0 z-30 px-6 md:px-12 flex items-center justify-center gap-2 md:gap-4 opacity-0 pointer-events-auto"
      >
        <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#12100e]/90 border border-[#c5a059]/25 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full">
          <span className="font-cinzel text-[10px] text-[#c5a059] tracking-widest uppercase shrink-0">
            Archive Index
          </span>
          <div className="w-[1px] h-4 bg-white/10 shrink-0" />
          <div className="flex items-center gap-2">
            {artworks.slice(0, 7).map((art, idx) => (
              <div
                key={`thumb-pinned-${art.id}`}
                className="group relative w-10 h-8 md:w-14 md:h-10 rounded overflow-hidden border border-[#c5a059]/20 hover:border-[#c5a059] transition-all shrink-0 cursor-pointer"
                title={`${art.title} - ${art.artist}`}
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header with script tagline & crosshair */}
      <div
        ref={headingWrapperRef}
        className="relative z-20 text-center mb-6 max-w-3xl will-change-transform"
      >
        {/* Script Tagline */}
        <p className="font-script text-3xl md:text-5xl text-[#c5a059] mb-2 tracking-wider">
          ART GALLERY
        </p>

        {/* Huge Serif Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#f5f2eb] leading-tight">
          <span className="font-serif">Impressions</span>{' '}
          <span className="font-serif italic font-light text-[#c5a059]">Of</span>{' '}
          <span className="font-serif">Heritage</span>
        </h2>

        {/* Centered Crosshair / Target Logo Mark */}
        <div className="flex items-center justify-center gap-3 mt-4 text-[#c5a059]/70">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/40" />
          <div className="p-1 rounded-full border border-[#c5a059]/40">
            <Target className="w-4 h-4 text-[#c5a059]" />
          </div>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/40" />
        </div>
      </div>

      {/* Scattered into tight full-bleed grid */}
      <div
        ref={gridContainerRef}
        className="relative z-10 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 p-2 will-change-transform"
      >
        {artworks.slice(0, 8).map((art, index) => (
          <div
            key={art.id}
            ref={addToTileRefs}
            className="group relative aspect-square gallery-frame p-2 bg-[#12100e] overflow-hidden cursor-pointer will-change-transform transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(197,160,89,0.25)]"
          >
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[15%] group-hover:grayscale-0"
              />
              {/* Subtle museum glare */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Hover metadata overlay */}
              <div className="absolute inset-0 p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/95 via-black/50 to-transparent">
                <span className="font-cinzel text-[9px] text-[#c5a059] tracking-widest uppercase">
                  {art.catalogNo} &middot; {art.year}
                </span>
                <span className="font-serif italic text-sm text-[#f5f2eb] truncate">
                  {art.title}
                </span>
                <span className="font-sans text-[10px] text-[#8a857e] truncate">
                  {art.medium}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PHASE 3: Massive tracked-out uppercase heading */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div ref={oversizedTextRef} className="opacity-0 will-change-transform">
          <div className="font-cinzel text-xs md:text-sm tracking-[0.4em] text-[#c5a059] uppercase mb-4">
            Curatorial Synthesis
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-cinzel font-light text-[#f5f2eb] tracking-widestExtra lg:tracking-ultra uppercase leading-none select-none">
            TIMELESS MASTERPIECES
          </h2>
        </div>

        {/* Subhead copy + scroll cue beneath */}
        <div
          ref={subheadRef}
          className="mt-8 max-w-lg mx-auto opacity-0 flex flex-col items-center space-y-4 pointer-events-auto"
        >
          <p className="font-serif italic text-lg md:text-xl text-[#8a857e] leading-relaxed">
            Preserving centuries of brushstrokes, raw earth pigments, and sacred illumination.
          </p>
          <div className="flex items-center gap-2 font-cinzel text-xs text-[#c5a059] tracking-[0.25em] uppercase pt-2">
            <span>Our Collection</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#c5a059] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
