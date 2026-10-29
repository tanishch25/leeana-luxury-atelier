import React from 'react'

export const KineticMarqueeSection: React.FC = () => {
  const line1 = [
    'COMMERCIAL SOUNDSTAGE',
    '8K CINEMATOGRAPHY',
    'HAUTE JOAILLERIE MACRO',
    'PRIVATE CONCIERGE',
    'BANGALORE ATELIER',
    'OPTICAL MASTERY',
  ]

  const line2 = [
    'EXOTIC MARQUES',
    'ARCHITECTURAL MONOLITHS',
    'RARE CELLAR VINTAGES',
    'UNCOMPROMISING PROVENANCE',
    'WHITE-GLOVE ALLOCATION',
    'STRICT DISCRETION',
  ]

  return (
    <section id="kinetic-marquee" className="py-20 overflow-hidden relative z-10 border-y border-white/[0.08] select-none bg-black/40 backdrop-blur-sm">
      
      {/* Top Track (Moving Left) */}
      <div className="flex overflow-hidden py-3">
        <div className="animate-marquee-left flex items-center gap-12 whitespace-nowrap">
          {[...line1, ...line1].map((text, idx) => (
            <span
              key={idx}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tight text-transparent select-none"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.28)',
              }}
            >
              {text} <span className="text-white/30 font-light mx-6">—</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Track (Moving Right) */}
      <div className="flex overflow-hidden py-3">
        <div className="animate-marquee-right flex items-center gap-12 whitespace-nowrap">
          {[...line2, ...line2].map((text, idx) => (
            <span
              key={idx}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tight text-transparent select-none"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.28)',
              }}
            >
              {text} <span className="text-white/30 font-light mx-6">—</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
