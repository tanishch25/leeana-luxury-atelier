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
    title: 'Cafe & Culinary Atmosphere',
    subtitle: 'Sensory gastronomy cinematography with golden-hour micro-textures.',
    videoSrc: '/assets/reels/reel_1.mp4',
    posterSrc: '/assets/reels/reel_1_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Sensory Atmosphere',
    duration: '0:18',
  },
  {
    id: '02',
    title: 'Founder Vision & Commercial Direction',
    subtitle: 'Creative leadership, brand dialogues, and commercial film production narrative.',
    videoSrc: '/assets/reels/reel_attached_1.mp4',
    posterSrc: '/assets/reels/reel_attached_1_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Founder Spotlight',
    duration: '0:55',
  },
  {
    id: '03',
    title: 'The Cozy Ambience',
    subtitle: 'Warm architectural lighting and sensory hospitality culture captured on cinema lenses.',
    videoSrc: '/assets/reels/reel_attached_2.mp4',
    posterSrc: '/assets/reels/reel_attached_2_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Hospitality & Cafe',
    duration: '0:53',
  },
  {
    id: '04',
    title: 'Design Dialogue & Living Spaces',
    subtitle: 'Curated interior aesthetics, bespoke furniture craftsmanship, and architectural living.',
    videoSrc: '/assets/reels/reel_attached_3.mp4',
    posterSrc: '/assets/reels/reel_attached_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Interior & Design',
    duration: '1:01',
  },
  {
    id: '05',
    title: 'Culinary Narrative & Cafe Architecture',
    subtitle: 'Brik Oven artisan storytelling, warm bakery textures, and cafe lifestyle.',
    videoSrc: '/assets/reels/reel_5_yt.mp4',
    posterSrc: '/assets/reels/reel_5_yt_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Culinary Narrative',
    duration: '0:34',
  },
  {
    id: '06',
    title: 'Editorial Haute Couture',
    subtitle: 'Sculptural lighting & archival fashion narrative on main soundstage.',
    videoSrc: '/assets/reels/reel_3.mp4',
    posterSrc: '/assets/reels/reel_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Haute Couture',
    duration: '0:24',
  },
  {
    id: '07',
    title: 'Artisanal Dining & Ambient Spaces',
    subtitle: 'Atmospheric hospitality cinematography, interior textures, and warm living moments.',
    videoSrc: '/assets/reels/reel_7_attached.mp4',
    posterSrc: '/assets/reels/reel_7_attached_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Hospitality & Atmosphere',
    duration: '0:16',
  },
  {
    id: '08',
    title: 'Leeana Fashion Concierge',
    subtitle: 'Worldwide bespoke fashion concierge, couture curation, and patron empowerment.',
    videoSrc: '/assets/reels/reel_8_concierge.mp4',
    posterSrc: '/assets/reels/reel_8_concierge_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
    category: 'Fashion Concierge',
    duration: '1:28',
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
  const [isMuted, setIsMuted] = useState(false)
  const [copiedToast, setCopiedToast] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // Pause and reset all videos immediately
  const stopAllPlayback = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [])

  const handleClose = useCallback(() => {
    stopAllPlayback()
    setActiveIndex(0)
    onClose()
  }, [stopAllPlayback, onClose])

  // Lock background scroll when open and ensure fresh start with sound on
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setActiveIndex(0)
      setIsMuted(false)
      if (containerRef.current) {
        containerRef.current.scrollTop = 0
      }
      stopAllPlayback()
      setShowSwipeHint(true)
      const timer = setTimeout(() => setShowSwipeHint(false), 3200)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    } else {
      stopAllPlayback()
      setActiveIndex(0)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, stopAllPlayback])

  // High-performance IntersectionObserver detects the active reel at 55% viewport visibility
  useEffect(() => {
    if (!isOpen) return
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'))
            if (!isNaN(idx)) {
              setActiveIndex(idx)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.55,
      }
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [isOpen])

  // Video playback & zero audio delay lifecycle: plays active reel with music ON, completely silences all others
  useEffect(() => {
    if (!isOpen) {
      stopAllPlayback()
      return
    }

    // If viewing the concluding Let's Talk card (slide index >= 7), silence all videos immediately!
    if (activeIndex >= SHORTS_REELS_DATA.length) {
      stopAllPlayback()
      return
    }

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === activeIndex) {
        video.muted = isMuted
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            // Only mute if the browser explicitly rejects unmuted autoplay via security policy
            if (err?.name === 'NotAllowedError') {
              video.muted = true
              setIsMuted(true)
              video.play().catch(() => {})
            }
          })
        }
      } else {
        video.pause()
        video.currentTime = 0
        video.muted = true
      }
    })
  }, [activeIndex, isOpen, isMuted, stopAllPlayback])

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
          title: `Leeana.IN Atelier — ${reel.title}`,
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

  return (
    <div
      className={`fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden select-none transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      
      {/* Top Floating Glass Header Deck: Left Back Arrow, Center LEEANA.IN, No x/y, No dots */}
      <header className="absolute top-0 inset-x-0 z-30 pt-safe-top px-4 py-3.5 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        {/* Left: Back Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          aria-label="Back to Atelier"
          className="w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shadow-lg hover:border-white/40"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Middle: Centered LEEANA.IN Mark */}
        <span className="font-couture text-lg sm:text-xl tracking-[0.26em] text-white select-none">
          LEEANA<span className="text-[0.62em] tracking-[0.08em] uppercase opacity-85">.IN</span>
        </span>

        {/* Right: Invisible Spacer to Balance Horizontal Center */}
        <div className="w-10 h-10 pointer-events-none" />
      </header>

      {/* Ultra-Smooth 120Hz Vertical Shorts Snap Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory scrollbar-none relative overscroll-y-contain [scroll-snap-type:y_mandatory] [-webkit-overflow-scrolling:touch] touch-pan-y"
      >
        {SHORTS_REELS_DATA.map((reel, index) => {
          return (
            <section
              key={reel.id}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              data-index={index}
              className="relative w-full h-[100dvh] snap-start snap-always flex items-center justify-center bg-black overflow-hidden select-none shrink-0"
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
                preload="auto"
                muted={index === activeIndex ? isMuted : true}
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Seamless Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 via-45% to-transparent pointer-events-none z-15" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-15" />

              {/* Bottom Full-Width Flex Container: Minimal Brand & Follow on Instagram (Left) + 3 Side Actions (Right) */}
              <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-6 sm:px-6 pointer-events-none flex items-end justify-between gap-3">
                
                {/* Left Column: Refined Minimal Brand Mark & Follow us on Instagram Button */}
                <div className="flex-1 space-y-3 pointer-events-auto pr-1">
                  {/* Minimal Brand Mark: Pure leeana.IN (No clips/film icon) */}
                  <div data-brand-pill className="px-3.5 py-1 rounded-full bg-black/45 border border-white/15 backdrop-blur-md w-fit shadow-md">
                    <span className="font-couture text-xs sm:text-sm tracking-widest text-white/95">
                      leeana<span className="text-[0.68em] uppercase opacity-85">.IN</span>
                    </span>
                  </div>

                  {/* Primary Action Button: Follow us on Instagram (h-12 / 48px) - ONLY this opens Instagram */}
                  <button
                    onClick={(e) => handleOpenInstagram(reel.instagramUrl, e)}
                    className="apple-press cursor-pointer w-full h-12 px-5 rounded-full bg-white text-black font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:bg-white/90 active:scale-95 transition-all"
                  >
                    <span>Follow us on Instagram</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
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
                      handleClose()
                      onOpenConnect()
                    }}
                    aria-label="Connect with Atelier"
                    className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-all cursor-pointer hover:border-white/40"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </button>

                  {/* 3. Share Button — Bottom-most, Aligned with Follow on Instagram (Only shares, NEVER opens Instagram) */}
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

        {/* Final Concluding Slide: "Let's Talk" (Seamlessly Scrolled into view after the content ends) */}
        <section
          ref={(el) => {
            sectionRefs.current[SHORTS_REELS_DATA.length] = el
          }}
          data-index={SHORTS_REELS_DATA.length}
          className="relative w-full h-[100dvh] snap-start snap-always flex items-center justify-center bg-[#07070a] px-6 select-none overflow-hidden shrink-0"
        >
          {/* Subtle Radial Backdrop Ambient */}
          <div className="absolute inset-0 bg-radial from-white/[0.05] via-transparent to-transparent pointer-events-none" />

          {/* Luxury Let's Talk Card */}
          <div className="relative z-10 w-full max-w-sm rounded-[32px] border border-white/[0.16] bg-black/75 backdrop-blur-2xl p-7 sm:p-9 text-center space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            
            <div className="space-y-3">
              <span className="font-couture text-2xl tracking-[0.24em] text-white block">
                LEEANA<span className="text-[0.62em] tracking-[0.08em] uppercase opacity-85">.IN</span>
              </span>
              <h3 className="font-display text-3xl font-light text-white tracking-tight">
                Let's Talk
              </h3>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                Commission bespoke cinema productions, commercial brand films, or reserve a private soundstage appointment.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  handleClose()
                  onOpenConnect()
                }}
                className="apple-press w-full py-4 rounded-full bg-white text-black font-semibold text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={() => {
                  const msg = `Hello Leeana Atelier,\n\nI just viewed your reels and wish to connect.`
                  window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
                }}
                className="apple-press w-full py-3.5 rounded-full border border-white/20 bg-white/[0.05] text-white font-medium text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>Message on WhatsApp</span>
              </button>
            </div>

            <div className="pt-2 text-[10px] font-light tracking-widest uppercase text-white/40">
              Direct Soundstage · JP Nagar, Bangalore
            </div>
          </div>
        </section>
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
