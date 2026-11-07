import React from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'

interface CommandAuthoritySectionProps {
  onOpenRequisition: () => void
}

export const CommandAuthoritySection: React.FC<CommandAuthoritySectionProps> = ({
  onOpenRequisition,
}) => {
  return (
    <section id="command-authority" className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 max-w-[1520px] mx-auto relative z-10 border-t border-white/[0.08]">
      
      {/* Sculptural Obsidian Architectural Plate */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden border border-white/[0.12] bg-gradient-to-b from-[#0c0c10] via-[#08080a] to-[#040406] p-8 sm:p-14 md:p-20 shadow-2xl">
        
        {/* 1px Hairline Top Light-Catching Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Ambient Neutral Glow (Zero Pink) */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          
          {/* Telemetry Indicator */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-light">
              Direct Executive Requisitions · Confidential Desk
            </span>
          </div>

          {/* Monumental All-White Headline (Non-cursive, Architectural Authority) */}
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-[-0.04em] leading-[0.96]">
            Command Absolute Distinction
          </h2>

          {/* Refined High-Status Copy */}
          <p className="text-base sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
            Bespoke visual productions and confidential luxury acquisitions engineered for maisons, marques, and patrons that define the benchmark.
          </p>

          {/* High-Craft Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenRequisition}
              className="apple-press px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase hover:bg-white/90 transition-all flex items-center gap-3 shadow-2xl cursor-pointer"
            >
              <span>Commission Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="mailto:info@leeana.in"
              className="apple-press px-7 sm:px-8 py-4 sm:py-4.5 rounded-full border border-white/20 text-xs sm:text-sm font-light tracking-[0.14em] uppercase text-white hover:border-white hover:bg-white/10 transition-all flex items-center gap-2.5 bg-white/[0.04] backdrop-blur-md cursor-pointer"
            >
              <span>Direct Inquiry</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  )
}
