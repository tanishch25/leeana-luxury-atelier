import React, { useState } from 'react'
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Shield,
  CheckCircle2,
  Film,
  Camera,
  Layers,
  Sparkles,
  MessageSquare,
  Globe,
  Sliders,
  Eye,
  Lock,
  ArrowRight,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useAtelierContent, type AdminTab } from '../../context/AtelierContentContext'
import { MediaUploader } from './MediaUploader'
import type { ReelItem, LookbookItem, HeroSlide, ConciergeCard, TestimonialItem } from '../../types/atelierContent'

export const AtelierAdminSuite: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    activeAdminTab,
    setActiveAdminTab,
    isAuthenticated,
    authenticate,
    logout,
    reels,
    addReel,
    updateReel,
    deleteReel,
    moveReel,
    lookbookColumns,
    addLookbookItem,
    updateLookbookItem,
    deleteLookbookItem,
    moveLookbookItemToColumn,
    heroSlides,
    updateHeroSlide,
    conciergeCards,
    updateConciergeCard,
    testimonials,
    updateTestimonial,
    resetToDefaults,
    exportJson,
    importJson,
    publishToGitHub,
  } = useAtelierContent()

  // Passcode Gate State
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  // New Reel Draft State
  const [isAddingReel, setIsAddingReel] = useState(false)
  const [newReel, setNewReel] = useState<Omit<ReelItem, 'id'>>({
    title: '',
    subtitle: '',
    videoSrc: '',
    posterSrc: '',
    instagramUrl: 'https://www.instagram.com/leeana.in',
    category: 'Commercial Direction',
    duration: '0:30',
    client: 'Private Atelier',
  })

  // New Lookbook Item Draft State
  const [isAddingLookbook, setIsAddingLookbook] = useState(false)
  const [selectedColForNew, setSelectedColForNew] = useState(0)
  const [newLookbookItem, setNewLookbookItem] = useState<Omit<LookbookItem, 'id'>>({
    title: '',
    category: 'Haute Joaillerie',
    image: '',
    aspect: 'aspect-[3/4]',
    client: 'Atelier Client',
    year: '2025',
    focal: 'top',
    description: '',
  })

  // Selected Column Filter for Lookbook Tab
  const [activeColumnView, setActiveColumnView] = useState<number | 'all'>('all')

  // GitHub Publish State
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('leeana_gh_pat') || '')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState<{ success?: boolean; message?: string; commitUrl?: string } | null>(null)

  // Media Playback Testing State
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  if (!isAdminOpen) return null

  // --- PASSCODE GATE ---
  if (!isAuthenticated) {
    const handlePinSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const ok = authenticate(pinInput)
      if (!ok) {
        setPinError(true)
        setPinInput('')
      }
    }

    return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#08080c] p-8 shadow-2xl space-y-6 relative text-white">
          <button
            onClick={() => setIsAdminOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium block">
              LEEANA ATELIER CONSOLE
            </span>
            <h2 className="font-couture text-3xl tracking-widest text-white">
              RESTRICTED DESK
            </h2>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Enter your confidential atelier passcode to manage live video reels, photography lookbooks, and site media.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value)
                  setPinError(false)
                }}
                placeholder="Enter Passcode..."
                className="w-full text-center px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/20 text-lg tracking-widest text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
              />
              {pinError && (
                <div className="text-[11px] text-red-400 text-center mt-2 font-light">
                  Incorrect passcode. (Default: 2026)
                </div>
              )}
            </div>

            <button
              type="submit"
              className="apple-press w-full py-3.5 rounded-full bg-white hover:bg-[#e0deda] text-black text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg"
            >
              Unlock Atelier Desk
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[10px] text-white/30 tracking-wider">
              Tip: Master Passcode is <strong className="text-white/60 font-mono">2026</strong>
            </span>
          </div>
        </div>
      </div>
    )
  }

  // --- GITHUB PUBLISH HANDLER ---
  const handlePublish = async () => {
    if (!githubToken.trim()) {
      setPublishStatus({
        success: false,
        message: 'Please provide a GitHub Personal Access Token to commit changes.',
      })
      return
    }

    localStorage.setItem('leeana_gh_pat', githubToken.trim())
    setIsPublishing(true)
    setPublishStatus(null)

    const res = await publishToGitHub(githubToken.trim())
    setIsPublishing(false)
    setPublishStatus(res)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl text-white flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="px-6 py-4 border-b border-white/[0.1] bg-[#07070a]/90 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-couture text-xl tracking-[0.25em] text-white">LEEANA</span>
          <span className="w-[1px] h-4 bg-white/20" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">
            ATELIER STUDIO DESK
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Preview Button */}
          <button
            onClick={() => setIsAdminOpen(false)}
            className="apple-press px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-2 border border-white/20 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live Site</span>
          </button>

          {/* Export JSON Button */}
          <button
            onClick={exportJson}
            title="Download JSON Content Backup"
            className="apple-press p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all border border-white/10 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Lock Desk */}
          <button
            onClick={logout}
            title="Lock Desk"
            className="apple-press p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all border border-white/10 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Close Desk */}
          <button
            onClick={() => setIsAdminOpen(false)}
            aria-label="Close"
            className="apple-press p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all border border-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Tab Navigation Bar */}
      <div className="px-6 py-2.5 border-b border-white/[0.08] bg-[#09090e] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        {[
          { id: 'reels', label: 'Reels & Videos', icon: Film, count: reels.length },
          {
            id: 'lookbook',
            label: 'Lookbook Plates',
            icon: Camera,
            count: lookbookColumns.reduce((acc, c) => acc + c.length, 0),
          },
          { id: 'hero', label: 'Hero Stage', icon: Sparkles, count: heroSlides.length },
          { id: 'concierge', label: 'Concierge Cards', icon: Layers, count: conciergeCards.length },
          { id: 'reviews', label: 'Client Reviews', icon: MessageSquare, count: testimonials.length },
          { id: 'publish', label: 'Publish & Sync', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeAdminTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as AdminTab)}
              className={`apple-press px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-lg font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-7xl w-full mx-auto space-y-8">
        
        {/* ========================================================== */}
        {/* TAB 1: REELS & VIDEO FEEDS                                 */}
        {/* ========================================================== */}
        {activeAdminTab === 'reels' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  Instagram & Commercial Video Reels
                </h3>
                <p className="text-xs text-white/50 font-light mt-1">
                  Manage the video reels featured in Our Works, Instagram Grid, and Mobile Shorts.
                </p>
              </div>

              <button
                onClick={() => setIsAddingReel(!isAddingReel)}
                className="apple-press px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#e4e2de] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingReel ? 'Cancel' : 'Post New Reel'}</span>
              </button>
            </div>

            {/* Inline "Post New Reel" Composer */}
            {isAddingReel && (
              <div className="rounded-3xl border border-white/20 bg-[#0c0c12] p-6 space-y-6 shadow-2xl animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/80">
                    Draft & Post New Video Reel
                  </span>
                  <span className="text-[10px] text-white/40 uppercase">Direct Live Feed Integration</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video Uploader */}
                  <MediaUploader
                    label="Reel Video File (.mp4 / .webm)"
                    value={newReel.videoSrc}
                    onChange={(val) => setNewReel({ ...newReel, videoSrc: val })}
                    accept="video"
                    placeholder="Enter video URL or upload local video..."
                    onCaptureThumbnail={(thumb) => setNewReel({ ...newReel, posterSrc: thumb })}
                  />

                  {/* Poster Thumbnail */}
                  <MediaUploader
                    label="Cover Poster Thumbnail"
                    value={newReel.posterSrc}
                    onChange={(val) => setNewReel({ ...newReel, posterSrc: val })}
                    accept="image"
                    placeholder="Enter poster URL or auto-capture from video..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1.5">
                      Reel Title
                    </label>
                    <input
                      type="text"
                      value={newReel.title}
                      onChange={(e) => setNewReel({ ...newReel, title: e.target.value })}
                      placeholder="e.g. Fine Joaillerie Macro Focus"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1.5">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={newReel.category}
                      onChange={(e) => setNewReel({ ...newReel, category: e.target.value })}
                      placeholder="e.g. Sensory Atmosphere, Haute Couture"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1.5">
                      Instagram Post / Reel URL
                    </label>
                    <input
                      type="url"
                      value={newReel.instagramUrl}
                      onChange={(e) => setNewReel({ ...newReel, instagramUrl: e.target.value })}
                      placeholder="https://www.instagram.com/reel/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1.5">
                    Creative Narrative / Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={newReel.subtitle || ''}
                    onChange={(e) => setNewReel({ ...newReel, subtitle: e.target.value })}
                    placeholder="Short description of the shoot, lenses, or lighting used..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                  <button
                    onClick={() => setIsAddingReel(false)}
                    className="px-4 py-2.5 rounded-full text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newReel.title || !newReel.videoSrc) {
                        alert('Please provide at least a Reel Title and Video Source.')
                        return
                      }
                      addReel(newReel)
                      setIsAddingReel(false)
                      setNewReel({
                        title: '',
                        subtitle: '',
                        videoSrc: '',
                        posterSrc: '',
                        instagramUrl: 'https://www.instagram.com/leeana.in',
                        category: 'Commercial Direction',
                        duration: '0:30',
                        client: 'Private Atelier',
                      })
                    }}
                    className="apple-press px-6 py-2.5 rounded-full bg-white text-black hover:bg-[#e4e2de] text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-lg"
                  >
                    Post Reel to Live Atelier
                  </button>
                </div>
              </div>
            )}

            {/* List of Active Reels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reels.map((reel, idx) => {
                const isPlaying = playingVideoId === reel.id
                return (
                  <div
                    key={reel.id}
                    className="rounded-2xl border border-white/10 bg-[#09090d] p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      {/* Video / Poster Frame Preview */}
                      <div className="relative w-28 h-40 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 group">
                        {isPlaying ? (
                          <video
                            src={reel.videoSrc}
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={reel.posterSrc || '/assets/hero_couture_4k.jpg'}
                            alt={reel.title}
                            className="w-full h-full object-cover"
                          />
                        )}

                        <button
                          type="button"
                          onClick={() => setPlayingVideoId(isPlaying ? null : reel.id)}
                          className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                          title={isPlaying ? 'Pause Preview' : 'Play Video'}
                        >
                          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
                        </button>

                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-white/70">
                          #{idx + 1}
                        </div>
                      </div>

                      {/* Reel Details Form */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-white/40 block">Title</label>
                          <input
                            type="text"
                            value={reel.title}
                            onChange={(e) => updateReel(reel.id, { title: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-white/40 block">Category</label>
                          <input
                            type="text"
                            value={reel.category || ''}
                            onChange={(e) => updateReel(reel.id, { category: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-white/40 block">Instagram Link</label>
                          <input
                            type="text"
                            value={reel.instagramUrl}
                            onChange={(e) => updateReel(reel.id, { instagramUrl: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-white transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Media File Edit */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveReel(reel.id, 'up')}
                          disabled={idx === 0}
                          title="Move Up"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveReel(reel.id, 'down')}
                          disabled={idx === reels.length - 1}
                          title="Move Down"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={reel.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] tracking-wider uppercase text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <span>Instagram</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => {
                            if (confirm(`Remove reel "${reel.title}"?`)) {
                              deleteReel(reel.id)
                            }
                          }}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                          title="Delete Reel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: LOOKBOOK PLATES                                     */}
        {/* ========================================================== */}
        {activeAdminTab === 'lookbook' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  28-Plate Editorial Lookbook Gallery
                </h3>
                <p className="text-xs text-white/50 font-light mt-1">
                  Replace images, change titles, adjust vertical focal points, or add new plates across columns.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingLookbook(!isAddingLookbook)}
                  className="apple-press px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#e4e2de] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingLookbook ? 'Cancel' : 'Add Photo Plate'}</span>
                </button>
              </div>
            </div>

            {/* Column Filter Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-[10px] uppercase tracking-wider text-white/40 mr-1">Filter Column:</span>
              <button
                onClick={() => setActiveColumnView('all')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  activeColumnView === 'all'
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                All 4 Columns
              </button>
              {[0, 1, 2, 3].map((colIdx) => (
                <button
                  key={colIdx}
                  onClick={() => setActiveColumnView(colIdx)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeColumnView === colIdx
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  Column {colIdx + 1} ({lookbookColumns[colIdx]?.length || 0})
                </button>
              ))}
            </div>

            {/* Add Lookbook Item Drawer */}
            {isAddingLookbook && (
              <div className="rounded-3xl border border-white/20 bg-[#0c0c12] p-6 space-y-6 shadow-2xl animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/80">
                    Add New Lookbook Plate
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40 uppercase">Target Column:</span>
                    <select
                      value={selectedColForNew}
                      onChange={(e) => setSelectedColForNew(Number(e.target.value))}
                      className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none"
                    >
                      <option value={0} className="bg-black">Column 1</option>
                      <option value={1} className="bg-black">Column 2</option>
                      <option value={2} className="bg-black">Column 3</option>
                      <option value={3} className="bg-black">Column 4</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MediaUploader
                    label="Lookbook Photo (High Res JPG/PNG)"
                    value={newLookbookItem.image}
                    onChange={(val) => setNewLookbookItem({ ...newLookbookItem, image: val })}
                    accept="image"
                    placeholder="Enter image URL or upload image file..."
                  />

                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newLookbookItem.title}
                        onChange={(e) => setNewLookbookItem({ ...newLookbookItem, title: e.target.value })}
                        placeholder="e.g. Colombian Emerald & Polki Crescent"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1">
                          Category
                        </label>
                        <select
                          value={newLookbookItem.category}
                          onChange={(e) => setNewLookbookItem({ ...newLookbookItem, category: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                        >
                          <option value="Haute Joaillerie" className="bg-black">Haute Joaillerie</option>
                          <option value="Architectural Estates" className="bg-black">Architectural Estates</option>
                          <option value="Bridal Silks" className="bg-black">Bridal Silks</option>
                          <option value="Exotic Fleet" className="bg-black">Exotic Fleet</option>
                          <option value="Gastronomy & Culinary" className="bg-black">Gastronomy & Culinary</option>
                          <option value="Fashion Editorial" className="bg-black">Fashion Editorial</option>
                          <option value="Commercial Brand" className="bg-black">Commercial Brand</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1">
                          Aspect Ratio
                        </label>
                        <select
                          value={newLookbookItem.aspect}
                          onChange={(e) => setNewLookbookItem({ ...newLookbookItem, aspect: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                        >
                          <option value="aspect-[3/4]" className="bg-black">3:4 Portrait</option>
                          <option value="aspect-[4/5]" className="bg-black">4:5 Tall</option>
                          <option value="aspect-[1/1]" className="bg-black">1:1 Square</option>
                          <option value="aspect-[16/10]" className="bg-black">16:10 Landscape</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1">
                          Focal Alignment
                        </label>
                        <select
                          value={newLookbookItem.focal || 'center'}
                          onChange={(e) =>
                            setNewLookbookItem({
                              ...newLookbookItem,
                              focal: e.target.value as 'top' | 'center',
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                        >
                          <option value="top" className="bg-black">Top (Keep Portraits Uncut)</option>
                          <option value="center" className="bg-black">Center</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block mb-1">
                          Client / Atelier Year
                        </label>
                        <input
                          type="text"
                          value={newLookbookItem.client}
                          onChange={(e) => setNewLookbookItem({ ...newLookbookItem, client: e.target.value })}
                          placeholder="e.g. Private Solitaire Vault"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                  <button
                    onClick={() => setIsAddingLookbook(false)}
                    className="px-4 py-2 text-xs text-white/60 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newLookbookItem.title || !newLookbookItem.image) {
                        alert('Please provide at least a Title and Image.')
                        return
                      }
                      addLookbookItem(selectedColForNew, newLookbookItem)
                      setIsAddingLookbook(false)
                      setNewLookbookItem({
                        title: '',
                        category: 'Haute Joaillerie',
                        image: '',
                        aspect: 'aspect-[3/4]',
                        client: 'Atelier Client',
                        year: '2025',
                        focal: 'top',
                        description: '',
                      })
                    }}
                    className="apple-press px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    Add Plate to Column {selectedColForNew + 1}
                  </button>
                </div>
              </div>
            )}

            {/* Lookbook Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {lookbookColumns.map((col, colIdx) => {
                if (activeColumnView !== 'all' && activeColumnView !== colIdx) return null

                return (
                  <div key={colIdx} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-medium tracking-wider uppercase text-white/80">
                        Column {colIdx + 1}
                      </span>
                      <span className="text-[10px] text-white/40">{col.length} Plates</span>
                    </div>

                    <div className="space-y-3">
                      {col.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-white/10 bg-[#09090d] p-3.5 space-y-3 hover:border-white/20 transition-all"
                        >
                          <div className="flex gap-3">
                            <div className="w-16 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                              <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full h-full object-cover ${
                                  item.focal === 'top' ? 'object-top' : 'object-center'
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => updateLookbookItem(item.id, { title: e.target.value })}
                                className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/10 text-xs text-white font-medium focus:outline-none"
                              />
                              <input
                                type="text"
                                value={item.category}
                                onChange={(e) => updateLookbookItem(item.id, { category: e.target.value })}
                                className="w-full px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[10px] text-white/70 focus:outline-none"
                              />
                              <div className="text-[10px] text-white/40 font-mono truncate">{item.client}</div>
                            </div>
                          </div>

                          {/* Quick Replace Image & Focal Point */}
                          <div className="space-y-1.5 pt-1 border-t border-white/[0.06]">
                            <div className="flex items-center justify-between gap-2">
                              <select
                                value={item.focal || 'center'}
                                onChange={(e) =>
                                  updateLookbookItem(item.id, { focal: e.target.value as 'top' | 'center' })
                                }
                                className="px-2 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] text-white/60 focus:outline-none"
                              >
                                <option value="top" className="bg-black">Focal: Top</option>
                                <option value="center" className="bg-black">Focal: Center</option>
                              </select>

                              <select
                                value={item.aspect}
                                onChange={(e) => updateLookbookItem(item.id, { aspect: e.target.value })}
                                className="px-2 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] text-white/60 focus:outline-none"
                              >
                                <option value="aspect-[3/4]" className="bg-black">3:4</option>
                                <option value="aspect-[4/5]" className="bg-black">4:5</option>
                                <option value="aspect-[1/1]" className="bg-black">1:1</option>
                                <option value="aspect-[16/10]" className="bg-black">16:10</option>
                              </select>

                              <button
                                onClick={() => {
                                  if (confirm(`Remove plate "${item.title}"?`)) {
                                    deleteLookbookItem(item.id)
                                  }
                                }}
                                className="p-1 rounded text-red-400 hover:bg-red-400/10 cursor-pointer"
                                title="Delete Plate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) => updateLookbookItem(item.id, { image: e.target.value })}
                              placeholder="Image URL or path..."
                              className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] text-white/50 font-mono focus:outline-none focus:text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: HERO STAGE                                          */}
        {/* ========================================================== */}
        {activeAdminTab === 'hero' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Hero Cinema Banners & Top Stage
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Edit the headline typography, video loops, and 4K backdrop posters rotating on the atelier homepage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="rounded-3xl border border-white/10 bg-[#09090d] p-6 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
                        Slide #{idx + 1}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">ID: {slide.id}</span>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                        Kicker Subheading
                      </label>
                      <input
                        type="text"
                        value={slide.tag}
                        onChange={(e) => updateHeroSlide(slide.id, { tag: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                        Display Headline
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateHeroSlide(slide.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                        Editorial Subtitle
                      </label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => updateHeroSlide(slide.id, { subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white transition-colors resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <MediaUploader
                        label="Video Loop (MP4)"
                        value={slide.videoSrc || ''}
                        onChange={(val) => updateHeroSlide(slide.id, { videoSrc: val })}
                        accept="video"
                        placeholder="/assets/shotsquare-hero-reel.mp4"
                      />
                      <MediaUploader
                        label="Fallback Poster"
                        value={slide.poster}
                        onChange={(val) => updateHeroSlide(slide.id, { poster: val })}
                        accept="image"
                        placeholder="/assets/hero_couture_4k.jpg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: CONCIERGE CARDS                                     */}
        {/* ========================================================== */}
        {activeAdminTab === 'concierge' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Private Concierge & High-Value Services
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Customize the 6 luxury service cards (Fleet, Estates, Solitaires, Vintages, Aviation, Marine).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conciergeCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-3xl border border-white/10 bg-[#09090d] p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-full h-36 rounded-2xl overflow-hidden bg-black border border-white/10">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateConciergeCard(card.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">Protocol Line</label>
                      <input
                        type="text"
                        value={card.protocol}
                        onChange={(e) => updateConciergeCard(card.id, { protocol: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={card.description}
                        onChange={(e) => updateConciergeCard(card.id, { description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>

                    <MediaUploader
                      label="Service Photography"
                      value={card.image}
                      onChange={(val) => updateConciergeCard(card.id, { image: val })}
                      accept="image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 5: CLIENT REVIEWS                                      */}
        {/* ========================================================== */}
        {activeAdminTab === 'reviews' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Client Testimonials & Commissions
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Edit luxury client reviews, commissions, and customer portrait images.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="rounded-3xl border border-white/10 bg-[#09090d] p-5 space-y-4 hover:border-white/20 transition-all"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-black shrink-0 border border-white/10">
                      <img src={test.img} alt={test.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => updateTestimonial(test.id, { name: e.target.value })}
                        placeholder="Client Name"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white font-medium"
                      />
                      <input
                        type="text"
                        value={test.role}
                        onChange={(e) => updateTestimonial(test.id, { role: e.target.value })}
                        placeholder="Role / Title"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/70"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">Review Quote</label>
                    <textarea
                      rows={3}
                      value={test.text}
                      onChange={(e) => updateTestimonial(test.id, { text: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
                    />
                  </div>

                  <MediaUploader
                    label="Portrait Avatar"
                    value={test.img}
                    onChange={(val) => updateTestimonial(test.id, { img: val })}
                    accept="image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 6: PUBLISH & CLOUD SYNC                                */}
        {/* ========================================================== */}
        {activeAdminTab === 'publish' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Live Publishing & Synchronization Suite
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Your edits are saved immediately in your browser. Use the tools below to push live to the custom domain, export backups, or restore defaults.
              </p>
            </div>

            {/* Direct GitHub Publish Card */}
            <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 block mb-1">
                    LIVE AUTOMATED DEPLOYMENT
                  </span>
                  <h4 className="text-xl font-light text-white">Publish Directly to Leeana.in</h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Globe className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-white/70 font-light leading-relaxed">
                Clicking publish will commit the updated media catalog directly to the GitHub repository (<code className="text-white/90">tanishch25/leeana-luxury-atelier</code>). GitHub Actions will automatically rebuild and deploy the new imagery and reels to <span className="text-white font-medium">https://leeana.in</span> in approximately 40 seconds.
              </p>

              <div className="space-y-2">
                <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 block">
                  GitHub Personal Access Token (PAT)
                </label>
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="github_pat_..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors font-mono"
                />
                <span className="text-[10px] text-white/40 block">
                  Token needs repository <code className="text-white/60">contents: write</code> permission. It is stored securely in your browser's local storage.
                </span>
              </div>

              {publishStatus && (
                <div
                  className={`p-4 rounded-2xl text-xs font-light leading-relaxed flex items-start gap-3 border ${
                    publishStatus.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-red-500/10 border-red-500/30 text-red-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div>{publishStatus.message}</div>
                    {publishStatus.commitUrl && (
                      <a
                        href={publishStatus.commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-white font-mono text-[11px] block mt-1"
                      >
                        View Git Commit in Repository →
                      </a>
                    )}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="apple-press w-full py-4 rounded-full bg-white hover:bg-[#e4e2de] text-black text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Publishing to Leeana.in...</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    <span>Publish Live to Leeana.in</span>
                  </>
                )}
              </button>
            </div>

            {/* Offline Backup & Import */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Export Backup */}
              <div className="rounded-3xl border border-white/10 bg-[#09090e] p-6 space-y-4">
                <div className="text-sm font-medium text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-white/70" />
                  <span>Export JSON Backup</span>
                </div>
                <p className="text-xs text-white/50 font-light leading-relaxed">
                  Download a complete JSON snapshot of all current reels, lookbooks, hero slides, and reviews.
                </p>
                <button
                  type="button"
                  onClick={exportJson}
                  className="apple-press w-full py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-medium tracking-wider uppercase transition-all border border-white/20 cursor-pointer"
                >
                  Download Dossier (.json)
                </button>
              </div>

              {/* Import Backup */}
              <div className="rounded-3xl border border-white/10 bg-[#09090e] p-6 space-y-4">
                <div className="text-sm font-medium text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-white/70" />
                  <span>Import JSON Backup</span>
                </div>
                <p className="text-xs text-white/50 font-light leading-relaxed">
                  Upload a previously saved JSON snapshot to instantly restore all data.
                </p>
                <label className="apple-press block w-full py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-medium tracking-wider uppercase transition-all border border-white/20 cursor-pointer text-center">
                  <span>Upload Dossier (.json)</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        const content = event.target?.result as string
                        const res = importJson(content)
                        if (res.success) {
                          alert('Atelier content restored successfully!')
                        } else {
                          alert(`Import failed: ${res.error}`)
                        }
                      }
                      reader.readAsText(file)
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="rounded-3xl border border-red-500/20 bg-red-950/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-red-200">Reset to Factory Defaults</div>
                <div className="text-xs text-white/50 font-light mt-0.5">
                  Restores the original 28 Lookbook photographs, 8 curated reels, and hero slides.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to restore all original atelier content? This will overwrite local changes.')) {
                    resetToDefaults()
                    alert('Atelier restored to factory state.')
                  }
                }}
                className="apple-press px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500 hover:text-black text-xs font-medium tracking-wider uppercase transition-all cursor-pointer shrink-0"
              >
                Reset Defaults
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
