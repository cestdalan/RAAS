import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PinnedHeroTransition from './components/PinnedHeroTransition';
import ScatterToGridMosaic from './components/ScatterToGridMosaic';
import VirtualGalleryRoom3D from './components/VirtualGalleryRoom3D';
import WatermarkGalleryPhoto from './components/WatermarkGalleryPhoto';
import HorizontalArtworkRail from './components/HorizontalArtworkRail';
import CtaAndFooter from './components/CtaAndFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 8;

  // Initialize Lenis smooth scroll & synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Section scroll trackers to update Navbar dynamic counter ("01 / 08")
    const sectionIds = [
      'hero-section',
      'pinned-transition-section',
      'gallery-mosaic',
      'room-section',
      'watermark-photo-section',
      'rail-section',
      'cta-section',
    ];

    const triggers = sectionIds.map((id, index) => {
      const el = document.getElementById(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveSection(Math.min(index + 1, totalSections)),
        onEnterBack: () => setActiveSection(Math.min(index + 1, totalSections)),
      });
    }).filter(Boolean);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      triggers.forEach((t) => t && t.kill());
    };
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f2eb] font-sans selection:bg-[#c5a059] selection:text-[#0a0a0a]">
      {/* Preloader Counter 0 -> 100% */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Persistent Fixed Navbar with Section Counter */}
      <Navbar
        activeSection={activeSection}
        totalSections={totalSections}
      />

      {/* Main Experience Flow */}
      <main className="relative w-full">
        {/* Section 2: Hero Reveal */}
        <HeroSection isLoaded={isLoaded} />

        {/* Section 3: Pinned-title scroll transition */}
        <div id="pinned-transition-section">
          <PinnedHeroTransition />
        </div>

        {/* Section 4 & 5: Scattered-to-Grid Mosaic & Oversized Typographic Section */}
        <ScatterToGridMosaic />

        {/* Section 6: Virtual 3D Gallery Room */}
        <VirtualGalleryRoom3D />

        {/* Section 7 & 8: Watermark Typography & Full-Bleed Gallery Photo */}
        <WatermarkGalleryPhoto />

        {/* Section 9: Horizontal Artwork Rail */}
        <HorizontalArtworkRail />

        {/* Section 10: CTA + Footer */}
        <CtaAndFooter />
      </main>
    </div>
  );
}
