import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

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

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=leeana+fashion+concierge+bengaluru+reviews'

const STACK_AVATARS = [
  { src: '/assets/testimonial-1-DkQAF5yQ.jpg', alt: 'Deepa' },
  { src: '/assets/testimonial-3-m8_IuKUv.jpg', alt: 'Summaya' },
  { src: '/assets/testimonial-2-DGKqWevx.jpg', alt: 'Tulasi Devi' },
]

export const ReviewsShowcase: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const triggerStep = (step: number, dir: 'next' | 'prev') => {
    if (phase !== 'idle') return
    if (prefersReducedMotion) {
      setDirection(dir)
      setStartIndex((prev) => (prev + step + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
      return
    }
    setDirection(dir)
    setPhase('out')
    window.setTimeout(() => {
      setStartIndex((prev) => (prev + step + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
      setPhase('in')
      window.setTimeout(() => setPhase('idle'), 260)
    }, 140)
  }

  const handlePrev = () => triggerStep(-1, 'prev')
  const handleNext = () => triggerStep(1, 'next')

  const visibleReviews = [0, 1, 2].map(
    (offset) => TESTIMONIALS_DATA[(startIndex + offset) % TESTIMONIALS_DATA.length]
  )

  const getMotionStyle = (cardOrder: number): React.CSSProperties => {
    if (prefersReducedMotion) {
      return {
        transitionProperty: 'opacity',
        transitionDuration: '200ms',
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        opacity: phase === 'out' ? 0.35 : 1,
      }
    }

    const offsetPx = direction === 'next' ? 16 : -16
    const delayMs = phase === 'in' ? cardOrder * 36 : 0

    if (phase === 'out') {
      return {
        opacity: 0,
        transform: `translate3d(${-offsetPx}px, 0, 0)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '140ms',
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'opacity, transform',
      }
    }

    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transitionProperty: 'opacity, transform',
      transitionDuration: '260ms',
      transitionDelay: `${delayMs}ms`,
      transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      willChange: 'opacity, transform',
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      {/* Row 1: Editorial Intro (Left) + First Two Review Bento Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
        {/* Left Header Block */}
        <div className="lg:col-span-4 flex flex-col justify-between py-2 lg:pr-4">
          <div className="space-y-5">
            <h2 className="font-couture text-4xl sm:text-5xl lg:text-[3.35rem] leading-[1.03] tracking-[-0.03em] text-white">
              What Our Patrons Say
            </h2>
            <p className="text-[15px] text-white/60 leading-relaxed max-w-xs font-sans">
              Genuine feedback from fashion houses, fine jewellery curators, and commercial partners who trust our studio.
            </p>
          </div>

          {/* Avatar Stack + Monochrome Count Badge + Direct Google Link */}
          <div className="pt-8 lg:pt-10 flex flex-col items-start gap-4">
            <div className="flex items-center">
              {STACK_AVATARS.map((avatar, idx) => (
                <div
                  key={avatar.alt}
                  className={`w-11 h-11 rounded-full overflow-hidden border-2 border-[#030303] bg-[#0b0b0f] ${
                    idx > 0 ? '-ml-3' : ''
                  }`}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
              <div
                aria-label="Over 18 verified patron reviews"
                className="-ml-3 w-11 h-11 rounded-full bg-white text-black border-2 border-[#030303] flex items-center justify-center text-[13px] font-semibold tabular-nums tracking-tight select-none"
              >
                18+
              </div>
            </div>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13.5px] text-white/75 hover:text-white transition-colors duration-200 border-b border-white/15 hover:border-white/50 pb-0.5 apple-press"
            >
              <span>Read verified reviews on Google</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/55 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Review Card 1 */}
        <ReviewCard item={visibleReviews[0]} style={getMotionStyle(0)} className="lg:col-span-4" />

        {/* Review Card 2 */}
        <ReviewCard item={visibleReviews[1]} style={getMotionStyle(1)} className="lg:col-span-4" />
      </div>

      {/* Row 2: Offset Review Card 3 + Editorial Portrait Tile + Circular Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-center mt-6 lg:mt-7">
        {/* Staggered Third Card */}
        <ReviewCard
          item={visibleReviews[2]}
          style={getMotionStyle(2)}
          className="lg:col-start-3 lg:col-span-4 h-full"
        />

        {/* Editorial Shoot Visual Tile */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-[24px] bg-[#09090d] border border-white/[0.1] aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[300px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />
          <img
            src="/assets/reviews-feature-shoot.jpg"
            alt="Leeana Bengaluru luxury editorial session"
            className="w-full h-full object-cover object-[center_22%] contrast-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        {/* Circular Prev / Next Controls */}
        <div className="lg:col-span-2 flex items-center justify-start lg:justify-center gap-3.5 py-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous patron reviews"
            className="w-12 h-12 rounded-full border border-white/[0.16] bg-white/[0.03] text-white/70 flex items-center justify-center hover:border-white/40 hover:bg-white/[0.09] hover:text-white transition-[background-color,border-color,color,transform] duration-200 apple-press cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next patron reviews"
            className="w-12 h-12 rounded-full border border-white/85 bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-[background-color,transform] duration-200 apple-press cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface ReviewCardProps {
  item: TestimonialItem
  style?: React.CSSProperties
  className?: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({ item, style, className = '' }) => (
  <article
    style={style}
    className={`relative rounded-[24px] bg-[#09090d]/95 backdrop-blur-md border border-white/[0.1] p-7 sm:p-8 flex flex-col justify-between min-h-[285px] lg:min-h-[300px] shadow-[0_24px_60px_rgba(0,0,0,0.65)] ${className}`}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

    <div className="space-y-4">
      <div aria-hidden="true" className="font-editorial font-bold text-4xl leading-[0.8] text-white/40 select-none pt-1">
        “
      </div>
      <p className="text-[14.5px] sm:text-[15px] text-white/85 leading-[1.68] font-sans">
        {item.text}
      </p>
    </div>

    <div className="pt-6 mt-6 border-t border-white/[0.07] flex items-center gap-3.5">
      <div className="w-11 h-11 rounded-full overflow-hidden border border-white/15 bg-black shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="min-w-0">
        <div className="text-[15px] font-medium text-white tracking-[-0.01em] truncate">
          {item.name}
        </div>
        <div className="text-[12.5px] text-white/50 tabular-nums mt-0.5">
          5.0 / 5
        </div>
      </div>
    </div>
  </article>
)
