import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Compass, Play, Pause, ShieldCheck, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  onOpenRequisition: () => void
}

interface CampaignFilm {
  id: string
  label: string
  title: string
  subtitle: string
  videoSrc: string
  gifFallback: string
  camera: string
  optics: string
  lighting: string
  location: string
}

const CAMPAIGNS: CampaignFilm[] = [
  {
    id: '01',
    label: 'HAUTE JOAILLERIE',
    title: 'Solitaire Luminescence & Macro Cinema',
    subtitle: 'Zero chromatic aberration macro capture for fine jewellery, revealing true diamond facet dispersion under calibrated cinema optics.',
    videoSrc: '/assets/hero-jewellery.mp4',
    gifFallback: '/assets/hero-jewellery.gif',
    camera: 'RED V-Raptor 8K VV',
    optics: '100mm Anamorphic Macro Prime',
    lighting: 'Aputure 1200d & Polarized Diffusion',
    location: 'Soundstage 01 // JP Nagar',
  },
  {
    id: '02',
    label: 'EDITORIAL COUTURE',
    title: 'Bridal Silk & Haute Couture Narratives',
    subtitle: 'High-concept fashion commercial films celebrating Indian heritage handlooms, pure zari craftsmanship, and international runway style.',
    videoSrc: '/assets/hero-couture.mp4',
    gifFallback: '/assets/hero-couture.gif',
    camera: 'ARRI Alexa Mini LF',
    optics: 'Cooke Anamorphic /i 50mm Prime',
    lighting: 'Single 2.5K HMI Fresnel Softbox',
    location: 'Bangalore Studio Stage // Studio A',
  },
  {
    id: '03',
    label: 'EXOTIC MARQUES',
    title: 'Supercar Fleet & Velocity Allocations',
    subtitle: 'Private acquisition pipelines and white-glove doorstep delivery for the world’s most sought-after performance marques and limited series.',
    videoSrc: '/assets/hero-supercar.mp4',
    gifFallback: '/assets/hero-supercar.gif',
    camera: 'DJI Ronin 4D 8K Cinema Gimbal',
    optics: 'DL 35mm F2.8 LS ASPH',
    lighting: 'Twilight Showroom Specular Bounce',
    location: 'Private Fleet Vault // Bangalore',
  },
  {
    id: '04',
    label: 'MONOLITHIC ESTATES',
    title: 'Architectural Sanctuaries & Penthouses',
    subtitle: 'Discreet developer allocations and off-market viewings for prime architectural monoliths, hill sanctuaries, and private collector homes.',
    videoSrc: '/assets/hero-estates.mp4',
    gifFallback: '/assets/hero-estates.gif',
    camera: 'Canon C500 Mark II 5.9K',
    optics: 'Canon Cinema Prime 24mm T1.5',
    lighting: 'Natural Dusk & Warm Interior Illuminants',
    location: 'Confidential Estates // South India',
  },
]

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRequisition }) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isCrossfading, setIsCrossfading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const current = CAMPAIGNS[activeIdx]

  // Track video progress or run timer
  useEffect(() => {
    setProgress(0)
    let animationFrameId: number
    const startTime = performance.now()
    const duration = 7000 // 7 seconds per slide

    const updateLoop = (now: number) => {
      if (!isPlaying) {
        animationFrameId = requestAnimationFrame(updateLoop)
        return
      }

      const elapsed = now - startTime
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)

      if (elapsed >= duration) {
        handleSelectSlide((activeIdx + 1) % CAMPAIGNS.length)
      } else {
        animationFrameId = requestAnimationFrame(updateLoop)
      }
    }

    animationFrameId = requestAnimationFrame(updateLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [activeIdx, isPlaying])

  const handleSelectSlide = (idx: number) => {
    if (idx === activeIdx) return
    setIsCrossfading(true)
    setTimeout(() => {
      setActiveIdx(idx)
      setIsCrossfading(false)
    }, 220)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 md:px-14 max-w-[1520px] mx-auto z-10">
      
      {/* 1. Monumental Central Hero Title */}
      <div className="text-center pt-8 pb-10 space-y-5 max-w-5xl mx-auto">
        
        {/* Subtle Top Kicker */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c7b299] animate-pulse" />
          <span className="text-[10px] font-light tracking-[0.28em] text-[#c7b299] uppercase">
            Commercial Visual Soundstage & Private Concierge
          </span>
        </div>

        {/* Central Display Title: Italiana + Bodoni Moda Italic */}
        <h1 className="font-couture text-5xl sm:text-7xl lg:text-[6.2rem] tracking-tight leading-[0.93] text-[#f4f0ea]">
          Haute Production <br />
          <span className="font-editorial italic font-normal text-[#c7b299] text-5xl sm:text-7xl lg:text-[6.5rem]">
            & Rare Acquisitions
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#969188] font-light max-w-2xl mx-auto leading-relaxed pt-1">
          A dedicated Bangalore cinema atelier crafting 4K commercial films for fine jewellery and luxury maisons, paired with a discreet white-glove concierge for ultra-exclusive private acquisitions.
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <a
            href="#atelier"
            className="apple-press px-8 py-3.5 rounded-full bg-[#f4f0ea] text-[#060608] text-xs font-medium tracking-[0.16em] uppercase hover:bg-[#c7b299] transition-colors flex items-center gap-2.5 shadow-xl shadow-black/50"
          >
            <span>Enter The Soundstage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenRequisition}
            className="apple-press px-8 py-3.5 rounded-full border border-white/[0.15] text-xs font-light tracking-[0.16em] uppercase text-[#f4f0ea] hover:border-[#c7b299] hover:text-[#c7b299] transition-all flex items-center gap-2.5 bg-white/[0.02] backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-[#c7b299]" />
            <span>Private Patron Dossier</span>
          </button>
        </div>

      </div>

      {/* 2. THE ANAMORPHIC CINEMA THEATER: Full-Width Expansive Video Stage */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-[#07070a] shadow-2xl shadow-black/95 aspect-[16/10] sm:aspect-[21/9] group">
        
        {/* Running Video Container with Smooth Emil Kowalski Crossfade */}
        <div
          className={`w-full h-full relative transition-all duration-300 ease-out ${
            isCrossfading ? 'opacity-30 filter blur-sm scale-[0.99]' : 'opacity-100 filter blur-0 scale-100'
          }`}
        >
          <video
            ref={videoRef}
            key={current.videoSrc}
            src={current.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.12]"
          />
          {/* Instant GIF Fallback */}
          <img
            src={current.gifFallback}
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-10"
          />
        </div>

        {/* Cinematic Anamorphic Letterbox Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/60 pointer-events-none" />

        {/* Top Hud: Soundstage Metadata & Live REC Status */}
        <div className="absolute top-6 sm:top-8 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between pointer-events-none z-20">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-red-500/30 text-[10px] font-mono tracking-wider text-red-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>REC // 8K RAW</span>
            </span>
            <span className="text-[11px] font-mono text-white/50 hidden md:inline-block tracking-widest">
              24.000 FPS • PRORES 4444 XQ
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono text-[#c7b299] tracking-widest uppercase">
            <span>{current.location}</span>
            <span className="text-white/20">|</span>
            <span className="text-white/70">PROD REEL 0{activeIdx + 1}</span>
          </div>

        </div>

        {/* Bottom Left: Title & Cinema Specs Overlay */}
        <div className="absolute bottom-24 sm:bottom-20 left-6 sm:left-10 max-w-xl pointer-events-none z-20 space-y-2">
          <span className="text-[10px] font-light tracking-[0.25em] uppercase text-[#c7b299] block">
            {current.label} // 0{activeIdx + 1}
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl text-white tracking-wide">
            {current.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#d1ccc3]/80 font-light leading-relaxed hidden sm:block">
            {current.subtitle}
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-4 text-[10px] sm:text-[11px] font-mono text-[#c7b299]/90 tracking-wider">
            <span>CAM: {current.camera}</span>
            <span>•</span>
            <span>OPTICS: {current.optics}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">RIG: {current.lighting}</span>
          </div>
        </div>

        {/* Bottom Floating Apple-Style Scrubber Dock */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 flex items-center justify-between z-30 pointer-events-auto">
          
          {/* Glass Dock with Tabs & Live Progress */}
          <div className="flex-1 max-w-3xl flex items-center gap-2 sm:gap-3 p-1.5 rounded-full bg-black/70 backdrop-blur-2xl border border-white/[0.14] shadow-2xl">
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="apple-press w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 flex items-center justify-center text-white transition-colors flex-none"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* 4 Interactive Film Strip Tabs with Progress Bars */}
            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {CAMPAIGNS.map((camp, idx) => (
                <button
                  key={camp.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`apple-press relative py-1.5 px-2.5 rounded-full text-left transition-all overflow-hidden ${
                    activeIdx === idx
                      ? 'bg-white/[0.12] text-white'
                      : 'hover:bg-white/[0.05] text-[#969188] hover:text-white'
                  }`}
                >
                  {/* Active Progress Bar Fill */}
                  {activeIdx === idx && (
                    <div
                      className="absolute inset-0 bg-[#c7b299]/20 -z-10 transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}

                  <div className="flex items-center justify-between text-[10px] tracking-wider uppercase font-light">
                    <span className="truncate">{camp.label.split(' ')[0]}</span>
                    <span className="text-[9px] font-mono text-[#c7b299] ml-1">0{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Right Direct Commission Trigger */}
          <button
            onClick={onOpenRequisition}
            className="apple-press hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#c7b299] text-[#060608] text-xs font-medium tracking-[0.14em] uppercase hover:bg-white transition-colors ml-4 flex-none shadow-lg"
          >
            <span>Commission Shoot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* 3. Bottom Architectural Metrics (Cartier / Apple Quiet Restraint) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/[0.07] text-[#969188]">
        <div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 block mb-1">
            01 // SOUNDSTAGE SPEC
          </span>
          <p className="text-xs font-light text-[#f4f0ea]">3,500 sq.ft Cyclorama & Optical Bench</p>
        </div>
        <div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 block mb-1">
            02 // CINEMA CAMERAS
          </span>
          <p className="text-xs font-light text-[#f4f0ea]">RED V-Raptor 8K & ARRI Mini LF</p>
        </div>
        <div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 block mb-1">
            03 // CONCIERGE ACCESS
          </span>
          <p className="text-xs font-light text-[#f4f0ea]">Off-Market Marques & Estates</p>
        </div>
        <div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 block mb-1">
            04 // STUDIO LOCATION
          </span>
          <p className="text-xs font-light text-[#f4f0ea]">JP Nagar, Bangalore, India</p>
        </div>
      </div>

    </section>
  )
}
