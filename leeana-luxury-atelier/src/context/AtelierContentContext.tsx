import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type {
  AtelierSiteContent,
  ReelItem,
  LookbookItem,
  HeroSlide,
  ConciergeCard,
  TestimonialItem,
} from '../types/atelierContent'
import { INITIAL_ATELIER_CONTENT } from '../data/initialContent'

const STORAGE_KEY = 'leeana_atelier_store_v1'
const AUTH_KEY = 'leeana_atelier_auth_session'

export type AdminTab = 'reels' | 'lookbook' | 'hero' | 'concierge' | 'reviews' | 'publish'

interface AtelierContentContextType {
  content: AtelierSiteContent
  isLoaded: boolean
  isAdminOpen: boolean
  setIsAdminOpen: (open: boolean) => void
  activeAdminTab: AdminTab
  setActiveAdminTab: (tab: AdminTab) => void
  isAuthenticated: boolean
  authenticate: (pin: string) => boolean
  logout: () => void

  // Reels
  reels: ReelItem[]
  addReel: (reel: Omit<ReelItem, 'id'>) => void
  updateReel: (id: string, partial: Partial<ReelItem>) => void
  deleteReel: (id: string) => void
  moveReel: (id: string, direction: 'up' | 'down') => void

  // Lookbook
  lookbookColumns: [LookbookItem[], LookbookItem[], LookbookItem[], LookbookItem[]]
  addLookbookItem: (columnIndex: number, item: Omit<LookbookItem, 'id'>) => void
  updateLookbookItem: (id: string, partial: Partial<LookbookItem>) => void
  deleteLookbookItem: (id: string) => void
  moveLookbookItemToColumn: (id: string, targetColIndex: number) => void

  // Hero
  heroSlides: HeroSlide[]
  updateHeroSlide: (id: string, partial: Partial<HeroSlide>) => void
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void
  deleteHeroSlide: (id: string) => void

  // Concierge
  conciergeCards: ConciergeCard[]
  updateConciergeCard: (id: string, partial: Partial<ConciergeCard>) => void

  // Testimonials
  testimonials: TestimonialItem[]
  updateTestimonial: (id: string, partial: Partial<TestimonialItem>) => void
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void
  deleteTestimonial: (id: string) => void

  // Persistence & Cloud
  resetToDefaults: () => void
  exportJson: () => void
  importJson: (jsonString: string) => { success: boolean; error?: string }
  publishToGitHub: (token: string) => Promise<{ success: boolean; message: string; commitUrl?: string }>
}

const AtelierContentContext = createContext<AtelierContentContextType | null>(null)

export const AtelierContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AtelierSiteContent>(INITIAL_ATELIER_CONTENT)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('reels')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  })

  // Hydrate from localStorage or default
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.reels && parsed.lookbookColumns && parsed.heroSlides && parsed.conciergeCards) {
          setContent(parsed)
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached atelier store:', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Auto-persist whenever content changes
  const saveContent = useCallback((newContent: AtelierSiteContent) => {
    setContent(newContent)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent))
    } catch (e) {
      console.error('LocalStorage save error (check media size):', e)
    }
  }, [])

  // Listen to URL hash #admin or ?admin
  useEffect(() => {
    const checkUrl = () => {
      const url = new URL(window.location.href)
      if (url.searchParams.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsAdminOpen(true)
      }
    }
    checkUrl()
    window.addEventListener('hashchange', checkUrl)
    return () => window.removeEventListener('hashchange', checkUrl)
  }, [])

  // Global keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        setIsAdminOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const authenticate = (pin: string) => {
    // Master atelier passcodes: 2026 or leeana
    if (pin.trim() === '2026' || pin.trim().toLowerCase() === 'leeana') {
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_KEY, 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(AUTH_KEY)
  }

  // --- REELS MUTATORS ---
  const addReel = (reelData: Omit<ReelItem, 'id'>) => {
    const newId = String(Date.now()).slice(-4)
    const newReel: ReelItem = { ...reelData, id: newId }
    const updated = {
      ...content,
      reels: [newReel, ...content.reels],
      updatedAt: new Date().toISOString(),
    }
    saveContent(updated)
  }

  const updateReel = (id: string, partial: Partial<ReelItem>) => {
    const updatedReels = content.reels.map((r) => (r.id === id ? { ...r, ...partial } : r))
    saveContent({ ...content, reels: updatedReels, updatedAt: new Date().toISOString() })
  }

  const deleteReel = (id: string) => {
    const updatedReels = content.reels.filter((r) => r.id !== id)
    saveContent({ ...content, reels: updatedReels, updatedAt: new Date().toISOString() })
  }

  const moveReel = (id: string, direction: 'up' | 'down') => {
    const idx = content.reels.findIndex((r) => r.id === id)
    if (idx === -1) return
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= content.reels.length) return
    const newReels = [...content.reels]
    const temp = newReels[idx]
    newReels[idx] = newReels[targetIdx]
    newReels[targetIdx] = temp
    saveContent({ ...content, reels: newReels, updatedAt: new Date().toISOString() })
  }

  // --- LOOKBOOK MUTATORS ---
  const addLookbookItem = (columnIndex: number, itemData: Omit<LookbookItem, 'id'>) => {
    const targetCol = Math.max(0, Math.min(3, columnIndex))
    const newId = String(Date.now()).slice(-4)
    const newItem: LookbookItem = { ...itemData, id: newId }
    const newCols = [...content.lookbookColumns] as [LookbookItem[], LookbookItem[], LookbookItem[], LookbookItem[]]
    newCols[targetCol] = [newItem, ...newCols[targetCol]]
    saveContent({ ...content, lookbookColumns: newCols, updatedAt: new Date().toISOString() })
  }

  const updateLookbookItem = (id: string, partial: Partial<LookbookItem>) => {
    const newCols = content.lookbookColumns.map((col) =>
      col.map((item) => (item.id === id ? { ...item, ...partial } : item))
    ) as [LookbookItem[], LookbookItem[], LookbookItem[], LookbookItem[]]
    saveContent({ ...content, lookbookColumns: newCols, updatedAt: new Date().toISOString() })
  }

  const deleteLookbookItem = (id: string) => {
    const newCols = content.lookbookColumns.map((col) =>
      col.filter((item) => item.id !== id)
    ) as [LookbookItem[], LookbookItem[], LookbookItem[], LookbookItem[]]
    saveContent({ ...content, lookbookColumns: newCols, updatedAt: new Date().toISOString() })
  }

  const moveLookbookItemToColumn = (id: string, targetColIndex: number) => {
    let foundItem: LookbookItem | null = null
    const newCols = content.lookbookColumns.map((col) => {
      const item = col.find((i) => i.id === id)
      if (item) foundItem = item
      return col.filter((i) => i.id !== id)
    }) as [LookbookItem[], LookbookItem[], LookbookItem[], LookbookItem[]]

    if (foundItem) {
      const validTarget = Math.max(0, Math.min(3, targetColIndex))
      newCols[validTarget] = [foundItem, ...newCols[validTarget]]
      saveContent({ ...content, lookbookColumns: newCols, updatedAt: new Date().toISOString() })
    }
  }

  // --- HERO MUTATORS ---
  const updateHeroSlide = (id: string, partial: Partial<HeroSlide>) => {
    const updated = content.heroSlides.map((s) => (s.id === id ? { ...s, ...partial } : s))
    saveContent({ ...content, heroSlides: updated, updatedAt: new Date().toISOString() })
  }

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    const newId = String(Date.now()).slice(-4)
    const newSlide: HeroSlide = { ...slideData, id: newId }
    saveContent({
      ...content,
      heroSlides: [...content.heroSlides, newSlide],
      updatedAt: new Date().toISOString(),
    })
  }

  const deleteHeroSlide = (id: string) => {
    if (content.heroSlides.length <= 1) return // Keep at least one
    const updated = content.heroSlides.filter((s) => s.id !== id)
    saveContent({ ...content, heroSlides: updated, updatedAt: new Date().toISOString() })
  }

  // --- CONCIERGE MUTATORS ---
  const updateConciergeCard = (id: string, partial: Partial<ConciergeCard>) => {
    const updated = content.conciergeCards.map((c) => (c.id === id ? { ...c, ...partial } : c))
    saveContent({ ...content, conciergeCards: updated, updatedAt: new Date().toISOString() })
  }

  // --- TESTIMONIALS MUTATORS ---
  const updateTestimonial = (id: string, partial: Partial<TestimonialItem>) => {
    const updated = content.testimonials.map((t) => (t.id === id ? { ...t, ...partial } : t))
    saveContent({ ...content, testimonials: updated, updatedAt: new Date().toISOString() })
  }

  const addTestimonial = (itemData: Omit<TestimonialItem, 'id'>) => {
    const newId = String(Date.now()).slice(-4)
    const newItem: TestimonialItem = { ...itemData, id: newId }
    saveContent({
      ...content,
      testimonials: [...content.testimonials, newItem],
      updatedAt: new Date().toISOString(),
    })
  }

  const deleteTestimonial = (id: string) => {
    const updated = content.testimonials.filter((t) => t.id !== id)
    saveContent({ ...content, testimonials: updated, updatedAt: new Date().toISOString() })
  }

  // --- EXPORT & RESET ---
  const resetToDefaults = () => {
    saveContent(INITIAL_ATELIER_CONTENT)
  }

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `leeana-content-backup-${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (parsed.reels && parsed.lookbookColumns && parsed.heroSlides && parsed.conciergeCards) {
        saveContent(parsed)
        return { success: true }
      }
      return { success: false, error: 'Invalid configuration format.' }
    } catch (e) {
      return { success: false, error: (e as Error).message }
    }
  }

  // --- GITHUB LIVE PUBLISHING ---
  const publishToGitHub = async (token: string) => {
    try {
      const repo = 'tanishch25/leeana-luxury-atelier'
      const path = 'src/data/atelierContent.json'
      const branch = 'main'
      const message = `chore(content): client update via Atelier Admin Suite (${new Date().toLocaleTimeString()})`

      // 1. Get current file SHA if it exists
      let sha: string | undefined
      try {
        const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: 'application/vnd.github.v3+json',
          },
        })
        if (getRes.ok) {
          const getData = await getRes.json()
          sha = getData.sha
        }
      } catch {
        // File may not exist yet, which is fine
      }

      // 2. Base64 encode the content JSON
      const jsonStr = JSON.stringify(content, null, 2)
      // Unicode safe base64
      const utf8Bytes = new TextEncoder().encode(jsonStr)
      let binaryStr = ''
      utf8Bytes.forEach((byte) => {
        binaryStr += String.fromCharCode(byte)
      })
      const base64Content = btoa(binaryStr)

      // 3. Commit via PUT
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: base64Content,
          branch,
          ...(sha ? { sha } : {}),
        }),
      })

      if (!putRes.ok) {
        const errData = await putRes.json()
        throw new Error(errData.message || 'GitHub API returned an error.')
      }

      const resData = await putRes.json()
      return {
        success: true,
        message: 'Published to GitHub repository! Live site will rebuild and update automatically.',
        commitUrl: resData.commit?.html_url,
      }
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'Failed to publish to GitHub.',
      }
    }
  }

  return (
    <AtelierContentContext.Provider
      value={{
        content,
        isLoaded,
        isAdminOpen,
        setIsAdminOpen,
        activeAdminTab,
        setActiveAdminTab,
        isAuthenticated,
        authenticate,
        logout,
        reels: content.reels,
        addReel,
        updateReel,
        deleteReel,
        moveReel,
        lookbookColumns: content.lookbookColumns,
        addLookbookItem,
        updateLookbookItem,
        deleteLookbookItem,
        moveLookbookItemToColumn,
        heroSlides: content.heroSlides,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        conciergeCards: content.conciergeCards,
        updateConciergeCard,
        testimonials: content.testimonials,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        resetToDefaults,
        exportJson,
        importJson,
        publishToGitHub,
      }}
    >
      {children}
    </AtelierContentContext.Provider>
  )
}

export const useAtelierContent = () => {
  const context = useContext(AtelierContentContext)
  if (!context) {
    throw new Error('useAtelierContent must be used within an AtelierContentProvider')
  }
  return context
}
