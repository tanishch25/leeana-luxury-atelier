import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react'

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
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '02',
    title: 'Founder Vision & Commercial Direction',
    videoSrc: '/assets/reels/reel_attached_1.mp4',
    posterSrc: '/assets/reels/reel_attached_1_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '03',
    title: 'The Cozy Ambience',
    videoSrc: '/assets/reels/reel_attached_2.mp4',
    posterSrc: '/assets/reels/reel_attached_2_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '04',
    title: 'Design Dialogue & Living Spaces',
    videoSrc: '/assets/reels/reel_attached_3.mp4',
    posterSrc: '/assets/reels/reel_attached_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '05',
    title: 'Culinary Narrative & Cafe Architecture',
    videoSrc: '/assets/reels/reel_5_yt.mp4',
    posterSrc: '/assets/reels/reel_5_yt_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '06',
    title: 'Editorial Haute Couture',
    videoSrc: '/assets/reels/reel_3.mp4',
    posterSrc: '/assets/reels/reel_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '07',
    title: 'Artisanal Dining & Ambient Spaces',
    videoSrc: '/assets/reels/reel_7_attached.mp4',
    posterSrc: '/assets/reels/reel_7_attached_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
  {
    id: '08',
    title: 'Leeana Fashion Concierge',
    videoSrc: '/assets/reels/reel_8_concierge.mp4',
    posterSrc: '/assets/reels/reel_8_concierge_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr',
  },
]

// Alternating heights for Pinterest-style staggered masonry (sums to 30.5 in every column)
const TALL_REEL_IDS = new Set(['01', '03', '06', '08'])

export const InstagramReelsGrid: React.FC = () => {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const sectionRef = useRef<HTMLElement | null>(null)

  // Responsive column redistribution
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sync mute state across video elements
  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
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

  // Mathematical Pinterest Column Architecture:
  // Desktop: 4 columns where each column sums to 30.5 aspect units (17 + 13.5 = 30.5)
  // Mobile: 2 columns where each column sums to 61.0 aspect units (17 + 17 + 13.5 + 13.5 = 61.0)
  // Result: Completely asymmetric staggered middle seams, with 100% flush, identical bottom level!
  const columns = isDesktop
    ? [
        [INSTAGRAM_REELS_DATA[0], INSTAGRAM_REELS_DATA[4]], // Col 1: 01 (tall), 05 (short) -> 30.5
        [INSTAGRAM_REELS_DATA[1], INSTAGRAM_REELS_DATA[5]], // Col 2: 02 (short), 06 (tall) -> 30.5
        [INSTAGRAM_REELS_DATA[2], INSTAGRAM_REELS_DATA[6]], // Col 3: 03 (tall), 07 (short) -> 30.5
        [INSTAGRAM_REELS_DATA[3], INSTAGRAM_REELS_DATA[7]], // Col 4: 04 (short), 08 (tall) -> 30.5
      ]
    : [
        [INSTAGRAM_REELS_DATA[0], INSTAGRAM_REELS_DATA[2], INSTAGRAM_REELS_DATA[4], INSTAGRAM_REELS_DATA[6]], // Col 1: 01, 03, 05, 07 -> 61.0
        [INSTAGRAM_REELS_DATA[1], INSTAGRAM_REELS_DATA[3], INSTAGRAM_REELS_DATA[5], INSTAGRAM_REELS_DATA[7]], // Col 2: 02, 04, 06, 08 -> 61.0
      ]

  return (
    <section
      ref={sectionRef}
      id="instagram-reels"
      className="scroll-mt-32"
    >
      {/* Creative Dashboard Frame with Tight, Refined Spacing */}
      <div className="rounded-[28px] sm:rounded-[32px] border border-white/[0.12] bg-[#07070b]/80 backdrop-blur-2xl p-4 sm:p-6 md:p-6 relative overflow-hidden shadow-2xl">
        {/* Subtle top hairline highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Dashboard Control Deck Header (Tightened padding, no dots, no small words above title) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3.5 border-b border-white/[0.08]">
          <div className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
              Live Productions In Motion
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Soundstage captures, high-fashion motion choreography, and architectural cinematography streamed directly from our live Instagram reels vault.
            </p>
          </div>

          {/* Action Dock (Clean button, no unnecessary wordings/chips) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-press inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white hover:text-black hover:border-white text-xs font-semibold tracking-[0.14em] uppercase text-white transition-all backdrop-blur-md shadow-lg"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
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

        {/* Pinterest-Style Asymmetric Masonry: 2 Columns on Mobile, 4 Columns on Desktop with Level Bottom */}
        <div className={`grid gap-2.5 sm:gap-3 md:gap-3.5 pt-3.5 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
          {columns.map((colReels, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2.5 sm:gap-3 md:gap-3.5">
              {colReels.map((reel) => {
                const isUnmuted = unmutedId === reel.id
                const isTall = TALL_REEL_IDS.has(reel.id)

                return (
                  <a
                    key={reel.id}
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ aspectRatio: isTall ? '9 / 17' : '9 / 13.5' }}
                    className="group relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/[0.14] bg-[#0c0c10] shadow-2xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between block"
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

                    {/* Refined Cinematic Fade Atmosphere */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,5,8,0.65)] pointer-events-none" />

                    {/* Top Corner: Discrete Audio Button (No text) */}
                    <div className="relative z-10 p-2.5 sm:p-4 flex justify-end pointer-events-auto">
                      <button
                        onClick={(e) => toggleMute(reel.id, e)}
                        aria-label={isUnmuted ? 'Mute Audio' : 'Unmute Audio'}
                        className={`apple-press w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer border ${
                          isUnmuted
                            ? 'bg-white text-black border-white shadow-lg'
                            : 'bg-black/60 text-white border-white/20 hover:bg-white hover:text-black hover:border-white'
                        }`}
                      >
                        {isUnmuted ? (
                          <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        ) : (
                          <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Card Content: ONLY Title + Arrow */}
                    <div className="relative z-10 p-3 sm:p-5 flex items-end justify-between gap-1.5 sm:gap-3 pointer-events-auto">
                      <h3 className="font-display text-xs sm:text-lg md:text-xl text-white font-light tracking-tight leading-snug">
                        {reel.title}
                      </h3>

                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    </div>

                    {/* Hairline highlight */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  </a>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
