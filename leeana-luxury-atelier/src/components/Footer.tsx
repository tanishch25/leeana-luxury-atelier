import React, { useState } from 'react'
import { ArrowUpRight, MapPin, Mail, MessageCircle, Phone } from 'lucide-react'

export const Footer: React.FC<{ onOpenRequisition: (mandate?: string) => void }> = ({ onOpenRequisition }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  const handleWhatsApp = () => {
    const msg = `Hello Leeana Atelier,\n\nI wish to connect with the Private Desk.`
    window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
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
              Leeana Fashion Concierge. We specialise in premium and luxury brand shoots — crafting cinema films, haute joaillerie macro optics, and high-fashion visual narratives that elevate prestige and command markets.
            </p>

            <div className="space-y-3.5 text-base sm:text-lg font-light text-white/80 pt-2">
              <div className="flex items-center gap-3.5">
                <MapPin className="w-5 h-5 text-white/70 shrink-0" />
                <span>JP Nagar, 3rd Phase, Bangalore - 560078, India</span>
              </div>
              <div className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-white/70 shrink-0" />
                <a href="tel:+919916101011" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                  +91 99161 01011
                </a>
              </div>
              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-white/70 shrink-0" />
                <a href="mailto:info@leeana.in" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                  info@leeana.in
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

            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={() => onOpenRequisition('Direct Concierge Desk')}
                className="apple-press inline-flex items-center gap-2 text-sm sm:text-base font-light tracking-[0.16em] uppercase text-white hover:text-white/80 cursor-pointer w-fit group"
              >
                <span className="whitespace-nowrap">Direct Concierge Desk</span>
                <ArrowUpRight className="w-4 h-4 text-white/90 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => onOpenRequisition('Model Roster Application: New Talent Representation')}
                className="apple-press inline-flex items-center gap-1.5 text-xs sm:text-sm font-light tracking-widest uppercase text-white/70 hover:text-white cursor-pointer w-fit"
              >
                <span>Model Opportunities & Representation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>

          </div>

        </div>

        {/* Monumental Watermark (Same Couture Font, Crisp White & Tracking as Top Logo, Strictly Without .IN) */}
        <div className="py-10 sm:py-14 md:py-20 select-none overflow-hidden flex justify-center items-center w-full px-2">
          <h1 className="font-couture text-[9.5vw] sm:text-[11vw] md:text-[clamp(3.5rem,12vw,10.5rem)] font-normal leading-none text-white tracking-[0.22em] text-center uppercase pointer-events-none select-none max-w-full overflow-hidden opacity-90 drop-shadow-[0_10px_40px_rgba(255,255,255,0.15)]">
            LEEANA
          </h1>
        </div>

        {/* Low End Colophon */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 pt-10 border-t border-white/[0.08] text-sm sm:text-base font-light text-white/70 w-full">
          <div className="text-center xl:text-left tracking-wide">
            Leeana Fashion Concierge. All Rights Limited.
          </div>

          {/* Social Channels Icons with Official Company Brand Colors */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {/* Instagram (Official Brand Color) */}
            <a
              href="https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:shadow-[0_0_24px_rgba(225,48,108,0.55)] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* LinkedIn (Official Brand Color) */}
            <a
              href="https://www.linkedin.com/search/results/all/?keywords=leeana%20fashion%20concierge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[0_0_24px_rgba(10,102,194,0.55)] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" r="2"/>
              </svg>
            </a>

            {/* YouTube (Official Brand Color) */}
            <a
              href="https://youtube.com/@leeanafashion?si=i4mlCQfSsIdN8CLu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#FF0000]/40 bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_24px_rgba(255,0,0,0.55)] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
              </svg>
            </a>

            {/* Facebook (Official Brand Color) */}
            <a
              href="https://www.facebook.com/share/19eBPQMB1a/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1877F2]/40 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[0_0_24px_rgba(24,119,242,0.55)] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            {/* WhatsApp (Official Brand Color) */}
            <button
              onClick={handleWhatsApp}
              aria-label="WhatsApp Desk"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_24px_rgba(37,211,102,0.55)] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <MessageCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
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
