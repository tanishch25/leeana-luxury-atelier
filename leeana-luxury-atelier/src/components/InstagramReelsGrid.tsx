import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ArrowUpRight, LayoutGrid, SlidersHorizontal, X } from 'lucide-react'

export interface ReelItem {
  id: string
  title: string
  videoSrc: string
  posterSrc: string
  instagramUrl: string
}

export const INSTAGRAM_REELS_DATA: ReelItem[] = [
  {
    id: '01',
    title: 'Cafe & Culinary Atmosphere',
    videoSrc: '/assets/reels/reel_1.mp4',
    posterSrc: '/assets/reels/reel_1_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/Dd4YGN6PsfU/',
  },
  {
    id: '02',
    title: 'Soundstage Lighting & BTS',
    videoSrc: '/assets/reels/reel_2.mp4',
    posterSrc: '/assets/reels/reel_2_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DdUMT0NvVPK/',
  },
  {
    id: '03',
    title: 'Editorial Haute Couture',
    videoSrc: '/assets/reels/reel_3.mp4',
    posterSrc: '/assets/reels/reel_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DdOtmW1yqrB/',
  },
  {
    id: '04',
    title: 'Architectural Sanctuaries',
    videoSrc: '/assets/reels/reel_4.mp4',
    posterSrc: '/assets/reels/reel_4_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/Dc6YGOnPQUy/',
  },
]

interface InstagramReelsGridProps {
  onOpenRequisition?: (mandate?: string) => void
}

export const InstagramReelsGrid: React.FC<InstagramReelsGridProps> = ({ onOpenRequisition }) => {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  const [reelsViewMode, setReelsViewMode] = useState<'grid' | 'pinterest'>('grid')
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null)
  const [modalUnmuted, setModalUnmuted] = useState(true)

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const sectionRef = useRef<HTMLElement | null>(null)

  // Sync mute state across video elements
  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const nextUnmuted = unmutedId === id ? null : id
    setUnmutedId(nextUnmuted)

    Object.entries(videoRefs.current).forEach(([vId, vEl]) => {
      if (vEl) {
        vEl.muted = vId !== nextUnmuted
      }
    })
  }

  // Pause videos when scrolled completely out of view for performance
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setUnmutedId(null)
            Object.values(videoRefs.current).forEach((vEl) => {
              if (vEl) {
                vEl.muted = true
              }
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="instagram-reels"
      className="scroll-mt-28"
    >
      {/* Creative Dashboard Frame */}
      <div className="rounded-[32px] sm:rounded-[36px] border border-white/[0.12] bg-[#07070b]/80 backdrop-blur-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
        {/* Subtle top hairline highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Dashboard Control Deck Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Live Productions · In Motion
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Soundstage captures, high-fashion motion choreography, and architectural cinematography streamed directly from our live Instagram reels vault.
            </p>
          </div>

          {/* Creative Dashboard Telemetry & Pinterest Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
              <button
                onClick={() => setReelsViewMode('grid')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  reelsViewMode === 'grid'
                    ? 'bg-white text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setReelsViewMode('pinterest')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  reelsViewMode === 'pinterest'
                    ? 'bg-white text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Pinterest</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-wider uppercase text-white/60">
              <span>04 Productions</span>
              <span className="text-white/20">/</span>
              <span className="text-white/80">Soundstage Feed</span>
            </div>

            <a
              href="https://www.instagram.com/leeana.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-press inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white hover:text-black hover:border-white text-xs font-semibold tracking-[0.14em] uppercase text-white transition-all backdrop-blur-md shadow-lg"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Follow @leeana.in</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Reel Display: Grid Deck vs Pinterest Board */}
        <div
          className={`pt-8 ${
            reelsViewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          }`}
        >
          {INSTAGRAM_REELS_DATA.map((reel, idx) => {
            const isUnmuted = unmutedId === reel.id
            // In Pinterest mode, alternate aspect ratios for masonry feel
            const aspectClass =
              reelsViewMode === 'pinterest'
                ? ['aspect-[9/16]', 'aspect-[4/5]', 'aspect-[9/16]', 'aspect-[3/4]'][idx % 4]
                : 'aspect-[9/16]'

            return (
              <div
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                className={`group relative rounded-[24px] overflow-hidden border border-white/[0.14] bg-[#0c0c10] shadow-2xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between ${aspectClass}`}
              >
                {/* Background Video — Brighter & High Definition */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el
                  }}
                  src={reel.videoSrc}
                  poster={reel.posterSrc}
                  loop
                  playsInline
                  autoPlay
                  muted
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gentle Scrim Just for Lower Legibility */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Top Corner: Discrete Audio Button (No text) */}
                <div className="relative z-10 p-4 flex justify-end pointer-events-auto">
                  <button
                    onClick={(e) => toggleMute(reel.id, e)}
                    aria-label={isUnmuted ? 'Mute Audio' : 'Unmute Audio'}
                    className={`apple-press w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer border ${
                      isUnmuted
                        ? 'bg-white text-black border-white shadow-lg'
                        : 'bg-black/60 text-white border-white/20 hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    {isUnmuted ? (
                      <Volume2 className="w-3.5 h-3.5" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Bottom Card Content: ONLY Title + Arrow (Nothing else written) */}
                <div className="relative z-10 p-6 flex items-end justify-between gap-3 pointer-events-auto">
                  <h3 className="font-display text-xl sm:text-2xl text-white font-light tracking-tight leading-snug">
                    {reel.title}
                  </h3>

                  <div className="w-9 h-9 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hairline highlight */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Pinterest Video Spotlight Modal on Card Click */}
      {selectedReel && (
        <div
          onClick={() => setSelectedReel(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row rounded-[32px] overflow-hidden border border-white/20 bg-[#09090d] shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedReel(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Video Frame */}
            <div className="relative md:w-3/5 h-[48vh] md:h-[75vh] bg-black flex items-center justify-center overflow-hidden">
              <video
                src={selectedReel.videoSrc}
                poster={selectedReel.posterSrc}
                loop
                playsInline
                autoPlay
                muted={!modalUnmuted}
                className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.04]"
              />

              {/* In-Modal Mute Button */}
              <button
                onClick={() => setModalUnmuted(!modalUnmuted)}
                className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                {modalUnmuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{modalUnmuted ? 'Sound On' : 'Muted'}</span>
              </button>
            </div>

            {/* Pinterest Info Panel */}
            <div className="md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#09090d]">
              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block">
                  Official Instagram Reel · Plate 0{selectedReel.id}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white font-light tracking-tight">
                  {selectedReel.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  Authentic soundstage media production produced for high-end hospitality, luxury automotive, and bespoke fashion.
                </p>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  href={selectedReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-press w-full py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl text-center"
                >
                  <span>Watch on Instagram</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {onOpenRequisition && (
                  <button
                    onClick={() => {
                      onOpenRequisition(`Production Inquiry: ${selectedReel.title}`)
                      setSelectedReel(null)
                    }}
                    className="apple-press w-full py-3.5 rounded-full border border-white/20 bg-white/[0.04] text-white hover:bg-white hover:text-black text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Inquire For Production
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
