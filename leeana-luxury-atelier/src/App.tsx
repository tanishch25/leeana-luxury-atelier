import React, { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar'
import type { NavPage } from './components/Navbar'
import { Hero } from './components/Hero'
import { Statement } from './components/Statement'
import { StudiosGrid } from './components/StudiosGrid'
import { SpecializationsList } from './components/SpecializationsList'
import { LookbookGallery } from './components/LookbookGallery'
import { UnifiedCommandSuite } from './components/UnifiedCommandSuite'
import { StudiosPage } from './components/StudiosPage'
import { ConciergePage } from './components/ConciergePage'
import { OurWorksSection } from './components/OurWorksSection'
import { LandingFaqReviews } from './components/LandingFaqReviews'
import { Footer } from './components/Footer'
import { RequisitionDossier } from './components/RequisitionDossier'
import { MobileShortsModal } from './components/MobileShortsModal'

export function App() {
  const [activePage, setActivePage] = useState<NavPage>('home')
  const [isDossierOpen, setIsDossierOpen] = useState(false)
  const [isShortsOpen, setIsShortsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | undefined>()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Auto-open reels modal if shared URL contains ?reel= parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('reel')) {
      setIsShortsOpen(true)
    }
  }, [])

  // Lenis Inertia Smooth Scrolling with Apple Fluid Physics
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const reqId = requestAnimationFrame(raf)

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)))
      }
      setShowBackToTop(currentScroll > 450)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener('scroll', handleScroll)
      lenis.destroy()
    }
  }, [])

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleOpenRequisition = (serviceName?: string) => {
    setSelectedService(serviceName)
    setIsDossierOpen(true)
  }

  const handleNavigate = (page: NavPage) => {
    setActivePage(page)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-white/20 selection:text-white luxury-grain overflow-x-hidden">
      
      {/* 0. Viewport Hairline Kinetic Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* 1. Bespoke Floating Pill Navigation (Normal natural system cursor active) */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenRequisition()}
        onOpenOurWorksShorts={() => setIsShortsOpen(true)}
      />

      {/* 2. Main Viewport Flow */}
      <main className="relative z-10 pt-4">
        
        {/* Flagship Atelier View */}
        {activePage === 'home' && (
          <div className="animate-in fade-in duration-500">
            <Hero onOpenConsultation={() => handleOpenRequisition()} />
            <Statement />
            <StudiosGrid onSelectStudio={(studio) => handleOpenRequisition(studio)} />
            <SpecializationsList onSelectSpecialization={(spec) => handleOpenRequisition(spec)} />
            <OurWorksSection
              onNavigateServices={() => {
                setActivePage('concierge')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onOpenOurWorksShorts={() => setIsShortsOpen(true)}
              isPaused={isShortsOpen}
            />
            <LookbookGallery />
            <LandingFaqReviews />
            <UnifiedCommandSuite onOpenRequisition={(mandate) => handleOpenRequisition(mandate)} />
          </div>
        )}

        {/* Dedicated Picture-First Studios View */}
        {activePage === 'studios' && (
          <div className="animate-in fade-in duration-500 pt-8">
            <StudiosPage onOpenRequisition={(studio) => handleOpenRequisition(studio)} />
            <UnifiedCommandSuite onOpenRequisition={(mandate) => handleOpenRequisition(mandate)} />
          </div>
        )}

        {/* Dedicated Specializations View */}
        {activePage === 'specializations' && (
          <div className="animate-in fade-in duration-500 pt-16">
            <SpecializationsList onSelectSpecialization={(spec) => handleOpenRequisition(spec)} />
            <UnifiedCommandSuite onOpenRequisition={(mandate) => handleOpenRequisition(mandate)} />
          </div>
        )}

        {/* Dedicated Pinterest-Style Lookbook View */}
        {activePage === 'lookbook' && (
          <div className="animate-in fade-in duration-500 pt-8">
            <LookbookGallery />
            <UnifiedCommandSuite onOpenRequisition={(mandate) => handleOpenRequisition(mandate)} />
          </div>
        )}

        {/* Dedicated Insane Aesthetic Concierge View */}
        {activePage === 'concierge' && (
          <div className="animate-in fade-in duration-500 pt-8">
            <ConciergePage onOpenRequisition={(mandate) => handleOpenRequisition(mandate)} />
          </div>
        )}

      </main>

      {/* 3. Sculptural Monumental Footer */}
      <Footer onOpenRequisition={() => handleOpenRequisition()} />

      {/* Floating Apple-Style Back-to-Top Capsule (Offset on mobile so it doesn't clash with bottom dock) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to Top"
        className={`fixed bottom-22 right-4 md:bottom-6 md:right-6 z-30 px-4 py-2.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-2xl text-white text-xs font-light tracking-[0.2em] uppercase transition-all duration-400 flex items-center gap-2 shadow-2xl hover:border-white hover:bg-white hover:text-black cursor-pointer ${
          showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span>TOP</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* 4. Confidential Requisition Dossier Modal */}
      <RequisitionDossier
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        initialService={selectedService}
      />

      {/* 5. Mobile-Specific Vertical Short-Form Video Reels Modal (Strictly Mobile Only) */}
      <MobileShortsModal
        isOpen={isShortsOpen}
        onClose={() => setIsShortsOpen(false)}
        onOpenConnect={() => handleOpenRequisition()}
      />

    </div>
  )
}

export default App
