import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowUpRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Plus,
  Star,
  Sparkles,
} from 'lucide-react'

interface ConciergePageProps {
  onOpenRequisition: (mandate?: string) => void
}

interface ConciergeCard {
  id: string
  badge: string
  title: string
  description: string
  image: string
  mandate: string
}

interface ModelItem {
  id: string
  name: string
  tag: string
  img: string
}

interface TestimonialItem {
  id: string
  name: string
  role: string
  img: string
  text: string
}

interface FaqItem {
  q: string
  a: string
}

const CONCIERGE_CARDS: ConciergeCard[] = [
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

// 9 Archival Models from Leeana Roster (Restored to exact clean format)
const MODELS_DATA: ModelItem[] = [
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
const TESTIMONIALS_DATA: TestimonialItem[] = [
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
const FAQ_DATA: FaqItem[] = [
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
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  // Automatic Center-Scrolling Models state
  const [currentModelIdx, setCurrentModelIdx] = useState(0)
  const [isModelsPaused, setIsModelsPaused] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const modelsScrollRef = useRef<HTMLDivElement>(null)

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
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cards = container.children
    if (cards[index]) {
      const card = cards[index] as HTMLElement
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
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

  // Centered Model Scrolling Function: Centers target card precisely in the middle
  const scrollToModel = (index: number) => {
    if (!modelsScrollRef.current) return
    const container = modelsScrollRef.current
    const cards = container.children
    if (cards[index]) {
      const card = cards[index] as HTMLElement
      const targetScroll = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2)
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      })
      setCurrentModelIdx(index)
    }
  }

  // Automatic scrolling for models section from the centre
  useEffect(() => {
    if (isModelsPaused) return
    const interval = setInterval(() => {
      setCurrentModelIdx((prev) => {
        const nextIdx = (prev + 1) % MODELS_DATA.length
        scrollToModel(nextIdx)
        return nextIdx
      })
    }, 3800)
    return () => clearInterval(interval)
  }, [isModelsPaused])

  // Center initial model on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToModel(0)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Track which card is in the center during user scroll/drag
  const handleModelsScroll = () => {
    if (!modelsScrollRef.current) return
    const container = modelsScrollRef.current
    const centerPoint = container.scrollLeft + container.clientWidth / 2
    const children = Array.from(container.children) as HTMLElement[]
    let closestIdx = 0
    let closestDist = Infinity

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const dist = Math.abs(centerPoint - childCenter)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = idx
      }
    })

    if (closestIdx !== currentModelIdx) {
      setCurrentModelIdx(closestIdx)
    }
  }

  const scrollModelsPrev = () => {
    const prevIdx = (currentModelIdx - 1 + MODELS_DATA.length) % MODELS_DATA.length
    scrollToModel(prevIdx)
  }

  const scrollModelsNext = () => {
    const nextIdx = (currentModelIdx + 1) % MODELS_DATA.length
    scrollToModel(nextIdx)
  }

  const handleWhatsApp = (mandate: string) => {
    const msg = `Hello Leeana Services Desk,\n\nI wish to register a Private Consultation regarding: ${mandate}.\n\nPlease connect me with the Private Desk.`
    window.open(`https://wa.me/918585906629?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-10 pb-28 md:pb-36 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto relative z-10 text-white space-y-24 md:space-y-36">
      
      {/* ========================================================= */}
      {/* 1. HERO & PRIVATE SERVICES ALLOCATIONS                    */}
      {/* ========================================================= */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md mb-3">
              <Sparkles className="w-3 h-3 text-white/70" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/70 font-light">
                Atelier Directory & Client Suite
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Private Services & Allocations
            </h1>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed mt-2">
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
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] transition-transform duration-1000 ease-out group-hover:scale-108 [transform:translate3d(0,0,0)]"
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
      {/* 2. OUR MODELS — FACES OF LEEANA (SCROLLS FROM THE CENTRE)  */}
      {/* ========================================================= */}
      <section id="our-models" className="border-t border-white/[0.08] pt-16 md:pt-24 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
              Archival Talent Roster
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Faces of Leeana · Our Models
            </h2>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-5">
            <span className="text-xs font-mono text-white/60 tracking-wider uppercase hidden sm:inline-block">
              Muse 0{currentModelIdx + 1} of 0{MODELS_DATA.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={scrollModelsPrev}
                aria-label="Previous model"
                className="apple-press w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollModelsNext}
                aria-label="Next model"
                className="apple-press w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Models Carousel Track — Centered Auto-Scrolling Without Side Deadspace */}
        <div
          className="pt-10 overflow-hidden"
          onMouseEnter={() => setIsModelsPaused(true)}
          onMouseLeave={() => setIsModelsPaused(false)}
        >
          <div
            ref={modelsScrollRef}
            onScroll={handleModelsScroll}
            className="flex gap-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {MODELS_DATA.map((model, idx) => {
              const isCenter = currentModelIdx === idx
              return (
                <article
                  key={model.id}
                  onClick={() => {
                    scrollToModel(idx)
                    onOpenRequisition(`Model Booking Request: ${model.name}`)
                  }}
                  className={`group relative min-w-[280px] sm:min-w-[340px] md:min-w-[360px] h-[480px] md:h-[540px] overflow-hidden rounded-[28px] border bg-[#09090c] transition-all duration-700 shrink-0 snap-center shadow-2xl cursor-pointer flex flex-col justify-end p-6 sm:p-8 ${
                    isCenter
                      ? 'border-white/40 ring-1 ring-white/25 scale-100 opacity-100'
                      : 'border-white/[0.1] hover:border-white/30 scale-[0.97] opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Pure High-Fashion Model Portrait */}
                  <img
                    src={model.img}
                    alt={model.name}
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-108 [transform:translate3d(0,0,0)]"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />

                  {/* Ambient Shadow Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Card Label & Action */}
                  <div className="relative z-10 space-y-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] tracking-widest text-white/90 uppercase font-light inline-block">
                      {model.tag}
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl text-white font-light tracking-tight">
                      {model.name}
                    </h3>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-white/60 font-light group-hover:text-white transition-colors">
                        Available for Soundstage & Editorial
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                </article>
              )
            })}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. TESTIMONIALS — VOICES OF OUR DISTINGUISHED CLIENTELE    */}
      {/* ========================================================= */}
      <section id="testimonials" className="border-t border-white/[0.08] pt-16 md:pt-24 scroll-mt-28">
        <div className="pb-10 border-b border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
            Patron Attestations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Voices of Our Distinguished Clientele
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed mt-2">
            Uncompromising accounts from jewelry founders, private estate directors, and luxury lifestyle curators.
          </p>
        </div>

        {/* 3 Editorial Testimonial Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="relative p-8 sm:p-10 rounded-[32px] border border-white/[0.1] bg-[#08080b] hover:border-white/25 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden group"
            >
              {/* Hairline highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="space-y-6">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-xl text-white/95 font-light italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Patron Bio with Authentic Photography Avatar */}
              <div className="pt-8 mt-6 border-t border-white/[0.08] flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                </div>
                <div>
                  <h4 className="font-display text-base text-white font-medium tracking-tight">
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
      {/* 4. FAQ — QUESTIONS, REFINED ANSWERS                      */}
      {/* ========================================================= */}
      <section id="faq" className="border-t border-white/[0.08] pt-16 md:pt-24 scroll-mt-28">
        <div className="pb-10 border-b border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
            Confidential Protocols
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Questions, Refined Answers
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed mt-2">
            Direct clarity regarding curation criteria, buyer confidentiality, international representation, and atelier partnerships.
          </p>
        </div>

        {/* Luxury Accordion Suite */}
        <div className="pt-10 max-w-4xl mx-auto space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIdx === idx
            return (
              <div
                key={idx}
                className={`rounded-[24px] sm:rounded-[28px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-white/35 bg-white/[0.04] shadow-2xl'
                    : 'border-white/[0.08] bg-[#07070a] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full py-6 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <h3 className="font-display text-base sm:text-lg md:text-xl font-light text-white tracking-tight leading-snug">
                    {faq.q}
                  </h3>
                  <div
                    className={`w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-white text-black border-white rotate-45' : 'text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed border-t border-white/[0.08] pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. DIRECT PRIORITY DESK SUITE                             */}
      {/* ========================================================= */}
      <section className="rounded-3xl border border-white/[0.12] bg-[#08080b] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Connect With A Dedicated Private Director
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl">
              Appointments confirmed within 4 business hours. Private soundstage viewings and acquisition consultations conducted in total confidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+919606199999"
              className="apple-press py-3.5 px-7 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold uppercase tracking-[0.14em] flex items-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+91 (0) 96061 99999</span>
            </a>

            <button
              onClick={() => onOpenRequisition('Private Appointment Desk')}
              className="apple-press py-3.5 px-6 rounded-full border border-white/20 bg-white/[0.04] text-white hover:border-white hover:bg-white/10 text-xs uppercase tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap backdrop-blur-md"
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
