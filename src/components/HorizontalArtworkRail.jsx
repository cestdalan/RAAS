import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { artworks } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalArtworkRail() {
  const containerRef = useRef(null);
  const railRef = useRef(null);
  const headingRef = useRef(null);

  // Artworks for the horizontal rail (staggered vertical offsets)
  const railArtworks = [
    { ...artworks[2], title: "Untitled III — Gilded Reverie", verticalOffset: "-translate-y-6" },
    { ...artworks[3], title: "Untitled IV — Lacquer on Canvas", verticalOffset: "translate-y-10" },
    { ...artworks[4], title: "Untitled V — Venetian Horizon", verticalOffset: "-translate-y-12" },
    { ...artworks[5], title: "Untitled VI — Obsidian Echo", verticalOffset: "translate-y-8" },
    { ...artworks[6], title: "Untitled VII — Amber Solitude", verticalOffset: "-translate-y-4" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cross-axis parallax: vertical scroll drives horizontal translation of the rail
      const totalScrollWidth = railRef.current.scrollWidth - window.innerWidth + 200;

      gsap.to(railRef.current, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollWidth + 400}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Heading subtle float
      gsap.fromTo(
        headingRef.current,
        { opacity: 0.7, y: 0 },
        {
          opacity: 1,
          y: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rail-section"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0a] text-[#f5f2eb] overflow-hidden flex flex-col justify-between py-12 select-none"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-[#c5a059]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Heading with horizontal underline rule between the two halves */}
      <div ref={headingRef} className="px-6 md:px-16 pt-8 z-10">
        <div className="flex flex-col sm:flex-row items-baseline gap-4 md:gap-8 max-w-5xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-[#f5f2eb] tracking-tight">
            Reflection
          </h2>

          {/* Underline rule connecting the two halves */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#c5a059] via-[#c5a059]/40 to-transparent min-w-[60px] my-auto" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-[#c5a059] font-light tracking-tight">
            Of Art
          </h2>
        </div>

        <p className="font-sans text-xs text-[#8a857e] tracking-[0.25em] uppercase mt-3">
          Continuous Horizontal Exhibition &middot; Drag or scroll along the cross-axis
        </p>
      </div>

      {/* HORIZONTAL ARTWORK RAIL (Staggered Vertical Offsets) */}
      <div className="relative z-10 w-full overflow-visible my-auto">
        <div
          ref={railRef}
          className="flex items-center gap-8 md:gap-14 px-6 md:px-16 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {railArtworks.map((art, index) => (
            <div
              key={`rail-${art.id}-${index}`}
              className={`relative group w-72 sm:w-80 md:w-96 shrink-0 transition-transform duration-500 ease-out hover:scale-[1.02] ${art.verticalOffset}`}
            >
              {/* Luxury Frame */}
              <div className="gallery-frame p-3 bg-[#13110f] shadow-2xl">
                <div className="gallery-mat">
                  <div className="relative overflow-hidden aspect-[4/5] bg-black">
                    <img
                      src={art.image}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Golden subtle sheen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity" />
                  </div>
                </div>

                {/* Artwork Card Metadata */}
                <div className="pt-4 pb-2 px-1 flex flex-col space-y-1.5 border-t border-[#c5a059]/20 mt-3">
                  <div className="flex items-center justify-between text-[10px] font-cinzel text-[#c5a059] tracking-widest uppercase">
                    <span>{art.catalogNo} &middot; {art.year}</span>
                    <span>{art.dimensions}</span>
                  </div>

                  <h3 className="font-serif italic text-lg md:text-xl text-[#f5f2eb] truncate group-hover:text-[#c5a059] transition-colors">
                    {art.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[#8a857e] font-light">
                      {art.medium}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rail Bottom Indicator */}
      <div className="px-6 md:px-16 z-10 flex items-center justify-between text-[11px] font-cinzel tracking-widest text-[#8a857e]/60 uppercase">
        <span>03 &mdash; 07 Masterworks in motion</span>
        <span>Scroll vertically to traverse &rarr;</span>
      </div>
    </section>
  );
}
