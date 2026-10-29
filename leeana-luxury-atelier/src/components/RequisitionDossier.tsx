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
    initialService || 'Haute Joaillerie'
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const disciplines = [
    'Haute Joaillerie',
    'Fashion & Couture',
    'Exotic Fleet',
    'Estates & Cellars',
  ]

  const handleWhatsApp = () => {
    const msg = `Hello Leeana Atelier Desk,\n\nI wish to schedule a Private Session:\n- Discipline: ${selectedDiscipline}\n- Name: ${name || 'Confidential Patron'}\n- Phone: ${phone || 'Confidential'}\n- Brief: ${notes || 'Direct appointment requested.'}`
    window.open(`https://wa.me/918585906629?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      window.location.href = `mailto:Info@leeana.in?subject=Atelier Appointment: ${selectedDiscipline}&body=Client: ${name}%0D%0APhone: ${phone}%0D%0ABrief: ${notes}`
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      
      {/* Ultra-Sleek Glassmorphic Modal Card */}
      <div className="relative w-full max-w-2xl rounded-[32px] sm:rounded-[40px] bg-[#09090d] border border-white/[0.14] p-6 sm:p-10 md:p-12 text-white shadow-[0_40px_100px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Soft Ambient Radial Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-white/[0.05] blur-3xl pointer-events-none rounded-full" />

        {/* 1px Hairline Top Light-Catching Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="apple-press absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:text-black flex items-center justify-center text-white/70 transition-all cursor-pointer backdrop-blur-md z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Clean & Slick */}
        <div className="space-y-2 max-w-md">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/50 block font-light">
            Private Appointment & Inquiry
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            Schedule Atelier Session
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            Direct soundstage access in Bengaluru and confidential private acquisitions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-14 text-center space-y-4">
            <h3 className="font-display text-2xl text-white font-light">
              Appointment Registered
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
              Our direct board desk will confirm your appointment within 4 business hours.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="apple-press px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Desk</span>
              </button>
              <button
                onClick={onClose}
                className="apple-press px-6 py-3 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
            
            {/* Discipline Selector: Clean 4-Pill Segmented Grid */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-2.5">
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
                      className={`apple-press py-2.5 px-3 rounded-2xl text-[11px] font-medium tracking-wide transition-all cursor-pointer text-center select-none ${
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

            {/* Inputs: Clean 2-Column Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-2">
                  Name / Maison
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Somani Jewellers"
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            {/* Brief Scope */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/50 block font-light mb-2">
                Mandate Details (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Preferred shoot dates, piece count, or acquisition requirements..."
                className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all resize-none"
              />
            </div>

            {/* Actions: Clean & Balanced */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                type="submit"
                className="apple-press w-full sm:flex-1 py-3.5 px-6 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.16em] hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Confirm Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="apple-press w-full sm:w-auto py-3.5 px-6 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 text-white text-xs font-light uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white/80" />
                <span>WhatsApp Desk</span>
              </button>
            </div>

            {/* Footer Colophon */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] sm:text-[11px] font-light text-white/40">
              <span>JP Nagar 3rd Phase, Bangalore</span>
              <span>Encrypted & Strict NDA Protocol</span>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}
