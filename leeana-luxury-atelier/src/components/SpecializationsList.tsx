import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface SpecializationsListProps {
  onSelectSpecialization: (title: string) => void
}

interface SpecItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  deliverables: string[]
}

const SPECIALIZATIONS: SpecItem[] = [
  {
    id: 'fashion',
    title: 'Fashion & Couture',
    subtitle: 'Editorial Runways & Heritage Handlooms',
    description:
      'High-fashion editorial direction, dramatic tactile lighting, and cinema motion for couture drapes and modern silhouettes.',
    image: '/assets/spec_fashion_4k.jpg',
    deliverables: ['8K RED Cinema Reel', 'Medium Format Stills', 'Campaign Grade'],
  },
  {
    id: 'jewellery',
    title: 'Haute Joaillerie',
    subtitle: 'Zero Distortion Macro Diamond Optics',
    description:
      'Custom optical rail benches capturing internal stone faceting, platinum luster, and multi-carat solitaire brilliance.',
    image: '/assets/spec_jewel_4k.jpg',
    deliverables: ['Macro Facet Capture', 'Refraction Control', 'Global Retail Assets'],
  },
  {
    id: 'supercars',
    title: 'Exotic Automotive',
    subtitle: 'Direct Hypercar Allocation & Studio Motion',
    description:
      'European factory allocation pipelines for Ferrari, Lamborghini, and Rolls-Royce alongside dynamic soundstage tracking.',
    image: '/assets/lookbook_clean_lamborghini.jpg',
    deliverables: ['Factory Verification', 'White-Glove Delivery', 'High-Speed Tracking'],
  },
  {
    id: 'estates',
    title: 'Prime Estates',
    subtitle: 'Architectural Monoliths & Sky Penthouses',
    description:
      'Discreet buyer representation and volumetric cinematography for Bengaluru cantilever villas and sky penthouses.',
    image: '/assets/hero_estates_steady_4k.jpg',
    deliverables: ['Twilight Walkthrough', 'Buyer Anonymity', 'Private Dossier'],
  },
  {
    id: 'commercial',
    title: 'Commercial Brands',
    subtitle: 'High-Ticket Brand Films & Visual Direction',
    description:
      'Visual positioning and television campaigns that command prestige, establish authority, and dominate markets.',
    image: '/assets/lookbook_clean_villa.jpg',
    deliverables: ['Omnichannel Direction', 'Television Commercials', 'Master Audio Mix'],
  },
  {
    id: 'concierge',
    title: 'Private Cellars',
    subtitle: 'Bespoke Lifestyle & Rare Vintage Allocations',
    description:
      'Direct winery allocations of Grand Cru Bordeaux, Patek Philippe horology allocations, and private vault viewings.',
    image: '/assets/lookbook_clean_penthouse.jpg',
    deliverables: ['Direct Domaine Access', 'Vault Storage', 'Sommelier Audit'],
  },
]

export const SpecializationsList: React.FC<SpecializationsListProps> = ({ onSelectSpecialization }) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return
    setPrevIdx(activeIdx)
    setActiveIdx(idx)
  }

  // Dynamic Auto-Advance Timer (Cycles smoothly when idle, pauses on user interaction)
  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        setPrevIdx(prev)
        return (prev + 1) % SPECIALIZATIONS.length
      })
    }, 4200)

    return () => clearInterval(timer)
  }, [isHovered])

  return (
    <section
      id="specializations"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black py-20 md:py-32 text-white overflow-hidden relative z-20 border-b border-white/[0.06]"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1700px]">
        
        {/* Section Header with Dynamic Sequence Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
              Core Disciplines
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Specializations
            </h2>
          </div>

          {/* Dynamic Sequence Counter (e.g. 01 / 06) */}
          <div className="flex items-center gap-3 text-xs tracking-widest text-white/50 select-none">
            <span className="font-mono text-white text-sm">
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
              <div
                key={activeIdx}
                className="absolute inset-0 bg-white origin-left animate-[pulse_4.2s_ease-in-out_infinite]"
              />
            </div>
            <span className="font-mono text-white/40">
              {String(SPECIALIZATIONS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Dual Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Switch with Smooth Dynamic Indicator */}
          <div className="w-full lg:w-5/12 relative z-20">
            <div className="hidden lg:flex flex-col gap-3">
              {SPECIALIZATIONS.map((spec, idx) => {
                const isActive = activeIdx === idx
                return (
                  <div
                    key={spec.id}
                    onMouseEnter={() => {
                      handleSelect(idx)
                      setIsHovered(true)
                    }}
                    onClick={() => handleSelect(idx)}
                    className="cursor-pointer text-left group relative w-full block pl-7 py-3 transition-colors duration-300"
                  >
                    {/* Clean Left Edge Indicator Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`w-full h-full bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? 'opacity-100 shadow-[0_0_16px_rgba(255,255,255,0.9)] scale-y-100'
                            : 'opacity-0 scale-y-0'
                        }`}
                      />
                    </div>

                    {/* Text Title with Smooth Micro-Glide */}
                    <h3
                      className={`text-[clamp(2.2rem,3.2vw,3.6rem)] font-light leading-[1.05] tracking-tight uppercase transition-all duration-500 select-none ${
                        isActive
                          ? 'text-white translate-x-1.5'
                          : 'text-white/30 group-hover:text-white/75 translate-x-0'
                      }`}
                    >
                      {spec.title}
                    </h3>
                  </div>
                )
              })}
            </div>

            {/* Mobile Snap List */}
            <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-3 pb-4 w-full hide-scrollbar">
              {SPECIALIZATIONS.map((spec, idx) => {
                const isActive = activeIdx === idx
                return (
                  <button
                    key={spec.id}
                    onClick={() => handleSelect(idx)}
                    className={`snap-start shrink-0 px-6 py-3 rounded-full border text-xs tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-lg'
                        : 'bg-white/[0.04] border-white/10 text-white/50'
                    }`}
                  >
                    {spec.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Full-Bleed Cinema Card with Transparent Curtain Wipe from Top (Zero Wordings on Image, Single Explore Button) */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full lg:w-7/12 relative aspect-[16/11] sm:aspect-[16/10] min-h-[280px] sm:min-h-[420px] lg:h-[660px] rounded-[24px] sm:rounded-[40px] overflow-hidden border border-white/[0.12] bg-[#09090b] shadow-[0_40px_100px_rgba(0,0,0,0.85)] flex flex-col justify-end"
          >
            
            {/* Underneath Layer: Previous Image (Ensures seamless zero-flicker transition) */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
              <img
                src={SPECIALIZATIONS[prevIdx].image}
                alt="Previous Specialization"
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
            </div>

            {/* Active Incoming Layer: Dynamic Vertical Wipe Reveal from Top */}
            <div
              key={`active-${activeIdx}`}
              className="absolute inset-0 w-full h-full z-10 animate-wipe-reveal pointer-events-none select-none overflow-hidden"
            >
              <img
                src={SPECIALIZATIONS[activeIdx].image}
                alt={SPECIALIZATIONS[activeIdx].title}
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
            </div>

            {/* Slick Transparent Top-Swipe Veil (Comes down from up and transitions smoothly) */}
            <div
              key={`curtain-${activeIdx}`}
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none"
            >
              <div className="w-full h-full animate-glass-swipe bg-gradient-to-b from-transparent via-white/[0.14] to-white/[0.28] backdrop-blur-[6px] border-b-2 border-white/80 shadow-[0_16px_50px_rgba(255,255,255,0.4)]" />
            </div>

            {/* Single Action Button: "Explore ↗" (Absolutely Zero Wordings/Text Over The Image) */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30">
              <button
                onClick={() => onSelectSpecialization(SPECIALIZATIONS[activeIdx].title)}
                className="apple-press group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] transition-all shadow-[0_16px_50px_rgba(0,0,0,0.85)] cursor-pointer"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
