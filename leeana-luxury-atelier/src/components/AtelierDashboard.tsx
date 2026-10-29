import React, { useState } from 'react'
import {
  Camera,
  Film,
  Sparkles,
  Sliders,
  CheckCircle2,
  Calendar,
  Shield,
  ArrowRight,
  Eye,
  Layers,
  Zap,
} from 'lucide-react'

interface AtelierDashboardProps {
  onOpenRequisition: (customSpec?: string) => void
}

export const AtelierDashboard: React.FC<AtelierDashboardProps> = ({ onOpenRequisition }) => {
  // Specifier State
  const [selectedDiscipline, setSelectedDiscipline] = useState('Haute Joaillerie')
  const [selectedCamera, setSelectedCamera] = useState('RED V-Raptor 8K VV')
  const [selectedOptics, setSelectedOptics] = useState('100mm Macro Anamorphic')
  const [selectedLighting, setSelectedLighting] = useState('3200K Tungsten Array')
  const [selectedAspect, setSelectedAspect] = useState('2.39:1 CinemaScope')
  const [selectedLut, setSelectedLut] = useState('Atelier Noir')

  const disciplines = [
    { id: 'jewellery', name: 'Haute Joaillerie', icon: Sparkles, defaultOptics: '100mm Macro Anamorphic' },
    { id: 'fashion', name: 'Fashion Cinema', icon: Film, defaultOptics: 'Cooke Anamorphic /i Full Frame' },
    { id: 'supercars', name: 'Exotic Automotive', icon: Zap, defaultOptics: 'Tracking Chase Rig & 35mm Prime' },
    { id: 'estates', name: 'Architectural Estates', icon: Layers, defaultOptics: 'DJI Inspire 3 Raw & 18mm Ultra-Wide' },
  ]

  const cameras = [
    { name: 'RED V-Raptor 8K VV', resolution: '8192 x 4320 · 120fps', sensor: 'Full Frame VistaVision' },
    { name: 'ARRI Alexa 35', resolution: '4608 x 3164 · 120fps', sensor: 'Super 35 Native HDR' },
    { name: 'Hasselblad H6D-100c', resolution: '11600 x 8700 · Stills', sensor: '100MP Medium Format' },
  ]

  const opticsList = [
    { name: '100mm Macro Anamorphic', tag: 'Zero Distortion Solitaire Facets' },
    { name: 'Cooke Anamorphic /i Full Frame', tag: 'Classic Oval Bokeh & Warm Flare' },
    { name: 'Leitz Hugo Cinema Primes', tag: 'Surgical Micro-Contrast & Rich Blacks' },
    { name: 'Arri Master Macro 100', tag: '1:1 Reproduction Ratio Optical Glass' },
  ]

  const lightingSetups = [
    { name: '3200K Tungsten Array', desc: 'Continuous deep warmth for yellow gold, emeralds, and heritage silks' },
    { name: '5600K High-Output Daylight HMI', desc: 'Surgical diamond luminescence and crisp platinum highlights' },
    { name: 'Dynamic High-Speed Strobe Sync', desc: 'Freezing liquid velocity, diamond facet sparkles, and fabric motion' },
    { name: 'Motorized Bolt Cinebot Arm', desc: 'Repeatable high-speed camera passes with millimeter precision' },
  ]

  const aspectRatios = [
    { ratio: '2.39:1 CinemaScope', label: 'Feature Campaign' },
    { ratio: '16:9 4K UHD', label: 'Commercial Broadcast' },
    { ratio: '9:16 Vertical Cinema', label: 'Runway Reel' },
    { ratio: '4:5 Editorial', label: 'Archival Print' },
  ]

  const lutPresets: Record<string, { filter: string; desc: string }> = {
    'Atelier Noir': {
      filter: 'contrast(1.2) brightness(0.9) saturate(0.85)',
      desc: 'Deep obsidian shadows, muted warm highlights, classic European editorial contrast.',
    },
    'Kodak 2383 Print': {
      filter: 'contrast(1.15) brightness(0.95) saturate(1.1) sepia(0.12)',
      desc: 'Authentic 35mm theatrical print emulation with rich golden skin tones.',
    },
    '3200K Champagne': {
      filter: 'contrast(1.1) brightness(1.0) saturate(1.2) hue-rotate(-5deg)',
      desc: 'Luminous gold emphasis tailored for bridal silks and diamond solitares.',
    },
    'Clean Monolith': {
      filter: 'contrast(1.25) brightness(0.95) saturate(0.7)',
      desc: 'Architectural clinical precision with high micro-contrast and stark blacks.',
    },
  }

  const handleDispatchSpec = () => {
    const summary = `${selectedDiscipline} [Camera: ${selectedCamera} | Optics: ${selectedOptics} | Lighting: ${selectedLighting} | Aspect: ${selectedAspect} | Grade: ${selectedLut}]`
    onOpenRequisition(summary)
  }

  return (
    <div className="py-24 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10 text-[#f4f0ea]">
      
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#c7b299] block mb-3 font-medium">
            CREATIVE ATELIER CONSOLE
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] leading-[1.05]">
            Interactive Production <br />
            <span className="font-editorial italic font-normal text-[#c7b299]">
              Specification Dashboard.
            </span>
          </h1>
        </div>

        {/* Live Soundstage Telemetrics */}
        <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40 block font-light">
              SOUNDSTAGE ALPHA (JP NAGAR)
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-white font-medium">Operational · Closed Set</span>
            </div>
            <span className="text-[11px] text-[#c7b299] font-light">Haute Joaillerie Macro Active</span>
          </div>

          <div className="hidden sm:block w-[1px] bg-white/10" />

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40 block font-light">
              SOUNDSTAGE BETA (SOUND PROOF)
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c7b299]" />
              <span className="text-xs text-white font-medium">Available For Reservation</span>
            </div>
            <span className="text-[11px] text-white/50 font-light">RED 8K Raptor Rigged</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-start">
        
        {/* Left Column: Interactive Specification Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Step 1: Discipline Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
                01 · Select Production Discipline
              </label>
              <span className="text-xs text-[#c7b299] font-light">{selectedDiscipline}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {disciplines.map((d) => {
                const Icon = d.icon
                const isSelected = selectedDiscipline === d.name
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDiscipline(d.name)
                      setSelectedOptics(d.defaultOptics)
                    }}
                    className={`apple-press flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-white/15 border-[#c7b299] text-white shadow-xl shadow-black/60'
                        : 'bg-white/[0.02] border-white/10 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#c7b299]' : 'text-white/40'}`} />
                    <span className="text-xs font-medium tracking-tight leading-snug">{d.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Camera System */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
                02 · Primary Cinema Camera Body
              </label>
              <span className="text-xs text-[#c7b299] font-light">{selectedCamera}</span>
            </div>
            <div className="space-y-2.5">
              {cameras.map((c) => {
                const isSelected = selectedCamera === c.name
                return (
                  <div
                    key={c.name}
                    onClick={() => setSelectedCamera(c.name)}
                    className={`apple-press flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/10 border-[#c7b299] text-white'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{c.name}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{c.sensor}</div>
                    </div>
                    <span className="text-xs font-light text-[#c7b299]">{c.resolution}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step 3: Optical Glass */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
                03 · Specialized Lens Architecture
              </label>
              <span className="text-xs text-[#c7b299] font-light">{selectedOptics}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opticsList.map((o) => {
                const isSelected = selectedOptics === o.name
                return (
                  <div
                    key={o.name}
                    onClick={() => setSelectedOptics(o.name)}
                    className={`apple-press p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/10 border-[#c7b299] text-white'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-white">{o.name}</div>
                    <div className="text-[10px] text-white/40 mt-1">{o.tag}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step 4: Soundstage Lighting & Rigging */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
                04 · Lighting & Soundstage Gaffer Grid
              </label>
              <span className="text-xs text-[#c7b299] font-light">{selectedLighting}</span>
            </div>
            <div className="space-y-2.5">
              {lightingSetups.map((l) => {
                const isSelected = selectedLighting === l.name
                return (
                  <div
                    key={l.name}
                    onClick={() => setSelectedLighting(l.name)}
                    className={`apple-press flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/10 border-[#c7b299] text-white'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#c7b299]' : 'text-white/20'}`} />
                    <div>
                      <div className="text-xs font-medium text-white">{l.name}</div>
                      <div className="text-[11px] text-white/40 mt-0.5 font-light">{l.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step 5: Aspect Ratio */}
          <div className="space-y-4">
            <label className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 block">
              05 · Master Aspect Ratio & Delivery
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {aspectRatios.map((a) => {
                const isSelected = selectedAspect === a.ratio
                return (
                  <button
                    key={a.ratio}
                    onClick={() => setSelectedAspect(a.ratio)}
                    className={`apple-press p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-white/15 border-[#c7b299] text-white'
                        : 'bg-white/[0.02] border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{a.ratio}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{a.label}</div>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Dossier Preview & Color Grade Visualizer (5 cols) */}
        <div className="lg:col-span-5 sticky top-32 space-y-6">
          
          {/* Live Lookbook Color Grade Switcher */}
          <div className="rounded-3xl border border-white/[0.12] bg-[#09090c] p-6 shadow-2xl overflow-hidden space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium tracking-widest text-[#c7b299] uppercase">
                LIVE COLOR GRADE PREVIEW
              </span>
              <span className="text-[10px] text-white/40 uppercase">35mm Film LUT</span>
            </div>

            {/* Preview Frame with live CSS filter */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black">
              <img
                src={
                  selectedDiscipline === 'Haute Joaillerie'
                    ? '/assets/hero_jewellery_4k.jpg'
                    : selectedDiscipline === 'Fashion Cinema'
                    ? '/assets/editorial-fashion-6.jpg'
                    : selectedDiscipline === 'Exotic Automotive'
                    ? '/assets/hero_supercar_4k.jpg'
                    : '/assets/hero_estates_4k.jpg'
                }
                alt="Color Grade Preview"
                className="w-full h-full object-cover transition-all duration-700"
                style={{
                  filter: lutPresets[selectedLut]?.filter || 'none',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] tracking-wider text-[#c7b299] uppercase border border-white/10">
                {selectedLut}
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] tracking-wider text-white/70 font-mono border border-white/10">
                {selectedAspect}
              </div>
            </div>

            {/* LUT Preset Switcher Buttons */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(lutPresets).map((lutName) => (
                  <button
                    key={lutName}
                    onClick={() => setSelectedLut(lutName)}
                    className={`apple-press px-3 py-2 rounded-lg text-[11px] font-medium text-left border transition-all ${
                      selectedLut === lutName
                        ? 'bg-[#c7b299] text-black font-semibold border-[#c7b299]'
                        : 'bg-white/[0.04] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {lutName}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#969188] font-light leading-relaxed pt-1">
                {lutPresets[selectedLut]?.desc}
              </p>
            </div>
          </div>

          {/* Specification Summary Card */}
          <div className="rounded-3xl border border-white/[0.12] bg-[#09090c] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <span className="text-[10px] font-medium tracking-widest text-[#c7b299] uppercase block mb-1">
                ATELIER SPECIFICATION DOSSIER
              </span>
              <h3 className="text-2xl font-light text-white tracking-tight">
                {selectedDiscipline} Production
              </h3>
            </div>

            <div className="space-y-3 text-xs border-y border-white/[0.08] py-4">
              <div className="flex justify-between">
                <span className="text-white/40">Camera Body:</span>
                <span className="text-white font-medium">{selectedCamera}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Optics:</span>
                <span className="text-white font-medium">{selectedOptics}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Gaffer Rig:</span>
                <span className="text-white font-medium">{selectedLighting}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Master Delivery:</span>
                <span className="text-white font-medium">{selectedAspect}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Color Science:</span>
                <span className="text-[#c7b299] font-medium">{selectedLut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Confidentiality:</span>
                <span className="text-white font-medium">Tier 1 Strict NDA Included</span>
              </div>
            </div>

            {/* Dispatch Action */}
            <button
              onClick={handleDispatchSpec}
              className="apple-press w-full py-4 rounded-full bg-[#c7b299] hover:bg-white text-black text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-[#c7b299]/30"
            >
              <span>Dispatch Production Requisition</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[10px] text-white/40 uppercase tracking-wider pt-1">
              <span>SOUNDSTAGE RESERVATIONS: 48H RESPONSE</span>
              <span>JP NAGAR ATELIER</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
