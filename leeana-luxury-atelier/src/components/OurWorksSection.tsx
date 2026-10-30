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
    <section id="our-works" className="relative w-full py-20 md:py-28 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto z-10 text-white scroll-mt-36">
      {/* Creative Works Board Frame with Authentic Graffiti Brick Wall Texture */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="rounded-[32px] sm:rounded-[38px] border border-white/[0.16] bg-[#07070b] relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.95)] p-4 sm:p-9 md:p-10 space-y-5 sm:space-y-7 group/board"
        style={{
          backgroundImage: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
      >
        {/* Background Graffiti Brick Wall & Concrete Canvas */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Authentic User-Provided High-Impact Graffiti Brick Wall Artwork */}
          <img
            src="/assets/graffiti_brick_wall.jpg"
            alt="Atelier Graffiti Brick Wall"
            className="w-full h-full object-cover object-center filter contrast-[1.18] brightness-[0.88] saturate-[1.25] opacity-85 scale-105 transition-transform duration-1000 group-hover/board:scale-100"
          />

          {/* Tactile Masonry Grain & Mortar Grid Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)',
              backgroundSize: '16px 16px, 32px 32px',
            }}
          />

          {/* Seamless Edge Blending & Atmospheric Shadow Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060609]/75 via-[#060609]/30 to-[#060609]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#060609_92%)]" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(4,4,7,0.85)]" />
        </div>

        {/* Top hairline highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Header Bar — Highly Visible Heading on Wall Canvas */}
        <div className="relative z-20 pb-5 border-b border-white/[0.12]">
          <div className="space-y-1.5 inline-block px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.08]">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Our Works
            </h2>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              A curated soundstage archive uniting high-fashion casting, cinematic motion choreography, and luxury brand narratives.
            </p>
          </div>
        </div>

        {/* DESKTOP LAYOUT: Master Asymmetric Soundstage Bento Grid (Preserved 100% Unchanged) */}
        <div className="hidden sm:block space-y-3 sm:space-y-3.5">
          {/* Row 1: Large Cinema Soundstage Feature (2 cols) + Archival Model Card (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-3.5">
            {/* Feature Master Cinema Card with Smooth Filmic Edge Fade */}
            <div
              onClick={onNavigateServices}
              className="group relative lg:col-span-2 h-[340px] sm:h-[400px] md:h-[450px] rounded-[24px] overflow-hidden border border-white/[0.14] bg-[#060609] shadow-2xl transition-all duration-500 hover:border-white/45 cursor-pointer flex flex-col justify-between"
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
              
              {/* Refined Cinematic Fade Atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/45 via-35% to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050508]/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(5,5,8,0.75)] pointer-events-none" />

              {/* Top Controls: Soundwave Visualizer + Audio Toggle (No text badges) */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-end gap-2.5 pointer-events-auto">
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

              {/* Bottom Feature Details: Title + Arrow */}
              <div className="relative z-10 p-5 sm:p-6 flex items-end justify-between gap-4 pointer-events-auto">
                <h3 className="font-display text-2xl sm:text-3xl text-white font-light tracking-tight leading-snug">
                  Haute Couture Soundstage
                </h3>

                <div className="w-9 h-9 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </div>

            {/* Archival Model Lookbook Card 01 with Soft Filmic Fade */}
            <div
              onClick={onNavigateServices}
              className="group relative lg:col-span-1 h-[340px] sm:h-[400px] md:h-[450px] rounded-[24px] overflow-hidden border border-white/[0.12] bg-[#060609] hover:border-white/40 transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-end hover:-translate-y-1"
            >
              <img
                src="/assets/model-1.jpg"
                alt="Editorial Streetwear"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,5,8,0.7)] pointer-events-none" />

              {/* Title Only (No top badges, no arrows) */}
              <div className="relative z-10 p-5 sm:p-6 pointer-events-auto">
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
              className="group relative h-[300px] sm:h-[350px] md:h-[380px] rounded-[22px] overflow-hidden border border-white/[0.14] bg-[#060609] shadow-xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,5,8,0.65)] pointer-events-none" />

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
              className="group relative h-[300px] sm:h-[350px] md:h-[380px] rounded-[22px] overflow-hidden border border-white/[0.12] bg-[#060609] hover:border-white/40 transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-end hover:-translate-y-1"
            >
              <img
                src="/assets/model-2.jpg"
                alt="Nightlife Luxe"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,5,8,0.65)] pointer-events-none" />

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
              className="group relative h-[300px] sm:h-[350px] md:h-[380px] rounded-[22px] overflow-hidden border border-white/[0.14] bg-[#060609] shadow-xl transition-all duration-500 hover:border-white/45 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(5,5,8,0.65)] pointer-events-none" />

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

        {/* MOBILE-SPECIFIC LAYOUT: Balanced Photo & Cinema Bento (Tailored Mobile Proportions) */}
        <div className="block sm:hidden space-y-2.5">
          {/* Card 1: Widescreen Feature Cinema Reel */}
          <div
            onClick={onNavigateServices}
            className="group relative h-[210px] rounded-[20px] overflow-hidden border border-white/[0.14] bg-[#060609] shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <video
              ref={(el) => {
                videoRefs.current['feature-reel-mobile'] = el
              }}
              src="/assets/reels/reel_3.mp4"
              poster="/assets/reels/reel_3_thumb.jpg"
              loop
              playsInline
              autoPlay
              muted
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/45 via-35% to-transparent pointer-events-none" />

            {/* Top Audio Toggle */}
            <div className="relative z-10 p-3.5 flex justify-end pointer-events-auto">
              <button
                onClick={(e) => toggleMute('feature-reel-mobile', e)}
                aria-label={unmutedId === 'feature-reel-mobile' ? 'Mute Audio' : 'Unmute Audio'}
                className={`apple-press w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer border ${
                  unmutedId === 'feature-reel-mobile'
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-black/60 text-white border-white/20'
                }`}
              >
                {unmutedId === 'feature-reel-mobile' ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <VolumeX className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Bottom Title + Arrow */}
            <div className="relative z-10 p-4 flex items-end justify-between gap-3 pointer-events-auto">
              <h3 className="font-display text-lg text-white font-light tracking-tight leading-snug">
                Haute Couture Soundstage
              </h3>
              <div className="w-7 h-7 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* 2-Column Mobile Photo & Video Grid: 1 Model Photo + 1 Video Reel on each row */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Card 2: Model Photo (Editorial Streetwear) */}
            <div
              onClick={onNavigateServices}
              className="group relative aspect-[3/4] rounded-[18px] overflow-hidden border border-white/[0.12] bg-[#060609] shadow-lg cursor-pointer flex flex-col justify-end"
            >
              <img
                src="/assets/model-1.jpg"
                alt="Editorial Streetwear"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="relative z-10 p-3 pointer-events-auto">
                <h3 className="font-display text-sm text-white font-light tracking-tight leading-snug">
                  Editorial Streetwear
                </h3>
              </div>
            </div>

            {/* Card 3: Video Reel (Cafe & Culinary Atmosphere) */}
            <div
              onClick={onNavigateServices}
              className="group relative aspect-[3/4] rounded-[18px] overflow-hidden border border-white/[0.14] bg-[#060609] shadow-lg cursor-pointer flex flex-col justify-between"
            >
              <video
                ref={(el) => {
                  videoRefs.current['reel-1-mobile'] = el
                }}
                src="/assets/reels/reel_1.mp4"
                poster="/assets/reels/reel_1_thumb.jpg"
                loop
                playsInline
                autoPlay
                muted
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="relative z-10 p-2.5 flex justify-end pointer-events-auto">
                <button
                  onClick={(e) => toggleMute('reel-1-mobile', e)}
                  aria-label={unmutedId === 'reel-1-mobile' ? 'Mute Audio' : 'Unmute Audio'}
                  className={`apple-press w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer border ${
                    unmutedId === 'reel-1-mobile'
                      ? 'bg-white text-black border-white'
                      : 'bg-black/60 text-white border-white/20'
                  }`}
                >
                  {unmutedId === 'reel-1-mobile' ? (
                    <Volume2 className="w-2.5 h-2.5" />
                  ) : (
                    <VolumeX className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
              <div className="relative z-10 p-3 flex items-end justify-between gap-1 pointer-events-auto">
                <h3 className="font-display text-sm text-white font-light tracking-tight leading-snug">
                  Cafe & Culinary
                </h3>
                <ArrowUpRight className="w-3 h-3 text-white/70 shrink-0" />
              </div>
            </div>

            {/* Card 4: Model Photo (Nightlife Luxe) */}
            <div
              onClick={onNavigateServices}
              className="group relative aspect-[3/4] rounded-[18px] overflow-hidden border border-white/[0.12] bg-[#060609] shadow-lg cursor-pointer flex flex-col justify-end"
            >
              <img
                src="/assets/model-2.jpg"
                alt="Nightlife Luxe"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="relative z-10 p-3 pointer-events-auto">
                <h3 className="font-display text-sm text-white font-light tracking-tight leading-snug">
                  Nightlife Luxe
                </h3>
              </div>
            </div>

            {/* Card 5: Video Reel (Metropolitan Nightlife) */}
            <div
              onClick={onNavigateServices}
              className="group relative aspect-[3/4] rounded-[18px] overflow-hidden border border-white/[0.14] bg-[#060609] shadow-lg cursor-pointer flex flex-col justify-between"
            >
              <video
                ref={(el) => {
                  videoRefs.current['reel-4-mobile'] = el
                }}
                src="/assets/reels/reel_4.mp4"
                poster="/assets/reels/reel_4_thumb.jpg"
                loop
                playsInline
                autoPlay
                muted
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[1.08] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 via-35% to-transparent pointer-events-none" />
              <div className="relative z-10 p-2.5 flex justify-end pointer-events-auto">
                <button
                  onClick={(e) => toggleMute('reel-4-mobile', e)}
                  aria-label={unmutedId === 'reel-4-mobile' ? 'Mute Audio' : 'Unmute Audio'}
                  className={`apple-press w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer border ${
                    unmutedId === 'reel-4-mobile'
                      ? 'bg-white text-black border-white'
                      : 'bg-black/60 text-white border-white/20'
                  }`}
                >
                  {unmutedId === 'reel-4-mobile' ? (
                    <Volume2 className="w-2.5 h-2.5" />
                  ) : (
                    <VolumeX className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
              <div className="relative z-10 p-3 flex items-end justify-between gap-1 pointer-events-auto">
                <h3 className="font-display text-sm text-white font-light tracking-tight leading-snug">
                  Metropolitan
                </h3>
                <ArrowUpRight className="w-3 h-3 text-white/70 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Below the Board: Explore Button (Highly Visible, High Contrast) */}
        <div className="relative z-30 flex justify-center pt-6 pb-2">
          <button
            onClick={onNavigateServices}
            className="apple-press group cursor-pointer inline-flex items-center gap-3.5 px-9 sm:px-12 py-4 sm:py-4.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase hover:bg-white/95 transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95"
          >
            <span>Explore Services</span>
            <ArrowUpRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
