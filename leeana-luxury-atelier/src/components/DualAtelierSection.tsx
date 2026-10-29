import React, { useState } from 'react'
import { ArrowUpRight, Camera, Gem, Sparkles, Car, Building2, ShieldCheck, Film, Award } from 'lucide-react'

export const DualAtelierSection: React.FC<{ onSelectPillar: (pillar: string) => void }> = ({ onSelectPillar }) => {
  const [hoveredPanel, setHoveredPanel] = useState<'atelier' | 'concierge' | null>('atelier')

  return (
    <section id="atelier" className="py-28 px-4 sm:px-8 md:px-14 max-w-[1520px] mx-auto relative z-10 border-t border-white/[0.07]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14">
        <div>
          <span className="text-[11px] font-light tracking-[0.25em] text-[#c7b299] uppercase block mb-3">
            // ARCHITECTURAL DISCIPLINES
          </span>
          <h2 className="font-couture text-4xl sm:text-6xl tracking-tight text-[#f4f0ea]">
            Two Disciplines. <br />
            <span className="font-editorial italic font-normal text-[#c7b299]">
              One Uncompromising Standard.
            </span>
          </h2>
        </div>
        <p className="text-[#969188] text-sm max-w-md font-light leading-relaxed">
          From capturing the luminescence of fine diamond solitaires under calibrated cinema anamorphic glass to securing private allocations for rare performance marques and architectural estates.
        </p>
      </div>

      {/* Grand Dual Portals: Interactive Expanding Panels */}
      <div className="grid lg:grid-cols-12 gap-6 min-h-[640px]">
        
        {/* PANEL 01: The Visual Atelier (Bangalore Soundstage) */}
        <div
          onMouseEnter={() => setHoveredPanel('atelier')}
          className={`relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[#07070a] flex flex-col justify-between p-8 sm:p-12 transition-all duration-700 ease-out cursor-pointer group ${
            hoveredPanel === 'atelier'
              ? 'lg:col-span-7 border-[#c7b299]/50 shadow-2xl shadow-black/80'
              : 'lg:col-span-5 border-white/[0.08] opacity-85 hover:opacity-100'
          }`}
          onClick={() => onSelectPillar('Visual Atelier Commission')}
        >
          {/* Full-Bleed High-Fashion Imagery Background */}
          <img
            src="/assets/svc-jewellery-BcB-GXPd.jpg"
            alt="Bangalore Visual Atelier"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.45] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/40 to-black/30" />

          {/* Top Panel Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7b299]" />
              <span className="text-[10px] font-mono tracking-widest text-[#c7b299] uppercase">
                DIVISION 01 // SOUNDSTAGE ATELIER
              </span>
            </div>
            <span className="text-xs font-mono text-white/40">JP NAGAR, BLR</span>
          </div>

          {/* Center / Bottom Content */}
          <div className="relative z-10 space-y-6 pt-32">
            
            <div className="space-y-3">
              <h3 className="font-couture text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Cinematic Campaign Production For Jewellery & Couture
              </h3>
              <p className="text-sm text-[#d1ccc3]/80 font-light leading-relaxed max-w-xl">
                Equipped with specialized anamorphic glass, macro optical benches, and master gaffers, our Bangalore atelier designs visual narratives that elevate prestige luxury houses across India and internationally.
              </p>
            </div>

            {/* Technical Bench Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-2 text-[#c7b299]">
                  <Gem className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wider uppercase text-white/60 font-mono">BENCH 01</span>
                </div>
                <h4 className="font-editorial text-sm text-white">Macro Optics</h4>
                <p className="text-[11px] text-[#969188] font-light">Zero-distortion solitary diamond faceting.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-2 text-[#c7b299]">
                  <Film className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wider uppercase text-white/60 font-mono">CINEMA 02</span>
                </div>
                <h4 className="font-editorial text-sm text-white">Fashion Films</h4>
                <p className="text-[11px] text-[#969188] font-light">4K bridal silks & heritage handlooms.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-2 text-[#c7b299]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wider uppercase text-white/60 font-mono">SUITE 03</span>
                </div>
                <h4 className="font-editorial text-sm text-white">Color Mastering</h4>
                <p className="text-[11px] text-[#969188] font-light">DaVinci Resolve HDR cinema grade.</p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
              <span className="apple-press inline-flex items-center gap-2 text-xs font-light tracking-[0.18em] uppercase text-[#c7b299] group-hover:text-white transition-colors">
                <span>Commission Campaign Shoot</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-mono text-white/40 uppercase">
                4K / 8K RAW DELIVERABLES
              </span>
            </div>

          </div>
        </div>

        {/* PANEL 02: The Luxury Concierge (White-Glove Private Acquisitions) */}
        <div
          onMouseEnter={() => setHoveredPanel('concierge')}
          className={`relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[#07070a] flex flex-col justify-between p-8 sm:p-12 transition-all duration-700 ease-out cursor-pointer group ${
            hoveredPanel === 'concierge'
              ? 'lg:col-span-7 border-[#c7b299]/50 shadow-2xl shadow-black/80'
              : 'lg:col-span-5 border-white/[0.08] opacity-85 hover:opacity-100'
          }`}
          onClick={() => onSelectPillar('Private Concierge Sourcing')}
        >
          {/* Full-Bleed Exotic Supercar & Monolith Imagery */}
          <img
            src="/assets/svc-cars-BFdPfwO2.jpg"
            alt="Private Luxury Concierge"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.45] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/40 to-black/30" />

          {/* Top Panel Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7b299]" />
              <span className="text-[10px] font-mono tracking-widest text-[#c7b299] uppercase">
                DIVISION 02 // WHITE-GLOVE CONCIERGE
              </span>
            </div>
            <span className="text-xs font-mono text-white/40">INDIA & GLOBAL</span>
          </div>

          {/* Center / Bottom Content */}
          <div className="relative z-10 space-y-6 pt-32">
            
            <div className="space-y-3">
              <h3 className="font-couture text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Private Curation of Rare Marques, Estates & Collectibles
              </h3>
              <p className="text-sm text-[#d1ccc3]/80 font-light leading-relaxed max-w-xl">
                We connect discerning patrons and collectors with vetted luxury houses across India and internationally, securing allocations that never appear on public markets.
              </p>
            </div>

            {/* Technical Concierge Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-2 text-[#c7b299]">
                  <Car className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wider uppercase text-white/60 font-mono">AUTOMOTIVE</span>
                </div>
                <h4 className="font-editorial text-sm text-white">Rare Marques</h4>
                <p className="text-[11px] text-[#969188] font-light">Doorstep supercar handover.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-2 text-[#c7b299]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wider uppercase text-white/60 font-mono">ESTATES</span>
                </div>
                <h4 className="font-editorial text-sm text-white">Monolith Homes</h4>
                <p className="text-[11px] text-[#969188] font-light">Private viewings of sanctuaries.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-2 text-[#c7b299]">
                  <Award className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wider uppercase text-white/60 font-mono">CELLARS</span>
                </div>
                <h4 className="font-editorial text-sm text-white">Fine Vintages</h4>
                <p className="text-[11px] text-[#969188] font-light">Verified single malts & cellars.</p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
              <span className="apple-press inline-flex items-center gap-2 text-xs font-light tracking-[0.18em] uppercase text-[#c7b299] group-hover:text-white transition-colors">
                <span>Engage Private Concierge</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-mono text-white/40 uppercase">
                STRICT DISCRETION & NDA
              </span>
            </div>

          </div>
        </div>

      </div>

    </section>
  )
}
