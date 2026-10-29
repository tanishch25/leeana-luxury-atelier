import React, { useState } from 'react'
import { ArrowUpRight, MapPin, Mail, MessageCircle } from 'lucide-react'

export const Footer: React.FC<{ onOpenRequisition: () => void }> = ({ onOpenRequisition }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  const handleWhatsApp = () => {
    const msg = `Hello Leeana Atelier,\n\nI wish to connect with the Private Desk.`
    window.open(`https://wa.me/918585906629?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <footer className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 border-t border-white/[0.08] bg-[#050507] text-white z-10 rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      
      {/* Neutral ambient glow blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />
      
      {/* Calibrated Container Engineered for Opera, Wide & Standard Screens */}
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Top Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 sm:pb-20 border-b border-white/[0.08]">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-couture text-4xl sm:text-5xl lg:text-6xl tracking-[0.25em] text-white block">
              LEEANA
            </span>

            <p className="text-base sm:text-lg text-white/85 font-light max-w-xl leading-relaxed">
              Curating the world's most distinguished luxury brands and experiences under one sophisticated destination. Commercial film production, fine joaillerie macro direction, and private concierge acquisitions.
            </p>

            <div className="space-y-3.5 text-base sm:text-lg font-light text-white/80 pt-2">
              <div className="flex items-center gap-3.5">
                <MapPin className="w-5 h-5 text-white/70 shrink-0" />
                <span>JP Nagar, 3rd Phase, Bangalore - 560078, India</span>
              </div>
              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-white/70 shrink-0" />
                <a href="mailto:Info@leeana.in" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                  Info@leeana.in
                </a>
              </div>
            </div>
          </div>

          {/* Confidential Dispatch & Form Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:space-y-0">
            <div>
              <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-white/60 uppercase block mb-3">
                CONFIDENTIAL DISPATCH
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white font-light tracking-tight leading-tight">
                Private Members' Invitations
              </h3>
              <p className="text-base sm:text-lg text-white/75 font-light mt-3 max-w-lg leading-relaxed">
                Receive confidential notifications regarding new fine jewellery collections, exotic supercar deliveries, and private estate viewings.
              </p>

              {subscribed ? (
                <div className="mt-8 text-base text-white font-light tracking-wider p-4 rounded-2xl bg-white/[0.04] border border-white/20">
                  Coordinates registered. Welcome to Leeana.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter confidential email..."
                    className="flex-1 px-7 py-4 rounded-full bg-white/[0.04] border border-white/15 text-base text-white placeholder-white/35 focus:outline-none focus:border-white transition-colors shadow-inner"
                  />
                  <button
                    type="submit"
                    className="apple-press px-9 py-4 rounded-full border border-white/25 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-all bg-white/[0.05] cursor-pointer shrink-0 shadow-lg"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={onOpenRequisition}
                className="apple-press inline-flex items-center gap-2.5 text-sm sm:text-base font-light tracking-[0.18em] uppercase text-white hover:text-white/80 cursor-pointer"
              >
                <span>Direct Services Desk</span>
                <ArrowUpRight className="w-4.5 h-4.5" />
              </button>
              <span className="text-xs sm:text-sm font-light tracking-widest uppercase text-white/45">
                DISCREET & ENCRYPTED
              </span>
            </div>

          </div>

        </div>

        {/* Monumental Watermark (Fluid clamped & perfectly responsive for Opera) */}
        <div className="py-12 md:py-20 select-none overflow-hidden flex justify-center items-center w-full">
          <h1 className="font-display text-[clamp(4.5rem,14vw,11.5rem)] font-light leading-none text-white/[0.18] tracking-[0.16em] text-center uppercase pointer-events-none select-none whitespace-nowrap">
            LEEANA
          </h1>
        </div>

        {/* Low End Colophon with Enhanced Proportions for Opera */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 pt-10 border-t border-white/[0.08] text-sm sm:text-base font-light text-white/70 w-full">
          <div className="text-center xl:text-left">
            © {new Date().getFullYear()} LEEANA MAISON & ATELIER. ALL RIGHTS RESERVED.
          </div>

          {/* Social Channels Icons (Instagram, LinkedIn, YouTube, WhatsApp) */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="apple-press w-12 h-12 rounded-full border border-white/20 bg-white/[0.04] hover:border-white hover:bg-white hover:text-black text-white/90 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="apple-press w-12 h-12 rounded-full border border-white/20 bg-white/[0.04] hover:border-white hover:bg-white hover:text-black text-white/90 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" r="2"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="apple-press w-12 h-12 rounded-full border border-white/20 bg-white/[0.04] hover:border-white hover:bg-white hover:text-black text-white/90 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              aria-label="WhatsApp Desk"
              className="apple-press w-12 h-12 rounded-full border border-white/20 bg-white/[0.04] hover:border-white hover:bg-white hover:text-black text-white/90 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Atelier Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/60">
            <span>BANGALORE ATELIER</span>
            <span>HAUTE DIRECTION</span>
            <span>PRIVATE DESK</span>
          </div>
        </div>

      </div>

    </footer>
  )
}
