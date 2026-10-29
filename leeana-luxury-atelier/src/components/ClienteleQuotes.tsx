import React from 'react'

export const ClienteleQuotes: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Leeana introduced our fine jewellery house to a clientele that truly understands heirloom craftsmanship. Their visual macro direction is without equal.",
      author: "Aditi Somani",
      role: "Director, Heritage Fine Jewellery House",
    },
    {
      quote:
        "Working with Leeana feels like a private members' club for premium brands. Refined, attentive, profoundly effective in connecting us with collectors.",
      author: "Vikramaditya Roy",
      role: "Managing Director, Exotic Marque Dealership",
    },
    {
      quote:
        "From the campaign production to the private acquisitions, Leeana sets a standard most luxury platforms only aspire to.",
      author: "Nalini Kirloskar",
      role: "Private Collector & Resident, Bangalore",
    },
  ]

  return (
    <section id="clientele" className="py-32 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto relative z-10 border-t border-white/[0.07]">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pb-20">
        <span className="text-[11px] font-light tracking-[0.25em] text-[#c7b299] uppercase block mb-3">
          // PROVENANCE & TESTAMENTS
        </span>
        <h2 className="font-couture text-4xl sm:text-6xl tracking-tight text-[#f4f0ea]">
          Voices of Our <br />
          <span className="font-editorial italic font-normal text-[#c7b299]">
            Distinguished Clientele.
          </span>
        </h2>
      </div>

      {/* Clean Editorial Quotes Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c10]/40 backdrop-blur-md space-y-8"
          >
            <p className="font-editorial text-lg md:text-xl font-light text-[#f4f0ea]/90 leading-relaxed italic">
              "{t.quote}"
            </p>

            <div className="pt-6 border-t border-white/[0.06]">
              <h4 className="font-editorial text-base text-white tracking-wide">
                {t.author}
              </h4>
              <p className="text-xs text-[#969188] font-light mt-1">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Understated Minimalist Verification Bar */}
      <div className="mt-24 py-8 border-y border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#969188]">
        <div>
          <span className="font-editorial text-3xl text-[#c7b299] block mb-1">100%</span>
          <p className="text-[10px] tracking-[0.2em] uppercase font-light">Vetted Provenance</p>
        </div>
        <div>
          <span className="font-editorial text-3xl text-white block mb-1">4K HDR</span>
          <p className="text-[10px] tracking-[0.2em] uppercase font-light">Cinema Mastering</p>
        </div>
        <div>
          <span className="font-editorial text-3xl text-[#c7b299] block mb-1">Discreet</span>
          <p className="text-[10px] tracking-[0.2em] uppercase font-light">Private Protocol</p>
        </div>
        <div>
          <span className="font-editorial text-3xl text-white block mb-1">Global</span>
          <p className="text-[10px] tracking-[0.2em] uppercase font-light">Clientele Network</p>
        </div>
      </div>

    </section>
  )
}
