import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ContactSectionProps {
  onOpenConsultation: () => void
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10 border-b border-white/[0.06]">
      
      <div className="rounded-[32px] md:rounded-[44px] border border-white/[0.12] bg-gradient-to-b from-[#0e0e13] via-[#08080b] to-[#040406] p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl">
        
        {/* Subtle Ambient Neutral Glow (Zero Pink) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />
        
        {/* 1px Hairline Top Light-Catching Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          {/* Telemetry Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60 text-xs uppercase tracking-[0.2em] font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Private Soundstage & Concierge Desk</span>
          </div>

          {/* Monumental All-White Headline (Non-cursive, Architectural Authority) */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.05]">
            Initiate Private Atelier Consultation
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            Whether reserving soundstage dates for fine jewellery & couture campaigns, or commissioning discreet supercar and estate allocations, our direct directors respond within four operational hours.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="apple-press inline-flex items-center gap-3 px-9 py-4 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-2xl hover:shadow-white/20 cursor-pointer"
            >
              <span>Dispatch Requisition Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Telemetry Bar Along Bottom (No symbols, no tick marks) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-8 border-t border-white/[0.08] text-left">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] tracking-widest uppercase text-white/40 block font-light mb-1">
                BANGALORE SOUNDSTAGE
              </span>
              <p className="text-sm text-white font-light">
                JP Nagar 7th Phase, South Bengaluru
              </p>
              <span className="text-xs text-white/50 block font-light mt-0.5">By Private Appointment Only</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] tracking-widest uppercase text-white/40 block font-light mb-1">
                PRIORITY DESK
              </span>
              <p className="text-sm text-white font-light">
                <a href="tel:+919916101011" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                  +91 99161 01011
                </a>
              </p>
              <span className="text-xs text-white/50 block font-light mt-0.5">Direct White-Glove Desk</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] tracking-widest uppercase text-white/40 block font-light mb-1">
                CONFIDENTIALITY PROTOCOL
              </span>
              <p className="text-sm text-white font-light">
                Strict Non-Disclosure
              </p>
              <span className="text-xs text-white/50 block font-light mt-0.5">Encrypted Patron Communications</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
