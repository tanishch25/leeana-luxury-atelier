import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, ExternalLink } from 'lucide-react'

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
  const [progress, setProgress] = useState(0)

  const activeReview = TESTIMONIALS_DATA[activeIdx]

  // Dynamic progress timer for auto-advancing slides (6000ms duration)
  useEffect(() => {
    if (isPaused) return

    const stepMs = 50
    const totalMs = 6000
    const increment = (stepMs / totalMs) * 100

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % TESTIMONIALS_DATA.length)
          return 0
        }
        return prev + increment
      })
    }, stepMs)

    return () => clearInterval(interval)
  }, [isPaused, activeIdx])

  const handleSelect = (idx: number) => {
    setActiveIdx(idx)
    setProgress(0)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
    setProgress(0)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
    setProgress(0)
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="space-y-8"
    >
      {/* Header Deck: Title, Google Badge & Navigation Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#F5C042]/30 backdrop-blur-md">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#F5C042] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C042]" />
              Google Verified Reviews · 5.0 Rating
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            Voices of Our Patrons
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Direct reflections from commercial brand partners, luxury retail leaders, and jewellery curators who partner with Leeana Fashion Concierge.
          </p>
        </div>

        {/* Carousel Timeline Progress & Arrow Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1.5 hidden sm:flex">
            <span className="text-xs text-white/50 tracking-widest uppercase font-mono">
              Review 0{activeIdx + 1} / 0{TESTIMONIALS_DATA.length}
            </span>
            <div className="w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F5C042] to-white transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="apple-press w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="apple-press w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Patron Tabs (Clickable selector pills with active state indicator) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {TESTIMONIALS_DATA.map((item, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(idx)}
              className={`apple-press px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                isActive
                  ? 'bg-white text-black font-semibold border-white shadow-lg'
                  : 'bg-white/[0.03] text-white/60 hover:text-white border-white/10 hover:border-white/25'
              }`}
            >
              <span>{item.name}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C042]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Main Animated Spotlight Stage */}
      <div className="relative rounded-[28px] sm:rounded-[36px] border border-white/[0.14] bg-gradient-to-br from-[#100e14] via-[#09080c] to-black p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl transition-all duration-700">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-gradient-to-b from-[#d4af37]/15 via-[#c7b299]/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C042]/40 to-transparent" />

        {/* Large Decorative Watermark Quote */}
        <div className="absolute right-6 sm:right-12 top-6 sm:top-10 font-serif text-[100px] sm:text-[160px] md:text-[200px] text-white/[0.03] select-none pointer-events-none leading-none font-bold">
          “
        </div>

        <div className="relative z-10 space-y-6 sm:space-y-8 max-w-4xl">
          {/* Luminous Amber-Gold Stars Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 sm:w-5 h-4 sm:h-5 text-[#F5C042] fill-[#F5C042] filter drop-shadow-[0_0_8px_rgba(245,192,66,0.6)]"
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F5C042] font-semibold">
              5.0 Verified Patron Review
            </span>
          </div>

          {/* Animated Editorial Quote Body with Key Transition */}
          <blockquote
            key={activeReview.id}
            className="animate-in fade-in duration-500 font-display italic text-lg sm:text-2xl md:text-3xl text-white/95 font-light leading-relaxed tracking-tight"
          >
            "{activeReview.text}"
          </blockquote>

          {/* Patron Identification & Avatar Details */}
          <div
            key={`meta-${activeReview.id}`}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500 pt-6 border-t border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#F5C042]/50 shrink-0 shadow-xl ring-2 ring-[#F5C042]/20">
                <img
                  src={activeReview.img}
                  alt={activeReview.name}
                  className="w-full h-full object-cover filter brightness-[1.02]"
                />
              </div>
              <div>
                <h4 className="font-display text-lg sm:text-xl text-white font-medium tracking-tight">
                  {activeReview.name}
                </h4>
                <p className="text-xs sm:text-sm text-white/60 font-light mt-0.5">
                  {activeReview.role} · <span className="text-[#c7b299]">{activeReview.commission}</span>
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/search?q=leeana+fashion+concierge+bengaluru+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-press inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/30 text-xs tracking-wider uppercase font-light transition-all cursor-pointer backdrop-blur-md w-fit"
            >
              <span>View On Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/60" />
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Animated Marquee Rail (Continuous Fluid Motion, Clickable Cards, Hover Pause) */}
      <div className="pt-2 overflow-hidden relative">
        <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex gap-4 py-2">
          {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((item, idx) => {
            const isSelected = item.id === activeReview.id
            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => handleSelect(idx % TESTIMONIALS_DATA.length)}
                className={`w-[290px] sm:w-[340px] shrink-0 p-5 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#F5C042]/60 bg-white/[0.08] shadow-[0_10px_30px_rgba(245,192,66,0.15)] scale-[1.02]'
                    : 'border-white/[0.08] bg-[#07070a]/90 hover:border-white/30 hover:bg-white/[0.04]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-[#F5C042] fill-[#F5C042]"
                      />
                    ))}
                    <span className="text-[10px] text-[#F5C042] font-mono ml-1">5.0</span>
                  </div>
                  <p className="text-xs text-white/80 font-light italic line-clamp-3 leading-relaxed">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-3.5 mt-3 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F5C042]/40 shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-white font-medium truncate block">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-white/50 truncate block">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
