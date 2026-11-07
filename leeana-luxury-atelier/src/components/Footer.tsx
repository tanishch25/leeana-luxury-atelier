import React, { useState } from 'react'
import { ArrowUpRight, MapPin, Mail, MessageCircle, Phone } from 'lucide-react'

export const Footer: React.FC<{
  onOpenRequisition: (mandate?: string) => void
  onNavigateOpportunities?: () => void
}> = ({ onOpenRequisition, onNavigateOpportunities }) => {
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
                onClick={onNavigateOpportunities || (() => onOpenRequisition('Model Roster Application: New Talent Representation'))}
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

          {/* Authentic Official Social Media Icons (Pure Black Circle Housing Official Brand SVGs) */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {/* Instagram (Official Brand SVG in Black Circle) */}
            <a
              href="https://www.instagram.com/leeana.in?xtok=MTNianE5anNlMTloeg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-white/15 hover:border-white/50 hover:bg-white/[0.08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl group"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* LinkedIn (Official Brand SVG in Black Circle) */}
            <a
              href="https://www.linkedin.com/search/results/all/?keywords=leeana%20fashion%20concierge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-white/15 hover:border-white/50 hover:bg-white/[0.08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl group"
            >
              <svg className="w-4.5 h-4.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* YouTube (Official Brand SVG in Black Circle) */}
            <a
              href="https://youtube.com/@leeanafashion?si=i4mlCQfSsIdN8CLu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-white/15 hover:border-white/50 hover:bg-white/[0.08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl group"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Facebook (Official Brand SVG in Black Circle) */}
            <a
              href="https://www.facebook.com/share/19eBPQMB1a/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-white/15 hover:border-white/50 hover:bg-white/[0.08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl group"
            >
              <svg className="w-4.5 h-4.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* WhatsApp (Official Brand SVG in Black Circle) */}
            <button
              onClick={handleWhatsApp}
              aria-label="WhatsApp Desk"
              className="apple-press w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border border-white/15 hover:border-white/50 hover:bg-white/[0.08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl group"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.1-.476-.15-.677.15-.2.301-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.271-.469-2.42-1.494-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.236-.245-.589-.494-.509-.677-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.2 2.124 3.243 5.145 4.544.719.31 1.281.495 1.719.634.722.23 1.379.197 1.9.12.58-.087 1.78-.728 2.03-1.43.25-.703.25-1.305.176-1.43-.075-.126-.276-.201-.577-.351zm-5.432 7.618c-1.99 0-3.87-.534-5.501-1.464l-.394-.225-4.088 1.073 1.092-3.985-.246-.391c-1.02-1.62-1.563-3.504-1.563-5.438 0-5.772 4.696-10.468 10.47-10.468 2.798 0 5.428 1.09 7.406 3.069 1.979 1.978 3.068 4.608 3.068 7.406 0 5.773-4.696 10.468-10.47 10.468zm0-22c-6.627 0-12 5.373-12 12 0 2.115.549 4.104 1.509 5.836l-1.509 5.514 5.641-1.48c1.678.915 3.593 1.43 5.629 1.43 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
              </svg>
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
