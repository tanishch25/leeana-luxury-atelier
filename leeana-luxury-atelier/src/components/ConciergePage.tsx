import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowUpRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Star,
} from 'lucide-react'
import { InstagramReelsGrid } from './InstagramReelsGrid'

interface ConciergePageProps {
  onOpenRequisition: (mandate?: string) => void
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

// 9 Archival Models from Leeana Roster
export const MODELS_DATA: ModelItem[] = [
  { id: '01', name: 'Editorial Streetwear', tag: 'Lifestyle', img: '/assets/model-1.jpg' },
  { id: '02', name: 'Nightlife Luxe', tag: 'Automotive', img: '/assets/model-2.jpg' },
  { id: '03', name: 'Athleisure Portrait', tag: 'Fitness', img: '/assets/model-3.jpg' },
  { id: '04', name: 'Effortless Charm', tag: 'Portrait', img: '/assets/model-4.jpg' },
  { id: '05', name: 'Boutique Elegance', tag: 'Lifestyle', img: '/assets/model-5.jpg' },
  { id: '06', name: 'Midnight Power', tag: 'Editorial', img: '/assets/model-6.jpg' },
  { id: '07', name: 'Supercar Charisma', tag: 'Automotive', img: '/assets/model-7.jpg' },
  { id: '08', name: 'Urban Chic', tag: 'Portrait', img: '/assets/model-0107.jpg' },
  { id: '09', name: 'Heritage Elegance', tag: 'Portrait', img: '/assets/model-0106.jpg' },
]

// Real Testimonials from Leeana Distinguished Clientele
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '01',
    name: 'Anaya Mehra',
    role: "Founder, Maison d'Or",
    img: '/assets/testimonial-1-DkQAF5yQ.jpg',
    text: 'Leeana introduced our jewellery house to a clientele that truly understands craftsmanship. Their curation is impeccable.',
  },
  {
    id: '02',
    name: 'Rohan Kapoor',
    role: 'Director, Velluxe Estates',
    img: '/assets/testimonial-2-DGKqWevx.jpg',
    text: "Working with Leeana feels like a private members' club for premium brands. Refined, attentive, profoundly effective.",
  },
  {
    id: '03',
    name: 'Sara Pereira',
    role: 'Lifestyle Curator',
    img: '/assets/testimonial-3-m8_IuKUv.jpg',
    text: 'From the discovery experience to the after-care, Leeana sets a standard most luxury platforms only aspire to.',
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

export const ConciergePage: React.FC<ConciergePageProps> = ({ onOpenRequisition }) => {
  const [currentCardIdx, setCurrentCardIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
    const msg = `Hello Leeana Services Desk,\n\nI wish to register a Private Consultation regarding: ${mandate}.\n\nPlease connect me with the Private Desk.`
    window.open(`https://wa.me/918585906629?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-6 pb-20 md:pb-28 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto relative z-10 text-white space-y-12 md:space-y-16">
      
      {/* ========================================================= */}
      {/* 1. HERO & PRIVATE SERVICES ALLOCATIONS                    */}
      {/* ========================================================= */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Private Services & Allocations
            </h1>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Comprehensive luxury acquisitions, archival talent casting, client attestations, and direct advisory.
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
      {/* 2. OUR MODELS — FACES OF LEEANA (TIGHT PINTEREST ALIGNMENT)*/}
      {/* ========================================================= */}
      <section id="our-models" className="scroll-mt-32">
        {/* Creative Dashboard Frame with Tight, Refined Spacing */}
        <div className="rounded-[28px] sm:rounded-[32px] border border-white/[0.12] bg-[#07070b]/80 backdrop-blur-2xl p-4 sm:p-6 md:p-6 relative overflow-hidden shadow-2xl">
          {/* Subtle top hairline highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Dashboard Header Bar (Tightened padding, no dots, no small words above title) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="space-y-1">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                Faces of Leeana / Our Models
              </h2>
              <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
                Archival talent cast for soundstage cinema, haute couture campaigns, and luxury brand narratives.
              </p>
            </div>
            
            {/* Dashboard Telemetry Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-wider uppercase text-white/60 self-start md:self-auto">
              <span>09 Talents</span>
              <span className="text-white/20">/</span>
              <span className="text-white/80">Soundstage Casting</span>
            </div>
          </div>

          {/* Tight Pinterest-Style Board: Perfect 3-Column Low-End Baseline Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 pt-3.5">
            {MODELS_DATA.map((model) => {
              return (
                <article
                  key={model.id}
                  onClick={() => onOpenRequisition(`Model Booking Request: ${model.name}`)}
                  className="group relative w-full aspect-[3/4] overflow-hidden rounded-[18px] sm:rounded-[20px] border border-white/[0.12] bg-[#09090c] hover:border-white/40 transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-end hover:-translate-y-1"
                >
                  {/* Brighter High-Fashion Model Portrait */}
                  <img
                    src={model.img}
                    alt={model.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105 [transform:translate3d(0,0,0)]"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />

                  {/* Subtle bottom shadow vignette for contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Card Content: ONLY the title that is all (No arrow, no subtitle, no tag) */}
                  <div className="relative z-10 p-4 sm:p-5 pointer-events-auto">
                    <h3 className="font-display text-lg sm:text-xl text-white font-light tracking-tight leading-snug">
                      {model.name}
                    </h3>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. LIVE PRODUCTIONS — INSTAGRAM REELS SHOWCASE           */}
      {/* ========================================================= */}
      <InstagramReelsGrid />


      {/* ========================================================= */}
      {/* 4. REVIEWS — SEE WHAT OUR CLIENTS THINK                  */}
      {/* ========================================================= */}
      <section id="testimonials" className="border-t border-white/[0.08] pt-10 md:pt-14 scroll-mt-24">
        <div className="pb-6 border-b border-white/[0.08] space-y-1.5">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            See What Our Clients Think
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Uncompromising reflections from fine jewelry founders, luxury estate directors, and lifestyle curators who entrust their public presence to our atelier.
          </p>
        </div>

        {/* 3 Editorial Testimonial Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="relative p-6 sm:p-7 rounded-[24px] border border-white/[0.1] bg-[#08080b] hover:border-white/25 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden group"
            >
              {/* Hairline highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-base sm:text-lg text-white/95 font-light italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Patron Bio with Authentic Photography Avatar */}
              <div className="pt-6 mt-5 border-t border-white/[0.08] flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                </div>
                <div>
                  <h4 className="font-display text-sm text-white font-medium tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-xs text-white/50 font-light block mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. DIRECT PRIORITY DESK SUITE                             */}
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
              href="tel:+919606199999"
              className="apple-press py-3 px-6 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold uppercase tracking-[0.14em] flex items-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+91 (0) 96061 99999</span>
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
