import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar({ activeSection = 1, totalSections = 8, onNavigate }) {
  const formatNum = (num) => (num < 10 ? `0${num}` : `${num}`);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#c5a059]/10 transition-colors duration-300">
      {/* Left: Text links */}
      <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.2em] uppercase font-sans font-light text-[#c5a059]/90">
        <button
          onClick={() => handleScrollTo('hero-section')}
          className="hover:text-[#f5f2eb] transition-colors relative group py-1"
        >
          <span>Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
        </button>
        <button
          onClick={() => handleScrollTo('gallery-mosaic')}
          className="hover:text-[#f5f2eb] transition-colors relative group py-1"
        >
          <span>Gallery</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
        </button>
        <button
          onClick={() => handleScrollTo('room-section')}
          className="hover:text-[#f5f2eb] transition-colors relative group py-1"
        >
          <span>3D Room</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
        </button>
        <button
          onClick={() => handleScrollTo('rail-section')}
          className="hover:text-[#f5f2eb] transition-colors relative group py-1"
        >
          <span>Collection</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
        </button>
      </nav>

      {/* Center: Monogram logo in circle flanked by numbers ("01 / 08") */}
      <div className="flex items-center gap-3 select-none mx-auto md:mx-0">
        {/* Active section number */}
        <span className="font-cinzel text-xs tracking-wider text-[#c5a059]/80 w-6 text-right tabular-nums">
          {formatNum(activeSection)}
        </span>

        {/* Center Circular Logo Mark */}
        <button
          onClick={() => handleScrollTo('hero-section')}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[#c5a059]/40 bg-[#121212]/90 hover:border-[#c5a059] transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.15)]"
          title="ART GALLERY (AG)"
        >
          <span className="font-cinzel text-xs font-semibold text-[#f5f2eb] group-hover:text-[#c5a059] transition-colors">
            A⊙G
          </span>
          <div className="absolute inset-0 rounded-full border border-[#c5a059]/20 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        </button>

        {/* Total sections count */}
        <span className="font-cinzel text-xs tracking-wider text-[#8a857e]/60 w-6 text-left tabular-nums">
          / {formatNum(totalSections)}
        </span>
      </div>

      {/* Right: Contact button + Icon */}
      <div className="flex items-center">
        <button
          onClick={() => handleScrollTo('cta-section')}
          className="group flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#c5a059]/40 bg-gradient-to-r from-[#171615] to-[#1a1714] hover:border-[#c5a059] hover:bg-[#c5a059] text-[#f5f2eb] hover:text-[#0a0a0a] transition-all duration-300 shadow-sm"
        >
          <span className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase">
            Contact
          </span>
          <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 group-hover:bg-[#0a0a0a]/20 flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </header>
  );
}
