import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { artworks } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedHeroTransition() {
  const sectionRef = useRef(null);
  const pinnedTitleRef = useRef(null);
  const slideUpContentRef = useRef(null);
  const floatingArtRef = useRef(null);
  const driftThumb1Ref = useRef(null);
  const driftThumb2Ref = useRef(null);
  const driftThumb3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned title timeline scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Hero headline scales down and translates upwards towards the top margin
      tl.to(pinnedTitleRef.current, {
        scale: 0.62,
        y: -120,
        opacity: 0.35,
        ease: 'none',
      }, 0);

      // 2. The next section beneath slides up and fades in underneath it
      tl.fromTo(
        slideUpContentRef.current,
        { y: '80%', opacity: 0 },
        { y: '0%', opacity: 1, ease: 'power2.out' },
        0.1
      );

      // 3. Floating artwork image scales and rises beside body copy
      tl.fromTo(
        floatingArtRef.current,
        { scale: 0.85, y: 140, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      // 4. Staggered parallax entrance: thumbnails re-enter and drift into new positions
      tl.fromTo(
        driftThumb1Ref.current,
        { y: 220, x: -60, rotation: -12, opacity: 0 },
        { y: -30, x: 10, rotation: -4, opacity: 1, ease: 'power1.out' },
        0.25
      );

      tl.fromTo(
        driftThumb2Ref.current,
        { y: 280, x: 80, rotation: 15, opacity: 0 },
        { y: 20, x: -15, rotation: 6, opacity: 1, ease: 'power1.out' },
        0.35
      );

      tl.fromTo(
        driftThumb3Ref.current,
        { y: 340, x: -40, rotation: -8, opacity: 0 },
        { y: 60, x: 30, rotation: 2, opacity: 0.85, ease: 'power1.out' },
        0.45
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-[#f5f2eb] overflow-hidden flex flex-col justify-center px-6 md:px-12 py-16"
    >
      {/* Pinned Title that scales and translates */}
      <div
        ref={pinnedTitleRef}
        className="w-full text-center md:text-left origin-center pointer-events-none z-10 will-change-transform"
      >
        <div className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#c5a059] mb-2">
          Retrospective Archive
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#f5f2eb] leading-tight">
          <span className="font-serif">Heritage</span>{' '}
          <span className="font-serif italic text-[#c5a059]">In</span>{' '}
          <span className="font-serif">Art</span>
        </h2>
      </div>

      {/* Slide-up beneath content container */}
      <div
        ref={slideUpContentRef}
        className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6 will-change-transform"
      >
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          {/* Script sub-heading */}
          <div className="font-script text-3xl md:text-4xl text-[#c5a059] -rotate-1 tracking-wide">
            A Journey Through Time
          </div>

          <h3 className="font-serif text-2xl md:text-4xl text-[#f5f2eb] font-light leading-snug">
            Echoes of gilded craftsmanship across the European canon.
          </h3>

          <p className="font-sans text-sm md:text-base text-[#8a857e] font-light leading-relaxed max-w-xl">
            From the quiet workshops of Flemish luminaries to the dramatic chiaroscuro of Venetian courts, every canvas in our archive embodies a century-long dialogue between pigment, natural light, and the enduring human spirit.
          </p>

          <div className="pt-2">
            <a
              href="#gallery-mosaic"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#c5a059]/40 bg-[#121212] hover:bg-[#c5a059] hover:text-[#0a0a0a] text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 group"
            >
              <span>Visit Gallery</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-[#0a0a0a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Right Single Floating Artwork Image */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div
            ref={floatingArtRef}
            className="relative z-20 w-72 md:w-96 gallery-frame p-3 shadow-2xl bg-[#12100e]"
          >
            <div className="gallery-mat">
              <img
                src={artworks[3].image}
                alt={artworks[3].title}
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div className="p-3 bg-[#0e0d0c] border-t border-[#c5a059]/10">
              <div className="font-cinzel text-[10px] text-[#c5a059] tracking-widest uppercase">
                {artworks[3].artist} &middot; {artworks[3].year}
              </div>
              <div className="font-serif text-base text-[#f5f2eb] italic mt-0.5">
                {artworks[3].title}
              </div>
              <div className="font-sans text-[11px] text-[#8a857e] font-light">
                {artworks[3].medium}
              </div>
            </div>
          </div>

          {/* Staggered Parallax Entering Thumbnails */}
          <div
            ref={driftThumb1Ref}
            className="absolute -top-10 -left-6 md:-left-12 w-28 md:w-36 z-30 pointer-events-none"
          >
            <div className="gallery-frame p-1.5 shadow-2xl bg-[#141210]">
              <img
                src={artworks[4].image}
                alt={artworks[4].title}
                className="w-full h-36 object-cover"
              />
            </div>
            <span className="block text-[9px] font-cinzel text-[#c5a059] mt-1 truncate">
              {artworks[4].title}
            </span>
          </div>

          <div
            ref={driftThumb2Ref}
            className="absolute -bottom-8 -right-4 md:-right-8 w-32 md:w-40 z-30 pointer-events-none"
          >
            <div className="gallery-frame p-1.5 shadow-2xl bg-[#141210]">
              <img
                src={artworks[5].image}
                alt={artworks[5].title}
                className="w-full h-40 object-cover"
              />
            </div>
            <span className="block text-[9px] font-cinzel text-[#c5a059] mt-1 truncate">
              {artworks[5].title}
            </span>
          </div>

          <div
            ref={driftThumb3Ref}
            className="hidden sm:block absolute top-1/2 -left-16 w-20 z-10 pointer-events-none"
          >
            <div className="gallery-frame p-1 shadow-lg bg-[#141210]">
              <img
                src={artworks[6].image}
                alt={artworks[6].title}
                className="w-full h-24 object-cover opacity-75"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
