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
  
  // Touch tracking specifically for the video tap/swipe layer
  const touchStartY = useRef<number | null>(null)
  const touchStartTime = useRef<number>(0)
  const isSwiping = useRef(false)

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
          // Autoplay policy fallback
          video.muted = true
          video.play().catch(() => {})
        })
      } else {
        video.pause()
      }
    })
  }, [activeIndex, isOpen, isMuted])

  // Scroll snap observer using debounce to keep scrolling butter-smooth
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

  const handleOpenInstagram = (url: string, e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async (reel: ReelShortItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Leeana.in Atelier — ${reel.title}`,
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

  // Smooth gesture assist on the background video layer
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchStartTime.current = Date.now()
    isSwiping.current = false
  }

  const handleTouchEnd = (url: string, index: number, e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    const deltaTime = Date.now() - touchStartTime.current

    // If dragged more than 45px vertically, assist smooth glide to next/prev reel
    if (Math.abs(deltaY) > 45) {
      isSwiping.current = true
      const container = containerRef.current
      if (container) {
        const height = container.clientHeight
        if (deltaY < -45 && index < SHORTS_REELS_DATA.length - 1) {
          container.scrollTo({ top: (index + 1) * height, behavior: 'smooth' })
        } else if (deltaY > 45 && index > 0) {
          container.scrollTo({ top: (index - 1) * height, behavior: 'smooth' })
        }
      }
    } else if (Math.abs(deltaY) < 10 && deltaTime < 350) {
      // Intentional tap on video area (not a button)
      handleOpenInstagram(url, e)
    }
    touchStartY.current = null
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden select-none animate-in fade-in duration-300">
      
      {/* Top Floating Glass Header Deck: Left Back Arrow, Center LEEANA.in, No x/y, No dots */}
      <header className="absolute top-0 inset-x-0 z-30 pt-safe-top px-4 py-3.5 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        {/* Left: Back Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Back to Atelier"
          className="w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shadow-lg hover:border-white/40"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Middle: Centered LEEANA.in Mark */}
        <span className="font-couture text-lg sm:text-xl tracking-[0.26em] text-white select-none">
          LEEANA<span className="text-[0.62em] tracking-[0.08em] lowercase opacity-85">.in</span>
        </span>

        {/* Right: Invisible Spacer to Balance Horizontal Center */}
        <div className="w-10 h-10 pointer-events-none" />
      </header>

      {/* Smooth, Fluid Vertical Shorts Snap Container (Neither too stiff nor too loose) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory scrollbar-none relative [scroll-behavior:smooth] [scroll-snap-type:y_mandatory] [-webkit-overflow-scrolling:touch]"
      >
        {SHORTS_REELS_DATA.map((reel, index) => {
          return (
            <section
              key={reel.id}
              className="relative w-full h-[100dvh] snap-start snap-normal flex items-center justify-center bg-black overflow-hidden select-none"
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

              {/* Dedicated Video Tap & Swipe Layer (z-10: Behind UI buttons, so buttons NEVER trigger Instagram!) */}
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(reel.instagramUrl, index, e)}
                onClick={() => handleOpenInstagram(reel.instagramUrl)}
                aria-label="Tap video to open on Instagram"
              />

              {/* Seamless Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 via-45% to-transparent pointer-events-none z-15" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-15" />

              {/* Bottom Full-Width Flex Container: Metadata & Watch on Instagram (Left) + 3 Side Actions (Right) */}
              <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-6 sm:px-6 pointer-events-none flex items-end justify-between gap-3">
                
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
                  {/* 1. Mute Button (Only toggles sound, NEVER opens Instagram) */}
                  <button
                    onClick={toggleSound}
                    aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shadow-lg hover:border-white/40"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>

                  {/* 2. Connect Button (Opens Requisition card, NEVER opens Instagram) */}
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

                  {/* 3. Share Button — Bottom-most, Aligned with Watch on Instagram (Only shares, NEVER opens Instagram) */}
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
        <div className="absolute bottom-28 inset-x-0 z-20 flex flex-col items-center justify-center pointer-events-none animate-bounce">
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
