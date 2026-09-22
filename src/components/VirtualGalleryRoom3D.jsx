import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Eye, Sparkles, X } from 'lucide-react';
import { artworks } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

export default function VirtualGalleryRoom3D() {
  const sectionRef = useRef(null);
  const roomWrapperRef = useRef(null);
  const backWallRef = useRef(null);
  const floorRef = useRef(null);
  const framedArtRef = useRef(null);
  const infoHeaderRef = useRef(null);

  // Orbit rotation state around Y-axis (interactive pan)
  const [orbitY, setOrbitY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const startOrbitY = useRef(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Active artwork in the 3D room
  const activeArt = artworks[0];

  // Scroll-linked camera dolly push-in (zoom) with parallax depth
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Camera pushes in (zoom/dolly) on the framed artwork
      // Differential parallax: floor and wall move slower than artwork
      tl.to(
        framedArtRef.current,
        {
          scale: 1.45,
          z: 320,
          y: -20,
          ease: 'none',
        },
        0
      );

      tl.to(
        backWallRef.current,
        {
          scale: 1.15,
          z: 80,
          ease: 'none',
        },
        0
      );

      tl.to(
        floorRef.current,
        {
          scale: 1.2,
          y: 40,
          ease: 'none',
        },
        0
      );

      // Info header stays cleanly positioned and fades slightly as you dolly deep into the canvas
      tl.to(
        infoHeaderRef.current,
        {
          y: -30,
          opacity: 0.85,
          ease: 'none',
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse / Touch Drag Orbit handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startOrbitY.current = orbitY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartX.current;
    // Clamped orbit between -24 deg and +24 deg
    const newOrbit = Math.max(-24, Math.min(24, startOrbitY.current + deltaX * 0.15));
    setOrbitY(newOrbit);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const panLeft = () => {
    setOrbitY((prev) => Math.max(-24, prev - 8));
  };

  const panRight = () => {
    setOrbitY((prev) => Math.min(24, prev + 8));
  };

  return (
    <section
      id="room-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#070707] text-[#f5f2eb] overflow-hidden select-none flex flex-col justify-between"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Pinned Artwork Info pinned above it */}
      <div
        ref={infoHeaderRef}
        className="relative z-30 pt-20 px-6 text-center max-w-2xl mx-auto flex flex-col items-center pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171615]/80 border border-[#c5a059]/30 text-[10px] font-cinzel text-[#c5a059] tracking-widest uppercase mb-3">
          <Sparkles className="w-3 h-3 text-[#c5a059]" />
          <span>Virtual Gallery Room &middot; 3D Perspective</span>
        </div>

        <h3 className="font-serif text-3xl md:text-5xl font-light text-[#f5f2eb]">
          <span className="font-normal">{activeArt.title}</span>
        </h3>

        <p className="font-sans text-xs md:text-sm text-[#8a857e] mt-1 font-light">
          {activeArt.medium} &middot; {activeArt.dimensions} &middot; {activeArt.year}
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-3 inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.2em] uppercase text-[#c5a059] hover:text-[#f5f2eb] transition-colors border-b border-[#c5a059]/40 pb-0.5"
        >
          <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>View Artwork In Detail</span>
        </button>
      </div>

      {/* 3D Perspective Gallery Room Viewport */}
      <div className="absolute inset-0 perspective-room flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Orbit Wrapper that responds to user drag */}
        <div
          ref={roomWrapperRef}
          className="relative w-full h-full preserve-3d transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            transform: `rotateY(${orbitY}deg)`,
          }}
        >
          {/* 1. BACK WALL PLANE */}
          <div
            ref={backWallRef}
            className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] preserve-3d will-change-transform pointer-events-none"
            style={{
              transform: 'translateZ(-200px)',
              background: 'radial-gradient(ellipse at 50% 35%, #181512 0%, #0d0c0b 50%, #050505 100%)',
            }}
          >
            {/* Museum Gallery Wall Wainscoting / Shadow Grid */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#c5a059_1px,transparent_1px),linear-gradient(to_bottom,#c5a059_1px,transparent_1px)] bg-[size:140px_140px]" />

            {/* Gallery Overhead Spotlight Beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[750px] bg-gradient-to-b from-[#c5a059]/25 via-[#c5a059]/5 to-transparent blur-3xl rounded-b-full pointer-events-none" />
          </div>

          {/* 2. WOOD PARQUET FLOOR PLANE (3D Rotated) */}
          <div
            ref={floorRef}
            className="absolute bottom-0 w-[140%] h-[60%] -left-[20%] preserve-3d will-change-transform pointer-events-none"
            style={{
              transform: 'rotateX(82deg) translateZ(-80px)',
              transformOrigin: 'bottom center',
              background: 'linear-gradient(180deg, #0c0a08 0%, #1f1811 40%, #130f0a 100%)',
              boxShadow: 'inset 0 100px 100px #050505',
            }}
          >
            {/* Wooden Parquet / Herringbone Pattern Lines */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000_0,#000_20px,#3a2c1d_20px,#3a2c1d_22px)]" />
            {/* Floor Light Reflection of the spotlight & artwork */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-96 bg-[#c5a059]/15 blur-2xl rounded-full" />
          </div>

          {/* 3. CENTRAL FRAMED ARTWORK STANDING IN 3D SPACE */}
          <div
            ref={framedArtRef}
            className="relative z-20 w-72 sm:w-84 md:w-96 preserve-3d will-change-transform shadow-[0_35px_70px_rgba(0,0,0,0.9)]"
            style={{
              transform: 'translateZ(60px)',
            }}
          >
            {/* Gilded Museum Frame */}
            <div className="gallery-frame p-4 rounded-sm border-2 border-[#c5a059]/60 shadow-[0_0_50px_rgba(197,160,89,0.2)]">
              {/* Beveled Mat Board */}
              <div className="gallery-mat p-3">
                <div className="relative overflow-hidden bg-black">
                  <img
                    src={activeArt.image}
                    alt={activeArt.title}
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  {/* Subtle directional museum light sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Museum Brass Plaque */}
            <div className="mx-auto mt-4 px-4 py-1.5 w-fit rounded border border-[#c5a059]/50 bg-gradient-to-b from-[#3a2c1a] to-[#1a140d] text-center shadow-lg">
              <span className="font-cinzel text-[10px] tracking-widest text-[#e4c483] block">
                {activeArt.artist} ({activeArt.year})
              </span>
              <span className="font-serif italic text-[11px] text-[#f5f2eb]">
                {activeArt.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orbit Controls Bar (Bottom) */}
      <div className="relative z-30 pb-8 px-6 flex items-center justify-between pointer-events-auto max-w-4xl mx-auto w-full">
        {/* Left Drag Arrow */}
        <button
          onClick={panLeft}
          className="p-3 rounded-full border border-[#c5a059]/30 bg-[#121212]/80 hover:bg-[#c5a059] hover:text-[#0a0a0a] text-[#c5a059] transition-all shadow-lg flex items-center gap-2 group"
          title="Orbit Camera Left"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline font-cinzel text-[10px] tracking-widest uppercase">
            Pan Left
          </span>
        </button>

        {/* Orbit indicator text */}
        <div className="font-sans text-[11px] text-[#8a857e] tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
          <span>Drag or use arrows to orbit room &middot; Scroll to push in</span>
        </div>

        {/* Right Drag Arrow */}
        <button
          onClick={panRight}
          className="p-3 rounded-full border border-[#c5a059]/30 bg-[#121212]/80 hover:bg-[#c5a059] hover:text-[#0a0a0a] text-[#c5a059] transition-all shadow-lg flex items-center gap-2 group"
          title="Orbit Camera Right"
        >
          <span className="hidden sm:inline font-cinzel text-[10px] tracking-widest uppercase">
            Pan Right
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Detail Artwork Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#12100e] border border-[#c5a059]/40 p-6 md:p-10 rounded-sm shadow-2xl flex flex-col md:flex-row gap-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full border border-[#c5a059]/30 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 gallery-frame p-2">
              <img
                src={activeArt.image}
                alt={activeArt.title}
                className="w-full h-80 md:h-[450px] object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="font-cinzel text-xs text-[#c5a059] tracking-widest uppercase block mb-1">
                  Catalog {activeArt.catalogNo} &middot; Permanent Collection
                </span>
                <h4 className="font-serif text-3xl text-[#f5f2eb] mb-2">{activeArt.title}</h4>
                <p className="font-serif italic text-base text-[#c5a059] mb-4">
                  By {activeArt.artist} ({activeArt.year})
                </p>
                <div className="space-y-2 text-sm text-[#8a857e] font-sans font-light">
                  <p><strong>Medium:</strong> {activeArt.medium}</p>
                  <p><strong>Dimensions:</strong> {activeArt.dimensions}</p>
                  <p className="pt-2 text-[#b0aba3] leading-relaxed font-serif text-base italic">
                    {activeArt.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#c5a059] bg-[#c5a059] text-[#0a0a0a] font-cinzel text-xs tracking-widest uppercase hover:bg-transparent hover:text-[#c5a059] transition-colors"
                >
                  Return to Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
