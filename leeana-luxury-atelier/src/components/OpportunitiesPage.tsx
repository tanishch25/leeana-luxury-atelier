import React from 'react'
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'

export const OpportunitiesPage: React.FC = () => {
  const handleWhatsApp = () => {
    const msg = `Hello Leeana Talent Desk,\n\nI am interested in joining the Leeana model roster.\n\nName:\nPhone:\nInstagram / Portfolio:\nHeight & Location:`
    window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-20 md:pb-32 px-4 sm:px-8 md:px-14 max-w-[1600px] mx-auto relative z-10 text-white space-y-16">
      
      {/* 1. Header Hero Deck (Clean, Subtle Monochrome Luxury - Zero Gold) */}
      <section className="space-y-4 max-w-4xl border-b border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/70 font-medium">
            Talent Representation & Model Roster
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.05]">
          Opportunities · Join the Faces of Leeana
        </h1>
        <p className="text-white/70 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl">
          We scout emerging and established models, runway muses, fashion stylists, and creative visionaries to join the prestigious Leeana talent network. Headline premier brand shoots, haute joaillerie films, and couture campaigns.
        </p>
      </section>

      {/* 2. Main Editorial Presentation Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Representation Disciplines & Direct Contact (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 sm:p-6 rounded-[22px] border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/25 transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 font-mono">01</span>
              <h3 className="font-display text-base text-white font-medium mb-1.5">
                Commercial & Runway
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Headline campaigns for designer bridal ateliers, luxury labels, and international commercial brands.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-[22px] border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/25 transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 font-mono">02</span>
              <h3 className="font-display text-base text-white font-medium mb-1.5">
                Bangalore Soundstage
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Direct work with cinema optics, calibrated chiaroscuro macro lighting, and expert fashion stylists.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-[22px] border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/25 transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 font-mono">03</span>
              <h3 className="font-display text-base text-white font-medium mb-1.5">
                Open Representation
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Flexible agency representation, competitive commission rates, and direct portfolio placement across luxury media.
              </p>
            </div>
          </div>

          {/* Submission Guidelines Note */}
          <div className="p-6 rounded-[22px] border border-white/10 bg-[#08080b] space-y-2">
            <h4 className="font-display text-sm uppercase tracking-widest text-white/80 font-medium">
              Submission Guidelines
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Please include your full name, contact number, Instagram or portfolio link, height, and recent unedited digitals/polaroids. Our talent desk reviews submissions weekly.
            </p>
          </div>

          {/* Direct Contact Action Triggers (Strictly WhatsApp & Email — No Enrollments) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleWhatsApp}
              className="apple-press px-8 sm:px-9 py-4 rounded-full bg-white hover:bg-white/90 text-black text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2.5 shadow-xl cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-black" />
              <span>Contact On WhatsApp</span>
            </button>

            <a
              href="mailto:info@leeana.in?subject=Model%20Roster%20Application%20-%20Leeana%20Talent&body=Hello%20Leeana%20Talent%20Desk,%0A%0AFull%20Name:%20%0APhone%20Number:%20%0AInstagram%20/%20Portfolio:%20%0AHeight%20&%20Current%20Location:%20%0AExperience%20Summary:%20"
              className="apple-press px-8 sm:px-9 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white hover:text-black text-xs sm:text-sm uppercase tracking-[0.16em] text-white transition-all flex items-center gap-2.5 cursor-pointer backdrop-blur-md"
            >
              <Mail className="w-4 h-4" />
              <span>Email Portfolio</span>
            </a>
          </div>

        </div>

        {/* Right Column: Unique New Model Editorial Portrait (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] border border-white/15 bg-black shadow-2xl group">
            <img
              src="/assets/editorial-fashion-2.jpg"
              alt="Leeana Model Talent Editorial Portrait"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-mono">
                Archival Editorial Series
              </span>
              <h4 className="font-display text-xl sm:text-2xl text-white font-light">
                Couture & Runway Talent
              </h4>
              <p className="text-xs text-white/70 font-light">
                Bangalore soundstage sessions & designer campaign productions.
              </p>
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}
