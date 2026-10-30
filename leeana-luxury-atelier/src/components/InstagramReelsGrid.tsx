import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause, ArrowUpRight, Sparkles } from 'lucide-react'

export interface ReelItem {
  id: string
  title: string
  tag: string
  caption: string
  videoSrc: string
  posterSrc: string
  instagramUrl: string
  duration: string
}

export const INSTAGRAM_REELS_DATA: ReelItem[] = [
  {
    id: '01',
    title: 'Cafe & Culinary Atmosphere',
    tag: 'Hospitality & Culinary',
    caption: 'Immersive sensory dining atmospheres and bespoke cafe spatial narratives.',
    videoSrc: '/assets/reels/reel_1.mp4',
    posterSrc: '/assets/reels/reel_1_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/Dd4YGN6PsfU/',
    duration: '0:48',
  },
  {
    id: '02',
    title: 'Soundstage Lighting & BTS',
    tag: 'Production Soundstage',
    caption: 'Behind-the-lens motion calibration and high-concept campaign choreography.',
    videoSrc: '/assets/reels/reel_2.mp4',
    posterSrc: '/assets/reels/reel_2_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DdUMT0NvVPK/',
    duration: '0:30',
  },
  {
    id: '03',
    title: 'Editorial Haute Couture',
    tag: 'Fashion Silhouette',
    caption: 'Cinematic fashion pacing featuring curated archival talent and styling.',
    videoSrc: '/assets/reels/reel_3.mp4',
    posterSrc: '/assets/reels/reel_3_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DdOtmW1yqrB/',
    duration: '0:53',
  },
  {
    id: '04',
    title: 'Architectural Sanctuaries',
    tag: 'Private Estates',
    caption: 'Expansive private architecture, refined interiors, and executive luxury living.',
    videoSrc: '/assets/reels/reel_4.mp4',
    posterSrc: '/assets/reels/reel_4_thumb.jpg',
    instagramUrl: 'https://www.instagram.com/reel/Dc6YGOnPQUy/',
    duration: '1:01',
  },
]

interface InstagramReelsGridProps {
  onOpenRequisition?: (mandate?: string) => void
}

export const InstagramReelsGrid: React.FC<InstagramReelsGridProps> = () => {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({})
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

  // Toggle play / pause on card tap
  const togglePlay = (id: string) => {
    const vEl = videoRefs.current[id]
    if (!vEl) return

    if (vEl.paused) {
      vEl.play().catch(() => {})
      setPausedMap((prev) => ({ ...prev, [id]: false }))
    } else {
      vEl.pause()
      setPausedMap((prev) => ({ ...prev, [id]: true }))
    }
  }

  // Pause videos when scrolled completely out of view for performance
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Mute all when leaving section
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
      className="border-t border-white/[0.08] pt-16 md:pt-24 scroll-mt-28"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-light">
              Official Archive · @leeana.in
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Live Productions · In Motion
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed mt-2">
            Soundstage captures, high-fashion motion choreography, and architectural cinematography streamed directly from our live Instagram reels vault.
          </p>
        </div>

        {/* Action Link: Follow @leeana.in */}
        <a
          href="https://www.instagram.com/leeana.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-press self-start md:self-auto inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white hover:text-black hover:border-white text-xs font-semibold tracking-[0.16em] uppercase text-white transition-all backdrop-blur-md shadow-lg"
        >
          {/* Instagram Camera Glyph */}
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

      {/* 4-Column Editorial Reel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {INSTAGRAM_REELS_DATA.map((reel) => {
          const isUnmuted = unmutedId === reel.id
          const isPaused = pausedMap[reel.id] ?? false

          return (
            <article
              key={reel.id}
              onClick={() => togglePlay(reel.id)}
              className="group relative rounded-[28px] overflow-hidden border border-white/[0.12] bg-[#09090d] shadow-2xl transition-all duration-500 hover:border-white/35 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between aspect-[9/16]"
            >
              {/* Background Video */}
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrims for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

              {/* Top Bar: Tag & Unmute Audio Button */}
              <div className="relative z-10 p-5 flex items-center justify-between pointer-events-auto">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] tracking-widest text-white/90 uppercase font-light inline-block">
                  {reel.tag}
                </span>

                <div className="flex items-center gap-2">
                  {/* Duration Badge */}
                  <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/70">
                    {reel.duration}
                  </span>

                  {/* Audio Mute/Unmute Button */}
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
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Center Play/Pause Overlay indicator when paused */}
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                </div>
              )}

              {/* Bottom Info Card & Watch on IG Action */}
              <div className="relative z-10 p-6 space-y-3 pointer-events-auto">
                <h3 className="font-display text-xl sm:text-2xl text-white font-light tracking-tight leading-snug">
                  {reel.title}
                </h3>

                <p className="text-xs text-white/70 font-light line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="apple-press inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-white/80 hover:text-white uppercase transition-colors"
                  >
                    <span>Watch Reel</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white transition-colors" />
                  </a>

                  <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono">
                    LEEANA #{reel.id}
                  </span>
                </div>
              </div>

              {/* Hairline highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </article>
          )
        })}
      </div>
    </section>
  )
}
