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

export const InstagramReelsGrid: React.FC = () => {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const sectionRef = useRef<HTMLElement | null>(null)

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
              href="https://www.instagram.com/leeana.in/"
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

        {/* 4-Column Video Reel Cards — Perfect Bottom-Aligned Baseline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 pt-3.5">
          {INSTAGRAM_REELS_DATA.map((reel) => {
            const isUnmuted = unmutedId === reel.id

            return (
              <a
                key={reel.id}
                href={reel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-[24px] overflow-hidden border border-white/[0.14] bg-[#0c0c10] shadow-2xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between aspect-[9/16] block"
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
                <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between gap-3 pointer-events-auto">
                  <h3 className="font-display text-lg sm:text-xl text-white font-light tracking-tight leading-snug">
                    {reel.title}
                  </h3>

                  <div className="w-8 h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Hairline highlight */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
