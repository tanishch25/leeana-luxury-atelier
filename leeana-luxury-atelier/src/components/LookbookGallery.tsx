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
}

// 28 Curated Plates engineered into 4 Pinterest waterfall columns
// Internally staggered & asymmetric; externally ending at the exact same horizontal baseline
const COLUMN_1_ITEMS: LookbookItem[] = [
  {
    id: '01',
    title: 'The Solitaire Macro Study',
    category: 'Haute Joaillerie',
    image: '/assets/hero_jewellery_4k.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Jeweller · Bengaluru',
    year: '2025',
    description: '100mm optical anamorphic macro resolving internal stone faceting and platinum luster without chromatic distortion.',
  },
  {
    id: '02',
    title: 'Monolithic Cantilever Penthouse',
    category: 'Architectural Estates',
    image: '/assets/hero_estates_4k.jpg',
    aspect: 'aspect-[16/10]',
    client: 'JP Nagar Sanctuary Villa',
    year: '2025',
    description: 'Twilight long-exposure volumetric capture showing architectural concrete cantilevers and floating glass facades.',
  },
  {
    id: '03',
    title: 'Kanjeevaram Royal Weave',
    category: 'Bridal Silks',
    image: '/assets/hero_couture_4k.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Heritage Loom Collective',
    year: '2025',
    description: 'Natural daylight and 3200K tungsten blend capturing authentic gold zari thread reflections and deep crimson silk drapes.',
  },
  {
    id: '04',
    title: 'Couture Editorial Monolith',
    category: 'Fashion Editorial',
    image: '/assets/model-1.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Atelier Lookbook 02',
    year: '2024',
    description: 'Refined silhouette lighting emphasizing precision lapels and handcrafted textiles.',
  },
  {
    id: '05',
    title: 'Editorial Noir Series',
    category: 'Fashion Editorial',
    image: '/assets/editorial-fashion-4.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Atelier Lookbook 04',
    year: '2024',
    description: 'High-contrast studio lighting capturing tactile silhouette contours and bespoke hand-tailored luxury garments.',
  },
  {
    id: '06',
    title: 'High-Speed Hypercar Cockpit',
    category: 'Exotic Fleet',
    image: '/assets/svc-tech-Qk9v8N0N.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Carbon Aerodynamics Lab',
    year: '2025',
    description: 'Telemetry and digital cockpit ergonomics photographed under low-intensity soundstage illumination.',
  },
  {
    id: '07',
    title: 'Platinum & Emerald Cascade',
    category: 'Haute Joaillerie',
    image: '/assets/svc-jewellery-BcB-GXPd.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Royal Heritage Jeweller',
    year: '2025',
    description: 'Polarized macro lighting eliminating surface glare while revealing genuine internal Colombian emerald crystal depth.',
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
    description: 'Low-angle soundstage rim lighting highlighting aerodynamic carbon fiber bodywork under mist.',
  },
  {
    id: '09',
    title: 'Modern Cantilever Pavilion',
    category: 'Architectural Estates',
    image: '/assets/lookbook_architecture_villa.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Goa Coastal Sanctuary',
    year: '2025',
    description: 'Architectural infinity edge pool and monolithic concrete pavilion captured at dusk.',
  },
  {
    id: '10',
    title: 'Zardozi Gold Embroidery Study',
    category: 'Bridal Silks',
    image: '/assets/svc-saree-Bf76VSHm.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Varanasi Master Weavers',
    year: '2025',
    description: 'Micro-texture capture of hand-sewn bullion wire embroidery on deep maroon mulberry silk.',
  },
  {
    id: '11',
    title: 'V12 Maranello Speedform',
    category: 'Exotic Fleet',
    image: '/assets/hero_supercar_4k.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Collector Vault',
    year: '2025',
    description: 'Trackside chase vehicle tracking with dynamic atmospheric lighting along open mountain passes.',
  },
  {
    id: '12',
    title: 'Raw Silk & High Collar Drapes',
    category: 'Fashion Editorial',
    image: '/assets/editorial-fashion-2.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Fall Runway Edition',
    year: '2024',
    description: 'Editorial studio series highlighting raw texture, heavy fabric drape physics, and couture tailoring.',
  },
  {
    id: '13',
    title: 'Diamond Luminescence Study',
    category: 'Haute Joaillerie',
    image: '/assets/lookbook_jewel_macro.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Solitaire Atelier Bengaluru',
    year: '2025',
    description: 'Macro facet illumination revealing internal light dispersion across brilliant-cut solitaires.',
  },
  {
    id: '14',
    title: 'Executive Salon Suite',
    category: 'Fashion Editorial',
    image: '/assets/svc-salon-Aoz1f00S.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Haute Grooming Atelier',
    year: '2025',
    description: 'Interior ambiance and precision craftsmanship within luxury salon spaces.',
  },
]

const COLUMN_3_ITEMS: LookbookItem[] = [
  {
    id: '15',
    title: 'Bespoke Bridal Couture Study',
    category: 'Bridal Silks',
    image: '/assets/lookbook_fashion_silk.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Atelier Bridal Suite',
    year: '2025',
    description: 'Handcrafted zari thread embellishments captured with soft cinema key illumination.',
  },
  {
    id: '16',
    title: 'Couture Portraiture Series',
    category: 'Fashion Editorial',
    image: '/assets/model-0107.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Private Atelier Lookbook',
    year: '2024',
    description: 'Fine art portraiture celebrating bespoke Indian bridal jewelry and silk brocade.',
  },
  {
    id: '17',
    title: 'High-Fashion Silk Movement',
    category: 'Fashion Editorial',
    image: '/assets/editorial-fashion-4.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Contemporary Couturier',
    year: '2024',
    description: 'High-speed capture of flowing lightweight mulberry silk silhouettes in motion.',
  },
  {
    id: '18',
    title: 'Atmospheric Speedform GT',
    category: 'Exotic Fleet',
    image: '/assets/lookbook_supercar_gt.jpg',
    aspect: 'aspect-[16/10]',
    client: 'Private Collector Reserve',
    year: '2025',
    description: 'Dynamic volumetric tracking of automotive coachwork under overcast ambient sky.',
  },
  {
    id: '19',
    title: 'Monolith Private Estate Horizon',
    category: 'Architectural Estates',
    image: '/assets/hero-bg-D6Yf6s2Y.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Prime Bengaluru Sanctuaries',
    year: '2025',
    description: 'Panoramic dusk exposure capturing architectural structural cantilevers.',
  },
  {
    id: '20',
    title: 'Minimalist Monolith Architecture',
    category: 'Architectural Estates',
    image: '/assets/svc-homes-BDNBbpTG.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Whitefield Sky Villa',
    year: '2025',
    description: 'Discreet buyer representation architectural walk-through with calibrated interior ambient balancing.',
  },
  {
    id: '21',
    title: 'Minimalist Travertine Penthouse',
    category: 'Architectural Estates',
    image: '/assets/lookbook_clean_penthouse.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Private Residence Atelier',
    year: '2025',
    description: 'Bespoke travertine living gallery and architectural lighting documentation.',
  },
]

const COLUMN_4_ITEMS: LookbookItem[] = [
  {
    id: '22',
    title: 'Architectural Gallery Pavilion',
    category: 'Architectural Estates',
    image: '/assets/svc-cafe-DNXzNrQx.jpg',
    aspect: 'aspect-[1/1]',
    client: 'Sculptural Private Residence',
    year: '2025',
    description: 'Natural light study through double-height architectural glazing and travertine stone.',
  },
  {
    id: '23',
    title: 'Cantilever Villa Dusk Study',
    category: 'Architectural Estates',
    image: '/assets/lookbook_clean_villa.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Sanctuary Architecture',
    year: '2025',
    description: 'Twilight architectural study capturing cantilever structures and ambient interior warmth.',
  },
  {
    id: '24',
    title: 'Haute Sartorial Monograph',
    category: 'Fashion Editorial',
    image: '/assets/lookbook_clean_couture_suit.jpg',
    aspect: 'aspect-[1/1]',
    client: 'International Luxury House',
    year: '2025',
    description: 'Omnichannel creative direction showcasing bespoke tailoring, lapel architecture, and luxury fabrics.',
  },
  {
    id: '25',
    title: 'High-Altitude Villa Sanctuary',
    category: 'Architectural Estates',
    image: '/assets/svc-gym-C8DWkasQ.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Private Hillside Estate',
    year: '2025',
    description: 'Panoramic architectural perspective capturing natural stone finishes and glass facades.',
  },
  {
    id: '26',
    title: 'Trackside Chase Silhouette',
    category: 'Exotic Fleet',
    image: '/assets/hero_supercar_4k.jpg',
    aspect: 'aspect-[16/10]',
    client: 'Automotive Reserve',
    year: '2025',
    description: 'Low-profile tracking of European supercar aerodynamics on mountain switchbacks.',
  },
  {
    id: '27',
    title: 'Editorial Studio Monograph',
    category: 'Fashion Editorial',
    image: '/assets/model-0106.jpg',
    aspect: 'aspect-[3/4]',
    client: 'Atelier Archives',
    year: '2024',
    description: 'Minimalist studio monograph highlighting precision couture draping and tailored lines.',
  },
  {
    id: '28',
    title: 'Haute Studio Portrait Series',
    category: 'Fashion Editorial',
    image: '/assets/editorial-fashion-2.jpg',
    aspect: 'aspect-[4/5]',
    client: 'Runway Monograph 01',
    year: '2024',
    description: 'Intimate portrait lighting capturing the interplay between fine jewelry and raw silk textures.',
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
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
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
    'Haute Joaillerie',
    'Bridal Silks',
    'Fashion Editorial',
    'Exotic Fleet',
    'Architectural Estates',
    'Private Cellars',
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
