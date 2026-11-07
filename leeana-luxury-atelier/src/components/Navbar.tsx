import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X, Film } from 'lucide-react'

export type NavPage = 'home' | 'studios' | 'specializations' | 'lookbook' | 'concierge' | 'opportunities'

interface NavbarProps {
  activePage: NavPage
  onNavigate: (page: NavPage) => void
  onOpenConsultation: () => void
  onOpenOurWorksShorts?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenConsultation,
  onOpenOurWorksShorts,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Atelier' },
    { id: 'studios', label: 'Studios' },
    { id: 'specializations', label: 'Specializations' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'concierge', label: 'Concierge' },
    { id: 'opportunities', label: 'Opportunities' },
  ]

  const handleLinkClick = (page: NavPage) => {
    onNavigate(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Top Main Navigation Header (On mobile: visible at the start, smoothly glides up & vanishes on scroll down) */}
      <header
        className={`fixed top-5 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? '-translate-y-28 opacity-0 md:translate-y-0 md:opacity-100'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div
          className={`pointer-events-auto max-w-[1580px] mx-auto flex items-center justify-between px-6 sm:px-10 py-4 md:py-5 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-black/85 border border-white/[0.16] backdrop-blur-2xl shadow-2xl shadow-black/90'
              : 'bg-black/50 border border-white/[0.1] backdrop-blur-xl'
          }`}
        >
          {/* Brand Mark: LEEANA (Strictly without .IN, Same Bespoke Couture Font) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <span className="font-couture text-2xl sm:text-3xl tracking-[0.26em] text-white transition-opacity group-hover:opacity-80">
              LEEANA
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10">
            {navLinks.map((item) => {
              const isActive = activePage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`apple-press cursor-pointer px-4 lg:px-5 py-2 rounded-full text-xs tracking-[0.14em] uppercase transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-white/60 hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Right Action: Let's Talk Pill Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="apple-press group cursor-pointer hidden sm:inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full border border-white/20 bg-white/[0.08] hover:bg-white hover:text-black hover:border-white backdrop-blur-md text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-white transition-all shadow-lg"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black" />
            </button>

            {/* Mobile Animated Fluid Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] active:scale-90 border border-white/10 hover:border-white/25 transition-all duration-300 md:hidden cursor-pointer backdrop-blur-md"
            >
              <div className="w-5 h-3.5 relative flex flex-col justify-between items-center pointer-events-none">
                {/* Top Bar */}
                <span
                  className={`h-[1.5px] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileOpen
                      ? 'w-5 translate-y-[6px] rotate-45'
                      : 'w-5 translate-y-0 rotate-0'
                  }`}
                />
                {/* Middle Bar */}
                <span
                  className={`h-[1.5px] rounded-full bg-white transition-all duration-200 ease-out ${
                    mobileOpen ? 'w-0 opacity-0 scale-x-0' : 'w-3.5 self-start opacity-70'
                  }`}
                />
                {/* Bottom Bar */}
                <span
                  className={`h-[1.5px] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileOpen
                      ? 'w-5 -translate-y-[6px] -rotate-45'
                      : 'w-5 translate-y-0 rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Apple Fluid Transition */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-3xl flex flex-col justify-center px-8 md:hidden animate-in fade-in duration-300">
          <div className="max-w-md mx-auto w-full space-y-8">
            <nav className="flex flex-col gap-5 text-center">
              {navLinks.map((item, idx) => {
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className={`font-display text-2xl tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer py-2 ${
                      isActive
                        ? 'text-white font-normal drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                        : 'text-white/45 hover:text-white font-light'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onOpenOurWorksShorts?.()
                }}
                className="w-full py-3.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-medium text-xs tracking-[0.18em] uppercase cursor-pointer hover:bg-white/[0.14] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Our Work</span>
              </button>

              <button
                onClick={() => {
                  setMobileOpen(false)
                  const msg = `Hello Leeana Fashion Concierge,\n\nI wish to schedule a private brand shoot inquiry.`
                  window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
                }}
                className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs tracking-[0.18em] uppercase cursor-pointer hover:bg-white/90 active:scale-98 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current text-black shrink-0" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.58c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                </svg>
                <span>WhatsApp Desk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bespoke Mobile Floating Bottom Navigation Dock (Strictly Mobile: md:hidden) */}
      {!mobileOpen && (
        <aside
          aria-label="Mobile Navigation Dock"
          className="fixed bottom-5 inset-x-0 z-40 px-4 flex justify-center pointer-events-none md:hidden transition-all duration-300"
        >
          <div className="pointer-events-auto flex items-center gap-2.5 p-1.5 rounded-full bg-black/85 border border-white/[0.18] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] max-w-sm w-full mx-auto">
            
            {/* 1. Our Work Button (Opens Vertical Short-Form Video Reels) — Pure Typography, No Emoji/Icon */}
            <button
              onClick={() => {
                if (onOpenOurWorksShorts) {
                  onOpenOurWorksShorts()
                } else {
                  handleLinkClick('home')
                  setTimeout(() => {
                    document.getElementById('our-works')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }
              }}
              aria-label="Open Our Work Reels"
              className="apple-press flex-1 flex items-center justify-center py-3 px-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 border border-white/12 text-white transition-all cursor-pointer shadow-md group"
            >
              <span className="font-couture text-[11px] sm:text-xs tracking-[0.18em] uppercase font-medium">
                Our Work
              </span>
            </button>

            {/* 2. WhatsApp Desk Button in Same Aesthetic (Replaces Let's Connect with Luxury WhatsApp Icon & Link) */}
            <button
              onClick={() => {
                const msg = `Hello Leeana Fashion Concierge,\n\nI wish to schedule a private brand shoot inquiry.`
                window.open(`https://wa.me/919916101011?text=${encodeURIComponent(msg)}`, '_blank')
              }}
              aria-label="Connect on WhatsApp"
              className="apple-press flex-1 flex items-center justify-center gap-2 py-3 px-3.5 rounded-full bg-white text-black hover:bg-white/90 active:scale-95 border border-white text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase transition-all shadow-[0_8px_24px_rgba(255,255,255,0.22)] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-black shrink-0" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.58c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
              </svg>
              <span className="font-couture">
                WhatsApp
              </span>
            </button>

          </div>
        </aside>
      )}
    </>
  )
}
