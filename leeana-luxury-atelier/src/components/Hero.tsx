import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onOpenConsultation: () => void
}

interface HeroSlide {
  id: string
  tag: string
  title: string
  subtitle: string
  videoSrc?: string
  poster: string
  ctaText: string
}

const SLIDES: HeroSlide[] = [
  {
    id: '01',
    tag: 'Fashion Cinema & Bridal Silks',
    title: 'Visual Direction That Defines Luxury',
    subtitle: 'Cinema campaigns celebrating Indian heritage handlooms, bridal couture drapes, and high-fashion narratives.',
    videoSrc: '/assets/shotsquare-hero-reel.mp4',
    poster: '/assets/hero_couture_4k.jpg',
    ctaText: 'Explore Atelier',
  },
  {
    id: '02',
    tag: 'Haute Joaillerie Optical Stage',
    title: 'Macro Optical Mastery For Fine Solitaires',
    subtitle: 'Zero chromatic distortion macro capture revealing the luminescence of diamonds, rare emeralds, and platinum.',
    poster: '/assets/hero_jewel_steady_4k.jpg',
    ctaText: 'Commission Shoot',
  },
  {
    id: '03',
    tag: 'Private Fleet Concierge',
    title: 'Exotic Marques & Performance Supercars',
    subtitle: 'Direct allocation pipelines and white-glove doorstep delivery for the world’s most sought-after hypercars.',
    poster: '/assets/hero_supercar_steady_4k.jpg',
    ctaText: 'Acquisition Desk',
  },
  {
    id: '04',
    tag: 'Monolithic Estates',
    title: 'Architectural Sanctuaries & Sky Penthouses',
    subtitle: 'Discreet developer allocations and private viewings for prime architectural monoliths and luxury sanctuaries.',
    poster: '/assets/hero_estates_steady_4k.jpg',
    ctaText: 'Private Viewings',
  },
]

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [currentIdx, setCurrentIdx] = useState(0)

  // Auto advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const handleSwitchSlide = (idx: number) => {
    setCurrentIdx(idx)
  }

  const current = SLIDES[currentIdx]

  return (
    <section className="pt-26 pb-10 px-3 sm:px-6 md:px-8 max-w-[1620px] mx-auto relative z-10">
      
      {/* Shotsquare Cinema Viewport (Elevated Scale for Opera & Wide Screens) */}
      <div className="relative w-full h-[90svh] md:h-[95vh] min-h-[680px] md:min-h-[760px] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-black select-none shadow-2xl border border-white/[0.12] [transform:translateZ(0)]">
        
        {/* Pre-mounted Slides with Hardware-Accelerated Opacity Crossfade (Guaranteed Zero Shaking / Zero Remounting) */}
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out [transform:translate3d(0,0,0)] [backface-visibility:hidden] ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Master Visual Poster */}
              <img
                src={slide.poster}
                alt={slide.title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />

              {/* Looping Cinema Video Layer (Only on Stable First Reel) */}
              {slide.videoSrc && (
                <video
                  src={slide.videoSrc}
                  poster={slide.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
                />
              )}

              {/* Top Gradient for Navbar legibility */}
              <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
              
              {/* Bottom Gradient for Typography Legibility */}
              <div className="absolute inset-x-0 bottom-0 h-[65vh] bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none" />
            </div>
          )
        })}

        {/* Content Anchored at Bottom Left and Right */}
        <div className="relative z-20 flex flex-col justify-end w-full h-full pt-20 px-6 pb-8 sm:px-10 sm:pb-12 md:px-16 md:pb-16 lg:px-20 lg:pb-16 pointer-events-none">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            
            {/* Left Column: All-White Architectural Typography */}
            <div className="flex flex-col max-w-5xl space-y-5">
              {/* Monumental Headline (All-White, Modern Architecture) */}
              <h1 className="text-white text-[clamp(2.8rem,5.8vw,5.6rem)] font-light tracking-[-0.03em] leading-[1.0] md:leading-[0.92] drop-shadow-2xl">
                {current.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-white/80 font-light max-w-2xl leading-relaxed hidden sm:block">
                {current.subtitle}
              </p>

            </div>

            {/* Right Column: All-White Interactive Buttons & Indicators */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-6 pointer-events-auto">
              
              {/* CTA Button */}
              <button
                onClick={onOpenConsultation}
                className="apple-press group flex items-center justify-between gap-4 py-4.5 px-9 border border-white/20 rounded-full bg-white/10 hover:bg-white hover:text-black backdrop-blur-xl transition-all duration-300 text-white shadow-2xl cursor-pointer"
              >
                <span className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em]">
                  {current.ctaText}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Slide Selector Indicators */}
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSwitchSlide(idx)}
                    className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                      currentIdx === idx
                        ? 'bg-white text-black font-semibold shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
