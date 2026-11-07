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
    title: 'Fashion & Haute Couture Shoots',
    subtitle: 'Editorial Runways, Bridal Handlooms & Designer Silks',
    description:
      'High-fashion visual direction, master cinema motion, and chiaroscuro studio lighting capturing the elegance of designer sarees, lehengas, and couture silhouettes.',
    image: '/assets/spec_fashion_4k.jpg',
    deliverables: ['8K Cinema Campaign', 'Editorial Lookbooks', 'Color Grading Master'],
  },
  {
    id: 'jewellery',
    title: 'Haute Joaillerie & Solitaire Shoots',
    subtitle: 'Zero-Distortion Macro Optics & Diamond Facet Capture',
    description:
      'Dedicated optical rail benches capturing internal diamond scintillation, platinum luster, solitaire luminescence, and reflection control for fine jewellery maisons.',
    image: '/assets/spec_jewel_4k.jpg',
    deliverables: ['Macro Solitaire Video', 'Facet Sparkle Optics', 'High-Res Print Master'],
  },
  {
    id: 'culinary',
    title: 'Artisanal Gastronomy & Culinary Shoots',
    subtitle: 'Boutique Cafes, Fine Dining & Gourmet Confectionery',
    description:
      'High-production cinema direction capturing artisanal cafe atmospheres, fine dining gastronomy, sommelier cellars, and culinary artistry designed for viral retention.',
    image: '/assets/svc-cafe-DNXzNrQx.jpg',
    deliverables: ['Atmospheric Cafe Reels', 'Menu Gastronomy Stills', 'Sommelier Cellar Cinema'],
  },
  {
    id: 'commercial',
    title: 'Commercial Brand & Boutique Shoots',
    subtitle: 'High-Ticket Brand Campaigns & Luxury Retail Storefronts',
    description:
      'Holistic brand positioning and cinematic commercial films that elevate market authority, showcase luxury flagship storefronts, and establish commercial prestige.',
    image: '/assets/lookbook_clean_couture_suit.jpg',
    deliverables: ['Omnichannel TVC', 'Commercial Motion Cut', 'Flagship Showcase'],
  },
  {
    id: 'interiors',
    title: 'Living Spaces & Architectural Shoots',
    subtitle: 'Atmospheric Interior Aesthetics & Design Dialogue',
    description:
      'Volumetric walkthroughs and golden-hour ambient framing celebrating luxury architectural sanctuaries, designer spaces, and bespoke lifestyle environments.',
    image: '/assets/hero_vintage_estate_4k.jpg',
    deliverables: ['Cinematic Walkthrough', 'Architectural Stills', 'Atmospheric Lighting'],
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
      className="bg-black py-10 sm:py-16 md:py-32 text-white overflow-hidden relative z-20 border-b border-white/[0.06]"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1700px]">
        
        {/* Section Header with Dynamic Sequence Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 sm:mb-10 md:mb-16">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/50 block font-light">
              Leeana Fashion Concierge
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Premium and Luxury Brand Shoots
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-light max-w-xl leading-relaxed pt-1">
              We specialise in high premium and luxury brand shoots — crafting cinema films, macro joaillerie optical motion, and viral editorial narratives.
            </p>
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

        {/* Dual Column Layout with Tight Spacing on Mobile */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Switch with Smooth Dynamic Indicator (Desktop Only) */}
          <div className="hidden lg:block lg:w-5/12 relative z-20">
            <div className="flex flex-col gap-3">
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
          </div>

          {/* Right Column: Full-Bleed Cinema Card with Transparent Curtain Wipe from Top (Zero Wordings on Image, Single Explore Button) */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full lg:w-7/12 relative aspect-[16/10] min-h-[220px] sm:min-h-[420px] lg:h-[660px] rounded-[24px] sm:rounded-[40px] overflow-hidden border border-white/[0.12] bg-[#09090b] shadow-[0_40px_100px_rgba(0,0,0,0.85)] flex flex-col justify-end"
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
