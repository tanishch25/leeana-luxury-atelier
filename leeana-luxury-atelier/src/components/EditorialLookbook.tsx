import React, { useState } from 'react'
import { X, Maximize2, Aperture, Camera, Film } from 'lucide-react'

interface LookbookFrame {
  id: string
  title: string
  client: string
  series: string
  image: string
  aspect: string
  camera: string
  optics: string
  lighting: string
}

export const EditorialLookbook: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<LookbookFrame | null>(null)

  const frames: LookbookFrame[] = [
    {
      id: '01',
      title: 'Haute Joaillerie Solitaire',
      client: 'Heritage Jewellers Bangalore',
      series: 'Macro Optical Campaign',
      image: '/assets/svc-jewellery-BcB-GXPd.jpg',
      aspect: 'col-span-12 md:col-span-7 aspect-[16/11]',
      camera: 'RED V-Raptor 8K VV',
      optics: 'Laowa 24mm Pro2be & 100mm Macro Anamorphic',
      lighting: 'Aputure 1200d with Chimera Lantern & Polarizing Gels',
    },
    {
      id: '02',
      title: 'Nocturnal Atelier Silhouette',
      client: 'Editorial Couture Portfolio',
      series: 'High Fashion Studio Series',
      image: '/assets/editorial-fashion-1.jpg',
      aspect: 'col-span-12 md:col-span-5 aspect-[4/5]',
      camera: 'ARRI Alexa Mini LF',
      optics: 'Cooke Anamorphic /i Full Frame Plus 50mm',
      lighting: 'Single Source 2.5K HMI Fresnel Through Silk Diffusion',
    },
    {
      id: '03',
      title: 'Kanjivaram Silk Narrative',
      client: 'Bangalore Bridal Loom Heritage',
      series: 'Documentary Weaves Campaign',
      image: '/assets/svc-saree-Bf76VSHm.jpg',
      aspect: 'col-span-12 md:col-span-5 aspect-[4/5]',
      camera: 'Sony FX9 Full Frame Cinema',
      optics: 'Zeiss Supreme Prime 35mm T1.5',
      lighting: 'Kinoflo Freestyle 31 Warm Daylight 5600K',
    },
    {
      id: '04',
      title: 'The Modern Monolith',
      client: 'Private Concierge Lookbook',
      series: 'Haute Editorial Portraiture',
      image: '/assets/editorial-fashion-4.jpg',
      aspect: 'col-span-12 md:col-span-7 aspect-[16/11]',
      camera: 'Hasselblad H6D-100c Medium Format',
      optics: 'HC 2.2/100mm Prime',
      lighting: 'Profoto Pro-11 2400 AirTTL with 5ft Octa Softbox',
    },
    {
      id: '05',
      title: 'Velocity & Fine Alloy',
      client: 'Marque Concierge Archive',
      series: 'Supercar Acquisition Reel',
      image: '/assets/svc-cars-BFdPfwO2.jpg',
      aspect: 'col-span-12 md:col-span-6 aspect-[16/10]',
      camera: 'DJI Ronin 4D 8K Cinema Gimbal',
      optics: 'DL 35mm F2.8 LS ASPH',
      lighting: 'Dynamic Twilight Golden Hour Natural Fill',
    },
    {
      id: '06',
      title: 'Sanctuary Architecture',
      client: 'Private Bangalore Estate',
      series: 'Architectural Monograph',
      image: '/assets/svc-homes-BDNBbpTG.jpg',
      aspect: 'col-span-12 md:col-span-6 aspect-[16/10]',
      camera: 'Canon C500 Mark II 5.9K',
      optics: 'Canon Cinema Prime 24mm T1.5',
      lighting: 'Architectural Ambient Balancing with 800W HMI bounce',
    },
  ]

  return (
    <section id="editorial" className="py-32 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto relative z-10 border-t border-white/[0.07]">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16">
        <div>
          <span className="text-[11px] font-light tracking-[0.25em] text-[#c7b299] uppercase block mb-3">
            // EDITORIAL ARCHIVE & LOOKBOOK
          </span>
          <h2 className="font-couture text-4xl sm:text-6xl tracking-tight text-[#f4f0ea]">
            Captured Frames. <br />
            <span className="font-editorial italic font-normal text-[#c7b299]">
              Visual Direction Under Soundstage Glass.
            </span>
          </h2>
        </div>
        <p className="text-[#969188] text-sm max-w-md font-light leading-relaxed">
          A curated selection of commercial campaign reels, high-fashion editorials, and private acquisitions photographed inside our JP Nagar soundstage and on location.
        </p>
      </div>

      {/* Asymmetric Museum Gallery Grid */}
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {frames.map((frame) => (
          <div
            key={frame.id}
            onClick={() => setSelectedFrame(frame)}
            className={`apple-press group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#c7b299]/50 transition-all duration-700 cursor-pointer bg-[#09090c] ${frame.aspect}`}
          >
            <img
              src={frame.image}
              alt={frame.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.74] contrast-[1.08]"
            />
            
            {/* Atmospheric Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/95 via-[#060608]/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Top Plate Number */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] text-white/50 uppercase font-light">
              <span>PLATE // {frame.id}</span>
              <span className="text-[#c7b299] font-light">{frame.series}</span>
            </div>

            {/* Bottom Caption and Specs */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-light tracking-[0.2em] text-[#c7b299] uppercase block">
                  {frame.client}
                </span>
                <h3 className="font-editorial text-2xl text-white tracking-wide">
                  {frame.title}
                </h3>
                <p className="text-[11px] text-white/60 pt-1 hidden sm:block font-light">
                  {frame.camera} • {frame.optics.split('&')[0]}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full border border-white/20 flex-none flex items-center justify-center text-white/60 group-hover:text-[#060608] group-hover:bg-[#c7b299] group-hover:border-[#c7b299] transition-all">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Museum Lightbox Modal with Technical Dossier */}
      {selectedFrame && (
        <div
          onClick={() => setSelectedFrame(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#08080a] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFrame(null)}
              className="apple-press absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Viewport */}
            <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[340px]">
              <img
                src={selectedFrame.image}
                alt={selectedFrame.title}
                className="max-h-[60vh] md:max-h-[85vh] w-full object-contain"
              />
            </div>

            {/* Technical Metadata Dossier */}
            <div className="md:w-2/5 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c7b299]" />
                  <span className="text-[10px] tracking-widest text-[#c7b299] uppercase font-light">
                    SOUNDSTAGE CAMPAIGN DOSSIER
                  </span>
                </div>

                <h3 className="font-editorial text-2xl uppercase text-white">
                  {selectedFrame.title}
                </h3>

                <p className="text-xs text-[#969188] font-light leading-relaxed">
                  Commissioned by {selectedFrame.client}. Visual production crafted with custom anamorphic optics and calibrated lighting setups for high-fashion fidelity.
                </p>
              </div>

              {/* Technical Optics Grid */}
              <div className="space-y-4 border-t border-white/10 pt-6 text-xs text-[#969188]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white text-[11px] uppercase font-light">
                    <Camera className="w-3.5 h-3.5 text-[#c7b299]" />
                    <span>Cinema Camera</span>
                  </div>
                  <p className="font-light text-[#f4f0ea] pl-5.5">{selectedFrame.camera}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white text-[11px] uppercase font-light">
                    <Aperture className="w-3.5 h-3.5 text-[#c7b299]" />
                    <span>Optics & Primes</span>
                  </div>
                  <p className="font-light text-[#f4f0ea] pl-5.5">{selectedFrame.optics}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white text-[11px] uppercase font-light">
                    <Film className="w-3.5 h-3.5 text-[#c7b299]" />
                    <span>Gaffer & Lighting Rig</span>
                  </div>
                  <p className="font-light text-[#f4f0ea] pl-5.5">{selectedFrame.lighting}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-light">
                  BANGALORE SOUNDSTAGE ARCHIVE // CONFIDENTIAL
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
