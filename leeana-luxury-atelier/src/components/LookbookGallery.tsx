import React, { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

interface LookbookItem {
  id: string
  title: string
  category: string
  image: string
  aspect: string
  client: string
  year: string
  description?: string
  focal?: 'top' | 'center'
}

// 28 Curated Plates engineered into 4 Pinterest waterfall columns
// Internally staggered & asymmetric; externally ending at the exact same horizontal baseline
const COLUMN_1_ITEMS: LookbookItem[] = [
  {
    id: '01',
    title: 'Layered Gemstone & Crescent Study',
    category: 'Haute Joaillerie',
    image: '/assets/hero_jewellery_4k.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Jeweller · Bengaluru',
    year: '2025',
    description: '100mm optical macro resolving faceted deep-teal stones, pavé diamond crescents, and brushed 18k gold links without glare.',
  },
  {
    id: '02',
    title: 'Limestone Pool Residence',
    category: 'Architectural Estates',
    image: '/assets/hero_estates_4k.jpg',
    aspect: 'aspect-[16/10]',
    client: 'JP Nagar Sanctuary Villa',
    year: '2025',
    description: 'Natural daylight architectural documentation capturing cantilevered stone terraces and glass-balustrade lap pools.',
  },
  {
    id: '03',
    title: 'Kanjeevaram Royal Weave',
    category: 'Bridal Silks',
    image: '/assets/model-0106.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Heritage Loom Collective',
    year: '2025',
    focal: 'top',
    description: 'Courtyard daylight blending crimson handloom silk borders with uncut emerald kundan necklaces and carved timber architecture.',
  },
  {
    id: '04',
    title: 'Heritage Two-Wheel Campaign',
    category: 'Commercial Brand',
    image: '/assets/model-1.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Motorcycles & Riding Apparel',
    year: '2024',
    focal: 'top',
    description: 'Location automotive and wardrobe direction capturing road-ready outerwear alongside twin-shock heritage motorcycles.',
  },
  {
    id: '05',
    title: 'Crimson Bridal Duo Series',
    category: 'Bridal Silks',
    image: '/assets/editorial-fashion-4.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Atelier Bridal Archive',
    year: '2024',
    focal: 'top',
    description: 'Diffused outdoor silk reflector lighting balancing crimson gota-patti ensembles with heirloom polki chokers.',
  },
  {
    id: '06',
    title: 'Artisanal Espresso & Veined Marble',
    category: 'Gastronomy & Culinary',
    image: '/assets/real_lookbook/cafe_real.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Specialty Roastery Atelier',
    year: '2025',
    description: 'Overhead culinary frame resolving silky microfoam latte art against honed black Marquina marble textures.',
  },
  {
    id: '07',
    title: 'Emerald & Polki Cascade',
    category: 'Haute Joaillerie',
    image: '/assets/real_lookbook/emerald_real.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Royal Heritage Jeweller',
    year: '2025',
    description: 'Polarized studio key lighting eliminating surface reflection to reveal true emerald saturation and hand-set diamond links.',
  },
]

const COLUMN_2_ITEMS: LookbookItem[] = [
  {
    id: '08',
    title: 'Trackside Carbon Speedform',
    category: 'Exotic Fleet',
    image: '/assets/lookbook_clean_mclaren.jpg',
    aspect: 'aspect-[16/10]',
    client: 'Bespoke Automotive Vault',
    year: '2025',
    description: 'Monsoon raindrop macro over volcano-red carbon rear bodywork and sculpted dihedral aerodynamic intakes.',
  },
  {
    id: '09',
    title: 'Modern Cantilever Pavilion',
    category: 'Architectural Estates',
    image: '/assets/lookbook_architecture_villa.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Goa Coastal Sanctuary',
    year: '2025',
    description: 'Architectural infinity pool and warm cedar soffit geometry captured in crisp coastal daylight.',
  },
  {
    id: '10',
    title: 'Shimmering Cape & Suede Silhouette',
    category: 'Fashion Editorial',
    image: '/assets/editorial-fashion-3.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Bengaluru Soundstage Lookbook',
    year: '2025',
    focal: 'top',
    description: 'Clean cyclorama lighting isolating metallic blush textured cape tailoring and full-length black suede boots.',
  },
  {
    id: '11',
    title: 'Obsidian AMG GT R Monaco',
    category: 'Exotic Fleet',
    image: '/assets/hero_supercar_4k.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Collector Vault',
    year: '2025',
    description: 'Overcast Mediterranean harbour lighting against satin magno bodywork backed by moored white superyachts.',
  },
  {
    id: '12',
    title: 'Ruby Sequined Pallu Draping',
    category: 'Bridal Silks',
    image: '/assets/editorial-fashion-2.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Bridal Couture Edition',
    year: '2024',
    focal: 'top',
    description: 'Studio back-profile portraiture showcasing sheer hand-beaded crimson sequins, crystal tassels, and delicate drape movement.',
  },
  {
    id: '13',
    title: 'Diamond Halo Solitaire Study',
    category: 'Haute Joaillerie',
    image: '/assets/lookbook_jewel_macro.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Solitaire Atelier Bengaluru',
    year: '2025',
    description: 'Macro facet illumination revealing rose-gold milgrain bezel detail and split-shank pavé brilliance on matte black leather.',
  },
  {
    id: '14',
    title: 'Sommelier Private Cellar Reserve',
    category: 'Gastronomy & Culinary',
    image: '/assets/real_lookbook/wine_real.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Grand Cru Private Reserve',
    year: '2025',
    description: 'Low-key sommelier service capture highlighting ruby vintage viscosity, hand-blown crystal goblet curves, and warm cellar amber.',
  },
]

const COLUMN_3_ITEMS: LookbookItem[] = [
  {
    id: '15',
    title: 'Private Aviation & Ramp Transfer',
    category: 'Commercial Brand',
    image: '/assets/real_lookbook/jet_real.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Executive Charter & Fleet',
    year: '2025',
    description: 'Golden-hour apron production pairing stealth matte coachwork directly wing-to-wing with private charter aircraft.',
  },
  {
    id: '16',
    title: 'Luxury Optical & Sunwear Series',
    category: 'Commercial Brand',
    image: '/assets/model-0107.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Bengaluru Optical Collective',
    year: '2024',
    focal: 'top',
    description: 'Natural interior cabin portraiture styled around linen shirting and sculpted acetate sunwear silhouettes.',
  },
  {
    id: '17',
    title: 'Botanical Mulberry Silk Trio',
    category: 'Fashion Editorial',
    image: '/assets/editorial-fashion-6.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Contemporary Resort House',
    year: '2024',
    focal: 'top',
    description: 'Multi-model campaign direction highlighting painterly botanical prints, antique zari cuffs, and synchronized studio staging.',
  },
  {
    id: '18',
    title: 'Alpine Pearl Lamborghini Huracán',
    category: 'Exotic Fleet',
    image: '/assets/lookbook_supercar_gt.jpg',
    aspect: 'aspect-[16/10]',
    client: 'Private Collector Reserve',
    year: '2025',
    description: 'High-altitude pass automotive study balancing pearl white coachwork against crisp mountain shadow lines.',
  },
  {
    id: '19',
    title: 'Historic Limestone Villa',
    category: 'Architectural Estates',
    image: '/assets/real_lookbook/villa_como_real.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Heritage Residence Portfolio',
    year: '2025',
    description: 'Mediterranean facade architecture framed by mature coastal stone pines and warm travertine cornices.',
  },
  {
    id: '20',
    title: 'Eucalyptus Twilight Pavilion',
    category: 'Architectural Estates',
    image: '/assets/lookbook_clean_villa.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Whitefield Sky Sanctuary',
    year: '2025',
    description: 'Blue-hour architectural study balancing cedar vertical cladding with warm interior gallery illumination.',
  },
  {
    id: '21',
    title: 'Minimalist Travertine Residence',
    category: 'Architectural Estates',
    image: '/assets/lookbook_clean_penthouse.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Residence Atelier',
    year: '2025',
    description: 'Seamless indoor-outdoor glazing, oak millwork, and hearth stone textures photographed in even natural daylight.',
  },
]

const COLUMN_4_ITEMS: LookbookItem[] = [
  {
    id: '22',
    title: 'Dark Cacao & Seasonal Patisserie',
    category: 'Gastronomy & Culinary',
    image: '/assets/real_lookbook/chocolate_cake_real.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Artisan Patisserie Atelier',
    year: '2025',
    description: 'Tactile overhead table styling pairing rich baked dark cacao with tart winter berries on hand-cut timber slabs.',
  },
  {
    id: '23',
    title: 'Timber-Slat Sanctuary Facade',
    category: 'Architectural Estates',
    image: '/assets/candidates/photo-1600566753376-12c8ab7fb75b.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Estate Bengaluru',
    year: '2025',
    description: 'Evening architectural elevation showcasing warm vertical timber louver screening and glass atrium depth.',
  },
  {
    id: '24',
    title: 'Haute Sartorial Monograph',
    category: 'Fashion Editorial',
    image: '/assets/lookbook_clean_couture_suit.jpg',
    aspect: 'aspect-[1/1]',
    client: 'International Tailoring House',
    year: '2025',
    focal: 'top',
    description: 'Architectural glass stairwell composition detailing bespoke navy wool suiting, cuff geometry, and dress horology.',
  },
  {
    id: '25',
    title: 'Tailored Magenta Studio Portrait',
    category: 'Fashion Editorial',
    image: '/assets/model-6.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Leeana Talent Archive',
    year: '2025',
    focal: 'top',
    description: 'Direct dark-set portraiture balancing silver-threaded styling against structured jewel-tone tailoring.',
  },
  {
    id: '26',
    title: 'Obsidian Gran Turismo Profile',
    category: 'Exotic Fleet',
    image: '/assets/candidates/photo-1503376780353-7e6692767b70.jpg',
    aspect: 'aspect-[16/10]',
    client: 'Automotive Collector Reserve',
    year: '2025',
    description: 'Dynamic rolling chase photography emphasizing sculpted touring proportions along open asphalt curves.',
  },
  {
    id: '27',
    title: 'Offshore Superyacht Aerial',
    category: 'Exotic Fleet',
    image: '/assets/real_lookbook/yacht_real.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Offshore Charter Desk',
    year: '2025',
    description: 'Overhead coastal flight frame following tri-deck motor yacht wake patterns past sunlit sea cliffs.',
  },
  {
    id: '28',
    title: 'Cinema Primes & Soundstage Optics',
    category: 'Commercial Brand',
    image: '/assets/candidates/photo-1516035069371-29a1b244cc32.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Indiranagar Production Bench',
    year: '2025',
    description: 'Flat-lay optical prep documenting full-frame mirrorless bodies and fast prime lenses ahead of campaign call sheets.',
  },
]

const PlateCard: React.FC<{ item: LookbookItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    })
  }

  return (
    <div
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((prev) => ({ ...prev, active: false }))}
      className="rounded-2xl md:rounded-3xl overflow-hidden group relative bg-[#09090c] border border-white/[0.08] hover:border-white/35 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-black/90 flex flex-col"
    >
      {/* Pure Photography Plate - Absolutely Zero Words / Text Overlays */}
      <div className={`relative w-full ${item.aspect} overflow-hidden bg-black`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover ${item.focal === 'top' ? 'object-top' : 'object-center'} filter brightness-[0.94] contrast-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105`}
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />

        {/* Ambient Hover Vignette - Pure Visual Depth, Zero Typography or Words */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Emil Kowalski Dynamic Specular Spotlight (Tracks mouse coordinates in real-time) */}
        {spotlight.active && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(380px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.14), transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  )
}

export const LookbookGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null)
  const [activeFilter, setActiveFilter] = useState('ALL')

  const categories = [
    'ALL',
    'Gastronomy & Culinary',
    'Fashion Editorial',
    'Haute Joaillerie',
    'Bridal Silks',
    'Commercial Brand',
    'Architectural Estates',
    'Exotic Fleet',
  ]

  // Flattened pool for balanced multi-column distribution when category filters are applied
  const ALL_PLATES = [
    ...COLUMN_1_ITEMS,
    ...COLUMN_2_ITEMS,
    ...COLUMN_3_ITEMS,
    ...COLUMN_4_ITEMS,
  ]

  const filteredItems = activeFilter === 'ALL'
    ? ALL_PLATES
    : ALL_PLATES.filter((item) => item.category === activeFilter)

  // When 'ALL', preserve the bespoke engineered column layout that terminates at the exact same baseline
  // When filtered, dynamically distribute across the 4 columns so the Pinterest waterfall remains dense & balanced
  const col1 = activeFilter === 'ALL' ? COLUMN_1_ITEMS : filteredItems.filter((_, i) => i % 4 === 0)
  const col2 = activeFilter === 'ALL' ? COLUMN_2_ITEMS : filteredItems.filter((_, i) => i % 4 === 1)
  const col3 = activeFilter === 'ALL' ? COLUMN_3_ITEMS : filteredItems.filter((_, i) => i % 4 === 2)
  const col4 = activeFilter === 'ALL' ? COLUMN_4_ITEMS : filteredItems.filter((_, i) => i % 4 === 3)

  // Engineered 2-column mobile layout that guarantees BOTH columns terminate at the EXACT SAME LEVEL (Zero blank space at bottom)
  const getMobileColumns = () => {
    if (activeFilter === 'ALL') {
      const MOBILE_COL_1_IDS = new Set(['01', '02', '03', '04', '05', '06', '11', '13', '14', '15', '16', '18', '20', '25'])
      const mCol1 = ALL_PLATES.filter((item) => MOBILE_COL_1_IDS.has(item.id))
      const mCol2 = ALL_PLATES.filter((item) => !MOBILE_COL_1_IDS.has(item.id))
      return [mCol1, mCol2]
    }

    const mCol1: LookbookItem[] = []
    const mCol2: LookbookItem[] = []
    let h1 = 0
    let h2 = 0

    const getRatio = (aspectStr: string) => {
      const match = aspectStr.match(/\[(\d+)\/(\d+)\]/)
      if (match) return Number(match[2]) / Number(match[1])
      return 1.0
    }

    filteredItems.forEach((item) => {
      const r = getRatio(item.aspect)
      if (h1 <= h2) {
        mCol1.push(item)
        h1 += r
      } else {
        mCol2.push(item)
        h2 += r
      }
    })

    return [mCol1, mCol2]
  }

  const [mobileCol1, mobileCol2] = getMobileColumns()

  return (
    <section id="lookbook" className="py-20 md:py-28 px-4 sm:px-8 md:px-12 max-w-[1720px] mx-auto relative z-10">
      
      {/* Header: Clean Single-Line Grand Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light mb-2">
            Archival Repertoire
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Editorial Lookbook Archive
          </h2>
        </div>
        <p className="text-white/60 text-xs sm:text-sm max-w-md font-light leading-relaxed">
          High-definition visual plates captured across our Bangalore soundstage, fine joaillerie macro benches, and private patron commissions.
        </p>
      </div>

      {/* Elevated Luxury Segmented Filter Dock */}
      <div className="flex justify-center items-center py-8 md:py-10 w-full overflow-hidden">
        <div className="relative max-w-full overflow-x-auto hide-scrollbar p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center gap-1">
          {categories.map((cat) => {
            const isActive = activeFilter === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`apple-press relative px-5 sm:px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-[0_4px_24px_rgba(255,255,255,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* DESKTOP: 4 Asymmetric Staggered Columns terminating at the EXACT Same Baseline (Unchanged) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-5">
          {col1.map((item) => (
            <PlateCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {col2.map((item) => (
            <PlateCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {col3.map((item) => (
            <PlateCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {col4.map((item) => (
            <PlateCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
          ))}
        </div>
      </div>

      {/* MOBILE-SPECIFIC LAYOUT: Balanced 2-Column Pinterest Waterfall Terminating at the Exact Same Level */}
      <div className="grid grid-cols-2 gap-2.5 sm:hidden">
        <div className="flex flex-col gap-2.5">
          {mobileCol1.map((item) => (
            <PlateCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {mobileCol2.map((item) => (
            <PlateCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border border-white/15 bg-[#09090c] shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image Frame */}
            <div className="relative w-full h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info Footer */}
            <div className="p-6 sm:p-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#0a0a0d]">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-white/60 block font-light">
                  {selectedItem.category} · {selectedItem.year}
                </span>
                <h3 className="text-2xl font-light text-white tracking-tight">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-white/70 font-light max-w-xl">
                  {selectedItem.description || selectedItem.client}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="apple-press inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider transition-all hover:bg-white/90"
                >
                  <span>Request Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
