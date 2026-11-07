import React, { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'

interface CurationsReelProps {
  onSelectItem: (title: string) => void
}

interface MaisonVertical {
  id: string
  title: string
  italicPart: string
  category: string
  subtitle: string
  image: string
  specs: string
}

const MAISONS: MaisonVertical[] = [
  {
    id: '01',
    title: 'Haute Joaillerie &',
    italicPart: 'Solitaires',
    category: 'Fine Jewellery Atelier',
    subtitle: 'Solitaire craftsmanship, bridal diamond sets, and heirloom emeralds under calibrated cinema macro optics.',
    image: '/assets/svc-jewellery-BcB-GXPd.jpg',
    specs: 'Macro Cinema // 100mm Anamorphic',
  },
  {
    id: '02',
    title: 'Heritage Weaves &',
    italicPart: 'Bridal Silks',
    category: 'Couture Fashion',
    subtitle: 'Pure Kanjivaram zari, artisanal looms, and high-fashion editorial films for Indian couture houses.',
    image: '/assets/svc-saree-Bf76VSHm.jpg',
    specs: 'Fashion Films // 8K RAW RED',
  },
  {
    id: '03',
    title: 'Exotic Marques &',
    italicPart: 'Velocity',
    category: 'Supercar Fleet Concierge',
    subtitle: 'Direct allocation pipelines and white-glove doorstep delivery for Ferrari, Porsche, and limited hypercars.',
    image: '/assets/svc-cars-BFdPfwO2.jpg',
    specs: 'Doorstep Concierge // Provenance Checked',
  },
  {
    id: '04',
    title: 'Architectural Monoliths &',
    italicPart: 'Estates',
    category: 'Prime Real Estate',
    subtitle: 'Private viewings and developer connections for prime architectural penthouses, estates, and luxury sanctuaries.',
    image: '/assets/svc-homes-BDNBbpTG.jpg',
    specs: 'Off-Market // Bangalore & International',
  },
  {
    id: '05',
    title: 'Rare Cellars &',
    italicPart: 'Fine Vintages',
    category: 'Fine Spirits Archive',
    subtitle: 'Curated cellars of rare collectible vintages, aged single malts, and private gastronomy pairings.',
    image: '/assets/svc-wine-BxuhRHOK.jpg',
    specs: 'Temperature Controlled // Vault Verified',
  },
  {
    id: '06',
    title: 'Artisanal Gastronomy &',
    italicPart: 'Gelato',
    category: 'Haute Confectionery',
    subtitle: 'Bespoke small-batch gelato and private dining collaborations with international master chefs.',
    image: '/assets/svc-icecream-C2ZJ6V-3.jpg',
    specs: 'Private Culinary // Curated Tastings',
  },
  {
    id: '07',
    title: 'Grand Café Culture &',
    italicPart: 'Roasts',
    category: 'Artisanal Hospitality',
    subtitle: 'Refined social spaces, single-origin reserve roasts, and exclusive salon lounge culture.',
    image: '/assets/svc-cafe-DNXzNrQx.jpg',
    specs: 'Single Origin // Private Members',
  },
  {
    id: '08',
    title: 'Sanctuary Aesthetics &',
    italicPart: 'Salons',
    category: 'High Wellness',
    subtitle: 'Private cosmetic sanctuaries, restorative wellness rituals, and bespoke dermatological beauty care.',
    image: '/assets/svc-salon-Aoz1f00S.jpg',
    specs: 'Bespoke Protocols // Private Suites',
  },
  {
    id: '09',
    title: 'Private Conditioning &',
    italicPart: 'Gyms',
    category: 'Executive Fitness',
    subtitle: 'State-of-the-art private training quarters, biometrics, and physical longevity recovery suites.',
    image: '/assets/svc-gym-C8DWkasQ.jpg',
    specs: 'Private Quarters // Elite Trainers',
  },
  {
    id: '10',
    title: 'Acoustics & Smart',
    italicPart: 'Living',
    category: 'Architectural Tech',
    subtitle: 'Bespoke high-end audiophile acoustic chambers and seamless architectural automation.',
    image: '/assets/svc-tech-Qk9v8N0N.jpg',
    specs: 'Custom Audio // Monolithic Integration',
  },
  {
    id: '11',
    title: 'Commercial Film &',
    italicPart: 'Campaigns',
    category: 'Bangalore Studio 01',
    subtitle: 'Complete 4K/8K commercial campaign direction, model casting, lookbooks, and DaVinci color grading.',
    image: '/assets/lookbook_clean_couture_suit.jpg',
    specs: 'End-to-End // Studio & Location',
  },
]

export const CurationsReel: React.FC<CurationsReelProps> = ({ onSelectItem }) => {
  const [activeMaison, setActiveMaison] = useState<MaisonVertical | null>(MAISONS[0])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHoveringList, setIsHoveringList] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Smooth mouse follow with spring damping (0.08)
  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const loop = () => {
      currentX += (mouseX - currentX) * 0.1
      currentY += (mouseY - currentY) * 0.1
      setCursorPos({ x: currentX, y: currentY })
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section id="curations" ref={containerRef} className="py-28 px-4 sm:px-8 md:px-14 max-w-[1520px] mx-auto relative z-10 border-t border-white/[0.07]">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16">
        <div>
          <span className="text-[11px] font-light tracking-[0.25em] text-[#c7b299] uppercase block mb-3">
            // VETTED LUXURY VERTICALS
          </span>
          <h2 className="font-couture text-4xl sm:text-6xl tracking-tight text-[#f4f0ea]">
            11 Curated Maisons. <br />
            <span className="font-editorial italic font-normal text-[#c7b299]">
              Hand-Selected For Provenance.
            </span>
          </h2>
        </div>
        <p className="text-[#969188] text-sm max-w-md font-light leading-relaxed">
          Hover over each discipline to inspect visual campaign direction or register a private acquisition mandate with our concierge desk.
        </p>
      </div>

      {/* The Shotsquare-Style Interactive Row Index */}
      <div
        className="divide-y divide-white/[0.08] border-y border-white/[0.08]"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => setIsHoveringList(false)}
      >
        {MAISONS.map((m) => (
          <div
            key={m.id}
            onMouseEnter={() => setActiveMaison(m)}
            onClick={() => onSelectItem(m.title + ' ' + m.italicPart)}
            className="group py-7 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 hover:pl-4"
          >
            {/* Left: ID + Title */}
            <div className="flex items-center gap-6 sm:gap-10">
              <span className="font-mono text-xs sm:text-sm text-[#969188] group-hover:text-[#c7b299] transition-colors w-8">
                {m.id}
              </span>
              <h3 className="font-couture text-2xl sm:text-4xl text-white/90 group-hover:text-white transition-colors tracking-wide">
                <span>{m.title} </span>
                <span className="font-editorial italic font-normal text-[#c7b299] group-hover:text-white transition-colors">
                  {m.italicPart}
                </span>
              </h3>
            </div>

            {/* Right: Category + Trigger */}
            <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-12 pl-14 md:pl-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#969188] group-hover:text-[#c7b299] transition-colors block">
                  {m.category}
                </span>
                <span className="text-[11px] text-white/40 hidden sm:block font-light">
                  {m.specs}
                </span>
              </div>

              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#c7b299] group-hover:bg-[#c7b299] flex items-center justify-center text-white/40 group-hover:text-[#060608] transition-all flex-none">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor Media Card (Shotsquare SOTY Interaction) */}
      {isHoveringList && activeMaison && (
        <div
          className="fixed pointer-events-none z-50 hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          <div className="w-[340px] rounded-2xl overflow-hidden border border-white/[0.15] bg-[#0c0c10]/90 backdrop-blur-2xl shadow-2xl p-3 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-black">
              <img
                src={activeMaison.image}
                alt={activeMaison.title}
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#c7b299] tracking-wider uppercase">
                {activeMaison.specs.split('//')[0]}
              </div>
            </div>
            
            <div className="px-1 pb-1 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#c7b299] tracking-widest uppercase">
                <span>{activeMaison.category}</span>
                <span>{activeMaison.id} / 11</span>
              </div>
              <p className="text-xs text-[#d1ccc3] font-light leading-snug">
                {activeMaison.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
