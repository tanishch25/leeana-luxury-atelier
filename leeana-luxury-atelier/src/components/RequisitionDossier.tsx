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
    initialService || ''
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitted(true)

    const genre = selectedDiscipline.trim() || 'Custom Luxury Shoot'
    const clientName = name.trim() || 'Confidential Client'
    const contactPhone = phone.trim() || 'Direct WhatsApp'
    const shootDetails = notes.trim() || 'Direct consultation and booking requested.'

    const msg = `Hello Leeana Concierge,\n\nI wish to book a brand shoot session:\n\n• Genre / Discipline: ${genre}\n• Client / Brand Name: ${clientName}\n• Contact Phone: ${contactPhone}\n• Shoot Details & Requirements: ${shootDetails}\n\nPlease share availability and production details.`

    window.open(
      `https://wa.me/919916101011?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleBookGmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const genre = selectedDiscipline.trim() || 'Custom Luxury Shoot'
    const clientName = name.trim() || 'Confidential Client'
    const contactPhone = phone.trim() || 'Confidential'
    const shootDetails = notes.trim() || 'Direct appointment requested.'

    const subject = `Atelier Booking Inquiry: ${genre} · ${clientName}`
    const body = `Hello Leeana Concierge Desk,\n\nI wish to book an Atelier Appointment for a Brand Shoot:\n\n• Genre / Discipline: ${genre}\n• Client / Brand Name: ${clientName}\n• Contact Phone: ${contactPhone}\n• Shoot Details & Requirements: ${shootDetails}\n\nPlease confirm availability and production brief.`
    
    // Direct Gmail web compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@leeana.in&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open Gmail directly in a new tab
    const newWindow = window.open(gmailUrl, '_blank')
    
    // Fallback: if popup blocked or client prefers native mailto
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setTimeout(() => {
        window.location.href = `mailto:info@leeana.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
            Direct studio access in JP Nagar, Bengaluru for premium and luxury brand shoots.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <h3 className="font-display text-2xl text-white font-light">
              Inquiry Dispatched to WhatsApp
            </h3>
            <p className="text-sm text-white/75 max-w-md mx-auto font-light leading-relaxed">
              Your inquiry has been formatted and transferred to our direct WhatsApp desk at <span className="text-white font-medium">+91 99161 01011</span>. Our concierge team will review and reply promptly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => handleWhatsApp()}
                className="apple-press px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Reopen WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
          <form onSubmit={handleWhatsApp} className="mt-5 sm:mt-8 space-y-4 sm:space-y-5">
            
            {/* Discipline / Genre: Client Types Directly */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-1.5">
                Shoot Genre / Discipline
              </label>
              <input
                type="text"
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                onBlur={() => window.scrollTo(window.scrollX, window.scrollY)}
                placeholder="e.g. Culinary Shoot, Commercial Brand, Haute Couture, Jewellery..."
                className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-[15px] sm:text-[16px] leading-normal font-sans focus:outline-none focus:border-white focus:bg-white/[0.06] transition-colors duration-150"
              />
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
                Shoot Details & Requirements (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => window.scrollTo(window.scrollX, window.scrollY)}
                placeholder="Preferred shoot dates, piece count, or creative requirements..."
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-[16px] leading-normal font-sans focus:outline-none focus:border-white focus:bg-white/[0.06] transition-colors duration-150 resize-none"
              />
            </div>

            {/* Actions: WhatsApp as Default Primary */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="apple-press w-full py-4 px-6 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xl"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Send via WhatsApp (+91 99161 01011)</span>
                <ArrowRight className="w-3.5 h-3.5 text-black/60" />
              </button>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleBookGmail}
                  className="text-[11px] text-white/50 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
                >
                  Or send inquiry via email (info@leeana.in)
                </button>
              </div>
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
