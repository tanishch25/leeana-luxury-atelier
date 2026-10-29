import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface StudiosPageProps {
  onOpenRequisition: (studioName?: string) => void
}

export const StudiosPage: React.FC<StudiosPageProps> = ({ onOpenRequisition }) => {
  const studioPlates = [
    {
      title: 'Haute Joaillerie Macro Bench',
      subtitle: 'Zero-Distortion Solitaire Optical Stage',
      image: '/assets/hero_jewellery_4k.jpg',
      aspect: 'col-span-12 md:col-span-7 aspect-[16/10]',
      discipline: 'Diamond Facet Capture',
    },
    {
      title: 'Fashion Cinema Soundstage',
      subtitle: 'Continuous Cyclorama & High-Speed Motion',
      image: '/assets/editorial-fashion-6.jpg',
      aspect: 'col-span-12 md:col-span-5 aspect-[4/5]',
      discipline: 'Bridal Silks & Couture',
    },
    {
      title: 'Exotic Automotive Soundstage',
      subtitle: 'Trackside Chase Arm & Studio Rim Lighting',
      image: '/assets/hero_supercar_4k.jpg',
      aspect: 'col-span-12 md:col-span-5 aspect-[4/5]',
      discipline: 'Hypercar Speedforms',
    },
    {
      title: 'Monolithic Architectural Stage',
      subtitle: 'Twilight Long-Exposure Volumetric Flights',
      image: '/assets/hero_estates_4k.jpg',
      aspect: 'col-span-12 md:col-span-7 aspect-[16/10]',
      discipline: 'Sanctuaries & Penthouses',
    },
    {
      title: 'High-Contrast Editorial Lighting Stage',
      subtitle: 'Tactile Silhouette Contours & Shadow Geometry',
      image: '/assets/editorial-fashion-4.jpg',
      aspect: 'col-span-12 md:col-span-6 aspect-[16/11]',
      discipline: 'Editorial Noir Series',
    },
    {
      title: 'Raw Silk & Bullion Wire Optics',
      subtitle: 'Tungsten Color Temperature Balancing for Zardozi',
      image: '/assets/svc-saree-Bf76VSHm.jpg',
      aspect: 'col-span-12 md:col-span-6 aspect-[16/11]',
      discipline: 'Heritage Handlooms',
    },
  ]

  return (
    <div className="pt-16 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10 text-[#f4f0ea]">
      
      {/* Tight, Aesthetic Editorial Header (One-line upright typography, pure white) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
            Soundstage Facilities
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Physical Soundstages & Optical Sets
          </h1>
        </div>
        <p className="text-white/60 text-xs sm:text-sm max-w-sm font-light leading-relaxed">
          Bangalore soundstages configured with specialized macro benches, continuous gaffer grids, and cinema camera packages.
        </p>
      </div>

      {/* Picture-First Studio Showcase (Clean imagery, zero numbers, zero clutter) */}
      <div className="grid grid-cols-12 gap-6 pt-10">
        {studioPlates.map((plate, idx) => (
          <div
            key={idx}
            onClick={() => onOpenRequisition(plate.title)}
            className={`group relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[#09090c] cursor-pointer flex flex-col justify-end p-6 sm:p-10 ${plate.aspect} shadow-2xl`}
          >
            {/* Visual Photography Layer */}
            <img
              src={plate.image}
              alt={plate.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.82] contrast-[1.08]"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            {/* Clean Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

            {/* Top Right Action Arrow */}
            <div className="absolute top-6 right-6 z-10">
              <div className="w-8 h-8 rounded-full border border-white/20 bg-black/50 backdrop-blur-md group-hover:bg-white group-hover:text-black group-hover:border-white flex items-center justify-center text-white/70 transition-all">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-1.5">
              <span className="text-[11px] text-white/60 tracking-[0.2em] uppercase font-light block">
                {plate.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                {plate.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Understated Reservation Bar */}
      <div className="mt-14 p-8 rounded-3xl border border-white/[0.08] bg-[#08080a] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-light text-white tracking-tight">
            Reserve Studio Session
          </h4>
          <p className="text-xs text-[#969188] font-light mt-1">
            Soundstage access in JP Nagar, Bengaluru. Confidential bookings for jewellery and fashion houses.
          </p>
        </div>
        <button
          onClick={() => onOpenRequisition('Studio Session Reservation')}
          className="apple-press px-8 py-3.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs uppercase tracking-[0.16em] transition-all cursor-pointer whitespace-nowrap shadow-xl"
        >
          Inquire Dates
        </button>
      </div>

    </div>
  )
}
