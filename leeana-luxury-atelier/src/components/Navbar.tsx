import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export type NavPage = 'home' | 'studios' | 'specializations' | 'lookbook' | 'concierge'

interface NavbarProps {
  activePage: NavPage
  onNavigate: (page: NavPage) => void
  onOpenConsultation: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenConsultation,
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
    { id: 'concierge', label: 'Services' },
  ]

  const handleLinkClick = (page: NavPage) => {
    onNavigate(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 pointer-events-none transition-all duration-500">
        <div
          className={`pointer-events-auto max-w-[1580px] mx-auto flex items-center justify-between px-6 sm:px-10 py-4 md:py-5 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-black/85 border border-white/[0.16] backdrop-blur-2xl shadow-2xl shadow-black/90'
              : 'bg-black/50 border border-white/[0.1] backdrop-blur-xl'
          }`}
        >
          {/* Brand Mark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <span className="font-couture text-2xl sm:text-3xl tracking-[0.28em] text-white transition-opacity group-hover:opacity-80">
              LEEANA
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10">
            {navLinks.map((item) => {
              const isActive = activePage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`apple-press cursor-pointer px-6 py-2.5 rounded-full text-xs sm:text-[13px] tracking-[0.16em] uppercase transition-all ${
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

            <div className="pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onOpenConsultation()
                }}
                className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs tracking-[0.18em] uppercase cursor-pointer hover:bg-white/90 active:scale-98 transition-all shadow-xl"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
