import React, { useState } from 'react'
import { X, ArrowRight, MessageCircle } from 'lucide-react'

interface RequisitionDossierProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

export const RequisitionDossier: React.FC<RequisitionDossierProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(
    initialService || 'Fashion & Couture'
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const disciplines = [
    'Fashion & Couture',
    'Haute Joaillerie',
    'Cafe & Culinary',
    'Commercial Brands',
  ]

  const getEmailContent = () => {
    const subject = `Atelier Appointment Booking: ${selectedDiscipline} — ${name || 'Confidential Patron'}`
    const body = `Hello Leeana Fashion Concierge Desk,\n\nI wish to book an Atelier Appointment for a Premium & Luxury Brand Shoot:\n\n- Discipline: ${selectedDiscipline}\n- Client / Maison: ${name || 'Confidential'}\n- Phone / WhatsApp: ${phone || 'Confidential'}\n- Mandate / Brief: ${notes || 'Direct soundstage appointment requested.'}\n\nPlease confirm soundstage schedule and production brief.`
    return { subject, body }
  }

  const handleWhatsApp = () => {
    const msg = `Hello Leeana Fashion Concierge Desk,\n\nI wish to schedule a Private Session for a Brand Shoot:\n- Discipline: ${selectedDiscipline}\n- Name: ${name || 'Confidential Patron'}\n- Phone: ${phone || 'Confidential'}\n- Brief: ${notes || 'Direct appointment requested.'}`
    window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleBookGmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitted(true)
    const { subject, body } = getEmailContent()
    
    // Direct Gmail web compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Info@leeana.in&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open Gmail directly in a new tab
    const newWindow = window.open(gmailUrl, '_blank')
    
    // Fallback: if popup blocked or client prefers native mailto
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setTimeout(() => {
        window.location.href = `mailto:Info@leeana.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }, 300)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-start sm:items-center justify-center p-3 sm:p-6 pt-6 sm:pt-6 pb-12 sm:pb-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Ultra-Sleek Glassmorphic Modal Card - Fits any phone frame flawlessly with zero font jitter */}
      <div data-dossier-card className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto scrollbar-none rounded-[28px] sm:rounded-[36px] bg-[#09090d] border border-white/[0.14] p-5 sm:p-8 md:p-10 text-white shadow-[0_40px_100px_rgba(0,0,0,0.95)] my-0 sm:my-auto">
        
        {/* Soft Ambient Radial Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-white/[0.05] blur-3xl pointer-events-none rounded-full" />

        {/* 1px Hairline Top Light-Catching Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="apple-press absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:text-black flex items-center justify-center text-white/70 transition-all cursor-pointer backdrop-blur-md z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Clean & Slick */}
        <div className="space-y-1.5 max-w-md pr-8 sm:pr-0">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/50 block font-light">
            Leeana Fashion Concierge · Book Appointment
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            Schedule Atelier Session
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            Direct soundstage access in JP Nagar, Bengaluru for premium and luxury brand shoots.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <h3 className="font-display text-2xl text-white font-light">
              Appointment Dispatched
            </h3>
            <p className="text-sm text-white/75 max-w-md mx-auto font-light leading-relaxed">
              Your appointment booking has been initiated directly to Gmail at <span className="text-white font-medium">Info@leeana.in</span>. Our board desk will confirm within 4 operational hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => handleBookGmail()}
                className="apple-press px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Reopen in Gmail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleWhatsApp}
                className="apple-press px-6 py-3 rounded-full border border-white/20 text-xs font-medium uppercase tracking-wider text-white hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Desk</span>
              </button>
              <button
                onClick={onClose}
                className="apple-press px-6 py-3 rounded-full border border-white/10 text-xs uppercase tracking-wider text-white/60 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookGmail} className="mt-5 sm:mt-8 space-y-4 sm:space-y-5">
            
            {/* Discipline Selector: Clean 4-Pill Segmented Grid */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-2">
                Discipline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {disciplines.map((d) => {
                  const isActive = selectedDiscipline.toLowerCase().includes(d.toLowerCase()) || selectedDiscipline === d
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDiscipline(d)}
                      className={`apple-press py-2 sm:py-2.5 px-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-medium tracking-wide transition-all cursor-pointer text-center select-none ${
                        isActive
                          ? 'bg-white text-black shadow-md'
                          : 'bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {d}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Inputs: Clean 2-Column Coordinates with Anti-Zoom & Anti-Jitter Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-1.5">
                  Name / Maison
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => window.scrollTo(window.scrollX, window.scrollY)}
                  placeholder="e.g. Somani Jewellers"
                  className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-[16px] leading-normal font-sans focus:outline-none focus:border-white focus:bg-white/[0.06] transition-colors duration-150"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => window.scrollTo(window.scrollX, window.scrollY)}
                  placeholder="+91 99161 01011"
                  className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-[16px] leading-normal font-sans focus:outline-none focus:border-white focus:bg-white/[0.06] transition-colors duration-150"
                />
              </div>
            </div>

            {/* Brief Scope */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-1.5">
                Mandate Details (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => window.scrollTo(window.scrollX, window.scrollY)}
                placeholder="Preferred shoot dates, piece count, or acquisition requirements..."
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-[16px] leading-normal font-sans focus:outline-none focus:border-white focus:bg-white/[0.06] transition-colors duration-150 resize-none"
              />
            </div>

            {/* Actions: Clean & Balanced */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2">
              <button
                type="submit"
                className="apple-press w-full sm:flex-1 py-3.5 px-6 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.16em] hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Book via Gmail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="apple-press w-full sm:w-auto py-3.5 px-6 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 text-white text-xs font-medium uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white/90" />
                <span>WhatsApp Desk</span>
              </button>
            </div>

            {/* Footer Colophon */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] sm:text-[11px] font-light text-white/40">
              <span>JP Nagar 3rd Phase, Bangalore</span>
              <span>Encrypted & Strict NDA Protocol</span>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}
