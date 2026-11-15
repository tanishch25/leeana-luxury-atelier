export interface ReelItem {
  id: string
  title: string
  subtitle?: string
  videoSrc: string
  posterSrc: string
  instagramUrl: string
  category?: string
  duration?: string
  client?: string
}

export interface LookbookItem {
  id: string
  title: string
  category: string
  image: string
  aspect: string
  client: string
  year: string
  description?: string
  focal?: 'top' | 'center'
}

export interface HeroSlide {
  id: string
  tag: string
  title: string
  subtitle: string
  videoSrc?: string
  poster: string
  ctaText: string
}

export interface ConciergeCard {
  id: string
  title: string
  description: string
  protocol: string
  image: string
  mandate: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  img: string
  text: string
  commission: string
}

export interface ModelItem {
  id: string
  name: string
  tag: string
  img: string
}

export interface AtelierSiteContent {
  reels: ReelItem[]
  lookbookColumns: [LookbookItem[], LookbookItem[], LookbookItem[], LookbookItem[]]
  heroSlides: HeroSlide[]
  conciergeCards: ConciergeCard[]
  testimonials: TestimonialItem[]
  models: ModelItem[]
  updatedAt: string
}
