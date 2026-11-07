import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQ_DATA } from './ConciergePage'
import { ReviewsShowcase } from './ReviewsShowcase'

export const LandingFaqReviews: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  return (
    <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 py-14 md:py-20 space-y-16 md:space-y-20 z-10 text-white">
      
      {/* 1. Dynamic Animated Client Reviews / Attestations Showcase */}
      <section id="landing-reviews" className="scroll-mt-32">
        <ReviewsShowcase />
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
