import React from 'react'
import { ArrowUpRight, MessageCircle, Mail, Phone } from 'lucide-react'

interface UnifiedCommandSuiteProps {
  onOpenRequisition: (mandate?: string) => void
}

export const UnifiedCommandSuite: React.FC<UnifiedCommandSuiteProps> = ({ onOpenRequisition }) => {
  return (
    <section id="command-suite" className="py-20 md:py-28 px-4 sm:px-8 md:px-12 max-w-[1680px] mx-auto relative z-10 border-t border-white/[0.08]">
      
      {/* Street Art Graffiti Couture Console (Curated Dark Graffiti Wall with "LET'S TALK") */}
      <div className="relative rounded-[36px] sm:rounded-[44px] md:rounded-[52px] overflow-hidden border border-white/[0.16] bg-gradient-to-b from-[#0e0e14] via-[#08080b] to-[#020204] p-8 sm:p-12 md:p-16 lg:p-20 shadow-[0_50px_130px_rgba(0,0,0,0.95)]">
        
        {/* Authentic Dark Urban Graffiti Wall Photography Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img
            src="/assets/graffiti_art_wall.jpg"
            alt="Graffiti Art Wall"
            className="w-full h-full object-cover object-right filter brightness-[0.75] contrast-[1.25] saturate-[1.1] opacity-65 [transform:scale(1.03)]"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
          {/* Street-art directional shadow fades: solid obsidian on the left behind typography, wall texture vibrant on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/92 via-50% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-[#020204]/50" />
        </div>

        {/* Ambient Glow Accent */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[320px] bg-white/[0.04] blur-[150px] rounded-full pointer-events-none" />

        {/* 1px Hairline Top Light-Catching Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        {/* Graffiti Street-Couture Title: Directly opens with "Let's Talk" in authentic graffiti font (Nothing above it) */}
        <div className="relative z-10 pb-10 md:pb-12 max-w-4xl space-y-5">
          <h2 className="font-graffiti text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wide uppercase leading-[0.95] drop-shadow-[0_14px_45px_rgba(0,0,0,0.95)] select-none">
            Let's Talk
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-2xl">
            Commercial 8K RED cinema productions, zero-distortion fine joaillerie macro stages, and confidential exotic hypercar allocations. Drop your directive for direct board response.
          </p>
        </div>

        {/* Action Controls: Ultra-Sleek Direct Buttons */}
        <div className="relative z-10 flex flex-wrap items-center gap-4 pt-4 pb-10 border-b border-white/[0.08]">
          {/* Primary Action Button */}
          <button
            onClick={() => onOpenRequisition("Direct Dialogue - Let's Talk")}
            className="apple-press px-8 sm:px-10 py-4 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-3 shadow-[0_10px_35px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            <span>Start Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918585906629?text=Hello%20Leeana%20Desk,%20Let's%20talk%20about%20a%20Private%20Commission."
            target="_blank"
            rel="noopener noreferrer"
            className="apple-press px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 hover:border-white text-xs font-light tracking-[0.14em] uppercase text-white transition-all flex items-center gap-2.5 backdrop-blur-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white/80" />
            <span>WhatsApp Desk</span>
          </a>

          {/* Direct Phone */}
          <a
            href="tel:+919606199999"
            className="apple-press px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 hover:border-white text-xs font-light tracking-[0.14em] uppercase text-white transition-all flex items-center gap-2.5 backdrop-blur-md cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-white/80" />
            <span>+91 (0) 96061 99999</span>
          </a>

          {/* Direct Email */}
          <a
            href="mailto:Info@leeana.in"
            className="apple-press px-6 py-4 rounded-full border border-white/15 hover:border-white text-xs font-light tracking-[0.14em] uppercase text-white/70 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Info@leeana.in</span>
          </a>
        </div>

        {/* Minimal Architectural Telemetry Strip (Zero Dots) */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs sm:text-sm text-white/65 font-light">
          <span>Bangalore Soundstage / JP Nagar 3rd Phase</span>
          <span>Guaranteed 4-Hour Response SLA</span>
          <span>Strict Non-Disclosure & Encrypted Transmission</span>
        </div>

      </div>

    </section>
  )
}
