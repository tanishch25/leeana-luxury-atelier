import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react'

export interface TestimonialItem {
  id: string
  name: string
  role: string
  img: string
  text: string
  commission: string
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '01',
    name: 'Shanjith',
    role: 'Commercial Brand Partner',
    img: '/assets/editorial-fashion-7.jpg',
    text: 'The visual direction and campaign production delivered by Leeana completely transformed our brand perception. Their team is exceptionally creative, punctual, and meticulous with every single frame.',
    commission: 'Brand Campaign Production',
  },
  {
    id: '02',
    name: 'Shree Praveen',
    role: 'Luxury Retail & Enterprise Client',
    img: '/assets/editorial-fashion-5.jpg',
    text: 'Impeccable execution from pre-production to the final grade. The lighting, high-fashion styling, and soundstage setup in Bangalore are truly world-class. Highly recommended for premium brand shoots.',
    commission: 'Enterprise Soundstage Direction',
  },
  {
    id: '03',
    name: 'Deepa',
    role: 'Haute Couture Patron',
    img: '/assets/testimonial-1-DkQAF5yQ.jpg',
    text: 'Working with Leeana was an extraordinary experience. The models brought effortless grace to our couture collection, and the 8K video reels generated unmatched engagement across our clientele.',
    commission: 'Couture Lookbook & Reels',
  },
  {
    id: '04',
    name: 'Summaya',
    role: 'Bridal & Fine Jewellery Curator',
    img: '/assets/testimonial-3-m8_IuKUv.jpg',
    text: 'Their macro optics and artistic sensitivity to bridal drapes and solitaires are unmatched. The entire team exudes luxury, calm professionalism, and a rare eye for perfection.',
    commission: 'Haute Joaillerie Macro Shoot',
  },
  {
    id: '05',
    name: 'Tulasi Devi',
    role: 'Distinguished Patron',
    img: '/assets/testimonial-2-DGKqWevx.jpg',
    text: 'Remarkable hospitality, discreet coordination, and top-tier production quality. Leeana is the definitive benchmark for luxury brand shoots and commercial campaigns.',
    commission: 'Private Soundstage Commission',
  },
]

export const ReviewsShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const activeReview = TESTIMONIALS_DATA[activeIdx]

  // Calm auto-advance timer (5.5 seconds)
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      handleNext()
    }, 5500)

    return () => clearInterval(timer)
  }, [isPaused, activeIdx])

  const transitionTo = (newIdx: number) => {
    setIsFading(true)
    setTimeout(() => {
      setActiveIdx(newIdx)
      setIsFading(false)
    }, 220)
  }

  const handlePrev = () => {
    const prev = (activeIdx - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length
    transitionTo(prev)
  }

  const handleNext = () => {
    const next = (activeIdx + 1) % TESTIMONIALS_DATA.length
    transitionTo(next)
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="space-y-6"
    >
      {/* Header Deck: Clean Title & Calm Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 block font-light">
            Patron Reflections · Bengaluru & Global
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            Voices of Our Patrons
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Direct reflections from commercial brand partners, luxury retail leaders, and jewellery curators who partner with Leeana Fashion Concierge.
          </p>
        </div>

        {/* Carousel Progress Indicators & Arrow Buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => transitionTo(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-[2px] transition-all duration-400 rounded-full cursor-pointer ${
                  idx === activeIdx ? 'w-7 bg-white' : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="apple-press w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="apple-press w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Review Card (Subtle, Clean Monochrome Luxury — Zero Gold Enclosure) */}
      <div className="relative rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#08080b] p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl">
        {/* Subtle Hairline Top Edge & Soft Radial Ambient Texture */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/[0.02] blur-[80px] pointer-events-none" />

        {/* Large Decorative Minimalist Watermark */}
        <div className="absolute right-6 sm:right-10 top-6 sm:top-8 font-serif text-[90px] sm:text-[140px] md:text-[180px] text-white/[0.02] select-none pointer-events-none leading-none font-bold">
          “
        </div>

        <div className="relative z-10 space-y-6 sm:space-y-8 max-w-4xl">
          {/* Subtle Star Rating with Warm Champagne Accent */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#e0cfbe] fill-[#e0cfbe]"
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/60 font-light font-mono">
              5.0 Patron Review
            </span>
          </div>

          {/* Calm Crossfade Editorial Quote */}
          <blockquote
            className={`font-display italic text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-relaxed tracking-tight transition-all duration-300 ${
              isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            "{activeReview.text}"
          </blockquote>

          {/* Patron Identification & Avatar Details */}
          <div
            className={`pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-white/20 bg-white/[0.05] shrink-0 shadow-lg">
                <img
                  src={activeReview.img}
                  alt={activeReview.name}
                  className="w-full h-full object-cover filter brightness-[1.02]"
                />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg text-white font-medium tracking-tight">
                  {activeReview.name}
                </h4>
                <p className="text-xs text-white/50 font-light mt-0.5">
                  {activeReview.role} · <span className="text-white/70">{activeReview.commission}</span>
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/search?q=leeana+fashion+concierge+bengaluru+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-press inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/30 text-xs tracking-wider uppercase font-light transition-all cursor-pointer backdrop-blur-md w-fit"
            >
              <span>View On Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/50" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
