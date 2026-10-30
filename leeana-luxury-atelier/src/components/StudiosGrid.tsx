import React from 'react'
import { ArrowUpRight, Gem, Film, Car, Building2 } from 'lucide-react'

interface StudiosGridProps {
  onSelectStudio: (title: string) => void
}

export const StudiosGrid: React.FC<StudiosGridProps> = ({ onSelectStudio }) => {
  const studios = [
    {
      id: '01',
      title: 'Image Studio',
      discipline: 'Haute Joaillerie Macro Optics',
      description: 'Zero chromatic distortion macro capture revealing the internal faceting and luminescence of solitaires, rare emeralds, and platinum.',
      image: '/assets/hero_jewellery_4k.jpg',
      icon: Gem,
      aspect: 'md:col-span-7 aspect-[16/10]',
      specs: '100mm Anamorphic Macro · 3200K Tungsten Gaffer',
    },
    {
      id: '02',
      title: 'Motion Studio',
      discipline: 'Fashion Cinema & Bridal Silks',
      description: 'Cinema campaigns celebrating Indian heritage handlooms, bridal couture drapes, and high-fashion editorial films.',
      image: '/assets/editorial-fashion-6.jpg',
      icon: Film,
      aspect: 'md:col-span-5 aspect-[4/5]',
      specs: 'RED V-Raptor 8K · Studio Soundstage',
    },
    {
      id: '03',
      title: 'Concierge Studio',
      discipline: 'Exotic Marques & Velocity',
      description: 'Direct allocation pipelines and white-glove doorstep delivery for performance supercars and rare automotive marques.',
      image: '/assets/hero_supercar_4k.jpg',
      icon: Car,
      aspect: 'md:col-span-5 aspect-[4/5]',
      specs: 'Private Fleet Logistics · Provenance Checked',
    },
    {
      id: '04',
      title: 'Estates Studio',
      discipline: 'Architectural Monoliths & Sanctuaries',
      description: 'Private viewings and developer connections for prime architectural penthouses, estates, and secluded luxury retreats.',
      image: '/assets/hero_estates_4k.jpg',
      icon: Building2,
      aspect: 'md:col-span-7 aspect-[16/10]',
      specs: 'Off-Market Sourcing · Bangalore & Global',
    },
  ]

  return (
    <section id="studios" className="py-12 sm:py-24 md:py-40 px-4 sm:px-12 md:px-16 max-w-7xl mx-auto relative z-10 border-b border-white/[0.06]">
      
      {/* Header (Subtitle removed, upright non-cursive typography, all white) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
            Discipline & Infrastructure
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Strategic Creative Studios
          </h2>
        </div>
        <p className="text-white/60 text-xs sm:text-sm max-w-md font-light leading-relaxed">
          From soundstage cinema cameras and macro lighting benches to off-market acquisitions, each studio operates with uncompromising precision.
        </p>
      </div>

      {/* Asymmetrical Studio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10">
        {studios.map((st) => {
          return (
            <div
              key={st.id}
              onClick={() => onSelectStudio(st.title + ' - ' + st.discipline)}
              className={`apple-press group relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[#09090c] cursor-pointer flex flex-col justify-end p-8 md:p-12 ${st.aspect}`}
            >
              {/* Image with Zoom on Hover */}
              <img
                src={st.image}
                alt={st.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.82] contrast-[1.08]"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Top Action Arrow */}
              <div className="absolute top-8 right-8 z-10">
                <div className="w-9 h-9 rounded-full border border-white/20 bg-black/50 backdrop-blur-md group-hover:border-white group-hover:bg-white flex items-center justify-center text-white/70 group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] text-white/60 tracking-[0.2em] uppercase font-light block">
                  {st.discipline}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#d1ccc3]/80 font-light max-w-lg leading-relaxed line-clamp-2">
                  {st.description}
                </p>
              </div>

            </div>
          )
        })}
      </div>

    </section>
  )
}
