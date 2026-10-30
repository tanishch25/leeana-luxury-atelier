import React, { useState, useRef } from 'react'
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react'

interface OurWorksSectionProps {
  onNavigateServices: () => void
}

export const OurWorksSection: React.FC<OurWorksSectionProps> = ({ onNavigateServices }) => {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const next = unmutedId === id ? null : id
    setUnmutedId(next)
    Object.entries(videoRefs.current).forEach(([vId, vEl]) => {
      if (vEl) vEl.muted = vId !== next
    })
  }

  // Curated showcase: 2 Archival Models + 2 Live Productions Reels
  const curatedWorks = [
    {
      type: 'model',
      id: 'm1',
      title: 'Editorial Streetwear',
      image: '/assets/model-1.jpg',
    },
    {
      type: 'reel',
      id: 'r1',
      title: 'Cafe & Culinary Atmosphere',
      video: '/assets/reels/reel_1.mp4',
      poster: '/assets/reels/reel_1_thumb.jpg',
      url: 'https://www.instagram.com/reel/Dd4YGN6PsfU/',
    },
    {
      type: 'model',
      id: 'm2',
      title: 'Nightlife Luxe',
      image: '/assets/model-2.jpg',
    },
    {
      type: 'reel',
      id: 'r2',
      title: 'Editorial Haute Couture',
      video: '/assets/reels/reel_3.mp4',
      poster: '/assets/reels/reel_3_thumb.jpg',
      url: 'https://www.instagram.com/reel/DdOtmW1yqrB/',
    },
  ]

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto z-10 text-white">
      {/* Creative Works Board Frame */}
      <div className="rounded-[32px] sm:rounded-[36px] border border-white/[0.12] bg-[#07070b]/80 backdrop-blur-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl space-y-10">
        {/* Top hairline highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Our Works
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              A curated curation of live soundstage productions, high-fashion talent casting, and cinematic media campaigns.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-wider uppercase text-white/60">
            <span>Soundstage Vault</span>
            <span className="text-white/20">/</span>
            <span className="text-white/80">Talent & Reels</span>
          </div>
        </div>

        {/* Small Curated Board: Staggered Models & Reels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedWorks.map((item) => {
            if (item.type === 'model') {
              return (
                <div
                  key={item.id}
                  onClick={onNavigateServices}
                  className="group relative rounded-[24px] overflow-hidden border border-white/[0.12] bg-[#09090c] hover:border-white/40 transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-end aspect-[9/16] hover:-translate-y-1.5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                  <div className="relative z-10 p-6 pointer-events-auto">
                    <h3 className="font-display text-xl sm:text-2xl text-white font-light tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
              )
            }

            // Live Reel Video Card
            const isUnmuted = unmutedId === item.id
            return (
              <div
                key={item.id}
                onClick={onNavigateServices}
                className="group relative rounded-[24px] overflow-hidden border border-white/[0.14] bg-[#0c0c10] shadow-2xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between aspect-[9/16]"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el
                  }}
                  src={item.video}
                  poster={item.poster}
                  loop
                  playsInline
                  autoPlay
                  muted
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Audio Button */}
                <div className="relative z-10 p-4 flex justify-end pointer-events-auto">
                  <button
                    onClick={(e) => toggleMute(item.id, e)}
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

                {/* Only Title + Arrow */}
                <div className="relative z-10 p-6 flex items-end justify-between gap-3 pointer-events-auto">
                  <h3 className="font-display text-xl sm:text-2xl text-white font-light tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <div className="w-9 h-9 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Below the Board: Explore Services Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onNavigateServices}
            className="apple-press group cursor-pointer inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs tracking-[0.16em] uppercase hover:bg-white/90 transition-all shadow-2xl"
          >
            <span>Explore Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
