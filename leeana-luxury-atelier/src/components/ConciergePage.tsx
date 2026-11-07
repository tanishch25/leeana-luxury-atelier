import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowUpRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Star,
  Sparkles,
  ArrowRight,
  Mail,
} from 'lucide-react'
import { InstagramReelsGrid } from './InstagramReelsGrid'

interface ConciergePageProps {
  onOpenRequisition: (mandate?: string) => void
  initialScrollTo?: string
}

export interface ConciergeCard {
  id: string
  badge: string
  title: string
  description: string
  image: string
  mandate: string
}

export interface ModelItem {
  id: string
  name: string
  tag: string
  img: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  img: string
  text: string
}

export interface FaqItem {
  q: string
  a: string
}

export const CONCIERGE_CARDS: ConciergeCard[] = [
  {
    id: 'fleet',
    badge: 'CONFIDENTIAL ALLOCATION',
    title: 'Exotic Hypercars',
    description: 'Direct European factory allocations and enclosed white-glove transport.',
    image: '/assets/hero_supercar_4k.jpg',
    mandate: 'Exotic Supercar Procurement',
  },
  {
    id: 'estates',
    badge: 'OFF-MARKET PORTFOLIO',
    title: 'Architectural Estates',
    description: 'Discreet buyer representation for iconic sky penthouses and villas.',
    image: '/assets/hero_estates_4k.jpg',
    mandate: 'Prime Architectural Estate Acquisition',
  },
  {
    id: 'jewellery',
    badge: 'CERTIFIED PROVENANCE',
    title: 'Rare Solitaires & Jewels',
    description: 'Certified D-Flawless diamond solitaires and unheated Colombian emeralds.',
    image: '/assets/hero_jewellery_4k.jpg',
    mandate: 'Haute Joaillerie & Solitaire Sourcing',
  },
  {
    id: 'cellars',
    badge: 'DIRECT DOMAINE',
    title: 'Allocated Vintages',
    description: 'Rare Grand Cru first-growth winery allocations and high horology.',
    image: '/assets/lookbook_clean_penthouse.jpg',
    mandate: 'Rare Vintage & Horology Allocation',
  },
  {
    id: 'aviation',
    badge: 'PRIVATE CHARTER',
    title: 'Private Aviation & Couture',
    description: 'Heavy jet global chartering paired with private salon couture viewings.',
    image: '/assets/lookbook_fashion_silk.jpg',
    mandate: 'Private Aviation & Couture Mandate',
  },
  {
    id: 'marine',
    badge: 'OFFSHORE FLEET',
    title: 'Superyacht Charters',
    description: 'Confidential Mediterranean and Dubai tri-deck yacht chartering.',
    image: '/assets/lookbook_clean_villa.jpg',
    mandate: 'Superyacht Charter & Acquisition',
  },
]

// Curated Talent Muses from Leeana Roster (Faces of Leeana)
export const MODELS_DATA: ModelItem[] = [
  { id: '01', name: 'Tara Sen', tag: 'Editorial Streetwear', img: '/assets/model-1.jpg' },
  { id: '02', name: 'Rhea Kapoor', tag: 'Nightlife Luxe', img: '/assets/model-2.jpg' },
  { id: '04', name: 'Kabir Verma', tag: 'Classic Portrait', img: '/assets/model-4.jpg' },
  { id: '05', name: 'Maya Singhania', tag: 'Boutique Elegance', img: '/assets/model-5.jpg' },
  { id: '07', name: 'Anya Roy', tag: 'Supercar Charisma', img: '/assets/model-7.jpg' },
  { id: '09', name: 'Ayesha Khan', tag: 'Heritage Elegance', img: '/assets/model-0106.jpg' },
]

// Real Client & Patron Reviews for Leeana Fashion Concierge
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '01',
    name: 'Shanjith',
    role: 'Commercial Brand Partner',
    img: '/assets/editorial-fashion-7.jpg',
    text: 'The visual direction and campaign production delivered by Leeana completely transformed our brand perception. Their team is exceptionally creative, punctual, and meticulous with every single frame.',
  },
  {
    id: '02',
    name: 'Shree Praveen',
    role: 'Luxury Retail & Enterprise Client',
    img: '/assets/editorial-fashion-5.jpg',
    text: 'Impeccable execution from pre-production to the final grade. The lighting, high-fashion styling, and soundstage setup in Bangalore are truly world-class. Highly recommended for premium brand shoots.',
  },
  {
    id: '03',
    name: 'Deepa',
    role: 'Haute Couture Patron',
    img: '/assets/testimonial-1-DkQAF5yQ.jpg',
    text: 'Working with Leeana was an extraordinary experience. The models brought effortless grace to our couture collection, and the 8K video reels generated unmatched engagement across our clientele.',
  },
  {
    id: '04',
    name: 'Summaya',
    role: 'Bridal & Fine Jewellery Curator',
    img: '/assets/testimonial-3-m8_IuKUv.jpg',
    text: 'Their macro optics and artistic sensitivity to bridal drapes and solitaires are unmatched. The entire team exudes luxury, calm professionalism, and a rare eye for perfection.',
  },
  {
    id: '05',
    name: 'Tulasi Devi',
    role: 'Distinguished Patron',
    img: '/assets/testimonial-2-DGKqWevx.jpg',
    text: 'Remarkable hospitality, discreet coordination, and top-tier production quality. Leeana is the definitive benchmark for luxury brand shoots and commercial campaigns.',
  },
]

// Official FAQ Content from Leeana
export const FAQ_DATA: FaqItem[] = [
  {
    q: 'What kind of brands does Leeana feature?',
    a: 'We curate premium and luxury brands across haute joaillerie, fashion couture, exotic fleet automotive, architectural real estate, private cellars, and soundstage media productions.',
  },
  {
    q: 'How do I become a Leeana partner?',
    a: 'Reach out via our confidential contact form. Our partnerships board reviews brand provenance, aesthetic alignment, and walks you through private onboarding.',
  },
  {
    q: 'Is there a membership for buyers?',
    a: 'Selected allocations and private soundstage previews are reserved exclusively for our verified private patrons. Inquire via the concierge desk to register credentials.',
  },
  {
    q: 'Do you operate internationally?',
    a: 'Yes. While headquartered in Bengaluru, we facilitate global luxury experiences, European hypercar factory allocations, and cross-border patron connections.',
  },
  {
    q: 'How is quality assured?',
    a: 'Every partner and production undergoes our strict curation audit — provenance, craftsmanship, optical calibration, and private reputation are thoroughly vetted.',
  },
]

export const ConciergePage: React.FC<ConciergePageProps> = ({ onOpenRequisition, initialScrollTo }) => {
  const [currentCardIdx, setCurrentCardIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialScrollTo) {
      setTimeout(() => {
        const target = document.getElementById(initialScrollTo)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }, [initialScrollTo])

  // Auto-advance rolling concierge cards when idle
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      const nextIdx = (currentCardIdx + 1) % CONCIERGE_CARDS.length
      scrollToCard(nextIdx)
    }, 6000)
    return () => clearInterval(interval)
  }, [currentCardIdx, isPaused])

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth * 0.75
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      })
      setCurrentCardIdx(index)
    }
  }

  const handlePrev = () => {
    const nextIdx = (currentCardIdx - 1 + CONCIERGE_CARDS.length) % CONCIERGE_CARDS.length
    scrollToCard(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = (currentCardIdx + 1) % CONCIERGE_CARDS.length
    scrollToCard(nextIdx)
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft
    const cardWidth = container.clientWidth * 0.75
    const newIdx = Math.round(scrollLeft / cardWidth)
    if (newIdx >= 0 && newIdx < CONCIERGE_CARDS.length && newIdx !== currentCardIdx) {
      setCurrentCardIdx(newIdx)
    }
  }

  const handleWhatsApp = (mandate: string) => {
    const msg = `Hello Leeana Concierge Desk,\n\nI wish to register a Private Consultation regarding: ${mandate}.\n\nPlease connect me with the Private Desk.`
    window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 pb-20 md:pb-28 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto relative z-10 text-white space-y-12 md:space-y-16">
      
      {/* ========================================================= */}
      {/* 1. WHAT WE DO — BESPOKE PRODUCTIONS & CONCIERGE           */}
      {/* ========================================================= */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              What We Do · Productions & Concierge
            </h1>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Curated luxury brand film productions, archival talent casting, haute joaillerie direction, and confidential advisory.
            </p>
          </div>

          {/* Rolling Track Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/50 tracking-wider uppercase font-light hidden sm:inline-block">
              Plate 0{currentCardIdx + 1} of 0{CONCIERGE_CARDS.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous plate"
                className="apple-press w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next plate"
                className="apple-press w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Rolling Reel */}
        <div
          className="pt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {CONCIERGE_CARDS.map((card, idx) => {
              const isActive = currentCardIdx === idx
              return (
                <div
                  key={card.id}
                  className={`group relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/[0.12] bg-black shrink-0 snap-start transition-all duration-700 shadow-2xl ${
                    isActive ? 'border-white/40 ring-1 ring-white/20' : 'hover:border-white/25'
                  } w-[88vw] sm:w-[680px] md:w-[760px] lg:w-[820px] h-[400px] sm:h-[440px] md:h-[460px] flex flex-col justify-end p-6 sm:p-10 md:p-12`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-108 [transform:translate3d(0,0,0)]"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <div className="relative z-10 space-y-3 max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 block font-light">
                      {card.badge}
                    </span>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {card.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenRequisition(card.mandate)}
                        className="apple-press py-3 px-6 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                      >
                        <span>Inquire Now</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleWhatsApp(card.mandate)}
                        className="apple-press py-3 px-5 rounded-full border border-white/25 bg-black/50 hover:bg-white/10 text-white text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Desk</span>
                      </button>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Rolling Progress Indicators */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {CONCIERGE_CARDS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentCardIdx === idx ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Jump to plate 0${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. LIVE PRODUCTIONS — INSTAGRAM REELS SHOWCASE           */}
      {/* ========================================================= */}
      <InstagramReelsGrid />


      {/* ========================================================= */}
      {/* 3. OUR MODELS — FACES OF LEEANA (RESTORED WITH NAMES)      */}
      {/* ========================================================= */}
      <section id="our-models" className="border-t border-white/[0.08] pt-12 md:pt-16 scroll-mt-28">
        <div className="rounded-[28px] sm:rounded-[32px] border border-white/[0.12] bg-[#07070b]/90 backdrop-blur-2xl p-5 sm:p-7 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="pb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 block font-light">
                Talent Roster · Editorial Muses
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                Faces of Leeana
              </h2>
              <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
                Archival and campaign talent cast for luxury brand shoots, high couture lookbooks, and cinematic commercials.
              </p>
            </div>

            <a
              href="#opportunities"
              className="apple-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] text-xs font-light tracking-[0.16em] uppercase text-white hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-md w-fit"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join As A Model</span>
            </a>
          </div>

          {/* Pinterest-Style Model Grid: 2 Columns Mobile, 3 Columns Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 pt-6">
            {MODELS_DATA.map((model) => (
              <article
                key={model.id}
                onClick={() => onOpenRequisition(`Model Booking Request: ${model.name} (${model.tag})`)}
                className="group relative w-full aspect-[3/4] overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/[0.12] bg-[#060609] hover:border-white/45 transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-end hover:-translate-y-1.5"
              >
                <img
                  src={model.img}
                  alt={model.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-106 [transform:translate3d(0,0,0)]"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/45 via-35% to-transparent pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,5,8,0.65)] pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* Card Content with Model Name and Tag */}
                <div className="relative z-10 p-3.5 sm:p-5 pointer-events-auto space-y-1">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/60 font-light block">
                    {model.tag}
                  </span>
                  <h3 className="font-display text-sm sm:text-lg md:text-xl text-white font-medium tracking-tight leading-snug">
                    {model.name}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. REVIEWS — SEE WHAT OUR CLIENTS THINK (REAL REVIEWS)    */}
      {/* ========================================================= */}
      <section id="testimonials" className="border-t border-white/[0.08] pt-12 md:pt-16 scroll-mt-24">
        <div className="pb-6 border-b border-white/[0.08] space-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 block font-light">
            Verified Testimonials · Google & Atelier Patrons
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            See What Our Clients Think
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Direct reflections from commercial brand partners, luxury retail leaders, and couture curators who collaborate with Leeana Fashion Concierge.
          </p>
        </div>

        {/* 5 Real Client Reviews Grid with Luminous Amber-Gold Stars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className={`relative p-6 sm:p-7 rounded-[26px] border border-white/[0.1] bg-[#08080b]/95 hover:border-white/30 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden group ${
                idx === 3 || idx === 4 ? 'lg:col-span-1 md:col-span-1' : ''
              }`}
            >
              {/* Hairline highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="space-y-4">
                {/* 5-Star Rating in Luminous Amber-Gold */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#F5C042] fill-[#F5C042] filter drop-shadow-[0_0_6px_rgba(245,192,66,0.6)]"
                    />
                  ))}
                  <span className="ml-2 text-[10px] text-[#F5C042] tracking-wider uppercase font-medium">
                    5.0 Verified
                  </span>
                </div>

                {/* Authentic Review Text */}
                <p className="font-serif text-sm sm:text-base text-white/90 font-light italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Patron Bio with Portrait Avatar */}
              <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#F5C042]/30 shrink-0 shadow-lg ring-1 ring-[#F5C042]/20">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.98]"
                  />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base text-white font-medium tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-white/50 font-light block mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. OPPORTUNITIES & CAREERS — JOIN THE LEEANA ROSTER       */}
      {/* ========================================================= */}
      <section id="opportunities" className="border-t border-white/[0.08] pt-12 md:pt-16 scroll-mt-28">
        <div className="rounded-[30px] sm:rounded-[36px] border border-white/[0.14] bg-gradient-to-b from-[#0b0b12] to-[#060609] p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-white/[0.04] blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white font-medium">
                Careers & Open Casting Call
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.05]">
                Opportunities · Join the Faces of Leeana
              </h2>
              <p className="text-white/75 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl">
                We are actively scouting emerging and professional models, runway muses, fashion stylists, and creative visionaries to join the prestigious Leeana talent network. Headline premier brand shoots, haute joaillerie films, and couture campaigns.
              </p>
            </div>

            {/* Opportunity Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <h3 className="font-display text-sm sm:text-base text-white font-medium mb-1">
                  Commercial & Runway
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Headline campaigns for top luxury labels, designer bridal ateliers, and international commercial brands.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <h3 className="font-display text-sm sm:text-base text-white font-medium mb-1">
                  Bangalore Soundstage
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Direct work with state-of-the-art RED 8K cinema optics, specialized macro lighting, and expert stylists.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <h3 className="font-display text-sm sm:text-base text-white font-medium mb-1">
                  Open Representation
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Flexible agency representation, competitive commission rates, and direct portfolio placement across luxury media.
                </p>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onOpenRequisition('Model Roster Application: New Talent Casting')}
                className="apple-press px-8 sm:px-9 py-4 rounded-full bg-white hover:bg-white/90 text-black text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2.5 shadow-xl cursor-pointer"
              >
                <span>Apply To Join Roster</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919916101011?text=Hello%20Leeana%20Casting%20Desk,%20I%20am%20interested%20in%20joining%20the%20Leeana%20model%20roster.%20Please%20share%20casting%20guidelines."
                target="_blank"
                rel="noopener noreferrer"
                className="apple-press px-7 sm:px-8 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-xs sm:text-sm uppercase tracking-[0.14em] text-white transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Casting Desk</span>
              </a>

              <a
                href="mailto:info@leeana.in?subject=Model%20Casting%20Application%20-%20Leeana%20Roster&body=Hello%20Leeana%20Casting%20Desk,%0A%0AName:%20%0APhone:%20%0AInstagram/Portfolio:%20%0AHeight/Experience:%20"
                className="apple-press px-6 py-4 rounded-full border border-white/15 text-xs sm:text-sm uppercase tracking-[0.14em] text-white/70 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email Portfolio</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. DIRECT PRIORITY DESK SUITE                             */}
      {/* ========================================================= */}
      <section className="rounded-[28px] border border-white/[0.12] bg-[#08080b] p-6 sm:p-9 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Connect With A Dedicated Private Director
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl">
              Appointments confirmed within 4 business hours. Private soundstage viewings and acquisition consultations conducted in total confidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="tel:+919916101011"
              className="apple-press py-3 px-6 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold uppercase tracking-[0.14em] flex items-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+91 99161 01011</span>
            </a>

            <button
              onClick={() => onOpenRequisition('Private Appointment Desk')}
              className="apple-press py-3 px-5 rounded-full border border-white/20 bg-white/[0.04] text-white hover:border-white hover:bg-white/10 text-xs uppercase tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap backdrop-blur-md"
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
