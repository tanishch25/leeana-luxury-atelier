import React, { useState, useRef, useCallback } from 'react'
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react'

interface OurWorksSectionProps {
  onNavigateServices: () => void
}

export const OurWorksSection: React.FC<OurWorksSectionProps> = ({ onNavigateServices }) => {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const next = unmutedId === id ? null : id
    setUnmutedId(next)
    Object.entries(videoRefs.current).forEach(([vId, vEl]) => {
      if (vEl) vEl.muted = vId !== next
    })
  }

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto z-10 text-white">
      {/* Creative Works Board Frame with Pointer-Responsive Lighting Sheen */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="rounded-[32px] sm:rounded-[36px] border border-white/[0.12] bg-[#07070b]/85 backdrop-blur-2xl p-5 sm:p-8 md:p-9 relative overflow-hidden shadow-2xl space-y-7 group/board"
        style={{
          backgroundImage: `radial-gradient(750px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.05), transparent 70%)`,
        }}
      >
        {/* Top hairline highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Our Works
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              A curated soundstage archive uniting high-fashion casting, cinematic motion choreography, and luxury brand narratives.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-wider uppercase text-white/60">
            <span>Soundstage Vault</span>
            <span className="text-white/20">/</span>
            <span className="text-white/80">Talent & Cinema</span>
          </div>
        </div>

        {/* Master Asymmetric Soundstage Bento Grid */}
        <div className="space-y-3 sm:space-y-3.5">
          {/* Row 1: Large Cinema Soundstage Feature (2 cols) + Archival Model Card (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-3.5">
            {/* Feature Master Cinema Card */}
            <div
              onClick={onNavigateServices}
              className="group relative lg:col-span-2 h-[340px] sm:h-[400px] md:h-[450px] rounded-[24px] overflow-hidden border border-white/[0.14] bg-[#0a0a0e] shadow-2xl transition-all duration-500 hover:border-white/45 cursor-pointer flex flex-col justify-between"
            >
              <video
                ref={(el) => {
                  videoRefs.current['feature-reel'] = el
                }}
                src="/assets/reels/reel_3.mp4"
                poster="/assets/reels/reel_3_thumb.jpg"
                loop
                playsInline
                autoPlay
                muted
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

              {/* Top Controls: Soundstage Telemetry + Soundwave Visualizer + Audio Toggle */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-3 pointer-events-auto">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-white/90">
                  <span>SOUNDSTAGE 01 / CINEMA MASTER</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Dynamic Soundwave Equalizer Bars */}
                  <div className="flex items-end gap-1 h-5 px-2 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
                    <span
                      className={`w-[2.5px] rounded-full bg-white transition-all duration-300 ${
                        unmutedId === 'feature-reel'
                          ? 'animate-pulse h-4 bg-white'
                          : 'h-1.5 opacity-40'
                      }`}
                    />
                    <span
                      className={`w-[2.5px] rounded-full bg-white transition-all duration-300 ${
                        unmutedId === 'feature-reel'
                          ? 'animate-pulse h-3 bg-white'
                          : 'h-2.5 opacity-40'
                      }`}
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className={`w-[2.5px] rounded-full bg-white transition-all duration-300 ${
                        unmutedId === 'feature-reel'
                          ? 'animate-pulse h-4.5 bg-white'
                          : 'h-3 opacity-40'
                      }`}
                      style={{ animationDelay: '300ms' }}
                    />
                    <span
                      className={`w-[2.5px] rounded-full bg-white transition-all duration-300 ${
                        unmutedId === 'feature-reel'
                          ? 'animate-pulse h-2 bg-white'
                          : 'h-1 opacity-40'
                      }`}
                      style={{ animationDelay: '75ms' }}
                    />
                  </div>

                  {/* Audio Toggle Button */}
                  <button
                    onClick={(e) => toggleMute('feature-reel', e)}
                    aria-label={unmutedId === 'feature-reel' ? 'Mute Audio' : 'Unmute Audio'}
                    className={`apple-press w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer border ${
                      unmutedId === 'feature-reel'
                        ? 'bg-white text-black border-white shadow-lg'
                        : 'bg-black/60 text-white border-white/20 hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    {unmutedId === 'feature-reel' ? (
                      <Volume2 className="w-3.5 h-3.5" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Feature Details */}
              <div className="relative z-10 p-5 sm:p-6 flex items-end justify-between gap-4 pointer-events-auto">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-light tracking-tight leading-snug">
                    Haute Couture Soundstage
                  </h3>
                </div>

                <div className="apple-press inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-black/50 backdrop-blur-md text-xs uppercase tracking-wider text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                  <span className="hidden sm:inline">Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </div>

            {/* Archival Model Lookbook Card 01 */}
            <div
              onClick={onNavigateServices}
              className="group relative lg:col-span-1 h-[340px] sm:h-[400px] md:h-[450px] rounded-[24px] overflow-hidden border border-white/[0.12] bg-[#09090c] hover:border-white/40 transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-end hover:-translate-y-1"
            >
              <img
                src="/assets/model-1.jpg"
                alt="Editorial Streetwear"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10 p-4 sm:p-5 flex justify-start pointer-events-auto">
                <div className="px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-white/80">
                  <span>TALENT CASTING</span>
                </div>
              </div>

              {/* Title Only */}
              <div className="relative z-10 p-5 sm:p-6 mt-auto pointer-events-auto">
                <h3 className="font-display text-xl sm:text-2xl text-white font-light tracking-tight leading-snug">
                  Editorial Streetwear
                </h3>
              </div>

              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Row 2: 3 Balanced Cards (Reel + Model + Reel) Terminating at Exact Same Baseline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
            {/* Reel 01: Cafe & Culinary Atmosphere */}
            <div
              onClick={onNavigateServices}
              className="group relative h-[300px] sm:h-[350px] md:h-[380px] rounded-[22px] overflow-hidden border border-white/[0.14] bg-[#0c0c10] shadow-xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <video
                ref={(el) => {
                  videoRefs.current['reel-1'] = el
                }}
                src="/assets/reels/reel_1.mp4"
                poster="/assets/reels/reel_1_thumb.jpg"
                loop
                playsInline
                autoPlay
                muted
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Audio Toggle */}
              <div className="relative z-10 p-3.5 sm:p-4 flex justify-end pointer-events-auto">
                <button
                  onClick={(e) => toggleMute('reel-1', e)}
                  aria-label={unmutedId === 'reel-1' ? 'Mute Audio' : 'Unmute Audio'}
                  className={`apple-press w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer border ${
                    unmutedId === 'reel-1'
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-black/60 text-white border-white/20 hover:bg-white hover:text-black hover:border-white'
                  }`}
                >
                  {unmutedId === 'reel-1' ? (
                    <Volume2 className="w-3 h-3" />
                  ) : (
                    <VolumeX className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Title + Arrow */}
              <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between gap-2.5 pointer-events-auto">
                <h3 className="font-display text-lg sm:text-xl text-white font-light tracking-tight leading-snug">
                  Cafe & Culinary Atmosphere
                </h3>
                <div className="w-8 h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </div>

            {/* Model 02: Nightlife Luxe */}
            <div
              onClick={onNavigateServices}
              className="group relative h-[300px] sm:h-[350px] md:h-[380px] rounded-[22px] overflow-hidden border border-white/[0.12] bg-[#09090c] hover:border-white/40 transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-end hover:-translate-y-1"
            >
              <img
                src="/assets/model-2.jpg"
                alt="Nightlife Luxe"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Title Only */}
              <div className="relative z-10 p-4 sm:p-5 pointer-events-auto">
                <h3 className="font-display text-lg sm:text-xl text-white font-light tracking-tight leading-snug">
                  Nightlife Luxe
                </h3>
              </div>

              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Reel 02: Metropolitan Nightlife */}
            <div
              onClick={onNavigateServices}
              className="group relative h-[300px] sm:h-[350px] md:h-[380px] rounded-[22px] overflow-hidden border border-white/[0.14] bg-[#0c0c10] shadow-xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <video
                ref={(el) => {
                  videoRefs.current['reel-4'] = el
                }}
                src="/assets/reels/reel_4.mp4"
                poster="/assets/reels/reel_4_thumb.jpg"
                loop
                playsInline
                autoPlay
                muted
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Audio Toggle */}
              <div className="relative z-10 p-3.5 sm:p-4 flex justify-end pointer-events-auto">
                <button
                  onClick={(e) => toggleMute('reel-4', e)}
                  aria-label={unmutedId === 'reel-4' ? 'Mute Audio' : 'Unmute Audio'}
                  className={`apple-press w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer border ${
                    unmutedId === 'reel-4'
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-black/60 text-white border-white/20 hover:bg-white hover:text-black hover:border-white'
                  }`}
                >
                  {unmutedId === 'reel-4' ? (
                    <Volume2 className="w-3 h-3" />
                  ) : (
                    <VolumeX className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Title + Arrow */}
              <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between gap-2.5 pointer-events-auto">
                <h3 className="font-display text-lg sm:text-xl text-white font-light tracking-tight leading-snug">
                  Metropolitan Nightlife
                </h3>
                <div className="w-8 h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Below the Board: Explore Services Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onNavigateServices}
            className="apple-press group cursor-pointer inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold text-xs tracking-[0.18em] uppercase hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] hover:scale-[1.02]"
          >
            <span>Explore Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
