import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowLeft, Volume2, VolumeX, ArrowUpRight, Share2, Sparkles, ChevronUp } from 'lucide-react'

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
      
      {/* Top Floating Glass Header Deck: Left Back Arrow, Center LEEANA, No x/y, No dots */}
      <header className="absolute top-0 inset-x-0 z-30 pt-safe-top px-4 py-3 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        {/* Left: Back Arrow Button */}
        <button
          onClick={onClose}
          aria-label="Back to Atelier"
          className="w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shadow-lg hover:border-white/40"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Middle: Centered LEEANA Mark */}
        <span className="font-couture text-lg sm:text-xl tracking-[0.28em] text-white select-none">
          LEEANA
        </span>

        {/* Right: Invisible Spacer to Balance Horizontal Center */}
        <div className="w-10 h-10 pointer-events-none" />
      </header>

      {/* Vertical Shorts Snap Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory scrollbar-none overscroll-y-contain relative"
      >
        {SHORTS_REELS_DATA.map((reel, index) => {
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

              {/* Bottom Full-Width Flex Container: Metadata & Watch on Instagram (Left) + 3 Side Actions (Right) */}
              <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-6 sm:px-6 pointer-events-none flex items-end justify-between gap-3">
                
                {/* Left Column: Metadata & Watch on Instagram Button */}
                <div className="flex-1 space-y-3 pointer-events-auto pr-1">
                  {/* Atelier Tag & Handle (Clean, NO dot) */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[10px] font-medium tracking-[0.14em] uppercase text-white backdrop-blur-md">
                      {reel.category}
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-white/90">
                      @leeana.in
                    </span>
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

                  {/* Primary Action Button: Watch on Instagram (h-12 / 48px) */}
                  <div className="pt-1">
                    <button
                      onClick={(e) => handleOpenInstagram(reel.instagramUrl, e)}
                      className="apple-press cursor-pointer w-full h-12 px-5 rounded-full bg-white text-black font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:bg-white/90 active:scale-95 transition-all"
                    >
                      <span>Watch on Instagram</span>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Exactly 3 Action Buttons (Mute, Connect, Share) */}
                <aside className="flex flex-col items-center gap-3 pointer-events-auto shrink-0">
                  {/* 1. Mute Button (Moved from top, placed on side) */}
                  <button
                    onClick={toggleSound}
                    aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shadow-lg hover:border-white/40"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>

                  {/* 2. Connect Button (Opens Requisition Dossier card) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onClose()
                      onOpenConnect()
                    }}
                    aria-label="Connect with Atelier"
                    className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-all cursor-pointer hover:border-white/40"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </button>

                  {/* 3. Share Button — Bottom-most, EXACT SAME LEVEL as Watch on Instagram! */}
                  <button
                    onClick={(e) => handleShare(reel, e)}
                    aria-label="Share Reel"
                    className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-all cursor-pointer hover:border-white/40"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </aside>

              </div>
            </section>
          )
        })}
      </div>

      {/* Swipe Up First-Visit Cue */}
      {showSwipeHint && (
        <div className="absolute bottom-28 inset-x-0 z-30 flex flex-col items-center justify-center pointer-events-none animate-bounce">
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
