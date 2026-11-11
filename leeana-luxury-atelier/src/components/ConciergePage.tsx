import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowUpRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  Mail,
} from 'lucide-react'
import { InstagramReelsGrid } from './InstagramReelsGrid'
import { ReviewsShowcase, TESTIMONIALS_DATA, type TestimonialItem } from './ReviewsShowcase'

export { TESTIMONIALS_DATA, type TestimonialItem }

interface ConciergePageProps {
  onOpenRequisition: (mandate?: string) => void
  initialScrollTo?: string
  onNavigateToOpportunities?: () => void
}

export interface ConciergeCard {
  id: string
  title: string
  description: string
  protocol: string
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
    title: 'Exotic Hypercars',
    description: 'Direct European factory build allocations, discreet collector brokerage, and enclosed climate-controlled transport coordinated door-to-door across India and Europe.',
    protocol: 'Enclosed Trans-Continental Logistics',
    image: '/assets/hero_supercar_4k.jpg',
    mandate: 'Exotic Supercar Procurement',
  },
  {
    id: 'estates',
    title: 'Architectural Estates',
    description: 'Private buyer representation for trophy penthouses, coastal sanctuaries, and heritage villas with off-market due diligence and bespoke interior architecture.',
    protocol: 'Off-Market Buyer Advisory',
    image: '/assets/hero_estates_4k.jpg',
    mandate: 'Prime Architectural Estate Acquisition',
  },
  {
    id: 'jewellery',
    title: 'Rare Solitaires & Jewels',
    description: 'Traceable GIA D-Flawless solitaires, unheated Colombian emeralds, and heirloom bridal commissions sourced directly from vault cutters for private viewings.',
    protocol: 'Certified Vault Provenance',
    image: '/assets/hero_jewellery_4k.jpg',
    mandate: 'Haute Joaillerie & Solitaire Sourcing',
  },
  {
    id: 'cellars',
    title: 'Allocated Vintages',
    description: 'Ex-chateau Grand Cru first-growth cellar acquisitions, private sommelier tastings, and rare mechanical horology pieces arranged through bonded European merchants.',
    protocol: 'Bonded Cellar & Vault Sourcing',
    image: '/assets/real_lookbook/wine_real.jpg',
    mandate: 'Rare Vintage & Horology Allocation',
  },
  {
    id: 'aviation',
    title: 'Private Aviation & Couture',
    description: 'On-demand long-range heavy jet chartering synchronized with closed-door runway salon appointments and private atelier trunk showings.',
    protocol: 'Wing-To-Salon Ground Coordination',
    image: '/assets/real_lookbook/jet_real.jpg',
    mandate: 'Private Aviation & Couture Mandate',
  },
  {
    id: 'marine',
    title: 'Superyacht Charters',
    description: 'Confidential Mediterranean, Adriatic, and Indian Ocean tri-deck yacht charters staffed with full private galley, security, and tender crews.',
    protocol: 'Dedicated Maritime Charter Desk',
    image: '/assets/real_lookbook/yacht_real.jpg',
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

export const ConciergePage: React.FC<ConciergePageProps> = ({
  onOpenRequisition,
  initialScrollTo,
  onNavigateToOpportunities,
}) => {
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
    const container = scrollContainerRef.current
    if (!container) return
    const targetCard = container.children[index] as HTMLElement | undefined
    const targetLeft = targetCard ? targetCard.offsetLeft : 0
    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    })
    setCurrentCardIdx(index)
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
    const container = scrollContainerRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    let closestIdx = 0
    let minDist = Infinity
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i] as HTMLElement
      const dist = Math.abs(child.offsetLeft - scrollLeft)
      if (dist < minDist) {
        minDist = dist
        closestIdx = i
      }
    }
    if (closestIdx >= 0 && closestIdx < CONCIERGE_CARDS.length && closestIdx !== currentCardIdx) {
      setCurrentCardIdx(closestIdx)
    }
  }

  const handleWhatsApp = (mandate: string) => {
    const msg = `Hello Leeana Concierge Desk,\n\nI wish to register a Private Consultation regarding: ${mandate}.\n\nPlease connect me with the Private Desk.`
    window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-28 sm:pt-36 pb-20 md:pb-28 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto relative z-10 text-white space-y-14 md:space-y-20">
      
      {/* ========================================================= */}
      {/* 1. PRIVATE LUXURY CONCIERGE (EDITORIAL SPLIT CAROUSEL)    */}
      {/* ========================================================= */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <h1 className="font-couture text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.03] tracking-[-0.03em] text-white">
              Private Luxury Concierge
            </h1>
            <p className="text-[15px] sm:text-[16px] text-white/65 font-sans leading-[1.7] max-w-xl">
              Direct luxury acquisitions, private heavy-jet charters, archival couture viewings, and brand productions orchestrated discreetly from our Indiranagar desk.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous service"
              className="apple-press w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.14] text-white hover:bg-white hover:text-black hover:border-white transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
              className="apple-press w-11 h-11 rounded-full bg-white text-black border border-white hover:bg-neutral-200 transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Split Sliding Deck */}
        <div
          className="pt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="relative flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {CONCIERGE_CARDS.map((card, idx) => {
              const isActive = currentCardIdx === idx
              return (
                <article
                  key={card.id}
                  className={`group relative rounded-[24px] overflow-hidden border bg-[#08080b] shrink-0 snap-start transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_28px_80px_rgba(0,0,0,0.8)] ${
                    isActive ? 'border-white/30' : 'border-white/[0.1] hover:border-white/25'
                  } w-[88vw] sm:w-[680px] md:w-[820px] lg:w-[900px] grid grid-cols-1 md:grid-cols-12 items-stretch`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />

                  {/* Left Photograph Frame */}
                  <div className="md:col-span-6 relative h-[230px] sm:h-[260px] md:h-[420px] overflow-hidden bg-black">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center contrast-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#08080b]/70 via-transparent to-transparent" />
                  </div>

                  {/* Right Structured Copy & Direct Actions */}
                  <div className="md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <h2 className="font-couture text-2xl sm:text-3xl lg:text-[2.15rem] text-white tracking-[-0.025em] leading-[1.08]">
                        {card.title}
                      </h2>

                      <p className="text-[14.5px] sm:text-[15px] text-white/70 font-sans leading-[1.7]">
                        {card.description}
                      </p>
                    </div>

                    <div className="space-y-5 pt-5 border-t border-white/[0.08]">
                      <div>
                        <div className="text-[13px] font-medium text-white">Service Scope</div>
                        <div className="text-[13.5px] text-white/55 mt-0.5 font-sans">{card.protocol}</div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onOpenRequisition(card.mandate)}
                          className="apple-press inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-black hover:bg-neutral-200 text-[13px] font-medium transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                        >
                          <span>Inquire Now</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleWhatsApp(card.mandate)}
                          className="apple-press inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-white/[0.14] bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/30 text-white text-[13px] font-medium transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Desk</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Hairline Architectural Progress Bars */}
          <div className="flex items-center justify-center gap-2.5 pt-3">
            {CONCIERGE_CARDS.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToCard(idx)}
                className={`h-[2px] cursor-pointer transition-[background-color,width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  currentCardIdx === idx ? 'w-14 bg-white' : 'w-7 bg-white/20 hover:bg-white/45'
                }`}
                aria-label={`Select ${card.title}`}
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

            <button
              onClick={onNavigateToOpportunities}
              className="apple-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] text-xs font-light tracking-[0.16em] uppercase text-white hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-md w-fit"
            >
              <span>Join As A Model</span>
            </button>
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
      {/* 4. DYNAMIC ANIMATED REVIEWS — VOICES OF OUR PATRONS        */}
      {/* ========================================================= */}
      <section id="testimonials" className="border-t border-white/[0.08] pt-12 md:pt-16 scroll-mt-24">
        <ReviewsShowcase />
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
