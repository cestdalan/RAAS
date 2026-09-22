import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryHallwayImage } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

export default function WatermarkGalleryPhoto() {
  const containerRef = useRef(null);
  const watermarkTextRef = useRef(null);
  const numeralGhostRef = useRef(null);
  const galleryPhotoRef = useRef(null);
  const missionTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark tease & gallery photo parallax scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Numerals bleed through and drift slowly
      tl.to(
        numeralGhostRef.current,
        {
          y: -120,
          opacity: 0.14,
          ease: 'none',
        },
        0
      );

      // 2. Giant thin-serif "LUMEN ARTSPACE" fades into view
      tl.fromTo(
        watermarkTextRef.current,
        { opacity: 0, scale: 0.94, y: 40 },
        { opacity: 0.85, scale: 1, y: 0, ease: 'power2.out' },
        0
      );

      // 3. Full-bleed real gallery photo fades and zooms slightly inward
      tl.fromTo(
        galleryPhotoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, ease: 'power2.inOut' },
        0.35
      );

      // 4. Mission statement fades in centered over the photo while watermark numerals continue to ghost through
      tl.fromTo(
        missionTextRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.55
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="watermark-photo-section"
      ref={containerRef}
      className="relative w-full h-screen bg-[#080808] text-[#f5f2eb] overflow-hidden flex items-center justify-center select-none"
    >
      {/* GIANT FAINT NUMERAL WATERMARK BLEEDING THROUGH (Layered Depth) */}
      <div
        ref={numeralGhostRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <span className="font-cinzel text-[32vw] font-bold text-[#c5a059] opacity-[0.06] select-none tracking-tighter leading-none">
          2015
        </span>
      </div>

      {/* OVERSIZED WATERMARK TYPOGRAPHY (Section 7) */}
      <div
        ref={watermarkTextRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        {/* Monogram Logo Mark */}
        <div className="w-14 h-14 rounded-full border border-[#c5a059]/30 flex items-center justify-center font-cinzel text-base text-[#c5a059] mb-4">
          A ⊙ G
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-lg md:text-2xl text-[#c5a059]/90 mb-4 tracking-wide">
          Collecting fine art since &mdash;
        </p>

        {/* Giant Thin Serif Typography */}
        <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-extralight tracking-widest text-[#f5f2eb]/90 uppercase leading-none">
          ART GALLERY
        </h2>
      </div>

      {/* FULL-BLEED REAL GALLERY PHOTO (Section 8) */}
      <div
        ref={galleryPhotoRef}
        className="absolute inset-0 z-20 opacity-0 overflow-hidden pointer-events-none will-change-transform"
      >
        <img
          src={galleryHallwayImage}
          alt="ART GALLERY Grand Hallway"
          className="w-full h-full object-cover grayscale-[35%] contrast-125"
        />
        {/* Darkening & Warm Gilded Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/90" />
        <div className="absolute inset-0 bg-[#c5a059]/10 mix-blend-color" />
      </div>

      {/* MISSION-STATEMENT TEXT CENTERED ON TOP OF PHOTO */}
      <div
        ref={missionTextRef}
        className="relative z-30 max-w-4xl px-6 md:px-12 text-center flex flex-col items-center space-y-6 opacity-0 will-change-transform pointer-events-auto"
      >
        <div className="inline-flex items-center gap-3 font-cinzel text-xs tracking-[0.3em] uppercase text-[#c5a059]">
          <span className="w-8 h-[1px] bg-[#c5a059]" />
          <span>Curatorial Philosophy</span>
          <span className="w-8 h-[1px] bg-[#c5a059]" />
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl text-[#f5f2eb] font-light leading-tight">
          &ldquo;We do not merely exhibit paintings; we curate the sacred resonance between human history and luminous pigment.&rdquo;
        </h3>

        <p className="font-sans text-sm md:text-base text-[#8a857e] font-light max-w-2xl leading-relaxed">
          Every piece in our halls is selected for its rare compositional integrity, historic provenance, and timeless ability to captivate generations across silence and light.
        </p>

        <div className="pt-2">
          <span className="font-cinzel text-xs tracking-widest text-[#c5a059]/80 uppercase">
            &mdash; The Curatorial Board of ART GALLERY (AG)
          </span>
        </div>
      </div>
    </section>
  );
}
