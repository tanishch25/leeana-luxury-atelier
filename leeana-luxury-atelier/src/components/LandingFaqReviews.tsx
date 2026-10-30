import React, { useState } from 'react'
import { Star, Plus } from 'lucide-react'
import { TESTIMONIALS_DATA, FAQ_DATA } from './ConciergePage'

export const LandingFaqReviews: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  return (
    <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 py-20 md:py-28 space-y-24 md:space-y-32 z-10 text-white">
      
      {/* 1. Client Reviews / Attestations */}
      <section id="landing-reviews">
        <div className="pb-8 border-b border-white/[0.08] space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Voices of Our Patrons
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Reflections from jewellery founders, private estate directors, and luxury lifestyle curators who partner with our atelier.
          </p>
        </div>

        {/* 3 Editorial Testimonial Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="relative p-8 sm:p-10 rounded-[32px] border border-white/[0.1] bg-[#08080b] hover:border-white/25 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="space-y-6">
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                <p className="font-serif text-lg sm:text-xl text-white/95 font-light italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-white/[0.08] flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                </div>
                <div>
                  <h4 className="font-display text-base text-white font-medium tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-xs text-white/50 font-light block mt-0.5">
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
        <div className="pb-8 border-b border-white/[0.08] space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Questions, Refined Answers
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Direct clarity regarding curation criteria, buyer confidentiality, international representation, and atelier partnerships.
          </p>
        </div>

        {/* Luxury Accordion Suite */}
        <div className="pt-10 max-w-4xl mx-auto space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIdx === idx
            return (
              <div
                key={idx}
                className={`rounded-[24px] sm:rounded-[28px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-white/35 bg-white/[0.04] shadow-2xl'
                    : 'border-white/[0.08] bg-[#07070a] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full py-6 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <h3 className="font-display text-base sm:text-lg md:text-xl font-light text-white tracking-tight leading-snug">
                    {faq.q}
                  </h3>
                  <div
                    className={`w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-white text-black border-white rotate-45' : 'text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed border-t border-white/[0.08] pt-4">
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
