import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';

export default function CtaAndFooter() {
  const [inquirySent, setInquirySent] = useState(false);
  const [email, setEmail] = useState('');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setInquirySent(true);
      setTimeout(() => setInquirySent(false), 5000);
      setEmail('');
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="cta-section" className="relative w-full bg-[#070707] text-[#f5f2eb] overflow-hidden pt-24 pb-12 select-none border-t border-white/5">
      {/* SECTION 10: FULL-WIDTH PILL BUTTON WITH FLOATING SOFT GLOWING GOLD ORB */}
      <div className="relative max-w-5xl mx-auto px-6 mb-28 flex flex-col items-center justify-center">
        {/* Soft glowing gold orb peeking from behind (blurred radial-gradient blob) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[480px] h-32 md:h-48 rounded-full bg-gradient-to-r from-[#935a28] via-[#c5a059] to-[#e4c483] blur-[60px] opacity-75 animate-glow-orb pointer-events-none z-0" />

        {/* Pill-shaped button wrapper */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="font-cinzel text-xs text-[#c5a059] tracking-[0.3em] uppercase mb-4">
            Private Acquisitions &middot; Curatorial Access
          </div>

          <a
            href="mailto:inquire@artgallery.com"
            className="group relative w-full sm:w-4/5 md:w-3/4 py-6 md:py-8 px-8 md:px-14 rounded-full border border-[#c5a059]/50 bg-[#0e0d0b]/80 backdrop-blur-md hover:bg-[#c5a059] hover:border-[#c5a059] text-center transition-all duration-500 shadow-2xl flex items-center justify-between"
          >
            {/* Left label */}
            <span className="font-cinzel text-xs tracking-widest text-[#c5a059] group-hover:text-[#0a0a0a] transition-colors uppercase">
              Schedule Viewing
            </span>

            {/* Centered Large Headline in Pill */}
            <span className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#f5f2eb] group-hover:text-[#0a0a0a] transition-colors">
              <span className="font-normal">Get in</span>{' '}
              <span className="font-serif italic">Touch</span>
            </span>

            {/* Right arrow in gilded circle */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c5a059]/40 group-hover:border-[#0a0a0a] bg-[#1a1714] group-hover:bg-[#0a0a0a] flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-[#c5a059] group-hover:text-[#f5f2eb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Quick Newsletter / Private Collector Dispatch */}
          <form
            onSubmit={handleInquirySubmit}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter collector email for private previews..."
              className="w-full px-5 py-2.5 rounded-full bg-[#141210] border border-[#c5a059]/20 text-xs font-sans text-[#f5f2eb] placeholder-[#8a857e]/60 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full border border-[#c5a059]/40 bg-[#1a1714] hover:bg-[#c5a059] hover:text-[#0a0a0a] text-xs font-cinzel tracking-wider uppercase transition-all shrink-0"
            >
              Inquire
            </button>
          </form>

          {inquirySent && (
            <div className="mt-3 flex items-center gap-2 text-xs text-[#c5a059] font-sans">
              <CheckCircle2 className="w-4 h-4" />
              <span>Inquiry received. A curatorial associate will contact you privately.</span>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top footer row: Navigation links & Gallery information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/5 text-sm">
          {/* Col 1: Monogram & Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full border border-[#c5a059]/40 flex items-center justify-center font-cinzel text-xs text-[#c5a059]">
                A⊙G
              </span>
              <span className="font-cinzel text-sm tracking-widest text-[#f5f2eb]">
                ART GALLERY (AG)
              </span>
            </div>
            <p className="font-sans text-xs text-[#8a857e] font-light leading-relaxed">
              Preserving historical masterworks, chiaroscuro antiquities, and modern gilding traditions.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8a857e]">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>18 Place Vendôme, 75001 Paris</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="font-cinzel text-xs tracking-widest text-[#c5a059] uppercase">
              Navigation
            </div>
            <ul className="space-y-2 font-sans text-xs text-[#8a857e]">
              <li>
                <a href="#hero-section" className="hover:text-[#f5f2eb] transition-colors">
                  Home &middot; Welcome
                </a>
              </li>
              <li>
                <a href="#gallery-mosaic" className="hover:text-[#f5f2eb] transition-colors">
                  Gallery &middot; Impressions
                </a>
              </li>
              <li>
                <a href="#room-section" className="hover:text-[#f5f2eb] transition-colors">
                  Virtual 3D Room
                </a>
              </li>
              <li>
                <a href="#rail-section" className="hover:text-[#f5f2eb] transition-colors">
                  Reflection Of Art
                </a>
              </li>
              <li>
                <a href="#cta-section" className="hover:text-[#f5f2eb] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Visiting Hours */}
          <div className="space-y-3">
            <div className="font-cinzel text-xs tracking-widest text-[#c5a059] uppercase">
              Gallery Hours
            </div>
            <div className="space-y-1 font-sans text-xs text-[#8a857e]">
              <p>Tuesday &mdash; Saturday: 10:00 &ndash; 19:00</p>
              <p>Sunday: 11:00 &ndash; 17:00</p>
              <p>Monday: Private Collector Viewings</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8a857e] pt-2">
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>+33 1 42 68 00 24</span>
            </div>
          </div>

          {/* Col 4: Back to top */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c5a059]/30 text-xs font-cinzel text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0a0a0a] transition-all"
            >
              <span>Return to Top &uarr;</span>
            </button>
            <div className="text-left md:text-right text-[11px] text-[#8a857e]/60 font-sans mt-6 md:mt-0">
              Edition MMXXVI &middot; No. 12/25
            </div>
          </div>
        </div>

        {/* OVERSIZED "ART GALLERY" WORDMARK */}
        <div className="pt-12 pb-6 text-center select-none overflow-hidden">
          <h2 className="text-[12vw] font-serif font-extralight tracking-widest text-[#f5f2eb]/10 hover:text-[#c5a059]/20 transition-colors duration-700 leading-none">
            ART GALLERY
          </h2>
        </div>

        {/* Tagline, Copyright Line, Credit Line */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8a857e]">
          {/* Tagline */}
          <div className="font-serif italic text-sm text-[#c5a059]">
            &ldquo;The Essence of Heritage in Art&rdquo;
          </div>

          {/* Copyright line */}
          <div className="text-center font-light">
            &copy; 2015&ndash;2026 ART GALLERY (AG) Foundation. All rights reserved.
          </div>

          {/* Credit line */}
          <div className="font-cinzel text-[10px] tracking-wider text-[#8a857e]/70">
            Design & Curation &middot; Master Collection
          </div>
        </div>
      </div>
    </footer>
  );
}
