import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { artworks } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ isLoaded }) {
  const containerRef = useRef(null);
  const wipeRef = useRef(null);
  const headlineRef = useRef(null);
  const centralArtRef = useRef(null);
  const thumb1Ref = useRef(null);
  const thumb2Ref = useRef(null);
  const thumb3Ref = useRef(null);
  const introTextRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Entrance animation triggered when preloader finishes
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Horizontal Gold/Tan block wipe reveal across top
      tl.set(wipeRef.current, { scaleX: 0, transformOrigin: 'left center', opacity: 1 })
        .to(wipeRef.current, {
          scaleX: 1,
          duration: 0.9,
          ease: 'power2.inOut',
        })
        .to(wipeRef.current, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.9,
          ease: 'power2.inOut',
        }, '+=0.05')

        // 2. Uncover giant serif headline at the very bottom edge of hero
        .fromTo(
          headlineRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.6'
        )

        // 3. Central framed artwork scales/fades in
        .fromTo(
          centralArtRef.current,
          { scale: 0.88, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.9'
        )

        // 4. Secondary asymmetrical thumbnails
        .fromTo(
          [thumb1Ref.current, thumb2Ref.current, thumb3Ref.current],
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15 },
          '-=0.8'
        )

        // 5. Left copy + scroll cue
        .fromTo(
          introTextRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Horizontal Gold/Tan wipe reveal block */}
      <div
        ref={wipeRef}
        className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-r from-[#935a28] via-[#c5a059] to-[#e4c483] z-30 pointer-events-none opacity-0 shadow-2xl"
      />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left column: Intro narrative & link */}
        <div
          ref={introTextRef}
          className="lg:col-span-3 flex flex-col justify-center space-y-5 opacity-0 z-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] text-[#c5a059] uppercase">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span>Curated Exhibition</span>
          </div>

          <p className="font-sans text-sm md:text-base text-[#8a857e] font-light leading-relaxed max-w-sm">
            An exploration of rare chiaroscuro masters, gilded tempera, and sacred geometries preserved through centuries of classical reverence.
          </p>

          <a
            href="#gallery-mosaic"
            className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.2em] uppercase text-[#f5f2eb] hover:text-[#c5a059] transition-colors group w-fit pt-2"
          >
            <span>Visit Gallery</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Center column: Scattered gallery-wall composition with central framed artwork */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] md:min-h-[460px]">
          {/* Asymmetric secondary thumbnail 1 (Top Left) */}
          <div
            ref={thumb1Ref}
            className="absolute -top-4 -left-4 md:-left-8 w-24 md:w-32 z-10 opacity-0 -rotate-3 transition-transform hover:rotate-0 duration-300"
          >
            <div className="gallery-frame p-1.5 shadow-xl">
              <img
                src={artworks[1].image}
                alt={artworks[1].title}
                className="w-full h-32 md:h-40 object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="mt-1 text-[10px] font-cinzel text-[#8a857e] truncate">{artworks[1].title}</p>
          </div>

          {/* Central framed master artwork */}
          <div
            ref={centralArtRef}
            className="relative z-20 w-64 sm:w-80 md:w-96 max-w-full opacity-0"
          >
            <div className="gallery-frame p-3 shadow-2xl rounded-sm">
              <div className="gallery-mat">
                <div className="relative overflow-hidden group">
                  <img
                    src={artworks[0].image}
                    alt={artworks[0].title}
                    className="w-full h-[320px] md:h-[400px] object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle golden glare overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-80" />
                </div>
              </div>
            </div>
            {/* Artwork caption badge */}
            <div className="mt-3 flex items-center justify-between text-xs font-serif text-[#8a857e]">
              <span className="italic text-[#f5f2eb]/90">{artworks[0].title}</span>
              <span className="font-cinzel text-[10px] text-[#c5a059]">{artworks[0].year}</span>
            </div>
          </div>

          {/* Asymmetric secondary thumbnail 2 (Right Featured badge) */}
          <div
            ref={thumb2Ref}
            className="absolute -bottom-2 -right-4 md:-right-8 w-28 md:w-36 z-20 opacity-0 rotate-3 transition-transform hover:rotate-0 duration-300"
          >
            <div className="relative gallery-frame p-2 shadow-2xl">
              {/* Featured Badge */}
              <div className="absolute -top-3 -right-3 z-30 flex items-center gap-1 bg-gradient-to-r from-[#c5a059] to-[#935a28] text-[#0a0a0a] text-[9px] font-cinzel font-bold tracking-wider px-2 py-0.5 rounded-full shadow-lg">
                <Sparkles className="w-2.5 h-2.5" />
                FEATURED
              </div>
              <img
                src={artworks[2].image}
                alt={artworks[2].title}
                className="w-full h-36 md:h-44 object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="mt-1 text-[10px] font-cinzel text-[#8a857e] truncate">{artworks[2].title}</p>
          </div>

          {/* Asymmetric secondary thumbnail 3 (Far Top Right) */}
          <div
            ref={thumb3Ref}
            className="hidden sm:block absolute top-2 right-12 w-20 md:w-24 z-0 opacity-0 -rotate-6 opacity-60"
          >
            <div className="gallery-frame p-1 shadow-lg">
              <img
                src={artworks[3].image}
                alt={artworks[3].title}
                className="w-full h-24 md:h-28 object-cover opacity-70"
              />
            </div>
          </div>
        </div>

        {/* Right column: Gallery info / catalog snippet */}
        <div className="lg:col-span-3 flex flex-col justify-end lg:items-end space-y-4 text-left lg:text-right z-20">
          <div className="font-cinzel text-xs text-[#c5a059] tracking-widest uppercase">
            Permanent Archive
          </div>
          <p className="font-serif italic text-base text-[#f5f2eb]/70 max-w-xs">
            &ldquo;Art does not reproduce the visible; rather, it makes visible.&rdquo;
          </p>
          <div className="font-sans text-xs text-[#8a857e]/60 tracking-wider">
            ROOM I &middot; SALLE DES MAÎTRES
          </div>
        </div>
      </div>

      {/* Bottom Row: Giant serif headline + Scroll Indicator */}
      <div className="relative z-20 w-full pt-8 mt-auto border-t border-white/5 flex flex-col md:flex-row items-baseline justify-between gap-4">
        {/* Giant Serif Headline (Mixed Roman + Italic Type) anchored at bottom */}
        <div ref={headlineRef} className="opacity-0">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-[#f5f2eb] leading-none select-none">
            <span className="font-serif tracking-normal">Heritage</span>{' '}
            <span className="font-serif italic font-light text-[#c5a059] mr-2 md:mr-4">In</span>
            <span className="font-serif font-normal">Art</span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="flex items-center gap-3 font-cinzel text-[11px] tracking-[0.25em] text-[#c5a059]/80 uppercase self-end opacity-0 pb-2"
        >
          <span>Scroll</span>
          <div className="w-7 h-7 rounded-full border border-[#c5a059]/30 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 text-[#c5a059]" />
          </div>
        </div>
      </div>
    </section>
  );
}
