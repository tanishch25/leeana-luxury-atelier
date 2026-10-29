import React, { useState } from 'react'

export const Statement: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0)

  const pillars = [
    {
      title: 'Soundstage Cinema Motion',
      desc: 'Dedicated soundstage facilities with motorized pantographs, continuous cycloramas, and precision robotic tracking for commercial campaigns.',
      image: '/assets/svc-cars-BFdPfwO2.jpg',
    },
    {
      title: 'Macro Joaillerie Direction',
      desc: 'Anamorphic macro rail optics eliminating chromatic aberration to capture internal stone fire, platinum luster, and unheated gemstone depth.',
      image: '/assets/svc-jewellery-BcB-GXPd.jpg',
    },
    {
      title: 'Confidential Acquisitions Desk',
      desc: 'Direct factory allocation pipelines for European hypercars, private aviation, and off-market architectural sky penthouses.',
      image: '/assets/svc-homes-BDNBbpTG.jpg',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] py-24 md:py-36 overflow-hidden border-y border-white/[0.08] z-10">
      
      {/* Monumental Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] leading-none text-white/[0.02] tracking-widest uppercase font-light">
          LEEANA
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 relative z-10 space-y-16">
        
        {/* Monumental All-White Headline (Non-cursive, Architectural Authority) */}
        <div className="max-w-5xl space-y-4">
          <h2 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.98]">
            We Create Visual Productions <br />
            <span className="font-semibold text-white">
              That Command Global Prestige.
            </span>
          </h2>
        </div>

        {/* Narrative Paragraph */}
        <div className="max-w-3xl pt-2">
          <p className="text-base sm:text-xl text-white/80 font-light leading-relaxed">
            Equipped with cinema camera systems, specialized macro glass, and master gaffers, our Bangalore atelier designs visual narratives that elevate fine jewellery, bridal couture, and luxury houses across India and internationally.
          </p>
        </div>

        {/* Three Large Aesthetic Cards Expanding Horizontally From The Center */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 pt-6 w-full">
          {pillars.map((item, idx) => {
            const isActive = activeCard === idx
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onClick={() => setActiveCard(idx)}
                className={`group relative rounded-[32px] overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer shadow-2xl flex flex-col justify-end p-8 sm:p-10 min-h-[380px] sm:min-h-[420px] ${
                  isActive
                    ? 'lg:flex-[1.5] border-white/40 ring-1 ring-white/20'
                    : 'lg:flex-1 border-white/10 hover:border-white/25'
                }`}
              >
                {/* Background Blurred Picture Layer */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter blur-[20px] brightness-[0.35] scale-125 transition-transform duration-1000 ease-out group-hover:scale-130 [transform:translate3d(0,0,0)]"
                  />
                  {/* Subtle Unblurred Film Layer for Depth */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.25] contrast-[1.1] opacity-40 mix-blend-screen group-hover:opacity-60 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                </div>

                {/* 1px Hairline Top Light-Catching Edge */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Content: Clean, High-Status, Zero Emojis, Zero Dots, Zero Subtitles */}
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>

    </section>
  )
}
