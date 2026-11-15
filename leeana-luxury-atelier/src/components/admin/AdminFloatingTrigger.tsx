import React from 'react'
import { Sliders, Lock } from 'lucide-react'
import { useAtelierContent } from '../../context/AtelierContentContext'

export const AdminFloatingTrigger: React.FC = () => {
  const { setIsAdminOpen, isAuthenticated, isAdminOpen } = useAtelierContent()

  // Hide if the main admin drawer is already open
  if (isAdminOpen) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <button
        onClick={() => setIsAdminOpen(true)}
        className="apple-press group px-4 py-2.5 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white backdrop-blur-2xl text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2.5 shadow-2xl cursor-pointer"
        title="Open Atelier Studio Desk (Ctrl+Shift+A)"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-black transition-colors" />
        <span>Atelier Desk</span>
        {isAuthenticated ? (
          <Sliders className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <Lock className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </div>
  )
}
