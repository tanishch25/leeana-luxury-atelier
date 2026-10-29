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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 md:hidden text-white/80 hover:text-white cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-10 md:hidden animate-in fade-in duration-300">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`font-display text-2xl tracking-wide uppercase transition-colors cursor-pointer ${
                  activePage === item.id ? 'text-white font-semibold' : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onOpenConsultation()
                }}
                className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase cursor-pointer"
              >
                Let's Talk
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
