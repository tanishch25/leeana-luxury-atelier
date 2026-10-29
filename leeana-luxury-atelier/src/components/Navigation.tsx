import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

interface NavigationProps {
  onOpenRequisition: () => void
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenRequisition }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'The Atelier', href: '#atelier' },
    { name: 'Curations', href: '#curations' },
    { name: 'Lookbook', href: '#editorial' },
    { name: 'Clientele', href: '#clientele' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#060608]/85 backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between">
          
          {/* Brand Identity: Haute Milanese Luxury */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-couture text-2xl sm:text-3xl tracking-[0.2em] text-[#f4f0ea] group-hover:text-[#c7b299] transition-colors">
              LEEANA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-light tracking-[0.16em] uppercase text-[#969188] hover:text-[#f4f0ea] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Emil Kowalski Apple-Press CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={onOpenRequisition}
              className="apple-press hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.14] text-xs font-light tracking-[0.15em] uppercase text-[#f4f0ea] hover:border-[#c7b299] hover:text-[#c7b299] transition-all bg-white/[0.02]"
            >
              <span>Private Requisition</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="apple-press p-2 md:hidden text-white/80 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#060608]/98 backdrop-blur-2xl flex flex-col justify-center px-12 md:hidden">
          <nav className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-couture text-3xl font-light tracking-widest text-[#f4f0ea] hover:text-[#c7b299] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenRequisition()
              }}
              className="apple-press mt-6 py-4 rounded-full border border-[#c7b299]/50 text-[#c7b299] text-xs font-light tracking-widest uppercase"
            >
              Open Requisition
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
