import React, { useState } from 'react'
import { Star, Plus } from 'lucide-react'
import { TESTIMONIALS_DATA, FAQ_DATA } from './ConciergePage'

export const LandingFaqReviews: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  return (
    <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 py-14 md:py-20 space-y-16 md:space-y-20 z-10 text-white">
      
      {/* 1. Client Reviews / Attestations (Real Reviews) */}
      <section id="landing-reviews">
        <div className="pb-6 border-b border-white/[0.08] space-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 block font-light">
            Client Attestations · Verified 5.0
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            Voices of Our Patrons
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Reflections from commercial brand partners, luxury retail leaders, and jewellery curators who partner with Leeana Fashion Concierge.
          </p>
        </div>

        {/* 5 Real Testimonial Plates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 pt-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="relative p-6 sm:p-7 rounded-[26px] border border-white/[0.1] bg-[#08080b]/95 hover:border-white/30 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#F5C042] fill-[#F5C042] filter drop-shadow-[0_0_6px_rgba(245,192,66,0.6)]"
                    />
                  ))}
                  <span className="ml-2 text-[10px] text-[#F5C042] tracking-wider uppercase font-medium">
                    5.0 Verified
                  </span>
                </div>

                <p className="font-serif text-sm sm:text-base text-white/90 font-light italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#F5C042]/30 shrink-0 shadow-lg ring-1 ring-[#F5C042]/20">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.98]"
                  />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base text-white font-medium tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-white/50 font-light block mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Frequently Asked Questions */}
      <section id="landing-faq">
        <div className="pb-6 border-b border-white/[0.08] space-y-1.5">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            Questions, Refined Answers
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Direct clarity regarding curation criteria, buyer confidentiality, international representation, and atelier partnerships.
          </p>
        </div>

        {/* Luxury Accordion Suite */}
        <div className="pt-6 max-w-4xl mx-auto space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIdx === idx
            return (
              <div
                key={idx}
                className={`rounded-[20px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-white/35 bg-white/[0.04] shadow-2xl'
                    : 'border-white/[0.08] bg-[#07070a] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full py-5 px-5 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <h3 className="font-display text-base sm:text-lg font-light text-white tracking-tight leading-snug">
                    {faq.q}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-white text-black border-white rotate-45' : 'text-white'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-7 pb-5 sm:pb-7 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-white/75 font-light leading-relaxed border-t border-white/[0.08] pt-3.5">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
