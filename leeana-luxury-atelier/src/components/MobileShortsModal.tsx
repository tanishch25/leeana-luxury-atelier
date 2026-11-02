import React, { useState, useRef, useEffect, useCallback } from 'react'
import { X, Volume2, VolumeX, ArrowUpRight, Share2, Sparkles, ChevronUp } from 'lucide-react'

export interface ReelShortItem {
  id: string
  title: string
  subtitle: string
  videoSrc: string
  posterSrc: string
  instagramUrl: string
  category: string
  duration: string
}

export const SHORTS_REELS_DATA: ReelShortItem[] = [
  {
    id: '01',
    title: 'Editorial Haute Couture',
    subtitle: 'Sculptural lighting & archival fashion narrative on main soundstage.',
    videoSrc: '/assets/reels/reel_3.mp4',
    posterSrc: '/assets/reels/reel_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DdOtmW1yqrB/',
    category: 'Haute Couture',
    duration: '0:24',
  },
  {
    id: '02',
    title: 'Cafe & Culinary Atmosphere',
    subtitle: 'Sensory gastronomy cinematography with golden-hour micro-textures.',
    videoSrc: '/assets/reels/reel_1.mp4',
    posterSrc: '/assets/reels/reel_1_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/Dd4YGN6PsfU/',
    category: 'Sensory Atmosphere',
    duration: '0:18',
  },
  {
    id: '03',
    title: 'Soundstage Lighting & BTS',
    subtitle: 'Multi-point kinetic lighting rig choreography and real-time color grading.',
    videoSrc: '/assets/reels/reel_2.mp4',
    posterSrc: '/assets/reels/reel_2_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DdUMT0NvVPK/',
    category: 'Soundstage BTS',
    duration: '0:15',
  },
  {
    id: '04',
    title: 'Metropolitan Nightlife',
    subtitle: 'After-hours anamorphic flares and urban rhythm captured on 35mm motion film.',
    videoSrc: '/assets/reels/reel_4.mp4',
    posterSrc: '/assets/reels/reel_4_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/Dc6YGOnPQUy/',
    category: 'Motion Film',
    duration: '0:22',
  },
]

interface MobileShortsModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenConnect: () => void
}

export const MobileShortsModal: React.FC<MobileShortsModalProps> = ({
  isOpen,
  onClose,
  onOpenConnect,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [copiedToast, setCopiedToast] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setShowSwipeHint(true)
      const timer = setTimeout(() => setShowSwipeHint(false), 3500)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Play active video and pause others on slide change
  useEffect(() => {
    if (!isOpen) {
      videoRefs.current.forEach((video) => video?.pause())
      return
    }

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === activeIndex) {
        video.muted = isMuted
        video.currentTime = 0
        video.play().catch(() => {
          // Autoplay policy fallback: mute and play
          video.muted = true
          video.play().catch(() => {})
        })
      } else {
        video.pause()
      }
    })
  }, [activeIndex, isOpen, isMuted])

  // Scroll snap observer
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const height = container.clientHeight
    if (height === 0) return
    const newIndex = Math.round(container.scrollTop / height)
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < SHORTS_REELS_DATA.length) {
      setActiveIndex(newIndex)
    }
  }, [activeIndex])

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    videoRefs.current.forEach((v) => {
      if (v) v.muted = nextMuted
    })
  }

  const handleOpenInstagram = (url: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async (reel: ReelShortItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Leeana Atelier — ${reel.title}`,
          text: reel.subtitle,
          url: reel.instagramUrl,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(reel.instagramUrl)
    setCopiedToast(true)
    setTimeout(() => setCopiedToast(false), 2000)
  }

  // Pointer down/up tracking for video tap vs scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    }
  }

  const handlePointerUp = (url: string, e: React.PointerEvent) => {
    if (!pointerStartRef.current) return
    const deltaX = Math.abs(e.clientX - pointerStartRef.current.x)
    const deltaY = Math.abs(e.clientY - pointerStartRef.current.y)
    const deltaTime = Date.now() - pointerStartRef.current.time

    // If it was a clean tap (not a drag/scroll gesture)
    if (deltaX < 12 && deltaY < 12 && deltaTime < 400) {
      handleOpenInstagram(url)
    }
    pointerStartRef.current = null
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden select-none animate-in fade-in duration-300">
      
      {/* Top Floating Glass Header Deck */}
      <header className="absolute top-0 inset-x-0 z-30 pt-safe-top px-4 py-3 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        {/* Brand & Live Archive Status */}
        <div className="flex items-center gap-2.5">
          <span className="font-couture text-lg tracking-[0.24em] text-white">LEEANA</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="text-[10px] uppercase font-light tracking-[0.2em] text-white/70">
            Works {activeIndex + 1}/{SHORTS_REELS_DATA.length}
          </span>
        </div>

        {/* Action Controls: Sound & Close */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/80" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            aria-label="Close Reels View"
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-all cursor-pointer shadow-xl font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Vertical Shorts Snap Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory scrollbar-none overscroll-y-contain relative"
      >
        {SHORTS_REELS_DATA.map((reel, index) => {
          const isActive = index === activeIndex

          return (
            <section
              key={reel.id}
              className="relative w-full h-[100dvh] snap-start snap-always flex items-center justify-center bg-black overflow-hidden"
              onPointerDown={handlePointerDown}
              onPointerUp={(e) => handlePointerUp(reel.instagramUrl, e)}
            >
              {/* Fullscreen Vertical Video Element */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                src={reel.videoSrc}
                poster={reel.posterSrc}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Seamless Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 via-45% to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Tap Hint / Overlay Ripple */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="opacity-0 active:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm rounded-full p-6">
                  <ArrowUpRight className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Right Floating Actions Stack (Reels / TikTok Style) */}
              <aside className="absolute right-3 sm:right-5 bottom-28 z-20 flex flex-col items-center gap-4.5 pointer-events-auto">
                {/* 1. Watch on Instagram Button */}
                <button
                  onClick={(e) => handleOpenInstagram(reel.instagramUrl, e)}
                  aria-label="Open on Instagram"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer active:scale-90 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] shadow-[0_8px_24px_rgba(220,39,67,0.4)]">
                    <div className="w-full h-full rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium tracking-wider uppercase text-white/80">Reel</span>
                </button>

                {/* 2. Direct Requisition / Connect Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                    onOpenConnect()
                  }}
                  aria-label="Connect with Atelier"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer active:scale-90 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-white/[0.12] border border-white/25 backdrop-blur-xl flex items-center justify-center text-white shadow-lg group-hover:bg-white group-hover:text-black transition-all">
                    <Sparkles className="w-5 h-5 text-white group-hover:text-black" />
                  </div>
                  <span className="text-[10px] font-medium tracking-wider uppercase text-white/80">Connect</span>
                </button>

                {/* 3. Share Button */}
                <button
                  onClick={(e) => handleShare(reel, e)}
                  aria-label="Share Reel"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer active:scale-90 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-lg group-hover:bg-white group-hover:text-black transition-all">
                    <Share2 className="w-4 h-4 text-white group-hover:text-black" />
                  </div>
                  <span className="text-[10px] font-medium tracking-wider uppercase text-white/80">Share</span>
                </button>
              </aside>

              {/* Bottom Content Metadata Overlay */}
              <div className="absolute left-0 right-16 bottom-6 z-20 px-4 sm:px-6 space-y-3 pointer-events-auto">
                {/* Atelier Tag & Handle */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[10px] font-medium tracking-[0.14em] uppercase text-white backdrop-blur-md">
                    {reel.category}
                  </span>
                  <a
                    href="https://www.instagram.com/leeana.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold tracking-wider text-white/90 hover:text-white flex items-center gap-1"
                  >
                    @leeana.in
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </a>
                </div>

                {/* Reel Title & Description */}
                <div className="space-y-1">
                  <h2 className="font-display text-xl sm:text-2xl font-light text-white tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {reel.title}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    {reel.subtitle}
                  </p>
                </div>

                {/* Primary Action Pill: Watch on Instagram */}
                <div className="pt-1 flex items-center gap-2.5">
                  <button
                    onClick={(e) => handleOpenInstagram(reel.instagramUrl, e)}
                    className="apple-press cursor-pointer flex-1 py-3 px-5 rounded-full bg-white text-black font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:bg-white/90 transition-all"
                  >
                    <span>Watch on Instagram</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Swipe Up First-Visit Cue */}
      {showSwipeHint && (
        <div className="absolute bottom-24 inset-x-0 z-30 flex flex-col items-center justify-center pointer-events-none animate-bounce">
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] tracking-[0.14em] uppercase text-white/80 flex items-center gap-1.5">
            <ChevronUp className="w-3.5 h-3.5 text-white" />
            <span>Swipe for next reel</span>
          </div>
        </div>
      )}

      {/* Copy Toast Notification */}
      {copiedToast && (
        <div className="absolute top-20 inset-x-0 z-40 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium tracking-wider uppercase shadow-2xl">
            Reel Link Copied to Clipboard
          </div>
        </div>
      )}

    </div>
  )
}
